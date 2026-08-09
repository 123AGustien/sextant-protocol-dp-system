"""
Stabilizer Module – Sextant DP System
-------------------------------------

Supervisory arbitration layer between the Primary AI,
Secondary AI, and Human-in-the-Loop authority.

The Stabilizer prevents uncontrolled switching between
decision layers and provides a deterministic simulated
final control output.

Research and simulation use only.
This module is NOT certified DP control software.
"""


def stabilizer(
    primary_output,
    secondary_output,
    override=False
):
    """
    Arbitrate between Primary AI and Secondary AI.

    Parameters
    ----------
    primary_output : dict
        Structured output from primary_ai.py.

    secondary_output : dict
        Structured output from secondary_ai.py.

    override : bool
        Human authority override.

    Returns
    -------
    dict
        Structured stabilized control decision.
    """

    # -------------------------------------------------
    # VALIDATE INPUTS
    # -------------------------------------------------

    if not isinstance(primary_output, dict):
        raise TypeError(
            "Primary AI output must be a dictionary."
        )

    if not isinstance(secondary_output, dict):
        raise TypeError(
            "Secondary AI output must be a dictionary."
        )

    if "thrust_output" not in primary_output:
        raise ValueError(
            "Primary AI output missing thrust_output."
        )

    if "thrust_output" not in secondary_output:
        raise ValueError(
            "Secondary AI output missing thrust_output."
        )

    primary = max(
        0.0,
        float(primary_output["thrust_output"])
    )

    secondary = max(
        0.0,
        float(secondary_output["thrust_output"])
    )

    # -------------------------------------------------
    # HUMAN OVERRIDE
    # -------------------------------------------------

    if override:

        return {
            "mode": "STABILIZED",
            "final_output": round(secondary, 2),
            "source": "SECONDARY_AI_OVERRIDE",
            "status": "HUMAN_AUTHORITY_OVERRIDE",
            "primary_output": round(primary, 2),
            "secondary_output": round(secondary, 2),
        }

    # -------------------------------------------------
    # SECONDARY SAFETY ESCALATION
    # -------------------------------------------------

    if secondary_output.get("safety_mode", False):

        return {
            "mode": "STABILIZED",
            "final_output": round(secondary, 2),
            "source": "SECONDARY_AI_SAFETY",
            "status": "SAFETY_STATE_ACTIVE",
            "primary_output": round(primary, 2),
            "secondary_output": round(secondary, 2),
        }

    # -------------------------------------------------
    # NORMAL BLENDED CONTROL
    # -------------------------------------------------

    blended = (
        primary * 0.70
        + secondary * 0.30
    )

    return {
        "mode": "STABILIZED",
        "final_output": round(blended, 2),
        "source": "PRIMARY_SECONDARY_BLEND",
        "status": "NORMAL_STABILITY",
        "primary_output": round(primary, 2),
        "secondary_output": round(secondary, 2),
    }


if __name__ == "__main__":

    print("\n=== SEXTANT STABILIZER TEST ===")

    primary = {
        "mode": "PRIMARY_AI",
        "thrust_output": 70,
        "status": "NORMAL_CONTROL"
    }

    secondary = {
        "mode": "SECONDARY_AI",
        "thrust_output": 50,
        "safety_mode": False,
        "status": "MONITORING"
    }

    result = stabilizer(
        primary,
        secondary,
        override=False
    )

    for key, value in result.items():
        print(f"{key}: {value}")

    print("\nSTATUS: STABILIZER OPERATIONAL")
    print("MODE: SIMULATION ONLY")