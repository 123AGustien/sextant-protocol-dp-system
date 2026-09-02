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

BIAS CONTROL / DECISION INDEPENDENCE

V&V TEST DIMENSION

Bias Mode:
☐ NO BIAS — Independent Assessment
☐ BIAS — Declared Preference / Constraint

---

TEST A — NO BIAS

Scenario:
System performs the assessment without any declared commercial, operational, technical, or strategic preference.

Input:
Standard scenario inputs only.

Decision:
AI assessment is generated solely from the available evidence, defined criteria, system rules, and recorded assumptions.

KPI:

- Decision consistency
- Safety compliance
- Assessment transparency
- Reproducibility
- Audit completeness

Human Authority:
Human Decision Authority remains mandatory.

Audit Result:
Bias status recorded as NO BIAS.

---

TEST B — BIAS

Scenario:
System is provided with a declared operational, commercial, technical, or strategic preference/constraint.

Input:
Same scenario inputs as Test A, plus the declared preference/constraint.

Decision:
System must identify and record the declared preference and show its influence on the assessment.

The declared preference must not override safety criteria, system constraints, or Human Decision Authority.

KPI:

- Bias identification
- Decision robustness
- Safety preservation
- Transparency of influence
- Audit completeness
- Difference from NO-BIAS baseline

Human Authority:
Human Decision Authority remains mandatory.

Audit Result:
Bias type, declared preference, system response, decision impact, and final human authorization status recorded.

---

COMPARATIVE V&V RESULT

NO BIAS → Baseline Assessment

BIAS → Robustness Assessment

The comparison determines whether introduction of a declared preference materially changes the AI assessment, recommendation, risk classification, or proposed action.

Acceptance Principle:

«A declared preference may influence the assessment only within the defined decision framework. It must not suppress safety-critical information, bypass system constraints, or remove Human Decision Authority.»

MARIN V&V MATRIX FIELDS:

Scenario → Bias Mode → Input → Decision → KPI → Human Authority → Audit Result → NO-BIAS/BIAS Difference


DP2 RESILIENCE SCENARIO

Engine Overheat During Push-Up Operation

Operational Scenario

A DP2 offshore vessel is conducting a controlled push-up operation requiring sustained thrust against an external structure.

During the operation, one propulsion/power unit develops an overheating condition and must reduce its available load.

Sextant Protocol™ Response

The system follows the OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE resilience cycle:

OBSERVES the developing thermal degradation.

VERIFIES the condition and confirms that the affected propulsion/power unit is degrading.

ASSESSES remaining thrust capability, available power margin, load distribution and DP2 redundancy.

DECIDES whether safe load redistribution remains possible within the vessel's defined operating and redundancy envelope.

ACTS by supporting controlled thrust/load redistribution within predetermined safe operating limits.

UPDATES the resilience assessment continuously as the vessel's condition changes.

If the remaining propulsion system can safely compensate while maintaining the required redundancy and operating margins, the push-up load may be maintained within the approved operating envelope.

If sufficient reserve or redundancy is no longer available, the system does not simply demand additional thrust.

Instead, it escalates the condition for human decision and authorization, allowing the operator to select the appropriate safe-state response.

Executive Value

This scenario demonstrates that Sextant Protocol™ addresses the critical distinction between:

"Can the vessel compensate?"

and:

"Can the vessel compensate safely while maintaining DP2 resilience?"

The system therefore supports:

- Early detection of propulsion degradation
- Controlled load redistribution
- Protection against secondary overload
- Continuous resilience assessment
- Preservation of human decision authority
- Auditable decision-making

Core Principle

«Compensation is permitted only while the vessel remains within its defined safe operating and redundancy envelope.»

Once that envelope is threatened, the system transitions from automatic/controlled compensation support to human-authorized safe-state management.

Human Authority Gate

NO RECOVERY ACTION BEYOND THE DEFINED SAFE ENVELOPE WITHOUT HUMAN AUTHORIZATION.

The system provides the assessment, predicted consequence, recommended response and audit record.

The human operator retains final authority over continuation, reduction, stabilization or termination of the operation.

DP2 RESILIENCE SCENARIO

Engine Overheat During Push-Up Operation

Operational Scenario

A DP2 offshore vessel is conducting a controlled push-up operation requiring sustained thrust against an external structure.

During the operation, one propulsion/power unit develops an overheating condition and must reduce its available load.

Sextant Protocol™ Response

The system:

OBSERVES the thermal degradation
↓
VERIFIES the condition
↓
ASSESSES remaining thrust, power margin and DP2 redundancy
↓
DECIDES whether safe load redistribution is possible
↓
ACTS by reallocating thrust within safe operating limits
↓
UPDATES the assessment continuously

If the remaining propulsion system can safely compensate, the required push-up force may be maintained.

If sufficient reserve or redundancy is no longer available, the system does not simply demand additional thrust.

It escalates the condition for human decision and authorization.

Executive Value

This scenario demonstrates that Sextant Protocol™ is designed to address the difference between:

"Can the vessel compensate?"

and

"Can the vessel compensate safely while maintaining DP2 resilience?"

The system therefore supports:

- Early detection of degradation
- Controlled load redistribution
- Protection against secondary overload
- Continuous resilience assessment
- Preservation of human decision authority
- Auditable decision-making

Core Principle

«Compensation is permitted only while the vessel remains within its defined safe operating and redundancy envelope.»

Once that envelope is threatened, the system transitions from automatic compensation to human-authorized safe-state management.

CRANE, TOWING & ELECTRONIC EQUIPMENT RESILIENCE MATRIX

1. 5,000-TONNE SEAWAY CRANE — SWL & WIRE-ROPE ARCHITECTURE

«Engineering principle: Wire-rope diameter and construction shall not be selected from crane SWL alone. The design shall account for total suspended load, reeving arrangement, dynamic amplification, number of parts of line, rope efficiency, D/d ratio, sheave/drum geometry, fleet angle, termination efficiency and applicable class/flag requirements.»

ID| Parameter| Design Variable| Engineering Check| V&V Evidence
CRN-001| Crane SWL| 5,000 t| Verify rated capacity for specified operating configuration| Approved crane load chart
CRN-002| Gross lifted load| Payload + hook block + rigging + attachments| Establish total suspended mass| Load calculation
CRN-003| Dynamic load| Vessel motion + hoisting/lowering + acceleration| Apply approved dynamic amplification| Dynamic load-case analysis
CRN-004| Number of parts of line| Reeving arrangement| Determine load distribution between rope parts| Reeving calculation
CRN-005| Rope line tension| Suspended load / effective supporting parts| Determine maximum rope tension| Rope-tension calculation
CRN-006| Rope MBL| Minimum Breaking Load| MBL must exceed calculated design tension by applicable safety factor| Manufacturer certificate
CRN-007| Rope WLL/SWL| Permitted working load| Verify against applicable design requirement| Certification
CRN-008| Rope diameter| d| Select from required MBL, fatigue, bending and D/d requirements| Rope specification
CRN-009| Strand construction| Number and arrangement of strands/wires| Select according to strength, fatigue and operational requirements| Manufacturer specification
CRN-010| Rope core| Approved core construction| Verify crushing, bending and stability requirements| Manufacturer certificate
CRN-011| Sheave/drum diameter| D| Verify required D/d ratio| Mechanical calculation
CRN-012| Fleet angle| Rope/sheave alignment| Limit adverse side loading and spooling effects| Geometry verification
CRN-013| Rope termination| Socket/wedge/ferrule/etc.| Verify termination efficiency| Certificate/inspection
CRN-014| Vessel motion| Heave, roll, pitch| Determine dynamic rope loading in seaway| Seaway simulation
CRN-015| Rope condition| Wear, corrosion, broken wires, deformation| Apply applicable inspection/rejection criteria| Inspection record
CRN-016| Abnormal loading| Shock, snagging, sudden load transfer| Assess credible overload cases| FMEA / load-case analysis

Crane Design Chain

5,000 t SWL
      ↓
TOTAL SUSPENDED LOAD
      ↓
DYNAMIC AMPLIFICATION
      ↓
REEVING / PARTS OF LINE
      ↓
MAXIMUM ROPE TENSION
      ↓
REQUIRED MBL
      ↓
ROPE DIAMETER
      ↓
STRAND / WIRE CONSTRUCTION
      ↓
CORE
      ↓
SHEAVE / DRUM D/d
      ↓
TERMINATION
      ↓
INSPECTION & CONDITION MONITORING

---

2. SUPERTANKER TOWING — TOWLINE STRENGTH ARCHITECTURE

«Engineering principle: Supertanker displacement alone shall not be used as a direct formula for towline SWL. Towline design shall consider vessel resistance, environmental forces, tow speed, tow configuration and dynamic loading.»

ID| Parameter| Input| Engineering Assessment| V&V Evidence
TOW-001| Tanker displacement| Δ| Establish vessel mass/loading condition| Vessel loading data
TOW-002| Hull resistance| R| Determine resistance at intended tow speed| Resistance calculation
TOW-003| Wind force| Wind velocity + projected area| Determine aerodynamic tow resistance| Environmental load calculation
TOW-004| Current force| Current velocity + underwater area| Determine current resistance| Environmental load calculation
TOW-005| Wave/drift force| Sea state + heading| Determine additional environmental loading| Seaway simulation
TOW-006| Tow speed| V| Establish operational towing condition| Tow plan
TOW-007| Static towline tension| T| Calculate steady-state towing load| Towline calculation
TOW-008| Dynamic amplification| DAF| Account for surge, yaw, wave and snap loading| Dynamic simulation
TOW-009| Maximum towline tension| T_MAX| Establish governing design tension| Load-case analysis
TOW-010| Towline MBL| MBL| Verify line strength against required design load| Manufacturer certificate
TOW-011| Safety factor| SF| Apply applicable class/flag/towing standard| Compliance calculation
TOW-012| Bridle| Geometry + leg forces| Verify load sharing and peak force| Bridle calculation
TOW-013| Shackles/connectors| MBL/WLL| Verify every component in load path| Component certificates
TOW-014| Emergency tow| Worst credible condition| Verify emergency configuration| Emergency towing analysis
TOW-015| Towline monitoring| Tension| Detect overload and abnormal loading| Monitoring/logging test

Conceptual Towline Chain

TANKER DISPLACEMENT
        ↓
HULL RESISTANCE
        ↓
WIND + CURRENT + WAVES
        ↓
TOW SPEED / HEADING
        ↓
STATIC TOW LOAD
        ↓
DYNAMIC AMPLIFICATION
        ↓
MAXIMUM TOWLINE TENSION
        ↓
REQUIRED MBL / WLL
        ↓
BRIDLE + SHACKLES + CONNECTIONS
        ↓
COMPLETE TOWING SYSTEM

Safety Principle

Required Towline Strength
        ≥
Maximum Calculated Dynamic Towline Tension
        ×
Applicable Safety Factor

The numerical safety factor shall be taken from the applicable approved towing/class/flag requirement, rather than being invented by the decision-support system.

---

3. ELECTRONIC EQUIPMENT — MARINE ENVIRONMENTAL RESILIENCE

ID| Environmental Factor| Equipment Requirement| V&V Test
ELE-001| Operating temperature| Equipment operates throughout specified temperature range| Thermal operating test
ELE-002| Storage temperature| Equipment survives specified non-operating temperature range| Storage-temperature test
ELE-003| Heat exposure| Components remain within permissible thermal limits| Thermal endurance test
ELE-004| Humidity| Equipment maintains function under specified humidity| Humidity test
ELE-005| Vibration| Continuous vessel vibration tolerance| Vibration endurance test
ELE-006| Mechanical shock| Equipment survives specified shock levels| Shock test
ELE-007| Salt atmosphere| Protection against marine corrosion| Corrosion/environmental test
ELE-008| Water ingress| Appropriate enclosure protection| Ingress-protection test
ELE-009| EMC| Immunity to and emissions within specified limits| EMC test
ELE-010| Power disturbance| Tolerance of voltage variation/interruption/transients| Power-quality test
ELE-011| Cooling| Thermal management maintains component limits| Cooling/load test
ELE-012| Over-temperature| Alarm/protection operates correctly| Over-temperature test
ELE-013| Data storage| Operational and audit data retained securely| Storage-integrity test
ELE-014| Power loss| Data/state protected during sudden loss of power| Power-loss recovery test
ELE-015| Restart| Safe recovery after interruption| Restart test
ELE-016| Redundancy| Primary/secondary equipment maintains required availability| Failover test
ELE-017| Audit memory| Decisions and events remain traceable| Audit-integrity test
ELE-018| HMI| Operator interface remains usable under vibration and environmental conditions| HMI test

---

4. ELECTRONIC EQUIPMENT RESILIENCE CHAIN

TEMPERATURE
      +
HUMIDITY
      +
VIBRATION
      +
SHOCK
      +
SALT / CORROSION
      +
WATER INGRESS
      +
EMC
      +
POWER DISTURBANCE
      ↓
EQUIPMENT HEALTH
      ↓
PRIMARY / SECONDARY REDUNDANCY
      ↓
FAILOVER
      ↓
SAFE STATE
      ↓
DATA / AUDIT RETENTION
      ↓
HUMAN DECISION AUTHORITY

---

5. SEXTANT PROTOCOL™ INTEGRATION

The three engineering domains are integrated into the same resilience architecture:

Domain| Physical State| Risk Calculation| Decision Response| Human Authority
Crane| Load, rope tension, MBL, vessel motion| Overload / structural risk| Reduce load, alter operation, stop operation or escalate| Master / Crane Authority
Towing| Displacement, resistance, towline tension, environmental forces| Towline overload / loss of control| Alter speed/heading/tug configuration or escalate| Master / Tow Master
Electronics| Temperature, vibration, power, EMC, equipment health| Equipment degradation/failure| Protect, isolate, fail over or maintain safe state| Authorised Operator
Vessel Stability| GM, GZ, freeboard, list, righting moment| Loss of stability margin| Alter loading, ballast, heading/speed or escalate| Master

Golden Rule Integration

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
CALCULATE
   ↓
DECIDE
   ↓
HUMAN AUTHORIZATION
   ↓
ACT
   ↓
UPDATE
   ↓
AUDIT

«Sextant Protocol™ shall provide deterministic, traceable decision support; it shall not replace the vessel's approved engineering design, class requirements, operating manuals, towing plans or the authority of the Master / designated responsible person.»

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