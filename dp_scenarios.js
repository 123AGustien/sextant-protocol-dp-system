/*

* Sextant Protocol – DP Simulation Scenarios
* ---
* 
* Scenario library for the browser-based DP
* resilience simulation demonstrator.
* 
* Research / simulation use only.
* NOT certified marine control software.
  */

const DP_SCENARIOS = {

NORMAL: {
    name: "NORMAL",
    description: "Normal operating environmental conditions.",
    wind: 20,
    current: 15,
    wave: 20,
    tidal: 15
},

MODERATE_WEATHER: {
    name: "MODERATE WEATHER",
    description: "Moderate environmental disturbance.",
    wind: 45,
    current: 40,
    wave: 50,
    tidal: 35
},

HEAVY_WEATHER: {
    name: "HEAVY WEATHER",
    description: "High environmental loading.",
    wind: 70,
    current: 65,
    wave: 75,
    tidal: 60
},

CRITICAL_WEATHER: {
    name: "CRITICAL WEATHER",
    description: "Extreme environmental disturbance.",
    wind: 95,
    current: 90,
    wave: 95,
    tidal: 85
},

CURRENT_SURGE: {
    name: "CURRENT SURGE",
    description: "High current loading with moderate other forces.",
    wind: 40,
    current: 90,
    wave: 45,
    tidal: 70
},

HEAVY_SEA_STATE: {
    name: "HEAVY SEA STATE",
    description: "High wave loading.",
    wind: 65,
    current: 45,
    wave: 90,
    tidal: 50
},

WIND_GUST_EVENT: {
    name: "WIND GUST EVENT",
    description: "High wind disturbance.",
    wind: 90,
    current: 40,
    wave: 50,
    tidal: 35
},

COMBINED_DISTURBANCE: {
    name: "COMBINED DISTURBANCE",
    description: "Multiple simultaneous environmental disturbances.",
    wind: 80,
    current: 75,
    wave: 80,
    tidal: 70
}

};

/* ---------------------------------------------------------
APPLY SCENARIO
--------------------------------------------------------- */

function applyDPScenario(scenarioName) {

const scenario = DP_SCENARIOS[scenarioName];

if (!scenario) {
    console.error(
        "Unknown DP scenario:",
        scenarioName
    );

    return false;
}

document.getElementById("wind").value =
    scenario.wind;

document.getElementById("current").value =
    scenario.current;

document.getElementById("wave").value =
    scenario.wave;

document.getElementById("tidal").value =
    scenario.tidal;

return true;

}

/* ---------------------------------------------------------
RUN SCENARIO
--------------------------------------------------------- */

function runDPScenario(scenarioName) {

const applied =
    applyDPScenario(scenarioName);

if (!applied) {
    return;
}

runSimulation();

}

/* ---------------------------------------------------------
CONVENIENCE BUTTON FUNCTIONS
--------------------------------------------------------- */

function normalScenario() {
runDPScenario("NORMAL");
}

function moderateWeatherScenario() {
runDPScenario("MODERATE_WEATHER");
}

function heavyWeatherScenario() {
runDPScenario("HEAVY_WEATHER");
}

function criticalScenario() {
runDPScenario("CRITICAL_WEATHER");
}

function currentSurgeScenario() {
runDPScenario("CURRENT_SURGE");
}

function heavySeaStateScenario() {
runDPScenario("HEAVY_SEA_STATE");
}

function windGustScenario() {
runDPScenario("WIND_GUST_EVENT");
}

function combinedDisturbanceScenario() {
runDPScenario("COMBINED_DISTURBANCE");
}

/* ---------------------------------------------------------
RANDOM DISTURBANCE
--------------------------------------------------------- */

function randomScenario() {

document.getElementById("wind").value =
    Math.floor(Math.random() * 101);

document.getElementById("current").value =
    Math.floor(Math.random() * 101);

document.getElementById("wave").value =
    Math.floor(Math.random() * 101);

document.getElementById("tidal").value =
    Math.floor(Math.random() * 101);

runSimulation();

}

/* ---------------------------------------------------------
SCENARIO STATUS
--------------------------------------------------------- */

function getDPScenario(scenarioName) {

return DP_SCENARIOS[scenarioName] || null;

}

/*

* SAFETY BOUNDARY:
* 
* These scenarios generate simulated environmental
* conditions only. They do not command real vessel
* propulsion, thrusters, navigation or DP equipment.
  */