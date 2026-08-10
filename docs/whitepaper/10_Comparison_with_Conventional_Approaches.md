Comparison with Conventional Approaches

10.1 Purpose

The Sextant Protocol™ DP Resilience Research Simulator is not proposed as a replacement for established Dynamic Positioning (DP) systems, vessel automation, classification requirements, operational procedures or professional maritime judgment.

The purpose of this comparison is to identify the research question addressed by Sextant Protocol™ and distinguish it from functions already provided by conventional maritime control and safety architectures.

The comparison is therefore conceptual rather than a claim of superiority.

---

10.2 Established DP Architecture

Modern DP systems already incorporate sophisticated control, monitoring, redundancy, alarm management, sensor processing and failure-response capabilities.

Depending on vessel design and applicable requirements, DP systems may incorporate:

- redundant control computers;
- redundant position-reference systems;
- gyrocompasses;
- wind sensors;
- motion sensors;
- thruster monitoring;
- power-management interfaces;
- alarm systems;
- consequence analysis;
- redundancy concepts;
- failure detection;
- operator displays;
- and defined operational procedures.

Sextant Protocol™ does not claim that these functions are absent from conventional DP.

Instead, the research project investigates whether an additional resilience-oriented analytical layer could provide useful decision-support across multiple changing conditions.

---

10.3 Conventional Control Objective

A conventional DP control architecture is principally concerned with maintaining the vessel's commanded position and heading within its defined control envelope.

A simplified representation is:

SENSORS

↓

DP CONTROL

↓

THRUST ALLOCATION

↓

THRUSTERS

↓

VESSEL RESPONSE

↓

SENSOR FEEDBACK

This closed-loop process is fundamental to DP operation.

The Sextant research architecture is not intended to replace this control loop.

---

10.4 Sextant Resilience Objective

The Sextant research architecture examines a different layer:

ENVIRONMENT

↓

PRIMARY ASSESSMENT

↓

INDEPENDENT SECONDARY ASSESSMENT

↓

STABILIZER

↓

RESILIENCE STATE

↓

OPERATOR DECISION-SUPPORT

The emphasis is on recognising changing conditions, comparing independent assessments, arbitrating disagreement and presenting structured escalation guidance.

This is a research layer rather than a replacement control loop.

---

10.5 Architectural Distinction

The distinction can be represented conceptually as:

Conventional DP

CONTROL

Maintain position and heading.

Sextant Research Layer

RESILIENCE DECISION-SUPPORT

Recognise changing conditions, assess resilience, arbitrate competing assessments and support human decisions.

The two concepts are therefore complementary rather than inherently competitive.

---

10.6 Existing Safety Functions

Established DP systems may already contain mechanisms that detect failures, calculate consequences, manage alarms and respond to degraded conditions.

The Sextant project therefore does not assume that a conventional DP system is unaware of cascading conditions.

Instead, it asks a narrower research question:

«Could an additional independent resilience layer provide earlier or more structured recognition of cross-domain deterioration and present that information in a form useful to the operator?»

This proposition requires testing.

---

10.7 Why an Independent Secondary Assessment?

The Sextant architecture introduces:

S1 — PRIMARY AI

and:

S2 — SECONDARY AI

The purpose is not to assume that two AI systems automatically produce greater safety.

The research objective is to investigate whether independent assessment can expose:

- disagreement;
- uncertainty;
- divergent interpretation;
- developing anomalies;
- or potential blind spots.

The Stabilizer then provides a deterministic mechanism for handling those assessments.

---

10.8 The Stabilizer as an Arbitration Layer

The Stabilizer is not intended to replace DP control.

Its research function is to provide a structured arbitration layer between assessment and operator decision-support.

Conceptually:

S1

+ 

S2

↓

STABILIZER

↓

RESILIENCE STATE

↓

OPERATOR GUIDANCE

The research question is whether this additional layer can make developing conditions more visible and actionable.

---

10.9 Cascading Conditions

A conventional system may detect individual faults through its existing monitoring and protection functions.

The Sextant research question concerns the interaction between multiple developing conditions.

For example:

Environmental Loading

+ 

Reduced Power Margin

+ 

Increasing Thruster Demand

+ 

Sensor Confidence Reduction

may collectively produce a greater resilience concern than any individual parameter suggests.

The research architecture therefore attempts to represent the combined condition as a resilience problem.

This does not imply that conventional DP systems cannot perform related assessments.

It identifies an area for comparative research.

---

10.10 Cross-Layer Decision-Support

The research architecture is intended to examine relationships between multiple information layers.

For example:

Environmental State

↓

Sensor Integrity

↓

System Stress

↓

Assessment Agreement

↓

Resilience State

↓

Operator Attention

This provides a common research representation of the evolving condition.

The objective is to reduce fragmentation between individual alarms or measurements by providing a structured resilience interpretation.

---

10.11 Early Recognition

The principal hypothesis of the project concerns timing.

A system may identify a developing condition at several different stages.

Conceptually:

STAGE 1

Normal

↓

STAGE 2

Early deviation

↓

STAGE 3

Elevated condition

↓

STAGE 4

Serious degradation

↓

STAGE 5

Critical condition

The research question is whether the Sextant resilience layer can provide useful decision-support during the earlier stages.

This is why rate-of-change testing and cascade testing are important components of the proposed validation programme.

---

10.12 Operator Decision-Support

The Sextant prototype does not attempt to eliminate the operator.

Instead, it provides structured recommendations such as:

MAINTAIN DP WITH INCREASED OPERATOR ATTENTION

or:

REVIEW SIMULATED THRUSTER AND POWER DEMAND

or:

PREPARE CONTINGENCY PROCEDURES

These are intended to organise information rather than issue operational commands.

The human operator remains responsible for the final decision within the current research architecture.

---

10.13 Alarm Versus Resilience State

Traditional alarm systems commonly communicate specific conditions.

For example:

LOW POWER

SENSOR FAILURE

THRUSTER FAULT

POSITION REFERENCE FAILURE

The Sextant research concept adds another representation:

RESILIENCE STATE

The intention is to investigate whether an operator benefits from understanding the combined significance of multiple conditions rather than receiving only individual alerts.

This is a human-factors research question and should be evaluated experimentally.

---

10.14 Information Aggregation

The research architecture can aggregate multiple assessments into a structured state.

For example:

Environmental Stress        HIGH
Sensor Integrity            MEDIUM
Power Margin                REDUCED
Thruster Demand             HIGH
S1 Assessment               ELEVATED
S2 Assessment               HIGH

STABILIZER
HIGH RESILIENCE CONCERN

The objective is not to conceal the underlying information.

The underlying information should remain available for operator inspection and audit.

---

10.15 Transparency

A significant principle of the research architecture is traceability.

The system should allow the reviewer to determine:

Why did the resilience state change?

The answer should be traceable through:

- environmental inputs;
- sensor state;
- S1 assessment;
- S2 assessment;
- Stabilizer rule;
- resulting resilience state;
- operator recommendation;
- and human decision.

This provides a research audit trail.

---

10.16 Deterministic Arbitration

The Sextant architecture deliberately separates analytical assessment from deterministic arbitration.

AI assessments may be probabilistic or model-dependent.

The Stabilizer provides a defined rule-based mechanism for converting those assessments into a research resilience state.

Conceptually:

AI OBSERVATIONS

↓

DETERMINISTIC RULES

↓

DEFINED STATE

This separation is intended to improve reproducibility and make the arbitration mechanism easier to inspect and test.

---

10.17 Conventional DP and Sextant — Complementary Roles

A conceptual comparison is:

Function| Conventional DP| Sextant Research Layer
Position control| Core function| Not provided
Heading control| Core function| Not provided
Thruster allocation| Core function| Not provided
Position-reference processing| Core function| Simulated research input
Environmental monitoring| Commonly provided| Research input
Alarm management| Commonly provided| Research representation
Failure monitoring| Commonly provided| Research assessment
Independent AI assessment| Not assumed| Research feature
Deterministic resilience arbitration| Research focus| Core research feature
Cross-condition resilience state| Not assumed as identical implementation| Research focus
Operator recommendation| Existing systems may provide alarms/guidance| Research focus
Autonomous vessel control| Outside current scope| Not provided
Human authority| Operational requirement/procedure dependent| Explicit final gate

This table is conceptual and does not attempt to describe every feature of any particular DP manufacturer or vessel.

---

10.18 No Claim of Replacement

Sextant Protocol™ should not be understood as:

DP replacement

DP controller

thruster controller

navigation controller

safety system replacement

or:

classification substitute

It is a research architecture investigating an additional resilience and decision-support concept.

---

10.19 Potential Complementary Architecture

If future research demonstrates value, a conceptual future architecture could be:

VESSEL SENSORS

↓

CERTIFIED / APPROVED VESSEL SYSTEMS

↓

EXISTING DP CONTROL AND SAFETY FUNCTIONS

↓

INDEPENDENT RESILIENCE MONITORING LAYER

↓

HUMAN DECISION-SUPPORT

The precise architecture would require detailed engineering and regulatory assessment.

The present research does not prescribe a particular operational integration method.

---

10.20 Domain-Generalisation

Although this white paper focuses on maritime DP resilience, the underlying research concept is intended to be domain-general.

The abstract pattern is:

OBSERVE

→

VERIFY

→

ASSESS

→

ARBITRATE

→

RECOMMEND

→

DECIDE

→

ACT

→

UPDATE

This pattern may potentially be investigated in other safety-critical domains.

Any such extension would require domain-specific validation.

---

10.21 Future Captain AI Lena Architecture

A longer-term Sextant Protocol™ research direction is the development of Captain AI Lena as a higher-level resilience agent.

The intended concept is not simply autonomous control.

The concept is an architecture capable of maintaining awareness across multiple validated domains and assisting with time-critical decision-support.

A future architecture could conceptually include:

MARITIME

TERRESTRIAL

AVIATION

ENERGY

FINANCIAL

CYBER

ORBITAL

with a common resilience framework.

This remains a research objective.

The current DP simulator should therefore be understood as one experimental domain within a broader research programme.

---

10.22 Autonomy as a Later Research Question

The project may eventually investigate whether validated resilience functions could operate autonomously under strictly defined conditions.

However, autonomy should be considered only after:

- deterministic behaviour has been established;
- failure modes are understood;
- independent assessments have been validated;
- human-factors risks have been evaluated;
- safety boundaries have been established;
- cybersecurity has been assessed;
- and appropriate technical and regulatory review has occurred.

The current simulator remains human-in-the-loop.

---

10.23 Research Hypothesis

The comparison leads to the central research hypothesis:

«A layered resilience decision-support architecture, operating independently from primary vessel control and using independent assessment followed by deterministic arbitration, may provide earlier recognition and more structured operator decision-support during simulated multi-factor deterioration.»

This hypothesis is deliberately narrower than a claim of operational superiority.

It can be tested.

It can be challenged.

It can produce negative results.

---

10.24 What Would Constitute Evidence?

Evidence supporting the hypothesis could include measurable improvements in:

- recognition time;
- escalation consistency;
- operator response time;
- identification of assessment disagreement;
- cascade containment lead time;
- recovery recognition;
- audit completeness;
- and decision-support clarity.

Evidence against the hypothesis could include:

- no measurable improvement;
- excessive false alerts;
- increased workload;
- inconsistent arbitration;
- delayed recognition;
- or unacceptable failure behaviour.

Both outcomes are scientifically useful.

---

10.25 Summary

The Sextant Protocol™ DP Resilience Research Simulator does not seek to replace conventional DP.

It seeks to investigate a different question:

Can an independent resilience layer complement established vessel control and safety systems by providing structured recognition, arbitration and decision-support during changing multi-factor conditions?

The current prototype provides a controlled environment in which that proposition can be tested.

The appropriate next step is not to claim superiority.

The appropriate next step is:

COMPARE

→

TEST

→

MEASURE

→

INDEPENDENTLY REVIEW

SEXTANT PROTOCOL™

COMPLEMENT — NOT REPLACE

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE