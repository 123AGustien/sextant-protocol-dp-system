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
         * Trigger input/change events so any existing
         * range-slider display code also updates.
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
         * IMPORTANT:
         *
         * These four assignments are the actual connection
         * between the scenario button and the environmental
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
         * Update common slider/value displays if present.
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
       SCENARIO EXECUTION
    ======================================================== */

    function runDPScenario(
        scenarioName
    ) {

        const applied =
            applyDPScenario(
                scenarioName
            );

        if (!applied) {
            return null;
        }


        appendOperatorLog(
            "SCENARIO SELECTED — " +
            scenarioName +
            " | Wind=" +
            SCENARIOS[scenarioName].wind +
            " Current=" +
            SCENARIOS[scenarioName].current +
            " Wave=" +
            SCENARIOS[scenarioName].wave +
            " Tidal=" +
            SCENARIOS[scenarioName].tidal
        );


        /*
         * Run the actual simulation using the newly
         * applied values.
         */

        return window.runSimulation();

    }


    /* ========================================================
       CONVENIENCE SCENARIO FUNCTIONS
    ======================================================== */

    window.normalScenario =
        function () {

            return runDPScenario(
                "NORMAL"
            );

        };


    window.moderateWeatherScenario =
        function () {

            return runDPScenario(
                "MODERATE_WEATHER"
            );

        };


    window.heavyWeatherScenario =
        function () {

            return runDPScenario(
                "HEAVY_WEATHER"
            );

        };


    window.criticalScenario =
        function () {

            return runDPScenario(
                "CRITICAL_WEATHER"
            );

        };


    window.currentSurgeScenario =
        function () {

            return runDPScenario(
                "CURRENT_SURGE"
            );

        };


    window.heavySeaStateScenario =
        function () {

            return runDPScenario(
                "HEAVY_SEA_STATE"
            );

        };


    window.windGustScenario =
        function () {

            return runDPScenario(
                "WIND_GUST_EVENT"
            );

        };


    window.combinedDisturbanceScenario =
        function () {

            return runDPScenario(
                "COMBINED_DISTURBANCE"
            );

        };


    /* ========================================================
       RANDOM SCENARIO
    ======================================================== */

    function randomScenario() {

        const values = {

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

        };


        setInputValue(
            "wind",
            values.wind
        );

        setInputValue(
            "current",
            values.current
        );

        setInputValue(
            "wave",
            values.wave
        );

        setInputValue(
            "tidal",
            values.tidal
        );


        setText(
            "windValue",
            values.wind
        );

        setText(
            "currentValue",
            values.current
        );

        setText(
            "waveValue",
            values.wave
        );

        setText(
            "tidalValue",
            values.tidal
        );


        window.currentDPScenario =
            "RANDOM";


        appendOperatorLog(
            "RANDOM SCENARIO — " +
            "Wind=" +
            values.wind +
            " Current=" +
            values.current +
            " Wave=" +
            values.wave +
            " Tidal=" +
            values.tidal
        );


        if (
            typeof window.runSimulation ===
            "function"
        ) {

            return window.runSimulation();

        }


        return null;

    }


    window.randomScenario =
        randomScenario;


    /* ========================================================
       SCENARIO LOOKUP
    ======================================================== */

    window.getDPScenario =
        function (
            scenarioName
        ) {

            return (
                SCENARIOS[
                    scenarioName
                ] ||
                null
            );

        };


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


    window.append