/*
 * Sextant Protocol – DP Simulation Engine
 * ----------------------------------------
 *
 * Deterministic browser-based simulation engine for the
 * Sextant DP Resilience Research Prototype.
 *
 * Architecture:
 *
 *   ENVIRONMENT
 *        ↓
 *   PRIMARY AI
 *        ↓
 *   SECONDARY AI
 *        ↓
 *   STABILIZER
 *        ↓
 *   HUMAN-IN-THE-LOOP
 *        ↓
 *   SIMULATED DP ACTION
 *        ↓
 *   UPDATED STATE
 *
 * Research / simulation use only.
 *
 * SAFETY BOUNDARY:
 * This engine is NOT certified marine control software.
 * It must never be connected to operational DP,
 * propulsion, navigation, or safety systems.
 *
 * All vessel behaviour, environmental conditions,
 * decisions and outputs are simulated.
 */


/* ============================================================
   CONSTANTS
   ============================================================ */

const DP_SIMULATION_ENGINE_VERSION = "1.0.0";

const DP_NOMINAL_THRUST = 100;

const DP_THRESHOLDS = {
    LOW: 40,
    MEDIUM: 70,
    HIGH: 85
};


/* ============================================================
   INPUT VALIDATION
   ============================================================ */

function clampDP(value, minimum = 0, maximum = 100) {

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return minimum;
    }

    return Math.max(
        minimum,
        Math.min(maximum, numericValue)
    );
}


/* ============================================================
   ENVIRONMENT MODEL
   ============================================================ */

function calculateDPEnvironmentalStress(
    wind,
    current,
    wave,
    tidal
) {

    const normalizedWind = clampDP(wind);
    const normalizedCurrent = clampDP(current);
    const normalizedWave = clampDP(wave);
    const normalizedTidal = clampDP(tidal);

    const environmentalStress =
        normalizedWind * 0.30 +
        normalizedCurrent * 0.25 +
        normalizedWave * 0.30 +
        normalizedTidal * 0.15;

    return {
        wind: normalizedWind,
        current: normalizedCurrent,
        wave: normalizedWave,
        tidal: normalizedTidal,

        environmentalStress:
            environmentalStress
    };
}


/* ============================================================
   RISK CLASSIFICATION
   ============================================================ */

function classifyDPRisk(environmentalStress) {

    if (environmentalStress < DP_THRESHOLDS.LOW) {
        return "LOW";
    }

    if (environmentalStress < DP_THRESHOLDS.MEDIUM) {
        return "MEDIUM";
    }

    if (environmentalStress < DP_THRESHOLDS.HIGH) {
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
        Number.isFinite(Number(nominalThrust))
            ? Number(nominalThrust)
            : DP_NOMINAL_THRUST;

    const environment =
        clampDP(environmentalStress);

    /*
     * Simulated disturbance model.
     *
     * This is deliberately a research abstraction.
     * It is NOT a DP control algorithm.
     */

    const disturbance =
        environment * 0.60 +
        environment * 0.40;

    const thrustOutput =
        Math.max(
            0,
            thrust - disturbance
        );

    return {

        layer: "PRIMARY_AI",

        mode: "PRIMARY_AI",

        thrustOutput:
            thrustOutput,

        status:
            "NORMAL_CONTROL"
    };
}


/* ============================================================
   SECONDARY AI
   ============================================================ */

function dpSecondaryAI(
    environmentalStress
) {

    const environment =
        clampDP(environmentalStress);

    const safetyThreshold = 70;

    const safetyMode =
        environment > safetyThreshold;

    let thrustOutput;
    let status;

    if (safetyMode) {

        /*
         * Conservative simulated fallback.
         */

        thrustOutput =
            Math.max(
                0,
                40 - environment
            );

        status =
            "SAFETY_OVERRIDE_ACTIVE";

    } else {

        thrustOutput = 50;

        status =
            "MONITORING";
    }

    return {

        layer: "SECONDARY_AI",

        mode:
            "SECONDARY_AI",

        thrustOutput:
            thrustOutput,

        status:
            status,

        safetyMode:
            safetyMode
    };
}


/* ============================================================
   HUMAN-IN-THE-LOOP
   ============================================================ */

function dpHumanDecision(
    environmentalStress,
    riskLevel
) {

    const environment =
        clampDP(environmentalStress);

    const risk =
        clampDP(riskLevel);

    const criticalThreshold = 85;

    const override =
        environment > criticalThreshold ||
        risk > criticalThreshold;

    return {

        layer:
            "HUMAN_IN_LOOP",

        mode:
            "HUMAN_IN_LOOP",

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

function dpStabilizer(
    primary,
    secondary,
    humanOverride
) {

    /*
     * Human authority takes precedence
     * inside the simulation architecture.
     */

    if (humanOverride) {

        return {

            layer:
                "STABILIZER",

            mode:
                "STABILIZED",

            finalOutput:
                secondary.thrustOutput,

            source:
                "SECONDARY_AI_OVERRIDE",

            status:
                "SAFE_STATE_LOCK"
        };
    }

    /*
     * Normal simulated arbitration.
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
            blendedOutput,

        source:
            "BLENDED_CONTROL",

        status:
            "NORMAL_STABILITY"
    };
}


/* ============================================================
   SIMULATION STATE UPDATE
   ============================================================ */

function updateDPSimulationState(
    previousState,
    finalOutput,
    environmentalStress
) {

    const previousPosition =
        previousState &&
        Number.isFinite(
            Number(previousState.positionError)
        )
            ? Number(previousState.positionError)
            : 0;

    const stress =
        clampDP(environmentalStress);

    const command =
        Math.max(
            0,
            Number(finalOutput) || 0
        );

    /*
     * Simplified research state model.
     * This does NOT represent real vessel dynamics.
     */

    const simulatedPositionError =
        Math.max(
            0,
            previousPosition +
            (stress * 0.01) -
            (command * 0.002)
        );

    return {

        positionError:
            simulatedPositionError,

        simulatedCommand:
            command,

        environmentalStress:
            stress
    };
}


/* ============================================================
   GOVERNANCE STATUS
   ============================================================ */

function determineDPSystemStatus(
    risk,
    humanOverride
) {

    if (humanOverride) {

        return "HUMAN OVERRIDE REQUIRED";
    }

    if (risk === "HIGH") {

        return "DEGRADED / HIGH RISK";
    }

    if (risk === "CRITICAL") {

        return "CRITICAL / HUMAN REVIEW";
    }

    return "SIMULATION STABLE";
}


/* ============================================================
   COMPLETE SIMULATION CYCLE
   ============================================================ */

function runDPSimulation(
    inputs,
    previousState = {}
) {

    const wind =
        clampDP(inputs.wind);

    const current =
        clampDP(inputs.current);

    const wave =
        clampDP(inputs.wave);

    const tidal =
        clampDP(inputs.tidal);

    /* --------------------------------------------------------
       OBSERVE
       -------------------------------------------------------- */

    const environment =
        calculateDPEnvironmentalStress(
            wind,
            current,
            wave,
            tidal
        );

    const environmentalStress =
        environment.environmentalStress;

    /* --------------------------------------------------------
       VERIFY
       -------------------------------------------------------- */

    const verifiedInputs = {

        wind:
            environment.wind,

        current:
            environment.current,

        wave:
            environment.wave,

        tidal:
            environment.tidal
    };

    /* --------------------------------------------------------
       ASSESS
       -------------------------------------------------------- */

    const risk =
        classifyDPRisk(
            environmentalStress
        );

    /* --------------------------------------------------------
       PRIMARY AI
       -------------------------------------------------------- */

    const primary =
        dpPrimaryAI(
            DP_NOMINAL_THRUST,
            environmentalStress
        );

    /* --------------------------------------------------------
       SECONDARY AI
       -------------------------------------------------------- */

    const secondary =
        dpSecondaryAI(
            environmentalStress
        );

    /* --------------------------------------------------------
       HUMAN
       -------------------------------------------------------- */

    const human =
        dpHumanDecision(
            environmentalStress,
            environmentalStress
        );

    /* --------------------------------------------------------
       DECIDE / STABILIZE
       -------------------------------------------------------- */

    const final =
        dpStabilizer(
            primary,
            secondary,
            human.override
        );

    /* --------------------------------------------------------
       ACT / SIMULATED COMMAND
       -------------------------------------------------------- */

    const updatedState =
        updateDPSimulationState(
            previousState,
            final.finalOutput,
            environmentalStress
        );

    /* --------------------------------------------------------
       SYSTEM STATUS
       -------------------------------------------------------- */

    const systemStatus =
        determineDPSystemStatus(
            risk,
            human.override
        );

    /* --------------------------------------------------------
       AUDIT RECORD
       -------------------------------------------------------- */

    const auditRecord = {

        engineVersion:
            DP_SIMULATION_ENGINE_VERSION,

        timestamp:
            new Date().toISOString(),

        pipeline:
            [
                "OBSERVE",
                "VERIFY",
                "ASSESS",
                "DECIDE",
                "ACT",
                "UPDATE"
            ],

        inputs:
            verifiedInputs,

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
            final,

        updatedState:
            updatedState,

        systemStatus:
            systemStatus
    };

    /* --------------------------------------------------------
       COMPLETE RESULT
       -------------------------------------------------------- */

    return {

        engine:
            "DP_SIMULATION_ENGINE",

        version:
            DP_SIMULATION_ENGINE_VERSION,

        mode:
            "SIMULATION_ONLY",

        environment:
            environment,

        risk:
            risk,

        primary:
            primary,

        secondary:
            secondary,

        human:
            human,

        stabilizer:
            final,

        updatedState:
            updatedState,

        systemStatus:
            systemStatus,

        audit:
            auditRecord
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
   PUBLIC ENGINE API
   ============================================================ */

const DPSimulationEngine = {

    version:
        DP_SIMULATION_ENGINE_VERSION,

    run:
        runDPSimulation,

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

if (typeof window !== "undefined") {

    window.DPSimulationEngine =
        DPSimulationEngine;
}


/* ============================================================
   NODE.JS EXPORT
   ============================================================ */

if (typeof module !== "undefined" &&
    module.exports) {

    module.exports =
        DPSimulationEngine;
}