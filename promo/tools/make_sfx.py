"""Sound-design track for the RGC promo (sound effects only, no music).

Every sound is synthesised here (royalty free) and placed on the exact frame
of the animation it accompanies (timings mirror src/config.ts, 30 fps).
You can lay any TikTok sound / music on top: these effects stay subtle.

Usage: python3 tools/make_sfx.py public/audio/rgc-sfx.wav
"""
import sys
import wave
import numpy as np

SR = 44100
FPS = 30
DUR = 21.5
N = int(SR * DUR)
rng = np.random.default_rng(11)
L = np.zeros(N)
R = np.zeros(N)


def t_(d):
    return np.arange(int(SR * d)) / SR


def lowpass(x, cutoff):
    a = np.exp(-2 * np.pi * np.asarray(cutoff, dtype=float) / SR) * np.ones(len(x))
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def highpass(x, cutoff):
    return x - lowpass(x, cutoff)


def place(sig, frame, gain=1.0, pan=0.0):
    i = int(frame / FPS * SR)
    if i >= N:
        return
    j = min(N, i + len(sig))
    s = sig[: j - i] * gain
    L[i:j] += s * (1 - max(0, pan))
    R[i:j] += s * (1 + min(0, pan))


# ---------------- sound bank ----------------
def pop(pitch=1.0):
    t = t_(0.09)
    f = (500 + 1300 * (1 - np.exp(-t * 60))) * pitch
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 45) * 0.5


def tick():
    t = t_(0.025)
    n = highpass(rng.standard_normal(len(t)), 2500)
    return n * np.exp(-t * 260) * 0.35


def whoosh(d=0.45, up=True):
    t = t_(d)
    n = rng.standard_normal(len(t))
    k = t / d
    env = np.sin(np.pi * k) ** 2
    cut = 500 + 6000 * (k if up else 1 - k)
    return lowpass(n, cut) * env * 0.6


def impact():
    t = t_(1.4)
    boom = np.sin(2 * np.pi * np.cumsum(36 + 90 * np.exp(-t * 9)) / SR) * np.exp(-t * 3.2)
    crack = highpass(rng.standard_normal(len(t)), 1500) * np.exp(-t * 30) * 0.35
    tail = lowpass(rng.standard_normal(len(t)), 2500) * np.exp(-t * 4) * 0.12
    return np.tanh((boom + crack + tail) * 1.6) * 0.8


def shimmer(d=1.1, base=2200):
    t = t_(d)
    out = np.zeros_like(t)
    for k in range(9):
        st = int(k * 0.045 * SR)
        f = base * (1 + 0.25 * k) * (1 + 0.01 * rng.standard_normal())
        tt = t[: len(t) - st]
        out[st:] += np.sin(2 * np.pi * f * tt) * np.exp(-tt * 7) * 0.12
    return out


def ding():
    t = t_(1.2)
    out = sum(np.sin(2 * np.pi * 1760 * m * t) * np.exp(-t * (4 + 3 * m)) * g for m, g in ((1, 0.35), (2.76, 0.12), (5.4, 0.05)))
    return out


def shutter():
    t = t_(0.12)
    a = highpass(rng.standard_normal(len(t)), 1800) * np.exp(-t * 120)
    b = np.zeros_like(t)
    st = int(0.055 * SR)
    b[st:] = highpass(rng.standard_normal(len(t) - st), 1200) * np.exp(-t[: len(t) - st] * 90)
    return (a + b * 0.8) * 0.45


def glitch():
    t = t_(0.07)
    n = rng.standard_normal(len(t))
    n = np.repeat(n[::40], 40)[: len(t)]  # bit-crushed
    return n * np.exp(-t * 40) * 0.18


def rec_beep():
    t = t_(0.09)
    return np.sign(np.sin(2 * np.pi * 1320 * t)) * np.exp(-t * 25) * 0.1


def riser(d=0.5):
    t = t_(d)
    k = t / d
    n = lowpass(rng.standard_normal(len(t)), 300 + 8000 * k ** 2) * k ** 2 * 0.5
    tone = np.sin(2 * np.pi * np.cumsum(300 + 1500 * k ** 2) / SR) * k ** 3 * 0.08
    return n + tone


# ---------------- timeline (frames) ----------------
# 1. hook: voice card + avatars + REC
place(whoosh(0.35), 0, 0.5)
place(pop(0.8), 2, 0.6)
for i in range(6):
    place(pop(1.0 + i * 0.07), 6 + i * 3, 0.35, pan=-0.5 + i * 0.2)
place(rec_beep(), 14, 1.0)
place(rec_beep(), 20, 1.0)
place(whoosh(0.3), 10, 0.35)
place(whoosh(0.3), 24, 0.35)

# 2. butterfly zoom -> drop "un serveur entre filles."
place(riser(0.45), 90 - 13, 1.0)
place(impact(), 90, 0.6)
place(shimmer(1.3), 90, 0.9)
for i in range(10):  # boxed letters "un serveur"
    place(tick(), 92 + i * 1.2, 0.6, pan=-0.4 + i * 0.08)
place(ding(), 100, 0.5)

# 3. "ici, on…" — clip cuts on the beat
for fr in (150, 165, 180, 195):
    place(whoosh(0.22, up=False), fr - 3, 0.7)
    place(glitch(), fr, 0.9)
place(whoosh(0.3), 152, 0.3)
for fr in (210, 240):
    place(whoosh(0.28, up=False), fr - 4, 0.7)
    place(glitch(), fr, 0.8)
place(pop(1.4), 212, 0.35)
for fr in (270, 300):
    place(whoosh(0.25, up=False), fr - 4, 0.5)
    place(shutter(), fr, 1.0)
place(whoosh(0.35), 330 - 5, 0.7)
for i in range(8):  # channels sliding in
    place(tick(), 334 + i * 3, 0.55)
for i in range(8):  # active channel highlight moving
    place(pop(1.8), 330 + i * 8, 0.12)

# 4. "et surtout une safe place."
place(riser(0.4), 390 - 12, 0.8)
place(impact(), 390, 0.5)
place(shimmer(1.0, 2600), 390, 0.7)
for i in range(9):
    place(tick(), 392 + i * 1.2, 0.5)
for i in range(4):  # pills
    place(pop(1.0 + i * 0.12), 390 + 15 + i * 13, 0.7)

# 5. logo reveal
place(riser(0.5), 465 - 15, 1.0)
place(impact(), 465, 0.65)
place(shimmer(1.6, 1800), 465, 1.0)
place(whoosh(0.5), 473, 0.35)  # chrome shine sweep
place(shimmer(0.8, 3200), 478, 0.4)
for i in range(17):  # "Rivals Girls Club"
    place(tick(), 479 + i * 1.2, 0.45, pan=-0.6 + i * 0.075)
for i in range(3):  # event chips
    place(pop(0.9 + i * 0.15), 501 + i * 6, 0.6)

# 6. outro
place(whoosh(0.4), 570 - 6, 0.6)
place(shimmer(1.0, 2000), 574, 0.5)
place(ding(), 594, 0.55)
place(pop(1.2), 598, 0.7)
place(shimmer(0.9, 2800), 600, 0.35)

mix = np.stack([L, R], 1)
mix = np.tanh(mix * 1.2)
mix /= np.abs(mix).max() / 0.85
pcm = (mix * 32767).astype(np.int16)
out = sys.argv[1] if len(sys.argv) > 1 else "public/audio/rgc-sfx.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", out)
