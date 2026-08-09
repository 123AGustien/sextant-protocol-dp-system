"""
Primary AI Module – Sextant DP System
-------------------------------------

Normal supervisory control layer for the Sextant DP
simulation prototype.

The Primary AI provides the first simulated response
to environmental disturbance.

Research and simulation use only.
This module is NOT certified DP control software.
"""

def primary_ai(thrust, environment):
    """
    Calculate the Primary AI simulated control response.

    Parameters
    ----------
    thrust : float
        Available nominal simulated thrust.

    environment : float
        Environmental disturbance/stress value (0-100).

    Returns
    -------
    dict
        Structured Primary AI decision output.
    """

    # -------------------------------------------------
    # INPUT NORMALISATION
    # -------------------------------------------------

    thrust = max(0.0, float(thrust))
    environment = max(0.0, min(100.0, float(environment)))

    # -------------------------------------------------
    # ENVIRONMENTAL DISTURBANCE MODEL
    # -------------------------------------------------

    wind_factor = environment * 0.60
    current_factor = environment * 0.40

    total_disturbance = (
        wind_factor +
        current_factor
    )

    # -------------------------------------------------
    # PRIMARY CONTROL RESPONSE
    # -------------------------------------------------

    output = thrust - total_disturbance

    # Prevent negative simulated thrust.
    output = max(0.0, output)

    # -------------------------------------------------
    # STATUS
    # -------------------------------------------------

    if environment >= 70:
        status = "ELEVATED_ENVIRONMENTAL_STRESS"
    elif environment >= 40:
        status = "ADVISORY_CONTROL"
    else:
        status = "NORMAL_CONTROL"

    return {
        "mode": "PRIMARY_AI",
        "thrust_input": round(thrust, 2),
        "environment": round(environment, 2),
        "wind_factor": round(wind_factor, 2),
        "current_factor": round(current_factor, 2),
        "total_disturbance": round(total_disturbance, 2),
        "thrust_output": round(output, 2),
        "status": status,
    }


if __name__ == "__main__":

    print("\n=== SEXTANT PRIMARY AI TEST ===")

    result = primary_ai(
        thrust=100,
        environment=30
    )

    for key, value in result.items():
        print(f"{key}: {value}")

    print("\nSTATUS: PRIMARY AI OPERATIONAL")
    print("MODE: SIMULATION ONLY")