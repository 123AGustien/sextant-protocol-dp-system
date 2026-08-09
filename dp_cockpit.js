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
    /* ========================================================
       OPERATOR CONTINGENCY DISPLAY
    ======================================================== */

    function updateContingency(result) {

        if (
            !result ||
            !result.recommendedAction
        ) {
            return;
        }


        const action =
            result.recommendedAction;


        /*
         * Default state.
         */

        let offDPStatus =
            "NOT INDICATED";

        let anchorStatus =
            "NOT INDICATED";


        /*
         * Determine simulated contingency
         * recommendations from the risk level.
         *
         * IMPORTANT:
         *
         * These are decision-support indications only.
         *
         * The simulator does NOT:
         *
         * - switch off DP;
         * - control propulsion;
         * - steer the vessel;
         * - deploy an anchor;
         * - command deck machinery.
         */


        if (
            result.risk ===
            "MEDIUM"
        ) {

            offDPStatus =
                "CONTINGENCY PREPARATION";

            anchorStatus =
                "NOT CURRENTLY INDICATED";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            offDPStatus =
                "HUMAN REVIEW — PREPARE APPROVED DEGRADED MODE";

            anchorStatus =
                "CONSIDER ONLY AFTER OPERATIONAL ASSESSMENT";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            offDPStatus =
                "IMMEDIATE HUMAN REVIEW — ASSESS WHETHER OFF-DP IS APPROPRIATE";

            anchorStatus =
                "ANCHORING MAY BE CONSIDERED SUBJECT TO HUMAN CONFIRMATION AND SUITABILITY";

        }


        /*
         * Render OFF-DP decision-support state.
         */

        setText(
            "offDPRecommendation",
            offDPStatus
        );


        /*
         * Render anchoring decision-support state.
         */

        setText(
            "anchorRecommendation",
            anchorStatus
        );


        /*
         * Render surveyed-seabed status.
         *
         * This is intentionally conservative.
         *
         * The simulator does not assume that the
         * seabed is surveyed merely because anchoring
         * has been considered.
         */

        const surveyedSeabed =
            el(
                "surveyedSeabed"
            );


        if (
            surveyedSeabed
        ) {

            if (
                surveyedSeabed.checked
            ) {

                setText(
                    "surveyedSeabedStatus",
                    "SURVEYED SEABED — HUMAN VERIFICATION REQUIRED"
                );

            } else {

                setText(
                    "surveyedSeabedStatus",
                    "SURVEYED SEABED NOT CONFIRMED"
                );

            }

        }


        /*
         * Explicit safety boundary.
         */

        setText(
            "contingencyAuthority",
            "HUMAN AUTHORITY — FINAL"
        );

    }


    /* ========================================================
       SIMULATED DP ACTION DISPLAY
    ======================================================== */

    function updateSimulatedAction(result) {

        if (
            !result ||
            !result.simulatedAction
        ) {
            return;
        }


        const action =
            result.simulatedAction;


        setText(
            "simulatedDPMode",
            action.mode ||
            "SIMULATED DP RESPONSE"
        );


        setText(
            "simulatedDPCommand",
            typeof action.simulatedCommand ===
            "number"
                ? action.simulatedCommand.toFixed(2)
                : "0.00"
        );


        setText(
            "simulatedStabilizerOutput",
            typeof action.stabilizerOutput ===
            "number"
                ? action.stabilizerOutput.toFixed(2)
                : "0.00"
        );


        setText(
            "operationalCommandStatus",
            action.operationalCommand ===
            true
                ? "UNEXPECTED STATE"
                : "SIMULATION ONLY"
        );


        setText(
            "realVesselConnection",
            action.realVesselConnection ===
            true
                ? "UNEXPECTED CONNECTION"
                : "NOT CONNECTED"
        );

    }


    /* ========================================================
       SIMULATED VESSEL STATE DISPLAY
    ======================================================== */

    function updateSimulatedState(result) {

        if (
            !result ||
            !result.updatedState
        ) {
            return;
        }


        const state =
            result.updatedState;


        setText(
            "positionError",
            typeof state.positionError ===
            "number"
                ? state.positionError.toFixed(2)
                : "0.00"
        );


        setText(
            "stabilityIndex",
            typeof state.stabilityIndex ===
            "number"
                ? state.stabilityIndex.toFixed(2)
                : "0.00"
        );


        setText(
            "simulatedStateRisk",
            state.risk ||
            "UNKNOWN"
        );


        setText(
            "simulatedStateStatus",
            state.status ||
            "SIMULATED"
        );

    }


    /* ========================================================
       OPERATOR NOTIFICATION
    ======================================================== */

    function updateOperatorNotification(
        result
    ) {

        if (!result) {
            return;
        }


        let message =
            "SYSTEM READY. CONTINUOUS SIMULATED MONITORING ACTIVE. NO OPERATOR INTERVENTION REQUESTED.";


        if (
            result.risk ===
            "MEDIUM"
        ) {

            message =
                "ADVISORY: ENVIRONMENTAL LOADING ELEVATED. INCREASED OPERATOR ATTENTION RECOMMENDED.";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            message =
                "HIGH ALERT: HUMAN REVIEW REQUIRED. PREPARE APPROVED DEGRADED DP CONTINGENCY PROCEDURES.";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            message =
                "CRITICAL ALERT: IMMEDIATE HUMAN REVIEW REQUIRED. ASSESS CONTINUED DP OPERATION AND APPROVED CONTINGENCY OPTIONS.";

        }


        setText(
            "operatorNotification",
            message
        );


        /*
         * Also write the event to the
         * operator event log.
         */

        appendOperatorLog(
            message
        );

    }


    /* ========================================================
       RESPONSE INDICATORS
    ======================================================== */

    function updateResponseIndicators(
        result
    ) {

        if (!result) {
            return;
        }


        let audible =
            "STANDBY";

        let attention =
            "STANDBY";

        let responseWindow =
            "NOT ACTIVE";

        let humanDecision =
            "AVAILABLE";


        if (
            result.risk ===
            "MEDIUM"
        ) {

            audible =
                "ADVISORY";

            attention =
                "ATTENTION";

            responseWindow =
                "ACTIVE";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            audible =
                "HIGH ALERT";

            attention =
                "REQUIRED";

            responseWindow =
                "ACTIVE";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            audible =
                "CRITICAL ALERT";

            attention =
                "IMMEDIATE";

            responseWindow =
                "ACTIVE";

        }


        setText(
            "audibleAlert",
            audible
        );


        setText(
            "attentionIndicator",
            attention
        );


        setText(
            "responseWindow",
            responseWindow
        );


        setText(
            "humanDecision",
            humanDecision
        );

    }


    /* ========================================================
       RESILIENCE AUDIT DISPLAY
    ======================================================== */

    function updateAudit(result) {

        if (
            !result ||
            !result.audit
        ) {
            return;
        }


        const audit =
            result.audit;


        const auditLog =
            el(
                "resilienceAuditLog"
            );


        if (!auditLog) {
            return;
        }


        const lines = [

            "SYSTEM EVENT LOG",

            "----------------------------------------",

            "TIMESTAMP: " +
                audit.timestamp,

            "ENGINE: " +
                audit.engine,

            "VERSION: " +
                audit.version,

            "MODE: " +
                audit.mode,

            "ENVIRONMENTAL STRESS: " +
                audit.environmentalStress,

            "RISK: " +
                audit.risk,

            "PRIMARY: " +
                audit.primary,

            "SECONDARY: " +
                audit.secondary,

            "STABILIZER: " +
                audit.stabilizer,

            "RECOMMENDATION: " +
                audit.recommendation,

            "HUMAN AUTHORITY: FINAL",

            "AUTONOMOUS COMMAND: FALSE",

            "OPERATIONAL AUTHORITY: FALSE",

            "----------------------------------------"

        ];


        const text =
            lines.join("\n");


        if (
            auditLog.tagName ===
            "TEXTAREA"
        ) {

            auditLog.value =
                text;

        } else {

            auditLog.textContent =
                text;

        }

    }


    /* ========================================================
       DP SIMULATION ASSESSMENT
    ======================================================== */

    function updateAssessment(result) {

        if (!result) {
            return;
        }


        let assessment =
            "System ready. Select environmental conditions and run the simulated DP assessment.";


        if (
            result.risk ===
            "LOW"
        ) {

            assessment =
                "SIMULATED ASSESSMENT: Environmental loading remains within the normal resilience monitoring range. Continue simulated DP monitoring.";

        }


        if (
            result.risk ===
            "MEDIUM"
        ) {

            assessment =
                "SIMULATED ASSESSMENT: Environmental loading is elevated. Maintain simulated DP operations with increased operator attention and contingency preparation.";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            assessment =
                "SIMULATED ASSESSMENT: High environmental loading detected. Human review is required and approved degraded-operation contingencies should be prepared.";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            assessment =
                "SIMULATED ASSESSMENT: Critical environmental loading detected. Immediate human review is required. Continued DP operation and approved contingency options must be assessed by the authorised operator.";

        }


        setText(
            "dpSimulationAssessment",
            assessment
        );

    }


    /* ========================================================
       PART 5 STATUS
    ======================================================== */

    /*
     * OPERATOR DECISION-SUPPORT PATH:
     *
     * ENVIRONMENT
     *      ↓
     * RISK
     *      ↓
     * PRIMARY AI
     *      ↓
     * SECONDARY AI
     *      ↓
     * STABILIZER
     *      ↓
     * OPERATOR RECOMMENDATION
     *      ↓
     * OFF-DP / ANCHOR CONTINGENCY REVIEW
     *      ↓
     * HUMAN AUTHORITY
     *
     * IMPORTANT:
     *
     * OFF-DP is never executed automatically.
     *
     * ANCHOR is never deployed automatically.
     *
     * The simulator only presents decision-support
     * recommendations for the DP operator / Master.
     *
     * Anchoring consideration requires confirmation
     * that the seabed has been appropriately surveyed
     * and that anchoring is operationally suitable.
     */
    /* ========================================================
       OFF-DP / ANCHORING DECISION-SUPPORT DISPLAY
    ======================================================== */

    function updateContingency(result) {

        if (
            !result ||
            !result.recommendedAction
        ) {
            return;
        }


        const action =
            result.recommendedAction;


        /*
         * Default state.
         */

        setText(
            "offDpRecommendation",
            "NOT INDICATED"
        );


        setText(
            "anchoringRecommendation",
            "NOT INDICATED"
        );


        setText(
            "surveyedSeabedStatus",
            "NOT VERIFIED"
        );


        /*
         * OFF-DP recommendation.
         *
         * This is decision-support only.
         */

        if (
            result.risk === "HIGH" ||
            result.risk === "CRITICAL"
        ) {

            setText(
                "offDpRecommendation",
                "HUMAN REVIEW — CONSIDER APPROVED DEGRADED / OFF-DP CONTINGENCY"
            );

        }


        /*
         * Anchoring recommendation.
         */

        if (
            action.anchoringConsideration
        ) {

            setText(
                "anchoringRecommendation",
                action.anchoringConsideration
            );

        }

    }


    /* ========================================================
       SURVEYED SEABED STATE
    ======================================================== */

    let surveyedSeabedConfirmed =
        false;


    function setSurveyedSeabed(
        confirmed
    ) {

        surveyedSeabedConfirmed =
            Boolean(
                confirmed
            );


        setText(
            "surveyedSeabedStatus",
            surveyedSeabedConfirmed
                ? "CONFIRMED — SIMULATION CONDITION"
                : "NOT VERIFIED"
        );


        appendOperatorLog(
            surveyedSeabedConfirmed
                ? "Simulated surveyed-seabed condition confirmed for decision-support."
                : "Simulated surveyed-seabed condition cleared."
        );


        return surveyedSeabedConfirmed;

    }


    function getSurveyedSeabedState() {

        return surveyedSeabedConfirmed;

    }


    /* ========================================================
       ANCHORING DECISION LOGIC
    ======================================================== */

    function evaluateAnchoringContingency(
        result
    ) {

        if (!result) {

            return {

                indicated:
                    false,

                permittedBySimulation:
                    false,

                reason:
                    "No simulation result available."

            };

        }


        if (
            result.risk !== "HIGH" &&
            result.risk !== "CRITICAL"
        ) {

            return {

                indicated:
                    false,

                permittedBySimulation:
                    false,

                reason:
                    "Environmental risk does not currently indicate anchoring contingency review."

            };

        }


        if (
            !surveyedSeabedConfirmed
        ) {

            return {

                indicated:
                    true,

                permittedBySimulation:
                    false,

                reason:
                    "Anchoring contingency may be reviewed, but surveyed seabed condition has not been confirmed."

            };

        }


        return {

            indicated:
                true,

            permittedBySimulation:
                true,

            reason:
                "Simulated surveyed-seabed condition confirmed. Human assessment of vessel, water depth, holding ground, weather, traffic, equipment, local restrictions and approved procedures remains mandatory."

        };

    }


    /* ========================================================
       SIMULATION RESULT DISPLAY
    ======================================================== */

    function updateSimulationAssessment(
        result
    ) {

        if (!result) {
            return;
        }


        const state =
            result.updatedState ||
            {};


        setText(
            "simulationAssessment",
            result.systemStatus ||
            "SIMULATION COMPLETE"
        );


        setText(
            "positionError",
            Number(
                state.positionError || 0
            ).toFixed(2)
        );


        setText(
            "stabilityIndex",
            Number(
                state.stabilityIndex || 0
            ).toFixed(2)
        );


        if (
            result.simulatedAction
        ) {

            setText(
                "simulatedDPAction",
                result.simulatedAction.mode ||
                "SIMULATED DP RESPONSE"
            );


            setText(
                "simulatedCommand",
                result.simulatedAction
                    .simulatedCommand
            );

        }

    }


    /* ========================================================
       AUDIT DISPLAY
    ======================================================== */

    function updateAudit(
        result
    ) {

        if (
            !result ||
            !result.audit
        ) {

            return;

        }


        const audit =
            result.audit;


        const auditLog =
            el(
                "resilienceAuditLog"
            );


        if (!auditLog) {
            return;
        }


        const lines = [

            "------------------------------------------------------------",

            "DP RESILIENCE SIMULATION AUDIT",

            "TIMESTAMP: " +
                audit.timestamp,

            "ENGINE: " +
                audit.engine,

            "VERSION: " +
                audit.version,

            "MODE: " +
                audit.mode,

            "ENVIRONMENTAL STRESS: " +
                audit.environmentalStress,

            "RISK: " +
                audit.risk,

            "PRIMARY: " +
                audit.primary,

            "SECONDARY: " +
                audit.secondary,

            "STABILIZER: " +
                audit.stabilizer,

            "RECOMMENDATION: " +
                audit.recommendation,

            "HUMAN AUTHORITY: FINAL",

            "AUTONOMOUS COMMAND: FALSE",

            "OPERATIONAL AUTHORITY: FALSE",

            "------------------------------------------------------------"

        ];


        if (
            auditLog.tagName ===
            "TEXTAREA"
        ) {

            auditLog.value =
                lines.join("\n");

        } else {

            auditLog.textContent =
                lines.join("\n");

        }

    }


    /* ========================================================
       COMPLETE RESULT DISPLAY
    ======================================================== */

    function renderSimulationResult(
        result
    ) {

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


        updateContingency(
            result
        );


        updateSimulationAssessment(
            result
        );


        updateAudit(
            result
        );


        const anchoring =
            evaluateAnchoringContingency(
                result
            );


        setText(
            "anchoringDecisionState",
            anchoring.reason
        );


        appendOperatorLog(
            "Simulation completed — Risk: " +
            result.risk +
            " | Stress: " +
            Number(
                result.environment
                    .environmentalStress
            ).toFixed(2)
        );

    }


    /* ========================================================
       RUN DP SIMULATION
    ======================================================== */

    function runDPSimulation() {

        /*
         * Confirm the deterministic simulation
         * engine is available.
         */

        if (
            !window.DPSimulationEngine ||
            typeof window.DPSimulationEngine.run !==
            "function"
        ) {

            console.error(
                "DPSimulationEngine is not available."
            );


            appendOperatorLog(
                "ERROR — DP Simulation Engine unavailable."
            );


            return null;

        }


        /*
         * Read the ACTUAL cockpit controls.
         */

        const inputs =
            readDPInputs();


        /*
         * Execute deterministic simulation.
         */

        const result =
            window.DPSimulationEngine.run(
                inputs
            );


        /*
         * Store result locally.
         */

        window.lastDPSimulation =
            result;


        /*
         * Render complete result.
         */

        renderSimulationResult(
            result
        );


        return result;

    }


    /* ========================================================
       SCENARIO APPLICATION
    ======================================================== */

    function applyScenario(
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


            appendOperatorLog(
                "ERROR — Unknown DP scenario: " +
                scenarioName
            );


            return false;

        }


        const values = {

            wind:
                scenario.wind,

            current:
                scenario.current,

            wave:
                scenario.wave,

            tidal:
                scenario.tidal

        };


        const applied =
            applyInputValues(
                values
            );


        if (!applied) {

            return false;

        }


        window.currentDPScenario =
            scenarioName;


        setText(
            "scenarioName",
            scenario.name
        );


        setText(
            "scenarioDescription",
            scenario.description
        );


        appendOperatorLog(
            "Scenario selected: " +
            scenario.name
        );


        return true;

    }


    /* ========================================================
       RUN SCENARIO
    ======================================================== */

    function runDPScenario(
        scenarioName
    ) {

        const applied =
            applyScenario(
                scenarioName
            );


        if (!applied) {
            return null;
        }


        return runDPSimulation();

    }


    /* ========================================================
       RANDOM ENVIRONMENT
    ======================================================== */

    function randomDPScenario() {

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


        const applied =
            applyInputValues(
                values
            );


        if (!applied) {
            return null;
        }


        window.currentDPScenario =
            "RANDOM";


        setText(
            "scenarioName",
            "RANDOM"
        );


        setText(
            "scenarioDescription",
            "Randomly generated simulated environmental condition."
        );


        appendOperatorLog(
            "Random simulated environmental condition generated."
        );


        return runDPSimulation();

    }


    /* ========================================================
       RESET COCKPIT
    ======================================================== */

    function resetDPCockpit() {

        applyInputValues(
            DEFAULT_INPUTS
        );


        window.currentDPScenario =
            "NORMAL";


        surveyedSeabedConfirmed =
            false;


        setText(
            "scenarioName",
            "NORMAL"
        );


        setText(
            "scenarioDescription",
            SCENARIOS.NORMAL.description
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
            "AVAILABLE / FINAL"
        );


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


        setText(
            "stabilizerMode",
            "STANDBY"
        );


        setText(
            "stabilizerSource",
            "AWAITING SIMULATION"
        );


        setText(
            "stabilizerOutput",
            "0"
        );


        setText(
            "stabilizerState",
            "STANDBY"
        );


        setText(
            "recommendedAction",
            "SYSTEM READY"
        );


        setText(
            "actionUrgency",
            "LOW"
        );


        setText(
            "responseMode",
            "STANDBY"
        );


        setText(
            "actionRationale",
            "Select environmental conditions and run the simulation."
        );


        setText(
            "offDpRecommendation",
            "NOT INDICATED"
        );


        setText(
            "anchoringRecommendation",
            "NOT INDICATED"
        );


        setText(
            "surveyedSeabedStatus",
            "NOT VERIFIED"
        );


        setText(
            "anchoringDecisionState",
            "No simulation result available."
        );


        setText(
            "simulationAssessment",
            "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
        );


        setText(
            "positionError",
            "0.00"
        );


        setText(
            "stabilityIndex",
            "0.00"
        );


        setText(
            "simulatedDPAction",
            "STANDBY"
        );


        setText(
            "simulatedCommand",
            "0"
        );


        const recommendations =
            el(
                "recommendedActions"
            );


        if (recommendations) {

            recommendations.innerHTML =
                "";

        }


        appendOperatorLog(
            "DP resilience cockpit reset."
        );


        return true;

    }


    /* ========================================================
       CONVENIENCE SCENARIO FUNCTIONS
    ======================================================== */

    function normalScenario() {

        return runDPScenario(
            "NORMAL"
        );

    }


    function moderateWeatherScenario() {

        return runDPScenario(
            "MODERATE_WEATHER"
        );

    }


    function heavyWeatherScenario() {

        return runDPScenario(
            "HEAVY_WEATHER"
        );

    }


    function criticalScenario() {

        return runDPScenario(
            "CRITICAL_WEATHER"
        );

    }


    function currentSurgeScenario() {

        return runDPScenario(
            "CURRENT_SURGE"
        );

    }


    function heavySeaStateScenario() {

        return runDPScenario(
            "HEAVY_SEA_STATE"
        );

    }


    function windGustScenario() {

        return runDPScenario(
            "WIND_GUST_EVENT"
        );

    }


    function combinedDisturbanceScenario() {

        return runDPScenario(
            "COMBINED_DISTURBANCE"
        );

    }


    function sensorNoiseScenario() {

        return runDPScenario(
            "SENSOR_NOISE"
        );

    }


    function partialSensorLossScenario() {

        return runDPScenario(
            "PARTIAL_SENSOR_LOSS"
        );

    }


    function rapidTransitionScenario() {

        return runDPScenario(
            "RAPID_TRANSITION"
        );

    }


    /* ========================================================
       BROWSER API
    ======================================================== */

    window.runDPSimulation =
        runDPSimulation;


    window.applyDPScenario =
        applyScenario;


    window.runDPScenario =
        runDPScenario;


    window.randomDPScenario =
        randomDPScenario;


    window.resetDPCockpit =
        resetDPCockpit;


    window.setSurveyedSeabed =
        setSurveyedSeabed;


    window.getSurveyedSeabedState =
        getSurveyedSeabedState;


    window.evaluateAnchoringContingency =
        evaluateAnchoringContingency;


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


    window.sensorNoiseScenario =
        sensorNoiseScenario;


    window.partialSensorLossScenario =
        partialSensorLossScenario;


    window.rapidTransitionScenario =
        rapidTransitionScenario;


    /* ========================================================
       INPUT EVENT WIRING
    ======================================================== */

    function wireEnvironmentalInputs() {

        const inputIds = [

            "wind",
            "current",
            "wave",
            "tidal"

        ];


        inputIds.forEach(
            function (id) {

                const input =
                    el(id);


                if (!input) {
                    return;
                }


                input.addEventListener(
                    "input",
                    function () {

                        setText(
                            id + "Value",
                            input.value
                        );

                    }
                );

            }
        );

    }


    /* ========================================================
       INITIALISE COCKPIT
    ======================================================== */

    function initialiseDPCockpit() {

        wireEnvironmentalInputs();


        applyInputValues(
            DEFAULT_INPUTS
        );


        setText(
            "scenarioName",
            "NORMAL"
        );


        setText(
            "scenarioDescription",
            SCENARIOS.NORMAL.description
        );


        appendOperatorLog(
            "DP cockpit browser wiring initialised."
        );


        /*
         * Validate the simulation engine.
         */

        if (
            window.DPSimulationEngine &&
            typeof window.DPSimulationEngine.validate ===
            "function"
        ) {

            const valid =
                window.DPSimulationEngine
                    .validate();


            appendOperatorLog(
                valid
                    ? "DP Simulation Engine validation: PASS."
                    : "DP Simulation Engine validation: FAIL."
            );

        } else {

            appendOperatorLog(
                "DP Simulation Engine not yet available."
            );

        }


        setText(
            "systemStatus",
            "SYSTEM READY"
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
            initialiseDPCockpit
        );

    } else {

        initialiseDPCockpit();

    }


    /* ========================================================
       VERSION / STATUS
    ======================================================== */

    window.DPCockpit = {

        version:
            VERSION,

        mode:
            "SIMULATION ONLY",

        run:
            runDPSimulation,

        reset:
            resetDPCockpit,

        applyScenario:
            applyScenario,

        runScenario:
            runDPScenario,

        random:
            randomDPScenario,

        setSurveyedSeabed:
            setSurveyedSeabed,

        getSurveyedSeabed:
            getSurveyedSeabedState

    };


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
/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT
   FINAL EXECUTION / WIRING LAYER
   ============================================================ */


/* ============================================================
   SIMULATED ACTION DISPLAY
   ============================================================ */

function updateSimulatedAction(result) {

    if (
        !result ||
        !result.simulatedAction
    ) {
        return;
    }

    const action =
        result.simulatedAction;

    setText(
        "simulatedAction",
        action.mode || "SIMULATED DP RESPONSE"
    );

    setText(
        "simulatedCommand",
        action.simulatedCommand !== undefined
            ? action.simulatedCommand
            : "0"
    );

    setText(
        "operationalCommand",
        action.operationalCommand
            ? "ENABLED"
            : "SIMULATION ONLY"
    );

    setText(
        "realVesselConnection",
        action.realVesselConnection
            ? "CONNECTED"
            : "NOT CONNECTED"
    );

}


/* ============================================================
   SIMULATED VESSEL STATE DISPLAY
   ============================================================ */

function updateSimulatedState(result) {

    if (
        !result ||
        !result.updatedState
    ) {
        return;
    }

    const state =
        result.updatedState;

    setText(
        "positionError",
        Number(state.positionError || 0)
            .toFixed(2)
    );

    setText(
        "stabilityIndex",
        Number(state.stabilityIndex || 0)
            .toFixed(2)
    );

    setText(
        "simulatedRisk",
        state.risk || "UNKNOWN"
    );

    setText(
        "simulatedStateStatus",
        state.status || "SIMULATED"
    );

}


/* ============================================================
   AUDIT DISPLAY
   ============================================================ */

function updateAudit(result) {

    if (
        !result ||
        !result.audit
    ) {
        return;
    }

    const audit =
        result.audit;

    const auditText = [

        "SYSTEM EVENT LOG",
        "------------------------------------------------------------",

        "Timestamp: " +
            (audit.timestamp || ""),

        "Engine: " +
            (audit.engine || ""),

        "Version: " +
            (audit.version || ""),

        "Mode: " +
            (audit.mode || ""),

        "Environmental Stress: " +
            (audit.environmentalStress || ""),

        "Risk: " +
            (audit.risk || ""),

        "Primary: " +
            (audit.primary || ""),

        "Secondary: " +
            (audit.secondary || ""),

        "Stabilizer: " +
            (audit.stabilizer || ""),

        "Recommendation: " +
            (audit.recommendation || ""),

        "Human Authority: FINAL",

        "Autonomous Command: FALSE",

        "Operational Authority: FALSE",

        "------------------------------------------------------------"

    ].join("\n");


    const auditNode =
        el("resilienceAuditLog");


    if (!auditNode) {
        return;
    }


    if (
        auditNode.tagName ===
        "TEXTAREA"
    ) {

        auditNode.value =
            auditText;

        auditNode.scrollTop =
            auditNode.scrollHeight;

        return;

    }


    auditNode.textContent =
        auditText;

}


/* ============================================================
   DP SIMULATION ASSESSMENT DISPLAY
   ============================================================ */

function updateAssessment(result) {

    if (!result) {
        return;
    }


    const action =
        result.recommendedAction;


    const assessmentLines = [

        "DP SIMULATION ASSESSMENT",

        "------------------------------------------------------------",

        "SYSTEM STATUS: " +
            (result.systemStatus || ""),

        "ENVIRONMENTAL STRESS: " +
            Number(
                result.environment.environmentalStress || 0
            ).toFixed(2),

        "RISK: " +
            (result.risk || ""),

        "PRIMARY AI: " +
            (
                result.primary
                    ? result.primary.mode
                    : ""
            ),

        "SECONDARY AI: " +
            (
                result.secondary
                    ? result.secondary.mode
                    : ""
            ),

        "STABILIZER: " +
            (
                result.stabilizer
                    ? result.stabilizer.mode
                    : ""
            ),

        "HUMAN AUTHORITY: FINAL",

        "",

        "RECOMMENDATION:",

        action
            ? action.primaryRecommendation
            : "",

        "",

        "RATIONALE:",

        action
            ? action.rationale
            : ""

    ].join("\n");


    const assessment =
        el(
            "dpSimulationAssessment"
        );


    if (!assessment) {
        return;
    }


    if (
        assessment.tagName ===
        "TEXTAREA"
    ) {

        assessment.value =
            assessmentLines;

        assessment.scrollTop =
            assessment.scrollHeight;

        return;

    }


    assessment.textContent =
        assessmentLines;

}


/* ============================================================
   RUN DP SIMULATION
   ============================================================ */

function runSimulation() {

    /*
     * Confirm that the deterministic engine
     * has loaded before attempting execution.
     */

    if (
        typeof window.DPSimulationEngine ===
        "undefined"
    ) {

        console.error(
            "DPSimulationEngine is not available."
        );

        setText(
            "systemStatus",
            "ENGINE NOT AVAILABLE"
        );

        appendOperatorLog(
            "ERROR: DP Simulation Engine not available."
        );

        return null;

    }


    /*
     * Read the ACTUAL cockpit controls.
     */

    const inputs =
        readDPInputs();


    /*
     * Execute deterministic simulation.
     */

    const result =
        window.DPSimulationEngine.run(
            inputs
        );


    if (!result) {

        appendOperatorLog(
            "ERROR: Simulation returned no result."
        );

        return null;

    }


    /*
     * Store current result.
     */

    window.lastDPSimulation =
        result;


    /*
     * Update every cockpit subsystem.
     */

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

    updateSimulatedAction(
        result
    );

    updateSimulatedState(
        result
    );

    updateAssessment(
        result
    );

    updateAudit(
        result
    );


    /*
     * Operator event log.
     */

    appendOperatorLog(

        "SIMULATION COMPLETE — " +

        "RISK: " +
        result.risk +

        " | STRESS: " +
        Number(
            result.environment
                .environmentalStress
        ).toFixed(2) +

        " | HUMAN AUTHORITY: FINAL"

    );


    /*
     * Explicit safety confirmation.
     */

    appendOperatorLog(
        "SIMULATION ONLY — NO OPERATIONAL COMMAND ISSUED."
    );


    return result;

}


/* ============================================================
   SCENARIO APPLICATION
   ============================================================ */

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


    const applied =
        applyInputValues({

            wind:
                scenario.wind,

            current:
                scenario.current,

            wave:
                scenario.wave,

            tidal:
                scenario.tidal

        });


    if (!applied) {
        return false;
    }


    window.currentDPScenario =
        scenarioName;


    appendOperatorLog(

        "SCENARIO SELECTED: " +
        scenario.name

    );


    return true;

}


/* ============================================================
   RUN NAMED SCENARIO
   ============================================================ */

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


    return runSimulation();

}


/* ============================================================
   RANDOM SCENARIO
   ============================================================ */

function randomDPScenario() {

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


    applyInputValues(
        values
    );


    window.currentDPScenario =
        "RANDOM";


    appendOperatorLog(
        "RANDOM ENVIRONMENTAL SCENARIO GENERATED."
    );


    return runSimulation();

}


/* ============================================================
   RESET COCKPIT
   ============================================================ */

function resetDPCockpit() {

    applyInputValues(
        DEFAULT_INPUTS
    );


    window.currentDPScenario =
        "NORMAL";


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
        "AVAILABLE / FINAL"
    );


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


    setText(
        "stabilizerMode",
        "STANDBY"
    );

    setText(
        "stabilizerSource",
        "NONE"
    );

    setText(
        "stabilizerOutput",
        "0"
    );

    setText(
        "stabilizerState",
        "STANDBY"
    );


    setText(
        "recommendedAction",
        "SYSTEM READY — AWAITING SIMULATION"
    );

    setText(
        "actionUrgency",
        "LOW"
    );

    setText(
        "responseMode",
        "STANDBY"
    );

    setText(
        "actionRationale",
        "Select an environmental scenario and run the simulation."
    );


    setText(
        "simulatedAction",
        "STANDBY"
    );

    setText(
        "simulatedCommand",
        "0"
    );

    setText(
        "operationalCommand",
        "SIMULATION ONLY"
    );

    setText(
        "realVesselConnection",
        "NOT CONNECTED"
    );


    setText(
        "positionError",
        "0.00"
    );

    setText(
        "stabilityIndex",
        "100.00"
    );

    setText(
        "simulatedRisk",
        "NORMAL"
    );

    setText(
        "simulatedStateStatus",
        "STANDBY"
    );


    setText(
        "dpSimulationAssessment",
        "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
    );


    appendOperatorLog(
        "DP RESILIENCE COCKPIT RESET."
    );


    return true;

}


/* ============================================================
   CONVENIENCE SCENARIO FUNCTIONS
   ============================================================ */

function normalScenario() {

    return runDPScenario(
        "NORMAL"
    );

}


function moderateWeatherScenario() {

    return runDPScenario(
        "MODERATE_WEATHER"
    );

}


function heavyWeatherScenario() {

    return runDPScenario(
        "HEAVY_WEATHER"
    );

}


function criticalScenario() {

    return runDPScenario(
        "CRITICAL_WEATHER"
    );

}


function currentSurgeScenario() {

    return runDPScenario(
        "CURRENT_SURGE"
    );

}


function heavySeaStateScenario() {

    return runDPScenario(
        "HEAVY_SEA_STATE"
    );

}


function windGustScenario() {

    return runDPScenario(
        "WIND_GUST_EVENT"
    );

}


function combinedDisturbanceScenario() {

    return runDPScenario(
        "COMBINED_DISTURBANCE"
    );

}


function sensorNoiseScenario() {

    return runDPScenario(
        "SENSOR_NOISE"
    );

}


function partialSensorLossScenario() {

    return runDPScenario(
        "PARTIAL_SENSOR_LOSS"
    );

}


function rapidTransitionScenario() {

    return runDPScenario(
        "RAPID_TRANSITION"
    );

}


/* ============================================================
   BROWSER PUBLIC API
   ============================================================ */

window.runSimulation =
    runSimulation;

window.runDPScenario =
    runDPScenario;

window.applyDPScenario =
    applyDPScenario;

window.randomDPScenario =
    randomDPScenario;

window.resetDPCockpit =
    resetDPCockpit;

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

window.sensorNoiseScenario =
    sensorNoiseScenario;

window.partialSensorLossScenario =
    partialSensorLossScenario;

window.rapidTransitionScenario =
    rapidTransitionScenario;


/* ============================================================
   INPUT EVENT WIRING
   ============================================================ */

function wireEnvironmentalInputs() {

    [
        "wind",
        "current",
        "wave",
        "tidal"
    ].forEach(
        function (id) {

            const input =
                el(id);

            if (!input) {
                return;
            }


            input.addEventListener(
                "input",
                function () {

                    updateInputDisplays(
                        readDPInputs()
                    );

                }
            );

        }
    );

}


/* ============================================================
   BUTTON WIRING
   ============================================================ */

function wireScenarioButton(
    id,
    handler
) {

    const button =
        el(id);

    if (!button) {
        return;
    }


    button.addEventListener(
        "click",
        handler
    );

}


function wireCockpitButtons() {

    /*
     * These IDs are optional.
     *
     * Existing inline HTML onclick
     * handlers remain compatible.
     */

    wireScenarioButton(
        "runDPButton",
        runSimulation
    );

    wireScenarioButton(
        "resetDPButton",
        resetDPCockpit
    );

    wireScenarioButton(
        "normalButton",
        normalScenario
    );

    wireScenarioButton(
        "moderateWeatherButton",
        moderateWeatherScenario
    );

    wireScenarioButton(
        "heavyWeatherButton",
        heavyWeatherScenario
    );

    wireScenarioButton(
        "criticalWeatherButton",
        criticalScenario
    );

    wireScenarioButton(
        "currentSurgeButton",
        currentSurgeScenario
    );

    wireScenarioButton(
        "heavySeaButton",
        heavySeaStateScenario
    );

    wireScenarioButton(
        "windGustButton",
        windGustScenario
    );

    wireScenarioButton(
        "combinedButton",
        combinedDisturbanceScenario
    );

    wireScenarioButton(
        "randomButton",
        randomDPScenario
    );

}


/* ============================================================
   ENGINE INITIALIZATION
   ============================================================ */

function initializeDPCockpit() {

    appendOperatorLog(
        "DP resilience cockpit initialising."
    );


    if (
        typeof window.DPSimulationEngine ===
        "undefined"
    ) {

        setText(
            "systemStatus",
            "ENGINE NOT AVAILABLE"
        );

        appendOperatorLog(
            "ERROR: DPSimulationEngine.js not loaded."
        );

        return false;

    }


    if (
        typeof window.DPSimulationEngine
            .validate ===
        "function"
    ) {

        const valid =
            window.DPSimulationEngine
                .validate();


        if (!valid) {

            setText(
                "systemStatus",
                "ENGINE VALIDATION FAILED"
            );

            appendOperatorLog(
                "ERROR: DP Simulation Engine validation failed."
            );

            return false;

        }

    }


    wireEnvironmentalInputs();

    wireCockpitButtons();

    updateInputDisplays(
        readDPInputs()
    );


    setText(
        "systemStatus",
        "SYSTEM READY"
    );


    appendOperatorLog(
        "DP Simulation Engine connected — SIMULATION ONLY."
    );


    appendOperatorLog(
        "Human authority confirmed FINAL."
    );


    return true;

}


/* ============================================================
   DOM READY
   ============================================================ */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeDPCockpit
    );

} else {

    initializeDPCockpit();

}


/* ============================================================
   FINAL SAFETY MESSAGE
   ============================================================ */

console.log(
    "SEXTANT PROTOCOL DP COCKPIT — WIRING READY"
);

console.log(
    "MODE: SIMULATION ONLY"
);

console.log(
    "REAL VESSEL CONNECTION: FALSE"
);

console.log(
    "AUTONOMOUS OPERATIONAL COMMAND: FALSE"
);
/* ============================================================
   ENGINE STATUS DISPLAY
   ============================================================ */

function updateEngineStatus(status) {

    const candidates = [
        "engineStatus",
        "engine-status",
        "engineState"
    ];

    for (const id of candidates) {

        const node = document.getElementById(id);

        if (node) {

            node.textContent =
                status;

            return true;
        }
    }

    /*
     * If the HTML does not yet have an ID,
     * locate the visible ENGINE heading.
     */

    const elements =
        document.querySelectorAll("h1, h2, h3, p, div, span");

    for (const node of elements) {

        const text =
            (node.textContent || "").trim();

        if (
            text === "ENGINE: INITIALISING..." ||
            text === "ENGINE: INITIALISING"
        ) {

            node.textContent =
                "ENGINE: " + status;

            return true;
        }
    }

    return false;
}
/* ============================================================
   FINAL DP ENGINE CONNECTION TEST
   ============================================================ */

function testDPEngineConnection() {

    console.log(
        "SEXTANT PROTOCOL — DP ENGINE CONNECTION TEST"
    );

    if (
        typeof window.DPSimulationEngine ===
        "undefined"
    ) {

        console.error(
            "DP SIMULATION ENGINE NOT FOUND."
        );

        return false;
    }

    if (
        typeof window.DPSimulationEngine.run !==
        "function"
    ) {

        console.error(
            "DP SIMULATION ENGINE FOUND BUT RUN() IS MISSING."
        );

        return false;
    }

    const testResult =
        window.DPSimulationEngine.run({
            wind: 20,
            current: 15,
            wave: 20,
            tidal: 15
        });

    console.log(
        "DP ENGINE TEST RESULT:",
        testResult
    );

    if (testResult) {

        console.log(
            "DP SIMULATION ENGINE CONNECTION: PASS"
        );

        return true;
    }

    console.error(
        "DP SIMULATION ENGINE CONNECTION: FAIL"
    );

    return false;
}
/* ============================================================
   BROWSER EXPORT
   ============================================================ */

window.testDPEngineConnection =
    testDPEngineConnection;


/* ============================================================
   MOBILE ENGINE CONNECTION DIAGNOSTIC
   ============================================================ */

function runMobileEngineDiagnostic() {

    const engineStatus =
        document.getElementById(
            "engineStatus"
        );

    if (
        typeof window.DPSimulationEngine ===
        "undefined"
    ) {

        if (engineStatus) {

            engineStatus.textContent =
                "ENGINE OFFLINE — SCRIPT NOT LOADED";

        }

        console.error(
            "DP Simulation Engine not loaded."
        );

        return false;
    }


    if (
        typeof window.DPSimulationEngine.run !==
        "function"
    ) {

        if (engineStatus) {

            engineStatus.textContent =
                "ENGINE ERROR — RUN FUNCTION MISSING";

        }

        console.error(
            "DP Simulation Engine run() function missing."
        );

        return false;
    }


    if (engineStatus) {

        engineStatus.textContent =
            "ENGINE ONLINE — SIMULATION READY";

    }


    if (
        typeof window.appendOperatorLog ===
        "function"
    ) {

        window.appendOperatorLog(
            "[SYSTEM] DP Simulation Engine connected — SIMULATION ONLY."
        );

    }


    console.log(
        "DP ENGINE CONNECTION: PASS"
    );

    return true;
}


/* ============================================================
   MOBILE DIAGNOSTIC EXPORT
   ============================================================ */

window.runMobileEngineDiagnostic =
    runMobileEngineDiagnostic;


/* ============================================================
   START MOBILE DIAGNOSTIC
   ============================================================ */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            runMobileEngineDiagnostic();

        }
    );

} else {

    runMobileEngineDiagnostic();

}

