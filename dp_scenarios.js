/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP RESILIENCE SIMULATION SCENARIO LIBRARY
 * ============================================================
 *
 * File:
 *     dp_scenarios.js
 *
 * Version:
 *     SPD-DP-SCENARIO-V2
 *
 * Purpose:
 *     Browser-based environmental scenario library for the
 *     Sextant DP Resilience Simulation Demonstrator.
 *
 * Enhancement:
 *     Each scenario now contains a simulated
 *     RECOMMENDED RESPONSE PROFILE.
 *
 * SAFETY BOUNDARY:
 *
 *     RESEARCH / SIMULATION USE ONLY.
 *
 *     This module does NOT command:
 *
 *       - Dynamic Positioning systems
 *       - Thrusters
 *       - Propulsion
 *       - Steering
 *       - Navigation
 *       - Joystick systems
 *       - Vessel automation
 *
 *     Recommended actions are decision-support information
 *     for simulation/training purposes only.
 *
 *     HUMAN OPERATOR RETAINS FINAL AUTHORITY.
 *
 * ============================================================
 */


/* ============================================================
   SCENARIO LIBRARY
   ============================================================ */

const DP_SCENARIOS = {

    NORMAL: {

        name:
            "NORMAL",

        description:
            "Normal simulated environmental conditions.",

        wind:
            20,

        current:
            15,

        wave:
            20,

        tidal:
            15,

        response: {

            priority:
                "LOW",

            status:
                "MONITOR",

            primaryRecommendation:
                "Continue simulated DP monitoring.",

            recommendedActions: [

                "Monitor environmental conditions.",

                "Verify simulated DP status.",

                "Maintain normal operator awareness.",

                "No simulated withdrawal action required."

            ],

            operatorDecision:
                "NO IMMEDIATE OPERATOR ACTION REQUIRED"

        }

    },


    MODERATE_WEATHER: {

        name:
            "MODERATE WEATHER",

        description:
            "Moderate simulated environmental disturbance.",

        wind:
            45,

        current:
            40,

        wave:
            50,

        tidal:
            35,

        response: {

            priority:
                "MEDIUM",

            status:
                "PREVENTIVE MONITORING",

            primaryRecommendation:
                "Increase simulated operator awareness.",

            recommendedActions: [

                "Increase environmental monitoring.",

                "Verify simulated DP capability and available redundancy.",

                "Review operational limits and task requirements.",

                "Prepare an alternative control strategy if conditions deteriorate.",

                "Human operator assessment recommended."

            ],

            operatorDecision:
                "OPERATOR AWARENESS RECOMMENDED"

        }

    },


    HEAVY_WEATHER: {

        name:
            "HEAVY WEATHER",

        description:
            "High simulated environmental loading.",

        wind:
            70,

        current:
            65,

        wave:
            75,

        tidal:
            60,

        response: {

            priority:
                "HIGH",

            status:
                "SAFETY REVIEW",

            primaryRecommendation:
                "Conduct simulated safety-priority assessment.",

            recommendedActions: [

                "Verify simulated DP status and redundancy.",

                "Assess whether the current simulated operation remains within limits.",

                "Consider preparing manual / joystick control as a contingency.",

                "Consider whether a heading adjustment could reduce simulated environmental loading.",

                "Consider whether moving away from the simulated operating location would improve resilience.",

                "Human operator review required before any simulated operational change."

            ],

            operatorDecision:
                "HUMAN REVIEW REQUIRED"

        }

    },


    CRITICAL_WEATHER: {

        name:
            "CRITICAL WEATHER",

        description:
            "Extreme simulated environmental disturbance.",

        wind:
            95,

        current:
            90,

        wave:
            95,

        tidal:
            85,

        response: {

            priority:
                "CRITICAL",

            status:
                "STABILIZATION / WITHDRAWAL REVIEW",

            primaryRecommendation:
                "Simulated high-priority resilience condition.",

            recommendedActions: [

                "Immediately verify simulated system status.",

                "Verify available simulated redundancy and control capability.",

                "Prepare alternative control mode as a contingency.",

                "Assess whether the simulated heading remains appropriate.",

                "Assess whether the simulated vessel should move away from the operating location.",

                "Review task continuation versus suspension.",

                "Consider simulated withdrawal to a safer operating condition.",

                "Human operator retains final authority over any response."

            ],

            operatorDecision:
                "IMMEDIATE HUMAN REVIEW REQUIRED"

        }

    },


    CURRENT_SURGE: {

        name:
            "CURRENT SURGE",

        description:
            "High simulated current loading with additional environmental forces.",

        wind:
            40,

        current:
            90,

        wave:
            45,

        tidal:
            70,

        response: {

            priority:
                "HIGH",

            status:
                "CURRENT LOAD ASSESSMENT",

            primaryRecommendation:
                "Assess current-related positional resilience.",

            recommendedActions: [

                "Verify simulated position error and control margin.",

                "Assess simulated heading relative to current direction.",

                "Consider a heading change if it reduces simulated environmental loading.",

                "Prepare alternative control mode as a contingency.",

                "Assess whether the operating location remains suitable.",

                "Consider moving away from the simulated location if resilience continues to deteriorate.",

                "Human operator review required."

            ],

            operatorDecision:
                "CURRENT CONDITION REQUIRES HUMAN ASSESSMENT"

        }

    },


    HEAVY_SEA_STATE: {

        name:
            "HEAVY SEA STATE",

        description:
            "High simulated wave loading.",

        wind:
            65,

        current:
            45,

        wave:
            90,

        tidal:
            50,

        response: {

            priority:
                "HIGH",

            status:
                "SEA-STATE SAFETY REVIEW",

            primaryRecommendation:
                "Assess simulated vessel response to increasing sea state.",

            recommendedActions: [

                "Verify simulated vessel response and position stability.",

                "Review simulated operational limits.",

                "Consider heading optimization against environmental loading.",

                "Prepare alternative control mode as a contingency.",

                "Assess whether continued operation at the simulated location remains appropriate.",

                "Consider moving to a more suitable simulated location.",

                "Human operator review required."

            ],

            operatorDecision:
                "SAFETY REVIEW REQUIRED"

        }

    },


    WIND_GUST_EVENT: {

        name:
            "WIND GUST EVENT",

        description:
            "High simulated wind disturbance.",

        wind:
            90,

        current:
            40,

        wave:
            50,

        tidal:
            35,

        response: {

            priority:
                "HIGH",

            status:
                "WIND DISTURBANCE ASSESSMENT",

            primaryRecommendation:
                "Assess simulated wind-load response and control margin.",

            recommendedActions: [

                "Verify simulated position error.",

                "Monitor simulated thrust demand.",

                "Assess whether heading adjustment could reduce wind loading.",

                "Prepare alternative control mode as a contingency.",

                "Assess whether the simulated operation should be suspended if conditions continue to deteriorate.",

                "Human operator review required."

            ],

            operatorDecision:
                "OPERATOR ASSESSMENT REQUIRED"

        }

    },


    COMBINED_DISTURBANCE: {

        name:
            "COMBINED DISTURBANCE",

        description:
            "Multiple simultaneous simulated environmental disturbances.",

        wind:
            80,

        current:
            75,

        wave:
            80,

        tidal:
            70,

        response: {

            priority:
                "CRITICAL",

            status:
                "MULTI-FACTOR RESILIENCE REVIEW",

            primaryRecommendation:
                "Perform comprehensive simulated resilience assessment.",

            recommendedActions: [

                "Verify all simulated environmental inputs.",

                "Verify simulated DP response and available redundancy.",

                "Assess simulated position error and control margin.",

                "Prepare alternative control mode as a contingency.",

                "Assess whether a heading change could reduce combined environmental loading.",

                "Assess whether moving away from the simulated operating location would improve resilience.",

                "Review continuation, suspension or withdrawal of the simulated operation.",

                "Escalate to human operator decision authority."

            ],

            operatorDecision:
                "HIGH-PRIORITY HUMAN DECISION REQUIRED"

        }

    }

};


/* ============================================================
   APPLY SCENARIO
   ============================================================ */

function applyDPScenario(
    scenarioName
) {

    const scenario =
        DP_SCENARIOS[
            scenarioName
        ];


    if (!scenario) {

        console.error(
            "Unknown DP scenario:",
            scenarioName
        );

        return false;
    }


    const wind =
        document.getElementById("wind");

    const current =
        document.getElementById("current");

    const wave =
        document.getElementById("wave");

    const tidal =
        document.getElementById("tidal");


    if (
        !wind ||
        !current ||
        !wave ||
        !tidal
    ) {

        console.error(
            "DP scenario input elements not found."
        );

        return false;
    }


    wind.value =
        scenario.wind;

    current.value =
        scenario.current;

    wave.value =
        scenario.wave;

    tidal.value =
        scenario.tidal;


    /*
     * Store the selected scenario for the
     * decision-support presentation layer.
     */

    if (
        typeof window !==
        "undefined"
    ) {

        window.activeDPScenario =
            scenarioName;
    }


    return true;
}


/* ============================================================
   GET SCENARIO RESPONSE PROFILE
   ============================================================ */

function getDPScenarioResponse(
    scenarioName
) {

    const scenario =
        DP_SCENARIOS[
            scenarioName
        ];


    if (!scenario) {

        return null;
    }


    return (
        scenario.response ||
        null
    );
}


/* ============================================================
   COCKPIT SCENARIO EXECUTION
   ============================================================ */

function executeDPCockpitScenario(
    scenarioName
) {

    const applied =
        applyDPScenario(
            scenarioName
        );


    if (!applied) {

        return;
    }


    /*
     * If the cockpit contains a dedicated
     * recommendation renderer, update it.
     */

    if (
        typeof updateDPScenarioRecommendation ===
        "function"
    ) {

        updateDPScenarioRecommendation(
            scenarioName
        );
    }


    /*
     * Execute the existing simulation.
     */

    if (
        typeof runSimulation ===
        "function"
    ) {

        runSimulation();

    } else {

        console.error(
            "runSimulation() is not available."
        );
    }

}


/* ============================================================
   CONVENIENCE SCENARIO FUNCTIONS
   ============================================================ */

function normalScenario() {

    executeDPCockpitScenario(
        "NORMAL"
    );
}


function moderateWeatherScenario() {

    executeDPCockpitScenario(
        "MODERATE_WEATHER"
    );
}


function heavyWeatherScenario() {

    executeDPCockpitScenario(
        "HEAVY_WEATHER"
    );
}


function criticalScenario() {

    executeDPCockpitScenario(
        "CRITICAL_WEATHER"
    );
}


function currentSurgeScenario() {

    executeDPCockpitScenario(
        "CURRENT_SURGE"
    );
}


function heavySeaStateScenario() {

    executeDPCockpitScenario(
        "HEAVY_SEA_STATE"
    );
}


function windGustScenario() {

    executeDPCockpitScenario(
        "WIND_GUST_EVENT"
    );
}


function combinedDisturbanceScenario() {

    executeDPCockpitScenario(
        "COMBINED_DISTURBANCE"
    );
}


/* ============================================================
   RANDOM DISTURBANCE
   ============================================================ */

function randomScenario() {

    const wind =
        document.getElementById("wind");

    const current =
        document.getElementById("current");

    const wave =
        document.getElementById("wave");

    const tidal =
        document.getElementById("tidal");


    if (
        !wind ||
        !current ||
        !wave ||
        !tidal
    ) {

        console.error(
            "DP random scenario input elements not found."
        );

        return;
    }


    wind.value =
        Math.floor(
            Math.random() * 101
        );

    current.value =
        Math.floor(
            Math.random() * 101
        );

    wave.value =
        Math.floor(
            Math.random() * 101
        );

    tidal.value =
        Math.floor(
            Math.random() * 101
        );


    if (
        typeof window !==
        "undefined"
    ) {

        window.activeDPScenario =
            "RANDOM";
    }


    if (
        typeof runSimulation ===
        "function"
    ) {

        runSimulation();

    } else {

        console.error(
            "runSimulation() is not available."
        );
    }

}


/* ============================================================
   SCENARIO LOOKUP
   ============================================================ */

function getDPScenario(
    scenarioName
) {

    return (
        DP_SCENARIOS[
            scenarioName
        ] ||
        null
    );
}


/* ============================================================
   BROWSER EXPORT
   ============================================================ */

if (
    typeof window !==
    "undefined"
) {

    window.DP_SCENARIOS =
        DP_SCENARIOS;

    window.applyDPScenario =
        applyDPScenario;

    window.executeDPCockpitScenario =
        executeDPCockpitScenario;

    window.getDPScenario =
        getDPScenario;

    window.getDPScenarioResponse =
        getDPScenarioResponse;

}


/* ============================================================
   READY MESSAGE
   ============================================================ */

if (
    typeof console !==
    "undefined"
) {

    console.log(
        "SEXTANT PROTOCOL DP SCENARIO LIBRARY — READY"
    );

    console.log(
        "Scenarios loaded:",
        Object.keys(
            DP_SCENARIOS
        ).length
    );

}


/*
 * ============================================================
 * SAFETY BOUNDARY
 * ============================================================
 *
 * Scenario recommendations are simulated decision-support
 * information.
 *
 * They do NOT constitute:
 *
 *     - navigational commands
 *     - DP commands
 *     - propulsion commands
 *     - joystick commands
 *     - steering commands
 *     - emergency instructions
 *
 * Any displayed recommendation such as:
 *
 *     "prepare joystick"
 *     "consider heading change"
 *     "consider moving away"
 *     "consider withdrawal"
 *
 * must be interpreted as a simulated assessment requiring
 * qualified human judgement.
 *
 * HUMAN AUTHORITY REMAINS FINAL.
 *
 * ============================================================
 */