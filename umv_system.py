"""
Sextant Autonomous UMV System
-----------------------------

Top-level deterministic integration layer.

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

Purpose:
Coordinate the individual UMV simulation modules into one
structured, auditable simulation pipeline.

This module provides orchestration only.

It does NOT directly control:

    - UMV propulsion
    - steering
    - navigation
    - thrusters
    - actuators
    - physical manoeuvre execution

All manoeuvres remain proposed/simulated until the final
Human Decision Authority layer.

Research, development and simulation use only.
This module is NOT certified autonomous marine control software.
"""

from datetime import datetime, timezone


MODULE_NAME = "Sextant Autonomous UMV System"
MODULE_VERSION = "1.0.0"


# =========================================================
# TIMESTAMP
# =========================================================

def _timestamp():
    return datetime.now(
        timezone.utc
    ).isoformat()


# =========================================================
# NORMALISATION
# =========================================================

def _normalise_text(
    value,
    default=""
):
    if value is None:
        return default

    return str(
        value
    ).strip().upper()


def _number(
    value,
    default=0.0
):
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
# UMV SYSTEM PIPELINE
# =========================================================

def run_umv_simulation(
    primary_output,
    secondary_output,
    stabilizer_output,
    environment=0.0,
    scenario="NORMAL",
    sensor_integrity="HIGH",
    risk_level=0.0
):
    """
    Execute the Sextant Autonomous UMV simulation pipeline.

    Parameters
    ----------
    primary_output : dict
        Simulated Primary AI result.

    secondary_output : dict
        Simulated Secondary AI result.

    stabilizer_output : dict
        Structured result from the Stabilizer.

    environment : float
        Simulated environmental stress value (0-100).

    scenario : str
        Simulated UMV scenario.

    sensor_integrity : str
        Simulated sensor/data integrity state.

    risk_level : float
        Simulated risk level (0-100).

    Returns
    -------
    dict
        Complete structured UMV simulation result.
    """

    # -----------------------------------------------------
    # IMPORT PIPELINE MODULES
    # -----------------------------------------------------

    from captain_ai_lena import captain_ai_lena

    from umv_trial_manoeuvre import (
        generate_trial_manoeuvre
    )

    from umv_human_decision_authority import (
        human_decision
    )


    # -----------------------------------------------------
    # INPUT VALIDATION
    # -----------------------------------------------------

    if not isinstance(
        primary_output,
        dict
    ):
        raise TypeError(
            "Primary AI output must be a dictionary."
        )


    if not isinstance(
        secondary_output,
        dict
    ):
        raise TypeError(
            "Secondary AI output must be a dictionary."
        )


    if not isinstance(
        stabilizer_output,
        dict
    ):
        raise TypeError(
            "Stabilizer output must be a dictionary."
        )


    # -----------------------------------------------------
    # INPUT NORMALISATION
    # -----------------------------------------------------

    environment = _clamp(
        _number(environment)
    )


    risk_level = _clamp(
        _number(risk_level)
    )


    scenario = _normalise_text(
        scenario,
        "NORMAL"
    )


    sensor_integrity = _normalise_text(
        sensor_integrity,
        "HIGH"
    )


    # =====================================================
    # STAGE 1 — PRIMARY AI
    # =====================================================

    primary_stage = {
        "stage":
            "PRIMARY_AI",

        "status":
            "RECEIVED",

        "output":
            primary_output
    }


    # =====================================================
    # STAGE 2 — SECONDARY AI
    # =====================================================

    secondary_stage = {
        "stage":
            "SECONDARY_AI",

        "status":
            "RECEIVED",

        "output":
            secondary_output
    }


    # =====================================================
    # STAGE 3 — STABILIZER
    # =====================================================

    stabilizer_stage = {
        "stage":
            "STABILIZER",

        "status":
            "RECEIVED",

        "output":
            stabilizer_output
    }


    # =====================================================
    # STAGE 4 — CAPTAIN AI LENA
    # =====================================================

    lena_result = captain_ai_lena(

        stabilizer_output=
            stabilizer_output,

        environment=
            environment,

        scenario=
            scenario,

        sensor_integrity=
            sensor_integrity
    )


    # =====================================================
    # STAGE 5 — TRIAL MANOEUVRE
    # =====================================================

    trial_manoeuvre_result = (
        generate_trial_manoeuvre(

            captain_lena_output=
                lena_result,

            scenario=
                scenario
        )
    )


    # =====================================================
    # STAGE 6 — HUMAN DECISION AUTHORITY
    # =====================================================

    human_authority_result = human_decision(

        environment=
            environment,

        risk_level=
            risk_level
    )


    # =====================================================
    # FINAL EXECUTION GATE
    # =====================================================

    execution_blocked = True

    execution_reason = (
        "PHYSICAL_EXECUTION_NOT_PERMITTED"
    )


    if human_authority_result.get(
        "status"
    ) == "HUMAN_DECISION_REQUIRED":

        execution_reason = (
            "EXECUTION_BLOCKED_PENDING_HUMAN_DECISION"
        )

    elif human_authority_result.get(
        "status"
    ) == "HUMAN_REVIEW_RECOMMENDED":

        execution_reason = (
            "HUMAN_REVIEW_REQUIRED_BEFORE_EXECUTION"
        )


    # =====================================================
    # COMPLETE SYSTEM RESULT
    # =====================================================

    return {

        "system":
            MODULE_NAME,

        "version":
            MODULE_VERSION,

        "timestamp":
            _timestamp(),

        "mode":
            "AUTONOMOUS_UMV_SIMULATION",

        "simulation_only":
            True,

        "scenario":
            scenario,

        "environment":
            round(
                environment,
                2
            ),

        "sensor_integrity":
            sensor_integrity,

        "risk_level":
            round(
                risk_level,
                2
            ),

        "pipeline":
            [

                "PRIMARY_AI",

                "SECONDARY_AI",

                "STABILIZER",

                "CAPTAIN_AI_LENA",

                "TRIAL_MANOEUVRE",

                "HUMAN_DECISION_AUTHORITY"

            ],

        "primary_ai":
            primary_stage,

        "secondary_ai":
            secondary_stage,

        "stabilizer":
            stabilizer_stage,

        "captain_ai_lena":
            lena_result,

        "trial_manoeuvre":
            trial_manoeuvre_result,

        "human_decision_authority":
            human_authority_result,

        "execution_gate":
            {

                "physical_execution":
                    False,

                "automatic_execution":
                    False,

                "execution_blocked":
                    execution_blocked,

                "reason":
                    execution_reason

            },

        "human_authority":
            "FINAL",

        "system_status":
            "SIMULATION_COMPLETE"

    }


# =========================================================
# DEMONSTRATION TEST
# =========================================================

if __name__ == "__main__":

    print(
        "\n=== SEXTANT AUTONOMOUS UMV SYSTEM ==="
    )


    # -----------------------------------------------------
    # SIMULATED PRIMARY AI
    # -----------------------------------------------------

    primary = {

        "thrust_output":
            70,

        "status":
            "SIMULATED"

    }


    # -----------------------------------------------------
    # SIMULATED SECONDARY AI
    # -----------------------------------------------------

    secondary = {

        "thrust_output":
            50,

        "status":
            "SIMULATED"

    }


    # -----------------------------------------------------
    # SIMULATED STABILIZER RESULT
    # -----------------------------------------------------

    stabilizer = {

        "mode":
            "STABILIZED",

        "final_output":
            64,

        "source":
            "PRIMARY_SECONDARY_BLEND",

        "status":
            "NORMAL_STABILITY",

        "primary_output":
            70,

        "secondary_output":
            50

    }


    # -----------------------------------------------------
    # RUN SYSTEM
    # -----------------------------------------------------

    result = run_umv_simulation(

        primary_output=
            primary,

        secondary_output=
            secondary,

        stabilizer_output=
            stabilizer,

        environment=
            50,

        scenario=
            "SIGNAL_LOSS",

        sensor_integrity=
            "HIGH",

        risk_level=
            50

    )


    # -----------------------------------------------------
    # DISPLAY SUMMARY
    # -----------------------------------------------------

    print(
        "\n--- SYSTEM STATUS ---"
    )

    print(
        f"System: {result['system']}"
    )

    print(
        f"Mode: {result['mode']}"
    )

    print(
        f"Scenario: {result['scenario']}"
    )

    print(
        f"System Status: {result['system_status']}"
    )


    print(
        "\n--- PIPELINE ---"
    )

    for stage in result["pipeline"]:

        print(
            f"  {stage}"
        )


    print(
        "\n--- CAPTAIN AI LENA ---"
    )

    print(
        "Recommendation:",
        result[
            "captain_ai_lena"
        ][
            "recommendation"
        ]
    )

    print(
        "Resilience State:",
        result[
            "captain_ai_lena"
        ][
            "resilience_state"
        ]
    )


    print(
        "\n--- TRIAL MANOEUVRE ---"
    )

    print(
        "Profile:",
        result[
            "trial_manoeuvre"
        ][
            "trial_manoeuvre_profile"
        ]
    )

    print(
        "Status:",
        result[
            "trial_manoeuvre"
        ][
            "trial_manoeuvre_status"
        ]
    )


    print(
        "\n--- HUMAN DECISION AUTHORITY ---"
    )

    print(
        "Status:",
        result[
            "human_decision_authority"
        ][
            "status"
        ]
    )

    print(
        "Authority:",
        result[
            "human_decision_authority"
        ][
            "authority"
        ]
    )


    print(
        "\n--- EXECUTION GATE ---"
    )

    print(
        "Physical Execution:",
        result[
            "execution_gate"
        ][
            "physical_execution"
        ]
    )

    print(
        "Automatic Execution:",
        result[
            "execution_gate"
        ][
            "automatic_execution"
        ]
    )

    print(
        "Execution Blocked:",
        result[
            "execution_gate"
        ][
            "execution_blocked"
        ]
    )

    print(
        "Reason:",
        result[
            "execution_gate"
        ][
            "reason"
        ]
    )


    print(
        "\nSTATUS: UMV SIMULATION PIPELINE OPERATIONAL"
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