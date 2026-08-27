"""
Sextant Autonomous UMV System
Validation Layer
----------------

Purpose:
Deterministic validation of the complete UMV simulation pipeline.

Validation sequence:

    PRIMARY AI
         ↓
    SECONDARY AI
         ↓
    STABILIZER
         ↓
    CAPTAIN AI LENA
         ↓
    TRIAL MANOEUVRE
         ↓
    HUMAN DECISION AUTHORITY
         ↓
    EXECUTION GATE

This module validates the simulation architecture and
structured outputs.

It does NOT control:

    - UMV propulsion
    - steering
    - navigation
    - thrusters
    - actuators
    - physical manoeuvres

Research, development and simulation use only.
This module is NOT certified autonomous marine control software.
"""


from umv_system import run_umv_simulation


MODULE_NAME = "UMV Validation Layer"
MODULE_VERSION = "1.0.0"


# =========================================================
# VALIDATION HELPERS
# =========================================================

def _require(
    condition,
    message
):
    """
    Raise an assertion error when a validation
    condition is not satisfied.
    """

    if not condition:
        raise AssertionError(message)


# =========================================================
# COMPLETE PIPELINE VALIDATION
# =========================================================

def validate_umv_pipeline(
    primary_output,
    secondary_output,
    stabilizer_output,
    environment=0.0,
    scenario="NORMAL",
    sensor_integrity="HIGH",
    risk_level=0.0
):
    """
    Validate the complete UMV simulation pipeline.

    Returns
    -------
    dict
        Structured validation result.
    """

    # -----------------------------------------------------
    # RUN COMPLETE PIPELINE
    # -----------------------------------------------------

    result = run_umv_simulation(

        primary_output=
            primary_output,

        secondary_output=
            secondary_output,

        stabilizer_output=
            stabilizer_output,

        environment=
            environment,

        scenario=
            scenario,

        sensor_integrity=
            sensor_integrity,

        risk_level=
            risk_level

    )


    # =====================================================
    # SYSTEM VALIDATION
    # =====================================================

    _require(
        result["simulation_only"] is True,
        "Simulation-only flag missing."
    )


    _require(
        result["system_status"] ==
        "SIMULATION_COMPLETE",
        "System simulation did not complete."
    )


    # =====================================================
    # PIPELINE VALIDATION
    # =====================================================

    expected_pipeline = [

        "PRIMARY_AI",

        "SECONDARY_AI",

        "STABILIZER",

        "CAPTAIN_AI_LENA",

        "TRIAL_MANOEUVRE",

        "HUMAN_DECISION_AUTHORITY"

    ]


    _require(
        result["pipeline"] ==
        expected_pipeline,
        "UMV pipeline sequence is incorrect."
    )


    # =====================================================
    # CAPTAIN AI LENA VALIDATION
    # =====================================================

    lena = result[
        "captain_ai_lena"
    ]


    _require(
        lena["mode"] ==
        "CAPTAIN_AI_LENA",
        "Captain AI Lena mode invalid."
    )


    _require(
        lena["role"] ==
        "DECISION_SUPPORT",
        "Captain AI Lena role invalid."
    )


    _require(
        lena["automatic_execution"] is False,
        "Captain AI Lena automatic execution must remain false."
    )


    _require(
        lena["physical_execution"] is False,
        "Captain AI Lena physical execution must remain false."
    )


    # =====================================================
    # TRIAL MANOEUVRE VALIDATION
    # =====================================================

    trial = result[
        "trial_manoeuvre"
    ]


    _require(
        trial["mode"] ==
        "UMV_TRIAL_MANOEUVRE",
        "Trial manoeuvre mode invalid."
    )


    _require(
        trial["automatic_execution"] is False,
        "Trial manoeuvre automatic execution must remain false."
    )


    _require(
        trial["physical_execution"] is False,
        "Trial manoeuvre physical execution must remain false."
    )


    _require(
        trial["human_authority"] ==
        "FINAL",
        "Trial manoeuvre human authority invalid."
    )


    # =====================================================
    # HUMAN AUTHORITY VALIDATION
    # =====================================================

    human = result[
        "human_decision_authority"
    ]


    _require(
        human["mode"] ==
        "UMV_HUMAN_DECISION_AUTHORITY",
        "Human Decision Authority mode invalid."
    )


    _require(
        human["authority"] ==
        "HUMAN_FINAL_AUTHORITY",
        "Human final authority is not established."
    )


    _require(
        human["automatic_execution"] is False,
        "Human authority automatic execution must remain false."
    )


    _require(
        human["physical_execution"] is False,
        "Human authority physical execution must remain false."
    )


    # =====================================================
    # FINAL EXECUTION GATE VALIDATION
    # =====================================================

    execution_gate = result[
        "execution_gate"
    ]


    _require(
        execution_gate["physical_execution"] is False,
        "Physical execution gate must remain false."
    )


    _require(
        execution_gate["automatic_execution"] is False,
        "Automatic execution gate must remain false."
    )


    _require(
        execution_gate["execution_blocked"] is True,
        "Physical execution must remain blocked."
    )


    # =====================================================
    # VALIDATION RESULT
    # =====================================================

    return {

        "module":
            MODULE_NAME,

        "version":
            MODULE_VERSION,

        "validation":
            "PASS",

        "system_status":
            "SIMULATION_COMPLETE",

        "pipeline_status":
            "VALID",

        "captain_ai_lena":
            "VALID",

        "trial_manoeuvre":
            "VALID",

        "human_decision_authority":
            "VALID",

        "physical_execution":
            False,

        "automatic_execution":
            False,

        "execution_gate":
            "BLOCKED",

        "human_authority":
            "FINAL",

        "mode":
            "SIMULATION_ONLY",

        "message":
            "UMV simulation pipeline validation completed successfully."

    }


# =========================================================
# TEST
# =========================================================

if __name__ == "__main__":

    print(
        "\n=== SEXTANT AUTONOMOUS UMV VALIDATION ==="
    )


    primary = {

        "thrust_output":
            70,

        "status":
            "SIMULATED"

    }


    secondary = {

        "thrust_output":
            50,

        "status":
            "SIMULATED"

    }


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


    validation = validate_umv_pipeline(

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


    print(
        "\n--- VALIDATION RESULT ---"
    )


    for key, value in validation.items():

        print(
            f"{key}: {value}"
        )


    print(
        "\nSTATUS: UMV VALIDATION PASS"
    )

    print(
        "PIPELINE: VALID"
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
        "EXECUTION GATE: BLOCKED"
    )

    print(
        "MODE: SIMULATION ONLY"
    )