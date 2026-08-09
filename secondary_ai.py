"""
Secondary AI Module – Sextant DP System
---------------------------------------

Independent safety supervisory layer.

The Secondary AI monitors simulated environmental
stress and provides a conservative fallback response
when the Primary AI operating envelope is exceeded.

Research and simulation use only.
This module is NOT certified DP control software.
"""

def secondary_ai(environment, threshold=70):
    """
    Evaluate environmental conditions independently.

    Parameters
    ----------
    environment : float
        Environmental disturbance/stress value (0-100).

    threshold : float
        Environmental level at which safety supervision
        becomes active.

    Returns
    -------
    dict
        Structured Secondary AI safety assessment.
    """

    # -------------------------------------------------
    # INPUT NORMALISATION
    # -------------------------------------------------

    environment = max(
        0.0,
        min(100.0, float(environment))
    )

    threshold = max(
        0.0,
        min(100.0, float(threshold))
    )

    # -------------------------------------------------
    # INDEPENDENT SAFETY ASSESSMENT
    # -------------------------------------------------

    if environment >= threshold:

        safety_mode = True

        # Conservative fallback response.
        output = max(
            0.0,
            40.0 - environment
        )

        status = "SAFETY_OVERRIDE_ACTIVE"

    else:

        safety_mode = False

        # Maintain conservative monitoring output.
        output = 50.0

        status = "MONITORING"

    # -------------------------------------------------
    # RISK CLASSIFICATION
    # -------------------------------------------------

    if environment >= 85:
        risk = "CRITICAL"

    elif environment >= threshold:
        risk = "HIGH"

    elif environment >= 40:
        risk = "MEDIUM"

    else:
        risk = "LOW"

    # -------------------------------------------------
    # RETURN STRUCTURED DECISION
    # -------------------------------------------------

    return {
        "mode": "SECONDARY_AI",
        "environment": round(environment, 2),
        "threshold": round(threshold, 2),
        "thrust_output": round(output, 2),
        "safety_mode": safety_mode,
        "risk_level": risk,
        "status": status,
    }


if __name__ == "__main__":

    print("\n=== SEXTANT SECONDARY AI TEST ===")

    result = secondary_ai(
        environment=75
    )

    for key, value in result.items():
        print(f"{key}: {value}")

    print("\nSTATUS: SECONDARY AI OPERATIONAL")
    print("MODE: INDEPENDENT SAFETY SUPERVISION")
    print("SAFETY BOUNDARY: SIMULATION ONLY")