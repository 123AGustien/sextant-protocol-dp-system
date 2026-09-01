SEXTANT PROTOCOL™

MARIN DP RESILIENCE V&V SCENARIO TEST MATRIX

Project: MARIN USV V&V Research
Repository: "sextant-protocol-dp-system"
Branch: "feature/marin-usv-vv-research"
Engine: SPD v13.1.0
Vessel: SEXTANT-MPSV-01
Vessel Type: Multi-Purpose Support Vessel
DP Class: DP2-SIMULATED
Status: RESEARCH / ENGINEERING V&V
Operational DP Connection: NONE
Autonomous Command: FALSE
Human Authority: FINAL

---

1. Purpose

This Scenario Test Matrix defines a structured research and engineering V&V approach for evaluating the SEXTANT PROTOCOL™ DP Resilience Research Cockpit.

The matrix maps:

SCENARIO → INPUT → VESSEL STATE → DECISION → KPI → HUMAN AUTHORITY → AUDIT RESULT

The objective is to demonstrate whether the layered resilience architecture produces deterministic, traceable and explainable simulated responses under controlled maritime conditions.

---

2. Architecture Under Test

The architecture under test is:

ENVIRONMENT

↓

PRIMARY AI — S1

↓

SECONDARY AI — S2 SAFETY LAYER

↓

STABILIZER — ARBITRATION

↓

CAPTAIN AI LENA — DECISION SUPPORT

↓

HUMAN AUTHORITY

↓

SIMULATED DP RESPONSE

No stage of this architecture provides an operational command to a vessel.

---

3. Vessel Condition Model

The V&V framework shall consider both environmental and vessel-condition variables.

Environmental variables

- Wind Stress
- Current Stress
- Wave Stress
- Tidal Stress

Vessel attitude

- Heel
- List
- Trim
- Heading
- Rate of Turn

Stability variables

- GM, where available as an input
- GZ
- Righting Moment
- Stability Index
- Recovery Margin
- Heel Rate
- Trim Rate

Loading / CG variables

- Displacement
- VCG
- TCG
- LCG
- Transverse CG shift
- Longitudinal CG shift

Draft variables

- Forward Draft
- Aft Draft
- Mean Draft
- Trim
- Assigned Load Line
- Applicable Load-Line Zone
- Applicable Seasonal Zone
- Draft Margin
- Simulated Load-Line Envelope Status

---

4. Stability Research Principle

The simulator shall not treat GM as the sole representation of vessel stability.

The research model shall consider the relationship:

GZ → RIGHTING ARM → RIGHTING MOMENT

Conceptually:

Righting Moment = Δ × GZ

where:

- Δ = vessel displacement
- GZ = righting arm

The V&V scenarios shall therefore examine dynamic recovery behaviour rather than relying exclusively on a static GM threshold.

---

5. Heel and List

Heel and list shall be distinguished.

Heel

Dynamic or transient transverse inclination associated with changing forces and moments.

Potential contributors include:

- Wind
- Waves
- Current
- Thrust
- Turning
- Rate of Turn
- Transient environmental loading

List

Persistent or quasi-static transverse inclination associated with an asymmetric vessel condition.

Potential contributors include:

- Transverse CG shift
- Cargo distribution
- Ballast condition
- Tank condition
- Load redistribution

The test matrix shall evaluate the interaction between heel/list and:

GZ + righting moment + trim + CG + rate of turn + environmental loading.

---

6. Trim

Trim shall be treated as a longitudinal vessel-state variable.

The research model may evaluate:

- Forward draft
- Aft draft
- Mean draft
- Trim by bow
- Trim by stern
- LCG
- LCB
- Longitudinal loading condition

Conceptual relationship:

LCG → TRIM → HYDROSTATIC RESPONSE → DYNAMIC RESPONSE

Trim shall also be evaluated together with heel/list.

---

7. Controlled Swing

The research model shall evaluate controlled swing behaviour.

Conceptually:

RATE OF TURN

→ LATERAL RESPONSE

→ HEEL RESPONSE

→ GZ / RESTORING RESPONSE

→ RECOVERY

The purpose is to examine whether simulated control responses remain controlled rather than producing unnecessary abrupt corrections or excessive oscillation.

---

8. Load-Line and Draft Envelope

Load-line and draft information shall be treated as a vessel-condition and regulatory-envelope input.

The simulator shall not claim to certify load-line compliance.

The V&V framework may record:

- Assigned Load Line
- Applicable Load-Line Zone
- Applicable Seasonal Zone
- Observed Draft
- Forward Draft
- Aft Draft
- Mean Draft
- Trim
- Draft Margin
- Simulated Load-Line Envelope Status

Possible outputs:

WITHIN SIMULATED LOAD-LINE ENVELOPE

or

DRAFT ENVELOPE EXCEEDED — HUMAN / ENGINEERING REVIEW

The simulator shall not represent either result as statutory certification.

---

9. V&V Scenario Matrix

ID| Scenario| Principal Inputs| Vessel / Stability Condition| Expected Decision| Primary KPI| Human Authority| Audit
V&V-01| Normal Environment| Low wind/current/wave/tide| Baseline heel/list/trim| Maintain monitoring| Position error / stability index| FINAL| PASS/FAIL
V&V-02| Moderate Weather| Increased wind + wave| Dynamic heel| Increase monitoring| Heel rate / recovery time| FINAL| PASS/FAIL
V&V-03| Heavy Weather| High wind + wave| Reduced recovery margin| Prepare stabilisation| Recovery margin| FINAL| PASS/FAIL
V&V-04| Critical Current Surge| High/changeable current| Heel/list + yaw response| Safe state / escalate| Rate of turn / position error| FINAL| PASS/FAIL
V&V-05| Wind Gust| Rapid wind change| Transient heel| Controlled response| Peak heel / recovery time| FINAL| PASS/FAIL
V&V-06| Combined Environment| Wind + current + wave + tide| Combined dynamic state| Stabilizer arbitration| Stability index / position error| FINAL| PASS/FAIL
V&V-07| Transverse CG Shift| TCG change| Persistent list| Reassess stability| List / GZ / recovery margin| FINAL| PASS/FAIL
V&V-08| Longitudinal CG Shift| LCG change| Trim change| Reassess vessel state| Trim / draft distribution| FINAL| PASS/FAIL
V&V-09| Trim + Heel| LCG + transverse loading| Combined attitude| Controlled recovery| GZ / righting moment| FINAL| PASS/FAIL
V&V-10| Controlled Swing| Rate-of-turn disturbance| Heel + yaw interaction| Controlled simulated response| ROT / heel rate / position error| FINAL| PASS/FAIL
V&V-11| Reduced Draft Margin| Draft approaching limit| Reduced draft margin| Warning / review| Draft margin| FINAL| PASS/FAIL
V&V-12| Zone / Seasonal Draft| Applicable zone/season| Permitted draft condition| Verify simulated envelope| Draft vs applicable limit| FINAL| PASS/FAIL
V&V-13| Critical Stability| Severe loading/environment| Reduced recovery capability| Safe state / escalate| Recovery margin| FINAL| PASS/FAIL
V&V-14| Human Acknowledge| Any selected scenario| Condition acknowledged| No action| No simulated command| FINAL| PASS/FAIL
V&V-15| Maintain Safe State| Critical scenario| Protective state| Maintain safe state| No simulated manoeuvre| FINAL| PASS/FAIL
V&V-16| Authorize Simulated Response| Predefined scenario| Human-approved condition| Execute simulation only| Response trace| FINAL| PASS/FAIL
V&V-17| Repeatability| Identical inputs| Identical initial state| Same result| Deterministic output| FINAL| PASS/FAIL
V&V-18| Recovery Trend| Progressive disturbance| Changing recovery margin| Escalation as threshold changes| Trend / transition point| FINAL| PASS/FAIL

---

10. Primary V&V KPIs

The following KPIs shall be considered for future implementation.

Environmental response

- Environmental Stress
- Risk Classification
- Input repeatability

Stability response

- Heel
- List
- Trim
- Heel Rate
- Trim Rate
- GZ
- Righting Moment
- Stability Index
- Recovery Margin

Dynamic response

- Rate of Turn
- Heading Error
- Position Error
- Recovery Time
- Maximum transient response
- Controlled swing behaviour

Vessel condition

- Forward Draft
- Aft Draft
- Mean Draft
- Draft Margin
- CG position
- Load-line envelope status

Architecture performance

- Primary AI result
- Secondary AI result
- Stabilizer arbitration
- Lena recommendation
- Human decision
- Simulated response
- Audit completeness

---

11. Human Authority V&V

Every scenario shall demonstrate that:

AUTONOMOUS COMMAND = FALSE

and:

HUMAN AUTHORITY = FINAL

The simulator shall provide:

- assessment;
- recommendation;
- urgency;
- simulated response proposal;
- human decision gate;
- audit record.

No simulated manoeuvre shall be treated as an operational DP command.

---

12. Audit Requirements

Each completed scenario should produce a trace containing, at minimum:

SIMULATOR_INITIALIZED
ENVIRONMENT_ASSESSMENT
PRIMARY_AI_ASSESSMENT
SECONDARY_AI_ASSESSMENT
STABILIZER_ARBITRATION
LENA_DECISION_SUPPORT
HUMAN_AUTHORIZATION_GATE
SIMULATED_RESPONSE
AUTONOMOUS COMMAND
OPERATIONAL DP CONNECTION
SIMULATION STATUS

Expected baseline:

STATUS: PASS

HUMAN AUTHORIZATION GATE: ACTIVE

AUTONOMOUS COMMAND: FALSE

OPERATIONAL DP CONNECTION: NONE

---

13. Deterministic Repeatability Test

Identical inputs shall produce identical simulated outputs.

For a repeated scenario:

INPUT A

→ RUN 1

→ RESULT A

and:

INPUT A

→ RUN 2

→ RESULT A

The V&V record shall compare:

- Environmental Stress
- Risk Classification
- Primary AI
- Secondary AI
- Stabilizer
- Lena Recommendation
- Stability Index
- Position Error
- Proposed Response
- Human Gate
- Audit Result

Any unexplained difference shall be recorded as a V&V observation.

---

14. Scenario Result Classification

Each scenario shall receive:

PASS

Expected architecture behaviour demonstrated and audit complete.

CONDITIONAL PASS

Expected behaviour substantially demonstrated but requiring engineering review.

FAIL

Expected behaviour not demonstrated or audit integrity compromised.

NOT TESTED

Scenario not yet implemented or insufficient data available.

---

15. Engineering Review Boundary

This matrix is a research V&V framework.

It does not constitute:

- Class approval;
- statutory stability approval;
- load-line certification;
- operational DP capability assessment;
- vessel-specific safe operating limits;
- certified autonomous-control validation.

Where vessel-specific hydrostatic, stability, manoeuvring or load-line data are required, those data shall be supplied and independently reviewed.

---

16. Demonstration Sequence for MARIN

The recommended demonstration sequence is:

Demonstration 1 — Normal

Show deterministic baseline behaviour.

Demonstration 2 — Moderate

Increase environmental stress and demonstrate adaptive monitoring.

Demonstration 3 — Critical

Increase environmental stress and demonstrate:

PRIMARY → SECONDARY → STABILIZER → LENA → HUMAN AUTHORITY

Demonstration 4 — Stability

Introduce heel/list/trim and demonstrate the stability-state concept.

Demonstration 5 — CG Shift

Demonstrate the effect of transverse and longitudinal CG changes.

Demonstration 6 — Controlled Swing

Demonstrate rate-of-turn interaction with heel and position response.

Demonstration 7 — Draft / Load-Line Envelope

Demonstrate draft-condition monitoring without claiming statutory certification.

Demonstration 8 — Human Authority

Demonstrate:

NO HUMAN AUTHORIZATION → NO SIMULATED RESPONSE

then:

HUMAN AUTHORIZATION → SIMULATED RESPONSE ONLY

Demonstration 9 — Repeatability

Run an identical scenario twice and demonstrate deterministic repeatability.

---

17. Target V&V Evidence

The desired evidence package for MARIN is:

Scenario

→ Defined Inputs

→ Deterministic Calculation

→ Layer-by-Layer Trace

→ Stability / Vessel-State Response

→ Captain AI Lena Recommendation

→ Human Decision

→ Simulated Response

→ KPI Results

→ Audit Record

→ Repeatability Evidence

This provides a structured basis for independent engineering review.

---

18. Current Implementation Status

The existing MARIN cockpit already demonstrates:

- Environmental assessment;
- Primary AI;
- Secondary AI;
- Stabilizer arbitration;
- Captain AI Lena decision support;
- Human authorization gate;
- Simulated response;
- Audit trail;
- Autonomous command = FALSE;
- Operational DP connection = NONE.

The following are framework-level V&V extensions and should not be added to the executable cockpit until their engineering definitions have been reviewed:

- Heel;
- List;
- Trim;
- GZ;
- Righting Moment;
- CG / LCG / TCG / VCG;
- Rate of Turn;
- Dynamic recovery margin;
- Load-line zone;
- Seasonal draft condition;
- Draft envelope.

---

19. Development Sequence

The controlled development sequence shall be:

STEP 1

Freeze the current MARIN V&V baseline.

STEP 2

Review the Dynamic Stability & Controlled Recovery Framework.

STEP 3

Review the present Scenario Test Matrix.

STEP 4

Define the minimum additional stability variables.

STEP 5

Implement only approved variables in the simulator.

STEP 6

Run deterministic regression tests.

STEP 7

Update the V&V matrix with actual cockpit outputs.

STEP 8

Generate MARIN demonstration evidence.

---

20. Final Research Principle

The purpose of the MARIN V&V demonstration is not to claim that the prototype is a certified DP or stability system.

The purpose is to demonstrate whether SEXTANT PROTOCOL™ can provide a:

DETERMINISTIC

TRACEABLE

LAYERED

EXPLAINABLE

HUMAN-AUTHORIZED

SIMULATED RESILIENCE RESPONSE

under controlled maritime scenarios.

ENVIRONMENT

→ PRIMARY AI

→ SECONDARY AI

→ STABILIZER

→ CAPTAIN AI LENA

→ HUMAN AUTHORITY

→ SIMULATED RESPONSE

with vessel condition represented through:

HEEL + LIST + TRIM + CG + GZ + RIGHTING MOMENT + RATE OF TURN + DRAFT / LOAD-LINE ENVELOPE

---

SEXTANT PROTOCOL™ — MARIN DP RESILIENCE V&V

RESEARCH • SIMULATION • ENGINEERING ANALYSIS • SCENARIO TESTING • REPEATABLE VALIDATION

NOT CERTIFIED MARINE CONTROL SOFTWARE

NOT FOR CONNECTION TO OPERATIONAL DP, PROPULSION, NAVIGATION OR SAFETY SYSTEMS