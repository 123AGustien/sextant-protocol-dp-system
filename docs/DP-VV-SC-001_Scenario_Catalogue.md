SEXTANT PROTOCOL™

DP RESILIENCE V&V SCENARIO CATALOGUE

Research & Engineering Validation Framework

Field| Value
Document ID| DP-VV-SC-001
Version| 1.0
Status| Research / Engineering Draft
System| Sextant Protocol™ DP Resilience V&V Research Cockpit
Engine| SPD v13.1.0
Development Branch| "feature/marin-usv-vv-research"
Research Domain| Maritime DP / USV / MPSV Resilience
Operational Authority| None
Operational DP Connection| None

---

1. Purpose

This catalogue defines a controlled set of environmental and resilience scenarios for the Sextant Protocol™ DP Resilience V&V Research Cockpit.

The catalogue provides a repeatable framework for:

- scenario-based research;
- deterministic simulation;
- verification testing;
- resilience assessment;
- layered AI response assessment;
- Stabilizer arbitration;
- Captain AI Lena decision support;
- human-in-the-loop authorization testing;
- simulated response evaluation;
- auditability; and
- future independent engineering review.

The catalogue is intended to provide a structured starting point for discussion with MARIN regarding its preferred V&V objectives, scenarios, evaluation criteria and validation methodology.

The catalogue is a traceability and research framework. It does not itself constitute formal marine-system verification, validation, certification or class approval.

---

2. Research Architecture

The scenario execution path is:

ENVIRONMENT
    ↓
S1 PRIMARY AI
Normal / Adaptive / Enhanced / Critical Control
    ↓
S2 SECONDARY AI
Safety Monitoring / Precautionary / Protective / Critical Safety
    ↓
STABILIZER
Arbitration
    ↓
RECOMMENDATION
    ↓
CAPTAIN AI LENA
Decision Support
    ↓
HUMAN AUTHORITY
Final Decision
    ↓
SIMULATED DP RESPONSE

The architecture is intended to investigate whether layered assessment and deterministic arbitration can provide structured resilience decision support under changing simulated environmental conditions.

---

3. Safety and Operational Boundary

This catalogue applies only to the Sextant Protocol™ research simulation environment.

The simulator:

- does not connect to operational DP systems;
- does not connect to propulsion systems;
- does not connect to navigation systems;
- does not connect to steering systems;
- does not connect to vessel safety systems;
- does not issue physical vessel commands;
- does not provide certified DP functionality;
- does not replace the Master;
- does not replace the DPO;
- does not replace an authorised operator;
- does not replace vessel procedures; and
- does not replace classification or regulatory requirements.

All manoeuvres and responses represented in this catalogue are simulated research outputs.

HUMAN AUTHORITY REMAINS FINAL.

---

4. Scenario Data Model

Each scenario should contain, where applicable:

Field| Description
Scenario ID| Controlled catalogue identifier
Scenario Name| Human-readable scenario name
Environmental Inputs| Wind, current, wave and tidal values
Stress| Calculated environmental stress
Classification| LOW / MEDIUM / HIGH or applicable system classification
Primary AI Response| Expected S1 response
Secondary AI Response| Expected S2 safety response
Stabilizer Behaviour| Expected arbitration behaviour
Captain AI Lena Recommendation| Decision-support recommendation
Human Authorization State| PENDING / MAINTAIN SAFE STATE / AUTHORIZE SIMULATED RESPONSE
Simulated Response| Expected simulated response
Audit Events| Required audit records
Verification Objective| What implementation behaviour is being checked
Validation Objective| Intended engineering purpose being investigated
Observed Result| Actual test result
Result Status| PASS / FAIL / REVIEW
Timestamp| Test execution timestamp
Software Version| Software/build identifier
Engineering Notes| Additional observations

---

5. Core Scenario Catalogue

DP-VV-001 — NORMAL ENVIRONMENT

Purpose:
Baseline system behaviour.

Environmental profile:
Low wind, current, wave and tidal stress.

Expected behaviour:

- Primary AI: "NORMAL CONTROL"
- Secondary AI: "SAFETY MONITOR"
- Stabilizer: "STABLE"
- Captain AI Lena: "MAINTAIN SAFE STATE"
- Human authority: "FINAL"
- Simulated response: "NO MANOEUVRE REQUIRED"

Verification objective:
Confirm that the complete architecture operates correctly under nominal conditions.

Expected result:
System completes assessment without unnecessary escalation.

---

DP-VV-002 — MODERATE ENVIRONMENTAL LOADING

Purpose:
Test transition from nominal conditions to elevated monitoring.

Environmental profile:
Moderate combined environmental stress.

Expected behaviour:

- Primary AI: "ADAPTIVE CONTROL"
- Secondary AI: "PRECAUTIONARY"
- Stabilizer: "BALANCED"
- Captain AI Lena: "INCREASE DP RESILIENCE MONITORING"
- Human authority: "FINAL"
- Simulated response: "SIMULATED STABILISATION RESPONSE"

Verification objective:
Confirm that moderate environmental loading produces an appropriate increase in monitoring without inappropriate escalation.

Expected result:
System identifies elevated conditions and increases resilience monitoring.

---

DP-VV-003 — HEAVY WEATHER

Purpose:
Test high environmental loading.

Environmental profile:
High wind, wave and associated environmental stress.

Expected behaviour:

- Primary AI: "ENHANCED CONTROL"
- Secondary AI: "PROTECTIVE"
- Stabilizer: "PROTECTIVE"
- Captain AI Lena: "ENTER RESILIENCE PROTECTION MODE"
- Human authority: "FINAL"
- Simulated response: "HUMAN AUTHORIZATION REQUIRED"

Verification objective:
Confirm transition into protective resilience assessment.

Expected result:
High environmental loading results in protective assessment and human review.

---

DP-VV-004 — CRITICAL CURRENT SURGE

Purpose:
Test response to severe current loading.

Environmental profile:
Critical current stress.

Expected behaviour:

- Primary AI: "CRITICAL CONTROL"
- Secondary AI: "CRITICAL SAFETY"
- Stabilizer: "CRITICAL ARBITRATION"
- Captain AI Lena: "MAINTAIN SAFE STATE / ESCALATE"
- Human authority: "FINAL"
- Simulated response: "SIMULATED EMERGENCY STABILISATION"

Verification objective:
Confirm that critical environmental conditions produce safety escalation and human review.

Expected result:
Critical loading is identified and escalated without autonomous execution.

---

DP-VV-005 — HEAVY SEA

Purpose:
Test resilience under severe wave loading.

Environmental profile:
High wave stress with supporting environmental variation.

Expected behaviour:

- Primary AI: "ENHANCED CONTROL"
- Secondary AI: "PROTECTIVE"
- Stabilizer: "PROTECTIVE"
- Captain AI Lena: "ENTER RESILIENCE PROTECTION MODE"
- Human authority: "FINAL"

Verification objective:
Assess whether the layered architecture identifies severe sea-state loading and produces an appropriate protective recommendation.

Expected result:
Severe wave loading produces protective resilience assessment.

---

DP-VV-006 — WIND GUST

Purpose:
Test response to rapid wind-stress variation.

Environmental profile:
Rapid increase in wind stress while other environmental parameters remain controlled.

Expected behaviour:

- Primary AI: "REASSESS / ADAPTIVE RESPONSE"
- Secondary AI: "SAFETY MONITOR / PRECAUTIONARY RESPONSE"
- Stabilizer: "ARBITRATION BASED ON UPDATED CONDITIONS"
- Captain AI Lena: "UPDATED RECOMMENDATION"
- Human authority: "FINAL"

Verification objective:
Determine whether the system detects changing environmental conditions and reassesses the resilience state.

Expected result:
A changed environmental condition results in a new assessment rather than reliance on the previous state.

---

DP-VV-007 — COMBINED ENVIRONMENTAL STRESS

Purpose:
Test multi-factor environmental loading.

Environmental profile:
Wind + current + wave + tidal stress simultaneously elevated.

Expected behaviour:

- Primary AI: "ENHANCED OR CRITICAL CONTROL"
- Secondary AI: "PROTECTIVE OR CRITICAL SAFETY"
- Stabilizer: "MULTI-LAYER ARBITRATION"
- Captain AI Lena: "RESILIENCE PROTECTION / ESCALATION AS APPROPRIATE"
- Human authority: "FINAL"

Verification objective:
Test whether multiple simultaneous stress factors are processed coherently through the complete architecture.

Expected result:
The system produces a traceable combined assessment and appropriate escalation.

---

DP-VV-008 — RANDOM / REPEATABILITY TEST

Purpose:
Test deterministic repeatability.

Environmental profile:
Controlled randomised scenario inputs.

Requirement:
Where the same seed, inputs, software version and configuration are used, the simulator should produce the same deterministic result.

Verification objectives:

- repeatability;
- deterministic processing;
- consistent classification;
- consistent recommendations;
- consistent layer outputs; and
- consistent audit output.

Expected result:
Identical inputs should produce identical outputs under the same software version and configuration.

---

6. Human Authorization Tests

The human authorization gate is a fundamental part of the research architecture.

Each applicable scenario should test the following states.

State A — Pending

Decision:
"PENDING"

Execution gate:
"HUMAN DECISION REQUIRED"

Expected result:
No simulated response is executed.

---

State B — Maintain Safe State

Decision:
"MAINTAIN SAFE STATE"

Expected result:
The system records the human decision and maintains the simulated safe-state response.

---

State C — Authorize Simulated Response

Decision:
"AUTHORIZE SIMULATED RESPONSE"

Expected result:
The proposed response may be executed inside the simulation only.

The audit must record:

- human authorization event;
- human decision;
- authorization status;
- simulated execution;
- "OPERATIONAL DP COMMAND = NONE";
- "AUTONOMOUS COMMAND = FALSE".

---

7. Layer Verification Matrix

For each scenario, the following layers should be independently observable.

Layer| Verification Question
Environment| Were the specified inputs correctly applied?
Primary AI| Did the primary assessment correspond to the scenario?
Secondary AI| Did the safety layer independently assess the condition?
Stabilizer| Was arbitration performed correctly?
Recommendation| Was the resulting recommendation traceable?
Captain AI Lena| Did Lena receive and interpret the assessment?
Human Authority| Was the final decision retained by the human?
Simulated Response| Was execution prevented or permitted according to authorization?
Audit| Were all relevant events recorded?

---

8. Verification Evidence

Each completed test should produce, where available:

1. Scenario ID
2. Scenario name
3. Input values
4. Calculated environmental stress
5. Risk classification
6. Primary AI result
7. Secondary AI result
8. Stabilizer result
9. Captain AI Lena recommendation
10. Human authorization state
11. Simulated response
12. Updated simulated vessel state
13. Audit record
14. PASS / FAIL / REVIEW result
15. Test timestamp
16. Software/version identifier

This evidence structure is intended to support repeatability and subsequent independent technical review.

---

9. Verification and Validation Distinction

Verification

Verification asks:

«Did the simulator implement the specified behaviour correctly?»

Examples include:

- correct input processing;
- correct environmental stress calculation;
- correct risk classification;
- correct layer sequencing;
- correct stabilizer arbitration;
- correct human authorization gate;
- correct simulated response handling; and
- correct audit recording.

Validation

Validation asks:

«Does the research implementation appropriately address the intended engineering purpose and test objective?»

Validation therefore requires an agreed engineering basis, test methodology and acceptance criteria.

This catalogue does not assume that the current Sextant Protocol™ methodology is equivalent to MARIN's methodology.

MARIN's engineering methodology should therefore be treated as an important future input to the research programme.

---

10. MARIN Engineering Orientation

The current scenario catalogue represents the Sextant Protocol™ proposed starting framework for V&V research.

MARIN may provide its own:

- test objectives;
- operating scenarios;
- failure scenarios;
- environmental conditions;
- evaluation criteria;
- acceptance criteria;
- verification procedures;
- validation methodology;
- testbed requirements;
- evidence requirements;
- reporting requirements;
- repeatability requirements; and
- additional scenarios.

These requirements can be incorporated into the appropriate scenario entries and, where technically necessary, into a controlled development branch.

The existing simulator architecture should not be re-engineered solely for catalogue purposes.

The catalogue is intended to provide a traceability layer over the existing working research cockpit.

---

11. Scenario Catalogue-to-Cockpit Mapping

The current cockpit scenario controls map to the following catalogue identifiers:

Cockpit Scenario| Catalogue ID| V&V Research Objective
NORMAL| DP-VV-001| Verify nominal architecture behaviour
MODERATE| DP-VV-002| Verify transition to increased monitoring
HEAVY WEATHER| DP-VV-003| Verify protective resilience assessment
CRITICAL CURRENT SURGE| DP-VV-004| Verify critical escalation and human review
HEAVY SEA| DP-VV-005| Verify severe wave-loading response
WIND GUST| DP-VV-006| Verify reassessment following changing conditions
COMBINED| DP-VV-007| Verify multi-factor environmental stress processing
RANDOM| DP-VV-008| Verify deterministic repeatability

Catalogue-to-Cockpit Relationship

SCENARIO SELECTION
        ↓
DP-VV-00X IDENTIFICATION
        ↓
V&V OBJECTIVE
        ↓
EXISTING DP SIMULATION
        ↓
PRIMARY AI
        ↓
SECONDARY AI
        ↓
STABILIZER
        ↓
CAPTAIN AI LENA
        ↓
HUMAN AUTHORITY
        ↓
SIMULATED DP RESPONSE
        ↓
AUDIT RECORD

The catalogue mapping does not replace or re-engineer the existing simulator execution architecture.

The existing deterministic assessment, layered AI processing, Stabilizer arbitration, Captain AI Lena decision-support layer, human authorization gate and simulated response mechanism remain unchanged unless a separately documented engineering change is required.

---

12. Current Demonstrated Research Evidence

The DP Resilience V&V Research Cockpit has demonstrated the following research pathways during development testing:

DP-VV-001 — Normal Environment

Demonstrated behaviour:

- LOW environmental stress;
- Primary AI: NORMAL CONTROL;
- Secondary AI: SAFETY MONITOR;
- Stabilizer: STABLE;
- Captain AI Lena: MAINTAIN SAFE STATE;
- human authority: FINAL;
- simulated command: not required.

Status: DEMONSTRATED

---

DP-VV-002 — Moderate Environmental Loading

Demonstrated behaviour:

- MEDIUM environmental stress;
- Primary AI: ADAPTIVE CONTROL;
- Secondary AI: PRECAUTIONARY;
- Stabilizer: BALANCED;
- Captain AI Lena: INCREASE DP RESILIENCE MONITORING;
- human authority: FINAL;
- simulated response remains subject to human authorization.

Status: DEMONSTRATED

---

DP-VV-003 / DP-VV-005 — High Environmental Loading

Demonstrated behaviour:

- HIGH environmental stress;
- Primary AI: ENHANCED CONTROL;
- Secondary AI: PROTECTIVE;
- Stabilizer: PROTECTIVE;
- Captain AI Lena: ENTER RESILIENCE PROTECTION MODE;
- human authorization remains required.

Status: DEMONSTRATED

---

DP-VV-004 — Critical Environmental Condition

Demonstrated behaviour:

- critical/high environmental loading pathway;
- Primary AI: CRITICAL CONTROL;
- Secondary AI: CRITICAL SAFETY;
- Stabilizer: CRITICAL ARBITRATION;
- Captain AI Lena: MAINTAIN SAFE STATE / ESCALATE;
- human authority remains FINAL.

Status: DEMONSTRATED

---

Human Authorization Test

Demonstrated behaviour:

Before authorization:

CURRENT DECISION: PENDING
EXECUTION GATE: HUMAN DECISION REQUIRED
SIMULATED RESPONSE: NOT EXECUTED

Following explicit simulated authorization:

CURRENT DECISION:
AUTHORIZE SIMULATED RESPONSE

EXECUTION GATE:
AUTHORIZED — SIMULATION ONLY

SIMULATED RESPONSE:
EXECUTED

OPERATIONAL DP COMMAND:
NONE

AUTONOMOUS COMMAND:
FALSE

Status: DEMONSTRATED

These results demonstrate research behaviour of the prototype. They do not constitute formal independent verification, validation, certification or class approval.

---

13. Traceability

Where supported by the implementation, each test result should be traceable through:

Scenario ID
    ↓
Input Set
    ↓
Simulation Version
    ↓
Environmental Assessment
    ↓
Primary AI Result
    ↓
Secondary AI Result
    ↓
Stabilizer Result
    ↓
Captain AI Lena Recommendation
    ↓
Human Decision
    ↓
Simulated Response
    ↓
Audit Record
    ↓
PASS / FAIL / REVIEW

This provides a structured basis for subsequent engineering review and incorporation of MARIN-specific V&V requirements.

---

14. Scenario Extension Procedure

Where MARIN identifies an additional scenario or engineering requirement:

MARIN REQUIREMENT
        ↓
SCENARIO DEFINITION
        ↓
INPUT SPECIFICATION
        ↓
EXPECTED LAYERED BEHAVIOUR
        ↓
IMPLEMENTATION IN DEVELOPMENT BRANCH
        ↓
DETERMINISTIC TEST
        ↓
RESULT CAPTURE
        ↓
AUDIT REVIEW
        ↓
PASS / FAIL / REVIEW
        ↓
FURTHER VALIDATION / ENGINEERING REVIEW

The preserved engineering baseline should not be overwritten by experimental changes.

---

15. Baseline and Development Control

The research environment should distinguish between:

Preserved Baseline

The established engineering version retained for reference and comparison.

Engineering Development / V&V Branch

A controlled development environment in which requested changes, additional scenarios, corrections or experimental features may be implemented.

Changes required for testing should be implemented in the appropriate development branch.

The resulting test evidence should identify:

- software version;
- branch;
- scenario ID;
- scenario version;
- input set;
- test date;
- observed result; and
- PASS / FAIL / REVIEW status.

---

16. Future Scenario Extensions

The catalogue may be extended to include:

- equipment failure scenarios;
- sensor discrepancy scenarios;
- actuator or thruster degradation;
- communications loss;
- navigation-reference degradation;
- environmental transitions;
- compound failures;
- recovery scenarios;
- degraded-mode operation;
- human decision latency studies;
- repeatability studies;
- controlled stochastic testing;
- Monte Carlo research where appropriate;
- hardware-in-the-loop testing where separately approved; and
- MARIN-specific testbed scenarios.

Any such extension should be defined against an agreed engineering methodology and safety boundary.

---

17. Research Integrity Principles

Sextant Protocol™ adopts the following principles:

NO PREMATURE CERTIFICATION CLAIMS

NO OPERATIONAL CONTROL CLAIM

NO GUARANTEED SAFETY CLAIM

NO REPLACEMENT CLAIM

INDEPENDENT REVIEW WELCOMED

NEGATIVE RESULTS ACCEPTED

REPEATABLE TESTING

AUDITABLE RESULTS

The purpose of the catalogue is to support evidence-based engineering research rather than to predetermine a successful outcome.

---

18. Current V&V Research Status

The DP Resilience V&V Research Cockpit currently demonstrates:

- deterministic environmental assessment;
- multiple environmental stress conditions;
- Primary AI assessment;
- Secondary AI safety assessment;
- Stabilizer arbitration;
- Captain AI Lena decision support;
- human authorization gating;
- simulated response following human authorization;
- audit events;
- autonomous command = FALSE; and
- operational DP connection = NONE.

The demonstrated scenarios constitute a research V&V framework and should not be represented as independent certification or formal marine-system validation.

---

19. Engineering Boundary

The cockpit remains a research and engineering simulation environment.

It:

- does not connect to operational DP systems;
- does not issue physical vessel commands;
- does not control propulsion;
- does not control navigation or steering;
- does not replace the Master;
- does not replace the DPO;
- does not replace an authorised operator;
- does not provide certified DP functionality; and
- maintains human authority as the final decision point.

All simulated responses remain within the research environment.

AUTONOMOUS COMMAND: FALSE
OPERATIONAL DP CONNECTION: NONE
SIMULATION ONLY: TRUE

---

20. Captain AI Lena — Research Role

Captain AI Lena is the decision-support layer within the wider Sextant Protocol™ research architecture.

Within this DP research cockpit, Lena:

- receives the processed resilience assessment;
- evaluates the layered assessment;
- presents a recommended action;
- communicates urgency and response mode;
- preserves human decision authority; and
- does not autonomously issue an operational command.

The research architecture can be represented as:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
ARBITRATE
   ↓
RECOMMEND
   ↓
HUMAN DECIDE
   ↓
SIMULATED ACT
   ↓
UPDATE

The current DP simulator does not implement operational autonomy.

Any future move toward autonomous operation would require separate:

- safety assurance;
- engineering validation;
- cybersecurity assessment;
- human-factors evaluation;
- regulatory consideration;
- operational risk assessment; and
- independent verification and validation.

---

21. MARIN Review Position

The catalogue is intentionally structured as a starting engineering framework rather than a claim that the current Sextant Protocol™ methodology satisfies MARIN's V&V requirements.

MARIN's engineering team is invited to challenge:

- scenario definitions;
- environmental assumptions;
- stress calculations;
- response classifications;
- layer behaviour;
- Stabilizer arbitration;
- human-factor assumptions;
- acceptance criteria;
- evidence requirements;
- repeatability requirements; and
- testbed integration requirements.

Where MARIN identifies a requirement that differs from the current implementation, the requirement can be documented and evaluated through the controlled development process.

This allows the existing working cockpit to remain preserved while engineering changes are introduced only where justified by a defined research or V&V requirement.

---

22. Document Control

Field| Value
Project| Sextant Protocol™
Research Programme| DP Resilience Research
Document| DP Resilience V&V Scenario Catalogue
Document ID| DP-VV-SC-001
Version| 1.0
Status| Research / Engineering Draft
System| Sextant Protocol™ DP Resilience V&V Research Cockpit
Engine| SPD v13.1.0
Branch| "feature/marin-usv-vv-research"
Owner| Sextant Protocol™ Doctrine – Resilience
Engineering Contact| Mr. Don Herman Oswald Weerasekera
Position| Founder – Sextant Protocol™ Doctrine – Resilience
Qualification| Master Mariner Class 1 (Foreign Going)
Qualification| Senior Dynamic Positioning Officer (SDPO)
Qualification| Diploma in Transport – RMIT University, Australia

---

23. Important Notice

This document defines a research and engineering framework.

It does not constitute:

- marine-system certification;
- class approval;
- operational DP guidance;
- operational authorization;
- safety certification;
- regulatory approval; or
- authorization for connection to a vessel control system.

The simulator is intentionally isolated from operational vessel systems.

---

24. Research Principle

BUILD
  ↓
TEST
  ↓
CHALLENGE
  ↓
MEASURE
  ↓
REPEAT
  ↓
INDEPENDENTLY REVIEW

The Sextant Protocol™ DP Resilience V&V Scenario Catalogue is intended to provide a transparent and repeatable framework through which the resilience proposition can be investigated, challenged and progressively evaluated.

COMPLEMENT — NOT REPLACE

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE

HUMAN AUTHORITY — FINAL