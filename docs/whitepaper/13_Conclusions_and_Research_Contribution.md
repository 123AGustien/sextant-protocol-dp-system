Conclusions and Research Contribution

13.1 Introduction

The Sextant Protocol™ DP Resilience Research Simulator presents a deterministic research environment for investigating an additional resilience and decision-support layer around simulated maritime operations.

The project does not claim to replace Dynamic Positioning systems, vessel automation, established safety functions, classification requirements or professional maritime judgment.

Its contribution is the formulation of a testable research architecture.

---

13.2 Research Proposition

The central proposition investigated by this work is:

«A layered resilience architecture combining environmental assessment, independent analytical assessment, deterministic arbitration and structured human decision-support may provide earlier recognition and more consistent escalation of developing multi-factor conditions in a controlled simulation environment.»

The proposition remains a hypothesis.

The current simulator provides an environment in which the hypothesis can be tested.

---

13.3 Architectural Contribution

The proposed architecture separates several functions that are often considered together:

ENVIRONMENT

↓

PRIMARY ASSESSMENT

↓

SECONDARY INDEPENDENT ASSESSMENT

↓

STABILIZER

↓

RESILIENCE STATE

↓

HUMAN DECISION-SUPPORT

↓

SIMULATED RESPONSE

This separation provides a structured framework for studying each stage independently.

---

13.4 Independent Assessment

The use of Primary and Secondary assessment creates an explicit opportunity to study disagreement.

Rather than assuming that one analytical pathway is always correct, the architecture permits:

- agreement;
- disagreement;
- uncertainty;
- degraded assessment;
- and loss of assessment

to become explicit research states.

This creates an experimental basis for investigating whether independent assessment provides additional resilience information.

---

13.5 Deterministic Stabilizer

The Stabilizer represents one of the principal research contributions.

Its purpose is not to operate the vessel.

Its purpose is to provide deterministic arbitration between assessment outputs.

This creates a defined boundary between:

ANALYTICAL ASSESSMENT

and:

RESILIENCE DECISION STATE

The approach can therefore be subjected to repeatable software testing.

---

13.6 Cascade-Oriented Research

The project places particular emphasis on cascading conditions.

A cascade may be represented conceptually as:

ENVIRONMENTAL DETERIORATION

↓

INCREASED SYSTEM DEMAND

↓

REDUCED MARGIN

↓

INCREASED RESILIENCE CONCERN

↓

OPERATOR ESCALATION

The research objective is not necessarily to eliminate every simulated cascade.

Instead, the objective is to determine whether the architecture can recognise the progression early enough to provide a useful decision-support window.

---

13.7 Cascade Control Versus Cascade Prevention

An important distinction is made between:

PREVENTING A CASCADE

and:

CONTROLLING / CONTAINING THE DECISION-SUPPORT CASCADE

The current simulator can investigate the second proposition.

A positive result would mean that the architecture recognised a deteriorating sequence and produced an appropriate escalation or operator recommendation before the simulated scenario reached its defined critical state.

It would not constitute proof that a physical vessel failure would have been prevented.

---

13.8 Human Authority

The current architecture explicitly preserves human authority.

The simulator can:

- observe;
- assess;
- arbitrate;
- alert;
- recommend;
- and simulate.

It does not issue operational vessel commands.

The final decision remains with the authorised human operator.

This provides an important boundary for the current research stage.

---

13.9 Operator Decision-Support

The architecture proposes that an operator should receive more than raw environmental measurements.

The system can transform multiple simulated observations into structured information such as:

RESILIENCE STATE

URGENCY

RESPONSE MODE

RECOMMENDED ACTION

REASONS

The research question is whether this presentation improves operator understanding and response.

That question requires human-factors testing.

---

13.10 Deterministic Reproducibility

A principal technical requirement is repeatability.

For a fixed configuration:

same inputs

→

same processing

→

same arbitration

→

same output

This makes the simulator suitable for:

- regression testing;
- scenario comparison;
- fault injection;
- repeatability studies;
- and independent review.

---

13.11 Auditability

Each scenario should produce a traceable record.

The audit structure can capture:

- scenario;
- environmental inputs;
- system state;
- S1 assessment;
- S2 assessment;
- Stabilizer state;
- resilience classification;
- operator recommendation;
- human decision;
- simulated response;
- and final state.

This creates an evidence trail that can be inspected after each run.

---

13.12 Research Value of Negative Results

The project deliberately recognises that the architecture may fail to demonstrate its proposed benefits.

Possible findings may include:

- excessive alerts;
- unstable state transitions;
- poor assessment agreement;
- insufficient recognition time;
- operator overload;
- false confidence;
- or no measurable advantage over baseline systems.

Such findings would not invalidate the research process.

They would identify limitations requiring correction.

---

13.13 Potential Research Contribution

The potential contribution of the Sextant Protocol™ research programme is therefore not simply the simulator itself.

The broader contribution is a structured methodology for investigating:

1. Independent assessment.
2. Deterministic arbitration.
3. Resilience-state representation.
4. Cascade recognition.
5. Operator decision-support.
6. Human authority.
7. Auditability.
8. Repeatable scenario testing.
9. Fault injection.
10. Future autonomous resilience research.

---

13.14 Relationship to Existing Maritime Systems

The research architecture should be considered complementary to established maritime systems.

The project does not make the assumption that existing DP systems lack:

- redundancy;
- monitoring;
- alarm management;
- consequence analysis;
- fault detection;
- or operator guidance.

Instead, it asks whether a separate resilience-oriented analytical layer could provide additional value.

That proposition requires comparative evidence.

---

13.15 Future Validation

The appropriate next stages are:

SOFTWARE VALIDATION

↓

SCENARIO VALIDATION

↓

FAULT INJECTION

↓

HUMAN-FACTORS TESTING

↓

HIGH-FIDELITY SIMULATION

↓

HARDWARE-IN-THE-LOOP

↓

INDEPENDENT VERIFICATION AND VALIDATION

↓

TECHNICAL / CLASSIFICATION REVIEW

The project should not skip directly from a software demonstration to operational integration.

---

13.16 Future Autonomous Research

The wider Sextant Protocol™ architecture proposes a possible future transition from:

HUMAN-IN-THE-LOOP

toward:

HUMAN-SUPERVISED AUTONOMY

and, where technically and regulatorily justified:

AUTONOMOUS OPERATION WITHIN A DEFINED VALIDATED ENVELOPE

Such a transition should only occur after appropriate safety assurance.

The current simulator makes no operational autonomy claim.

---

13.17 Captain AI Lena

Captain AI Lena represents the proposed higher-level intelligence concept within the wider Sextant Protocol™ architecture.

The long-term concept is a resilience agent capable of maintaining structured awareness across multiple validated domains.

The intended architecture is:

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

The current DP simulator implements only a research representation of selected elements of this architecture.

---

13.18 Cross-Domain Research

The principles investigated in the maritime domain may eventually be examined in other domains.

Potential research domains include:

- aviation;
- terrestrial transport;
- energy;
- cybersecurity;
- financial resilience;
- and orbital systems.

However, each domain requires independent modelling, validation and assurance.

A successful maritime experiment should not automatically be interpreted as evidence of suitability in another domain.

---

13.19 Research Integrity

The project adopts several principles:

No premature certification claims

The prototype is not certified marine control software.

No autonomous operational claim

The current simulator cannot control a vessel.

No replacement claim

The architecture does not replace DP.

No guaranteed safety claim

Simulation results cannot guarantee real-world safety.

Independent challenge

External technical review is encouraged.

Reproducibility

Experimental conditions should be recorded.

Transparency

Limitations and negative results should be documented.

---

13.20 Principal Limitation

The most important limitation is that the present environment is a simulation.

A simulation model is necessarily an abstraction of reality.

Real maritime operations involve:

- complex hydrodynamics;
- weather uncertainty;
- equipment-specific behaviour;
- human factors;
- communications;
- hardware failures;
- software failures;
- maintenance conditions;
- operational constraints;
- and interactions that may not be represented by the current model.

Therefore:

«A successful simulation result is evidence for further research, not evidence of operational certification or guaranteed vessel safety.»

---

13.21 Research Contribution Statement

The Sextant Protocol™ DP Resilience Research Simulator contributes a structured experimental framework in which the following proposition can be independently investigated:

«Whether independent assessment combined with deterministic resilience arbitration can provide earlier recognition and more structured decision-support during simulated multi-factor maritime deterioration.»

The architecture is deliberately designed to be:

TESTABLE

AUDITABLE

REPEATABLE

CHALLENGEABLE

and:

REVISABLE

---

13.22 Final Conclusion

The Sextant Protocol™ DP Resilience Research Simulator should be regarded as a research instrument.

Its value will ultimately be determined by evidence.

The appropriate pathway is therefore:

BUILD

↓

TEST

↓

CHALLENGE

↓

MEASURE

↓

INDEPENDENTLY REVIEW

↓

REFINE

Only after these stages should any consideration be given to higher-fidelity integration or future autonomy.

The research proposition is simple:

«Can resilience be recognised early enough to give people more time to make better decisions?»

The simulator provides a controlled environment in which that question can be asked rigorously.

---

13.23 Closing Statement

SEXTANT PROTOCOL™

DP RESILIENCE RESEARCH SIMULATOR

ENVIRONMENT

↓

PRIMARY AI

↓

SECONDARY AI

↓

STABILIZER

↓

HUMAN AUTHORITY

↓

SIMULATED RESPONSE

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS

TESTABLE • AUDITABLE • REPEATABLE

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE