
# Sextant Protocol – Dynamic Positioning (DP) Control System

# Sextant Protocol – Dynamic Positioning (DP) Control System

## Executive Summary

The Sextant Protocol DP Control System is a **simulation-based research framework** designed to study resilient control architectures for Dynamic Positioning (DP) systems operating under extreme and nonlinear marine environmental conditions.

It implements a **conceptual multi-layer supervisory control architecture** combining autonomous decision-making, safety escalation logic, and human oversight.

---

## System Purpose

The objective of this project is to evaluate how **independent layered decision systems** can improve resilience in DP control scenarios where environmental disturbances exceed normal operating assumptions.

This system is intended for:
- research simulation  
- control systems analysis  
- safety architecture exploration  

It is **not connected to or integrated with any industrial DP system**.

---

## Core Problem

Conventional DP systems typically rely on:
- redundant hardware  
- shared control logic  
- tightly coupled decision models  

This introduces a key limitation:

> Environmental conditions that exceed system assumptions may trigger correlated failure modes across redundant components due to shared logic structures.

---

## Proposed Architecture

The system implements a conceptual multi-layer supervisory control architecture:

### 1. Primary AI Layer
- Handles standard DP control logic  
- Optimized for efficiency and steady-state stability  
- First response to environmental disturbances  

---

### 2. Secondary AI Layer
- Independent safety monitoring system  
- Detects abnormal environmental conditions  
- Applies conservative fallback control logic  
- Activates when primary system thresholds are exceeded  

---

### 3. Stabilization Layer
- Prevents oscillation between control layers  
- Coordinates transitions between primary and secondary responses  
- Ensures system stability under dynamic conditions  

---

### 4. Human-in-the-Loop Layer
- Final authority in escalation scenarios  
- Provides manual override capability  
- Ensures safety governance in critical conditions  

---

## System Flow

Environmental Disturbance  
→ Primary AI Response  
→ Secondary AI Evaluation  
→ Stabilization Logic  
→ Human-in-the-Loop (if required)

---

## Key Conceptual Innovation

Instead of relying solely on redundant identical systems, this architecture introduces **independent decision layers with differentiated control logic**.

This reduces:
- correlated failure risk  
- systemic blind spots  
- cascading instability under extreme conditions  

---

## Simulation Engine

The system includes a simulation environment that models:
- tidal surge events  
- environmental instability  
- control system interactions  
- escalation scenarios  

This enables controlled evaluation of layered decision behavior under stress conditions.

---

## Application Domains

This research framework is relevant to:
- offshore energy systems  
- maritime vessel positioning studies  
- autonomous marine system research  
- safety-critical control system design  

---

## System Boundary

This project is a **simulation and research prototype only**.

It does not:
- interface with industrial DP control systems  
- modify certified marine navigation software  
- operate in real-world vessel environments  

---

## Repository Structure

- `primary_ai.py` – primary control logic layer  
- `secondary_ai.py` – safety monitoring layer  
- `stabilizer.py` – control arbitration layer  
- `human_in_loop.py` – manual override logic  
- `simulation_engine.py` – system execution environment  
- `docs/` – system architecture and domain documentation  

---

## CI Status

Automated testing is implemented via GitHub Actions to validate simulation execution on each commit.

---

## Author

Don Herman Oswald Weerasekera  
AI-assisted system design (Lena)
