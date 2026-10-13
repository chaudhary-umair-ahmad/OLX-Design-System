# Imagery and illustration

## Listing photos

- Use real ones from `handoff/content/fixtures.json` (photos from the captures, served by images.olx.com.pk). They are user content: they illustrate the layout and aren't for marketing.
- Real listing photos are uneven: phone shots, mixed light, odd crops. Design for that: `object-fit: cover` in a fixed-ratio box (cards are about 4:3), `--olx-media-bg` behind the ad gallery.
- Draw the missing-photo case: a neutral `--olx-bg-subtle` box with the camera icon, never a broken image.
- Show the photo count on the gallery, and a featured ribbon only on featured ads.

## Illustrations

Live uses a few spot illustrations (`assets/illustrations/`: app banner background, choose-location, car inspection,
property banners). For an empty state:
1. reuse a captured illustration if one fits;
2. otherwise use a house icon at a large size in `--olx-text-muted`;
3. a new illustration is a brand-team job: leave a sized placeholder and an open question.

## Banners and heroes

Home banners on live are campaign images. For a new one, compose from real photography and brand type
(Geomanist 600, petrol or white). For generated images, use `design-prompt-images`, and label them as generated.

## People and places

Pakistani people and places: Karachi, Lahore, Islamabad streets, homes and cars that Pakistanis actually own
(Suzuki Alto, Honda City, Toyota Corolla, Honda CD 70). No Western stock imagery.

## Avatars

Seller avatars on live are initials or a default silhouette. Never a real person's photo in a design file.
