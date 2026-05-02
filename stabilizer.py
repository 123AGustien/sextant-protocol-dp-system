"""
Stabilizer Module – Sextant DP System
Prevents oscillation between Primary and Secondary AI
"""

def stabilizer(primary_output, secondary_output, override=False):
    """
    Arbitration layer between Primary and Secondary AI
    """

    # If safety override is active, prioritize Secondary AI
    if override:
        return {
            "mode": "STABILIZED",
            "final_output": secondary_output["thrust_output"],
            "source": "SECONDARY_AI_OVERRIDE",
            "status": "SAFE_STATE_LOCK"
        }

    # Normal blended control logic
    blended = (
        primary_output["thrust_output"] * 0.7 +
        secondary_output["thrust_output"] * 0.3
    )

    return {
        "mode": "STABILIZED",
        "final_output": blended,
        "source": "BLENDED_CONTROL",
        "status": "NORMAL_STABILITY"
    }
