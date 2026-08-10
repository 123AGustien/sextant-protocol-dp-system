Proposed Research Programme and Partnership

12.1 Purpose

The Sextant Protocol™ DP Resilience Research Simulator is intended to provide a starting point for collaborative technical investigation.

The project is therefore presented openly for examination by maritime professionals, researchers, universities, engineering organisations, DP specialists and classification societies.

The objective is not to seek premature endorsement.

The objective is to invite technically rigorous challenge, independent testing and constructive review.

---

12.2 Proposed Research Programme

The proposed programme is structured in progressive stages.

Stage 1 — Prototype Review

Review the current architecture, simulator implementation and documentation.

Areas of review include:

- system architecture;
- environmental model;
- Primary AI;
- Secondary AI;
- Stabilizer;
- operator guidance;
- audit system;
- human decision gate;
- and operational boundary.

---

Stage 2 — Scenario Definition

Develop a common set of representative research scenarios.

Potential scenarios include:

- normal environmental operation;
- increasing current;
- heavy weather;
- wind gust;
- combined environmental stress;
- sensor degradation;
- navigation degradation;
- simulated thruster degradation;
- simulated power degradation;
- assessment disagreement;
- cascading conditions;
- and recovery.

The scenario definitions should be agreed before formal testing wherever practical.

---

Stage 3 — Independent Scenario Execution

External researchers should be able to execute the defined scenarios independently.

The purpose is to determine whether the reported results are reproducible.

The project should provide sufficient information for an external reviewer to understand:

- inputs;
- expected behaviour;
- actual behaviour;
- and resulting audit records.

---

Stage 4 — Fault Injection

Controlled failures should be introduced.

Examples include:

- S1 failure;
- S2 failure;
- Stabilizer failure;
- sensor failure;
- inconsistent data;
- missing data;
- delayed data;
- corrupted data;
- and communication interruption.

The objective is to identify unexpected behaviour before any consideration of operational implementation.

---

Stage 5 — Human-Factors Research

Qualified maritime personnel could participate in controlled experiments.

Research questions could include:

- Does the cockpit improve situational awareness?
- Does it reduce recognition time?
- Are recommendations understandable?
- Does it create alarm fatigue?
- Does it encourage automation bias?
- Does the additional information increase workload?
- Can operators identify disagreement between assessment layers?

Human-factors evaluation should be conducted independently of the software development team where possible.

---

Stage 6 — Higher-Fidelity Simulation

Following successful deterministic testing, the research model could be expanded.

Potential additions include:

- vessel dynamics;
- hydrodynamic forces;
- propulsion characteristics;
- thruster response;
- power-management behaviour;
- realistic sensor characteristics;
- navigation degradation;
- environmental modelling;
- and failure propagation.

The objective would be to increase physical fidelity while retaining the research isolation boundary.

---

Stage 7 — Hardware-in-the-Loop

A controlled HIL environment could subsequently be considered.

The HIL system could include representative simulated:

- DP controller;
- propulsion;
- power system;
- navigation;
- sensors;
- environmental conditions;
- and vessel dynamics.

The Sextant resilience layer would remain separated from operational vessel control.

---

Stage 8 — Independent Verification and Validation

An independent technical organisation could review:

- source code;
- algorithms;
- test procedures;
- scenario definitions;
- results;
- assumptions;
- failure modes;
- cybersecurity;
- human factors;
- and audit integrity.

The objective would be to establish whether the reported research findings are technically credible.

---

12.3 Proposed Partnership Model

The project is open to several forms of collaboration.

Academic Partnership

Universities and maritime research institutions could contribute:

- research methodology;
- simulation science;
- control theory;
- AI evaluation;
- human-factors research;
- statistical analysis;
- and independent publication.

---

Maritime Industry Partnership

Maritime companies could contribute:

- operational knowledge;
- representative scenarios;
- vessel experience;
- DP expertise;
- engineering review;
- and practical human-factors requirements.

---

Classification and Technical Partnership

Classification societies and specialist technical organisations could contribute:

- review of system architecture;
- identification of relevant safety principles;
- verification methodology;
- failure-mode analysis;
- software assurance guidance;
- and advice regarding requirements for any future operational consideration.

The project does not request certification of the current prototype.

It requests technical examination and guidance.

---

12.4 Proposed Research Governance

A collaborative research programme should establish clear governance.

Potential responsibilities include:

Project Lead

Maintains the research architecture and repository.

Independent Technical Reviewers

Challenge assumptions and evaluate evidence.

Maritime Subject-Matter Experts

Assess operational realism.

Human-Factors Researchers

Evaluate operator interaction.

Software / Systems Engineers

Evaluate implementation and deterministic behaviour.

Academic Researchers

Support methodology and statistical analysis.

Regulatory / Classification Advisors

Provide guidance concerning future safety and assurance requirements.

---

12.5 Evidence Management

All significant experiments should produce an evidence package.

A proposed package includes:

Scenario Definition
Input Configuration
Software Version
Test Procedure
Execution Log
System Assessment
S1 Result
S2 Result
Stabilizer Result
Operator Guidance
Human Decision
Simulated Response
Audit Record
Test Result
Reviewer Comments

This allows each experiment to be independently examined.

---

12.6 Version Control

The research repository should preserve historical versions.

Each significant research release should identify:

- software version;
- architecture version;
- scenario version;
- test version;
- documentation version;
- and date.

Changes should be documented.

This is particularly important when comparing experimental results across time.

---

12.7 Open Research Approach

Where practical, the project should favour transparent research practices.

Potentially publishable material includes:

- architecture descriptions;
- scenario definitions;
- test methodologies;
- anonymised results;
- audit structures;
- validation criteria;
- limitations;
- and lessons learned.

Sensitive operational information should not be disclosed.

The objective is responsible technical transparency.

---

12.8 Proposed Research Questions for Partners

A prospective research partner could select one or more specific questions.

Question A

Does deterministic arbitration improve consistency between independent assessments?

Question B

Does the resilience layer identify simulated deterioration earlier than a baseline configuration?

Question C

Does the system reduce recognition time for human operators?

Question D

Does it improve identification of combined environmental and system stress?

Question E

Can it reduce the propagation of a simulated decision-support cascade?

Question F

Does the additional layer introduce unacceptable false-positive behaviour?

Question G

How should human authority be represented in future autonomous resilience architectures?

---

12.9 Proposed Experimental Comparison

A controlled experiment could compare:

Configuration A

Baseline

Conventional simulated monitoring and alarm representation.

Configuration B

Single Assessment

Primary assessment plus operator guidance.

Configuration C

Dual Assessment

Primary + Secondary assessment.

Configuration D

Sextant Resilience Architecture

Primary + Secondary + Stabilizer + structured operator guidance.

The same environmental scenarios should be applied to each configuration.

This would provide a meaningful basis for comparison.

---

12.10 Proposed Research Metrics

The following metrics could be collected:

Metric| Research Purpose
Recognition Time| Measure early recognition
Escalation Time| Measure warning progression
Cascade Containment Lead Time| Measure available decision window
False Positive Rate| Measure unnecessary escalation
False Negative Rate| Measure missed deterioration
Decision Time| Measure operator response
Decision Accuracy| Measure response quality
State Oscillation| Measure stability
Recovery Recognition| Measure recovery behaviour
Audit Completeness| Measure traceability
Workload| Measure human-factors impact
Assessment Agreement| Measure S1/S2 relationship

The final metric definitions should be agreed before formal testing.

---

12.11 Proposed Independent Review Package

A technical reviewer should receive, where appropriate:

1. White paper.
2. System architecture.
3. Repository structure.
4. Simulator source code.
5. Scenario definitions.
6. Test procedures.
7. Test results.
8. Audit logs.
9. Known limitations.
10. Research hypotheses.
11. Validation methodology.
12. Proposed future work.

This allows review to proceed from architecture through evidence.

---

12.12 No Request for Premature Certification

The project does not request certification of the present simulator.

The intended request is:

«Please examine the research proposition and advise what evidence, methodology and engineering controls would be required to determine whether the concept merits further investigation.»

This distinction is important.

It allows technical organisations to participate without treating a research prototype as an operational product.

---

12.13 Potential Outcomes

The research programme could produce several outcomes.

Outcome 1 — Positive Evidence

Testing demonstrates measurable value.

Further research is justified.

Outcome 2 — Partial Evidence

Some components demonstrate value while others require redesign.

The architecture is refined.

Outcome 3 — Negative Evidence

The architecture does not demonstrate the proposed benefit.

The hypothesis is rejected or substantially revised.

Outcome 4 — New Research Direction

Testing identifies a different and potentially more valuable application.

The research programme evolves accordingly.

All four outcomes are legitimate.

---

12.14 Long-Term Research Direction

The broader Sextant Protocol™ programme proposes that resilience architecture could eventually be investigated across multiple domains.

Potential domains include:

- maritime;
- aviation;
- terrestrial transport;
- energy;
- financial resilience;
- cybersecurity;
- and orbital systems.

The purpose of the common architecture would be to investigate whether the same fundamental principles can support different safety-critical environments.

The current DP simulator represents one controlled domain in which the architecture can be examined.

---

12.15 Captain AI Lena — Long-Term Concept

Captain AI Lena is proposed as a future autonomous resilience agent within the wider Sextant Protocol™ architecture.

The long-term research concept is that Lena could operate as a cross-domain resilience intelligence layer capable of:

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

However, the present maritime simulator does not provide autonomous operational control.

Any future autonomy would require a separate research and assurance programme.

---

12.16 Autonomy and Time-Critical Resilience

One motivation for future autonomy research is response time.

Human authority remains essential, but some situations may evolve faster than conventional decision processes allow.

A future validated architecture could potentially operate within clearly defined boundaries to:

- recognise a developing condition;
- preserve a safe state;
- initiate predefined protective actions;
- notify the human authority;
- and maintain a complete audit trail.

This is a future research objective, not a capability claim of the current prototype.

---

12.17 Human Authority as a Design Principle

Even where future autonomy is investigated, the project proposes that authority should be explicitly defined.

Possible architectural states could include:

HUMAN AUTHORISED

HUMAN SUPERVISED

AUTONOMOUS WITHIN VALIDATED ENVELOPE

SAFE STATE

ESCALATION REQUIRED

The exact implementation would require technical and regulatory review.

The present DP simulator remains:

HUMAN-IN-THE-LOOP

---

12.18 Invitation to Technical Review

The Sextant Protocol™ project invites technical organisations to challenge the architecture.

Questions, criticism and identified weaknesses are considered valuable research contributions.

The project particularly welcomes review concerning:

- safety;
- DP architecture;
- redundancy;
- independence;
- human factors;
- software assurance;
- AI behaviour;
- deterministic arbitration;
- cybersecurity;
- failure modes;
- and validation methodology.

---

12.19 Proposed First Collaboration

A practical first collaboration could be a controlled technical workshop.

The proposed workshop agenda could include:

1. Presentation of the architecture.
2. Demonstration of the simulator.
3. Review of the CURRENT_SURGE scenario.
4. Review of the Stabilizer.
5. Review of the cascade hypothesis.
6. Discussion of existing DP resilience practices.
7. Identification of gaps in the proposed validation methodology.
8. Agreement on candidate test scenarios.
9. Identification of appropriate independent reviewers.
10. Definition of the next research stage.

The objective would be technical examination rather than commercial promotion.

---

12.20 Research Partnership Statement

The Sextant Protocol™ project is therefore presented as:

AN OPEN RESEARCH PROPOSITION

rather than:

A FINISHED OPERATIONAL PRODUCT.

The project seeks partners willing to:

EXAMINE

CHALLENGE

TEST

MEASURE

VALIDATE

and, where justified:

ADVANCE

the research.

---

12.21 Summary

The proposed programme provides a pathway from the current deterministic simulator toward progressively more rigorous research.

The proposed sequence is:

PROTOTYPE

↓

TECHNICAL REVIEW

↓

SCENARIO TESTING

↓

FAULT INJECTION

↓

HUMAN-FACTORS TESTING

↓

HIGH-FIDELITY SIMULATION

↓

HIL

↓

INDEPENDENT V&V

↓

CLASSIFICATION / REGULATORY REVIEW

Any future operational consideration would follow only after appropriate evidence.

The central principle remains:

«Research first. Validate independently. Integrate only after appropriate evidence exists.»

SEXTANT PROTOCOL™

DP RESILIENCE RESEARCH PROGRAMME

OPEN FOR TECHNICAL REVIEW AND COLLABORATION

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE