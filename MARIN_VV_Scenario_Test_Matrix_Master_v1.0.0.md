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
SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V SCENARIO TEST MATRIX

MASTER SEQUENTIAL V&V CATALOGUE — PART 2

Sequential range: VV-029 → VV-044
Status: Research / V&V Proposal Development
Operational DP Connection: NONE
Physical Vessel Connection: NONE
Autonomous Command: FALSE
Human Authority: FINAL

---

VV-029 — POSITION / DEPTH DATA INTEGRITY

PURPOSE

Verify the integrity and confidence of position and depth information before relying upon UKC or navigation assessments.

INPUT

- GNSS / DGPS position
- Position timestamp
- Position source
- Charted depth
- Chart / ENC data
- Tide information
- Echo-sounder / depth information where applicable
- Vessel draft
- Trim
- Vessel position

ASSESS

- Position accuracy
- Position integrity
- Position-source consistency
- Chart-data integrity
- Tide-data validity
- Depth-data consistency
- Position/depth mismatch
- Anomalous depth condition
- Position confidence

EXPECTED DECISION

VALID / REVIEW REQUIRED / POSITION CONFIDENCE INSUFFICIENT / HUMAN ESCALATION

PASS CRITERIA

1. Position and depth sources are identified.
2. Source consistency is assessed.
3. Loss of confidence is detected.
4. UKC is not relied upon without adequate position/depth confidence.
5. The result is traceable in the audit record.
6. Human authority remains final.

---

VV-030 — UNDER-KEEL CLEARANCE / TIDAL CALCULATION

PURPOSE

Assess available water depth and UKC using vessel-specific draft and tidal information.

INPUT

- Charted depth below Chart Datum
- Height of tide above Chart Datum
- Forward draft
- Aft draft
- Mean draft
- Trim
- Dynamic draft / squat where applicable
- Position
- Position confidence
- Vessel speed

CALCULATION

Water Depth = Charted Depth + Height of Tide

UKC = Water Depth − Applicable Actual / Dynamic Draft

Where trim is relevant:

Forward Draft = Reference Draft + Trim Component

Aft Draft = Reference Draft − Trim Component

ASSESS

- Charted depth
- Tide
- Actual draft
- Trim
- Dynamic draft
- UKC
- Position accuracy
- Depth-data integrity
- Shallow-water exposure

EXPECTED DECISION

ADEQUATE UKC / REVIEW REQUIRED / ESCALATE

PASS CRITERIA

All depth, tide and draft inputs are recorded and the UKC calculation is reproducible.

---

VV-031 — RAPID SHALLOW-WATER TRANSITION

PURPOSE

Detect a rapid reduction in available water depth during approach to shoal water, coastal areas or restricted channels.

INPUT

- Approach position
- Charted depth
- Height of tide
- Vessel draft
- Trim
- Speed
- Position confidence
- Chart-data integrity
- Tide-data validity
- Squat where applicable

CALCULATION

Water Depth = Charted Depth + Height of Tide

UKC = Water Depth − Applicable Vessel Draft

ASSESS

- Rapid depth reduction
- UKC
- Squat
- Trim effect
- Speed effect
- Position uncertainty
- Chart-data integrity
- Tide-data validity
- Safe approach condition

EXPECTED DECISION

SAFE DEPTH / REDUCED UKC / SHALLOW-WATER WARNING / HUMAN REVIEW / SAFE-STATE ESCALATION

PASS CRITERIA

The system detects the reduction in available depth and records the resulting UKC assessment.

---

VV-032 — UNDER-KEEL CLEARANCE / WORKING TIDAL WINDOW

PURPOSE

Determine whether a vessel's planned passage remains within the applicable working tidal window.

INPUT

- Departure draft
- Forward draft
- Aft draft
- Mean draft
- Trim
- Charted depth
- Chart Datum
- Height of tide
- Working tidal window
- Current / tidal stream
- Squat
- Dynamic draft
- Required UKC
- Safety margin

PROCESS

DEPARTURE DRAFT
↓
CHARTED DEPTH
↓
TIDE
↓
AVAILABLE WATER DEPTH
↓
DYNAMIC / ACTUAL DRAFT
↓
UKC
↓
TIDAL WINDOW
↓
HUMAN REVIEW

ASSESS

- Departure draft
- Changing tide
- Available water depth
- UKC
- Environmental margin
- Vessel-motion margin
- Safe / restricted / unsuitable window

EXPECTED DECISION

SAFE WINDOW / RESTRICTED WINDOW / WAIT FOR TIDE / ALTERNATIVE ROUTE / HUMAN REVIEW

PASS CRITERIA

Departure draft is explicitly incorporated and the changing UKC throughout the working tidal window is traceable.

IMPORTANT: No universal UKC margin shall be assumed. Applicable vessel, port, waterway, company, flag-state and other requirements remain controlling.

---

VV-033 — ZONE / SEASONAL MAXIMUM DRAFT & LOADING-PORT DRAFT

PURPOSE

Assess the vessel-specific maximum permissible draft for the applicable load-line zone/season and determine the corresponding loading-port draft after planned voyage consumption.

INPUT

- Applicable load-line zone
- Seasonal zone where applicable
- Vessel-specific assigned maximum draft
- Summer draft / applicable assigned draft
- Loading-port water density
- Reference seawater density
- Distance / steaming days
- Daily fuel consumption
- Daily fresh-water consumption
- Other voyage consumables
- TPC
- FWA / DWA where applicable
- Vessel trim
- Initial displacement
- Planned cargo weight

PROCESS

ZONE / SEASON
↓
MAXIMUM PERMITTED DRAFT
↓
VOYAGE CONSUMPTION
↓
WEIGHT LOSS
↓
TPC CONVERSION
↓
LOADING-PORT DRAFT
↓
DENSITY / DWA CORRECTION
↓
EQUIVALENT SEAWATER DRAFT
↓
UKC CROSS-CHECK
↓
HUMAN REVIEW

CALCULATION

Voyage Consumption = Steaming Days × Daily Consumption

Where applicable:

Total Voyage Consumption = Fuel + Fresh Water + Other Consumables

Draft Reduction (cm) = Voyage Consumption ÷ TPC

Draft Reduction (mm) = (Voyage Consumption ÷ TPC) × 10

Loading-Port Draft Allowance = Maximum Zone Draft + Expected Voyage Draft Reduction

For density correction:

DWA_mm = FWA_mm × ((1.025 − Water Density) / 0.025)

For water density below 1.025:

Draft in Dock Water = Draft in Seawater + DWA

Equivalent seawater draft:

Draft in Seawater = Draft in Dock Water − DWA

ASSESS

- Zone
- Seasonal limitation
- Maximum permitted draft
- Voyage consumption
- TPC conversion
- Loading-port draft
- Water density
- DWA / FWA
- Forward draft
- Aft draft
- Mean draft
- Trim
- UKC
- Applicable load-line condition

EXPECTED DECISION

DRAFT CONDITION TRACEABLE / REVIEW REQUIRED / HUMAN ESCALATION

PASS CRITERIA

1. Applicable zone/season identified.
2. Vessel-specific maximum draft identified.
3. Voyage consumption calculated.
4. TPC conversion completed.
5. Loading-port draft allowance calculated.
6. Loading-water density recorded.
7. Density correction calculated.
8. Equivalent seawater draft traceable.
9. Forward and aft drafts recorded.
10. Trim recorded.
11. UKC cross-check completed.
12. Applicable load-line condition traceable.
13. Limiting conditions escalated for human review.
14. No autonomous loading or navigation command generated.

---

VV-034 — DENSITY / DRAFT CONVERSION VALIDATION

PURPOSE

Validate the direction and consistency of draft changes under different water densities.

INPUT

Run identical displacement conditions using:

- Seawater density = 1.025
- Dock water density < 1.025
- Density approaching fresh water
- Density greater than 1.025 where applicable

ASSESS

- Calculated DWA
- Direction of draft change
- Equivalent seawater draft
- Mean draft
- Forward draft
- Aft draft
- Trim
- TPC conversion
- Audit calculation

EXPECTED RESULT

Lower-density water → greater draft

Higher-density water → lesser draft

PASS CRITERIA

The sign and direction of the density correction remain consistent throughout calculation, display and audit records.

---

VV-035 — ZONE DRAFT + CONSUMPTION + UKC INTEGRATION

PURPOSE

Validate the complete relationship between load-line limitation, voyage consumption, loading-port draft, density and UKC.

INPUT

- Zone maximum draft
- Seasonal limitation
- Loading-port density
- Steaming days
- Daily consumption
- TPC
- Initial draft
- Trim
- Charted depth
- Tide height
- UKC requirement
- Squat / dynamic allowance

PROCESS

ZONE LIMIT
↓
VOYAGE CONSUMPTION
↓
WEIGHT LOSS
↓
TPC DRAFT CONVERSION
↓
LOADING-PORT DRAFT
↓
DENSITY / DWA CORRECTION
↓
EQUIVALENT SEAWATER DRAFT
↓
WATER DEPTH
↓
UKC
↓
STABILITY / STRUCTURAL REVIEW
↓
HUMAN AUTHORITY
↓
AUDIT

PASS CRITERIA

The relationship:

ZONE → MAXIMUM DRAFT → CONSUMPTION → TPC → LOADING-PORT DRAFT → DENSITY → SEAWATER EQUIVALENT → WATER DEPTH → UKC

is deterministic, reproducible and auditable.

---

VV-036 — HULL STRESS / STRUCTURAL RESPONSE

INPUT

- Vessel loading
- Draft
- Trim
- Displacement
- Wave condition
- Sea state
- Vessel heading
- Speed
- Structural condition

ASSESS

- Hull stress
- Longitudinal bending moment
- Shearing force
- Torsional / twisting moment
- Local structural loading
- Deck loading
- Bottom loading
- Structural inspection status
- Loading condition
- Heavy-weather structural exposure

EXPECTED DECISION

STRUCTURAL CONDITION ACCEPTABLE / SIMULATED STRUCTURAL REVIEW REQUIRED / ESCALATE FOR HUMAN / CLASS / ENGINEERING REVIEW

PASS CRITERIA

Hull-stress indicators and structural-response parameters are recorded and traceable.

IMPORTANT: Research/V&V assessment only. It does not replace class-approved structural calculations, loading manuals, approved stability information or structural surveys.

---

VV-037 — HEAVY-SEA HULL LOADING / POUNDING

INPUT

- Heavy swell
- Wave height
- Wave period
- Wave direction
- Vessel heading
- Vessel speed
- Draft
- Trim

ASSESS

- Hull stress
- Bending moment
- Shearing force
- Torsional loading
- Bow/stern response
- Slamming / pounding
- Green-water exposure where applicable
- Structural response
- Speed/heading suitability

EXPECTED DECISION

MAINTAIN / REDUCE EXPOSURE / CHANGE SIMULATED HEADING / REDUCE SIMULATED SPEED / ESCALATE

PASS CRITERIA

Heavy-sea loading produces a traceable structural-risk assessment without generating an autonomous operational command.

---

VV-038 — HEAVY SWELL / WAVE-INDUCED HEEL

INPUT

- Swell height
- Wave height
- Wave direction
- Wave period
- Vessel heading
- Vessel speed
- Loading condition
- CG condition

ASSESS

- Dynamic heel
- Roll response
- Persistent list
- GZ / righting response where applicable
- Stability index
- CG condition
- Hull loading
- Bending moment
- Shearing force
- Torsional response

EXPECTED DECISION

MONITOR / ALTER SIMULATED CONDITION / REDUCE EXPOSURE / ESCALATE / SAFE STATE

PASS CRITERIA

Dynamic heel is distinguished from persistent list and the stability/structural response is recorded.

---

VV-039 — COMPLETE VESSEL GEOMETRY / CLEARANCE

INPUT

- Vessel length
- Beam
- Draft
- Air draft
- Highest point above keel
- Trim
- Heel / list
- Turning circle
- Charted depth
- Tide height
- UKC
- Overhead clearance

ASSESS

- Horizontal clearance
- Vertical clearance
- Depth clearance
- UKC
- Turning envelope
- Heel/list effect
- Trim effect
- Air-draft limitation
- Bridge clearance
- Cable clearance
- Safe approach/departure corridor

EXPECTED DECISION

CLEARANCE ACCEPTABLE / REVIEW REQUIRED / HUMAN AUTHORITY ESCALATION

PASS CRITERIA

Height, depth, length and width clearances are assessed as an integrated vessel-geometry condition.

---

VV-040 — VESSEL AIR-DRAFT / OVERHEAD CLEARANCE

INPUT

- Height of highest fixed point above keel
- Vessel air draft
- Bridge clearance
- Cable clearance
- Overhead obstruction
- Height of tide where relevant
- Vessel position
- Vessel trim

CALCULATION

Available Vertical Clearance = Overhead Clearance − Applicable Vessel Air Draft

ASSESS

- Vessel air draft
- Highest point
- Bridge clearance
- Cable clearance
- Other overhead restrictions
- Trim effect
- Tidal/environmental effect
- Navigation-data integrity

EXPECTED DECISION

CLEAR / REDUCED CLEARANCE / REVIEW REQUIRED / HUMAN ESCALATION

PASS CRITERIA

The vessel's highest point and applicable overhead clearance are explicitly recorded.

---

VV-041 — TURNING CIRCLE / MANOEUVRING INFORMATION

INPUT

- Turning-circle data
- Manoeuvring characteristics
- Stopping distance
- Turning information
- Vessel particulars
- Loading condition
- Draft
- Trim
- Environmental conditions

ASSESS

- Turning circle
- Advance
- Transfer
- Tactical diameter
- Rate of turn
- Stopping characteristics
- Draft/loading condition
- Environmental influence
- Available manoeuvring area

EXPECTED DECISION

MANOEUVRING INFORMATION AVAILABLE / REVIEW REQUIRED

PASS CRITERIA

Relevant manoeuvring information is available, traceable and linked to the applicable vessel condition.

---

VV-042 — TRIAL MANOEUVRE / CONTROLLED MANOEUVRE VALIDATION

PURPOSE

Conduct a controlled simulated trial manoeuvre to evaluate vessel/system response before relying on the assessed condition.

INPUT

- Vessel position
- Heading
- Speed
- Draft
- Trim
- Heel / list
- CG condition
- Wind
- Current
- Wave / swell
- Tide
- Water depth
- UKC
- Turning-circle information
- Rate of turn
- Manoeuvring information
- Navigation / position-source status

PROCESS

PRE-MANOEUVRE CHECK
↓
OBSERVE
↓
VERIFY
↓
ASSESS
↓
SIMULATED TRIAL MANOEUVRE
↓
MONITOR RESPONSE
↓
COMPARE EXPECTED / ACTUAL SIMULATED RESPONSE
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
- Heel
- List
- Trim
- Environmental effect
- Turning envelope
- Clearance
- UKC
- Structural loading where applicable
- Position integrity
- Primary / Secondary agreement
- Stabilizer response
- Captain AI Lena recommendation
- Human-authority gate
- Assessment latency

EXPECTED DECISION

TRIAL MANOEUVRE ACCEPTABLE / REPEAT WITH CORRECTIVE ACTION / ESCALATE / MAINTAIN SAFE STATE

PASS CRITERIA

1. Trial manoeuvre is controlled and repeatable.
2. Initial conditions are recorded.
3. Vessel response is recorded.
4. Position and heading response are traceable.
5. Rate of turn is recorded.
6. Clearance and UKC remain visible.
7. Heel/list/trim response is recorded.
8. Unexpected response triggers reassessment.
9. Corrective action can be tested.
10. Re-test can reproduce the scenario.
11. Human authority remains final.
12. No physical vessel is commanded.
13. No autonomous operational command is generated.
14. Complete audit trail is retained.

---

VV-043 — EMERGENCY LIGHTING

INPUT

- Emergency-lighting system
- Emergency-light locations
- Battery supply
- Emergency generator
- Lighting-test records
- Escape-route lighting

ASSESS

- Emergency-light availability
- Emergency-light coverage
- Battery availability
- Emergency-generator supply
- Test status
- Escape-route illumination
- Loss-of-main-power response
- Duration / capacity where applicable

EXPECTED DECISION

EMERGENCY LIGHTING READY / REVIEW REQUIRED

PASS CRITERIA

Emergency lighting remains available under the simulated loss-of-main-power condition and its test status is traceable.

---

VV-044 — EMERGENCY POWER / DEAD-SHIP CONDITION

SCENARIO

SIMULATED DEAD-SHIP / LOSS-OF-MAIN-POWER CONDITION

INPUT

- Main power failure
- Emergency generator
- Emergency batteries
- Emergency switchboard
- Emergency lighting
- Navigation equipment
- Communication equipment
- Steering arrangements
- Alarm systems

ASSESS

- Loss of main electrical power
- Emergency-power availability
- Emergency-generator start
- Battery-supported equipment
- Emergency lighting
- Navigation lights where applicable
- Required alarms
- Communication capability
- Steering / propulsion recovery status
- Recovery sequence
- Human decision authority

EXPECTED DECISION

EMERGENCY POWER AVAILABLE / RECOVERY REQUIRED / ESCALATE

PASS CRITERIA

1. Main-power loss is detected.
2. Emergency-power status is identified.
3. Critical emergency systems are assessed.
4. Recovery is validated before any simulated return to normal operation.
5. Human authority remains FINAL.
6. No physical command is generated.
7. No autonomous operational command is generated.

---

END PART 2

Sequential range completed: VV-029 → VV-044
SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V RESEARCH

PROPOSED SPECIAL OFFSHORE OPERATIONS — MD REVIEW VERSION

File: "MARIN_VV_SCENARIO_TEST_MATRIX_V2.md"
Status: Research / V&V Proposal
Branch: "feature/marin-usv-vv-research"
Operational Connection: NONE
Autonomous Command: FALSE
Human Authority: FINAL

---

PART 3 — NAVIGATION, BUOYAGE, CONTINGENCY & INTEGRATED V&V

VV-021 — TRAFFIC SEPARATION SCHEME / SINGAPORE STRAIT

INPUT

- Vessel position
- Traffic Separation Scheme status
- Traffic-flow direction
- Vessel heading
- Course over ground
- Speed over ground
- Traffic density
- Joining / leaving / crossing / following condition
- Nearby vessels
- Navigational constraints
- Port / terminal departure or arrival condition
- CPA
- TCPA
- Position confidence

ASSESS

- Traffic-lane status
- General direction of traffic flow
- Joining a traffic lane
- Leaving a traffic lane
- Crossing a traffic lane
- Following a traffic lane
- Collision risk
- CPA / TCPA
- Available sea room
- Safe speed
- Local VTS / port requirements
- Applicable COLREG / TSS considerations

EXPECTED DECISION

SAFE / CAUTION / ALTER MANOEUVRE / REDUCE SPEED / WAIT / ESCALATE FOR HUMAN REVIEW

PASS CRITERIA

1. Traffic-lane status is correctly identified.
2. Vessel course and speed are recorded.
3. Joining, leaving, crossing and following are distinguished.
4. Collision risk is assessed from the simulated traffic situation.
5. Applicable COLREG / TSS considerations are identified.
6. No blanket right-of-way assumption is made.
7. Human authority remains FINAL.
8. No autonomous navigational command is generated.

SIMULATED RESPONSE

Decision-support recommendation only.

---

VV-022 — TSS / PORT DEPARTURE CONFLICT

SCENARIO

A vessel departing port approaches a traffic separation scheme while another vessel is already established in the traffic lane.

INPUT

- Departure track
- Traffic-flow direction
- Own-vessel course
- Other-vessel course
- Relative bearing
- CPA
- TCPA
- Own-vessel speed
- Other-vessel speed
- Available sea room
- Local traffic restrictions
- TSS geometry
- Position confidence

ASSESS

- Departure track
- Relationship to traffic lane
- Established traffic
- Collision risk
- Available manoeuvring area
- TSS compliance
- Local port / VTS restrictions
- Safe-speed condition

EXPECTED DECISION

MAINTAIN SAFE STATE / WAIT / ALTER SIMULATED MANOEUVRE / REDUCE SPEED / ESCALATE

PASS CRITERIA

The system demonstrates that established traffic, port-departure status, TSS geometry and collision risk are considered together rather than applying a simple priority rule.

---

VV-023 — ALTERNATIVE ROUTE / HAZARD AVOIDANCE

SCENARIO

Piracy warning, sea-mine warning, navigational hazard or other route restriction.

INPUT

- Current position
- Original route
- Hazard position
- Hazard type
- Hazard proximity
- Alternative route
- Safe-water option
- TSS implications
- Traffic density
- Weather
- Port / coastal restrictions
- Vessel capability
- Human-authority status

ASSESS

- Hazard proximity
- Route risk
- Alternative-route availability
- Safe-water availability
- Traffic consequences
- Weather consequences
- Navigational restrictions
- Human decision authority

EXPECTED DECISION

MAINTAIN ROUTE / ALTER ROUTE / HOLD / AVOID AREA / ESCALATE

PASS CRITERIA

1. Hazard is identified.
2. Original route is retained as the baseline.
3. Alternative route is assessed.
4. Consequences of the alternative are recorded.
5. Human authorization is required before any simulated route change.
6. No autonomous navigation command is generated.

---

VV-024 — INLAND WATERWAY / LOCAL RULES

SCENARIO

Proposed transit through an inland waterway, restricted channel or port approach.

INPUT

- Vessel length
- Vessel beam
- Draft
- Air draft
- UKC
- Channel depth
- Channel width
- Overhead clearance
- Bridge clearance
- Vessel type
- Waterway restrictions
- Local navigation rules
- TSS / traffic restrictions
- Pilotage requirements
- Required clearance / authorization
- Human authorization

ASSESS

- Vessel clearance
- Draft
- UKC
- Channel restrictions
- Air-draft limitations
- Local navigation rules
- Traffic restrictions
- Pilotage requirements
- Required authorization
- Vessel suitability

EXPECTED DECISION

PROCEED / RESTRICTED / ALTERNATIVE ROUTE / ESCALATE

PASS CRITERIA

The simulator does not assume inland-waterway or port access without the applicable vessel, waterway, local and authorization requirements being satisfied.

---

VV-025 — SOUND SIGNALS / FISHING VESSEL ALERT

SCENARIO

Own vessel operates in an area containing fishing vessels, small craft or vessels with restricted manoeuvrability.

INPUT

- Own-vessel status
- Other-vessel status
- Fishing-vessel status
- Restricted-manoeuvrability status
- Relative bearing
- Range
- Course
- Speed
- Visibility
- Traffic density
- Navigation-light status
- Sound-signal capability
- Applicable COLREG / local requirements

ASSESS

- Vessel status
- Collision risk
- Fishing activity
- Manoeuvrability restrictions
- Relative bearing
- CPA / TCPA
- Visibility
- Sound-signal requirements
- Additional lookout requirement
- Responsibilities between vessels

EXPECTED DECISION

MONITOR / SOUND SIGNAL / ALTER COURSE / REDUCE SPEED / STOP / ESCALATE

PASS CRITERIA

1. Vessel status is correctly identified.
2. Responsibilities between vessels are assessed.
3. Sound-signal requirements are considered.
4. Visibility and collision risk are considered.
5. Human authority remains FINAL.
6. No automatic navigational command is generated.

---

VV-026 — RESPONSIBILITIES BETWEEN VESSELS

SCENARIO

Two or more vessels are in a developing close-quarters or collision-risk situation.

INPUT

- Own-vessel status
- Other-vessel status
- Vessel type
- Manoeuvrability condition
- Fishing status
- Towing status where applicable
- Constrained-by-draft condition where applicable
- Relative bearing
- CPA
- TCPA
- Speed
- Course
- Available sea room
- Visibility
- Applicable COLREG rules
- Local navigation requirements

ASSESS

- Own-vessel status
- Other-vessel status
- Give-way / stand-on obligations where applicable
- Special vessel conditions
- Collision risk
- Available manoeuvring space
- Visibility
- Applicable COLREG responsibilities

EXPECTED DECISION

MAINTAIN SAFE COURSE / ALTER COURSE / REDUCE SPEED / STOP / ESCALATE

PASS CRITERIA

The decision-support trace identifies relevant vessel statuses and applicable responsibilities before producing a recommendation.

---

VV-027 — RESTRICTED VISIBILITY

SCENARIO

Fog, heavy rain, haze, smoke, darkness or another condition materially reducing visibility.

INPUT

- Visibility condition
- Estimated visibility range
- Radar availability
- ARPA availability
- AIS availability
- GNSS / position status
- Navigation-light status
- Sound-signalling capability
- Traffic density
- Vessel speed
- Relative contacts
- CPA
- TCPA

ASSESS

- Restricted-visibility condition
- Safe-speed considerations
- Radar availability
- ARPA availability
- Available detection means
- Collision risk
- Enhanced lookout
- Sound-signal requirements
- CPA / TCPA
- Navigation-data reliability

EXPECTED DECISION

REDUCE SPEED / ENHANCE LOOKOUT / SOUND SIGNAL / ALTER MANOEUVRE / STOP / ESCALATE

PASS CRITERIA

The system demonstrates increased caution when visibility deteriorates and records the complete decision-support chain.

---

VV-028 — VESSEL APPROACHING A BEND / BLIND AREA

SCENARIO

Vessel approaches a bend, river turn, restricted channel, narrow passage or other location where another vessel may be obscured from direct visual observation.

CONDITIONS

A. GOOD / CLEAR VISIBILITY
B. RESTRICTED VISIBILITY

INPUT

- Channel geometry
- Bend geometry
- Blind sector
- Available sea room
- Own-vessel speed
- Other possible traffic
- Visibility
- Radar information
- Sound-signal capability
- Navigation-light status where applicable
- Local waterway / port rules
- Collision risk

ASSESS

- Bend / blind-area condition
- Visibility classification
- Speed
- Lookout
- Radar information
- Sound-signal requirements
- Possible concealed traffic
- Available manoeuvring area
- Collision risk

EXPECTED DECISION

REDUCE SPEED / SOUND SIGNAL / ENHANCE LOOKOUT / MAINTAIN SAFE STATE / ESCALATE

PASS CRITERIA

1. Bend / blind-area condition is detected.
2. Visibility is correctly classified.
3. Speed and lookout are considered.
4. Sound-signal consideration is recorded.
5. Radar / available detection information is considered.
6. Human authority remains FINAL.

---

VV-029 — COMBINED FISHING / VISIBILITY / SOUND-SIGNAL SCENARIO

SCENARIO

Own vessel approaches an area containing fishing vessels while visibility deteriorates and a bend or restricted passage is ahead.

INPUT

- Own-vessel status
- Fishing-vessel status
- Other-vessel status
- Visibility
- Bend / restricted-passage condition
- Relative bearing
- Range
- CPA
- TCPA
- Speed
- Course
- Radar
- AIS
- GNSS
- Navigation lights
- Sound signals
- Applicable COLREG responsibilities
- Local navigation restrictions

ASSESS

- Fishing-vessel status
- Own-vessel status
- Visibility
- Bend / restricted passage
- Collision risk
- CPA / TCPA
- Safe speed
- Radar / AIS / GNSS reliability
- Navigation lights
- Sound signals
- Applicable responsibilities

EXPECTED DECISION

SAFE MONITORING / REDUCE SPEED / SOUND SIGNAL / ALTER COURSE / STOP / ESCALATE

PASS CRITERIA

1. Multiple hazards are recognised simultaneously.
2. Vessel responsibilities are assessed.
3. Visibility considerations are applied.
4. Sound-signal considerations are recorded.
5. Safe speed is considered.
6. Bend / restricted-waterway risk is considered.
7. Layered assessment remains traceable.
8. Captain AI Lena provides decision support only.
9. Human authority remains FINAL.
10. No autonomous navigational command is generated.

---

NAVIGATION SAFETY PRINCIPLE

The V&V system shall distinguish between:

- Clear visibility
- Restricted visibility
- Bend / blind area
- Restricted water
- Traffic separation scheme
- Fishing vessel
- Vessel with restricted manoeuvrability
- Close-quarters situation
- Collision risk
- Special local navigation condition

REQUIRED SEQUENCE

OBSERVE → VERIFY → IDENTIFY VESSEL STATUS → IDENTIFY VISIBILITY → ASSESS COLLISION RISK → CONSIDER COLREG / LOCAL RULES → CONSIDER SOUND SIGNALS → RECOMMEND → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

BOUNDARY

The simulator provides research decision support only.

It does not replace:

- Master
- DPO
- Navigator
- COLREG requirements
- VTS instructions
- Local regulations
- Vessel SMS procedures

HUMAN AUTHORITY: FINAL

AUTONOMOUS NAVIGATION COMMAND: FALSE

---

VV-030 — BUOYAGE / NAVIGATIONAL MARK IDENTIFICATION

SCENARIO

Vessel encounters a navigational mark, buoy or beacon during coastal, port, restricted-water or offshore operations.

INPUT

- Vessel position
- Charted buoy position
- Buoy type
- Buoy colour
- Topmark
- Light characteristic
- Light colour
- Sound signal where applicable
- Radar response
- AIS / AtoN information where available
- GNSS position
- Chart / ENC information
- Vessel heading
- COG
- Speed
- Visibility
- Tidal condition
- Water depth
- Local navigation requirements

ASSESS

- Correct identification
- Charted-position agreement
- Observed-position agreement
- Navigation-source consistency
- Approach / passing / deviation condition
- Safe passing distance
- Water depth
- UKC
- Channel / hazard / safe-water / special-area indication
- Light-characteristic consistency

EXPECTED DECISION

CONFIRM MARK / MONITOR / ALTER COURSE / REDUCE SPEED / ESCALATE

PASS CRITERIA

The navigational mark is correctly identified and its information is incorporated into the simulated navigation assessment.

---

VV-031 — LATERAL MARK / CHANNEL

SCENARIO

Vessel enters, follows or leaves a marked channel.

INPUT

- Applicable buoyage system
- Port / starboard lateral marks
- Channel direction
- Vessel heading
- Vessel position
- Charted channel limits
- Water depth
- UKC
- Tidal height
- Draft
- Safe passing distance

ASSESS

- Applicable buoyage system
- Channel direction
- Position relative to channel
- Water depth
- UKC
- Tide
- Draft
- Safe passing distance

EXPECTED DECISION

FOLLOW CHANNEL / CORRECT TRACK / REDUCE SPEED / ESCALATE

PASS CRITERIA

The simulator records the vessel's relationship to the marked channel and does not rely solely on visual buoy recognition.

---

VV-032 — CARDINAL MARK

SCENARIO

Vessel approaches a cardinal mark indicating the safe side on which to pass a navigational danger.

INPUT

- Cardinal-mark type
- Vessel position
- Bearing to mark
- Charted danger
- Safe passing side
- Water depth
- UKC
- Visibility
- Weather
- Sea condition

ASSESS

- Cardinal-mark meaning
- Charted danger
- Vessel position
- Safe passing side
- UKC
- Visibility
- Environmental condition

EXPECTED DECISION

PASS ON INDICATED SAFE SIDE / MONITOR / ALTER COURSE / ESCALATE

PASS CRITERIA

The correct cardinal-mark meaning is identified and the simulated track remains clear of the associated danger.

---

VV-033 — ISOLATED DANGER MARK

SCENARIO

Vessel approaches an isolated danger mark.

INPUT

- Mark identification
- Charted danger position
- Vessel position
- Safe passing distance
- Draft
- Water depth
- UKC
- Tide
- Sea state

ASSESS

- Mark identification
- Danger location
- Passing distance
- Draft
- Water depth
- UKC
- Tide
- Sea state

EXPECTED DECISION

PASS CLEAR / ALTER COURSE / REDUCE SPEED / ESCALATE

PASS CRITERIA

The system recognises the mark as indicating a localised navigational danger and maintains an appropriate safety margin.

---

VV-034 — SAFE WATER MARK

SCENARIO

Vessel uses a safe-water mark to assist navigation through a fairway, approach or channel.

INPUT

- Mark position
- Vessel position
- Fairway / channel relationship
- Course
- Speed
- Water depth
- UKC
- Other traffic

ASSESS

- Mark position
- Vessel position
- Fairway relationship
- Course
- Speed
- Water depth
- UKC
- Traffic

EXPECTED DECISION

FOLLOW FAIRWAY / MONITOR / ESCALATE

PASS CRITERIA

Safe-water information is correctly incorporated into the navigation assessment.

---

VV-035 — SPECIAL MARK / RESTRICTED AREA

SCENARIO

Vessel approaches a special mark identifying a designated area or feature.

INPUT

- Mark identification
- Charted area
- Purpose of mark
- Navigation restrictions
- Local port / waterway requirements
- Vessel status
- Proposed route

ASSESS

- Mark identification
- Designated area
- Purpose
- Restrictions
- Vessel status
- Proposed route
- Local requirements

EXPECTED DECISION

PROCEED / AVOID AREA / ALTER ROUTE / ESCALATE

PASS CRITERIA

The simulator identifies the special-area condition and does not assume unrestricted passage.

---

VV-036 — BUOY / ATO N POSITION DISCREPANCY

SCENARIO

Observed buoy position differs materially from the charted position.

INPUT

- GNSS position
- Charted position
- Observed position
- Radar position
- Visual identification
- AIS / AtoN information where available
- Timestamp
- Tidal/current conditions
- Possible buoy displacement
- Navigation confidence

ASSESS

- Position agreement
- Source consistency
- Possible buoy displacement
- Navigation confidence
- Tidal/current influence
- Chart-data integrity

EXPECTED DECISION

VERIFY / REDUCE SPEED / INCREASE CLEARANCE / ALTER ROUTE / ESCALATE

PASS CRITERIA

A position discrepancy is detected rather than blindly accepting a single navigation source.

---

VV-037 — BUOY LIGHT / SOUND CHARACTERISTIC FAILURE

SCENARIO

Expected buoy light or sound characteristic is absent, degraded or inconsistent with available navigation information.

INPUT

- Expected characteristic
- Observed characteristic
- Visibility
- Radar response
- GNSS position
- Chart / ENC information
- Alternative navigation source
- Navigation confidence

ASSESS

- Expected versus observed characteristic
- Visibility
- Position confidence
- Radar consistency
- Chart / ENC consistency
- Alternative navigation source

EXPECTED DECISION

VERIFY / REDUCE SPEED / USE ALTERNATIVE NAVIGATION SOURCE / ESCALATE

PASS CRITERIA

Failure or uncertainty of an aid to navigation causes an appropriate reduction in navigation confidence.

---

VV-038 — BUOYAGE + DRAFT + UKC + TIDAL WINDOW

SCENARIO

Vessel approaches a buoyed channel with a limited under-keel-clearance window.

INPUT

- Departure draft
- Forward draft
- Aft draft
- Mean draft
- Trim
- Water density
- Charted depth
- Chart datum
- Height of tide above chart datum
- Required UKC
- Safety margin
- Vessel speed
- Tidal current
- Squat / dynamic draft allowance where applicable

CALCULATION

Water Depth = Charted Depth at Chart Datum + Height of Tide

UKC = Water Depth − Applicable Vessel Draft

Working tidal window shall consider:

- Departure draft
- Actual / forecast tide
- Charted depth
- Required UKC
- Trim
- Squat where applicable
- Safety margin

EXPECTED DECISION

TIDAL WINDOW ADEQUATE / WAIT FOR TIDE / REDUCE DRAFT / ALTER ROUTE / ESCALATE

PASS CRITERIA

The simulator does not treat charted depth alone as available water depth.

---

VV-039 — BUOYAGE / RESTRICTED VISIBILITY

SCENARIO

Vessel navigates a buoyed channel in fog, heavy rain, haze or other restricted visibility.

INPUT

- Buoy identification
- Radar response
- GNSS position
- Chart / ENC
- Sound signals
- Safe speed
- Traffic
- Channel limits
- UKC
- Position confidence

ASSESS

- Buoy identification
- Radar correlation
- GNSS confidence
- Chart / ENC consistency
- Sound-signal considerations
- Safe speed
- Traffic
- Channel limits
- UKC
- Navigation confidence

EXPECTED DECISION

REDUCE SPEED / ENHANCE LOOKOUT / SOUND SIGNAL / VERIFY POSITION / ESCALATE

PASS CRITERIA

The system recognises that visual identification of buoys may be degraded and increases reliance on appropriate alternative navigation information.

---

BUOYAGE V&V PRINCIPLE

NAVIGATIONAL MARK → IDENTIFY → VERIFY → CORRELATE WITH CHART / ENC → CONFIRM POSITION → ASSESS WATER DEPTH / UKC → ASSESS TRAFFIC → ASSESS VISIBILITY → RECOMMEND → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

The simulator shall not infer a safe route solely from the presence of a buoy.

Buoyage information shall be assessed together with:

- Chart / ENC information
- Vessel position
- Draft
- Water depth
- Tide
- UKC
- Manoeuvring characteristics
- Traffic
- Visibility
- Applicable local navigation requirements

---

PART 3 END

NEXT PART: Offshore operations, contingency cascade, heavy-lift, pipelaying, corrective-action testing, re-test validation, assessment latency and final integrated MARIN V&V scenario.

Next sequence: VV-045
SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V RESEARCH

PROPOSED SPECIAL OFFSHORE OPERATIONS — MD REVIEW VERSION

FILE: "MARIN_VV_SCENARIO_TEST_MATRIX_V2.md"
PART 4
STATUS: Research / V&V Proposal
OPERATIONAL CONNECTION: NONE
AUTONOMOUS COMMAND: FALSE
HUMAN AUTHORITY: FINAL

---

VV-040 — HEAVY-LIFT LOADING IN SEAWAY

PURPOSE

Assess the simulated resilience response during heavy-lift loading operations conducted in environmental conditions representative of offshore/seaway operations.

INPUT

A. VESSEL / LOADING CONDITION

- Vessel displacement
- Draft
- Trim
- Heel / list
- GM / GZ
- KG / CG
- Free-surface condition
- Deck loading condition
- Load-transfer condition

B. LIFT / CRANE CONDITION

- Lift weight
- Crane load
- Crane radius
- Boom angle
- Hook load
- Suspended-load condition
- Crane operating condition
- Load-transfer status
- Lift suspension / abort criteria

C. ENVIRONMENT

- Wind speed
- Wind direction
- Wave height
- Wave period
- Wave direction
- Swell
- Current
- Sea state

D. VESSEL / DP RESPONSE

- Vessel motions
- Vessel position
- Heading
- DP position error
- DP environmental loading
- Position confidence

E. SAFETY / HUMAN AUTHORITY

- Operational contingency
- Emergency condition
- Human-authority status

ASSESS

- Changing vessel stability
- Heel / list
- Trim
- CG movement
- GM / GZ response
- Free-surface effect
- Crane / suspended-load condition
- Environmental loading
- Vessel motion
- DP position response
- Structural loading where applicable
- Lift suspension condition
- Abort condition
- Safe-state condition

EXPECTED DECISION

CONTINUE SIMULATED ASSESSMENT / HOLD / SUSPEND LIFT / REASSESS / SAFE STATE / ESCALATE

PASS CRITERIA

1. Initial loading condition is recorded.
2. Lift parameters are traceable.
3. Environmental conditions are recorded.
4. Stability response is assessed.
5. CG movement is identified.
6. Vessel motion is assessed.
7. DP position response is assessed.
8. Changing conditions trigger reassessment.
9. Lift-suspension / abort criteria are visible.
10. Human authority remains FINAL.
11. No physical crane or vessel command is generated.
12. Complete audit trace is maintained.

HUMAN AUTHORITY: FINAL
SIMULATED EXECUTION: HUMAN AUTHORIZATION REQUIRED
OPERATIONAL DP CONNECTION: NONE

---

VV-041 — HEAVY-LIFT DISCHARGE / OFFLOADING

PURPOSE

Assess the simulated resilience response during heavy-lift discharge where vessel displacement, centre of gravity and stability conditions change throughout the operation.

INPUT

A. VESSEL CONDITION

- Initial displacement
- Remaining displacement
- Draft
- Trim
- Heel / list
- Initial KG / CG
- Changing KG / CG
- Longitudinal CG movement
- Transverse CG movement
- GM / GZ

B. LIFT CONDITION

- Load weight
- Suspended-load condition
- Crane radius
- Boom angle
- Hook load
- Load-transfer condition
- Crane condition

C. ENVIRONMENT

- Wind
- Wave
- Swell
- Current
- Sea state

D. DP / VESSEL RESPONSE

- Vessel position
- Heading
- DP capability
- DP resilience
- Position error
- Vessel-motion response

E. CONTINGENCY

- Safe-state condition
- Emergency condition
- Lift-suspension condition
- Human-authority status

ASSESS

- Changing displacement
- KG / CG movement
- Heel / list
- Trim
- GM / GZ
- Suspended-load effect
- Crane condition
- Seaway response
- Environmental loading
- DP resilience
- Position and heading stability
- Emergency / lift-suspension condition

EXPECTED DECISION

CONTINUE / HOLD / SUSPEND OFFLOADING / REASSESS / SAFE STATE / ESCALATE

PASS CRITERIA

1. Initial and changing loading states are recorded.
2. CG movement is traceable.
3. Stability response is reassessed.
4. Environmental conditions remain visible.
5. DP response is assessed where applicable.
6. Position and heading stability are recorded.
7. Emergency conditions trigger reassessment.
8. Human authority remains FINAL.
9. No physical operational command is generated.

---

VV-042 — PIPELAYING OPERATION

PURPOSE

Assess the simulated resilience response during pipelaying operations involving DP, pipe-handling equipment, tension management, seabed interaction and changing environmental conditions.

INPUT

A. VESSEL / POSITION

- Vessel position
- Vessel heading
- Vessel speed
- Draft
- Trim
- Heel / list
- Position confidence

B. DP / CONTROL

- DP status
- DP environmental loading
- Position error
- Heading error
- Position-reference status
- Primary control status
- Secondary control availability
- Human operator availability

C. PIPE / HANDLING SYSTEM

- Pipe tension
- Tensioner status
- Stinger / overboarding arrangement
- Pipe departure angle
- Layback
- Touchdown position
- Pipe condition
- Abnormal pipe condition

D. SEABED / NAVIGATION

- Water depth
- Charted depth
- Tide
- UKC
- Seabed condition
- Seabed interaction
- Current

E. ENVIRONMENT

- Wind
- Wave height
- Wave period
- Wave direction
- Swell
- Current
- Sea state

F. CONTINGENCY

- Loss of DP capability
- Loss / degradation of pipe tension
- Abnormal pipe condition
- Emergency recovery
- Abandonment scenario
- Safe-state condition
- Human-authority status

ASSESS

- Vessel position
- Vessel heading
- DP capability
- Position confidence
- Pipe tension
- Tensioner status
- Stinger condition
- Pipe departure angle
- Layback
- Touchdown position
- Seabed interaction
- Water depth
- UKC
- Environmental loading
- Loss of DP capability
- Loss / degradation of tension
- Abnormal pipe condition
- Recovery / abandonment condition

EXPECTED DECISION

CONTINUE / MONITOR / HOLD / REASSESS / RECOVER / ABORT / SAFE STATE / ESCALATE

PASS CRITERIA

1. Initial pipelaying condition is recorded.
2. DP status is traceable.
3. Pipe tension is recorded.
4. Tensioner condition is recorded.
5. Stinger / overboarding condition is recorded.
6. Layback and touchdown information are traceable.
7. Seabed interaction is assessed.
8. Water depth and UKC are reproducible.
9. Environmental deterioration triggers reassessment.
10. Loss or degradation of DP triggers a resilience assessment.
11. Loss or degradation of pipe tension triggers reassessment.
12. Emergency recovery / abandonment conditions can be simulated.
13. Human authority remains FINAL.
14. No operational DP command is generated.

---

ENGINEERING BOUNDARY — VV-040 TO VV-042

These scenarios are PROPOSED RESEARCH AND V&V SCENARIOS for technical review.

They do not constitute:

- Operational heavy-lift procedures
- Operational pipelaying procedures
- Vessel-specific stability criteria
- Crane acceptance criteria
- DP acceptance criteria
- Structural acceptance criteria
- Regulatory acceptance criteria

MARIN may define or revise:

- Test objectives
- Vessel/testbed parameters
- Environmental conditions
- Failure cases
- Acceptance criteria
- Measurement requirements
- Instrumentation requirements
- V&V methodology
- Evidence requirements
- Human-factors requirements

The Sextant Protocol™ matrix may subsequently be extended through controlled module integration and V&V traceability mapping.

---

VV-043 — DEAD SHIP / TOWING CONTINGENCY

SCENARIO

Vessel loses propulsion and/or electrical power and requires assessment of available recovery options.

INPUT

A. VESSEL CONDITION

- Propulsion availability
- Electrical-power status
- Steering capability
- Emergency-power status
- Navigation-system status
- Vessel position
- Vessel heading
- Vessel speed

B. ENVIRONMENT

- Wind
- Wind direction
- Current
- Sea state
- Wave condition
- Visibility

C. NAVIGATION / CLEARANCE

- Water depth
- UKC
- Traffic
- Nearby hazards
- Safe-water destination
- Available sea room

D. CONTINGENCY RESOURCES

- Available towing capability
- Tug availability where applicable
- Emergency-anchor option where applicable
- Shelter option
- Safe-water destination

E. HUMAN AUTHORITY

- Operator availability
- Human decision status

ASSESS

- Dead-ship condition
- Loss of manoeuvrability
- Drift trajectory
- Position confidence
- Towing requirement
- Safe-water destination
- Emergency anchoring option
- Traffic / hazard exposure
- Recovery options

EXPECTED DECISION

TOW / ANCHOR / SHELTER / SAFE-WATER TRANSIT / MAINTAIN SAFE STATE / ESCALATE

PASS CRITERIA

1. Dead-ship condition is detected.
2. Propulsion and power status are recorded.
3. Drift condition is assessed.
4. Available contingency options are identified.
5. Safe-water destination is assessed.
6. Human-authorized recovery decision is required.
7. No autonomous recovery command is generated.

---

VV-044 — ANCHORING / ANCHOR DRAGGING / SWING CLEARANCE

INPUT

A. VESSEL / ANCHOR CONDITION

- Vessel position
- Vessel heading
- Vessel draft
- Anchor position
- Anchor status
- Chain length
- Chain scope
- Anchor holding condition

B. ENVIRONMENT

- Water depth
- Tide
- Wind
- Wind direction
- Current
- Current direction
- Gust condition
- Sea state

C. CLEARANCE

- Swing circle
- Nearby hazards
- Safe clearance
- Traffic
- Depth / UKC

D. MOVEMENT

- Speed over ground
- Position change
- Heading change
- Anchor-dragging indicators
- Position confidence

ASSESS

- Anchor deployment condition
- Available scope
- Swing-clearance circle
- Dragging-anchor indicators
- Wind / gust effect
- Tidal / current effect
- Vessel movement
- Clearance from hazards
- Safe-state condition

EXPECTED DECISION

ANCHOR / INCREASE SCOPE / MONITOR / RE-ANCHOR / ESCALATE / SAFE-WATER OPTION

PASS CRITERIA

1. Anchor status is recorded.
2. Water depth is recorded.
3. Scope is traceable.
4. Swing clearance is calculated.
5. Environmental loading is assessed.
6. Vessel movement is monitored.
7. Dragging indicators are recorded.
8. Hazard clearance is assessed.
9. Human authority remains FINAL.
10. No autonomous anchoring command is generated.

RESEARCH CHECK

Before a simulated transition to anchoring or another control condition, vessel movement and position confidence shall be assessed.

A zero or near-zero speed-over-ground condition may be used as a research verification parameter where appropriate to the manoeuvre.

---

VV-045 — WIND GUST / SQUALL / RAPID ENVIRONMENTAL CHANGE

INPUT

- Mean wind speed
- Gust speed
- Wind direction
- Rate of environmental change
- Current
- Current direction
- Wave height
- Wave period
- Swell
- Vessel heading
- Vessel speed
- Position confidence

ASSESS

- Mean environmental condition
- Gust condition
- Squall condition
- Rate of deterioration
- DP load response
- Heel response
- Position error
- Heading response
- Safe-state requirement

EXPECTED DECISION

CONTINUE / INCREASE MONITORING / REDUCE EXPOSURE / SAFE STATE / ESCALATE

PASS CRITERIA

The architecture detects changing environmental conditions and reassesses the vessel state.

---

VV-046 — HEAVY SWELL / WAVE-INDUCED HEEL

INPUT

- Wave height
- Wave period
- Wave direction
- Swell height
- Swell direction
- Vessel heading
- Vessel speed
- Loading condition
- Stability condition
- CG condition

ASSESS

- Transient heel
- Repeated heel response
- Persistent list
- Position response
- Stability response
- Structural loading indicators
- Environmental loading

EXPECTED DECISION

MONITOR / CHANGE SIMULATED CONDITION / REDUCE EXPOSURE / ESCALATE

PASS CRITERIA

Heel response is distinguished from persistent list and is recorded against the applicable environmental condition.

---

VV-047 — DECK SECURITY / WATERTIGHT INTEGRITY

INPUT

A. ENVIRONMENT

- Weather condition
- Wave condition
- Sea state

B. DECK / CARGO

- Deck equipment
- Cargo
- Stores
- Loose equipment
- Securing arrangements
- Deck loading

C. WATERTIGHT INTEGRITY

- Watertight doors
- Watertight openings
- Bulkhead condition
- Emergency closures
- Closure status

ASSESS

- Loose-object risk
- Equipment movement
- Stores movement
- Cargo movement
- Securing status
- Watertight integrity
- Required closure status
- Adverse-weather readiness

EXPECTED DECISION

READY / SECURE / RESTRICT DECK ACCESS / CLOSE REQUIRED OPENINGS / ESCALATE

PASS CRITERIA

Critical deck equipment and stores are identified and securing status is traceable.

---

VV-048 — FIRE / MUSTER / FIRE-FIGHTING RESPONSE

INPUT

A. FIRE CONDITION

- Fire indication
- Fire location
- Fire type where known
- Fire detection status
- Alarm status

B. PERSONNEL

- Personnel status
- Muster status
- Personnel location
- Missing-person indication where applicable

C. FIRE PROTECTION

- Fire doors / boundaries
- Fixed fire-extinguishing arrangements
- Portable fire appliances
- Firefighting equipment status

D. ESCAPE

- Escape routes
- Emergency exits
- Emergency lighting
- Muster access

ASSESS

- Fire detection
- General alarm
- Muster
- Fire containment
- Closure of applicable fire boundaries
- Availability of firefighting equipment
- Initial firefighting response where safe
- Escape-route availability
- Escalation requirement

EXPECTED DECISION

ALARM / MUSTER / CONTAIN / ATTEMPT FIREFIGHTING WHERE SAFE / ESCALATE / ABANDONMENT PREPARATION

PASS CRITERIA

1. Fire detection is recorded.
2. Alarm status is recorded.
3. Muster condition is assessed.
4. Fire containment is assessed.
5. Firefighting capability is recorded.
6. Escape routes are assessed.
7. Escalation conditions are visible.
8. Human authority remains FINAL.
9. No autonomous firefighting or vessel command is generated.

IMPORTANT

Firefighting action remains subject to vessel SMS procedures, training, equipment limitations and human authority.

---

VV-049 — DECK CARGO / STORES MOVEMENT

INPUT

- Cargo condition
- Stores condition
- Securing arrangements
- Deck loading
- Vessel draft
- Trim
- Heel / list
- Weather
- Wave condition
- Vessel motion
- CG condition

ASSESS

- Movement risk
- Loss of securing
- Shifting weight
- Potential CG shift
- Heel / list consequence
- Trim consequence
- Stability consequence
- Structural-loading consequence

EXPECTED DECISION

SECURE / REASSESS / RESTRICT OPERATION / ESCALATE

PASS CRITERIA

Movement risk is connected to the stability and structural assessment.

---

VV-050 — STORM / ANCHORAGE / SAFE-HAVEN CONTINGENCY

INPUT

A. ENVIRONMENT

- Storm forecast / condition
- Wind
- Wind direction
- Waves
- Swell
- Current
- Expected deterioration
- Time to deterioration

B. VESSEL CONDITION

- Vessel capability
- Draft
- Manoeuvring capability
- Propulsion status
- DP capability where applicable

C. LOCATION / OPTIONS

- Current position
- Anchorage condition
- Port status
- Port closure
- Safe-water locations
- Sheltered-water locations
- Escape route
- Alternative safe location

ASSESS

- Remain in port
- Depart port where appropriate and authorized
- Proceed to designated storm anchorage
- Shelter at suitable protected location
- Safe-water option
- Escape-route availability
- Time remaining before deterioration
- Vessel capability
- Port closure implications

EXPECTED DECISION

REMAIN / DEPART / ANCHOR / SHELTER / ALTERNATIVE SAFE LOCATION / ESCALATE

PASS CRITERIA

A contingency route or shelter option is identified before environmental conditions exceed the defined research threshold.

---

VV-051 — PIRACY / SEA-MINE / HAZARD AVOIDANCE

INPUT

- Threat information
- Threat type
- Threat position
- Vessel position
- Intended route
- Alternative route
- Navigational restrictions
- Environmental conditions
- Traffic density
- Safe-water option
- Human-authority status

ASSESS

- Threat proximity
- Route risk
- Alternative-route availability
- Safe-distance considerations
- Traffic implications
- Environmental implications
- Navigational restrictions
- Human decision authority

EXPECTED DECISION

CONTINUE / ALTER ROUTE / AVOID AREA / HOLD / ESCALATE

PASS CRITERIA

The system identifies the hazard, evaluates an alternative route and requires human authorization before any simulated route change.

---

VV-052 — ESCAPE ROUTE / PRE-PLANNED CONTINGENCY

INPUT

- Current vessel position
- Intended route
- Primary escape route
- Secondary escape route
- Safe-water locations
- Anchorage
- Shelter
- Port status
- Weather forecast / condition
- Time to deterioration
- Vessel capability
- Alternative route

ASSESS

- Primary escape route
- Secondary escape route
- Safe-water option
- Shelter option
- Time available
- Route deterioration
- Contingency readiness
- Position confidence

EXPECTED DECISION

CONTINUE / PREPARE / ALTER ROUTE / PROCEED TO SAFE WATER / SHELTER / ESCALATE

PASS CRITERIA

A contingency option is identified before the primary operating condition becomes unsafe.

---

VV-053 — INTEGRATED CONTINGENCY CASCADE

INPUT

Any combination of:

- Environmental deterioration
- Wind gust / squall
- Heavy swell
- Heel / list
- UKC deterioration
- Position degradation
- DP degradation
- Machinery failure
- Fire
- Deck movement
- Anchor dragging
- Loss of propulsion
- Towing requirement
- Port closure
- Navigation hazard
- Security threat

ASSESSMENT CHAIN

OBSERVE → VERIFY → ASSESS → PRIMARY AI → SECONDARY AI → STABILIZER → RECOMMENDATION → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT → UPDATE

EXPECTED DECISION

DYNAMIC RESILIENCE ASSESSMENT / SAFE STATE / ESCALATION / HUMAN REVIEW

PASS CRITERIA

1. Multiple simultaneous conditions are detected.
2. Critical conditions are not hidden by lower-priority conditions.
3. Secondary AI identifies safety-critical degradation.
4. Stabilizer provides deterministic arbitration.
5. Captain AI Lena provides decision support.
6. Human authority remains FINAL.
7. No autonomous operational command is generated.
8. Simulated responses remain inside the research environment.
9. Relevant KPIs are recorded.
10. Complete decision chain is auditable.

---

OPERATIONAL CONTINGENCY PRINCIPLE

The V&V framework should investigate whether the system can identify developing hazards early enough to support a planned contingency rather than waiting for a complete loss of control.

RESEARCH SEQUENCE

OBSERVE EARLY → VERIFY → ASSESS MARGIN → IDENTIFY CONTINGENCY → ESCALATE → HUMAN DECISION → SIMULATED RESPONSE → VERIFY RECOVERY

---

VV-054 — INLAND WATERWAY / PORT ENTRY CLEARANCE

INPUT

- Vessel dimensions
- Vessel length
- Vessel beam
- Draft
- Air draft
- UKC
- Waterway depth
- Channel width
- Bridge / overhead clearance
- Vessel type
- Port requirements
- Waterway requirements
- Required clearance / authorization
- Applicable local rules
- Traffic restrictions
- Pilotage requirements
- Human authorization

ASSESS

- Entry requirements
- Draft / UKC
- Air-draft clearance
- Vessel suitability
- Required permission
- Pilotage
- Local rules
- Traffic restrictions
- Clearance status

EXPECTED DECISION

PERMITTED FOR RESEARCH SCENARIO / REVIEW REQUIRED / DO NOT PROCEED

PASS CRITERIA

The system does not assume that an inland waterway or port is available without the applicable clearance, authorization and vessel-specific requirements being satisfied.

---

PART 4 END

NEXT PART — VV-055 onward:

- Pre-job resilience readiness
- Full pre-job resilience integration
- Corrective-action testing
- Re-test validation
- Assessment latency
- Full MARIN V&V resilience scenario
- V&V audit format
- Final human-authority principle
- Final MARIN engineering-review boundary
SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V RESEARCH

PROPOSED SPECIAL OFFSHORE OPERATIONS — MD REVIEW VERSION

VV-041 — ESCAPE ROUTE / PRE-PLANNED CONTINGENCY

INPUT

- Current vessel position
- Intended route
- Safe-water locations
- Anchorage options
- Shelter options
- Port status
- Weather forecast / current condition
- Time available before deterioration
- Vessel capability
- Alternative route
- Navigation / position confidence

ASSESS

- Primary escape route
- Secondary escape route
- Safe-water option
- Shelter option
- Time available
- Route deterioration
- Contingency readiness
- Navigation confidence
- Environmental deterioration

EXPECTED DECISION

CONTINUE / PREPARE / ALTER ROUTE / PROCEED TO SAFE WATER / SHELTER / ESCALATE

PASS CRITERIA

1. A contingency option is identified before the primary operating condition becomes unsafe.
2. Primary and secondary options are traceable.
3. Environmental deterioration is incorporated into the assessment.
4. Human authority remains FINAL.
5. No autonomous navigation command is generated.

---

VV-042 — INTEGRATED CONTINGENCY CASCADE

INPUT

Any combination of:

- Environmental deterioration
- Wind gust / squall
- Heavy swell
- Heel / list
- UKC deterioration
- Position degradation
- DP degradation
- Machinery failure
- Fire
- Deck movement
- Anchor dragging
- Loss of propulsion
- Towing requirement
- Port closure
- Navigation hazard
- Security threat
- Vessel capability
- Human operator availability

ASSESSMENT CHAIN

OBSERVE → VERIFY → ASSESS → PRIMARY AI → SECONDARY AI → STABILIZER → RECOMMENDATION → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT → UPDATE

ASSESS

- Multiple simultaneous conditions
- Critical-condition priority
- Position confidence
- Environmental stress
- Equipment condition
- Operational margin
- Contingency options
- Safe-state condition
- Primary AI assessment
- Secondary AI verification
- Stabilizer arbitration
- Captain AI Lena recommendation
- Human-authority status

EXPECTED DECISION

DYNAMIC RESILIENCE ASSESSMENT / SAFE STATE / ESCALATION / HUMAN REVIEW

PASS CRITERIA

1. Multiple simultaneous conditions are detected.
2. Critical conditions are not hidden by lower-priority conditions.
3. Secondary AI can identify safety-critical degradation.
4. Stabilizer provides deterministic arbitration.
5. Captain AI Lena provides decision support.
6. Human authority remains FINAL.
7. No autonomous operational command is generated.
8. Simulated responses remain inside the research environment.
9. Relevant KPIs are recorded.
10. The complete decision chain is auditable.

---

VV-043 — TRAFFIC SEPARATION SCHEME / SINGAPORE STRAIT

INPUT

- Vessel position
- Traffic Separation Scheme status
- General direction of traffic flow
- Vessel heading
- Course over ground
- Speed over ground
- Traffic density
- Joining / leaving / crossing / following condition
- Nearby vessels
- Relative bearing
- CPA
- TCPA
- Navigational constraints
- Port / terminal departure or arrival condition
- Local VTS / navigation requirements where applicable

ASSESS

- Traffic-lane status
- General direction of traffic flow
- Vessel relationship to the traffic lane
- Joining condition
- Leaving condition
- Crossing condition
- Following condition
- Relative traffic movement
- CPA / TCPA
- Collision risk
- Available sea room
- Safe speed
- Applicable COLREG / TSS considerations
- Local port / VTS restrictions
- Human-authority requirement

SINGAPORE STRAIT RESEARCH CONDITION

A vessel departing a port or terminal, including the Tanjong Pagar area, shall be assessed against the applicable TSS, COLREG and local navigation requirements before entering or crossing a traffic lane.

The simulator shall not assume that a vessel departing port automatically has priority merely because it intends to proceed in the general direction of traffic flow.

A vessel already established in a traffic lane shall be treated as existing traffic requiring appropriate collision-risk assessment.

OPPOSITE / BATAM-SIDE TRAFFIC CONDITION

For vessels following the general direction of an established traffic lane, the simulator shall assess:

- Course
- Speed
- Relative bearing
- CPA
- TCPA
- Applicable COLREG obligations
- Applicable TSS requirements
- Vessel status
- Collision-risk condition

The simulator shall not implement a blanket rule that a vessel always has priority over every vessel on its starboard side.

CROSSING A TRAFFIC LANE

The simulator shall distinguish between:

- Following a traffic lane
- Joining a traffic lane
- Leaving a traffic lane
- Crossing a traffic lane

Crossing shall be treated as a separate manoeuvre requiring assessment of the applicable TSS and COLREG requirements.

EXPECTED DECISION

SAFE / CAUTION / ALTER MANOEUVRE / REDUCE SPEED / WAIT / ESCALATE FOR HUMAN REVIEW

PASS CRITERIA

1. Traffic-lane status is correctly identified.
2. Vessel course and speed are recorded.
3. Joining, leaving, crossing and following are distinguished.
4. Collision risk is assessed using the simulated traffic situation.
5. Applicable COLREG / TSS considerations are identified.
6. No blanket right-of-way assumption is made.
7. Human authority remains FINAL.
8. No autonomous navigational command is generated.

SIMULATED RESPONSE

Decision-support recommendation only.

OPERATIONAL CONNECTION

NONE

---

VV-044 — TSS / PORT DEPARTURE CONFLICT

SCENARIO

Vessel departing port approaches a traffic separation scheme while another vessel is already established in the traffic lane.

INPUT

- Departure track
- Traffic-flow direction
- Vessel heading
- Vessel speed
- Relative bearing
- CPA
- TCPA
- Available sea room
- Traffic density
- Local traffic restrictions
- TSS geometry
- Vessel status

ASSESS

- Departure track
- Traffic-flow direction
- Existing traffic
- Relative movement
- Collision risk
- Available manoeuvring space
- TSS compliance
- Local restrictions
- Safe-speed condition

EXPECTED RESPONSE

IDENTIFY POTENTIAL CONFLICT → PROVIDE HUMAN-REVIEW RECOMMENDATION → AWAIT HUMAN AUTHORITY

PASS CRITERIA

1. Established traffic is recognised.
2. Port-departure status is recorded.
3. TSS geometry is considered.
4. Collision risk is assessed.
5. No automatic priority rule is applied.
6. Human authority remains FINAL.
7. No autonomous manoeuvre is generated.

---

VV-045 — ALTERNATIVE ROUTE / HAZARD AVOIDANCE

SCENARIO

Piracy warning, sea-mine warning, navigational hazard or other route restriction.

INPUT

- Vessel position
- Original route
- Hazard position
- Hazard type
- Hazard proximity
- Alternative route
- Safe-water option
- TSS implications
- Traffic density
- Weather
- Port / coastal restrictions
- Navigation confidence
- Human-authority status

ASSESS

- Original route risk
- Hazard proximity
- Alternative-route availability
- Safe-water availability
- TSS implications
- Traffic implications
- Environmental conditions
- Route deterioration
- Human decision requirement

EXPECTED DECISION

MAINTAIN ROUTE / ALTER ROUTE / HOLD POSITION / ESCALATE

PASS CRITERIA

1. Hazard is identified.
2. Original route is assessed.
3. Alternative route is evaluated.
4. Relevant restrictions are considered.
5. Human authorization is required before any simulated route change.
6. No autonomous navigation command is generated.

---

VV-046 — INLAND WATERWAY / LOCAL RULES

SCENARIO

Proposed transit through an inland waterway, restricted channel or port approach.

INPUT

- Vessel position
- Vessel dimensions
- Vessel length
- Vessel beam
- Draft
- Trim
- UKC
- Charted depth
- Tide
- Channel restrictions
- Local navigation rules
- TSS / traffic restrictions
- Bridge / overhead clearance where applicable
- Vessel capabilities
- Pilotage requirements
- Required clearance / authorization
- Human-authority status

ASSESS

- Vessel suitability
- Vessel dimensions
- Draft
- UKC
- Channel clearance
- Overhead clearance
- Local navigation requirements
- TSS / traffic restrictions
- Pilotage requirement
- Required authorization
- Human decision requirement

EXPECTED DECISION

PROCEED / RESTRICTED / ALTERNATIVE ROUTE / ESCALATE

PASS CRITERIA

1. Vessel suitability is assessed.
2. Draft and UKC are traceable.
3. Applicable channel restrictions are identified.
4. Local rules are considered.
5. Required authorization is identified.
6. Pilotage requirements are considered where applicable.
7. The simulator does not assume access without applicable requirements being satisfied.
8. Human authority remains FINAL.

---

VV-047 — SOUND SIGNALS / FISHING VESSEL ALERT

SCENARIO

Own vessel operates in an area containing fishing vessels, small craft or vessels with restricted manoeuvrability.

INPUT

- Own-vessel status
- Other-vessel status
- Fishing-vessel status
- Restricted-manoeuvrability status
- Relative bearing
- Range
- Course
- Speed
- CPA
- TCPA
- Visibility
- Traffic density
- Navigation lights
- Sound-signal capability
- Radar / ARPA information where available
- AIS information where available
- Applicable COLREG / local requirements

ASSESS

- Other-vessel status
- Fishing activity
- Manoeuvrability condition
- Collision risk
- Relative movement
- CPA / TCPA
- Visibility
- Sound-signal consideration
- Additional lookout requirement
- Responsibilities of both vessels
- Applicable COLREG requirements
- Local navigation requirements

EXPECTED DECISION

MONITOR / SOUND SIGNAL / ALTER COURSE / REDUCE SPEED / STOP / ESCALATE FOR HUMAN REVIEW

PASS CRITERIA

1. Vessel status is correctly identified.
2. Responsibilities between vessels are assessed.
3. Sound-signal requirements are considered.
4. Visibility is considered.
5. Collision risk is considered.
6. Human authority remains FINAL.
7. No automatic navigational command is generated.

---

VV-048 — RESPONSIBILITIES BETWEEN VESSELS

SCENARIO

Two or more vessels are in a developing close-quarters or collision-risk situation.

INPUT

- Own-vessel status
- Other-vessel status
- Number of vessels
- Relative bearing
- Range
- Course
- Speed
- CPA
- TCPA
- Available sea room
- Visibility
- Navigation constraints
- Fishing status
- Restricted-manoeuvrability status
- Constrained-by-draft condition where applicable
- Towing condition where applicable
- Applicable COLREG rules
- Applicable local navigation requirements

ASSESS

- Own-vessel status
- Other-vessel status
- Give-way / stand-on obligations where applicable
- Special vessel conditions
- Relative bearing
- CPA / TCPA
- Speed
- Available sea room
- Visibility
- Collision risk
- Applicable COLREG requirements
- Local navigation requirements

V&V REQUIREMENT

The simulator shall not determine responsibility from a single factor such as vessel position alone.

It shall assess the complete navigational situation and identify the applicable rules and responsibilities before producing a recommendation.

EXPECTED DECISION

MAINTAIN SAFE COURSE / ALTER COURSE / REDUCE SPEED / STOP / ESCALATE

PASS CRITERIA

1. Relevant vessel statuses are identified.
2. Applicable responsibilities are identified.
3. Collision risk is assessed.
4. CPA / TCPA are traceable.
5. Applicable COLREG / local requirements are considered.
6. The complete decision-support trace is retained.
7. Human authority remains FINAL.
8. No autonomous navigational command is generated.

---

VV-049 — RESTRICTED VISIBILITY

SCENARIO

Fog, heavy rain, haze, smoke, darkness or another condition materially reducing visibility.

INPUT

- Visibility condition
- Estimated visibility range
- Day / night condition
- Radar availability
- ARPA availability
- AIS availability
- GNSS / position status
- Navigation lights
- Sound-signalling capability
- Traffic density
- Vessel speed
- Relative contacts
- Relative bearing
- Range
- CPA
- TCPA

ASSESS

- Restricted-visibility condition
- Safe-speed condition
- Radar availability
- ARPA availability
- AIS availability
- Other available detection means
- Collision risk
- Enhanced lookout requirement
- Sound-signal consideration
- CPA / TCPA
- Navigation-information reliability
- Position confidence

EXPECTED DECISION

REDUCE SPEED / ENHANCE LOOKOUT / SOUND SIGNAL / ALTER MANOEUVRE / STOP / ESCALATE

PASS CRITERIA

1. Restricted visibility is correctly detected.
2. Increased caution is demonstrated.
3. Safe speed is assessed.
4. Radar and available detection means are considered.
5. Collision risk is assessed.
6. Sound-signal requirements are considered.
7. Decision-support chain is recorded.
8. Human authority remains FINAL.
9. No autonomous navigation command is generated.

---

VV-050 — VESSEL APPROACHING A BEND / BLIND AREA

SCENARIO

Vessel approaches a bend, river turn, restricted channel, narrow passage or other location where another vessel may be obscured from direct visual observation.

CONDITIONS

A. GOOD / CLEAR VISIBILITY

B. RESTRICTED VISIBILITY

INPUT

- Vessel position
- Vessel heading
- Course
- Speed
- Channel geometry
- Bend / blind sector
- Available sea room
- Possible opposing traffic
- Visibility
- Radar information
- ARPA information where available
- AIS information where available
- Sound-signalling capability
- Navigation lights where applicable
- Local waterway / port rules
- Water depth
- UKC

ASSESS

- Bend / blind-area condition
- Channel geometry
- Available manoeuvring space
- Own-vessel speed
- Possible concealed traffic
- Visibility condition
- Radar / detection information
- Sound-signal consideration
- Navigation-light condition
- UKC
- Collision risk
- Local requirements

EXPECTED DECISION

REDUCE SPEED / SOUND SIGNAL / ENHANCE LOOKOUT / MAINTAIN SAFE STATE / ESCALATE

V&V REQUIREMENT

The simulator shall recognise that a bend or blind area can conceal approaching traffic even when visibility is otherwise clear.

Where visibility is restricted, the simulator shall apply the additional restricted-visibility assessment rather than treating the situation as ordinary clear-weather navigation.

PASS CRITERIA

1. Bend / blind-area condition is detected.
2. Visibility condition is correctly classified.
3. Speed is considered.
4. Lookout requirement is considered.
5. Sound-signal consideration is recorded.
6. Radar / available detection information is considered.
7. Collision risk is assessed.
8. Human authority remains FINAL.
9. No autonomous navigation command is generated.

---

NAVIGATION SAFETY PRINCIPLE

The V&V system shall distinguish between:

CLEAR VISIBILITY → RESTRICTED VISIBILITY → BEND / BLIND AREA → RESTRICTED WATER → TRAFFIC SEPARATION SCHEME → FISHING VESSEL → VESSEL WITH RESTRICTED MANOEUVRABILITY → CLOSE-QUARTERS SITUATION → COLLISION RISK → SPECIAL LOCAL NAVIGATION CONDITION

The system shall then apply:

OBSERVE → VERIFY → IDENTIFY VESSEL STATUS → IDENTIFY VISIBILITY → ASSESS COLLISION RISK → CONSIDER COLREG / LOCAL RULES → CONSIDER SOUND SIGNALS → RECOMMEND → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

IMPORTANT

The simulator provides research decision support only.

It shall not claim to replace:

- Master
- DPO
- Navigator
- COLREG requirements
- VTS instructions
- Local regulations
- Vessel SMS procedures
- Flag State requirements
- Class requirements
- Statutory requirements

HUMAN AUTHORITY

FINAL

AUTONOMOUS NAVIGATION COMMAND

FALSE

OPERATIONAL CONNECTION

NONE

The next part will continue with the remaining navigation, navigation lights/sound signals, vessel status, escape routes, dangerous goods, safe manning/UMV, contingency, buoyage/AtoN, TSS/COLREG, restricted visibility, fire, deck cargo, storm/safe-haven, piracy/hazard avoidance, integrated contingency, heavy-lift and pipelaying scenarios.

All will remain under one continuous numbering system.

SEXTANT PROTOCOL™

MARIN DP / USV RESILIENCE V&V RESEARCH

PROPOSED SPECIAL OFFSHORE OPERATIONS — MD REVIEW VERSION

VV-051 — BUOYAGE / NAVIGATIONAL MARK IDENTIFICATION

SCENARIO

Vessel encounters a navigational mark, buoy or beacon during coastal, port, restricted-water or offshore operations.

INPUT

- Vessel position
- Vessel heading
- Course over ground
- Speed over ground
- Charted buoy position
- Buoy / beacon type
- Buoy colour
- Topmark
- Light characteristic
- Light colour
- Sound signal where applicable
- Radar response
- AIS / AtoN information where available
- GNSS position
- Chart / ENC information
- Visibility
- Tidal condition
- Water depth
- Applicable local navigation requirements

ASSESS

- Correct identification of the navigational mark
- Agreement between charted and observed position
- Mark identification against available navigation information
- Vessel approach / passing / deviation condition
- Safe passing distance
- Water depth
- UKC
- Channel / hazard / safe-water / special-area indication
- Light-characteristic consistency
- Navigation confidence

EXPECTED DECISION

CONFIRM MARK / MONITOR / ALTER COURSE / REDUCE SPEED / ESCALATE

PASS CRITERIA

1. The navigational mark is correctly identified.
2. Chart / ENC information is correlated with available observations.
3. Vessel position is recorded.
4. Water depth and UKC are considered.
5. Navigation confidence is recorded.
6. The information is incorporated into the simulated navigation assessment.
7. Human authority remains FINAL.
8. No autonomous navigation command is generated.

---

VV-052 — LATERAL MARK / CHANNEL

SCENARIO

Vessel enters, follows or leaves a marked channel.

INPUT

- Vessel position
- Vessel heading
- Course
- Speed
- Applicable buoyage system
- Port / starboard lateral-mark information
- Channel direction
- Charted channel limits
- Charted depth
- Tide height
- Vessel draft
- Trim
- UKC
- Safe passing distance
- Traffic condition
- Visibility
- Local navigation requirements

ASSESS

- Applicable buoyage system
- Lateral-mark identification
- Channel direction
- Vessel relationship to channel
- Position relative to channel limits
- Water depth
- UKC
- Tidal condition
- Draft and trim
- Safe passing distance
- Traffic
- Navigation confidence

EXPECTED DECISION

FOLLOW CHANNEL / CORRECT TRACK / REDUCE SPEED / ESCALATE

PASS CRITERIA

1. Vessel relationship to the marked channel is recorded.
2. Applicable buoyage information is identified.
3. Chart / ENC information is considered.
4. Draft, tide and UKC are incorporated.
5. The simulator does not rely solely on visual buoy recognition.
6. Human authority remains FINAL.
7. No autonomous navigation command is generated.

---

VV-053 — CARDINAL MARK

SCENARIO

Vessel approaches a cardinal mark indicating the safe side on which to pass a navigational danger.

INPUT

- Vessel position
- Vessel heading
- Bearing to mark
- Cardinal-mark type
- Charted danger position
- Charted danger extent
- Water depth
- Vessel draft
- Trim
- UKC
- Tide
- Visibility
- Weather
- Sea condition

ASSESS

- Cardinal-mark identification
- Correct meaning of the mark
- Vessel position
- Bearing to mark
- Associated charted danger
- Safe passing side
- Water depth
- UKC
- Visibility
- Environmental conditions
- Navigation confidence

EXPECTED DECISION

PASS ON INDICATED SAFE SIDE / MONITOR / ALTER COURSE / ESCALATE

PASS CRITERIA

1. Correct cardinal-mark meaning is identified.
2. Associated navigational danger is identified.
3. Safe passing side is recorded.
4. UKC is assessed.
5. Environmental conditions are considered.
6. Recommended simulated track remains clear of the associated danger.
7. Human authority remains FINAL.

---

VV-054 — ISOLATED DANGER MARK

SCENARIO

Vessel approaches an isolated danger mark.

INPUT

- Vessel position
- Vessel heading
- Bearing to mark
- Mark identification
- Charted danger position
- Charted danger extent
- Safe passing distance
- Vessel draft
- Trim
- Water depth
- Tide
- UKC
- Sea state
- Visibility
- Vessel speed

ASSESS

- Mark identification
- Charted danger position
- Vessel position
- Safe passing distance
- Draft
- Water depth
- UKC
- Tidal condition
- Sea state
- Visibility
- Speed
- Navigation confidence

EXPECTED DECISION

PASS CLEAR / ALTER COURSE / REDUCE SPEED / ESCALATE

PASS CRITERIA

1. The mark is correctly identified.
2. The associated localised danger is recognised.
3. Safe passing distance is assessed.
4. Draft, water depth and UKC are recorded.
5. Environmental conditions are considered.
6. Human authority remains FINAL.
7. No autonomous navigation command is generated.

---

VV-055 — SAFE WATER MARK

SCENARIO

Vessel uses a safe-water mark to assist with navigation through a fairway, approach or channel.

INPUT

- Vessel position
- Vessel heading
- Course
- Speed
- Mark position
- Mark identification
- Fairway / channel relationship
- Chart / ENC information
- Water depth
- Vessel draft
- Trim
- UKC
- Tide
- Other traffic
- Visibility
- Navigation confidence

ASSESS

- Mark position
- Vessel position
- Fairway / channel relationship
- Course
- Speed
- Water depth
- UKC
- Tide
- Traffic
- Visibility
- Navigation confidence

EXPECTED DECISION

FOLLOW FAIRWAY / MONITOR / ESCALATE

PASS CRITERIA

1. Safe-water information is correctly identified.
2. Mark position is correlated with chart / ENC data.
3. Vessel position is recorded.
4. Water depth and UKC are considered.
5. Traffic and visibility are assessed.
6. Human authority remains FINAL.

---

VV-056 — SPECIAL MARK / RESTRICTED AREA

SCENARIO

Vessel approaches a special mark identifying a designated area or feature.

INPUT

- Vessel position
- Vessel heading
- Proposed route
- Mark identification
- Charted area
- Purpose of mark
- Navigation restrictions
- Local port / waterway requirements
- Vessel status
- Vessel dimensions
- Draft
- UKC
- Traffic
- Environmental conditions

ASSESS

- Special-mark identification
- Charted-area relationship
- Purpose of the mark
- Applicable navigation restrictions
- Local requirements
- Vessel status
- Proposed route
- Draft / UKC where applicable
- Traffic condition
- Environmental condition

EXPECTED DECISION

PROCEED / AVOID AREA / ALTER ROUTE / ESCALATE

PASS CRITERIA

1. Special-area condition is identified.
2. Applicable restrictions are considered.
3. Vessel relationship to the area is recorded.
4. The simulator does not assume unrestricted passage.
5. Human authority remains FINAL.
6. No autonomous route change is generated.

---

VV-057 — BUOY / ATO N POSITION DISCREPANCY

SCENARIO

Observed buoy or AtoN position differs materially from the charted position.

INPUT

- Vessel position
- Charted buoy position
- Observed buoy position
- GNSS position
- Radar position
- Visual identification
- AIS / AtoN information where available
- Chart / ENC information
- Timestamp
- Tidal condition
- Current
- Visibility
- Vessel heading
- Speed
- Navigation confidence

ASSESS

- GNSS position
- Charted position
- Observed position
- Radar correlation
- Visual identification
- AIS / AtoN information
- Timestamp integrity
- Tidal / current influence
- Possible buoy displacement
- Position confidence
- Navigation-data consistency

EXPECTED DECISION

VERIFY / REDUCE SPEED / INCREASE CLEARANCE / ALTER ROUTE / ESCALATE

PASS CRITERIA

1. Position discrepancy is detected.
2. Multiple available navigation sources are compared.
3. Timestamp is recorded.
4. Possible AtoN displacement is identified as an uncertainty.
5. Navigation confidence is reduced where appropriate.
6. The simulator does not blindly accept a single navigation source.
7. Human authority remains FINAL.

---

VV-058 — BUOY LIGHT / SOUND CHARACTERISTIC FAILURE

SCENARIO

Expected buoy light or sound characteristic is absent, degraded or inconsistent with available navigation information.

INPUT

- Vessel position
- Expected mark identification
- Expected light characteristic
- Expected light colour
- Expected sound characteristic
- Observed light characteristic
- Observed light colour
- Observed sound characteristic
- Visibility
- Radar response
- GNSS position
- Chart / ENC information
- AIS / AtoN information where available
- Alternative navigation source
- Timestamp

ASSESS

- Expected characteristic
- Observed characteristic
- Light failure / degradation
- Sound-signal failure / degradation
- Visibility
- Radar response
- GNSS position
- Chart / ENC correlation
- Alternative navigation source
- Navigation confidence

EXPECTED DECISION

VERIFY / REDUCE SPEED / USE ALTERNATIVE NAVIGATION SOURCE / ESCALATE

PASS CRITERIA

1. Expected and observed characteristics are compared.
2. Failure or uncertainty is detected.
3. Alternative navigation information is considered.
4. Navigation confidence is reassessed.
5. Human authority remains FINAL.
6. No autonomous navigation command is generated.

---

VV-059 — BUOYAGE + DRAFT + UKC + TIDAL WINDOW

SCENARIO

Vessel approaches a buoyed channel with a limited under-keel-clearance window.

INPUT

- Departure draft
- Forward draft
- Aft draft
- Mean draft
- Trim
- Water density
- Charted depth
- Chart datum
- Height of tide above chart datum
- Required UKC
- Safety margin
- Vessel speed
- Tidal current
- Squat / dynamic-draft allowance where applicable
- Position confidence
- Chart-data confidence

CALCULATION

Water Depth = Charted Depth at Chart Datum + Height of Tide

UKC = Water Depth − Applicable Dynamic / Actual Draft

Where applicable, the assessment shall consider:

- Departure draft
- Forward draft
- Aft draft
- Trim
- Squat
- Vessel motion
- Heel
- Wave response
- Tidal variation
- Safety margin
- Position uncertainty
- Chart-data uncertainty

ASSESS

- Departure draft
- Water depth
- Tide
- Applicable vessel draft
- UKC
- Working tidal window
- Environmental conditions
- Dynamic draft
- Position confidence
- Chart-data integrity

EXPECTED DECISION

TIDAL WINDOW ADEQUATE / WAIT FOR TIDE / REDUCE DRAFT / ALTER ROUTE / ESCALATE

PASS CRITERIA

1. Departure draft is explicitly incorporated.
2. Charted depth is not treated as the complete available water depth.
3. Tide height is recorded.
4. UKC is reproducible.
5. The changing tidal window is traceable.
6. Applicable vessel-specific UKC criteria remain controlling.
7. Human authority remains FINAL.

---

VV-060 — BUOYAGE / RESTRICTED VISIBILITY

SCENARIO

Vessel navigates a buoyed channel in fog, heavy rain, haze or another restricted-visibility condition.

INPUT

- Vessel position
- Vessel heading
- Course
- Speed
- Buoy identification
- Chart / ENC information
- Radar response
- GNSS position
- AIS / AtoN information where available
- Sound-signalling capability
- Visibility
- Traffic
- Channel limits
- Water depth
- Vessel draft
- UKC
- Position confidence

ASSESS

- Buoy identification
- Radar correlation
- GNSS position
- Chart / ENC correlation
- Sound-signal consideration
- Safe speed
- Traffic
- Channel limits
- UKC
- Position confidence
- Navigation-data reliability

EXPECTED DECISION

REDUCE SPEED / ENHANCE LOOKOUT / SOUND SIGNAL / VERIFY POSITION / ESCALATE

PASS CRITERIA

1. Restricted visibility is correctly identified.
2. Visual buoy recognition limitations are considered.
3. Radar and other appropriate navigation information are considered.
4. Safe speed is assessed.
5. Sound-signal requirements are considered.
6. UKC remains visible.
7. Navigation confidence is recorded.
8. Human authority remains FINAL.
9. No autonomous navigation command is generated.

---

BUOYAGE V&V PRINCIPLE

NAVIGATIONAL MARK → IDENTIFY → VERIFY → CORRELATE WITH CHART / ENC → CONFIRM POSITION → ASSESS WATER DEPTH / UKC → ASSESS TRAFFIC → ASSESS VISIBILITY → RECOMMEND → CAPTAIN AI LENA → HUMAN AUTHORITY → SIMULATED RESPONSE → AUDIT

The simulator shall not infer a safe route solely from the presence of a buoy.

Buoyage information shall be assessed together with:

- Chart / ENC information
- Vessel position
- Vessel draft
- Water depth
- Tide
- UKC
- Vessel manoeuvring characteristics
- Traffic
- Visibility
- Applicable local navigation requirements

---

SPECIAL OFFSHORE OPERATIONS

VV-061 — HEAVY-LIFT LOADING IN SEAWAY

PURPOSE

Assess the simulated resilience response during heavy-lift loading operations conducted in environmental conditions representative of offshore / seaway operations.

INPUT

- Vessel position
- Vessel heading
- Lift weight
- Crane radius
- Crane load
- Boom angle
- Hook load
- Vessel displacement
- Vessel draft
- Vessel trim
- Vessel heel / list
- KG / CG condition
- Free-surface effects
- GM / GZ and stability response
- Wind
- Wave
- Swell
- Current
- Vessel motions
- Dynamic amplification / suspended-load movement
- Deck securing
- Load-transfer condition
- DP position error
- Environmental loading
- Lift suspension criteria
- Abort criteria
- Human-authority status

ASSESS

- Changing displacement
- CG movement
- Stability response
- Heel / list
- Trim
- Environmental loading
- Vessel motion
- DP position response
- Load-transfer condition
- Suspended-load condition
- Safe-state condition
- Lift suspension / abort condition
- Residual risk

EXPECTED DECISION

CONTINUE SIMULATED LIFT / MONITOR / SUSPEND / ABORT / ESCALATE

EXPECTED V&V EVIDENCE

The system should demonstrate traceable assessment of changing stability, environmental loading, vessel position and operational risk throughout the simulated lift.

HUMAN AUTHORITY

FINAL

SIMULATED EXECUTION

HUMAN AUTHORIZATION REQUIRED

OPERATIONAL DP CONNECTION

NONE

---

VV-062 — HEAVY-LIFT DISCHARGE / OFFLOADING

PURPOSE

Assess the simulated resilience response during heavy-lift discharge where vessel displacement, centre of gravity and stability conditions change throughout the operation.

INPUT

- Initial displacement
- Remaining displacement
- Cargo weight
- Lifted load
- Changing KG / CG
- Longitudinal CG movement
- Transverse CG movement
- Heel / list
- Trim
- GM / GZ and stability response
- Crane condition
- Suspended-load condition
- Seaway
- Vessel-motion response
- Wind
- Wave
- Current
- DP capability / resilience
- Position stability
- Heading stability
- Safe-state condition
- Emergency / lift-suspension condition
- Human-authority status

ASSESS

- Displacement change
- CG shift
- Stability response
- Heel / list
- Trim
- Crane condition
- Suspended-load condition
- Environmental loading
- DP response
- Position / heading stability
- Safe-state condition
- Residual risk

EXPECTED DECISION

CONTINUE / MONITOR / SUSPEND LIFT / ABORT / ESCALATE

EXPECTED V&V EVIDENCE

The system should demonstrate that changing loading conditions trigger reassessment of vessel stability, environmental stress, position resilience and operational status.

HUMAN AUTHORITY

FINAL

SIMULATED EXECUTION

HUMAN AUTHORIZATION REQUIRED

OPERATIONAL DP CONNECTION

NONE
# ============================================================
# VV-031 — DANGEROUS GOODS / CARGO STOWAGE
# ============================================================

INPUT:
1. Dangerous-goods declaration
2. Cargo classification
3. UN number where applicable
4. Quantity
5. Cargo description
6. Stowage location
7. Segregation requirements
8. Cargo securing arrangements
9. Dangerous-goods manifest
10. Stowage plan
11. Emergency information
12. Vessel loading condition
13. Environmental condition
14. Applicable vessel / port requirements

OBSERVE:
- Cargo and dangerous-goods information.
- Declared cargo status.
- Stowage location.
- Securing condition.
- Required segregation.
- Availability of emergency information.

VERIFY:
- Manifest against stowage plan.
- Cargo classification.
- Required segregation.
- Securing information.
- Applicable vessel-specific requirements.

ASSESS:
- Dangerous-goods documentation status.
- Stowage suitability.
- Segregation condition.
- Cargo securing condition.
- Emergency-response information.
- Compatibility with vessel condition.
- Potential stability / structural implications.
- Potential operational restrictions.

EXPECTED DECISION:
DG / STOWAGE INFORMATION AVAILABLE
/
REVIEW REQUIRED
/
HUMAN ESCALATION

PASS CRITERIA:
1. Dangerous-goods information is traceable.
2. Cargo classification is recorded.
3. Stowage location is identifiable.
4. Segregation requirements are visible.
5. Securing status is recorded.
6. Manifest and stowage-plan status are traceable.
7. Emergency information is available where applicable.
8. Any deficiency is escalated for human review.
9. No autonomous cargo-handling command is generated.

# ============================================================
# VV-032 — SAFE MANNING / UMV CERTIFICATION
# ============================================================

INPUT:
1. Safe Manning Certificate where applicable
2. UMV / unmanned-vessel certification where applicable
3. Applicable authorization
4. Vessel operating mode
5. Operating area
6. Manning requirement
7. Personnel availability
8. Watchkeeping requirements
9. Remote-operation requirements
10. Remote-control capability
11. Documentation issue date
12. Documentation validity / status
13. Flag State requirements
14. Class requirements where applicable

OBSERVE:
- Current operating mode.
- Manning / personnel status.
- Applicable documentation.
- Remote-operation arrangements.

VERIFY:
- Applicable certification.
- Manning requirement.
- Operating-area applicability.
- Operating-mode applicability.
- Documentation status.

ASSESS:
- Safe-manning requirement.
- Personnel availability.
- Remote-operation capability.
- Watchkeeping capability.
- UMV authorization where applicable.
- Documentation completeness.
- Operational-area compatibility.

EXPECTED DECISION:
DOCUMENTATION CURRENT
/
REVIEW REQUIRED
/
HUMAN / FLAG / CLASS REVIEW

PASS CRITERIA:
1. Applicable certification is identified.
2. Manning requirement is recorded.
3. Operating mode is recorded.
4. Operating area is recorded.
5. Personnel / remote-operation capability is traceable.
6. Documentation status is traceable.
7. Any uncertainty is escalated.
8. Sextant does not declare statutory or Class compliance.

# ============================================================
# VV-033 — VESSEL AIR-DRAFT / OVERHEAD CLEARANCE
# ============================================================

INPUT:
1. Vessel highest fixed point
2. Highest point above keel
3. Vessel air draft
4. Bridge clearance
5. Cable clearance
6. Other overhead obstruction
7. Overhead clearance
8. Vessel draft
9. Vessel trim
10. Vessel heel / list where applicable
11. Vessel position
12. Tide where relevant
13. Navigation-data source
14. Clearance-data source

CALCULATION:

AVAILABLE VERTICAL CLEARANCE
=
OVERHEAD CLEARANCE
−
APPLICABLE VESSEL AIR DRAFT

OBSERVE:
- Vessel geometry.
- Highest fixed point.
- Overhead restriction.
- Position.
- Trim / heel condition.

VERIFY:
- Vessel air-draft data.
- Bridge / cable clearance.
- Applicable tide or environmental correction.
- Navigation-data integrity.

ASSESS:
- Air draft.
- Highest point above keel.
- Bridge clearance.
- Cable clearance.
- Other overhead restrictions.
- Trim / heel effect.
- Data confidence.

EXPECTED DECISION:
CLEAR
/
REDUCED CLEARANCE
/
REVIEW REQUIRED
/
HUMAN ESCALATION

PASS CRITERIA:
1. Highest vessel point is explicitly recorded.
2. Applicable overhead clearance is recorded.
3. Available vertical clearance is reproducible.
4. Vessel trim / heel is considered where applicable.
5. Navigation-data integrity is assessed.
6. Any limiting clearance is escalated.
7. No autonomous navigation command is generated.

# ============================================================
# VV-034 — COMPLETE VESSEL GEOMETRY / CLEARANCE
# ============================================================

INPUT:
1. Vessel length
2. Vessel beam
3. Vessel draft
4. Forward draft
5. Aft draft
6. Mean draft
7. Air draft
8. Highest point above keel
9. Trim
10. Heel / list
11. Turning-circle information
12. Charted depth
13. Tide height
14. Water depth
15. UKC
16. Overhead clearance
17. Bridge / cable clearance
18. Channel width
19. Available manoeuvring area
20. Vessel position confidence

OBSERVE:
- Horizontal vessel dimensions.
- Vertical dimensions.
- Depth condition.
- Overhead restrictions.
- Manoeuvring envelope.

VERIFY:
- Vessel particulars.
- Draft / trim.
- Charted depth.
- Tide.
- Overhead-clearance data.
- Turning information.
- Position integrity.

ASSESS:
- Horizontal clearance.
- Vertical clearance.
- Depth clearance.
- UKC.
- Turning envelope.
- Heel / list effect.
- Trim effect.
- Air-draft limitation.
- Bridge / cable clearance.
- Safe approach / departure corridor.

EXPECTED DECISION:
CLEARANCE ACCEPTABLE
/
REVIEW REQUIRED
/
HUMAN AUTHORITY ESCALATION

PASS CRITERIA:
1. Vessel dimensions are traceable.
2. Draft and trim are recorded.
3. Depth and UKC are reproducible.
4. Air draft is recorded.
5. Overhead clearance is assessed.
6. Turning envelope is assessed.
7. Horizontal and vertical clearances are integrated.
8. Limiting conditions are visible.
9. Human authority remains FINAL.
10. No autonomous operational command is generated.

# ============================================================
# VV-035 — TRAFFIC SEPARATION SCHEME / NAVIGATION CONDITION
# ============================================================

INPUT:
1. Vessel position
2. Vessel heading
3. Course over ground
4. Speed over ground
5. Traffic Separation Scheme status
6. Traffic-lane geometry
7. General traffic-flow direction
8. Traffic density
9. Nearby vessels
10. Relative bearing
11. CPA
12. TCPA
13. Joining / leaving / crossing / following status
14. Navigation status
15. Port / terminal condition
16. Local VTS requirements
17. Applicable COLREG considerations
18. Navigational constraints

OBSERVE:
- Own-vessel position and movement.
- Traffic-lane condition.
- Nearby traffic.
- Port-departure / arrival condition.

VERIFY:
- TSS geometry.
- Traffic direction.
- Vessel movement.
- Relative traffic situation.
- Applicable navigation requirements.

ASSESS:
- Following a traffic lane.
- Joining a traffic lane.
- Leaving a traffic lane.
- Crossing a traffic lane.
- Collision risk.
- CPA / TCPA.
- Available sea room.
- Safe speed.
- Local restrictions.
- TSS / COLREG considerations.

EXPECTED DECISION:
SAFE
/
CAUTION
/
ALTER MANOEUVRE
/
REDUCE SPEED
/
WAIT
/
ESCALATE FOR HUMAN REVIEW

PASS CRITERIA:
1. Traffic-lane status is identified.
2. Vessel course and speed are recorded.
3. Following / joining / leaving / crossing are distinguished.
4. Collision risk is assessed.
5. Applicable TSS / COLREG considerations are identified.
6. No blanket right-of-way assumption is used.
7. Human authority remains FINAL.
8. No autonomous navigational command is generated.

# ============================================================
# VV-036 — TSS / PORT-DEPARTURE CONFLICT
# ============================================================

SCENARIO:
Vessel departing a port or terminal approaches a traffic
separation scheme while another vessel is already established
within the traffic lane.

INPUT:
1. Departure position
2. Departure track
3. Vessel heading
4. Vessel speed
5. Traffic-flow direction
6. Established traffic position
7. Relative bearing
8. CPA
9. TCPA
10. Available sea room
11. TSS geometry
12. Local traffic restrictions
13. VTS requirements
14. Navigation status

ASSESS:
- Departure track.
- Established traffic.
- Traffic-flow direction.
- Relative movement.
- Collision risk.
- Available manoeuvring room.
- TSS compliance.
- Applicable COLREG responsibilities.

EXPECTED DECISION:
MAINTAIN SAFE STATE
/
WAIT
/
ALTER MANOEUVRE
/
REDUCE SPEED
/
ESCALATE

PASS CRITERIA:
1. Established traffic is recognised.
2. Port-departure status is not treated as automatic priority.
3. TSS geometry is considered.
4. CPA / TCPA are assessed.
5. Collision risk is identified.
6. Applicable navigation responsibilities are traceable.
7. Human authority remains FINAL.
8. No autonomous navigation command is generated.

# ============================================================
# VV-037 — RESTRICTED VISIBILITY
# ============================================================

SCENARIO:
Fog, heavy rain, haze, smoke, darkness or another condition
materially reducing effective visibility.

INPUT:
1. Visibility condition
2. Estimated visibility range
3. Radar availability
4. ARPA availability
5. AIS availability
6. GNSS / position status
7. Navigation-light status
8. Sound-signal capability
9. Traffic density
10. Vessel speed
11. Relative contacts
12. CPA
13. TCPA
14. Navigation-data confidence

ASSESS:
- Restricted-visibility condition.
- Safe speed.
- Radar availability.
- Available means of detection.
- Collision risk.
- Enhanced lookout requirement.
- Sound-signal consideration.
- CPA / TCPA.
- Navigation-information reliability.

EXPECTED DECISION:
REDUCE SPEED
/
ENHANCE LOOKOUT
/
SOUND SIGNAL
/
ALTER MANOEUVRE
/
STOP
/
ESCALATE

PASS CRITERIA:
1. Restricted visibility is detected.
2. Safe speed is considered.
3. Radar / available detection means are considered.
4. Collision risk is assessed.
5. Sound-signal consideration is recorded.
6. Navigation confidence is recorded.
7. Decision-support chain is traceable.
8. Human authority remains FINAL.
9. No autonomous navigational command is generated.

# ============================================================
# VV-038 — BEND / BLIND-AREA NAVIGATION
# ============================================================

SCENARIO:
Vessel approaches a bend, river turn, restricted channel,
narrow passage or other location where approaching traffic
may be obscured.

CONDITIONS:
A. CLEAR VISIBILITY
B. RESTRICTED VISIBILITY

INPUT:
1. Vessel position
2. Channel geometry
3. Bend geometry
4. Blind sector
5. Available sea room
6. Vessel speed
7. Other possible traffic
8. Visibility
9. Radar information
10. Sound-signal capability
11. Navigation-light status where applicable
12. Local waterway / port requirements
13. Water depth
14.



