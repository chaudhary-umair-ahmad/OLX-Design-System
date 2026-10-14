---
name: olx-design-system
description: 'OLX Pakistan (olx.com.pk: Classifieds, Property, Motors web) design and front-end work. Quick questions (a token, a component, markup, copy, does this match live) are answered from foundations.md. A full design job (new feature, revamp, flow, missing state) runs end to end with a gate at each stage: intake, a plan the user approves, design from live captures and tokens, review, analytics plan, QA on every state, width and flow, and one internal hand-off HTML (prototype, states, specs, rules, copy, tracking, QA, open questions). Also App Store / Google Play screenshots and app icons / favicons for OLX. Use before writing OLX UI code or designing an OLX screen. Works in the OLX-Design-System repo.'
version: '2.0.0'
---

# OLX Pakistan design system

## Two modes

| The ask | Do |
| --- | --- |
| A quick question: a token, a component, markup, copy, "does this match live" | Read **`foundations.md`** and answer. No stages, no gates |
| Build or change a few OLX components or a page in code | `foundations.md`, then check with `npm run qa` |
| A design job that should end in something engineers build | `foundations.md` once, then the stages below |

## The full job

An **orchestrator**. It owns the questions, the plan and the gates. The work of each stage lives
in its own file. Read the stage file when you reach it; don't restate its rules here.

```
Intake → Plan (user approves) → Design → Review → Tracking → QA gate → Deliverable → Summary
                                stages/1   specialists/  specialists/  stages/2   stages/3
                                           design-review analytics-tracking
```

Everything runs from the **repo root** of `OLX-Design-System`. The repo has the measured system:
- `css/olx.css`: tokens, base and `olx-*` components;
- `site/pages/`: 202 live captures;
- `handoff/`: the working area this skill writes to;
- `design-system.json`: the index of all of it.

The foundations (tokens, components, conventions) are in **`foundations.md`** in this folder. Read it once per job.

## Ground rules

1. **Read `PROGRESS.md` and `CLAUDE.md` first.** Keep `PROGRESS.md`'s change log current after every stage you commit.
2. **Ask once, up front, only what you can't derive.** For each question, propose an answer and your confidence. Use AskUserQuestion, at most 4 questions per round.
3. **Show the plan and wait for approval before drawing anything.**
4. **Stop at every gate.** A failed stage doesn't start the next. Say why, then fix it or ask.
5. **Never present an invented value as a measured one.** Every value is one of three:
   - **measured**: from a live capture or a token;
   - **adopted**: a designer confirmed it;
   - **proposed**: new, unconfirmed.

   Proposed values go in `handoff/<feature>/PROPOSALS.md` and are said out loud.
6. **Real content only.** Use `handoff/content/fixtures.json`, which holds 864 listings copied from the captures: real prices, places and "x days ago". Never lorem, `John Doe`, `$`, or made-up metrics.
7. **Geomanist in Regular 400, Book 500 and Medium 600 only.** Never Bold, never Thin.

## Stage 0: Intake

First derive the answers you can, from the brief, `handoff/registry.json`, `site/index.json` and `design-system.json`. Then ask only about the gaps:

| Question | Default to propose |
| --- | --- |
| The job in one sentence, and is there a PRD or link? | from the ask |
| New feature, or a revamp of a captured page? (Stage 1, step 0 checks what exists) | from `site/index.json` |
| Vertical: Classifieds, Property or Motors? | from the ask |
| Platforms: `web-desktop`, `web-mobile` | both |
| Locale | English (Urdu is not in scope) |
| Who reads the hand-off: engineers, designers, product? | engineers |
| How far: design only / design + QA / all the way to the hand-off | all the way |
| Tracking: the primary metric and guardrails | from the PRD, else ask |

Fix the **feature name** (kebab-case) here. It becomes the registry `feature` and the folder `handoff/<feature>/`.

## Stage 1: Plan (gate: user approval)

Write the plan in chat, briefly:
- the screens and states (empty, loading and error included), and which are reused from captures or new;
- the flow;
- what's cut;
- what's unverified;
- the QA scope;
- the hand-off sections you expect to exclude, with reasons;
- the open questions, each with an owner.

End with **"Approve, or tell me what to change."** Don't continue without an answer.

## Stage 2: Design

Follow `stages/1-design.md` fully, including step 0 (is it already captured?), the product pass, the critique, and step 6, which leaves the hand-off pack ready (registry entries, `flows.json`, `deliverable.json`, first QA).

**Gate:** every screen and state is registered, and the critique is written.

## Stage 2.5: Review

Follow `specialists/design-review/GUIDE.md` on the new screens. Words go through `specialists/design-copy/GUIDE.md`, and every input through `specialists/design-forms/GUIDE.md`. Use `design-grid`, `design-typography` and `design-interaction` where the review names a gap.

**Gate:** no open P0 or P1. Fix them, or have the user accept them in writing; list accepted ones in the summary.

## Stage 2.7: Tracking (when a metric was given)

Follow `specialists/analytics-tracking/GUIDE.md`. It runs from metrics to actions on the flow, then through `event-taxonomy`, to the feature's `tracking.json`, registered in `handoff/registry.json`.

**Gate:** `npm run qa -- --scope <feature> --checks trk` has no blockers. Say out loud which events are only `proposed` (not seen on olx.com.pk).

## Stage 3: QA

Follow `stages/2-qa.md`: show the matrix, run it, state the verdict in one line.

**Gate:**
- **BLOCKED stops the job.** Fix the blockers (back to Stage 2), or, only if the user says so, add a waiver with a reason, owner and expiry.
- **PASS WITH WARNINGS can continue** once the user has been told the warnings.
- Never relabel a blocker as a pass.

## Stage 4: Deliverable

Only if the user chose "all the way". Follow `stages/3-deliverable.md`. It re-checks the QA gate and builds one self-contained INTERNAL HTML into `handoff/<feature>/dist/` (git-ignored).

**Gate:** its checks pass: no personal data, nothing remote, under 12 MB. If it fell back to placeholder images, say so.

## Stage 5: Summary

One screen, not the report:
- the verdict line, with blocker and warning counts;
- the three findings worth reading;
- open questions with owners;
- what's unverified (proposed values, proposed events);
- where the file is;
- what still needs a person (sign-off, observing click events on live).

Add the `PROGRESS.md` log entry, commit, and push to the working branch. Merging to `main` is asked, never assumed.

## Resuming

If the feature already has registry entries, `flows.json` or a deliverable, say what exists and start from the first stage that isn't done. Don't redesign. A new version of a hand-off bumps `version` in `deliverable.json` and adds a changelog entry.

## What this skill won't do

- Skip plan approval, or run stages in parallel.
- Click, type or submit on olx.com.pk. Capturing only navigates and scrolls; logged-in screens are captured on the Mac (`npm run capture:logged-in`).
- Publish a deliverable outside the repo. It's INTERNAL: it inlines the licensed Geomanist.

## Scripts (run from the repo root)

| Command | Does |
| --- | --- |
| `npm run qa -- --scope <feature\|screen\|page~desktop\|all> [--matrix] [--checks …]` | QA gate: writes `handoff/<feature>/qa/report.{json,html}` |
| `npm run handoff -- --feature <feature> [--placeholder-images]` | Builds the single-file deliverable |
| `npm run fixtures` | Rebuilds `handoff/content/fixtures.json` from the captures |
| `npm run verify:pixels` | Checks stored captures against their live screenshots |
| `MASK_PHOTOS=1 npm run verify:pixels -- site` | Same, ignoring listing photos |

`handoff/favourites/` is a **worked example**: screens, registry entries, `flows.json`, `tracking.json`, `deliverable.json`, a QA report and a built hand-off. Copy its shape.

## Specialist guides (read the one you need)

| Guide | Use when | Read |
| --- | --- | --- |
| design-review | Critique a screen like a senior OLX designer and catch what looks AI-made, before QA | `specialists/design-review/GUIDE.md` |
| design-copy | Any word on a screen: buttons, labels, errors, empty states, prices, dates | `specialists/design-copy/GUIDE.md` |
| design-forms | Post an Ad, login, filters, profile, report: layout, inputs, validation | `specialists/design-forms/GUIDE.md` |
| design-grid | Container, columns, breakpoints, spacing, listing grids and rows | `specialists/design-grid/GUIDE.md` |
| design-typography | Hierarchy from the measured scale, prices, truncation, the Geomanist weights | `specialists/design-typography/GUIDE.md` |
| design-interaction | Every state of every control, loading, dialogs and sheets, destructive actions | `specialists/design-interaction/GUIDE.md` |
| motion-design | Transitions, menus, sheets, carousels, toasts: timing and easing from the tokens | `specialists/motion-design/GUIDE.md` |
| icons | Find, check and register icons; house set first | `specialists/icons/GUIDE.md` |
| imagery-illustration | Listing photos, empty-state art, banners, avatars | `specialists/imagery-illustration/GUIDE.md` |
| design-prompt-images | Image-generation prompts for banners and heroes that don't look AI-made, set in Pakistan | `specialists/design-prompt-images/GUIDE.md` |
| design-inspiration | How other products solve a pattern; structure only, rebuilt from OLX parts | `specialists/design-inspiration/GUIDE.md` |
| chart-data-viz | Charts, stats, dashboards (seller performance, price trends) | `specialists/chart-data-viz/GUIDE.md` |
| token-check | Find and fix hard-coded colours, sizes and fonts in a screen or component | `specialists/token-check/GUIDE.md` |
| analytics-tracking | Metric → events → `tracking.json` for a feature | `specialists/analytics-tracking/GUIDE.md` |
| event-taxonomy | Reuse, extend or add events in `handoff/analytics/event-catalog.json` | `specialists/event-taxonomy/GUIDE.md` |
| ga4-event-spec | The dataLayer / GA4 spec engineers implement | `specialists/ga4-event-spec/GUIDE.md` |
| funnel-analysis | Funnels for browse → ad → contact, Post an Ad, favourites | `specialists/funnel-analysis/GUIDE.md` |
| company-store-screenshots | App Store / Google Play screenshots for the OLX apps | `specialists/company-store-screenshots/GUIDE.md` |
| company-web-app-assets | Favicons, PWA icons, iOS and Android app icons, with a dev hand-off folder | `specialists/company-web-app-assets/GUIDE.md` |

**Precedence for any OLX design question:**
1. the live captures (`site/pages/`), which win over memory and over any document;
2. tokens and components (`css/`, `tokens/tokens.json`, `design-system.json`);
3. these guides.

Report any conflict rather than quietly choosing one side.
