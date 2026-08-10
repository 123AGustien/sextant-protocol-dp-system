/*
============================================================
SEXTANT PROTOCOL
DP NAVIGATION PANEL — SIMULATION MODULE
============================================================

File:
    dp_navigation_panel.js

Version:
    1.1.0

Purpose:
    Simulated navigation and sensor-awareness module for the
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

Architecture:

    SIMULATED ENVIRONMENT
            ↓
    SIMULATED NAVIGATION SENSORS
            ↓
    SENSOR AGREEMENT
            ↓
    NAVIGATION CONFIDENCE
            ↓
    DP RESILIENCE COCKPIT
            ↓
    HUMAN DECISION AUTHORITY

============================================================
*/

(function () {

    "use strict";

    const DP_NAVIGATION_PANEL = {

        version: "1.1.0",

        status: "SIMULATION READY",

        vessel: {

            name: "SEXTANT-MPSV-01",

            latitude: 1.290270,

            longitude: 103.851959,

            heading: 0,

            speed: 0,

            positionError: 0,

            headingError: 0
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

            positionReference:
                "SIMULATED GNSS / DGPS",

            headingReference:
                "SIMULATED GYRO",

            navigationMode:
                "NORMAL SIMULATED MONITORING",

            environmentStress: 0,

            alertLevel: "NORMAL"
        },

        lastUpdate: null
    };


    /*
    ========================================================
    CLAMP
    ========================================================
    */

    function clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );
    }


    /*
    ========================================================
    SIMULATED SENSOR UPDATE
    ========================================================
    */

    function updateNavigationSensors(environmentStress) {

        const stress = clamp(
            Number(environmentStress) || 0,
            0,
            100
        );

        DP_NAVIGATION_PANEL.navigation.environmentStress =
            Number(stress.toFixed(1));


        /*
        ----------------------------------------------------
        Deterministic environmental degradation model
        ----------------------------------------------------
        */

        const degradation =
            Math.min(
                80,
                stress * 0.65
            );

        const baseConfidence =
            Math.max(
                20,
                100 - degradation
            );


        /*
        ----------------------------------------------------
        SENSOR CONFIDENCE
        ----------------------------------------------------
        */

        DP_NAVIGATION_PANEL.sensors.GNSS.confidence =
            Number(
                baseConfidence.toFixed(1)
            );

        DP_NAVIGATION_PANEL.sensors.CYSCAN.confidence =
            Number(
                Math.max(
                    20,
                    baseConfidence - 5
                ).toFixed(1)
            );

        DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.confidence =
            Number(
                Math.max(
                    20,
                    baseConfidence - 8
                ).toFixed(1)
            );

        DP_NAVIGATION_PANEL.sensors.RADAR.confidence =
            Number(
                Math.max(
                    25,
                    baseConfidence + 2
                ).toFixed(1)
            );

        DP_NAVIGATION_PANEL.sensors.GYRO.confidence =
            Number(
                Math.max(
                    30,
                    baseConfidence + 5
                ).toFixed(1)
            );


        /*
        ----------------------------------------------------
        SENSOR ERROR SIMULATION
        ----------------------------------------------------
        */

        DP_NAVIGATION_PANEL.sensors.GNSS.positionError =
            Number(
                ((100 -
                    DP_NAVIGATION_PANEL.sensors.GNSS.confidence)
                    * 0.02).toFixed(2)
            );

        DP_NAVIGATION_PANEL.sensors.CYSCAN.rangeError =
            Number(
                ((100 -
                    DP_NAVIGATION_PANEL.sensors.CYSCAN.confidence)
                    * 0.03).toFixed(2)
            );

        DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.rangeError =
            Number(
                ((100 -
                    DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.confidence)
                    * 0.04).toFixed(2)
            );

        DP_NAVIGATION_PANEL.sensors.GYRO.headingError =
            Number(
                ((100 -
                    DP_NAVIGATION_PANEL.sensors.GYRO.confidence)
                    * 0.05).toFixed(2)
            );


        /*
        ----------------------------------------------------
        SENSOR AGREEMENT
        ----------------------------------------------------
        */

        const sensorValues = [

            DP_NAVIGATION_PANEL.sensors.GNSS.confidence,

            DP_NAVIGATION_PANEL.sensors.CYSCAN.confidence,

            DP_NAVIGATION_PANEL.sensors.TAUT_WIRE.confidence,

            DP_NAVIGATION_PANEL.sensors.RADAR.confidence,

            DP_NAVIGATION_PANEL.sensors.GYRO.confidence
        ];

        const agreement =
            sensorValues.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) / sensorValues.length;


        DP_NAVIGATION_PANEL.navigation.sensorAgreement =
            Number(
                agreement.toFixed(1)
            );

        DP_NAVIGATION_PANEL.navigation.navigationConfidence =
            Number(
                agreement.toFixed(1)
            );


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

            DP_NAVIGATION_PANEL.navigation.alertLevel =
                "NORMAL";

        }

        else if (confidence >= 55) {

            DP_NAVIGATION_PANEL.navigation.positionStatus =
                "DEGRADED";

            DP_NAVIGATION_PANEL.navigation.headingStatus =
                "DEGRADED";

            DP_NAVIGATION_PANEL.navigation.navigationMode =
                "ENHANCED SIMULATED MONITORING";

            DP_NAVIGATION_PANEL.navigation.alertLevel =
                "ADVISORY";

        }

        else {

            DP_NAVIGATION_PANEL.navigation.positionStatus =
                "CRITICAL";

            DP_NAVIGATION_PANEL.navigation.headingStatus =
                "CRITICAL";

            DP_NAVIGATION_PANEL.navigation.navigationMode =
                "SIMULATED NAVIGATION UNCERTAINTY";

            DP_NAVIGATION_PANEL.navigation.alertLevel =
                "CRITICAL";
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
            Number(latitude) ||
            DP_NAVIGATION_PANEL.vessel.latitude;

        DP_NAVIGATION_PANEL.vessel.longitude =
            Number(longitude) ||
            DP_NAVIGATION_PANEL.vessel.longitude;

        DP_NAVIGATION_PANEL.vessel.heading =
            Number(heading) || 0;

        DP_NAVIGATION_PANEL.vessel.speed =
            Number(speed) || 0;

        renderNavigationPanel();
    }


    /*
    ========================================================
    SIMULATED ENVIRONMENT → NAVIGATION BRIDGE
    ========================================================
    */

    function updateDPNavigationFromEnvironment(
        environmentStress
    ) {

        updateNavigationSensors(
            environmentStress
        );

        return getNavigationState();
    }


    /*
    ========================================================
    NAVIGATION STATE
    ========================================================
    */

    function getNavigationState() {

        return {

            vessel:
                JSON.parse(
                    JSON.stringify(
                        DP_NAVIGATION_PANEL.vessel
                    )
                ),

            sensors:
                JSON.parse(
                    JSON.stringify(
                        DP_NAVIGATION_PANEL.sensors
                    )
                ),

            navigation:
                JSON.parse(
                    JSON.stringify(
                        DP_NAVIGATION_PANEL.navigation
                    )
                ),

            lastUpdate:
                DP_NAVIGATION_PANEL.lastUpdate
        };
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


        /*
        IMPORTANT:
        Do not replace the entire navigation panel DOM.

        The HTML file owns the visual vessel display,
        heading arrow, position ring and confidence bar.

        JavaScript updates the existing elements only.
        */


        const vessel =
            DP_NAVIGATION_PANEL.vessel;

        const navigation =
            DP_NAVIGATION_PANEL.navigation;

        const sensors =
            DP_NAVIGATION_PANEL.sensors;


        updateText(
            "dpNavLatitude",
            vessel.latitude.toFixed(6)
        );

        updateText(
            "dpNavLongitude",
            vessel.longitude.toFixed(6)
        );

        updateText(
            "dpNavHeading",
            `${vessel.heading.toFixed(1)}°`
        );

        updateText(
            "dpNavSpeed",
            `${vessel.speed.toFixed(2)} kn`
        );


        updateText(
            "dpNavPositionStatus",
            navigation.positionStatus
        );

        updateText(
            "dpNavHeadingStatus",
            navigation.headingStatus
        );

        updateText(
            "dpNavSensorAgreement",
            `${navigation.sensorAgreement}%`
        );

        updateText(
            "dpNavNavigationConfidence",
            `${navigation.navigationConfidence}%`
        );


        updateSensorElement(
            "GNSS",
            sensors.GNSS
        );

        updateSensorElement(
            "RADAR",
            sensors.RADAR
        );

        updateSensorElement(
            "CYSCAN",
            sensors.CYSCAN
        );

        updateSensorElement(
            "TAUT_WIRE",
            sensors.TAUT_WIRE
        );

        updateSensorElement(
            "GYRO",
            sensors.GYRO
        );


        updateText(
            "dpNavigationMode",
            navigation.navigationMode
        );


        updateText(
            "navigationConfidence",
            `${navigation.navigationConfidence}%`
        );


        const confidenceBar =
            document.getElementById(
                "navigationConfidenceBar"
            );

        if (confidenceBar) {

            confidenceBar.style.width =
                `${navigation.navigationConfidence}%`;
        }


        updateNavigationVisuals();
    }


    /*
    ========================================================
    TEXT UPDATE HELPER
    ========================================================
    */

    function updateText(
        elementId,
        value
    ) {

        const element =
            document.getElementById(
                elementId
            );

        if (element) {

            element.textContent =
                value;
        }
    }


    /*
    ========================================================
    SENSOR ELEMENT UPDATE
    ========================================================
    */

    function updateSensorElement(
        sensorKey,
        sensor
    ) {

        const statusElement =
            document.getElementById(
                `sensor-${sensorKey}-status`
            );

        const confidenceElement =
            document.getElementById(
                `sensor-${sensorKey}-confidence`
            );

        const card =
            document.getElementById(
                `sensor-${sensorKey}`
            );


        if (statusElement) {

            statusElement.textContent =
                sensor.status;
        }


        if (confidenceElement) {

            confidenceElement.textContent =
                `CONFIDENCE: ${sensor.confidence}%`;
        }


        if (card) {

            card.classList.remove(
                "sensor-available",
                "sensor-degraded",
                "sensor-critical"
            );


            if (
                sensor.confidence >= 80
            ) {

                card.classList.add(
                    "sensor-available"
                );

            }

            else if (
                sensor.confidence >= 55
            ) {

                card.classList.add(
                    "sensor-degraded"
                );

            }

            else {

                card.classList.add(
                    "sensor-critical"
                );
            }
        }
    }


    /*
    ========================================================
    NAVIGATION VISUALS
    ========================================================
    */

    function updateNavigationVisuals() {

        const vesselMarker =
            document.getElementById(
                "vesselMarker"
            );

        const headingArrow =
            document.getElementById(
                "headingArrow"
            );


        if (vesselMarker) {

            vesselMarker.style.transform =
                `translate(-50%, -50%)
                 rotate(${DP_NAVIGATION_PANEL.vessel.heading}deg)`;
        }


        if (headingArrow) {

            headingArrow.style.transform =
                `translateX(-50%)
                 rotate(${DP_NAVIGATION_PANEL.vessel.heading}deg)`;

            headingArrow.style.transformOrigin =
                "50% 100%";
        }
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

            positionError: 0,

            headingError: 0
        };


        Object.values(
            DP_NAVIGATION_PANEL.sensors
        ).forEach(sensor => {

            sensor.confidence = 100;

            sensor.status =
                "AVAILABLE";

            if (
                "positionError" in sensor
            ) {
                sensor.positionError = 0;
            }

            if (
                "rangeError" in sensor
            ) {
                sensor.rangeError = 0;
            }

            if (
                "headingError" in sensor
            ) {
                sensor.headingError = 0;
            }
        });


        DP_NAVIGATION_PANEL.navigation = {

            positionStatus:
                "STABLE",

            headingStatus:
                "STABLE",

            sensorAgreement:
                100,

            navigationConfidence:
                100,

            positionReference:
                "SIMULATED GNSS / DGPS",

            headingReference:
                "SIMULATED GYRO",

            navigationMode:
                "NORMAL SIMULATED MONITORING",

            environmentStress:
                0,

            alertLevel:
                "NORMAL"
        };


        DP_NAVIGATION_PANEL.lastUpdate =
            new Date().toISOString();


        renderNavigationPanel();
    }


    /*
    ========================================================
    INITIALISE
    ========================================================
    */

    function initialiseNavigationPanel() {

        resetNavigationPanel();

        console.log(
            "SEXTANT DP NAVIGATION PANEL — READY"
        );

        console.log(
            "VERSION:",
            DP_NAVIGATION_PANEL.version
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

    window.updateDPNavigationFromEnvironment =
        updateDPNavigationFromEnvironment;

    window.getDPNavigationState =
        getNavigationState;

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