/*
============================================================
SEXTANT PROTOCOL
DP NAVIGATION PANEL — SIMULATION MODULE
============================================================

File:
    dp_navigation_panel.js

Purpose:
    Simulated navigation and sensor-awareness panel for the
    Sextant Protocol DP Resilience Cockpit.

SIMULATION ONLY
This module does NOT interface with real:
    - DP systems
    - Radar
    - CyScan / laser sensors
    - DGPS / GNSS
    - taut-wire systems
    - gyrocompass
    - propulsion
    - thrusters
    - steering
    - vessel automation

The module generates deterministic simulated navigation data
for research, demonstration and resilience testing.

Architecture:

    SIMULATED ENVIRONMENT
            ↓
    SIMULATED NAVIGATION SENSORS
            ↓
    NAVIGATION PANEL
            ↓
    DP RESILIENCE COCKPIT
            ↓
    HUMAN DECISION AUTHORITY

============================================================
*/

(function () {

    "use strict";

    const DP_NAVIGATION_PANEL = {

        version: "1.0.0",

        status: "SIMULATION READY",

        vessel: {
            name: "SEXTANT-MPSV-01",
            latitude: 1.290270,
            longitude: 103.851959,
            heading: 0,
            speed: 0,
            positionError: 0
        },

        sensors: {

            GNSS: {
                name: "SIMULATED GNSS / DGPS",
                status: "AVAILABLE",
                confidence: 100,
                positionError: 0
            },

            RADAR: {
                name: "SIMULATED RADAR",
                status: "AVAILABLE",
                confidence: 100,
                contacts: 0
            },

            CYSCAN: {
                name: "SIMULATED LASER / CYSCAN",
                status: "AVAILABLE",
                confidence: 100,
                rangeError: 0
            },

            TAUT_WIRE: {
                name: "SIMULATED TAUT-WIRE",
                status: "AVAILABLE",
                confidence: 100,
                rangeError: 0
            },

            GYRO: {
                name: "SIMULATED GYROCOMPASS",
                status: "AVAILABLE",
                confidence: 100,
                headingError: 0
            }
        },

        navigation: {

            positionStatus: "STABLE",

            headingStatus: "STABLE",

            sensorAgreement: 100,

            navigationConfidence: 100,

            positionReference: "SIMULATED GNSS / DGPS",

            headingReference: "SIMULATED GYRO",

            navigationMode: "NORMAL SIMULATED MONITORING"
        },

        lastUpdate: null
    };


    /*
    ========================================================
    SIMULATED SENSOR UPDATE
    ========================================================
    */

    function updateNavigationSensors(environmentStress) {

        const stress = Math.max(
            0,
            Math.min(
                100,
                Number(environmentStress) || 0
            )
        );

        const degradation = Math.min(
            80,
            stress * 0.65
        );

        const confidence = Math.max(
            20,
            100 - degradation
        );

        DP_NAVIGATION_PANEL.sensors.GNSS.confidence =
            Number(confidence.toFixed(1));

        DP_NAVIGATION_PANEL.sensors.CYSCAN.confidence =
            Number(Math.max(
                20,
                confidence - 5
            ).toFixed(1));

        DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.confidence =
            Number(Math.max(
                20,
                confidence - 8
            ).toFixed(1));

        DP_NAVIGATION_PANEL.sensors.RADAR.confidence =
            Number(Math.max(
                25,
                confidence + 2
            ).toFixed(1));

        DP_NAVIGATION_PANEL.sensors.GYRO.confidence =
            Number(Math.max(
                30,
                confidence + 5
            ).toFixed(1));

        DP_NAVIGATION_PANEL.navigation.sensorAgreement =
            Number(
                (
                    (
                        DP_NAVIGATION_PANEL.sensors.GNSS.confidence +
                        DP_NAVIGATION_PANEL.sensors.CYSCAN.confidence +
                        DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.confidence +
                        DP_NAVIGATION_PANEL.sensors.RADAR.confidence +
                        DP_NAVIGATION_PANEL.sensors.GYRO.confidence
                    ) / 5
                ).toFixed(1)
            );

        DP_NAVIGATION_PANEL.navigation.navigationConfidence =
            DP_NAVIGATION_PANEL.navigation.sensorAgreement;

        updateNavigationStatus();

        renderNavigationPanel();

        DP_NAVIGATION_PANEL.lastUpdate =
            new Date().toISOString();
    }


    /*
    ========================================================
    NAVIGATION STATUS
    ========================================================
    */

    function updateNavigationStatus() {

        const confidence =
            DP_NAVIGATION_PANEL.navigation
                .navigationConfidence;

        if (confidence >= 80) {

            DP_NAVIGATION_PANEL.navigation.positionStatus =
                "STABLE";

            DP_NAVIGATION_PANEL.navigation.headingStatus =
                "STABLE";

            DP_NAVIGATION_PANEL.navigation.navigationMode =
                "NORMAL SIMULATED MONITORING";

        }

        else if (confidence >= 55) {

            DP_NAVIGATION_PANEL.navigation.positionStatus =
                "DEGRADED";

            DP_NAVIGATION_PANEL.navigation.headingStatus =
                "DEGRADED";

            DP_NAVIGATION_PANEL.navigation.navigationMode =
                "ENHANCED SIMULATED MONITORING";

        }

        else {

            DP_NAVIGATION_PANEL.navigation.positionStatus =
                "CRITICAL";

            DP_NAVIGATION_PANEL.navigation.headingStatus =
                "CRITICAL";

            DP_NAVIGATION_PANEL.navigation.navigationMode =
                "SIMULATED NAVIGATION UNCERTAINTY";

        }

        updateSensorStates();
    }


    /*
    ========================================================
    SENSOR STATES
    ========================================================
    */

    function updateSensorStates() {

        Object.values(
            DP_NAVIGATION_PANEL.sensors
        ).forEach(sensor => {

            if (sensor.confidence >= 80) {

                sensor.status =
                    "AVAILABLE";

            }

            else if (sensor.confidence >= 55) {

                sensor.status =
                    "DEGRADED";

            }

            else {

                sensor.status =
                    "LOW CONFIDENCE";
            }
        });
    }


    /*
    ========================================================
    SIMULATED VESSEL MOVEMENT
    ========================================================
    */

    function updateVesselNavigation(
        latitude,
        longitude,
        heading,
        speed
    ) {

        DP_NAVIGATION_PANEL.vessel.latitude =
            Number(latitude) || 0;

        DP_NAVIGATION_PANEL.vessel.longitude =
            Number(longitude) || 0;

        DP_NAVIGATION_PANEL.vessel.heading =
            Number(heading) || 0;

        DP_NAVIGATION_PANEL.vessel.speed =
            Number(speed) || 0;

        renderNavigationPanel();
    }


    /*
    ========================================================
    PANEL RENDER
    ========================================================
    */

    function renderNavigationPanel() {

        const panel =
            document.getElementById(
                "dpNavigationPanel"
            );

        if (!panel) {
            return;
        }

        const vessel =
            DP_NAVIGATION_PANEL.vessel;

        const navigation =
            DP_NAVIGATION_PANEL.navigation;

        const sensors =
            DP_NAVIGATION_PANEL.sensors;

        panel.innerHTML = `

            <div class="dp-nav-header">
                <strong>
                    SIMULATED NAVIGATION / SENSOR AWARENESS
                </strong>

                <span>
                    ${navigation.navigationMode}
                </span>
            </div>

            <div class="dp-nav-position">

                <div>
                    <small>LATITUDE</small>
                    <strong>
                        ${vessel.latitude.toFixed(6)}
                    </strong>
                </div>

                <div>
                    <small>LONGITUDE</small>
                    <strong>
                        ${vessel.longitude.toFixed(6)}
                    </strong>
                </div>

                <div>
                    <small>HEADING</small>
                    <strong>
                        ${vessel.heading.toFixed(1)}°
                    </strong>
                </div>

                <div>
                    <small>SPEED</small>
                    <strong>
                        ${vessel.speed.toFixed(2)} kn
                    </strong>
                </div>

            </div>

            <div class="dp-nav-status">

                <div>
                    <small>POSITION</small>
                    <strong>
                        ${navigation.positionStatus}
                    </strong>
                </div>

                <div>
                    <small>HEADING</small>
                    <strong>
                        ${navigation.headingStatus}
                    </strong>
                </div>

                <div>
                    <small>SENSOR AGREEMENT</small>
                    <strong>
                        ${navigation.sensorAgreement}%
                    </strong>
                </div>

                <div>
                    <small>NAVIGATION CONFIDENCE</small>
                    <strong>
                        ${navigation.navigationConfidence}%
                    </strong>
                </div>

            </div>

            <div class="dp-nav-sensors">

                ${renderSensor(
                    "GNSS / DGPS",
                    sensors.GNSS
                )}

                ${renderSensor(
                    "RADAR",
                    sensors.RADAR
                )}

                ${renderSensor(
                    "CYSCAN / LASER",
                    sensors.CYSCAN
                )}

                ${renderSensor(
                    "TAUT-WIRE",
                    sensors.TAUT_WIRE
                )}

                ${renderSensor(
                    "GYROCOMPASS",
                    sensors.GYRO
                )}

            </div>

            <div class="dp-nav-disclaimer">

                SIMULATED SENSOR DATA ONLY.
                NO REAL NAVIGATION SENSOR INTERFACE.

            </div>
        `;
    }


    /*
    ========================================================
    SENSOR CARD
    ========================================================
    */

    function renderSensor(
        name,
        sensor
    ) {

        return `

            <div class="dp-nav-sensor">

                <span>
                    ${name}
                </span>

                <strong>
                    ${sensor.status}
                </strong>

                <small>
                    CONFIDENCE:
                    ${sensor.confidence}%
                </small>

            </div>
        `;
    }


    /*
    ========================================================
    RESET
    ========================================================
    */

    function resetNavigationPanel() {

        DP_NAVIGATION_PANEL.vessel = {

            name: "SEXTANT-MPSV-01",

            latitude: 1.290270,

            longitude: 103.851959,

            heading: 0,

            speed: 0,

            positionError: 0
        };

        Object.values(
            DP_NAVIGATION_PANEL.sensors
        ).forEach(sensor => {

            sensor.confidence = 100;
            sensor.status = "AVAILABLE";

        });

        DP_NAVIGATION_PANEL.navigation = {

            positionStatus: "STABLE",

            headingStatus: "STABLE",

            sensorAgreement: 100,

            navigationConfidence: 100,

            positionReference:
                "SIMULATED GNSS / DGPS",

            headingReference:
                "SIMULATED GYRO",

            navigationMode:
                "NORMAL SIMULATED MONITORING"
        };

        renderNavigationPanel();
    }


    /*
    ========================================================
    INITIALISE
    ========================================================
    */

    function initialiseNavigationPanel() {

        renderNavigationPanel();

        console.log(
            "SEXTANT DP NAVIGATION PANEL — READY"
        );

        console.log(
            "MODE: SIMULATION ONLY"
        );
    }


    /*
    ========================================================
    BROWSER API
    ========================================================
    */

    window.DP_NAVIGATION_PANEL =
        DP_NAVIGATION_PANEL;

    window.updateNavigationSensors =
        updateNavigationSensors;

    window.updateVesselNavigation =
        updateVesselNavigation;

    window.resetNavigationPanel =
        resetNavigationPanel;

    window.initialiseNavigationPanel =
        initialiseNavigationPanel;


    /*
    ========================================================
    AUTO INITIALISE
    ========================================================
    */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseNavigationPanel
        );

    }

    else {

        initialiseNavigationPanel();

    }

})();