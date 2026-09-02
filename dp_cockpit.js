/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.5.1

   PURPOSE:
   Browser-side controller for the deterministic DP resilience
   simulation stack.

   ARCHITECTURE:

       ENVIRONMENT
            ↓
       SYSTEM SETUP
            ↓
       S1 PRIMARY AI
            ↓
       S2 SECONDARY AI
            ↓
       STABILIZER
            ↓
       DP RECOMMENDED ACTIONS ENGINE
            ↓
       SAFETY / RESERVE VERIFICATION
            ↓
       HUMAN-IN-THE-LOOP
            ↓
       SIMULATED DP RESPONSE

   SYSTEM SETUP DISTINCTION:

       POSITIONING MODE
           NON_BIAS
           BIAS

       ENGINE LOAD MODE
           NORMAL
           PUSH_UP

       IMPORTANT:

       PUSH-UP IS ENGINE LOAD COMPENSATION.

       PUSH-UP IS NOT POSITIONING BIAS.

       POSITIONING BIAS MUST NEVER OVERRIDE
       SAFETY OR RESERVE-POWER CONSTRAINTS.

   SAFETY:

       RESEARCH / SIMULATION ONLY

       AUTONOMOUS COMMAND: FALSE
       REAL VESSEL CONNECTION: FALSE
       HUMAN AUTHORITY: FINAL

============================================================ */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPResilienceCockpit";

    const VERSION =
        "2.5.1";

    const SIMULATION_ENGINE_VERSION =
        "1.2.0";

    const RECOMMENDED_ACTIONS_VERSION =
        "SPD-DP-RECOMMENDED-ACTIONS-V1.3";

    const SAFETY_BOUNDARY =
        "SIMULATION ONLY — NO AUTONOMOUS OPERATIONAL COMMAND";

    const AUTONOMOUS_COMMAND =
        false;

    const REAL_VESSEL_CONNECTION =
        false;

    const HUMAN_AUTHORITY =
        "FINAL";


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


    const PIPELINE = [

        "ENVIRONMENT",

        "SYSTEM SETUP",

        "S1 PRIMARY AI",

        "S2 SECONDARY AI",

        "STABILIZER",

        "RECOMMENDED ACTIONS ENGINE",

        "RESERVE-POWER VERIFICATION",

        "HUMAN-IN-THE-LOOP",

        "SIMULATED DP RESPONSE"

    ];


    /* ========================================================
       DOM HELPERS
    ======================================================== */

    function el(id) {

        return document.getElementById(id);

    }


    function setText(id, value) {

        const node =
            el(id);

        if (!node) {
            return false;
        }

        node.textContent =
            value === undefined ||
            value === null
                ? ""
                : String(value);

        return true;

    }


    function setJSON(id, value) {

        const node =
            el(id);

        if (!node) {
            return false;
        }

        try {

            node.textContent =
                JSON.stringify(
                    value,
                    null,
                    2
                );

        } catch (error) {

            node.textContent =
                String(value);

        }

        return true;

    }


    function firstExisting(ids) {

        for (const id of ids) {

            const node =
                el(id);

            if (node) {
                return node;
            }

        }

        return null;

    }


    function setFirst(ids, value) {

        const node =
            firstExisting(ids);

        if (!node) {
            return false;
        }

        node.textContent =
            value === undefined ||
            value === null
                ? ""
                : String(value);

        return true;

    }


    function log(message) {

        const timestamp =
            new Date().toISOString();

        const line =
            `[${timestamp}] ${message}`;

        console.log(line);

        const node =
            firstExisting([
                "pipelineLog",
                "operatorEventLog",
                "eventLog",
                "operatorLog",
                "audit"
            ]);

        if (!node) {
            return;
        }

        if (
            node.tagName === "PRE" ||
            node.tagName === "TEXTAREA"
        ) {

            node.textContent =
                node.textContent
                    ? node.textContent + "\n" + line
                    : line;

        } else {

            const entry =
                document.createElement("div");

            entry.textContent =
                line;

            node.appendChild(entry);

            node.scrollTop =
                node.scrollHeight;

        }

    }


    /* ========================================================
       ENGINE STATUS DISPLAY
    ======================================================== */

    function updateEngineStatus(status) {

        setFirst(
            [
                "engineStatus",
                "engineState",
                "engineIndicator",
                "engine"
            ],
            status
        );

    }


    function synchronizeEngineStatus() {

        const simulationEngine =
            findSimulationEngine();

        const recommendationEngine =
            findRecommendedActionsEngine();


        if (
            simulationEngine &&
            recommendationEngine
        ) {

            updateEngineStatus(
                "CONNECTED — READY"
            );

            return true;

        }


        if (
            simulationEngine
        ) {

            updateEngineStatus(
                "SIMULATION ENGINE CONNECTED — ACTION ENGINE PENDING"
            );

            return false;

        }


        updateEngineStatus(
            "ENGINE NOT CONNECTED"
        );

        return false;

    }


    /* ========================================================
       SAFETY
    ======================================================== */

    function safetyStatus() {

        return {

            simulationOnly:
                true,

            autonomousCommand:
                false,

            realVesselConnection:
                false,

            humanAuthority:
                "FINAL",

            executionPolicy:
                "NO REAL DP COMMAND POSSIBLE"

        };

    }


    function displaySafety() {

        setFirst(
            [
                "autonomousCommand",
                "autonomousStatus"
            ],
            "FALSE"
        );

        setFirst(
            [
                "realVesselConnection",
                "vesselConnection"
            ],
            "FALSE"
        );

        setFirst(
            [
                "humanAuthority",
                "humanStatus"
            ],
            "FINAL"
        );

        setFirst(
            [
                "safetyBoundary",
                "safetyStatus"
            ],
            SAFETY_BOUNDARY
        );

    }


    /* ========================================================
       SIMULATION ENGINE DISCOVERY
    ======================================================== */

    function findSimulationEngine() {

        const candidates = [

            window.DPSimulationEngine,

            window.DPSimulatorEngine,

            window.DPResilienceEngine,

            window.dpSimulationEngine,

            window.dpEngine

        ];

        for (const candidate of candidates) {

            if (
                candidate &&
                typeof candidate.run ===
                "function"
            ) {

                return candidate;

            }

        }

        return null;

    }


    /* ========================================================
       RECOMMENDED ACTIONS ENGINE DISCOVERY
    ======================================================== */

    function findRecommendedActionsEngine() {

        if (
            window.DPRecommendedActions &&
            typeof window.DPRecommendedActions.generate ===
            "function"
        ) {

            return window.DPRecommendedActions;

        }

        return null;

    }


    /* ========================================================
       RECOMMENDED ACTIONS CONNECTION TEST
    ======================================================== */

    function testRecommendedActionsConnection() {

        const engine =
            findRecommendedActionsEngine();


        if (!engine) {

            log(
                "[WIRING] Recommended Actions Engine = NOT FOUND"
            );

            return false;

        }


        log(
            "[WIRING] Recommended Actions Engine = CONNECTED"
        );


        log(
            "[WIRING] Recommended Actions API = " +
            engine.name +
            " " +
            engine.version
        );


        return true;

    }


    /* ========================================================
       SYSTEM SETUP
    ======================================================== */

    function readSystemSetup() {

        const positioningNode =
            firstExisting([
                "positioningMode",
                "positionMode",
                "biasMode"
            ]);


        const engineLoadNode =
            firstExisting([
                "engineLoadMode",
                "loadMode",
                "engineMode"
            ]);


        let positioningMode =
            positioningNode
                ? String(
                    positioningNode.value ||
                    ""
                ).toUpperCase()
                : POSITIONING_MODES.NON_BIAS;


        let engineLoadMode =
            engineLoadNode
                ? String(
                    engineLoadNode.value ||
                    ""
                ).toUpperCase()
                : ENGINE_LOAD_MODES.NORMAL;


        if (
            positioningMode !==
            POSITIONING_MODES.BIAS &&
            positioningMode !==
            POSITIONING_MODES.NON_BIAS
        ) {

            positioningMode =
                POSITIONING_MODES.NON_BIAS;

        }


        if (
            engineLoadMode !==
            ENGINE_LOAD_MODES.PUSH_UP &&
            engineLoadMode !==
            ENGINE_LOAD_MODES.NORMAL
        ) {

            engineLoadMode =
                ENGINE_LOAD_MODES.NORMAL;

        }


        return {

            positioningMode:
                positioningMode,

            engineLoadMode:
                engineLoadMode,

            distinction:
                "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

        };

    }


    function updateSystemSetupDisplay(setup) {

        if (!setup) {
            return;
        }


        setText(
            "livePositioningMode",
            setup.positioningMode
        );


        setText(
            "liveEngineLoadMode",
            setup.engineLoadMode
        );


        setFirst(
            [
                "positioningModeStatus",
                "positioningStatus"
            ],
            setup.positioningMode
        );


        setFirst(
            [
                "engineLoadModeStatus",
                "engineLoadStatus"
            ],
            setup.engineLoadMode
        );


        setFirst(
            [
                "setupDistinction",
                "modeDistinction"
            ],
            setup.distinction
        );


        log(
            "[SETUP] POSITIONING MODE = " +
            setup.positioningMode
        );


        log(
            "[SETUP] ENGINE LOAD MODE = " +
            setup.engineLoadMode
        );


        log(
            "[SETUP] PUSH-UP ≠ POSITIONING BIAS"
        );

    }


    /* ========================================================
       RESERVE-POWER DISPLAY
    ======================================================== */

    function updateReservePowerDisplay(
        reserveVerification
    ) {

        if (!reserveVerification) {

            setFirst(
                [
                    "liveReserve",
                    "reserveVerification",
                    "reserveStatus"
                ],
                "NOT VERIFIED"
            );

            setFirst(
                [
                    "reserveGate",
                    "reservePowerGate"
                ],
                "NOT VERIFIED"
            );

            setFirst(
                [
                    "availableReserve",
                    "reserveAvailable"
                ],
                "—"
            );

            setFirst(
                [
                    "requiredReserve",
                    "reserveRequired"
                ],
                "—"
            );

            return;

        }


        const verified =
            reserveVerification.reserveVerified;


        const status =
            verified
                ? "VERIFIED"
                : "NOT VERIFIED";


        setFirst(
            [
                "liveReserve",
                "reserveVerification",
                "reserveStatus"
            ],
            status
        );


        setFirst(
            [
                "availableReserve",
                "reserveAvailable"
            ],
            reserveVerification.availableReserve
        );


        setFirst(
            [
                "requiredReserve",
                "reserveRequired"
            ],
            reserveVerification.requiredReserve
        );


        setFirst(
            [
                "reserveGate",
                "reservePowerGate"
            ],
            verified
                ? "RESERVE VERIFIED"
                : "RESERVE NOT VERIFIED"
        );


        log(
            "[SAFETY GATE] RESERVE POWER = " +
            status
        );


        if (
            reserveVerification.availableReserve !==
            undefined
        ) {

            log(
                "[SAFETY GATE] AVAILABLE RESERVE = " +
                reserveVerification.availableReserve
            );

        }


        if (
            reserveVerification.requiredReserve !==
            undefined
        ) {

            log(
                "[SAFETY GATE] REQUIRED RESERVE = " +
                reserveVerification.requiredReserve
            );

        }


        if (
            reserveVerification.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP &&
            !verified
        ) {

            log(
                "[SAFETY GATE] PUSH-UP BLOCKED — RESERVE NOT VERIFIED"
            );

        }

    }


    /* ========================================================
       INPUT
    ======================================================== */

    function readEnvironment() {

        function numberFrom(ids) {

            const node =
                firstExisting(ids);

            if (!node) {
                return 0;
            }

            const value =
                Number(node.value);

            return Number.isFinite(value)
                ? value
                : 0;

        }


        const setup =
            readSystemSetup();


        return {

            wind:
                numberFrom([
                    "wind",
                    "windSpeed",
                    "windForce"
                ]),

            current:
                numberFrom([
                    "current",
                    "currentSpeed",
                    "currentForce"
                ]),

            wave:
                numberFrom([
                    "wave",
                    "waveHeight",
                    "waveForce"
                ]),

            tidal:
                numberFrom([
                    "tidal",
                    "tide",
                    "tidalForce"
                ]),

            positioningMode:
                setup.positioningMode,

            engineLoadMode:
                setup.engineLoadMode

        };

    }


    /* ========================================================
       ENVIRONMENT DISPLAY
    ======================================================== */

    function updateEnvironmentDisplay(environment) {

        setText(
            "windValue",
            environment.wind
        );

        setText(
            "currentValue",
            environment.current
        );

        setText(
            "waveValue",
            environment.wave
        );

        setText(
            "tidalValue",
            environment.tidal
        );

    }


    /* ========================================================
       SIMULATION ENGINE EXECUTION
    ======================================================== */

    function executeEngine(environment) {

        const engine =
            findSimulationEngine();

        if (!engine) {

            log(
                "[ENGINE ERROR] DPSimulationEngine.run() not found."
            );

            updateEngineStatus(
                "ENGINE NOT CONNECTED"
            );

            setText(
                "systemStatus",
                "ENGINE NOT CONNECTED"
            );

            return null;

        }


        try {

            log(
                "[ENGINE] DPSimulationEngine.run()"
            );


            log(
                "[ENGINE] POSITIONING MODE = " +
                environment.positioningMode
            );


            log(
                "[ENGINE] ENGINE LOAD MODE = " +
                environment.engineLoadMode
            );


            const result =
                engine.run(
                    environment
                );


            synchronizeEngineStatus();


            return result;

        } catch (error) {

            log(
                "[ENGINE ERROR] " +
                error.message
            );

            setText(
                "systemStatus",
                "SIMULATION ERROR"
            );

            return null;

        }

    }


    /* ========================================================
       RECOMMENDED ACTIONS
    ======================================================== */

    function executeRecommendedActions(result) {

        if (!result) {
            return null;
        }


        if (
            result.recommendedActions !== undefined
        ) {

            log(
                "[ACTION ENGINE] Recommendation supplied by simulation result."
            );

            return result.recommendedActions;

        }


        if (
            result.dpRecommendedActions !== undefined
        ) {

            log(
                "[ACTION ENGINE] DP recommendation supplied by simulation result."
            );

            return result.dpRecommendedActions;

        }


        const engine =
            findRecommendedActionsEngine();


        if (!engine) {

            log(
                "[ACTION ENGINE] Recommended Actions Engine NOT FOUND."
            );

            log(
                "[ACTION ENGINE] NO RECOMMENDATION FABRICATED."
            );

            return null;

        }


        try {

            log(
                "[ACTION ENGINE] " +
                engine.name +
                " " +
                engine.version +
                " — generate()"
            );


            const recommendation =
                engine.generate(
                    result
                );


            if (!recommendation) {

                log(
                    "[ACTION ENGINE] generate() returned no recommendation."
                );

                return null;

            }


            log(
                "[ACTION ENGINE] Recommendation generated."
            );


            result.dpRecommendedActions =
                recommendation;


            window.lastDPRecommendedActions =
                recommendation;


            return recommendation;

        } catch (error) {

            log(
                "[ACTION ENGINE ERROR] " +
                error.message
            );

            return null;

        }

    }


    /* ========================================================
       RESULT EXTRACTION
    ======================================================== */

    function getRisk(result) {

        return String(
            result?.risk ||
            result?.riskLevel ||
            result?.classification ||
            "UNKNOWN"
        ).toUpperCase();

    }


    function getPrimary(result) {

        return (
            result?.primaryAI ||
            result?.primary ||
            result?.s1 ||
            result?.s1PrimaryAI ||
            "S1 PRIMARY AI"
        );

    }


    function getSecondary(result) {

        return (
            result?.secondaryAI ||
            result?.secondary ||
            result?.s2 ||
            result?.s2SecondaryAI ||
            "S2 SECONDARY AI"
        );

    }


    function getStabilizer(result) {

        return (
            result?.stabilizer ||
            result?.stabilizerOutput ||
            result?.stabilized ||
            "STABILIZER"
        );

    }


    function getReserveVerification(result) {

        return (
            result?.reservePowerVerification ||
            result?.reserveVerification ||
            null
        );

    }


    /* ========================================================
       UI UPDATE
    ======================================================== */

    function updateAssessment(result) {

        if (!result) {
            return;
        }


        const risk =
            getRisk(result);


        const primary =
            getPrimary(result);


        const secondary =
            getSecondary(result);


        const stabilizer =
            getStabilizer(result);


        const reserveVerification =
            getReserveVerification(result);


        const systemSetup =
            result?.systemSetup ||
            {

                positioningMode:
                    result?.environment?.positioningMode ||
                    POSITIONING_MODES.NON_BIAS,

                engineLoadMode:
                    result?.environment?.engineLoadMode ||
                    ENGINE_LOAD_MODES.NORMAL,

                distinction:
                    "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

            };


        setText(
            "risk",
            risk
        );


        setText(
            "riskLevel",
            risk
        );


        setText(
            "primaryStatus",
            typeof primary === "object"
                ? primary.status ||
                  primary.mode ||
                  "ACTIVE"
                : primary
        );


        setText(
            "secondaryStatus",
            typeof secondary === "object"
                ? secondary.status ||
                  secondary.mode ||
                  "ACTIVE"
                : secondary
        );


        setText(
            "stabilizerStatus",
            typeof stabilizer === "object"
                ? stabilizer.status ||
                  stabilizer.mode ||
                  "ACTIVE"
                : stabilizer
        );


        updateSystemSetupDisplay(
            systemSetup
        );


        updateReservePowerDisplay(
            reserveVerification
        );


        setJSON(
            "riskPanel",
            result
        );


        setJSON(
            "decision",
            result.decision ||
            result
        );


        setJSON(
            "assessment",
            result
        );


        setJSON(
            "trace",
            PIPELINE
        );


        /*
         * Update common trace fields where available.
         */

        const environment =
            result.environment ||
            {};


        setText(
            "traceEnvironment",
            JSON.stringify(environment)
        );


        setText(
            "traceWind",
            environment.wind
        );


        setText(
            "traceCurrent",
            environment.current
        );


        setText(
            "traceWave",
            environment.wave
        );


        setText(
            "traceTidal",
            environment.tidal
        );


        setText(
            "tracePrimaryMode",
            typeof primary === "object"
                ? primary.mode ||
                  primary.status ||
                  "ACTIVE"
                : primary
        );


        setText(
            "tracePrimaryResponse",
            typeof primary === "object"
                ? primary.response ||
                  primary.message ||
                  JSON.stringify(primary)
                : primary
        );


        setText(
            "traceSecondaryMode",
            typeof secondary === "object"
                ? secondary.mode ||
                  secondary.status ||
                  "ACTIVE"
                : secondary
        );


        setText(
            "traceSecondaryAssessment",
            typeof secondary === "object"
                ? secondary.assessment ||
                  secondary.message ||
                  JSON.stringify(secondary)
                : secondary
        );


        setText(
            "traceStabilizerMode",
            typeof stabilizer === "object"
                ? stabilizer.mode ||
                  stabilizer.status ||
                  "ACTIVE"
                : stabilizer
        );


        setText(
            "traceStabilizerSource",
            typeof stabilizer === "object"
                ? stabilizer.source ||
                  "SIMULATION ENGINE"
                : "SIMULATION ENGINE"
        );


        setText(
            "traceStabilizerOutput",
            typeof stabilizer === "object"
                ? stabilizer.output ||
                  stabilizer.message ||
                  JSON.stringify(stabilizer)
                : stabilizer
        );

    }


    /* ========================================================
       RECOMMENDED ACTION DISPLAY
    ======================================================== */

    function updateRecommendedActions(actions) {

        if (!actions) {

            setText(
                "recommendedAction",
                "NO SIMULATED RECOMMENDATION"
            );

            setText(
                "recommendation",
                "NO SIMULATED RECOMMENDATION"
            );

            setText(
                "actionRationale",
                "Recommended Actions Engine unavailable or no recommendation returned."
            );

            setText(
                "recommendedAutonomous",
                "FALSE"
            );

            setText(
                "recommendedLenaStatus",
                "STANDBY"
            );

            setText(
                "recommendedControlMode",
                "HUMAN AUTHORITY"
            );

            return;

        }


        const primary =
            actions.primary ||
            actions.primaryAction ||
            actions.action ||
            actions.recommendation ||
            "SIMULATED ACTION REVIEW";


        const rationale =
            actions.rationale ||
            actions.reason ||
            actions.primary?.detail ||
            "";


        const actionText =
            typeof primary === "object"
                ? primary.action ||
                  primary.recommendation ||
                  JSON.stringify(primary)
                : primary;


        setText(
            "recommendedAction",
            actionText
        );


        setText(
            "recommendation",
            actionText
        );


        setText(
            "actionRationale",
            rationale
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
            actions.urgency ||
            actions.priority ||
            "REVIEW"
        );


        setText(
            "recommendedMessage",
            rationale ||
            actionText
        );


        setJSON(
            "solutionOptions",
            actions
        );


        setJSON(
            "actions",
            actions
        );

    }


    /* ========================================================
       HUMAN AUTHORITY
    ======================================================== */

    function applyHumanAuthority(result) {

        const reserveVerification =
            getReserveVerification(
                result
            );


        const engineLoadMode =
            result?.systemSetup?.engineLoadMode ||
            result?.environment?.engineLoadMode ||
            ENGINE_LOAD_MODES.NORMAL;


        let gateMessage =
            "HUMAN AUTHORIZATION REQUIRED";


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP &&
            reserveVerification &&
            reserveVerification.reserveVerified ===
            false
        ) {

            gateMessage =
                "PUSH-UP BLOCKED — RESERVE POWER NOT VERIFIED";

        }


        const message = [

            "AI DECISION SUPPORT ONLY",

            "",

            "HUMAN AUTHORITY: FINAL",

            "",

            "NO AUTOMATIC DP COMMAND",

            "",

            "NO REAL VESSEL CONNECTION",

            "",

            "SIMULATED RESPONSE ONLY",

            "",

            gateMessage

        ].join("\n");


        setText(
            "humanDecision",
            message
        );


        setText(
            "humanDecisionIndicator",
            "FINAL HUMAN AUTHORITY"
        );


        setText(
            "humanDecisionStatus",
            gateMessage
        );


        setText(
            "humanStatus",
            gateMessage
        );


        setText(
            "executionGate",
            gateMessage
        );


        return {

            authorized:
                false,

            execution:
                "BLOCKED",

            reason:
                gateMessage,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            realVesselConnection:
                false

        };

    }


    /* ========================================================
       HUMAN BUTTON ACTIONS
    ======================================================== */

    function acknowledgeCondition() {

        log(
            "[HUMAN AUTHORITY] CONDITION ACKNOWLEDGED"
        );


        setText(
            "humanDecisionStatus",
            "CONDITION ACKNOWLEDGED — NO ACTION AUTHORIZED"
        );


        setText(
            "humanStatus",
            "CONDITION ACKNOWLEDGED"
        );


        setText(
            "executionGate",
            "NO ACTION AUTHORIZED"
        );


        return false;

    }


    function maintainSafeState() {

        log(
            "[HUMAN AUTHORITY] MAINTAIN SAFE STATE SELECTED"
        );


        setText(
            "humanDecisionStatus",
            "MAINTAIN SAFE STATE — SIMULATED"
        );


        setText(
            "humanStatus",
            "SAFE STATE MAINTAINED — SIMULATION ONLY"
        );


        setText(
            "executionGate",
            "SAFE STATE — NO OPERATIONAL COMMAND"
        );


        setText(
            "simulatedAction",
            "MAINTAIN SAFE STATE — NOT EXECUTED"
        );


        return {

            authorized:
                false,

            action:
                "MAINTAIN_SAFE_STATE",

            execution:
                "SIMULATED ONLY",

            autonomousCommand:
                false

        };

    }


    function authorizeSimulatedResponse() {

        const result =
            window.lastDPSimulation;


        if (!result) {

            log(
                "[HUMAN AUTHORITY] NO SIMULATION RESULT AVAILABLE"
            );


            setText(
                "humanDecisionStatus",
                "NO SIMULATION RESULT — AUTHORIZATION DENIED"
            );


            setText(
                "executionGate",
                "BLOCKED — NO SIMULATION RESULT"
            );


            return false;

        }


        const reserveVerification =
            getReserveVerification(
                result
            );


        const engineLoadMode =
            result?.systemSetup?.engineLoadMode ||
            result?.environment?.engineLoadMode ||
            ENGINE_LOAD_MODES.NORMAL;


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP &&
            (
                !reserveVerification ||
                reserveVerification.reserveVerified !== true
            )
        ) {

            log(
                "[HUMAN AUTHORITY] PUSH-UP AUTHORIZATION REFUSED"
            );


            setText(
                "humanDecisionStatus",
                "PUSH-UP BLOCKED — RESERVE POWER NOT VERIFIED"
            );


            setText(
                "executionGate",
                "BLOCKED — RESERVE POWER GATE"
            );


            return false;

        }


        log(
            "[HUMAN AUTHORITY] SIMULATED RESPONSE AUTHORIZED FOR V&V REVIEW"
        );


        setText(
            "humanDecisionStatus",
            "SIMULATED RESPONSE AUTHORIZED — V&V ONLY"
        );


        setText(
            "humanStatus",
            "HUMAN AUTHORIZATION RECORDED"
        );


        setText(
            "executionGate",
            "SIMULATION ONLY — NO REAL COMMAND"
        );


        setText(
            "simulatedAction",
            "AUTHORIZED FOR SIMULATION — NOT EXECUTED"
        );


        return {

            authorized:
                true,

            execution:
                "SIMULATION ONLY",

            autonomousCommand:
                false,

            realVesselConnection:
                false,

            humanAuthority:
                "FINAL"

        };

    }


    /* ========================================================
       SIMULATED DP RESPONSE
    ======================================================== */

    function simulatedDPResponse(result) {

        const reserveVerification =
            getReserveVerification(
                result
            );


        const engineLoadMode =
            result?.systemSetup?.engineLoadMode ||
            result?.environment?.engineLoadMode ||
            ENGINE_LOAD_MODES.NORMAL;


        const response = {

            mode:
                "SIMULATED DP RESPONSE",

            executed:
                false,

            autonomousCommand:
                false,

            realVesselConnection:
                false,

            humanAuthorization:
                "REQUIRED",

            engineLoadMode:
                engineLoadMode,

            reserveVerified:
                reserveVerification
                    ? Boolean(
                        reserveVerification.reserveVerified
                    )
                    : false,

            source:
                "DP RESILIENCE SIMULATION"

        };


        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                reserveVerification &&
                reserveVerification.reserveVerified
            ) {

                response.executionGate =
                    "PUSH-UP SIMULATION PERMITTED FOR HUMAN REVIEW";

            } else {

                response.executionGate =
                    "PUSH-UP BLOCKED — RESERVE NOT VERIFIED";

            }

        } else {

            response.executionGate =
                "NORMAL LOAD — HUMAN REVIEW REQUIRED";

        }


        setJSON(
            "simulatedDPResponse",
            response
        );


        setText(
            "dpResponse",
            "SIMULATED DP RESPONSE — NOT EXECUTED"
        );


        setText(
            "simulatedAction",
            "NOT EXECUTED"
        );


        setText(
            "operationalCommand",
            "FALSE"
        );


        setText(
            "lenaAutonomousCommand",
            "FALSE — NO AUTONOMOUS COMMAND"
        );


        setText(
            "lenaUMVAction",
            "SIMULATION ONLY"
        );


        return response;

    }


    /* ========================================================
       LENA DISPLAY
    ======================================================== */

    function updateLenaDisplay(
        result,
        actions,
        response
    ) {

        setText(
            "lenaStatus",
            actions
                ? "DECISION SUPPORT"
                : "STANDBY"
        );


        const recommendation =
            actions?.primary ||
            actions?.primaryAction ||
            actions?.action ||
            actions?.recommendation ||
            "AWAITING ASSESSMENT";


        const recommendationText =
            typeof recommendation === "object"
                ? recommendation.action ||
                  recommendation.recommendation ||
                  JSON.stringify(recommendation)
                : recommendation;


        setText(
            "lenaRecommendation",
            recommendationText
        );


        setText(
            "lenaUrgency",
            actions?.urgency ||
            actions?.priority ||
            getRisk(result)
        );


        setText(
            "lenaResponseMode",
            response?.mode ||
            "SIMULATION ONLY"
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
            "Captain AI Lena provides decision support only. Human authority remains final. No operational command is generated."
        );

    }


    /* ========================================================
       PIPELINE
    ======================================================== */

    function runPipeline() {

        const environment =
            readEnvironment();


        updateEnvironmentDisplay(
            environment
        );


        updateSystemSetupDisplay(
            {

                positioningMode:
                    environment.positioningMode,

                engineLoadMode:
                    environment.engineLoadMode,

                distinction:
                    "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

            }
        );


        log(
            "[PIPELINE] ENVIRONMENT"
        );


        log(
            "[PIPELINE] SYSTEM SETUP"
        );


        const result =
            executeEngine(
                environment
            );


        if (!result) {
            return null;
        }


        log(
            "[PIPELINE] S1 PRIMARY AI"
        );


        log(
            "[PIPELINE] S2 SECONDARY AI"
        );


        log(
            "[PIPELINE] STABILIZER"
        );


        updateAssessment(
            result
        );


        log(
            "[PIPELINE] RECOMMENDED ACTIONS ENGINE"
        );


        const actions =
            executeRecommendedActions(
                result
            );


        updateRecommendedActions(
            actions
        );


        log(
            "[PIPELINE] RESERVE-POWER VERIFICATION"
        );


        const reserveVerification =
            getReserveVerification(
                result
            );


        updateReservePowerDisplay(
            reserveVerification
        );


        log(
            "[PIPELINE] HUMAN-IN-THE-LOOP"
        );


        const humanGate =
            applyHumanAuthority(
                result
            );


        log(
            "[PIPELINE] SIMULATED DP RESPONSE"
        );


        const response =
            simulatedDPResponse(
                result
            );


        updateLenaDisplay(
            result,
            actions,
            response
        );


        setText(
            "systemStatus",
            "SIMULATION COMPLETE"
        );


        synchronizeEngineStatus();


        setJSON(
            "audit",
            {

                timestamp:
                    new Date().toISOString(),

                module:
                    MODULE_NAME,

                version:
                    VERSION,

                simulationEngineVersion:
                    SIMULATION_ENGINE_VERSION,

                recommendedActionsEngine:
                    findRecommendedActionsEngine()
                        ? (
                            findRecommendedActionsEngine().version ||
                            RECOMMENDED_ACTIONS_VERSION
                        )
                        : "NOT FOUND",

                systemSetup:
                    result.systemSetup ||
                    {

                        positioningMode:
                            environment.positioningMode,

                        engineLoadMode:
                            environment.engineLoadMode,

                        distinction:
                            "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

                    },

                reservePowerVerification:
                    reserveVerification,

                risk:
                    getRisk(result),

                humanAuthority:
                    HUMAN_AUTHORITY,

                autonomousCommand:
                    AUTONOMOUS_COMMAND,

                realVesselConnection:
                    REAL_VESSEL_CONNECTION,

                humanGate:
                    humanGate,

                simulatedResponse:
                    response

            }
        );


        window.lastDPSimulation =
            result;


        window.lastDPRecommendedActions =
            actions;


        return result;

    }


    /* ========================================================
       SCENARIO SUPPORT
    ======================================================== */

    function setScenarioValues(
        name,
        wind,
        current,
        wave,
        tidal
    ) {

        setInputValue(
            "wind",
            wind
        );

        setInputValue(
            "current",
            current
        );

        setInputValue(
            "wave",
            wave
        );

        setInputValue(
            "tidal",
            tidal
        );


        log(
            "[SCENARIO] " +
            name
        );


        return runPipeline();

    }


    function setInputValue(
        id,
        value
    ) {

        const node =
            el(id);

        if (!node) {
            return;
        }

        node.value =
            value;

        node.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles:
                        true
                }
            )
        );

    }


    function normalScenario() {

        return setScenarioValues(
            "NORMAL",
            10,
            10,
            10,
            10
        );

    }


    function moderateWeatherScenario() {

        return setScenarioValues(
            "MODERATE WEATHER",
            30,
            30,
            30,
            30
        );

    }


    function heavyWeatherScenario() {

        return setScenarioValues(
            "HEAVY WEATHER",
            60,
            60,
            60,
            60
        );

    }


    function criticalScenario() {

        return setScenarioValues(
            "CRITICAL",
            90,
            90,
            90,
            90
        );

    }


    function currentSurgeScenario() {

        return setScenarioValues(
            "CURRENT SURGE",
            20,
            80,
            20,
            20
        );

    }


    function heavySeaStateScenario() {

        return setScenarioValues(
            "HEAVY SEA STATE",
            20,
            30,
            90,
            30
        );

    }


    function windGustScenario() {

        return setScenarioValues(
            "WIND GUST",
            90,
            20,
            30,
            20
        );

    }


    function combinedDisturbanceScenario() {

        return setScenarioValues(
            "COMBINED DISTURBANCE",
            80,
            80,
            80,
            80
        );

    }


    function randomScenario() {

        const randomValue =
            function () {

                return Math.floor(
                    Math.random() * 101
                );

            };


        return setScenarioValues(
            "RANDOM",
            randomValue(),
            randomValue(),
            randomValue(),
            randomValue()
        );

    }


    /* ========================================================
       RESET
    ======================================================== */

    function resetCockpit() {

        for (
            const id of [
                "wind",
                "current",
                "wave",
                "tidal"
            ]
        ) {

            const node =
                el(id);

            if (node) {
                node.value = 0;
            }

        }


        const positioningNode =
            firstExisting([
                "positioningMode",
                "positionMode",
                "biasMode"
            ]);


        if (positioningNode) {

            positioningNode.value =
                POSITIONING_MODES.NON_BIAS;

        }


        const engineLoadNode =
            firstExisting([
                "engineLoadMode",
                "loadMode",
                "engineMode"
            ]);


        if (engineLoadNode) {

            engineLoadNode.value =
                ENGINE_LOAD_MODES.NORMAL;

        }


        setText(
            "livePositioningMode",
            POSITIONING_MODES.NON_BIAS
        );


        setText(
            "liveEngineLoadMode",
            ENGINE_LOAD_MODES.NORMAL
        );


        setText(
            "liveReserve",
            "NOT VERIFIED"
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


        setText(
            "reserveGate",
            "NOT VERIFIED"
        );


        setText(
            "systemStatus",
            "SYSTEM READY"
        );


        setText(
            "environmentStatus",
            "WAITING"
        );


        setText(
            "risk",
            "UNKNOWN"
        );


        setText(
            "riskLevel",
            "UNKNOWN"
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
            "lenaStatus",
            "STANDBY"
        );


        setText(
            "lenaRecommendation",
            "—"
        );


        setText(
            "lenaUrgency",
            "—"
        );


        setText(
            "lenaResponseMode",
            "—"
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
            "STANDBY"
        );


        setText(
            "recommendedControlMode",
            "HUMAN AUTHORITY"
        );


        setText(
            "recommendedAction",
            "WAITING FOR ASSESSMENT"
        );


        setText(
            "recommendation",
            "WAITING FOR ASSESSMENT"
        );


        setText(
            "actionRationale",
            ""
        );


        setText(
            "recommendedUrgency",
            "—"
        );


        setText(
            "recommendedMessage",
            "No recommendation available until a simulation is executed."
        );


        setText(
            "operationalCommand",
            "FALSE"
        );


        setText(
            "realVesselConnection",
            "FALSE"
        );


        setText(
            "humanAuthority",
            "FINAL"
        );


        setText(
            "humanStatus",
            "HUMAN AUTHORIZATION REQUIRED"
        );


        setText(
            "humanDecisionStatus",
            "HUMAN AUTHORIZATION REQUIRED — NO ACTION AUTHORIZED"
        );


        setText(
            "executionGate",
            "HUMAN AUTHORIZATION REQUIRED"
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
            "assessmentOutput",
            "Awaiting simulation."
        );


        setText(
            "auditOutput",
            "Awaiting simulation."
        );


        window.lastDPSimulation =
            null;


        window.lastDPRecommendedActions =
            null;


        synchronizeEngineStatus();


        log(
            "[SYSTEM] COCKPIT RESET"
        );


        log(
            "[SYSTEM] POSITIONING MODE = NON_BIAS"
        );


        log(
            "[SYSTEM] ENGINE LOAD MODE = NORMAL"
        );


        log(
            "[SYSTEM] RESERVE POWER = NOT VERIFIED"
        );

    }


    /* ========================================================
       SETUP CHANGE WIRING
    ======================================================== */

    function handleSystemSetupChange() {

        const setup =
            readSystemSetup();


        updateSystemSetupDisplay(
            setup
        );


        /*
         * Changing the setup invalidates the previous
         * reserve verification because the requested
         * engine-load mode may have changed.
         */

        setText(
            "liveReserve",
            "NOT VERIFIED"
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


        setText(
            "reserveGate",
            "NOT VERIFIED"
        );


        log(
            "[SETUP] SYSTEM SETUP CHANGED — NEW SIMULATION REQUIRED"
        );


        if (
            setup.engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            log(
                "[SETUP] PUSH-UP SELECTED — RESERVE VERIFICATION REQUIRED"
            );

        }

    }


    /* ========================================================
       WIRING DIAGNOSTIC
    ======================================================== */

    function validateWiring() {

        const simulationEngine =
            findSimulationEngine();


        const actionEngine =
            findRecommendedActionsEngine();


        const currentSetup =
            readSystemSetup();


        const report = {

            module:
                MODULE_NAME,

            version:
                VERSION,

            simulationEngine:
                simulationEngine
                    ? "CONNECTED"
                    : "NOT FOUND",

            simulationEngineVersion:
                simulationEngine
                    ? (
                        simulationEngine.version ||
                        SIMULATION_ENGINE_VERSION
                    )
                    : "NOT FOUND",

            recommendedActionsEngine:
                actionEngine
                    ? "CONNECTED"
                    : "NOT FOUND",

            recommendedActionsAPI:
                actionEngine
                    ? (
                        actionEngine.name +
                        " " +
                        actionEngine.version
                    )
                    : "NOT FOUND",

            browserButtonAPI:
                {

                    runSimulation:
                        typeof window.runSimulation ===
                        "function"
                            ? "CONNECTED"
                            : "PENDING",

                    resetSimulation:
                        typeof window.resetSimulation ===
                        "function"
                            ? "CONNECTED"
                            : "PENDING",

                    scenarioControls:
                        "CONNECTED"

                },

            systemSetup:
                {

                    positioningMode:
                        currentSetup.positioningMode,

                    engineLoadMode:
                        currentSetup.engineLoadMode,

                    distinction:
                        "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

                },

            reservePowerVerification:
                "ENGINE-CONTROLLED",

            pipeline:
                PIPELINE,

            safety:
                safetyStatus(),

            status:
                simulationEngine &&
                actionEngine
                    ? "READY"
                    : simulationEngine
                        ? "SIMULATION ENGINE CONNECTED — ACTION ENGINE PENDING"
                        : "ENGINE NOT CONNECTED"

        };


        setJSON(
            "wiringStatus",
            report
        );


        log(
            "[WIRING] " +
            report.status
        );


        log(
            "[WIRING] Simulation Engine = " +
            report.simulationEngine
        );


        log(
            "[WIRING] Simulation Engine Version = " +
            report.simulationEngineVersion
        );


        log(
            "[WIRING] Recommended Actions Engine = " +
            report.recommendedActionsEngine
        );


        log(
            "[WIRING] POSITIONING MODE = " +
            currentSetup.positioningMode
        );


        log(
            "[WIRING] ENGINE LOAD MODE = " +
            currentSetup.engineLoadMode
        );


        log(
            "[WIRING] RESERVE POWER VERIFICATION = ENGINE-CONTROLLED"
        );


        log(
            "[WIRING] PUSH-UP ≠ POSITIONING BIAS"
        );


        log(
            "[WIRING] Browser button compatibility API = CONNECTED"
        );


        if (actionEngine) {

            log(
                "[WIRING] Recommended Actions API = " +
                actionEngine.name +
                " " +
                actionEngine.version
            );

        }


        synchronizeEngineStatus();


        return report;

    }


    /* ========================================================
       BUTTON WIRING
    ======================================================== */

    function wireButton(
        ids,
        handler
    ) {

        const node =
            firstExisting(ids);


        if (!node) {
            return false;
        }


        if (
            node.dataset.dpCockpitWired ===
            "true"
        ) {

            return true;

        }


        node.dataset.dpCockpitWired =
            "true";


        node.addEventListener(
            "click",
            handler
        );


        return true;

    }


    function wireChange(
        ids,
        handler
    ) {

        const node =
            firstExisting(ids);


        if (!node) {
            return false;
        }


        if (
            node.dataset.dpCockpitChangeWired ===
            "true"
        ) {

            return true;

        }


        node.dataset.dpCockpitChangeWired =
            "true";


        node.addEventListener(
            "change",
            handler
        );


        return true;

    }


    function wireUI() {

        /*
         * RUN
         */

        wireButton(
            [
                "runSimulation",
                "runDPButton",
                "simulateButton",
                "startSimulation"
            ],
            runPipeline
        );


        /*
         * RESET
         */

        wireButton(
            [
                "resetSystem",
                "resetDPButton",
                "resetButton"
            ],
            resetCockpit
        );


        /*
         * ENGINE TEST
         */

        wireButton(
            [
                "testEngine",
                "engineTest",
                "testDPEngine"
            ],
            validateWiring
        );


        /*
         * SYSTEM SETUP
         */

        wireChange(
            [
                "positioningMode",
                "positionMode",
                "biasMode"
            ],
            handleSystemSetupChange
        );


        wireChange(
            [
                "engineLoadMode",
                "loadMode",
                "engineMode"
            ],
            handleSystemSetupChange
        );


        log(
            "[UI] Button wiring complete."
        );


        log(
            "[UI] System setup change wiring complete."
        );

    }


    /* ========================================================
       STARTUP ENGINE RETRY
    ======================================================== */

    function retryRecommendedActionsEngine() {

        if (
            findRecommendedActionsEngine()
        ) {

            log(
                "[WIRING] Recommended Actions Engine detected."
            );

            synchronizeEngineStatus();

            return true;

        }


        log(
            "[WIRING] Recommended Actions Engine not yet available."
        );


        window.setTimeout(
            function () {

                if (
                    findRecommendedActionsEngine()
                ) {

                    log(
                        "[WIRING] Recommended Actions Engine = CONNECTED"
                    );

                    log(
                        "[WIRING] API = " +
                        window.DPRecommendedActions.name +
                        " " +
                        window.DPRecommendedActions.version
                    );

                } else {

                    log(
                        "[WIRING] Recommended Actions Engine = NOT FOUND"
                    );

                }


                synchronizeEngineStatus();

            },
            100
        );


        return false;

    }


    /* ========================================================
       PUBLIC API
    ======================================================== */

    /*
     * Primary controller API.
     */

    window.runDPCockpit =
        runPipeline;


    window.runDPSimulation =
        runPipeline;


    window.executeDPSimulation =
        runPipeline;


    /*
     * IMPORTANT BROWSER COMPATIBILITY ALIASES
     *
     * The main index.html uses these names.
     */

    window.runSimulation =
        runPipeline;


    window.resetSimulation =
        resetCockpit;


    /*
     * Scenario API.
     */

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


    /*
     * Human authority API.
     */

    window.acknowledgeCondition =
        acknowledgeCondition;


    window.maintainSafeState =
        maintainSafeState;


    window.authorizeSimulatedResponse =
        authorizeSimulatedResponse;


    /*
     * Controller API.
     */

    window.resetDPCockpit =
        resetCockpit;


    window.validateDPWiring =
        validateWiring;


    window.testDPEngineConnection =
        validateWiring;


    window.testRecommendedActionsConnection =
        testRecommendedActionsConnection;


    window.DPCockpit =
        {

            module:
                MODULE_NAME,

            version:
                VERSION,

            simulationEngineVersion:
                SIMULATION_ENGINE_VERSION,

            run:
                runPipeline,

            reset:
                resetCockpit,

            validate:
                validateWiring,

            safety:
                safetyStatus,

            pipeline:
                PIPELINE,

            positioningModes:
                POSITIONING_MODES,

            engineLoadModes:
                ENGINE_LOAD_MODES

        };


    /* ========================================================
       BOOT
    ======================================================== */

    function bootDPCockpit() {

        displaySafety();


        /*
         * Expose the browser API before wiring the UI.
         * This guarantees inline HTML handlers can resolve.
         */

        window.runSimulation =
            runPipeline;

        window.resetSimulation =
            resetCockpit;

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

        window.acknowledgeCondition =
            acknowledgeCondition;

        window.maintainSafeState =
            maintainSafeState;

        window.authorizeSimulatedResponse =
            authorizeSimulatedResponse;


        wireUI();


        validateWiring();


        retryRecommendedActionsEngine();


        const initialSetup =
            readSystemSetup();


        updateSystemSetupDisplay(
            initialSetup
        );


        setText(
            "liveReserve",
            "NOT VERIFIED"
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
            "systemStatus",
            "SYSTEM READY"
        );


        synchronizeEngineStatus();


        log(
            "================================================"
        );


        log(
            "SEXTANT PROTOCOL DP RESILIENCE COCKPIT"
        );


        log(
            "VERSION " +
            VERSION
        );


        log(
            "SIMULATION ENGINE TARGET: v" +
            SIMULATION_ENGINE_VERSION
        );


        log(
            "RESEARCH / SIMULATION ONLY"
        );


        log(
            "HUMAN AUTHORITY: FINAL"
        );


        log(
            "AUTONOMOUS COMMAND: FALSE"
        );


        log(
            "REAL VESSEL CONNECTION: FALSE"
        );


        log(
            "POSITIONING MODE: " +
            initialSetup.positioningMode
        );


        log(
            "ENGINE LOAD MODE: " +
            initialSetup.engineLoadMode
        );


        log(
            "PUSH-UP ≠ POSITIONING BIAS"
        );


        log(
            "RESERVE-POWER VERIFICATION: ENGINE-CONTROLLED"
        );


        log(
            "BROWSER API: runSimulation() = CONNECTED"
        );


        log(
            "BROWSER API: resetSimulation() = CONNECTED"
        );


        log(
            "BROWSER API: SCENARIOS = CONNECTED"
        );


        log(
            "BROWSER API: HUMAN AUTHORITY = CONNECTED"
        );


        log(
            "RECOMMENDED ACTIONS ENGINE: " +
            (
                findRecommendedActionsEngine()
                    ? "CONNECTED"
                    : "PENDING"
            )
        );


        log(
            "================================================"
        );

    }


    /* ========================================================
       START
    ======================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            bootDPCockpit,
            {
                once: true
            }
        );

    } else {

        bootDPCockpit();

    }


})();