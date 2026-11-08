"""Lists every visual asset (clips/images/memes) used by more than one video.
Usage: python3 tools/check_reuse.py [src/videos/NewVideo.tsx]
With a file argument, only reports assets of that file that are already used elsewhere.
"""
import re
import sys
import glob
import collections

ASSET = re.compile(r'"((?:clips|memes|ingame|heroes|gameplay|cozy|astro|server)/[^"]+)"')
files = sorted(glob.glob("src/videos/*.tsx")) + ["src/config.ts"]
uses = collections.defaultdict(set)
for f in files:
    for a in ASSET.findall(open(f).read()):
        uses[a].add(f.split("/")[-1])

target = sys.argv[1].split("/")[-1] if len(sys.argv) > 1 else None
bad = 0
for a, fs in sorted(uses.items()):
    if target:
        if target in fs and len(fs) > 1:
            bad += 1
            print(f"DÉJÀ UTILISÉ  {a}  ->  {', '.join(sorted(fs - {target}))}")
    elif len(fs) > 1:
        print(f"{a}: {', '.join(sorted(fs))}")
if target:
    print("OK, aucun visuel réutilisé" if bad == 0 else f"{bad} visuel(s) déjà utilisé(s)")
