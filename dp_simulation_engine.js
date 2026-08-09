/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE SIMULATION ENGINE

   FILE:
   dp_simulation_engine.js

   VERSION:
   1.0.0

   PURPOSE:
   Deterministic browser-based DP resilience simulation engine.

   ARCHITECTURE:

   ENVIRONMENT
        ↓
   PRIMARY AI
        ↓
   SECONDARY AI
        ↓
   STABILIZER
        ↓
   HUMAN-IN-THE-LOOP
        ↓
   SIMULATED DP ACTION

   SAFETY BOUNDARY:
   RESEARCH / SIMULATION ONLY.

   THIS ENGINE DOES NOT COMMAND:
   - REAL DP SYSTEMS
   - REAL THRUSTERS
   - PROPULSION
   - STEERING
   - NAVIGATION
   - VESSEL AUTOMATION
   - SAFETY SYSTEMS

   ALL OUTPUTS ARE SIMULATED.

   HUMAN AUTHORITY REMAINS FINAL.
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       ENGINE CONFIGURATION
    ======================================================== */

    const ENGINE_NAME =
        "DPSimulationEngine";


    const VERSION =
        "1.0.0";


    const MODE =
        "SIMULATION ONLY";


    const NOMINAL_THRUST =
        100;


    const MAX_INPUT =
        100;


    const MIN_INPUT =
        0;


    /* ========================================================
       RISK THRESHOLDS
    ======================================================== */

    const RISK_THRESHOLDS = {

        LOW:
            30,

        MEDIUM:
            50,

        HIGH:
            75,

        CRITICAL:
            90

    };


    /* ========================================================
       INPUT WEIGHTS
    ======================================================== */

    const ENVIRONMENT_WEIGHTS = {

        wind:
            0.25,

        current:
            0.30,

        wave:
            0.25,

        tidal:
            0.20

    };


    /* ========================================================
       VALIDATE INPUT VALUE
    ======================================================== */

    function normalizeInput(
        value
    ) {

        const number =
            Number(value);


        if (
            !Number.isFinite(number)
        ) {

            return 0;

        }


        return Math.min(
            MAX_INPUT,
            Math.max(
                MIN_INPUT,
                number
            )
        );

    }


    /* ========================================================
       NORMALIZE ENVIRONMENT
    ======================================================== */

    function normalizeEnvironment(
        inputs
    ) {

        inputs =
            inputs ||
            {};


        return {

            wind:
                normalizeInput(
                    inputs.wind
                ),

            current:
                normalizeInput(
                    inputs.current
                ),

            wave:
                normalizeInput(
                    inputs.wave
                ),

            tidal:
                normalizeInput(
                    inputs.tidal
                )

        };

    }


    /* ========================================================
       CALCULATE ENVIRONMENTAL STRESS
    ======================================================== */

    function calculateEnvironmentalStress(
        environment
    ) {

        return (

            environment.wind *
            ENVIRONMENT_WEIGHTS.wind

            +

            environment.current *
            ENVIRONMENT_WEIGHTS.current

            +

            environment.wave *
            ENVIRONMENT_WEIGHTS.wave

            +

            environment.tidal *
            ENVIRONMENT_WEIGHTS.tidal

        );

    }


    /* ========================================================
       CLASSIFY RISK
    ======================================================== */

    function classifyRisk(
        stress
    ) {

        if (
            stress >=
            RISK_THRESHOLDS.CRITICAL
        ) {

            return "CRITICAL";

        }


        if (
            stress >=
            RISK_THRESHOLDS.HIGH
        ) {

            return "HIGH";

        }


        if (
            stress >=
            RISK_THRESHOLDS.MEDIUM
        ) {

            return "MEDIUM";

        }


        return "LOW";

    }


    /* ========================================================
       ENGINE VALIDATION
    ======================================================== */

    function validate() {

        return (

            typeof normalizeEnvironment ===
            "function"

            &&

            typeof calculateEnvironmentalStress ===
            "function"

            &&

            typeof classifyRisk ===
            "function"

        );

    }


    /* ========================================================
       PART 1 STATUS
    ======================================================== */

    /*
     * INPUT PATH:
     *
     * HTML sliders
     *      ↓
     * dp_cockpit.js
     *      ↓
     * DPSimulationEngine.run()
     *      ↓
     * normalizeEnvironment()
     *      ↓
     * calculateEnvironmentalStress()
     *      ↓
     * classifyRisk()
     *
     * This establishes the deterministic environmental
     * assessment foundation.
     */
/* ========================================================
       PRIMARY AI — NORMAL CONTROL ASSESSMENT
    ======================================================== */

    function evaluatePrimary(
        environment,
        stress
    ) {

        let mode =
            "NORMAL CONTROL";

        let response =
            "CONTINUE SIMULATED DP MONITORING";


        if (
            stress >=
            RISK_THRESHOLDS.MEDIUM
        ) {

            mode =
                "ELEVATED CONTROL";

            response =
                "INCREASED SIMULATED DP MONITORING";

        }


        if (
            stress >=
            RISK_THRESHOLDS.HIGH
        ) {

            mode =
                "HIGH LOAD CONTROL";

            response =
                "SIMULATED HIGH-LOAD RESPONSE";

        }


        if (
            stress >=
            RISK_THRESHOLDS.CRITICAL
        ) {

            mode =
                "CRITICAL CONTROL";

            response =
                "SIMULATED CRITICAL RESPONSE";

        }


        return {

            mode:
                mode,

            response:
                response,

            stress:
                Number(stress).toFixed(2),

            environment:
                environment

        };

    }


    /* ========================================================
       SECONDARY AI — INDEPENDENT SAFETY ASSESSMENT
    ======================================================== */

    function evaluateSecondary(
        environment,
        stress
    ) {

        let mode =
            "INDEPENDENT MONITORING";

        let assessment =
            "NO SECONDARY INTERVENTION INDICATED";


        /*
         * The secondary layer deliberately performs
         * its own deterministic assessment rather than
         * simply copying the Primary AI state.
         */

        const currentWaveFactor =
            (
                environment.current +
                environment.wave
            ) / 2;


        if (
            stress >=
            RISK_THRESHOLDS.MEDIUM
            ||
            currentWaveFactor >= 60
        ) {

            mode =
                "INDEPENDENT SAFETY ADVISORY";

            assessment =
                "SECONDARY REVIEW RECOMMENDED";

        }


        if (
            stress >=
            RISK_THRESHOLDS.HIGH
            ||
            currentWaveFactor >= 75
        ) {

            mode =
                "INDEPENDENT SAFETY ESCALATION";

            assessment =
                "SECONDARY SAFETY REVIEW REQUIRED";

        }


        if (
            stress >=
            RISK_THRESHOLDS.CRITICAL
        ) {

            mode =
                "INDEPENDENT CRITICAL SAFETY REVIEW";

            assessment =
                "IMMEDIATE HUMAN REVIEW RECOMMENDED";

        }


        return {

            mode:
                mode,

            assessment:
                assessment,

            independentStress:
                Number(stress).toFixed(2)

        };

    }


    /* ========================================================
       STABILIZER — ARBITRATION LAYER
    ======================================================== */

    function evaluateStabilizer(
        primary,
        secondary,
        risk
    ) {

        let mode =
            "NORMAL ARBITRATION";

        let source =
            "PRIMARY AI";

        let status =
            "STABLE";

        let finalOutput =
            0;


        /*
         * LOW RISK
         */

        if (
            risk ===
            "LOW"
        ) {

            mode =
                "NORMAL ARBITRATION";

            source =
                "PRIMARY AI";

            status =
                "STABLE";

            finalOutput =
                20;

        }


        /*
         * MEDIUM RISK
         */

        if (
            risk ===
            "MEDIUM"
        ) {

            mode =
                "PREVENTIVE ARBITRATION";

            source =
                "PRIMARY + SECONDARY";

            status =
                "ELEVATED MONITORING";

            finalOutput =
                45;

        }


        /*
         * HIGH RISK
         */

        if (
            risk ===
            "HIGH"
        ) {

            mode =
                "RESILIENCE ARBITRATION";

            source =
                "SECONDARY SAFETY LAYER";

            status =
                "HUMAN REVIEW REQUIRED";

            finalOutput =
                70;

        }


        /*
         * CRITICAL RISK
         */

        if (
            risk ===
            "CRITICAL"
        ) {

            mode =
                "CRITICAL STABILIZATION";

            source =
                "SECONDARY + HUMAN AUTHORITY";

            status =
                "IMMEDIATE HUMAN REVIEW";

            finalOutput =
                90;

        }


        return {

            mode:
                mode,

            source:
                source,

            status:
                status,

            finalOutput:
                finalOutput,

            primaryState:
                primary.mode,

            secondaryState:
                secondary.mode

        };

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function determineSystemStatus(
        risk
    ) {

        if (
            risk ===
            "CRITICAL"
        ) {

            return "CRITICAL — HUMAN REVIEW";

        }


        if (
            risk ===
            "HIGH"
        ) {

            return "HIGH LOAD — HUMAN REVIEW";

        }


        if (
            risk ===
            "MEDIUM"
        ) {

            return "ELEVATED — MONITORING";

        }


        return "SYSTEM STABLE";

    }


    /* ========================================================
       PART 2 STATUS
    ======================================================== */

    /*
     * CONTROL PATH:
     *
     * ENVIRONMENT
     *      ↓
     * PRIMARY AI
     *      ↓
     * SECONDARY AI
     *      ↓
     * STABILIZER
     *      ↓
     * HUMAN AUTHORITY
     *
     * No layer in this section sends commands to
     * real marine equipment.
     */