# Sextant Protocol – Dynamic Positioning (DP) Control System

## Executive Summary

The Sextant Protocol Dynamic Positioning (DP) Control System is a simulation-based research framework for studying resilient supervisory control architectures for Dynamic Positioning operations under challenging and nonlinear marine environmental conditions.

The project explores how independent AI decision layers, deterministic supervisory logic, and human oversight may improve resilience during abnormal operating scenarios.

**This repository is intended solely for research, simulation, engineering discussion, and educational purposes. It is not a certified Dynamic Positioning control system and is not intended for operational vessel navigation or control.**

---

# Branch & Contribution Guidance

The `main` branch is maintained as the stable reference baseline of this research project.

Researchers, contributors, and evaluators are encouraged to:

- create separate branches for experimental work
- avoid direct modification of `main`
- isolate prototype implementations from the baseline
- submit improvements through Pull Requests where appropriate

The baseline preservation model maintains:

- architectural traceability
- conceptual stability
- reproducible research
- separation between validated and experimental concepts

---

# System Freeze Note (v1.0 Baseline)

Version 1.0 represents the frozen deterministic baseline of the Sextant Protocol DP research framework.

### Freeze Characteristics

- deterministic behaviour
- reproducible execution
- version-controlled architecture
- stable reference implementation

This baseline serves as the canonical research reference.

Future work should follow semantic versioning:

- `develop` → experimental research
- `v1.1+` → validated future releases

---

# System Purpose

The objective of this project is to evaluate whether independent supervisory decision layers can improve Dynamic Positioning resilience when environmental conditions exceed conventional control assumptions.

The framework is intended for:

- DP resilience research
- supervisory control architecture studies
- safety engineering
- autonomous systems research
- human-in-the-loop governance

---

# Proposed Supervisory Architecture

## Primary AI Layer

- normal DP supervisory logic
- steady-state optimisation
- first-response decision engine

## Secondary AI Layer

- independent safety supervisor
- anomaly detection
- conservative fallback strategy

## Stabilisation Layer

- transition management
- oscillation prevention
- supervisory coordination

## Human-in-the-Loop

- final operational authority
- manual intervention
- governance and safety oversight

---

# Conceptual System Flow

Environmental Inputs

↓

Primary AI

↓

Secondary AI

↓

Stabilisation Logic

↓

Human Decision (when required)

↓

Simulation Output & Audit Trail

---

# Research Objectives

The framework investigates:

- layered supervisory AI
- independent decision architectures
- resilient DP concepts
- failure escalation behaviour
- deterministic simulation
- explainable decision support

---

# Application Areas

Potential research relevance includes:

- offshore support vessels
- autonomous marine systems
- offshore energy operations
- maritime resilience engineering
- safety-critical supervisory systems
- digital twin research

---

# Repository Structure

- `main.py` — application entry point
- `primary_ai.py` — primary supervisory logic
- `secondary_ai.py` — secondary supervisory logic
- `human_in_loop.py` — governance layer
- `simulation_engine.py` — simulation engine
- `docs/` — technical documentation

> **Note:** If a future `stabilizer.py` module is introduced, this structure will be updated accordingly.

---

# Continuous Integration

GitHub Actions automatically validates simulation execution and repository integrity on each commit.

---

# Related Sextant Research Projects

- Sextant Protocol Official Index
- Sextant Orbital Resilience Framework
- Sextant Resilience Operations Console
- Sextant Rule Library

---

# Author

**Don Herman Oswald Weerasekera**

Independent maritime researcher and engineering developer.

Background includes:

- Master Mariner (Foreign Going)
- Offshore maritime operations
- Dynamic Positioning operational experience
- Diploma in Transport (RMIT University, Australia)

AI-assisted research and documentation with **Captain AI Lena**.

---

# Licence

MIT License.
