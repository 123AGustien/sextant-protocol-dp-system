SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V SCENARIO TEST MATRIX

MASTER SEQUENTIAL V&V CATALOGUE

Document: MARIN V&V Scenario Test Matrix
System: Sextant Protocol™
Architecture: SPD v13.1 / DP Resilience Cockpit
Purpose: Proposed MARIN engineering / V&V research framework
Status: Research / V&V Proposal Development
Branch: "feature/marin-usv-vv-research"

---

1. DOCUMENT STATUS AND BOUNDARY

This document consolidates the proposed Sextant Protocol™ MARIN DP / USV resilience V&V scenarios into one sequential master catalogue.

The scenario numbering is continuous:

VV-001 → VV-XXX

No duplicate numbering shall be used for separate scenario groups.

The scenarios are intended to provide a structured research basis for:

- resilience assessment;
- controlled failure injection;
- independent verification;
- decision-support evaluation;
- human-authority testing;
- corrective-action testing;
- re-test validation;
- latency measurement;
- deterministic replay;
- auditability; and
- potential integration with an appropriate MARIN research/testbed environment.

These scenarios are proposed V&V research scenarios and are not final MARIN acceptance criteria.

MARIN engineering and research teams may modify, replace, combine or extend the scenarios following technical review.

---

2. CORE RESEARCH ARCHITECTURE

The proposed assessment chain is:

OBSERVE
↓
VERIFY
↓
ASSESS
↓
PRIMARY AI
↓
SECONDARY AI
↓
STABILIZER
↓
RECOMMENDATION
↓
CAPTAIN AI LENA
↓
HUMAN AUTHORITY
↓
SIMULATED RESPONSE
↓
RE-TEST / VALIDATION
↓
AUDIT
↓
UPDATE

The central engineering principle is:

SEPARATE ASSESSMENT FROM ACTION.

The architecture is intended to provide decision support and resilience assessment without automatically converting an assessment into physical vessel action.

---

3. UNIVERSAL HUMAN-AUTHORITY BOUNDARY

For every scenario:

CAPTAIN AI LENA: Decision support only.

MASTER / AUTHORIZED HUMAN OPERATOR: Final authority.

SIMULATED RESPONSE: Human authorization required.

OPERATIONAL DP CONNECTION: NONE.

PHYSICAL VESSEL CONNECTION: NONE.

AUTONOMOUS OPERATIONAL COMMAND: FALSE.

No scenario shall be interpreted as authorizing autonomous navigation, DP control, propulsion control, steering control, crane control, cargo control or other physical vessel action.

---

VV-001 — DP SYSTEM NORMAL OPERATING CONDITION

PURPOSE

Establish the baseline condition against which degraded and failure scenarios can be compared.

INPUT

- Vessel position
- Heading
- Speed
- Wind
- Current
- Wave condition
- Position-reference status
- Thruster availability
- Power availability
- DP redundancy status
- Vessel loading condition
- Draft
- Trim
- Environmental operating condition

SCENARIO / CONDITION

Normal simulated DP operating condition with no injected critical failure.

PROCESS

OBSERVE → VERIFY → ASSESS → PRIMARY AI → SECONDARY AI → STABILIZER → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

ASSESS

- Position stability
- Heading stability
- Environmental loading
- Thruster availability
- Power availability
- Redundancy
- Position-reference integrity
- Overall resilience condition

EXPECTED DECISION

NORMAL / MAINTAIN SAFE STATE / MONITOR

PASS CRITERIA

1. Baseline vessel condition is recorded.
2. All applicable inputs are traceable.
3. Primary assessment is generated.
4. Secondary assessment is generated.
5. Stabilizer result is recorded.
6. Captain AI Lena provides decision support.
7. Human authority remains final.
8. No physical command is generated.

---

VV-002 — MODERATE DP DEGRADATION

PURPOSE

Assess resilience under a controlled moderate degradation of DP capability.

INPUT

- Vessel position
- Heading
- Position error
- Wind
- Current
- Wave condition
- Thruster availability
- Power availability
- Position-reference status
- Redundancy status

SCENARIO

Controlled moderate degradation of one or more DP-supporting parameters.

PROCESS

OBSERVE → VERIFY → ASSESS → PRIMARY AI → SECONDARY AI → STABILIZER → RECOMMEND → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

ASSESS

- Position deviation
- Heading deviation
- Environmental loading
- Available thrust
- Power condition
- Redundancy
- Position confidence
- Resilience margin

EXPECTED DECISION

MONITOR / REQUEST DIAGNOSTICS / MAINTAIN SAFE STATE / HUMAN REVIEW

PASS CRITERIA

The degradation is detected, independently assessed and recorded without generating an autonomous operational command.

---

VV-003 — CRITICAL DP DEGRADATION

PURPOSE

Assess system response to a high-severity DP resilience condition.

INPUT

- Vessel position
- Position error
- Heading
- Wind
- Current
- Wave condition
- Thruster availability
- Power availability
- Redundancy
- Position-reference status
- Environmental loading

SCENARIO

Controlled critical degradation affecting the simulated DP resilience condition.

ASSESS

- Position error
- Heading error
- Environmental stress
- Thruster availability
- Power availability
- Redundancy
- Position confidence
- Safe-state requirement
- Recovery requirement

EXPECTED DECISION

PREPARE SAFE STATE / REQUEST DIAGNOSTICS / ESCALATE / MAINTAIN SAFE STATE

PASS CRITERIA

1. Critical degradation is detected.
2. Secondary assessment independently identifies the condition.
3. Stabilizer evaluates assessment agreement.
4. Captain AI Lena provides structured decision support.
5. Human authority remains final.
6. No recovery is treated as authorized without human authorization.
7. No physical vessel command is generated.

---

VV-004 — POSITION REFERENCE DEGRADATION

PURPOSE

Evaluate resilience when the primary position reference becomes degraded or unreliable.

INPUT

- Primary position reference
- Secondary position reference
- GNSS / DGPS status
- Position error
- Position confidence
- Heading
- Environmental condition
- DP status
- Reference-system availability

ASSESS

- Position-reference integrity
- Source consistency
- Position confidence
- Divergence between references
- Impact on DP assessment
- Need for verification
- Safe-state requirement

EXPECTED DECISION

MONITOR / VERIFY REFERENCE / REQUEST DIAGNOSTICS / ESCALATE

PASS CRITERIA

Loss or degradation of position confidence is detected before the assessment relies on an unverified position source.

---

VV-005 — LOSS OF PRIMARY POSITION REFERENCE

INPUT

- Primary position-reference status
- Secondary reference status
- GNSS / DGPS
- Position error
- Heading
- Environmental condition
- DP capability
- Human operator availability

SCENARIO

Controlled loss of the primary position reference.

ASSESS

- Reference loss
- Remaining reference capability
- Position confidence
- DP resilience
- Environmental loading
- Safe-state condition
- Human decision requirement

EXPECTED DECISION

SECONDARY REFERENCE / REQUEST DIAGNOSTICS / MAINTAIN SAFE STATE / ESCALATE

PASS CRITERIA

The system detects the reference loss and records the remaining available information and confidence level.

---

VV-006 — LOSS OF THRUSTER AVAILABILITY

INPUT

- Thruster availability
- Thruster status
- Vessel position
- Heading
- Wind
- Current
- Wave condition
- DP load
- Power status
- Remaining propulsion capability

ASSESS

- Available thrust
- Environmental demand
- Position response
- Heading response
- Remaining redundancy
- Resilience margin
- Safe-state requirement

EXPECTED DECISION

MONITOR / REQUEST DIAGNOSTICS / REDUCE EXPOSURE / ESCALATE

PASS CRITERIA

The loss of simulated thrust capability produces a traceable reassessment without generating a physical propulsion command.

---

VV-007 — POWER DEGRADATION

INPUT

- Main power status
- Generator availability
- Bus status
- Emergency power status
- Thruster availability
- DP status
- Navigation status
- Environmental condition

ASSESS

- Available power
- Power redundancy
- Effect on DP capability
- Critical equipment status
- Emergency-power status
- Recovery condition

EXPECTED DECISION

MONITOR / REQUEST DIAGNOSTICS / SAFE STATE / ESCALATE

PASS CRITERIA

Power degradation is detected and its effect on the resilience condition is traceable.

---

VV-008 — LOSS OF REDUNDANCY

INPUT

- DP redundancy
- Thruster availability
- Generator availability
- Power distribution
- Position references
- Control-system status
- Environmental condition

ASSESS

- Remaining redundancy
- Single-point exposure
- Environmental demand
- Position resilience
- Heading resilience
- Safe-state condition

EXPECTED DECISION

MONITOR / RESTRICT EXPOSURE / SAFE STATE / ESCALATE

PASS CRITERIA

The architecture identifies the loss of redundancy and records its effect on resilience.

---

VV-009 — ENVIRONMENTAL LOAD INCREASE

INPUT

- Wind speed
- Wind direction
- Current
- Wave height
- Wave period
- Swell
- Vessel heading
- Vessel speed
- Draft
- Trim
- Loading condition

ASSESS

- Environmental stress
- Wind load
- Current load
- Wave load
- Position response
- Heading response
- Stability response
- Structural exposure

EXPECTED DECISION

MONITOR / INCREASE CAUTION / REDUCE EXPOSURE / ESCALATE

PASS CRITERIA

Increasing environmental load produces a traceable reassessment.

---

VV-010 — WIND GUST / RAPID ENVIRONMENTAL CHANGE

INPUT

- Mean wind speed
- Gust speed
- Wind direction
- Rate of change
- Current
- Wave condition
- Vessel heading
- DP condition
- Position error

ASSESS

- Environmental change
- Gust severity
- DP load response
- Position error
- Heading response
- Stability response
- Safe-state requirement

EXPECTED DECISION

MONITOR / INCREASE MONITORING / REDUCE EXPOSURE / SAFE STATE / ESCALATE

PASS CRITERIA

Rapid environmental deterioration is detected and the system reassesses the vessel state.

---

VV-011 — HEAVY SEA / WAVE RESPONSE

INPUT

- Wave height
- Wave period
- Wave direction
- Swell
- Vessel heading
- Vessel speed
- Draft
- Trim
- Loading condition
- Environmental condition

ASSESS

- Wave-induced loading
- Vessel motion
- Heel
- List
- Trim
- Hull stress
- Bending moment
- Shearing force
- Torsional response
- Pounding / slamming exposure

EXPECTED DECISION

MONITOR / REDUCE EXPOSURE / ALTER SIMULATED CONDITION / ESCALATE

PASS CRITERIA

Heavy-sea exposure produces a traceable resilience and structural-response assessment without autonomous operation.

---

VV-012 — COMBINED ENVIRONMENTAL DISTURBANCE

INPUT

- Wind
- Wind gust
- Current
- Wave height
- Wave period
- Swell
- Vessel heading
- Vessel speed
- Draft
- Trim
- Heel
- Loading condition
- DP status
- Position error

ASSESS

- Combined environmental stress
- Position response
- Heading response
- Stability
- Structural loading
- DP resilience
- Safe-state condition

EXPECTED DECISION

MAINTAIN SAFE STATE / REDUCE EXPOSURE / ESCALATE

PASS CRITERIA

The system identifies simultaneous environmental stressors rather than assessing each condition in isolation.

---

VV-013 — CURRENT SURGE / RAPID CURRENT CHANGE

INPUT

- Current speed
- Current direction
- Rate of current change
- Vessel heading
- Vessel speed
- Position
- Position error
- DP status
- Thruster availability
- Environmental condition

ASSESS

- Current loading
- Position response
- Heading response
- Thruster demand
- Remaining resilience
- Safe-state requirement

EXPECTED DECISION

MONITOR / REQUEST DIAGNOSTICS / REDUCE EXPOSURE / ESCALATE

PASS CRITERIA

The architecture detects rapid current deterioration and records the resulting resilience assessment.

---

VV-014 — POSITION ERROR / DRIFT RESPONSE

INPUT

- Reference position
- Actual simulated position
- Position error
- Heading
- Speed
- Wind
- Current
- Wave condition
- DP status
- Position-reference status

ASSESS

- Position deviation
- Drift direction
- Rate of position change
- Environmental contribution
- Position confidence
- DP response
- Safe-state condition

EXPECTED DECISION

MONITOR / VERIFY / REQUEST DIAGNOSTICS / ESCALATE

PASS CRITERIA

Position degradation is measured, recorded and independently assessed.

---

VV-015 — HEADING ERROR / YAW RESPONSE

INPUT

- Reference heading
- Actual simulated heading
- Heading error
- Rate of turn
- Wind
- Current
- Wave condition
- Thruster availability
- DP status

ASSESS

- Heading error
- Yaw response
- Rate of turn
- Environmental effect
- Control capability
- Resilience margin

EXPECTED DECISION

MONITOR / VERIFY / REQUEST DIAGNOSTICS / ESCALATE

PASS CRITERIA

Heading degradation and rate-of-turn response are traceable.

---

VV-016 — DP / POSITION / ENVIRONMENT COMBINED FAILURE

INPUT

- Vessel position
- Position error
- Heading
- Wind
- Current
- Wave condition
- Thruster availability
- Power availability
- Redundancy
- Position-reference status

ASSESS

- Environmental stress
- Position response
- Heading response
- Thruster capability
- Power condition
- Redundancy
- Position confidence
- Safe-state requirement

EXPECTED DECISION

MAINTAIN SAFE STATE / REQUEST DIAGNOSTICS / PREPARE SAFE STATE / ESCALATE

PASS CRITERIA

The architecture produces an integrated assessment rather than allowing one parameter to hide another critical degradation.

---

VV-017 — PRIMARY / SECONDARY AI DIVERGENCE

INPUT

- Scenario condition
- Primary assessment
- Secondary assessment
- Risk result
- Confidence level
- Environmental condition
- Position confidence
- Equipment status

ASSESS

- Primary AI result
- Secondary AI result
- Assessment divergence
- Confidence
- Safety significance
- Stabilizer response

EXPECTED DECISION

MAINTAIN SAFE STATE / REQUEST DIAGNOSTICS / ESCALATE

PASS CRITERIA

Assessment disagreement is explicitly detected and recorded.

---

VV-018 — STABILIZER ARBITRATION

INPUT

- Primary AI assessment
- Secondary AI assessment
- Risk level
- Confidence
- Scenario condition
- Environmental condition
- Equipment status

ASSESS

- Agreement
- Divergence
- Safety-critical disagreement
- Arbitration result
- Recommended safe state

EXPECTED DECISION

MAINTAIN SAFE STATE / REQUEST DIAGNOSTICS / ESCALATE

PASS CRITERIA

The Stabilizer provides a traceable arbitration result and does not act as a physical controller.

---

VV-019 — CAPTAIN AI LENA DECISION SUPPORT

INPUT

- Primary assessment
- Secondary assessment
- Stabilizer result
- Risk level
- Scenario
- Confidence
- Equipment condition
- Environmental condition

ASSESS

- Structured recommendation
- Alternatives
- Risk
- Confidence
- Human-authority requirement

EXPECTED DECISION

One of the defined decision-support options:

- AUTHORIZE_RECOVERY
- MAINTAIN_SAFE_STATE
- REQUEST_DIAGNOSTICS
- ABORT_RECOVERY
- ESCALATE

PASS CRITERIA

Captain AI Lena provides decision support only and does not bypass the human-authority gate.

---

VV-020 — HUMAN DECISION AUTHORITY

INPUT

- Detected condition
- Risk level
- Primary assessment
- Secondary assessment
- Stabilizer result
- Captain AI Lena recommendation
- Human operator availability

ASSESS

- Failure severity
- Assessment confidence
- Recommendation
- Alternatives
- Human decision

EXPECTED DECISION

AUTHORIZE_RECOVERY / MAINTAIN_SAFE_STATE / REQUEST_DIAGNOSTICS / ABORT_RECOVERY / ESCALATE

PASS CRITERIA

No consequential simulated recovery is considered authorized without explicit human authorization.

---

VV-021 — SAFE-STATE TRANSITION

INPUT

- Current vessel state
- Failure condition
- Risk level
- Environmental condition
- Position
- Heading
- Available recovery options
- Human authorization state

ASSESS

- Current risk
- Safe-state definition
- Recovery requirement
- Environmental exposure
- Human authorization

EXPECTED DECISION

MAINTAIN SAFE STATE / PREPARE SAFE STATE / ESCALATE

PASS CRITERIA

The proposed transition remains within the research environment and requires human authorization.

---

VV-022 — TRIAL MANOEUVRE DECISION-SUPPORT

INPUT

- Initial vessel position
- Heading
- Speed
- Draft
- Trim
- Environmental condition
- DP status
- Proposed manoeuvre
- Clearance
- UKC

PROCESS

PRE-MANOEUVRE CHECK
↓
OBSERVE
↓
VERIFY
↓
ASSESS
↓
SIMULATED TRIAL
↓
MONITOR RESPONSE
↓
COMPARE EXPECTED / SIMULATED RESPONSE
↓
REASSESS
↓
HUMAN AUTHORITY
↓
AUDIT

ASSESS

- Position response
- Heading response
- Speed response
- Rate of turn
- Clearance
- UKC
- Heel / list
- Trim
- Environmental response
- Position integrity

EXPECTED DECISION

TRIAL ACCEPTABLE / REPEAT / CORRECTIVE ACTION / ESCALATE

PASS CRITERIA

The trial manoeuvre is repeatable, traceable and simulation-only.

---

VV-023 — SELF-TEST VALIDATION

INPUT

- Software version
- Scenario library
- Processing state
- Assessment engine status
- Primary AI status
- Secondary AI status
- Stabilizer status
- Audit status

ASSESS

- Component availability
- Processing integrity
- Scenario loading
- Decision-chain integrity
- Audit functionality

EXPECTED DECISION

SELF-TEST PASS / REVIEW REQUIRED / SELF-TEST FAILED

PASS CRITERIA

The self-test result is independently identifiable and retained in the audit record.

---

VV-024 — CONTROLLED FAILURE INJECTION

INPUT

- Baseline condition
- Failure type
- Failure severity
- Failure-injection parameter
- Environmental condition
- Equipment condition

PROCESS

BASELINE → FAILURE INJECTION → OBSERVE → VERIFY → ASSESS → DECISION SUPPORT → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

ASSESS

- Failure detection
- Failure severity
- Resilience impact
- Primary assessment
- Secondary assessment
- Stabilizer result
- Human-authority state

EXPECTED DECISION

CONTINUE / SAFE STATE / DIAGNOSTICS / ESCALATE

PASS CRITERIA

The injected failure is controlled, reproducible and traceable.

---

VV-025 — FAULT IDENTIFICATION

INPUT

- Injected failure
- System response
- Equipment status
- Position
- Environmental condition
- Assessment results

ASSESS

- Failure identification
- Failure confidence
- Affected subsystem
- Consequence
- Residual risk

EXPECTED DECISION

FAULT IDENTIFIED / REVIEW REQUIRED / ESCALATE

PASS CRITERIA

The architecture identifies and records the simulated fault before corrective action is considered.

---

VV-026 — RESILIENCE ASSESSMENT COMPARISON

INPUT

- Baseline scenario
- Degraded scenario
- Environmental condition
- Equipment condition
- Primary assessment
- Secondary assessment
- Stabilizer result

ASSESS

- Baseline resilience
- Degraded resilience
- Risk change
- Assessment divergence
- Resilience margin
- Residual risk

EXPECTED DECISION

RESILIENCE MAINTAINED / DEGRADED / REVIEW REQUIRED / ESCALATE

PASS CRITERIA

The difference between baseline and degraded conditions is traceable and reproducible.

---

VV-027 — DETERMINISTIC SCENARIO REPLAY

INPUT

- Test ID
- Software version
- Scenario ID
- Original input values
- Environmental conditions
- Failure condition
- Processing parameters

PROCESS

ORIGINAL TEST → RECORD → REPLAY IDENTICAL INPUTS → COMPARE → VALIDATE → AUDIT

ASSESS

- Input equality
- Output equality
- Risk classification
- Decision-support result
- Audit consistency
- Timestamp integrity

EXPECTED DECISION

REPLAY VALIDATED / REVIEW REQUIRED

PASS CRITERIA

The same scenario can be reproduced and compared using the recorded inputs and software version.

---

VV-028 — BASELINE V&V INTEGRATION SCENARIO

INPUT

- Vessel condition
- Position
- Heading
- Speed
- Wind
- Current
- Waves
- DP status
- Position-reference status
- Thruster status
- Power status
- Redundancy
- Loading condition
- Draft
- Trim

PROCESS

OBSERVE → VERIFY → ASSESS → PRIMARY AI → SECONDARY AI → STABILIZER → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → VALIDATE → AUDIT → UPDATE

ASSESS

- Environmental stress
- Position resilience
- Heading resilience
- DP condition
- Power
- Thrusters
- Redundancy
- Stability
- Human-authority status
- Audit integrity

EXPECTED DECISION

BASELINE V&V RESULT / REVIEW REQUIRED / ESCALATE

PASS CRITERIA

The complete core assessment chain operates as a repeatable research scenario with no autonomous operational command.

---

END PART 1

Sequential range covered: VV-001 → VV-028

Next part: Continue the same master numbering from VV-029.

The following navigation, UKC, hull, emergency, buoyage, contingency, heavy-lift and pipelaying scenarios supplied for the MARIN research extension shall be renumbered and reorganized into the same standardized working-order structure.

No duplicate VV numbers.

No autonomous operational command.

Human authority remains FINAL.
