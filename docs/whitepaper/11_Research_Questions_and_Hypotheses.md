Research Questions and Hypotheses

11.1 Purpose

The Sextant Protocol™ DP Resilience Research Simulator has been developed to investigate whether a layered resilience architecture can provide measurable benefits in the recognition, arbitration and communication of developing simulated maritime conditions.

The project does not assume that the proposed architecture is effective.

Instead, the architecture is presented as a testable research proposition.

The purpose of this chapter is to define the questions, hypotheses and measurable variables required to evaluate that proposition.

---

11.2 Central Research Question

The principal research question is:

«Can a layered deterministic resilience architecture provide earlier recognition, structured escalation and improved human decision-support during rapidly changing simulated maritime conditions?»

The question is intentionally limited to the research environment.

It does not claim that the architecture is suitable for operational DP control.

---

11.3 Secondary Research Questions

The research programme proposes the following secondary questions.

RQ1 — Early Recognition

Can the resilience architecture identify a developing simulated deterioration before a predefined critical state is reached?

RQ2 — Cascade Containment

Can deterministic Stabilizer arbitration reduce or delay the progression of a simulated cascading condition?

RQ3 — Assessment Independence

Does independent Primary and Secondary assessment improve the identification of disagreement or uncertainty?

RQ4 — Operator Decision-Support

Does structured resilience guidance improve operator recognition and response compared with presentation of isolated simulated conditions?

RQ5 — Determinism

Do identical simulation inputs produce repeatable assessment and arbitration outcomes?

RQ6 — False Alerts

Can the architecture provide early warnings without producing excessive false-positive escalation?

RQ7 — Recovery

Can the architecture recognise and communicate recovery after simulated deterioration?

RQ8 — Fault Tolerance

How does the architecture behave when one or more assessment inputs become degraded, unavailable or inconsistent?

RQ9 — Human Factors

Does the additional resilience layer improve decision-support without creating unacceptable workload or automation bias?

RQ10 — Generalisation

Can the underlying resilience architecture be represented consistently across different safety-critical research domains?

---

11.4 Primary Hypothesis

The primary research hypothesis is:

«H1: A layered resilience architecture using independent assessment and deterministic arbitration can provide earlier and more structured recognition of simulated multi-factor deterioration than a baseline assessment configuration.»

This hypothesis must be experimentally tested.

---

11.5 Null Hypothesis

The corresponding null hypothesis is:

«H0: The layered resilience architecture does not provide a statistically or practically meaningful improvement in recognition, escalation or decision-support compared with the defined baseline configuration.»

The project should remain open to H0 being supported.

---

11.6 Cascade Hypothesis

A secondary hypothesis is:

«H2: Deterministic Stabilizer arbitration can identify and contain a simulated cascading condition before the model reaches a predefined critical state, subject to the limitations of the simulation model.»

This hypothesis does not claim prevention of physical vessel failure.

It concerns the simulated decision-support cascade.

---

11.7 Independent Assessment Hypothesis

A further hypothesis is:

«H3: Independent assessment by S1 and S2 can identify disagreement states that may not be visible when relying on a single assessment pathway.»

Testing should include deliberately conflicting assessment inputs.

---

11.8 Operator Guidance Hypothesis

Another hypothesis is:

«H4: Structured operator guidance can reduce the time required for a participant to identify the principal simulated resilience concern and select an appropriate response.»

This should be evaluated using controlled human-factors experiments.

---

11.9 Determinism Hypothesis

The simulator should satisfy:

«H5: Identical initial conditions and identical scenario inputs produce identical deterministic assessment and arbitration outputs.»

Where intentional state variables are introduced, those variables must be explicitly recorded.

---

11.10 Recovery Hypothesis

A recovery hypothesis is:

«H6: The resilience architecture can recognise a transition from deterioration toward stable conditions and provide an appropriate reduction in simulated alert state without premature recovery.»

Recovery testing should therefore be treated as important as escalation testing.

---

11.11 Fault-Tolerance Hypothesis

The project should also investigate:

«H7: The resilience architecture can identify degradation or loss of an assessment component without incorrectly interpreting the remaining assessment as complete operational certainty.»

This is particularly important where multiple analytical layers are used.

---

11.12 Human-Factors Hypothesis

The human-factors proposition is:

«H8: Structured resilience information can improve operator awareness without causing unacceptable increases in workload, confusion or automation bias.»

This requires human participant testing rather than software testing alone.

---

11.13 Research Variables

The research programme should distinguish between independent and dependent variables.

Independent Variables

Potential independent variables include:

- wind stress;
- current stress;
- wave stress;
- tidal stress;
- rate of environmental change;
- sensor integrity;
- navigation confidence;
- simulated power margin;
- simulated thruster capability;
- S1 assessment;
- S2 assessment;
- and fault conditions.

Dependent Variables

Potential dependent variables include:

- resilience state;
- risk classification;
- Stabilizer output;
- escalation level;
- operator recommendation;
- recognition time;
- decision time;
- response accuracy;
- false-positive rate;
- false-negative rate;
- cascade containment lead time;
- recovery recognition time;
- and workload.

---

11.14 Control Conditions

Research credibility requires comparison against a baseline.

Possible baseline configurations include:

Baseline A

Environmental simulation without the Sextant resilience layer.

Baseline B

Single assessment pathway without S2.

Baseline C

S1 + S2 without deterministic Stabilizer arbitration.

Experimental Condition

S1 + S2 + Stabilizer + structured operator guidance.

This enables researchers to determine which architectural components contribute to observed effects.

---

11.15 Ablation Testing

Ablation testing should remove individual architectural components while holding other variables constant.

Examples include:

S1 ONLY

versus:

S1 + S2

versus:

S1 + S2 + STABILIZER

versus:

S1 + S2 + STABILIZER + OPERATOR GUIDANCE

This can help determine whether each layer contributes measurable value.

---

11.16 Recognition-Time Metric

A central metric should be:

Recognition Time

defined as the interval between:

defined onset of meaningful deterioration

and:

first valid elevated resilience recognition.

The exact onset condition must be formally defined for each scenario.

---

11.17 Cascade Containment Lead Time

A second metric should be:

Cascade Containment Lead Time

defined as the interval between:

first defined cascade indicator

and:

defined critical simulated condition.

The research question is whether the resilience architecture increases the available decision-support window.

---

11.18 Operator Response Time

Where human testing is conducted:

Operator Response Time

may be defined as:

first presentation of a defined condition

to:

operator selection of an appropriate response.

The definition should be established before testing.

---

11.19 Decision Accuracy

Decision accuracy should measure whether the operator correctly identifies the principal simulated condition and selects the response expected under the experimental protocol.

This metric must not be interpreted as proof of operational competence.

It is a research measure.

---

11.20 False-Positive Rate

The false-positive rate should measure how frequently the system escalates conditions that do not subsequently meet the defined deterioration criteria.

A high false-positive rate may indicate:

- overly sensitive thresholds;
- unstable arbitration;
- poor scenario design;
- or excessive warning behaviour.

---

11.21 False-Negative Rate

The false-negative rate should measure how frequently the system fails to provide an appropriate warning when the scenario reaches the predefined deterioration condition.

This metric is particularly important for safety-oriented research.

---

11.22 Alert Stability

A resilience system should avoid unnecessary oscillation.

The research should therefore measure:

State Oscillation Frequency

For example:

NORMAL
→ ELEVATED
→ NORMAL
→ ELEVATED
→ NORMAL

If such transitions occur without meaningful changes in the underlying scenario, the architecture may require refinement.

---

11.23 Assessment Agreement

The research should record the relationship between S1 and S2.

Possible states include:

AGREEMENT

MINOR DISAGREEMENT

SIGNIFICANT DISAGREEMENT

LOSS OF ASSESSMENT

The Stabilizer response to each condition should be deterministic and auditable.

---

11.24 Confidence and Uncertainty

Future versions should investigate explicit confidence representation.

For example:

S1 Assessment: ELEVATED
Confidence: HIGH

S2 Assessment: NORMAL
Confidence: LOW

The research question is whether confidence information improves arbitration and operator understanding.

Confidence must not be treated as equivalent to correctness.

---

11.25 Environmental Rate-of-Change

Two scenarios may have identical final environmental stress but different rates of change.

For example:

Scenario A

40 → 45 → 50 → 55 → 60

Scenario B

40 → 60

The final state is identical.

The temporal behaviour is not.

Testing these conditions can determine whether the architecture responds appropriately to rapid deterioration.

---

11.26 Multi-Factor Stress

A central research area is combined stress.

For example:

Environmental Stress       HIGH
Power Margin               REDUCED
Thruster Capability        REDUCED
Sensor Integrity           MEDIUM
Navigation Confidence      MEDIUM

The architecture should be evaluated against the combined condition rather than only individual variables.

---

11.27 Research Data Structure

Each experimental run should produce a structured record.

A proposed schema is:

Run ID
Scenario ID
Timestamp
Environmental Inputs
Vessel State
Sensor State
S1 Assessment
S2 Assessment
Assessment Agreement
Stabilizer State
Resilience State
Operator Recommendation
Human Decision
Simulated Response
Recovery State
Execution Status
Audit Record

This allows subsequent analysis without relying solely on screenshots or manual observations.

---

11.28 Reproducibility Requirement

Every published experimental result should identify:

- software version;
- scenario version;
- configuration;
- threshold set;
- input values;
- initial state;
- and test procedure.

Where practical, the research repository should preserve the scenario definition and test data.

This allows independent researchers to reproduce the experiment.

---

11.29 Statistical Evaluation

Where sufficient repeated trials are available, statistical analysis should be used.

Potential comparisons include:

- recognition time;
- response time;
- decision accuracy;
- false-positive rate;
- false-negative rate;
- workload;
- and cascade containment lead time.

The appropriate statistical method should be selected according to the experimental design and data distribution.

The project should avoid presenting small demonstration samples as statistically conclusive.

---

11.30 Practical Significance

Statistical significance alone should not determine whether the architecture is useful.

A difference should also be evaluated for practical significance.

For example:

«If the system recognises a simulated deterioration 0.1 seconds earlier but substantially increases operator workload, the result may have little practical value.»

Conversely:

«If structured guidance provides a meaningful increase in decision-support time without materially increasing workload, the result may justify further research.»

---

11.31 Independent Replication

The strongest future evidence would come from independent replication.

An external research group should ideally be able to:

1. obtain the scenario definition;
2. understand the architecture;
3. reproduce the test;
4. inspect the outputs;
5. compare results;
6. identify limitations; and
7. publish independent findings.

The project should therefore favour transparent documentation over proprietary claims where possible.

---

11.32 Falsification Criteria

The architecture should be considered unsuccessful for a particular hypothesis if testing demonstrates that:

- deterministic repeatability cannot be achieved;
- early recognition does not occur;
- false negatives remain unacceptably high;
- assessment disagreement is not handled reliably;
- the Stabilizer introduces instability;
- operator guidance increases workload without measurable benefit;
- or the architecture does not provide a meaningful decision-support advantage over the defined baseline.

These outcomes should be documented rather than excluded.

---

11.33 Research Questions for Classification Review

Technical reviewers may reasonably ask:

1. What problem is the resilience layer solving that existing systems do not already address?
2. How is independence established?
3. How is deterministic arbitration verified?
4. How are thresholds selected?
5. How are false positives and false negatives measured?
6. How is human-factors performance evaluated?
7. How does the system behave when an analytical layer fails?
8. How is cybersecurity addressed?
9. How is software integrity established?
10. What evidence would be required before operational integration?
11. How would the architecture interact with existing DP redundancy concepts?
12. What prevents the resilience layer from becoming a common-mode failure?
13. What is the defined fail-safe state?
14. How is operator authority preserved?
15. What evidence supports eventual autonomy, if autonomy is ever proposed?

These questions should be regarded as part of the research programme rather than obstacles to it.

---

11.34 Research Position

The Sextant Protocol™ project adopts the following position:

«The architecture is a hypothesis to be tested, not a conclusion to be accepted.»

The simulator provides a controlled experimental environment.

The white paper defines the proposed research questions.

The validation framework defines how the questions can be challenged.

Independent review determines whether the evidence is credible.

---

11.35 Summary

The research programme can be reduced to a measurable sequence:

OBSERVE

↓

ASSESS

↓

COMPARE

↓

ARBITRATE

↓

WARN

↓

DECIDE

↓

SIMULATE

↓

MEASURE

↓

REPEAT

The central objective is to determine whether this additional resilience layer provides measurable value.

If it does, the evidence can justify further research.

If it does not, the architecture must be revised.

Either result advances the research.

SEXTANT PROTOCOL™

A TESTABLE RESILIENCE HYPOTHESIS

DEMONSTRATE → MEASURE → CHALLENGE → REPEAT → INDEPENDENTLY REVIEW

SIMULATION ONLY — NOT CERTIFIED MARINE CONTROL SOFTWARE