/* ============================================================
   SEXTANT PROTOCOL™
   DP FAILURE PROGRESSION V&V RESEARCH OBSERVER

   File:
   dp_failure_progression_vv.js

   Version:
   SPD-DP-FAILURE-PROGRESSION-VV-V1.0.0

   Purpose:
   Deterministic research / V&V observer for tracing:

   FAILURE
      ↓
   DEPENDENCY
      ↓
   CASCADE
      ↓
   REDUNDANCY
      ↓
   HUMAN INTERVENTION
      ↓
   DEGRADED / DEAD-SHIP STATE

   ARCHITECTURAL POSITION:

   Existing DP Simulation Result
              ↓
   FAILURE PROGRESSION V&V OBSERVER
              ↓
   Research Assessment

   SAFETY BOUNDARY:

   This module is an observation and traceability layer only.

   It does NOT:
   - command DP
   - command thrusters
   - command propulsion
   - command steering
   - command navigation
   - command actuators
   - modify vessel state
   - connect to a real vessel
   - execute autonomous recovery
   - override human authority

   All outputs are deterministic research assessments.

   Human authority remains FINAL.

   ============================================================ */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
       ======================================================== */

    const ENGINE_NAME =
        "DPFailureProgressionVV";

    const VERSION =
        "SPD-DP-FAILURE-PROGRESSION-VV-V1.0.0";

    const MODE =
        "V&V RESEARCH OBSERVER — SIMULATION ONLY";


    const STAGES = {

        FAILURE:
            "FAILURE",

        DEPENDENCY:
            "DEPENDENCY",

        CASCADE:
            "CASCADE",

        REDUNDANCY:
            "REDUNDANCY",

        HUMAN_INTERVENTION:
            "HUMAN INTERVENTION",

        DEGRADED_STATE:
            "DEGRADED STATE",

        DEAD_SHIP_STATE:
            "DEAD-SHIP STATE"

    };


    const SEVERITY = {

        NONE:
            "NONE",

        LOW:
            "LOW",

        MEDIUM:
            "MEDIUM",

        HIGH:
            "HIGH",

        CRITICAL:
            "CRITICAL"

    };


    let lastAssessment =
        null;


    /* ========================================================
       UTILITY FUNCTIONS
       ======================================================== */

    function safeNumber(value, fallback) {

        return (
            typeof value === "number"
            &&
            Number.isFinite(value)
        )
            ? value
            : fallback;

    }


    function safeString(value, fallback) {

        return (
            typeof value === "string"
            &&
            value.trim().length > 0
        )
            ? value
            : fallback;

    }


    function clamp(value, minimum, maximum) {

        return Math.min(
            maximum,
            Math.max(
                minimum,
                value
            )
        );

    }


    /* ========================================================
       INPUT VALIDATION
       ======================================================== */

    function validateResult(result) {

        if (!result || typeof result !== "object") {

            return {

                valid:
                    false,

                reason:
                    "Simulation result is missing."

            };

        }


        if (!result.risk) {

            return {

                valid:
                    false,

                reason:
                    "Simulation risk assessment is missing."

            };

        }


        if (!result.environment) {

            return {

                valid:
                    false,

                reason:
                    "Simulation environment result is missing."

            };

        }


        if (!result.primary) {

            return {

                valid:
                    false,

                reason:
                    "Primary AI result is missing."

            };

        }


        if (!result.secondary) {

            return {

                valid:
                    false,

                reason:
                    "Secondary AI result is missing."

            };

        }


        if (!result.stabilizer) {

            return {

                valid:
                    false,

                reason:
                    "Stabilizer result is missing."

            };

        }


        return {

            valid:
                true,

            reason:
                "Simulation result accepted."

        };

    }


    /* ========================================================
       FAILURE ASSESSMENT
       ======================================================== */

    function assessFailure(result) {

        const risk =
            safeString(
                result.risk,
                "UNKNOWN"
            );


        const stress =
            safeNumber(
                result.environmentalStress,
                safeNumber(
                    result.environment.environmentalStress,
                    0
                )
            );


        let failureDetected =
            false;


        let severity =
            SEVERITY.NONE;


        let condition =
            "NO FAILURE CONDITION IDENTIFIED";


        if (
            risk === "CRITICAL"
            ||
            stress >= 90
        ) {

            failureDetected =
                true;

            severity =
                SEVERITY.CRITICAL;

            condition =
                "CRITICAL SYSTEM / ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "HIGH"
            ||
            stress >= 75
        ) {

            failureDetected =
                true;

            severity =
                SEVERITY.HIGH;

            condition =
                "HIGH SYSTEM / ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "MEDIUM"
            ||
            stress >= 50
        ) {

            failureDetected =
                true;

            severity =
                SEVERITY.MEDIUM;

            condition =
                "ELEVATED SYSTEM / ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "LOW"
            ||
            stress >= 30
        ) {

            severity =
                SEVERITY.LOW;

            condition =
                "LOW-LEVEL STRESS — MONITORING CONDITION";

        }


        return {

            stage:
                STAGES.FAILURE,

            detected:
                failureDetected,

            severity:
                severity,

            environmentalStress:
                stress,

            condition:
                condition,

            source:
                "EXISTING DP SIMULATION RESULT"

        };

    }


    /* ========================================================
       DEPENDENCY ASSESSMENT
       ======================================================== */

    function assessDependency(result, failure) {

        const primary =
            result.primary;

        const secondary =
            result.secondary;

        const stabilizer =
            result.stabilizer;


        const dependencyDetected =
            failure.detected
            &&
            (
                failure.severity === SEVERITY.MEDIUM
                ||
                failure.severity === SEVERITY.HIGH
                ||
                failure.severity === SEVERITY.CRITICAL
            );


        let affectedLayers =
            [];


        if (dependencyDetected) {

            affectedLayers.push(
                "PRIMARY ASSESSMENT"
            );

            affectedLayers.push(
                "SECONDARY ASSESSMENT"
            );

            affectedLayers.push(
                "STABILIZER / ARBITRATION"
            );

        }


        return {

            stage:
                STAGES.DEPENDENCY,

            detected:
                dependencyDetected,

            affectedLayers:
                affectedLayers,

            primaryState:
                safeString(
                    primary.response,
                    "NOT AVAILABLE"
                ),

            secondaryState:
                safeString(
                    secondary.assessment,
                    "NOT AVAILABLE"
                ),

            stabilizerState:
                safeString(
                    stabilizer.status,
                    "NOT AVAILABLE"
                ),

            explanation:
                dependencyDetected
                    ? "Failure condition is assessed across the existing layered decision architecture."
                    : "No material dependency progression identified.",

            source:
                "PRIMARY / SECONDARY / STABILIZER RESULT"

        };

    }


    /* ========================================================
       CASCADE ASSESSMENT
       ======================================================== */

    function assessCascade(result, failure, dependency) {

        const cascadeDetected =
            failure.severity === SEVERITY.HIGH
            ||
            failure.severity === SEVERITY.CRITICAL;


        let propagation =
            "NONE";


        if (
            failure.severity === SEVERITY.MEDIUM
        ) {

            propagation =
                "MONITORED";

        }

        else if (
            failure.severity === SEVERITY.HIGH
        ) {

            propagation =
                "MULTI-LAYER PROPAGATION";

        }

        else if (
            failure.severity === SEVERITY.CRITICAL
        ) {

            propagation =
                "CRITICAL PROPAGATION";

        }


        return {

            stage:
                STAGES.CASCADE,

            detected:
                cascadeDetected,

            propagation:
                propagation,

            dependencyCount:
                dependency.affectedLayers.length,

            explanation:
                cascadeDetected
                    ? "The assessed condition is capable of propagating across multiple decision layers in the research model."
                    : "No significant cascade progression identified.",

            source:
                "FAILURE + DEPENDENCY TRACE"

        };

    }


    /* ========================================================
       REDUNDANCY ASSESSMENT
       ======================================================== */

    function assessRedundancy(result, failure, cascade) {

        const reserve =
            result.reservePowerVerification
            || {};


        const reserveVerified =
            reserve.reserveVerified === true;


        let redundancyStatus =
            "AVAILABLE";


        let redundancyLevel =
            "NORMAL";


        if (
            failure.severity === SEVERITY.CRITICAL
        ) {

            redundancyLevel =
                reserveVerified
                    ? "LIMITED / VERIFIED"
                    : "LIMITED / NOT VERIFIED";

        }

        else if (
            failure.severity === SEVERITY.HIGH
        ) {

            redundancyLevel =
                reserveVerified
                    ? "AVAILABLE — RESERVE VERIFIED"
                    : "AVAILABLE — RESERVE NOT VERIFIED";

        }

        else if (
            failure.severity === SEVERITY.MEDIUM
        ) {

            redundancyLevel =
                reserveVerified
                    ? "AVAILABLE"
                    : "UNVERIFIED";

        }


        if (
            cascade.detected
            &&
            !reserveVerified
        ) {

            redundancyStatus =
                "REDUNDANCY REQUIRES VERIFICATION";

        }


        return {

            stage:
                STAGES.REDUNDANCY,

            status:
                redundancyStatus,

            level:
                redundancyLevel,

            reserveVerified:
                reserveVerified,

            availableReserve:
                safeNumber(
                    reserve.availableReserve,
                    null
                ),

            requiredReserve:
                safeNumber(
                    reserve.requiredReserve,
                    null
                ),

            explanation:
                "Redundancy is assessed from the existing simulation's reserve-power verification and layered decision state. No physical redundancy is commanded or assumed.",

            source:
                "EXISTING RESERVE-POWER VERIFICATION"

        };

    }


    /* ========================================================
       HUMAN INTERVENTION ASSESSMENT
       ======================================================== */

    function assessHumanIntervention(result, failure, cascade) {

        const human =
            result.human
            || {};


        const executionGate =
            result.executionGate
            || {};


        const humanRequired =
            failure.detected
            ||
            cascade.detected
            ||
            executionGate.required === true;


        let status =
            "HUMAN AUTHORITY REQUIRED";


        if (
            humanRequired
        ) {

            status =
                "HUMAN INTERVENTION REQUIRED";

        }


        return {

            stage:
                STAGES.HUMAN_INTERVENTION,

            required:
                humanRequired,

            status:
                status,

            authority:
                "HUMAN",

            decision:
                safeString(
                    human.decision,
                    "PENDING"
                ),

            acknowledged:
                human.acknowledged === true,

            authorized:
                human.authorized === true,

            autonomousCommand:
                false,

            operationalAuthority:
                false,

            explanation:
                "Human authority remains final. This observer cannot authorize or execute an operational response.",

            source:
                "EXISTING HUMAN DECISION GATE"

        };

    }


    /* ========================================================
       FINAL STATE ASSESSMENT
       ======================================================== */

    function assessFinalState(
        result,
        failure,
        cascade,
        redundancy,
        human
    ) {

        let state =
            "STABLE";


        let stateClass =
            "NORMAL";


        if (
            failure.severity === SEVERITY.CRITICAL
            &&
            cascade.detected
            &&
            !redundancy.reserveVerified
        ) {

            state =
                STAGES.DEAD_SHIP_STATE;

            stateClass =
                "RESEARCH DEEP-DEGRADED CONDITION";

        }

        else if (
            failure.severity === SEVERITY.HIGH
            ||
            cascade.detected
        ) {

            state =
                STAGES.DEGRADED_STATE;

            stateClass =
                "DEGRADED";

        }

        else if (
            failure.severity === SEVERITY.MEDIUM
        ) {

            state =
                "MONITORED DEGRADED CONDITION";

            stateClass =
                "MONITORING";

        }


        return {

            stage:
                state,

            classification:
                stateClass,

            state:
                state,

            humanAuthorityFinal:
                true,

            operationalCommand:
                false,

            realVesselConnection:
                false,

            simulatedOnly:
                true,

            explanation:
                "Final state is a deterministic research classification. It does not represent an actual vessel condition.",

            source:
                "FAILURE → CASCADE → REDUNDANCY → HUMAN TRACE"

        };

    }


    /* ========================================================
       TRACE BUILDER
       ======================================================== */

    function buildTrace(
        failure,
        dependency,
        cascade,
        redundancy,
        human,
        finalState
    ) {

        return [

            {

                stage:
                    STAGES.FAILURE,

                status:
                    failure.detected
                        ? failure.severity
                        : "NOT DETECTED"

            },

            {

                stage:
                    STAGES.DEPENDENCY,

                status:
                    dependency.detected
                        ? "IDENTIFIED"
                        : "NOT IDENTIFIED"

            },

            {

                stage:
                    STAGES.CASCADE,

                status:
                    cascade.detected
                        ? cascade.propagation
                        : "NOT IDENTIFIED"

            },

            {

                stage:
                    STAGES.REDUNDANCY,

                status:
                    redundancy.level

            },

            {

                stage:
                    STAGES.HUMAN_INTERVENTION,

                status:
                    human.status

            },

            {

                stage:
                    finalState.stage,

                status:
                    finalState.classification

            }

        ];

    }


    /* ========================================================
       MAIN EVALUATION
       ======================================================== */

    function evaluate(result) {

        const validation =
            validateResult(
                result
            );


        if (!validation.valid) {

            lastAssessment = {

                engineName:
                    ENGINE_NAME,

                version:
                    VERSION,

                mode:
                    MODE,

                valid:
                    false,

                status:
                    "V&V ASSESSMENT NOT AVAILABLE",

                reason:
                    validation.reason,

                operationalCommand:
                    false,

                realVesselConnection:
                    false,

                humanAuthorityFinal:
                    true

            };


            return lastAssessment;

        }


        const failure =
            assessFailure(
                result
            );


        const dependency =
            assessDependency(
                result,
                failure
            );


        const cascade =
            assessCascade(
                result,
                failure,
                dependency
            );


        const redundancy =
            assessRedundancy(
                result,
                failure,
                cascade
            );


        const human =
            assessHumanIntervention(
                result,
                failure,
                cascade
            );


        const finalState =
            assessFinalState(
                result,
                failure,
                cascade,
                redundancy,
                human
            );


        const trace =
            buildTrace(
                failure,
                dependency,
                cascade,
                redundancy,
                human,
                finalState
            );


        const assessment = {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            valid:
                true,

            timestamp:
                new Date().toISOString(),

            inputEngine:
                safeString(
                    result.engineName,
                    "DPSimulationEngine"
                ),

            inputEngineVersion:
                safeString(
                    result.version,
                    "UNKNOWN"
                ),

            researchBoundary: {

                simulationOnly:
                    true,

                operationalCommand:
                    false,

                realVesselConnection:
                    false,

                autonomousCommand:
                    false,

                humanAuthority:
                    "FINAL"

            },

            progression: {

                failure:
                    failure,

                dependency:
                    dependency,

                cascade:
                    cascade,

                redundancy:
                    redundancy,

                humanIntervention:
                    human,

                finalState:
                    finalState

            },

            trace:
                trace,

            summary: {

                failure:
                    failure.condition,

                dependency:
                    dependency.detected
                        ? "DEPENDENCY IDENTIFIED"
                        : "NO MATERIAL DEPENDENCY",

                cascade:
                    cascade.detected
                        ? cascade.propagation
                        : "NO SIGNIFICANT CASCADE",

                redundancy:
                    redundancy.level,

                human:
                    human.status,

                finalState:
                    finalState.state

            }

        };


        lastAssessment =
            assessment;


        return assessment;

    }


    /* ========================================================
       RESET
       ======================================================== */

    function reset() {

        lastAssessment =
            null;


        return {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            status:
                "RESET",

            lastAssessment:
                null

        };

    }


    /* ========================================================
       GET LAST ASSESSMENT
       ======================================================== */

    function getLastAssessment() {

        return lastAssessment;

    }


    /* ========================================================
       VALIDATION
       ======================================================== */

    function validate() {

        return (

            typeof evaluate ===
            "function"

            &&

            typeof reset ===
            "function"

            &&

            typeof getLastAssessment ===
            "function"

            &&

            typeof validateResult ===
            "function"

        );

    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    const DPFailureProgressionVV = {

        name:
            ENGINE_NAME,

        version:
            VERSION,

        mode:
            MODE,

        stages:
            STAGES,

        severity:
            SEVERITY,

        evaluate:
            evaluate,

        reset:
            reset,

        getLastAssessment:
            getLastAssessment,

        validate:
            validate

    };


    /* ========================================================
       BROWSER EXPORT
       ======================================================== */

    window.DPFailureProgressionVV =
        DPFailureProgressionVV;


    /* ========================================================
       READY MESSAGE
       ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL™ DP FAILURE PROGRESSION V&V — READY"
        );

        console.log(
            "ENGINE:",
            ENGINE_NAME
        );

        console.log(
            "VERSION:",
            VERSION
        );

        console.log(
            "MODE:",
            MODE
        );

        console.log(
            "FAILURE → DEPENDENCY → CASCADE → REDUNDANCY"
        );

        console.log(
            "→ HUMAN INTERVENTION → DEGRADED / DEAD-SHIP"
        );

        console.log(
            "OPERATIONAL AUTHORITY: FALSE"
        );

        console.log(
            "REAL VESSEL CONNECTION: FALSE"
        );

        console.log(
            "AUTONOMOUS COMMAND: FALSE"
        );

        console.log(
            "HUMAN AUTHORITY: FINAL"
        );

    }


})();