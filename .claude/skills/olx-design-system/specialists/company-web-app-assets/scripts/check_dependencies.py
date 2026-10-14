#!/usr/bin/env python3
"""Check what generate_assets.py needs on this machine and say how to install what is missing."""
import shutil, sys

ok = True
try:
    import PIL
    print(f"✓ Pillow {PIL.__version__}")
except ImportError:
    ok = False
    print("✗ Pillow missing — pip install Pillow")

svg = []
try:
    import cairosvg  # noqa: F401
    svg.append("cairosvg")
except Exception:  # noqa: BLE001  (ImportError, or OSError when libcairo is missing)
    pass
svg += [t for t in ("rsvg-convert", "inkscape") if shutil.which(t)]
if svg:
    print(f"✓ SVG rasteriser: {', '.join(svg)}")
else:
    print("! No SVG rasteriser — PNG marks still work (1024 px or larger). For SVG install one of:\n"
          "    pip install cairosvg        (macOS: brew install cairo first)\n"
          "    brew install librsvg        (gives rsvg-convert)")
sys.exit(0 if ok else 1)
