
# Sextant Protocol – DP Control System

## Overview

The Sextant Protocol DP Control System is a research prototype of a **parallel AI-based Dynamic Positioning architecture** designed for failure-resilient maritime operations.

It introduces a non-traditional control model using **two independent AI layers operating in parallel**, combined with **human-in-the-loop governance**, to reduce cascade failure risk under extreme environmental conditions.

---

## Problem Statement

Conventional Dynamic Positioning (DP) systems rely on:
- Redundant sensors
- Redundant controllers
- Redundant power systems

However, these redundancies typically share the same control logic, which can lead to **cascade failure under nonlinear environmental disturbances** such as:
- sudden tidal surges
- extreme current shifts
- rapid wind variance

---

## Proposed System Architecture

The Sextant Protocol introduces a **parallel cognitive control structure**:

### 1. Primary AI System
- Executes standard DP control logic
- Optimized for stability and efficiency
- Operates under normal environmental conditions

### 2. Secondary AI System
- Runs independently in parallel
- Uses conservative, safety-first control logic
- Monitors system thresholds and environmental anomalies
- Intervenes when primary system exceeds safe operational envelope

### 3. Human-in-the-Loop
- Final authority in escalation scenarios
- Reviews conflicts between Primary and Secondary AI
- Executes override decisions when required

### 4. Stabilizer Layer
- Prevents oscillation between control systems
- Ensures smooth transition of authority
- Maintains system stability during handover events

---

## Core Innovation

Unlike traditional redundancy systems, this architecture introduces:

> **Parallel independent decision-making systems with different control philosophies rather than duplicated identical logic.**

This reduces systemic blind spots and improves resilience under extreme or unexpected conditions.

---

## Example Use Case

### Scenario: Sudden Tidal Surge

1. Primary AI attempts corrective thrust adjustments  
2. Environmental conditions exceed safe prediction thresholds  
3. Secondary AI detects instability risk  
4. Secondary AI initiates conservative control mode  
5. Stabilizer manages transition between control states  
6. Human operator receives alert for validation or override  

Result: System stabilizes before cascade failure occurs.

---

## Applications

- Offshore oil and gas DP systems  
- Maritime navigation safety systems  
- Autonomous vessel control frameworks  
- High-risk environmental control systems  

---

## Relationship to Sextant Protocol

This system is a domain-specific implementation of the broader **Sextant Protocol architecture**, focusing on:
- operational continuity
- system survivability
- multi-layer decision governance

---

## Authors

- Don Herman Oswald Weerasekera (WNI)  
- AI-assisted systems design (Lena)

---

## Status

Research prototype / conceptual simulation framework (non-deployed system)
