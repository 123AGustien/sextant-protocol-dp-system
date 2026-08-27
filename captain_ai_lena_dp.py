"""
Captain AI Lena Decision-Support Module
---------------------------------------
Sextant DP System

Independent decision-support layer positioned after the
Sextant Stabilizer arbitration layer.

Architecture:

    PRIMARY AI
         ↓
    SECONDARY AI
         ↓
    STABILIZER
         ↓
    CAPTAIN AI LENA
         ↓
    TRIAL MANOEUVRE SYSTEM
         ↓
    HUMAN DECISION AUTHORITY

Captain AI Lena interprets the structured result of the
Primary AI / Secondary AI arbitration and provides a
deterministic, auditable decision-support recommendation.

Captain AI Lena does NOT directly control:

    - vessel
    - propulsion
    - steering
    - navigation
    - operational DP

Human / supervisory authority remains final.

Research and simulation use only.
This module is NOT certified marine control software.
"""

from datetime import datetime, timezone


MODULE_NAME = "Captain AI Lena"
MODULE_VERSION = "1.1.0"


# =========================================================
# TIMESTAMP
# =========================================================

def _timestamp():
    return datetime.now(timezone.utc).isoformat()


# =========================================================
# NORMALISATION
# =========================================================

def _normalise_text(value, default=""):

    if value is None:
        return default

    return str(value).strip().upper()


def _number(value, default=0.0):

    try:
        return float(value)

    except (
        TypeError,
        ValueError
    ):

        return default


def _clamp(
    value,
    minimum=0.0,
    maximum=100.0
):

    return max(
        minimum,
        min(maximum, value)
    )


# =========================================================
# CAPTAIN AI LENA
# =========================================================

def captain_ai_lena(
    stabilizer_output,
    environment=0.0,
    scenario="NORMAL",
    sensor_integrity="HIGH"
):
    """
    Generate deterministic Captain AI Lena
    decision-support.

    Parameters
    ----------
    stabilizer_output : dict
        Structured output from the Sextant stabilizer.

    environment : float
        Simulated environmental stress 0-100.

    scenario : str
        Current simulated scenario.

    sensor_integrity : str
        Simulated sensor integrity.

    Returns
    -------
    dict
        Structured Captain AI Lena decision-support.
    """

    # -----------------------------------------------------
    # INPUT VALIDATION
    # -----------------------------------------------------

    if not isinstance(
        stabilizer_output,
        dict
    ):

        raise TypeError(
            "Stabilizer output must be a dictionary."
        )


    if "final_output" not in stabilizer_output:

        raise ValueError(
            "Stabilizer output missing final_output."
        )


    # -----------------------------------------------------
    # INPUT NORMALISATION
    # -----------------------------------------------------

    environment = _clamp(
        _number(environment)
    )


    scenario = _normalise_text(
        scenario,
        "NORMAL"
    )


    sensor_integrity = _normalise_text(
        sensor_integrity,
        "HIGH"
    )


    final_output = max(
        0.0,
        _number(
            stabilizer_output[
                "final_output"
            ]
        )
    )


    primary_output = max(
        0.0,
        _number(
            stabilizer_output.get(
                "primary_output",
                final_output
            )
        )
    )


    secondary_output = max(
        0.0,
        _number(
            stabilizer_output.get(
                "secondary_output",
                final_output
            )
        )
    )


    # -----------------------------------------------------
    # PRIMARY / SECONDARY COMPARISON
    # -----------------------------------------------------

    assessment_difference = abs(
        primary_output -
        secondary_output
    )


    if assessment_difference <= 10:

        assessment_relationship = (
            "ALIGNED"
        )

    elif assessment_difference <= 25:

        assessment_relationship = (
            "DIVERGENT"
        )

    else:

        assessment_relationship = (
            "SIGNIFICANT_DIVERGENCE"
        )


    # -----------------------------------------------------
    # STABILIZER SOURCE
    # -----------------------------------------------------

    stabilizer_source = _normalise_text(
        stabilizer_output.get(
            "source",
            "UNKNOWN"
        )
    )


    secondary_safety = (
        stabilizer_source ==
        "SECONDARY_AI_SAFETY"
    )


    # -----------------------------------------------------
    # RESILIENCE STATE
    # -----------------------------------------------------

    if (
        secondary_safety
        or environment >= 85
    ):

        resilience_state = (
            "CRITICAL"
        )

    elif (
        environment >= 70
        or
        assessment_relationship ==
        "SIGNIFICANT_DIVERGENCE"
    ):

        resilience_state = (
            "HIGH_ATTENTION"
        )

    elif (
        environment >= 40
        or
        assessment_relationship ==
        "DIVERGENT"
    ):

        resilience_state = (
            "ADVISORY"
        )

    else:

        resilience_state = (
            "NORMAL"
        )


    # -----------------------------------------------------
    # SENSOR / DATA CONFIDENCE
    # -----------------------------------------------------

    if sensor_integrity in (
        "LOW",
        "DEGRADED",
        "FAILED"
    ):

        data_confidence = (
            "REDUCED"
        )

    elif sensor_integrity in (
        "MEDIUM",
        "MODERATE"
    ):

        data_confidence = (
            "MEDIUM"
        )

    else:

        data_confidence = (
            "HIGH"
        )


    # -----------------------------------------------------
    # DECISION SUPPORT
    # -----------------------------------------------------

    if data_confidence == "REDUCED":

        recommendation = (
            "REQUEST_ADDITIONAL_DIAGNOSTICS"
        )

        urgency = "HIGH"

        response_mode = (
            "DIAGNOSTIC_ESCALATION"
        )

        trial_profile = (
            "DIAGNOSTIC_STABILIZATION_TRIAL"
        )


    elif resilience_state == "CRITICAL":

        recommendation = (
            "ESCALATE_TO_SUPERVISORY_AUTHORITY"
        )

        urgency = "CRITICAL"

        response_mode = (
            "CRITICAL_RESILIENCE_RESPONSE"
        )

        trial_profile = (
            "CRITICAL_STABILIZATION_TRIAL"
        )


    elif resilience_state == "HIGH_ATTENTION":

        recommendation = (
            "INCREASE_OPERATOR_ATTENTION"
        )

        urgency = "HIGH"

        response_mode = (
            "ENHANCED_MONITORING"
        )

        trial_profile = (
            "ENHANCED_MONITORING_TRIAL"
        )


    elif resilience_state == "ADVISORY":

        recommendation = (
            "PREPARE_SAFE_RESPONSE"
        )

        urgency = "ADVISORY"

        response_mode = (
            "PRECAUTIONARY_MONITORING"
        )

        trial_profile = (
            "PRECAUTIONARY_STABILIZATION_TRIAL"
        )


    else:

        recommendation = (
            "MAINTAIN_MONITORING"
        )

        urgency = "NORMAL"

        response_mode = (
            "NORMAL_MONITORING"
        )

        trial_profile = (
            "NORMAL_STABILITY_TRIAL"
        )


    # -----------------------------------------------------
    # HUMAN AUTHORITY
    # -----------------------------------------------------

    human_authority = "FINAL"

    automatic_execution = False

    physical_execution = False

    execution_status = (
        "SIMULATION_ONLY"
    )


    # -----------------------------------------------------
    # STRUCTURED OUTPUT
    # -----------------------------------------------------

    result = {

        "mode":
            "CAPTAIN_AI_LENA",

        "role":
            "DECISION_SUPPORT",

        "module":
            MODULE_NAME,

        "version":
            MODULE_VERSION,

        "timestamp":
            _timestamp(),

        "scenario":
            scenario,

        "environment":
            round(
                environment,
                2
            ),

        "sensor_integrity":
            sensor_integrity,

        "data_confidence":
            data_confidence,

        "primary_output":
            round(
                primary_output,
                2
            ),

        "secondary_output":
            round(
                secondary_output,
                2
            ),

        "assessment_difference":
            round(
                assessment_difference,
                2
            ),

        "assessment_relationship":
            assessment_relationship,

        "stabilizer_output":
            round(
                final_output,
                2
            ),

        "stabilizer_source":
            stabilizer_output.get(
                "source",
                "UNKNOWN"
            ),

        "resilience_state":
            resilience_state,

        "recommendation":
            recommendation,

        "urgency":
            urgency,

        "response_mode":
            response_mode,

        "trial_manoeuvre_profile":
            trial_profile,

        "human_authority":
            human_authority,

        "automatic_execution":
            automatic_execution,

        "physical_execution":
            physical_execution,

        "execution_status":
            execution_status,

    }


    return result


# =========================================================
# TEST
# =========================================================

if __name__ == "__main__":

    print(
        "\n=== SEXTANT CAPTAIN AI LENA TEST ==="
    )


    stabilizer = {

        "mode":
            "STABILIZED",

        "final_output":
            64,

        "source":
            "PRIMARY_SECONDARY_BLEND",

        "status":
            "NORMAL_STABILITY",

        "primary_output":
            70,

        "secondary_output":
            50,

    }


    result = captain_ai_lena(

        stabilizer_output=
            stabilizer,

        environment=
            50,

        scenario=
            "NORMAL",

        sensor_integrity=
            "HIGH"

    )


    print(
        "\n--- CAPTAIN AI LENA ---"
    )


    for key, value in result.items():

        print(
            f"{key}: {value}"
        )


    print(
        "\nSTATUS: CAPTAIN AI LENA OPERATIONAL"
    )

    print(
        "ROLE: DECISION SUPPORT"
    )

    print(
        "HUMAN AUTHORITY: FINAL"
    )

    print(
        "AUTOMATIC EXECUTION: FALSE"
    )

    print(
        "PHYSICAL EXECUTION: FALSE"
    )

    print(
        "MODE: SIMULATION ONLY"
    )