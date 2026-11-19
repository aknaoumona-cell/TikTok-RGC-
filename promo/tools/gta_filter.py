"""GTA loading-screen style filter: flat comic shading + bold ink outlines + GTA VI sunset grade.
Usage: python3 -I gta_filter.py <in> <out>"""
import sys
import cv2
import numpy as np

src, out = sys.argv[1], sys.argv[2]
img = cv2.imread(src)
h, w = img.shape[:2]
work = cv2.resize(img, (w // 2, h // 2), interpolation=cv2.INTER_AREA)

# 1) smooth while keeping edges (painted look)
paint = work.copy()
for _ in range(4):
    paint = cv2.bilateralFilter(paint, 9, 60, 9)

# 2) flat colour areas (posterize with k-means)
Z = paint.reshape(-1, 3).astype(np.float32)
crit = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
_, lab, cen = cv2.kmeans(Z, 22, None, crit, 3, cv2.KMEANS_PP_CENTERS)
flat = cen[lab.flatten()].reshape(paint.shape).astype(np.uint8)
flat = cv2.addWeighted(flat, 0.55, paint, 0.45, 0)

# 3) boost saturation / contrast like the GTA artworks
hsv = cv2.cvtColor(flat, cv2.COLOR_BGR2HSV).astype(np.float32)
hsv[..., 1] = np.clip(hsv[..., 1] * 1.5 + 12, 0, 255)
hsv[..., 2] = np.clip((hsv[..., 2] - 128) * 1.12 + 145, 0, 255)
flat = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)

# 4) bold ink outlines
gray = cv2.cvtColor(work, cv2.COLOR_BGR2GRAY)
gray = cv2.medianBlur(gray, 5)
e = cv2.Canny(gray, 50, 130)
e = cv2.dilate(e, np.ones((2, 2), np.uint8))
e = cv2.GaussianBlur(e, (3, 3), 0).astype(np.float32) / 255.0
comic = flat.astype(np.float32) * (1 - 0.8 * e[..., None])

# 5) GTA VI sunset grade: violet top -> pink -> orange bottom, blended in "soft light"
yy = np.linspace(0, 1, comic.shape[0])[:, None]
top = np.array([200, 90, 120], np.float32)  # BGR violet
mid = np.array([170, 110, 255], np.float32)  # pink
bot = np.array([90, 170, 255], np.float32)  # orange
grad = np.where(yy[..., None] < 0.5, top + (mid - top) * (yy[..., None] / 0.5), mid + (bot - mid) * ((yy[..., None] - 0.5) / 0.5))
grad = np.broadcast_to(grad, comic.shape)
a = comic / 255.0
b = grad / 255.0
soft = np.where(b < 0.5, 2 * a * b + a * a * (1 - 2 * b), 2 * a * (1 - b) + np.sqrt(a) * (2 * b - 1))
res = (a * 0.6 + soft * 0.4) * 255
res = res * 1.06 + 6

# 6) vignette
Y, X = np.ogrid[: res.shape[0], : res.shape[1]]
cx, cy = res.shape[1] / 2, res.shape[0] / 2
d = np.sqrt(((X - cx) / cx) ** 2 + ((Y - cy) / cy) ** 2)
res *= np.clip(1.12 - 0.22 * d, 0.75, 1)[..., None]

res = np.clip(res, 0, 255).astype(np.uint8)
res = cv2.resize(res, (w, h), interpolation=cv2.INTER_CUBIC)
res = cv2.filter2D(res, -1, np.array([[0, -0.5, 0], [-0.5, 3, -0.5], [0, -0.5, 0]]))
cv2.imwrite(out, res, [cv2.IMWRITE_JPEG_QUALITY, 95])
