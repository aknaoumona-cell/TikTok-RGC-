"""Bruitages du TikTok vide-grenier Quad Rider 31 (src/videos/QuadVideGrenier.tsx). 30 i/s.
Usage : python3 tools/make_sfx_quad.py   (écrit public/audio/sfx-quad.wav)
"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from sfxlib import *  # noqa

A = os.path.join(os.path.dirname(__file__), "..", "public", "audio")


def engine(d=1.2, f0=38.0, f1=95.0, curve=0.35):
    """Moteur de quad synthétisé : pétarade monocylindre qui monte en régime."""
    t = t_(d)
    p = (t / d) ** curve
    freq = f0 + (f1 - f0) * p
    freq = freq * (1 + 0.04 * np.sin(2 * np.pi * 7 * t))
    ph = np.cumsum(freq) / SR
    saw = 2 * (ph % 1) - 1
    pulses = np.sign(np.sin(2 * np.pi * ph)) * 0.4
    rumble = lowpass(rng.standard_normal(len(t)), 300) * 0.8
    x = saw * 0.6 + pulses + rumble * (0.5 + 0.5 * np.sin(2 * np.pi * ph))
    x = lowpass(x, 900 + 1400 * p)
    env = np.minimum(1, t / 0.06) * np.minimum(1, (d - t) / 0.25)
    return np.tanh(x * 2.2) * env * 0.7


T = Track(QUAD_S := 24.5)
# 1 accroche : le quad arrive
T.place(engine(1.3, 35, 110, 0.5), 0, 0.8)
T.place(whoosh(0.4), 14, 0.4)
T.place(impact(), 26, 0.45)
T.place(pop(1.0), 6, 0.5)
T.place(pop(0.9), 16, 0.6)
T.place(pop(1.15), 38, 0.6)
T.place(pop(1.2), 46, 0.6)
# coupes : volet chantier
for c in [110, 215, 325, 420, 540, 645]:
    T.place(whoosh(0.35), c - 8, 0.55)
# 2 vide-grenier
T.place(impact(), 114, 0.5)
T.place(impact(), 120, 0.4)
T.place(pop(1.0), 130, 0.6)
for i in range(6):
    T.place(tick(), 140 + i * 6, 0.7)
# 3 baptême : gros coup de gaz
T.place(pop(1.1), 219, 0.6)
T.place(engine(1.6, 30, 140, 0.3), 225, 1.0)
T.place(impact(), 235, 0.5)
T.place(pop(0.9), 245, 0.5)
# 4 buvette
T.place(pop(1.0), 329, 0.6)
T.place(pop(1.2), 335, 0.6)
T.place(pop(1.3), 357, 0.6)
T.place(pop(1.5), 363, 0.6)
# 5 infos
T.place(pop(1.0), 422, 0.5)
for i, fr in enumerate([430, 442, 454, 466]):
    T.place(tick(), fr, 0.9)
    T.place(whoosh(0.2), fr - 2, 0.25)
# 6 exposants
T.place(impact(), 544, 0.45)
T.place(rec_beep(), 560, 0.7)
T.place(rec_beep(), 576, 0.7)
T.place(ding(), 576, 0.4)
T.place(pop(1.0), 581, 0.6)
T.place(pop(1.1), 587, 0.6)
# 7 fin
T.place(impact(), 651, 0.55)
T.place(pop(1.0), 661, 0.6)
T.place(engine(1.8, 50, 120, 0.4), 665, 0.7)
T.place(ding(), 675, 0.5)
T.save(os.path.join(A, "sfx-quad.wav"))
