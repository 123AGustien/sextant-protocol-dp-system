/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT

   FILE: dp_cockpit.js
   VERSION: 1.3.0

   PURPOSE:
   Browser cockpit wiring for the deterministic DP
   simulation engine.

   RESPONSIBILITIES:
   - Connect scenario buttons to environmental inputs
   - Update visible environmental input values
   - Execute DP simulation
   - Render simulation results
   - Display operator decision-support recommendations
   - Maintain audit/event logging
   - Reset cockpit to standby

   SAFETY BOUNDARY:
   RESEARCH / SIMULATION ONLY.

   THIS FILE DOES NOT COMMAND OR CONNECT TO:
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
       CONFIGURATION
    ======================================================== */

    const VERSION =
        "1.3.0";

    const DEFAULT_INPUTS = {

        wind: 20,
        current: 15,
        wave: 20,
        tidal: 15

    };


    /* ========================================================
       SCENARIO LIBRARY
    ======================================================== */

    const SCENARIOS = {

        NORMAL: {

            name:
                "NORMAL",

            description:
                "Normal operating environmental conditions.",

            wind: 20,
            current: 15,
            wave: 20,
            tidal: 15

        },


        MODERATE_WEATHER: {

            name:
                "MODERATE WEATHER",

            description:
                "Moderate environmental disturbance.",

            wind: 45,
            current: 40,
            wave: 50,
            tidal: 35

        },


        HEAVY_WEATHER: {

            name:
                "HEAVY WEATHER",

            description:
                "High environmental loading.",

            wind: 70,
            current: 65,
            wave: 75,
            tidal: 60

        },


        CRITICAL_WEATHER: {

            name:
                "CRITICAL WEATHER",

            description:
                "Extreme environmental disturbance.",

            wind: 95,
            current: 90,
            wave: 95,
            tidal: 85

        },


        CURRENT_SURGE: {

            name:
                "CURRENT SURGE",

            description:
                "High current loading with moderate other forces.",

            wind: 40,
            current: 90,
            wave: 45,
            tidal: 70

        },


        HEAVY_SEA_STATE: {

            name:
                "HEAVY SEA STATE",

            description:
                "High wave loading.",

            wind: 65,
            current: 45,
            wave: 90,
            tidal: 50

        },


        WIND_GUST_EVENT: {

            name:
                "WIND GUST EVENT",

            description:
                "High wind disturbance.",

            wind: 90,
            current: 40,
            wave: 50,
            tidal: 35

        },


        COMBINED_DISTURBANCE: {

            name:
                "COMBINED DISTURBANCE",

            description:
                "Multiple simultaneous environmental disturbances.",

            wind: 80,
            current: 75,
            wave: 80,
            tidal: 70

        },


        SENSOR_NOISE: {

            name:
                "SENSOR NOISE",

            description:
                "Simulated degraded sensor fidelity.",

            wind: 55,
            current: 50,
            wave: 60,
            tidal: 45

        },


        PARTIAL_SENSOR_LOSS: {

            name:
                "PARTIAL SENSOR LOSS",

            description:
                "Reduced confidence in simulated environmental inputs.",

            wind: 60,
            current: 30,
            wave: 65,
            tidal: 20

        },


        RAPID_TRANSITION: {

            name:
                "RAPID TRANSITION",

            description:
                "Fast-changing environmental conditions.",

            wind: 30,
            current: 85,
            wave: 40,
            tidal: 90

        }

    };


    /* ========================================================
       EXPORT SCENARIOS
    ======================================================== */

    window.DP_SCENARIOS =
        SCENARIOS;


    /* ========================================================
       DOM HELPER
    ======================================================== */

    function el(id) {

        return document.getElementById(id);

    }


    function setText(id, value) {

        const node =
            el(id);

        if (!node) {
            return;
        }

        node.textContent =
            value === undefined ||
            value === null
                ? ""
                : String(value);

    }


    /* ========================================================
       INPUT HELPER
    ======================================================== */

    function getInput(id) {

        const input =
            el(id);

        if (!input) {

            console.warn(
                "DP cockpit input not found:",
                id
            );

            return null;

        }

        return input;

    }


    /* ========================================================
       UPDATE INPUT
    ======================================================== */

    function setInputValue(
        id,
        value
    ) {

        const input =
            getInput(id);

        if (!input) {
            return false;
        }

        input.value =
            value;


        /*
         * Trigger input/change events so existing
         * range-slider display code updates.
         */

        try {

            input.dispatchEvent(
                new Event(
                    "input",
                    {
                        bubbles: true
                    }
                )
            );

            input.dispatchEvent(
                new Event(
                    "change",
                    {
                        bubbles: true
                    }
                )
            );

        } catch (error) {

            /*
             * Older browser fallback.
             */

            if (
                typeof document.createEvent ===
                "function"
            ) {

                const inputEvent =
                    document.createEvent(
                        "Event"
                    );

                inputEvent.initEvent(
                    "input",
                    true,
                    true
                );

                input.dispatchEvent(
                    inputEvent
                );

            }

        }

        return true;

    }


    /* ========================================================
       READ ENVIRONMENTAL INPUTS
    ======================================================== */

    function readDPInputs() {

        const wind =
            getInput("wind");

        const current =
            getInput("current");

        const wave =
            getInput("wave");

        const tidal =
            getInput("tidal");


        return {

            wind:
                wind
                    ? Number(wind.value)
                    : 0,

            current:
                current
                    ? Number(current.value)
                    : 0,

            wave:
                wave
                    ? Number(wave.value)
                    : 0,

            tidal:
                tidal
                    ? Number(tidal.value)
                    : 0

        };

    }


    /* ========================================================
       SCENARIO APPLICATION
    ======================================================== */

    function applyDPScenario(
        scenarioName
    ) {

        const scenario =
            SCENARIOS[
                scenarioName
            ];


        if (!scenario) {

            console.error(
                "Unknown DP scenario:",
                scenarioName
            );

            return false;

        }


        /*
         * These assignments are the actual connection
         * between the scenario and the four environmental
         * simulation inputs.
         */

        const windApplied =
            setInputValue(
                "wind",
                scenario.wind
            );

        const currentApplied =
            setInputValue(
                "current",
                scenario.current
            );

        const waveApplied =
            setInputValue(
                "wave",
                scenario.wave
            );

        const tidalApplied =
            setInputValue(
                "tidal",
                scenario.tidal
            );


        const success =
            windApplied &&
            currentApplied &&
            waveApplied &&
            tidalApplied;


        if (!success) {

            console.error(
                "DP scenario could not update all environmental inputs.",
                scenarioName
            );

            return false;

        }


        /*
         * Optional visible scenario fields.
         */

        setText(
            "scenarioName",
            scenario.name
        );

        setText(
            "scenarioDescription",
            scenario.description
        );


        /*
         * Update visible slider/value displays.
         */

        setText(
            "windValue",
            scenario.wind
        );

        setText(
            "currentValue",
            scenario.current
        );

        setText(
            "waveValue",
            scenario.wave
        );

        setText(
            "tidalValue",
            scenario.tidal
        );


        /*
         * Store currently selected scenario.
         */

        window.currentDPScenario =
            scenarioName;


        return true;

    }


    /* ========================================================
       OPERATOR EVENT LOG
    ======================================================== */

    function appendOperatorLog(
        message
    ) {

        const log =
            el(
                "operatorEventLog"
            );

        if (!log) {
            return;
        }


        const timestamp =
            new Date()
                .toLocaleTimeString();


        const line =
            "[" +
            timestamp +
            "] " +
            message;


        if (
            log.tagName ===
            "TEXTAREA"
        ) {

            log.value +=
                (
                    log.value
                        ? "\n"
                        : ""
                ) +
                line;

            log.scrollTop =
                log.scrollHeight;

            return;

        }


        const entry =
            document.createElement(
                "div"
            );

        entry.textContent =
            line;

        log.appendChild(
            entry
        );

    }


    /*
     * IMPORTANT:
     * DO NOT ADD:
     *
     * window.append
     *
     * The operator log function ends here.
     */


    window.appendOperatorLog =
        appendOperatorLog;
/* ========================================================
       ENVIRONMENT DISPLAY
    ======================================================== */

    function updateEnvironment(result) {

        const environment =
            result.environment;

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

        setText(
            "environmentStress",
            Number(
                environment.environmentalStress
            ).toFixed(2)
        );

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function updateSystem(result) {

        setText(
            "systemStatus",
            result.systemStatus
        );

        setText(
            "riskLevel",
            result.risk
        );

        setText(
            "environmentStatus",
            "ACTIVE / SIMULATED"
        );

        setText(
            "primaryStatus",
            result.primary.mode
        );

        setText(
            "secondaryStatus",
            result.secondary.mode
        );

        setText(
            "stabilizerStatus",
            result.stabilizer.mode
        );

        setText(
            "humanAuthority",
            result.human.status
        );

    }


    /* ========================================================
       RESILIENCE ALERT
    ======================================================== */

    function updateAlert(result) {

        let level =
            "NORMAL";

        let change =
            "STABLE";

        let state =
            "MONITORING";

        let attention =
            "NOT REQUIRED";


        if (
            result.risk ===
            "MEDIUM"
        ) {

            level =
                "ADVISORY";

            change =
                "ELEVATED";

            state =
                "PREVENTIVE MONITORING";

            attention =
                "OPERATOR ATTENTION";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            level =
                "HIGH";

            change =
                "SIGNIFICANT";

            state =
                "HUMAN REVIEW";

            attention =
                "REVIEW REQUIRED";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            level =
                "CRITICAL";

            change =
                "CRITICAL";

            state =
                "CRITICAL HUMAN REVIEW";

            attention =
                "IMMEDIATE HUMAN REVIEW";

        }


        setText(
            "resilienceAlertLevel",
            level
        );

        setText(
            "environmentalChange",
            change
        );

        setText(
            "resilienceState",
            state
        );

        setText(
            "operatorAttention",
            attention
        );

    }


    /* ========================================================
       STABILIZER DISPLAY
    ======================================================== */

    function updateStabilizer(result) {

        const stabilizer =
            result.stabilizer;

        if (!stabilizer) {
            return;
        }


        setText(
            "stabilizerMode",
            stabilizer.mode
        );

        setText(
            "stabilizerSource",
            stabilizer.source
        );

        setText(
            "stabilizerOutput",
            Number(
                stabilizer.finalOutput
            ).toFixed(2)
        );

        setText(
            "stabilizerState",
            stabilizer.status
        );

    }


    /* ========================================================
       OPERATOR DECISION-SUPPORT DISPLAY
    ======================================================== */

    function updateRecommendation(result) {

        const action =
            result.recommendedAction;

        if (!action) {
            return;
        }


        setText(
            "recommendedAction",
            action.primaryRecommendation
        );

        setText(
            "actionUrgency",
            action.urgency
        );

        setText(
            "responseMode",
            action.responseMode
        );

        setText(
            "actionRationale",
            action.rationale
        );


        const list =
            el(
                "recommendedActions"
            );

        if (!list) {
            return;
        }


        list.innerHTML =
            "";


        const recommendations =
            Array.isArray(
                action.recommendedActions
            )
                ? action.recommendedActions
                : [];


        recommendations.forEach(
            function (recommendation) {

                const item =
                    document.createElement(
                        "li"
                    );

                item.textContent =
                    recommendation;

                list.appendChild(
                    item
                );

            }
        );

    }


    /* ========================================================
       DP SIMULATION RESULT
    ======================================================== */

    function updateSimulation(result) {

        const state =
            result.updatedState;

        if (!state) {
            return;
        }


        setText(
            "dpSimulationStatus",
            "SIMULATION COMPLETE"
        );

        setText(
            "positionError",
            Number(
                state.positionError
            ).toFixed(3)
        );

        setText(
            "simulatedCommand",
            Number(
                state.simulatedCommand
            ).toFixed(2)
        );

        setText(
            "stabilityIndex",
            Number(
                state.stabilityIndex
            ).toFixed(2)
        );


        setText(
            "dpSimulationAssessment",
            "Simulation processed through Environmental → Primary AI → Secondary AI → Stabilizer → Human-in-the-Loop decision-support layers."
        );

    }
/* ========================================================
       GOLDEN-RULE-STYLE SIMULATION PIPELINE DISPLAY
    ======================================================== */

    function updatePipeline(result) {

        setText(
            "pipelineEnvironment",
            "OBSERVED"
        );

        setText(
            "pipelineVerify",
            "VERIFIED"
        );

        setText(
            "pipelineAssess",
            result.risk
        );

        setText(
            "pipelineDecide",
            result.recommendedAction
                ? result.recommendedAction.primaryRecommendation
                : "NO DECISION"
        );

        setText(
            "pipelineAct",
            "HUMAN REVIEW / SIMULATED"
        );

        setText(
            "pipelineUpdate",
            "STATE UPDATED"
        );

    }


    /* ========================================================
       AUDIT LOG DISPLAY
    ======================================================== */

    function updateAudit(result) {

        const audit =
            result.audit || {};


        const environment =
            result.environment || {};


        const primary =
            result.primary || {};


        const secondary =
            result.secondary || {};


        const stabilizer =
            result.stabilizer || {};


        const text = [

            "SYSTEM EVENT LOG",

            "------------------------------------------------------------",

            "ENGINE: " +
                result.engineName,

            "VERSION: " +
                result.version,

            "MODE: " +
                result.mode,

            "",

            "ENVIRONMENTAL INPUTS:",

            "  WIND: " +
                environment.wind,

            "  CURRENT: " +
                environment.current,

            "  WAVE: " +
                environment.wave,

            "  TIDAL: " +
                environment.tidal,

            "",

            "ENVIRONMENTAL STRESS: " +
                Number(
                    environment.environmentalStress || 0
                ).toFixed(2),

            "RISK: " +
                result.risk,

            "",

            "PRIMARY AI: " +
                (primary.mode || "N/A"),

            "SECONDARY AI: " +
                (secondary.mode || "N/A"),

            "STABILIZER: " +
                (stabilizer.mode || "N/A"),

            "",

            "HUMAN AUTHORITY: FINAL",

            "AUTONOMOUS COMMAND: FALSE",

            "OPERATIONAL AUTHORITY: FALSE",

            "",

            "TIMESTAMP: " +
                (audit.timestamp || "N/A")

        ].join(
            "\n"
        );


        setText(
            "auditLog",
            text
        );

    }


    /* ========================================================
       COMPLETE RESULT RENDER
    ======================================================== */

    function renderResult(result) {

        if (!result) {
            return;
        }


        updateEnvironment(
            result
        );

        updateSystem(
            result
        );

        updateAlert(
            result
        );

        updateStabilizer(
            result
        );

        updateRecommendation(
            result
        );

        updateSimulation(
            result
        );

        updatePipeline(
            result
        );

        updateAudit(
            result
        );

    }


    /* ========================================================
       MAIN DP SIMULATION FUNCTION
    ======================================================== */

    window.runSimulation =
        function () {

            try {

                /*
                 * Confirm that the simulation engine exists.
                 */

                if (
                    !window.DPSimulationEngine ||
                    typeof
                    window.DPSimulationEngine.run !==
                    "function"
                ) {

                    setText(
                        "dpSimulationStatus",
                        "ENGINE NOT CONNECTED"
                    );

                    appendOperatorLog(
                        "ERROR — DP simulation engine unavailable."
                    );

                    return null;
                }


                /*
                 * IMPORTANT:
                 *
                 * Read the environmental controls AFTER
                 * the scenario has been applied.
                 *
                 * This is what ensures CRITICAL WEATHER,
                 * HEAVY WEATHER, CURRENT SURGE, etc.
                 * are actually passed to the engine.
                 */

                const inputs =
                    readDPInputs();


                appendOperatorLog(

                    "SIMULATION START — " +

                    "Wind=" +
                    inputs.wind +

                    " Current=" +
                    inputs.current +

                    " Wave=" +
                    inputs.wave +

                    " Tidal=" +
                    inputs.tidal

                );


                /*
                 * Run deterministic simulation engine.
                 */

                const result =
                    window.DPSimulationEngine.run(
                        inputs
                    );


                if (!result) {

                    appendOperatorLog(
                        "ERROR — DP engine returned no result."
                    );

                    setText(
                        "dpSimulationStatus",
                        "SIMULATION ERROR"
                    );

                    return null;
                }


                /*
                 * Render complete result.
                 */

                renderResult(
                    result
                );


                /*
                 * Record completion.
                 */

                appendOperatorLog(

                    "SIMULATION COMPLETE — " +

                    "Stress=" +

                    Number(
                        result.environment
                            .environmentalStress
                    ).toFixed(2) +

                    " Risk=" +

                    result.risk

                );


                /*
                 * Record decision-support recommendation.
                 */

                if (
                    result.recommendedAction
                ) {

                    appendOperatorLog(

                        "RECOMMENDATION — " +

                        result
                            .recommendedAction
                            .primaryRecommendation

                    );

                }


                return result;


            } catch (error) {

                console.error(
                    "DP simulation error:",
                    error
                );


                setText(
                    "dpSimulationStatus",
                    "SIMULATION ERROR"
                );


                appendOperatorLog(
                    "ERROR — DP simulation execution failed."
                );


                return null;

            }

        };
/* ========================================================
       RESET COCKPIT
    ======================================================== */

    window.resetDPCockpit =
        function () {

            const defaults = {

                wind:
                    DEFAULT_INPUTS.wind,

                current:
                    DEFAULT_INPUTS.current,

                wave:
                    DEFAULT_INPUTS.wave,

                tidal:
                    DEFAULT_INPUTS.tidal

            };


            /*
             * Restore the actual environmental controls.
             */

            Object.keys(
                defaults
            ).forEach(
                function (key) {

                    setInputValue(
                        key,
                        defaults[key]
                    );

                }
            );


            window.currentDPScenario =
                "RESET";


            /*
             * Restore visible cockpit state.
             */

            setText(
                "scenarioName",
                "RESET / STANDBY"
            );

            setText(
                "scenarioDescription",
                "Cockpit returned to standby baseline."
            );

            setText(
                "dpSimulationStatus",
                "SYSTEM READY"
            );

            setText(
                "systemStatus",
                "SYSTEM READY"
            );

            setText(
                "riskLevel",
                "NORMAL"
            );

            setText(
                "environmentStatus",
                "STANDBY"
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
                "humanAuthority",
                "AVAILABLE"
            );


            /*
             * Restore resilience alert.
             */

            setText(
                "resilienceAlertLevel",
                "NORMAL"
            );

            setText(
                "environmentalChange",
                "STABLE"
            );

            setText(
                "resilienceState",
                "MONITORING"
            );

            setText(
                "operatorAttention",
                "NOT REQUIRED"
            );


            /*
             * Restore stabilizer display.
             */

            setText(
                "stabilizerMode",
                "STANDBY"
            );

            setText(
                "stabilizerSource",
                "STANDBY"
            );

            setText(
                "stabilizerOutput",
                "0"
            );

            setText(
                "stabilizerState",
                "STANDBY"
            );


            /*
             * Restore operator decision-support display.
             */

            setText(
                "recommendedAction",
                "NO SIMULATION RUN"
            );

            setText(
                "actionUrgency",
                "LOW"
            );

            setText(
                "responseMode",
                "MONITOR"
            );

            setText(
                "actionRationale",
                "Waiting for simulated environmental input."
            );


            /*
             * Restore simulation indicators.
             */

            setText(
                "positionError",
                "0"
            );

            setText(
                "simulatedCommand",
                "0"
            );

            setText(
                "stabilityIndex",
                "100"
            );


            const actions =
                el(
                    "recommendedActions"
                );

            if (actions) {

                actions.innerHTML =
                    "";

            }


            /*
             * Update visible environmental values.
             */

            setText(
                "windValue",
                DEFAULT_INPUTS.wind
            );

            setText(
                "currentValue",
                DEFAULT_INPUTS.current
            );

            setText(
                "waveValue",
                DEFAULT_INPUTS.wave
            );

            setText(
                "tidalValue",
                DEFAULT_INPUTS.tidal
            );

            setText(
                "environmentStress",
                "0.00"
            );


            appendOperatorLog(
                "SYSTEM RESET — returned to standby baseline."
            );

        };


    /* ========================================================
       SCENARIO BUTTON CONNECTION
    ======================================================== */

    function connectScenarioButtons() {

        const scenarios = {

            normalScenario:
                "NORMAL",

            moderateWeatherScenario:
                "MODERATE_WEATHER",

            heavyWeatherScenario:
                "HEAVY_WEATHER",

            criticalScenario:
                "CRITICAL_WEATHER",

            currentSurgeScenario:
                "CURRENT_SURGE",

            heavySeaStateScenario:
                "HEAVY_SEA_STATE",

            windGustScenario:
                "WIND_GUST_EVENT",

            combinedDisturbanceScenario:
                "COMBINED_DISTURBANCE"

        };


        Object.keys(
            scenarios
        ).forEach(
            function (
                functionName
            ) {

                window[
                    functionName
                ] =
                    function () {

                        const scenarioName =
                            scenarios[
                                functionName
                            ];


                        const applied =
                            applyDPScenario(
                                scenarioName
                            );


                        if (!applied) {

                            appendOperatorLog(

                                "ERROR — Scenario could not be applied: " +

                                scenarioName

                            );

                            return null;

                        }


                        /*
                         * Read the controls again.
                         *
                         * This provides a direct verification
                         * that the scenario actually changed
                         * the environmental input fields.
                         */

                        const inputs =
                            readDPInputs();


                        appendOperatorLog(

                            "SCENARIO APPLIED — " +

                            scenarioName +

                            " | Wind=" +

                            inputs.wind +

                            " Current=" +

                            inputs.current +

                            " Wave=" +

                            inputs.wave +

                            " Tidal=" +

                            inputs.tidal

                        );


                        /*
                         * Execute the simulation using the
                         * newly applied environmental values.
                         */

                        return window.runSimulation();

                    };

            }
        );


        /*
         * Random scenario remains available.
         */

        window.randomScenario =
            randomScenario;

    }


    /* ========================================================
       BUTTON CONNECTION
    ======================================================== */

    function connectControls() {

        const runButton =
            el(
                "runSimulation"
            );


        if (runButton) {

            runButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.runSimulation();

                }
            );

        }


        const resetButton =
            el(
                "resetSimulation"
            );


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.resetDPCockpit();

                }
            );

        }

    }


    /* ========================================================
       ENGINE CONNECTION VALIDATION
    ======================================================== */

    function validateConnection() {

        if (
            !window.DPSimulationEngine ||
            typeof
            window.DPSimulationEngine.validate !==
            "function"
        ) {

            setText(
                "engineStatus",
                "ENGINE NOT CONNECTED"
            );

            appendOperatorLog(
                "DP ENGINE NOT CONNECTED."
            );

            return false;

        }


        const valid =
            window.DPSimulationEngine
                .validate();


        setText(
            "engineStatus",
            valid
                ? "ONLINE / VALIDATED"
                : "VALIDATION FAILED"
        );


        appendOperatorLog(

            valid

                ? "DP ENGINE CONNECTED — ONLINE / VALIDATED."

                : "DP ENGINE VALIDATION FAILED."

        );


        return valid;

    }


    /* ========================================================
       STARTUP
    ======================================================== */

    function initialiseCockpit() {

        connectScenarioButtons();

        connectControls();

        validateConnection();


        /*
         * Display initial environmental values.
         */

        setText(
            "windValue",
            DEFAULT_INPUTS.wind
        );

        setText(
            "currentValue",
            DEFAULT_INPUTS.current
        );

        setText(
            "waveValue",
            DEFAULT_INPUTS.wave
        );

        setText(
            "tidalValue",
            DEFAULT_INPUTS.tidal
        );


        setText(
            "environmentStatus",
            "STANDBY"
        );


        appendOperatorLog(
            "DP RESILIENCE COCKPIT — WIRING INITIALISED."
        );

    }


    /* ========================================================
       DOM READY
    ======================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseCockpit
        );

    } else {

        initialiseCockpit();

    }


    /* ========================================================
       PUBLIC COCKPIT API
    ======================================================== */

    window.DPCockpit =
        {

            version:
                VERSION,

            scenarios:
                SCENARIOS,

            applyScenario:
                applyDPScenario,

            runScenario:
                runDPScenario,

            readInputs:
                readDPInputs,

            reset:
                window.resetDPCockpit,

            run:
                window.runSimulation

        };


    /* ========================================================
       FILE READY
    ======================================================== */

    console.log(
        "SEXTANT PROTOCOL DP COCKPIT — READY"
    );

    console.log(
        "VERSION:",
        VERSION
    );

    console.log(
        "MODE: SIMULATION ONLY"
    );


})();
