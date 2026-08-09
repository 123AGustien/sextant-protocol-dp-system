/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP RESILIENCE RECOMMENDATION MANAGER
 * ============================================================
 *
 * File:
 *     dp_recommendation_manager.js
 *
 * Version:
 *     SPD-DP-RECOMMENDATION-V1
 *
 * Purpose:
 *     Decision-support presentation layer for the
 *     Sextant Protocol DP Resilience Simulation Demonstrator.
 *
 * Architecture:
 *
 *     SCENARIO
 *        ↓
 *     ENVIRONMENTAL ASSESSMENT
 *        ↓
 *     SECONDARY VERIFICATION
 *        ↓
 *     STABILIZER
 *        ↓
 *     RECOMMENDATION MANAGER
 *        ↓
 *     HUMAN DECISION
 *
 * SAFETY:
 *
 *     RESEARCH / SIMULATION USE ONLY.
 *
 *     This module does NOT issue operational commands.
 *
 *     It does NOT control:
 *
 *       - DP
 *       - Thrusters
 *       - Propulsion
 *       - Steering
 *       - Navigation
 *       - Joystick systems
 *       - Vessel automation
 *
 *     All displayed actions are simulated
 *     decision-support recommendations.
 *
 *     HUMAN OPERATOR RETAINS FINAL AUTHORITY.
 *
 * ============================================================
 */


/* ============================================================
   RECOMMENDATION STATE
   ============================================================ */

const DPRecommendationManager = {

    activeScenario:
        null,

    activeRecommendation:
        null,

    timestamp:
        null,

    history:
        [],

    version:
        "SPD-DP-RECOMMENDATION-V1"

};


/* ============================================================
   SAFE TEXT HELPER
   ============================================================ */

function dpRecommendationText(
    value,
    fallback
) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return fallback || "";

    }

    return String(value);

}


/* ============================================================
   GET CURRENT SCENARIO RESPONSE
   ============================================================ */

function getActiveDPRecommendation(
    scenarioName
) {

    if (
        typeof getDPScenarioResponse !==
        "function"
    ) {

        console.warn(
            "getDPScenarioResponse() is not available."
        );

        return null;
    }


    return getDPScenarioResponse(
        scenarioName
    );

}


/* ============================================================
   UPDATE RECOMMENDATION
   ============================================================ */

function updateDPScenarioRecommendation(
    scenarioName
) {

    const response =
        getActiveDPRecommendation(
            scenarioName
        );


    if (!response) {

        console.warn(
            "No recommendation profile found:",
            scenarioName
        );

        return null;
    }


    DPRecommendationManager.activeScenario =
        scenarioName;

    DPRecommendationManager.activeRecommendation =
        response;

    DPRecommendationManager.timestamp =
        new Date().toISOString();


    DPRecommendationManager.history.push({

        timestamp:
            DPRecommendationManager.timestamp,

        scenario:
            scenarioName,

        priority:
            response.priority,

        status:
            response.status,

        primaryRecommendation:
            response.primaryRecommendation,

        operatorDecision:
            response.operatorDecision

    });


    /*
     * Limit local browser history.
     */

    if (
        DPRecommendationManager.history.length >
        100
    ) {

        DPRecommendationManager.history.shift();

    }


    renderDPRecommendation(
        scenarioName,
        response
    );


    return response;

}


/* ============================================================
   CREATE RECOMMENDATION PANEL
   ============================================================ */

function ensureDPRecommendationPanel() {

    let panel =
        document.getElementById(
            "dpRecommendationPanel"
        );


    if (panel) {

        return panel;

    }


    /*
     * Create the panel dynamically so the module
     * does not require a hard dependency on index.html.
     */

    panel =
        document.createElement(
            "div"
        );


    panel.id =
        "dpRecommendationPanel";

    panel.className =
        "panel";


    panel.innerHTML = `

        <h2>
            🧭 Simulated Recommended Response
        </h2>

        <div
            id="dpRecommendationPriority"
            class="status-value"
            style="
                margin-bottom:10px;
                font-size:16px;
            "
        >
            STANDBY
        </div>


        <div
            id="dpRecommendationStatus"
            style="
                margin-bottom:12px;
                font-weight:bold;
            "
        >
            Awaiting simulated scenario.
        </div>


        <div
            style="
                background:#050c14;
                border:1px solid #29445f;
                border-radius:6px;
                padding:12px;
                margin-bottom:12px;
            "
        >

            <div
                style="
                    color:#91a8bd;
                    font-size:11px;
                    margin-bottom:5px;
                "
            >
                PRIMARY RECOMMENDATION
            </div>

            <div
                id="dpPrimaryRecommendation"
                style="
                    font-weight:bold;
                    line-height:1.5;
                "
            >
                No recommendation available.
            </div>

        </div>


        <div
            style="
                background:#050c14;
                border:1px solid #29445f;
                border-radius:6px;
                padding:12px;
                margin-bottom:12px;
            "
        >

            <div
                style="
                    color:#91a8bd;
                    font-size:11px;
                    margin-bottom:5px;
                "
            >
                SIMULATED RESPONSE OPTIONS
            </div>

            <ol
                id="dpRecommendedActions"
                style="
                    margin:0;
                    padding-left:22px;
                    line-height:1.7;
                "
            >

                <li>
                    Awaiting scenario assessment.
                </li>

            </ol>

        </div>


        <div
            style="
                background:#0b1825;
                border:2px solid #587590;
                border-radius:6px;
                padding:12px;
                margin-bottom:12px;
            "
        >

            <div
                style="
                    font-size:11px;
                    color:#91a8bd;
                    margin-bottom:5px;
                "
            >
                HUMAN DECISION
            </div>

            <div
                id="dpOperatorDecision"
                style="
                    font-weight:bold;
                    line-height:1.5;
                "
            >
                HUMAN AUTHORITY AVAILABLE
            </div>

        </div>


        <div
            style="
                background:#091827;
                border:1px solid #29445f;
                border-radius:6px;
                padding:10px;
                font-size:11px;
                line-height:1.6;
                color:#9fb3c8;
            "
        >

            SAFETY BOUNDARY:
            These are simulated decision-support
            recommendations only. No operational command
            is generated. Human operator authority remains
            final.

        </div>

    `;


    /*
     * Place after the scenario controls where possible.
     */

    const container =
        document.querySelector(
            ".container"
        );


    if (container) {

        const scenarioPanel =
            Array.from(
                container.querySelectorAll(
                    ".panel"
                )
            ).find(
                panelElement =>
                    panelElement.textContent
                        .includes(
                            "Scenario Controls"
                        )
            );


        if (
            scenarioPanel &&
            scenarioPanel.parentNode
        ) {

            scenarioPanel.parentNode.insertBefore(
                panel,
                scenarioPanel.nextSibling
            );

        } else {

            container.appendChild(
                panel
            );

        }

    }


    return panel;

}


/* ============================================================
   RENDER RECOMMENDATION
   ============================================================ */

function renderDPRecommendation(
    scenarioName,
    response
) {

    const panel =
        ensureDPRecommendationPanel();


    if (!panel) {

        return;

    }


    const priority =
        document.getElementById(
            "dpRecommendationPriority"
        );


    const status =
        document.getElementById(
            "dpRecommendationStatus"
        );


    const primary =
        document.getElementById(
            "dpPrimaryRecommendation"
        );


    const actions =
        document.getElementById(
            "dpRecommendedActions"
        );


    const decision =
        document.getElementById(
            "dpOperatorDecision"
        );


    if (priority) {

        priority.textContent =
            "PRIORITY: " +
            dpRecommendationText(
                response.priority,
                "UNKNOWN"
            );

    }


    if (status) {

        status.textContent =
            "SCENARIO: " +
            dpRecommendationText(
                scenarioName,
                "UNKNOWN"
            ) +
            " • " +
            dpRecommendationText(
                response.status,
                "MONITORING"
            );

    }


    if (primary) {

        primary.textContent =
            dpRecommendationText(
                response.primaryRecommendation,
                "No primary recommendation available."
            );

    }


    if (actions) {

        actions.innerHTML = "";


        const recommendedActions =
            Array.isArray(
                response.recommendedActions
            )
                ? response.recommendedActions
                : [];


        if (
            recommendedActions.length ===
            0
        ) {

            const item =
                document.createElement(
                    "li"
                );

            item.textContent =
                "No additional simulated response option.";

            actions.appendChild(
                item
            );

        } else {

            recommendedActions.forEach(
                function (action) {

                    const item =
                        document.createElement(
                            "li"
                        );

                    item.textContent =
                        dpRecommendationText(
                            action,
                            ""
                        );

                    actions.appendChild(
                        item
                    );

                }
            );

        }

    }


    if (decision) {

        decision.textContent =
            dpRecommendationText(
                response.operatorDecision,
                "HUMAN AUTHORITY AVAILABLE"
            );

    }


    applyDPRecommendationPriorityStyle(
        response.priority
    );


    addDPRecommendationEvent(
        scenarioName,
        response
    );

}


/* ============================================================
   PRIORITY PRESENTATION
   ============================================================ */

function applyDPRecommendationPriorityStyle(
    priority
) {

    const panel =
        document.getElementById(
            "dpRecommendationPanel"
        );


    const priorityElement =
        document.getElementById(
            "dpRecommendationPriority"
        );


    if (
        !panel ||
        !priorityElement
    ) {

        return;

    }


    const level =
        String(
            priority || "LOW"
        ).toUpperCase();


    /*
     * Reset presentation.
     */

    panel.style.borderColor =
        "#29445f";

    priorityElement.style.color =
        "#e8f0f7";


    if (
        level === "MEDIUM"
    ) {

        panel.style.borderColor =
            "#d9a441";

        priorityElement.style.color =
            "#d9a441";

        return;

    }


    if (
        level === "HIGH"
    ) {

        panel.style.borderColor =
            "#d98b41";

        priorityElement.style.color =
            "#d98b41";

        return;

    }


    if (
        level === "CRITICAL"
    ) {

        panel.style.borderColor =
            "#d94a4a";

        priorityElement.style.color =
            "#d94a4a";

        return;

    }

}


/* ============================================================
   RECOMMENDATION EVENT LOG
   ============================================================ */

function addDPRecommendationEvent(
    scenarioName,
    response
) {

    const log =
        document.getElementById(
            "eventLog"
        );


    if (!log) {

        return;

    }


    const entry =
        document.createElement(
            "div"
        );


    entry.className =
        "event-entry";


    const timestamp =
        new Date().toISOString();


    entry.textContent =
        "[" +
        timestamp +
        "] [RECOMMENDATION] " +
        "Scenario=" +
        scenarioName +
        " | Priority=" +
        (
            response.priority ||
            "UNKNOWN"
        ) +
        " | Human Authority Retained";


    log.appendChild(
        entry
    );


    log.scrollTop =
        log.scrollHeight;

}


/* ============================================================
   RESET
   ============================================================ */

function resetDPRecommendationManager() {

    DPRecommendationManager.activeScenario =
        null;

    DPRecommendationManager.activeRecommendation =
        null;

    DPRecommendationManager.timestamp =
        null;


    const priority =
        document.getElementById(
            "dpRecommendationPriority"
        );


    const status =
        document.getElementById(
            "dpRecommendationStatus"
        );


    const primary =
        document.getElementById(
            "dpPrimaryRecommendation"
        );


    const actions =
        document.getElementById(
            "dpRecommendedActions"
        );


    const decision =
        document.getElementById(
            "dpOperatorDecision"
        );


    if (priority) {

        priority.textContent =
            "STANDBY";

    }


    if (status) {

        status.textContent =
            "Awaiting simulated scenario.";

    }


    if (primary) {

        primary.textContent =
            "No recommendation available.";

    }


    if (actions) {

        actions.innerHTML =
            "<li>Awaiting scenario assessment.</li>";

    }


    if (decision) {

        decision.textContent =
            "HUMAN AUTHORITY AVAILABLE";

    }


    applyDPRecommendationPriorityStyle(
        "LOW"
    );

}


/* ============================================================
   GET RECOMMENDATION HISTORY
   ============================================================ */

function getDPRecommendationHistory() {

    return [
        ...DPRecommendationManager.history
    ];

}


/* ============================================================
   BROWSER EXPORT
   ============================================================ */

if (
    typeof window !==
    "undefined"
) {

    window.DPRecommendationManager =
        DPRecommendationManager;

    window.updateDPScenarioRecommendation =
        updateDPScenarioRecommendation;

    window.renderDPRecommendation =
        renderDPRecommendation;

    window.resetDPRecommendationManager =
        resetDPRecommendationManager;

    window.getDPRecommendationHistory =
        getDPRecommendationHistory;

}


/* ============================================================
   DOM STARTUP
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /*
         * Panel is created only when needed.
         * This keeps the module compatible with the
         * existing cockpit structure.
         */

        console.log(
            "SEXTANT PROTOCOL DP RECOMMENDATION MANAGER — READY"
        );

    }
);


/*
 * ============================================================
 * GOLDEN SAFETY PRINCIPLE
 * ============================================================
 *
 * OBSERVE
 *    ↓
 * VERIFY
 *    ↓
 * ASSESS
 *    ↓
 * RECOMMEND
 *    ↓
 * HUMAN DECISION
 *    ↓
 * UPDATE
 *
 * The recommendation manager never becomes the vessel
 * command authority.
 *
 * It presents options for qualified human consideration.
 *
 * ============================================================
 */