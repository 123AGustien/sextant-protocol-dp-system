Primary and Secondary AI Architecture

6.1 Purpose

The Sextant Protocol™ DP Resilience Research Simulator uses two independent analytical pathways before the Stabilizer.

These are designated:

S1 — Primary AI

S2 — Secondary AI

The purpose of this architecture is to investigate whether independent assessment pathways can provide greater resilience in decision-support than reliance upon a single analytical assessment.

The two layers do not possess operational authority.

Their outputs are inputs to the deterministic Stabilizer.

The research architecture is therefore:

ENVIRONMENT

↓

S1 PRIMARY AI + S2 SECONDARY AI

↓

STABILIZER

↓

HUMAN AUTHORITY

↓

SIMULATED RESPONSE

---

6.2 Primary AI

The Primary AI represents the principal analytical pathway within the research simulator.

Its purpose is to evaluate the simulated environmental and vessel state and determine the corresponding resilience assessment.

Depending upon the scenario, the Primary AI may report states such as:

- NORMAL CONTROL;
- ELEVATED CONTROL;
- HIGH CONTROL;
- or other research-defined states.

The Primary AI may consider:

- environmental stress;
- environmental change;
- simulated vessel condition;
- navigation state;
- sensor integrity;
- simulated system demand; and
- scenario history.

The exact variables and weighting may evolve as the simulator is developed and validated.

---

6.3 Secondary AI

The Secondary AI provides an independent safety-oriented assessment.

Its purpose is not simply to duplicate the Primary AI.

Instead, the Secondary AI provides an additional analytical perspective that can be compared against the Primary AI assessment.

The simulator may represent this state as:

INDEPENDENT SAFETY ADVISORY

The independent pathway provides an opportunity to identify:

- agreement;
- disagreement;
- divergent risk assessments;
- emerging anomalies;
- unexpected transitions; and
- conditions requiring additional investigation.

---

6.4 Why Two Assessment Layers?

A central research consideration is that a single analytical pathway may contain an error, limitation, incorrect assumption or unexpected response.

A second independent assessment does not automatically eliminate these risks.

However, it creates an opportunity for comparison.

The research proposition is:

S1 + S2

rather than:

S1 alone

The Stabilizer can then evaluate the relationship between the two outputs.

This creates a layered architecture in which no individual AI assessment is automatically treated as the final truth.

---

6.5 Independence

For the architecture to provide meaningful research value, the Secondary AI should maintain an appropriate degree of independence from the Primary AI.

Independence may be investigated through differences in:

- analytical rules;
- weighting;
- thresholds;
- scenario interpretation;
- safety priorities;
- failure assumptions; and
- assessment logic.

Future research should determine the appropriate degree of independence.

Two systems that simply reproduce the same calculation may provide limited additional resilience.

The research therefore treats functional independence as an important design consideration.

---

6.6 Agreement

When S1 and S2 identify the same general condition, the Stabilizer may have increased confidence that the simulated state is consistent across the analytical pathways.

For example:

S1: ELEVATED

S2: ELEVATED SAFETY ADVISORY

may result in:

STABILIZER: ELEVATED MONITORING

The Stabilizer can then generate an appropriate operator notification.

Agreement does not automatically establish correctness.

It provides an additional research signal that can be evaluated.

---

6.7 Disagreement

Disagreement between the two analytical layers is particularly important.

For example:

S1: NORMAL CONTROL

S2: HIGH SAFETY CONCERN

creates an analytical conflict.

The architecture should not simply discard the disagreement.

Instead, the Stabilizer may treat the disagreement itself as a resilience signal.

Potential responses include:

- increase monitoring;
- request additional diagnostics;
- verify environmental inputs;
- verify sensor integrity;
- maintain a conservative simulated state;
- escalate for human consideration; or
- initiate a defined research contingency.

This allows disagreement to become a measurable research variable.

---

6.8 Primary AI Failure

The research simulator should include scenarios in which the Primary AI produces:

- incorrect assessment;
- delayed assessment;
- missing output;
- stale output;
- corrupted output;
- excessive confidence; or
- unexpected state transitions.

The Secondary AI should then be evaluated as an independent safety pathway.

The objective is to determine whether the architecture can detect or mitigate an analytical failure before it becomes a larger simulated decision problem.

---

6.9 Secondary AI Failure

The Secondary AI must also be treated as a potentially fallible component.

Research scenarios should therefore include:

- Secondary AI unavailable;
- incorrect advisory;
- delayed advisory;
- corrupted advisory;
- stale advisory; and
- disagreement with valid Primary AI output.

The architecture must not assume that the Secondary AI is inherently correct.

This is why the Stabilizer remains necessary.

---

6.10 Confidence and Uncertainty

Future versions of the simulator may introduce explicit confidence and uncertainty values.

For example:

S1 Assessment
State: ELEVATED
Confidence: HIGH

S2 Assessment
State: ELEVATED
Confidence: MEDIUM

Stabilizer
Output: ELEVATED MONITORING

Alternatively:

S1 Assessment
State: NORMAL
Confidence: HIGH

S2 Assessment
State: HIGH CONCERN
Confidence: HIGH

Stabilizer
Output: REQUEST ADDITIONAL DIAGNOSTICS

The purpose of such representations would be to make uncertainty visible rather than hiding it.

---

6.11 The Stabilizer as Third-Level Arbitration

The relationship between the two AI layers and the Stabilizer can be represented as:

                    ENVIRONMENT
                         │
              ┌──────────┴──────────┐
              │                     │
        PRIMARY AI             SECONDARY AI
             S1                      S2
              │                     │
              └──────────┬──────────┘
                         │
                    STABILIZER
                         │
                 ARBITRATED STATE
                         │
                 HUMAN AUTHORITY
                         │
                SIMULATED RESPONSE

The Stabilizer therefore acts as a third-level analytical boundary.

The Primary AI does not override the Secondary AI.

The Secondary AI does not override the Primary AI.

The Stabilizer evaluates both.

The human operator retains final authority.

---

6.12 Avoiding AI-to-AI Authority

An important design principle is that the two AI layers should not be allowed to establish operational authority through agreement.

Even if:

S1 = HIGH

and

S2 = HIGH

the result remains a simulated assessment.

The correct architecture is:

AI agreement → Stabilizer assessment → Human decision-support

not:

AI agreement → Autonomous operational command

This distinction is particularly important for safety-critical research.

---

6.13 AI Output Categories

The simulator may use structured output categories rather than unrestricted natural-language decisions.

For example:

Layer| Example Output
S1 Primary AI| NORMAL CONTROL
S1 Primary AI| ELEVATED CONTROL
S1 Primary AI| HIGH CONTROL
S2 Secondary AI| INDEPENDENT SAFETY ADVISORY
Stabilizer| PREVENTIVE ARBITRATION
Stabilizer| ELEVATED MONITORING
Stabilizer| HIGH ALERT

Structured outputs improve repeatability and make automated testing easier.

Natural-language guidance can then be generated from the structured state.

---

6.14 Human-Readable Guidance

The AI and Stabilizer outputs are ultimately converted into human-readable decision-support.

For example:

ASSESSMENT

Environmental loading has increased.

RESILIENCE STATE

ELEVATED MONITORING.

RECOMMENDATION

Maintain simulated DP with increased operator attention.

OPERATOR CONSIDERATIONS

- Monitor environmental trends.
- Review simulated thruster demand.
- Review simulated power demand.
- Verify sensor consistency.
- Prepare contingency procedures.

This approach separates the analytical state from the explanatory guidance.

---

6.15 Auditability

Each AI assessment should be recorded.

A research audit trail should allow reviewers to determine:

- what the environment was;
- what S1 assessed;
- what S2 assessed;
- what the Stabilizer determined;
- what guidance was generated;
- what the human decision was; and
- what simulated response followed.

This creates an end-to-end trace:

INPUT → S1 → S2 → STABILIZER → GUIDANCE → HUMAN DECISION → SIMULATION

Such traceability is essential for independent research.

---

6.16 AI and Human Factors

The objective of the dual-AI architecture is not to increase the volume of information presented to the operator.

Poorly designed decision-support can increase cognitive workload.

The research therefore needs to investigate whether the architecture can provide:

- prioritised information;
- clear severity;
- concise recommendations;
- explanation of why a state changed;
- visibility of disagreement;
- appropriate escalation;
- and minimal unnecessary alarm activity.

Human factors research should form part of future validation.

---

6.17 Future Captain AI Lena Integration

The Sextant Protocol™ research programme may ultimately extend the analytical architecture across multiple domains.

Captain AI Lena is envisaged as a higher-level autonomous decision-support core capable of operating across validated Sextant Protocol™ domains.

Potential domains may include:

- maritime;
- terrestrial;
- aviation;
- orbital;
- financial;
- infrastructure;
- energy; and
- other resilience environments.

The future architecture may therefore evolve from:

Domain Simulation → Independent Assessment → Stabilizer → Human Authority

toward:

Validated Domain Resilience → Bounded Autonomous Decision Support

Any such transition would require domain-specific validation and explicit authority boundaries.

The present DP simulator does not claim this autonomous capability.

---

6.18 Research Questions

Future experiments should investigate:

1. Does independent secondary assessment improve detection of simulated anomalies?
2. How should disagreement between S1 and S2 be treated?
3. What degree of independence provides meaningful safety value?
4. How should confidence and uncertainty be represented?
5. Can the Stabilizer distinguish genuine deterioration from analytical disagreement?
6. Does dual-layer assessment improve operator decision-support?
7. Does it reduce or increase cognitive workload?
8. Can the architecture remain deterministic and auditable under conflicting inputs?

These questions provide a basis for empirical evaluation.

---

6.19 Summary

The Primary AI and Secondary AI provide complementary analytical pathways within the Sextant Protocol™ architecture.

Their purpose is not to establish autonomous control.

Their purpose is to create independent assessments that can be compared and arbitrated.

The Stabilizer provides the arbitration layer.

The human operator retains final authority.

The resulting architecture is:

PRIMARY AI

→ principal assessment

SECONDARY AI

→ independent safety assessment

STABILIZER

→ deterministic arbitration

HUMAN

→ final authority

SIMULATED DP

→ controlled response modelling

This separation of assessment, arbitration and authority forms a central principle of the Sextant Protocol™ DP Resilience Research Simulator.

SEXTANT PROTOCOL™

MULTIPLE ASSESSMENTS — ONE ARBITRATION LAYER — HUMAN AUTHORITY

RESEARCH • SIMULATION • EDUCATION • ENGINEERING ANALYSIS