/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.4.1

   PURPOSE:
   Browser-side controller for the deterministic DP resilience
   simulation stack.

   ARCHITECTURE:

       ENVIRONMENT
            ↓
       S1 PRIMARY AI
            ↓
       S2 SECONDARY AI
            ↓
       STABILIZER
            ↓
       DP RECOMMENDED ACTIONS ENGINE
            ↓
       HUMAN-IN-THE-LOOP
            ↓
       SIMULATED DP RESPONSE

   SAFETY:

       RESEARCH / SIMULATION ONLY

       AUTONOMOUS COMMAND: FALSE
       REAL VESSEL CONNECTION: FALSE
       HUMAN AUTHORITY: FINAL

   This controller NEVER sends commands to:
       - propulsion
       - thrusters
       - steering
       - navigation
       - vessel automation
       - real DP equipment
       - safety systems

============================================================ */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPResilienceCockpit";

    const VERSION =
        "2.4.1";

    const RECOMMENDED_ACTIONS_VERSION =
        "SPD-DP-RECOMMENDED-ACTIONS-V1.2";

    const SAFETY_BOUNDARY =
        "SIMULATION ONLY — NO AUTONOMOUS OPERATIONAL COMMAND";

    const AUTONOMOUS_COMMAND =
        false;

    const REAL_VESSEL_CONNECTION =
        false;

    const HUMAN_AUTHORITY =
        "FINAL";


    const PIPELINE = [
        "ENVIRONMENT",
        "S1 PRIMARY AI",
        "S2 SECONDARY AI",
        "STABILIZER",
        "RECOMMENDED ACTIONS ENGINE",
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


    /*
     * Synchronize the visible ENGINE indicator with the
     * actual JavaScript engine state.
     *
     * IMPORTANT:
     * This does not create an engine.
     * It only reports the state of engines that actually exist.
     */

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
       REAL EXPORT:

       window.DPRecommendedActions

       API:

       DPRecommendedActions.generate(result)
    ======================================================== */

    function findRecommendedActionsEngine() {

        /*
         * This is the actual public API exported by:
         *
         * dp_recommended_actions.js
         *
         * window.DPRecommendedActions = {
         *     name,
         *     version,
         *     ...
         *     generate
         * };
         */

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
                ])

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


        /*
         * Prefer recommendations already returned by the
         * authoritative simulation engine.
         */

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


        /*
         * Use the actual Recommended Actions Engine.
         */

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


            /*
             * Keep the result available to the cockpit
             * without modifying the simulation engine.
             */

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


        setText(
            "recommendedAction",
            typeof primary === "object"
                ? primary.action ||
                  primary.recommendation ||
                  JSON.stringify(primary)
                : primary
        );


        setText(
            "recommendation",
            typeof primary === "object"
                ? primary.action ||
                  primary.recommendation ||
                  JSON.stringify(primary)
                : primary
        );


        setText(
            "actionRationale",
            rationale
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

        const message = [

            "AI DECISION SUPPORT ONLY",

            "",

            "HUMAN AUTHORITY: FINAL",

            "",

            "NO AUTOMATIC DP COMMAND",

            "",

            "NO REAL VESSEL CONNECTION",

            "",

            "SIMULATED RESPONSE ONLY"

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
            "humanStatus",
            "HUMAN AUTHORIZATION REQUIRED"
        );


        setText(
            "executionGate",
            "HUMAN AUTHORIZATION REQUIRED"
        );


        /*
         * Deliberately do NOT call:
         *
         * propulsion
         * thruster
         * steering
         * navigation
         * vessel control
         *
         * No automatic execution exists here.
         */

        return {

            authorized:
                false,

            execution:
                "BLOCKED",

            reason:
                "HUMAN AUTHORIZATION REQUIRED"

        };

    }


    /* ========================================================
       SIMULATED DP RESPONSE
    ======================================================== */

    function simulatedDPResponse(result) {

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

            source:
                "DP RESILIENCE SIMULATION"

        };


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


        return response;

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


        log(
            "[PIPELINE] ENVIRONMENT"
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

                recommendedActionsEngine:
                    findRecommendedActionsEngine()
                        ? RECOMMENDED_ACTIONS_VERSION
                        : "NOT FOUND",

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


        setText(
            "systemStatus",
            "SYSTEM READY"
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


        window.lastDPSimulation =
            null;


        window.lastDPRecommendedActions =
            null;


        synchronizeEngineStatus();


        log(
            "[SYSTEM] COCKPIT RESET"
        );

    }


    /* ========================================================
       WIRING DIAGNOSTIC
    ======================================================== */

    function validateWiring() {

        const simulationEngine =
            findSimulationEngine();


        const actionEngine =
            findRecommendedActionsEngine();


        const report = {

            module:
                MODULE_NAME,

            version:
                VERSION,

            simulationEngine:
                simulationEngine
                    ? "CONNECTED"
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
            "[WIRING] Recommended Actions Engine = " +
            report.recommendedActionsEngine
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


    function wireUI() {

        wireButton(
            [
                "runSimulation",
                "runDPButton",
                "simulateButton",
                "startSimulation"
            ],
            runPipeline
        );


        wireButton(
            [
                "resetSystem",
                "resetDPButton",
                "resetButton"
            ],
            resetCockpit
        );


        wireButton(
            [
                "testEngine",
                "engineTest",
                "testDPEngine"
            ],
            validateWiring
        );


        log(
            "[UI] Button wiring complete."
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

    window.runDPCockpit =
        runPipeline;


    window.runDPSimulation =
        runPipeline;


    window.executeDPSimulation =
        runPipeline;


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

            run:
                runPipeline,

            reset:
                resetCockpit,

            validate:
                validateWiring,

            safety:
                safetyStatus,

            pipeline:
                PIPELINE

        };


    /* ========================================================
       BOOT
    ======================================================== */

    function bootDPCockpit() {

        displaySafety();


        wireUI();


        /*
         * Validate both engines.
         */

        validateWiring();


        /*
         * Protect against script-load race.
         */

        retryRecommendedActionsEngine();


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