#!/usr/bin/env python3
"""
Checks for a generated kit. Reads every file back from disk (never trusts the generator), so a
kit can also be re-checked on its own:

    python3 validate_assets.py <kit-dir>          # uses <kit-dir>/manifest.json

Levels: error (blocks hand-off: the platform rejects it or a launcher clips it), warn (ships,
but someone should look), info. Numbers and sources: ../references/*.md.
"""
import json, math, pathlib, sys

from PIL import Image

SKILL_NAME = pathlib.Path(__file__).resolve().parent.parent.name  # the installed skill's folder name
FAVICON_MAX_KB = 100
ICON_MAX_KB = 500
PLAY_MAX_KB = 1024
SOCIAL_MAX_MB = 5  # X / Twitter's limit; Facebook and LinkedIn allow 8
TAB_BACKGROUNDS = {"light tab": (255, 255, 255), "dark tab": (32, 33, 36)}  # Chrome's default tab colours


def pixels(img):
    """Pixel list across Pillow versions (getdata is deprecated from Pillow 12)."""
    return list(img.get_flattened_data() if hasattr(img, "get_flattened_data") else img.getdata())


def luminance(rgb):
    def ch(c):
        c = c / 255
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = rgb[:3]
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)


def contrast(a, b):
    la, lb = luminance(a), luminance(b)
    return (max(la, lb) + 0.05) / (min(la, lb) + 0.05)


def mark_contrast(mark, bg, label):
    """Share of the mark's visible pixels below 3:1 against `bg` (WCAG 1.4.11, non-text contrast).
    Returns a check dict, or None when the mark reads fine."""
    m = mark.copy()
    m.thumbnail((128, 128))
    px = [p for p in pixels(m) if p[3] > 128]
    if not px:
        return None
    hexbg = "#%02X%02X%02X" % tuple(bg[:3])
    low = sum(1 for p in px if contrast(p, bg) < 3.0) / len(px)
    gone = sum(1 for p in px if contrast(p, bg) < 1.5) / len(px)
    if low > 0.5:
        return {"level": "warn", "file": label,
                "msg": f"{round(low * 100)}% of the mark is below 3:1 against {hexbg} (WCAG 1.4.11). "
                       "It will be hard to see there."}
    if gone > 0.05:
        return {"level": "warn", "file": label,
                "msg": f"{round(gone * 100)}% of the mark all but disappears against {hexbg} (under 1.5:1): "
                       "a part of the logo goes missing. Supply a variant for this background."}
    if low > 0.2:
        return {"level": "info", "file": label,
                "msg": f"{round(low * 100)}% of the mark is below 3:1 against {hexbg}: a part of it fades. Check the preview."}
    return None


def colour_only_detail(mark):
    """Share of the mark's solid pixels that sit on an edge drawn only by colour (both sides opaque).
    A silhouette (themed icon, notification, iOS tinted) loses those edges. Returns a check dict or None."""
    m = mark.copy()
    m.thumbnail((256, 256))
    w, h = m.size
    px = m.load()
    outline = edges = 0  # outline: solid pixels next to transparency; edges: solid pixels on a colour-only edge
    for y in range(2, h - 2):
        for x in range(2, w - 2):
            p = px[x, y]
            if p[3] < 250:
                continue
            if min(px[x + 1, y][3], px[x - 1, y][3], px[x, y + 1][3], px[x, y - 1][3]) < 128:
                outline += 1
                continue
            for q in (px[x + 2, y], px[x, y + 2]):  # two px away, past the anti-aliased blend
                if q[3] >= 250 and contrast(p, q) >= 2.0:
                    edges += 1
                    break
    if outline and edges / outline > 0.10:
        return {"level": "warn", "file": "single-colour versions",
                "msg": "part of the mark is drawn only by colour (shapes touching with no gap), so the derived single-colour "
                       "versions lose it: Android themed icon, notification icon, iOS tinted. Supply marks.monochrome "
                       "(and marks.tinted) drawn for one colour."}
    return None


def outside_circle(img, radius_frac, alpha_min=24):
    """Visible pixels farther than radius_frac × width from the centre."""
    w, h = img.size
    a = img.getchannel("A").load()
    r2 = (radius_frac * w) ** 2
    cx, cy = w / 2, h / 2
    n = 0
    for y in range(h):
        for x in range(w):
            if a[x, y] > alpha_min and (x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 > r2:
                n += 1
    return n


def validate(out, files, cfg, extras=()):
    checks = list(extras)
    add = lambda level, f, msg: checks.append({"level": level, "file": f, "msg": msg})
    for f in files:
        rel, kind = f["path"], f.get("kind")
        p = out / rel
        if not p.exists():
            add("error", rel, "missing")
            continue
        kb = p.stat().st_size / 1024
        if not rel.endswith((".png", ".ico")):
            continue
        img = Image.open(p)
        if kind == "ico":
            sizes = sorted(img.info.get("sizes", set()) or img.ico.sizes())
            need = {(s, s) for s in (16, 32, 48)}
            if not need.issubset(set(sizes)):
                add("error", rel, f"favicon.ico holds {sizes}; needs 16, 32 and 48")
            continue
        exp = (f["w"], f["h"]) if "w" in f else (f.get("size"), f.get("size"))
        if exp[0] and img.size != tuple(exp):
            add("error", rel, f"is {img.size[0]}x{img.size[1]}, expected {exp[0]}x{exp[1]}")
        if img.format != "PNG":
            add("error", rel, f"is {img.format}, expected PNG")
        has_alpha = img.mode in ("RGBA", "LA", "PA") or "transparency" in img.info

        if kind in ("ios-opaque", "opaque"):
            if has_alpha:
                add("error", rel, "has an alpha channel: App Store Connect rejects it, iOS fills it with black")
        if kind in ("maskable", "play", "adaptive-bg"):
            rgba = img.convert("RGBA")
            if rgba.getchannel("A").getextrema()[0] < 255:
                add("error" if kind != "play" else "warn", rel,
                    "has transparent pixels: this layer must be a full-bleed square (the platform masks it)")
        if kind == "maskable":
            rgba = img.convert("RGBA")
            corner = rgba.getpixel((0, 0))
            bg = cfg.get("background")
            if not (isinstance(bg, dict) and (bg.get("image") or bg.get("gradient"))):
                w = rgba.width
                r2 = (f["safe_radius"] * w) ** 2
                bad = sum(1 for y in range(0, w, 2) for x in range(0, w, 2)
                          if (x - w / 2) ** 2 + (y - w / 2) ** 2 > r2 and
                          max(abs(a - b) for a, b in zip(rgba.getpixel((x, y))[:3], corner[:3])) > 12)
                if bad:
                    add("error", rel, f"mark reaches outside the 40% safe circle ({bad} sampled px): "
                                      "Android and Chrome masks will cut it")
        if kind in ("adaptive-fg", "monochrome", "splash") and not f.get("badged"):
            n = outside_circle(img.convert("RGBA"), f["safe_radius"])
            if n:
                add("error", rel, f"{n} visible px outside the safe circle: launcher masks will clip the mark")
        if kind == "adaptive-fg" and not f.get("badged") and rel.endswith("xxxhdpi/ic_launcher_foreground.png"):
            box = img.convert("RGBA").getchannel("A").point(lambda a: 255 if a > 24 else 0).getbbox()
            if box:
                dp = max(box[2] - box[0], box[3] - box[1]) / (img.width / 108)
                if dp < 48:
                    add("warn", rel, f"the logo is {dp:.0f} dp at its longest; Android asks for at least 48 x 48 dp inside the "
                                     "66 dp safe zone. A square-ish logo can't do both: at 48 dp its corners pass the 66 dp circle that "
                                     "round masks keep. Either keep it inside the circle (default, a little under 48 dp, never "
                                     "clipped) or ask the brand owner for a rounder mark / more padding inside the artwork")
        if kind == "adaptive-fg" and f.get("badged") and rel.endswith("xxxhdpi/ic_launcher_foreground.png"):
            add("info", rel.split("/res/")[0], "environment band crosses the safe zone on purpose (internal build); "
                                                "its ends clip on round masks")
        if kind == "monochrome":
            rgba = img.convert("RGBA")
            if rgba.getchannel("A").getextrema()[1] == 0:
                add("error", rel, "monochrome layer is empty")
        if kind == "notification":
            rgba = img.convert("RGBA")
            coloured = sum(1 for p in pixels(rgba) if p[3] > 24 and min(p[:3]) < 245)
            if coloured:
                add("error", rel, f"{coloured} px are not white: Android draws notification icons from alpha only, "
                                  "colour turns into a white blob")
            if rgba.getchannel("A").getextrema()[0] == 255:
                add("error", rel, "no transparency: it will show as a white square")
        # weight
        if kind in ("favicon",) and kb > FAVICON_MAX_KB:
            add("warn", rel, f"{kb:.0f} KB: favicons should stay under {FAVICON_MAX_KB} KB")
        elif kind == "play" and kb > PLAY_MAX_KB:
            add("error", rel, f"{kb:.0f} KB: Google Play's limit is 1024 KB")
        elif kind == "social" and kb > SOCIAL_MAX_MB * 1024:
            add("error", rel, f"{kb / 1024:.1f} MB: X/Twitter rejects images over {SOCIAL_MAX_MB} MB")
        elif kind not in ("social", "layer") and kb > ICON_MAX_KB:
            add("warn", rel, f"{kb:.0f} KB is heavy for an icon (> {ICON_MAX_KB} KB)")

    # favicon legibility on light and dark browser tabs (a transparent favicon has the tab as its background)
    fav = next((out / f["path"] for f in files if f["path"].endswith("favicon-96x96.png")), None)
    if fav and fav.exists() and cfg.get("web", {}).get("faviconStyle", "transparent") == "transparent":
        img = Image.open(fav).convert("RGBA")
        for name, bg in TAB_BACKGROUNDS.items():
            c = mark_contrast(img, bg, f"favicon on a {name}")
            if c:
                c["msg"] += (" Fix: faviconStyle \"tile\", or a faviconDarkMark (SVG favicon switches on dark tabs; "
                             "the PNG/ICO fallbacks cannot).") if name == "dark tab" else ""
                checks.append(c)

    # provenance flags (do not block, but every hand-off repeats them)
    if cfg.get("ios", {}).get("mode") == "all-sizes" and "ios" in cfg.get("targets", []):
        add("info", "ios", "all-sizes catalogue: no dark or tinted icons (they need the single-size catalogue, Xcode 16+)")
    if cfg.get("status", "unverified") != "verified":
        add("warn", "config", "brand values are not marked verified: colours and mark were not confirmed against "
                              "the product's design system or the shipping icon. Say so in the hand-off.")
    if not cfg.get("markSource"):
        add("warn", "config", "markSource is empty: say where the mark came from (brand team file, Figma link, file path)")
    for k in ("ios", "android"):
        if k in cfg.get("targets", []) and not cfg.get(k, {}).get("reviewedOnDevice"):
            add("info", k, f"not reviewed on a device yet ({'Xcode / Icon Composer' if k == 'ios' else 'Android Studio Image Asset preview or a phone'})")

    errors = sum(c["level"] == "error" for c in checks)
    warns = sum(c["level"] == "warn" for c in checks)
    return {"status": "NOT READY" if errors else "READY", "errors": errors, "warnings": warns,
            "files": len(files), "checks": checks}


def summary(report):
    icon = {"error": "✗", "warn": "!", "info": "·"}
    lines = [f"\n{report['status']}: {report['files']} files, {report['errors']} errors, {report['warnings']} warnings"]
    for c in sorted(report["checks"], key=lambda c: ("error", "warn", "info").index(c["level"])):
        lines.append(f"  {icon[c['level']]} {c['file']}: {c['msg']}")
    return "\n".join(lines)


def readme(cfg, files, report, stamp):
    paths = {f["path"] for f in files}
    has = lambda prefix: any(p.startswith(prefix) for p in paths)
    blockers = [c for c in report["checks"] if c["level"] == "error"]
    flags = [c for c in report["checks"] if c["level"] == "warn"]
    notif = cfg.get("android", {}).get("notificationName", "ic_stat_notify")
    out = [f"# {cfg['name']} — web and app icon kit", "",
           f"Generated {stamp} by the `{SKILL_NAME}` skill. **Status: {report['status']}** "
           f"({report['errors']} blockers, {report['warnings']} flags). Brand values: **{cfg.get('status', 'unverified')}**"
           f"{' — source: ' + cfg['source'].rstrip('.') if cfg.get('source') else ''}.", ""]
    if blockers:
        out += ["## Blockers (fix before hand-off)", ""] + [f"- `{c['file']}` — {c['msg']}" for c in blockers] + [""]
    if flags:
        out += ["## Flags (ships, but say it out loud)", ""] + [f"- `{c['file']}` — {c['msg']}" for c in flags] + [""]
    out += ["Open `preview.html` to see every icon in its context (tabs, masks, home screens).", "", "## What goes where", ""]
    if has("web/"):
        out += ["### Web (`web/`) → the site's public root", "",
                "Copy every file in `web/` to the root that serves `/` (e.g. `public/`). Paste `web/head-snippet.html` "
                "into `<head>`. `site.webmanifest` lists the PWA icons; keep its `name`, colours and `start_url` in step with the site.", "",
                "Next.js (App Router): put `favicon.ico`, `icon.svg` (rename `favicon.svg`) and `apple-icon.png` "
                "(rename `apple-touch-icon.png`) in `app/` and Next writes the tags; `manifest.webmanifest` in `app/` or "
                "`public/`. Other frameworks: the layout's `<head>`.", ""]
    if has("ios/"):
        out += ["### iOS (`ios/`) → Xcode", "",
                "- `AppIcon.appiconset/` replaces the folder of the same name in `Assets.xcassets` (light, dark and tinted 1024 px; "
                "Xcode makes every other size). Opaque, square corners: iOS applies the mask, do not round them.",
                "- `icon-composer/` holds the layers for **Icon Composer** (Xcode 26 and later, Liquid Glass): drop "
                "`background.png` (or set its colour) and `foreground-source.svg` / `foreground.png` in, check Default, Dark, "
                "Clear and Tinted, save the `.icon` file into the project and set it as the app icon. Until the team "
                "moves to Icon Composer, the asset catalogue above is what ships.",
                "- App Store Connect takes the icon from the build; there is nothing to upload separately.", ""]
        if any("AppIcon-" in p and ".appiconset" in p and "AppIcon.appiconset" not in p for p in paths):
            out += ["- `AppIcon-<env>.appiconset/` are badged icons for internal builds: set "
                    "`ASSETCATALOG_COMPILER_APPICON_NAME` per build configuration (e.g. `AppIcon-staging`). Never ship them to the store.", ""]
    if has("android/"):
        out += ["### Android (`android/`) → `app/src/main/res`", "",
                "- Merge `android/res/` into `app/src/main/res/` (same folder names). Manifest: "
                "`android:icon=\"@mipmap/ic_launcher\"` and `android:roundIcon=\"@mipmap/ic_launcher_round\"`.",
                "- `mipmap-anydpi-v26/` = adaptive icon (Android 8+), with a `<monochrome>` layer for themed icons (Android 13+). "
                "`mipmap-*/ic_launcher.png` / `_round.png` are only for Android 7 and below.",
                f"- Notification small icon: `NotificationCompat.Builder(...).setSmallIcon(R.drawable.{notif})`. "
                "Firebase default: `<meta-data android:name=\"com.google.firebase.messaging.default_notification_icon\" "
                f"android:resource=\"@drawable/{notif}\" />`.",
                "- Splash (Android 12+, `core-splashscreen`): `<item name=\"windowSplashScreenAnimatedIcon\">@drawable/splash_icon</item>` "
                "and `windowSplashScreenBackground` set to the brand surface.",
                "- `play-store/ic_launcher-playstore.png` → Play Console › Store presence › Main store listing › App icon. "
                "Play adds the rounded corners and shadow.", ""]
        if has("android/src-"):
            out += ["- `android/src-<env>/res/` are badged launcher icons for an internal flavour or build type: copy to "
                    "`app/src/<env>/res/`. Never ship them to Play.", ""]
    if has("social/"):
        out += ["### Social share (`social/`)", "",
                "`og-image.png` (1200×630) for Open Graph and X/Twitter large cards, `og-square.png` where a square is asked "
                "for. Tags in `social/meta-snippet.html`; URLs must be absolute HTTPS. Test with the Facebook Sharing Debugger, "
                "LinkedIn Post Inspector and an X post preview after deploy.", ""]
    out += ["## Re-run", "",
            "`source/asset-config.json` and the source marks are in `source/`. From the folder that holds the marks:", "",
            "```", "python3 <skill>/scripts/generate_assets.py --config source/asset-config.json --root .", "```", "",
            "`manifest.json` lists every file with its size in bytes and a short hash; `report.json` has every check.", ""]
    return "\n".join(out)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    kit = pathlib.Path(sys.argv[1])
    man = json.loads((kit / "manifest.json").read_text())
    cfg = json.loads((kit / "source" / "asset-config.json").read_text())
    rep = validate(kit, man["files"], cfg)
    print(summary(rep))
    sys.exit(1 if rep["status"] == "NOT READY" else 0)
