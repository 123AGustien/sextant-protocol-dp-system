/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT
   CLEAN COCKPIT CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   1.0.0

   PURPOSE:
   Browser interface controller for the deterministic
   DP resilience simulation engine.

   SAFETY:
   RESEARCH / SIMULATION ONLY.
   NO REAL VESSEL CONNECTION.
   NO OPERATIONAL DP COMMAND.
   HUMAN AUTHORITY REMAINS FINAL.
============================================================ */

(function () {

    "use strict";

    const VERSION = "1.0.0";


    /* ========================================================
       DOM HELPERS
    ======================================================== */

    function el(id) {
        return document.getElementById(id);
    }


    function setText(id, value) {

        const node = el(id);

        if (node) {
            node.textContent =
                value === undefined || value === null
                    ? ""
                    : String(value);
        }

    }


    function setValue(id, value) {

        const node = el(id);

        if (node) {
            node.value = value;
        }

    }


    function appendText(id, text) {

        const node = el(id);

        if (!node) {
            return;
        }

        const line =
            document.createElement("div");

        line.textContent = text;

        node.appendChild(line);

        while (node.children.length > 100) {
            node.removeChild(node.firstChild);
        }

        node.scrollTop =
            node.scrollHeight;

    }


    /* ========================================================
       OPERATOR LOG
    ======================================================== */

    function appendOperatorLog(message) {

        appendText(
            "operatorLog",
            message
        );

        appendText(
            "eventLog",
            message
        );

    }


    window.appendOperatorLog =
        appendOperatorLog;


    /* ========================================================
       READ ENVIRONMENTAL INPUTS
    ======================================================== */

    function readDPInputs() {

        return {

            wind:
                el("wind")
                    ? Number(el("wind").value)
                    : 0,

            current:
                el("current")
                    ? Number(el("current").value)
                    : 0,

            wave:
                el("wave")
                    ? Number(el("wave").value)
                    : 0,

            tidal:
                el("tidal")
                    ? Number(el("tidal").value)
                    : 0

        };

    }


    window.readDPInputs =
        readDPInputs;


    /* ========================================================
       INPUT DISPLAY
    ======================================================== */

    function updateInputDisplays(
        environment
    ) {

        environment =
            environment ||
            readDPInputs();


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


        /*
         * Compatibility with alternative HTML IDs.
         */

        setText(
            "windDisplay",
            environment.wind
        );

        setText(
            "currentDisplay",
            environment.current
        );

        setText(
            "waveDisplay",
            environment.wave
        );

        setText(
            "tidalDisplay",
            environment.tidal
        );

    }


    window.updateInputDisplays =
        updateInputDisplays;


    /* ========================================================
       ENVIRONMENTAL STRESS DISPLAY
    ======================================================== */

    function updateEnvironmentalStress(
        stress
    ) {

        const value =
            Number(stress || 0)
                .toFixed(2);

        setText(
            "environmentalStress",
            value
        );

        setText(
            "environmentStress",
            value
        );

    }


    /* ========================================================
       ENGINE STATUS
    ======================================================== */

    function updateEngineStatus(
        status
    ) {

        setText(
            "engineStatus",
            status
        );

        setText(
            "engineState",
            status
        );

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function updateSystemStatus(
        result
    ) {

        setText(
            "systemStatus",
            result.systemStatus
        );


        setText(
            "environmentStatus",
            "ASSESSED"
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
            result.stabilizer.status
        );


        setText(
            "humanStatus",
            "AVAILABLE / FINAL"
        );

    }


    /* ========================================================
       RISK / RESILIENCE DISPLAY
    ======================================================== */

    function updateRiskDisplay(
        result
    ) {

        const risk =
            result.risk;

        const stress =
            Number(
                result.environment
                    .environmentalStress
            );


        let alertLevel =
            "NORMAL";

        let environmentChange =
            "STABLE";

        let resilienceState =
            "MONITORING";

        let attention =
            "NOT REQUIRED";


        if (risk === "MEDIUM") {

            alertLevel =
                "ADVISORY";

            environmentChange =
                "ELEVATED";

            resilienceState =
                "PREVENTIVE MONITORING";

            attention =
                "INCREASED AWARENESS";

        }


        if (risk === "HIGH") {

            alertLevel =
                "HIGH";

            environmentChange =
                "SIGNIFICANT CHANGE";

            resilienceState =
                "RESILIENCE RESPONSE";

            attention =
                "HUMAN REVIEW REQUIRED";

        }


        if (risk === "CRITICAL") {

            alertLevel =
                "CRITICAL";

            environmentChange =
                "CRITICAL CHANGE";

            resilienceState =
                "CRITICAL STABILIZATION";

            attention =
                "IMMEDIATE HUMAN REVIEW";

        }


        setText(
            "resilienceAlert",
            risk === "LOW"
                ? "SYSTEM MONITORING — NO RESILIENCE ALERT"
                : "RESILIENCE ALERT — " + risk
        );


        setText(
            "resilienceAlertLevel",
            alertLevel
        );


        setText(
            "environmentalChange",
            environmentChange
        );


        setText(
            "resilienceState",
            resilienceState
        );


        setText(
            "operatorAttention",
            attention
        );


        updateEnvironmentalStress(
            stress
        );

    }


    /* ========================================================
       STABILIZER DISPLAY
    ======================================================== */

    function updateStabilizerDisplay(
        stabilizer
    ) {

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
                stabilizer.finalOutput || 0
            ).toFixed(2)
        );


        setText(
            "stabilizerStatus",
            stabilizer.status
        );

    }


    /* ========================================================
       RECOMMENDATION DISPLAY
    ======================================================== */

    function updateRecommendation(
        recommendation
    ) {

        if (!recommendation) {
            return;
        }


        setText(
            "operatorRecommendation",
            recommendation.primaryRecommendation
        );


        setText(
            "recommendationUrgency",
            recommendation.urgency
        );


        setText(
            "responseMode",
            recommendation.responseMode
        );


        setText(
            "recommendationRationale",
            recommendation.rationale
        );


        const actionNode =
            el("recommendedActions");


        if (actionNode) {

            actionNode.innerHTML = "";

            recommendation
                .recommendedActions
                .forEach(
                    function (action) {

                        const li =
                            document.createElement(
                                "li"
                            );

                        li.textContent =
                            action;

                        actionNode.appendChild(
                            li
                        );

                    }
                );

        }


        setText(
            "anchoringConsideration",
            recommendation
                .anchoringConsideration
        );

    }


    /* ========================================================
       OPERATOR NOTIFICATION
    ======================================================== */

    function updateNotification(
        result
    ) {

        const risk =
            result.risk;


        let message =
            "SYSTEM READY. CONTINUOUS SIMULATED MONITORING ACTIVE. NO OPERATOR INTERVENTION REQUESTED.";


        if (risk === "MEDIUM") {

            message =
                "SIMULATED ENVIRONMENTAL LOADING ELEVATED. INCREASED OPERATOR ATTENTION RECOMMENDED.";

        }


        if (risk === "HIGH") {

            message =
                "HIGH SIMULATED ENVIRONMENTAL LOADING. HUMAN REVIEW REQUIRED.";

        }


        if (risk === "CRITICAL") {

            message =
                "CRITICAL SIMULATED CONDITION. IMMEDIATE HUMAN REVIEW REQUIRED.";

        }


        setText(
            "operatorNotification",
            message
        );

    }


    /* ========================================================
       RESPONSE INDICATORS
    ======================================================== */

    function updateResponseIndicators(
        result
    ) {

        const risk =
            result.risk;


        setText(
            "audibleAlert",
            risk === "LOW"
                ? "STANDBY"
                : "SIMULATED ALERT"
        );


        setText(
            "attentionIndicator",
            risk === "LOW"
                ? "STANDBY"
                : "ATTENTION"
        );


        setText(
            "responseWindow",
            risk === "LOW"
                ? "NOT ACTIVE"
                : "ACTIVE — SIMULATION"
        );


        setText(
            "humanDecision",
            "AVAILABLE"
        );

    }


    /* ========================================================
       SIMULATED STATE DISPLAY
    ======================================================== */

    function updateSimulatedState(
        state
    ) {

        if (!state) {
            return;
        }


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


        setText(
            "simulatedCommand",
            Number(
                state.simulatedCommand || 0
            ).toFixed(2)
        );

    }


    /* ========================================================
       AUDIT DISPLAY
    ======================================================== */

    function updateAudit(
        audit
    ) {

        if (!audit) {
            return;
        }


        const auditNode =
            el("auditLog");


        if (auditNode) {

            const record =
                document.createElement(
                    "div"
                );

            record.textContent =
                JSON.stringify(
                    audit,
                    null,
                    2
                );

            auditNode.appendChild(
                record
            );

        }


        setText(
            "auditTimestamp",
            audit.timestamp
        );

    }


    /* ========================================================
       SIMULATION ASSESSMENT
    ======================================================== */

    function updateAssessment(
        result
    ) {

        let text =
            "System assessment complete.";


        if (result.risk === "LOW") {

            text =
                "Simulated environmental conditions remain within the normal monitoring range.";

        }


        if (result.risk === "MEDIUM") {

            text =
                "Simulated environmental loading is elevated. Preventive monitoring is recommended.";

        }


        if (result.risk === "HIGH") {

            text =
                "Simulated environmental loading is high. Human review and contingency preparation are recommended.";

        }


        if (result.risk === "CRITICAL") {

            text =
                "Simulated environmental loading has reached the critical threshold. Immediate human assessment is required.";

        }


        setText(
            "dpAssessment",
            text
        );


        setText(
            "simulationAssessment",
            text
        );

    }


    /* ========================================================
       MAIN SIMULATION
    ======================================================== */

    function runSimulation(
        inputs
    ) {

        /*
         * Never allow the cockpit to call the engine
         * before the engine exists.
         */

        if (
            typeof window.DPSimulationEngine ===
            "undefined"
        ) {

            updateEngineStatus(
                "ENGINE OFFLINE"
            );

            appendOperatorLog(
                "[ERROR] DPSimulationEngine not available."
            );

            return null;

        }


        if (
            typeof window.DPSimulationEngine.run !==
            "function"
        ) {

            updateEngineStatus(
                "ENGINE ERROR"
            );

            appendOperatorLog(
                "[ERROR] DPSimulationEngine.run() missing."
            );

            return null;

        }


        inputs =
            inputs ||
            readDPInputs();


        updateInputDisplays(
            inputs
        );


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION RUNNING"
        );


        appendOperatorLog(
            "[SIMULATION] DP environmental assessment started."
        );


        let result;


        try {

            result =
                window.DPSimulationEngine.run(
                    inputs
                );

        } catch (error) {

            updateEngineStatus(
                "ENGINE EXECUTION ERROR"
            );

            appendOperatorLog(
                "[ERROR] " +
                error.message
            );

            console.error(
                "DP simulation error:",
                error
            );

            return null;

        }


        if (!result) {

            updateEngineStatus(
                "SIMULATION FAILED"
            );

            appendOperatorLog(
                "[ERROR] Simulation returned no result."
            );

            return null;

        }


        /* ----------------------------------------------------
           UPDATE COCKPIT
        ---------------------------------------------------- */

        updateSystemStatus(
            result
        );

        updateRiskDisplay(
            result
        );

        updateStabilizerDisplay(
            result.stabilizer
        );

        updateRecommendation(
            result.recommendedAction
        );

        updateNotification(
            result
        );

        updateResponseIndicators(
            result
        );

        updateSimulatedState(
            result.updatedState
        );

        updateAudit(
            result.audit
        );

        updateAssessment(
            result
        );


        /* ----------------------------------------------------
           EVENT LOG
        ---------------------------------------------------- */

        appendOperatorLog(
            "[SIMULATION] Risk: " +
            result.risk +
            " | Environmental Stress: " +
            Number(
                result.environment
                    .environmentalStress
            ).toFixed(2)
        );


        appendOperatorLog(
            "[PRIMARY] " +
            result.primary.mode
        );


        appendOperatorLog(
            "[SECONDARY] " +
            result.secondary.mode
        );


        appendOperatorLog(
            "[STABILIZER] " +
            result.stabilizer.mode
        );


        appendOperatorLog(
            "[HUMAN AUTHORITY] FINAL"
        );


        appendOperatorLog(
            "[SIMULATION] No operational vessel command issued."
        );


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION READY"
        );


        return result;

    }


    /* ========================================================
       SCENARIO APPLICATION
    ======================================================== */

    function applyDPScenario(
        scenarioName
    ) {

        if (
            typeof window.DP_SCENARIOS ===
            "undefined"
        ) {

            appendOperatorLog(
                "[ERROR] DP_SCENARIOS not available."
            );

            return false;

        }


        const scenario =
            window.DP_SCENARIOS[
                scenarioName
            ];


        if (!scenario) {

            appendOperatorLog(
                "[ERROR] Unknown scenario: " +
                scenarioName
            );

            return false;

        }


        setValue(
            "wind",
            scenario.wind
        );

        setValue(
            "current",
            scenario.current
        );

        setValue(
            "wave",
            scenario.wave
        );

        setValue(
            "tidal",
            scenario.tidal
        );


        updateInputDisplays(
            scenario
        );


        setText(
            "scenarioName",
            scenario.name
        );


        setText(
            "scenarioDescription",
            scenario.description
        );


        appendOperatorLog(
            "[SCENARIO] " +
            scenario.name +
            " loaded."
        );


        return true;

    }


    window.applyDPScenario =
        applyDPScenario;


    /* ========================================================
       RUN SCENARIO
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


        return runSimulation(
            readDPInputs()
        );

    }


    window.runDPScenario =
        runDPScenario;


    /* ========================================================
       SCENARIO FUNCTIONS
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
       RANDOM SCENARIO
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


        setValue(
            "wind",
            values.wind
        );

        setValue(
            "current",
            values.current
        );

        setValue(
            "wave",
            values.wave
        );

        setValue(
            "tidal",
            values.tidal
        );


        updateInputDisplays(
            values
        );


        setText(
            "scenarioName",
            "RANDOM"
        );


        setText(
            "scenarioDescription",
            "Randomly generated simulated environmental condition."
        );


        appendOperatorLog(
            "[SCENARIO] RANDOM environmental condition generated."
        );


        return runSimulation(
            values
        );

    }


    window.randomDPScenario =
        randomDPScenario;


    /* ========================================================
       RESET
    ======================================================== */

    function resetDPCockpit() {

        setValue(
            "wind",
            20
        );

        setValue(
            "current",
            15
        );

        setValue(
            "wave",
            20
        );

        setValue(
            "tidal",
            15
        );


        updateInputDisplays({

            wind: 20,
            current: 15,
            wave: 20,
            tidal: 15

        });


        updateEnvironmentalStress(
            0
        );


        setText(
            "scenarioName",
            "NORMAL"
        );


        setText(
            "scenarioDescription",
            "Normal operating environmental conditions."
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
            "systemStatus",
            "SYSTEM READY"
        );


        setText(
            "resilienceAlert",
            "SYSTEM MONITORING — NO RESILIENCE ALERT"
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
            "AWAITING ASSESSMENT"
        );


        setText(
            "stabilizerOutput",
            "0.00"
        );


        setText(
            "stabilizerStatus",
            "STANDBY"
        );


        setText(
            "operatorRecommendation",
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "recommendationUrgency",
            "NORMAL"
        );


        setText(
            "responseMode",
            "MONITORING"
        );


        setText(
            "recommendationRationale",
            "Awaiting simulated environmental assessment."
        );


        setText(
            "operatorNotification",
            "SYSTEM READY. CONTINUOUS SIMULATED MONITORING ACTIVE. NO OPERATOR INTERVENTION REQUESTED."
        );


        setText(
            "audibleAlert",
            "STANDBY"
        );


        setText(
            "attentionIndicator",
            "STANDBY"
        );


        setText(
            "responseWindow",
            "NOT ACTIVE"
        );


        setText(
            "humanDecision",
            "AVAILABLE"
        );


        setText(
            "dpAssessment",
            "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
        );


        setText(
            "simulationAssessment",
            "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
        );


        appendOperatorLog(
            "[SYSTEM] DP resilience cockpit reset."
        );


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION READY"
        );

    }


    window.resetDPCockpit =
        resetDPCockpit;


    /* ========================================================
       INPUT EVENT WIRING
    ======================================================== */

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


    /* ========================================================
       BUTTON WIRING
    ======================================================== */

    function wireButton(
        id,
        handler
    ) {

        const button =
            el(id);


        if (!button) {
            return;
        }


        /*
         * Prevent duplicate listeners if this function
         * is accidentally called more than once.
         */

        if (
            button.dataset.dpWired ===
            "true"
        ) {
            return;
        }


        button.dataset.dpWired =
            "true";


        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                handler();

            }
        );

    }


    function wireCockpitButtons() {

        wireButton(
            "runDPButton",
            function () {
                runSimulation();
            }
        );


        wireButton(
            "resetDPButton",
            resetDPCockpit
        );


        wireButton(
            "normalButton",
            normalScenario
        );


        wireButton(
            "moderateWeatherButton",
            moderateWeatherScenario
        );


        wireButton(
            "heavyWeatherButton",
            heavyWeatherScenario
        );


        wireButton(
            "criticalWeatherButton",
            criticalScenario
        );


        wireButton(
            "currentSurgeButton",
            currentSurgeScenario
        );


        wireButton(
            "heavySeaButton",
            heavySeaStateScenario
        );


        wireButton(
            "windGustButton",
            windGustScenario
        );


        wireButton(
            "combinedButton",
            combinedDisturbanceScenario
        );


        wireButton(
            "randomButton",
            randomDPScenario
        );


        wireButton(
            "sensorNoiseButton",
            sensorNoiseScenario
        );


        wireButton(
            "partialSensorLossButton",
            partialSensorLossScenario
        );


        wireButton(
            "rapidTransitionButton",
            rapidTransitionScenario
        );

    }


    /* ========================================================
       ENGINE DIAGNOSTIC
    ======================================================== */

    function runMobileEngineDiagnostic() {

        if (
            typeof window.DPSimulationEngine ===
            "undefined"
        ) {

            updateEngineStatus(
                "ENGINE OFFLINE — SCRIPT NOT LOADED"
            );

            return false;

        }


        if (
            typeof window.DPSimulationEngine.run !==
            "function"
        ) {

            updateEngineStatus(
                "ENGINE ERROR — RUN FUNCTION MISSING"
            );

            return false;

        }


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION READY"
        );


        return true;

    }


    window.runMobileEngineDiagnostic =
        runMobileEngineDiagnostic;


    /* ========================================================
       ENGINE CONNECTION TEST
    ======================================================== */

    function testDPEngineConnection() {

        if (
            !runMobileEngineDiagnostic()
        ) {

            return false;

        }


        try {

            const result =
                window.DPSimulationEngine.run({

                    wind: 20,
                    current: 15,
                    wave: 20,
                    tidal: 15

                });


            if (!result) {

                updateEngineStatus(
                    "ENGINE TEST FAILED"
                );

                return false;

            }


            appendOperatorLog(
                "[SYSTEM] DP Simulation Engine connection PASS."
            );


            appendOperatorLog(
                "[SYSTEM] Test condition: 20 / 15 / 20 / 15."
            );


            appendOperatorLog(
                "[SYSTEM] SIMULATION ONLY."
            );


            updateEngineStatus(
                "ENGINE ONLINE — SIMULATION READY"
            );


            return true;

        } catch (error) {

            console.error(
                error
            );


            updateEngineStatus(
                "ENGINE TEST ERROR"
            );


            return false;

        }

    }


    window.testDPEngineConnection =
        testDPEngineConnection;


    /* ========================================================
       INITIALIZE COCKPIT
    ======================================================== */

    function initializeDPCockpit() {

        appendOperatorLog(
            "[SYSTEM] DP resilience cockpit initialising."
        );


        if (
            !runMobileEngineDiagnostic()
        ) {

            appendOperatorLog(
                "[ERROR] DPSimulationEngine.js is unavailable."
            );

            return false;

        }


        if (
            typeof window.DPSimulationEngine.validate ===
            "function"
        ) {

            const valid =
                window.DPSimulationEngine
                    .validate();


            if (!valid) {

                updateEngineStatus(
                    "ENGINE VALIDATION FAILED"
                );


                appendOperatorLog(
                    "[ERROR] DP Simulation Engine validation failed."
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
            "[SYSTEM] DP Simulation Engine connected."
        );


        appendOperatorLog(
            "[SYSTEM] Human authority confirmed FINAL."
        );


        appendOperatorLog(
            "[SYSTEM] Real vessel connection: FALSE."
        );


        appendOperatorLog(
            "[SYSTEM] Autonomous operational command: FALSE."
        );


        return true;

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
            initializeDPCockpit
        );

    } else {

        initializeDPCockpit();

    }


    /* ========================================================
       BROWSER PUBLIC API
    ======================================================== */

    window.runSimulation =
        runSimulation;

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
       FINAL SAFETY MESSAGE
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

    console.log(
        "REAL VESSEL CONNECTION: FALSE"
    );

    console.log(
        "AUTONOMOUS OPERATIONAL COMMAND: FALSE"
    );

})();