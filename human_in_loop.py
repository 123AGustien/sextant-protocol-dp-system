"""
Human-in-the-Loop Module – Sextant DP System
Final authority layer for escalation and override
"""

def human_decision(environment, risk_level):
    """
    Human intervention logic for extreme scenarios
    """

    # Escalation threshold
    CRITICAL_THRESHOLD = 85

    if environment > CRITICAL_THRESHOLD or risk_level > CRITICAL_THRESHOLD:
        override = True
        status = "HUMAN_OVERRIDE_REQUIRED"
    else:
        override = False
        status = "AUTONOMOUS_OPERATION"

    return {
        "mode": "HUMAN_IN_LOOP",
        "override": override,
        "status": status
    }
