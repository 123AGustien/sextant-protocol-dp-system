References, Standards and Technical Background

14.1 Purpose

This section identifies standards, guidance, technical organisations and research areas relevant to the Sextant Protocol™ DP Resilience Research Simulator.

The references are provided to establish technical context and identify areas requiring further review.

They do not constitute certification, approval, endorsement or validation of Sextant Protocol™ by any referenced organisation.

The current simulator remains a research prototype.

---

14.2 International Maritime Organization

The International Maritime Organization (IMO) provides the international regulatory framework for maritime safety and navigation.

Relevant IMO instruments and guidance should be considered when evaluating any future relationship between a resilience-support architecture and shipboard operational systems.

Particular attention should be given to:

- Dynamic Positioning guidance;
- safety management;
- navigation safety;
- automation;
- human factors;
- cyber risk management;
- and software-dependent maritime systems.

Any future operational implementation would require assessment against the applicable international and flag-state requirements.

---

14.3 IMO Dynamic Positioning Guidance

The IMO has published guidance concerning the design and operation of dynamically positioned vessels.

The Sextant Protocol™ research programme should be evaluated against the principles applicable to:

- redundancy;
- failure tolerance;
- consequence analysis;
- operational procedures;
- alarm and monitoring systems;
- operator competence;
- and vessel safety.

The simulator does not claim to satisfy or replace these requirements.

---

14.4 Classification Society Rules

Classification societies publish requirements and guidance concerning Dynamic Positioning systems and associated vessel systems.

Relevant organisations for future technical engagement include:

- DNV;
- ABS;
- Lloyd's Register;
- Bureau Veritas;
- RINA;
- ClassNK;
- and other recognised classification organisations.

Each organisation maintains its own rules, guidance and approval processes.

The Sextant Protocol™ project seeks technical review rather than certification of the current prototype.

---

14.5 DNV

DNV has extensive technical rules and recommended practices concerning Dynamic Positioning, marine automation, software assurance and cyber security.

Future research should examine applicable DNV requirements concerning:

- DP systems;
- control systems;
- software;
- system independence;
- redundancy;
- verification;
- validation;
- and cyber security.

The current simulator does not represent a DNV-approved or DNV-certified system.

---

14.6 American Bureau of Shipping

ABS publishes rules and guidance relevant to Dynamic Positioning, marine automation and digital systems.

Future research should investigate applicable ABS requirements concerning:

- DP control;
- redundancy;
- system architecture;
- failure analysis;
- software assurance;
- and cyber security.

The Sextant Protocol™ prototype is not an ABS-approved control system.

---

14.7 Lloyd's Register

Lloyd's Register provides rules and technical guidance relevant to vessel systems, automation, software and Dynamic Positioning.

Future research should consider relevant LR requirements and assurance approaches before any operational integration is contemplated.

The current simulator is independent research software.

---

14.8 Bureau Veritas

Bureau Veritas provides classification rules and guidance covering Dynamic Positioning, automation and associated marine systems.

Future technical review should determine which BV requirements would apply to any eventual implementation.

No BV approval is claimed for the Sextant Protocol™ simulator.

---

14.9 RINA

RINA provides classification and technical services relevant to marine automation and Dynamic Positioning.

RINA requirements should be reviewed during any future development toward a higher-assurance implementation.

The current prototype remains simulation-only.

---

14.10 ClassNK

ClassNK provides rules and guidance covering shipboard systems, automation and Dynamic Positioning.

Relevant requirements should be examined if future development progresses toward hardware-in-the-loop testing or physical integration.

No ClassNK certification or endorsement is claimed.

---

14.11 IMCA

The International Marine Contractors Association provides extensive industry guidance concerning Dynamic Positioning operations and competence.

IMCA publications and industry experience are relevant to research concerning:

- DP operations;
- operator decision-making;
- failure scenarios;
- consequence analysis;
- operational preparedness;
- and lessons learned from incidents.

Future scenario design should consider appropriate industry experience while avoiding disclosure of confidential operational information.

---

14.12 Nautical Institute

The Nautical Institute is a significant professional body within the maritime sector and has extensive involvement in:

- Dynamic Positioning;
- maritime competence;
- professional development;
- operational guidance;
- and industry knowledge.

The Sextant Protocol™ project is intended to be presented for professional and technical discussion.

The project does not seek to imply endorsement.

---

14.13 Dynamic Positioning Training and Competence

Any future human-factors research involving DP operators should take account of established competence frameworks.

Research participants should be appropriately selected and the experimental protocol should clearly distinguish:

research participation

from:

operational DP competence.

Participation in a simulator experiment must not be interpreted as DP certification.

---

14.14 Failure Mode and Effects Analysis

Failure Mode and Effects Analysis (FMEA) and related techniques are relevant to future evaluation of the architecture.

Potential failure modes include:

- incorrect environmental data;
- sensor failure;
- S1 failure;
- S2 failure;
- Stabilizer failure;
- corrupted input;
- stale input;
- communications failure;
- software defect;
- incorrect threshold;
- incorrect arbitration;
- operator misunderstanding;
- and common-mode failure.

Each failure should be evaluated for:

CAUSE

↓

EFFECT

↓

DETECTION

↓

MITIGATION

↓

RECOVERY

---

14.15 Fault Tree Analysis

Fault Tree Analysis may provide a complementary method for evaluating possible paths toward an undesired simulated state.

Potential top-level events could include:

LOSS OF RESILIENCE AWARENESS

or:

INCORRECT ESCALATION

or:

MISLEADING OPERATOR GUIDANCE

The research programme should examine whether multiple independent failures could defeat the resilience layer.

---

14.16 Human Factors

Human factors are central to the research.

The architecture must not assume:

«More information automatically produces better decisions.»

Additional information can increase:

- workload;
- distraction;
- alarm fatigue;
- confusion;
- automation bias;
- or over-reliance on system recommendations.

Human-factors research should therefore measure both benefits and disadvantages.

---

14.17 Automation Bias

Future testing should specifically investigate automation bias.

An operator may incorrectly assume that:

AI RECOMMENDATION = CORRECT DECISION

The research architecture should therefore preserve the distinction between:

ASSESSMENT

RECOMMENDATION

and:

HUMAN DECISION

The current simulator explicitly identifies human authority as final.

---

14.18 Cybersecurity

Any future integration with operational systems would introduce cybersecurity considerations.

Potential concerns include:

- malicious input;
- compromised sensors;
- corrupted data;
- unauthorised commands;
- software compromise;
- communications attacks;
- and manipulation of AI assessment.

The current simulator intentionally remains isolated from operational vessel systems.

Future research should consider applicable maritime cyber-risk frameworks before any connection is contemplated.

---

14.19 Software Assurance

A future higher-assurance implementation would require a substantially stronger software assurance process than the current research prototype.

Potential areas include:

- requirements management;
- traceability;
- code review;
- static analysis;
- testing;
- fault injection;
- configuration management;
- change control;
- cybersecurity;
- verification;
- validation;
- and independent assessment.

The present GitHub repository should therefore be considered a research-development repository rather than certified safety-critical software.

---

14.20 Artificial Intelligence Assurance

AI-based assessment introduces additional research questions.

These include:

- model behaviour;
- training data;
- validation data;
- distribution shift;
- explainability;
- confidence;
- uncertainty;
- failure behaviour;
- adversarial conditions;
- and model updates.

For this reason, the deterministic Stabilizer is intentionally separated conceptually from the analytical AI layers.

The research architecture can therefore investigate AI disagreement without allowing the AI assessment itself to define operational authority.

---

14.21 Deterministic Research Requirements

The simulator should maintain deterministic behaviour wherever deterministic behaviour is claimed.

A repeatable experiment should preserve:

- scenario inputs;
- software version;
- configuration;
- thresholds;
- initial conditions;
- and relevant state.

Where non-deterministic AI components are introduced, the experiment must explicitly document the source of non-determinism.

---

14.22 Simulation Integrity

Simulation results are only meaningful to the extent that the simulation model represents the research question appropriately.

The project should therefore document:

- model assumptions;
- environmental simplifications;
- vessel assumptions;
- sensor assumptions;
- thruster assumptions;
- stress calculations;
- threshold selection;
- and known limitations.

A visually convincing cockpit is not itself evidence of physical validity.

---

14.23 Verification and Validation

The research programme should distinguish:

Verification

«Did we implement the specified model correctly?»

from:

Validation

«Does the model adequately represent the behaviour required for the research question?»

Both are necessary.

---

14.24 Hardware-in-the-Loop

Hardware-in-the-loop testing may provide a future bridge between software simulation and physical equipment.

However, HIL testing must not automatically be treated as equivalent to vessel certification.

It is an intermediate research and engineering step.

---

14.25 Independent Technical Review

The project specifically encourages independent review.

A reviewer should be free to conclude:

- the hypothesis is supported;
- the hypothesis is partially supported;
- the hypothesis is unsupported;
- or additional evidence is required.

The project should not predetermine the outcome.

---

14.26 Reference Categories

The research programme should maintain references in the following categories:

Regulatory

- IMO instruments and guidance;
- flag-state requirements;
- applicable maritime regulations.

Classification

- DNV;
- ABS;
- Lloyd's Register;
- Bureau Veritas;
- RINA;
- ClassNK;
- and other recognised societies.

Professional

- Nautical Institute;
- IMCA;
- other recognised maritime professional bodies.

Technical

- Dynamic Positioning;
- control systems;
- safety engineering;
- FMEA;
- fault-tree analysis;
- human factors;
- cybersecurity;
- software assurance;
- AI assurance;
- and simulation methodology.

---

14.27 Reference Integrity

References should be maintained using authoritative publications wherever possible.

When a standard or guidance document is cited, the final publication should identify:

- issuing organisation;
- document title;
- document number where applicable;
- revision or edition;
- publication year;
- and official source.

Third-party summaries should not replace the authoritative document.

---

14.28 Important Disclaimer

Nothing in this white paper should be interpreted as stating or implying that:

- IMO;
- DNV;
- ABS;
- Lloyd's Register;
- Bureau Veritas;
- RINA;
- ClassNK;
- IMCA;
- the Nautical Institute;
- or any other organisation

has reviewed, approved, certified or endorsed Sextant Protocol™ unless such review or endorsement is separately and formally documented.

---

14.29 Reference Strategy

The initial GitHub publication should establish the research framework first.

Authoritative references should then be expanded as the research programme develops.

This avoids creating the appearance that the prototype already satisfies requirements that have not yet been independently assessed.

---

14.30 Closing Statement

The Sextant Protocol™ research programme recognises that maritime safety is an established engineering discipline.

The purpose of this project is therefore not to bypass existing knowledge.

It is to place a new research proposition within that existing technical framework and invite experts to determine whether it provides measurable additional value.

RESEARCH FIRST

VALIDATE INDEPENDENTLY

INTEGRATE ONLY AFTER EVIDENCE

SEXTANT PROTOCOL™

DP RESILIENCE RESEARCH SIMULATOR

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE