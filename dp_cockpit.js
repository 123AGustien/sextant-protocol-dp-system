/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.4.0

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
        "2.4.0";

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
       ENGINE DISCOVERY
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
                typeof candidate.run === "function"
            ) {

                return candidate;

            }

        }

        return null;

    }


    function findRecommendedActionsEngine() {

        const candidates = [

            window.DPRecommendedActionsEngine,

            window.DPRecommendedActionEngine,

            window.RecommendedActionsEngine,

            window.dpRecommendedActionsEngine

        ];

        for (const candidate of candidates) {

            if (
                candidate &&
                typeof candidate.run === "function"
            ) {

                return candidate;

            }

        }

        return null;

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
       ENGINE EXECUTION
    ======================================================== */

    function executeEngine(environment) {

        const engine =
            findSimulationEngine();

        if (!engine) {

            log(
                "[ENGINE ERROR] DPSimulationEngine.run() not found."
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

            return engine.run(
                environment
            );

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

            return result.recommendedActions;

        }


        if (
            result.dpRecommendedActions !== undefined
        ) {

            return result.dpRecommendedActions;

        }


        const engine =
            findRecommendedActionsEngine();


        if (!engine) {

            log(
                "[ACTION ENGINE] No external action engine exposed."
            );

            return null;

        }


        try {

            return engine.run(
                result
            );

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


        setJSON(
            "audit",
            {

                timestamp:
                    new Date().toISOString(),

                module:
                    MODULE_NAME,

                version:
                    VERSION,

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

            pipeline:
                PIPELINE,

            safety:
                safetyStatus(),

            status:
                simulationEngine
                    ? "READY"
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

        validateWiring();

        setText(
            "systemStatus",
            "SYSTEM READY"
        );


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
            "================================================"
        );

    }


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
