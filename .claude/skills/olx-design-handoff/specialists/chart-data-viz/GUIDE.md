# Charts and data

OLX's web has almost no charts on live (Motors has price ranges and specs tables, Property shows prices per area).
New charts would come with seller dashboards (ad performance: views, chats, calls) or price insight.
Every chart here is therefore **new**: build it from tokens and label it a proposal.

## Pick the chart from the question

| Question | Chart |
| --- | --- |
| How did my ad do over time? | line (views per day), 7 or 30 days |
| Which channel brought leads? | horizontal bars (Chat, Call, WhatsApp, Show phone number) |
| Is this price fair? | a range bar with the ad's price marked; never a gauge |
| One number that matters | a big number with the comparison: `124 views · up 18% on last week` |

No pies with more than 3 slices, no 3D, no dual axes, no donut "progress" for non-progress data.

## Colours (tokens only)

- One series: `--olx-text` (petrol). Highlight: `--olx-link` (blue 700). Comparison or past: `--olx-color-petrol-300`.
- Good / bad only when they mean it: `--olx-success`, `--olx-danger`.
- Gridlines `--olx-border-subtle`; axis text 12 px `--olx-text-muted`.
- Never the Sell ring colours, never teal for data.

## Rules

1. Title states the takeaway ("Views doubled after you boosted"), and the axes say units.
2. Numbers in OLX formats: `Rs 9.75 Lac`, `1,240`.
3. Start bar axes at zero.
4. Every chart has a text equivalent (a table or a sentence) for screen readers and the copy deck.
5. Draw no-data and little-data states ("Not enough views yet. Check back in a day.").
6. Mobile: one chart a row, labels on the bars rather than a legend.
