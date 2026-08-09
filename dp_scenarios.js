/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP SIMULATION SCENARIO LIBRARY
 * ============================================================
 *
 * File:
 *     dp_scenarios.js
 *
 * Purpose:
 *     Browser-based environmental scenario library for the
 *     Sextant DP Resilience Simulation Demonstrator.
 *
 * SAFETY:
 *     Research / simulation use only.
 *     NOT certified marine control software.
 *     Does not command operational DP, propulsion,
 *     navigation or safety systems.
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
            "Normal operating environmental conditions.",

        wind:
            20,

        current:
            15,

        wave:
            20,

        tidal:
            15
    },


    MODERATE_WEATHER: {

        name:
            "MODERATE WEATHER",

        description:
            "Moderate environmental disturbance.",

        wind:
            45,

        current:
            40,

        wave:
            50,

        tidal:
            35
    },


    HEAVY_WEATHER: {

        name:
            "HEAVY WEATHER",

        description:
            "High environmental loading.",

        wind:
            70,

        current:
            65,

        wave:
            75,

        tidal:
            60
    },


    CRITICAL_WEATHER: {

        name:
            "CRITICAL WEATHER",

        description:
            "Extreme environmental disturbance.",

        wind:
            95,

        current:
            90,

        wave:
            95,

        tidal:
            85
    },


    CURRENT_SURGE: {

        name:
            "CURRENT SURGE",

        description:
            "High current loading with moderate other forces.",

        wind:
            40,

        current:
            90,

        wave:
            45,

        tidal:
            70
    },


    HEAVY_SEA_STATE: {

        name:
            "HEAVY SEA STATE",

        description:
            "High wave loading.",

        wind:
            65,

        current:
            45,

        wave:
            90,

        tidal:
            50
    },


    WIND_GUST_EVENT: {

        name:
            "WIND GUST EVENT",

        description:
            "High wind disturbance.",

        wind:
            90,

        current:
            40,

        wave:
            50,

        tidal:
            35
    },


    COMBINED_DISTURBANCE: {

        name:
            "COMBINED DISTURBANCE",

        description:
            "Multiple simultaneous environmental disturbances.",

        wind:
            80,

        current:
            75,

        wave:
            80,

        tidal:
            70
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
        document.getElementById(
            "wind"
        );

    const current =
        document.getElementById(
            "current"
        );

    const wave =
        document.getElementById(
            "wave"
        );

    const tidal =
        document.getElementById(
            "tidal"
        );


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


    return true;
}


/* ============================================================
   COCKPIT SCENARIO EXECUTION
   ============================================================ */

/*
 * IMPORTANT:
 *
 * This function is deliberately named
 * executeDPCockpitScenario()
 * so that it does NOT overwrite the engine's
 * runDPScenario() function.
 */

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
   CONVENIENCE BUTTON FUNCTIONS
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
        document.getElementById(
            "wind"
        );

    const current =
        document.getElementById(
            "current"
        );

    const wave =
        document.getElementById(
            "wave"
        );

    const tidal =
        document.getElementById(
            "tidal"
        );


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
        ] || null
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

    /*
     * Required by the RANDOM button:
     *
     * onclick="executeRandomDPCockpitScenario()"
     */

    window.executeRandomDPCockpitScenario =
        randomScenario;

    /*
     * Optional direct access.
     */

    window.randomScenario =
        randomScenario;

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
 * SAFETY BOUNDARY:
 *
 * These scenarios generate simulated environmental
 * conditions only.
 *
 * They do not command real vessel propulsion,
 * thrusters, navigation or DP equipment.
 */