Scenario Testing and Validation

8.1 Purpose

The purpose of scenario testing is to determine whether the Sextant Protocol™ DP Resilience Research Simulator behaves consistently, predictably and usefully when subjected to controlled changes in simulated maritime conditions.

The simulator is not considered validated merely because individual scenarios produce plausible outputs.

A meaningful research programme must determine:

- whether the architecture behaves deterministically;
- whether defined conditions produce expected state transitions;
- whether escalation occurs at appropriate simulated thresholds;
- whether the Stabilizer controls the progression of simulated cascading conditions;
- whether operator recommendations are generated consistently;
- whether recovery is recognised appropriately;
- and whether failure conditions are handled safely within the simulation.

The objective is therefore to move from:

DEMONSTRATION

to:

REPEATABLE EXPERIMENT

and ultimately toward:

INDEPENDENT VALIDATION.

---

8.2 Validation Philosophy

The Sextant Protocol™ validation philosophy is based on five principles:

1. Repeatability
2. Determinism
3. Traceability
4. Fault Injection
5. Independent Review

A scenario should be capable of being executed repeatedly using the same defined inputs.

The resulting outputs should be recorded and compared.

Unexpected behaviour should be treated as research evidence rather than hidden.

---

8.3 Scenario Definition

Each scenario should have a unique identifier and a defined initial state.

A scenario definition should include:

- scenario ID;
- environmental inputs;
- vessel parameters;
- sensor state;
- initial resilience state;
- Primary AI configuration;
- Secondary AI configuration;
- Stabilizer configuration;
- expected state transitions;
- expected operator guidance;
- expected human decision gate; and
- termination condition.

An example scenario definition is:

Scenario ID: DP-CURRENT-001
Scenario: CURRENT_SURGE

Wind Stress: Defined
Current Stress: Increasing
Wave Stress: Defined
Tidal Stress: Defined

Initial State: NORMAL

Expected Behaviour:
NORMAL
→ PREVENTIVE MONITORING
→ ELEVATED MONITORING

Human Authority: FINAL

Operational Command: FALSE
Real Vessel Connection: FALSE

---

8.4 Baseline Testing

Before testing abnormal conditions, the simulator should establish a baseline.

Baseline scenarios should include:

NORMAL

All environmental parameters within the defined normal range.

Expected result:

NORMAL MONITORING

No unnecessary escalation should occur.

The baseline provides a reference against which more severe scenarios can be compared.

---

8.5 Progressive Environmental Testing

Environmental variables should be increased progressively.

For example:

CURRENT STRESS

20

→

30

→

40

→

50

→

60

→

70

→

80

→

90

→

100

At each step the simulator should record:

- environmental stress;
- risk classification;
- S1 output;
- S2 output;
- Stabilizer output;
- resilience state;
- operator guidance; and
- human decision gate.

This creates a measurable response curve.

---

8.6 Single-Domain Testing

The first stage should test individual environmental variables independently.

Wind Test

Increase wind stress while keeping other variables controlled.

Current Test

Increase current stress while keeping wind, wave and tidal stress controlled.

Wave Test

Increase wave stress while maintaining other inputs.

Tidal Test

Increase tidal stress independently.

The purpose is to determine whether each input behaves predictably.

---

8.7 Combined Environmental Testing

The next stage should introduce multiple environmental stresses.

Examples include:

WIND + CURRENT

WIND + WAVE

CURRENT + WAVE

CURRENT + TIDE

WIND + CURRENT + WAVE

and:

COMBINED EXTREME CONDITIONS

The objective is to investigate whether the resilience architecture responds appropriately when several stressors interact.

---

8.8 Rate-of-Change Testing

Magnitude alone may not be sufficient to describe a developing condition.

A rapidly changing environmental parameter may require different decision-support from a slowly changing parameter with the same final value.

The simulator should therefore test:

LOW RATE OF CHANGE

versus:

HIGH RATE OF CHANGE

For example:

Scenario A:
Current Stress
40 → 45 → 50 → 55 → 60

Scenario B:
Current Stress
40 → 60

The research question is whether the Stabilizer can distinguish between gradual development and rapid deterioration.

---

8.9 Cascade Testing

Cascade testing is central to the research programme.

A cascade scenario should introduce sequential deterioration.

Example:

CURRENT INCREASE

↓

THRUSTER DEMAND INCREASE

↓

SIMULATED POWER DEMAND INCREASE

↓

REDUCED RESILIENCE MARGIN

↓

ELEVATED OPERATOR ATTENTION

↓

FURTHER ENVIRONMENTAL DETERIORATION

The research objective is to determine whether the Stabilizer identifies and contains the developing condition before the simulated system reaches a defined critical state.

---

8.10 Cascade Containment Metric

A specific research metric should be developed:

Cascade Containment Lead Time

This represents the time between:

first meaningful deterioration

and:

defined simulated critical condition.

The research question becomes:

«Did the Stabilizer provide a meaningful decision-support state before the simulated cascade reached the critical threshold?»

The result should be recorded numerically where the simulation permits.

---

8.11 Early-Warning Testing

Early-warning scenarios should deliberately create conditions where the system is elevated but not critical.

The expected behaviour is:

ELEVATED CONDITION

→

PREVENTIVE MONITORING

→

OPERATOR ATTENTION

rather than immediate emergency escalation.

The purpose is to determine whether the system can provide useful preparation time without generating excessive escalation.

---

8.12 False Positive Testing

The system should also be tested against conditions that initially appear concerning but subsequently recover.

Example:

CURRENT STRESS

40

→

60

→

70

→

50

→

35

The research question is:

«Does the system escalate appropriately and subsequently recognise recovery?»

Excessive escalation during transient conditions may reduce the usefulness of a decision-support system.

---

8.13 False Negative Testing

Scenarios should also be designed in which deterioration occurs but an assessment layer fails to identify it.

For example:

S1 = NORMAL

while:

S2 = HIGH CONCERN

The Stabilizer should be tested to determine whether the disagreement itself produces an appropriate response.

This provides an important test of the independent-assessment concept.

---

8.14 AI Disagreement Testing

The simulator should deliberately create assessment disagreement.

Examples include:

S1: NORMAL
S2: ELEVATED

S1: ELEVATED
S2: HIGH

S1: HIGH
S2: NORMAL

Each condition should produce a deterministic and auditable Stabilizer response.

The system should not simply ignore the disagreement.

---

8.15 Sensor Fault Testing

Future testing should inject simulated sensor abnormalities.

Examples include:

- GNSS degradation;
- gyro disagreement;
- environmental sensor failure;
- invalid data;
- stale data;
- intermittent data;
- conflicting sensor values;
- and loss of sensor confidence.

The research objective is to determine whether the architecture appropriately recognises reduced data integrity.

---

8.16 Navigation Degradation Testing

Navigation confidence should also be varied.

Example progression:

HIGH

→

MEDIUM

→

LOW

→

UNAVAILABLE

The simulator should determine whether the resilience state changes appropriately.

The resulting operator guidance should identify the underlying condition rather than merely reporting a generic alarm.

---

8.17 Simulated Thruster Degradation

Future scenarios should include controlled degradation of simulated propulsion capability.

For example:

100% capability

→

80%

→

60%

→

40%

→

20%

The research objective is to investigate how reduced simulated thrust margin interacts with environmental stress.

This can help test whether the architecture recognises combined conditions rather than evaluating each variable independently.

---

8.18 Simulated Power Degradation

A corresponding test should be performed on simulated power availability.

Potential scenarios include:

- generator degradation;
- reduced reserve;
- partial loss;
- increasing demand;
- simulated power imbalance;
- and recovery.

Combined testing can then examine:

ENVIRONMENTAL STRESS + POWER DEGRADATION + THRUSTER DEMAND

as a compound resilience scenario.

---

8.19 Recovery Testing

A resilience architecture must demonstrate recovery behaviour.

A scenario should therefore move from:

HIGH STRESS

toward:

LOWER STRESS

and determine whether the system:

- recognises improvement;
- avoids premature recovery;
- confirms stable conditions;
- reduces operator alert level appropriately;
- and records the transition.

The research sequence becomes:

DETECT → ESCALATE → STABILIZE → RECOVER → VERIFY

---

8.20 Repeated-Run Testing

Every important scenario should be executed repeatedly.

For example:

Scenario DP-CURRENT-001

Run 1

Run 2

Run 3

...

Run 100

The resulting outputs should be compared.

For deterministic scenarios:

Input(n) = Input(n+1)

should produce:

Output(n) = Output(n+1)

unless an explicitly modelled state variable is intentionally changed.

---

8.21 Regression Testing

Every software modification should trigger regression testing.

Previously validated scenarios should be rerun after:

- engine changes;
- Stabilizer changes;
- threshold changes;
- UI changes affecting logic;
- AI logic changes;
- audit-log changes;
- scenario changes; and
- architecture changes.

A research system should not assume that an improvement in one scenario has no effect elsewhere.

---

8.22 Automated Testing

Future development should include an automated test suite.

Potential tests include:

TEST-001  Normal state
TEST-002  Moderate environmental stress
TEST-003  Heavy weather
TEST-004  Current surge
TEST-005  Wind gust
TEST-006  Combined environmental stress
TEST-007  S1/S2 agreement
TEST-008  S1/S2 disagreement
TEST-009  S1 failure
TEST-010  S2 failure
TEST-011  Sensor degradation
TEST-012  Navigation degradation
TEST-013  Thruster degradation
TEST-014  Power degradation
TEST-015  Cascade escalation
TEST-016  Cascade containment
TEST-017  Recovery
TEST-018  Stabilizer failure
TEST-019  Audit integrity
TEST-020  Human decision gate

Each test should have:

INPUT

EXPECTED OUTPUT

ACTUAL OUTPUT

PASS / FAIL

---

8.23 Audit Validation

The audit system itself should be tested.

The research team should verify that every important state transition produces a corresponding event.

For example:

Scenario Selected

→ audit event

S1 Assessment

→ audit event

S2 Assessment

→ audit event

Stabilizer Transition

→ audit event

Operator Recommendation

→ audit event

Human Decision

→ audit event

Simulated Response

→ audit event

This establishes traceability.

---

8.24 Human-Factors Validation

Technical correctness alone is insufficient.

The simulator should also be evaluated by qualified operators and maritime professionals.

Research participants could be asked to evaluate:

- clarity;
- workload;
- alert quality;
- recommendation usefulness;
- information prioritisation;
- timing;
- ambiguity;
- confidence;
- and decision-making support.

Potential measures include:

- response time;
- decision accuracy;
- missed warnings;
- unnecessary interventions;
- workload rating;
- and user comprehension.

The purpose is to determine whether the resilience layer helps the operator rather than simply generating additional information.

---

8.25 Independent Engineering Review

Independent review should form a later stage of validation.

Reviewers should be able to inspect:

- architecture;
- algorithms;
- scenario definitions;
- thresholds;
- test results;
- event logs;
- failure behaviour;
- assumptions;
- limitations;
- and source code where appropriate.

The purpose is not merely to obtain endorsement.

Independent review should be capable of identifying weaknesses.

---

8.26 Hardware-in-the-Loop

A future research stage may introduce Hardware-in-the-Loop (HIL) testing.

A controlled HIL environment could allow the resilience architecture to interact with representative simulated systems without connecting to an operational vessel.

Potential components include:

- simulated DP controller;
- propulsion model;
- power-management model;
- navigation model;
- sensor simulation;
- environmental model; and
- resilience engine.

The boundary between simulation and operational equipment must remain strictly controlled.

---

8.27 Digital-Twin Research

A later stage could investigate a higher-fidelity vessel model.

A digital-twin-style research environment could incorporate:

- vessel hydrodynamics;
- propulsion characteristics;
- thruster response;
- power architecture;
- environmental forces;
- position-reference behaviour;
- sensor characteristics;
- and operational scenarios.

This would provide a more realistic experimental environment while maintaining isolation from real vessel control.

---

8.28 Classification and Regulatory Review

The Sextant Protocol™ research simulator is not presently certified marine control software.

Any future operational application would require engagement with appropriate technical and regulatory bodies.

Potential areas for review could include:

- DP system integration;
- functional safety;
- software assurance;
- cybersecurity;
- human factors;
- redundancy;
- independence;
- failure modes;
- testing;
- verification and validation;
- and applicable classification requirements.

The purpose of early engagement is to determine what evidence would be required before any operational deployment could be considered.

---

8.29 Research Acceptance Criteria

Before claiming that the resilience hypothesis has been supported, the research programme should define acceptance criteria.

Potential criteria include:

1. Deterministic scenarios produce repeatable outputs.
2. State transitions occur according to documented rules.
3. Assessment disagreement is explicitly handled.
4. Escalation is traceable.
5. Recovery is traceable.
6. Critical simulated conditions are identified before defined thresholds where the model permits.
7. Operator guidance is presented within the required research response window.
8. Audit records are complete.
9. Failure of a resilience component does not create operational control.
10. Independent reviewers can reproduce the principal results.

These criteria should be refined before formal validation.

---

8.30 Falsifiability

The Sextant Protocol™ research proposition should be falsifiable.

The architecture should be considered unsuccessful for a particular research objective if controlled testing demonstrates that it:

- consistently misses defined simulated deteriorations;
- produces excessive false escalations;
- creates unstable state oscillations;
- produces inconsistent results from identical inputs;
- obscures assessment disagreement;
- provides no measurable decision-support improvement;
- or increases operator workload without corresponding benefit.

A research architecture gains credibility when its developers are willing to define how it could fail.

---

8.31 Validation Roadmap

A proposed validation progression is:

Stage 1 — Software Unit Testing

↓

Stage 2 — Deterministic Scenario Testing

↓

Stage 3 — Fault Injection

↓

Stage 4 — Automated Regression Testing

↓

Stage 5 — Human-Factors Evaluation

↓

Stage 6 — Independent Engineering Review

↓

Stage 7 — Hardware-in-the-Loop

↓

Stage 8 — Higher-Fidelity Vessel Simulation

↓

Stage 9 — Classification / Regulatory Assessment

Only after appropriate evidence has been generated should any consideration be given to controlled operational trials.

---

8.32 Summary

The Sextant Protocol™ DP Resilience Research Simulator is intended to be tested rather than merely demonstrated.

The proposed validation programme examines:

NORMAL CONDITIONS

→

ENVIRONMENTAL DETERIORATION

→

ASSESSMENT

→

ARBITRATION

→

CASCADE CONTAINMENT

→

HUMAN DECISION

→

SIMULATED RESPONSE

→

RECOVERY

The central research objective is to determine whether the Stabilizer can provide measurable early recognition and structured decision-support before a simulated cascading condition reaches a defined critical state.

The result should be established through repeatable experiments, transparent metrics and independent review.

SEXTANT PROTOCOL™

DEMONSTRATE → TEST → CHALLENGE → MEASURE → INDEPENDENTLY REVIEW

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS