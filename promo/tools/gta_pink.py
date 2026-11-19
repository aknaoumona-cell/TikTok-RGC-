"""« Filtre rose GTA » façon edits TikTok GTA 6 : voile magenta uniforme, noirs relevés (effet brume/délavé).
Usage: python3 -I gta_pink.py <in> <out> [opacity 0..1, défaut 0.6 = un peu plus transparent que les edits]"""
import sys
import numpy as np
from PIL import Image, ImageEnhance

src, out = sys.argv[1], sys.argv[2]
k = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6

im = Image.open(src).convert("RGB")
im = ImageEnhance.Color(im).enhance(0.8)  # légèrement désaturé
a = np.asarray(im).astype(np.float32) / 255.0
pink = np.array([200, 45, 140], np.float32) / 255.0  # magenta GTA

# luminosity kept, colour pushed to magenta (multiply-ish tint) + haze (lifted blacks)
lum = (a @ np.array([0.299, 0.587, 0.114], np.float32))[..., None]
tinted = np.clip(lum * (0.35 + 1.15 * pink) + 0.16 * pink, 0, 1)
res = a * (1 - k) + tinted * k
res = res * 0.9 + 0.08  # brume : noirs relevés, blancs un peu adoucis
Image.fromarray((np.clip(res, 0, 1) * 255).astype(np.uint8)).save(out, quality=95)
