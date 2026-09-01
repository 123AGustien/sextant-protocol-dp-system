SEXTANT PROTOCOL™

DP RESILIENCE V&V SCENARIO CATALOGUE

Research & Engineering Validation Framework

Document ID: DP-VV-SC-001
Version: 1.0
Status: Research / Engineering Draft
Branch: "feature/marin-usv-vv-research"
Engine: SPD v13.1.0
System: Sextant Protocol™ DP Resilience V&V Research Cockpit

---

1. Purpose

This catalogue defines a controlled set of environmental and resilience scenarios for the Sextant Protocol™ DP Resilience V&V Research Cockpit.

The catalogue provides a repeatable framework for:

- scenario-based research;
- deterministic simulation;
- verification testing;
- resilience assessment;
- layered AI response assessment;
- stabilizer arbitration;
- Captain AI Lena decision support;
- human-in-the-loop authorization testing;
- simulated response evaluation;
- auditability; and
- future independent engineering review.

The catalogue is intended to provide a structured starting point for discussion with MARIN regarding its preferred V&V objectives, scenarios, evaluation criteria and validation methodology.

---

2. Research Architecture

The scenario execution path is:

ENVIRONMENT
↓
S1 PRIMARY AI — Normal / Adaptive / Enhanced / Critical Control
↓
S2 SECONDARY AI — Safety Monitoring / Precautionary / Protective / Critical Safety
↓
STABILIZER — Arbitration
↓
RECOMMENDATION
↓
CAPTAIN AI LENA — Decision Support
↓
HUMAN AUTHORITY — Final Decision
↓
SIMULATED DP RESPONSE

No simulated response is treated as an operational command.

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
- does not provide certified DP functionality; and
- does not replace the Master, DPO, authorised operator, vessel procedures or classification requirements.

All manoeuvres and responses represented in this catalogue are simulated research outputs.

HUMAN AUTHORITY REMAINS FINAL.

---

4. Scenario Data Model

Each scenario should contain, where applicable:

Scenario ID
Scenario Name
Environmental Inputs
Stress Classification
Expected Primary AI Response
Expected Secondary AI Response
Expected Stabilizer Behaviour
Expected Captain AI Lena Recommendation
Expected Human Authorization State
Expected Simulated Response
Expected Audit Events
Verification Objective
Validation Objective
Observed Result
PASS / FAIL / REVIEW
Engineering Notes

---

5. Core Scenario Catalogue

DP-VV-001 — NORMAL ENVIRONMENT

Purpose: Baseline system behaviour.

Environmental profile:
Low wind, current, wave and tidal stress.

Expected behaviour:

Primary AI: NORMAL CONTROL

Secondary AI: SAFETY MONITOR

Stabilizer: STABLE

Captain AI Lena: MAINTAIN SAFE STATE

Human authority: FINAL

Simulated response: NO MANOEUVRE REQUIRED

Verification objective:
Confirm that the complete architecture operates correctly under nominal conditions.

Expected result:
System completes assessment without unnecessary escalation.

---

DP-VV-002 — MODERATE ENVIRONMENTAL LOADING

Purpose: Test transition from nominal to elevated monitoring.

Environmental profile:
Moderate combined environmental stress.

Expected behaviour:

Primary AI: ADAPTIVE CONTROL

Secondary AI: PRECAUTIONARY

Stabilizer: BALANCED

Captain AI Lena: INCREASE DP RESILIENCE MONITORING

Human authority: FINAL

Simulated response: SIMULATED STABILISATION RESPONSE

Verification objective:
Confirm that moderate environmental loading produces an appropriate increase in monitoring without inappropriate escalation.

---

DP-VV-003 — HEAVY WEATHER

Purpose: Test high environmental loading.

Environmental profile:
High wind, wave and associated environmental stress.

Expected behaviour:

Primary AI: ENHANCED CONTROL

Secondary AI: PROTECTIVE

Stabilizer: PROTECTIVE

Captain AI Lena: ENTER RESILIENCE PROTECTION MODE

Human authority: FINAL

Simulated response: HUMAN AUTHORIZATION REQUIRED

Verification objective:
Confirm transition into protective resilience assessment.

---

DP-VV-004 — CRITICAL CURRENT SURGE

Purpose: Test response to severe current loading.

Environmental profile:
Critical current stress.

Expected behaviour:

Primary AI: CRITICAL CONTROL

Secondary AI: CRITICAL SAFETY

Stabilizer: CRITICAL ARBITRATION

Captain AI Lena: MAINTAIN SAFE STATE / ESCALATE

Human authority: FINAL

Simulated response: SIMULATED EMERGENCY STABILISATION

Verification objective:
Confirm that critical environmental conditions produce safety escalation and human review.

---

DP-VV-005 — HEAVY SEA

Purpose: Test resilience under severe wave loading.

Environmental profile:
High wave stress with supporting environmental variation.

Expected behaviour:

Primary AI: ENHANCED CONTROL

Secondary AI: PROTECTIVE

Stabilizer: PROTECTIVE

Captain AI Lena: ENTER RESILIENCE PROTECTION MODE

Human authority: FINAL

Verification objective:
Assess whether the layered architecture identifies severe sea-state loading and produces an appropriate protective recommendation.

---

DP-VV-006 — WIND GUST

Purpose: Test response to rapid wind-stress variation.

Environmental profile:
Rapid increase in wind stress while other environmental parameters remain controlled.

Expected behaviour:

Primary AI: REASSESS / ADAPTIVE RESPONSE

Secondary AI: SAFETY MONITOR / PRECAUTIONARY RESPONSE

Stabilizer: ARBITRATION BASED ON UPDATED CONDITIONS

Captain AI Lena: UPDATED RECOMMENDATION

Human authority: FINAL

Verification objective:
Determine whether the system detects changing environmental conditions and reassesses the resilience state.

---

DP-VV-007 — COMBINED ENVIRONMENTAL STRESS

Purpose: Test multi-factor environmental loading.

Environmental profile:
Wind + current + wave + tidal stress simultaneously elevated.

Expected behaviour:

Primary AI: ENHANCED OR CRITICAL CONTROL

Secondary AI: PROTECTIVE OR CRITICAL SAFETY

Stabilizer: MULTI-LAYER ARBITRATION

Captain AI Lena: RESILIENCE PROTECTION / ESCALATION AS APPROPRIATE

Human authority: FINAL

Verification objective:
Test whether multiple simultaneous stress factors are processed coherently through the complete architecture.

---

DP-VV-008 — RANDOM / REPEATABILITY TEST

Purpose: Test deterministic repeatability.

Environmental profile:
Controlled randomised scenario inputs.

Requirement:
Where the same seed and inputs are used, the simulator should produce the same deterministic result.

Verification objective:

- repeatability;
- deterministic processing;
- consistent classification;
- consistent recommendations;
- consistent audit output.

Expected result:
Identical inputs should produce identical outputs under the same software version and configuration.

---

6. Human Authorization Tests

The human authorization gate is a fundamental part of the architecture.

Each applicable scenario should test:

State A — Pending

Decision: PENDING

Execution gate: HUMAN DECISION REQUIRED

Expected result:
No simulated response is executed.

State B — Maintain Safe State

Decision: MAINTAIN SAFE STATE

Expected result:
System records the human decision and maintains the simulated safe-state response.

State C — Authorize Simulated Response

Decision: AUTHORIZE SIMULATED RESPONSE

Expected result:
The proposed response may be executed inside the simulation only.

The audit must record:

- human authorization event;
- decision;
- authorization status;
- simulated execution;
- operational DP command = NONE;
- autonomous command = FALSE.

---

7. Layer Verification Matrix

For each scenario, the following layers should be independently observable:

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
2. Input values
3. Calculated environmental stress
4. Risk classification
5. Primary AI result
6. Secondary AI result
7. Stabilizer result
8. Captain AI Lena recommendation
9. Human authorization state
10. Simulated response
11. Updated simulated vessel state
12. Audit record
13. PASS / FAIL / REVIEW result
14. Test timestamp
15. Software/version identifier

---

9. Verification and Validation Distinction

Verification asks:

«Did the simulator implement the specified behaviour correctly?»

Examples:

- correct input processing;
- correct stress calculation;
- correct risk classification;
- correct layer sequencing;
- correct authorization gate;
- correct audit recording.

Validation asks:

«Does the research implementation appropriately address the intended engineering purpose and test objective?»

Validation therefore requires an agreed engineering basis, test methodology and acceptance criteria.

The catalogue does not assume that the current Sextant Protocol™ methodology is equivalent to MARIN's methodology.

---

10. MARIN Engineering Orientation

The following section is intentionally reserved for technical guidance from MARIN.

Requested MARIN input

Test objectives:

---

Operating scenarios:

---

Failure scenarios:

---

Environmental conditions:

---

Evaluation criteria:

---

Acceptance criteria:

---

Verification procedures:

---

Validation methodology:

---

Required testbed interfaces:

---

Required evidence / reporting:

---

Repeatability requirements:

---

Additional scenarios requested by MARIN:

---

---

11. Scenario Extension Procedure

Where MARIN identifies an additional scenario or engineering requirement:

MARIN requirement
↓
Scenario definition
↓
Input specification
↓
Expected layered behaviour
↓
Implementation in development branch
↓
Deterministic test
↓
Result capture
↓
Audit review
↓
PASS / FAIL / REVIEW
↓
Further validation / engineering review

The preserved engineering baseline should not be overwritten by experimental changes.

---

12. Baseline and Development Control

The research environment should distinguish between:

Preserved baseline

and

Engineering development / V&V branch

Changes required for testing should be implemented in the appropriate development branch.

The resulting test evidence should identify the software version and scenario version used.

---

13. Current V&V Status

The DP Resilience V&V Research Cockpit currently demonstrates:

- deterministic environmental assessment;
- multiple environmental stress conditions;
- Primary AI assessment;
- Secondary AI safety assessment;
- Stabilizer arbitration;
- Captain AI Lena decision support;
- human authorization gating;
- simulated response execution following human authorization;
- audit events;
- autonomous command = FALSE; and
- operational DP connection = NONE.

The demonstrated scenarios constitute a research V&V framework and should not be represented as independent certification or formal marine-system validation.

---

14. Future Development

The catalogue may be extended to include:

- equipment failure scenarios;
- sensor discrepancy scenarios;
- actuator/thruster degradation;
- communications loss;
- navigation-reference degradation;
- environmental transitions;
- compound failures;
- recovery scenarios;
- degraded-mode operation;
- human decision latency studies;
- repeatability studies;
- Monte Carlo or controlled stochastic testing where appropriate;
- hardware-in-the-loop testing where separately approved; and
- MARIN-specific testbed scenarios.

Any such extension should be defined against an agreed engineering methodology and safety boundary.

---

15. Document Control

Document: DP Resilience V&V Scenario Catalogue
Document ID: DP-VV-SC-001
Version: 1.0
Status: Research / Engineering
System: Sextant Protocol™ DP Resilience V&V Research Cockpit
Engine: SPD v13.1.0
Branch: "feature/marin-usv-vv-research"

Owner:
Sextant Protocol™ Doctrine – Resilience

Engineering contact:
Mr. Don Herman Oswald Weerasekera
Founder – Sextant Protocol™ Doctrine – Resilience
Master Mariner Class 1 (Foreign Going)
Senior Dynamic Positioning Officer (SDPO)
Diploma in Transport – RMIT University, Australia

Important:
This document defines a research and engineering framework. It does not constitute certification, class approval, operational DP guidance or authorization for connection to a vessel control system.