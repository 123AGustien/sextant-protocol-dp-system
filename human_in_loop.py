"""
Human-in-the-Loop Module – Sextant DP System
--------------------------------------------

Final authority and escalation layer.

The Primary AI and Secondary AI provide simulated
decision support. The Human-in-the-Loop layer retains
final authority during critical simulated conditions.

Research and simulation use only.
This module is NOT certified DP control software.
"""


def human_decision(environment, risk_level):
    """
    Evaluate whether human intervention is required.

    Parameters
    ----------
    environment : float
        Environmental stress value (0-100).

    risk_level : float
        Simulated risk level (0-100).

    Returns
    -------
    dict
        Structured human authority decision.
    """

    # -------------------------------------------------
    # THRESHOLDS
    # -------------------------------------------------

    CRITICAL_THRESHOLD = 85.0
    HIGH_RISK_THRESHOLD = 70.0

    # -------------------------------------------------
    # NORMALISE INPUTS
    # -------------------------------------------------

    environment = max(
        0.0,
        min(100.0, float(environment))
    )

    risk_level = max(
        0.0,
        min(100.0, float(risk_level))
    )

    # -------------------------------------------------
    # HUMAN ESCALATION ASSESSMENT
    # -------------------------------------------------

    if (
        environment >= CRITICAL_THRESHOLD
        or risk_level >= CRITICAL_THRESHOLD
    ):

        override = True
        status = "HUMAN_OVERRIDE_REQUIRED"
        authority = "HUMAN_FINAL_AUTHORITY"

    elif (
        environment >= HIGH_RISK_THRESHOLD
        or risk_level >= HIGH_RISK_THRESHOLD
    ):

        override = False
        status = "HUMAN_REVIEW_RECOMMENDED"
        authority = "HUMAN_AVAILABLE"

    else:

        override = False
        status = "AUTONOMOUS_OPERATION"
        authority = "HUMAN_AVAILABLE"

    # -------------------------------------------------
    # RETURN DECISION
    # -------------------------------------------------

    return {
        "mode": "HUMAN_IN_LOOP",
        "environment": round(environment, 2),
        "risk_level": round(risk_level, 2),
        "override": override,
        "status": status,
        "authority": authority,
    }


if __name__ == "__main__":

    print("\n=== SEXTANT HUMAN-IN-THE-LOOP TEST ===")

    result = human_decision(
        environment=90,
        risk_level=90
    )

    for key, value in result.items():
        print(f"{key}: {value}")

    print("\nSTATUS: HUMAN AUTHORITY LAYER OPERATIONAL")
    print("MODE: SIMULATION ONLY")