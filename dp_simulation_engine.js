/*
 * ============================================================
 * SEXTANT PROTOCOL
 * DP RESILIENCE SIMULATION ENGINE
 * ============================================================
 *
 * File:
 *     dp_simulation_engine.js
 *
 * Version:
 *     1.1.1
 *
 * Purpose:
 *     Deterministic browser-based simulation engine for the
 *     Sextant DP Resilience Research Prototype.
 *
 * Architecture:
 *
 *     ENVIRONMENT
 *          ↓
 *     PRIMARY AI
 *          ↓
 *     SECONDARY AI
 *          ↓
 *     STABILIZER
 *          ↓
 *     HUMAN-IN-THE-LOOP
 *          ↓
 *     SIMULATED DP ACTION
 *          ↓
 *     UPDATED STATE
 *          ↓
 *     AUDIT RECORD
 *
 * Research / simulation use only.
 *
 * SAFETY BOUNDARY:
 * This engine is NOT certified marine control software.
 *
 * It must NEVER be connected to:
 *     - operational DP systems
 *     - propulsion systems
 *     - navigation systems
 *     - vessel sensors
 *     - safety systems
 *
 * All vessel behaviour, environmental conditions,
 * decisions and outputs are simulated.
 *
 * ============================================================
 */


/* ============================================================
   ENGINE CONSTANTS
============================================================ */

const DP_SIMULATION_ENGINE_VERSION = "1.1.1";

const DP_SIMULATION_ENGINE_NAME =
    "Sextant Protocol DP Resilience Simulation Engine";

const DP_SIMULATION_MODE =
    "SIMULATION_ONLY";

const DP_NOMINAL_THRUST = 100;


/* ============================================================
   RISK THRESHOLDS
============================================================ */

const DP_THRESHOLDS = {

    LOW: 40,

    MEDIUM: 70,

    HIGH: 85
};


/* ============================================================
   VESSEL SIMULATION PROFILE
============================================================ */

const DP_DEFAULT_VESSEL = {

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
            DP_NOMINAL_THRUST
    }
};


/* ============================================================
   UTILITY
============================================================ */

/*
 * Clamp a numeric value into a defined range.
 */

function clampDP(
    value,
    minimum = 0,
    maximum = 100
) {

    const numericValue =
        Number(value);

    if (!Number.isFinite(numericValue)) {

        return minimum;
    }

    return Math.max(
        minimum,
        Math.min(
            maximum,
            numericValue
        )
    );
}


/*
 * Round numeric simulation output.
 */

function roundDP(
    value,
    decimals = 4
) {

    const factor =
        Math.pow(
            10,
            decimals
        );

    return (
        Math.round(
            Number(value) * factor
        ) / factor
    );
}


/* ============================================================
   INPUT VALIDATION
============================================================ */

function validateDPInputs(
    inputs = {}
) {

    return {

        wind:
            clampDP(
                inputs.wind
            ),

        current:
            clampDP(
                inputs.current
            ),

        wave:
            clampDP(
                inputs.wave
            ),

        tidal:
            clampDP(
                inputs.tidal !== undefined
                    ? inputs.tidal
                    : inputs.tidal_effect
            )
    };
}


/* ============================================================
   ENVIRONMENT MODEL
============================================================ */

/*
 * Environmental weighting:
 *
 * Wind      30%
 * Current   25%
 * Wave      30%
 * Tidal     15%
 *
 * Total     100%
 *
 * This is a research abstraction only.
 */

function calculateDPEnvironmentalStress(
    wind,
    current,
    wave,
    tidal
) {

    const normalizedWind =
        clampDP(wind);

    const normalizedCurrent =
        clampDP(current);

    const normalizedWave =
        clampDP(wave);

    const normalizedTidal =
        clampDP(tidal);

    const environmentalStress =

        normalizedWind * 0.30 +

        normalizedCurrent * 0.25 +

        normalizedWave * 0.30 +

        normalizedTidal * 0.15;

    return {

        wind:
            normalizedWind,

        current:
            normalizedCurrent,

        wave:
            normalizedWave,

        tidal:
            normalizedTidal,

        environmentalStress:
            roundDP(
                environmentalStress
            )
    };
}


/* ============================================================
   RISK CLASSIFICATION
============================================================ */

function classifyDPRisk(
    environmentalStress
) {

    const stress =
        clampDP(
            environmentalStress
        );

    if (
        stress <
        DP_THRESHOLDS.LOW
    ) {

        return "LOW";
    }

    if (
        stress <
        DP_THRESHOLDS.MEDIUM
    ) {

        return "MEDIUM";
    }

    if (
        stress <
        DP_THRESHOLDS.HIGH
    ) {

        return "HIGH";
    }

    return "CRITICAL";
}


/* ============================================================
   PRIMARY AI
============================================================ */

function dpPrimaryAI(
    nominalThrust,
    environmentalStress
) {

    const thrust =
        Number.isFinite(
            Number(nominalThrust)
        )
            ? Number(nominalThrust)
            : DP_NOMINAL_THRUST;

    const environment =
        clampDP(
            environmentalStress
        );


    /*
     * Deterministic research disturbance model.
     *
     * This does NOT represent a certified
     * marine DP control algorithm.
     */

    const disturbance =
        environment;


    const thrustOutput =
        Math.max(
            0,
            thrust - disturbance
        );


    let mode =
        "PRIMARY_AI";

    let status =
        "NORMAL_CONTROL";


    if (
        environment >=
        DP_THRESHOLDS.MEDIUM
    ) {

        mode =
            "PRIMARY_AI_DEGRADED";

        status =
            "DEGRADED_CONTROL";
    }


    if (
        environment >=
        DP_THRESHOLDS.HIGH
    ) {

        mode =
            "PRIMARY_AI_CRITICAL";

        status =
            "PRIMARY_LIMIT_REACHED";
    }


    return {

        layer:
            "PRIMARY_AI",

        mode:
            mode,

        thrustOutput:
            roundDP(
                thrustOutput
            ),

        status:
            status
    };
}


/* ============================================================
   SECONDARY AI
============================================================ */

function dpSecondaryAI(
    environmentalStress
) {

    const environment =
        clampDP(
            environmentalStress
        );

    const safetyThreshold =
        DP_THRESHOLDS.MEDIUM;

    const safetyMode =
        environment >=
        safetyThreshold;


    let thrustOutput;

    let status;

    let mode;


    /*
     * Critical simulated condition.
     */

    if (
        environment >=
        DP_THRESHOLDS.HIGH
    ) {

        mode =
            "EMERGENCY_SAFETY_LAYER";

        thrustOutput =
            Math.max(
                0,
                40 - environment
            );

        status =
            "CRITICAL_SAFETY_RESPONSE";
    }


    /*
     * High / degraded condition.
     */

    else if (
        safetyMode
    ) {

        mode =
            "SECONDARY_SAFETY_LAYER";

        thrustOutput =
            Math.max(
                0,
                40 - environment
            );

        status =
            "SAFETY_OVERRIDE_ACTIVE";
    }


    /*
     * Normal monitoring.
     */

    else {

        mode =
            "SECONDARY_AI_MONITORING";

        thrustOutput =
            50;

        status =
            "MONITORING";
    }


    return {

        layer:
            "SECONDARY_AI",

        mode:
            mode,

        thrustOutput:
            roundDP(
                thrustOutput
            ),

        status:
            status,

        safetyMode:
            safetyMode
    };
}


/* ============================================================
   HUMAN-IN-THE-LOOP
============================================================ */

/*
 * Human authority is based on actual risk classification.
 *
 * Critical environmental stress:
 *     HUMAN OVERRIDE REQUIRED
 *
 * The AI does not replace the human authority layer.
 */

function dpHumanDecision(
    environmentalStress,
    riskLevel
) {

    const environment =
        clampDP(
            environmentalStress
        );


    let risk =
        riskLevel;


    /*
     * Ensure a valid risk classification exists.
     */

    if (
        risk !== "LOW" &&
        risk !== "MEDIUM" &&
        risk !== "HIGH" &&
        risk !== "CRITICAL"
    ) {

        risk =
            classifyDPRisk(
                environment
            );
    }


    const criticalCondition =
        environment >=
        DP_THRESHOLDS.HIGH;


    const override =
        criticalCondition ||
        risk === "CRITICAL";


    return {

        layer:
            "HUMAN_IN_LOOP",

        mode:
            "HUMAN_AUTHORITY",

        risk:
            risk,

        override:
            override,

        status:
            override
                ? "HUMAN_OVERRIDE_REQUIRED"
                : "MONITORING / AVAILABLE"
    };
}


/* ============================================================
   STABILIZER / ARBITRATION
============================================================ */

/*
 * Human authority takes precedence within
 * the simulation governance architecture.
 */

function dpStabilizer(
    primary,
    secondary,
    humanOverride
) {

    if (
        humanOverride
    ) {

        return {

            layer:
                "STABILIZER",

            mode:
                "SAFE_STATE_LOCK",

            finalOutput:
                roundDP(
                    secondary.thrustOutput
                ),

            source:
                "SECONDARY_AI_OVERRIDE",

            status:
                "SAFE_STATE_LOCK"
        };
    }


    /*
     * Normal simulated arbitration:
     *
     * Primary   70%
     * Secondary 30%
     */

    const blendedOutput =

        primary.thrustOutput * 0.70 +

        secondary.thrustOutput * 0.30;


    return {

        layer:
            "STABILIZER",

        mode:
            "STABILIZED",

        finalOutput:
            roundDP(
                blendedOutput
            ),

        source:
            "BLENDED_CONTROL",

        status:
            "NORMAL_STABILITY"
    };
}


/* ============================================================
   SIMULATED STATE UPDATE
============================================================ */

function updateDPSimulationState(
    previousState = {},
    finalOutput,
    environmentalStress
) {

    const previousPosition =

        Number.isFinite(
            Number(
                previousState.positionError
            )
        )
            ? Number(
                previousState.positionError
            )
            : 0;


    const stress =
        clampDP(
            environmentalStress
        );


    const command =
        Math.max(
            0,
            Number(finalOutput) || 0
        );


    /*
     * Simplified research state model.
     *
     * This does NOT represent real vessel
     * hydrodynamics or DP control behaviour.
     */

    const simulatedPositionError =

        Math.max(
            0,

            previousPosition +

            stress * 0.01 -

            command * 0.002
        );


    const stabilityIndex =

        Math.max(
            0,

            Math.min(
                100,

                100 -
                stress * 0.60 +
                command * 0.10
            )
        );


    return {

        positionError:
            roundDP(
                simulatedPositionError
            ),

        simulatedCommand:
            roundDP(
                command
            ),

        environmentalStress:
            roundDP(
                stress
            ),

        stabilityIndex:
            roundDP(
                stabilityIndex
            )
    };
}


/* ============================================================
   SYSTEM STATUS
============================================================ */

function determineDPSystemStatus(
    risk,
    humanOverride
) {

    if (
        humanOverride
    ) {

        return "HUMAN OVERRIDE REQUIRED";
    }


    if (
        risk === "CRITICAL"
    ) {

        return "CRITICAL / HUMAN REVIEW";
    }


    if (
        risk === "HIGH"
    ) {

        return "DEGRADED / HIGH RISK";
    }


    if (
        risk === "MEDIUM"
    ) {

        return "PREVENTIVE MONITORING";
    }


    return "SIMULATION STABLE";
}


/* ============================================================
   GOLDEN RULE / GOVERNANCE PIPELINE
============================================================ */

function getDPPipeline() {

    return [

        "OBSERVE",

        "VERIFY",

        "ASSESS",

        "DECIDE",

        "ACT",

        "UPDATE"
    ];
}


/* ============================================================
   AUDIT RECORD
============================================================ */

function createDPAuditRecord(
    inputs,
    environment,
    risk,
    primary,
    secondary,
    human,
    stabilizer,
    updatedState,
    systemStatus
) {

    return {

        engine:
            DP_SIMULATION_ENGINE_NAME,

        engineVersion:
            DP_SIMULATION_ENGINE_VERSION,

        mode:
            DP_SIMULATION_MODE,

        timestamp:
            new Date().toISOString(),

        pipeline:
            getDPPipeline(),

        inputs:
            inputs,

        environment:
            environment,

        environmentalStress:
            environment.environmentalStress,

        risk:
            risk,

        primaryAI:
            primary,

        secondaryAI:
            secondary,

        humanAuthority:
            human,

        stabilizer:
            stabilizer,

        updatedState:
            updatedState,

        systemStatus:
            systemStatus,

        safetyBoundary:
            "SIMULATION ONLY — NOT FOR OPERATIONAL DP CONTROL"
    };
}


/* ============================================================
   COMPLETE SIMULATION CYCLE
============================================================ */

function runDPSimulation(
    inputs = {},
    previousState = {}
) {

    /*
     * INPUT VALIDATION
     */

    const verifiedInputs =
        validateDPInputs(
            inputs
        );


    /*
     * OBSERVE
     */

    const environment =
        calculateDPEnvironmentalStress(
            verifiedInputs.wind,
            verifiedInputs.current,
            verifiedInputs.wave,
            verifiedInputs.tidal
        );


    const environmentalStress =
        environment.environmentalStress;


    /*
     * ASSESS
     */

    const risk =
        classifyDPRisk(
            environmentalStress
        );


    /*
     * PRIMARY AI
     */

    const primary =
        dpPrimaryAI(
            DP_NOMINAL_THRUST,
            environmentalStress
        );


    /*
     * SECONDARY AI
     */

    const secondary =
        dpSecondaryAI(
            environmentalStress
        );


    /*
     * HUMAN AUTHORITY
     */

    const human =
        dpHumanDecision(
            environmentalStress,
            risk
        );


    /*
     * DECIDE / STABILIZE
     */

    const stabilizer =
        dpStabilizer(
            primary,
            secondary,
            human.override
        );


    /*
     * ACT / UPDATE
     */

    const updatedState =
        updateDPSimulationState(
            previousState,
            stabilizer.finalOutput,
            environmentalStress
        );


    /*
     * SYSTEM STATUS
     */

    const systemStatus =
        determineDPSystemStatus(
            risk,
            human.override
        );


    /*
     * AUDIT
     */

    const audit =
        createDPAuditRecord(
            verifiedInputs,
            environment,
            risk,
            primary,
            secondary,
            human,
            stabilizer,
            updatedState,
            systemStatus
        );


    /*
     * COMPLETE RESULT
     */

    return {

        engine:
            "DP_SIMULATION_ENGINE",

        engineName:
            DP_SIMULATION_ENGINE_NAME,

        version:
            DP_SIMULATION_ENGINE_VERSION,

        mode:
            DP_SIMULATION_MODE,

        vessel:
            DP_DEFAULT_VESSEL,

        inputs:
            verifiedInputs,

        environment:
            environment,

        environmentalStress:
            environmentalStress,

        risk:
            risk,

        primary:
            primary,

        secondary:
            secondary,

        human:
            human,

        stabilizer:
            stabilizer,

        updatedState:
            updatedState,

        systemStatus:
            systemStatus,

        pipeline:
            getDPPipeline(),

        audit:
            audit
    };
}


/* ============================================================
   SCENARIO GENERATORS
============================================================ */

function dpScenarioNormal() {

    return {

        name:
            "NORMAL",

        wind:
            20,

        current:
            15,

        wave:
            20,

        tidal:
            15
    };
}


function dpScenarioHeavyWeather() {

    return {

        name:
            "HEAVY_WEATHER",

        wind:
            70,

        current:
            65,

        wave:
            75,

        tidal:
            60
    };
}


function dpScenarioCritical() {

    return {

        name:
            "CRITICAL",

        wind:
            95,

        current:
            90,

        wave:
            95,

        tidal:
            85
    };
}


function dpScenarioRandom() {

    return {

        name:
            "RANDOM_DISTURBANCE",

        wind:
            Math.floor(
                Math.random() * 101
            ),

        current:
            Math.floor(
                Math.random() * 101
            ),

        wave:
            Math.floor(
                Math.random() * 101
            ),

        tidal:
            Math.floor(
                Math.random() * 101
            )
    };
}


/* ============================================================
   SCENARIO EXECUTION
============================================================ */

function runDPScenario(
    scenario,
    previousState = {}
) {

    if (
        !scenario
    ) {

        throw new Error(
            "DP scenario is required."
        );
    }


    return runDPSimulation(
        scenario,
        previousState
    );
}


/* ============================================================
   ENGINE SELF-TEST
============================================================ */

/*
 * Deterministic validation expectations:
 *
 * NORMAL:
 *     20 / 15 / 20 / 15
 *     Environmental Stress = 17.75
 *     Expected Risk = LOW
 *
 * HEAVY WEATHER:
 *     70 / 65 / 75 / 60
 *     Environmental Stress = 69.25
 *     Expected Risk = MEDIUM
 *
 * CRITICAL:
 *     95 / 90 / 95 / 85
 *     Environmental Stress = 91.50
 *     Expected Risk = CRITICAL
 *
 * The validation tests the actual deterministic engine
 * behaviour rather than forcing scenario names to specific
 * risk classifications.
 */

function validateDPSimulationEngine() {

    const normalScenario =
        dpScenarioNormal();

    const heavyScenario =
        dpScenarioHeavyWeather();

    const criticalScenario =
        dpScenarioCritical();


    const normal =
        runDPSimulation(
            normalScenario
        );

    const heavy =
        runDPSimulation(
            heavyScenario
        );

    const critical =
        runDPSimulation(
            criticalScenario
        );


    const checks = {

        engineLoaded:
            true,

        normalExecuted:
            Boolean(
                normal
            ),

        heavyWeatherExecuted:
            Boolean(
                heavy
            ),

        criticalExecuted:
            Boolean(
                critical
            ),

        normalRisk:
            normal.risk === "LOW",

        heavyRisk:
            heavy.risk === "MEDIUM",

        criticalRisk:
            critical.risk === "CRITICAL",

        humanEscalation:
            critical.human.override === true,

        stabilizerExecuted:
            Boolean(
                critical.stabilizer
            ),

        stateUpdateExecuted:
            Boolean(
                critical.updatedState
            ),

        auditExecuted:
            Boolean(
                critical.audit
            ),

        pipelineExecuted:
            Array.isArray(
                critical.pipeline
            ) &&
            critical.pipeline.length === 6
    };


    const total =
        Object.keys(
            checks
        ).length;


    const passed =
        Object.values(
            checks
        ).filter(
            Boolean
        ).length;


    return {

        engine:
            DP_SIMULATION_ENGINE_NAME,

        version:
            DP_SIMULATION_ENGINE_VERSION,

        passed:
            passed,

        total:
            total,

        status:
            passed === total
                ? "PASS"
                : "FAIL",

        checks:
            checks,

        scenarios: {

            normal:
                normal,

            heavyWeather:
                heavy,

            critical:
                critical
        }
    };
}


/* ============================================================
   PUBLIC ENGINE API
============================================================ */

const DPSimulationEngine = {

    name:
        DP_SIMULATION_ENGINE_NAME,

    version:
        DP_SIMULATION_ENGINE_VERSION,

    mode:
        DP_SIMULATION_MODE,

    vessel:
        DP_DEFAULT_VESSEL,

    thresholds:
        DP_THRESHOLDS,

    run:
        runDPSimulation,

    runScenario:
        runDPScenario,

    validate:
        validateDPSimulationEngine,

    calculateEnvironment:
        calculateDPEnvironmentalStress,

    classifyRisk:
        classifyDPRisk,

    primaryAI:
        dpPrimaryAI,

    secondaryAI:
        dpSecondaryAI,

    humanDecision:
        dpHumanDecision,

    stabilizer:
        dpStabilizer,

    updateState:
        updateDPSimulationState,

    pipeline:
        getDPPipeline(),

    scenarios: {

        normal:
            dpScenarioNormal,

        heavyWeather:
            dpScenarioHeavyWeather,

        critical:
            dpScenarioCritical,

        random:
            dpScenarioRandom
    }
};


/* ============================================================
   BROWSER EXPORT
============================================================ */

if (
    typeof window !== "undefined"
) {

    window.DPSimulationEngine =
        DPSimulationEngine;
}


/* ============================================================
   NODE.JS EXPORT
============================================================ */

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports =
        DPSimulationEngine;
}


/* ============================================================
   ENGINE READY MESSAGE
============================================================ */

if (
    typeof console !== "undefined"
) {

    console.log(
        "SEXTANT PROTOCOL DP SIMULATION ENGINE " +
        DP_SIMULATION_ENGINE_VERSION +
        " — READY"
    );

    console.log(
        "MODE: SIMULATION ONLY"
    );

    console.log(
        "SAFETY BOUNDARY: NOT FOR OPERATIONAL DP CONTROL"
    );
}