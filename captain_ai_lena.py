"""
Captain AI Lena Decision-Support Module – Sextant DP System
-----------------------------------------------------------

Independent decision-support layer positioned after the
Sextant Stabilizer arbitration layer.

Captain AI Lena interprets the structured result of the
Primary AI / Secondary AI arbitration and provides a
deterministic, auditable decision-support recommendation.

Captain AI Lena does NOT directly control a vessel,
propulsion system, navigation system, steering system,
or operational DP system.

Human / supervisory authority remains final.

Research and simulation use only.
This module is NOT certified marine control software.
"""


def captain_ai_lena(
    stabilizer_output,
    environment=0.0,
    scenario="NORMAL",
    sensor_integrity="HIGH"
):
    """
    Generate Captain AI Lena decision-support.

    Parameters
    ----------
    stabilizer_output : dict
        Structured output from stabilizer.py.

    environment : float
        Simulated environmental stress value (0-100).

    scenario : str
        Current simulated scenario.

    sensor_integrity : str
        Simulated sensor integrity state.

    Returns
    -------
    dict
        Structured Captain AI Lena decision-support output.
    """

    # -------------------------------------------------
    # INPUT VALIDATION
    # -------------------------------------------------

    if not isinstance(stabilizer_output, dict):
        raise TypeError(
            "Stabilizer output must be a dictionary."
        )

    if "final_output" not in stabilizer_output:
        raise ValueError(
            "Stabilizer output missing final_output."
        )

    # -------------------------------------------------
    # INPUT NORMALISATION
    # -------------------------------------------------

    environment = max(
        0.0,
        min(100.0, float(environment))
    )

    scenario = str(scenario).strip().upper()
    sensor_integrity = str(
        sensor_integrity
    ).strip().upper()

    final_output = max(
        0.0,
        float(stabilizer_output["final_output"])
    )

    primary_output = max(
        0.0,
        float(
            stabilizer_output.get(
                "primary_output",
                final_output
            )
        )
    )

    secondary_output = max(
        0.0,
        float(
            stabilizer_output.get(
                "secondary_output",
                final_output
            )
        )
    )

    # -------------------------------------------------
    # PRIMARY / SECONDARY COMPARISON
    # -------------------------------------------------

    assessment_difference = abs(
        primary_output - secondary_output
    )

    if assessment_difference <= 10:
        assessment_relationship = "ALIGNED"

    elif assessment_difference <= 25:
        assessment_relationship = "DIVERGENT"

    else:
        assessment_relationship = "SIGNIFICANT_DIVERGENCE"

    # -------------------------------------------------
    # RESILIENCE STATE
    # -------------------------------------------------

    secondary_safety = (
        stabilizer_output.get("source")
        == "SECONDARY_AI_SAFETY"
    )

    if secondary_safety or environment >= 85:
        resilience_state = "CRITICAL"

    elif environment >= 70 or assessment_relationship == "SIGNIFICANT_DIVERGENCE":
        resilience_state = "HIGH_ATTENTION"

    elif environment >= 40 or assessment_relationship == "DIVERGENT":
        resilience_state = "ADVISORY"

    else:
        resilience_state = "NORMAL"

    # -------------------------------------------------
    # SENSOR / DATA CONFIDENCE
    # -------------------------------------------------

    if sensor_integrity in (
        "LOW",
        "DEGRADED",
        "FAILED"
    ):
        data_confidence = "REDUCED"

    elif sensor_integrity in (
        "MEDIUM",
        "MODERATE"
    ):
        data_confidence = "MEDIUM"

    else:
        data_confidence = "HIGH"

    # -------------------------------------------------
    # DECISION-SUPPORT RECOMMENDATION
    # -------------------------------------------------

    if data_confidence == "REDUCED":

        recommendation = "REQUEST_DIAGNOSTICS"
        urgency = "HIGH"
        response_mode = "DIAGNOSTIC_ESCALATION"

    elif resilience_state == "CRITICAL":

        recommendation = "ESCALATE_TO_SUPERVISORY_AUTHORITY"
        urgency = "CRITICAL"
        response_mode = "CRITICAL_RESILIENCE_RESPONSE"

    elif resilience_state == "HIGH_ATTENTION":

        recommendation = "INCREASE_OPERATOR_ATTENTION"
        urgency = "HIGH"
        response_mode = "ENHANCED_MONITORING"

    elif resilience_state == "ADVISORY":

        recommendation = "PREPARE_SAFE_RESPONSE"
        urgency = "ADVISORY"
        response_mode = "PRECAUTIONARY_MONITORING"

    else:

        recommendation = "MAINTAIN_MONITORING"
        urgency = "NORMAL"
        response_mode = "NORMAL_MONITORING"

    # -------------------------------------------------
    # HUMAN AUTHORITY
    # -------------------------------------------------

    human_authority = "FINAL"
    execution_status = "SIMULATION_ONLY"
    automatic_execution = False

    # -------------------------------------------------
    # STRUCTURED OUTPUT
    # -------------------------------------------------

    return {
        "mode": "CAPTAIN_AI_LENA",
        "role": "DECISION_SUPPORT",
        "scenario": scenario,
        "environment": round(environment, 2),
        "sensor_integrity": sensor_integrity,
        "data_confidence": data_confidence,
        "primary_output": round(primary_output, 2),
        "secondary_output": round(secondary_output, 2),
        "assessment_difference": round(
            assessment_difference,
            2
        ),
        "assessment_relationship": assessment_relationship,
        "stabilizer_output": round(
            final_output,
            2
        ),
        "stabilizer_source": stabilizer_output.get(
            "source",
            "UNKNOWN"
        ),
        "resilience_state": resilience_state,
        "recommendation": recommendation,
        "urgency": urgency,
        "response_mode": response_mode,
        "human_authority": human_authority,
        "automatic_execution": automatic_execution,
        "execution_status": execution_status,
    }


if __name__ == "__main__":

    print("\n=== SEXTANT CAPTAIN AI LENA TEST ===")

    primary = {
        "thrust_output": 70
    }

    secondary = {
        "thrust_output": 50
    }

    stabilized = {
        "mode": "STABILIZED",
        "final_output": 64,
        "source": "PRIMARY_SECONDARY_BLEND",
        "status": "NORMAL_STABILITY",
        "primary_output": 70,
        "secondary_output": 50,
    }

    result = captain_ai_lena(
        stabilizer_output=stabilized,
        environment=50,
        scenario="NORMAL",
        sensor_integrity="HIGH"
    )

    for key, value in result.items():
        print(f"{key}: {value}")

    print("\nSTATUS: CAPTAIN AI LENA OPERATIONAL")
    print("ROLE: DECISION SUPPORT")
    print("HUMAN AUTHORITY: FINAL")
    print("AUTOMATIC EXECUTION: FALSE")
    print("MODE: SIMULATION ONLY")