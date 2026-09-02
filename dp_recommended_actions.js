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
 *     SPD-DP-RECOMMENDED-ACTIONS-V1.3
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
 *     SAFETY / RESERVE VERIFICATION
 *             ↓
 *     RECOMMENDATION MANAGER
 *             ↓
 *     HUMAN DECISION
 *
 * SYSTEM SETUP:
 *
 *     POSITIONING MODE:
 *         NON_BIAS
 *         BIAS
 *
 *     ENGINE LOAD MODE:
 *         NORMAL
 *         PUSH_UP
 *
 * IMPORTANT DISTINCTION:
 *
 *     BIAS / NON_BIAS = POSITIONING
 *
 *     NORMAL / PUSH-UP = ENGINE LOAD COMPENSATION
 *
 *     PUSH-UP IS NOT POSITIONING BIAS.
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
 *     RESERVE POWER MUST BE VERIFIED BEFORE
 *     PUSH-UP COMPENSATION CAN BE CONSIDERED.
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
        "SPD-DP-RECOMMENDED-ACTIONS-V1.3";

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


    const POSITIONING_MODES = {

        NON_BIAS:
            "NON_BIAS",

        BIAS:
            "BIAS"

    };


    const ENGINE_LOAD_MODES = {

        NORMAL:
            "NORMAL",

        PUSH_UP:
            "PUSH_UP"

    };


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
       SYSTEM SETUP EXTRACTION
    ======================================================== */

    function extractSystemSetup(
        simulationResult
    ) {

        const result =
            hasObject(
                simulationResult
            )
                ? simulationResult
                : {};


        const environment =
            hasObject(
                result.environment
            )
                ? result.environment
                : {};


        const suppliedSetup =
            hasObject(
                result.systemSetup
            )
                ? result.systemSetup
                : {};


        let positioningMode =
            upper(
                suppliedSetup.positioningMode ||
                environment.positioningMode ||
                result.positioningMode ||
                POSITIONING_MODES.NON_BIAS
            );


        let engineLoadMode =
            upper(
                suppliedSetup.engineLoadMode ||
                environment.engineLoadMode ||
                result.engineLoadMode ||
                ENGINE_LOAD_MODES.NORMAL
            );


        if (
            positioningMode !==
            POSITIONING_MODES.BIAS &&
            positioningMode !==
            POSITIONING_MODES.NON_BIAS
        ) {

            positioningMode =
                POSITIONING_MODES.NON_BIAS;

        }


        if (
            engineLoadMode !==
            ENGINE_LOAD_MODES.PUSH_UP &&
            engineLoadMode !==
            ENGINE_LOAD_MODES.NORMAL
        ) {

            engineLoadMode =
                ENGINE_LOAD_MODES.NORMAL;

        }


        return {

            positioningMode:
                positioningMode,

            engineLoadMode:
                engineLoadMode,

            distinction:
                "PUSH-UP IS ENGINE LOAD COMPENSATION — NOT POSITIONING BIAS"

        };

    }


    /* ========================================================
       RESERVE POWER VERIFICATION
    ======================================================== */

    function extractReserveVerification(
        simulationResult
    ) {

        if (
            !hasObject(
                simulationResult
            )
        ) {

            return {

                reserveVerified:
                    false,

                availableReserve:
                    0,

                requiredReserve:
                    0,

                status:
                    "NOT VERIFIED"

            };

        }


        const supplied =
            simulationResult.reservePowerVerification ||
            simulationResult.reserveVerification;


        if (
            !hasObject(
                supplied
            )
        ) {

            return {

                reserveVerified:
                    false,

                availableReserve:
                    0,

                requiredReserve:
                    0,

                status:
                    "NOT VERIFIED",

                verificationSource:
                    "NO AUTHORITATIVE RESERVE RESULT"

            };

        }


        const reserveVerified =
            supplied.reserveVerified === true;


        return {

            reserveVerified:
                reserveVerified,

            availableReserve:
                numberValue(
                    supplied.availableReserve,
                    0
                ),

            requiredReserve:
                numberValue(
                    supplied.requiredReserve,
                    0
                ),

            engineLoadMode:
                upper(
                    supplied.engineLoadMode ||
                    ""
                ),

            status:
                reserveVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED",

            verificationSource:
                "DP SIMULATION ENGINE"

        };

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
         * Prefer the authoritative environmental stress
         * already calculated by the simulator.
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
         * Support the authoritative environment structure.
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
         * Fall back to common environmental indicators
         * only when the authoritative result does not
         * contain a calculated stress value.
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
         * Environmental stress must never downgrade
         * a higher supplied risk.
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
        environmentalStress,
        positioningMode
    ) {

        /*
         * Positioning mode is deliberately handled separately
         * from engine load mode.
         */

        const positioningContext =
            positioningMode ===
            POSITIONING_MODES.BIAS
                ? "Positioning bias mode is active; safety constraints remain authoritative."
                : "Non-bias positioning mode is active.";


        if (
            risk === "CRITICAL"
        ) {

            return {

                recommendation:
                    "HEADING / POSITION REVIEW REQUIRED",

                detail:
                    "Review simulated heading, position and drift margins before any further manoeuvre is considered. " +
                    positioningContext

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
                    "Assess simulated heading stability, position error and environmental influence. " +
                    positioningContext

            };

        }


        if (
            risk === "MEDIUM"
        ) {

            return {

                recommendation:
                    "MONITOR HEADING AND POSITION",

                detail:
                    "Continue observing simulated heading and position trends. " +
                    positioningContext

            };

        }


        return {

            recommendation:
                "HEADING / POSITION STABLE",

            detail:
                "Continue normal simulated monitoring. " +
                positioningContext

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
       ENGINE LOAD / PUSH-UP SAFETY
    ======================================================== */

    function engineLoadRecommendation(
        systemSetup,
        reserveVerification,
        risk
    ) {

        const engineLoadMode =
            systemSetup.engineLoadMode;


        /*
         * NORMAL LOAD
         */

        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.NORMAL
        ) {

            return {

                mode:
                    ENGINE_LOAD_MODES.NORMAL,

                recommendation:
                    "NORMAL ENGINE LOAD",

                status:
                    "NO PUSH-UP REQUEST",

                permitted:
                    true,

                reserveVerified:
                    reserveVerification.reserveVerified,

                detail:
                    "Normal simulated engine-load mode selected. No load compensation request is generated."

            };

        }


        /*
         * PUSH-UP REQUEST
         *
         * Reserve verification is mandatory.
         */

        if (
            engineLoadMode ===
            ENGINE_LOAD_MODES.PUSH_UP
        ) {

            if (
                reserveVerification.reserveVerified ===
                true
            ) {

                return {

                    mode:
                        ENGINE_LOAD_MODES.PUSH_UP,

                    recommendation:
                        "PUSH-UP AVAILABLE FOR HUMAN REVIEW",

                    status:
                        "RESERVE VERIFIED",

                    permitted:
                        true,

                    reserveVerified:
                        true,

                    detail:
                        "Simulated PUSH-UP compensation may be considered for human review because reserve power has been verified. PUSH-UP is engine-load compensation, not positioning bias. No command is generated."

                };

            }


            return {

                mode:
                    ENGINE_LOAD_MODES.PUSH_UP,

                recommendation:
                    "PUSH-UP BLOCKED",

                status:
                    "RESERVE NOT VERIFIED",

                permitted:
                    false,

                reserveVerified:
                    false,

                detail:
                    "PUSH-UP compensation is blocked because reserve power is not verified. Maintain the safest simulated state, reduce simulated demand where appropriate and require human review."

            };

        }


        /*
         * Defensive fallback.
         */

        return {

            mode:
                ENGINE_LOAD_MODES.NORMAL,

            recommendation:
                "NORMAL ENGINE LOAD",

            status:
                "DEFAULTED",

            permitted:
                true,

            reserveVerified:
                reserveVerification.reserveVerified,

            detail:
                "Unknown engine-load mode was normalised to NORMAL. No PUSH-UP recommendation is generated."

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
        risk,
        engineLoadRecommendation
    ) {

        if (
            engineLoadRecommendation &&
            engineLoadRecommendation.permitted ===
            false
        ) {

            return {

                status:
                    "SIMULATION HOLD / RESERVE GATE",

                description:
                    "Requested PUSH-UP compensation is blocked because reserve power is not verified. Human review is required."

            };

        }


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


        /*
         * Extract authoritative system configuration.
         */

        const systemSetup =
            extractSystemSetup(
                simulationResult
            );


        /*
         * Extract authoritative reserve verification.
         *
         * IMPORTANT:
         *
         * No reserve is assumed.
         * Unknown reserve is treated as NOT VERIFIED.
         */

        const reserveVerification =
            extractReserveVerification(
                simulationResult
            );


        /*
         * Environmental stress is used only for
         * recommendation classification.
         */

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
                environmentalStress,
                systemSetup.positioningMode
            );


        const separation =
            separationRecommendation(
                risk,
                environmentalStress
            );


        const engineLoad =
            engineLoadRecommendation(
                systemSetup,
                reserveVerification,
                risk
            );


        const secondary =
            secondaryRecommendations(
                simulationResult,
                risk,
                environmentalStress
            );


        const operational =
            operationalStatus(
                risk,
                engineLoad
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

            systemSetup:
                {

                    positioningMode:
                        systemSetup.positioningMode,

                    engineLoadMode:
                        systemSetup.engineLoadMode,

                    distinction:
                        systemSetup.distinction

                },

            positioningMode:
                systemSetup.positioningMode,

            engineLoadMode:
                systemSetup.engineLoadMode,

            reservePowerVerification:
                reserveVerification,

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

            engineLoad:
                engineLoad,

            secondary:
                secondary,

            operational:
                operational,

            decisionBoundary:
                {

                    positioningBias:
                        "POSITIONING ONLY",

                    pushUp:
                        "ENGINE LOAD COMPENSATION ONLY",

                    pushUpIsPositioningBias:
                        false,

                    reserveRequiredForPushUp:
                        true,

                    humanAuthorizationRequired:
                        true,

                    autonomousExecution:
                        false

                }

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

        positioningModes:
            POSITIONING_MODES,

        engineLoadModes:
            ENGINE_LOAD_MODES,

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
            "POSITIONING: BIAS / NON-BIAS"
        );

        console.log(
            "ENGINE LOAD: NORMAL / PUSH-UP"
        );

        console.log(
            "PUSH-UP ≠ POSITIONING BIAS"
        );

        console.log(
            "RESERVE-POWER VERIFICATION: REQUIRED FOR PUSH-UP"
        );

        console.log(
            SAFETY_BOUNDARY
        );

    }

})();