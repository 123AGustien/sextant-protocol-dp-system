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
 *     SPD-DP-RECOMMENDATION-V1.1
 *
 * PURPOSE:
 *     Presentation and audit layer for deterministic
 *     simulated operator recommendations.
 *
 * PIPELINE:
 *
 *     DP SIMULATION ENGINE
 *             ↓
 *     ENVIRONMENTAL ASSESSMENT
 *             ↓
 *     SECONDARY SAFETY VERIFICATION
 *             ↓
 *     STABILIZER
 *             ↓
 *     RECOMMENDED ACTIONS ENGINE
 *             ↓
 *     RECOMMENDATION MANAGER
 *             ↓
 *     HUMAN DECISION
 *
 * SAFETY:
 *
 *     RESEARCH / SIMULATION ONLY.
 *
 *     This module NEVER commands:
 *
 *       - DP
 *       - Thrusters
 *       - Propulsion
 *       - Steering
 *       - Navigation
 *       - Joystick
 *       - Vessel automation
 *
 *     All recommendations are decision-support information.
 *
 *     HUMAN OPERATOR RETAINS FINAL AUTHORITY.
 *
 * ============================================================
 */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPRecommendationManager";

    const VERSION =
        "SPD-DP-RECOMMENDATION-V1.1";


    const SAFETY_BOUNDARY =
        "SIMULATION ONLY — NO AUTONOMOUS OPERATIONAL COMMAND";


    /* ========================================================
       STATE
    ======================================================== */

    const state = {

        active:
            null,

        history:
            []

    };


    /* ========================================================
       SAFE TEXT
    ======================================================== */

    function safeText(
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


    /* ========================================================
       GENERATE RECOMMENDATION
    ======================================================== */

    function generate(
        simulationResult
    ) {

        if (
            !simulationResult
        ) {

            return null;

        }


        /*
         * The actual recommendation logic belongs
         * to dp_recommended_actions.js.
         */

        if (
            typeof DPRecommendedActions ===
            "undefined"
        ) {

            console.error(
                "DPRecommendedActions module not loaded."
            );

            return null;

        }


        const recommendations =
            DPRecommendedActions.generate(
                simulationResult
            );


        if (
            !recommendations
        ) {

            return null;

        }


        state.active =
            recommendations;


        /*
         * Preserve a bounded local audit history.
         */

        state.history.push({

            timestamp:
                new Date().toISOString(),

            risk:
                recommendations.risk,

            environmentalStress:
                recommendations.environmentalStress,

            primary:
                recommendations.primary,

            controlMode:
                recommendations.controlMode,

            heading:
                recommendations.heading,

            separation:
                recommendations.separation,

            operational:
                recommendations.operational,

            humanAuthority:
                recommendations.humanAuthority,

            autonomousCommand:
                recommendations.autonomousCommand

        });


        if (
            state.history.length >
            100
        ) {

            state.history.shift();

        }


        render(
            recommendations
        );


        addEvent(
            recommendations
        );


        return recommendations;

    }


    /* ========================================================
       CREATE PANEL
    ======================================================== */

    function ensurePanel() {

        let panel =
            document.getElementById(
                "dpRecommendationPanel"
            );


        if (
            panel
        ) {

            return panel;

        }


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
                🧭 Simulated Recommended Operator Response
            </h2>

            <div
                id="dpRecommendationPriority"
                class="status-value"
                style="
                    font-size:17px;
                    margin-bottom:10px;
                "
            >
                STANDBY
            </div>


            <div
                id="dpRecommendationRisk"
                style="
                    margin-bottom:12px;
                    color:#9fb3c8;
                    font-family:monospace;
                "
            >
                NO ACTIVE SIMULATION
            </div>


            <div
                style="
                    background:#050c14;
                    border:1px solid #29445f;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:6px;
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
                    Awaiting simulation.
                </div>

            </div>


            <div
                style="
                    background:#050c14;
                    border:1px solid #29445f;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:8px;
                    "
                >
                    CONTROL STRATEGY
                </div>

                <div
                    id="dpControlRecommendation"
                    style="
                        line-height:1.5;
                    "
                >
                    Awaiting assessment.
                </div>

            </div>


            <div
                style="
                    background:#050c14;
                    border:1px solid #29445f;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:8px;
                    "
                >
                    HEADING / POSITION
                </div>

                <div
                    id="dpHeadingRecommendation"
                    style="
                        line-height:1.5;
                    "
                >
                    Awaiting assessment.
                </div>

            </div>


            <div
                style="
                    background:#050c14;
                    border:1px solid #29445f;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:8px;
                    "
                >
                    SAFE SEPARATION
                </div>

                <div
                    id="dpSeparationRecommendation"
                    style="
                        line-height:1.5;
                    "
                >
                    Awaiting assessment.
                </div>

            </div>


            <div
                style="
                    background:#050c14;
                    border:1px solid #29445f;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:8px;
                    "
                >
                    ADDITIONAL ENVIRONMENTAL CONSIDERATIONS
                </div>

                <ol
                    id="dpEnvironmentalRecommendations"
                    style="
                        margin:0;
                        padding-left:22px;
                        line-height:1.7;
                    "
                >

                    <li>
                        Awaiting assessment.
                    </li>

                </ol>

            </div>


            <div
                style="
                    background:#0b1825;
                    border:2px solid #587590;
                    border-radius:6px;
                    padding:13px;
                    margin-bottom:12px;
                "
            >

                <div
                    style="
                        font-size:11px;
                        color:#91a8bd;
                        margin-bottom:6px;
                    "
                >
                    HUMAN DECISION
                </div>

                <div
                    id="dpHumanDecision"
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
                    padding:11px;
                    font-size:11px;
                    line-height:1.6;
                    color:#9fb3c8;
                "
            >

                SAFETY BOUNDARY:<br>

                ${SAFETY_BOUNDARY}.<br><br>

                Recommendations such as heading review,
                manual / joystick consideration, reduced
                exposure or increased separation are
                simulated operator considerations only.

                No automatic vessel command is generated.

            </div>

        `;


        const container =
            document.querySelector(
                ".container"
            );


        if (
            container
        ) {

            const scenarioPanel =
                Array.from(
                    container.querySelectorAll(
                        ".panel"
                    )
                ).find(
                    function (element) {

                        return element.textContent
                            .includes(
                                "Scenario Controls"
                            );

                    }
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


    /* ========================================================
       RENDER
    ======================================================== */

    function render(
        recommendations
    ) {

        const panel =
            ensurePanel();


        if (
            !panel
        ) {

            return;

        }


        const priority =
            document.getElementById(
                "dpRecommendationPriority"
            );


        const risk =
            document.getElementById(
                "dpRecommendationRisk"
            );


        const primary =
            document.getElementById(
                "dpPrimaryRecommendation"
            );


        const control =
            document.getElementById(
                "dpControlRecommendation"
            );


        const heading =
            document.getElementById(
                "dpHeadingRecommendation"
            );


        const separation =
            document.getElementById(
                "dpSeparationRecommendation"
            );


        const environmental =
            document.getElementById(
                "dpEnvironmentalRecommendations"
            );


        const human =
            document.getElementById(
                "dpHumanDecision"
            );


        if (
            priority
        ) {

            priority.textContent =
                "PRIORITY: " +
                safeText(
                    recommendations.primary.priority,
                    "UNKNOWN"
                );

        }


        if (
            risk
        ) {

            risk.textContent =
                "SIMULATED RISK: " +
                safeText(
                    recommendations.risk,
                    "UNKNOWN"
                ) +
                " • ENVIRONMENTAL STRESS: " +
                Number(
                    recommendations.environmentalStress || 0
                ).toFixed(2);

        }


        if (
            primary
        ) {

            primary.textContent =
                safeText(
                    recommendations.primary.action,
                    "No primary recommendation."
                );

        }


        if (
            control
        ) {

            control.textContent =
                safeText(
                    recommendations.controlMode.recommendation,
                    "No control recommendation."
                ) +
                " — " +
                safeText(
                    recommendations.controlMode.detail,
                    ""
                );

        }


        if (
            heading
        ) {

            heading.textContent =
                safeText(
                    recommendations.heading.recommendation,
                    "No heading recommendation."
                ) +
                " — " +
                safeText(
                    recommendations.heading.detail,
                    ""
                );

        }


        if (
            separation
        ) {

            separation.textContent =
                safeText(
                    recommendations.separation.recommendation,
                    "No separation recommendation."
                ) +
                " — " +
                safeText(
                    recommendations.separation.detail,
                    ""
                );

        }


        if (
            environmental
        ) {

            environmental.innerHTML =
                "";


            const list =
                Array.isArray(
                    recommendations.secondary
                )
                    ? recommendations.secondary
                    : [];


            if (
                list.length === 0
            ) {

                const item =
                    document.createElement(
                        "li"
                    );

                item.textContent =
                    "No additional environmental recommendation.";

                environmental.appendChild(
                    item
                );

            } else {

                list.forEach(
                    function (recommendation) {

                        const item =
                            document.createElement(
                                "li"
                            );

                        item.textContent =
                            safeText(
                                recommendation.action,
                                ""
                            );

                        environmental.appendChild(
                            item
                        );

                    }
                );

            }

        }


        if (
            human
        ) {

            human.textContent =
                "HUMAN AUTHORITY: " +
                safeText(
                    recommendations.humanAuthority,
                    "FINAL"
                ) +
                " • AUTONOMOUS COMMAND: " +
                (
                    recommendations.autonomousCommand === false
                        ? "NONE"
                        : "NOT PERMITTED"
                );

        }


        applyPriorityStyle(
            recommendations.primary.priority
        );

    }


    /* ========================================================
       PRIORITY STYLE
    ======================================================== */

    function applyPriorityStyle(
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
                priority || "NORMAL"
            ).toUpperCase();


        panel.style.borderColor =
            "#29445f";

        priorityElement.style.color =
            "#e8f0f7";


        if (
            level.includes("ADVISORY") ||
            level.includes("NORMAL")
        ) {

            return;

        }


        if (
            level.includes("HIGH")
        ) {

            panel.style.borderColor =
                "#d98b41";

            priorityElement.style.color =
                "#d98b41";

            return;

        }


        if (
            level.includes("IMMEDIATE") ||
            level.includes("CRITICAL")
        ) {

            panel.style.borderColor =
                "#d94a4a";

            priorityElement.style.color =
                "#d94a4a";

        }

    }


    /* ========================================================
       EVENT LOG
    ======================================================== */

    function addEvent(
        recommendations
    ) {

        const log =
            document.getElementById(
                "eventLog"
            );


        if (
            !log
        ) {

            return;

        }


        const entry =
            document.createElement(
                "div"
            );


        entry.className =
            "event-entry";


        entry.textContent =
            "[" +
            new Date().toISOString() +
            "] [RECOMMENDATION] " +
            "Risk=" +
            safeText(
                recommendations.risk,
                "UNKNOWN"
            ) +
            " | Priority=" +
            safeText(
                recommendations.primary.priority,
                "UNKNOWN"
            ) +
            " | Human Authority Retained";


        log.appendChild(
            entry
        );


        log.scrollTop =
            log.scrollHeight;

    }


    /* ========================================================
       RESET
    ======================================================== */

    function reset() {

        state.active =
            null;


        const priority =
            document.getElementById(
                "dpRecommendationPriority"
            );


        const risk =
            document.getElementById(
                "dpRecommendationRisk"
            );


        const primary =
            document.getElementById(
                "dpPrimaryRecommendation"
            );


        const control =
            document.getElementById(
                "dpControlRecommendation"
            );


        const heading =
            document.getElementById(
                "dpHeadingRecommendation"
            );


        const separation =
            document.getElementById(
                "dpSeparationRecommendation"
            );


        const environmental =
            document.getElementById(
                "dpEnvironmentalRecommendations"
            );


        const human =
            document.getElementById(
                "dpHumanDecision"
            );


        if (
            priority
        ) {

            priority.textContent =
                "STANDBY";

        }


        if (
            risk
        ) {

            risk.textContent =
                "NO ACTIVE SIMULATION";

        }


        if (
            primary
        ) {

            primary.textContent =
                "Awaiting simulation.";

        }


        if (
            control
        ) {

            control.textContent =
                "Awaiting assessment.";

        }


        if (
            heading
        ) {

            heading.textContent =
                "Awaiting assessment.";

        }


        if (
            separation
        ) {

            separation.textContent =
                "Awaiting assessment.";

        }


        if (
            environmental
        ) {

            environmental.innerHTML =
                "<li>Awaiting assessment.</li>";

        }


        if (
            human
        ) {

            human.textContent =
                "HUMAN AUTHORITY AVAILABLE";

        }


        applyPriorityStyle(
            "NORMAL"
        );

    }


    /* ========================================================
       HISTORY
    ======================================================== */

    function getHistory() {

        return [
            ...state.history
        ];

    }


    /* ========================================================
       PUBLIC API
    ======================================================== */

    window.DPRecommendationManager = {

        name:
            MODULE_NAME,

        version:
            VERSION,

        generate:
            generate,

        render:
            render,

        reset:
            reset,

        getHistory:
            getHistory

    };


    window.updateDPRecommendation =
        generate;

    window.resetDPRecommendationManager =
        reset;


    /* ========================================================
       READY
    ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL DP RECOMMENDATION MANAGER — READY"
        );

    }

})();