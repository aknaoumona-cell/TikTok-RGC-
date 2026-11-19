"""GTA VI colour filter: photo kept as is, graded with the sunset gradient (violet top -> pink -> orange bottom).
Usage: python3 -I gta_gradient.py <in> <out> [strength 0..1]"""
import sys
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

src, out = sys.argv[1], sys.argv[2]
k = float(sys.argv[3]) if len(sys.argv) > 3 else 0.6

im = Image.open(src).convert("RGB")
im = ImageEnhance.Contrast(im).enhance(1.06)
a = np.asarray(im).astype(np.float32) / 255.0
h, w = a.shape[:2]

# vertical GTA VI gradient (RGB)
stops = [(0.0, (110, 70, 190)), (0.45, (240, 100, 170)), (1.0, (255, 170, 95))]
y = np.linspace(0, 1, h)
grad = np.zeros((h, 3), np.float32)
for c in range(3):
    grad[:, c] = np.interp(y, [s[0] for s in stops], [s[1][c] for s in stops]) / 255.0
b = np.broadcast_to(grad[:, None, :], a.shape)

# soft-light blend (keeps the photo readable) + a touch of screen for the glow
soft = np.where(b < 0.5, 2 * a * b + a * a * (1 - 2 * b), 2 * a * (1 - b) + np.sqrt(a) * (2 * b - 1))
screen = 1 - (1 - a) * (1 - b)
tint = np.clip(a * (0.3 + 0.85 * b) + 0.06 * b, 0, 1)  # colour the highlights (white table -> sunset)
res = a * (1 - k) + (tint * 0.6 + soft * 0.3 + screen * 0.1) * k

img = Image.fromarray((np.clip(res, 0, 1) * 255).astype(np.uint8))
img = ImageEnhance.Color(img).enhance(1.15)
# soft dreamy glow
glow = img.filter(ImageFilter.GaussianBlur(18))
img = Image.blend(img, Image.fromarray(np.maximum(np.asarray(img), np.asarray(glow))), 0.25)
img.save(out, quality=95)
