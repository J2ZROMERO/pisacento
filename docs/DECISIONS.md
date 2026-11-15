# Modification rationale and decisions

This documents the reasoning behind the current implementation, not a promise that every earlier experiment remains supported.

| Decision | Reason | Consequence |
| --- | --- | --- |
| Put Salsa/Bachata cards first | The learner needs an obvious genre entry | Separate learning contexts without discarding existing Salsa work |
| Keep Bachata independent initially | Salsa data and clocks encode Salsa-specific assumptions | Some controller/layout duplication remains; future unification needs explicit domain models |
| Teach written rhythms before arbitrary song analysis | Tempo estimation alone does not establish downbeats, phrases or instrument identities | Practice is reproducible; no universal automatic-song claim |
| Separate instrument hits from weight changes | A clave or bell does not prescribe one step per strike | Count, sound and feet remain different representations |
| One feet view | Repeated diagrams caused confusion | Role, partner mode and orientation configure one representation |
| Compact New York On2 with sourced role conventions | On2 means direction changes, not only two supports | Explain all six supports and the selected convention |
| Sources with explicit review scope | Metadata, a public lesson and full technical notation are different evidence | Do not claim to have reviewed paid courses or unseen footage |
| Limit active Salsa content through an allowlist | Earlier prototypes contained illustrative/synthetic substitutes | Unverified historical data stays out of the approved experience |
| Label electronic metronome clearly | A useful timing aid is not a real instrument recording | No misleading timbre claims |
| Use Bachata publisher embeds | Actual performances are more faithful than invented loops | Internet/provider limits apply; no integrated synchronized playback yet |
| Do not use güiro as güira | Similar names do not establish identical instruments or technique | Bachata güira uses its own published example |
| Keep taps different from supports | Full weight transfer on every count misteaches the chosen basic | Taps use a separate visual treatment and no full transfer |
| Keep Bachata variant feet unchanged | Context descriptions do not support inventing distinct basic sequences | Variant selector changes context and references |
| Self-assessment instead of automatic grading | The app does not observe movement | Completion means the user says they can do the exercise |
| Mobile-first, optional details | Too many simultaneous controls overwhelmed the learning route | Start with essential controls, disclose explanations/resources on demand |

## Known engineering debt

The app grew through iterative modifications: many scripts augment existing DOM after initialization and later styles override earlier rules. The historical README is not a current specification. Preserve regression checks before consolidating controllers, CSS or data definitions. The evidence allowlist is a product safeguard, not a substitute for independent expert review.

## Technical timing labels · 2026-11-14

The visible Salsa timing selector and learning routes use Break on 1 and Break on 2, with supports 123/567. Regional/style aliases are no longer the primary navigation names. Stable internal IDs remain on1/on2. Break on 2 alone does not distinguish 123/567 from 234/678; support counts remain visible. No claim of a single universal original name is made. Reference: https://thedancedojo.com/salsa-timing-on1-on2-on3/ distinguishes timing from style. Historical titles, author names and source URLs are retained as attribution.
