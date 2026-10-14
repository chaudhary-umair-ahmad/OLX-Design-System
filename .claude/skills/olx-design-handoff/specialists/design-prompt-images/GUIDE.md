# Image prompts that don't look AI-made, set in Pakistan

## First: is generation allowed?

| Need | Generate? | Instead |
| --- | --- | --- |
| Listing photos, seller stories, testimonials, before/after | **Never**: deceptive, and the fastest tell | real photos from `handoff/content/fixtures.json` |
| Empty-state or error illustration | **Never**: a second illustration style is worse than none | `assets/illustrations/`, or a large house icon (`imagery-illustration`) |
| Brand, bank or agency logos, real people, number plates | **Never** | `assets/logos/`; initials avatars |
| Production campaign banner | normally **supplied artwork** | use the supplied file; generate only a labelled mock |
| Campaign / landing / seasonal hero, app-download band | **yes, as a proposal** | this guide |
| Placeholder for a composed surface in a design | **yes**, labelled "generated placeholder" | this guide |

Every generated image is a **proposal**: log it in `handoff/<feature>/PROPOSALS.md` and say so.

## The prompt template (prose, 40–120 words, in this order)

```
1 CANVAS & USE     Photorealistic 16:9 web banner photo for a classifieds marketplace in Pakistan;
                   the left 40% kept as quiet negative space for an HTML headline.
2 CAPTURE          One frame only: "candid photo taken on a recent smartphone"
                   OR "35mm documentary photo, eye level".
3 SUBJECT + ACTION who, doing what, framing, gaze, hands.
4 SETTING          5–12 concrete local nouns (references/pakistan-realism.md).
5 LIGHT & TIME     "late-afternoon sun from the left, light dust haze, natural colour, no grading".
6 TEXTURE          "dust on the bonnet, creased cotton kameez, scuffed tiles, visible skin pores".
7 PALETTE          "muted warm neutrals"; petrol and white only if they occur naturally.
8 CONSTRAINTS      "No text, no logos or badges, no readable number plates, no watermark."
9 EDIT LOCK        (edits) "Change only X. Keep identity, pose, angle, lighting, framing."
```

**Worked example (Motors campaign hero, desktop):**
> Photorealistic 21:9 web banner photo for a car marketplace in Pakistan; the right 45% kept as a calm,
> out-of-focus boundary wall for an HTML headline. Candid photo taken on a recent smartphone. A man in his 40s in
> a grey shalwar kameez photographs a used white hatchback parked outside a house in a Lahore housing society,
> looking at his phone screen, not the camera. Right-hand-drive car, brick boundary wall, a black gate, overhead
> cables, a motorbike parked behind. Late-afternoon sun from the left, light dust haze, natural colour, no grading.
> Dust on the bonnet, a small dent on the bumper. No text, no signage, no logos, no readable number plates.

## Rules

1. Say **photorealistic** and give **one** capture frame.
2. **Ban the glossy words:** stunning, award-winning, 8K, 4K, ultra-detailed, hyper-realistic, cinematic, dramatic, epic, masterpiece, perfect.
3. Concrete local nouns beat adjectives: "a Suzuki-pick-up-sized white van" beats "a busy Pakistani street".
4. Imperfection on purpose: dust, creases, uneven light, a bystander cut off at the edge.
5. **No text in the image, ever.** Headlines, prices and buttons go on top as HTML in Geomanist.
6. No brands: vehicles, phones and appliances are generic. Phones show a dark screen or OLX's own UI.
7. Plates never legible.
8. People: Pakistani, everyday clothing, real skin tones (`references/pakistan-realism.md`).
9. Leave the copy area genuinely empty, on the side the layout needs.
10. Never full-bleed photography behind dense text.

## Check every image

Run `references/ai-look-checklist.md`. Any fail → regenerate or edit with an EDIT LOCK. Model choice and quirks:
`references/models.md`.

## Record

For each kept image, in `PROPOSALS.md`: model, date, full prompt, seed if any, the edits, and "generated".
