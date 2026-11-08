"""Sound effects for the main promo (src/Video.tsx). Timings in frames (30 fps).
Usage: python3 tools/make_sfx.py public/audio/rgc-sfx.wav
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))
from sfxlib import *  # noqa

T = Track(21.5)
# ---------------- timeline (frames) ----------------
# 1. hook: voice card + avatars + REC
T.place(whoosh(0.35), 0, 0.5)
T.place(pop(0.8), 2, 0.6)
for i in range(6):
    T.place(pop(1.0 + i * 0.07), 6 + i * 3, 0.35, pan=-0.5 + i * 0.2)
T.place(rec_beep(), 14, 1.0)
T.place(rec_beep(), 20, 1.0)
T.place(whoosh(0.3), 10, 0.35)
T.place(whoosh(0.3), 24, 0.35)

# 2. butterfly zoom -> drop "un serveur entre filles."
T.place(riser(0.45), 90 - 13, 1.0)
T.place(impact(), 90, 0.6)
T.place(shimmer(1.3), 90, 0.9)
for i in range(10):  # boxed letters "un serveur"
    T.place(tick(), 92 + i * 1.2, 0.6, pan=-0.4 + i * 0.08)
T.place(ding(), 100, 0.5)

# 3. "ici, on…" — clip cuts on the beat
for fr in (150, 165, 180, 195):
    T.place(whoosh(0.22, up=False), fr - 3, 0.7)
    T.place(glitch(), fr, 0.9)
T.place(whoosh(0.3), 152, 0.3)
for fr in (210, 240):
    T.place(whoosh(0.28, up=False), fr - 4, 0.7)
    T.place(glitch(), fr, 0.8)
T.place(pop(1.4), 212, 0.35)
for fr in (270, 300):
    T.place(whoosh(0.25, up=False), fr - 4, 0.5)
    T.place(shutter(), fr, 1.0)
T.place(whoosh(0.35), 330 - 5, 0.7)
for i in range(8):  # channels sliding in
    T.place(tick(), 334 + i * 3, 0.55)
for i in range(8):  # active channel highlight moving
    T.place(pop(1.8), 330 + i * 8, 0.12)

# 4. "et surtout une safe place."
T.place(riser(0.4), 390 - 12, 0.8)
T.place(impact(), 390, 0.5)
T.place(shimmer(1.0, 2600), 390, 0.7)
for i in range(9):
    T.place(tick(), 392 + i * 1.2, 0.5)
for i in range(4):  # pills
    T.place(pop(1.0 + i * 0.12), 390 + 15 + i * 13, 0.7)

# 5. logo reveal
T.place(riser(0.5), 465 - 15, 1.0)
T.place(impact(), 465, 0.65)
T.place(shimmer(1.6, 1800), 465, 1.0)
T.place(whoosh(0.5), 473, 0.35)  # chrome shine sweep
T.place(shimmer(0.8, 3200), 478, 0.4)
for i in range(17):  # "Rivals Girls Club"
    T.place(tick(), 479 + i * 1.2, 0.45, pan=-0.6 + i * 0.075)
for i in range(3):  # event chips
    T.place(pop(0.9 + i * 0.15), 501 + i * 6, 0.6)

# 6. outro
T.place(whoosh(0.4), 570 - 6, 0.6)
T.place(shimmer(1.0, 2000), 574, 0.5)
T.place(ding(), 594, 0.55)
T.place(pop(1.2), 598, 0.7)
T.place(shimmer(0.9, 2800), 600, 0.35)

T.save(sys.argv[1] if len(sys.argv) > 1 else "public/audio/rgc-sfx.wav")
