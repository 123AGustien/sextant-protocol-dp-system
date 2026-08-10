Sextant Protocol – Dynamic Positioning (DP) Resilience Control System

Executive Summary

The Sextant Protocol Dynamic Positioning (DP) Resilience Control System is a modular, simulation-based research prototype for studying resilient supervisory architectures for Dynamic Positioning operations under challenging and nonlinear marine environmental conditions.

The project explores how independent decision layers, deterministic supervisory logic, stabilization mechanisms, simulated vessel and environmental inputs, and human-in-the-loop governance can work together to improve resilience during abnormal and degraded operating scenarios.

The prototype is being developed as an engineering research and simulation environment. It does not connect to, control, or modify certified vessel DP equipment.

«Safety Boundary: This project is not certified marine control software and must not be connected to operational vessel DP, propulsion, navigation, or safety systems. All vessel behaviour, sensors, environmental conditions, and control responses are simulated.»

---

Repository Status

Status: Active Research Prototype

Baseline: v1.0 conceptual reference

Development Direction: Modular working simulation prototype

Language: Python

License: MIT

The original v1.0 architecture is preserved as a reference baseline while modular prototype components are developed and validated through separate development work.

---

Research Purpose

The objective is to investigate whether independent supervisory decision layers can improve resilience when environmental disturbances, sensor abnormalities, equipment degradation, or other simulated conditions exceed normal operating assumptions.

The framework is intended for:

- DP resilience research
- supervisory control architecture studies
- maritime safety engineering
- autonomous marine systems research
- human-AI collaboration research
- deterministic simulation
- failure and degraded-mode analysis
- explainable decision-support research

---

Conceptual Supervisory Architecture

The prototype follows a layered architecture.

1. Primary AI Layer

The Primary AI represents the normal supervisory decision layer.

Responsibilities include:

- normal operating assessment
- environmental response
- position-control objectives
- first-response decision generation
- nominal system-state evaluation

2. Secondary AI Layer

The Secondary AI provides an independent supervisory safety layer.

Responsibilities include:

- abnormal-condition detection
- independent state assessment
- conservative fallback decisions
- primary-layer monitoring
- escalation recommendations

3. Stabilization Layer

The Stabilization Layer coordinates transitions between competing decision states.

Responsibilities include:

- decision arbitration
- transition management
- oscillation prevention
- degraded-mode coordination
- escalation stabilization

4. Human-in-the-Loop Layer

The human operator remains the final authority within the simulation architecture.

Responsibilities include:

- reviewing escalated conditions
- accepting or rejecting recommended actions
- manual intervention
- safety governance
- command authority

5. Simulation & Audit Layer

The simulation environment provides deterministic scenario execution and records system behaviour.

Responsibilities include:

- environmental scenario generation
- vessel-state simulation
- sensor-state simulation
- decision recording
- event logging
- replay and analysis

---

Conceptual System Flow

Environmental Model
        │
        ▼
Simulated Vessel & Sensors
        │
        ▼
Primary AI
        │
        ▼
Secondary AI
        │
        ▼
Stabilization / Arbitration
        │
        ▼
Human-in-the-Loop
        │
        ▼
Simulated Action
        │
        ▼
Updated Vessel State
        │
        ▼
Audit & Replay

The system follows a continuous simulation cycle:

OBSERVE
   ↓
VERIFY
   ↓
ASSESS
   ↓
DECIDE
   ↓
ACT
   ↓
UPDATE
   ↓
REASSESS

---

Working Prototype Architecture

The repository is being expanded from the original conceptual model into modular executable simulation components.

Planned and active modules include:

Module| Purpose
"main.py"| Prototype entry point and orchestration
"primary_ai.py"| Primary supervisory decision layer
"secondary_ai.py"| Independent safety decision layer
"stabilizer.py"| Decision arbitration and stabilization
"human_in_loop.py"| Human authority and intervention simulation
"simulation_engine.py"| Main deterministic simulation environment
"environment_model.py"| Simulated wind, current, wave and environmental disturbances
"sensor_manager.py"| Simulated navigation and DP reference inputs
"vessel_profile.py"| Configurable vessel characteristics
"thruster_manager.py"| Simulated propulsion/thruster response
"alarm_manager.py"| Alarm and escalation management
"failsafe_manager.py"| Degraded-mode and fallback handling
"audit_logger.py"| Deterministic event and decision recording
"docs/"| Architecture, validation and research documentation

Modules will be introduced incrementally and validated independently before integration.

---

Vessel Profile Architecture

The prototype will use a configurable vessel profile rather than assuming a particular real vessel.

This allows the simulation to represent different offshore vessel configurations while preserving the same supervisory architecture.

A vessel profile may include simulated parameters such as:

- vessel type
- DP class
- propulsion configuration
- thruster configuration
- thruster count
- nominal thrust
- vessel dimensions
- environmental operating limits
- position-reference configuration
- sensor configuration
- redundancy assumptions

These parameters are simulation inputs only.

If reliable specifications for a particular vessel become available, a separate vessel configuration may be created for research purposes without changing the core supervisory architecture.

No vessel specification will be invented or represented as authoritative without an appropriate source.

---

Environmental Simulation

The environment model will provide controlled disturbances such as:

- wind
- current
- waves
- tidal effects
- environmental instability
- sudden disturbance events
- progressive environmental escalation

The objective is to study how the supervisory architecture responds as environmental stress increases.

---

Simulated Sensor & Position References

The prototype may simulate inputs representing:

- GNSS/GPS position
- gyro heading
- wind sensors
- motion reference inputs
- DP position references
- environmental measurements
- sensor degradation or loss

These are simulated data sources and do not interface with real navigation equipment.

---

Thruster Simulation

The thruster manager represents simulated vessel propulsion response.

It may model:

- thrust commands
- thrust limits
- directional commands
- propulsion degradation
- individual thruster failure
- loss of available thrust
- command-response behaviour

The purpose is to evaluate supervisory decisions rather than reproduce a certified DP control algorithm.

---

Failure & Degraded-Mode Research

The prototype will allow controlled simulation of abnormal conditions including:

- environmental escalation
- sensor degradation
- position-reference loss
- individual thruster failure
- multiple simulated equipment failures
- loss of redundancy
- conflicting supervisory decisions
- communication degradation
- progressive system stress

The objective is to observe how the architecture detects, evaluates, escalates, stabilizes, and records these conditions.

---

Key Research Concept

The central research concept is layered supervisory independence.

Rather than relying exclusively on identical redundant decision paths, the Sextant Protocol explores differentiated supervisory layers that can independently assess system conditions and provide alternative responses.

The research questions include:

- Can independent decision layers reduce correlated decision failure?
- Can a secondary supervisory layer identify conditions missed by the primary layer?
- Can stabilization logic prevent oscillation between competing decisions?
- Can human oversight remain clearly authoritative?
- Can deterministic logging make system decisions reproducible and auditable?

These questions are evaluated through simulation rather than operational deployment.

---

Deterministic Simulation

The prototype is designed around reproducible simulation.

Where practical:

Same scenario + same initial state + same parameters → reproducible system behaviour.

Simulation records will include:

- initial state
- environmental conditions
- sensor state
- system condition
- AI assessments
- risk state
- decisions
- simulated actions
- updated state
- escalation events
- human intervention
- final simulation state

This supports engineering review, debugging, replay, and comparative scenario analysis.

---

Human-in-the-Loop Governance

The architecture deliberately retains human authority.

The AI layers are treated as supervisory decision-support components within the simulation, not autonomous replacements for qualified maritime personnel.

Critical simulated decisions may therefore be:

AI Assessment
      ↓
Recommendation
      ↓
Human Review
      ↓
Accept / Modify / Reject
      ↓
Simulated Action

---

Validation Strategy

Development will follow staged validation:

Stage 1 – Module Validation

Each module is tested independently.

Stage 2 – Interface Validation

Module inputs and outputs are checked for compatibility.

Stage 3 – Scenario Validation

Controlled environmental and equipment scenarios are executed.

Stage 4 – Failure Validation

Failure and degraded-mode scenarios are introduced.

Stage 5 – Decision Validation

Primary AI, Secondary AI, Stabilization, and Human-in-the-Loop behaviour are evaluated.

Stage 6 – Deterministic Replay

Identical scenarios are replayed to verify reproducibility.

Stage 7 – Integrated Prototype

The validated modules are combined into the working simulation prototype.

---
SEXTANT PROTOCOL — DP RESILIENCE SIMULATION RESEARCH PLATFORM

What the Simulator Is

The Sextant Protocol DP Resilience Cockpit is a deterministic maritime research and engineering simulation platform designed to demonstrate and study how a layered resilience architecture could respond to changing environmental and vessel conditions.

The simulator creates a controlled virtual DP environment in which researchers can introduce different environmental conditions, observe system responses, compare resilience states and examine how multiple supervisory layers interact.

The simulated architecture follows:

ENVIRONMENT → PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN-IN-THE-LOOP → SIMULATED DP RESPONSE

The purpose is to make the resilience concept observable, repeatable and testable.

Researchers can use the simulator to examine scenarios such as:

- normal environmental conditions;
- increasing wind, current, wave and tidal loading;
- sudden environmental disturbances;
- current surges;
- heavy sea states;
- wind-gust events;
- combined environmental disturbances;
- simulated sensor degradation;
- partial sensor-loss scenarios;
- rapidly changing environmental conditions.

For each scenario, the deterministic engine processes the simulated inputs and produces a corresponding system assessment.

The cockpit then makes the complete decision pathway visible, including:

Environmental Stress → Risk Classification → Primary Assessment → Independent Secondary Assessment → Stabilizer Arbitration → Human Decision-Support → Simulated Response → Updated Simulated State → Audit Record

This allows the behaviour of the proposed resilience architecture to be examined consistently rather than relying on a static demonstration.

Research Purpose

The simulator is intended to answer an engineering research question:

«Can a layered, independently assessed and human-governed resilience architecture provide earlier recognition, structured escalation and better decision-support during rapidly developing simulated DP disturbances?»

Because the environment is deterministic, the same scenario can be reproduced repeatedly.

This enables researchers and engineers to:

- compare different environmental conditions;
- test predefined resilience thresholds;
- examine primary and secondary assessment behaviour;
- evaluate stabilizer arbitration;
- study operator notification and decision-support;
- analyse simulated response windows;
- investigate degraded and abnormal scenarios;
- record repeatable audit data;
- identify areas requiring further engineering validation.

The simulator therefore functions as a research laboratory for the resilience concept, rather than merely as a visual cockpit.

Engineering Development Path

The present simulator provides the software-level research foundation from which further investigation could proceed.

A future engineering programme could progressively introduce:

Deterministic Simulation → Scenario Validation → Statistical Testing → Hardware-in-the-Loop → Representative Control Hardware → Independent Engineering Verification → Classification Review → Controlled Testing

The simulator allows these questions to be investigated before the considerable cost and risk associated with hardware or vessel-level testing.

Human-in-the-Loop Principle

A fundamental principle of the Sextant Protocol research architecture is that human authority remains final.

The simulator can identify conditions, generate assessments, compare resilience states and provide simulated decision-support. It does not independently exercise operational authority.

The human operator remains responsible for interpreting the simulated information and, within the research environment, remains the final decision authority.

Research Boundary

The simulator is deliberately separated from operational maritime control.

It exists for:

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS • VALIDATION

All environmental conditions, vessel behaviour, AI assessments, stabilizer decisions, operator notifications and DP responses are generated within the simulated environment.

The simulator does not constitute certified marine control software and is not intended to replace:

- a qualified DP operator;
- certified DP equipment;
- class-approved safety systems;
- vessel automation systems;
- operational navigation systems; or
- established vessel operating procedures.

No operational vessel command is generated or transmitted by the simulator.

Core Research Proposition

The significance of the Sextant Protocol DP Resilience Cockpit is therefore not that it controls a vessel.

Its purpose is to provide a controlled, deterministic and auditable environment in which a proposed resilience architecture can be demonstrated, challenged, measured and independently evaluated.

The ultimate research question is whether the principles demonstrated in simulation merit progression toward formal engineering research, hardware-in-the-loop testing and independent maritime technical evaluation.
Research Boundary

This project does not:

- connect to industrial DP systems
- control real vessels
- modify certified marine software
- provide certified DP functionality
- replace a vessel's DP operator
- replace class-approved safety systems
- provide operational navigation advice

The system exists for research, simulation, education, and engineering analysis.

---

Repository Development Model

The "main" branch is maintained as the stable reference baseline.

Experimental development should use separate branches.

Recommended workflow:

main
 │
 └── develop
       │
       ├── feature/stabilizer
       ├── feature/environment-model
       ├── feature/vessel-profile
       ├── feature/sensor-manager
       └── feature/thruster-simulation

Validated modules may subsequently be incorporated into a versioned release.

This preserves:

- architectural traceability
- reproducibility
- baseline integrity
- experimental isolation
- research history

---

Versioning

The current reference baseline is v1.0.

Future releases may follow:

- "v1.1" — validated modular prototype
- "v1.2" — expanded simulation capability
- "v2.0" — major architectural evolution

Experimental development remains separate from frozen reference releases.

---

Continuous Integration

GitHub Actions are used to support automated validation of repository integrity and simulation execution.

As additional modules are introduced, automated tests will be expanded to cover:

- module execution
- interface compatibility
- scenario behaviour
- failure handling
- deterministic replay
- regression detection

---

Related Sextant Research

The DP project forms part of the wider Sextant Protocol research ecosystem.

Related repositories include:

- "sextant-resilience-operations-console"
- "sextant-orbital-resilience-framework"
- "sextant-rule-library"
- "sextant-protocol-official-index"
- "spd-captain-ai-lena-autonomous-agent-core"

The wider ecosystem explores resilience, supervisory decision architecture, simulation, governance, observability, and autonomous-system research across multiple domains.

---

Future Research

Planned research directions include:

- explainable AI decision support
- advanced environmental modelling
- digital-twin integration
- vessel-specific simulation profiles
- sensor failure modelling
- propulsion degradation modelling
- multi-failure scenarios
- human-AI collaborative governance
- deterministic replay and forensic analysis
- cross-domain resilience architecture

---

Author

Don Herman Oswald Weerasekera

Independent maritime researcher and engineering developer.

Professional background includes:

- Master Mariner (Foreign Going)
- Offshore maritime operations
- Dynamic Positioning operational experience
- Diploma in Transport — RMIT University, Australia

AI-assisted research and development with Captain AI Lena.

---

Research Disclaimer

This repository presents an independent engineering research prototype exploring supervisory architectures for Dynamic Positioning resilience.

It is intended for simulation, research, engineering discussion, and educational purposes.

It is not certified marine control software and must not be connected to operational vessel DP, propulsion, navigation, or safety systems.

Any vessel configurations used within the project are simulation models unless explicitly identified as sourced technical information.

---

Licence

MIT License.
