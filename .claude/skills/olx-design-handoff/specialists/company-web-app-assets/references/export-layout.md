# The hand-off folder

One folder per run, `<product>-app-assets-<date>/` (optionally zipped). Every path mirrors where the file
lands in the receiving project, so devs merge folders instead of renaming files.

```
<product>-app-assets-<date>/
├── README.md              READY / NOT READY, blockers, flags, what goes where, re-run command
├── preview.html           every icon in context (tabs, masks, home screens, extras)
├── manifest.json          every file: path, kind, size, bytes, short sha256
├── report.json            every check (error / warn / info)
├── source/                asset-config.json + the marks used (re-run from here)
├── web/                   → site public root
│   ├── favicon.ico  favicon.svg  favicon-{16,32,48,96}x….png  apple-touch-icon.png
│   ├── web-app-manifest-{192,512}x….png  web-app-manifest-maskable-{192,512}x….png
│   └── site.webmanifest  head-snippet.html
├── ios/
│   ├── AppIcon.appiconset/        → Assets.xcassets/AppIcon.appiconset (Contents.json + 1024 light/dark/tinted)
│   ├── AppIcon-<env>.appiconset/  → badged internal builds (ASSETCATALOG_COMPILER_APPICON_NAME)
│   └── icon-composer/             → layers for an Icon Composer .icon (Xcode 26+)
├── android/
│   ├── res/                       → app/src/main/res
│   │   ├── mipmap-anydpi-v26/ic_launcher.xml, ic_launcher_round.xml
│   │   ├── mipmap-{m,h,xh,xxh,xxxh}dpi/ic_launcher_foreground.png, _monochrome.png, [_background.png],
│   │   │                                ic_launcher.png, ic_launcher_round.png
│   │   ├── drawable-{…}dpi/ic_stat_<name>.png, splash_icon.png
│   │   └── values/ic_launcher_background.xml
│   ├── src-<env>/res/             → app/src/<env>/res (badged flavour / build type)
│   └── play-store/ic_launcher-playstore.png → Play Console
└── social/                → og-image.png, og-square.png, meta-snippet.html
```

## Status

- **READY** — no errors. Flags may remain (unverified brand values, no dark variant, not checked on a device):
  the README lists them and the hand-off message repeats them.
- **NOT READY** — at least one error. Do not send it; fix the config and re-run.

## Re-checking a kit someone edited

`python3 scripts/validate_assets.py <kit>` re-reads every file in `manifest.json` (sizes, alpha, safe zones,
notification colour, weight, favicon on tabs). The mark-vs-background contrast checks need the source marks and
only run during generation.
