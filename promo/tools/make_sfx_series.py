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

# ---------- jeux (510) ----------
T = Track(17.0)
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
T.place(pop(1.2), 264, 0.7)
T.place(whoosh(0.35), 330 - 5, 0.5)
T.place(pop(1.1), 344, 0.7)
T.place(pop(1.3), 370, 0.7)
end_card(T, 420)
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

# ---------- ce que ton main dit de toi (510) ----------
T = Track(17.0)
T.place(whoosh(0.4), 4, 0.4)
T.place(shimmer(0.8, 2400), 10, 0.4)
T.place(pop(1.0), 22, 0.7)
for i in range(4):
    s = 60 + i * 90
    T.place(whoosh(0.3), s - 2, 0.6)
    T.place(scratch(), s + 2, 0.15)
    T.place(pop(0.9), s + 14, 0.5)
    T.place(shimmer(0.9, 2600), s + 18, 0.6)
    for k in range(5):
        T.place(tick(), s + 30 + k * 3, 0.35)
    T.place(tick(), s + 36, 0.3)
end_card(T, 420)
T.save(os.path.join(A, "sfx-mains.wav"))

# ---------- 3 trucs que t'entendras jamais (510) ----------
T = Track(17.0)
T.place(whoosh(0.4), 2, 0.4)
for k in range(3):
    T.place(tick(), 18 + k * 1.5, 0.3)
T.place(pop(1.0), 24, 0.7)
for i in range(3):
    s = 60 + i * 90
    for k in range(3):
        T.place(tick(), s + 2 + k * 4, 0.25)
    T.place(pop(1.7), s + 14, 0.6)
    T.place(vine_boom(), s + 36, 0.8)
    T.place(bonk(), s + 37, 0.5)
    T.place(pop(1.1), s + 44, 0.6)
T.place(whoosh(0.35), 330 - 4, 0.5)
for k in range(3):
    T.place(pop(1.0 + k * 0.15), 342 + k * 12, 0.6)
end_card(T, 420)
T.save(os.path.join(A, "sfx-jamais.wav"))

# ---------- tier list des excuses (690) ----------
T = Track(23.0)
T.place(impact(), 0, 0.4)
T.place(whoosh(0.4), 8, 0.4)
for k in range(5):
    T.place(pop(0.9 + k * 0.1), 18 + k * 3, 0.5)
VERDICT = {"S": "s", "A": "ok", "B": "ok", "C": "meh", "F": "no"}
for i, tier in enumerate(["A", "F", "C", "S", "B", "S"]):
    s = 60 + i * 75
    T.place(whoosh(0.22), s - 3, 0.45)
    T.place(pop(1.0), s + 2, 0.5)
    v = VERDICT[tier]
    if v == "s":
        T.place(correct(), s + 20, 0.7)
        T.place(shimmer(0.8, 2600), s + 20, 0.5)
    elif v == "ok":
        T.place(correct(), s + 20, 0.5)
    elif v == "meh":
        T.place(bonk(), s + 20, 0.6)
    else:
        T.place(buzzer(), s + 20, 0.7)
    T.place(whoosh(0.2, up=False), s + 52, 0.4)
    T.place(tick(), s + 62, 0.6)
    T.place(pop(1.3), s + 62, 0.4)
T.place(impact(), 510, 0.4)
T.place(pop(1.1), 534, 0.7)
end_card(T, 600)
T.save(os.path.join(A, "sfx-tier.wav"))

# ---------- pov : t'as enfin trouvé des mates (450) ----------
T = Track(15.0)
T.place(whoosh(0.4), 4, 0.4)
T.place(shutter(), 20, 0.8)
for i in range(4):
    s = 60 + i * 75
    T.place(whoosh(0.3), s - 3, 0.4)
    T.place(shutter(), s + 2, 0.9)
    T.place(tick(), s + 6, 0.4)
    T.place(pop(1.1), s + 10, 0.4)
T.place(join_tone(), 60, 0.5)
T.place(correct(), 60 + 3 * 75 + 40, 0.5)
end_card(T, 360)
T.save(os.path.join(A, "sfx-povteam.wav"))

# ---------- les phrases en voc (500) ----------
T = Track(17.0)
T.place(rec_beep(), 2, 1.0)
T.place(whoosh(0.4), 4, 0.4)
for i in range(7):
    s = 60 + i * 50
    T.place(whoosh(0.2), s - 2, 0.35)
    for k in range(5):
        T.place(tick(), s + 4 + k * 5, 0.25)
    if i > 0:
        T.place(pop(1.0 + i * 0.08), s + 22, 0.55)
T.place(vine_boom(), 60 + 50 + 18, 0.6)
T.place(bonk(), 60 + 100 + 20, 0.6)
end_card(T, 410)
T.save(os.path.join(A, "sfx-phrases.wav"))

# ---------- ce que je pensais vs la réalité (420) ----------
T = Track(14.0)
T.place(whoosh(0.4), 2, 0.4)
T.place(pop(0.9), 8, 0.5)
T.place(pop(1.2), 12, 0.5)
for i in range(3):
    s = 60 + i * 90
    T.place(whoosh(0.3, up=False), s - 3, 0.4)
    T.place(sad_wah()[: int(0.7 * SR)], s + 4, 0.4)
    T.place(riser(0.35), s + 34 - 10, 0.6)
    T.place(impact(), s + 34, 0.45)
    T.place(shimmer(0.8, 2400), s + 34, 0.5)
end_card(T, 330)
T.save(os.path.join(A, "sfx-realite.wav"))

# ---------- les sons de discord (450) ----------
T = Track(15.0)
T.place(whoosh(0.4), 2, 0.4)
for i, snd in enumerate([join_tone(), ping(), mute_click(), leave_tone()]):
    s = 60 + i * 75
    T.place(whoosh(0.25), s - 3, 0.3)
    T.place(snd, s + 14, 1.0)
    if i == 2:
        T.place(vine_boom(), s + 20, 0.5)
    if i == 3:
        T.place(sad_wah()[: int(0.9 * SR)], s + 24, 0.4)
    T.place(pop(1.1), s + 20, 0.4)
end_card(T, 360)
T.save(os.path.join(A, "sfx-sons.wav"))

# ---------- green flags d'une mate (420) ----------
T = Track(14.0)
T.place(whoosh(0.4), 2, 0.4)
T.place(pop(1.0), 10, 0.5)
for i in range(5):
    s = 60 + i * 54
    T.place(bonk(), s + 2, 0.4)
    T.place(pop(1.0 + i * 0.1), s + 4, 0.5)
    T.place(correct(), s + 16, 0.55)
end_card(T, 330)
T.save(os.path.join(A, "sfx-mateflags.wav"))

# ---------- un dimanche sur RGC (450) ----------
T = Track(15.0)
T.place(shimmer(1.5, 1500), 2, 0.5)
T.place(whoosh(0.6), 6, 0.3)
for i in range(4):
    s = 60 + i * 75
    T.place(whoosh(0.6), s - 6, 0.3)
    T.place(ding(), s + 4, 0.25)
T.place(pop(1.1), 60 + 75 + 18, 0.5)
T.place(rec_beep(), 60 + 150 + 4, 0.8)
end_card(T, 360)
T.save(os.path.join(A, "sfx-dimanche.wav"))

# ---------- pov : la vérif vocale (465) ----------
T = Track(15.5)
T.place(ping(), 4, 0.8)
for k in range(3):
    T.place(pop(1.0 + k * 0.15), 14 + k * 8, 0.5)
T.place(pop(1.0), 75 + 14, 0.5)
for k in range(5):
    T.place(heartbeat(), 150 + k * 13, 0.9)
T.place(mute_click(), 225, 0.8)
T.place(pop(1.3), 231, 0.4)
T.place(whoosh(0.3), 225 + 42, 0.6)
T.place(ping(), 225 + 46, 0.7)
T.place(confetti(), 300, 1.0)
T.place(correct(), 300, 0.6)
T.place(shimmer(1.2), 300, 0.6)
T.place(pop(1.1), 312, 0.5)
end_card(T, 375)
T.save(os.path.join(A, "sfx-verif.wav"))

# ---------- ton jeu selon ton signe astro (990) ----------
T = Track(33.0)
T.place(shimmer(1.6, 1800), 2, 0.6)
T.place(whoosh(0.5), 6, 0.3)
for i in range(12):
    s = 60 + i * 70
    T.place(whoosh(0.3), s - 3, 0.35)
    T.place(ding(), s + 2, 0.35)
    for k in range(5):
        T.place(tick(), s + 4 + k * 4, 0.2)
    T.place(pop(1.0 + (i % 4) * 0.1), s + 8, 0.45)
    T.place(shimmer(0.7, 2600 + (i % 3) * 300), s + 22, 0.35)
end_card(T, 900)
T.save(os.path.join(A, "sfx-astro.wav"))
