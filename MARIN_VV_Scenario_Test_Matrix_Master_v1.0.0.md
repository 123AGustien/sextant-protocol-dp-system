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

The next part will continue with the remaining navigation, navigation lights/sound signals, vessel status, escape routes, dangerous goods, safe manning/UMV, contingency, buoyage/AtoN, TSS/COLREG, restricted visibility, fire, deck cargo, storm/safe-haven, piracy/hazard avoidance, integrated contingency, heavy-lift and pipelaying scenarios.

All will remain under one continuous numbering system.

