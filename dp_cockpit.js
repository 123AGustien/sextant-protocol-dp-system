/**
 * ============================================================
 * SEXTANT PROTOCOL™ — DP RESILIENCE V&V RESEARCH COCKPIT
 * ============================================================
 *
 * Controller File:
 *     dp_cockpit.js
 *
 * Controller Version:
 *     v2.6.3
 *
 * Environment:
 *     MARIN / USV DP RESILIENCE V&V RESEARCH
 *
 * PURPOSE
 *     Deterministic research and verification cockpit controller.
 *
 * SAFETY BOUNDARY
 *     Research / V&V only.
 *     No operational vessel connection.
 *     No autonomous DP command.
 *     No real actuator interface.
 *     No external operational command.
 *     Human authority remains final.
 *
 * GOLDEN RULE
 *     OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * CRITICAL DISTINCTION
 *     BIAS    = POSITIONING MODE ONLY
 *     PUSH-UP = ENGINE LOAD COMPENSATION ONLY
 *     PUSH-UP ≠ POSITIONING BIAS
 *
 * PUSH-UP SAFETY
 *     Authoritative reserve-power verification is required.
 *     Human authorization is mandatory.
 *
 * ============================================================
 */

(function () {

    "use strict";

    /* =========================================================
       CONTROLLER IDENTITY
       ========================================================= */

    const CONTROLLER_NAME = "SEXTANT PROTOCOL™ DP RESILIENCE V&V RESEARCH COCKPIT";
    const CONTROLLER_VERSION = "2.6.3";

    const RESEARCH_MODE = true;
    const AUTONOMOUS_EXECUTION = false;
    const OPERATIONAL_CONNECTION = false;
    const REAL_ACTUATOR_INTERFACE = false;
    const HUMAN_AUTHORITY_FINAL = true;

    const GOLDEN_RULE =
        "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE";

    const POSITIONING_MODES = Object.freeze({
        NON_BIAS: "NON_BIAS",
        BIAS: "BIAS"
    });

    const ENGINE_LOAD_MODES = Object.freeze({
        NORMAL: "NORMAL",
        PUSH_UP: "PUSH_UP"
    });

    /* =========================================================
       STATE
       ========================================================= */

    let lastEnvironment = null;
    let lastResult = null;
    let lastReserveVerification = null;
    let lastSystemSetup = null;
    let lastHumanDecision = null;

    /* =========================================================
       DOM HELPERS
       ========================================================= */

    function getElement(id) {
        return document.getElementById(id);
    }

    function setText(ids, value) {

        const idList = Array.isArray(ids) ? ids : [ids];

        idList.forEach(function (id) {

            const element = getElement(id);

            if (element) {
                element.textContent =
                    value === undefined ||
                    value === null ||
                    value === ""
                        ? "—"
                        : String(value);
            }

        });

    }

    function setValue(id, value) {

        const element = getElement(id);

        if (element) {
            element.value = value;
        }

    }

    function setValueAny(ids, value) {

        const idList = Array.isArray(ids) ? ids : [ids];

        idList.forEach(function (id) {

            const element = getElement(id);

            if (element) {
                element.value = value;
            }

        });

    }

    function readValueFromIds(ids, fallback) {

        const idList = Array.isArray(ids) ? ids : [ids];

        for (const id of idList) {

            const element = getElement(id);

            if (!element) {
                continue;
            }

            const value = Number(element.value);

            if (Number.isFinite(value)) {
                return value;
            }

        }

        return fallback;
    }

    function clamp(value, min, max) {

        return Math.min(
            max,
            Math.max(min, value)
        );

    }

    function formatReserveNumber(value) {

        const number = Number(value);

        return Number.isFinite(number)
            ? number.toFixed(2)
            : "—";

    }

    function safeString(value, fallback) {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {
            return fallback;
        }

        return String(value);

    }

    /* =========================================================
       ENGINE ACCESS
       ========================================================= */

    function getEngine() {

        if (
            window.DP_SIMULATION_ENGINE &&
            typeof window.DP_SIMULATION_ENGINE.run === "function"
        ) {
            return window.DP_SIMULATION_ENGINE;
        }

        if (
            window.DPSimulationEngine &&
            typeof window.DPSimulationEngine.run === "function"
        ) {
            return window.DPSimulationEngine;
        }

        if (
            window.DPSimulation &&
            typeof window.DPSimulation.run === "function"
        ) {
            return window.DPSimulation;
        }

        if (
            window.dpSimulationEngine &&
            typeof window.dpSimulationEngine.run === "function"
        ) {
            return window.dpSimulationEngine;
        }

        return null;
    }

    function getRecommendedActions() {

        if (
            window.DP_RECOMMENDED_ACTIONS &&
            typeof window.DP_RECOMMENDED_ACTIONS.generate === "function"
        ) {
            return window.DP_RECOMMENDED_ACTIONS;
        }

        if (
            window.DPRecommendedActions &&
            typeof window.DPRecommendedActions.generate === "function"
        ) {
            return window.DPRecommendedActions;
        }

        if (
            window.dpRecommendedActions &&
            typeof window.dpRecommendedActions.generate === "function"
        ) {
            return window.dpRecommendedActions;
        }

        return null;
    }

    /* =========================================================
       ENVIRONMENT
       =========================================================
       
       Current HTML IDs:
           wind
           current
           wave
           tidal
       
       Legacy compatibility:
           windStress
           currentStress
           waveStress
           tidalStress
       ========================================================= */

    function readEnvironment() {

        const environment = {

            wind: clamp(
                readValueFromIds(
                    ["wind", "windStress"],
                    10
                ),
                0,
                100
            ),

            current: clamp(
                readValueFromIds(
                    ["current", "currentStress"],
                    10
                ),
                0,
                100
            ),

            wave: clamp(
                readValueFromIds(
                    ["wave", "waveStress"],
                    10
                ),
                0,
                100
            ),

            tidal: clamp(
                readValueFromIds(
                    ["tidal", "tidalStress"],
                    10
                ),
                0,
                100
            )

        };

        return environment;
    }

    function writeEnvironment(environment) {

        if (!environment) {
            return;
        }

        setValueAny(
            ["wind", "windStress"],
            environment.wind
        );

        setValueAny(
            ["current", "currentStress"],
            environment.current
        );

        setValueAny(
            ["wave", "waveStress"],
            environment.wave
        );

        setValueAny(
            ["tidal", "tidalStress"],
            environment.tidal
        );

    }

    /* =========================================================
       SYSTEM SETUP
       ========================================================= */

    function readSystemSetup() {

        const positioningElement =
            getElement("positioningMode");

        const engineLoadElement =
            getElement("engineLoadMode");

        const positioningMode =
            positioningElement
                ? positioningElement.value
                : POSITIONING_MODES.NON_BIAS;

        const engineLoadMode =
            engineLoadElement
                ? engineLoadElement.value
                : ENGINE_LOAD_MODES.NORMAL;

        return {

            positioningMode:
                positioningMode === POSITIONING_MODES.BIAS
                    ? POSITIONING_MODES.BIAS
                    : POSITIONING_MODES.NON_BIAS,

            engineLoadMode:
                engineLoadMode === ENGINE_LOAD_MODES.PUSH_UP
                    ? ENGINE_LOAD_MODES.PUSH_UP
                    : ENGINE_LOAD_MODES.NORMAL

        };

    }

    function updateSystemSetupDisplay(setup) {

        if (!setup) {
            return;
        }

        setText(
            ["livePositioningMode"],
            setup.positioningMode
        );

        setText(
            ["liveEngineLoadMode"],
            setup.engineLoadMode
        );

    }

    /* =========================================================
       AUTHORITATIVE SYSTEM SETUP EXTRACTION
       ========================================================= */

    function extractSystemSetup(result, environment) {

        const resultSetup =
            result &&
            result.systemSetup
                ? result.systemSetup
                : null;

        const localSetup =
            readSystemSetup();

        const positioningMode =
            safeString(
                resultSetup &&
                resultSetup.positioningMode,
                localSetup.positioningMode
            );

        const engineLoadMode =
            safeString(
                resultSetup &&
                resultSetup.engineLoadMode,
                localSetup.engineLoadMode
            );

        return {

            positioningMode:
                positioningMode === POSITIONING_MODES.BIAS
                    ? POSITIONING_MODES.BIAS
                    : POSITIONING_MODES.NON_BIAS,

            engineLoadMode:
                engineLoadMode === ENGINE_LOAD_MODES.PUSH_UP
                    ? ENGINE_LOAD_MODES.PUSH_UP
                    : ENGINE_LOAD_MODES.NORMAL,

            environment:
                environment || lastEnvironment || null

        };

    }

    /* =========================================================
       AUTHORITATIVE RESERVE EXTRACTION
       =========================================================
       
       IMPORTANT:
       The cockpit does NOT calculate or infer reserve power
       from environmental stress.
       
       The authoritative engine result is the source of truth.
       
       No reserve result after a simulation = NOT VERIFIED.
       ========================================================= */

    function extractReserveVerification(result) {

        if (
            result &&
            result.reservePowerVerification &&
            typeof result.reservePowerVerification === "object"
        ) {
            return result.reservePowerVerification;
        }

        return null;
    }

    /* =========================================================
       RESERVE POWER DISPLAY
       ========================================================= */

    function updateReservePowerDisplay(
        reserve,
        setup,
        simulationExecuted
    ) {

        const authoritativeReserve =
            reserve &&
            typeof reserve === "object"
                ? reserve
                : null;

        const engineLoadMode =
            setup &&
            setup.engineLoadMode
                ? setup.engineLoadMode
                : readSystemSetup().engineLoadMode;

        /*
         * Before a simulation:
         * reserve is deliberately NOT VERIFIED.
         */

        if (!simulationExecuted) {

            setText(
                "liveReserve",
                "NOT VERIFIED"
            );

            setText(
                "reserveGate",
                engineLoadMode === ENGINE_LOAD_MODES.PUSH_UP
                    ? "RESERVE NOT VERIFIED"
                    : "NOT REQUIRED — NORMAL LOAD"
            );

            setText(
                "reserveVerification",
                "NOT VERIFIED"
            );

            setText(
                "reserveStatus",
                "NOT VERIFIED"
            );

            setText(
                "availableReserve",
                "—"
            );

            setText(
                "requiredReserve",
                "—"
            );

            lastReserveVerification = null;

            return;

        }

        /*
         * After simulation:
         * missing authoritative reserve result fails closed.
         */

        if (!authoritativeReserve) {

            setText(
                "liveReserve",
                "NOT VERIFIED"
            );

            setText(
                "reserveGate",
                engineLoadMode === ENGINE_LOAD_MODES.PUSH_UP
                    ? "RESERVE NOT VERIFIED"
                    : "NOT REQUIRED — NORMAL LOAD"
            );

            setText(
                "reserveVerification",
                "NOT VERIFIED"
            );

            setText(
                "reserveStatus",
                "NOT VERIFIED"
            );

            setText(
                "availableReserve",
                "—"
            );

            setText(
                "requiredReserve",
                "—"
            );

            lastReserveVerification = null;

            return;

        }

        const verified =
            authoritativeReserve.reserveVerified === true;

        const available =
            authoritativeReserve.availableReserve;

        const required =
            authoritativeReserve.requiredReserve;

        const status =
            safeString(
                authoritativeReserve.status,
                verified
                    ? "RESERVE VERIFIED"
                    : "RESERVE NOT VERIFIED"
            );

        setText(
            "liveReserve",
            verified
                ? "VERIFIED"
                : "NOT VERIFIED"
        );

        if (
            engineLoadMode === ENGINE_LOAD_MODES.PUSH_UP
        ) {

            setText(
                "reserveGate",
                verified
                    ? "RESERVE VERIFIED"
                    : status || "RESERVE NOT VERIFIED"
            );

        } else {

            setText(
                "reserveGate",
                "NOT REQUIRED — NORMAL LOAD"
            );

        }

        setText(
            "reserveVerification",
            verified
                ? "VERIFIED"
                : "NOT VERIFIED"
        );

        setText(
            "reserveStatus",
            status
        );

        setText(
            "availableReserve",
            formatReserveNumber(available)
        );

        setText(
            "requiredReserve",
            formatReserveNumber(required)
        );

        lastReserveVerification =
            authoritativeReserve;

    }

    /* =========================================================
       ENGINE STATUS
       ========================================================= */

    function updateEngineStatus(engine) {

        if (engine) {

            setText(
                "engineStatus",
                "ENGINE: CONNECTED — READY"
            );

        } else {

            setText(
                "engineStatus",
                "ENGINE: UNAVAILABLE"
            );

        }

    }

    /* =========================================================
       ENVIRONMENT STATUS
       ========================================================= */

    function updateEnvironmentStatus(
        environment,
        result
    ) {

        if (
            result &&
            result.environment
        ) {

            setText(
                "environmentStatus",
                "ASSESSED"
            );

            return;
        }

        if (environment) {

            setText(
                "environmentStatus",
                "INPUT READY"
            );

            return;
        }

        setText(
            "environmentStatus",
            "WAITING"
        );

    }

    /* =========================================================
       COMPONENT STATUS
       ========================================================= */

    function updateComponentStatus(result) {

        if (!result) {
            return;
        }

        const primary =
            result.primary || {};

        const secondary =
            result.secondary || {};

        const stabilizer =
            result.stabilizer || {};

        setText(
            "primaryStatus",
            safeString(
                primary.mode ||
                primary.status,
                "STANDBY"
            )
        );

        setText(
            "secondaryStatus",
            safeString(
                secondary.mode ||
                secondary.status,
                "STANDBY"
            )
        );

        setText(
            "stabilizerStatus",
            safeString(
                stabilizer.mode ||
                stabilizer.status,
                "STANDBY"
            )
        );

    }

    /* =========================================================
       HUMAN AUTHORITY DISPLAY
       ========================================================= */

    function updateHumanAuthorityDisplay(
        result
    ) {

        const human =
            result &&
            result.human
                ? result.human
                : null;

        if (human) {

            setText(
                "humanStatus",
                safeString(
                    human.status ||
                    human.decision ||
                    human.mode,
                    "REQUIRED"
                )
            );

        } else {

            setText(
                "humanStatus",
                "REQUIRED"
            );

        }

    }

    /* =========================================================
       EXECUTION GATE
       ========================================================= */

    function extractExecutionGate(result) {

        if (
            result &&
            result.executionGate
        ) {
            return result.executionGate;
        }

        return null;
    }

    function executionGateText(result) {

        const gate =
            extractExecutionGate(result);

        if (!gate) {

            return "HUMAN AUTHORIZATION REQUIRED";

        }

        if (typeof gate === "string") {
            return gate;
        }

        return safeString(
            gate.status ||
            gate.gate ||
            gate.name,
            "HUMAN AUTHORIZATION REQUIRED"
        );

    }

    function updateExecutionDisplay(result) {

        setText(
            "executionGate",
            executionGateText(result)
        );

    }

    /* =========================================================
       DECISION TRACE
       ========================================================= */

    function updateDecisionTrace(
        result,
        environment,
        setup
    ) {

        if (!result) {
            return;
        }

        const env =
            result.environment ||
            environment ||
            {};

        const primary =
            result.primary || {};

        const secondary =
            result.secondary || {};

        const stabilizer =
            result.stabilizer || {};

        const recommendation =
            result.recommendedAction ||
            result.recommendation ||
            {};

        const proposed =
            result.proposedAction ||
            {};

        const simulated =
            result.simulatedAction ||
            {};

        setText(
            "traceEnvironment",
            safeString(
                env.name ||
                env.scenario ||
                env.environment,
                "ASSESSED"
            )
        );

        setText(
            "traceWind",
            Number.isFinite(Number(env.wind))
                ? Number(env.wind).toFixed(2)
                : "—"
        );

        setText(
            "traceCurrent",
            Number.isFinite(Number(env.current))
                ? Number(env.current).toFixed(2)
                : "—"
        );

        setText(
            "traceWave",
            Number.isFinite(Number(env.wave))
                ? Number(env.wave).toFixed(2)
                : "—"
        );

        setText(
            "traceTidal",
            Number.isFinite(Number(env.tidal))
                ? Number(env.tidal).toFixed(2)
                : "—"
        );

        setText(
            "tracePrimaryMode",
            safeString(
                primary.mode ||
                primary.status,
                "—"
            )
        );

        setText(
            "tracePrimaryResponse",
            safeString(
                primary.response ||
                primary.output ||
                primary.assessment,
                "—"
            )
        );

        setText(
            "traceSecondaryMode",
            safeString(
                secondary.mode ||
                secondary.status,
                "—"
            )
        );

        setText(
            "traceSecondaryAssessment",
            safeString(
                secondary.assessment ||
                secondary.output ||
                secondary.response,
                "—"
            )
        );

        setText(
            "traceStabilizerMode",
            safeString(
                stabilizer.mode ||
                stabilizer.status,
                "—"
            )
        );

        setText(
            "traceStabilizerSource",
            safeString(
                stabilizer.source,
                "—"
            )
        );

        setText(
            "traceStabilizerOutput",
            safeString(
                stabilizer.output ||
                stabilizer.response ||
                stabilizer.assessment,
                "—"
            )
        );

        setText(
            "traceUrgency",
            safeString(
                recommendation.urgency ||
                result.urgency,
                "NORMAL"
            )
        );

        setText(
            "traceResponseMode",
            safeString(
                recommendation.responseMode ||
                result.responseMode ||
                simulated.responseMode,
                "SIMULATED DP RESPONSE"
            )
        );

        setText(
            "traceRecommendation",
            safeString(
                recommendation.action ||
                recommendation.recommendation ||
                recommendation.text ||
                result.recommendation,
                "—"
            )
        );

        setText(
            "traceProposed",
            safeString(
                proposed.action ||
                proposed.command ||
                proposed.response ||
                proposed.status,
                "HELD FOR HUMAN DECISION"
            )
        );

        /*
         * IMPORTANT:
         * traceGate and system executionGate are separate.
         *
         * traceGate = decision-trace interpretation.
         * executionGate = authoritative system execution gate.
         */

        const executionGate =
            extractExecutionGate(result);

        let traceGate =
            safeString(
                proposed.gate ||
                proposed.executionGate ||
                result.decisionGate,
                ""
            );

        if (!traceGate) {

            if (
                setup &&
                setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP
            ) {

                const reserve =
                    result.reservePowerVerification;

                if (!reserve) {

                    traceGate =
                        "RESERVE GATE";

                } else if (
                    reserve.reserveVerified !== true
                ) {

                    traceGate =
                        "RESERVE GATE";

                } else {

                    traceGate =
                        "WAITING FOR HUMAN DECISION";

                }

            } else {

                traceGate =
                    "WAITING FOR HUMAN DECISION";

            }

        }

        setText(
            ["gate", "traceGate"],
            traceGate
        );

        setText(
            "executionGate",
            executionGate
                ? executionGateText(result)
                : "HUMAN AUTHORIZATION REQUIRED"
        );

        setText(
            "traceActionStatus",
            safeString(
                proposed.status ||
                proposed.actionStatus ||
                simulated.status,
                "WAITING FOR HUMAN DECISION"
            )
        );

    }

    /* =========================================================
       LENA DECISION SUPPORT DISPLAY
       ========================================================= */

    function updateLenaDisplay(result) {

        const recommendation =
            result &&
            result.recommendedAction
                ? result.recommendedAction
                : {};

        const action =
            safeString(
                recommendation.action ||
                recommendation.recommendation ||
                recommendation.text ||
                result?.recommendation,
                "—"
            );

        const urgency =
            safeString(
                recommendation.urgency ||
                result?.urgency,
                "NORMAL"
            );

        const responseMode =
            safeString(
                recommendation.responseMode ||
                result?.responseMode,
                "SIMULATED DP RESPONSE"
            );

        setText(
            "lenaStatus",
            "DECISION SUPPORT"
        );

        setText(
            "lenaRecommendation",
            action
        );

        setText(
            "lenaUrgency",
            urgency
        );

        setText(
            "lenaResponseMode",
            responseMode
        );

        setText(
            "lenaAutonomousCommand",
            "FALSE — NO AUTONOMOUS COMMAND"
        );

        setText(
            "lenaUMVAction",
            "SIMULATION ONLY"
        );

        setText(
            "lenaMessage",
            action === "—"
                ? "Awaiting simulation."
                : "Decision support generated. Human authority remains final."
        );

    }

    /* =========================================================
       RECOMMENDED ACTION DISPLAY
       ========================================================= */

    function updateRecommendedAction(
        result,
        environment
    ) {

        const recommendedActions =
            getRecommendedActions();

        let recommendationPackage = null;

        if (
            recommendedActions &&
            typeof recommendedActions.generate === "function"
        ) {

            try {

                recommendationPackage =
                    recommendedActions.generate(
                        result,
                        environment
                    );

            } catch (error) {

                console.warn(
                    "Recommended action generation unavailable:",
                    error
                );

            }

        }

        const recommendation =
            result?.recommendedAction ||
            recommendationPackage?.recommendedAction ||
            result?.recommendation ||
            {};

        const action =
            safeString(
                recommendation.action ||
                recommendation.recommendation ||
                recommendation.text ||
                recommendationPackage?.engineLoad?.recommendation,
                "—"
            );

        const urgency =
            safeString(
                recommendation.urgency ||
                recommendationPackage?.urgency,
                "NORMAL"
            );

        setText(
            "recommendedAutonomous",
            "FALSE"
        );

        setText(
            "recommendedLenaStatus",
            "DECISION SUPPORT"
        );

        setText(
            "recommendedControlMode",
            "HUMAN AUTHORITY"
        );

        setText(
            "recommendedUrgency",
            urgency
        );

        setText(
            "recommendedAction",
            action
        );

        setText(
            "recommendedMessage",
            action === "—"
                ? "No recommendation available until a simulation is executed."
                : "Recommendation is advisory only. Human authority remains final."
        );

    }

    /* =========================================================
       SIMULATED VESSEL STATE
       ========================================================= */

    function updateSimulatedVesselState(
        result
    ) {

        const state =
            result &&
            result.updatedState
                ? result.updatedState
                : null;

        const simulated =
            result &&
            result.simulatedAction
                ? result.simulatedAction
                : null;

        if (!state && !simulated) {

            setText(
                "positionError",
                "0.00"
            );

            setText(
                "simulatedCommand",
                "0"
            );

            setText(
                "stabilityIndex",
                "100"
            );

            setText(
                "vesselState",
                "STABLE"
            );

            setText(
                "simulatedDPResponse",
                "—"
            );

            return;

        }

        setText(
            "positionError",
            formatReserveNumber(
                state?.positionError ??
                state?.position_error ??
                0
            )
        );

        setText(
            "simulatedCommand",
            safeString(
                state?.simulatedCommand ??
                state?.command ??
                simulated?.command,
                "0"
            )
        );

        setText(
            "stabilityIndex",
            safeString(
                state?.stabilityIndex ??
                state?.stability ??
                100,
                "100"
            )
        );

        setText(
            "vesselState",
            safeString(
                state?.vesselState ??
                state?.status ??
                "STABLE",
                "STABLE"
            )
        );

        setText(
            "simulatedDPResponse",
            safeString(
                simulated?.response ||
                simulated?.action ||
                simulated?.status ||
                "HELD FOR HUMAN DECISION",
                "HELD FOR HUMAN DECISION"
            )
        );

    }

    /* =========================================================
       ASSESSMENT OUTPUT
       ========================================================= */

    function updateAssessmentOutput(result) {

        const assessment =
            result?.assessment ||
            result?.validation ||
            result?.environmentAssessment ||
            result?.audit?.assessment ||
            null;

        if (assessment) {

            setText(
                "assessmentOutput",
                JSON.stringify(
                    assessment,
                    null,
                    2
                )
            );

            return;
        }

        if (result) {

            setText(
                "assessmentOutput",
                JSON.stringify(
                    {
                        environment:
                            result.environment || null,

                        primary:
                            result.primary || null,

                        secondary:
                            result.secondary || null,

                        stabilizer:
                            result.stabilizer || null,

                        recommendedAction:
                            result.recommendedAction || null,

                        executionGate:
                            result.executionGate || null
                    },
                    null,
                    2
                )
            );

            return;
        }

        setText(
            "assessmentOutput",
            "Awaiting simulation."
        );

    }

    /* =========================================================
       AUDIT OUTPUT
       ========================================================= */

    function buildCockpitAudit(
        result,
        environment,
        setup,
        reserve
    ) {

        const executionGate =
            extractExecutionGate(result);

        return {

            controller:
                CONTROLLER_NAME,

            controllerVersion:
                CONTROLLER_VERSION,

            researchOnly:
                RESEARCH_MODE,

            safetyBoundary: {

                operationalConnection:
                    OPERATIONAL_CONNECTION,

                realActuatorInterface:
                    REAL_ACTUATOR_INTERFACE,

                autonomousExecution:
                    AUTONOMOUS_EXECUTION,

                humanAuthorityFinal:
                    HUMAN_AUTHORITY_FINAL

            },

            goldenRule:
                GOLDEN_RULE,

            systemSetup: {

                positioningMode:
                    setup?.positioningMode ||
                    POSITIONING_MODES.NON_BIAS,

                engineLoadMode:
                    setup?.engineLoadMode ||
                    ENGINE_LOAD_MODES.NORMAL,

                positioningBiasOnly:
                    true,

                pushUpIsPositioningBias:
                    false,

                pushUpIsEngineCompensation:
                    true,

                reserveRequiredForPushUp:
                    true

            },

            environment:
                environment || null,

            reservePowerVerification:
                reserve || null,

            reserveVerificationStatus:
                reserve
                    ? reserve.reserveVerified === true
                        ? "VERIFIED"
                        : "NOT VERIFIED"
                    : "NOT VERIFIED",

            availableReserve:
                reserve &&
                Number.isFinite(
                    Number(reserve.availableReserve)
                )
                    ? Number(reserve.availableReserve)
                    : null,

            requiredReserve:
                reserve &&
                Number.isFinite(
                    Number(reserve.requiredReserve)
                )
                    ? Number(reserve.requiredReserve)
                    : null,

            humanAuthorizationRequired:
                true,

            autonomousCommand:
                false,

            operationalCommand:
                null,

            executionGate:
                executionGate || {
                    status:
                        "HUMAN AUTHORIZATION REQUIRED"
                },

            simulationExecuted:
                !!result,

            realVessel:
                false,

            actuator:
                false,

            externalSystemCommand:
                false,

            source:
                "DP COCKPIT CONTROLLER V2.6.3"

        };

    }

    function updateAuditOutput(
        result,
        environment,
        setup,
        reserve
    ) {

        if (!result) {

            setText(
                "auditOutput",
                "Awaiting simulation."
            );

            return;

        }

        const audit =
            buildCockpitAudit(
                result,
                environment,
                setup,
                reserve
            );

        setText(
            "auditOutput",
            JSON.stringify(
                audit,
                null,
                2
            )
        );

    }

    /* =========================================================
       DECISION STATE RESET
       ========================================================= */

    function resetDynamicDisplay() {

        setText(
            "engineStatus",
            "ENGINE: INITIALISING..."
        );

        setText(
            "environmentStatus",
            "WAITING"
        );

        setText(
            "primaryStatus",
            "STANDBY"
        );

        setText(
            "secondaryStatus",
            "STANDBY"
        );

        setText(
            "stabilizerStatus",
            "STANDBY"
        );

        setText(
            "humanStatus",
            "REQUIRED"
        );

        setText(
            "systemStatus",
            "READY"
        );

        setText(
            "executionGate",
            "HUMAN AUTHORIZATION REQUIRED"
        );

        setText(
            "traceEnvironment",
            "—"
        );

        setText(
            "traceWind",
            "—"
        );

        setText(
            "traceCurrent",
            "—"
        );

        setText(
            "traceWave",
            "—"
        );

        setText(
            "traceTidal",
            "—"
        );

        setText(
            "tracePrimaryMode",
            "—"
        );

        setText(
            "tracePrimaryResponse",
            "—"
        );

        setText(
            "traceSecondaryMode",
            "—"
        );

        setText(
            "traceSecondaryAssessment",
            "—"
        );

        setText(
            "traceStabilizerMode",
            "—"
        );

        setText(
            "traceStabilizerSource",
            "—"
        );

        setText(
            "traceStabilizerOutput",
            "—"
        );

        setText(
            "traceUrgency",
            "—"
        );

        setText(
            "traceResponseMode",
            "—"
        );

        setText(
            "traceRecommendation",
            "—"
        );

        setText(
            "traceProposed",
            "—"
        );

        setText(
            "traceGate",
            "—"
        );

        setText(
            "traceActionStatus",
            "—"
        );

        setText(
            "lenaStatus",
            "DECISION SUPPORT"
        );

        setText(
            "lenaRecommendation",
            "—"
        );

        setText(
            "lenaUrgency",
            "NORMAL"
        );

        setText(
            "lenaResponseMode",
            "SIMULATED DP RESPONSE"
        );

        setText(
            "lenaAutonomousCommand",
            "FALSE — NO AUTONOMOUS COMMAND"
        );

        setText(
            "lenaUMVAction",
            "SIMULATION ONLY"
        );

        setText(
            "lenaMessage",
            "Awaiting simulation."
        );

        setText(
            "recommendedAutonomous",
            "FALSE"
        );

        setText(
            "recommendedLenaStatus",
            "DECISION SUPPORT"
        );

        setText(
            "recommendedControlMode",
            "HUMAN AUTHORITY"
        );

        setText(
            "recommendedUrgency",
            "NORMAL"
        );

        setText(
            "recommendedAction",
            "—"
        );

        setText(
            "recommendedMessage",
            "No recommendation available until a simulation is executed."
        );

        setText(
            "humanDecisionStatus",
            "HUMAN AUTHORIZATION REQUIRED — NO ACTION AUTHORIZED"
        );

        setText(
            "positionError",
            "0.00"
        );

        setText(
            "simulatedCommand",
            "0"
        );

        setText(
            "stabilityIndex",
            "100"
        );

        setText(
            "vesselState",
            "STABLE"
        );

        setText(
            "simulatedDPResponse",
            "—"
        );

        setText(
            "assessmentOutput",
            "Awaiting simulation."
        );

        setText(
            "auditOutput",
            "Awaiting simulation."
        );

        updateReservePowerDisplay(
            null,
            readSystemSetup(),
            false
        );

        lastEnvironment = null;
        lastResult = null;
        lastReserveVerification = null;
        lastSystemSetup = null;
        lastHumanDecision = null;

    }

    /* =========================================================
       HUMAN DECISION DISPLAY
       ========================================================= */

    function updateHumanDecisionStatus(
        decision
    ) {

        if (!decision) {

            setText(
                "humanDecisionStatus",
                "HUMAN AUTHORIZATION REQUIRED — NO ACTION AUTHORIZED"
            );

            return;

        }

        const decisionName =
            safeString(
                decision.decision ||
                decision.action ||
                decision.status,
                "HUMAN DECISION RECORDED"
            );

        setText(
            "humanDecisionStatus",
            decisionName
        );

    }

    /* =========================================================
       RUN SIMULATION
       ========================================================= */

    function runSimulation() {

        const engine =
            getEngine();

        if (!engine) {

            setText(
                "engineStatus",
                "ENGINE: UNAVAILABLE"
            );

            setText(
                "systemStatus",
                "SIMULATION BLOCKED — ENGINE UNAVAILABLE"
            );

            setText(
                "executionGate",
                "HUMAN AUTHORIZATION REQUIRED"
            );

            return null;

        }

        const environment =
            readEnvironment();

        const setup =
            readSystemSetup();

        /*
         * Update live setup immediately from the current controls.
         */

        updateSystemSetupDisplay(
            setup
        );

        /*
         * Human decision state is reset before every new simulation.
         */

        lastHumanDecision = null;

        setText(
            "humanDecisionStatus",
            "HUMAN AUTHORIZATION REQUIRED — NO ACTION AUTHORIZED"
        );

        let result = null;

        try {

            /*
             * The authoritative engine accepts the environment.
             * The controller does not reproduce engine calculations.
             */

            result =
                engine.run(
                    environment,
                    setup
                );

        } catch (firstError) {

            console.warn(
                "Engine run(environment, setup) failed. Trying environment-only execution.",
                firstError
            );

            try {

                result =
                    engine.run(
                        environment
                    );

            } catch (secondError) {

                console.error(
                    "DP simulation engine execution failed:",
                    secondError
                );

                setText(
                    "systemStatus",
                    "SIMULATION ERROR"
                );

                setText(
                    "executionGate",
                    "HUMAN AUTHORIZATION REQUIRED"
                );

                setText(
                    "assessmentOutput",
                    JSON.stringify(
                        {
                            error:
                                "DP simulation engine execution failed.",
                            controller:
                                CONTROLLER_VERSION,
                            safety:
                                "No operational command issued."
                        },
                        null,
                        2
                    )
                );

                return null;

            }

        }

        if (!result) {

            setText(
                "systemStatus",
                "SIMULATION ERROR"
            );

            return null;

        }

        lastEnvironment =
            environment;

        lastResult =
            result;

        lastSystemSetup =
            extractSystemSetup(
                result,
                environment
            );

        lastReserveVerification =
            extractReserveVerification(
                result
            );

        setText(
            "engineStatus",
            "ENGINE: CONNECTED — READY"
        );

        updateEnvironmentStatus(
            environment,
            result
        );

        updateComponentStatus(
            result
        );

        updateHumanAuthorityDisplay(
            result
        );

        updateSystemSetupDisplay(
            lastSystemSetup
        );

        /*
         * AUTHORITATIVE RESERVE UPDATE
         *
         * This is intentionally executed immediately after
         * every successful simulation.
         */

        updateReservePowerDisplay(
            lastReserveVerification,
            lastSystemSetup,
            true
        );

        updateDecisionTrace(
            result,
            environment,
            lastSystemSetup
        );

        updateLenaDisplay(
            result
        );

        updateRecommendedAction(
            result,
            environment
        );

        updateSimulatedVesselState(
            result
        );

        updateAssessmentOutput(
            result
        );

        updateAuditOutput(
            result,
            environment,
            lastSystemSetup,
            lastReserveVerification
        );

        setText(
            "systemStatus",
            "SIMULATION COMPLETE — HUMAN DECISION PENDING"
        );

        /*
         * The authoritative execution gate remains separate from
         * the decision-trace gate.
         */

        setText(
            "executionGate",
            executionGateText(result)
        );

        console.log(
            "============================================================"
        );

        console.log(
            "SEXTANT PROTOCOL™ DP RESILIENCE V&V COCKPIT"
        );

        console.log(
            "Controller:",
            CONTROLLER_VERSION
        );

        console.log(
            "Positioning:",
            lastSystemSetup.positioningMode
        );

        console.log(
            "Engine Load:",
            lastSystemSetup.engineLoadMode
        );

        console.log(
            "PUSH-UP ≠ POSITIONING BIAS"
        );

        console.log(
            "Reserve Verification:",
            lastReserveVerification
                ? lastReserveVerification.reserveVerified
                : false
        );

        console.log(
            "Human Authority Final:",
            HUMAN_AUTHORITY_FINAL
        );

        console.log(
            "Autonomous Execution:",
            AUTONOMOUS_EXECUTION
        );

        console.log(
            "Operational Connection:",
            OPERATIONAL_CONNECTION
        );

        console.log(
            "Simulation Complete — Human Decision Pending"
        );

        console.log(
            "============================================================"
        );

        return result;

    }

    /* =========================================================
       HUMAN ACTION — ACKNOWLEDGE CONDITION
       ========================================================= */

    function acknowledgeCondition() {

        if (!lastResult) {

            setText(
                "humanDecisionStatus",
                "NO SIMULATION — HUMAN DECISION NOT AVAILABLE"
            );

            return null;

        }

        const engine =
            getEngine();

        let decision = null;

        if (
            engine &&
            typeof engine.acknowledgeCondition === "function"
        ) {

            decision =
                engine.acknowledgeCondition();

        } else if (
            engine &&
            typeof engine.humanDecision === "function"
        ) {

            decision =
                engine.humanDecision(
                    "ACKNOWLEDGE_CONDITION"
                );

        } else {

            decision = {

                decision:
                    "CONDITION ACKNOWLEDGED — NO ACTION AUTHORIZED",

                action:
                    "ACKNOWLEDGE_CONDITION",

                autonomous:
                    false,

                humanAuthority:
                    true

            };

        }

        lastHumanDecision =
            decision;

        updateHumanDecisionStatus(
            decision
        );

        setText(
            "executionGate",
            "HUMAN DECISION RECORDED — NO ACTION AUTHORIZED"
        );

        return decision;

    }

    /* =========================================================
       HUMAN ACTION — MAINTAIN SAFE STATE
       ========================================================= */

    function maintainSafeState() {

        if (!lastResult) {

            setText(
                "humanDecisionStatus",
                "NO SIMULATION — HUMAN DECISION NOT AVAILABLE"
            );

            return null;

        }

        const engine =
            getEngine();

        let decision = null;

        if (
            engine &&
            typeof engine.maintainSafeState === "function"
        ) {

            decision =
                engine.maintainSafeState();

        } else if (
            engine &&
            typeof engine.humanDecision === "function"
        ) {

            decision =
                engine.humanDecision(
                    "MAINTAIN_SAFE_STATE"
                );

        } else {

            decision = {

                decision:
                    "SAFE STATE MAINTAINED — NO SIMULATED RESPONSE AUTHORIZED",

                action:
                    "MAINTAIN_SAFE_STATE",

                autonomous:
                    false,

                humanAuthority:
                    true

            };

        }

        lastHumanDecision =
            decision;

        updateHumanDecisionStatus(
            decision
        );

        setText(
            "executionGate",
            "SAFE STATE MAINTAINED — NO ACTION AUTHORIZED"
        );

        return decision;

    }

    /* =========================================================
       HUMAN ACTION — AUTHORIZE SIMULATED RESPONSE
       ========================================================= */

    function authorizeSimulatedResponse() {

        if (!lastResult) {

            setText(
                "humanDecisionStatus",
                "NO SIMULATION — HUMAN AUTHORIZATION NOT AVAILABLE"
            );

            return null;

        }

        /*
         * PUSH-UP must never be authorized without an
         * authoritative reserve verification.
         */

        const setup =
            lastSystemSetup ||
            readSystemSetup();

        const reserve =
            lastReserveVerification;

        if (
            setup.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                !reserve ||
                reserve.reserveVerified !== true
            ) {

                const blockedDecision = {

                    decision:
                        "PUSH-UP BLOCKED — RESERVE NOT VERIFIED",

                    action:
                        "NO_LOAD_TRANSFER",

                    autonomous:
                        false,

                    humanAuthority:
                        true,

                    safetyGate:
                        "RESERVE POWER VERIFICATION REQUIRED"

                };

                lastHumanDecision =
                    blockedDecision;

                updateHumanDecisionStatus(
                    blockedDecision
                );

                setText(
                    "executionGate",
                    "RESERVE GATE — SIMULATED RESPONSE BLOCKED"
                );

                setText(
                    "systemStatus",
                    "SIMULATION HOLD — RESERVE GATE"
                );

                return blockedDecision;

            }

        }

        const engine =
            getEngine();

        let decision = null;

        if (
            engine &&
            typeof engine.authorizeSimulatedResponse ===
                "function"
        ) {

            decision =
                engine.authorizeSimulatedResponse();

        } else if (
            engine &&
            typeof engine.authorizeSimulation ===
                "function"
        ) {

            decision =
                engine.authorizeSimulation();

        } else if (
            engine &&
            typeof engine.humanDecision ===
                "function"
        ) {

            decision =
                engine.humanDecision(
                    "AUTHORIZE_SIMULATED_RESPONSE"
                );

        } else {

            decision = {

                decision:
                    "SIMULATED RESPONSE AUTHORIZED",

                action:
                    "AUTHORIZE_SIMULATED_RESPONSE",

                autonomous:
                    false,

                humanAuthority:
                    true,

                operationalCommand:
                    null,

                simulatedOnly:
                    true

            };

        }

        lastHumanDecision =
            decision;

        updateHumanDecisionStatus(
            decision
        );

        /*
         * Update the simulated result only.
         * No operational command is possible.
         */

        const simulatedResult =
            decision &&
            decision.result
                ? decision.result
                : null;

        if (simulatedResult) {

            updateSimulatedVesselState(
                simulatedResult
            );

        }

        setText(
            "executionGate",
            "SIMULATED RESPONSE AUTHORIZED — V&V ONLY"
        );

        setText(
            "systemStatus",
            "SIMULATED RESPONSE AUTHORIZED — V&V ONLY"
        );

        /*
         * Refresh audit with the same authoritative reserve
         * object that remains displayed.
         */

        updateAuditOutput(
            lastResult,
            lastEnvironment,
            lastSystemSetup,
            lastReserveVerification
        );

        return decision;

    }

    /* =========================================================
       SCENARIO CONTROL
       ========================================================= */

    function applyScenario(
        name,
        values
    ) {

        if (!values) {
            return;
        }

        writeEnvironment(
            values
        );

        setText(
            "environmentStatus",
            "SCENARIO READY — " + name
        );

        console.log(
            "Scenario selected:",
            name,
            values
        );

    }

    function normalScenario() {

        applyScenario(
            "NORMAL",
            {
                wind: 20,
                current: 20,
                wave: 20,
                tidal: 20
            }
        );

    }

    function moderateWeatherScenario() {

        applyScenario(
            "MODERATE WEATHER",
            {
                wind: 40,
                current: 35,
                wave: 40,
                tidal: 25
            }
        );

    }

    function heavyWeatherScenario() {

        applyScenario(
            "HEAVY WEATHER",
            {
                wind: 65,
                current: 55,
                wave: 65,
                tidal: 40
            }
        );

    }

    function criticalScenario() {

        applyScenario(
            "CRITICAL",
            {
                wind: 90,
                current: 85,
                wave: 90,
                tidal: 70
            }
        );

    }

    function currentSurgeScenario() {

        applyScenario(
            "CURRENT SURGE",
            {
                wind: 25,
                current: 90,
                wave: 35,
                tidal: 55
            }
        );

    }

    function heavySeaStateScenario() {

        applyScenario(
            "HEAVY SEA STATE",
            {
                wind: 60,
                current: 50,
                wave: 95,
                tidal: 45
            }
        );

    }

    function windGustScenario() {

        applyScenario(
            "WIND GUST",
            {
                wind: 95,
                current: 30,
                wave: 40,
                tidal: 25
            }
        );

    }

    function combinedDisturbanceScenario() {

        applyScenario(
            "COMBINED DISTURBANCE",
            {
                wind: 75,
                current: 70,
                wave: 80,
                tidal: 60
            }
        );

    }

    function randomScenario() {

        function randomStress() {

            return Math.floor(
                Math.random() * 101
            );

        }

        applyScenario(
            "RANDOM",
            {
                wind:
                    randomStress(),

                current:
                    randomStress(),

                wave:
                    randomStress(),

                tidal:
                    randomStress()
            }
        );

    }

    /* =========================================================
       SETUP CHANGE HANDLERS
       ========================================================= */

    function handleSetupChange() {

        const setup =
            readSystemSetup();

        updateSystemSetupDisplay(
            setup
        );

        /*
         * A setup change invalidates any previous reserve
         * verification because the engine-load request may
         * have changed.
         */

        updateReservePowerDisplay(
            null,
            setup,
            false
        );

        setText(
            "systemStatus",
            "READY"
        );

        setText(
            "executionGate",
            "HUMAN AUTHORIZATION REQUIRED"
        );

    }

    /* =========================================================
       BUTTON BINDING
       ========================================================= */

    function bindButton(
        id,
        handler
    ) {

        const element =
            getElement(id);

        if (
            element &&
            typeof handler === "function"
        ) {

            element.addEventListener(
                "click",
                handler
            );

        }

    }

    function bindInterface() {

        const positioningMode =
            getElement("positioningMode");

        if (positioningMode) {

            positioningMode.addEventListener(
                "change",
                handleSetupChange
            );

        }

        const engineLoadMode =
            getElement("engineLoadMode");

        if (engineLoadMode) {

            engineLoadMode.addEventListener(
                "change",
                handleSetupChange
            );

        }

        bindButton(
            "runSimulation",
            runSimulation
        );

        bindButton(
            "resetSystem",
            resetSystem
        );

        bindButton(
            "acknowledgeConditionButton",
            acknowledgeCondition
        );

        bindButton(
            "maintainSafeStateButton",
            maintainSafeState
        );

        bindButton(
            "authorizeSimulatedResponseButton",
            authorizeSimulatedResponse
        );

    }

    /* =========================================================
       RESET
       ========================================================= */

    function resetSystem() {

        resetDynamicDisplay();

        const setup =
            readSystemSetup();

        updateSystemSetupDisplay(
            setup
        );

        updateReservePowerDisplay(
            null,
            setup,
            false
        );

        setText(
            "systemStatus",
            "READY"
        );

        setText(
            "engineStatus",
            getEngine()
                ? "ENGINE: CONNECTED — READY"
                : "ENGINE: INITIALISING..."
        );

        console.log(
            "Sextant Protocol™ DP Cockpit reset."
        );

        console.log(
            "Controller:",
            CONTROLLER_VERSION
        );

        console.log(
            "Reserve Power:",
            "NOT VERIFIED"
        );

        console.log(
            "Human Authority:",
            "REQUIRED"
        );

    }

    /* =========================================================
       BOOT
       ========================================================= */

    function boot() {

        console.log(
            "============================================================"
        );

        console.log(
            CONTROLLER_NAME
        );

        console.log(
            "Controller Version:",
            CONTROLLER_VERSION
        );

        console.log(
            "Golden Rule:",
            GOLDEN_RULE
        );

        console.log(
            "Research Mode:",
            RESEARCH_MODE
        );

        console.log(
            "Human Authority Final:",
            HUMAN_AUTHORITY_FINAL
        );

        console.log(
            "Autonomous Execution:",
            AUTONOMOUS_EXECUTION
        );

        console.log(
            "Operational Connection:",
            OPERATIONAL_CONNECTION
        );

        console.log(
            "Real Actuator Interface:",
            REAL_ACTUATOR_INTERFACE
        );

        console.log(
            "Positioning:",
            "BIAS / NON-BIAS"
        );

        console.log(
            "Engine Load:",
            "NORMAL / PUSH-UP"
        );

        console.log(
            "PUSH-UP ≠ POSITIONING BIAS"
        );

        console.log(
            "Reserve Verification:",
            "REQUIRED FOR PUSH-UP"
        );

        console.log(
            "============================================================"
        );

        bindInterface();

        resetDynamicDisplay();

        updateSystemSetupDisplay(
            readSystemSetup()
        );

        updateReservePowerDisplay(
            null,
            readSystemSetup(),
            false
        );

        updateEngineStatus(
            getEngine()
        );

    }

    /* =========================================================
       PUBLIC API
       ========================================================= */

    /*
     * IMPORTANT:
     * The HTML uses inline scenario handlers and human
     * decision handlers. Explicitly expose all handlers on
     * window so the existing frozen index.html continues
     * to work reliably.
     */

    window.runSimulation =
        runSimulation;

    window.resetSystem =
        resetSystem;

    window.acknowledgeCondition =
        acknowledgeCondition;

    window.maintainSafeState =
        maintainSafeState;

    window.authorizeSimulatedResponse =
        authorizeSimulatedResponse;

    window.normalScenario =
        normalScenario;

    window.moderateWeatherScenario =
        moderateWeatherScenario;

    window.heavyWeatherScenario =
        heavyWeatherScenario;

    window.criticalScenario =
        criticalScenario;

    window.currentSurgeScenario =
        currentSurgeScenario;

    window.heavySeaStateScenario =
        heavySeaStateScenario;

    window.windGustScenario =
        windGustScenario;

    window.combinedDisturbanceScenario =
        combinedDisturbanceScenario;

    window.randomScenario =
        randomScenario;

    window.SEXTANT_DP_COCKPIT =
        Object.freeze({

            name:
                CONTROLLER_NAME,

            version:
                CONTROLLER_VERSION,

            researchOnly:
                RESEARCH_MODE,

            autonomousExecution:
                AUTONOMOUS_EXECUTION,

            operationalConnection:
                OPERATIONAL_CONNECTION,

            realActuatorInterface:
                REAL_ACTUATOR_INTERFACE,

            humanAuthorityFinal:
                HUMAN_AUTHORITY_FINAL,

            goldenRule:
                GOLDEN_RULE,

            positioningModes:
                POSITIONING_MODES,

            engineLoadModes:
                ENGINE_LOAD_MODES,

            run:
                runSimulation,

            reset:
                resetSystem,

            acknowledgeCondition:
                acknowledgeCondition,

            maintainSafeState:
                maintainSafeState,

            authorizeSimulatedResponse:
                authorizeSimulatedResponse

        });

    /* =========================================================
       START
       ========================================================= */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            boot
        );

    } else {

        boot();

    }

})();
