/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — CLEAN UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.1.0

   PURPOSE:
   Browser UI controller for the deterministic DP simulation
   engine, including simulated navigation / sensor awareness.

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
   SIMULATED DP ACTION

   IMPORTANT SAFETY BOUNDARY:

   RESEARCH / SIMULATION ONLY.

   This file does NOT command:
   - real DP systems
   - propulsion
   - thrusters
   - steering
   - navigation
   - vessel automation
   - safety systems

   HUMAN AUTHORITY REMAINS FINAL.
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       BASIC DOM HELPERS
    ======================================================== */

    function el(id) {

        return document.getElementById(id);

    }


    function setText(id, value) {

        const node = el(id);

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


    function setValue(id, value) {

        const node = el(id);

        if (!node) {
            return false;
        }

        node.value = value;

        return true;

    }


    /* ========================================================
       INPUT READING
    ======================================================== */

    function readDPInputs() {

        return {

            wind:
                Number(
                    el("wind")?.value || 0
                ),

            current:
                Number(
                    el("current")?.value || 0
                ),

            wave:
                Number(
                    el("wave")?.value || 0
                ),

            tidal:
                Number(
                    el("tidal")?.value || 0
                )

        };

    }


    /* ========================================================
       INPUT DISPLAY
    ======================================================== */

    function updateInputDisplays(inputs) {

        inputs =
            inputs ||
            readDPInputs();


        const displays = {

            windValue:
                inputs.wind,

            currentValue:
                inputs.current,

            waveValue:
                inputs.wave,

            tidalValue:
                inputs.tidal

        };


        Object.keys(displays)
            .forEach(function (id) {

                setText(
                    id,
                    displays[id]
                );

            });


        const approximateStress =
            (
                inputs.wind * 0.25 +
                inputs.current * 0.30 +
                inputs.wave * 0.25 +
                inputs.tidal * 0.20
            );


        setText(
            "environmentalStress",
            approximateStress.toFixed(2)
        );

    }


    /* ========================================================
       SIMULATED NAVIGATION / SENSOR AWARENESS
    ======================================================== */

    function updateNavigationPanel(result) {

        const panel =
            el("dpNavigationPanel");


        if (!panel) {
            return false;
        }


        const statusCard =
            panel.querySelector(
                ".status-card"
            );


        if (!statusCard) {
            return false;
        }


        const statusValue =
            statusCard.querySelector(
                ".status-value"
            );


        if (!statusValue) {
            return false;
        }


        if (!result) {

            statusValue.textContent =
                "INITIALISING...";


            let detail =
                panel.querySelector(
                    ".navigation-simulation-detail"
                );


            if (detail) {

                detail.textContent =
                    "SIMULATED SENSOR AWARENESS — STANDBY";

            }


            return true;

        }


        const risk =
            result.risk ||
            "UNKNOWN";


        const environment =
            result.environment ||
            {};


        const stress =
            Number(
                environment.environmentalStress ||
                0
            );


        let navigationStatus =
            "SIMULATED NAVIGATION — STABLE";


        if (risk === "MEDIUM") {

            navigationStatus =
                "SIMULATED NAVIGATION — ELEVATED";

        }


        if (risk === "HIGH") {

            navigationStatus =
                "SIMULATED NAVIGATION — HIGH ATTENTION";

        }


        if (risk === "CRITICAL") {

            navigationStatus =
                "SIMULATED NAVIGATION — CRITICAL REVIEW";

        }


        statusValue.textContent =
            navigationStatus;


        let detail =
            panel.querySelector(
                ".navigation-simulation-detail"
            );


        if (!detail) {

            detail =
                document.createElement(
                    "div"
                );


            detail.className =
                "navigation-simulation-detail";


            panel.appendChild(
                detail
            );

        }


        detail.textContent =
            "ENVIRONMENTAL STRESS: " +
            stress.toFixed(2) +
            " | RISK: " +
            risk +
            " | SENSOR MODE: SIMULATED";


        return true;

    }


    /* ========================================================
       OPERATOR LOG
    ======================================================== */

    function appendOperatorLog(message) {

        const timestamp =
            new Date()
                .toISOString();


        const line =
            "[" +
            timestamp +
            "] " +
            message;


        const candidates = [

            "operatorEventLog",
            "eventLog",
            "operatorLog",
            "pipelineLog"

        ];


        for (
            const id of candidates
        ) {

            const node =
                el(id);

            if (!node) {
                continue;
            }


            if (
                node.tagName === "TEXTAREA" ||
                node.tagName === "PRE"
            ) {

                node.value =
                    node.value
                        ? node.value +
                          "\n" +
                          line
                        : line;

            }

            else {

                const entry =
                    document.createElement(
                        "div"
                    );

                entry.textContent =
                    line;

                node.appendChild(
                    entry
                );

            }

            return true;

        }


        return false;

    }


    /* ========================================================
       AUDIT LOG
    ======================================================== */

    function updateAuditLog(result) {

        if (!result) {
            return;
        }


        const audit =
            result.audit ||
            {};


        const lines = [

            "SYSTEM EVENT LOG",

            "------------------------------------------------------------",

            "Timestamp: " +
                (audit.timestamp || "N/A"),

            "Engine: " +
                (audit.engine || "DPSimulationEngine"),

            "Version: " +
                (audit.version || "N/A"),

            "Mode: " +
                (audit.mode || "SIMULATION ONLY"),

            "Environmental Stress: " +
                (audit.environmentalStress || "0.00"),

            "Risk: " +
                (audit.risk || "UNKNOWN"),

            "Primary AI: " +
                (audit.primary || "N/A"),

            "Secondary AI: " +
                (audit.secondary || "N/A"),

            "Stabilizer: " +
                (audit.stabilizer || "N/A"),

            "Recommendation: " +
                (audit.recommendation || "N/A"),

            "Human Authority: FINAL",

            "Autonomous Command: FALSE",

            "Operational Authority: FALSE"

        ];


        const candidates = [

            "resilienceAuditLog",
            "auditLog",
            "systemAuditLog"

        ];


        for (
            const id of candidates
        ) {

            const node =
                el(id);

            if (!node) {
                continue;
            }


            if (
                node.tagName === "TEXTAREA" ||
                node.tagName === "PRE"
            ) {

                node.value =
                    lines.join("\n");

            }

            else {

                node.textContent =
                    lines.join("\n");

            }


            return true;

        }


        return false;

    }


    /* ========================================================
       SCENARIO / ALERT STATE
    ======================================================== */

    function updateResilienceAlert(result) {

        if (!result) {
            return;
        }


        const risk =
            result.risk;


        let alert =
            "SYSTEM MONITORING — NO RESILIENCE ALERT";

        let alertLevel =
            "NORMAL";

        let environmentalChange =
            "STABLE";

        let resilienceState =
            "MONITORING";

        let operatorAttention =
            "NOT REQUIRED";


        if (risk === "MEDIUM") {

            alert =
                "RESILIENCE ALERT — ELEVATED";

            alertLevel =
                "ELEVATED";

            environmentalChange =
                "ELEVATED CHANGE";

            resilienceState =
                "PREVENTIVE MONITORING";

            operatorAttention =
                "INCREASED ATTENTION";

        }


        if (risk === "HIGH") {

            alert =
                "RESILIENCE ALERT — HIGH";

            alertLevel =
                "HIGH";

            environmentalChange =
                "HIGH CHANGE";

            resilienceState =
                "RESILIENCE RESPONSE";

            operatorAttention =
                "HUMAN REVIEW REQUIRED";

        }


        if (risk === "CRITICAL") {

            alert =
                "RESILIENCE ALERT — CRITICAL";

            alertLevel =
                "CRITICAL";

            environmentalChange =
                "CRITICAL CHANGE";

            resilienceState =
                "CRITICAL STABILIZATION";

            operatorAttention =
                "IMMEDIATE HUMAN REVIEW";

        }


        setText(
            "resilienceAlert",
            alert
        );

        setText(
            "resilienceAlertLevel",
            alertLevel
        );

        setText(
            "environmentalChange",
            environmentalChange
        );

        setText(
            "resilienceState",
            resilienceState
        );

        setText(
            "operatorAttention",
            operatorAttention
        );

    }


    /* ========================================================
       LIVE SYSTEM STATUS
    ======================================================== */

    function updateLiveSystemStatus(result) {

        if (!result) {
            return;
        }


        setText(
            "environmentStatus",
            "ASSESSED"
        );


        setText(
            "primaryAIStatus",
            result.primary?.mode ||
            "ASSESSED"
        );


        setText(
            "secondaryAIStatus",
            result.secondary?.mode ||
            "ASSESSED"
        );


        setText(
            "stabilizerStatus",
            result.stabilizer?.status ||
            "ASSESSED"
        );


        setText(
            "humanAuthorityStatus",
            "AVAILABLE / FINAL"
        );


        setText(
            "systemStatus",
            result.systemStatus ||
            "SYSTEM STABLE"
        );

    }


    /* ========================================================
       STABILIZER DISPLAY
    ======================================================== */

    function updateStabilizerDisplay(result) {

        if (!result) {
            return;
        }


        const stabilizer =
            result.stabilizer ||
            {};


        setText(
            "stabilizerMode",
            stabilizer.mode ||
            "STANDBY"
        );


        setText(
            "stabilizerSource",
            stabilizer.source ||
            "AWAITING ASSESSMENT"
        );


        setText(
            "stabilizerOutput",
            Number(
                stabilizer.finalOutput || 0
            ).toFixed(2)
        );


        setText(
            "stabilizerFinalOutput",
            Number(
                stabilizer.finalOutput || 0
            ).toFixed(2)
        );


        setText(
            "stabilizerStatus",
            stabilizer.status ||
            "STANDBY"
        );

    }


    /* ========================================================
       HUMAN AUTHORITY DISPLAY
    ======================================================== */

    function updateHumanAuthority(result) {

        if (!result) {
            return;
        }


        setText(
            "humanAuthority",
            "AVAILABLE / FINAL"
        );


        setText(
            "humanAuthorityStatus",
            "AVAILABLE / FINAL"
        );


        setText(
            "humanDecision",
            "AVAILABLE"
        );


        setText(
            "humanAuthorityDecision",
            "FINAL AUTHORITY"
        );

    }


    /* ========================================================
       OPERATOR RECOMMENDATION
    ======================================================== */

    function updateOperatorRecommendation(result) {

        if (!result) {
            return;
        }


        const recommendation =
            result.recommendedAction ||
            {};


        setText(
            "operatorRecommendation",
            recommendation.primaryRecommendation ||
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "recommendation",
            recommendation.primaryRecommendation ||
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "urgency",
            recommendation.urgency ||
            "NORMAL"
        );


        setText(
            "responseMode",
            recommendation.responseMode ||
            "MONITORING"
        );


        setText(
            "recommendationRationale",
            recommendation.rationale ||
            ""
        );


        setText(
            "assessment",
            recommendation.rationale ||
            ""
        );


        const actionCandidates = [

            "recommendedActions",
            "operatorActions",
            "solutionOptions"

        ];


        for (
            const id of actionCandidates
        ) {

            const node =
                el(id);

            if (!node) {
                continue;
            }


            const actions =
                Array.isArray(
                    recommendation.recommendedActions
                )
                    ? recommendation.recommendedActions
                    : [];


            node.innerHTML = "";


            actions.forEach(
                function (action) {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        action;

                    node.appendChild(
                        li
                    );

                }
            );


            break;

        }

    }


    /* ========================================================
       OPERATOR NOTIFICATION
    ======================================================== */

    function updateOperatorNotification(result) {

        if (!result) {
            return;
        }


        const risk =
            result.risk;


        let notification =
            "SYSTEM READY. CONTINUOUS SIMULATED MONITORING ACTIVE. NO OPERATOR INTERVENTION REQUESTED.";


        if (risk === "MEDIUM") {

            notification =
                "ELEVATED SIMULATED CONDITION. INCREASED OPERATOR ATTENTION RECOMMENDED.";

        }


        if (risk === "HIGH") {

            notification =
                "HIGH SIMULATED CONDITION. HUMAN REVIEW REQUIRED.";

        }


        if (risk === "CRITICAL") {

            notification =
                "CRITICAL SIMULATED CONDITION. IMMEDIATE HUMAN REVIEW REQUIRED.";

        }


        setText(
            "operatorNotification",
            notification
        );

    }


    /* ========================================================
       OPERATOR RESPONSE INDICATORS
    ======================================================== */

    function updateResponseIndicators(result) {

        if (!result) {
            return;
        }


        const risk =
            result.risk;


        let audible =
            "STANDBY";

        let attention =
            "STANDBY";

        let responseWindow =
            "NOT ACTIVE";

        let humanDecision =
            "AVAILABLE";


        if (risk === "MEDIUM") {

            attention =
                "MONITOR";

        }


        if (risk === "HIGH") {

            attention =
                "ATTENTION";

            responseWindow =
                "ACTIVE";

        }


        if (risk === "CRITICAL") {

            audible =
                "ALERT";

            attention =
                "ATTENTION";

            responseWindow =
                "IMMEDIATE";

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
       DP SIMULATION ASSESSMENT
    ======================================================== */

    function updateSimulationAssessment(result) {

        if (!result) {
            return;
        }


        const environment =
            result.environment ||
            {};


        const message = [

            "Simulation completed.",

            "Environmental Stress: " +
                Number(
                    environment.environmentalStress || 0
                ).toFixed(2),

            "Risk Classification: " +
                (result.risk || "UNKNOWN"),

            "Primary AI: " +
                (result.primary?.mode || "N/A"),

            "Secondary AI: " +
                (result.secondary?.mode || "N/A"),

            "Stabilizer: " +
                (result.stabilizer?.mode || "N/A"),

            "Human Authority: FINAL.",

            "Operational command: FALSE.",

            "Simulation mode: SIMULATION ONLY."

        ];


        setText(
            "dpSimulationAssessment",
            message.join("\n")
        );


        setText(
            "simulationAssessment",
            message.join("\n")
        );

    }


    /* ========================================================
       ENVIRONMENTAL STRESS DISPLAY
    ======================================================== */

    function updateEnvironmentalStress(result) {

        if (!result) {
            return;
        }


        const stress =
            result.environment?.environmentalStress;


        if (
            Number.isFinite(
                Number(stress)
            )
        ) {

            setText(
                "environmentalStress",
                Number(stress).toFixed(2)
            );

        }

    }


    /* ========================================================
       SIMULATED DP ACTION DISPLAY
    ======================================================== */

    function updateSimulatedAction(result) {

        if (!result) {
            return;
        }


        const action =
            result.simulatedAction ||
            {};


        setText(
            "simulatedDPAction",
            action.mode ||
            "SIMULATED DP RESPONSE"
        );


        setText(
            "simulatedCommand",
            Number(
                action.simulatedCommand || 0
            ).toFixed(2)
        );


        setText(
            "dpActionOutput",
            Number(
                action.simulatedCommand || 0
            ).toFixed(2)
        );


        setText(
            "operationalCommand",
            action.operationalCommand
                ? "TRUE"
                : "FALSE"
        );


        setText(
            "realVesselConnection",
            action.realVesselConnection
                ? "TRUE"
                : "FALSE"
        );

    }


    /* ========================================================
       SIMULATED VESSEL STATE
    ======================================================== */

    function updateSimulatedState(result) {

        if (!result) {
            return;
        }


        const state =
            result.updatedState ||
            {};


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
            "simulatedStability",
            Number(
                state.stabilityIndex || 0
            ).toFixed(2)
        );

    }


    /* ========================================================
       COMPLETE UI UPDATE
    ======================================================== */

    function updateCockpitFromSimulation(result) {

        if (!result) {
            return;
        }


        updateEnvironmentalStress(
            result
        );


        updateNavigationPanel(
            result
        );


        updateLiveSystemStatus(
            result
        );


        updateResilienceAlert(
            result
        );


        updateStabilizerDisplay(
            result
        );


        updateHumanAuthority(
            result
        );


        updateOperatorRecommendation(
            result
        );


        updateOperatorNotification(
            result
        );


        updateResponseIndicators(
            result
        );


        updateSimulationAssessment(
            result
        );


        updateSimulatedAction(
            result
        );


        updateSimulatedState(
            result
        );


        updateAuditLog(
            result
        );


        window.lastDPSimulation =
            result;


        return true;

    }


    /* ========================================================
       MAIN SIMULATION
    ======================================================== */

    function runSimulation() {

        if (
            typeof window.DPSimulationEngine ===
            "undefined"
        ) {

            setText(
                "systemStatus",
                "ENGINE NOT AVAILABLE"
            );


            appendOperatorLog(
                "[ERROR] DPSimulationEngine.js not loaded."
            );


            return null;

        }


        if (
            typeof window.DPSimulationEngine.run !==
            "function"
        ) {

            setText(
                "systemStatus",
                "ENGINE ERROR"
            );


            appendOperatorLog(
                "[ERROR] DPSimulationEngine.run() unavailable."
            );


            return null;

        }


        const inputs =
            readDPInputs();


        updateInputDisplays(
            inputs
        );


        const result =
            window.DPSimulationEngine.run(
                inputs
            );


        if (!result) {

            setText(
                "systemStatus",
                "SIMULATION FAILED"
            );


            appendOperatorLog(
                "[ERROR] DP simulation returned no result."
            );


            return null;

        }


        updateCockpitFromSimulation(
            result
        );


        appendOperatorLog(

            "[SIMULATION] " +
            "Stress=" +
            Number(
                result.environment.environmentalStress
            ).toFixed(2) +
            " | Risk=" +
            result.risk +
            " | Stabilizer=" +
            result.stabilizer.mode +
            " | Human Authority=FINAL"

        );


        appendOperatorLog(
            "[SAFETY] No operational command issued. Simulation only."
        );


        return result;

    }


    /* ========================================================
       SCENARIO EXECUTION
    ======================================================== */

    function applyDPScenario(scenarioName) {

        if (
            typeof window.DP_SCENARIOS ===
            "undefined"
        ) {

            console.error(
                "DP_SCENARIOS not available."
            );

            return false;

        }


        const scenario =
            window.DP_SCENARIOS[
                scenarioName
            ];


        if (!scenario) {

            console.error(
                "Unknown DP scenario:",
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
            readDPInputs()
        );


        return true;

    }


    function runDPScenario(scenarioName) {

        const applied =
            applyDPScenario(
                scenarioName
            );


        if (!applied) {
            return null;
        }


        appendOperatorLog(
            "[SCENARIO] " +
            scenarioName +
            " selected."
        );


        return runSimulation();

    }


    /* ========================================================
       SCENARIO BUTTON FUNCTIONS
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
            readDPInputs()
        );


        appendOperatorLog(
            "[SCENARIO] RANDOM environmental condition generated."
        );


        return runSimulation();

    }


    function randomScenario() {

        return randomDPScenario();

    }


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


        updateInputDisplays(
            readDPInputs()
        );


        updateNavigationPanel(
            null
        );


        setText(
            "environmentStatus",
            "STANDBY"
        );


        setText(
            "primaryAIStatus",
            "STANDBY"
        );


        setText(
            "secondaryAIStatus",
            "STANDBY"
        );


        setText(
            "stabilizerStatus",
            "STANDBY"
        );


        setText(
            "humanAuthorityStatus",
            "AVAILABLE"
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
            "stabilizerFinalOutput",
            "0.00"
        );


        setText(
            "operatorRecommendation",
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "recommendation",
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "urgency",
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
            "assessment",
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
            "dpSimulationAssessment",
            "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
        );


        setText(
            "simulationAssessment",
            "System ready. Select environmental conditions or a scenario, then press RUN DP SIMULATION."
        );


        setText(
            "simulatedDPAction",
            "STANDBY"
        );


        setText(
            "simulatedCommand",
            "0.00"
        );


        setText(
            "dpActionOutput",
            "0.00"
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
            "positionError",
            "0.00"
        );


        setText(
            "stabilityIndex",
            "0.00"
        );


        setText(
            "simulatedStability",
            "0.00"
        );


        window.lastDPSimulation =
            null;


        appendOperatorLog(
            "[SYSTEM] DP resilience cockpit reset."
        );


        return true;

    }


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


                if (
                    input.dataset.dpInputWired ===
                    "true"
                ) {
                    return;
                }


                input.dataset.dpInputWired =
                    "true";


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

    function wireScenarioButton(
        id,
        handler
    ) {

        const button =
            el(id);


        if (!button) {
            return;
        }


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
            handler
        );

    }


    function wireCockpitButtons() {

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
            "sensorNoiseButton",
            sensorNoiseScenario
        );


        wireScenarioButton(
            "partialSensorLossButton",
            partialSensorLossScenario
        );


        wireScenarioButton(
            "rapidTransitionButton",
            rapidTransitionScenario
        );


        wireScenarioButton(
            "randomButton",
            randomDPScenario
        );

    }


    /* ========================================================
       ENGINE STATUS
    ======================================================== */

    function updateEngineStatus(status) {

        const candidates = [

            "engineStatus",
            "engine-status",
            "engineState"

        ];


        for (
            const id of candidates
        ) {

            const node =
                el(id);


            if (node) {

                node.textContent =
                    status;

                return true;

            }

        }


        const elements =
            document.querySelectorAll(
                "h1,h2,h3,p,div,span"
            );


        for (
            const node of elements
        ) {

            const text =
                (
                    node.textContent ||
                    ""
                ).trim();


            if (
                text ===
                    "ENGINE: INITIALISING..." ||

                text ===
                    "ENGINE: INITIALISING"
            ) {

                node.textContent =
                    "ENGINE: " +
                    status;

                return true;

            }

        }


        return false;

    }


    /* ========================================================
       ENGINE DIAGNOSTIC
    ======================================================== */

    function testDPEngineConnection() {

        if (
            typeof window.DPSimulationEngine ===
            "undefined"
        ) {

            updateEngineStatus(
                "ENGINE OFFLINE — SCRIPT NOT LOADED"
            );


            appendOperatorLog(
                "[ERROR] DP Simulation Engine not found."
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


            appendOperatorLog(
                "[ERROR] DPSimulationEngine.run() missing."
            );


            return false;

        }


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION READY"
        );


        appendOperatorLog(
            "[SYSTEM] DP Simulation Engine connected — SIMULATION ONLY."
        );


        return true;

    }


    /* ========================================================
       MOBILE DIAGNOSTIC
    ======================================================== */

    function runMobileEngineDiagnostic() {

        return testDPEngineConnection();

    }


    /* ========================================================
       ENGINE INITIALIZATION
    ======================================================== */

    function initializeDPCockpit() {

        appendOperatorLog(
            "[SYSTEM] DP resilience cockpit initialising."
        );


        if (
            !testDPEngineConnection()
        ) {

            setText(
                "systemStatus",
                "ENGINE NOT AVAILABLE"
            );


            updateNavigationPanel(
                null
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

                updateEngineStatus(
                    "ENGINE VALIDATION FAILED"
                );


                setText(
                    "systemStatus",
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


        updateNavigationPanel(
            null
        );


        updateEngineStatus(
            "ENGINE ONLINE — SIMULATION READY"
        );


        setText(
            "systemStatus",
            "SYSTEM READY"
        );


        appendOperatorLog(
            "[SYSTEM] DP Simulation Engine connected — SIMULATION ONLY."
        );


        appendOperatorLog(
            "[SAFETY] Human authority confirmed FINAL."
        );


        return true;

    }


    /* ========================================================
       BROWSER PUBLIC API
    ======================================================== */

    window.runSimulation =
        runSimulation;


    window.runDPScenario =
        runDPScenario;


    window.applyDPScenario =
        applyDPScenario;


    window.randomDPScenario =
        randomDPScenario;


    window.randomScenario =
        randomScenario;


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


    window.appendOperatorLog =
        appendOperatorLog;


    window.readDPInputs =
        readDPInputs;


    window.updateInputDisplays =
        updateInputDisplays;


    window.updateCockpitFromSimulation =
        updateCockpitFromSimulation;


    window.testDPEngineConnection =
        testDPEngineConnection;


    window.runMobileEngineDiagnostic =
        runMobileEngineDiagnostic;


    window.initializeDPCockpit =
        initializeDPCockpit;


    /* ========================================================
       AUTOMATIC INITIALIZATION
    ======================================================== */

    function bootDPCockpit() {

        try {

            initializeDPCockpit();

        }

        catch (error) {

            console.error(
                "DP cockpit initialization error:",
                error
            );


            setText(
                "systemStatus",
                "INITIALIZATION ERROR"
            );


            appendOperatorLog(
                "[ERROR] " +
                error.message
            );

        }

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

    }

    else {

        bootDPCockpit();

    }


    /* ========================================================
       READY
    ======================================================== */

    console.log(
        "SEXTANT PROTOCOL DP RESILIENCE COCKPIT — UI CONTROLLER READY"
    );

    console.log(
        "VERSION: 2.1.0"
    );

    console.log(
        "MODE: RESEARCH / SIMULATION ONLY"
    );

    console.log(
        "HUMAN AUTHORITY: FINAL"
    );


})();