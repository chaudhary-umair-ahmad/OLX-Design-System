# Pixel check: stored captures vs the live screenshots

Checked 2026-10-15 with `node scripts/verify-pixels.mjs`. Each stored HTML file is rendered at its captured size and device pixel ratio and compared with the screenshot taken from olx.com.pk at capture time. A pixel counts as changed when a colour channel differs by more than 48/255 and no pixel within 1px of it in the other image is close (so 1px antialiasing shifts don't count). Fonts: Geomanist (fonts/). Rendered by Chromium 141.0.7390.37: percentages from another browser build are not directly comparable, because anti-aliased text rasterises differently.

**match** ≤ 0.5% of pixels changed · **close** ≤ 3% · **mismatch** above that. Listing photos are user content and can change or disappear on OLX, so a small share of changes in photo areas is expected.

| Group | Match | Close | Mismatch | Error | Skipped |
| --- | --- | --- | --- | --- | --- |
| site | 141 | 10 | 39 | 0 | 12 |
| templates | 9 | 0 | 1 | 0 | 0 |
| components | 22 | 13 | 19 | 0 | 0 |

## Not matching

| Capture | Verdict | Changed | Live size | Rendered size |
| --- | --- | --- | --- | --- |
| components/show-phone-button~desktop | mismatch | 92.59% | 420×49 | 420×48 |
| components/sell-button~desktop | mismatch | 32.45% | 104×48 | 104×48 |
| components/breadcrumb~mobile | mismatch | 30.81% | 1074×81 | 1074×75 |
| components/app-banner~desktop | mismatch | 26.24% | 1280×173 | 1280×147 |
| components/delivery-card~mobile | mismatch | 23.13% | 519×780 | 519×723 |
| components/page-title~desktop | mismatch | 21.03% | 381×37 | 381×36 |
| components/delivery-card~desktop | mismatch | 17.69% | 302×428 | 301×406 |
| components/sell-button~mobile | mismatch | 16.15% | 216×138 | 216×138 |
| components/seller-card~desktop | mismatch | 11.82% | 420×142 | 420×157 |
| site/prop-flats-sale~mobile | mismatch | 11.23% | 780×25736 | 780×25736 |
| site/prop-portions~mobile | mismatch | 11.06% | 780×25736 | 780×25736 |
| site/sub-houses~mobile | mismatch | 10.75% | 780×25736 | 780×25736 |
| site/prop-houses-rent~mobile | mismatch | 10.64% | 780×25736 | 780×25736 |
| templates/category-listing~mobile | mismatch | 7.98% | 1170×18921 | 1170×18921 |
| site/sub-motorcycles~mobile | mismatch | 7.79% | 780×11972 | 780×11972 |
| site/cat-property-for-rent~mobile | mismatch | 7.63% | 780×45700 | 780×45700 |
| site/cat-furniture~mobile | mismatch | 7.48% | 780×21080 | 780×21080 |
| site/city~mobile | mismatch | 7.11% | 780×12228 | 780×12228 |
| site/cat-kids~mobile | mismatch | 7.06% | 780×20750 | 780×20750 |
| site/cat-bikes~mobile | mismatch | 7.04% | 780×9338 | 780×9338 |
| components/login-button~desktop | mismatch | 6.98% | 40×24 | 40×23 |
| site/cat-electronics~mobile | mismatch | 6.98% | 780×11952 | 780×11952 |
| site/cat-vehicles~mobile | mismatch | 6.9% | 780×13350 | 780×13350 |
| site/cat-fashion~mobile | mismatch | 6.79% | 780×20720 | 780×20720 |
| site/cat-books-sports~desktop | mismatch | 6.46% | 1440×9427 | 1440×9427 |
| site/cat-animals~mobile | mismatch | 6.43% | 780×11988 | 780×11988 |
| site/city-category~mobile | mismatch | 6.37% | 780×12688 | 780×12688 |
| site/search-results~mobile | mismatch | 5.93% | 780×20098 | 780×20098 |
| site/prop-plots~desktop | mismatch | 5.6% | 1440×8202 | 1440×8202 |
| site/cat-business~mobile | mismatch | 5.22% | 780×9356 | 780×9356 |
| components/mobile-location-bar~mobile | mismatch | 5.21% | 1074×75 | 1074×75 |
| components/category-tile~mobile | mismatch | 5.1% | 210×276 | 210×273 |
| site/prop-city-houses~desktop | mismatch | 4.68% | 1440×13786 | 1440×13786 |
| site/cat-property-for-rent~desktop | mismatch | 4.53% | 1440×13455 | 1440×13455 |
| site/prop-city-plots~desktop | mismatch | 4.52% | 1440×13353 | 1440×13353 |
| site/cat-property-for-sale~desktop | mismatch | 4.27% | 1440×13426 | 1440×13426 |
| site/sorted-low-price~desktop | mismatch | 4.18% | 1440×15811 | 1440×15811 |
| site/cat-animals~desktop | mismatch | 4.05% | 1440×16100 | 1440×16100 |
| components/category-tiles~mobile | mismatch | 4.03% | 1170×702 | 1170×699 |
| site/cat-fashion~desktop | mismatch | 3.98% | 1440×16100 | 1440×16100 |
| site/search-results~desktop | mismatch | 3.92% | 1440×16228 | 1440×16228 |
| site/cat-furniture~desktop | mismatch | 3.91% | 1440×15928 | 1440×15928 |
| site/cat-kids~desktop | mismatch | 3.81% | 1440×16121 | 1440×16121 |
| site/prop-portions~desktop | mismatch | 3.58% | 1440×8623 | 1440×8623 |
| site/sub-houses~desktop | mismatch | 3.54% | 1440×8623 | 1440×8623 |
| components/copyright-bar~mobile | mismatch | 3.48% | 1170×306 | 1170×303 |
| components/copyright-bar~desktop | mismatch | 3.45% | 1440×58 | 1440×57 |
| site/cat-business~desktop | mismatch | 3.34% | 1440×7757 | 1440×7757 |
| components/ad-description~mobile | mismatch | 3.32% | 1170×366 | 1170×363 |
| site/sub-flats-for-rent~desktop | mismatch | 3.27% | 1440×14118 | 1440×14118 |
| components/search-row~desktop | mismatch | 3.24% | 1280×78 | 1280×78 |
| site/cat-electronics~desktop | mismatch | 3.23% | 1440×9074 | 1440×9074 |
| site/prop-flats-sale~desktop | mismatch | 3.22% | 1440×8623 | 1440×8623 |
| site/sub-mobile-phones~desktop | mismatch | 3.16% | 1440×9516 | 1440×9516 |
| components/safety-tips~mobile | mismatch | 3.1% | 1074×708 | 1074×705 |
| site/city~desktop | mismatch | 3.08% | 1440×9094 | 1440×9094 |
| site/cat-vehicles~desktop | mismatch | 3.06% | 1440×9625 | 1440×9625 |
| site/cat-jobs~desktop | mismatch | 3.03% | 1440×7424 | 1440×7424 |
| components/listing-toolbar~desktop | mismatch | 3.01% | 330×37 | 329×36 |
| components/ad-details~mobile | close | 2.9% | 1170×567 | 1170×564 |
| site/sub-online-jobs~desktop | close | 2.9% | 1440×7725 | 1440×7725 |
| site/cat-services~desktop | close | 2.79% | 1440×13455 | 1440×13455 |
| components/brand-chips~mobile | close | 2.51% | 228×84 | 225×84 |
| components/listing-card~mobile | close | 2.34% | 645×948 | 645×945 |
| components/listing-section~mobile | close | 2.05% | 1170×1053 | 1170×1050 |
| components/chat-button~desktop | close | 2.04% | 420×49 | 420×48 |
| site/cat-books-sports~mobile | close | 2.04% | 780×20970 | 780×20970 |
| site/cat-jobs~mobile | close | 1.94% | 780×9052 | 780×9052 |
| components/related-ads~mobile | close | 1.87% | 1170×1053 | 1170×1050 |
| site/cat-bikes~desktop | close | 1.74% | 1440×13455 | 1440×13455 |
| components/footer~mobile | close | 1.49% | 1170×1683 | 1170×1683 |
| site/sub-flats-for-rent~mobile | close | 1.18% | 780×46528 | 780×46528 |
| components/ad-description~desktop | close | 1.1% | 820×91 | 820×90 |
| site/motors-brand-tyres~desktop | close | 0.88% | 1440×1123 | 1440×1123 |
| site/motors-insurance-tpl~desktop | close | 0.88% | 1440×1123 | 1440×1123 |
| components/ad-overview~desktop | close | 0.86% | 820×116 | 820×115 |
| components/ad-details~desktop | close | 0.83% | 820×121 | 820×120 |
| components/listing-card~desktop | close | 0.65% | 311×461 | 311×460 |
| site/prop-rooms~desktop | close | 0.62% | 1440×13394 | 1440×13394 |
| site/prop-houses-rent~desktop | close | 0.6% | 1440×13786 | 1440×13786 |
| components/safety-tips~desktop | close | 0.58% | 820×171 | 820×170 |
| components/seller-card-mobile~mobile | close | 0.51% | 1158×429 | 1158×429 |
