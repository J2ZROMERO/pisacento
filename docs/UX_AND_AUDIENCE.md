# View simplification and intended audience

## DRY in the rendered view

One task should have one primary visible control; repeated explanations should have one primary home. DRY does not mean removing different views of different information: musical attacks and weight changes remain separate because they are not equivalent.

- The Salsa route is the main page heading; the earlier promotional hero no longer repeats it.
- The primary mixer owns instrument selection and active-layer switches. Advanced settings retain volume, audition, mute and documented preset actions. The duplicate selector and layer cards remain hidden state nodes while legacy controllers depend on their IDs.
- The count/instrument/support matrix owns the step sequence. The repeated sequence paragraph, repeated mode notice and extra basic-only button are omitted from the visible view.
- The optional count help explains how to read the matrix. The feet view owns orientation, foot-label convention and current landing. Source details remain available; the large repeated evidence notice is consolidated there.
- A shared typed view component creates sections/disclosures for Salsa layout, expert context and Bachata help.
- Bachata keeps the practical route together; original recordings live in a separate collapsible listening resource. Its first-foot convention and evidence catalogue are expandable rather than always filling the main view.

The hidden state nodes are a compatibility bridge, not a claim that legacy controllers have been completely refactored. Removing those nodes safely requires replacing their consumers with a shared state model. Existing runtime behavior and source access are retained.

## Primary audience hypothesis

Spanish-speaking adults taking beginner or early improver Salsa classes, especially linear On1/New York On2, who want short practice between classes and are confused by counts, direction changes, lead/follower conventions or instrument accents. This is a product-fit hypothesis inferred from current functionality, not validated market research.

## Secondary audience hypotheses

- Students returning after a break who need a visual reminder of timing and roles.
- Dance instructors using the matrix and feet as an explanation aid during class. It is not a certified curriculum or replacement for the teacher.
- Beginning Bachata students learning support versus tap and recognizing the five basic instrument roles. Bachata playback is independent of the animated practice, so it is a supporting resource rather than a synchronized course.

## Lower-fit use cases today

Advanced dancers seeking full partner technique or choreography; musicians seeking transcription/notation of complete arrangements; people expecting accurate automatic breakdown of any song; learners who need movement assessment. The app does not yet meet these needs.

## Positioning to validate

"Understand what you hear and when to change your weight, with visible feet and traceable explanations."

Recruit learners from actual beginner On1/On2 classes. Observe whether they can find their route, identify a support versus an instrumental hit, explain the selected role, and use the optional label swap without confusing it with a musical timing change. Record difficulties before broadening scope. Do not claim learning improvement until observed.

## Count-only clarification · 2026-11-14

The former conventions disclosure is no longer visible. The practice transport shows only the current support sequence and direction-change counts, with a short note that 4/8 do not add a support. The existing learningCounts node is reused, so changing the timing updates the explanation through the same route controller. Historical convention nodes remain hidden for compatibility; evidence is still accessible from the existing source button.

## Four-stage route · 2026-11-14

The Salsa route now has four nonoverlapping exercises: steady pulse, basic supports including roles, instrument independence, and recognizing musical changes. Each lesson shows a short reason and exercise. Repeated learning graphics, criterion paragraphs and the generic inline expert cards are no longer shown. Musical references remain in optional details and the source library. Progress uses compas-learning-v2 so completion of an old stage is not misrepresented as completion of a consolidated exercise.

The existing YouGlish-like video discovery UI is restored at the bottom in one disclosure. Selecting a step/figure sets the search branch; Another video searches within the same step/timing and uses the embedded YouTube player. Public YouTube search can fail or change; the API remains optional. Results are not evidence-verified, and internet results have no automatically verified step-only cut. Existing manually defined clip start/end points remain available.

## Free consumption · 2026-11-14

Lesson navigation is below the practice/feet, with previous, repeat and next controls. No completion badges or learning progress writes are performed. The old progress key is neither read nor updated; existing browser data is not deleted. All four topics are immediately accessible. The resource/tools section and inline sound/step audit panel are hidden from the product view; implementation nodes remain for controller compatibility. Audio volume/mute/pulse controls are moved into one inline audio disclosure. Below the practice remain two resources only: musician perspective and the YouGlish-like video browser. Original references remain inside the musical explanation and in source documentation.

## Salsa and counting only · 2026-11-14

The active page now enters Salsa directly and contains three exercises: pulse, basic supports, and keeping the count when changing sounds. Short reason paragraphs are slightly expanded with a concrete explanation. Bachata, genre cards, video discovery, expert catalogue and musician-perspective modules are no longer loaded. Legacy source remains for history; hidden controller-owned DOM nodes are retained where removing them would break older handlers. There is no visible bottom resource section. Prior audience and feature descriptions must be read with this reduced scope.

## Rehearsal notebook art direction

workshop.css owns the final active presentation: paper/ink palette, brick accents, serif editorial headings, flat ruled sections and numbered navigation. System fonts and original vector geometry avoid external graphic/font dependencies. This is a visual change; the step timing and role logic remain unchanged. Three simple exercises and optional help are preserved.
