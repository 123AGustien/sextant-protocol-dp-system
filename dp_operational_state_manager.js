/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP ON-OPERATIONS ANOMALY MANAGER
 * ============================================================
 *
 * File:
 *     dp_anomaly_manager.js
 *
 * Version:
 *     SPD-DP-ANOMALY-V1
 *
 * PURPOSE:
 *     Detect and classify simulated anomalies occurring
 *     while a vessel is already operating on DP.
 *
 * IMPORTANT:
 *
 *     Environmental limits for deciding whether a vessel
 *     should ENTER DP are separate from this module.
 *
 *     This module addresses:
 *
 *         VESSEL ALREADY ON DP
 *                 ↓
 *         ANOMALY DETECTED
 *                 ↓
 *         VERIFY
 *                 ↓
 *         ASSESS
 *                 ↓
 *         RECOMMEND
 *                 ↓
 *         HUMAN DECISION
 *
 * SAFETY:
 *
 *     RESEARCH / SIMULATION / TRAINING ONLY.
 *
 *     This module does NOT:
 *
 *       - command DP
 *       - command thrusters
 *       - command propulsion
 *       - command steering
 *       - command joystick systems
 *       - command navigation
 *       - command vessel automation
 *
 *     HUMAN OPERATOR RETAINS FINAL AUTHORITY.
 *
 * ============================================================
 */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPAnomalyManager";

    const VERSION =
        "SPD-DP-ANOMALY-V1";

    const MAX_HISTORY =
        100;


    /*
     * Environmental thresholds here are simulation
     * classification thresholds only.
     *
     * They do NOT constitute vessel operational limits.
     */

    const THRESHOLDS = {

        POSITION_ERROR_HIGH:
            60,

        POSITION_ERROR_CRITICAL:
            80,

        THRUST_DEMAND_HIGH:
            70,

        THRUST_DEMAND_CRITICAL:
            90,

        CURRENT_HIGH:
            70,

        CURRENT_CRITICAL:
            90,

        WIND_HIGH:
            70,

        WIND_CRITICAL:
            90,

        WAVE_HIGH:
            70,

        WAVE_CRITICAL:
            90,

        TIDAL_HIGH:
            70,

        TIDAL_CRITICAL:
            90

    };


    /* ========================================================
       STATE
    ======================================================== */

    const state = {

        dpActive:
            false,

        anomalyActive:
            false,

        currentAnomaly:
            null,

        history:
            []

    };


    /* ========================================================
       SAFE NUMBER
    ======================================================== */

    function safeNumber(
        value,
        fallback
    ) {

        const number =
            Number(value);

        return Number.isFinite(number)
            ? number
            : (
                fallback === undefined
                    ? 0
                    : fallback
            );

    }


    /* ========================================================
       NORMALIZE INPUT
    ======================================================== */

    function normalizeInput(
        input
    ) {

        input =
            input || {};

        return {

            dpActive:
                Boolean(
                    input.dpActive
                ),

            positionError:
                safeNumber(
                    input.positionError
                ),

            thrustDemand:
                safeNumber(
                    input.thrustDemand
                ),

            wind:
                safeNumber(
                    input.wind
                ),

            current:
                safeNumber(
                    input.current
                ),

            wave:
                safeNumber(
                    input.wave
                ),

            tidal:
                safeNumber(
                    input.tidal
                ),

            systemStatus:
                input.systemStatus ||
                "UNKNOWN"

        };

    }


    /* ========================================================
       VERIFY DP STATE
    ======================================================== */

    function verifyDPState(
        input
    ) {

        return {

            dpActive:
                input.dpActive,

            systemStatus:
                input.systemStatus,

            verified:
                input.dpActive === true

        };

    }


    /* ========================================================
       DETECT ANOMALIES
    ======================================================== */

    function detect(
        input
    ) {

        const anomalies = [];


        /*
         * No on-DP anomaly assessment is performed when
         * the simulated vessel is not on DP.
         */

        if (
            input.dpActive !== true
        ) {

            return anomalies;

        }


        if (
            input.positionError >=
            THRESHOLDS.POSITION_ERROR_CRITICAL
        ) {

            anomalies.push({

                type:
                    "POSITION_ERROR_CRITICAL",

                severity:
                    "CRITICAL",

                value:
                    input.positionError

            });

        } else if (
            input.positionError >=
            THRESHOLDS.POSITION_ERROR_HIGH
        ) {

            anomalies.push({

                type:
                    "POSITION_ERROR_HIGH",

                severity:
                    "HIGH",

                value:
                    input.positionError

            });

        }


        if (
            input.thrustDemand >=
            THRESHOLDS.THRUST_DEMAND_CRITICAL
        ) {

            anomalies.push({

                type:
                    "THRUST_DEMAND_CRITICAL",

                severity:
                    "CRITICAL",

                value:
                    input.thrustDemand

            });

        } else if (
            input.thrustDemand >=
            THRESHOLDS.THRUST_DEMAND_HIGH
        ) {

            anomalies.push({

                type:
                    "THRUST_DEMAND_HIGH",

                severity:
                    "HIGH",

                value:
                    input.thrustDemand

            });

        }


        detectEnvironmentalAnomaly(
            anomalies,
            "WIND",
            input.wind
        );


        detectEnvironmentalAnomaly(
            anomalies,
            "CURRENT",
            input.current
        );


        detectEnvironmentalAnomaly(
            anomalies,
            "WAVE",
            input.wave
        );


        detectEnvironmentalAnomaly(
            anomalies,
            "TIDAL",
            input.tidal
        );


        return anomalies;

    }


    /* ========================================================
       ENVIRONMENTAL ANOMALY
    ======================================================== */

    function detectEnvironmentalAnomaly(
        anomalies,
        type,
        value
    ) {

        const high =
            THRESHOLDS[
                type +
                "_HIGH"
            ];

        const critical =
            THRESHOLDS[
                type +
                "_CRITICAL"
            ];


        if (
            value >= critical
        ) {

            anomalies.push({

                type:
                    type +
                    "_CRITICAL",

                severity:
                    "CRITICAL",

                value:
                    value

            });

            return;

        }


        if (
            value >= high
        ) {

            anomalies.push({

                type:
                    type +
                    "_HIGH",

                severity:
                    "HIGH",

                value:
                    value

            });

        }

    }


    /* ========================================================
       CLASSIFY ANOMALY
    ======================================================== */

    function classify(
        anomalies
    ) {

        if (
            anomalies.length === 0
        ) {

            return "NONE";

        }


        if (
            anomalies.some(
                function (item) {

                    return item.severity ===
                        "CRITICAL";

                }
            )
        ) {

            return "CRITICAL";

        }


        if (
            anomalies.some(
                function (item) {

                    return item.severity ===
                        "HIGH";

                }
            )
        ) {

            return "HIGH";

        }


        return "ADVISORY";

    }


    /* ========================================================
       CREATE RECOMMENDATION
    ======================================================== */

    function createRecommendation(
        classification,
        anomalies
    ) {

        if (
            classification ===
            "NONE"
        ) {

            return {

                priority:
                    "NORMAL",

                status:
                    "NO ON-DP ANOMALY DETECTED",

                primary:
                    "Continue simulated DP monitoring.",

                actions: [

                    "Continue monitoring simulated DP status.",

                    "Continue monitoring environmental conditions."

                ],

                humanAuthority:
                    "FINAL",

                autonomousCommand:
                    false

            };

        }


        if (
            classification ===
            "ADVISORY"
        ) {

            return {

                priority:
                    "ADVISORY",

                status:
                    "ON-DP ANOMALY — MONITOR",

                primary:
                    "Verify the simulated anomaly and monitor DP resilience.",

                actions: [

                    "Verify affected simulated parameter.",

                    "Assess position stability and control margin.",

                    "Continue enhanced operator monitoring.",

                    "Review environmental trend."

                ],

                humanAuthority:
                    "FINAL",

                autonomousCommand:
                    false

            };

        }


        if (
            classification ===
            "HIGH"
        ) {

            return {

                priority:
                    "HIGH",

                status:
                    "ON-DP ANOMALY — HUMAN ASSESSMENT",

                primary:
                    "Conduct immediate simulated resilience assessment.",

                actions: [

                    "Verify the anomaly using available simulated indications.",

                    "Assess simulated position error and control margin.",

                    "Review simulated DP redundancy and system status.",

                    "Assess environmental loading and trend.",

                    "Prepare contingency control considerations.",

                    "Human operator review required."

                ],

                humanAuthority:
                    "FINAL",

                autonomousCommand:
                    false

            };

        }


        return {

            priority:
                "CRITICAL",

            status:
                "CRITICAL ON-DP ANOMALY",

            primary:
                "Perform immediate simulated safety and resilience assessment.",

            actions: [

                "Verify the critical anomaly.",

                "Assess simulated position stability immediately.",

                "Assess available simulated control capability and redundancy.",

                "Assess environmental loading and deterioration trend.",

                "Review continuation of the simulated operation.",

                "Consider contingency or withdrawal options for human evaluation.",

                "Human operator retains final authority."

            ],

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false

        };

    }


    /* ========================================================
       PROCESS
    ======================================================== */

    function process(
        input
    ) {

        const normalized =
            normalizeInput(
                input
            );


        const verification =
            verifyDPState(
                normalized
            );


        /*
         * Explicit boundary:
         *
         * If the vessel is not simulated as being on DP,
         * this module does not generate an on-DP anomaly.
         */

        if (
            verification.verified !== true
        ) {

            state.dpActive =
                false;

            state.anomalyActive =
                false;

            state.currentAnomaly =
                null;


            return {

                module:
                    MODULE_NAME,

                version:
                    VERSION,

                dpActive:
                    false,

                anomalyActive:
                    false,

                classification:
                    "NOT_ON_DP",

                anomalies:
                    [],

                recommendation:
                    null,

                humanAuthority:
                    "FINAL",

                autonomousCommand:
                    false

            };

        }


        const anomalies =
            detect(
                normalized
            );


        const classification =
            classify(
                anomalies
            );


        const recommendation =
            createRecommendation(
                classification,
                anomalies
            );


        const result = {

            timestamp:
                new Date().toISOString(),

            module:
                MODULE_NAME,

            version:
                VERSION,

            dpActive:
                true,

            anomalyActive:
                anomalies.length > 0,

            classification:
                classification,

            anomalies:
                anomalies,

            recommendation:
                recommendation,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false

        };


        state.dpActive =
            true;

        state.anomalyActive =
            result.anomalyActive;

        state.currentAnomaly =
            result;


        state.history.push(
            result
        );


        if (
            state.history.length >
            MAX_HISTORY
        ) {

            state.history.shift();

        }


        publishEvent(
            result
        );


        return result;

    }


    /* ========================================================
       EVENT LOG
    ======================================================== */

    function publishEvent(
        result
    ) {

        const log =
            document.getElementById(
                "eventLog"
            );


        if (
            !log
        ) {

            return;

        }


        const entry =
            document.createElement(
                "div"
            );


        entry.className =
            "event-entry";


        entry.textContent =
            "[" +
            result.timestamp +
            "] [DP ANOMALY] " +
            "Classification=" +
            result.classification +
            " | AnomalyActive=" +
            result.anomalyActive +
            " | Human Authority Retained";


        log.appendChild(
            entry
        );


        log.scrollTop =
            log.scrollHeight;

    }


    /* ========================================================
       RESET
    ======================================================== */

    function reset() {

        state.dpActive =
            false;

        state.anomalyActive =
            false;

        state.currentAnomaly =
            null;

    }


    /* ========================================================
       GET STATE
    ======================================================== */

    function getState() {

        return {

            dpActive:
                state.dpActive,

            anomalyActive:
                state.anomalyActive,

            currentAnomaly:
                state.currentAnomaly,

            history: [
                ...state.history
            ],

            version:
                VERSION

        };

    }


    /* ========================================================
       PUBLIC API
    ======================================================== */

    window.DPAnomalyManager = {

        name:
            MODULE_NAME,

        version:
            VERSION,

        thresholds:
            {
                ...THRESHOLDS
            },

        process:
            process,

        detect:
            detect,

        reset:
            reset,

        getState:
            getState

    };


    /* ========================================================
       READY
    ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL DP ANOMALY MANAGER — READY"
        );

    }

})();