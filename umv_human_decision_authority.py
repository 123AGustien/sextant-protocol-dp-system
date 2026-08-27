"""
Human Decision Authority Module – Sextant Autonomous UMV System
---------------------------------------------------------------

Final human-authority and escalation layer.

The Primary AI, Secondary AI, Stabilizer and Captain AI Lena
provide deterministic simulated assessment and decision support.

The Trial Manoeuvre System provides simulation-only manoeuvre
planning and verification.

This Human Decision Authority layer retains final supervisory
authority over any proposed manoeuvre response.

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

This module does NOT directly control:

    - UMV propulsion
    - steering
    - navigation
    - thrusters
    - actuators
    - physical manoeuvre execution

No physical execution is performed by this module.

Research, development and simulation use only.
This module is NOT certified autonomous marine control software.
"""


MODULE_NAME = "UMV Human Decision Authority"
MODULE_VERSION = "1.0.0"


# =========================================================
# THRESHOLDS
# =========================================================

CRITICAL_THRESHOLD = 85.0
HIGH_RISK_THRESHOLD = 70.0


# =========================================================
# NORMALISATION
# =========================================================

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
# HUMAN DECISION AUTHORITY
# =========================================================

def human_decision(
    environment,
    risk_level
):
    """
    Evaluate whether human supervisory intervention
    is required for the simulated UMV scenario.

    Parameters
    ----------
    environment : float
        Simulated environmental stress value (0-100).

    risk_level : float
        Simulated risk level (0-100).

    Returns
    -------
    dict
        Structured human decision-authority result.
    """

    # -----------------------------------------------------
    # NORMALISE INPUTS
    # -----------------------------------------------------

    environment = _clamp(
        _number(environment)
    )

    risk_level = _clamp(
        _number(risk_level)
    )


    # -----------------------------------------------------
    # HUMAN AUTHORITY ASSESSMENT
    # -----------------------------------------------------

    if (
        environment >= CRITICAL_THRESHOLD
        or
        risk_level >= CRITICAL_THRESHOLD
    ):

        override = True

        status = (
            "HUMAN_DECISION_REQUIRED"
        )

        authority = (
            "HUMAN_FINAL_AUTHORITY"
        )

        decision_gate = (
            "EXECUTION_BLOCKED_PENDING_HUMAN_DECISION"
        )


    elif (
        environment >= HIGH_RISK_THRESHOLD
        or
        risk_level >= HIGH_RISK_THRESHOLD
    ):

        override = False

        status = (
            "HUMAN_REVIEW_RECOMMENDED"
        )

        authority = (
            "HUMAN_FINAL_AUTHORITY"
        )

        decision_gate = (
            "HUMAN_REVIEW_REQUIRED_BEFORE_EXECUTION"
        )


    else:

        override = False

        status = (
            "SUPERVISORY_MONITORING"
        )

        authority = (
            "HUMAN_FINAL_AUTHORITY"
        )

        decision_gate = (
            "SIMULATION_EXECUTION_GATE"
        )


    # -----------------------------------------------------
    # STRUCTURED OUTPUT
    # -----------------------------------------------------

    return {

        "mode":
            "UMV_HUMAN_DECISION_AUTHORITY",

        "module":
            MODULE_NAME,

        "version":
            MODULE_VERSION,

        "environment":
            round(
                environment,
                2
            ),

        "risk_level":
            round(
                risk_level,
                2
            ),

        "override":
            override,

        "status":
            status,

        "authority":
            authority,

        "decision_gate":
            decision_gate,

        "automatic_execution":
            False,

        "physical_execution":
            False,

        "execution_status":
            "SIMULATION_ONLY",

    }


# =========================================================
# TEST
# =========================================================

if __name__ == "__main__":

    print(
        "\n=== SEXTANT UMV HUMAN DECISION AUTHORITY TEST ==="
    )


    result = human_decision(
        environment=90,
        risk_level=90
    )


    for key, value in result.items():

        print(
            f"{key}: {value}"
        )


    print(
        "\nSTATUS: HUMAN DECISION AUTHORITY OPERATIONAL"
    )

    print(
        "MODE: UMV"
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
