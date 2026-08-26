/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT — UI CONTROLLER

   FILE:
   dp_cockpit.js

   VERSION:
   2.3.0

   PURPOSE:
   Browser UI controller for the deterministic DP simulation
   engine and the DP Recommended Actions Engine.

   ARCHITECTURE:

   ENVIRONMENT
        ↓
   S1 PRIMARY AI
        ↓
   S2 SECONDARY AI
        ↓
   STABILIZER
        ↓
   RECOMMENDED ACTIONS ENGINE
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

   RECOMMENDATIONS ARE SIMULATED DECISION SUPPORT ONLY.

   HUMAN AUTHORITY REMAINS FINAL.

   AUTONOMOUS COMMAND:
   FALSE

   REAL VESSEL CONNECTION:
   FALSE
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPResilienceCockpit";

    const VERSION =
        "2.3.0";

    const RECOMMENDED_ACTIONS_VERSION =
        "SPD-DP-RECOMMENDED-ACTIONS-V1.1";

    const SAFETY_BOUNDARY =
        "SIMULATION ONLY — NO AUTONOMOUS OPERATIONAL COMMAND";


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


    function setValue(id, value) {

        const node =
            el(id);

        if (!node) {
            return false;
        }

        node.value =
            value;

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
       SAFE NUMBER
    ======================================================== */

    function safeNumber(
        value,
        fallback
    ) {

        const number =
            Number(value);

        if (
            Number.isFinite(number)
        ) {

            return number;

        }

        return fallback || 0;

    }


    /* ========================================================
       INPUT READING
    ======================================================== */

    function readDPInputs() {

        return {

            wind:
                safeNumber(
                    el("wind")?.value,
                    0
                ),

            current:
                safeNumber(
                    el("current")?.value,
                    0
                ),

            wave:
                safeNumber(
                    el("wave")?.value,
                    0
                ),

            tidal:
                safeNumber(
                    el("tidal")?.value,
                    0
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
         * UI PREVIEW ONLY.
         *
         * This value does NOT replace or modify the
         * authoritative environmental stress generated
         * by DPSimulationEngine.
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


        if (
            risk === "MEDIUM"
        ) {

            navigationStatus =
                "SIMULATED NAVIGATION — ELEVATED";

        }


        if (
            risk === "HIGH"
        ) {

            navigationStatus =
                "SIMULATED NAVIGATION — HIGH ATTENTION";

        }


        if (
            risk === "CRITICAL"
        ) {

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
            safeNumber(
                positionError,
                0
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
            node.tagName === "TEXTAREA"
        ) {

            node.value =
                node.value
                    ? node.value +
                      "\n" +
                      line
                    : line;

            node.scrollTop =
                node.scrollHeight;

        }

        else if (
            node.tagName === "PRE"
        ) {

            node.textContent =
                node.textContent
                    ? node.textContent +
                      "\n" +
                      line
                    : line;

            node.scrollTop =
                node.scrollHeight;

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


        const recommendation =
            result.dpRecommendedActions ||
            result.recommendedActionsResult ||
            null;


        const lines = [

            "SYSTEM EVENT LOG",

            "------------------------------------------------------------",

            "Timestamp: " +
                (
                    audit.timestamp ||
                    new Date().toISOString()
                ),

            "Cockpit: " +
                MODULE_NAME,

            "Cockpit Version: " +
                VERSION,

            "Engine: " +
                (
                    audit.engine ||
                    "DPSimulationEngine"
                ),

            "Engine Version: " +
                (
                    audit.version ||
                    "N/A"
                ),

            "Mode: SIMULATION ONLY",

            "Environmental Stress: " +
                safeNumber(
                    result.environment?.environmentalStress,
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

            "Recommended Actions Engine: " +
                (
                    recommendation
                        ? "CONNECTED"
                        : "NOT GENERATED"
                ),

            "Recommended Actions Version: " +
                RECOMMENDED_ACTIONS_VERSION,

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


        if (
            risk === "MEDIUM"
        ) {

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


        if (
            risk === "HIGH"
        ) {

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


        if (
            risk === "CRITICAL"
        ) {

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
            safeNumber(
                stabilizer.finalOutput,
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
       RECOMMENDED ACTIONS ENGINE
    ======================================================== */

    function generateRecommendedActions(
        result
    ) {

        if (!result) {
            return null;
        }


        if (
            typeof window.DPRecommendedActions ===
            "undefined"
        ) {

            appendOperatorLog(
                "[RECOMMENDED ACTIONS] ENGINE NOT LOADED — " +
                "NO RECOMMENDATION GENERATED."
            );

            return null;

        }


        if (
            typeof window.DPRecommendedActions.generate !==
            "function"
        ) {

            appendOperatorLog(
                "[RECOMMENDED ACTIONS] INVALID ENGINE API — " +
                "NO RECOMMENDATION GENERATED."
            );

            return null;

        }


        let recommendation;


        try {

            recommendation =
                window.DPRecommendedActions.generate(
                    result
                );

        }

        catch (error) {

            appendOperatorLog(
                "[RECOMMENDED ACTIONS] ENGINE ERROR — " +
                error.message
            );

            return null;

        }


        if (!recommendation) {

            appendOperatorLog(
                "[RECOMMENDED ACTIONS] NO RESULT GENERATED."
            );

            return null;

        }


        /*
         * Preserve the original simulation result.
         *
         * The recommendation engine is downstream decision
         * support and does not modify the simulation engine.
         */

        result.dpRecommendedActions =
            recommendation;


        appendOperatorLog(
            "[RECOMMENDED ACTIONS] " +
            recommendation.risk +
            " | " +
            (
                recommendation.primary?.priority ||
                "NORMAL"
            )
        );


        return recommendation;

    }


    /* ========================================================
       RENDER RECOMMENDED ACTIONS
    ======================================================== */

    function updateRecommendedActionsDisplay(
        recommendation
    ) {

        if (!recommendation) {

            setFirstExisting(
                [
                    "recommendedAction",
                    "operatorRecommendation",
                    "recommendation"
                ],
                "RECOMMENDED ACTIONS ENGINE NOT AVAILABLE"
            );


            setFirstExisting(
                [
                    "actionUrgency",
                    "urgency"
                ],
                "NOT AVAILABLE"
            );


            setFirstExisting(
                [
                    "responseMode"
                ],
                "SIMULATION ONLY"
            );


            setFirstExisting(
                [
                    "actionRationale",
                    "recommendationRationale",
                    "assessment"
                ],
                "No recommendation generated."
            );


            return false;

        }


        const primary =
            recommendation.primary ||
            {};


        const control =
            recommendation.controlMode ||
            {};


        const heading =
            recommendation.heading ||
            {};


        const separation =
            recommendation.separation ||
            {};


        const operational =
            recommendation.operational ||
            {};


        setFirstExisting(
            [
                "recommendedAction",
                "operatorRecommendation",
                "recommendation"
            ],
            primary.action ||
            "NO SIMULATED RECOMMENDATION"
        );


        setFirstExisting(
            [
                "actionUrgency",
                "urgency"
            ],
            primary.priority ||
            "NORMAL"
        );


        setFirstExisting(
            [
                "responseMode"
            ],
            control.recommendation ||
            operational.status ||
            "MONITORING"
        );


        setFirstExisting(
            [
                "actionRationale",
                "recommendationRationale",
                "assessment"
            ],
            primary.action ||
            operational.description ||
            "Simulation assessment completed."
        );


        /*
         * Optional dedicated recommendation fields.
         */

        setFirstExisting(
            [
                "recommendedPriority",
                "recommendationPriority"
            ],
            primary.priority ||
            "NORMAL"
        );


        setFirstExisting(
            [
                "controlRecommendation",
                "controlStrategy"
            ],
            control.recommendation ||
            "NORMAL MONITORING"
        );


        setFirstExisting(
            [
                "controlDetail",
                "controlStrategyDetail"
            ],
            control.detail ||
            ""
        );


        setFirstExisting(
            [
                "headingRecommendation",
                "headingAction"
            ],
            heading.recommendation ||
            ""
        );


        setFirstExisting(
            [
                "headingDetail"
            ],
            heading.detail ||
            ""
        );


        setFirstExisting(
            [
                "separationRecommendation",
                "separationAction"
            ],
            separation.recommendation ||
            ""
        );


        setFirstExisting(
            [
                "separationDetail"
            ],
            separation.detail ||
            ""
        );


        setFirstExisting(
            [
                "recommendationRisk"
            ],
            recommendation.risk ||
            "UNKNOWN"
        );


        setFirstExisting(
            [
                "recommendationEnvironmentalStress"
            ],
            safeNumber(
                recommendation.environmentalStress,
                0
            ).toFixed(2)
        );


        setFirstExisting(
            [
                "recommendationOperationalStatus",
                "operationalStatus"
            ],
            operational.status ||
            "SIMULATION MONITORING"
        );


        /*
         * Secondary recommendations.
         */

        const secondary =
            Array.isArray(
                recommendation.secondary
            )
                ? recommendation.secondary
                : [];


        const actionNode =
            firstExisting([
                "recommendedActions",
                "operatorActions",
                "solutionOptions"
            ]);


        if (actionNode) {

            /*
             * Only clear and rewrite a list-type container.
             */

            if (
                actionNode.tagName === "UL" ||
                actionNode.tagName === "OL"
            ) {

                actionNode.innerHTML = "";


                const allActions =
                    [];


                if (
                    primary.action
                ) {

                    allActions.push(
                        {
                            category:
                                "PRIMARY",
                            action:
                                primary.action
                        }
                    );

                }


                if (
                    control.recommendation
                ) {

                    allActions.push(
                        {
                            category:
                                "CONTROL",
                            action:
                                control.recommendation
                        }
                    );

                }


                if (
                    heading.recommendation
                ) {

                    allActions.push(
                        {
                            category:
                                "HEADING / POSITION",
                            action:
                                heading.recommendation
                        }
                    );

                }


                if (
                    separation.recommendation
                ) {

                    allActions.push(
                        {
                            category:
                                "SEPARATION",
                            action:
                                separation.recommendation
                        }
                    );


                }


                secondary.forEach(
                    function (item) {

                        if (!item) {
                            return;
                        }


                        allActions.push(
                            {
                                category:
                                    item.category ||
                                    "SECONDARY",
                                action:
                                    item.action ||
                                    ""
                            }
                        );

                    }
                );


                allActions.forEach(
                    function (item) {

                        const li =
                            document.createElement(
                                "li"
                            );


                        li.textContent =
                            item.category +
                            ": " +
                            item.action;


                        actionNode.appendChild(
                            li
                        );

                    }
                );

            }

        }


        return true;

    }


    /* ========================================================
       OPERATOR RECOMMENDATION
    ======================================================== */

    function updateOperatorRecommendation(
        result
    ) {

        if (!result) {
            return;
        }


        const recommendation =
            result.dpRecommendedActions ||
            generateRecommendedActions(
                result
            );


        if (
            recommendation
        ) {

            updateRecommendedActionsDisplay(
                recommendation
            );

            return;

        }


        /*
         * Compatibility fallback.
         *
         * This supports older simulation result structures
         * without creating an operational command.
         */

        const legacy =
            result.recommendedAction ||
            result.recommendation ||
            {};


        const primary =
            legacy.primaryRecommendation ||
            legacy.primary ||
            "NO SIMULATED RECOMMENDATION";


        const urgency =
            legacy.urgency ||
            (
                result.risk === "CRITICAL"
                    ? "IMMEDIATE HUMAN REVIEW"
                    : "NORMAL"
            );


        const responseMode =
            legacy.responseMode ||
            "MONITORING";


        const rationale =
            legacy.rationale ||
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


        const risk =
            String(
                result.risk ||
                "UNKNOWN"
            ).toUpperCase();


        let notification =
            "SYSTEM READY. " +
            "CONTINUOUS SIMULATED MONITORING ACTIVE. " +
            "NO OPERATOR INTERVENTION REQUESTED.";


        if (
            risk === "MEDIUM"
        ) {

            notification =
                "ELEVATED SIMULATED CONDITION. " +
                "INCREASED OPERATOR ATTENTION RECOMMENDED.";

        }


        if (
            risk === "HIGH"
        ) {

            notification =
                "HIGH SIMULATED CONDITION. " +
                "HUMAN REVIEW REQUIRED.";

        }


        if (
            risk === "CRITICAL"
        ) {

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

    function updateResponseIndicators(
        result
    ) {

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


        if (
            risk === "MEDIUM"
        ) {

            attention =
                "MONITOR";

        }


        if (
            risk === "HIGH"
        ) {

            attention =
                "ATTENTION";

            responseWindow =
                "ACTIVE";

        }


        if (
            risk === "CRITICAL"
        ) {

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

    function updateSimulationAssessment(
        result
    ) {

        if (!result) {
            return;
        }


        const environment =
            result.environment ||
            {};


        const recommendation =
            result.dpRecommendedActions ||
            null;


        const message = [

            "SIMULATION COMPLETED.",

            "",

            "Environmental Stress: " +
                safeNumber(
                    environment.environmentalStress,
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

            "Recommended Actions Engine: " +
                (
                    recommendation
                        ? "ACTIVE"
                        : "NOT AVAILABLE"
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

    function updateEnvironmentalStress(
        result
    ) {

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

    function updateSimulatedAction(
        result
    ) {

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
            safeNumber(
                action.simulatedCommand,
                0
            ).toFixed(2)
        );


        setText(
            "dpActionOutput",
            safeNumber(
                action.simulatedCommand,
                0
            ).toFixed(2)
        );


        /*
         * HARD SAFETY DISPLAY.
         *
         * Even if a malformed result contains operational
         * fields, the cockpit explicitly reports the
         * simulation boundary.
         */

        setText(
            "operationalCommand",
            "FALSE"
        );


        setText(
            "realVesselConnection",
            "FALSE"
        );

    }


    /* ========================================================
       SIMULATED VESSEL STATE
    ======================================================== */

    function updateSimulatedState(
        result
    ) {

        if (!result) {
            return;
        }


        const state =
            result.updatedState ||
            {};


        setText(
            "navigationPositionError",
            safeNumber(
                state.positionError,
                0
            ).toFixed(2) +
            " m"
        );


        setText(
            "positionError",
            safeNumber(
                state.positionError,
                0
            ).toFixed(2)
        );


        setText(
            "stabilityIndex",
            safeNumber(
                state.stabilityIndex,
                0
            ).toFixed(2)
        );


        setText(
            "simulatedStability",
            safeNumber(
                state.stabilityIndex,
                0
            ).toFixed(2)
        );

    }


    /* ========================================================
       COMPLETE UI UPDATE
    ======================================================== */

    function updateCockpitFromSimulation(
        result
    ) {

        if (!result) {
            return false;
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


        updatePrimaryAI(
            result
        );


        updateSecondaryAI(
            result
        );


        updateResilienceAlert(
            result
        );


        updateStabilizerDisplay(
            result
        );


        /*
         * RECOMMENDED ACTIONS ENGINE
         *
         * This is deliberately downstream of the
         * simulation result and stabilizer.
         */

        const recommendation =
            generateRecommendedActions(
                result
            );


        if (recommendation) {

            updateRecommendedActionsDisplay(
                recommendation
            );

        }


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


        window.lastDPRecommendedActions =
            recommendation ||
            null;


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
            safeNumber(
                result.environment?.environmentalStress,
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
            " | Recommended Actions=" +
            (
                result.dpRecommendedActions
                    ? "ACTIVE"
                    : "N/A"
            ) +
            " | Human Authority=FINAL"

        );


        appendOperatorLog(
            "[SAFETY] No operational command issued. Simulation only."
        );


        appendOperatorLog(
            "[SAFETY] Real vessel connection = FALSE."
        );


        return result;

    }


    /* ========================================================
       SCENARIO EXECUTION
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


        setFirstExisting(
            [
                "recommendedAction",
                "operatorRecommendation",
                "recommendation"
            ],
            "NO SIMULATED RECOMMENDATION"
        );


        setFirstExisting(
            [
                "actionUrgency",
                "urgency"
            ],
            "NORMAL"
        );


        setFirstExisting(
            [
                "responseMode"
            ],
            "MONITORING"
        );


        setFirstExisting(
            [
                "actionRationale",
                "recommendationRationale",
                "assessment"
            ],
            "Awaiting simulated environmental assessment."
        );


        setFirstExisting(
            [
                "recommendedPriority",
                "recommendationPriority"
            ],
            "NORMAL"
        );


        setFirstExisting(
            [
                "controlRecommendation",
                "controlStrategy"
            ],
            "NORMAL MONITORING"
        );


        setFirstExisting(
            [
                "controlDetail",
                "controlStrategyDetail"
            ],
            ""
        );


        setFirstExisting(
            [
                "headingRecommendation",
                "headingAction"
            ],
            ""
        );


        setFirstExisting(
            [
                "headingDetail"
            ],
            ""
        );


        setFirstExisting(
            [
                "separationRecommendation",
                "separationAction"
            ],
            ""
        );


        setFirstExisting(
            [
                "separationDetail"
            ],
            ""
        );


        setFirstExisting(
            [
                "recommendationRisk"
            ],
            "UNKNOWN"
        );


        setFirstExisting(
            [
                "recommendationEnvironmentalStress"
            ],
            "0.00"
        );


        setFirstExisting(
            [
                "recommendationOperationalStatus",
                "operationalStatus"
            ],
            "NORMAL SIMULATION MONITORING"
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
            "operationalCommand",
            "FALSE"
        );


        setText(
            "realVesselConnection",
            "FALSE"
        );


        setText(
            "output",
            "System ready.\n\n" +
            "Select environmental conditions or a scenario,\n" +
            "then press RUN DP SIMULATION."
        );


        window.lastDPSimulation =
            null;


        window.lastDPRecommendedActions =
            null;


        appendOperatorLog(
            "[SYSTEM] DP resilience cockpit reset."
        );


        appendOperatorLog(
            "[SAFETY] Recommended Actions Engine reset."
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

    function updateEngineStatus(
        status
    ) {

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
       RECOMMENDED ACTIONS ENGINE CONNECTION TEST
    ======================================================== */

    function testRecommendedActionsConnection() {

        if (
            typeof window.DPRecommendedActions ===
            "undefined"
        ) {

            setFirstExisting(
                [
                    "recommendedActionsEngineStatus",
                    "recommendationEngineStatus"
                ],
                "RECOMMENDED ACTIONS ENGINE OFFLINE"
            );


            appendOperatorLog(
                "[WARNING] DP Recommended Actions Engine not loaded."
            );


            return false;

        }


        if (
            typeof window.DPRecommendedActions.generate !==
            "function"
        ) {

            setFirstExisting(
                [
                    "recommendedActionsEngineStatus",
                    "recommendationEngineStatus"
                ],
                "RECOMMENDED ACTIONS ENGINE ERROR"
            );


            appendOperatorLog(
                "[ERROR] DPRecommendedActions.generate() missing."
            );


            return false;

        }


        setFirstExisting(
            [
                "recommendedActionsEngineStatus",
                "recommendationEngineStatus"
            ],
            "RECOMMENDED ACTIONS ENGINE ONLINE"
        );


        appendOperatorLog(
            "[SYSTEM] DP Recommended Actions Engine connected — " +
            RECOMMENDED_ACTIONS_VERSION
        );


        return true;

    }


    /* ========================================================
       MOBILE DIAGNOSTIC
    ======================================================== */

    function runMobileEngineDiagnostic() {

        const simulationEngine =
            testDPEngineConnection();


        const recommendationEngine =
            testRecommendedActionsConnection();


        return (
            simulationEngine &&
            recommendationEngine
        );

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


        /*
         * Recommendation engine is downstream support.
         *
         * A missing recommendation engine does NOT prevent
         * the underlying DP simulation from operating.
         */

        testRecommendedActionsConnection();


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


        setText(
            "operationalCommand",
            "FALSE"
        );


        setText(
            "realVesselConnection",
            "FALSE"
        );


        appendOperatorLog(
            "[SAFETY] Human authority confirmed FINAL."
        );


        appendOperatorLog(
            "[SAFETY] Autonomous operational command = FALSE."
        );


        appendOperatorLog(
            "[SAFETY] Real vessel connection = FALSE."
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


    window.testRecommendedActionsConnection =
        testRecommendedActionsConnection;


    window.runMobileEngineDiagnostic =
        runMobileEngineDiagnostic;


    window.initializeDPCockpit =
        initializeDPCockpit;


    window.generateRecommendedActions =
        generateRecommendedActions;


    window.updateRecommendedActionsDisplay =
        updateRecommendedActionsDisplay;


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
        "VERSION: " +
        VERSION
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
        "STABILIZER: LIVE UI PATH ENABLED"
    );


    console.log(
        "RECOMMENDED ACTIONS ENGINE: " +
        RECOMMENDED_ACTIONS_VERSION
    );


    console.log(
        "HUMAN AUTHORITY: FINAL"
    );


    console.log(
        "AUTONOMOUS COMMAND: FALSE"
    );


    console.log(
        "REAL VESSEL CONNECTION: FALSE"
    );


})();