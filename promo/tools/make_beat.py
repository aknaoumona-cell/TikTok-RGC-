"""Generate the original 120 BPM guide track for the RGC promo.

Everything is synthesised here (no samples), so the track is royalty free.
The structure is aligned with the scene timing in src/timeline.ts:
  0.0-3.0  intro (filtered pad + riser)
  3.0      DROP  ("on cherche des bavardes.")
  3.0-13.0 full beat
  13.0-17.0 half-time breakdown (chat bubbles)
  17.0     re-drop (values)
  19.5     impact (logo reveal)
  19.5-25.5 outro
Usage: python3 tools/make_beat.py public/audio/rgc-beat-120.wav
"""
import sys
import wave
import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM
DUR = 25.5
N = int(SR * DUR)
rng = np.random.default_rng(7)


def t_(d):
    return np.arange(int(SR * d)) / SR


def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def kick():
    t = t_(0.45)
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * 7)
    click = rng.standard_normal(len(t)) * np.exp(-t * 300) * 0.3
    return np.tanh((body + click) * 2.2) * 0.9


def clap():
    t = t_(0.35)
    n = rng.standard_normal(len(t))
    env = np.zeros_like(t)
    for k, off in enumerate([0, 0.011, 0.022]):
        env += np.exp(-np.clip(t - off, 0, None) * (90 if k < 2 else 18)) * (t >= off)
    sig = n * env
    # band-pass-ish via difference of smoothings
    sig = np.convolve(sig, np.ones(3) / 3, "same") - np.convolve(sig, np.ones(40) / 40, "same")
    return sig * 0.55


def hat(open_=False):
    t = t_(0.25 if open_ else 0.06)
    n = rng.standard_normal(len(t))
    n = n - np.convolve(n, np.ones(6) / 6, "same")
    return n * np.exp(-t * (14 if open_ else 70)) * 0.22


def saw(f, t, detune=0.0):
    out = np.zeros_like(t)
    for d in (-detune, 0, detune):
        ph = (t * f * (1 + d)) % 1.0
        out += 2 * ph - 1
    return out / 3


def lowpass(x, cutoff):
    # one-pole lowpass, cutoff may be an array
    a = np.exp(-2 * np.pi * np.asarray(cutoff) / SR) * np.ones(len(x))
    y = np.zeros_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc = (1 - a[i]) * x[i] + a[i] * acc
        y[i] = acc
    return y


def reverb(x, secs=1.6, mix=0.25):
    ir_t = t_(secs)
    ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 4)
    ir /= np.sqrt((ir ** 2).sum())
    wet = np.fft.irfft(np.fft.rfft(x, len(x) + len(ir)) * np.fft.rfft(ir, len(x) + len(ir)))[: len(x)]
    return x * (1 - mix) + wet * mix


NOTE = {"A": 55.0, "F": 43.65, "C": 65.41, "G": 49.0, "D": 73.42, "E": 41.2}
PROG = ["A", "F", "C", "G"]  # A minor: Am F C G (one chord per bar)
CHORDS = {"A": [0, 3, 7], "F": [0, 4, 7], "C": [0, 4, 7], "G": [0, 4, 7]}

drums = np.zeros(N)
bass = np.zeros(N)
pad = np.zeros(N)
fx = np.zeros(N)
lead = np.zeros(N)

BAR = 4 * BEAT
nbars = int(np.ceil(DUR / BAR))


def section(tsec):
    if tsec < 3.0:
        return "intro"
    if tsec < 13.0:
        return "full"
    if tsec < 17.0:
        return "half"
    if tsec < 19.5:
        return "full"
    return "outro"


K, C = kick(), clap()
for b in range(nbars * 16):  # 16th grid
    ts = b * BEAT / 4
    if ts >= DUR:
        break
    s = section(ts)
    step = b % 16
    if s == "full":
        if step in (0, 6, 10):
            place(drums, K, ts)
        if step in (4, 12):
            place(drums, C, ts)
        if step % 2 == 0:
            place(drums, hat(), ts, 1.0 if step % 4 == 2 else 0.6)
        bar_i = b // 16
        if bar_i % 2 == 1 and step >= 13:  # 16th hat roll at the end of every 2nd bar
            place(drums, hat(), ts, 0.8)
            place(drums, hat(), ts + BEAT / 8, 0.6)
        if step == 14:
            place(drums, hat(True), ts, 0.7)
    elif s == "half":
        if step == 0:
            place(drums, K, ts)
        if step == 8:
            place(drums, C, ts, 0.9)
        if step % 4 == 2:
            place(drums, hat(), ts, 0.5)
    elif s == "outro":
        if ts < 22.0 and step in (0, 10):
            place(drums, K, ts, 0.9)
        if ts < 22.0 and step == 4 or ts < 22.0 and step == 12:
            place(drums, C, ts, 0.8)
        if ts < 22.0 and step % 2 == 0:
            place(drums, hat(), ts, 0.5)

# 808 bass + pads, one chord per bar
for bar_i in range(nbars):
    ts = bar_i * BAR
    if ts >= DUR:
        break
    root = NOTE[PROG[bar_i % 4]]
    s = section(ts + 0.01)
    t = t_(BAR)
    # pad (always), filtered in intro
    chord = sum(saw(root * 4 * 2 ** (iv / 12), t, 0.006) for iv in CHORDS[PROG[bar_i % 4]])
    chord *= 0.18
    place(pad, chord, ts)
    if s in ("full", "half", "outro") and ts < 23.0:
        for hit, ln in ((0, 1.2), (1.5 * BEAT, 0.5), (2.5 * BEAT, 1.4)):
            tt = t_(ln)
            f = root * (1 + 0.5 * np.exp(-tt * 30))  # slight pitch drop = 808 punch
            ph = 2 * np.pi * np.cumsum(f) / SR
            sig = np.tanh(np.sin(ph) * 2.5) * np.exp(-tt * 2.2) * 0.55
            place(bass, sig, ts + hit)
    # pluck arpeggio on full sections
    if s == "full":
        for k in range(8):
            iv = CHORDS[PROG[bar_i % 4]][k % 3] + (12 if k % 4 == 3 else 0)
            f = root * 8 * 2 ** (iv / 12)
            tt = t_(0.3)
            sig = (np.sign(np.sin(2 * np.pi * f * tt)) * 0.5 + np.sin(2 * np.pi * f * tt)) * np.exp(-tt * 12) * 0.07
            place(lead, sig, ts + k * BEAT / 2)

# pad filter automation: closed in intro, open after the drop, mid in breakdown
tt = np.arange(N) / SR
cut = np.where(tt < 3.0, 300 + 900 * (tt / 3.0) ** 2, np.where((tt >= 13) & (tt < 17), 1100, 2600))
cut = np.where(tt >= 19.5, 2600 - 1800 * np.clip((tt - 19.5) / 6, 0, 1), cut)
pad = lowpass(pad, cut)

# sidechain pump on pad + bass following kicks in full sections
pump = np.ones(N)
for b in range(int(DUR / BEAT)):
    ts = b * BEAT
    if section(ts) == "full":
        i = int(ts * SR)
        ln = int(0.3 * SR)
        j = min(N, i + ln)
        pump[i:j] = np.minimum(pump[i:j], 0.35 + 0.65 * (np.arange(j - i) / ln))
pad *= pump

# risers & impacts
for at, ln in ((3.0, 2.0), (17.0, 1.0)):
    t = t_(ln)
    n = rng.standard_normal(len(t)) * (t / ln) ** 2 * 0.35
    n = lowpass(n, 400 + 7000 * (t / ln) ** 2)
    place(fx, n, at - ln)
for at, g in ((3.0, 1.0), (17.0, 0.7), (19.5, 1.0)):
    t = t_(2.0)
    boom = np.sin(2 * np.pi * (38 + 60 * np.exp(-t * 6)) * t) * np.exp(-t * 2.5) * 0.9
    noise = rng.standard_normal(len(t)) * np.exp(-t * 3) * 0.12
    place(fx, boom + lowpass(noise, 3000), at, g)
# tape-stop style "whoosh down" before the breakdown
t = t_(0.5)
place(fx, np.sin(2 * np.pi * np.cumsum(900 * np.exp(-t * 5)) / SR) * np.exp(-t * 4) * 0.15, 12.6)

mix = drums * 0.95 + bass * 0.85 + reverb(pad, 2.2, 0.35) + reverb(lead, 1.2, 0.3) + reverb(fx, 2.5, 0.3)
# fade in/out
mix *= np.clip(tt / 0.4, 0, 1) * np.clip((DUR - tt) / 1.5, 0, 1)
mix = np.tanh(mix * 1.1)
mix /= np.abs(mix).max() / 0.89

# light stereo width: delay the pad/lead on the right channel
right = np.roll(mix, int(0.008 * SR)) * 0.25 + mix * 0.75
stereo = np.stack([mix, right], 1)
pcm = (stereo * 32767).astype(np.int16)
out = sys.argv[1] if len(sys.argv) > 1 else "public/audio/rgc-beat-120.wav"
with wave.open(out, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote", out, DUR, "s")
