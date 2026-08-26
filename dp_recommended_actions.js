/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP RESILIENCE RECOMMENDED ACTIONS ENGINE
 * ============================================================
 *
 * File:
 *     dp_recommended_actions.js
 *
 * Version:
 *     SPD-DP-RECOMMENDED-ACTIONS-V1.2
 *
 * PURPOSE:
 *     Deterministic recommendation engine for the
 *     SEXTANT DP Resilience Simulator.
 *
 *     Converts a completed DP simulation result into
 *     simulated operator decision-support recommendations.
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
 *     THIS MODULE NEVER COMMANDS:
 *
 *       - DP
 *       - Thrusters
 *       - Propulsion
 *       - Steering
 *       - Navigation
 *       - Joystick
 *       - Vessel automation
 *
 *     All outputs are recommendations only.
 *
 *     HUMAN OPERATOR RETAINS FINAL AUTHORITY.
 *
 * IMPORTANT:
 *
 *     This module does not modify:
 *
 *       - DP control logic
 *       - vessel control logic
 *       - simulation physics
 *       - stabilizer authority
 *       - human authority
 *       - autonomous execution
 *
 *     It is a decision-support output layer only.
 *
 * ============================================================
 */

(function () {

    "use strict";


    /* ========================================================
       CONSTANTS
    ======================================================== */

    const MODULE_NAME =
        "SextantDPRecommendedActions";

    const VERSION =
        "SPD-DP-RECOMMENDED-ACTIONS-V1.2";

    const SAFETY_BOUNDARY =
        "SIMULATION ONLY — NO AUTONOMOUS OPERATIONAL COMMAND";

    const HUMAN_AUTHORITY =
        "FINAL";

    const AUTONOMOUS_COMMAND =
        false;

    const DEFAULT_STRESS =
        0;

    const STRESS_HIGH =
        70;

    const STRESS_CRITICAL =
        85;


    /* ========================================================
       SAFE HELPERS
    ======================================================== */

    function numberValue(
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

        return (
            fallback !== undefined
                ? fallback
                : 0
        );

    }


    function textValue(
        value,
        fallback
    ) {

        if (
            value === undefined ||
            value === null ||
            value === ""
        ) {

            return (
                fallback !== undefined
                    ? fallback
                    : ""
            );

        }

        return String(value);

    }


    function upper(
        value
    ) {

        return textValue(
            value,
            ""
        ).toUpperCase();

    }


    function clamp(
        value,
        minimum,
        maximum
    ) {

        return Math.max(
            minimum,
            Math.min(
                maximum,
                value
            )
        );

    }


    function hasObject(
        value
    ) {

        return (
            value !== null &&
            typeof value === "object"
        );

    }


    /* ========================================================
       EXTRACT ENVIRONMENTAL STRESS
    ======================================================== */

    function extractEnvironmentalStress(
        simulationResult
    ) {

        if (
            !hasObject(
                simulationResult
            )
        ) {

            return DEFAULT_STRESS;

        }


        /*
         * Prefer an already calculated environmental
         * stress value supplied by the simulator.
         */

        if (
            Number.isFinite(
                Number(
                    simulationResult.environmentalStress
                )
            )
        ) {

            return clamp(
                Number(
                    simulationResult.environmentalStress
                ),
                0,
                100
            );

        }


        /*
         * Support common simulator result structures.
         */

        if (
            hasObject(
                simulationResult.environment
            )
        ) {

            const environment =
                simulationResult.environment;


            if (
                Number.isFinite(
                    Number(
                        environment.stress
                    )
                )
            ) {

                return clamp(
                    Number(
                        environment.stress
                    ),
                    0,
                    100
                );

            }

        }


        /*
         * Fall back to common environmental
         * indicators when available.
         */

        const wind =
            numberValue(
                simulationResult.windStress ??
                simulationResult.wind,
                0
            );


        const current =
            numberValue(
                simulationResult.currentStress ??
                simulationResult.current,
                0
            );


        const wave =
            numberValue(
                simulationResult.waveStress ??
                simulationResult.wave,
                0
            );


        const visibility =
            numberValue(
                simulationResult.visibilityStress,
                0
            );


        const total =
            (
                wind +
                current +
                wave +
                visibility
            ) / 4;


        return clamp(
            total,
            0,
            100
        );

    }


    /* ========================================================
       RISK NORMALISATION
    ======================================================== */

    function normaliseRisk(
        simulationResult,
        environmentalStress
    ) {

        const suppliedRisk =
            upper(
                hasObject(
                    simulationResult
                )
                    ? (
                        simulationResult.risk ||
                        simulationResult.riskLevel
                    )
                    : ""
            );


        /*
         * Calculate a minimum risk level from
         * environmental stress.
         */

        let calculatedRisk =
            "LOW";


        if (
            environmentalStress >=
            STRESS_CRITICAL
        ) {

            calculatedRisk =
                "CRITICAL";

        }
        else if (
            environmentalStress >=
            STRESS_HIGH
        ) {

            calculatedRisk =
                "HIGH";

        }


        /*
         * Normalise supplied simulator risk.
         */

        let suppliedNormalisedRisk =
            null;


        if (
            suppliedRisk.includes(
                "CRITICAL"
            )
        ) {

            suppliedNormalisedRisk =
                "CRITICAL";

        }
        else if (
            suppliedRisk.includes(
                "HIGH"
            )
        ) {

            suppliedNormalisedRisk =
                "HIGH";

        }
        else if (
            suppliedRisk.includes(
                "MEDIUM"
            )
        ) {

            suppliedNormalisedRisk =
                "MEDIUM";

        }
        else if (
            suppliedRisk.includes(
                "LOW"
            )
        ) {

            suppliedNormalisedRisk =
                "LOW";

        }


        /*
         * Risk precedence:
         *
         *     CRITICAL > HIGH > MEDIUM > LOW
         *
         * Environmental stress must never be allowed
         * to downgrade an already supplied higher risk.
         *
         * Likewise, a supplied LOW value must not conceal
         * a calculated HIGH or CRITICAL environmental state.
         */

        const rank = {

            LOW:
                0,

            MEDIUM:
                1,

            HIGH:
                2,

            CRITICAL:
                3

        };


        if (
            suppliedNormalisedRisk &&
            rank[suppliedNormalisedRisk] >
            rank[calculatedRisk]
        ) {

            return suppliedNormalisedRisk;

        }


        return calculatedRisk;

    }


    /* ========================================================
       PRIORITY
    ======================================================== */

    function determinePriority(
        risk,
        environmentalStress
    ) {

        if (
            risk === "CRITICAL" ||
            environmentalStress >=
            STRESS_CRITICAL
        ) {

            return "IMMEDIATE REVIEW";

        }


        if (
            risk === "HIGH" ||
            environmentalStress >=
            STRESS_HIGH
        ) {

            return "HIGH";

        }


        if (
            risk === "MEDIUM"
        ) {

            return "ADVISORY";

        }


        return "NORMAL";

    }


    /* ========================================================
       PRIMARY RECOMMENDATION
    ======================================================== */

    function primaryRecommendation(
        risk,
        environmentalStress
    ) {

        if (
            risk === "CRITICAL"
        ) {

            return {

                priority:
                    "IMMEDIATE REVIEW",

                action:
                    "Maintain the safest simulated state and require immediate human review before any further simulated manoeuvre consideration."

            };

        }


        if (
            risk === "HIGH" ||
            environmentalStress >=
            STRESS_HIGH
        ) {

            return {

                priority:
                    "HIGH",

                action:
                    "Review the simulated vessel response, environmental exposure and available safety margins before considering any further simulated action."

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                priority:
                    "ADVISORY",

                action:
                    "Maintain the simulated safe state and review environmental trends, vessel response and operational margins."

            };

        }


        return {

            priority:
                "NORMAL",

            action:
                "Maintain the simulated safe state and continue monitoring the assessed conditions."

        };

    }


    /* ========================================================
       CONTROL STRATEGY
    ======================================================== */

    function controlStrategy(
        risk,
        environmentalStress
    ) {

        if (
            risk === "CRITICAL"
        ) {

            return {

                recommendation:
                    "SIMULATED CONTROL REVIEW",

                detail:
                    "Evaluate whether a conservative manual-control posture would provide an appropriate additional safety margin. No control command is generated."

            };

        }


        if (
            risk === "HIGH" ||
            environmentalStress >=
            STRESS_HIGH
        ) {

            return {

                recommendation:
                    "CONSERVATIVE CONTROL POSTURE",

                detail:
                    "Consider reduced exposure and increased operator attention within the simulation."

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                recommendation:
                    "CONTROL STABILITY REVIEW",

                detail:
                    "Continue monitoring simulated control stability and environmental trend."

            };

        }


        return {

            recommendation:
                "NORMAL MONITORING",

            detail:
                "No additional simulated control consideration is indicated by the current assessment."

        };

    }


    /* ========================================================
       HEADING / POSITION
    ======================================================== */

    function headingRecommendation(
        risk,
        environmentalStress
    ) {

        if (
            risk === "CRITICAL"
        ) {

            return {

                recommendation:
                    "HEADING / POSITION REVIEW REQUIRED",

                detail:
                    "Review simulated heading, position and drift margins before any further manoeuvre is considered."

            };

        }


        if (
            risk === "HIGH" ||
            environmentalStress >=
            STRESS_HIGH
        ) {

            return {

                recommendation:
                    "REVIEW HEADING AND POSITION MARGINS",

                detail:
                    "Assess simulated heading stability, position error and environmental influence."

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                recommendation:
                    "MONITOR HEADING AND POSITION",

                detail:
                    "Continue observing simulated heading and position trends."

            };

        }


        return {

            recommendation:
                "HEADING / POSITION STABLE",

            detail:
                "Continue normal simulated monitoring."

        };

    }


    /* ========================================================
       SAFE SEPARATION
    ======================================================== */

    function separationRecommendation(
        risk,
        environmentalStress
    ) {

        if (
            risk === "CRITICAL"
        ) {

            return {

                recommendation:
                    "MAXIMISE AVAILABLE SIMULATED SAFETY MARGIN",

                detail:
                    "Review available separation margins and avoid unnecessary exposure within the simulation."

            };

        }


        if (
            risk === "HIGH" ||
            environmentalStress >=
            STRESS_HIGH
        ) {

            return {

                recommendation:
                    "INCREASE SEPARATION IF PRACTICABLE",

                detail:
                    "Where the simulated scenario permits, consider greater separation from environmental or operational hazards."

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                recommendation:
                    "MONITOR SEPARATION MARGIN",

                detail:
                    "Continue monitoring the available simulated safety margin."

            };

        }


        return {

            recommendation:
                "MAINTAIN CURRENT SEPARATION",

            detail:
                "No additional separation recommendation is indicated by the current simulated assessment."

        };

    }


    /* ========================================================
       SECONDARY ENVIRONMENTAL RECOMMENDATIONS
    ======================================================== */

    function secondaryRecommendations(
        simulationResult,
        risk,
        environmentalStress
    ) {

        const recommendations =
            [];


        if (
            environmentalStress >=
            STRESS_HIGH
        ) {

            recommendations.push({

                category:
                    "ENVIRONMENT",

                action:
                    "Review environmental trend and avoid unnecessary exposure within the simulated scenario."

            });

        }


        if (
            risk === "CRITICAL" ||
            risk === "HIGH"
        ) {

            recommendations.push({

                category:
                    "SAFETY_MARGIN",

                action:
                    "Review available safety margins before considering further simulated manoeuvre options."

            });

        }


        /*
         * Optional environmental indicators.
         *
         * These are observational only.
         */

        const wind =
            numberValue(
                hasObject(
                    simulationResult
                )
                    ? (
                        simulationResult.windStress ??
                        simulationResult.wind
                    )
                    : 0,
                0
            );


        if (
            wind >= 70
        ) {

            recommendations.push({

                category:
                    "WIND",

                action:
                    "Elevated simulated wind influence detected; review heading and position stability."

            });

        }


        const current =
            numberValue(
                hasObject(
                    simulationResult
                )
                    ? (
                        simulationResult.currentStress ??
                        simulationResult.current
                    )
                    : 0,
                0
            );


        if (
            current >= 70
        ) {

            recommendations.push({

                category:
                    "CURRENT",

                action:
                    "Elevated simulated current influence detected; review position margin and environmental trend."

            });

        }


        const wave =
            numberValue(
                hasObject(
                    simulationResult
                )
                    ? (
                        simulationResult.waveStress ??
                        simulationResult.wave
                    )
                    : 0,
                0
            );


        if (
            wave >= 70
        ) {

            recommendations.push({

                category:
                    "WAVE",

                action:
                    "Elevated simulated wave influence detected; review vessel response and available safety margin."

            });

        }


        const visibility =
            numberValue(
                hasObject(
                    simulationResult
                )
                    ? simulationResult.visibilityStress
                    : 0,
                0
            );


        if (
            visibility >= 70
        ) {

            recommendations.push({

                category:
                    "VISIBILITY",

                action:
                    "Elevated simulated visibility stress detected; review environmental awareness and available safety margin."

            });

        }


        if (
            recommendations.length ===
            0
        ) {

            recommendations.push({

                category:
                    "MONITORING",

                action:
                    "No additional environmental consideration identified by the current simulation."

            });

        }


        return recommendations;

    }


    /* ========================================================
       OPERATIONAL STATUS
    ======================================================== */

    function operationalStatus(
        risk
    ) {

        if (
            risk === "CRITICAL"
        ) {

            return {

                status:
                    "SIMULATION HOLD / HUMAN REVIEW",

                description:
                    "Further simulated action requires explicit human review."

            };

        }


        if (
            risk === "HIGH"
        ) {

            return {

                status:
                    "ENHANCED SIMULATION MONITORING",

                description:
                    "Maintain heightened review of the simulated scenario."

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                status:
                    "ADVISORY MONITORING",

                description:
                    "Continue simulated monitoring and assessment."

            };

        }


        return {

            status:
                "NORMAL SIMULATION MONITORING",

            description:
                "Continue normal observation within the simulation."

        };

    }


    /* ========================================================
       RESULT METADATA
    ======================================================== */

    function resultMetadata(
        simulationResult
    ) {

        if (
            !hasObject(
                simulationResult
            )
        ) {

            return {

                scenario:
                    "",

                simulationId:
                    ""

            };

        }


        return {

            scenario:
                textValue(
                    simulationResult.scenario ||
                    simulationResult.scenarioName ||
                    simulationResult.mode,
                    ""
                ),

            simulationId:
                textValue(
                    simulationResult.simulationId ||
                    simulationResult.id,
                    ""
                )

        };

    }


    /* ========================================================
       GENERATE
    ======================================================== */

    function generate(
        simulationResult
    ) {

        if (
            !hasObject(
                simulationResult
            )
        ) {

            return null;

        }


        const environmentalStress =
            extractEnvironmentalStress(
                simulationResult
            );


        const risk =
            normaliseRisk(
                simulationResult,
                environmentalStress
            );


        const priority =
            determinePriority(
                risk,
                environmentalStress
            );


        const primary =
            primaryRecommendation(
                risk,
                environmentalStress
            );


        const controlMode =
            controlStrategy(
                risk,
                environmentalStress
            );


        const heading =
            headingRecommendation(
                risk,
                environmentalStress
            );


        const separation =
            separationRecommendation(
                risk,
                environmentalStress
            );


        const secondary =
            secondaryRecommendations(
                simulationResult,
                risk,
                environmentalStress
            );


        const operational =
            operationalStatus(
                risk
            );


        const metadata =
            resultMetadata(
                simulationResult
            );


        return {

            module:
                MODULE_NAME,

            version:
                VERSION,

            timestamp:
                new Date().toISOString(),

            simulationOnly:
                true,

            safetyBoundary:
                SAFETY_BOUNDARY,

            humanAuthority:
                HUMAN_AUTHORITY,

            autonomousCommand:
                AUTONOMOUS_COMMAND,

            scenario:
                metadata.scenario,

            simulationId:
                metadata.simulationId,

            risk:
                risk,

            environmentalStress:
                Number(
                    environmentalStress.toFixed(3)
                ),

            priority:
                priority,

            primary:
                primary,

            controlMode:
                controlMode,

            heading:
                heading,

            separation:
                separation,

            secondary:
                secondary,

            operational:
                operational

        };

    }


    /* ========================================================
       PUBLIC API
    ======================================================== */

    window.DPRecommendedActions = {

        name:
            MODULE_NAME,

        version:
            VERSION,

        safetyBoundary:
            SAFETY_BOUNDARY,

        simulationOnly:
            true,

        humanAuthority:
            HUMAN_AUTHORITY,

        autonomousCommand:
            AUTONOMOUS_COMMAND,

        generate:
            generate

    };


    /* ========================================================
       READY
    ======================================================== */

    if (
        typeof console !==
        "undefined"
    ) {

        console.log(
            "SEXTANT PROTOCOL DP RECOMMENDED ACTIONS ENGINE — READY"
        );

        console.log(
            MODULE_NAME +
            " " +
            VERSION
        );

        console.log(
            SAFETY_BOUNDARY
        );

    }

})();