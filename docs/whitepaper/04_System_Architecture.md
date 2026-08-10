System Architecture

4.1 Overview

The Sextant Protocol™ DP Resilience Research Simulator is based on a layered architecture designed to separate environmental observation, independent assessment, resilience arbitration, human decision-making and simulated response.

The principal research architecture is:

ENVIRONMENT → PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN AUTHORITY → SIMULATED DP RESPONSE

The architecture is deliberately structured so that no individual analytical component possesses final operational authority.

The current prototype is a simulation-only system.

Its purpose is to investigate whether the separation of assessment, arbitration and authority can provide a more structured approach to resilience decision-support during changing simulated maritime conditions.

---

4.2 Architectural Layers

The principal layers are:

1. Environmental Simulation
2. Primary AI Assessment
3. Secondary AI Safety Assessment
4. Deterministic Stabilizer
5. Human Decision Authority
6. Simulated DP Response
7. Audit and Memory

Each layer has a defined role and boundary.

---

4.3 Environmental Simulation Layer

The Environmental Simulation Layer provides the controlled conditions under which the research architecture operates.

The current simulator provides four principal environmental stress inputs:

Parameter| Range
Wind Stress| 0–100
Current Stress| 0–100
Wave Stress| 0–100
Tidal Stress| 0–100

These inputs can be combined into controlled scenarios.

Available scenario categories include:

- NORMAL
- MODERATE
- HEAVY WEATHER
- CRITICAL CURRENT
- SURGE
- HEAVY SEA
- WIND GUST
- COMBINED
- RANDOM

The simulator converts these inputs into a deterministic environmental stress assessment.

The environmental layer is therefore repeatable and controllable, allowing identical scenarios to be executed multiple times for comparison.

---

4.4 Simulated Vessel Layer

The current research vessel profile is:

Name: SEXTANT-MPSV-01

Type: Multi-Purpose Support Vessel

DP Classification: DP2-SIMULATED

Length: 85 m

Beam: 20 m

Draft: 6 m

Main Thrusters: 2

Tunnel Thrusters: 2

Total Thrusters: 4

Nominal Simulated Thrust: 100 units

These parameters represent a simplified research model.

They are not intended to reproduce the complete hydrodynamic, propulsion, power-management or DP control characteristics of a real vessel.

The model provides a consistent reference platform for resilience simulation.

---

4.5 Navigation and Sensor Awareness

The simulator includes a simulated navigation and sensor-awareness layer.

The current cockpit can represent:

- position reference;
- heading;
- position error;
- GNSS / position sensor state;
- gyro / heading sensor state;
- environmental sensor state;
- sensor integrity; and
- navigation confidence.

Example simulated state:

Position Error: 6.13 m

GNSS / Position Sensor: NORMAL — SIMULATED

Gyro / Heading Sensor: NORMAL — SIMULATED

Environmental Sensors: NORMAL — SIMULATED

Sensor Integrity: HIGH

Navigation Confidence: HIGH

Data Source: SIMULATION ENGINE

These values are simulation representations.

They are not live navigational measurements and do not represent a certified navigation solution.

---

4.6 Primary AI Layer

The Primary AI represents the principal simulated analytical pathway.

Its role is to evaluate the simulated environmental and system state and produce a resilience assessment.

The Primary AI may identify states such as:

- NORMAL CONTROL;
- ELEVATED CONTROL;
- HIGH CONTROL;
- or other research-defined assessment states.

The Primary AI is not granted final authority.

Its output is one input to the resilience-arbitration process.

This separation is important because the research architecture does not assume that one analytical pathway should determine the final resilience state independently.

---

4.7 Secondary AI Layer

The Secondary AI provides an independent safety-oriented assessment.

Its purpose is to create a second analytical perspective that can be compared with the Primary AI assessment.

The Secondary AI may identify conditions such as:

INDEPENDENT SAFETY ADVISORY

The two pathways therefore provide:

S1 — Primary Assessment

and

S2 — Independent Safety Assessment

These outputs are subsequently evaluated by the Stabilizer.

---

4.8 Independence Principle

The architecture deliberately separates the two assessment pathways from the Stabilizer.

Conceptually:

S1 ≠ FINAL DECISION

S2 ≠ FINAL DECISION

Instead:

S1 + S2 → STABILIZER → HUMAN DECISION SUPPORT

This provides an opportunity to study how independent assessments behave under:

- agreement;
- disagreement;
- rapidly changing environmental conditions;
- increasing stress;
- sensor anomalies;
- simulated degradation; and
- compound scenarios.

The purpose is not to assume that two analytical pathways are automatically safer.

Their value must be demonstrated through testing.

---

4.9 Deterministic Stabilizer Layer

The Stabilizer is the central arbitration component.

Its purpose is to evaluate the available assessment outputs and determine a structured resilience state.

The Stabilizer may produce states such as:

- NORMAL;
- PREVENTIVE MONITORING;
- ELEVATED MONITORING;
- HIGH ALERT;
- or other research-defined states.

The Stabilizer can also generate a resilience score and risk classification according to the deterministic rules implemented in the simulator.

The central principle is:

«The Stabilizer manages the transition between assessments and operator decision-support; it does not possess operational command authority.»

---

4.10 Resilience Arbitration

The Stabilizer receives information from the environmental and analytical layers.

A simplified representation is:

Environmental State

↓

Primary AI Assessment

+ 

Secondary AI Assessment

↓

Deterministic Stabilizer

↓

Resilience State

↓

Operator Decision-Support

The Stabilizer therefore provides a single structured resilience output from multiple simulated inputs.

This is particularly relevant to the research objective of examining potential cascading conditions.

Instead of allowing every change to produce an isolated response, the architecture provides a common arbitration point.

---

4.11 Human Decision Authority

The Human Decision Authority layer is the final authority within the current research architecture.

The cockpit explicitly records:

HUMAN AUTHORITY — FINAL AUTHORITY

The system may recommend:

- maintain simulated DP;
- increase monitoring;
- review simulated system demand;
- verify sensor consistency;
- prepare contingency procedures;
- request additional diagnostics;
- escalate;
- or other research-defined actions.

The human operator remains responsible for determining what action, if any, would be appropriate within the simulation.

No autonomous operational command is issued.

---

4.12 Simulated DP Response

The final layer represents the simulated response following human consideration.

The response may include conceptual states such as:

- maintain DP;
- increase monitoring;
- prepare contingency;
- controlled simulated escalation;
- simulated recovery;
- or simulated safe-state transition.

The response layer is deliberately isolated from real vessel control.

No actual thruster, propulsion, steering or DP command is generated.

The simulation therefore permits researchers to examine the consequences of a proposed decision without placing an operational vessel at risk.

---

4.13 Audit and Event Recording

Traceability is a core component of the research architecture.

The simulator records system events including:

- scenario selection;
- environmental stress;
- Primary AI state;
- Secondary AI state;
- Stabilizer state;
- human authority state;
- simulated response;
- autonomous command status;
- operational authority status;
- vessel connection status; and
- timestamps.

A representative audit record is:

Engine: DPSimulationEngine
Mode: SIMULATION ONLY
Environmental Stress: 62.25
Risk: MEDIUM
S1 Primary AI: ELEVATED CONTROL
S2 Secondary AI: INDEPENDENT SAFETY ADVISORY
Stabilizer: PREVENTIVE ARBITRATION
Human Authority: FINAL
Human Decision Gate: FINAL HUMAN AUTHORITY
Autonomous Command: FALSE
Operational Authority: FALSE
Real Vessel Connection: FALSE

This provides a traceable representation of the simulated decision pathway.

---

4.14 Architecture Safety Boundary

The current architecture maintains a strict boundary between research simulation and operational vessel control.

The prototype must not be connected to:

- Dynamic Positioning systems;
- propulsion systems;
- steering systems;
- navigation systems;
- safety systems;
- vessel automation systems;
- operational vessel networks.

The simulator is not certified marine control software.

It does not provide certified DP functionality.

---

4.15 Architectural Principle

The central architectural principle can be summarised as:

Observe → Assess → Independently Assess → Arbitrate → Inform → Decide → Simulate → Record

This creates a controlled decision-support loop.

The architecture is therefore intended to investigate resilience as a process rather than simply as a final system state.

The research proposition is that early recognition and structured arbitration may provide an opportunity for human intervention before a simulated condition develops into a cascading event.

This proposition remains subject to systematic validation.

---

4.16 Future Architectural Development

Future research may extend the architecture with:

- additional independent analytical agents;
- power-system resilience modelling;
- thruster degradation modelling;
- sensor fault injection;
- position-reference degradation;
- communication-loss scenarios;
- weather-transition modelling;
- human-factors measurements;
- hardware-in-the-loop interfaces;
- digital-twin representations;
- formal verification;
- cybersecurity testing; and
- bounded autonomous decision-support.

Any future autonomous capability would require separate safety analysis, validation and clearly defined authority boundaries.

The current system remains:

SIMULATION ONLY

HUMAN AUTHORITY FINAL

NO OPERATIONAL CONTROL

---

4.17 Summary

The Sextant Protocol™ architecture separates assessment from authority.

The Primary AI and Secondary AI provide independent simulated assessments.

The Stabilizer provides deterministic resilience arbitration.

The Human Decision Authority provides the final decision point.

The simulated DP response provides a controlled environment in which the consequences of decisions can be examined without connecting to an operational vessel.

This layered structure forms the foundation for the subsequent analysis of the Stabilizer and its role in preventing simulated cascading conditions.

SEXTANT PROTOCOL™

ENVIRONMENT → PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN AUTHORITY → SIMULATED RESPONSE

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS