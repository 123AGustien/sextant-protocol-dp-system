/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT

   FILE: dp_cockpit.js
   VERSION: 2.0.0

   PURPOSE:
   Browser cockpit wiring for the deterministic DP
   simulation research engine.

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
   SIMULATED DP ACTION / RECOMMENDATION

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
        "2.0.0";


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
                "Normal simulated environmental conditions.",

            wind: 20,
            current: 15,
            wave: 20,
            tidal: 15

        },


        MODERATE_WEATHER: {

            name:
                "MODERATE WEATHER",

            description:
                "Moderate simulated environmental disturbance.",

            wind: 45,
            current: 40,
            wave: 50,
            tidal: 35

        },


        HEAVY_WEATHER: {

            name:
                "HEAVY WEATHER",

            description:
                "High simulated environmental loading.",

            wind: 70,
            current: 65,
            wave: 75,
            tidal: 60

        },


        CRITICAL_WEATHER: {

            name:
                "CRITICAL WEATHER",

            description:
                "Extreme simulated environmental disturbance.",

            wind: 95,
            current: 90,
            wave: 95,
            tidal: 85

        },


        CURRENT_SURGE: {

            name:
                "CURRENT SURGE",

            description:
                "High simulated current loading.",

            wind: 40,
            current: 90,
            wave: 45,
            tidal: 70

        },


        HEAVY_SEA_STATE: {

            name:
                "HEAVY SEA STATE",

            description:
                "High simulated wave loading.",

            wind: 65,
            current: 45,
            wave: 90,
            tidal: 50

        },


        WIND_GUST_EVENT: {

            name:
                "WIND GUST EVENT",

            description:
                "High simulated wind disturbance.",

            wind: 90,
            current: 40,
            wave: 50,
            tidal: 35

        },


        COMBINED_DISTURBANCE: {

            name:
                "COMBINED DISTURBANCE",

            description:
                "Multiple simultaneous simulated environmental disturbances.",

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
                "Rapidly changing simulated environmental conditions.",

            wind: 30,
            current: 85,
            wave: 40,
            tidal: 90

        }

    };


    /* ========================================================
       EXPORT SCENARIO LIBRARY
    ======================================================== */

    window.DP_SCENARIOS =
        SCENARIOS;


    /* ========================================================
       INITIAL SCENARIO STATE
    ======================================================== */

    window.currentDPScenario =
        "NORMAL";


    /*
     * Part 1 complete.
     *
     * Part 2 will add:
     *
     * - DOM helpers
     * - environmental input reading
     * - environmental input updating
     * - slider/input event synchronization
     *
     * Do not add another (function () {}) wrapper.
     */
/* ========================================================
       DOM HELPER
    ======================================================== */

    function el(id) {

        return document.getElementById(id);

    }


    /* ========================================================
       TEXT DISPLAY HELPER
    ======================================================== */

    function setText(
        id,
        value
    ) {

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
       SET ENVIRONMENTAL INPUT
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
         * Notify any HTML range-slider
         * display handlers.
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
             * Compatibility fallback.
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
       UPDATE ENVIRONMENTAL VALUE DISPLAYS
    ======================================================== */

    function updateInputDisplays(
        values
    ) {

        if (!values) {
            return;
        }


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

    }


    /* ========================================================
       APPLY INPUT VALUES
    ======================================================== */

    function applyInputValues(
        values
    ) {

        if (!values) {
            return false;
        }


        const wind =
            setInputValue(
                "wind",
                values.wind
            );


        const current =
            setInputValue(
                "current",
                values.current
            );


        const wave =
            setInputValue(
                "wave",
                values.wave
            );


        const tidal =
            setInputValue(
                "tidal",
                values.tidal
            );


        const success =
            wind &&
            current &&
            wave &&
            tidal;


        if (success) {

            updateInputDisplays(
                values
            );

        }


        return success;

    }


    /* ========================================================
       PART 2 STATUS
    ======================================================== */

    /*
     * Environmental input wiring established.
     *
     * Scenario buttons will use these functions
     * to change the ACTUAL cockpit controls.
     *
     * This is important:
     *
     * Scenario
     *      ↓
     * HTML input
     *      ↓
     * readDPInputs()
     *      ↓
     * DP Simulation Engine
     *
     * Therefore pressing CRITICAL WEATHER will
     * actually change the simulated environmental
     * values before the engine is executed.
     */
/* ========================================================
       DOM HELPER
    ======================================================== */

    function el(id) {

        return document.getElementById(id);

    }


    /* ========================================================
       TEXT DISPLAY HELPER
    ======================================================== */

    function setText(
        id,
        value
    ) {

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
       SET ENVIRONMENTAL INPUT
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
         * Notify any HTML range-slider
         * display handlers.
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
             * Compatibility fallback.
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
       UPDATE ENVIRONMENTAL VALUE DISPLAYS
    ======================================================== */

    function updateInputDisplays(
        values
    ) {

        if (!values) {
            return;
        }


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

    }


    /* ========================================================
       APPLY INPUT VALUES
    ======================================================== */

    function applyInputValues(
        values
    ) {

        if (!values) {
            return false;
        }


        const wind =
            setInputValue(
                "wind",
                values.wind
            );


        const current =
            setInputValue(
                "current",
                values.current
            );


        const wave =
            setInputValue(
                "wave",
                values.wave
            );


        const tidal =
            setInputValue(
                "tidal",
                values.tidal
            );


        const success =
            wind &&
            current &&
            wave &&
            tidal;


        if (success) {

            updateInputDisplays(
                values
            );

        }


        return success;

    }


    /* ========================================================
       PART 2 STATUS
    ======================================================== */

    /*
     * Environmental input wiring established.
     *
     * Scenario buttons will use these functions
     * to change the ACTUAL cockpit controls.
     *
     * This is important:
     *
     * Scenario
     *      ↓
     * HTML input
     *      ↓
     * readDPInputs()
     *      ↓
     * DP Simulation Engine
     *
     * Therefore pressing CRITICAL WEATHER will
     * actually change the simulated environmental
     * values before the engine is executed.
     */
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


        /*
         * Support both:
         *
         * <textarea>
         *
         * and:
         *
         * <div>
         * <section>
         * <ul>
         * etc.
         */

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


        /*
         * Keep the newest event visible.
         */

        log.scrollTop =
            log.scrollHeight;

    }


    /*
     * Make the logger available to other
     * cockpit modules if required.
     */

    window.appendOperatorLog =
        appendOperatorLog;


    /* ========================================================
       ENVIRONMENT DISPLAY
    ======================================================== */

    function updateEnvironment(
        result
    ) {

        if (
            !result ||
            !result.environment
        ) {

            return;

        }


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


        if (
            typeof environment
                .environmentalStress ===
            "number"
        ) {

            setText(
                "environmentStress",
                environment
                    .environmentalStress
                    .toFixed(2)
            );

        }

    }


    /* ========================================================
       SYSTEM STATUS DISPLAY
    ======================================================== */

    function updateSystem(
        result
    ) {

        if (!result) {
            return;
        }


        setText(
            "systemStatus",
            result.systemStatus ||
            "SYSTEM ACTIVE"
        );


        setText(
            "riskLevel",
            result.risk ||
            "UNKNOWN"
        );


        setText(
            "environmentStatus",
            "ACTIVE / SIMULATED"
        );


        if (result.primary) {

            setText(
                "primaryStatus",
                result.primary.mode
            );

        }


        if (result.secondary) {

            setText(
                "secondaryStatus",
                result.secondary.mode
            );

        }


        if (result.stabilizer) {

            setText(
                "stabilizerStatus",
                result.stabilizer.mode
            );

        }


        if (result.human) {

            setText(
                "humanAuthority",
                result.human.status
            );

        } else {

            setText(
                "humanAuthority",
                "AVAILABLE / FINAL"
            );

        }

    }


    /* ========================================================
       ENVIRONMENTAL CHANGE STATUS
    ======================================================== */

    function determineEnvironmentalChange(
        result
    ) {

        if (
            !result ||
            !result.environment
        ) {

            return "STABLE";

        }


        const stress =
            Number(
                result.environment
                    .environmentalStress
            );


        if (
            !Number.isFinite(stress)
        ) {

            return "STABLE";

        }


        if (stress >= 80) {

            return "CRITICAL";

        }


        if (stress >= 60) {

            return "SIGNIFICANT";

        }


        if (stress >= 35) {

            return "ELEVATED";

        }


        return "STABLE";

    }


    /* ========================================================
       PART 4 STATUS
    ======================================================== */

    /*
     * Operator logging and environmental/system
     * display rendering are now connected.
     *
     * Part 5 will add:
     *
     * - Resilience alert logic
     * - Stabilizer display
     * - DP operator recommendations
     * - OFF-DP / anchoring decision-support
     * - surveyed-seabed condition handling
     *
     * IMPORTANT:
     *
     * OFF-DP / ANCHOR will remain a simulated
     * recommendation requiring human authority.
     *
     * The cockpit will NOT issue a real command.
     */
    /* ========================================================
       ENVIRONMENT DISPLAY
    ======================================================== */

    function updateEnvironment(result) {

        if (!result || !result.environment) {
            return;
        }

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


        if (
            typeof environment.environmentalStress ===
            "number"
        ) {

            setText(
                "environmentStress",
                environment.environmentalStress.toFixed(2)
            );

        }

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function updateSystem(result) {

        if (!result) {
            return;
        }


        setText(
            "systemStatus",
            result.systemStatus ||
            "SYSTEM STABLE"
        );


        setText(
            "riskLevel",
            result.risk ||
            "NORMAL"
        );


        setText(
            "environmentStatus",
            "ACTIVE / SIMULATED"
        );


        if (result.primary) {

            setText(
                "primaryStatus",
                result.primary.mode
            );

        }


        if (result.secondary) {

            setText(
                "secondaryStatus",
                result.secondary.mode
            );

        }


        if (result.stabilizer) {

            setText(
                "stabilizerStatus",
                result.stabilizer.mode
            );

        }


        if (result.human) {

            setText(
                "humanAuthority",
                result.human.status ||
                "AVAILABLE"
            );

        }

    }


    /* ========================================================
       RESILIENCE ALERT
    ======================================================== */

    function updateAlert(result) {

        if (!result) {
            return;
        }


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

        if (
            !result ||
            !result.stabilizer
        ) {
            return;
        }


        const stabilizer =
            result.stabilizer;


        setText(
            "stabilizerMode",
            stabilizer.mode
        );


        setText(
            "stabilizerSource",
            stabilizer.source
        );


        if (
            typeof stabilizer.finalOutput ===
            "number"
        ) {

            setText(
                "stabilizerOutput",
                stabilizer.finalOutput.toFixed(2)
            );

        }


        setText(
            "stabilizerState",
            stabilizer.status
        );

    }


    /* ========================================================
       OPERATOR DECISION-SUPPORT DISPLAY
    ======================================================== */

    function updateRecommendation(result) {

        if (
            !result ||
            !result.recommendedAction
        ) {
            return;
        }


        const action =
            result.recommendedAction;


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


        if (
            Array.isArray(
                action.recommendedActions
            )
        ) {

            action.recommendedActions.forEach(
                function (
                    recommendation
                ) {

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

    }