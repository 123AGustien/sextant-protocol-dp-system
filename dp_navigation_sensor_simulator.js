/*
============================================================
SEXTANT PROTOCOL
DP NAVIGATION & SENSOR SIMULATOR
============================================================

File:
    dp_navigation_sensor_simulator.js

Purpose:
    Simulated navigation and sensor observations for the
    Sextant Protocol DP Resilience Research Cockpit.

SIMULATION ONLY.

This module does NOT control:
    - Dynamic Positioning systems
    - Propulsion
    - Steering
    - Navigation equipment
    - Radar
    - DGPS/GNSS
    - Cyscan/laser systems
    - Vessel automation

All values are simulated research data.

Architecture:

    SIMULATED ENVIRONMENT
            ↓
    SIMULATED SENSOR LAYER
            ↓
    SENSOR VERIFICATION
            ↓
    PRIMARY AI
            ↓
    SECONDARY AI
            ↓
    STABILIZER
            ↓
    HUMAN DECISION AUTHORITY

============================================================
*/


/* =========================================================
   SENSOR STATES
========================================================= */

const DP_SENSOR_STATES = {

    VALID: "VALID",

    DEGRADED: "DEGRADED",

    WARNING: "WARNING",

    LOST: "LOST",

    RECOVERED: "RECOVERED"

};


/* =========================================================
   SENSOR TYPES
========================================================= */

const DP_NAVIGATION_SENSORS = {

    DGPS: {
        name: "DGPS / GNSS",
        state: DP_SENSOR_STATES.VALID,
        confidence: 98
    },

    CYSCAN: {
        name: "CYSCAN / LASER",
        state: DP_SENSOR_STATES.VALID,
        confidence: 97
    },

    RADAR: {
        name: "RADAR",
        state: DP_SENSOR_STATES.VALID,
        confidence: 96
    },

    GYRO: {
        name: "GYRO / HEADING",
        state: DP_SENSOR_STATES.VALID,
        confidence: 99
    },

    MRU: {
        name: "MRU / MOTION REFERENCE",
        state: DP_SENSOR_STATES.VALID,
        confidence: 98
    },

    WIND: {
        name: "WIND SENSOR",
        state: DP_SENSOR_STATES.VALID,
        confidence: 95
    },

    CURRENT: {
        name: "CURRENT ESTIMATE",
        state: DP_SENSOR_STATES.VALID,
        confidence: 94
    },

    DEPTH: {
        name: "DEPTH / ECHO SOUNDER",
        state: DP_SENSOR_STATES.VALID,
        confidence: 97
    }

};


/* =========================================================
   SIMULATED NAVIGATION STATE
========================================================= */

let DP_NAVIGATION_STATE = {

    latitude: -1.2877,

    longitude: 104.0970,

    heading: 182.4,

    surge: 0.12,

    sway: 0.08,

    yawRate: 0.03,

    depth: 42.5,

    positionReference: "DGPS / GNSS",

    positionQuality: "HIGH",

    sensorAgreement: "HIGH",

    sensorAgreementScore: 97,

    navigationState: "STABLE"

};


/* =========================================================
   SENSOR COPY
========================================================= */

function getDPNavigationSensors() {

    return JSON.parse(
        JSON.stringify(
            DP_NAVIGATION_SENSORS
        )
    );

}


/* =========================================================
   NAVIGATION COPY
========================================================= */

function getDPNavigationState() {

    return JSON.parse(
        JSON.stringify(
            DP_NAVIGATION_STATE
        )
    );

}


/* =========================================================
   SENSOR VALIDATION
========================================================= */

function verifyDPSensorState() {

    const sensors =
        Object.values(
            DP_NAVIGATION_SENSORS
        );

    const lost =
        sensors.filter(
            sensor =>
                sensor.state ===
                DP_SENSOR_STATES.LOST
        );

    const degraded =
        sensors.filter(
            sensor =>
                sensor.state ===
                    DP_SENSOR_STATES.DEGRADED ||
                sensor.state ===
                    DP_SENSOR_STATES.WARNING
        );

    if (lost.length > 0) {

        DP_NAVIGATION_STATE.sensorAgreement =
            "CRITICAL";

        DP_NAVIGATION_STATE.sensorAgreementScore =
            Math.max(
                0,
                100 - lost.length * 25
            );

        return {
            status: "CRITICAL",
            message:
                "Sensor loss detected.",
            lostSensors:
                lost.map(
                    sensor =>
                        sensor.name
                ),
            degradedSensors:
                degraded.map(
                    sensor =>
                        sensor.name
                )
        };

    }


    if (degraded.length > 0) {

        DP_NAVIGATION_STATE.sensorAgreement =
            "DEGRADED";

        DP_NAVIGATION_STATE.sensorAgreementScore =
            Math.max(
                0,
                100 - degraded.length * 10
            );

        return {
            status: "WARNING",
            message:
                "Sensor degradation detected.",
            lostSensors: [],
            degradedSensors:
                degraded.map(
                    sensor =>
                        sensor.name
                )
        };

    }


    DP_NAVIGATION_STATE.sensorAgreement =
        "HIGH";

    DP_NAVIGATION_STATE.sensorAgreementScore =
        97;

    return {

        status: "NORMAL",

        message:
            "Sensor agreement nominal.",

        lostSensors: [],

        degradedSensors: []

    };

}


/* =========================================================
   SENSOR FAULT INJECTION
========================================================= */

function injectDPSensorFault(
    sensorName,
    faultState
) {

    if (
        !DP_NAVIGATION_SENSORS[
            sensorName
        ]
    ) {

        console.error(
            "Unknown DP sensor:",
            sensorName
        );

        return false;

    }

    DP_NAVIGATION_SENSORS[
        sensorName
    ].state =
        faultState;

    verifyDPSensorState();

    return true;

}


/* =========================================================
   RESET SENSOR SUITE
========================================================= */

function resetDPSensors() {

    Object.keys(
        DP_NAVIGATION_SENSORS
    ).forEach(
        sensorName => {

            DP_NAVIGATION_SENSORS[
                sensorName
            ].state =
                DP_SENSOR_STATES.VALID;

        }
    );

    Object.keys(
        DP_NAVIGATION_SENSORS
    ).forEach(
        sensorName => {

            DP_NAVIGATION_SENSORS[
                sensorName
            ].confidence =
                95;

        }
    );

    DP_NAVIGATION_STATE.sensorAgreement =
        "HIGH";

    DP_NAVIGATION_STATE.sensorAgreementScore =
        97;

    DP_NAVIGATION_STATE.positionQuality =
        "HIGH";

    DP_NAVIGATION_STATE.navigationState =
        "STABLE";

}


/* =========================================================
   SIMULATED SENSOR SCENARIOS
========================================================= */

function simulateDPSensorDegradation() {

    injectDPSensorFault(
        "DGPS",
        DP_SENSOR_STATES.DEGRADED
    );

    injectDPSensorFault(
        "CYSCAN",
        DP_SENSOR_STATES.VALID
    );

    injectDPSensorFault(
        "RADAR",
        DP_SENSOR_STATES.VALID
    );

    DP_NAVIGATION_STATE.positionQuality =
        "DEGRADED";

    DP_NAVIGATION_STATE.navigationState =
        "SENSOR DEGRADED";

}


/* =========================================================
   SIMULATED SENSOR DISAGREEMENT
========================================================= */

function simulateDPSensorDisagreement() {

    injectDPSensorFault(
        "DGPS",
        DP_SENSOR_STATES.WARNING
    );

    injectDPSensorFault(
        "CYSCAN",
        DP_SENSOR_STATES.WARNING
    );

    DP_NAVIGATION_STATE.sensorAgreement =
        "DISAGREEMENT";

    DP_NAVIGATION_STATE.sensorAgreementScore =
        55;

    DP_NAVIGATION_STATE.navigationState =
        "REFERENCE DISAGREEMENT";

}


/* =========================================================
   SIMULATED SENSOR LOSS
========================================================= */

function simulateDPSensorLoss() {

    injectDPSensorFault(
        "DGPS",
        DP_SENSOR_STATES.LOST
    );

    DP_NAVIGATION_STATE.positionQuality =
        "LOW";

    DP_NAVIGATION_STATE.navigationState =
        "POSITION REFERENCE LOSS";

}


/* =========================================================
   SENSOR RECOVERY
========================================================= */

function recoverDPSensors() {

    resetDPSensors();

    Object.keys(
        DP_NAVIGATION_SENSORS
    ).forEach(
        sensorName => {

            DP_NAVIGATION_SENSORS[
                sensorName
            ].state =
                DP_SENSOR_STATES.RECOVERED;

        }
    );

    DP_NAVIGATION_STATE.navigationState =
        "SENSOR RECOVERY";

}


/* =========================================================
   NORMAL NAVIGATION
========================================================= */

function simulateNormalNavigation() {

    resetDPSensors();

    DP_NAVIGATION_STATE.positionQuality =
        "HIGH";

    DP_NAVIGATION_STATE.sensorAgreement =
        "HIGH";

    DP_NAVIGATION_STATE.sensorAgreementScore =
        97;

    DP_NAVIGATION_STATE.navigationState =
        "STABLE";

}


/* =========================================================
   SENSOR SUMMARY
========================================================= */

function getDPSensorSummary() {

    const verification =
        verifyDPSensorState();

    return {

        navigation:
            getDPNavigationState(),

        sensors:
            getDPNavigationSensors(),

        verification:

            verification

    };

}


/* =========================================================
   BROWSER EXPORT
========================================================= */

if (
    typeof window !==
    "undefined"
) {

    window.DP_SENSOR_STATES =
        DP_SENSOR_STATES;

    window.DP_NAVIGATION_SENSORS =
        DP_NAVIGATION_SENSORS;

    window.getDPNavigationSensors =
        getDPNavigationSensors;

    window.getDPNavigationState =
        getDPNavigationState;

    window.verifyDPSensorState =
        verifyDPSensorState;

    window.injectDPSensorFault =
        injectDPSensorFault;

    window.resetDPSensors =
        resetDPSensors;

    window.simulateDPSensorDegradation =
        simulateDPSensorDegradation;

    window.simulateDPSensorDisagreement =
        simulateDPSensorDisagreement;

    window.simulateDPSensorLoss =
        simulateDPSensorLoss;

    window.recoverDPSensors =
        recoverDPSensors;

    window.simulateNormalNavigation =
        simulateNormalNavigation;

    window.getDPSensorSummary =
        getDPSensorSummary;

}


/* =========================================================
   NODE.JS EXPORT
========================================================= */

if (
    typeof module !==
        "undefined" &&
    module.exports
) {

    module.exports = {

        DP_SENSOR_STATES,

        DP_NAVIGATION_SENSORS,

        getDPNavigationSensors,

        getDPNavigationState,

        verifyDPSensorState,

        injectDPSensorFault,

        resetDPSensors,

        simulateDPSensorDegradation,

        simulateDPSensorDisagreement,

        simulateDPSensorLoss,

        recoverDPSensors,

        simulateNormalNavigation,

        getDPSensorSummary

    };

}


/* =========================================================
   READY
========================================================= */

if (
    typeof console !==
    "undefined"
) {

    console.log(
        "SEXTANT PROTOCOL DP NAVIGATION & SENSOR SIMULATOR — READY"
    );

    console.log(
        "SENSORS:",
        Object.keys(
            DP_NAVIGATION_SENSORS
        ).length
    );

    console.log(
        "MODE: SIMULATION ONLY"
    );

}