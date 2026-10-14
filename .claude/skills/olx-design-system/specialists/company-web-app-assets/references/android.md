# Android icons — what Android and Material ask for

Sources (re-read before a release; last reviewed for this skill 2026-10):
- Adaptive icons: https://developer.android.com/develop/ui/views/launch/icon_design_adaptive
- Themed (monochrome) icons, Android 13+: same page, "User-themed icons"
- Splash screen API, Android 12+: https://developer.android.com/develop/ui/views/launch/splash-screen
- Google Play icon: https://developer.android.com/distribute/google-play/resources/icon-design-specifications
- Material icon keylines and system icons: https://m3.material.io/styles/icons

## Densities

| Folder | Scale | Adaptive layer (108 dp) | Legacy launcher (48 dp) | Notification (24 dp) | Splash (288 dp) |
|---|---|---|---|---|---|
| mdpi | 1× | 108 | 48 | 24 | 288 |
| hdpi | 1.5× | 162 | 72 | 36 | 432 |
| xhdpi | 2× | 216 | 96 | 48 | 576 |
| xxhdpi | 3× | 324 | 144 | 72 | 864 |
| xxxhdpi | 4× | 432 | 192 | 96 | 1152 |

## Adaptive icon (Android 8 / API 26+)

- Two layers, each **108 × 108 dp**: `background` (colour or image, full bleed) and `foreground` (the mark on transparency).
- Launchers show only the central **72 × 72 dp** and cut it to their own shape (circle, squircle, rounded square,
  teardrop…), and move the layers for parallax.
- Everything that matters sits inside the **66 dp diameter safe circle** ("never clipped by a shaped mask defined by an
  OEM"), and the logo is **at least 48 × 48 dp and at most 66 × 66 dp** (Android's own numbers). Under 48 dp is a warning. The generator fits the mark by its
  farthest visible pixel: `android.fill` (default 0.92) is the share of that 33 dp radius it may use. Any visible
  foreground pixel outside the circle is an **error**.
- **Monochrome layer** (Android 13+ themed icons): same geometry, the launcher draws it in the wallpaper tint from
  its alpha only. Derived from `marks.monochrome` or the mark's shape. From Android 16 QPR 2 the system themes apps
  that ship no monochrome layer by itself, so shipping our own keeps the result under the brand's control.
- Declared in `mipmap-anydpi-v26/ic_launcher.xml` (+ `_round.xml`). Background is `@color/ic_launcher_background`
  for a flat colour, `@mipmap/ic_launcher_background` for a gradient or image.
- No baked shadow, gloss or mask on either layer.

## Legacy launcher icons (only if minSdk < 26)

`mipmap-*/ic_launcher.png` and `ic_launcher_round.png`, 48 dp. Built from the adaptive composite, shaped to the
Material product-icon keylines on the 192-unit grid: **square 152** (corner radius `android.legacyRadius`, default
9 % of the shape) and **circle 176**. `android.legacy: false` skips them for apps with minSdk 26+.

## Notification small icon

24 × 24 dp, **white on transparent, alpha only**: Android ignores colour, so any colour pixel becomes white and a
fully opaque image becomes a white square (both are **errors**). The mark is fitted to the 20 dp live area of
Material's system-icon grid. Name: `ic_stat_<something>` (`android.notificationName`). Wire it with
`setSmallIcon(R.drawable.ic_stat_…)` and, for Firebase, the `default_notification_icon` meta-data.

## Splash icon (Android 12 / API 31+)

`windowSplashScreenAnimatedIcon`: **288 × 288 dp**, the mark inside a **192 dp** circle (without an icon
background). With `windowSplashScreenIconBackgroundColor` the canvas is 240 dp and the circle 160 dp: same ratio,
so the same file works. `android.splashFill` (default 0.90) scales inside the circle. Background colour is
`windowSplashScreenBackground` in the theme.

## Google Play store icon

**512 × 512 px, 32-bit PNG, sRGB, ≤ 1024 KB**, full square, no transparency. Google Play applies the rounded corners
(radius 30 % of the icon) and the drop shadow, so the file must not have them. Google's product-icon keylines are "a
guideline, not a hard rule" and are published only as templates (no numbers on the page); a legacy icon is scaled to 75 %
(384 px). Made here from the visible 72 dp of the adaptive composite, so the logo sits where it sits on the phone and well
clear of the 30 % corners.
Upload: Play Console › Grow › Store presence › Main store listing › App icon. (The 1024 × 500 feature graphic and
screenshots are a separate job: a store-screenshots skill.)

## Not covered

Wear OS, Android TV banners (320 × 180), Android Auto, shortcuts and widget previews. Ask for them as a separate job.
