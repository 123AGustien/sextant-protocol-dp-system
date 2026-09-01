SEXTANT PROTOCOL™

DP RESILIENCE V&V SCENARIO CATALOGUE

Research & Engineering Validation Framework

Document ID: DP-VV-SC-001
Version: 1.1
Status: Research / Engineering Draft
Branch: "feature/marin-usv-vv-research"
Engine: SPD v13.1.0
System: Sextant Protocol™ DP Resilience V&V Research Cockpit

---

1. PURPOSE

This catalogue defines a controlled and extensible set of environmental and resilience scenarios for the Sextant Protocol™ DP Resilience V&V Research Cockpit.

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

The catalogue is intended to provide a structured starting point for discussion with MARIN regarding its preferred V&V objectives, scenarios, evaluation criteria, validation methodology and testbed requirements.

The catalogue does not assume that the current Sextant Protocol™ methodology is equivalent to MARIN's V&V methodology.

---

2. RESEARCH ARCHITECTURE

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

No simulated response is treated as an operational command.

---

3. SAFETY AND OPERATIONAL BOUNDARY

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

4. SCENARIO DATA MODEL

Each scenario should contain, where applicable:

- Scenario ID
- Scenario Name
- Scenario Version
- Environmental Inputs
- Stress Calculation
- Risk Classification
- Expected Primary AI Response
- Expected Secondary AI Response
- Expected Stabilizer Behaviour
- Expected Recommendation
- Expected Captain AI Lena Recommendation
- Expected Human Authorization State
- Expected Simulated Response
- Audit Events
- Verification Objective
- Validation Objective
- Observed Result
- PASS / FAIL / REVIEW
- Test Timestamp
- Software / Engine Version
- Configuration
- Engineering Notes

The Scenario ID should remain associated with the resulting simulation record to provide traceability from the defined test condition through to the resulting evidence.

4A. Scenario Catalogue ↔ Cockpit Mapping

The DP Resilience V&V Research Cockpit uses the existing scenario controls and execution architecture. The Scenario Catalogue is added as a controlled reference and identification layer and does not replace or re-engineer the existing simulator execution path.

When an operator selects a defined scenario in the cockpit, the simulator should associate the selected scenario with the corresponding Scenario Catalogue identifier and display the applicable V&V objective.

Scenario Mapping

Cockpit Scenario| Scenario ID| Scenario Name| V&V Objective
NORMAL| DP-VV-001| NORMAL ENVIRONMENT| Verify nominal architecture behaviour and confirm that the system operates without unnecessary escalation.
MODERATE| DP-VV-002| MODERATE ENVIRONMENTAL LOADING| Verify transition from nominal operation to increased monitoring under moderate environmental loading.
HEAVY WEATHER| DP-VV-003| HEAVY WEATHER| Verify transition into protective resilience assessment under high environmental loading.
CRITICAL CURRENT SURGE| DP-VV-004| CRITICAL CURRENT SURGE| Verify critical safety escalation, stabilizer arbitration and human review under severe current loading.
HEAVY SEA| DP-VV-005| HEAVY SEA| Verify resilience assessment under severe wave loading.
WIND GUST| DP-VV-006| WIND GUST| Verify reassessment following rapid environmental change in wind stress.
COMBINED| DP-VV-007| COMBINED ENVIRONMENTAL STRESS| Verify coherent processing of multiple simultaneous environmental stress factors.
RANDOM| DP-VV-008| RANDOM / REPEATABILITY TEST| Verify deterministic repeatability when identical inputs, seed and software configuration are used.

Mapping Behaviour

The mapping layer should operate as follows:

SCENARIO SELECTED
        ↓
SCENARIO ID IDENTIFIED
        ↓
V&V OBJECTIVE DISPLAYED
        ↓
EXISTING DP SIMULATION ENGINE
        ↓
ENVIRONMENT ASSESSMENT
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
SIMULATED DP RESPONSE
        ↓
AUDIT RECORD

The catalogue mapping must not modify the existing assessment calculations, AI layer sequence, stabilizer arbitration, human authorization gate or simulated response logic unless a separate engineering change is specifically approved and documented.

Required Scenario Metadata

Where technically implemented, each simulation run should retain or display:

- Scenario ID;
- Scenario name;
- Scenario version;
- V&V objective;
- environmental input values;
- calculated environmental stress;
- risk classification;
- Primary AI result;
- Secondary AI result;
- Stabilizer result;
- Captain AI Lena recommendation;
- human authorization state;
- simulated response;
- audit events;
- PASS / FAIL / REVIEW status;
- software/version identifier; and
- test timestamp.

Engineering Change Control

The Scenario Catalogue is a reference and V&V planning layer. Adding or modifying a catalogue entry does not by itself constitute a change to the underlying simulator engine.

Where MARIN provides a specific V&V requirement, test condition, evaluation criterion or acceptance criterion, the corresponding catalogue entry may be updated and, where implementation changes are required, those changes should be made in the designated MARIN V&V development branch.

The preserved engineering baseline should remain unchanged.

MARIN Engineering Orientation

The current mapping represents the Sextant Protocol™ research team's proposed initial scenario structure.

It is not intended to presume that these scenarios, objectives or acceptance criteria constitute MARIN's formal V&V methodology.

MARIN may provide its preferred:

- test objectives;
- operating scenarios;
- failure scenarios;
- environmental conditions;
- evaluation criteria;
- acceptance criteria;
- verification procedures;
- validation methodology;
- testbed requirements;
- evidence requirements; and
- reporting requirements.

The Scenario Catalogue can then be extended or amended accordingly while maintaining traceability between the MARIN requirement, the applicable scenario ID, the simulator implementation and the resulting verification evidence.

V&V Status

The existing DP Resilience V&V Research Cockpit remains the execution environment.

The Scenario Catalogue provides the controlled identification, objective and traceability layer for the scenarios executed by that cockpit.

Accordingly:

Scenario Catalogue = WHAT is being tested

DP V&V Cockpit = HOW the research simulation is executed

MARIN Engineering Orientation = HOW the eventual V&V methodology and acceptance basis may be defined

This separation allows the existing simulator to remain stable while providing a structured mechanism for future MARIN-specific V&V development.

---

5. CORE SCENARIO CATALOGUE

DP-VV-001 — NORMAL ENVIRONMENT

Purpose

Baseline system behaviour.

Environmental Profile

Low wind, current, wave and tidal stress.

Expected Behaviour

Primary AI: NORMAL CONTROL

Secondary AI: SAFETY MONITOR

Stabilizer: STABLE

Captain AI Lena: MAINTAIN SAFE STATE

Human Authority: FINAL

Simulated Response: NO MANOEUVRE REQUIRED

Verification Objective

Confirm that the complete architecture operates correctly under nominal conditions.

Validation Objective

Determine whether the nominal scenario appropriately represents the intended baseline operating condition for the research application.

Expected Result

The system completes assessment without unnecessary escalation.

---

DP-VV-002 — MODERATE ENVIRONMENTAL LOADING

Purpose

Test transition from nominal conditions to elevated monitoring.

Environmental Profile

Moderate combined environmental stress.

Expected Behaviour

Primary AI: ADAPTIVE CONTROL

Secondary AI: PRECAUTIONARY

Stabilizer: BALANCED

Captain AI Lena: INCREASE DP RESILIENCE MONITORING

Human Authority: FINAL

Simulated Response: SIMULATED STABILISATION RESPONSE

Verification Objective

Confirm that moderate environmental loading produces an appropriate increase in monitoring without inappropriate escalation.

Validation Objective

Determine whether the response is appropriate for the intended research objective and agreed engineering criteria.

---

DP-VV-003 — HEAVY WEATHER

Purpose

Test high environmental loading.

Environmental Profile

High wind, wave and associated environmental stress.

Expected Behaviour

Primary AI: ENHANCED CONTROL

Secondary AI: PROTECTIVE

Stabilizer: PROTECTIVE

Captain AI Lena: ENTER RESILIENCE PROTECTION MODE

Human Authority: FINAL

Simulated Response: HUMAN AUTHORIZATION REQUIRED

Verification Objective

Confirm transition into protective resilience assessment.

Validation Objective

Assess whether the protective response is appropriate against agreed engineering criteria.

---

DP-VV-004 — CRITICAL CURRENT SURGE

Purpose

Test response to severe current loading.

Environmental Profile

Critical current stress.

Expected Behaviour

Primary AI: CRITICAL CONTROL

Secondary AI: CRITICAL SAFETY

Stabilizer: CRITICAL ARBITRATION

Captain AI Lena: MAINTAIN SAFE STATE / ESCALATE

Human Authority: FINAL

Simulated Response: SIMULATED EMERGENCY STABILISATION

Verification Objective

Confirm that critical environmental conditions produce safety escalation and human review.

Validation Objective

Assess whether the resulting safety-oriented response is appropriate for the intended research application.

---

DP-VV-005 — HEAVY SEA

Purpose

Test resilience under severe wave loading.

Environmental Profile

High wave stress with supporting environmental variation.

Expected Behaviour

Primary AI: ENHANCED CONTROL

Secondary AI: PROTECTIVE

Stabilizer: PROTECTIVE

Captain AI Lena: ENTER RESILIENCE PROTECTION MODE

Human Authority: FINAL

Verification Objective

Assess whether severe sea-state loading is correctly identified and passed through the layered architecture.

Validation Objective

Determine whether the resulting protective response is appropriate for the intended engineering objective.

---

DP-VV-006 — WIND GUST

Purpose

Test response to rapid wind-stress variation.

Environmental Profile

Rapid increase in wind stress while other environmental parameters remain controlled.

Expected Behaviour

Primary AI: REASSESS / ADAPTIVE RESPONSE

Secondary AI: SAFETY MONITOR / PRECAUTIONARY RESPONSE

Stabilizer: ARBITRATION BASED ON UPDATED CONDITIONS

Captain AI Lena: UPDATED RECOMMENDATION

Human Authority: FINAL

Verification Objective

Determine whether changing environmental conditions trigger reassessment.

Validation Objective

Assess whether the response to environmental transition is appropriate for the intended research purpose.

---

DP-VV-007 — COMBINED ENVIRONMENTAL STRESS

Purpose

Test multi-factor environmental loading.

Environmental Profile

Wind + current + wave + tidal stress simultaneously elevated.

Expected Behaviour

Primary AI: ENHANCED OR CRITICAL CONTROL

Secondary AI: PROTECTIVE OR CRITICAL SAFETY

Stabilizer: MULTI-LAYER ARBITRATION

Captain AI Lena: RESILIENCE PROTECTION / ESCALATION AS APPROPRIATE

Human Authority: FINAL

Verification Objective

Test whether multiple simultaneous stress factors are processed coherently through the complete architecture.

Validation Objective

Assess whether the combined-stress response addresses the intended resilience research objective.

---

DP-VV-008 — RANDOM / REPEATABILITY TEST

Purpose

Test deterministic repeatability.

Environmental Profile

Controlled randomised scenario inputs.

Requirement

Where the same seed, inputs, software version and configuration are used, the simulator should produce the same deterministic result.

Verification Objectives

- repeatability;
- deterministic processing;
- consistent classification;
- consistent recommendations; and
- consistent audit output.

Expected Result

Identical inputs should produce identical outputs under the same software version and configuration.

Validation Objective

Determine whether the repeatability characteristics are sufficient for the intended engineering research application.

---

6. HUMAN AUTHORIZATION TESTS

The human authorization gate is a fundamental part of the architecture.

State A — PENDING

Decision: PENDING

Execution Gate: HUMAN DECISION REQUIRED

Expected Result: No simulated response is executed.

---

State B — MAINTAIN SAFE STATE

Decision: MAINTAIN SAFE STATE

Expected Result: The system records the human decision and maintains the simulated safe-state response.

---

State C — AUTHORIZE SIMULATED RESPONSE

Decision: AUTHORIZE SIMULATED RESPONSE

Expected Result: The proposed response may be executed inside the simulation only.

The audit should record:

- human authorization event;
- human decision;
- authorization status;
- simulated execution;
- operational DP command = NONE;
- autonomous command = FALSE.

---

7. SCENARIO-TO-COCKPIT MAPPING

The cockpit should expose the catalogue identifier whenever a catalogue scenario is selected.

Cockpit Scenario| Catalogue ID
NORMAL| DP-VV-001
MODERATE| DP-VV-002
HEAVY WEATHER| DP-VV-003
CRITICAL CURRENT SURGE| DP-VV-004
HEAVY SEA| DP-VV-005
WIND GUST| DP-VV-006
COMBINED| DP-VV-007
RANDOM| DP-VV-008

For each selected scenario, the cockpit should display, where technically supported:

- Scenario ID;
- Scenario name;
- Scenario purpose;
- environmental input values;
- calculated stress;
- risk classification;
- V&V objective;
- expected layered behaviour;
- actual result;
- PASS / FAIL / REVIEW;
- software / engine version;
- scenario version; and
- audit status.

The catalogue identifier should remain associated with the resulting simulation record.

This creates a traceable relationship:

SCENARIO CATALOGUE
        ↓
SCENARIO ID
        ↓
INPUT CONFIGURATION
        ↓
SIMULATION
        ↓
LAYERED ASSESSMENT
        ↓
HUMAN DECISION
        ↓
SIMULATED RESPONSE
        ↓
AUDIT
        ↓
V&V RESULT

---

8. LAYER VERIFICATION MATRIX

For each scenario, the following layers should be independently observable.

Layer| Verification Question
Environment| Were the specified inputs correctly applied?
Primary AI| Did the primary assessment correspond to the scenario?
Secondary AI| Did the safety layer independently assess the condition?
Stabilizer| Was arbitration performed correctly?
Recommendation| Was the resulting recommendation traceable?
Captain AI Lena| Did Lena receive and interpret the assessment?
Human Authority| Was final decision authority retained by the human?
Simulated Response| Was execution prevented or permitted according to authorization?
Audit| Were all relevant events recorded?

---

9. VERIFICATION EVIDENCE

Each completed test should produce, where available:

1. Scenario ID
2. Scenario version
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
16. Software / engine version
17. Configuration
18. Engineering notes

---

10. VERIFICATION AND VALIDATION DISTINCTION

Verification

Verification asks:

«“Did the simulator implement the specified behaviour correctly?”»

Examples include:

- correct input processing;
- correct stress calculation;
- correct risk classification;
- correct layer sequencing;
- correct authorization gate;
- correct simulated execution behaviour;
- correct audit recording.

---

Validation

Validation asks:

«“Does the research implementation appropriately address the intended engineering purpose?”»

Validation requires an agreed engineering basis, test methodology, evaluation criteria and acceptance criteria.

The catalogue therefore distinguishes between:

Implementation verification

and

Engineering validation.

The catalogue does not claim that passing an internal simulator test constitutes formal marine-system validation, certification or class approval.

---

11. MARIN ENGINEERING ORIENTATION

This section is intentionally reserved for technical guidance from MARIN.

The purpose is to allow the Sextant Protocol™ research environment to be aligned with MARIN's preferred V&V methodology rather than assuming equivalence.

Requested MARIN Input

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

12. SCENARIO EXTENSION PROCEDURE

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

13. BASELINE AND DEVELOPMENT CONTROL

The research environment should distinguish between:

PRESERVED ENGINEERING BASELINE

and

ENGINEERING DEVELOPMENT / V&V BRANCH

Changes required for testing should be implemented in the appropriate development branch.

The resulting test evidence should identify:

- software version;
- scenario version;
- configuration;
- test conditions;
- test timestamp; and
- test result.

This separation allows experimental V&V development without overwriting the preserved engineering baseline.

---

14. CURRENT V&V RESEARCH STATUS

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

The current scenarios demonstrate a research V&V framework.

They should not be represented as:

- independent certification;
- class approval;
- certified DP functionality;
- operational DP control; or
- formal marine-system validation.

---

15. FUTURE DEVELOPMENT

The catalogue may be extended to include:

- equipment failure scenarios;
- sensor discrepancy scenarios;
- actuator / thruster degradation;
- communications loss;
- navigation-reference degradation;
- environmental transitions;
- compound failures;
- recovery scenarios;
- degraded-mode operation;
- human decision latency studies;
- repeatability studies;
- controlled stochastic testing where appropriate;
- hardware-in-the-loop testing where separately approved; and
- MARIN-specific testbed scenarios.

Any such extension should be defined against an agreed engineering methodology and safety boundary.

---

16. V&V RESULT CLASSIFICATION

PASS

The implemented behaviour satisfies the defined verification criteria.

FAIL

The implemented behaviour does not satisfy one or more defined verification criteria.

REVIEW

The result requires engineering interpretation, additional evidence, revised criteria or validation input before a conclusion can be made.

A PASS result in the research simulator does not constitute operational certification, class approval or marine-system approval.

---

17. AUDITABILITY AND TRACEABILITY

Each scenario execution should, where technically supported, be traceable through:

Scenario ID
    ↓
Input Configuration
    ↓
Environmental Stress
    ↓
Risk Classification
    ↓
Primary AI Assessment
    ↓
Secondary AI Assessment
    ↓
Stabilizer Arbitration
    ↓
Recommendation
    ↓
Captain AI Lena Assessment
    ↓
Human Decision
    ↓
Simulated Response
    ↓
Updated Simulated State
    ↓
Audit Record
    ↓
V&V Result

This provides a research-oriented evidence chain for repeatable engineering review.

---

18. ENGINEERING REVIEW PRINCIPLE

The Sextant Protocol™ DP Resilience V&V Research Cockpit is intended to provide a working research environment from which further engineering evaluation can proceed.

The approach is:

1. Demonstrate the existing research architecture.
2. Define controlled scenarios.
3. Execute deterministic tests.
4. Record the resulting evidence.
5. Identify implementation issues.
6. Correct issues on the appropriate development branch.
7. Re-test and document the result.
8. Obtain engineering orientation from MARIN.
9. Extend or modify the V&V environment against agreed requirements.
10. Preserve the original engineering baseline throughout the process.

This enables the research environment to evolve in response to an external engineering methodology without representing the existing prototype as already satisfying that methodology.

---

19. DOCUMENT CONTROL

Document: DP Resilience V&V Scenario Catalogue

Document ID: DP-VV-SC-001

Version: 1.1

Status: Research / Engineering Draft

System: Sextant Protocol™ DP Resilience V&V Research Cockpit

Engine: SPD v13.1.0

Branch: "feature/marin-usv-vv-research"

Owner:
Sextant Protocol™ Doctrine – Resilience

Engineering Contact:
Mr. Don Herman Oswald Weerasekera
Founder – Sextant Protocol™ Doctrine – Resilience
Master Mariner Class 1 (Foreign Going)
Senior Dynamic Positioning Officer (SDPO)
Diploma in Transport – RMIT University, Australia

On behalf of:
DonDonna Trust Fund

---

IMPORTANT NOTICE

This document defines a research and engineering framework.

It does not constitute:

- certification;
- class approval;
- operational DP guidance;
- operational authorization;
- certified marine control software; or
- authorization for connection to a vessel control system.

The simulator remains isolated from operational vessel systems.

All simulated responses remain subject to human authority.

SEXTANT PROTOCOL™ — RESEARCH • V&V • ENGINEERING ANALYSIS • HUMAN-IN-THE-LOOP