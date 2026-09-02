/* ============================================================
 * SEXTANT PROTOCOL™
 * DP RESILIENCE V&V RESEARCH COCKPIT
 *
 * Controller Version: v2.6.2
 * Simulation Engine: v1.2.0
 * Recommended Actions: SPD-DP-RECOMMENDED-ACTIONS-V1.2
 *
 * RESEARCH / V&V ONLY
 * NO OPERATIONAL VESSEL CONNECTION
 * NO AUTONOMOUS COMMAND
 * HUMAN AUTHORITY REMAINS FINAL
 *
 * GOLDEN RULE:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * IMPORTANT DISTINCTIONS:
 * BIAS / NON-BIAS = POSITIONING MODE
 * NORMAL / PUSH-UP = ENGINE LOAD MODE
 * PUSH-UP ≠ POSITIONING BIAS
 * PUSH-UP REQUIRES RESERVE-POWER VERIFICATION
 * ============================================================ */

(function () {
    "use strict";

    /* ==========================================================
     * MODULE IDENTITY
     * ========================================================== */

    const MODULE_NAME =
        "SextantDPResilienceCockpit";

    const VERSION =
        "2.6.2";

    const SIMULATION_ENGINE_VERSION =
        "1.2.0";

    const RECOMMENDED_ACTIONS_VERSION =
        "SPD-DP-RECOMMENDED-ACTIONS-V1.2";

    /* ==========================================================
     * SAFETY BOUNDARY
     * ========================================================== */

    const SAFETY_BOUNDARY = Object.freeze({
        simulationOnly: true,
        autonomousExecution: false,
        operationalVesselConnection: false,
        actuatorInterface: false,
        externalSystemCommand: false,
        humanAuthorityFinal: true,
        realDPCommand: false,
        researchAndVerificationOnly: true
    });

    /* ==========================================================
     * FIXED DEFINITIONS
     * ========================================================== */

    const POSITIONING_MODES = Object.freeze({
        NON_BIAS: "NON_BIAS",
        BIAS: "BIAS"
    });

    const ENGINE_LOAD_MODES = Object.freeze({
        NORMAL: "NORMAL",
        PUSH_UP: "PUSH_UP"
    });

    const HUMAN_DECISIONS = Object.freeze({
        ACKNOWLEDGE: "ACKNOWLEDGE_CONDITION",
        MAINTAIN_SAFE_STATE: "MAINTAIN_SAFE_STATE",
        AUTHORIZE_SIMULATED_RESPONSE:
            "AUTHORIZE_SIMULATED_RESPONSE"
    });

    const DEFAULT_LENA_MESSAGE =
        "Maintain the simulated safe state and continue monitoring the assessed conditions.";

    /* ==========================================================
     * INTERNAL STATE
     * ========================================================== */

    let lastEnvironment = null;
    let lastResult = null;
    let lastRecommendedAction = null;

    let humanDecisionState =
        HUMAN_DECISIONS.ACKNOWLEDGE;

    let simulationHasRun = false;

    /* ==========================================================
     * DOM HELPERS
     * ========================================================== */

    function getElement(id) {
        return document.getElementById(id);
    }

    function getFirstElement(ids) {
        const list =
            Array.isArray(ids)
                ? ids
                : [ids];

        for (const id of list) {
            const element =
                getElement(id);

            if (element) {
                return element;
            }
        }

        return null;
    }

    function setText(ids, value) {
        const element =
            getFirstElement(ids);

        if (!element) {
            return;
        }

        element.textContent =
            value === undefined ||
            value === null ||
            value === ""
                ? "—"
                : String(value);
    }

    function setTextAll(ids, value) {
        const list =
            Array.isArray(ids)
                ? ids
                : [ids];

        list.forEach(function (id) {
            const element =
                getElement(id);

            if (!element) {
                return;
            }

            element.textContent =
                value === undefined ||
                value === null ||
                value === ""
                    ? "—"
                    : String(value);
        });
    }

    function setValue(id, value) {
        const element =
            getElement(id);

        if (!element) {
            return;
        }

        element.value =
            value === undefined ||
            value === null
                ? ""
                : String(value);
    }

    function readValue(ids, fallback) {
        const element =
            getFirstElement(ids);

        if (!element) {
            return fallback;
        }

        const value =
            Number(element.value);

        return Number.isFinite(value)
            ? value
            : fallback;
    }

    function readSelect(ids, fallback) {
        const element =
            getFirstElement(ids);

        if (!element) {
            return fallback;
        }

        return element.value ||
            fallback;
    }

    function safeJSON(value) {
        try {
            return JSON.stringify(
                value
            );
        } catch (error) {
            return String(value);
        }
    }

    function clamp(
        value,
        minimum,
        maximum
    ) {
        return Math.max(
            minimum,
            Math.min(
                maximum,
                value
            )
        );
    }

    function formatNumber(
        value,
        decimals
    ) {
        const numeric =
            Number(value);

        if (!Number.isFinite(numeric)) {
            return "—";
        }

        return numeric.toFixed(
            decimals
        );
    }

    /* ==========================================================
     * SAFETY DISPLAY
     * ========================================================== */

    function updateSafetyDisplay() {

        setText(
            [
                "safetyBoundary",
                "safetyStatus",
                "researchMode"
            ],
            "V&V RESEARCH MODE — HUMAN AUTHORITY REQUIRED"
        );

        setText(
            [
                "autonomousCommand",
                "autonomousStatus"
            ],
            "FALSE — NO AUTONOMOUS COMMAND"
        );

        setText(
            [
                "simulationOnly",
                "simulationStatus"
            ],
            "SIMULATION ONLY"
        );
    }

    /* ==========================================================
     * ENGINE DISCOVERY
     * ========================================================== */

    function getSimulationEngine() {

        const candidates = [
            window.SextantDPSimulationEngine,
            window.SextantDPSimulationEngineV1,
            window.DPSimulationEngine,
            window.DPResilienceSimulationEngine,
            window.SextantSimulationEngine
        ];

        for (const candidate of candidates) {

            if (!candidate) {
                continue;
            }

            if (
                typeof candidate.run ===
                    "function" ||
                typeof candidate.simulate ===
                    "function"
            ) {
                return candidate;
            }

            if (
                typeof candidate.create ===
                    "function"
            ) {
                try {

                    const instance =
                        candidate.create();

                    if (
                        instance &&
                        (
                            typeof instance.run ===
                                "function" ||
                            typeof instance.simulate ===
                                "function"
                        )
                    ) {
                        return instance;
                    }

                } catch (error) {

                    console.warn(
                        "[Sextant Cockpit] Engine create() failed:",
                        error
                    );
                }
            }
        }

        return null;
    }

    function getRecommendedActionsEngine() {

        const candidates = [
            window.SextantDPRecommendedActions,
            window.DPRecommendedActions,
            window.SextantRecommendedActions,
            window.RecommendedActionsEngine
        ];

        for (const candidate of candidates) {

            if (!candidate) {
                continue;
            }

            if (
                typeof candidate.generate ===
                    "function" ||
                typeof candidate.run ===
                    "function"
            ) {
                return candidate;
            }
        }

        return null;
    }

    /* ==========================================================
     * ENGINE STATUS
     * ========================================================== */

    function updateEngineStatus() {

        const engine =
            getSimulationEngine();

        if (engine) {

            setText(
                [
                    "engineStatus",
                    "engineState",
                    "systemEngine"
                ],
                "CONNECTED — READY"
            );

        } else {

            setText(
                [
                    "engineStatus",
                    "engineState",
                    "systemEngine"
                ],
                "ENGINE NOT FOUND"
            );
        }
    }

    /* ==========================================================
     * SYSTEM SETUP
     * ========================================================== */

    function getSystemSetup() {

        const positioningMode =
            readSelect(
                "positioningMode",
                POSITIONING_MODES.NON_BIAS
            );

        const engineLoadMode =
            readSelect(
                "engineLoadMode",
                ENGINE_LOAD_MODES.NORMAL
            );

        return {

            positioningMode:
                positioningMode ===
                    POSITIONING_MODES.BIAS
                    ? POSITIONING_MODES.BIAS
                    : POSITIONING_MODES.NON_BIAS,

            engineLoadMode:
                engineLoadMode ===
                    ENGINE_LOAD_MODES.PUSH_UP
                    ? ENGINE_LOAD_MODES.PUSH_UP
                    : ENGINE_LOAD_MODES.NORMAL,

            distinction:
                "POSITIONING BIAS/NON-BIAS IS SEPARATE FROM ENGINE LOAD NORMAL/PUSH-UP"
        };
    }

    function updateSystemSetupDisplay(
        setup
    ) {

        const positioningMode =
            setup?.positioningMode ||
            POSITIONING_MODES.NON_BIAS;

        const engineLoadMode =
            setup?.engineLoadMode ||
            ENGINE_LOAD_MODES.NORMAL;

        setTextAll(
            [
                "livePositioningMode",
                "positioningModeLive"
            ],
            positioningMode
        );

        setTextAll(
            [
                "liveEngineLoadMode",
                "engineLoadModeLive"
            ],
            engineLoadMode
        );

        setText(
            [
                "setupDistinction",
                "positioningDistinction"
            ],
            "BIAS = POSITIONING MODE ONLY. PUSH-UP = ENGINE LOAD COMPENSATION ONLY. PUSH-UP ≠ POSITIONING BIAS. PUSH-UP requires authoritative reserve-power verification and human authorization."
        );

        setText(
            [
                "positioningDescription",
                "positioningModeDescription"
            ],
            positioningMode ===
                POSITIONING_MODES.BIAS
                ? "BIAS — POSITIONING MODE"
                : "NON-BIAS — STANDARD POSITIONING"
        );

        setText(
            [
                "engineLoadDescription",
                "engineLoadModeDescription"
            ],
            engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP
                ? "PUSH-UP — ENGINE LOAD COMPENSATION"
                : "NORMAL — NOMINAL ENGINE LOAD"
        );
    }

    /* ==========================================================
     * ENVIRONMENT
     *
     * v2.6.2 IMPORTANT FIX:
     *
     * The actual HTML uses:
     *   wind
     *   current
     *   wave
     *   tidal
     *
     * Older controller versions incorrectly expected:
     *   windStress
     *   currentStress
     *   waveStress
     *   tidalStress
     *
     * Both are accepted for compatibility.
     * ========================================================== */

    function readEnvironment() {

        const wind =
            clamp(
                readValue(
                    [
                        "wind",
                        "windStress"
                    ],
                    20
                ),
                0,
                100
            );

        const current =
            clamp(
                readValue(
                    [
                        "current",
                        "currentStress"
                    ],
                    20
                ),
                0,
                100
            );

        const wave =
            clamp(
                readValue(
                    [
                        "wave",
                        "waveStress"
                    ],
                    20
                ),
                0,
                100
            );

        const tidal =
            clamp(
                readValue(
                    [
                        "tidal",
                        "tidalStress"
                    ],
                    20
                ),
                0,
                100
            );

        const setup =
            getSystemSetup();

        const environmentalStress =
            (
                wind * 0.25
            ) +
            (
                current * 0.30
            ) +
            (
                wave * 0.25
            ) +
            (
                tidal * 0.20
            );

        return {

            wind,
            current,
            wave,
            tidal,

            environmentalStress,

            positioningMode:
                setup.positioningMode,

            engineLoadMode:
                setup.engineLoadMode
        };
    }

    function updateEnvironmentDisplay(
        environment
    ) {

        if (!environment) {
            return;
        }

        setText(
            [
                "traceEnvironment"
            ],
            safeJSON(
                environment
            )
        );

        setText(
            [
                "traceWind",
                "windTrace"
            ],
            environment.wind
        );

        setText(
            [
                "traceCurrent",
                "currentTrace"
            ],
            environment.current
        );

        setText(
            [
                "traceWave",
                "waveTrace"
            ],
            environment.wave
        );

        setText(
            [
                "traceTidal",
                "tidalTrace"
            ],
            environment.tidal
        );

        setText(
            [
                "environmentStatus",
                "environmentState"
            ],
            "ASSESSED"
        );
    }

    /* ==========================================================
     * AUTHORITATIVE ENGINE
     * ========================================================== */

    function executeAuthoritativeEngine(
        environment
    ) {

        const engine =
            getSimulationEngine();

        if (!engine) {

            throw new Error(
                "Authoritative DP simulation engine is not available."
            );
        }

        if (
            typeof engine.run ===
                "function"
        ) {

            return engine.run(
                environment
            );
        }

        if (
            typeof engine.simulate ===
                "function"
        ) {

            return engine.simulate(
                environment
            );
        }

        throw new Error(
            "Authoritative DP simulation engine has no run/simulate method."
        );
    }

    /* ==========================================================
     * RESULT EXTRACTION
     * ========================================================== */

    function extractSystemSetup(
        result,
        fallbackEnvironment
    ) {

        return (
            result?.systemSetup ||
            result?.setup ||
            {
                positioningMode:
                    fallbackEnvironment?.positioningMode ||
                    POSITIONING_MODES.NON_BIAS,

                engineLoadMode:
                    fallbackEnvironment?.engineLoadMode ||
                    ENGINE_LOAD_MODES.NORMAL
            }
        );
    }

    /*
     * v2.6.2 — AUTHORITATIVE RESERVE EXTRACTION
     *
     * The current engine returns:
     *
     * result.reservePowerVerification
     *
     * containing:
     *
     * engineLoadMode
     * environmentalStress
     * nominalThrust
     * availableReserve
     * requiredReserve
     * reserveVerified
     * status
     *
     * We preserve compatibility with alternate paths but
     * NEVER manufacture a successful verification result.
     */

    function extractReserveVerification(
        result
    ) {

        const candidates = [

            result?.reservePowerVerification,

            result?.reserveVerification,

            result?.reservePower,

            result?.systemSetup?.reservePowerVerification,

            result?.audit?.reservePowerVerification,

            result?.auditRecord?.reservePowerVerification
        ];

        let reserve =
            null;

        for (
            const candidate
            of candidates
        ) {

            if (
                candidate &&
                typeof candidate ===
                    "object"
            ) {

                reserve =
                    candidate;

                break;
            }
        }

        if (!reserve) {

            return {

                engineLoadMode:
                    result?.systemSetup
                        ?.engineLoadMode ||
                    lastEnvironment
                        ?.engineLoadMode ||
                    ENGINE_LOAD_MODES.NORMAL,

                reserveVerified:
                    false,

                status:
                    "NOT VERIFIED",

                verificationSource:
                    "NO AUTHORITATIVE RESERVE RESULT",

                availableReserve:
                    null,

                requiredReserve:
                    null,

                gate:
                    "RESERVE NOT VERIFIED"
            };
        }

        const reserveVerified =
            reserve.reserveVerified ===
                true;

        const availableReserve =
            reserve.availableReserve !==
                undefined &&
            reserve.availableReserve !==
                null
                ? Number(
                    reserve.availableReserve
                )
                : null;

        const requiredReserve =
            reserve.requiredReserve !==
                undefined &&
            reserve.requiredReserve !==
                null
                ? Number(
                    reserve.requiredReserve
                )
                : null;

        const engineLoadMode =
            reserve.engineLoadMode ||
            result?.systemSetup
                ?.engineLoadMode ||
            lastEnvironment
                ?.engineLoadMode ||
            ENGINE_LOAD_MODES.NORMAL;

        let status =
            reserve.status;

        if (!status) {

            if (
                engineLoadMode ===
                    ENGINE_LOAD_MODES.PUSH_UP
            ) {

                status =
                    reserveVerified
                        ? "RESERVE VERIFIED — PUSH-UP PERMITTED FOR SIMULATION"
                        : "RESERVE INSUFFICIENT — PUSH-UP BLOCKED";

            } else {

                status =
                    "NORMAL LOAD — RESERVE CHECK NOT REQUIRED";
            }
        }

        let gate;

        if (
            engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP
        ) {

            gate =
                reserveVerified
                    ? "RESERVE VERIFIED"
                    : "RESERVE NOT VERIFIED";

        } else {

            gate =
                "NOT REQUIRED — NORMAL LOAD";
        }

        return {

            ...reserve,

            engineLoadMode,

            reserveVerified,

            status,

            verificationSource:
                reserve.verificationSource ||
                "AUTHORITATIVE SIMULATION ENGINE",

            availableReserve:
                Number.isFinite(
                    availableReserve
                )
                    ? availableReserve
                    : null,

            requiredReserve:
                Number.isFinite(
                    requiredReserve
                )
                    ? requiredReserve
                    : null,

            gate
        };
    }

    function extractRecommendedAction(
        result
    ) {

        return (
            result?.recommendedAction ||
            result?.recommendation ||
            {}
        );
    }

    function extractProposedAction(
        result
    ) {

        return (
            result?.proposedAction ||
            result?.simulatedAction ||
            {}
        );
    }

    /* ==========================================================
     * RESERVE POWER DISPLAY
     * ========================================================== */

    function updateReservePowerDisplay(
        result
    ) {

        const reserve =
            extractReserveVerification(
                result
            );

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        const pushUp =
            setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP;

        let verificationText;

        if (pushUp) {

            verificationText =
                reserve.reserveVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED";

        } else {

            verificationText =
                reserve.reserveVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED";
        }

        const gateText =
            pushUp
                ? (
                    reserve.reserveVerified
                        ? "RESERVE VERIFIED"
                        : "RESERVE NOT VERIFIED"
                )
                : "NOT REQUIRED — NORMAL LOAD";

        setTextAll(
            [
                "liveReserve",
                "reservePower",
                "reservePowerLive"
            ],
            verificationText
        );

        setTextAll(
            [
                "reserveVerification",
                "reservePowerVerification"
            ],
            verificationText
        );

        setTextAll(
            [
                "reserveStatus",
                "reservePowerStatus"
            ],
            reserve.status ||
            "NOT VERIFIED"
        );

        setTextAll(
            [
                "reserveGate",
                "reservePowerGate",
                "pushUpGate"
            ],
            gateText
        );

        setTextAll(
            [
                "availableReserve",
                "reserveAvailable",
                "reservePowerAvailable"
            ],
            reserve.availableReserve !==
                null
                ? formatNumber(
                    reserve.availableReserve,
                    2
                )
                : "—"
        );

        setTextAll(
            [
                "requiredReserve",
                "reserveRequired",
                "reservePowerRequired"
            ],
            reserve.requiredReserve !==
                null
                ? formatNumber(
                    reserve.requiredReserve,
                    2
                )
                : "—"
        );

        return reserve;
    }

    /* ==========================================================
     * DECISION TRACE
     * ========================================================== */

    function updateDecisionTrace(
        result
    ) {

        const primary =
            result?.primary || {};

        const secondary =
            result?.secondary || {};

        const stabilizer =
            result?.stabilizer || {};

        const recommended =
            extractRecommendedAction(
                result
            );

        const proposed =
            extractProposedAction(
                result
            );

        const executionGate =
            result?.executionGate || {};

        const reserve =
            extractReserveVerification(
                result
            );

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        setText(
            [
                "traceEnvironment"
            ],
            safeJSON(
                result?.environment ||
                lastEnvironment ||
                {}
            )
        );

        setText(
            [
                "tracePrimaryMode",
                "primaryMode"
            ],
            primary.mode ||
            "NORMAL CONTROL"
        );

        setText(
            [
                "tracePrimaryResponse",
                "primaryResponse"
            ],
            primary.response ||
            primary.output ||
            "CONTINUE SIMULATED DP MONITORING"
        );

        setText(
            [
                "traceSecondaryMode",
                "secondaryMode"
            ],
            secondary.mode ||
            "INDEPENDENT MONITORING"
        );

        setText(
            [
                "traceSecondaryAssessment",
                "secondaryAssessment"
            ],
            secondary.assessment ||
            secondary.response ||
            "NO SECONDARY INTERVENTION INDICATED"
        );

        setText(
            [
                "traceStabilizerMode",
                "stabilizerMode"
            ],
            stabilizer.mode ||
            "NORMAL ARBITRATION"
        );

        setText(
            [
                "traceStabilizerSource",
                "stabilizerSource"
            ],
            stabilizer.source ||
            "S1 PRIMARY"
        );

        setText(
            [
                "traceStabilizerOutput",
                "stabilizerOutput"
            ],
            stabilizer.output
                ? safeJSON(
                    stabilizer.output
                )
                : safeJSON(
                    stabilizer
                )
        );

        const urgency =
            recommended.urgency ||
            result?.urgency ||
            "NORMAL";

        const responseMode =
            recommended.responseMode ||
            result?.responseMode ||
            "SIMULATED DP RESPONSE";

        const recommendation =
            recommended.primaryRecommendation ||
            recommended.recommendation ||
            recommended.message ||
            recommended.recommendedAction ||
            result?.recommendation ||
            DEFAULT_LENA_MESSAGE;

        let proposedAction =
            proposed.action ||
            proposed.command ||
            proposed.description ||
            proposed.status;

        if (!proposedAction) {

            if (
                setup.engineLoadMode ===
                    ENGINE_LOAD_MODES.PUSH_UP &&
                !reserve.reserveVerified
            ) {

                proposedAction =
                    "PUSH-UP BLOCKED — RESERVE NOT VERIFIED";

            } else {

                proposedAction =
                    "MAINTAIN SIMULATED SAFE STATE";
            }
        }

        const gate =
            executionGate.status ||
            executionGate.gate ||
            (
                setup.engineLoadMode ===
                    ENGINE_LOAD_MODES.PUSH_UP &&
                !reserve.reserveVerified
                    ? "RESERVE GATE"
                    : "HUMAN AUTHORIZATION REQUIRED"
            );

        const actionStatus =
            result?.simulatedAction?.status ||
            proposed.status ||
            "SIMULATION HOLD — HUMAN DECISION PENDING";

        setText(
            [
                "traceUrgency",
                "urgency"
            ],
            urgency
        );

        setText(
            [
                "traceResponseMode",
                "responseMode"
            ],
            responseMode
        );

        setText(
            [
                "traceRecommendation",
                "recommendation"
            ],
            recommendation
        );

        setText(
            [
                "traceProposed",
                "traceProposedAction",
                "proposedAction"
            ],
            proposedAction
        );

        setText(
            [
                "traceGate",
                "gate"
            ],
            gate
        );

        setText(
            [
                "traceActionStatus",
                "actionStatus"
            ],
            actionStatus
        );
    }

    /* ==========================================================
     * CAPTAIN AI LENA
     * ========================================================== */

    function updateLenaDisplay(
        result
    ) {

        const recommended =
            extractRecommendedAction(
                result
            );

        const urgency =
            recommended.urgency ||
            "NORMAL";

        const responseMode =
            recommended.responseMode ||
            "SIMULATED DP RESPONSE";

        const recommendation =
            recommended.primaryRecommendation ||
            recommended.recommendation ||
            recommended.message ||
            recommended.recommendedAction ||
            result?.recommendation ||
            DEFAULT_LENA_MESSAGE;

        setText(
            ["lenaStatus"],
            "DECISION SUPPORT"
        );

        setText(
            ["lenaRecommendation"],
            recommendation
        );

        setText(
            ["lenaUrgency"],
            urgency
        );

        setText(
            ["lenaResponseMode"],
            responseMode
        );

        setText(
            ["lenaAutonomousCommand"],
            "FALSE — NO AUTONOMOUS COMMAND"
        );

        setText(
            [
                "lenaUMVAction",
                "lenaUVMAction"
            ],
            "SIMULATION ONLY"
        );

        setText(
            [
                "lenaMessage",
                "lenaDecisionMessage"
            ],
            "Captain AI Lena provides decision support only. Human authority remains final. No operational command is generated."
        );
    }

    /* ==========================================================
     * RECOMMENDED ACTION
     * ========================================================== */

    function updateRecommendedActionDisplay(
        result
    ) {

        const recommended =
            extractRecommendedAction(
                result
            );

        const recommendation =
            recommended.primaryRecommendation ||
            recommended.recommendation ||
            recommended.message ||
            recommended.recommendedAction ||
            result?.recommendation ||
            DEFAULT_LENA_MESSAGE;

        const urgency =
            recommended.urgency ||
            "NORMAL";

        setText(
            [
                "recommendedAutonomous"
            ],
            "FALSE"
        );

        setText(
            [
                "recommendedLenaStatus"
            ],
            "DECISION SUPPORT"
        );

        setText(
            [
                "recommendedControlMode"
            ],
            "HUMAN AUTHORITY"
        );

        setText(
            [
                "recommendedUrgency"
            ],
            urgency
        );

        setText(
            [
                "recommendedAction"
            ],
            recommendation
        );

        setText(
            [
                "recommendedMessage"
            ],
            recommendation
        );

        lastRecommendedAction =
            recommended;
    }

    /* ==========================================================
     * SIMULATED DP RESPONSE
     * ========================================================== */

    function simulatedDPResponse(
        result
    ) {

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        const reserve =
            extractReserveVerification(
                result
            );

        const proposed =
            extractProposedAction(
                result
            );

        const engineGate =
            result?.executionGate ||
            {};

        const pushUp =
            setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP;

        if (
            pushUp &&
            !reserve.reserveVerified
        ) {

            return {

                mode:
                    "SIMULATED DP RESPONSE",

                status:
                    "BLOCKED — RESERVE NOT VERIFIED",

                proposedAction:
                    "PUSH-UP BLOCKED — RESERVE NOT VERIFIED",

                gate:
                    "RESERVE GATE",

                simulated:
                    true,

                operational:
                    false
            };
        }

        return {

            mode:
                "SIMULATED DP RESPONSE",

            status:
                proposed.status ||
                result?.simulatedAction
                    ?.status ||
                "SIMULATION HOLD — HUMAN AUTHORIZATION REQUIRED",

            proposedAction:
                proposed.action ||
                proposed.command ||
                proposed.description ||
                "MAINTAIN SIMULATED SAFE STATE",

            gate:
                engineGate.status ||
                engineGate.gate ||
                "HUMAN AUTHORIZATION REQUIRED",

            simulated:
                true,

            operational:
                false
        };
    }

    /* ==========================================================
     * SIMULATED VESSEL STATE
     * ========================================================== */

    function updateSimulatedVesselState(
        result
    ) {

        const state =
            result?.updatedState ||
            result?.simulatedVesselState ||
            result?.vesselState ||
            {};

        const simulatedAction =
            result?.simulatedAction ||
            {};

        const positionError =
            state.positionError !==
                undefined
                ? state.positionError
                : 0;

        const simulatedCommand =
            state.simulatedCommand !==
                undefined
                ? state.simulatedCommand
                : simulatedAction
                    .simulatedCommand !==
                        undefined
                    ? simulatedAction
                        .simulatedCommand
                    : 0;

        const stabilityIndex =
            state.stabilityIndex !==
                undefined
                ? state.stabilityIndex
                : 100;

        const vesselState =
            state.status ||
            state.state ||
            state.risk ||
            "STABLE";

        setText(
            [
                "positionError",
                "simulatedPositionError"
            ],
            formatNumber(
                positionError,
                2
            )
        );

        setText(
            [
                "simulatedCommand",
                "dpSimulatedCommand"
            ],
            formatNumber(
                simulatedCommand,
                0
            )
        );

        setText(
            [
                "stabilityIndex",
                "simulatedStabilityIndex"
            ],
            formatNumber(
                stabilityIndex,
                0
            )
        );

        setText(
            [
                "vesselState",
                "simulatedVesselState"
            ],
            vesselState
        );
    }

    /* ==========================================================
     * HUMAN AUTHORITY
     * ========================================================== */

    function updateHumanAuthorityDisplay(
        result
    ) {

        const executionGate =
            result?.executionGate ||
            {};

        const reserve =
            extractReserveVerification(
                result
            );

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        let authorityText =
            "HUMAN AUTHORIZATION REQUIRED";

        let executionText =
            executionGate.status ||
            "HUMAN AUTHORIZATION REQUIRED";

        if (
            setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP &&
            !reserve.reserveVerified
        ) {

            authorityText =
                "SIMULATION HOLD — RESERVE NOT VERIFIED";

            executionText =
                "RESERVE GATE — NO PUSH-UP";

        } else if (
            humanDecisionState ===
                HUMAN_DECISIONS.MAINTAIN_SAFE_STATE
        ) {

            authorityText =
                "SAFE STATE MAINTAINED — SIMULATION ONLY";

            executionText =
                "SAFE STATE — NO OPERATIONAL COMMAND";

        } else if (
            humanDecisionState ===
                HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE
        ) {

            authorityText =
                "SIMULATED RESPONSE AUTHORIZED — SIMULATION ONLY";

            executionText =
                "SIMULATED RESPONSE — NO OPERATIONAL COMMAND";

        } else if (
            humanDecisionState ===
                HUMAN_DECISIONS.ACKNOWLEDGE
        ) {

            authorityText =
                "CONDITION ACKNOWLEDGED — NO ACTION AUTHORIZED";

            executionText =
                "HUMAN DECISION PENDING";
        }

        setText(
            [
                "humanDecisionStatus",
                "humanAuthorityStatus",
                "humanAuthority",
                "humanStatus"
            ],
            authorityText
        );

        setText(
            [
                "executionGate",
                "executionStatus",
                "execution"
            ],
            executionText
        );
    }

    /* ==========================================================
     * SYSTEM STATUS
     * ========================================================== */

    function deriveSystemDisplayStatus(
        result
    ) {

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        const reserve =
            extractReserveVerification(
                result
            );

        if (
            setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP &&
            !reserve.reserveVerified
        ) {

            return (
                "SIMULATION HOLD — RESERVE GATE"
            );
        }

        if (
            humanDecisionState ===
                HUMAN_DECISIONS.MAINTAIN_SAFE_STATE
        ) {

            return (
                "SIMULATION COMPLETE — SAFE STATE MAINTAINED"
            );
        }

        if (
            humanDecisionState ===
                HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE
        ) {

            return (
                "SIMULATION COMPLETE — SIMULATED RESPONSE AUTHORIZED"
            );
        }

        return (
            "SIMULATION COMPLETE — HUMAN DECISION PENDING"
        );
    }

    /* ==========================================================
     * ASSESSMENT OUTPUT
     * ========================================================== */

    function updateAssessment(
        result
    ) {

        const assessment =
            result?.assessment ||
            result?.assessmentOutput ||
            result?.finalAssessment ||
            {};

        const reserve =
            extractReserveVerification(
                result
            );

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        const recommended =
            extractRecommendedAction(
                result
            );

        const proposed =
            extractProposedAction(
                result
            );

        const lines = [];

        lines.push(
            "GOLDEN RULE: OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE"
        );

        lines.push(
            "SYSTEM: " +
            deriveSystemDisplayStatus(
                result
            )
        );

        if (
            result?.risk !==
                undefined
        ) {

            lines.push(
                "RISK: " +
                result.risk
            );
        }

        if (
            result?.resilienceScore !==
                undefined
        ) {

            lines.push(
                "RESILIENCE SCORE: " +
                result.resilienceScore
            );
        }

        if (
            result?.environmentalStress !==
                undefined
        ) {

            lines.push(
                "ENVIRONMENTAL STRESS: " +
                result.environmentalStress
            );
        }

        lines.push(
            "POSITIONING MODE: " +
            setup.positioningMode
        );

        lines.push(
            "ENGINE LOAD MODE: " +
            setup.engineLoadMode
        );

        lines.push(
            "PUSH-UP IS POSITIONING BIAS: FALSE"
        );

        lines.push(
            "RESERVE VERIFIED: " +
            String(
                reserve.reserveVerified
            )
        );

        lines.push(
            "RESERVE STATUS: " +
            (
                reserve.status ||
                "NOT VERIFIED"
            )
        );

        lines.push(
            "AVAILABLE RESERVE: " +
            (
                reserve.availableReserve !==
                    null
                    ? formatNumber(
                        reserve.availableReserve,
                        2
                    )
                    : "—"
            )
        );

        lines.push(
            "REQUIRED RESERVE: " +
            (
                reserve.requiredReserve !==
                    null
                    ? formatNumber(
                        reserve.requiredReserve,
                        2
                    )
                    : "—"
            )
        );

        lines.push(
            "RECOMMENDATION: " +
            (
                recommended.primaryRecommendation ||
                recommended.recommendation ||
                recommended.message ||
                DEFAULT_LENA_MESSAGE
            )
        );

        lines.push(
            "PROPOSED ACTION: " +
            (
                proposed.action ||
                proposed.command ||
                proposed.description ||
                proposed.status ||
                "MAINTAIN SIMULATED SAFE STATE"
            )
        );

        lines.push(
            "HUMAN AUTHORITY: FINAL"
        );

        lines.push(
            "OPERATIONAL COMMAND: NONE"
        );

        if (
            Object.keys(
                assessment
            ).length > 0
        ) {

            lines.push(
                "ENGINE ASSESSMENT: " +
                safeJSON(
                    assessment
                )
            );
        }

        setText(
            [
                "assessmentOutput",
                "assessmentResult"
            ],
            lines.join("\n")
        );
    }

    /* ==========================================================
     * AUDIT OUTPUT
     * ========================================================== */

    function updateAudit(
        result
    ) {

        const audit =
            result?.audit ||
            result?.auditRecord ||
            {};

        const executionGate =
            result?.executionGate ||
            {};

        const reserve =
            extractReserveVerification(
                result
            );

        const setup =
            extractSystemSetup(
                result,
                lastEnvironment
            );

        const auditLines = [

            "SEXTANT PROTOCOL™ — DP RESILIENCE V&V AUDIT",

            "MODULE: " +
                MODULE_NAME,

            "CONTROLLER VERSION: " +
                VERSION,

            "ENGINE VERSION: " +
                SIMULATION_ENGINE_VERSION,

            "RECOMMENDED ACTIONS: " +
                RECOMMENDED_ACTIONS_VERSION,

            "MODE: RESEARCH / V&V ONLY",

            "AUTONOMOUS EXECUTION: FALSE",

            "OPERATIONAL COMMAND: NONE",

            "HUMAN AUTHORITY: FINAL",

            "POSITIONING MODE: " +
                setup.positioningMode,

            "ENGINE LOAD MODE: " +
                setup.engineLoadMode,

            "PUSH-UP IS POSITIONING BIAS: FALSE",

            "PUSH-UP IS ENGINE LOAD COMPENSATION: TRUE",

            "RESERVE VERIFIED: " +
                String(
                    reserve.reserveVerified
                ),

            "RESERVE STATUS: " +
                (
                    reserve.status ||
                    "NOT VERIFIED"
                ),

            "AVAILABLE RESERVE: " +
                (
                    reserve.availableReserve !==
                        null
                        ? formatNumber(
                            reserve.availableReserve,
                            2
                        )
                        : "—"
                ),

            "REQUIRED RESERVE: " +
                (
                    reserve.requiredReserve !==
                        null
                        ? formatNumber(
                            reserve.requiredReserve,
                            2
                        )
                        : "—"
                ),

            "EXECUTION GATE: " +
                (
                    executionGate.status ||
                    executionGate.gate ||
                    (
                        reserve.reserveVerified
                            ? "HUMAN AUTHORIZATION REQUIRED"
                            : "RESERVE NOT VERIFIED"
                    )
                ),

            "HUMAN DECISION: " +
                humanDecisionState,

            "SIMULATION HAS RUN: " +
                String(
                    simulationHasRun
                ),

            "REAL VESSEL CONNECTION: FALSE",

            "ACTUATOR INTERFACE: FALSE",

            "EXTERNAL SYSTEM COMMAND: FALSE"
        ];

        if (
            audit &&
            Object.keys(
                audit
            ).length > 0
        ) {

            auditLines.push(
                "ENGINE AUDIT: " +
                safeJSON(
                    audit
                )
            );
        }

        setText(
            [
                "auditOutput",
                "auditResult"
            ],
            auditLines.join("\n")
        );
    }

    /* ==========================================================
     * RECOMMENDED ACTION ENGINE
     * ========================================================== */

    function generateRecommendedActions(
        environment,
        result
    ) {

        const engine =
            getRecommendedActionsEngine();

        if (!engine) {

            return (
                result?.recommendedAction ||
                {}
            );
        }

        try {

            if (
                typeof engine.generate ===
                    "function"
            ) {

                return engine.generate(
                    environment,
                    result
                );
            }

            if (
                typeof engine.run ===
                    "function"
            ) {

                return engine.run(
                    environment,
                    result
                );
            }

        } catch (error) {

            console.warn(
                "[Sextant Cockpit] Recommended actions engine error:",
                error
            );
        }

        return (
            result?.recommendedAction ||
            {}
        );
    }

    /* ==========================================================
     * MAIN V&V PIPELINE
     * ========================================================== */

    function runSimulation() {

        humanDecisionState =
            HUMAN_DECISIONS.ACKNOWLEDGE;

        simulationHasRun =
            false;

        const environment =
            readEnvironment();

        lastEnvironment =
            environment;

        updateSystemSetupDisplay(
            environment
        );

        updateEnvironmentDisplay(
            environment
        );

        setText(
            [
                "systemStatus",
                "systemState"
            ],
            "SIMULATION RUNNING"
        );

        setText(
            [
                "humanDecisionStatus",
                "humanAuthorityStatus",
                "humanAuthority",
                "humanStatus"
            ],
            "HUMAN AUTHORIZATION REQUIRED"
        );

        setText(
            [
                "executionGate",
                "executionStatus",
                "execution"
            ],
            "HUMAN AUTHORIZATION REQUIRED"
        );

        try {

            /*
             * OBSERVE
             */
            const result =
                executeAuthoritativeEngine(
                    environment
                );

            /*
             * VERIFY
             */
            lastResult =
                result;

            simulationHasRun =
                true;

            /*
             * AUTHORITATIVE SETUP
             */
            const setup =
                extractSystemSetup(
                    result,
                    environment
                );

            updateSystemSetupDisplay(
                setup
            );

            /*
             * AUTHORITATIVE RESERVE
             */
            updateReservePowerDisplay(
                result
            );

            /*
             * ASSESS
             */
            updateDecisionTrace(
                result
            );

            /*
             * DECIDE
             */
            updateLenaDisplay(
                result
            );

            const generatedRecommendations =
                generateRecommendedActions(
                    environment,
                    result
                );

            if (
                generatedRecommendations &&
                Object.keys(
                    generatedRecommendations
                ).length > 0
            ) {

                updateRecommendedActionDisplay(
                    {
                        ...result,

                        recommendedAction:
                            generatedRecommendations
                    }
                );

            } else {

                updateRecommendedActionDisplay(
                    result
                );
            }

            /*
             * ACT — SIMULATION ONLY
             */
            const response =
                simulatedDPResponse(
                    result
                );

            setText(
                [
                    "simulatedDPResponse",
                    "dpResponseStatus"
                ],
                response.status
            );

            /*
             * UPDATE
             */
            updateSimulatedVesselState(
                result
            );

            updateHumanAuthorityDisplay(
                result
            );

            /*
             * FINAL ASSESSMENT / AUDIT
             */
            updateAssessment(
                result
            );

            updateAudit(
                result
            );

            setText(
                [
                    "systemStatus",
                    "systemState"
                ],
                deriveSystemDisplayStatus(
                    result
                )
            );

            return result;

        } catch (error) {

            console.error(
                "[Sextant Cockpit] Simulation error:",
                error
            );

            simulationHasRun =
                false;

            setText(
                [
                    "systemStatus",
                    "systemState"
                ],
                "SIMULATION ERROR — NO OPERATIONAL COMMAND"
            );

            setText(
                [
                    "executionGate",
                    "executionStatus",
                    "execution"
                ],
                "SAFE STATE — NO OPERATIONAL COMMAND"
            );

            setText(
                [
                    "humanDecisionStatus",
                    "humanAuthorityStatus",
                    "humanAuthority",
                    "humanStatus"
                ],
                "HUMAN AUTHORITY REQUIRED"
            );

            setText(
                [
                    "assessmentOutput",
                    "assessmentResult"
                ],
                "Simulation could not be completed safely. No operational command generated."
            );

            setText(
                [
                    "auditOutput",
                    "auditResult"
                ],
                "SIMULATION ERROR — CONTROLLER FAIL-SAFE ACTIVE"
            );

            return null;
        }
    }

    /* ==========================================================
     * HUMAN — ACKNOWLEDGE
     * ========================================================== */

    function acknowledgeCondition() {

        if (
            !simulationHasRun ||
            !lastResult
        ) {
            return null;
        }

        humanDecisionState =
            HUMAN_DECISIONS.ACKNOWLEDGE;

        let result =
            lastResult;

        const engine =
            getSimulationEngine();

        try {

            if (
                engine &&
                typeof engine.acknowledgeHumanDecision ===
                    "function"
            ) {

                result =
                    engine.acknowledgeHumanDecision();
            }

        } catch (error) {

            console.warn(
                "[Sextant Cockpit] Human acknowledgement error:",
                error
            );
        }

        if (result) {
            lastResult =
                result;
        }

        refreshAfterHumanDecision();

        return lastResult;
    }

    /* ==========================================================
     * HUMAN — MAINTAIN SAFE STATE
     * ========================================================== */

    function maintainSafeState() {

        if (
            !simulationHasRun ||
            !lastResult
        ) {
            return null;
        }

        humanDecisionState =
            HUMAN_DECISIONS.MAINTAIN_SAFE_STATE;

        let result =
            lastResult;

        const engine =
            getSimulationEngine();

        try {

            if (
                engine &&
                typeof engine.maintainSafeState ===
                    "function"
            ) {

                result =
                    engine.maintainSafeState();
            }

        } catch (error) {

            console.warn(
                "[Sextant Cockpit] Maintain-safe-state error:",
                error
            );
        }

        if (result) {
            lastResult =
                result;
        }

        refreshAfterHumanDecision();

        return lastResult;
    }

    /* ==========================================================
     * HUMAN — AUTHORIZE SIMULATED RESPONSE
     * ========================================================== */

    function authorizeSimulatedResponse() {

        if (
            !simulationHasRun ||
            !lastResult
        ) {
            return null;
        }

        const setup =
            extractSystemSetup(
                lastResult,
                lastEnvironment
            );

        const reserve =
            extractReserveVerification(
                lastResult
            );

        /*
         * HARD SAFETY GATE:
         *
         * PUSH-UP cannot be authorized unless the
         * authoritative reserve result says verified.
         */

        if (
            setup.engineLoadMode ===
                ENGINE_LOAD_MODES.PUSH_UP &&
            !reserve.reserveVerified
        ) {

            console.warn(
                "[Sextant Cockpit] PUSH-UP authorization BLOCKED — reserve not verified."
            );

            humanDecisionState =
                HUMAN_DECISIONS.ACKNOWLEDGE;

            updateHumanAuthorityDisplay(
                lastResult
            );

            updateAssessment(
                lastResult
            );

            updateAudit(
                lastResult
            );

            return lastResult;
        }

        humanDecisionState =
            HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE;

        let result =
            lastResult;

        const engine =
            getSimulationEngine();

        try {

            if (
                engine &&
                typeof engine.authorizeSimulatedResponse ===
                    "function"
            ) {

                result =
                    engine.authorizeSimulatedResponse();
            }

        } catch (error) {

            console.warn(
                "[Sextant Cockpit] Simulated authorization error:",
                error
            );
        }

        if (result) {
            lastResult =
                result;
        }

        refreshAfterHumanDecision();

        return lastResult;
    }

    /* ==========================================================
     * REFRESH AFTER HUMAN DECISION
     * ========================================================== */

    function refreshAfterHumanDecision() {

        if (!lastResult) {
            return;
        }

        updateSystemSetupDisplay(
            extractSystemSetup(
                lastResult,
                lastEnvironment
            )
        );

        updateReservePowerDisplay(
            lastResult
        );

        updateDecisionTrace(
            lastResult
        );

        updateLenaDisplay(
            lastResult
        );

        updateRecommendedActionDisplay(
            lastResult
        );

        updateSimulatedVesselState(
            lastResult
        );

        updateHumanAuthorityDisplay(
            lastResult
        );

        updateAssessment(
            lastResult
        );

        updateAudit(
            lastResult
        );

        setText(
            [
                "systemStatus",
                "systemState"
            ],
            deriveSystemDisplayStatus(
                lastResult
            )
        );
    }

    /* ==========================================================
     * RESET
     * ========================================================== */

    function resetDynamicDisplay() {

        setText(
            [
                "systemStatus",
                "systemState"
            ],
            "READY — AWAITING SIMULATION"
        );

        setText(
            [
                "environmentStatus",
                "environmentState"
            ],
            "WAITING"
        );

        setText(
            [
                "executionGate",
                "executionStatus",
                "execution"
            ],
            "HUMAN AUTHORIZATION REQUIRED"
        );

        setText(
            [
                "humanDecisionStatus",
                "humanAuthorityStatus",
                "humanAuthority",
                "humanStatus"
            ],
            "HUMAN AUTHORIZATION REQUIRED"
        );

        const resetFields = [

            "traceEnvironment",

            "traceWind",
            "traceCurrent",
            "traceWave",
            "traceTidal",

            "tracePrimaryMode",
            "tracePrimaryResponse",

            "traceSecondaryMode",
            "traceSecondaryAssessment",

            "traceStabilizerMode",
            "traceStabilizerSource",
            "traceStabilizerOutput",

            "traceUrgency",
            "traceResponseMode",
            "traceRecommendation",
            "traceProposed",
            "traceProposedAction",
            "traceGate",
            "traceActionStatus"
        ];

        resetFields.forEach(
            function (id) {
                setText(
                    id,
                    "—"
                );
            }
        );

        setTextAll(
            [
                "liveReserve",
                "reservePower",
                "reservePowerLive",
                "reserveVerification",
                "reservePowerVerification",
                "reserveStatus",
                "reservePowerStatus"
            ],
            "NOT VERIFIED"
        );

        setTextAll(
            [
                "reserveGate",
                "reservePowerGate",
                "pushUpGate"
            ],
            "RESERVE NOT VERIFIED"
        );

        setTextAll(
            [
                "availableReserve",
                "reserveAvailable",
                "reservePowerAvailable"
            ],
            "—"
        );

        setTextAll(
            [
                "requiredReserve",
                "reserveRequired",
                "reservePowerRequired"
            ],
            "—"
        );

        setText(
            [
                "positionError",
                "simulatedPositionError"
            ],
            "0.00"
        );

        setText(
            [
                "simulatedCommand",
                "dpSimulatedCommand"
            ],
            "0"
        );

        setText(
            [
                "stabilityIndex",
                "simulatedStabilityIndex"
            ],
            "100"
        );

        setText(
            [
                "vesselState",
                "simulatedVesselState"
            ],
            "STABLE"
        );

        setText(
            [
                "simulatedDPResponse",
                "dpResponseStatus"
            ],
            "—"
        );

        setText(
            [
                "assessmentOutput",
                "assessmentResult"
            ],
            "Awaiting simulation."
        );

        setText(
            [
                "auditOutput",
                "auditResult"
            ],
            "Awaiting simulation."
        );

        setText(
            ["lenaStatus"],
            "DECISION SUPPORT"
        );

        setText(
            ["lenaRecommendation"],
            DEFAULT_LENA_MESSAGE
        );

        setText(
            ["lenaUrgency"],
            "NORMAL"
        );

        setText(
            ["lenaResponseMode"],
            "SIMULATED DP RESPONSE"
        );

        setText(
            ["lenaAutonomousCommand"],
            "FALSE — NO AUTONOMOUS COMMAND"
        );

        setText(
            [
                "lenaUMVAction",
                "lenaUVMAction"
            ],
            "SIMULATION ONLY"
        );

        setText(
            [
                "lenaMessage",
                "lenaDecisionMessage"
            ],
            "Awaiting simulation."
        );

        setText(
            ["recommendedAutonomous"],
            "FALSE"
        );

        setText(
            ["recommendedLenaStatus"],
            "DECISION SUPPORT"
        );

        setText(
            ["recommendedControlMode"],
            "HUMAN AUTHORITY"
        );

        setText(
            ["recommendedUrgency"],
            "NORMAL"
        );

        setText(
            ["recommendedAction"],
            "—"
        );

        setText(
            ["recommendedMessage"],
            "No recommendation available until a simulation is executed."
        );

        lastEnvironment =
            null;

        lastResult =
            null;

        lastRecommendedAction =
            null;

        humanDecisionState =
            HUMAN_DECISIONS.ACKNOWLEDGE;

        simulationHasRun =
            false;
    }

    function resetSystem() {

        const engine =
            getSimulationEngine();

        try {

            if (
                engine &&
                typeof engine.reset ===
                    "function"
            ) {

                engine.reset();
            }

        } catch (error) {

            console.warn(
                "[Sextant Cockpit] Engine reset warning:",
                error
            );
        }

        resetDynamicDisplay();

        updateSystemSetupDisplay(
            getSystemSetup()
        );

        updateSafetyDisplay();
        updateEngineStatus();
    }

    /* ==========================================================
     * SCENARIOS
     * ========================================================== */

    function applyScenario(
        values
    ) {

        if (!values) {
            return;
        }

        if (
            values.wind !==
                undefined
        ) {
            setValue(
                "wind",
                values.wind
            );
        }

        if (
            values.current !==
                undefined
        ) {
            setValue(
                "current",
                values.current
            );
        }

        if (
            values.wave !==
                undefined
        ) {
            setValue(
                "wave",
                values.wave
            );
        }

        if (
            values.tidal !==
                undefined
        ) {
            setValue(
                "tidal",
                values.tidal
            );
        }
    }

    function scenarioNormal() {

        applyScenario({
            wind: 10,
            current: 10,
            wave: 10,
            tidal: 10
        });
    }

    function scenarioModerateWeather() {

        applyScenario({
            wind: 35,
            current: 30,
            wave: 35,
            tidal: 25
        });
    }

    function scenarioHeavyWeather() {

        applyScenario({
            wind: 60,
            current: 55,
            wave: 65,
            tidal: 45
        });
    }

    function scenarioCritical() {

        applyScenario({
            wind: 90,
            current: 90,
            wave: 95,
            tidal: 85
        });
    }

    function scenarioCurrentSurge() {

        applyScenario({
            wind: 20,
            current: 85,
            wave: 30,
            tidal: 45
        });
    }

    function scenarioHeavySeaState() {

        applyScenario({
            wind: 60,
            current: 35,
            wave: 90,
            tidal: 40
        });
    }

    function scenarioWindGust() {

        applyScenario({
            wind: 90,
            current: 25,
            wave: 35,
            tidal: 20
        });
    }

    function scenarioCombinedDisturbance() {

        applyScenario({
            wind: 75,
            current: 75,
            wave: 80,
            tidal: 70
        });
    }

    function scenarioRandom() {

        applyScenario({
            wind:
                Math.floor(
                    Math.random() * 101
                ),

            current:
                Math.floor(
                    Math.random() * 101
                ),

            wave:
                Math.floor(
                    Math.random() * 101
                ),

            tidal:
                Math.floor(
                    Math.random() * 101
                )
        });
    }

    /* ==========================================================
     * BUTTON WIRING
     * ========================================================== */

    function wireButton(
        id,
        handler
    ) {

        const button =
            getElement(id);

        if (!button) {
            return;
        }

        if (
            button.dataset
                .sextantWired ===
                "true"
        ) {
            return;
        }

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                try {
                    handler();
                } catch (error) {

                    console.error(
                        "[Sextant Cockpit] Button handler error:",
                        error
                    );
                }
            }
        );

        button.dataset
            .sextantWired =
            "true";
    }

    function wireSystemSetup() {

        const positioning =
            getElement(
                "positioningMode"
            );

        const engineLoad =
            getElement(
                "engineLoadMode"
            );

        if (
            positioning &&
            positioning.dataset
                .sextantSetupWired !==
                "true"
        ) {

            positioning.addEventListener(
                "change",
                function () {

                    updateSystemSetupDisplay(
                        getSystemSetup()
                    );
                }
            );

            positioning.dataset
                .sextantSetupWired =
                "true";
        }

        if (
            engineLoad &&
            engineLoad.dataset
                .sextantSetupWired !==
                "true"
        ) {

            engineLoad.addEventListener(
                "change",
                function () {

                    updateSystemSetupDisplay(
                        getSystemSetup()
                    );
                }
            );

            engineLoad.dataset
                .sextantSetupWired =
                "true";
        }
    }

    function wireButtons() {

        wireButton(
            "runSimulation",
            runSimulation
        );

        wireButton(
            "resetSystem",
            resetSystem
        );

        /*
         * ACTUAL HTML BUTTON IDS
         */

        wireButton(
            "acknowledgeConditionButton",
            acknowledgeCondition
        );

        wireButton(
            "maintainSafeStateButton",
            maintainSafeState
        );

        wireButton(
            "authorizeSimulatedResponseButton",
            authorizeSimulatedResponse
        );

        /*
         * Compatibility IDs
         */

        wireButton(
            "acknowledgeCondition",
            acknowledgeCondition
        );

        wireButton(
            "maintainSafeState",
            maintainSafeState
        );

        wireButton(
            "authorizeSimulatedResponse",
            authorizeSimulatedResponse
        );

        /*
         * ACTUAL HTML SCENARIO IDS
         */

        wireButton(
            "scenarioNormal",
            scenarioNormal
        );

        wireButton(
            "scenarioModerate",
            scenarioModerateWeather
        );

        wireButton(
            "scenarioHeavy",
            scenarioHeavyWeather
        );

        wireButton(
            "scenarioCritical",
            scenarioCritical
        );

        wireButton(
            "scenarioCurrentSurge",
            scenarioCurrentSurge
        );

        wireButton(
            "scenarioHeavySea",
            scenarioHeavySeaState
        );

        wireButton(
            "scenarioWindGust",
            scenarioWindGust
        );

        wireButton(
            "scenarioCombined",
            scenarioCombinedDisturbance
        );

        wireButton(
            "scenarioRandom",
            scenarioRandom
        );

        wireSystemSetup();
    }

    /* ==========================================================
     * GLOBAL COMPATIBILITY ALIASES
     * ========================================================== */

    window.runNormalScenario =
        scenarioNormal;

    window.runModerateScenario =
        scenarioModerateWeather;

    window.runHeavyWeatherScenario =
        scenarioHeavyWeather;

    window.runCriticalScenario =
        scenarioCritical;

    window.runCurrentSurgeScenario =
        scenarioCurrentSurge;

    window.runHeavySeaStateScenario =
        scenarioHeavySeaState;

    window.runWindGustScenario =
        scenarioWindGust;

    window.runCombinedDisturbanceScenario =
        scenarioCombinedDisturbance;

    window.runRandomScenario =
        scenarioRandom;

    window.normalScenario =
        scenarioNormal;

    window.moderateWeatherScenario =
        scenarioModerateWeather;

    window.heavyWeatherScenario =
        scenarioHeavyWeather;

    window.criticalScenario =
        scenarioCritical;

    window.currentSurgeScenario =
        scenarioCurrentSurge;

    window.heavySeaStateScenario =
        scenarioHeavySeaState;

    window.windGustScenario =
        scenarioWindGust;

    window.combinedDisturbanceScenario =
        scenarioCombinedDisturbance;

    window.randomScenario =
        scenarioRandom;

    window.acknowledgeCondition =
        acknowledgeCondition;

    window.maintainSafeState =
        maintainSafeState;

    window.authorizeSimulatedResponse =
        authorizeSimulatedResponse;

    /* ==========================================================
     * PUBLIC API
     * ========================================================== */

    const publicAPI = {

        name:
            MODULE_NAME,

        version:
            VERSION,

        simulationEngineVersion:
            SIMULATION_ENGINE_VERSION,

        recommendedActionsVersion:
            RECOMMENDED_ACTIONS_VERSION,

        safetyBoundary:
            SAFETY_BOUNDARY,

        positioningModes:
            POSITIONING_MODES,

        engineLoadModes:
            ENGINE_LOAD_MODES,

        humanDecisions:
            HUMAN_DECISIONS,

        runSimulation,

        resetSystem,

        acknowledgeCondition,

        maintainSafeState,

        authorizeSimulatedResponse,

        getSystemSetup,

        readEnvironment,

        getLastResult:
            function () {
                return lastResult;
            },

        getLastEnvironment:
            function () {
                return lastEnvironment;
            },

        getHumanDecisionState:
            function () {
                return humanDecisionState;
            },

        extractReserveVerification:
            extractReserveVerification
    };

    window.SextantDPCockpit =
        publicAPI;

    window.SextantDPResilienceCockpit =
        publicAPI;

    window.DPResilienceCockpit =
        publicAPI;

    /* ==========================================================
     * VALIDATION
     * ========================================================== */

    function validateSafetyBoundary() {

        const valid =
            SAFETY_BOUNDARY
                .simulationOnly ===
                true &&

            SAFETY_BOUNDARY
                .autonomousExecution ===
                false &&

            SAFETY_BOUNDARY
                .operationalVesselConnection ===
                false &&

            SAFETY_BOUNDARY
                .actuatorInterface ===
                false &&

            SAFETY_BOUNDARY
                .externalSystemCommand ===
                false &&

            SAFETY_BOUNDARY
                .humanAuthorityFinal ===
                true &&

            SAFETY_BOUNDARY
                .realDPCommand ===
                false;

        console.info(
            "[Sextant Cockpit] Safety boundary validation:",
            valid
                ? "PASS"
                : "FAILED"
        );

        return valid;
    }

    function validateModeDefinitions() {

        const valid =
            POSITIONING_MODES
                .NON_BIAS ===
                "NON_BIAS" &&

            POSITIONING_MODES
                .BIAS ===
                "BIAS" &&

            ENGINE_LOAD_MODES
                .NORMAL ===
                "NORMAL" &&

            ENGINE_LOAD_MODES
                .PUSH_UP ===
                "PUSH_UP";

        console.info(
            "[Sextant Cockpit] Positioning / engine-load distinction:",
            valid
                ? "PASS"
                : "FAILED"
        );

        return valid;
    }

    function validateHumanAuthority() {

        const engine =
            getSimulationEngine();

        if (!engine) {

            console.warn(
                "[Sextant Cockpit] Human authority validation deferred — engine unavailable."
            );

            return false;
        }

        const available =
            typeof engine
                .acknowledgeHumanDecision ===
                "function" ||

            typeof engine
                .maintainSafeState ===
                "function" ||

            typeof engine
                .authorizeSimulatedResponse ===
                "function";

        console.info(
            "[Sextant Cockpit] Human authority interface:",
            available
                ? "AVAILABLE"
                : "NOT DETECTED"
        );

        return available;
    }

    /* ==========================================================
     * BOOT
     * ========================================================== */

    function boot() {

        console.info(
            "============================================================"
        );

        console.info(
            "SEXTANT PROTOCOL™ DP RESILIENCE V&V RESEARCH COCKPIT"
        );

        console.info(
            "Controller Version:",
            VERSION
        );

        console.info(
            "Simulation Engine:",
            SIMULATION_ENGINE_VERSION
        );

        console.info(
            "Recommended Actions:",
            RECOMMENDED_ACTIONS_VERSION
        );

        console.info(
            "============================================================"
        );

        validateSafetyBoundary();

        validateModeDefinitions();

        validateHumanAuthority();

        resetDynamicDisplay();

        updateSafetyDisplay();

        updateEngineStatus();

        updateSystemSetupDisplay(
            getSystemSetup()
        );

        wireButtons();

        console.info(
            "[Sextant Cockpit] BOOT COMPLETE"
        );

        console.info(
            "[Sextant Cockpit] Golden Rule:",
            "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE"
        );

        console.info(
            "[Sextant Cockpit] PUSH-UP ≠ POSITIONING BIAS"
        );

        console.info(
            "[Sextant Cockpit] PUSH-UP = ENGINE LOAD COMPENSATION"
        );

        console.info(
            "[Sextant Cockpit] PUSH-UP requires reserve-power verification"
        );

        console.info(
            "[Sextant Cockpit] Human authorization remains mandatory"
        );

        console.info(
            "[Sextant Cockpit] No autonomous operational execution"
        );
    }

    if (
        document.readyState ===
            "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            boot,
            {
                once: true
            }
        );

    } else {

        boot();
    }

})();