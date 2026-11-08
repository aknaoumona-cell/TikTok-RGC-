"""Shared synthesised sound-effect bank for RGC TikToks (royalty free).

Usage from a timeline script:
    from sfxlib import *
    track = Track(dur_seconds)
    track.place(impact(), frame, gain)
    track.save("public/audio/xxx.wav")
"""
import wave
import numpy as np

SR = 44100
FPS = 30
rng = np.random.default_rng(11)


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


class Track:
    def __init__(self, dur):
        self.n = int(SR * dur)
        self.L = np.zeros(self.n)
        self.R = np.zeros(self.n)

    def place(self, sig, frame, gain=1.0, pan=0.0):
        i = int(frame / FPS * SR)
        if i >= self.n:
            return
        j = min(self.n, i + len(sig))
        s = sig[: j - i] * gain
        self.L[i:j] += s * (1 - max(0, pan))
        self.R[i:j] += s * (1 + min(0, pan))

    def save(self, out):
        mix = np.stack([self.L, self.R], 1)
        mix = np.tanh(mix * 1.2)
        mix /= np.abs(mix).max() / 0.85
        pcm = (mix * 32767).astype(np.int16)
        with wave.open(out, "wb") as w:
            w.setnchannels(2)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(pcm.tobytes())
        print("wrote", out)


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


