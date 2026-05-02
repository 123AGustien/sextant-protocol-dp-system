"""
Secondary AI Module – Sextant DP System
Safety-first independent control layer
"""

def secondary_ai(environment, threshold=70):
    """
    Safety override logic for extreme conditions
    """

    # Detect abnormal environmental conditions
    if environment > threshold:
        safety_mode = True
    else:
        safety_mode = False

    # Conservative control response
    if safety_mode:
        output = max(0, 40 - environment)
        status = "SAFETY_OVERRIDE_ACTIVE"
    else:
        output = 50
        status = "MONITORING"

    return {
        "mode": "SECONDARY_AI",
        "thrust_output": output,
        "status": status,
        "safety_mode": safety_mode
    }
