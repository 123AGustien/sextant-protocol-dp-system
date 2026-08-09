/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP ANOMALY RESPONSE RULES
 * ============================================================
 *
 * File:
 *     dp_anomaly_response_rules.js
 *
 * Version:
 *     SPD-DP-ANOMALY-RESPONSE-V1
 *
 * Purpose:
 *     Deterministic decision-support rules for anomalies
 *     occurring WHILE A VESSEL IS ALREADY ON SIMULATED DP.
 *
 * IMPORTANT DISTINCTION:
 *
 *     DP ENTRY LIMITS
 *     ----------------
 *     These determine whether simulated DP operation should
 *     be considered permissible before entering DP.
 *
 *     IN-DP ANOMALY RESPONSE
 *     ----------------------
 *     These rules assess changing conditions after the vessel
 *     is already assumed to be on DP.
 *
 * SAFETY:
 *
 *     RESEARCH / SIMULATION ONLY.
 *
 *     This module does NOT:
 *
 *       - engage DP
 *       - disengage DP
 *       - command thrusters
 *       - command propulsion
 *       - command steering
 *       - command joystick control
 *       - command heading changes
 *       - command vessel movement
 *       - command vessel relocation
 *
 *     All outputs are simulated recommendations for qualified
 *     human consideration.
 *
 *     HUMAN AUTHORITY REMAINS FINAL.
 *
 * ============================================================
 */

(function () {

    "use strict";


    /* ========================================================
       MODULE CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPAnomalyResponseRules";

    const VERSION =
        "SPD-DP-ANOMALY-RESPONSE-V1";


    /*
     * These are SIMULATION thresholds.
     *
     * They are NOT vessel-specific operational limits.
     *
     * Actual vessel limits must always come from the
     * vessel's approved operational documentation,
     * capability plots, DP FMEA, ASOG/CAM/TAM and
     * applicable procedures.
     */

    const SIMULATION_LIMITS = {

        maxCurrentForDPEntry:
            70,

        maxTidalForDPEntry:
            70,

        anomalyCurrent:
            70,

        anomalyTidal:
            70,

        severeCurrent:
            85,

        severeTidal:
            85,

        positionErrorWarning:
            0.15,

        positionErrorHigh:
            0.30,

        positionErrorCritical:
            0.50

    };


    /* ========================================================
       INPUT HELPERS
    ======================================================== */

    function number(value, fallback) {

        const n =
            Number(value);

        return Number.isFinite(n)
            ? n
            : fallback;

    }


    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(
                max,
                number(value, min)
            )
        );

    }


    function normaliseEnvironment(environment) {

        environment =
            environment || {};

        return {

            wind:
                clamp(
                    environment.wind,
                    0,
                    100
                ),

            current:
                clamp(
                    environment.current,
                    0,
                    100
                ),

            wave:
                clamp(
                    environment.wave,
                    0,
                    100
                ),

            tidal:
                clamp(
                    environment.tidal,
                    0,
                    100
                )

        };

    }


    /* ========================================================
       DP ENTRY GATE
       ========================================================
       
       This is deliberately separate from in-DP anomaly
       handling.
    */

    function evaluateDPEntryGate(environment) {

        const env =
            normaliseEnvironment(
                environment
            );


        const currentExceeded =
            env.current >
            SIMULATION_LIMITS.maxCurrentForDPEntry;


        const tidalExceeded =
            env.tidal >
            SIMULATION_LIMITS.maxTidalForDPEntry;


        if (
            currentExceeded ||
            tidalExceeded
        ) {

            return {

                status:
                    "DP ENTRY NOT RECOMMENDED",

                permitted:
                    false,

                reason:
                    currentExceeded &&
                    tidalExceeded

                        ? "SIMULATED CURRENT AND TIDAL STREAM LIMITS EXCEEDED."

                        : currentExceeded

                            ? "SIMULATED CURRENT LIMIT EXCEEDED."

                            : "SIMULATED TIDAL STREAM LIMIT EXCEEDED.",

                humanDecision:
                    "QUALIFIED HUMAN OPERATOR MUST DETERMINE THE APPROPRIATE OPERATING MODE."

            };

        }


        return {

            status:
                "DP ENTRY WITHIN SIMULATED ENVELOPE",

            permitted:
                true,

            reason:
                "Current and tidal stream remain within the simulated entry envelope.",

            humanDecision:
                "DP ENTRY REMAINS SUBJECT TO APPROVED VESSEL PROCEDURES AND HUMAN AUTHORITY."

        };

    }


    /* ========================================================
       IN-DP ANOMALY DETECTION
       ======================================================== */

    function detectDPAnomalies(
        environment,
        updatedState
    ) {

        const env =
            normaliseEnvironment(
                environment
            );

        updatedState =
            updatedState || {};


        const positionError =
            number(
                updatedState.positionError,
                0
            );


        const anomalies = [];


        if (
            env.current >=
            SIMULATION_LIMITS.anomalyCurrent
        ) {

            anomalies.push(
                "CURRENT_STREAM_ANOMALY"
            );

        }


        if (
            env.tidal >=
            SIMULATION_LIMITS.anomalyTidal
        ) {

            anomalies.push(
                "TIDAL_STREAM_ANOMALY"
            );

        }


        if (
            env.current >=
            SIMULATION_LIMITS.severeCurrent
        ) {

            anomalies.push(
                "SEVERE_CURRENT_CONDITION"
            );

        }


        if (
            env.tidal >=
            SIMULATION_LIMITS.severeTidal
        ) {

            anomalies.push(
                "SEVERE_TIDAL_CONDITION"
            );

        }


        if (
            positionError >=
            SIMULATION_LIMITS.positionErrorWarning
        ) {

            anomalies.push(
                "POSITION_ERROR_INCREASE"
            );

        }


        if (
            positionError >=
            SIMULATION_LIMITS.positionErrorHigh
        ) {

            anomalies.push(
                "HIGH_POSITION_DEVIATION"
            );

        }


        if (
            positionError >=
            SIMULATION_LIMITS.positionErrorCritical
        ) {

            anomalies.push(
                "CRITICAL_POSITION_DEVIATION"
            );

        }


        return anomalies;

    }


    /* ========================================================
       RESPONSE PRIORITY
       ======================================================== */

    function determineAnomalyPriority(
        anomalies
    ) {

        if (
            anomalies.includes(
                "CRITICAL_POSITION_DEVIATION"
            ) ||
            anomalies.includes(
                "SEVERE_CURRENT_CONDITION"
            ) ||
            anomalies.includes(
                "SEVERE_TIDAL_CONDITION"
            )
        ) {

            return "CRITICAL";

        }


        if (
            anomalies.includes(
                "HIGH_POSITION_DEVIATION"
            )
        ) {

            return "HIGH";

        }


        if (
            anomalies.length > 0
        ) {

            return "MEDIUM";

        }


        return "LOW";

    }


    /* ========================================================
       RESPONSE RECOMMENDATIONS
       ======================================================== */

    function buildAnomalyRecommendations(
        anomalies,
        priority
    ) {

        const actions = [];


        /*
         * Always begin with verification.
         */

        if (
            anomalies.length > 0
        ) {

            actions.push(
                "Verify the simulated anomaly and relevant vessel/system indications."
            );

        }


        /*
         * Medium-level environmental anomaly.
         */

        if (
            priority === "MEDIUM"
        ) {

            actions.push(
                "Maintain enhanced monitoring of vessel position, heading and environmental trend."
            );

            actions.push(
                "Consider whether continued DP remains appropriate under the vessel's approved operating criteria."
            );

            actions.push(
                "Consider preparation for manual/joystick control if required by the qualified operator."
            );

        }


        /*
         * High-level anomaly.
         */

        if (
            priority === "HIGH"
        ) {

            actions.push(
                "Increase operator attention and assess the vessel's position and heading trend."
            );

            actions.push(
                "Consider a controlled heading adjustment if appropriate to the simulated environmental condition."
            );

            actions.push(
                "Prepare for possible transition from DP to an approved alternative control mode."
            );

            actions.push(
                "Assess whether moving away from the affected location should be considered under approved procedures."
            );

        }


        /*
         * Critical anomaly.
         */

        if (
            priority === "CRITICAL"
        ) {

            actions.push(
                "Immediate qualified human review is required."
            );

            actions.push(
                "Assess whether remaining on DP continues to be appropriate."
            );

            actions.push(
                "Consider transition to an approved manual/joystick control mode where applicable."
            );

            actions.push(
                "Consider heading change or controlled movement to a safer location if justified by approved procedures."
            );

            actions.push(
                "Escalate to the vessel's approved emergency, ASOG/CAM/TAM or operational response procedures as applicable."
            );

        }


        /*
         * No anomaly.
         */

        if (
            actions.length === 0
        ) {

            actions.push(
                "Continue simulated monitoring."
            );

        }


        return actions;

    }


    /* ========================================================
       OPERATOR DECISION BOUNDARY
       ======================================================== */

    function determineHumanDecision(
        priority
    ) {

        if (
            priority === "CRITICAL"
        ) {

            return (
                "HUMAN DECISION REQUIRED — " +
                "NO AUTONOMOUS OPERATIONAL ACTION AUTHORISED."
            );

        }


        if (
            priority === "HIGH"
        ) {

            return (
                "HUMAN REVIEW REQUIRED — " +
                "SIMULATED RESPONSE OPTIONS PRESENTED."
            );

        }


        if (
            priority === "MEDIUM"
        ) {

            return (
                "OPERATOR AWARENESS RECOMMENDED — " +
                "HUMAN AUTHORITY REMAINS FINAL."
            );

        }


        return (
            "HUMAN AUTHORITY AVAILABLE — " +
            "CONTINUE SIMULATED MONITORING."
        );

    }


    /* ========================================================
       MAIN IN-DP ASSESSMENT
       ======================================================== */

    function assessInDPAnomaly(
        environment,
        updatedState
    ) {

        const env =
            normaliseEnvironment(
                environment
            );


        const anomalies =
            detectDPAnomalies(
                env,
                updatedState
            );


        const priority =
            determineAnomalyPriority(
                anomalies
            );


        const recommendedActions =
            buildAnomalyRecommendations(
                anomalies,
                priority
            );


        return {

            module:
                MODULE_NAME,

            version:
                VERSION,

            mode:
                "SIMULATION",

            operatingState:
                "VESSEL ASSUMED ALREADY ON SIMULATED DP",

            anomalyDetected:
                anomalies.length > 0,

            anomalies:
                anomalies,

            priority:
                priority,

            status:
                anomalies.length > 0
                    ? "IN-DP ANOMALY DETECTED"
                    : "IN-DP CONDITIONS MONITORING",

            primaryRecommendation:
                anomalies.length > 0
                    ? "VERIFY → ASSESS → PRESENT HUMAN DECISION OPTIONS"
                    : "CONTINUE SIMULATED MONITORING",

            recommendedActions:
                recommendedActions,

            operatorDecision:
                determineHumanDecision(
                    priority
                ),

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            operationalControl:
                false,

            timestamp:
                new Date().toISOString()

        };

    }


    /* ========================================================
       PUBLIC API
       ======================================================== */

    window.DPAnomalyResponseRules = {

        name:
            MODULE_NAME,

        version:
            VERSION,

        limits:
            SIMULATION_LIMITS,

        evaluateDPEntryGate:
            evaluateDPEntryGate,

        detectDPAnomalies:
            detectDPAnomalies,

        assessInDPAnomaly:
            assessInDPAnomaly

    };


    /* ========================================================
       STARTUP
       ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL DP ANOMALY RESPONSE RULES — READY"
        );

    }


})();