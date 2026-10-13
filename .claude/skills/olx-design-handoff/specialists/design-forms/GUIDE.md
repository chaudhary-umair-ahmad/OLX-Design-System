# Forms: Post an Ad, login, filters, report

The form surfaces on OLX: login and sign-up (captured: `login`, `login-email`, `login-phone`, `signup`), filters
(`filters-sheet`, `price-sheet`, `brand-sheet`), location (`location-select`), and logged-in forms not captured
(Post an Ad, edit profile, report). Uncaptured forms are composed from these parts and labelled unverified.

## Parts (use these, don't restyle)

| Part | Class | Measured |
| --- | --- | --- |
| Text field | `olx-field` + `olx-label` + `olx-input` | 48 px tall, `--olx-radius-field` (6 px), 1 px `--olx-border`, focus `--olx-focus` |
| Textarea | `olx-textarea` | same border and radius |
| Select | `olx-select` | 48 px |
| Checkbox | `olx-check` | |
| Hint / error text | `olx-hint`; error state `olx-field--error` | 12 px, muted; error in `--olx-danger` |
| Button | `olx-btn` (`--primary`, `--secondary`) | 48 px min height, `--olx-radius-sm`, 600 |
| Chip filter | `olx-chip` | |

## Layout

- One column. Labels above fields. Desktop forms sit in a column of about 560–640 px inside the 1280 container; mobile is full width with 16 px gutters.
- Group by what the seller knows: *what* (category, title, photos), *details* (category-specific specs), *price*, *where*, *you*.
- Post an Ad on live picks the category first, then shows that category's fields. Keep that.
- The primary button is at the end of the form on desktop, and sticky at the bottom on mobile when the form scrolls.
- Filters: a sheet on mobile with `Apply Filters` sticky at the bottom and a clear action at the top; a sidebar on desktop that applies on change.

## Fields OLX needs

| Field | Rule |
| --- | --- |
| Phone | Pakistani mobile, `03XX-XXXXXXX`; show the format as a hint, accept spaces and `+92` |
| Price | digits only, `Rs` prefix outside the input, commas as they type; say the range on error |
| Title | live titles run past 70 characters; show a counter near the limit |
| Location | city → area, searchable (`location-select` capture) |
| Photos | first photo is the cover; show count and limit; allow reorder |
| Area (property) | number + unit (Marla, Kanal, sq. ft.) |

## Validation

- Validate on blur, not on every key. Re-validate on change once a field has shown an error.
- The message is under the field, says how to fix it (`design-copy`), and the field gets `aria-invalid` and `aria-describedby`.
- On submit with errors: scroll to and focus the first one; keep everything typed.
- Never clear a form on a server error.

## States to draw (each is a `data-state`)

`default`, `filled`, `error` (field errors), `submitting` (button disabled with a spinner), `success`, and
`server-error`. Signed-out: what happens when a visitor taps Sell? (Live sends them to login.)
