# Sextant Protocol – DP Control System

## Research Overview

The Sextant Protocol DP Control System is a **multi-layer control and decision architecture** designed to improve resilience in Dynamic Positioning (DP) systems under nonlinear and extreme environmental conditions.

It is a **simulation-based research prototype** that explores the use of independent parallel AI systems for safety-critical maritime control.

---

## Problem Statement

Conventional Dynamic Positioning (DP) systems rely on redundancy at the hardware and sensor level while maintaining a **shared control logic model**.

This creates a systemic limitation:

> When environmental conditions exceed model assumptions, failures can cascade across all redundant systems simultaneously.

---

## Proposed Approach

This system introduces **parallel independent decision logic layers**, each with distinct operational roles:

### 1. Primary AI (Control Layer)
- Executes standard DP control logic
- Optimized for efficiency and stability
- Operates under normal environmental conditions

---

### 2. Secondary AI (Safety Layer)
- Runs independently in parallel
- Uses conservative safety-first logic
- Detects anomalies and environmental spikes
- Activates protective override responses when required

---

### 3. Stabilizer (Arbitration Layer)
- Prevents oscillation between control systems
- Blends outputs from Primary and Secondary AI
- Ensures smooth transition between operational modes
- Maintains system stability during conflict conditions

---

### 4. Human-in-the-Loop (Governance Layer)
- Final authority in high-risk conditions
- Intervenes during extreme environmental events
- Provides manual override capability for safety assurance

---

## System Architecture

Decision flow is not strictly linear, but governed by conditional interaction:

Primary AI ↔ Stabilizer ↔ Secondary AI  
          ↓  
    Human-in-the-loop (override authority)

---

## Key Innovation

Unlike traditional DP systems, this architecture introduces:

> **Independent parallel decision systems with different operational philosophies rather than duplicated redundancy.**

This reduces risk of:
- cascade failure
- synchronized system blind spots
- model-driven systemic bias under stress conditions

---

## Simulation Environment

The system includes a simulation engine that models:
- environmental spikes (tidal surges)
- control instability scenarios
- safety override activation
- human intervention events

---

## Application Domains

- Offshore oil and gas DP systems  
- Maritime navigation and vessel control  
- Autonomous marine systems  
- High-risk operational infrastructure  

---

## System Status

This project is a:
> Research prototype and simulation framework (non-production system)

---

## Authors

- Don Herman Oswald Weerasekera (WNI)  
- AI-assisted system design (Lena)

---

## Relationship to Sextant Protocol

This system represents a **domain-specific implementation** of the broader Sextant Protocol framework, focusing on:

- operational continuity  
- failure resilience  
- multi-agent decision governance
