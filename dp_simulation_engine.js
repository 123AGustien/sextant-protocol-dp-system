/* ============================================================
   SEXTANT PROTOCOL
   DP RESILIENCE COCKPIT
   FULL SIMULATION PACKAGE
   ============================================================

   COMPONENTS:

   1. DP SCENARIO LIBRARY
   2. DP SIMULATION ENGINE
   3. PRIMARY AI SIMULATION LAYER
   4. SECONDARY AI SAFETY SIMULATION LAYER
   5. STABILIZER / ARBITRATION SIMULATION
   6. HUMAN-IN-THE-LOOP DECISION SUPPORT
   7. COCKPIT WIRING
   8. AUDIT / EVENT LOGGING

   SAFETY BOUNDARY:

   RESEARCH / SIMULATION ONLY.

   THIS SOFTWARE DOES NOT COMMAND OR CONNECT TO:

   - REAL DP SYSTEMS
   - REAL THRUSTERS
   - PROPULSION
   - STEERING
   - NAVIGATION
   - VESSEL AUTOMATION
   - SAFETY SYSTEMS

   ALL OUTPUTS ARE SIMULATED.

   HUMAN AUTHORITY REMAINS FINAL.
============================================================ */


/* ============================================================
   SECTION 1
   DP SCENARIO LIBRARY
============================================================ */

const DP_SCENARIOS = {

    NORMAL: {

        name:
            "NORMAL",

        description:
            "Normal operating environmental conditions.",

        wind: 20,
        current: 15,
        wave: 20,
        tidal: 15

    },


    MODERATE_WEATHER: {

        name:
            "MODERATE WEATHER",

        description:
            "Moderate environmental disturbance.",

        wind: 45,
        current: 40,
        wave: 50,
        tidal: 35

    },


    HEAVY_WEATHER: {

        name:
            "HEAVY WEATHER",

        description:
            "High environmental loading.",

        wind: 70,
        current: 65,
        wave: 75,
        tidal: 60

    },


    CRITICAL_WEATHER: {

        name:
            "CRITICAL WEATHER",

        description:
            "Extreme environmental disturbance.",

        wind: 95,
        current: 90,
        wave: 95,
        tidal: 85

    },


    CURRENT_SURGE: {

        name:
            "CURRENT SURGE",

        description:
            "High current loading with moderate other forces.",

        wind: 40,
        current: 90,
        wave: 45,
        tidal: 70

    },


    HEAVY_SEA_STATE: {

        name:
            "HEAVY SEA STATE",

        description:
            "High wave loading.",

        wind: 65,
        current: 45,
        wave: 90,
        tidal: 50

    },


    WIND_GUST_EVENT: {

        name:
            "WIND GUST EVENT",

        description:
            "High wind disturbance.",

        wind: 90,
        current: 40,
        wave: 50,
        tidal: 35

    },


    COMBINED_DISTURBANCE: {

        name:
            "COMBINED DISTURBANCE",

        description:
            "Multiple simultaneous environmental disturbances.",

        wind: 80,
        current: 75,
        wave: 80,
        tidal: 70

    },


    SENSOR_NOISE: {

        name:
            "SENSOR NOISE",

        description:
            "Simulated degraded sensor fidelity with fluctuating environmental readings.",

        wind: 55,
        current: 50,
        wave: 60,
        tidal: 45

    },


    PARTIAL_SENSOR_LOSS: {

        name:
            "PARTIAL SENSOR LOSS",

        description:
            "Reduced confidence in environmental inputs due to partial sensor degradation.",

        wind: 60,
        current: 30,
        wave: 65,
        tidal: 20

    },


    RAPID_TRANSITION: {

        name:
            "RAPID TRANSITION",

        description:
            "Fast-changing environmental conditions to test stabilization response.",

        wind: 30,
        current: 85,
        wave: 40,
        tidal: 90

    }

};


/* ============================================================
   SCENARIO APPLICATION
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
            "DP scenario input fields not found."
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
   SCENARIO EXECUTION
============================================================ */

function runDPScenario(
    scenarioName
) {

    const applied =
        applyDPScenario(
            scenarioName
        );


    if (!applied) {
        return null;
    }


    if (
        typeof window.runSimulation !==
        "function"
    ) {

        console.error(
            "runSimulation() is not available."
        );

        return null;

    }


    return window.runSimulation();

}


/* ============================================================
   CONVENIENCE SCENARIO FUNCTIONS
============================================================ */

function normalScenario() {

    return runDPScenario(
        "NORMAL"
    );

}


function moderateWeatherScenario() {

    return runDPScenario(
        "MODERATE_WEATHER"
    );

}


function heavyWeatherScenario() {

    return runDPScenario(
        "HEAVY_WEATHER"
    );

}


function criticalScenario() {

    return runDPScenario(
        "CRITICAL_WEATHER"
    );

}


function currentSurgeScenario() {

    return runDPScenario(
        "CURRENT_SURGE"
    );

}


function heavySeaStateScenario() {

    return runDPScenario(
        "HEAVY_SEA_STATE"
    );

}


function windGustScenario() {

    return runDPScenario(
        "WIND_GUST_EVENT"
    );

}


function combinedDisturbanceScenario() {

    return runDPScenario(
        "COMBINED_DISTURBANCE"
    );

}


/* ============================================================
   RANDOM SCENARIO
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
            "DP scenario input fields not found."
        );

        return null;

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
        typeof window.runSimulation ===
        "function"
    ) {

        return window.runSimulation();

    }


    return null;

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

    window.runDPScenario =
        runDPScenario;

    window.getDPScenario =
        getDPScenario;

}


/* ============================================================
   SECTION 2
   DP SIMULATION ENGINE
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       ENGINE CONSTANTS
    ======================================================== */

    const ENGINE_NAME =
        "SextantDPSimulationEngine";

    const VERSION =
        "1.2.0";

    const MODE =
        "SIMULATION";

    const NOMINAL_THRUST =
        100;


    /* ========================================================
       VESSEL PROFILE
    ======================================================== */

    const VESSEL = {

        name:
            "SEXTANT-MPSV-01",

        type:
            "Multi-Purpose Support Vessel",

        dpClass:
            "DP2-SIMULATED",

        dimensions: {

            length:
                85,

            beam:
                20,

            draft:
                6

        },

        propulsion: {

            mainThrusters:
                2,

            tunnelThrusters:
                2,

            totalThrusters:
                4,

            nominalThrust:
                NOMINAL_THRUST

        }

    };


    /* ========================================================
       INPUT VALIDATION
    ======================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        const number =
            Number(value);


        if (
            !Number.isFinite(
                number
            )
        ) {

            return min;

        }


        return Math.max(
            min,
            Math.min(
                max,
                number
            )
        );

    }


    function normaliseInputs(
        inputs
    ) {

        inputs =
            inputs || {};


        return {

            wind:
                clamp(
                    inputs.wind,
                    0,
                    100
                ),

            current:
                clamp(
                    inputs.current,
                    0,
                    100
                ),

            wave:
                clamp(
                    inputs.wave,
                    0,
                    100
                ),

            tidal:
                clamp(
                    inputs.tidal,
                    0,
                    100
                )

        };

    }


    /* ========================================================
       ENVIRONMENTAL STRESS
       
       Wind    = 30%
       Current = 25%
       Wave    = 30%
       Tidal   = 15%
    ======================================================== */

    function calculateEnvironmentalStress(
        inputs
    ) {

        return (

            inputs.wind *
            0.30 +

            inputs.current *
            0.25 +

            inputs.wave *
            0.30 +

            inputs.tidal *
            0.15

        );

    }


    /* ========================================================
       RISK CLASSIFICATION
    ======================================================== */

    function classifyRisk(
        stress
    ) {

        if (
            stress < 35
        ) {

            return "LOW";

        }


        if (
            stress < 60
        ) {

            return "MEDIUM";

        }


        if (
            stress < 80
        ) {

            return "HIGH";

        }


        return "CRITICAL";

    }


    /* ========================================================
       PRIMARY AI SIMULATION
    ======================================================== */

    function calculatePrimaryLayer(
        environmentalStress
    ) {

        const thrustOutput =
            clamp(

                NOMINAL_THRUST -
                (
                    environmentalStress *
                    0.35
                ),

                0,
                NOMINAL_THRUST

            );


        let mode =
            "NORMAL CONTROL";


        if (
            environmentalStress >=
            60
        ) {

            mode =
                "STRESS COMPENSATION";

        }


        if (
            environmentalStress >=
            80
        ) {

            mode =
                "DEGRADED CONTROL";

        }


        return {

            layer:
                "PRIMARY AI",

            mode:
                mode,

            thrustOutput:
                thrustOutput,

            status:
                "SIMULATED"

        };

    }


    /* ========================================================
       SECONDARY AI SIMULATION
    ======================================================== */

    function calculateSecondaryLayer(
        environmentalStress,
        risk
    ) {

        const safetyMode =
            risk === "MEDIUM" ||
            risk === "HIGH" ||
            risk === "CRITICAL";


        let mode =
            "INDEPENDENT MONITORING";


        if (
            risk === "MEDIUM"
        ) {

            mode =
                "PREVENTIVE SAFETY MONITORING";

        }


        if (
            risk === "HIGH" ||
            risk === "CRITICAL"
        ) {

            mode =
                "SAFETY PRIORITY";

        }


        const thrustOutput =
            clamp(

                NOMINAL_THRUST -
                (
                    environmentalStress *
                    0.25
                ),

                0,
                NOMINAL_THRUST

            );


        return {

            layer:
                "SECONDARY AI",

            mode:
                mode,

            thrustOutput:
                thrustOutput,

            status:
                safetyMode
                    ? "ACTIVE"
                    : "MONITORING",

            safetyMode:
                safetyMode

        };

    }


    /* ========================================================
       HUMAN AUTHORITY
    ======================================================== */

    function calculateHumanAuthority(
        risk
    ) {

        const reviewRequired =
            risk === "HIGH" ||
            risk === "CRITICAL";


        return {

            override:
                reviewRequired,

            authority:
                "HUMAN FINAL AUTHORITY",

            status:
                reviewRequired
                    ? "REVIEW REQUIRED"
                    : "AVAILABLE"

        };

    }


    /* ========================================================
       STABILIZER / ARBITRATION
       
       IMPORTANT:
       This is a SIMULATION calculation only.
    ======================================================== */

    function calculateStabilizer(
        primary,
        secondary,
        risk
    ) {

        let source =
            "PRIMARY";


        let status =
            "MONITORING";


        let mode =
            "NORMAL ARBITRATION";


        let finalOutput =
            primary.thrustOutput;


        if (
            risk === "MEDIUM"
        ) {

            source =
                "SECONDARY SAFETY REVIEW";

            status =
                "ACTIVE";

            mode =
                "PREVENTIVE ARBITRATION";

            finalOutput =
                Math.min(
                    primary.thrustOutput,
                    secondary.thrustOutput
                );

        }


        if (
            risk === "HIGH" ||
            risk === "CRITICAL"
        ) {

            source =
                "SAFETY PRIORITY";

            status =
                "ACTIVE";

            mode =
                "HUMAN REVIEW ARBITRATION";

            finalOutput =
                Math.min(
                    primary.thrustOutput,
                    secondary.thrustOutput
                );

        }


        return {

            layer:
                "STABILIZER",

            mode:
                mode,

            finalOutput:
                finalOutput,

            source:
                source,

            status:
                status,

            operationalCommand:
                false

        };

    }


    /* ========================================================
       OPERATOR DECISION SUPPORT
    ======================================================== */

    function calculateRecommendedAction(
        inputs,
        environmentalStress,
        risk
    ) {

        const recommendations =
            [];


        let primaryRecommendation =
            "CONTINUE MONITORING";


        let urgency =
            "LOW";


        let responseMode =
            "MONITOR";


        let rationale =
            "Environmental conditions remain within the simulated monitoring range.";


        /* ----------------------------------------------------
           LOW
        ---------------------------------------------------- */

        if (
            risk === "LOW"
        ) {

            primaryRecommendation =
                "CONTINUE NORMAL MONITORING";

            urgency =
                "LOW";

            responseMode =
                "MONITOR";

            rationale =
                "Simulated environmental stress remains below the preventive-action threshold.";


            recommendations.push(
                "Continue normal operator monitoring."
            );


            recommendations.push(
                "Verify simulated vessel position and environmental trend remain stable."
            );


            recommendations.push(
                "No simulated change of control mode is presently indicated."
            );

        }


        /* ----------------------------------------------------
           MEDIUM
        ---------------------------------------------------- */

        if (
            risk === "MEDIUM"
        ) {

            primaryRecommendation =
                "INCREASE OPERATOR VIGILANCE";

            urgency =
                "MEDIUM";

            responseMode =
                "PREVENTIVE";


            rationale =
                "Environmental stress is elevated and warrants preventive operator assessment.";


            recommendations.push(
                "Increase monitoring of simulated vessel position, heading and environmental trend."
            );


            recommendations.push(
                "Review whether manual / joystick control should be prepared or considered under approved procedures."
            );


            recommendations.push(
                "Review simulated heading relative to wind, current and wave conditions."
            );


            recommendations.push(
                "Assess simulated available sea room and contingency options."
            );

        }


        /* ----------------------------------------------------
           HIGH
        ---------------------------------------------------- */

        if (
            risk === "HIGH"
        ) {

            primaryRecommendation =
                "HUMAN OPERATOR REVIEW REQUIRED";

            urgency =
                "HIGH";

            responseMode =
                "SAFETY REVIEW";


            rationale =
                "High simulated environmental stress indicates that continued simulated operation requires explicit human assessment.";


            recommendations.push(
                "Consider an appropriate manual / joystick operating mode if permitted by approved vessel procedures."
            );


            recommendations.push(
                "Assess whether a heading adjustment could reduce simulated environmental loading."
            );


            recommendations.push(
                "Assess whether relocation to safer simulated sea room would improve the safety margin."
            );


            recommendations.push(
                "Review simulated position, drift trend, thruster availability and surrounding hazards."
            );


            recommendations.push(
                "Prepare an appropriate contingency response in accordance with approved operating procedures."
            );

        }


        /* ----------------------------------------------------
           CRITICAL
        ---------------------------------------------------- */

        if (
            risk === "CRITICAL"
        ) {

            primaryRecommendation =
                "IMMEDIATE HUMAN SAFETY REVIEW";

            urgency =
                "CRITICAL";

            responseMode =
                "EMERGENCY REVIEW";


            rationale =
                "Critical simulated environmental stress has exceeded the resilience threshold.";


            recommendations.push(
                "Immediately assess the simulated vessel condition and environmental trend."
            );


            recommendations.push(
                "Consider the safest available simulated control mode in accordance with approved vessel procedures."
            );


            recommendations.push(
                "Assess whether heading alteration could reduce simulated environmental loading."
            );


            recommendations.push(
                "Assess whether relocation to safer simulated sea room is appropriate."
            );


            recommendations.push(
                "Review emergency and contingency procedures."
            );


            recommendations.push(
                "Maintain direct human authority and do not use this simulation as an operational control system."
            );

        }


        /* ----------------------------------------------------
           ENVIRONMENT-SPECIFIC ADVISORIES
        ---------------------------------------------------- */

        if (
            inputs.wind >= 70
        ) {

            recommendations.push(
                "WIND ADVISORY: Review simulated heading relative to prevailing and gusting wind."
            );

        }


        if (
            inputs.current >= 70
        ) {

            recommendations.push(
                "CURRENT ADVISORY: Review simulated drift direction, sea room and positional margin."
            );

        }


        if (
            inputs.wave >= 70
        ) {

            recommendations.push(
                "WAVE ADVISORY: Review simulated sea-state trend, heading and operating limitations."
            );

        }


        if (
            inputs.tidal >= 70
        ) {

            recommendations.push(
                "TIDAL ADVISORY: Review simulated tidal/current interaction and expected environmental change."
            );

        }


        return {

            category:
                "SIMULATED OPERATOR DECISION SUPPORT",

            primaryRecommendation:
                primaryRecommendation,

            urgency:
                urgency,

            responseMode:
                responseMode,

            rationale:
                rationale,

            recommendedActions:
                recommendations,

            humanAuthority:
                "FINAL",

            autonomousCommand:
                false,

            operationalAuthority:
                false

        };

    }


    /* ========================================================
       SIMULATED UPDATED STATE
    ======================================================== */

    function calculateUpdatedState(
        environmentalStress,
        stabilizer
    ) {

        const positionError =
            environmentalStress *
            0.004;


        const simulatedCommand =
            stabilizer.finalOutput;


        const stabilityIndex =
            clamp(

                100 -
                environmentalStress,

                0,
                100

            );


        return {

            positionError:
                positionError,

            simulatedCommand:
                simulatedCommand,

            environmentalStress:
                environmentalStress,

            stabilityIndex:
                stabilityIndex

        };

    }


    /* ========================================================
       AUDIT
    ======================================================== */

    function createAuditRecord() {

        return {

            timestamp:
                new Date()
                    .toISOString(),

            engineVersion:
                VERSION,

            mode:
                MODE,

            engineName:
                ENGINE_NAME

        };

    }


    /* ========================================================
       MAIN ENGINE
    ======================================================== */

    function run(
        inputs
    ) {

        const normalised =
            normaliseInputs(
                inputs
            );


        const environmentalStress =
            calculateEnvironmentalStress(
                normalised
            );


        const risk =
            classifyRisk(
                environmentalStress
            );


        const primary =
            calculatePrimaryLayer(
                environmentalStress
            );


        const secondary =
            calculateSecondaryLayer(
                environmentalStress,
                risk
            );


        const human =
            calculateHumanAuthority(
                risk
            );


        const stabilizer =
            calculateStabilizer(
                primary,
                secondary,
                risk
            );


        const recommendedAction =
            calculateRecommendedAction(
                normalised,
                environmentalStress,
                risk
            );


        const updatedState =
            calculateUpdatedState(
                environmentalStress,
                stabilizer
            );


        let systemStatus =
            "SYSTEM STABLE";


        if (
            risk === "MEDIUM"
        ) {

            systemStatus =
                "PREVENTIVE MONITORING";

        }


        if (
            risk === "HIGH"
        ) {

            systemStatus =
                "HUMAN REVIEW REQUIRED";

        }


        if (
            risk === "CRITICAL"
        ) {

            systemStatus =
                "CRITICAL — HUMAN REVIEW REQUIRED";

        }


        return {

            engineName:
                ENGINE_NAME,

            version:
                VERSION,

            mode:
                MODE,

            systemStatus:
                systemStatus,

            vessel:
                VESSEL,

            environment: {

                wind:
                    normalised.wind,

                current:
                    normalised.current,

                wave:
                    normalised.wave,

                tidal:
                    normalised.tidal,

                environmentalStress:
                    environmentalStress

            },

            risk:
                risk,

            primary:
                primary,

            secondary:
                secondary,

            stabilizer:
                stabilizer,

            human:
                human,

            recommendedAction:
                recommendedAction,

            updatedState:
                updatedState,

            audit:
                createAuditRecord()

        };

    }


    /* ========================================================
       ENGINE VALIDATION
    ======================================================== */

    function validate() {

        try {

            const test =
                run({

                    wind:
                        0,

                    current:
                        0,

                    wave:
                        0,

                    tidal:
                        0

                });


            return (

                test &&

                test.engineName ===
                    ENGINE_NAME &&

                test.version ===
                    VERSION &&

                test.vessel &&

                test.environment &&

                test.primary &&

                test.secondary &&

                test.stabilizer &&

                test.human &&

                test.recommendedAction &&

                test.recommendedAction
                    .humanAuthority ===
                    "FINAL" &&

                test.recommendedAction
                    .autonomousCommand ===
                    false &&

                test.recommendedAction
                    .operationalAuthority ===
                    false &&

                test.stabilizer
                    .operationalCommand ===
                    false &&

                test.audit

            );

        } catch (
            error
        ) {

            console.error(
                "DP Engine validation failed:",
                error
            );

            return false;

        }

    }


    /* ========================================================
       PUBLIC ENGINE API
    ======================================================== */

    window.DPSimulationEngine = {

        name:
            ENGINE_NAME,

        version:
            VERSION,

        run:
            run,

        validate:
            validate

    };


    /* ========================================================
       ENGINE STATUS BRIDGE
    ======================================================== */

    window.verifyDPEngine =
        function () {

            const valid =
                DPSimulationEngine
                    .validate();


            const status =
                document.getElementById(
                    "engineStatus"
                );


            if (status) {

                status.textContent =
                    valid
                        ? "ONLINE / VALIDATED"
                        : "VALIDATION FAILED";

            }


            return valid;

        };


})();


/* ============================================================
   SECTION 3
   COCKPIT WIRING
============================================================ */

(function () {

    "use strict";


    /* ========================================================
       DOM HELPERS
    ======================================================== */

    function el(id) {

        return document.getElementById(
            id
        );

    }


    function setText(
        id,
        value
    ) {

        const node =
            el(id);


        if (node) {

            node.textContent =
                value === undefined ||
                value === null
                    ? ""
                    : String(value);

        }

    }


    /* ========================================================
       READ INPUTS
    ======================================================== */

    function readDPInputs() {

        return {

            wind:
                Number(
                    el("wind")?.value ||
                    0
                ),

            current:
                Number(
                    el("current")?.value ||
                    0
                ),

            wave:
                Number(
                    el("wave")?.value ||
                    0
                ),

            tidal:
                Number(
                    el("tidal")?.value ||
                    0
                )

        };

    }


    /* ========================================================
       OPERATOR LOG
    ======================================================== */

    function appendOperatorLog(
        message
    ) {

        const log =
            el(
                "operatorEventLog"
            );


        if (!log) {
            return;
        }


        const timestamp =
            new Date()
                .toLocaleTimeString();


        const line =
            "[" +
            timestamp +
            "] " +
            message;


        if (
            log.tagName ===
            "TEXTAREA"
        ) {

            log.value +=
                (
                    log.value
                        ? "\n"
                        : ""
                ) +
                line;


            log.scrollTop =
                log.scrollHeight;


            return;

        }


        const entry =
            document.createElement(
                "div"
            );


        entry.textContent =
            line;


        log.appendChild(
            entry
        );

    }


    /* ========================================================
       ENVIRONMENT DISPLAY
    ======================================================== */

    function updateEnvironment(
        result
    ) {

        const environment =
            result.environment;


        setText(
            "windValue",
            environment.wind
        );


        setText(
            "currentValue",
            environment.current
        );


        setText(
            "waveValue",
            environment.wave
        );


        setText(
            "tidalValue",
            environment.tidal
        );


        setText(
            "environmentStress",
            environment
                .environmentalStress
                .toFixed(2)
        );

    }


    /* ========================================================
       SYSTEM STATUS
    ======================================================== */

    function updateSystem(
        result
    ) {

        setText(
            "systemStatus",
            result.systemStatus
        );


        setText(
            "riskLevel",
            result.risk
        );


        setText(
            "environmentStatus",
            "ACTIVE / SIMULATED"
        );


        setText(
            "primaryStatus",
            result.primary.mode
        );


        setText(
            "secondaryStatus",
            result.secondary.mode
        );


        setText(
            "stabilizerStatus",
            result.stabilizer.mode
        );


        setText(
            "humanAuthority",
            result.human.status
        );

    }


    /* ========================================================
       RESILIENCE ALERT
    ======================================================== */

    function updateAlert(
        result
    ) {

        let level =
            "NORMAL";

        let change =
            "STABLE";

        let state =
            "MONITORING";

        let attention =
            "NOT REQUIRED";


        if (
            result.risk ===
            "MEDIUM"
        ) {

            level =
                "ADVISORY";

            change =
                "ELEVATED";

            state =
                "PREVENTIVE MONITORING";

            attention =
                "OPERATOR ATTENTION";

        }


        if (
            result.risk ===
            "HIGH"
        ) {

            level =
                "HIGH";

            change =
                "SIGNIFICANT";

            state =
                "HUMAN REVIEW";

            attention =
                "REVIEW REQUIRED";

        }


        if (
            result.risk ===
            "CRITICAL"
        ) {

            level =
                "CRITICAL";

            change =
                "CRITICAL";

            state =
                "CRITICAL HUMAN REVIEW";

            attention =
                "IMMEDIATE HUMAN REVIEW";

        }


        setText(
            "resilienceAlertLevel",
            level
        );


        setText(
            "environmentalChange",
            change
        );


        setText(
            "resilienceState",
            state
        );


        setText(
            "operatorAttention",
            attention
        );

    }


    /* ========================================================
       STABILIZER
    ======================================================== */

    function updateStabilizer(
        result
    ) {

        const stabilizer =
            result.stabilizer;


        setText(
            "stabilizerMode",
            stabilizer.mode
        );


        setText(
            "stabilizerSource",
            stabilizer.source
        );


        setText(
            "stabilizerOutput",
            stabilizer.finalOutput
                .toFixed(2)
        );


        setText(
            "stabilizerState",
            stabilizer.status
        );

    }


    /* ========================================================
       RECOMMENDED ACTION
    ======================================================== */

    function updateRecommendation(
        result
    ) {

        const action =
            result.recommendedAction;


        setText(
            "recommendedAction",
            action.primaryRecommendation
        );


        setText(
            "actionUrgency",
            action.urgency
        );


        setText(
            "responseMode",
            action.responseMode
        );


        setText(
            "actionRationale",
            action.rationale
        );


        const list =
            el(
                "recommendedActions"
            );


        if (!list) {
            return;
        }


        list.innerHTML =
            "";


        action.recommendedActions
            .forEach(
                function (
                    recommendation
                ) {

                    const item =
                        document.createElement(
                            "li"
                        );


                    item.textContent =
                        recommendation;


                    list.appendChild(
                        item
                    );

                }
            );

    }


    /* ========================================================
       SIMULATION RESULT
    ======================================================== */

    function updateSimulation(
        result
    ) {

        const state =
            result.updatedState;


        setText(
            "dpSimulationStatus",
            "SIMULATION COMPLETE"
        );


        setText(
            "positionError",
            state.positionError
                .toFixed(3)
        );


        setText(
            "simulatedCommand",
            state.simulatedCommand
                .toFixed(2)
        );


        setText(
            "stabilityIndex",
            state.stabilityIndex
                .toFixed(2)
        );


        setText(
            "dpSimulationAssessment",

            "Simulation processed through Environmental → Primary AI → Secondary AI → Stabilizer → Human-in-the-Loop decision-support layers."

        );

    }


    /* ========================================================
       PIPELINE
    ======================================================== */

    function updatePipeline(
        result
    ) {

        setText(
            "pipelineEnvironment",
            "OBSERVED"
        );


        setText(
            "pipelineVerify",
            "VERIFIED"
        );


        setText(
            "pipelineAssess",
            result.risk
        );


        setText(
            "pipelineDecide",
            result
                .recommendedAction
                .primaryRecommendation
        );


        setText(
            "pipelineAct",
            "HUMAN REVIEW / SIMULATED"
        );


        setText(
            "pipelineUpdate",
            "STATE UPDATED"
        );

    }


    /* ========================================================
       AUDIT
    ======================================================== */

    function updateAudit(
        result
    ) {

        const audit =
            result.audit;


        const text = [

            "SYSTEM EVENT LOG",

            "------------------------------------------------------------",

            "ENGINE: " +
                result.engineName,

            "VERSION: " +
                result.version,

            "MODE: " +
                result.mode,

            "ENVIRONMENTAL STRESS: " +
                result.environment
                    .environmentalStress
                    .toFixed(2),

            "RISK: " +
                result.risk,

            "PRIMARY AI: " +
                result.primary.mode,

            "SECONDARY AI: " +
                result.secondary.mode,

            "STABILIZER: " +
                result.stabilizer.mode,

            "HUMAN AUTHORITY: FINAL",

            "AUTONOMOUS COMMAND: FALSE",

            "OPERATIONAL AUTHORITY: FALSE",

            "TIMESTAMP: " +
                audit.timestamp

        ].join(
            "\n"
        );


        setText(
            "auditLog",
            text
        );

    }


    /* ========================================================
       COMPLETE RENDER
    ======================================================== */

    function renderResult(
        result
    ) {

        updateEnvironment(
            result
        );

        updateSystem(
            result
        );

        updateAlert(
            result
        );

        updateStabilizer(
            result
        );

        updateRecommendation(
            result
        );

        updateSimulation(
            result
        );

        updatePipeline(
            result
        );

        updateAudit(
            result
        );

    }


    /* ========================================================
       MAIN SIMULATION FUNCTION
    ======================================================== */

    window.runSimulation =
        function () {

            try {

                if (
                    !window.DPSimulationEngine
                ) {

                    setText(
                        "dpSimulationStatus",
                        "ENGINE NOT CONNECTED"
                    );


                    appendOperatorLog(
                        "ERROR — DP simulation engine unavailable."
                    );


                    return null;

                }


                const inputs =
                    readDPInputs();


                appendOperatorLog(

                    "SIMULATION START — " +

                    "Wind=" +
                    inputs.wind +

                    " Current=" +
                    inputs.current +

                    " Wave=" +
                    inputs.wave +

                    " Tidal=" +
                    inputs.tidal

                );


                const result =
                    window.DPSimulationEngine
                        .run(
                            inputs
                        );


                renderResult(
                    result
                );


                appendOperatorLog(

                    "SIMULATION COMPLETE — " +

                    "Stress=" +
                    result.environment
                        .environmentalStress
                        .toFixed(2) +

                    " Risk=" +
                    result.risk

                );


                appendOperatorLog(

                    "RECOMMENDATION — " +

                    result
                        .recommendedAction
                        .primaryRecommendation

                );


                return result;


            } catch (
                error
            ) {

                console.error(
                    "DP simulation error:",
                    error
                );


                setText(
                    "dpSimulationStatus",
                    "SIMULATION ERROR"
                );


                appendOperatorLog(
                    "ERROR — DP simulation execution failed."
                );


                return null;

            }

        };


    /* ========================================================
       RESET
       
       RESET returns UI to standby.
       
       NORMAL is a scenario.
       RESET is NOT a scenario.
    ======================================================== */

    window.resetDPCockpit =
        function () {

            const defaults = {

                wind:
                    20,

                current:
                    15,

                wave:
                    20,

                tidal:
                    15

            };


            Object.keys(
                defaults
            ).forEach(
                function (
                    key
                ) {

                    const input =
                        el(key);


                    if (input) {

                        input.value =
                            defaults[key];

                    }

                }
            );


            setText(
                "dpSimulationStatus",
                "SYSTEM READY"
            );


            setText(
                "systemStatus",
                "SYSTEM READY"
            );


            setText(
                "riskLevel",
                "NORMAL"
            );


            setText(
                "environmentStatus",
                "STANDBY"
            );


            setText(
                "primaryStatus",
                "STANDBY"
            );


            setText(
                "secondaryStatus",
                "STANDBY"
            );


            setText(
                "stabilizerStatus",
                "STANDBY"
            );


            setText(
                "humanAuthority",
                "AVAILABLE"
            );


            setText(
                "resilienceAlertLevel",
                "NORMAL"
            );


            setText(
                "environmentalChange",
                "STABLE"
            );


            setText(
                "resilienceState",
                "MONITORING"
            );


            setText(
                "operatorAttention",
                "NOT REQUIRED"
            );


            setText(
                "stabilizerMode",
                "STANDBY"
            );


            setText(
                "stabilizerSource",
                "STANDBY"
            );


            setText(
                "stabilizerOutput",
                "0"
            );


            setText(
                "stabilizerState",
                "STANDBY"
            );


            setText(
                "recommendedAction",
                "NO SIMULATION RUN"
            );


            setText(
                "actionUrgency",
                "LOW"
            );


            setText(
                "responseMode",
                "MONITOR"
            );


            setText(
                "actionRationale",
                "Waiting for simulated environmental input."
            );


            setText(
                "positionError",
                "0"
            );


            setText(
                "simulatedCommand",
                "0"
            );


            setText(
                "stabilityIndex",
                "100"
            );


            const actions =
                el(
                    "recommendedActions"
                );


            if (actions) {

                actions.innerHTML =
                    "";

            }


            appendOperatorLog(
                "SYSTEM RESET — returned to standby baseline."
            );

        };


    /* ========================================================
       SCENARIO BUTTON CONNECTION
    ======================================================== */

    function connectScenarioButtons() {

        const scenarios = {

            normalScenario:
                "NORMAL",

            moderateWeatherScenario:
                "MODERATE_WEATHER",

            heavyWeatherScenario:
                "HEAVY_WEATHER",

            criticalScenario:
                "CRITICAL_WEATHER",

            currentSurgeScenario:
                "CURRENT_SURGE",

            heavySeaStateScenario:
                "HEAVY_SEA_STATE",

            windGustScenario:
                "WIND_GUST_EVENT",

            combinedDisturbanceScenario:
                "COMBINED_DISTURBANCE"

        };


        Object.keys(
            scenarios
        ).forEach(
            function (
                functionName
            ) {

                window[
                    functionName
                ] =
                    function () {

                        const scenarioName =
                            scenarios[
                                functionName
                            ];


                        const applied =
                            applyDPScenario(
                                scenarioName
                            );


                        if (!applied) {
                            return null;
                        }


                        appendOperatorLog(

                            "SCENARIO SELECTED — " +
                            scenarioName

                        );


                        return window.runSimulation();

                    };

            }
        );


        /* RANDOM */

        window.randomScenario =
            randomScenario;

    }


    /* ========================================================
       BUTTON CONNECTION
    ======================================================== */

    function connectControls() {

        const runButton =
            el(
                "runSimulation"
            );


        if (
            runButton
        ) {

            runButton.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.preventDefault();

                    window.runSimulation();

                }
            );

        }


        const resetButton =
            el(
                "resetSimulation"
            );


        if (
            resetButton
        ) {

            resetButton.addEventListener(
                "click",
                function (
                    event
                ) {

                    event.preventDefault();

                    window.resetDPCockpit();

                }
            );

        }

    }


    /* ========================================================
       ENGINE CONNECTION VALIDATION
    ======================================================== */

    function validateConnection() {

        if (
            !window.DPSimulationEngine ||
            typeof
            window.DPSimulationEngine
                .validate !==
                "function"
        ) {

            setText(
                "engineStatus",
                "ENGINE NOT CONNECTED"
            );


            appendOperatorLog(
                "DP ENGINE NOT CONNECTED."
            );


            return false;

        }


        const valid =
            window.DPSimulationEngine
                .validate();


        setText(
            "engineStatus",
            valid
                ? "ONLINE / VALIDATED"
                : "VALIDATION FAILED"
        );


        appendOperatorLog(

            valid
                ? "DP ENGINE CONNECTED — ONLINE / VALIDATED."
                : "DP ENGINE VALIDATION FAILED."

        );


        return valid;

    }


    /* ========================================================
       STARTUP
    ======================================================== */

    function initialiseCockpit() {

        connectScenarioButtons();

        connectControls();

        validateConnection();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialiseCockpit
        );

    } else {

        initialiseCockpit();

    }


})();