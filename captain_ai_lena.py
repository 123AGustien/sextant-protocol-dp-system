/*
============================================================
🛰️ Sextant Protocol
UMV Captain AI Lena Autonomous Decision Layer v1.0.0
============================================================

Purpose:
Deterministic autonomous decision layer for the Sextant
Unmanned Marine Vehicle (UMV) simulation architecture.

Architecture:

    ENVIRONMENT
         ↓
    PRIMARY AI
         ↓
    SECONDARY AI
         ↓
    STABILIZER
         ↓
    CAPTAIN AI LENA
         ↓
    TRIAL MANOEUVRE ENGINE
         ↓
    VALIDATION
         ↓
    AUTONOMOUS EXECUTION GATE
         ↓
    UPDATE / AUDIT

Captain AI Lena:
- provides deterministic autonomous decision support
- proposes a trial manoeuvre profile
- does NOT directly issue actuator commands
- does NOT bypass validation
- does NOT directly control propulsion, steering,
  navigation or operational DP

The Autonomous Execution Gate is the separate
execution boundary.

Human supervisory / emergency authority remains available.

Research and simulation use only.
*/


const UMV_CAPTAIN_AI_LENA_VERSION = "1.0.0";


// =========================================================
// HELPERS
// =========================================================

function normaliseText(value, fallback = "") {

    if (
        value === null ||
        value === undefined
    ) {

        return fallback;

    }

    return String(value)
        .trim()
        .toUpperCase();

}


function numberValue(
    value,
    fallback = 0.0
) {

    const number = Number(value);

    return Number.isFinite(number)
        ? number
        : fallback;

}


function clamp(
    value,
    minimum = 0.0,
    maximum = 100.0
) {

    return Math.max(
        minimum,
        Math.min(
            maximum,
            value
        )
    );

}


// =========================================================
// CAPTAIN AI LENA
// =========================================================

function captainAILena(
    stabilizerOutput,
    environment = 0.0,
    scenario = "NORMAL",
    sensorIntegrity = "HIGH"
) {


    // -----------------------------------------------------
    // INPUT VALIDATION
    // -----------------------------------------------------

    if (
        !stabilizerOutput ||
        typeof stabilizerOutput !== "object" ||
        Array.isArray(stabilizerOutput)
    ) {

        throw new TypeError(
            "Stabilizer output must be an object."
        );

    }


    if (
        !Object.prototype.hasOwnProperty.call(
            stabilizerOutput,
            "final_output"
        )
    ) {

        throw new Error(
            "Stabilizer output missing final_output."
        );

    }


    // -----------------------------------------------------
    // INPUT NORMALISATION
    // -----------------------------------------------------

    environment =
        clamp(
            numberValue(
                environment
            )
        );


    scenario =
        normaliseText(
            scenario,
            "NORMAL"
        );


    sensorIntegrity =
        normaliseText(
            sensorIntegrity,
            "HIGH"
        );


    const finalOutput =
        Math.max(
            0.0,
            numberValue(
                stabilizerOutput.final_output
            )
        );


    const primaryOutput =
        Math.max(
            0.0,
            numberValue(
                stabilizerOutput.primary_output,
                finalOutput
            )
        );


    const secondaryOutput =
        Math.max(
            0.0,
            numberValue(
                stabilizerOutput.secondary_output,
                finalOutput
            )
        );


    // -----------------------------------------------------
    // PRIMARY / SECONDARY COMPARISON
    // -----------------------------------------------------

    const assessmentDifference =
        Math.abs(
            primaryOutput -
            secondaryOutput
        );


    let assessmentRelationship;


    if (
        assessmentDifference <= 10
    ) {

        assessmentRelationship =
            "ALIGNED";

    }

    else if (
        assessmentDifference <= 25
    ) {

        assessmentRelationship =
            "DIVERGENT";

    }

    else {

        assessmentRelationship =
            "SIGNIFICANT_DIVERGENCE";

    }


    // -----------------------------------------------------
    // STABILIZER SOURCE
    // -----------------------------------------------------

    const stabilizerSource =
        normaliseText(
            stabilizerOutput.source,
            "UNKNOWN"
        );


    const secondarySafety =
        stabilizerSource ===
        "SECONDARY_AI_SAFETY";


    // -----------------------------------------------------
    // RESILIENCE STATE
    // -----------------------------------------------------

    let resilienceState;


    if (
        secondarySafety ||
        environment >= 85
    ) {

        resilienceState =
            "CRITICAL";

    }

    else if (
        environment >= 70 ||
        assessmentRelationship ===
            "SIGNIFICANT_DIVERGENCE"
    ) {

        resilienceState =
            "HIGH_ATTENTION";

    }

    else if (
        environment >= 40 ||
        assessmentRelationship ===
            "DIVERGENT"
    ) {

        resilienceState =
            "ADVISORY";

    }

    else {

        resilienceState =
            "NORMAL";

    }


    // -----------------------------------------------------
    // SENSOR / DATA CONFIDENCE
    // -----------------------------------------------------

    let dataConfidence;


    if (
        sensorIntegrity === "LOW" ||
        sensorIntegrity === "DEGRADED" ||
        sensorIntegrity === "FAILED"
    ) {

        dataConfidence =
            "REDUCED";

    }

    else if (
        sensorIntegrity === "MEDIUM" ||
        sensorIntegrity === "MODERATE"
    ) {

        dataConfidence =
            "MEDIUM";

    }

    else {

        dataConfidence =
            "HIGH";

    }


    // -----------------------------------------------------
    // AUTONOMOUS DECISION
    // -----------------------------------------------------

    let recommendation;
    let urgency;
    let responseMode;
    let trialProfile;


    if (
        dataConfidence === "REDUCED"
    ) {

        recommendation =
            "REQUEST_ADDITIONAL_DIAGNOSTICS";

        urgency =
            "HIGH";

        responseMode =
            "DIAGNOSTIC_ESCALATION";

        trialProfile =
            "DIAGNOSTIC_STABILIZATION_TRIAL";

    }

    else if (
        resilienceState === "CRITICAL"
    ) {

        recommendation =
            "ESCALATE_TO_SUPERVISORY_AUTHORITY";

        urgency =
            "CRITICAL";

        responseMode =
            "CRITICAL_RESILIENCE_RESPONSE";

        trialProfile =
            "CRITICAL_STABILIZATION_TRIAL";

    }

    else if (
        resilienceState === "HIGH_ATTENTION"
    ) {

        recommendation =
            "INCREASE_OPERATOR_ATTENTION";

        urgency =
            "HIGH";

        responseMode =
            "ENHANCED_MONITORING";

        trialProfile =
            "ENHANCED_MONITORING_TRIAL";

    }

    else if (
        resilienceState === "ADVISORY"
    ) {

        recommendation =
            "PREPARE_SAFE_RESPONSE";

        urgency =
            "ADVISORY";

        responseMode =
            "PRECAUTIONARY_MONITORING";

        trialProfile =
            "PRECAUTIONARY_STABILIZATION_TRIAL";

    }

    else {

        recommendation =
            "MAINTAIN_MONITORING";

        urgency =
            "NORMAL";

        responseMode =
            "NORMAL_MONITORING";

        trialProfile =
            "NORMAL_STABILITY_TRIAL";

    }


    // -----------------------------------------------------
    // AUTONOMOUS EXECUTION BOUNDARY
    // -----------------------------------------------------

    /*
     * Captain AI Lena makes the autonomous assessment
     * and proposes a trial manoeuvre.
     *
     * It does NOT execute the manoeuvre.
     *
     * Trial Manoeuvre Engine:
     *     simulate
     *
     * Validation:
     *     validate
     *
     * Autonomous Execution Gate:
     *     determine permission
     *
     * Only the execution gate may permit an autonomous
     * action within the defined operating envelope.
     */

    const autonomousDecision =
        true;


    const trialManoeuvreRequired =
        true;


    const validationRequired =
        true;


    const directActuatorCommand =
        false;


    const physicalExecution =
        false;


    // -----------------------------------------------------
    // HUMAN SUPERVISORY AUTHORITY
    // -----------------------------------------------------

    const humanAuthority =
        "SUPERVISORY_EMERGENCY_FINAL";


    const humanInterventionRequired =
        (
            resilienceState === "CRITICAL" ||
            dataConfidence === "REDUCED"
        );


    // -----------------------------------------------------
    // STRUCTURED OUTPUT
    // -----------------------------------------------------

    return {

        mode:
            "CAPTAIN_AI_LENA_UMV",


        role:
            "AUTONOMOUS_DECISION_LAYER",


        module:
            "Captain AI Lena",


        version:
            UMV_CAPTAIN_AI_LENA_VERSION,


        timestamp:
            new Date().toISOString(),


        domain:
            "UMV",


        scenario:
            scenario,


        environment:
            Number(
                environment.toFixed(2)
            ),


        sensor_integrity:
            sensorIntegrity,


        data_confidence:
            dataConfidence,


        primary_output:
            Number(
                primaryOutput.toFixed(2)
            ),


        secondary_output:
            Number(
                secondaryOutput.toFixed(2)
            ),


        assessment_difference:
            Number(
                assessmentDifference.toFixed(2)
            ),


        assessment_relationship:
            assessmentRelationship,


        stabilizer_output:
            Number(
                finalOutput.toFixed(2)
            ),


        stabilizer_source:
            stabilizerOutput.source ||
            "UNKNOWN",


        resilience_state:
            resilienceState,


        recommendation:
            recommendation,


        urgency:
            urgency,


        response_mode:
            responseMode,


        trial_manoeuvre_profile:
            trialProfile,


        autonomous_decision:
            autonomousDecision,


        trial_manoeuvre_required:
            trialManoeuvreRequired,


        validation_required:
            validationRequired,


        direct_actuator_command:
            directActuatorCommand,


        physical_execution:
            physicalExecution,


        human_authority:
            humanAuthority,


        human_intervention_required:
            humanInterventionRequired,


        execution_status:
            "PENDING_TRIAL_VALIDATION",


        execution_boundary:
            "AUTONOMOUS_EXECUTION_GATE_REQUIRED",


        pipeline: [

            "OBSERVE",

            "VERIFY",

            "ASSESS",

            "DECIDE",

            "TRIAL_MANOEUVRE",

            "VALIDATE",

            "EXECUTION_GATE",

            "ACT",

            "UPDATE"

        ]

    };

}


// =========================================================
// GLOBAL EXPORT
// =========================================================

window.UMVCaptainAILena = {

    name:
        "Captain AI Lena",


    version:
        UMV_CAPTAIN_AI_LENA_VERSION,


    role:
        "AUTONOMOUS_DECISION_LAYER",


    run:
        captainAILena

};