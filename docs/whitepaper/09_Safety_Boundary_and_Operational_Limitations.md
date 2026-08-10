Safety Boundary and Operational Limitations

9.1 Purpose

The Sextant Protocol™ DP Resilience Research Simulator is a research and engineering prototype.

It is not certified marine control software and is not intended to provide operational control of a vessel.

This boundary is fundamental to the present research programme.

The simulator has been intentionally designed so that its assessments, recommendations and simulated responses remain isolated from operational vessel systems.

---

9.2 Simulation-Only Status

The current prototype operates in:

SIMULATION ONLY

mode.

The system does not possess operational authority.

The current audit state explicitly records:

Autonomous Command: FALSE

Operational Authority: FALSE

Real Vessel Connection: FALSE

This provides a clear distinction between the research environment and an operational DP installation.

---

9.3 Human Authority

Human authority remains final throughout the current architecture.

The system may:

- assess;
- classify;
- arbitrate;
- warn;
- recommend;
- simulate; and
- record.

The system does not independently command an operational vessel.

The intended decision pathway is:

AI ASSESSMENT

↓

STABILIZER ARBITRATION

↓

OPERATOR DECISION-SUPPORT

↓

HUMAN DECISION

↓

SIMULATED RESPONSE

The human operator therefore remains the final decision authority.

---

9.4 No Operational DP Connection

The prototype must not be connected to operational DP systems.

This includes:

- DP control computers;
- propulsion systems;
- thruster controllers;
- power-management systems;
- steering systems;
- navigation systems;
- position-reference systems;
- vessel automation networks;
- safety systems;
- alarm systems; and
- operational vessel communication networks.

The current research architecture is deliberately isolated.

---

9.5 No Certified DP Functionality

The simulator does not provide certified Dynamic Positioning functionality.

The use of terminology such as:

DP2-SIMULATED

refers only to the characteristics of the research vessel model.

It does not imply:

- DP class certification;
- type approval;
- vessel approval;
- equipment approval;
- software certification;
- or operational acceptance.

No statement in this paper should be interpreted as a claim of certification.

---

9.6 Simulated Vessel Model

The research vessel model is an abstraction.

The vessel parameters are intended to provide a consistent experimental platform.

They do not represent the complete characteristics of an operational vessel.

A real DP vessel involves substantially more complexity, including:

- hydrodynamic behaviour;
- propulsion characteristics;
- thruster dynamics;
- power generation;
- power distribution;
- redundancy;
- control-loop behaviour;
- sensor characteristics;
- environmental force modelling;
- failure modes;
- vessel configuration;
- operational limitations; and
- human factors.

The current simulator does not claim to reproduce all of these factors with operational fidelity.

---

9.7 Environmental Model Limitations

The environmental inputs are controlled simulation parameters.

Wind, current, wave and tidal stress values do not constitute real environmental measurements.

They are research variables.

Consequently, an environmental stress value such as:

62.25

should be interpreted as a simulation output rather than a physical measurement of environmental loading on a real vessel.

Future high-fidelity research would require validated environmental and hydrodynamic models.

---

9.8 AI Limitations

The Primary AI and Secondary AI are research components.

Their outputs should not be interpreted as authoritative operational assessments.

AI systems may be affected by:

- incomplete information;
- incorrect assumptions;
- model limitations;
- software defects;
- unexpected inputs;
- data quality;
- configuration errors;
- and scenario limitations.

The independent Secondary AI is not assumed to be inherently correct.

Both assessment layers are subject to validation.

---

9.9 Stabilizer Limitations

The Stabilizer is a deterministic research arbitration mechanism.

Its output is only as reliable as:

- its inputs;
- its rules;
- its thresholds;
- its implementation;
- and the validity of the simulation model.

The Stabilizer does not physically stabilise a vessel.

It stabilises the research decision-support process.

Its purpose is to investigate whether early recognition and structured arbitration can help contain a simulated cascade.

---

9.10 No Guarantee of Operational Safety

The simulator does not establish that the Sextant Protocol™ architecture improves safety on an operational vessel.

The current prototype does not provide sufficient evidence to make such a claim.

The research programme must establish effectiveness through:

- repeatable testing;
- fault injection;
- higher-fidelity modelling;
- human-factors evaluation;
- independent engineering review;
- and appropriate validation.

Until such evidence exists, the system should be regarded as a research hypothesis and experimental framework.

---

9.11 Cybersecurity Boundary

The simulator should remain isolated from operational vessel networks.

This is important because future resilience architectures may involve multiple data sources and potentially networked components.

Any future operational integration would require dedicated cybersecurity analysis addressing areas such as:

- network segregation;
- authentication;
- access control;
- data integrity;
- software integrity;
- communications security;
- update mechanisms;
- logging;
- intrusion detection;
- and recovery.

No operational cybersecurity claim is made by the present prototype.

---

9.12 Software Assurance

The current prototype is research software.

It should therefore be considered subject to normal research software risks, including:

- programming errors;
- logic errors;
- interface errors;
- incorrect assumptions;
- incomplete testing;
- dependency failures;
- configuration errors;
- and regression defects.

A future operational version would require a significantly more rigorous software assurance process.

---

9.13 Human Factors

The system is designed around human-in-the-loop decision-support.

However, the existence of a human decision gate does not automatically guarantee safe human interaction.

Human-factors risks may include:

- alarm fatigue;
- excessive information;
- automation bias;
- over-reliance on AI recommendations;
- misunderstanding of confidence;
- delayed acknowledgement;
- and cognitive overload.

These risks must be explicitly studied.

The research programme should therefore include qualified maritime operators in future evaluation.

---

9.14 Automation Bias

A particular concern for AI-assisted systems is automation bias.

An operator may give excessive weight to a computer-generated recommendation simply because it appears authoritative.

The Sextant Protocol™ architecture therefore deliberately distinguishes:

AI ASSESSMENT

from:

HUMAN AUTHORITY.

Future cockpit development should make uncertainty, disagreement and limitations visible to the operator.

The objective is to support professional judgment rather than replace it.

---

9.15 False Positive and False Negative Risks

A resilience warning system can fail in two important ways.

False Positive

The system identifies an elevated condition when no significant deterioration follows.

Excessive false positives may create:

- unnecessary intervention;
- alarm fatigue;
- reduced confidence;
- and increased workload.

False Negative

The system fails to recognise a developing condition.

False negatives may be more serious in safety-critical applications.

Both behaviours must therefore be measured during validation.

---

9.16 Cascading Failure Research Boundary

The Stabilizer is specifically intended to investigate simulated cascading conditions.

However, the current prototype cannot establish that it would prevent a real-world cascade.

The research question is narrower:

«Can deterministic arbitration identify and contain a simulated progression early enough to provide useful decision-support?»

The answer must be established experimentally.

---

9.17 Failure of the Resilience Layer

The resilience architecture itself must be treated as a potentially failing component.

Future testing should include:

- Primary AI failure;
- Secondary AI failure;
- Stabilizer failure;
- corrupted input;
- missing data;
- stale data;
- inconsistent state;
- software failure;
- audit failure;
- and communication failure.

The key safety principle is:

«Failure of the resilience layer must not create operational control where none previously existed.»

This is naturally supported by the current simulation-only boundary.

---

9.18 Graceful Degradation

Future research should investigate graceful degradation.

If one analytical component becomes unavailable, the architecture should not automatically assume that the remaining component is sufficient for all purposes.

Potential states include:

NORMAL

↓

REDUCED ANALYTICAL CONFIDENCE

↓

ADDITIONAL VERIFICATION

↓

HUMAN REVIEW

The precise behaviour requires validation.

---

9.19 Human Override

Human override is fundamental to the present architecture.

The simulator should always provide a clear mechanism by which the operator can reject or disregard a simulated recommendation.

Potential research decision states include:

- AUTHORIZE;
- MAINTAIN SAFE STATE;
- REQUEST ADDITIONAL DIAGNOSTICS;
- ABORT;
- ESCALATE;
- and other domain-specific decisions.

These are research representations and not operational commands.

---

9.20 Future Autonomous Operation

The Sextant Protocol™ research programme may eventually investigate autonomous operation in carefully bounded domains.

Captain AI Lena is envisaged as a future higher-level autonomous resilience agent capable of operating across validated domains.

However, autonomy should not be treated as a simple software switch.

A transition toward autonomy would require:

1. clearly defined authority;
2. validated operating envelopes;
3. deterministic safety boundaries;
4. independent monitoring;
5. fail-safe behaviour;
6. human override;
7. cybersecurity controls;
8. extensive simulation;
9. hardware-in-the-loop testing;
10. independent verification and validation;
11. appropriate regulatory review; and
12. demonstrated operational reliability.

The present DP simulator makes no claim of autonomous operational capability.

---

9.21 Classification and Regulatory Consideration

The purpose of presenting this research to maritime technical organisations and classification societies is not to claim approval.

The purpose is to invite technical examination.

Potential areas for future assessment may include:

- functional architecture;
- independence;
- redundancy;
- software assurance;
- human factors;
- failure modes;
- cybersecurity;
- verification and validation;
- testing methodology;
- operational boundaries;
- and integration requirements.

Any future operational implementation would need to follow the requirements applicable to the intended vessel, system and jurisdiction.

---

9.22 Responsible Research Principle

The Sextant Protocol™ project adopts the following principle:

«Research first. Validate independently. Integrate only after appropriate evidence exists.»

This prevents a prototype demonstration from being confused with operational approval.

The research simulator is therefore deliberately positioned as a platform for:

RESEARCH

SIMULATION

EDUCATION

ENGINEERING ANALYSIS

and:

INDEPENDENT REVIEW

---

9.23 Operational Boundary Statement

The following statement applies to the current prototype:

«The Sextant Protocol™ DP Resilience Research Simulator is a non-operational research environment. It is not certified marine control software and does not provide certified DP functionality. It must not be connected to operational Dynamic Positioning, propulsion, navigation, steering, safety or vessel automation systems. All environmental conditions, vessel states, sensor states, AI assessments, Stabilizer decisions, alerts and simulated responses are representations generated by the research simulation environment. Human authority remains final.»

This statement should remain visible in the research repository and cockpit.

---

9.24 Summary

The current Sextant Protocol™ DP Resilience Research Simulator is intentionally limited.

It does not claim to control a vessel.

It does not claim DP certification.

It does not claim regulatory approval.

It does not claim operational safety validation.

Instead, it provides a controlled environment for testing a specific proposition:

Can a layered deterministic resilience architecture recognise developing conditions, contain simulated cascading decision effects, and provide useful structured decision-support before further escalation?

The answer remains a matter for research.

The next stage is therefore not deployment.

It is:

TESTING → VALIDATION → INDEPENDENT REVIEW

SEXTANT PROTOCOL™

RESEARCH BEFORE OPERATION

HUMAN AUTHORITY REMAINS FINAL

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE