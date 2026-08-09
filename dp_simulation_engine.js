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
/* ========================================================
       OPERATOR ACTION / DECISION-SUPPORT ENGINE
    ======================================================== */

    function determineRecommendedAction(
        environment,
        risk,
        stress
    ) {

        /*
         * HUMAN AUTHORITY REMAINS FINAL.
         *
         * These outputs are recommendations for the
         * simulated DP operator only.
         *
         * No automatic transition from DP is performed.
         */

        let primaryRecommendation =
            "CONTINUE DP OPERATIONS — MONITOR";

        let urgency =
            "LOW";

        let responseMode =
            "MONITOR";

        let rationale =
            "Environmental loading remains within the simulated normal monitoring range.";

        let recommendedActions = [];


        /* ====================================================
           LOW RISK
        ==================================================== */

        if (
            risk ===
            "LOW"
        ) {

            primaryRecommendation =
                "CONTINUE DP OPERATIONS — MONITOR";

            urgency =
                "LOW";

            responseMode =
                "NORMAL DP MONITORING";

            rationale =
                "Simulated environmental loading remains within the normal resilience monitoring range.";

            recommendedActions = [

                "Continue simulated DP operations.",

                "Maintain normal environmental monitoring.",

                "Maintain operator awareness of changing conditions.",

                "Verify simulated position and stability indicators."

            ];

        }


        /* ====================================================
           MEDIUM RISK
        ==================================================== */

        if (
            risk ===
            "MEDIUM"
        ) {

            primaryRecommendation =
                "MAINTAIN DP WITH INCREASED OPERATOR ATTENTION";

            urgency =
                "MEDIUM";

            responseMode =
                "PREVENTIVE DP MONITORING";

            rationale =
                "Environmental loading has increased and requires enhanced simulated monitoring before further escalation.";

            recommendedActions = [

                "Maintain simulated DP operations.",

                "Increase operator monitoring of environmental trends.",

                "Review simulated thruster and power demand.",

                "Verify sensor consistency and environmental inputs.",

                "Prepare contingency procedures if conditions continue to deteriorate."

            ];

        }


        /* ====================================================
           HIGH RISK
        ==================================================== */

        if (
            risk ===
            "HIGH"
        ) {

            primaryRecommendation =
                "HUMAN REVIEW — PREPARE DEGRADED DP CONTINGENCY";

            urgency =
                "HIGH";

            responseMode =
                "ENHANCED DP RESILIENCE RESPONSE";

            rationale =
                "Simulated environmental loading is high. The operator should assess whether continued DP operation remains appropriate and prepare the vessel's approved contingency procedures.";

            recommendedActions = [

                "Immediate human review of simulated DP condition.",

                "Assess available propulsion and power-generation margin.",

                "Review environmental trend and rate of change.",

                "Verify sensor validity and redundancy.",

                "Review vessel-specific DP emergency and degraded-operation procedures.",

                "Prepare for possible transition to an approved degraded or alternative operating mode if conditions deteriorate."

            ];

        }


        /* ====================================================
           CRITICAL RISK
        ==================================================== */

        if (
            risk ===
            "CRITICAL"
        ) {

            primaryRecommendation =
                "IMMEDIATE HUMAN REVIEW — PREPARE EMERGENCY CONTINGENCY";

            urgency =
                "CRITICAL";

            responseMode =
                "CRITICAL DP RESILIENCE RESPONSE";

            rationale =
                "The simulated environmental condition has reached the critical threshold. Human authority must assess the vessel condition and determine the appropriate operational response.";

            recommendedActions = [

                "Immediate human assessment required.",

                "Assess whether continued DP operation remains safe and appropriate.",

                "Review vessel-specific emergency and degraded-operation procedures.",

                "Assess propulsion, power and available control margin.",

                "Verify environmental and sensor information.",

                "Prepare for an approved transition away from normal DP operation if required.",

                "If anchoring is being considered, confirm that the seabed has been appropriately surveyed and that anchoring is operationally suitable before proceeding.",

                "No automatic off-DP, propulsion, steering or anchoring command is issued by this simulation."

            ];

        }


        /* ====================================================
           SIMULATED ANCHORING DECISION SUPPORT
        ==================================================== */

        let anchoringConsideration =
            "NOT INDICATED";


        /*
         * Anchoring is deliberately NOT treated as an
         * automatic consequence of environmental stress.
         *
         * It requires human assessment of:
         *
         * - surveyed seabed;
         * - water depth;
         * - holding ground;
         * - weather and sea state;
         * - traffic;
         * - under-keel clearance;
         * - anchor equipment;
         * - mooring/anchoring plan;
         * - vessel condition;
         * - local restrictions;
         * - company procedures;
         * - Master / authorised operator decision.
         */


        if (
            risk ===
            "HIGH"
            ||
            risk ===
            "CRITICAL"
        ) {

            anchoringConsideration =
                "CONSIDER ONLY AFTER HUMAN ASSESSMENT AND CONFIRMATION OF SUITABLE SURVEYED SEABED";

        }


        /*
         * Add the anchoring consideration to the
         * operator recommendation without turning
         * it into an automatic command.
         */

        if (
            anchoringConsideration !==
            "NOT INDICATED"
        ) {

            recommendedActions.push(

                "ANCHORING CONTINGENCY: " +
                anchoringConsideration +
                "."

            );

        }


        /* ====================================================
           RETURN OPERATOR RECOMMENDATION
        ==================================================== */

        return {

            primaryRecommendation:
                primaryRecommendation,

            urgency:
                urgency,

            responseMode:
                responseMode,

            rationale:
                rationale,

            recommendedActions:
                recommendedActions,

            anchoringConsideration:
                anchoringConsideration,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            operationalAuthority:
                false,

            environmentalStress:
                Number(stress).toFixed(2),

            simulatedEnvironment:
                environment

        };

    }


    /* ========================================================
       HUMAN AUTHORITY STATE
    ======================================================== */

    function determineHumanAuthority() {

        return {

            status:
                "AVAILABLE / FINAL",

            authority:
                "HUMAN",

            autonomousCommand:
                false,

            operationalAuthority:
                false

        };

    }


    /* ========================================================
       SIMULATED DP ACTION
    ======================================================== */

    function generateSimulatedDPAction(
        environment,
        risk,
        stabilizer
    ) {

        /*
         * This function represents a simulated action
         * only. It does NOT command a vessel.
         */

        let simulatedCommand =
            20;


        if (
            risk ===
            "MEDIUM"
        ) {

            simulatedCommand =
                45;

        }


        if (
            risk ===
            "HIGH"
        ) {

            simulatedCommand =
                70;

        }


        if (
            risk ===
            "CRITICAL"
        ) {

            simulatedCommand =
                90;

        }


        /*
         * Keep simulated command bounded.
         */

        simulatedCommand =
            Math.min(
                NOMINAL_THRUST,
                Math.max(
                    0,
                    simulatedCommand
                )
            );


        return {

            mode:
                "SIMULATED DP RESPONSE",

            simulatedCommand:
                simulatedCommand,

            stabilizerOutput:
                stabilizer.finalOutput,

            operationalCommand:
                false,

            realVesselConnection:
                false,

            status:
                "SIMULATION ONLY"

        };

    }


    /* ========================================================
       SIMULATED POSITION / STABILITY MODEL
    ======================================================== */

    function calculateSimulatedState(
        environment,
        risk,
        simulatedCommand
    ) {

        /*
         * Simple deterministic demonstrator model.
         *
         * This is NOT a physical DP vessel model.
         */

        const environmentalLoad =
            (
                environment.wind +
                environment.current +
                environment.wave +
                environment.tidal
            ) / 4;


        const controlMargin =
            Math.max(
                0,
                100 -
                environmentalLoad
            );


        const positionError =
            Math.max(
                0,
                (
                    environmentalLoad -
                    simulatedCommand * 0.45
                ) / 10
            );


        const stabilityIndex =
            Math.max(
                0,
                Math.min(
                    100,
                    controlMargin +
                    simulatedCommand * 0.20
                )
            );


        return {

            positionError:
                positionError,

            simulatedCommand:
                simulatedCommand,

            stabilityIndex:
                stabilityIndex,

            risk:
                risk,

            status:
                "SIMULATED"

        };

    }


    /* ========================================================
       PART 3 STATUS
    ======================================================== */

    /*
     * OPERATOR DECISION PATH:
     *
     * ENVIRONMENT
     *      ↓
     * RISK ASSESSMENT
     *      ↓
     * OPERATOR RECOMMENDATION
     *      ↓
     * HUMAN REVIEW
     *      ↓
     * SIMULATED RESPONSE
     *
     * IMPORTANT:
     *
     * "OFF DP" and "ANCHOR" are never executed
     * automatically by this software.
     *
     * The simulator can identify the condition in
     * which those contingencies should be reviewed,
     * while the Master / authorised operator remains
     * the final decision authority.
     */
/* ========================================================
       MAIN SIMULATION EXECUTION
    ======================================================== */

    function runSimulation(
        inputs
    ) {

        /*
         * STEP 1
         * Normalize all environmental inputs.
         */

        const environment =
            normalizeEnvironment(
                inputs
            );


        /*
         * STEP 2
         * Calculate deterministic environmental stress.
         */

        const environmentalStress =
            calculateEnvironmentalStress(
                environment
            );


        /*
         * STEP 3
         * Classify environmental risk.
         */

        const risk =
            classifyRisk(
                environmentalStress
            );


        /*
         * STEP 4
         * Primary AI assessment.
         */

        const primary =
            evaluatePrimary(
                environment,
                environmentalStress
            );


        /*
         * STEP 5
         * Independent Secondary AI assessment.
         */

        const secondary =
            evaluateSecondary(
                environment,
                environmentalStress
            );


        /*
         * STEP 6
         * Stabilizer arbitration.
         */

        const stabilizer =
            evaluateStabilizer(
                primary,
                secondary,
                risk
            );


        /*
         * STEP 7
         * Human authority.
         */

        const human =
            determineHumanAuthority();


        /*
         * STEP 8
         * Operator decision-support recommendation.
         */

        const recommendedAction =
            determineRecommendedAction(
                environment,
                risk,
                environmentalStress
            );


        /*
         * STEP 9
         * Generate simulated DP response.
         */

        const simulatedAction =
            generateSimulatedDPAction(
                environment,
                risk,
                stabilizer
            );


        /*
         * STEP 10
         * Calculate simulated vessel state.
         */

        const updatedState =
            calculateSimulatedState(
                environment,
                risk,
                simulatedAction
                    .simulatedCommand
            );


        /*
         * STEP 11
         * System status.
         */

        const systemStatus =
            determineSystemStatus(
                risk
            );


        /*
         * STEP 12
         * Audit timestamp.
         */

        const timestamp =
            new Date()
                .toISOString();


        /*
         * STEP 13
         * Build deterministic audit record.
         */

        const audit = {

            timestamp:
                timestamp,

            engine:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            environmentalStress:
                Number(
                    environmentalStress
                ).toFixed(2),

            risk:
                risk,

            primary:
                primary.mode,

            secondary:
                secondary.mode,

            stabilizer:
                stabilizer.mode,

            recommendation:
                recommendedAction
                    .primaryRecommendation,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            operationalAuthority:
                false

        };


        /*
         * STEP 14
         * Complete result object.
         */

        const result = {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                systemStatus,

            environment: {

                wind:
                    environment.wind,

                current:
                    environment.current,

                wave:
                    environment.wave,

                tidal:
                    environment.tidal,

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

            simulatedAction:
                simulatedAction,

            updatedState:
                updatedState,

            audit:
                audit

        };


        /*
         * Store the most recent simulation result
         * for browser inspection and audit/replay.
         */

        window.lastDPSimulation =
            result;


        return result;

    }


    /* ========================================================
       ENGINE PUBLIC API
    ======================================================== */

    const DPSimulationEngine = {

        name:
            ENGINE_NAME,

        version:
            VERSION,

        mode:
            MODE,

        run:
            runSimulation,

        validate:
            validate,

        normalizeEnvironment:
            normalizeEnvironment,

        calculateEnvironmentalStress:
            calculateEnvironmentalStress,

        classifyRisk:
            classifyRisk

    };


    /* ========================================================
       BROWSER EXPORT
    ======================================================== */

    window.DPSimulationEngine =
        DPSimulationEngine;


    /* ========================================================
       ENGINE READY MESSAGE
    ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL DP SIMULATION ENGINE — READY"
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

    }


})();