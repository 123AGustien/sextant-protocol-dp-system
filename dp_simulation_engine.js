/* =========================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT
   FILE: dp_simulation_engine.js

   PURPOSE:
   Deterministic DP resilience simulation engine with
   operator decision-support recommendations.

   SAFETY:
   RESEARCH / SIMULATION ONLY.
   NOT OPERATIONAL DP CONTROL SOFTWARE.

   IMPORTANT:
   This engine NEVER commands:
   - DP systems
   - Thrusters
   - Propulsion
   - Steering
   - Navigation
   - Vessel automation

   Recommended actions are SIMULATED OPERATOR
   DECISION-SUPPORT ONLY.

   HUMAN OPERATOR RETAINS FINAL AUTHORITY.
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ENGINE CONSTANTS
    ===================================================== */

    const ENGINE_NAME =
        "SextantDPSimulationEngine";

    const VERSION =
        "1.1.0";

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
       OPERATOR RECOMMENDATION ENGINE
    =====================================================

       IMPORTANT:

       These are NOT commands.

       They are simulated decision-support
       recommendations presented for human review.

       The engine deliberately uses wording such as:

       "CONSIDER..."

       "REVIEW..."

       "PREPARE..."

       rather than issuing an operational command.
    */

    function calculateRecommendedAction(
        inputs,
        environmentalStress,
        risk
    ) {

        const recommendations = [];

        let primaryRecommendation =
            "CONTINUE MONITORING";

        let urgency =
            "LOW";

        let responseMode =
            "MONITOR";

        let rationale =
            "Environmental conditions remain within the simulated monitoring range.";


        /* =================================================
           LOW
        ================================================= */

        if (risk === "LOW") {

            primaryRecommendation =
                "CONTINUE NORMAL MONITORING";

            urgency =
                "LOW";

            responseMode =
                "MONITOR";

            rationale =
                "Simulated environmental stress remains below the preventive-action threshold.";

            recommendations.push(
                "Continue normal operator monitoring."
            );

            recommendations.push(
                "Verify vessel position and environmental trend remain stable."
            );

            recommendations.push(
                "No simulated change of control mode is presently indicated."
            );

        }


        /* =================================================
           MEDIUM
        ================================================= */

        if (risk === "MEDIUM") {

            primaryRecommendation =
                "INCREASE OPERATOR VIGILANCE";

            urgency =
                "MEDIUM";

            responseMode =
                "PREVENTIVE";

            rationale =
                "Environmental stress is elevated and warrants preventive operator assessment.";

            recommendations.push(
                "Increase monitoring of vessel position, heading and environmental trend."
            );

            recommendations.push(
                "Review whether manual / joystick control should be prepared or considered."
            );

            recommendations.push(
                "Review heading relative to wind, current and wave direction."
            );

            recommendations.push(
                "Assess available sea room and safe escape / relocation options."
            );

        }


        /* =================================================
           HIGH
        ================================================= */

        if (risk === "HIGH") {

            primaryRecommendation =
                "HUMAN OPERATOR REVIEW REQUIRED";

            urgency =
                "HIGH";

            responseMode =
                "SAFETY REVIEW";

            rationale =
                "High simulated environmental stress indicates that continued operation requires explicit human assessment.";

            recommendations.push(
                "Consider transferring to an appropriate manual / joystick operating mode if operational procedures permit."
            );

            recommendations.push(
                "Assess whether a heading adjustment would reduce environmental loading."
            );

            recommendations.push(
                "Assess whether moving away from the present location would increase available safety margin."
            );

            recommendations.push(
                "Review vessel position, drift trend, thruster availability and surrounding hazards."
            );

            recommendations.push(
                "Prepare an appropriate contingency response in accordance with the vessel's approved operating procedures."
            );

        }


        /* =================================================
           CRITICAL
        ================================================= */

        if (risk === "CRITICAL") {

            primaryRecommendation =
                "IMMEDIATE HUMAN SAFETY REVIEW";

            urgency =
                "CRITICAL";

            responseMode =
                "EMERGENCY REVIEW";

            rationale =
                "Critical simulated environmental stress has exceeded the resilience threshold.";

            recommendations.push(
                "Immediately assess the vessel's actual operational condition."
            );

            recommendations.push(
                "Consider the safest available control mode in accordance with approved vessel procedures."
            );

            recommendations.push(
                "Assess whether heading alteration can reduce environmental loading."
            );

            recommendations.push(
                "Assess whether immediate relocation to safer sea room is appropriate."
            );

            recommendations.push(
                "Review emergency / contingency procedures and available escape options."
            );

            recommendations.push(
                "Maintain direct human command and do not rely on this simulation as an operational control system."
            );

        }


        /* =================================================
           ENVIRONMENT-SPECIFIC ADVISORIES
        ================================================= */

        if (inputs.wind >= 70) {

            recommendations.push(
                "WIND ADVISORY: Review vessel heading relative to prevailing and gusting wind."
            );

        }


        if (inputs.current >= 70) {

            recommendations.push(
                "CURRENT ADVISORY: Review drift direction, available sea room and positional margin."
            );

        }


        if (inputs.wave >= 70) {

            recommendations.push(
                "WAVE ADVISORY: Review sea-state trend, vessel heading and operational limitations."
            );

        }


        if (inputs.tidal >= 70) {

            recommendations.push(
                "TIDAL ADVISORY: Review tidal/current interaction and expected change in environmental loading."
            );

        }


        return {

            category:
                "SIMULATED OPERATOR DECISION SUPPORT",

            primaryRecommendation:
                primaryRecommendation,

            urgency:
                urgency,

            responseMode:
                responseMode,

            rationale:
                rationale,

            recommendedActions:
                recommendations,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            operationalAuthority:
                false

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


        const recommendedAction =
            calculateRecommendedAction(
                normalised,
                environmentalStress,
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

            recommendedAction:
                recommendedAction,

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
                test.recommendedAction &&
                test.recommendedAction.humanAuthority === "FINAL" &&
                test.recommendedAction.autonomousCommand === false &&
                test.recommendedAction.operationalAuthority === false &&
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