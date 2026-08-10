Introduction

1.1 Background

Dynamic Positioning (DP) systems are an important component of modern offshore maritime operations. DP enables a vessel to maintain position and heading through the coordinated use of propulsion, thrusters, sensors, control systems and operator oversight.

DP vessels may operate in environments where wind, waves, currents and tidal conditions can change rapidly. Offshore construction, subsea operations, cable installation, diving support, renewable-energy projects and other specialist activities may place significant demands on vessel systems and operators.

The safe management of such operations depends not only upon the technical capability and redundancy of the DP system, but also upon the timely recognition of changing conditions and the ability of the operating team to understand and respond to developing situations.

The Sextant Protocol™ DP Resilience Research Simulator investigates an additional research question:

Can a deterministic resilience layer provide earlier recognition and structured decision-support before changing environmental conditions develop into a cascading simulated event?

The proposed approach does not seek to replace existing DP control architecture. Instead, it explores a complementary resilience and decision-support layer operating above the simulated control environment.

---

1.2 Research Motivation

A developing maritime event may involve several conditions simultaneously.

For example:

Increasing current

may produce:

Higher environmental loading

which may produce:

Increasing thruster demand

which may contribute to:

Reduced operational margin

which may then require:

Greater operator attention and contingency preparation.

If several conditions continue to deteriorate, they can interact and create a cascading situation.

The research proposition behind Sextant Protocol™ is that resilience should not be considered only as the ability to respond after a failure has occurred.

Resilience may also involve recognising developing conditions early, assessing their significance, preventing unnecessary escalation, and providing the operator with structured information about what should be considered next.

The simulator therefore focuses on the transition between:

ENVIRONMENTAL CHANGE

and

OPERATIONAL DECISION.

---

1.3 The Sextant Protocol™ Concept

The Sextant Protocol™ DP Resilience Research Simulator implements a layered research architecture:

ENVIRONMENT → PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN AUTHORITY → SIMULATED DP RESPONSE

Each layer has a defined research purpose.

Environment

The simulation environment generates controlled and repeatable maritime conditions.

Variables may include:

- wind stress;
- current stress;
- wave stress;
- tidal stress;
- environmental change;
- sensor conditions; and
- simulated vessel response.

Primary AI

The Primary AI provides the principal simulated environmental and resilience assessment.

Its purpose within the research architecture is to identify developing conditions and determine an appropriate simulated assessment state.

Secondary AI

The Secondary AI provides an independent safety-oriented assessment.

The purpose of the independent layer is to introduce an additional analytical perspective rather than relying upon a single assessment pathway.

Stabilizer

The Stabilizer is the central resilience-arbitration component.

It evaluates the available assessments and determines the appropriate simulated resilience state.

The Stabilizer is not intended to command a real vessel.

Its research purpose is to prevent the decision process itself from becoming uncontrolled when multiple conditions or assessments change simultaneously.

Human Authority

The present prototype maintains the human operator as the final authority.

The simulator may recommend actions, escalation or increased monitoring, but it does not issue operational commands to a real vessel.

Simulated DP Response

The final layer represents what a DP response could look like within the controlled research environment.

It remains a simulation and does not control operational DP equipment.

---

1.4 Resilience as a Decision-Support Problem

The research focus of Sextant Protocol™ extends beyond conventional monitoring.

The central concept is:

«Recognise → Assess → Arbitrate → Inform → Decide → Respond → Verify»

This creates a structured pathway between environmental change and operator action.

The Stabilizer provides the arbitration point within this pathway.

Where independent assessments indicate an elevated condition, the Stabilizer can generate a structured resilience state rather than allowing each individual assessment to become an isolated alarm or recommendation.

This provides a research mechanism for examining whether structured arbitration can reduce uncertainty and improve the timing and clarity of operator decision-support.

---

1.5 Human-in-the-Loop Principle

Human authority is a fundamental safety principle of the current Sextant Protocol™ DP research architecture.

The simulator is designed to assist the operator rather than replace the operator.

The operator remains responsible for evaluating the simulated recommendation within the context of:

- vessel procedures;
- operational conditions;
- available resources;
- system status;
- environmental information;
- mission requirements; and
- applicable safety requirements.

The simulator therefore separates assessment from authority.

AI components may assess.

The Stabilizer may arbitrate.

The simulator may recommend.

The human operator remains the final authority.

---

1.6 Research Scope

The current research prototype focuses on controlled simulation rather than operational implementation.

The research scope includes:

- deterministic scenario generation;
- environmental stress modelling;
- resilience classification;
- independent assessment pathways;
- deterministic arbitration;
- early-warning conditions;
- operator decision-support;
- simulated DP response;
- repeatable testing;
- event logging;
- audit records; and
- future validation methodologies.

The research does not presently claim that the architecture has been validated for operational marine use.

Any future operational application would require appropriate engineering development, verification, validation, cybersecurity assessment, human-factors evaluation, independent review, classification consideration and regulatory acceptance.

---

1.7 Research Question

The principal research question is:

«Can a layered deterministic resilience architecture provide earlier recognition, structured escalation and improved decision-support during rapidly changing simulated maritime conditions?»

Secondary research questions include:

1. Can independent assessment layers provide useful additional information before escalation?
2. Can deterministic arbitration produce repeatable resilience decisions?
3. Can early-warning states provide operators with useful additional preparation time?
4. Can structured recommendations reduce ambiguity during developing simulated events?
5. Can the architecture identify and contain simulated cascading conditions before they reach a defined resilience threshold?
6. Can the resulting decisions and system states be recorded in an auditable and repeatable manner?

These questions are intended to be tested through increasingly rigorous simulation and validation rather than assumed to be proven by the prototype itself.

---

1.8 Research Philosophy

The Sextant Protocol™ research approach is based on a simple principle:

Do not wait for the cascade.

The architecture attempts to identify developing conditions while there remains an opportunity for assessment, preparation and human intervention.

The Stabilizer therefore represents a research mechanism for maintaining resilience in the decision process.

It does not replace the DP system.

It does not replace the operator.

It does not claim autonomous authority.

Instead, it creates a structured layer between changing conditions and human decision-making.

---

1.9 Future Evolution

The present simulator is deliberately human-in-the-loop.

Future research may investigate progressively more autonomous decision-support capabilities, subject to appropriate validation and defined safety boundaries.

A potential research progression is:

Human-in-the-Loop

→

Supervised Decision Support

→

Bounded Autonomy

→

Validated Domain-Specific Autonomous Resilience

Any future autonomous capability would require clearly defined authority limits, safety gates, independent verification, fail-safe behaviour, auditability and appropriate human override mechanisms.

The present white paper therefore treats autonomy as a future research pathway, not as a capability claimed by the current DP simulator.

---

1.10 Document Structure

The remainder of this white paper examines the Sextant Protocol™ architecture and research methodology in greater detail.

The following sections address:

- maritime and DP resilience background;
- system architecture;
- Primary and Secondary AI roles;
- deterministic Stabilizer arbitration;
- the DP Resilience Research Cockpit;
- simulation scenarios and case studies;
- validation methodology;
- operational boundaries;
- future research and development; and
- conclusions.

The objective is to provide a transparent technical description that can be examined, challenged, reproduced and independently evaluated by maritime professionals, engineers, researchers and other qualified reviewers.

SEXTANT PROTOCOL™

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS

HUMAN AUTHORITY REMAINS FINAL