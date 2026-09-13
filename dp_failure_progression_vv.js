/* ============================================================
   SEXTANT PROTOCOL™
   DP FAILURE PROGRESSION V&V RESEARCH OBSERVER

   File:
   dp_failure_progression_vv.js

   Version:
   SPD-DP-FAILURE-PROGRESSION-VV-V1.0.1

   Purpose:
   Deterministic research / V&V observer for tracing:

   ENVIRONMENTAL CONDITION
      ↓
   EXPLICIT FAILURE EVENT
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

   IMPORTANT V&V PRINCIPLE:

   Environmental stress is NOT automatically treated
   as a technical system failure.

   A failure progression is only initiated when an
   explicit simulated failure event is declared.

   ARCHITECTURAL POSITION:

   Existing DP Simulation Result
              ↓
   Optional Explicit V&V Failure Scenario
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
        "SPD-DP-FAILURE-PROGRESSION-VV-V1.0.1";

    const MODE =
        "V&V RESEARCH OBSERVER — SIMULATION ONLY";


    const STAGES = {

        ENVIRONMENT:
            "ENVIRONMENTAL CONDITION",

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


    /*
     * Explicit research failure scenarios.
     *
     * These are scenario labels only.
     * They do not represent real vessel faults.
     */

    const FAILURE_SCENARIOS = {

        NONE:
            "NONE",

        THRUSTER_DEGRADATION:
            "THRUSTER_DEGRADATION",

        POSITION_REFERENCE_DEGRADATION:
            "POSITION_REFERENCE_DEGRADATION",

        AUTOPILOT_FAILURE:
            "AUTOPILOT_FAILURE",

        COMMUNICATIONS_LOSS:
            "COMMUNICATIONS_LOSS",

        POWER_RESERVE_DEGRADATION:
            "POWER_RESERVE_DEGRADATION",

        COMPOUND_FAILURE:
            "COMPOUND_FAILURE",

        DEAD_SHIP:
            "DEAD_SHIP"

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
       ENVIRONMENTAL CONDITION ASSESSMENT
       ======================================================== */

    function assessEnvironment(result) {

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


        let severity =
            SEVERITY.NONE;


        let condition =
            "NORMAL ENVIRONMENTAL CONDITION";


        if (
            risk === "CRITICAL"
            ||
            stress >= 90
        ) {

            severity =
                SEVERITY.CRITICAL;

            condition =
                "CRITICAL ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "HIGH"
            ||
            stress >= 75
        ) {

            severity =
                SEVERITY.HIGH;

            condition =
                "HIGH ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "MEDIUM"
            ||
            stress >= 50
        ) {

            severity =
                SEVERITY.MEDIUM;

            condition =
                "ELEVATED ENVIRONMENTAL STRESS";

        }

        else if (
            risk === "LOW"
            ||
            stress >= 30
        ) {

            severity =
                SEVERITY.LOW;

            condition =
                "LOW-LEVEL ENVIRONMENTAL STRESS";

        }


        return {

            stage:
                STAGES.ENVIRONMENT,

            severity:
                severity,

            environmentalStress:
                stress,

            risk:
                risk,

            condition:
                condition,

            failureInferred:
                false,

            explanation:
                "Environmental stress is recorded as a condition only. No technical failure is inferred from environmental stress alone.",

            source:
                "EXISTING DP SIMULATION RESULT"

        };

    }


    /* ========================================================
       EXPLICIT FAILURE EVENT ASSESSMENT
       ======================================================== */

    function assessFailure(
        result,
        failureScenario
    ) {

        const scenario =
            safeString(
                failureScenario,
                FAILURE_SCENARIOS.NONE
            );


        const normalizedScenario =
            Object.values(
                FAILURE_SCENARIOS
            ).includes(
                scenario
            )
                ? scenario
                : FAILURE_SCENARIOS.NONE;


        if (
            normalizedScenario ===
            FAILURE_SCENARIOS.NONE
        ) {

            return {

                stage:
                    STAGES.FAILURE,

                detected:
                    false,

                declared:
                    false,

                scenario:
                    FAILURE_SCENARIOS.NONE,

                severity:
                    SEVERITY.NONE,

                condition:
                    "FAILURE EVENT NOT DECLARED",

                explanation:
                    "No explicit technical failure scenario was supplied. Environmental stress does not automatically create a failure event.",

                source:
                    "V&V FAILURE SCENARIO INPUT"

            };

        }


        let severity =
            SEVERITY.MEDIUM;


        if (
            normalizedScenario ===
            FAILURE_SCENARIOS.DEAD_SHIP
        ) {

            severity =
                SEVERITY.CRITICAL;

        }

        else if (
            normalizedScenario ===
            FAILURE_SCENARIOS.COMPOUND_FAILURE
        ) {

            severity =
                SEVERITY.HIGH;

        }

        else if (
            normalizedScenario ===
            FAILURE_SCENARIOS.POWER_RESERVE_DEGRADATION
        ) {

            severity =
                SEVERITY.HIGH;

        }


        return {

            stage:
                STAGES.FAILURE,

            detected:
                true,

            declared:
                true,

            scenario:
                normalizedScenario,

            severity:
                severity,

            condition:
                "EXPLICIT SIMULATED FAILURE EVENT",

            explanation:
                "Failure progression is initiated from an explicitly declared V&V research scenario.",

            source:
                "V&V FAILURE SCENARIO INPUT"

        };

    }


    /* ========================================================
       DEPENDENCY ASSESSMENT
       ======================================================== */

    function assessDependency(
        result,
        failure
    ) {

        const primary =
            result.primary;

        const secondary =
            result.secondary;

        const stabilizer =
            result.stabilizer;


        const dependencyDetected =
            failure.detected;


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
                    ? "The explicit failure scenario is assessed against the existing layered decision architecture."
                    : "No failure event has been declared; therefore no failure dependency progression is inferred.",

            source:
                "PRIMARY / SECONDARY / STABILIZER RESULT"

        };

    }


    /* ========================================================
       CASCADE ASSESSMENT
       ======================================================== */

    function assessCascade(
        result,
        environment,
        failure,
        dependency
    ) {

        /*
         * Environmental severity alone cannot create cascade.
         *
         * Cascade requires:
         * - explicit failure
         * - dependency identified
         * - sufficiently significant failure severity
         */

        const cascadeDetected =
            failure.detected
            &&
            dependency.detected
            &&
            (
                failure.severity === SEVERITY.HIGH
                ||
                failure.severity === SEVERITY.CRITICAL
            );


        let propagation =
            "NONE";


        if (
            failure.detected
            &&
            dependency.detected
            &&
            failure.severity === SEVERITY.MEDIUM
        ) {

            propagation =
                "DEPENDENCY MONITORED — NO CASCADE INFERRED";

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

            environmentalCondition:
                environment.condition,

            explanation:
                cascadeDetected
                    ? "The explicit failure scenario is assessed as capable of propagating across multiple decision layers."
                    : "No cascade is inferred from environmental stress alone or from an undeclared failure event.",

            source:
                "FAILURE + DEPENDENCY TRACE"

        };

    }


    /* ========================================================
       REDUNDANCY ASSESSMENT
       ======================================================== */

    function assessRedundancy(
        result,
        failure,
        cascade
    ) {

        const reserve =
            result.reservePowerVerification
            || {};


        const reserveVerified =
            reserve.reserveVerified === true;


        let redundancyStatus =
            "NOT REQUIRED — NO FAILURE CASCADE";


        let redundancyLevel =
            "NOT ASSESSED";


        if (
            failure.detected
        ) {

            redundancyStatus =
                "REDUNDANCY ASSESSMENT REQUIRED";


            redundancyLevel =
                reserveVerified
                    ? "RESERVE VERIFIED"
                    : "RESERVE NOT VERIFIED";

        }


        if (
            failure.scenario ===
            FAILURE_SCENARIOS.DEAD_SHIP
        ) {

            redundancyStatus =
                reserveVerified
                    ? "DEGRADED REDUNDANCY — RESERVE VERIFIED"
                    : "REDUNDANCY NOT VERIFIED";

            redundancyLevel =
                reserveVerified
                    ? "LIMITED / VERIFIED"
                    : "LIMITED / NOT VERIFIED";

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

            physicalRedundancyAssumed:
                false,

            explanation:
                "Redundancy is assessed from the existing simulation's reserve-power verification and layered decision state. No physical redundancy is commanded or assumed.",

            source:
                "EXISTING RESERVE-POWER VERIFICATION"

        };

    }


    /* ========================================================
       HUMAN INTERVENTION ASSESSMENT
       ======================================================== */

    function assessHumanIntervention(
        result,
        failure,
        cascade
    ) {

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
        environment,
        failure,
        cascade,
        redundancy,
        human
    ) {

        let state =
            "STABLE";


        let stateClass =
            "NORMAL";


        /*
         * DEAD-SHIP STATE MUST BE EXPLICIT.
         *
         * It is never inferred solely from:
         * - environmental stress
         * - high risk
         * - reserve not verified
         */

        if (
            failure.scenario ===
            FAILURE_SCENARIOS.DEAD_SHIP
        ) {

            state =
                STAGES.DEAD_SHIP_STATE;

            stateClass =
                "EXPLICIT SIMULATED DEAD-SHIP SCENARIO";

        }

        else if (
            failure.detected
            &&
            cascade.detected
        ) {

            state =
                STAGES.DEGRADED_STATE;

            stateClass =
                "DEGRADED";

        }

        else if (
            failure.detected
        ) {

            state =
                STAGES.DEGRADED_STATE;

            stateClass =
                "FAILURE CONDITION — CASCADE NOT CONFIRMED";

        }

        else if (
            environment.severity ===
            SEVERITY.MEDIUM
            ||
            environment.severity ===
            SEVERITY.HIGH
            ||
            environment.severity ===
            SEVERITY.CRITICAL
        ) {

            state =
                "ENVIRONMENTAL STRESS — NO FAILURE DECLARED";

            stateClass =
                "ENVIRONMENTAL CONDITION";

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
        environment,
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
                    STAGES.ENVIRONMENT,

                status:
                    environment.condition

            },

            {

                stage:
                    STAGES.FAILURE,

                status:
                    failure.detected
                        ? failure.scenario
                        : "NOT DECLARED"

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

    function evaluate(
        result,
        failureScenario
    ) {

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


        const environment =
            assessEnvironment(
                result
            );


        const failure =
            assessFailure(
                result,
                failureScenario
            );


        const dependency =
            assessDependency(
                result,
                failure
            );


        const cascade =
            assessCascade(
                result,
                environment,
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
                environment,
                failure,
                cascade,
                redundancy,
                human
            );


        const trace =
            buildTrace(
                environment,
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

            inputScenario: {

                failureDeclared:
                    failure.declared,

                failureScenario:
                    failure.scenario

            },

            progression: {

                environment:
                    environment,

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

                environment:
                    environment.condition,

                failure:
                    failure.detected
                        ? failure.scenario
                        : "FAILURE EVENT NOT DECLARED",

                dependency:
                    dependency.detected
                        ? "DEPENDENCY IDENTIFIED"
                        : "NO FAILURE DEPENDENCY",

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

            &&

            typeof assessEnvironment ===
            "function"

            &&

            typeof assessFailure ===
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

        failureScenarios:
            FAILURE_SCENARIOS,

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
            "ENVIRONMENT → EXPLICIT FAILURE → DEPENDENCY"
        );

        console.log(
            "→ CASCADE → REDUNDANCY"
        );

        console.log(
            "→ HUMAN INTERVENTION → DEGRADED / DEAD-SHIP"
        );

        console.log(
            "FAILURE IS NOT INFERRED FROM ENVIRONMENTAL STRESS"
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