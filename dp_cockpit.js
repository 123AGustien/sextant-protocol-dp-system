/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.2.0

   PURPOSE:
   Browser UI controller for the deterministic DP simulation
   engine.

   ARCHITECTURE:

   ENVIRONMENT
        ↓
   S1 PRIMARY AI
        ↓
   S2 SECONDARY AI
        ↓
   STABILIZER
        ↓
   HUMAN-IN-THE-LOOP
        ↓
   SIMULATED DP RESPONSE

   SAFETY:

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
       DOM HELPERS
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


    function firstExisting(ids) {

        for (const id of ids) {

            const node = el(id);

            if (node) {
                return node;
            }

        }

        return null;
    }


    function setFirstExisting(ids, value) {

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


        setText(
            "windValue",
            inputs.wind
        );

        setText(
            "currentValue",
            inputs.current
        );

        setText(
            "waveValue",
            inputs.wave
        );

        setText(
            "tidalValue",
            inputs.tidal
        );


        /*
         * This is a UI preview only.
         * The authoritative stress value comes from
         * DPSimulationEngine.
         */

        const approximateStress =
            (
                inputs.wind * 0.25 +
                inputs.current * 0.30 +
                inputs.wave * 0.25 +
                inputs.tidal * 0.20
            );


        setText(
            "environmentStress",
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


        if (!result) {

            setText(
                "navigationSystemStatus",
                "ONLINE — SIMULATION"
            );

            return true;
        }


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


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


        setText(
            "navigationSystemStatus",
            navigationStatus
        );


        setText(
            "navigationPosition",
            "SIMULATED"
        );


        setText(
            "navigationHeading",
            "000.0°"
        );


        const positionError =
            result.updatedState?.positionError;


        setText(
            "navigationPositionError",
            Number(
                positionError || 0
            ).toFixed(2) +
            " m"
        );


        setText(
            "gnssStatus",
            "NORMAL — SIMULATED"
        );


        setText(
            "gyroStatus",
            "NORMAL — SIMULATED"
        );


        setText(
            "environmentSensorStatus",
            "NORMAL — SIMULATED"
        );


        setText(
            "sensorIntegrity",
            "HIGH"
        );


        setText(
            "navigationConfidence",
            risk === "CRITICAL"
                ? "REVIEW REQUIRED"
                : "HIGH"
        );


        setText(
            "navigationDataSource",
            "SIMULATION ENGINE"
        );


        return true;

    }


    /* ========================================================
       OPERATOR EVENT LOG
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


        const node =
            firstExisting([
                "operatorEventLog",
                "eventLog",
                "operatorLog",
                "pipelineLog"
            ]);


        if (!node) {
            return false;
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

            entry.className =
                "event-entry";

            entry.textContent =
                line;

            node.appendChild(
                entry
            );

            node.scrollTop =
                node.scrollHeight;

        }


        return true;

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
                (
                    audit.timestamp ||
                    new Date().toISOString()
                ),

            "Engine: " +
                (
                    audit.engine ||
                    "DPSimulationEngine"
                ),

            "Version: " +
                (
                    audit.version ||
                    "N/A"
                ),

            "Mode: SIMULATION ONLY",

            "Environmental Stress: " +
                Number(
                    result.environment?.environmentalStress ||
                    0
                ).toFixed(2),

            "Risk: " +
                (
                    result.risk ||
                    "UNKNOWN"
                ),

            "S1 Primary AI: " +
                getPrimaryAIStatus(result),

            "S2 Secondary AI: " +
                getSecondaryAIStatus(result),

            "Stabilizer: " +
                (
                    result.stabilizer?.mode ||
                    result.stabilizer?.status ||
                    "N/A"
                ),

            "Human Authority: FINAL",

            "Human Decision Gate: FINAL HUMAN AUTHORITY",

            "Autonomous Command: FALSE",

            "Operational Authority: FALSE",

            "Real Vessel Connection: FALSE"

        ];


        const node =
            firstExisting([
                "alertLog",
                "resilienceAuditLog",
                "auditLog",
                "systemAuditLog"
            ]);


        if (!node) {
            return false;
        }


        node.textContent =
            lines.join("\n");


        return true;

    }


    /* ========================================================
       S1 PRIMARY AI
    ======================================================== */

    function getPrimaryAIStatus(result) {

        const primary =
            result?.primary ||
            result?.primaryAI ||
            {};


        return String(
            primary.mode ||
            primary.status ||
            primary.state ||
            primary.assessment ||
            "ACTIVE"
        );

    }


    function updatePrimaryAI(result) {

        if (!result) {
            return;
        }


        const primary =
            result.primary ||
            result.primaryAI ||
            {};


        const status =
            primary.mode ||
            primary.status ||
            primary.state ||
            "ACTIVE";


        /*
         * IMPORTANT:
         * The current HTML uses #primaryStatus.
         */

        setFirstExisting(
            [
                "primaryStatus",
                "primaryAIStatus"
            ],
            status
        );


        appendOperatorLog(
            "[S1 PRIMARY AI] " +
            "LIVE / ACTIVE — " +
            status
        );

    }


    /* ========================================================
       S2 SECONDARY AI
    ======================================================== */

    function getSecondaryAIStatus(result) {

        const secondary =
            result?.secondary ||
            result?.secondaryAI ||
            {};


        return String(
            secondary.mode ||
            secondary.status ||
            secondary.state ||
            secondary.assessment ||
            "ACTIVE"
        );

    }


    function updateSecondaryAI(result) {

        if (!result) {
            return;
        }


        const secondary =
            result.secondary ||
            result.secondaryAI ||
            {};


        const status =
            secondary.mode ||
            secondary.status ||
            secondary.state ||
            "ACTIVE";


        /*
         * IMPORTANT:
         * The current HTML uses #secondaryStatus.
         */

        setFirstExisting(
            [
                "secondaryStatus",
                "secondaryAIStatus"
            ],
            status
        );


        appendOperatorLog(
            "[S2 SECONDARY AI] " +
            "LIVE / ACTIVE — " +
            status
        );

    }


    /* ========================================================
       RESILIENCE ALERT
    ======================================================== */

    function updateResilienceAlert(result) {

        if (!result) {
            return;
        }


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


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


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


        setText(
            "environmentStatus",
            "ASSESSED"
        );


        /*
         * Current index.html IDs:
         *
         * primaryStatus
         * secondaryStatus
         * stabilizerStatus
         * humanStatus
         * systemStatus
         */

        setText(
            "primaryStatus",
            getPrimaryAIStatus(result)
        );


        setText(
            "secondaryStatus",
            getSecondaryAIStatus(result)
        );


        setText(
            "stabilizerStatus",
            result.stabilizer?.status ||
            result.stabilizer?.mode ||
            "ASSESSED"
        );


        setText(
            "humanStatus",
            "FINAL AUTHORITY — ACKNOWLEDGED"
        );


        setText(
            "systemStatus",
            result.systemStatus ||
            (
                risk === "CRITICAL"
                    ? "CRITICAL — HUMAN REVIEW"
                    : "SYSTEM READY"
            )
        );

    }


    /* ========================================================
       STABILIZER
    ======================================================== */

    function updateStabilizerDisplay(result) {

        if (!result) {
            return;
        }


        const stabilizer =
            result.stabilizer ||
            {};


        const mode =
            stabilizer.mode ||
            "STANDBY";


        const source =
            stabilizer.source ||
            "AWAITING ASSESSMENT";


        const finalOutput =
            Number(
                stabilizer.finalOutput ||
                0
            );


        const status =
            stabilizer.status ||
            "STANDBY";


        setText(
            "stabilizerState",
            mode
        );


        setText(
            "stabilizerMessage",
            "Resilience arbitration completed through the " +
            "deterministic stabilizer. Human authority remains final."
        );


        setText(
            "stabilizerMode",
            mode
        );


        setText(
            "stabilizerSource",
            source
        );


        setText(
            "stabilizerOutput",
            finalOutput.toFixed(2)
        );


        setText(
            "stabilizerStatus",
            status
        );


    }


    /* ========================================================
       HUMAN-IN-THE-LOOP
    ======================================================== */

    function updateHumanAuthority(result) {

        if (!result) {
            return;
        }


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


        setText(
            "humanAuthority",
            "FINAL AUTHORITY"
        );


        setText(
            "humanStatus",
            "FINAL AUTHORITY — ACKNOWLEDGED"
        );


        setText(
            "humanDecisionMessage",

            risk === "CRITICAL"

                ? "CRITICAL CONDITION ACKNOWLEDGED. " +
                  "Human authority remains FINAL. " +
                  "No automatic operational command is issued."

                : "Simulation assessment acknowledged. " +
                  "Human authority remains FINAL."
        );


        setText(
            "humanDecisionIndicator",
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
            result.recommendation ||
            {};


        const primary =
            recommendation.primaryRecommendation ||
            recommendation.primary ||
            "NO SIMULATED RECOMMENDATION";


        const urgency =
            recommendation.urgency ||
            (
                result.risk === "CRITICAL"
                    ? "IMMEDIATE HUMAN REVIEW"
                    : "NORMAL"
            );


        const responseMode =
            recommendation.responseMode ||
            (
                result.risk === "CRITICAL"
                    ? "CRITICAL DP RESILIENCE RESPONSE"
                    : "MONITORING"
            );


        const rationale =
            recommendation.rationale ||
            "Awaiting simulated environmental assessment.";


        setFirstExisting(
            [
                "recommendedAction",
                "operatorRecommendation",
                "recommendation"
            ],
            primary
        );


        setFirstExisting(
            [
                "actionUrgency",
                "urgency"
            ],
            urgency
        );


        setFirstExisting(
            [
                "responseMode"
            ],
            responseMode
        );


        setFirstExisting(
            [
                "actionRationale",
                "recommendationRationale",
                "assessment"
            ],
            rationale
        );


        const actionNode =
            firstExisting([
                "recommendedActions",
                "operatorActions",
                "solutionOptions"
            ]);


        if (
            actionNode &&
            Array.isArray(
                recommendation.recommendedActions
            )
        ) {

            actionNode.innerHTML = "";


            recommendation.recommendedActions
                .forEach(function (action) {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        action;

                    actionNode.appendChild(
                        li
                    );

                });

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
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


        let notification =
            "SYSTEM READY. " +
            "CONTINUOUS SIMULATED MONITORING ACTIVE. " +
            "NO OPERATOR INTERVENTION REQUESTED.";


        if (risk === "MEDIUM") {

            notification =
                "ELEVATED SIMULATED CONDITION. " +
                "INCREASED OPERATOR ATTENTION RECOMMENDED.";

        }


        if (risk === "HIGH") {

            notification =
                "HIGH SIMULATED CONDITION. " +
                "HUMAN REVIEW REQUIRED.";

        }


        if (risk === "CRITICAL") {

            notification =
                "CRITICAL SIMULATED CONDITION. " +
                "IMMEDIATE HUMAN REVIEW REQUIRED.";

        }


        setText(
            "operatorNotification",
            notification
        );

    }


    /* ========================================================
       RESPONSE INDICATORS
    ======================================================== */

    function updateResponseIndicators(result) {

        if (!result) {
            return;
        }


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


        let audible =
            "STANDBY";

        let attention =
            "STANDBY";

        let responseWindow =
            "NOT ACTIVE";


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


        setFirstExisting(
            [
                "audibleIndicator",
                "audibleAlert"
            ],
            audible
        );


        setText(
            "attentionIndicator",
            attention
        );


        setFirstExisting(
            [
                "responseWindowIndicator",
                "responseWindow"
            ],
            responseWindow
        );


        setText(
            "humanDecisionIndicator",
            "FINAL AUTHORITY"
        );

    }


    /* ========================================================
       SIMULATION ASSESSMENT
    ======================================================== */

    function updateSimulationAssessment(result) {

        if (!result) {
            return;
        }


        const environment =
            result.environment ||
            {};


        const message = [

            "SIMULATION COMPLETED.",

            "",

            "Environmental Stress: " +
                Number(
                    environment.environmentalStress ||
                    0
                ).toFixed(2),

            "Risk Classification: " +
                (
                    result.risk ||
                    "UNKNOWN"
                ),

            "S1 Primary AI: " +
                getPrimaryAIStatus(result),

            "S2 Secondary AI: " +
                getSecondaryAIStatus(result),

            "Stabilizer: " +
                (
                    result.stabilizer?.mode ||
                    "N/A"
                ),

            "Human Authority: FINAL.",

            "Operational Command: FALSE.",

            "Real Vessel Connection: FALSE.",

            "Simulation Mode: SIMULATION ONLY."

        ];


        setFirstExisting(
            [
                "output",
                "dpSimulationAssessment",
                "simulationAssessment"
            ],
            message.join("\n")
        );

    }


    /* ========================================================
       ENVIRONMENTAL STRESS
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
                "environmentStress",
                Number(stress).toFixed(2)
            );

        }

    }


    /* ========================================================
       SIMULATED DP ACTION
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
                action.simulatedCommand ||
                0
            ).toFixed(2)
        );


        setText(
            "dpActionOutput",
            Number(
                action.simulatedCommand ||
                0
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
            "navigationPositionError",
            Number(
                state.positionError ||
                0
            ).toFixed(2) +
            " m"
        );


        setText(
            "positionError",
            Number(
                state.positionError ||
                0
            ).toFixed(2)
        );


        setText(
            "stabilityIndex",
            Number(
                state.stabilityIndex ||
                0
            ).toFixed(2)
        );


        setText(
            "simulatedStability",
            Number(
                state.stabilityIndex ||
                0
            ).toFixed(2)
        );

    }


    /* ========================================================
       COMPLETE UI UPDATE
    ======================================================== */

    function updateCockpitFromSimulation(result) {

        if (!result) {
            return false;
        }


        updateEnvironmentalStress(result);

        updateNavigationPanel(result);

        updateLiveSystemStatus(result);

        updatePrimaryAI(result);

        updateSecondaryAI(result);

        updateResilienceAlert(result);

        updateStabilizerDisplay(result);

        updateHumanAuthority(result);

        updateOperatorRecommendation(result);

        updateOperatorNotification(result);

        updateResponseIndicators(result);

        updateSimulationAssessment(result);

        updateSimulatedAction(result);

        updateSimulatedState(result);

        updateAuditLog(result);


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
                "[ERROR] DPSimulationEngine not loaded."
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


        let result;


        try {

            result =
                window.DPSimulationEngine.run(
                    inputs
                );

        }

        catch (error) {

            setText(
                "systemStatus",
                "SIMULATION ERROR"
            );


            appendOperatorLog(
                "[ERROR] " +
                error.message
            );


            return null;

        }


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
                result.environment?.environmentalStress ||
                0
            ).toFixed(2) +
            " | Risk=" +
            (
                result.risk ||
                "UNKNOWN"
            ) +
            " | S1=" +
            getPrimaryAIStatus(result) +
            " | S2=" +
            getSecondaryAIStatus(result) +
            " | Stabilizer=" +
            (
                result.stabilizer?.mode ||
                "N/A"
            ) +
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
                "[ERROR] Unknown DP scenario: " +
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
       COMPATIBILITY FUNCTIONS
       REQUIRED BY CURRENT INDEX.HTML
    ======================================================== */

    function executeDPCockpitScenario(
        scenarioName
    ) {

        return runDPScenario(
            scenarioName
        );

    }


    function executeRandomDPCockpitScenario() {

        return randomDPScenario();

    }


    /* ========================================================
       SCENARIO FUNCTIONS
    ======================================================== */

    function normalScenario() {
        return runDPScenario("NORMAL");
    }


    function moderateWeatherScenario() {
        return runDPScenario("MODERATE_WEATHER");
    }


    function heavyWeatherScenario() {
        return runDPScenario("HEAVY_WEATHER");
    }


    function criticalScenario() {
        return runDPScenario("CRITICAL_WEATHER");
    }


    function currentSurgeScenario() {
        return runDPScenario("CURRENT_SURGE");
    }


    function heavySeaStateScenario() {
        return runDPScenario("HEAVY_SEA_STATE");
    }


    function windGustScenario() {
        return runDPScenario("WIND_GUST_EVENT");
    }


    function combinedDisturbanceScenario() {
        return runDPScenario("COMBINED_DISTURBANCE");
    }


    function sensorNoiseScenario() {
        return runDPScenario("SENSOR_NOISE");
    }


    function partialSensorLossScenario() {
        return runDPScenario("PARTIAL_SENSOR_LOSS");
    }


    function rapidTransitionScenario() {
        return runDPScenario("RAPID_TRANSITION");
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

        setValue("wind", 20);
        setValue("current", 15);
        setValue("wave", 20);
        setValue("tidal", 15);


        updateInputDisplays(
            readDPInputs()
        );


        setText(
            "navigationSystemStatus",
            "ONLINE — SIMULATION"
        );

        setText(
            "navigationPosition",
            "SIMULATED"
        );

        setText(
            "navigationHeading",
            "000.0°"
        );

        setText(
            "navigationPositionError",
            "0.00 m"
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
            "humanStatus",
            "FINAL AUTHORITY — AVAILABLE"
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
            "stabilizerState",
            "STANDBY"
        );


        setText(
            "stabilizerMessage",
            "The stabilizer is awaiting simulated environmental assessment."
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
            "recommendedAction",
            "NO SIMULATED RECOMMENDATION"
        );


        setText(
            "actionUrgency",
            "NORMAL"
        );


        setText(
            "responseMode",
            "MONITORING"
        );


        setText(
            "actionRationale",
            "Awaiting simulated environmental assessment."
        );


        setText(
            "operatorNotification",
            "SYSTEM READY. CONTINUOUS SIMULATED MONITORING ACTIVE. NO OPERATOR INTERVENTION REQUESTED."
        );


        setText(
            "audibleIndicator",
            "STANDBY"
        );


        setText(
            "attentionIndicator",
            "STANDBY"
        );


        setText(
            "responseWindowIndicator",
            "NOT ACTIVE"
        );


        setText(
            "humanDecisionIndicator",
            "FINAL AUTHORITY"
        );


        setText(
            "humanDecisionMessage",
            "No operator intervention currently required. Human authority remains available and final."
        );


        setText(
            "output",
            "System ready.\n\n" +
            "Select environmental conditions or a scenario,\n" +
            "then press RUN DP SIMULATION."
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

        setFirstExisting(
            [
                "engineStatus",
                "engine-status",
                "engineState"
            ],
            status
        );

    }


    /* ========================================================
       ENGINE CONNECTION TEST
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
       INITIALIZATION
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
            "[SAFETY] Human authority confirmed FINAL."
        );


        return true;

    }


    /* ========================================================
       PUBLIC BROWSER API
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

    /*
     * REQUIRED BY CURRENT INDEX.HTML
     */

    window.executeDPCockpitScenario =
        executeDPCockpitScenario;

    window.executeRandomDPCockpitScenario =
        executeRandomDPCockpitScenario;

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
       AUTOMATIC BOOT
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
        "VERSION: 2.2.0"
    );

    console.log(
        "MODE: RESEARCH / SIMULATION ONLY"
    );

    console.log(
        "S1 PRIMARY AI: LIVE UI PATH ENABLED"
    );

    console.log(
        "S2 SECONDARY AI: LIVE UI PATH ENABLED"
    );

    console.log(
        "HUMAN AUTHORITY: FINAL"
    );


})();