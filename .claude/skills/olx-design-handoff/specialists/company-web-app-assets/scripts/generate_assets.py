#!/usr/bin/env python3
"""
Generate a hand-off kit of favicons, PWA icons, iOS app icons, Android launcher icons and the
small extras dev teams ask for (notification icon, Android 12 splash icon, Play Store icon,
social share images, environment-badged builds) from ONE config file.

    python3 generate_assets.py --config asset-config.json [--out DIR] [--root DIR]

The config is what the skill's intake produces (see ../SKILL.md and ../products/_new-product.json).
Relative paths in the config resolve against --root (default: the current directory).

Every file is checked after it is written (validate_assets.py): sizes, alpha where a platform
forbids it, safe zones, notification-icon colour, contrast and file weight. The kit's README says
READY or NOT READY with the reasons, so nothing reaches a dev team on a silent failure.

Pillow is the only hard dependency. SVG input needs one of: cairosvg (pip), rsvg-convert
(librsvg) or inkscape. Run check_dependencies.py first on a new machine.
"""
import argparse, datetime, hashlib, io, json, math, os, pathlib, shutil, subprocess, sys

try:
    from PIL import Image, ImageDraw, ImageFont, ImageOps
except ImportError:  # pragma: no cover
    sys.exit("Pillow is required: pip install Pillow")

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import validate_assets as V  # noqa: E402

SKILL_NAME = HERE.parent.name  # the installed skill's folder name, used in generated files
MASTER = 2048  # px the mark is rasterised at before any downscale

# ---------------------------------------------------------------------------------------------
# Platform numbers. Sources and reasoning: ../references/*.md. Change them there first.
# ---------------------------------------------------------------------------------------------
ANDROID_DENSITIES = {"mdpi": 1.0, "hdpi": 1.5, "xhdpi": 2.0, "xxhdpi": 3.0, "xxxhdpi": 4.0}
ADAPTIVE_DP = 108          # full adaptive layer
ADAPTIVE_VIEWPORT_DP = 72  # what a launcher mask can show
ADAPTIVE_SAFE_DP = 66      # diameter every launcher mask keeps
LEGACY_DP = 48
NOTIFICATION_DP = 24
NOTIFICATION_LIVE_DP = 20  # Material system-icon live area inside the 24 dp grid
SPLASH_DP = 288            # Android 12+ splash icon without icon background
SPLASH_SAFE_DP = 192       # its visible circle
PLAY_ICON = 512
MASKABLE_SAFE_RADIUS = 0.40  # W3C manifest: minimum safe zone is a centred circle, radius 40 %
IOS_MASTER = 1024
IOS_LEGACY = [  # (idiom, size pt, scale) — the classic "All Sizes" asset catalogue
    ("iphone", "20x20", 2), ("iphone", "20x20", 3), ("iphone", "29x29", 2), ("iphone", "29x29", 3),
    ("iphone", "40x40", 2), ("iphone", "40x40", 3), ("iphone", "60x60", 2), ("iphone", "60x60", 3),
    ("ipad", "20x20", 1), ("ipad", "20x20", 2), ("ipad", "29x29", 1), ("ipad", "29x29", 2),
    ("ipad", "40x40", 1), ("ipad", "40x40", 2), ("ipad", "76x76", 1), ("ipad", "76x76", 2),
    ("ipad", "83.5x83.5", 2), ("ios-marketing", "1024x1024", 1),
]
FAVICON_PNG = [16, 32, 48, 96]
FAVICON_ICO = [16, 32, 48]
APPLE_TOUCH = 180
PWA_SIZES = [192, 512]
SOCIAL = {"og-image.png": (1200, 630), "og-square.png": (1200, 1200)}


# ---------------------------------------------------------------------------------------------
# Colour and image helpers
# ---------------------------------------------------------------------------------------------
def rgba(c, default=(255, 255, 255, 255)):
    if c is None:
        return default
    if isinstance(c, (list, tuple)):
        return tuple(c) + ((255,) if len(c) == 3 else ())
    s = str(c).strip()
    if s.lower() == "transparent":
        return (0, 0, 0, 0)
    s = s.lstrip("#")
    if len(s) == 3:
        s = "".join(ch * 2 for ch in s)
    if len(s) not in (6, 8):
        raise SystemExit(f"Colour {c!r} is not a hex colour like #DE1F26")
    vals = [int(s[i:i + 2], 16) for i in range(0, len(s), 2)]
    return tuple(vals) + ((255,) if len(vals) == 3 else ())


def hexc(c):
    return "#%02X%02X%02X" % rgba(c)[:3]


def rasterise_svg(path, longest):
    """Render an SVG so its longest side is `longest` px. Tries cairosvg, rsvg-convert, inkscape."""
    errors = []
    try:
        import cairosvg  # type: ignore
        first = Image.open(io.BytesIO(cairosvg.svg2png(url=str(path))))
        scale = longest / max(first.size)
        return Image.open(io.BytesIO(cairosvg.svg2png(url=str(path), scale=scale))).convert("RGBA")
    except ImportError:
        errors.append("cairosvg not installed")
    except Exception as e:  # noqa: BLE001
        errors.append(f"cairosvg failed: {e}")
    tmp = pathlib.Path(os.environ.get("TMPDIR", "/tmp")) / f"wag-{os.getpid()}.png"
    for cmd in (["rsvg-convert", "-a", "-w", str(longest), "-h", str(longest), "-o", str(tmp), str(path)],
                ["inkscape", str(path), "--export-type=png", f"--export-filename={tmp}", f"--export-width={longest}"]):
        if shutil.which(cmd[0]):
            try:
                subprocess.run(cmd, check=True, capture_output=True)
                img = Image.open(tmp).convert("RGBA")
                tmp.unlink(missing_ok=True)
                if max(img.size) != longest:  # inkscape fixes width only
                    s = longest / max(img.size)
                    img = img.resize((round(img.width * s), round(img.height * s)), Image.LANCZOS)
                return img
            except Exception as e:  # noqa: BLE001
                errors.append(f"{cmd[0]} failed: {e}")
        else:
            errors.append(f"{cmd[0]} not found")
    raise SystemExit(f"Cannot rasterise {path}: " + "; ".join(errors) +
                     "\nInstall one: pip install cairosvg (macOS: brew install cairo first) or brew install librsvg.")


def load_mark(path, root):
    """Load a mark (SVG or PNG) as RGBA, trimmed to its visible pixels."""
    if not path:
        return None
    p = (root / path) if not pathlib.Path(path).is_absolute() else pathlib.Path(path)
    if not p.exists():
        raise SystemExit(f"Mark not found: {p}")
    img = rasterise_svg(p, MASTER) if p.suffix.lower() == ".svg" else Image.open(p).convert("RGBA")
    if p.suffix.lower() != ".svg" and max(img.size) < 1024:
        print(f"  ! {p.name} is {img.size[0]}x{img.size[1]}: below 1024 px, large icons will be soft. Ask for an SVG.")
    box = img.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if not box:
        raise SystemExit(f"{p.name} has no visible pixels (fully transparent).")
    if img.getchannel("A").getextrema()[0] == 255:
        print(f"  ! {p.name} has no transparency: the mark carries its own background. "
              "Adaptive / maskable / dark icons need a transparent mark.")
    return img.crop(box)


def mark_radius(mark):
    """Distance from the mark's centre to its farthest visible pixel, in mark pixels."""
    a = mark.getchannel("A")
    s = min(1.0, 512 / max(a.size))
    small = a.resize((max(1, round(a.width * s)), max(1, round(a.height * s))), Image.BILINEAR) if s < 1 else a
    w, h = small.size
    cx, cy = w / 2, h / 2
    px = small.load()
    best = 0.0
    for y in range(h):
        for x in range(w):
            if px[x, y] > 24:
                d = (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2
                if d > best:
                    best = d
    return math.sqrt(best) / s


def scale_to(img, w, h):
    return img.resize((max(1, round(w)), max(1, round(h))), Image.LANCZOS, reducing_gap=3.0)


def place(mark, size, how, frac, cy=0.5):
    """Transparent size×size layer with `mark` centred.
    how='box'    — longest side of the mark = frac × size
    how='circle' — farthest visible pixel sits at frac × size from the centre (a safe-zone fit)"""
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    if how == "box":
        s = frac * size / max(mark.size)
    else:
        s = frac * size / mark_radius(mark)
    m = scale_to(mark, mark.width * s, mark.height * s)
    layer.alpha_composite(m, (round((size - m.width) / 2), round(size * cy - m.height / 2)))
    return layer


def background(spec, size, root):
    """spec: '#hex' | {'color': '#hex'} | {'image': path} | {'gradient': ['#a', '#b']} (top→bottom)."""
    if isinstance(spec, dict) and spec.get("image"):
        src = load_raw(spec["image"], root, size)
        return ImageOps.fit(src, (size, size), Image.LANCZOS)
    if isinstance(spec, dict) and spec.get("gradient"):
        a, b = rgba(spec["gradient"][0]), rgba(spec["gradient"][1])
        g = Image.new("RGBA", (1, 256))
        for y in range(256):
            t = y / 255
            g.putpixel((0, y), tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(4)))
        return g.resize((size, size), Image.BICUBIC)
    colour = spec.get("color") if isinstance(spec, dict) else spec
    return Image.new("RGBA", (size, size), rgba(colour))


def load_raw(path, root, longest):
    p = (root / path) if not pathlib.Path(path).is_absolute() else pathlib.Path(path)
    return rasterise_svg(p, longest) if p.suffix.lower() == ".svg" else Image.open(p).convert("RGBA")


def silhouette(mark, colour=(255, 255, 255, 255)):
    """Single-colour version of a mark from its alpha (monochrome / notification / tinted)."""
    out = Image.new("RGBA", mark.size, colour)
    out.putalpha(mark.getchannel("A"))
    return out


def shape_mask(size, shape, ss=4):
    big = size * ss
    m = Image.new("L", (big, big), 0)
    d = ImageDraw.Draw(m)
    if shape == "circle":
        d.ellipse((0, 0, big - 1, big - 1), fill=255)
    elif shape == "square":
        d.rectangle((0, 0, big, big), fill=255)
    else:  # rounded; number = corner radius as a fraction of size
        r = float(shape) if isinstance(shape, (int, float)) else 0.2237
        d.rounded_rectangle((0, 0, big - 1, big - 1), radius=round(big * r), fill=255)
    return m.resize((size, size), Image.LANCZOS)


def masked(img, shape):
    out = img.copy()
    out.putalpha(Image.composite(img.getchannel("A"), Image.new("L", img.size, 0), shape_mask(img.width, shape)))
    return out


def opaque(img, matte=(255, 255, 255)):
    """Flatten onto a matte and drop the alpha channel (iOS and apple-touch-icon reject alpha)."""
    base = Image.new("RGBA", img.size, matte + (255,))
    base.alpha_composite(img)
    return base.convert("RGB")


def badge(img, label, colour, text_colour, font_path, root, band=(0.66, 0.84)):
    """Draw an environment band (STG, BETA, DEV…) across an icon. For internal builds only."""
    out = img.copy().convert("RGBA")
    w, h = out.size
    d = ImageDraw.Draw(out)
    y0, y1 = round(h * band[0]), round(h * band[1])
    d.rectangle((0, y0, w, y1), fill=rgba(colour))
    size = round((y1 - y0) * 0.62)
    try:
        font = ImageFont.truetype(str(root / font_path), size) if font_path else ImageFont.load_default(size=size)
    except Exception:  # noqa: BLE001
        font = ImageFont.load_default(size=size)
    tb = d.textbbox((0, 0), label, font=font)
    d.text(((w - (tb[2] - tb[0])) / 2 - tb[0], (y0 + y1) / 2 - (tb[3] + tb[1]) / 2), label,
           font=font, fill=rgba(text_colour))
    return out


# ---------------------------------------------------------------------------------------------
# Writer that remembers every file for the manifest and the validator
# ---------------------------------------------------------------------------------------------
class Kit:
    def __init__(self, out):
        self.out = out
        self.files = []  # dicts: path, kind, expect…

    def save(self, img, rel, **meta):
        p = self.out / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        if rel.endswith(".ico"):
            img.save(p, format="ICO", sizes=[(s, s) for s in meta["ico_sizes"]])
        else:
            img.save(p, format="PNG", optimize=True)
        self.files.append({"path": rel, **meta})
        return p

    def text(self, body, rel, **meta):
        p = self.out / rel
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(body, encoding="utf-8")
        self.files.append({"path": rel, **meta})
        return p


# ---------------------------------------------------------------------------------------------
# Builders
# ---------------------------------------------------------------------------------------------
def build_web(cfg, kit, marks, root):
    web = cfg.get("web", {})
    bg = cfg["background"]
    fav_mark = marks["favicon"]
    style = web.get("faviconStyle", "transparent")  # transparent | tile
    if style == "tile":
        tile = background(bg, 512, root)
        tile.alpha_composite(place(fav_mark, 512, "box", web.get("faviconTileFill", 0.70)))
        fav_master = masked(tile, web.get("faviconTileRadius", 0.22))
    else:
        fav_master = place(fav_mark, 512, "box", web.get("faviconFill", 0.94))
    for s in FAVICON_PNG:
        kit.save(scale_to(fav_master, s, s), f"web/favicon-{s}x{s}.png", kind="favicon", size=s)
    kit.save(fav_master, "web/favicon.ico", kind="ico", ico_sizes=FAVICON_ICO)

    # SVG favicon — only from an SVG source, with an optional dark-tab variant.
    src = cfg["marks"].get("favicon") or cfg["marks"]["mark"]
    if src.lower().endswith(".svg") and style == "transparent":
        light = (root / src).read_text(encoding="utf-8")
        dark_src = web.get("faviconDarkMark")
        kit.text(svg_favicon(light, (root / dark_src).read_text(encoding="utf-8") if dark_src else None),
                 "web/favicon.svg", kind="svg")

    # apple-touch-icon: opaque, iOS rounds it
    kit.save(opaque(marks["ios_light"].resize((APPLE_TOUCH, APPLE_TOUCH), Image.LANCZOS)),
             "web/apple-touch-icon.png", kind="opaque", size=APPLE_TOUCH)

    # PWA icons: "any" (shape baked in) and "maskable" (full bleed, safe zone)
    any_master = background(bg, 1024, root)
    any_master.alpha_composite(place(marks["mark"], 1024, "box", web.get("anyFill", cfg["ios"].get("fill", 0.60))))
    shape = web.get("anyShape", 0.2237)
    any_master = any_master if shape == "square" else masked(any_master, shape)
    mask_master = background(bg, 1024, root)
    mask_master.alpha_composite(place(marks["mark"], 1024, "circle",
                                      MASKABLE_SAFE_RADIUS * web.get("maskableFill", 0.90)))
    for s in PWA_SIZES:
        kit.save(scale_to(any_master, s, s), f"web/web-app-manifest-{s}x{s}.png", kind="pwa-any", size=s)
        kit.save(scale_to(mask_master, s, s).convert("RGB"), f"web/web-app-manifest-maskable-{s}x{s}.png",
                 kind="maskable", size=s, safe_radius=MASKABLE_SAFE_RADIUS, layer_mark_frac=MASKABLE_SAFE_RADIUS)

    name, short = cfg["name"], cfg.get("shortName", cfg["name"])
    theme = hexc(web.get("themeColor", bg.get("color") if isinstance(bg, dict) else bg) or "#FFFFFF")
    manifest = {
        "name": name, "short_name": short,
        "icons": [{"src": f"/web-app-manifest-{s}x{s}.png", "sizes": f"{s}x{s}", "type": "image/png", "purpose": "any"}
                  for s in PWA_SIZES] +
                 [{"src": f"/web-app-manifest-maskable-{s}x{s}.png", "sizes": f"{s}x{s}", "type": "image/png",
                   "purpose": "maskable"} for s in PWA_SIZES],
        "theme_color": theme,
        "background_color": hexc(web.get("backgroundColor", theme)),
        "display": web.get("display", "standalone"),
        "start_url": web.get("startUrl", "/"),
    }
    kit.text(json.dumps(manifest, indent=2) + "\n", "web/site.webmanifest", kind="manifest")
    has_svg = any(f["path"] == "web/favicon.svg" for f in kit.files)
    snippet = [
        f"<!-- Favicons and app icons: generated by {SKILL_NAME}. Files go in the site root. -->",
        '<link rel="icon" href="/favicon.ico" sizes="48x48">',
        *(['<link rel="icon" href="/favicon.svg" type="image/svg+xml">'] if has_svg else []),
        '<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">',
        '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
        f'<meta name="apple-mobile-web-app-title" content="{short}">',
        '<link rel="manifest" href="/site.webmanifest">',
        f'<meta name="theme-color" content="{theme}">',
    ]
    kit.text("\n".join(snippet) + "\n", "web/head-snippet.html", kind="snippet")


def svg_favicon(light, dark=None):
    """favicon.svg: the light mark, plus a dark-tab variant switched by prefers-color-scheme."""
    if not dark:
        return light
    def inner(svg, cls):
        start = svg.index("<svg")
        return svg[start:].replace("<svg", f'<svg class="{cls}" width="100%" height="100%"', 1)
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
            "<style>.d{display:none}@media (prefers-color-scheme:dark){.l{display:none}.d{display:inline}}</style>"
            f"{inner(light, 'l')}{inner(dark, 'd')}</svg>\n")


def build_ios(cfg, kit, marks, root, env=None):
    ios = cfg.get("ios", {})
    folder = f"ios/AppIcon{'-' + env['name'] if env else ''}.appiconset"
    light = marks["ios_light"]
    if env:
        light = badge(light, env["label"], env["color"], env.get("textColor", "#FFFFFF"), cfg.get("badgeFont"), root)
    images = []
    kit.save(opaque(light), f"{folder}/AppIcon-1024.png", kind="ios-opaque", size=IOS_MASTER)
    images.append({"filename": "AppIcon-1024.png", "idiom": "universal", "platform": "ios", "size": "1024x1024"})
    all_sizes = ios.get("mode", "single") == "all-sizes"
    if not env and not all_sizes:  # dark and tinted exist only in the single-size catalogue (Xcode 16+)
        for appearance in ios.get("appearances", ["dark", "tinted"]):
            img = marks[f"ios_{appearance}"]
            fname = f"AppIcon-1024-{appearance}.png"
            if appearance == "dark" and ios.get("darkTransparent"):
                kit.save(img, f"{folder}/{fname}", kind="ios-dark-transparent", size=IOS_MASTER)
            else:
                kit.save(opaque(img, (0, 0, 0)), f"{folder}/{fname}", kind="ios-opaque", size=IOS_MASTER)
            images.append({"appearances": [{"appearance": "luminosity", "value": appearance}],
                           "filename": fname, "idiom": "universal", "platform": "ios", "size": "1024x1024"})
    if all_sizes:
        images = []  # the legacy catalogue lists every slot; it does not mix with the single-size entry
        for idiom, pt, scale in IOS_LEGACY:
            px = round(float(pt.split("x")[0]) * scale)
            fname = f"AppIcon-{pt.split('x')[0]}@{scale}x{'-ipad' if idiom == 'ipad' else ''}.png"
            if idiom == "ios-marketing":
                fname = "AppIcon-1024.png"
            else:
                kit.save(opaque(scale_to(light, px, px)), f"{folder}/{fname}", kind="ios-opaque", size=px)
            images.append({"filename": fname, "idiom": idiom, "scale": f"{scale}x", "size": pt})
    contents = {"images": images, "info": {"author": "xcode", "version": 1}}
    kit.text(json.dumps(contents, indent=2) + "\n", f"{folder}/Contents.json", kind="contents")

    if env or not ios.get("iconComposerLayers", True):
        return
    # Layers for Icon Composer (Xcode 26+, Liquid Glass): background + foreground on a 1024 canvas.
    kit.save(background(cfg["background"], IOS_MASTER, root).convert("RGB"),
             "ios/icon-composer/background.png", kind="layer", size=IOS_MASTER)
    kit.save(place(marks["mark"], IOS_MASTER, "box", ios.get("fill", 0.60)),
             "ios/icon-composer/foreground.png", kind="layer", size=IOS_MASTER)
    src = root / cfg["marks"]["mark"]
    if src.suffix.lower() == ".svg":
        shutil.copy(src, kit.out / "ios/icon-composer/foreground-source.svg")
        kit.files.append({"path": "ios/icon-composer/foreground-source.svg", "kind": "svg"})


def build_android(cfg, kit, marks, root, env=None):
    a = cfg.get("android", {})
    res = f"android/{'src-' + env['name'] + '/' if env else ''}res"
    fill = a.get("fill", 0.92)  # share of the 66 dp safe circle the mark may use
    big = ADAPTIVE_DP * 12      # 1296 px master, downscaled per density
    radius = (ADAPTIVE_SAFE_DP / 2) / ADAPTIVE_DP * fill
    fg = place(marks["mark"], big, "circle", radius)
    if env:
        fg = badge(fg, env["label"], env["color"], env.get("textColor", "#FFFFFF"), cfg.get("badgeFont"), root,
                   band=(0.62, 0.74))
    bg_spec = cfg["background"]
    bg_is_colour = not (isinstance(bg_spec, dict) and (bg_spec.get("image") or bg_spec.get("gradient")))
    bg = background(bg_spec, big, root)
    mono = place(marks["monochrome"], big, "circle", radius)
    full = bg.copy()
    full.alpha_composite(fg)
    vp = round(big * ADAPTIVE_VIEWPORT_DP / ADAPTIVE_DP)
    off = (big - vp) // 2
    visible = full.crop((off, off, off + vp, off + vp))
    legacy_sq = Image.new("RGBA", (vp, vp), (0, 0, 0, 0))
    k = a.get("legacySquare", 152 / 192)  # Material product-icon keyline: square 152 of 192
    inner = scale_to(masked(visible, a.get("legacyRadius", 0.09)), vp * k, vp * k)
    legacy_sq.alpha_composite(inner, ((vp - inner.width) // 2, (vp - inner.height) // 2))
    legacy_round = Image.new("RGBA", (vp, vp), (0, 0, 0, 0))
    kc = 176 / 192  # Material keyline circle
    inner_r = scale_to(masked(visible, "circle"), vp * kc, vp * kc)
    legacy_round.alpha_composite(inner_r, ((vp - inner_r.width) // 2, (vp - inner_r.height) // 2))

    for dens, m in ANDROID_DENSITIES.items():
        lay = round(ADAPTIVE_DP * m)
        kit.save(scale_to(fg, lay, lay), f"{res}/mipmap-{dens}/ic_launcher_foreground.png", kind="adaptive-fg",
                 size=lay, safe_radius=ADAPTIVE_SAFE_DP / 2 / ADAPTIVE_DP, badged=bool(env))
        if not bg_is_colour:
            kit.save(scale_to(bg, lay, lay).convert("RGB"), f"{res}/mipmap-{dens}/ic_launcher_background.png",
                     kind="adaptive-bg", size=lay)
        if a.get("monochrome", True) and not env:
            kit.save(scale_to(mono, lay, lay), f"{res}/mipmap-{dens}/ic_launcher_monochrome.png",
                     kind="monochrome", size=lay, safe_radius=ADAPTIVE_SAFE_DP / 2 / ADAPTIVE_DP)
        if a.get("legacy", True):
            leg = round(LEGACY_DP * m)
            kit.save(scale_to(legacy_sq, leg, leg), f"{res}/mipmap-{dens}/ic_launcher.png", kind="legacy", size=leg)
            if a.get("round", True):
                kit.save(scale_to(legacy_round, leg, leg), f"{res}/mipmap-{dens}/ic_launcher_round.png",
                         kind="legacy", size=leg)
    bg_ref = "@color/ic_launcher_background" if bg_is_colour else "@mipmap/ic_launcher_background"
    mono_line = ('\n    <monochrome android:drawable="@mipmap/ic_launcher_monochrome" />'
                 if a.get("monochrome", True) and not env else "")
    xml = ('<?xml version="1.0" encoding="utf-8"?>\n'
           '<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n'
           f'    <background android:drawable="{bg_ref}" />\n'
           f'    <foreground android:drawable="@mipmap/ic_launcher_foreground" />{mono_line}\n'
           '</adaptive-icon>\n')
    kit.text(xml, f"{res}/mipmap-anydpi-v26/ic_launcher.xml", kind="xml")
    if a.get("round", True):
        kit.text(xml, f"{res}/mipmap-anydpi-v26/ic_launcher_round.xml", kind="xml")
    if bg_is_colour:
        colour = bg_spec.get("color") if isinstance(bg_spec, dict) else bg_spec
        kit.text('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n'
                 f'    <color name="ic_launcher_background">{hexc(colour)}</color>\n</resources>\n',
                 f"{res}/values/ic_launcher_background.xml", kind="xml")
    if env:
        return

    # Play shows the visible 72 dp square and applies its own corner mask and shadow
    play = scale_to(full.crop((off, off, off + vp, off + vp)), PLAY_ICON, PLAY_ICON)
    kit.save(play, "android/play-store/ic_launcher-playstore.png", kind="play", size=PLAY_ICON)

    if a.get("notification", True):
        n_master = place(silhouette(marks["monochrome"]), 960, "box", NOTIFICATION_LIVE_DP / NOTIFICATION_DP)
        name = a.get("notificationName", "ic_stat_notify")
        for dens, m in ANDROID_DENSITIES.items():
            s = round(NOTIFICATION_DP * m)
            kit.save(scale_to(n_master, s, s), f"{res}/drawable-{dens}/{name}.png", kind="notification", size=s)
    if a.get("splash", True):
        s_master = place(marks["mark"], 1440, "circle", (SPLASH_SAFE_DP / 2) / SPLASH_DP * a.get("splashFill", 0.90))
        for dens, m in ANDROID_DENSITIES.items():
            s = round(SPLASH_DP * m)
            kit.save(scale_to(s_master, s, s), f"{res}/drawable-{dens}/splash_icon.png", kind="splash", size=s,
                     safe_radius=(SPLASH_SAFE_DP / 2) / SPLASH_DP)


def build_social(cfg, kit, marks, root):
    soc = cfg.get("social", {})
    logo = marks.get("social") or marks["mark"]
    for fname, (w, h) in SOCIAL.items():
        canvas = background(soc.get("background", cfg["background"]), max(w, h), root)
        canvas = ImageOps.fit(canvas, (w, h), Image.LANCZOS)
        s = min(w * soc.get("maxWidth", 0.56) / logo.width, h * soc.get("maxHeight", 0.40) / logo.height)
        m = scale_to(logo, logo.width * s, logo.height * s)
        canvas.alpha_composite(m, ((w - m.width) // 2, (h - m.height) // 2))
        kit.save(canvas.convert("RGB"), f"social/{fname}", kind="social", w=w, h=h)
    alt = soc.get("alt", cfg["name"])
    kit.text("\n".join([
        '<meta property="og:image" content="https://YOUR-DOMAIN/og-image.png">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        f'<meta property="og:image:alt" content="{alt}">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:image" content="https://YOUR-DOMAIN/og-image.png">',
        f'<meta name="twitter:image:alt" content="{alt}">']) + "\n", "social/meta-snippet.html", kind="snippet")


# ---------------------------------------------------------------------------------------------
# Preview contact sheet
# ---------------------------------------------------------------------------------------------
def write_preview(kit, cfg):
    has = {f["path"] for f in kit.files}
    def img(p, size, style=""):
        return f'<img src="{p}" width="{size}" height="{size}" style="{style}" alt="">' if p in has else ""
    fg = "android/res/mipmap-xxxhdpi/ic_launcher_foreground.png"
    bgc = cfg["background"]
    bg_css = (f"background:{hexc(bgc['color'] if isinstance(bgc, dict) and 'color' in bgc else bgc)}"
              if not (isinstance(bgc, dict) and (bgc.get("image") or bgc.get("gradient"))) else
              "background:url(android/res/mipmap-xxxhdpi/ic_launcher_background.png) center/150%")
    masks = {"Circle": "50%", "Squircle": "30%", "Rounded square": "16%", "Teardrop": "50% 50% 50% 16%"}
    android = "".join(
        f'<figure><div class="ad" style="{bg_css};border-radius:{r}"><img src="{fg}" alt=""></div>'
        f"<figcaption>{n}</figcaption></figure>" for n, r in masks.items()) if fg in has else ""
    ios = "".join(f'<figure>{img(f"ios/AppIcon.appiconset/AppIcon-1024{sfx}.png", 120, "border-radius:22.37%")}'
                  f"<figcaption>{lab}</figcaption></figure>"
                  for sfx, lab in (("", "iOS light"), ("-dark", "iOS dark"), ("-tinted", "iOS tinted (before tint)"))
                  if f"ios/AppIcon.appiconset/AppIcon-1024{sfx}.png" in has)
    tabs = "".join(
        f'<div class="tab" style="background:{b};color:{c}">{img("web/favicon-32x32.png", 16)}'
        f'<span>{cfg["name"]}</span></div>' for b, c in (("#FFFFFF", "#202124"), ("#DEE1E6", "#202124"),
                                                          ("#35363A", "#E8EAED"), ("#202124", "#E8EAED")))
    sizes = "".join(f"<figure>{img(f'web/favicon-{s}x{s}.png', s)}<figcaption>{s}</figcaption></figure>"
                    for s in FAVICON_PNG)
    pwa = "".join(f'<figure>{img(p, 120, st)}<figcaption>{lab}</figcaption></figure>' for p, st, lab in (
        ("web/web-app-manifest-512x512.png", "", "PWA any"),
        ("web/web-app-manifest-maskable-512x512.png", "border-radius:50%", "PWA maskable, circle"),
        ("web/web-app-manifest-maskable-512x512.png", "border-radius:18%", "PWA maskable, rounded"),
        ("web/apple-touch-icon.png", "border-radius:22.37%", "apple-touch-icon")))
    extra = "".join(f'<figure>{img(p, 96, st)}<figcaption>{lab}</figcaption></figure>' for p, st, lab in (
        ("android/res/mipmap-xxxhdpi/ic_launcher_monochrome.png", "background:#3C4A3E;border-radius:50%", "Themed (monochrome)"),
        ("android/res/drawable-xxxhdpi/ic_stat_notify.png", "background:#202124;padding:20px", "Notification"),
        ("android/res/drawable-xxxhdpi/splash_icon.png", f"{bg_css};border-radius:8px", "Android 12 splash"),
        ("android/play-store/ic_launcher-playstore.png", "border-radius:30%", "Play Store (Play masks it at 30%)"),
        ("android/res/mipmap-xxxhdpi/ic_launcher.png", "", "Legacy launcher"),
        ("android/res/mipmap-xxxhdpi/ic_launcher_round.png", "", "Legacy round")))
    social = "".join(f'<figure><img src="social/{f}" style="width:{300 if w > h else 160}px" alt="">'
                     f"<figcaption>{f}</figcaption></figure>" for f, (w, h) in SOCIAL.items() if f"social/{f}" in has)
    envs = "".join("<figure>" + img("ios/AppIcon-" + e["name"] + ".appiconset/AppIcon-1024.png", 96, "border-radius:22.37%")
                   + "<figcaption>" + e["name"] + "</figcaption></figure>" for e in cfg.get("environments", []))
    sec = lambda t, body: f"<section><h2>{t}</h2><div class=row>{body}</div></section>" if body else ""
    html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{cfg['name']} icon preview</title><style>
:root{{color-scheme:light dark;--bg:#F6F6F6;--fg:#1F1F1F;--muted:#666}}
@media (prefers-color-scheme:dark){{:root{{--bg:#161616;--fg:#EEE;--muted:#AAA}}}}
body{{margin:0;padding:24px 16px;font:14px/1.45 system-ui,sans-serif;background:var(--bg);color:var(--fg)}}
h1{{font-size:20px;margin:0 0 4px}} h2{{font-size:15px;margin:28px 0 10px}} p{{color:var(--muted);margin:0}}
.row{{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-end}} figure{{margin:0;text-align:center}}
figcaption{{font-size:12px;color:var(--muted);margin-top:6px}} img{{display:block;margin:auto;image-rendering:auto}}
.ad{{width:120px;height:120px;overflow:hidden;position:relative}}
.ad img{{position:absolute;width:180px;height:180px;left:-30px;top:-30px}}
.tab{{display:flex;gap:8px;align-items:center;padding:8px 12px;border-radius:8px 8px 0 0;width:200px;font-size:12px}}
.tab img{{margin:0}}
</style></head><body><h1>{cfg['name']} — icon preview</h1>
<p>Masks here are CSS approximations. Final check on a device: Xcode / Icon Composer for iOS, Android Studio's Image Asset preview or a Pixel and a Samsung for Android.</p>
{sec('Browser tabs (light and dark)', tabs)}{sec('Favicon sizes at 1×', sizes)}{sec('iOS', ios)}
{sec('Android launcher masks (adaptive)', android)}{sec('Web app / home screen', pwa)}{sec('Android extras', extra)}
{sec('Social share', social)}{sec('Environment builds', envs)}</body></html>"""
    kit.text(html, "preview.html", kind="preview")


# ---------------------------------------------------------------------------------------------
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--config", required=True)
    ap.add_argument("--out")
    ap.add_argument("--root", default=".")
    ap.add_argument("--zip", action="store_true", help="also write <out>.zip")
    args = ap.parse_args()
    root = pathlib.Path(args.root).resolve()
    cfg_path = pathlib.Path(args.config)
    cfg = json.loads(cfg_path.read_text(encoding="utf-8"))
    cfg.setdefault("ios", {})
    targets = cfg.get("targets", ["web", "ios", "android"])
    stamp = datetime.date.today().isoformat()
    out = pathlib.Path(args.out or f"{cfg.get('id', 'product')}-app-assets-{stamp}").resolve()
    if out.exists():
        shutil.rmtree(out)
    out.mkdir(parents=True)
    kit = Kit(out)

    print(f"→ {cfg['name']}: {', '.join(targets)}")
    m = cfg["marks"]
    mark = load_mark(m["mark"], root)
    marks = {"mark": mark,
             "favicon": load_mark(m.get("favicon"), root) or mark,
             "monochrome": silhouette(load_mark(m.get("monochrome"), root) or mark),
             "social": load_mark(m.get("social"), root)}
    ios = cfg["ios"]
    fill = ios.get("fill", 0.60)
    light = background(cfg["background"], IOS_MASTER, root)
    light.alpha_composite(place(mark, IOS_MASTER, "box", fill))
    marks["ios_light"] = light
    dark_mark = load_mark(m.get("dark"), root) or mark
    dark_layer = place(dark_mark, IOS_MASTER, "box", fill)
    if ios.get("darkTransparent"):
        marks["ios_dark"] = dark_layer
    else:
        d = background(ios.get("darkBackground", "#000000"), IOS_MASTER, root)
        d.alpha_composite(dark_layer)
        marks["ios_dark"] = d
    # Tinted: a greyscale icon the system tints. White mark on black unless a tinted mark is supplied.
    tinted_src = load_mark(m.get("tinted"), root)
    tinted_mark = (ImageOps.grayscale(tinted_src.convert("RGB")).convert("RGBA") if tinted_src else silhouette(mark))
    if tinted_src:
        tinted_mark.putalpha(tinted_src.getchannel("A"))
    t = Image.new("RGBA", (IOS_MASTER, IOS_MASTER), (0, 0, 0, 255))
    t.alpha_composite(place(tinted_mark, IOS_MASTER, "box", fill))
    marks["ios_tinted"] = t

    if "web" in targets:
        build_web(cfg, kit, marks, root)
    if "ios" in targets:
        build_ios(cfg, kit, marks, root)
    if "android" in targets:
        build_android(cfg, kit, marks, root)
    if "social" in targets:
        build_social(cfg, kit, marks, root)
    for env in cfg.get("environments", []):
        if "ios" in targets:
            build_ios(cfg, kit, marks, root, env)
        if "android" in targets:
            build_android(cfg, kit, marks, root, env)

    # inputs, for re-runs
    (out / "source").mkdir(exist_ok=True)
    shutil.copy(cfg_path, out / "source" / "asset-config.json")
    for key, rel in m.items():
        if rel:
            shutil.copy(root / rel, out / "source" / f"{key}{pathlib.Path(rel).suffix}")
    write_preview(kit, cfg)

    extras = []
    bg = cfg["background"]
    if not (isinstance(bg, dict) and bg.get("image")):
        if isinstance(bg, dict) and bg.get("gradient"):  # judge against the gradient's middle
            a, b = rgba(bg["gradient"][0]), rgba(bg["gradient"][1])
            colour = tuple(round((x + y) / 2) for x, y in zip(a, b))
        else:
            colour = rgba(bg.get("color") if isinstance(bg, dict) else bg)
        extras.append(V.mark_contrast(mark, colour, "mark on its background"))
        if "ios" in targets and not ios.get("darkTransparent") and "dark" in ios.get("appearances", ["dark", "tinted"]):
            extras.append(V.mark_contrast(dark_mark, rgba(ios.get("darkBackground", "#000000")), "iOS dark icon"))
    if not m.get("monochrome") and ("android" in targets or "ios" in targets):
        extras.append(V.colour_only_detail(mark))
    report = V.validate(out, kit.files, cfg, [e for e in extras if e])
    for f in kit.files:
        p = out / f["path"]
        f["bytes"] = p.stat().st_size
        f["sha256"] = hashlib.sha256(p.read_bytes()).hexdigest()[:16]
    (out / "manifest.json").write_text(json.dumps(
        {"product": cfg.get("id"), "name": cfg["name"], "generated": stamp, "status": report["status"],
         "configStatus": cfg.get("status", "unverified"), "files": kit.files}, indent=2) + "\n", encoding="utf-8")
    (out / "report.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    (out / "README.md").write_text(V.readme(cfg, kit.files, report, stamp), encoding="utf-8")

    if args.zip:
        shutil.make_archive(str(out), "zip", out.parent, out.name)
    print(V.summary(report))
    print(f"\nKit: {out}{'  (+ .zip)' if args.zip else ''}\nOpen preview.html to look at every icon in context.")
    sys.exit(1 if report["status"] == "NOT READY" else 0)


if __name__ == "__main__":
    main()
