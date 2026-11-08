"""Sound effects for the 4 extra TikToks (src/videos/*). Frames at 30 fps.
Usage: python3 tools/make_sfx_series.py   (writes public/audio/sfx-*.wav)
"""
import os
import sys
sys.path.insert(0, os.path.dirname(__file__))
from sfxlib import *  # noqa

A = os.path.join(os.path.dirname(__file__), "..", "public", "audio")


def end_card(T, at):
    T.place(impact(), at, 0.55)
    T.place(shimmer(1.4, 1800), at, 0.9)
    T.place(whoosh(0.3), at + 6, 0.3)
    T.place(ding(), at + 30, 0.5)
    T.place(pop(1.2), at + 30, 0.6)


# ---------- solo vs plusieurs (420) ----------
T = Track(14.0)
T.place(whoosh(0.4), 4, 0.25)
T.place(sad_wah(), 30, 0.9)
T.place(pop(0.7), 50, 0.6)
T.place(riser(0.45), 105 - 13, 1.0)
T.place(impact(), 105, 0.6)
T.place(shimmer(1.2), 105, 0.8)
T.place(rec_beep(), 112, 1.0)
T.place(rec_beep(), 118, 1.0)
for k in range(6):
    fr = 105 + k * 30
    if k:
        T.place(whoosh(0.22, up=False), fr - 3, 0.6)
        T.place(glitch(), fr, 0.8)
T.place(pop(1.1), 105 + 40, 0.6)
T.place(pop(0.9), 105 + 100, 0.6)
T.place(pop(1.3), 105 + 160, 0.7)
T.place(correct(), 105 + 160, 0.5)
end_card(T, 300)
T.save(os.path.join(A, "sfx-solo.wav"))

# ---------- types de joueuses (540) ----------
T = Track(18.0)
T.place(whoosh(0.4), 2, 0.4)
T.place(pop(1.0), 14, 0.7)
for i in range(5):
    s = 60 + i * 75
    T.place(whoosh(0.3, up=False), s - 4, 0.6)
    T.place(vine_boom(), s + 40, 0.9)
    T.place(pop(1.2), s + 43, 0.5)
T.place(scratch(), 60 + 75 * 1 + 38, 0.4)
T.place(bonk(), 60 + 75 * 3 + 44, 0.7)
end_card(T, 435)
T.save(os.path.join(A, "sfx-types.wav"))

# ---------- jeux (390) ----------
T = Track(13.0)
T.place(whoosh(0.4), 4, 0.4)
T.place(pop(1.0), 18, 0.7)
T.place(riser(0.45), 60 - 13, 0.8)
for i in range(12):
    fr = 60 + i * 15
    T.place(impact() * 0.5 if i == 0 else glitch(), fr, 0.6)
    T.place(pop(0.9 + i * 0.05), fr, 0.55, pan=(-0.4 if i % 2 else 0.4))
    T.place(whoosh(0.18, up=False), fr - 3, 0.35)
T.place(impact(), 240, 0.5)
T.place(shimmer(1.2), 240, 0.8)
T.place(pop(1.1), 254, 0.7)
end_card(T, 300)
T.save(os.path.join(A, "sfx-jeux.wav"))

# ---------- red / green flags (480) ----------
T = Track(16.0)
for i in range(9):
    T.place(tick(), 2 + i * 1.2, 0.45)
T.place(whoosh(0.4), 6, 0.4)
T.place(pop(0.8), 18, 0.7)
for i in range(4):
    fr = 60 + i * 45
    T.place(whoosh(0.25), fr - 4, 0.4)
    T.place(buzzer(), fr, 0.8)
    T.place(pop(1.0 + i * 0.1), fr + 6, 0.55)
T.place(scratch(), 240, 0.9)
T.place(pop(1.0), 244, 0.6)
T.place(riser(0.4), 270 - 12, 0.8)
T.place(impact(), 270, 0.5)
T.place(shimmer(1.0, 2400), 270, 0.7)
for i in range(4):
    fr = 270 + 4 + i * 30
    T.place(whoosh(0.22), fr - 3, 0.35)
    T.place(correct(), fr, 0.7)
T.place(pop(1.2), 270 + 96, 0.6)
end_card(T, 390)
T.save(os.path.join(A, "sfx-flags.wav"))
