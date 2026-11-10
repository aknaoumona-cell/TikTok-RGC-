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


T = Track(24.0)
# 1 accroche : flashs brocante puis SLAM quads
for i, fr in enumerate([0, 13, 26]):
    T.place(pop(1.1 + 0.15 * i), fr, 0.5)
T.place(pop(1.5), 40, 0.6)
T.place(ding(), 40, 0.35)
T.place(pop(0.9), 46, 0.5)
T.place(pop(1.2), 62, 0.6)
# 2 dedans / dehors
T.place(tick(), 105, 0.8)
T.place(pop(1.1), 115, 0.6)
T.place(pop(1.3), 127, 0.6)
# 3 baptême
T.place(pop(1.4), 212, 0.6)
T.place(pop(1.1), 216, 0.6)
T.place(pop(1.3), 222, 0.6)
for fr in [238, 244, 250]:
    T.place(tick(), fr, 0.8)
# 4 buvette
T.place(pop(1.0), 334, 0.6)
T.place(pop(1.2), 340, 0.6)
# 5 infos
T.place(pop(1.2), 422, 0.6)
for fr in [438, 452]:
    T.place(tick(), fr, 0.9)
# 6 exposants
T.place(pop(1.0), 542, 0.6)
T.place(pop(1.1), 546, 0.6)
T.place(ding(), 556, 0.5)
T.place(rec_beep(), 564, 0.6)
T.place(tick(), 574, 0.9)
T.place(tick(), 580, 0.9)
# 7 fin
T.place(pop(1.3), 642, 0.6)
T.place(pop(1.1), 648, 0.6)
T.place(pop(1.0), 660, 0.6)
T.place(ding(), 672, 0.5)
T.save(os.path.join(A, "sfx-quad.wav"))
