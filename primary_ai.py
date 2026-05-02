"""
Primary AI Module – Sextant DP System
Standard Dynamic Positioning control logic
"""

def primary_ai(thrust, environment):
    """
    Main DP control logic (normal operating mode)
    """

    # Standard correction logic
    wind_factor = environment * 0.6
    current_factor = environment * 0.4

    total_disturbance = wind_factor + current_factor

    # Control output
    output = thrust - total_disturbance

    return {
        "mode": "PRIMARY_AI",
        "thrust_output": output,
        "status": "NORMAL_CONTROL"
    }
