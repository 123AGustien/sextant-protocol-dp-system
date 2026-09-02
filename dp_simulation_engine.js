/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE SIMULATION ENGINE

   FILE:
   dp_simulation_engine.js

   VERSION:
   1.2.0

   PURPOSE:
   Deterministic browser-based DP resilience research simulator.

   ARCHITECTURE:

   ENVIRONMENT
        ↓
   SYSTEM SETUP
        ↓
   S1 PRIMARY ASSESSMENT
        ↓
   S2 INDEPENDENT SAFETY ASSESSMENT
        ↓
   STABILIZER / ARBITRATION
        ↓
   RESERVE-POWER VERIFICATION
        ↓
   HUMAN DECISION GATE
        ↓
   SIMULATED DP RESPONSE
        ↓
   UPDATED SIMULATED STATE
        ↓
   AUDIT

   IMPORTANT SAFETY BOUNDARY:

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

   SYSTEM SETUP DISTINCTION:

   POSITIONING:
   - NON-BIAS
   - BIAS

   ENGINE LOAD:
   - NORMAL
   - PUSH-UP

   IMPORTANT:

   BIAS / NON-BIAS IS A POSITIONING SETTING.

   PUSH-UP IS AN ENGINE-LOAD COMPENSATION SETTING.

   PUSH-UP IS NOT POSITIONING BIAS.

   PUSH-UP REQUIRES RESERVE-POWER VERIFICATION.

   UNKNOWN OR INSUFFICIENT RESERVE DOES NOT AUTHORIZE
   PUSH-UP.

   HUMAN AUTHORIZATION REMAINS REQUIRED.
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       ENGINE CONFIGURATION
    ======================================================== */

    const ENGINE_NAME =
        "DPSimulationEngine";

    const VERSION =
        "1.2.0";

    const MODE =
        "SIMULATION ONLY";

    const NOMINAL_THRUST =
        100;

    const MAX_INPUT =
        100;

    const MIN_INPUT =
        0;


    /* ========================================================
       SYSTEM SETUP MODES
    ======================================================== */

    const POSITIONING_MODES = {

        NON_BIAS:
            "NON_BIAS",

        BIAS:
            "BIAS"

    };


    const ENGINE_LOAD_MODES = {

        NORMAL:
            "NORMAL",

        PUSH_UP:
            "PUSH_UP"

    };


    /* ========================================================
       PUSH-UP CONFIGURATION
    ======================================================== */

    /*
     * PUSH-UP is deliberately separated from positioning.
     *
     * It represents simulated engine-load compensation only.
     *
     * The simulated reserve model is deterministic and exists
     * only for research/V&V purposes.
     */

    const PUSH_UP_INCREMENT =
        15;

    const MIN_RESERVE_FOR_PUSH_UP =
        PUSH_UP_INCREMENT;


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
       ENVIRONMENT WEIGHTS
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
       HUMAN DECISION STATES
    ======================================================== */

    const HUMAN_DECISIONS = {

        PENDING:
            "PENDING",

        ACKNOWLEDGED:
            "ACKNOWLEDGED",

        MAINTAIN_SAFE_STATE:
            "MAINTAIN_SAFE_STATE",

        AUTHORIZE_SIMULATED_RESPONSE:
            "AUTHORIZE_SIMULATED_RESPONSE"

    };


    /* ========================================================
       ENGINE STATE
    ======================================================== */

    let pendingSimulation =
        null;


    let humanDecisionState = {

        status:
            "AVAILABLE / FINAL",

        decision:
            HUMAN_DECISIONS.PENDING,

        acknowledged:
            false,

        authorized:
            false,

        actionExecuted:
            false,

        timestamp:
            null,

        reason:
            "Awaiting human decision."

    };


    /* ========================================================
       INPUT NORMALIZATION
    ======================================================== */

    function normalizeInput(value) {

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


    function normalizePositioningMode(
        mode
    ) {

        if (
            mode ===
            POSITIONING_MODES.BIAS
        ) {

            return POSITIONING_MODES.BIAS;

        }

        return POSITIONING_MODES.NON_BIAS;

    }


    function normalizeEngineLoadMode(
        mode
    ) {

        if (
            mode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            return ENGINE_LOAD_MODES.PUSH_UP;

        }

        return ENGINE_LOAD_MODES.NORMAL;

    }


    function normalizeEnvironment(inputs) {

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
                ),

            positioningMode:
                normalizePositioningMode(
                    inputs.positioningMode
                ),

            engineLoadMode:
                normalizeEngineLoadMode(
                    inputs.engineLoadMode
                )

        };

    }


    /* ========================================================
       ENVIRONMENTAL STRESS
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
       RISK CLASSIFICATION
    ======================================================== */

    function classifyRisk(stress) {

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
       S1 — PRIMARY ASSESSMENT
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

            layer:
                "S1",

            mode:
                mode,

            response:
                response,

            stress:
                Number(
                    stress
                ).toFixed(2),

            environment:
                environment

        };

    }


    /* ========================================================
       S2 — INDEPENDENT SAFETY ASSESSMENT
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
         * S2 deliberately uses an additional environmental
         * relationship rather than simply copying S1.
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

            layer:
                "S2",

            mode:
                mode,

            assessment:
                assessment,

            independentStress:
                Number(
                    stress
                ).toFixed(2)

        };

    }


    /* ========================================================
       STABILIZER / ARBITRATION
    ======================================================== */

    function evaluateStabilizer(
        primary,
        secondary,
        risk
    ) {

        let mode =
            "NORMAL ARBITRATION";

        let source =
            "S1 PRIMARY";

        let status =
            "STABLE";

        let finalOutput =
            20;


        if (
            risk ===
            "MEDIUM"
        ) {

            mode =
                "PREVENTIVE ARBITRATION";

            source =
                "S1 + S2";

            status =
                "ELEVATED MONITORING";

            finalOutput =
                45;

        }


        if (
            risk ===
            "HIGH"
        ) {

            mode =
                "RESILIENCE ARBITRATION";

            source =
                "S2 INDEPENDENT SAFETY";

            status =
                "HUMAN REVIEW REQUIRED";

            finalOutput =
                70;

        }


        if (
            risk ===
            "CRITICAL"
        ) {

            mode =
                "CRITICAL STABILIZATION";

            source =
                "S2 + HUMAN AUTHORITY";

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
       RESERVE-POWER VERIFICATION
    ======================================================== */

    function verifyReservePower(
        environment,
        engineLoadMode
    ) {

        /*
         * Deterministic research proxy:
         *
         * Simulated available reserve is represented by the
         * nominal thrust capacity remaining after environmental
         * loading.
         *
         * This is NOT a real vessel power-management model.
         */

        const environmentalStress =
            calculateEnvironmentalStress(
                environment
            );


        const availableReserve =
            Math.max(
                0,
                NOMINAL_THRUST -
                environmentalStress
            );


        let requiredReserve =
            0;


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            requiredReserve =
                MIN_RESERVE_FOR_PUSH_UP;

        }


        const reserveVerified =
            availableReserve >=
            requiredReserve;


        let status =
            "NOT REQUIRED";


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.NORMAL
        ) {

            status =
                "NORMAL LOAD — RESERVE CHECK NOT REQUIRED";

        }


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                reserveVerified
            ) {

                status =
                    "RESERVE VERIFIED — PUSH-UP PERMITTED FOR SIMULATION";

            } else {

                status =
                    "RESERVE INSUFFICIENT — PUSH-UP BLOCKED";

            }

        }


        return {

            engineLoadMode:
                engineLoadMode,

            environmentalStress:
                Number(
                    environmentalStress
                ).toFixed(2),

            nominalThrust:
                NOMINAL_THRUST,

            availableReserve:
                Number(
                    availableReserve
                ).toFixed(2),

            requiredReserve:
                requiredReserve,

            reserveVerified:
                reserveVerified,

            status:
                status,

            operationalPowerConnection:
                false,

            researchOnly:
                true

        };

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function determineSystemStatus(risk) {

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
       OPERATOR RECOMMENDATION
    ======================================================== */

    function determineRecommendedAction(
        environment,
        risk,
        stress,
        reserveVerification
    ) {

        let primaryRecommendation =
            "CONTINUE DP OPERATIONS — MONITOR";

        let urgency =
            "LOW";

        let responseMode =
            "NORMAL DP MONITORING";

        let rationale =
            "Environmental loading remains within the simulated normal monitoring range.";

        let recommendedActions = [];


        if (
            risk ===
            "LOW"
        ) {

            recommendedActions = [

                "Continue simulated DP operations.",

                "Maintain normal environmental monitoring.",

                "Maintain operator awareness of changing conditions.",

                "Verify simulated position and stability indicators."

            ];

        }


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
                "Simulated environmental loading is high. Human review is required before any simulated response is executed.";

            recommendedActions = [

                "Acknowledge the simulated condition.",

                "Assess available simulated propulsion and power margin.",

                "Review environmental trend and rate of change.",

                "Verify simulated sensor validity.",

                "Review vessel-specific degraded-operation procedures.",

                "Decide whether to maintain the simulated safe state or authorize the proposed simulated response."

            ];

        }


        if (
            risk ===
            "CRITICAL"
        ) {

            primaryRecommendation =
                "IMMEDIATE HUMAN REVIEW — SIMULATED RESPONSE HELD";

            urgency =
                "CRITICAL";

            responseMode =
                "CRITICAL DP RESILIENCE RESPONSE";

            rationale =
                "The simulated environmental condition has reached the critical threshold. Human authority must acknowledge and decide before any simulated response is executed.";

            recommendedActions = [

                "Immediate human assessment required.",

                "Assess whether continued simulated DP operation remains appropriate.",

                "Review simulated propulsion and power margin.",

                "Verify environmental and sensor information.",

                "Review approved degraded-operation procedures.",

                "Maintain the simulated safe state unless human authority authorizes a simulated response.",

                "No automatic off-DP, propulsion, steering or anchoring command is issued."

            ];

        }


        let anchoringConsideration =
            "NOT INDICATED";


        if (
            risk ===
            "HIGH"
            ||
            risk ===
            "CRITICAL"
        ) {

            anchoringConsideration =
                "CONSIDER ONLY AFTER HUMAN ASSESSMENT AND CONFIRMATION OF SUITABLE SURVEYED SEABED";

            recommendedActions.push(
                "ANCHORING CONTINGENCY: " +
                anchoringConsideration +
                "."
            );

        }


        /*
         * Explicit PUSH-UP safety handling.
         */

        if (
            environment.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                reserveVerification.reserveVerified
            ) {

                recommendedActions.push(
                    "ENGINE LOAD: PUSH-UP SELECTED — SIMULATED RESERVE VERIFIED."
                );

            } else {

                recommendedActions.push(
                    "ENGINE LOAD: PUSH-UP SELECTED BUT BLOCKED — SIMULATED RESERVE INSUFFICIENT."
                );

                recommendedActions.push(
                    "DO NOT INCREASE SIMULATED ENGINE LOAD WITHOUT VERIFIED RESERVE."
                );

            }

        }


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
                Number(
                    stress
                ).toFixed(2),

            positioningMode:
                environment.positioningMode,

            engineLoadMode:
                environment.engineLoadMode,

            reservePowerVerification:
                reserveVerification,

            simulatedEnvironment:
                environment

        };

    }


    /* ========================================================
       HUMAN AUTHORITY
    ======================================================== */

    function determineHumanAuthority() {

        return {

            status:
                humanDecisionState.status,

            authority:
                "HUMAN",

            decision:
                humanDecisionState.decision,

            acknowledged:
                humanDecisionState.acknowledged,

            authorized:
                humanDecisionState.authorized,

            actionExecuted:
                humanDecisionState.actionExecuted,

            timestamp:
                humanDecisionState.timestamp,

            reason:
                humanDecisionState.reason,

            autonomousCommand:
                false,

            operationalAuthority:
                false

        };

    }


    /* ========================================================
       PROPOSE SIMULATED RESPONSE
    ======================================================== */

    function proposeSimulatedDPAction(
        risk,
        stabilizer,
        environment,
        reserveVerification
    ) {

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
         * PUSH-UP is an engine-load compensation adjustment.
         *
         * It is NOT positioning bias.
         *
         * It can only increase the simulated command when
         * reserve power has been verified.
         */

        let pushUpApplied =
            false;


        if (
            environment.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                reserveVerification.reserveVerified
            ) {

                simulatedCommand +=
                    PUSH_UP_INCREMENT;

                pushUpApplied =
                    true;

            }

        }


        simulatedCommand =
            Math.min(
                NOMINAL_THRUST,
                Math.max(
                    0,
                    simulatedCommand
                )
            );


        let status =
            "HELD FOR HUMAN DECISION";


        if (
            environment.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
            &&
            !reserveVerification.reserveVerified
        ) {

            status =
                "PUSH-UP BLOCKED — RESERVE NOT VERIFIED";

        }


        return {

            mode:
                "SIMULATED DP RESPONSE — PROPOSED",

            simulatedCommand:
                simulatedCommand,

            baseSimulatedCommand:
                Math.max(
                    0,
                    simulatedCommand -
                    (
                        pushUpApplied
                            ? PUSH_UP_INCREMENT
                            : 0
                    )
                ),

            stabilizerOutput:
                stabilizer.finalOutput,

            positioningMode:
                environment.positioningMode,

            engineLoadMode:
                environment.engineLoadMode,

            pushUpRequested:
                environment.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP,

            pushUpApplied:
                pushUpApplied,

            reserveVerified:
                reserveVerification.reserveVerified,

            operationalCommand:
                false,

            realVesselConnection:
                false,

            executionGate:
                "HUMAN AUTHORIZATION REQUIRED",

            status:
                status

        };

    }


    /* ========================================================
       EXECUTE SIMULATED RESPONSE
       ONLY AFTER HUMAN AUTHORIZATION
    ======================================================== */

    function executeSimulatedDPAction(
        proposedAction
    ) {

        if (
            !humanDecisionState.acknowledged
        ) {

            return {

                mode:
                    "SIMULATED RESPONSE HELD",

                simulatedCommand:
                    0,

                stabilizerOutput:
                    proposedAction.stabilizerOutput,

                positioningMode:
                    proposedAction.positioningMode,

                engineLoadMode:
                    proposedAction.engineLoadMode,

                pushUpRequested:
                    proposedAction.pushUpRequested,

                pushUpApplied:
                    false,

                reserveVerified:
                    proposedAction.reserveVerified,

                operationalCommand:
                    false,

                realVesselConnection:
                    false,

                executionGate:
                    "HUMAN ACKNOWLEDGEMENT REQUIRED",

                status:
                    "NO SIMULATED ACTION EXECUTED"

            };

        }


        if (
            !humanDecisionState.authorized
        ) {

            return {

                mode:
                    "SAFE SIMULATED STATE",

                simulatedCommand:
                    0,

                stabilizerOutput:
                    proposedAction.stabilizerOutput,

                positioningMode:
                    proposedAction.positioningMode,

                engineLoadMode:
                    proposedAction.engineLoadMode,

                pushUpRequested:
                    proposedAction.pushUpRequested,

                pushUpApplied:
                    false,

                reserveVerified:
                    proposedAction.reserveVerified,

                operationalCommand:
                    false,

                realVesselConnection:
                    false,

                executionGate:
                    "HUMAN AUTHORIZATION NOT GRANTED",

                status:
                    "SAFE STATE MAINTAINED"

            };

        }


        /*
         * Final safety gate:
         *
         * PUSH-UP cannot execute if reserve verification
         * failed, even if human authorization is attempted.
         */

        if (
            proposedAction.pushUpRequested
            &&
            !proposedAction.reserveVerified
        ) {

            humanDecisionState.actionExecuted =
                false;


            return {

                mode:
                    "SIMULATED RESPONSE BLOCKED",

                simulatedCommand:
                    0,

                stabilizerOutput:
                    proposedAction.stabilizerOutput,

                positioningMode:
                    proposedAction.positioningMode,

                engineLoadMode:
                    proposedAction.engineLoadMode,

                pushUpRequested:
                    true,

                pushUpApplied:
                    false,

                reserveVerified:
                    false,

                operationalCommand:
                    false,

                realVesselConnection:
                    false,

                executionGate:
                    "PUSH-UP BLOCKED — RESERVE POWER NOT VERIFIED",

                status:
                    "SIMULATED ACTION NOT EXECUTED"

            };

        }


        humanDecisionState.actionExecuted =
            true;


        return {

            mode:
                "SIMULATED DP RESPONSE — AUTHORIZED",

            simulatedCommand:
                proposedAction.simulatedCommand,

            stabilizerOutput:
                proposedAction.stabilizerOutput,

            positioningMode:
                proposedAction.positioningMode,

            engineLoadMode:
                proposedAction.engineLoadMode,

            pushUpRequested:
                proposedAction.pushUpRequested,

            pushUpApplied:
                proposedAction.pushUpApplied,

            reserveVerified:
                proposedAction.reserveVerified,

            operationalCommand:
                false,

            realVesselConnection:
                false,

            executionGate:
                "HUMAN AUTHORIZED",

            status:
                "SIMULATED ACTION EXECUTED"

        };

    }


    /* ========================================================
       SIMULATED VESSEL STATE
    ======================================================== */

    function calculateSimulatedState(
        environment,
        risk,
        simulatedCommand
    ) {

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

            positioningMode:
                environment.positioningMode,

            engineLoadMode:
                environment.engineLoadMode,

            status:
                "SIMULATED"

        };

    }


    /* ========================================================
       HUMAN DECISION API
    ======================================================== */

    function acknowledgeHumanDecision(
        reason
    ) {

        if (
            !pendingSimulation
        ) {

            return {

                success:
                    false,

                message:
                    "No pending simulation requires human acknowledgement."

            };

        }


        humanDecisionState = {

            status:
                "ACKNOWLEDGED / FINAL",

            decision:
                HUMAN_DECISIONS.ACKNOWLEDGED,

            acknowledged:
                true,

            authorized:
                false,

            actionExecuted:
                false,

            timestamp:
                new Date()
                    .toISOString(),

            reason:
                reason ||
                "Human operator acknowledged the simulated condition."

        };


        return getPendingSimulation();

    }


    function maintainSafeState(
        reason
    ) {

        if (
            !pendingSimulation
        ) {

            return {

                success:
                    false,

                message:
                    "No pending simulation requires a human decision."

            };

        }


        humanDecisionState = {

            status:
                "SAFE STATE MAINTAINED",

            decision:
                HUMAN_DECISIONS.MAINTAIN_SAFE_STATE,

            acknowledged:
                true,

            authorized:
                false,

            actionExecuted:
                false,

            timestamp:
                new Date()
                    .toISOString(),

            reason:
                reason ||
                "Human operator elected to maintain the simulated safe state."

        };


        return finalizePendingSimulation();

    }


    function authorizeSimulatedResponse(
        reason
    ) {

        if (
            !pendingSimulation
        ) {

            return {

                success:
                    false,

                message:
                    "No pending simulation requires authorization."

            };

        }


        if (
            !humanDecisionState.acknowledged
        ) {

            return {

                success:
                    false,

                message:
                    "Human acknowledgement is required before simulated response authorization."

            };

        }


        humanDecisionState = {

            status:
                "SIMULATED RESPONSE AUTHORIZED",

            decision:
                HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE,

            acknowledged:
                true,

            authorized:
                true,

            actionExecuted:
                false,

            timestamp:
                new Date()
                    .toISOString(),

            reason:
                reason ||
                "Human operator authorized the proposed simulated response."

        };


        return finalizePendingSimulation();

    }


    /* ========================================================
       FINALIZE PENDING SIMULATION
    ======================================================== */

    function finalizePendingSimulation() {

        if (
            !pendingSimulation
        ) {

            return null;

        }


        const proposedAction =
            pendingSimulation.proposedAction;


        const simulatedAction =
            executeSimulatedDPAction(
                proposedAction
            );


        const updatedState =
            calculateSimulatedState(
                pendingSimulation.environment,
                pendingSimulation.risk,
                simulatedAction.simulatedCommand
            );


        const audit = {

            timestamp:
                new Date()
                    .toISOString(),

            engine:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            environmentalStress:
                Number(
                    pendingSimulation.environmentalStress
                ).toFixed(2),

            risk:
                pendingSimulation.risk,

            positioningMode:
                pendingSimulation
                    .environment
                    .positioningMode,

            engineLoadMode:
                pendingSimulation
                    .environment
                    .engineLoadMode,

            reservePowerVerification:
                pendingSimulation
                    .reservePowerVerification,

            primary:
                pendingSimulation.primary.mode,

            secondary:
                pendingSimulation.secondary.mode,

            stabilizer:
                pendingSimulation.stabilizer.mode,

            recommendation:
                pendingSimulation
                    .recommendedAction
                    .primaryRecommendation,

            humanAuthority:
                "FINAL",

            humanDecision:
                humanDecisionState.decision,

            humanAcknowledged:
                humanDecisionState.acknowledged,

            humanAuthorized:
                humanDecisionState.authorized,

            simulatedActionExecuted:
                humanDecisionState.actionExecuted,

            operationalCommand:
                false,

            realVesselConnection:
                false,

            executionGate:
                simulatedAction.executionGate

        };


        const result = {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                determineSystemStatus(
                    pendingSimulation.risk
                ),

            systemSetup:
                {

                    positioningMode:
                        pendingSimulation
                            .environment
                            .positioningMode,

                    engineLoadMode:
                        pendingSimulation
                            .environment
                            .engineLoadMode,

                    distinction:
                        "POSITIONING BIAS/NON-BIAS IS SEPARATE FROM ENGINE LOAD NORMAL/PUSH-UP"

                },

            environment:
                pendingSimulation.environmentResult,

            risk:
                pendingSimulation.risk,

            primary:
                pendingSimulation.primary,

            secondary:
                pendingSimulation.secondary,

            stabilizer:
                pendingSimulation.stabilizer,

            reservePowerVerification:
                pendingSimulation
                    .reservePowerVerification,

            human:
                determineHumanAuthority(),

            recommendedAction:
                pendingSimulation
                    .recommendedAction,

            proposedAction:
                proposedAction,

            simulatedAction:
                simulatedAction,

            updatedState:
                updatedState,

            audit:
                audit,

            executionGate:
                {

                    required:
                        true,

                    acknowledged:
                        humanDecisionState.acknowledged,

                    authorized:
                        humanDecisionState.authorized,

                    executed:
                        humanDecisionState.actionExecuted,

                    status:
                        simulatedAction
                            .executionGate

                }

        };


        window.lastDPSimulation =
            result;


        pendingSimulation =
            null;


        return result;

    }


    /* ========================================================
       GET PENDING SIMULATION
    ======================================================== */

    function getPendingSimulation() {

        if (
            !pendingSimulation
        ) {

            return null;

        }


        return {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                pendingSimulation.systemStatus,

            systemSetup:
                {

                    positioningMode:
                        pendingSimulation
                            .environment
                            .positioningMode,

                    engineLoadMode:
                        pendingSimulation
                            .environment
                            .engineLoadMode,

                    distinction:
                        "POSITIONING BIAS/NON-BIAS IS SEPARATE FROM ENGINE LOAD NORMAL/PUSH-UP"

                },

            environment:
                pendingSimulation.environmentResult,

            risk:
                pendingSimulation.risk,

            primary:
                pendingSimulation.primary,

            secondary:
                pendingSimulation.secondary,

            stabilizer:
                pendingSimulation.stabilizer,

            reservePowerVerification:
                pendingSimulation
                    .reservePowerVerification,

            human:
                determineHumanAuthority(),

            recommendedAction:
                pendingSimulation
                    .recommendedAction,

            proposedAction:
                pendingSimulation.proposedAction,

            simulatedAction:
                {

                    mode:
                        "SIMULATED RESPONSE HELD",

                    simulatedCommand:
                        0,

                    operationalCommand:
                        false,

                    realVesselConnection:
                        false,

                    executionGate:
                        "HUMAN DECISION REQUIRED",

                    status:
                        "WAITING FOR HUMAN DECISION"

                },

            updatedState:
                calculateSimulatedState(
                    pendingSimulation.environment,
                    pendingSimulation.risk,
                    0
                ),

            executionGate:
                {

                    required:
                        true,

                    acknowledged:
                        humanDecisionState.acknowledged,

                    authorized:
                        humanDecisionState.authorized,

                    executed:
                        false,

                    status:
                        "WAITING FOR HUMAN DECISION"

                }

        };

    }


    /* ========================================================
       MAIN SIMULATION
    ======================================================== */

    function runSimulation(inputs) {

        /*
         * Every new environmental run starts a new
         * human decision cycle.
         */

        pendingSimulation =
            null;


        humanDecisionState = {

            status:
                "AVAILABLE / FINAL",

            decision:
                HUMAN_DECISIONS.PENDING,

            acknowledged:
                false,

            authorized:
                false,

            actionExecuted:
                false,

            timestamp:
                null,

            reason:
                "Awaiting human decision."

        };


        const environment =
            normalizeEnvironment(
                inputs
            );


        const environmentalStress =
            calculateEnvironmentalStress(
                environment
            );


        const risk =
            classifyRisk(
                environmentalStress
            );


        const primary =
            evaluatePrimary(
                environment,
                environmentalStress
            );


        const secondary =
            evaluateSecondary(
                environment,
                environmentalStress
            );


        const stabilizer =
            evaluateStabilizer(
                primary,
                secondary,
                risk
            );


        const reservePowerVerification =
            verifyReservePower(
                environment,
                environment.engineLoadMode
            );


        const human =
            determineHumanAuthority();


        const recommendedAction =
            determineRecommendedAction(
                environment,
                risk,
                environmentalStress,
                reservePowerVerification
            );


        const proposedAction =
            proposeSimulatedDPAction(
                risk,
                stabilizer,
                environment,
                reservePowerVerification
            );


        const environmentResult = {

            wind:
                environment.wind,

            current:
                environment.current,

            wave:
                environment.wave,

            tidal:
                environment.tidal,

            environmentalStress:
                environmentalStress,

            positioningMode:
                environment.positioningMode,

            engineLoadMode:
                environment.engineLoadMode

        };


        pendingSimulation = {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                determineSystemStatus(
                    risk
                ),

            environment:
                environment,

            environmentResult:
                environmentResult,

            environmentalStress:
                environmentalStress,

            risk:
                risk,

            primary:
                primary,

            secondary:
                secondary,

            stabilizer:
                stabilizer,

            reservePowerVerification:
                reservePowerVerification,

            human:
                human,

            recommendedAction:
                recommendedAction,

            proposedAction:
                proposedAction

        };


        /*
         * IMPORTANT:
         *
         * No simulated response is executed here.
         *
         * The engine stops at the HUMAN DECISION GATE.
         */

        const result =
            getPendingSimulation();


        window.lastDPSimulation =
            result;


        return result;

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

            &&

            typeof evaluatePrimary ===
            "function"

            &&

            typeof evaluateSecondary ===
            "function"

            &&

            typeof evaluateStabilizer ===
            "function"

            &&

            typeof verifyReservePower ===
            "function"

            &&

            typeof acknowledgeHumanDecision ===
            "function"

            &&

            typeof maintainSafeState ===
            "function"

            &&

            typeof authorizeSimulatedResponse ===
            "function"

        );

    }


    /* ========================================================
       PUBLIC API
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
            classifyRisk,

        verifyReservePower:
            verifyReservePower,

        acknowledgeHumanDecision:
            acknowledgeHumanDecision,

        maintainSafeState:
            maintainSafeState,

        authorizeSimulatedResponse:
            authorizeSimulatedResponse,

        getPendingSimulation:
            getPendingSimulation

    };


    /* ========================================================
       BROWSER EXPORT
    ======================================================== */

    window.DPSimulationEngine =
        DPSimulationEngine;


    /* ========================================================
       READY MESSAGE
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

        console.log(
            "S1 PRIMARY: ACTIVE"
        );

        console.log(
            "S2 SECONDARY: ACTIVE"
        );

        console.log(
            "STABILIZER: ACTIVE"
        );

        console.log(
            "RESERVE-POWER VERIFICATION: ACTIVE"
        );

        console.log(
            "POSITIONING MODE: BIAS / NON-BIAS"
        );

        console.log(
            "ENGINE LOAD MODE: NORMAL / PUSH-UP"
        );

        console.log(
            "PUSH-UP ≠ POSITIONING BIAS"
        );

        console.log(
            "HUMAN DECISION GATE: ACTIVE"
        );

        console.log(
            "OPERATIONAL AUTHORITY: FALSE"
        );

        console.log(
            "REAL VESSEL CONNECTION: FALSE"
        );

    }


})();