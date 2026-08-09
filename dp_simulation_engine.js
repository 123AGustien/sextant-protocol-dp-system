/* =========================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT
   FILE: dp_simulation_engine.js

   PURPOSE:
   Deterministic DP resilience simulation engine.

   SAFETY:
   RESEARCH / SIMULATION ONLY.
   NOT OPERATIONAL DP CONTROL SOFTWARE.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ENGINE CONSTANTS
    ===================================================== */

    const ENGINE_NAME =
        "SextantDPSimulationEngine";

    const VERSION =
        "1.0.0";

    const MODE =
        "SIMULATION";

    const NOMINAL_THRUST =
        100;


    /* =====================================================
       VESSEL PROFILE
    ===================================================== */

    const VESSEL = {

        name:
            "SEXTANT-MPSV-01",

        type:
            "Multi-Purpose Support Vessel",

        dpClass:
            "DP2-SIMULATED",

        dimensions: {

            length: 85,
            beam: 20,
            draft: 6

        },

        propulsion: {

            mainThrusters: 2,

            tunnelThrusters: 2,

            totalThrusters: 4,

            nominalThrust:
                NOMINAL_THRUST

        }

    };


    /* =====================================================
       INPUT VALIDATION
    ===================================================== */

    function clamp(value, min, max) {

        const number =
            Number(value);

        if (!Number.isFinite(number)) {

            return min;

        }

        return Math.max(
            min,
            Math.min(max, number)
        );

    }


    function normaliseInputs(inputs) {

        inputs =
            inputs || {};

        return {

            wind:
                clamp(inputs.wind, 0, 100),

            current:
                clamp(inputs.current, 0, 100),

            wave:
                clamp(inputs.wave, 0, 100),

            tidal:
                clamp(inputs.tidal, 0, 100)

        };

    }


    /* =====================================================
       ENVIRONMENTAL STRESS MODEL
    =====================================================

       Weighted deterministic model.

       Wind    = 30%
       Current = 25%
       Wave    = 30%
       Tidal   = 15%
    */

    function calculateEnvironmentalStress(inputs) {

        return (

            (inputs.wind * 0.30) +

            (inputs.current * 0.25) +

            (inputs.wave * 0.30) +

            (inputs.tidal * 0.15)

        );

    }


    /* =====================================================
       RISK CLASSIFICATION
    ===================================================== */

    function classifyRisk(stress) {

        if (stress < 35) {

            return "LOW";

        }

        if (stress < 60) {

            return "MEDIUM";

        }

        if (stress < 80) {

            return "HIGH";

        }

        return "CRITICAL";

    }


    /* =====================================================
       PRIMARY SUPERVISORY LAYER
    ===================================================== */

    function calculatePrimaryLayer(
        environmentalStress
    ) {

        /*
         * Primary layer attempts to maintain
         * simulated positional stability.
         */

        const thrustOutput =
            clamp(
                NOMINAL_THRUST -
                (environmentalStress * 0.35),
                0,
                NOMINAL_THRUST
            );

        let mode =
            "NORMAL CONTROL";

        if (environmentalStress >= 60) {

            mode =
                "STRESS COMPENSATION";

        }

        if (environmentalStress >= 80) {

            mode =
                "DEGRADED CONTROL";

        }

        return {

            layer:
                "PRIMARY AI",

            mode:

                mode,

            thrustOutput:

                thrustOutput,

            status:

                "SIMULATED"

        };

    }


    /* =====================================================
       SECONDARY SAFETY LAYER
    ===================================================== */

    function calculateSecondaryLayer(
        environmentalStress,
        risk
    ) {

        const safetyMode =
            risk === "MEDIUM" ||
            risk === "HIGH" ||
            risk === "CRITICAL";

        let mode =
            "INDEPENDENT MONITORING";

        if (risk === "MEDIUM") {

            mode =
                "PREVENTIVE SAFETY MONITORING";

        }

        if (
            risk === "HIGH" ||
            risk === "CRITICAL"
        ) {

            mode =
                "SAFETY PRIORITY";

        }

        const thrustOutput =
            clamp(
                NOMINAL_THRUST -
                (environmentalStress * 0.25),
                0,
                NOMINAL_THRUST
            );

        return {

            layer:
                "SECONDARY AI",

            mode:

                mode,

            thrustOutput:

                thrustOutput,

            status:

                safetyMode
                    ? "ACTIVE"
                    : "MONITORING",

            safetyMode:

                safetyMode

        };

    }


    /* =====================================================
       HUMAN AUTHORITY
    ===================================================== */

    function calculateHumanAuthority(
        risk
    ) {

        const override =
            risk === "HIGH" ||
            risk === "CRITICAL";

        return {

            override:

                override,

            authority:

                "HUMAN FINAL AUTHORITY",

            status:

                override
                    ? "REVIEW REQUIRED"
                    : "AVAILABLE"

        };

    }


    /* =====================================================
       STABILIZER / ARBITRATION
    ===================================================== */

    function calculateStabilizer(
        primary,
        secondary,
        risk
    ) {

        let source =
            "PRIMARY";

        let status =
            "MONITORING";

        let mode =
            "NORMAL ARBITRATION";

        let finalOutput =
            primary.thrustOutput;


        if (risk === "MEDIUM") {

            source =
                "SECONDARY SAFETY REVIEW";

            status =
                "ACTIVE";

            mode =
                "PREVENTIVE ARBITRATION";

            finalOutput =
                Math.min(
                    primary.thrustOutput,
                    secondary.thrustOutput
                );

        }


        if (
            risk === "HIGH" ||
            risk === "CRITICAL"
        ) {

            source =
                "SAFETY PRIORITY";

            status =
                "ACTIVE";

            mode =
                "HUMAN REVIEW ARBITRATION";

            finalOutput =
                Math.min(
                    primary.thrustOutput,
                    secondary.thrustOutput
                );

        }


        return {

            layer:
                "STABILIZER",

            mode:

                mode,

            finalOutput:

                finalOutput,

            source:

                source,

            status:

                status

        };

    }


    /* =====================================================
       SIMULATED UPDATED STATE
    ===================================================== */

    function calculateUpdatedState(
        environmentalStress,
        stabilizer
    ) {

        const positionError =
            environmentalStress *
            0.004;

        const simulatedCommand =
            stabilizer.finalOutput;

        const stabilityIndex =
            clamp(
                100 -
                environmentalStress,
                0,
                100
            );

        return {

            positionError:

                positionError,

            simulatedCommand:

                simulatedCommand,

            environmentalStress:

                environmentalStress,

            stabilityIndex:

                stabilityIndex

        };

    }


    /* =====================================================
       AUDIT RECORD
    ===================================================== */

    function createAuditRecord() {

        return {

            timestamp:
                new Date().toISOString(),

            engineVersion:
                VERSION,

            mode:
                MODE,

            engineName:
                ENGINE_NAME

        };

    }


    /* =====================================================
       MAIN ENGINE
    ===================================================== */

    function run(inputs) {

        const normalised =
            normaliseInputs(inputs);


        const environmentalStress =
            calculateEnvironmentalStress(
                normalised
            );


        const risk =
            classifyRisk(
                environmentalStress
            );


        const primary =
            calculatePrimaryLayer(
                environmentalStress
            );


        const secondary =
            calculateSecondaryLayer(
                environmentalStress,
                risk
            );


        const human =
            calculateHumanAuthority(
                risk
            );


        const stabilizer =
            calculateStabilizer(
                primary,
                secondary,
                risk
            );


        const updatedState =
            calculateUpdatedState(
                environmentalStress,
                stabilizer
            );


        let systemStatus =
            "SYSTEM STABLE";


        if (risk === "MEDIUM") {

            systemStatus =
                "PREVENTIVE MONITORING";

        }


        if (risk === "HIGH") {

            systemStatus =
                "HUMAN REVIEW REQUIRED";

        }


        if (risk === "CRITICAL") {

            systemStatus =
                "CRITICAL — HUMAN REVIEW REQUIRED";

        }


        return {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                systemStatus,

            vessel:
                VESSEL,

            environment: {

                wind:
                    normalised.wind,

                current:
                    normalised.current,

                wave:
                    normalised.wave,

                tidal:
                    normalised.tidal,

                environmentalStress:
                    environmentalStress

            },

            risk:
                risk,

            primary:
                primary,

            secondary:
                secondary,

            stabilizer:
                stabilizer,

            human:
                human,

            updatedState:
                updatedState,

            audit:
                createAuditRecord()

        };

    }


    /* =====================================================
       ENGINE VALIDATION
    ===================================================== */

    function validate() {

        try {

            const test =
                run({

                    wind: 0,

                    current: 0,

                    wave: 0,

                    tidal: 0

                });


            return (

                test &&
                test.engineName === ENGINE_NAME &&
                test.version === VERSION &&
                test.vessel &&
                test.environment &&
                test.primary &&
                test.secondary &&
                test.stabilizer &&
                test.human &&
                test.audit

            );

        } catch (error) {

            console.error(
                "DP Engine validation failed:",
                error
            );

            return false;

        }

    }


    /* =====================================================
       PUBLIC ENGINE API
    ===================================================== */

    window.DPSimulationEngine = {

        name:
            ENGINE_NAME,

        version:
            VERSION,

        run:
            run,

        validate:
            validate

    };


    /* =====================================================
       LEGACY / COCKPIT VALIDATION BRIDGE
    ===================================================== */

    window.verifyDPEngine = function () {

        const valid =
            DPSimulationEngine.validate();

        const status =
            document.getElementById(
                "engineStatus"
            );

        if (status) {

            status.textContent =
                valid
                    ? "ONLINE / VALIDATED"
                    : "VALIDATION FAILED";

        }

        return valid;

    };


    /* =====================================================
       STARTUP
    ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            verifyDPEngine();

        }
    );


})();