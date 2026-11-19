"""Apprend un filtre couleur (avec dégradé vertical) à partir d'une paire original/filtré et l'applique à une autre photo.
Usage: python3 -I match_filter.py <original> <filtré> <photo_cible> <sortie>"""
import sys
import numpy as np
from PIL import Image

o_p, f_p, t_p, out = sys.argv[1:5]
o = Image.open(o_p).convert("RGB")
f = Image.open(f_p).convert("RGB").resize(o.size)
O = np.asarray(o.resize((480, 640))).astype(np.float32) / 255
F = np.asarray(f.resize((480, 640))).astype(np.float32) / 255
BANDS = 16
H = O.shape[0]
coef = np.zeros((BANDS, 3, 4), np.float32)  # out_c = w0*R + w1*G + w2*B + b
for k in range(BANDS):
    sl = slice(k * H // BANDS, (k + 1) * H // BANDS)
    X = O[sl].reshape(-1, 3)
    X = np.hstack([X, np.ones((len(X), 1), np.float32)])
    for c in range(3):
        y = F[sl][..., c].reshape(-1)
        coef[k, c] = np.linalg.lstsq(X, y, rcond=None)[0]
# smooth bands
from numpy import convolve
for c in range(3):
    for j in range(4):
        coef[:, c, j] = np.convolve(np.pad(coef[:, c, j], 2, mode="edge"), np.ones(5) / 5, mode="valid")

t = np.asarray(Image.open(t_p).convert("RGB")).astype(np.float32) / 255
h = t.shape[0]
centers = (np.arange(BANDS) + 0.5) / BANDS
yy = (np.arange(h) + 0.5) / h
res = np.zeros_like(t)
X = np.concatenate([t, np.ones(t.shape[:2] + (1,), np.float32)], axis=2)
for c in range(3):
    w = np.stack([np.interp(yy, centers, coef[:, c, j]) for j in range(4)], axis=1)  # h x 4
    res[..., c] = np.einsum("hwj,hj->hw", X, w)
Image.fromarray((np.clip(res, 0, 1) * 255).astype(np.uint8)).save(out, quality=95)
