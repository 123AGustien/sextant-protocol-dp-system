"""
Sextant Protocol – DP Simulation Cockpit
----------------------------------------

Interactive terminal cockpit for the Sextant DP Resilience
Simulation Prototype.

Principal architecture:

    ENVIRONMENT
         ↓
    PRIMARY AI
         +
    SECONDARY AI
         ↓
    STABILIZER / RESILIENCE ARBITRATION
         ↓
    CAPTAIN AI LENA
    DECISION-SUPPORT
         ↓
    HUMAN-IN-THE-LOOP
    FINAL AUTHORITY
         ↓
    SIMULATED DP RESPONSE

Research and simulation use only.

This software is NOT certified marine control software
and must never be connected to operational vessel DP,
propulsion, navigation, steering, or safety systems.
"""


from vessel_profile import VesselProfile
from environment_model import EnvironmentModel
from primary_ai import primary_ai
from secondary_ai import secondary_ai
from stabilizer import stabilizer
from captain_ai_lena import captain_ai_lena
from human_in_loop import human_decision


def display_header():
    print("\n" + "=" * 70)
    print("          SEXTANT PROTOCOL – DP RESILIENCE COCKPIT")
    print("=" * 70)
    print("MODE: SIMULATION ONLY")
    print()
    print("ARCHITECTURE:")
    print("  ENVIRONMENT")
    print("       ↓")
    print("  PRIMARY AI + SECONDARY AI")
    print("       ↓")
    print("  STABILIZER / RESILIENCE ARBITRATION")
    print("       ↓")
    print("  CAPTAIN AI LENA — DECISION SUPPORT")
    print("       ↓")
    print("  HUMAN-IN-THE-LOOP — FINAL AUTHORITY")
    print("       ↓")
    print("  SIMULATED DP RESPONSE")
    print("=" * 70)


def display_vessel(vessel):
    print("\n--- VESSEL PROFILE ---")

    summary = vessel.summary()

    print(f"Name:           {summary['name']}")
    print(f"Type:           {summary['vessel_type']}")
    print(f"DP Class:       {summary['dp_class']}")

    dimensions = summary["dimensions_m"]

    print(
        f"Dimensions:     "
        f"{dimensions['length']}m × "
        f"{dimensions['beam']}m × "
        f"{dimensions['draft']}m"
    )

    propulsion = summary["propulsion"]

    print(
        f"Thrusters:      "
        f"{propulsion['total_thrusters']}"
    )

    print(
        f"Nominal Thrust: "
        f"{propulsion['nominal_thrust_kn']}"
    )


def display_lena(lena):
    print("\n--- CAPTAIN AI LENA — DECISION SUPPORT ---")

    print(f"Mode:                 {lena['mode']}")
    print(f"Role:                 {lena['role']}")
    print(f"Scenario:             {lena['scenario']}")
    print(f"Data Confidence:      {lena['data_confidence']}")
    print(f"Primary Output:       {lena['primary_output']:.2f}")
    print(f"Secondary Output:     {lena['secondary_output']:.2f}")
    print(f"Assessment Difference:{lena['assessment_difference']:.2f}")
    print(
        f"Assessment Relation:  "
        f"{lena['assessment_relationship']}"
    )
    print(
        f"Stabilizer Output:    "
        f"{lena['stabilizer_output']:.2f}"
    )
    print(
        f"Stabilizer Source:    "
        f"{lena['stabilizer_source']}"
    )
    print(f"Resilience State:     {lena['resilience_state']}")
    print(f"Recommendation:       {lena['recommendation']}")
    print(f"Urgency:              {lena['urgency']}")
    print(f"Response Mode:        {lena['response_mode']}")
    print(f"Human Authority:      {lena['human_authority']}")
    print(
        f"Automatic Execution:  "
        f"{lena['automatic_execution']}"
    )
    print(
        f"Execution Status:     "
        f"{lena['execution_status']}"
    )


def run_cockpit():
    """Run one complete DP simulation cycle."""

    display_header()

    # -------------------------------------------------
    # VESSEL
    # -------------------------------------------------

    vessel = VesselProfile()
    vessel.validate()

    display_vessel(vessel)

    # -------------------------------------------------
    # ENVIRONMENT
    # -------------------------------------------------

    environment_model = EnvironmentModel()

    print("\n--- ENVIRONMENT INPUT ---")

    try:
        wind = float(input("Wind stress (0-100): "))
        current = float(input("Current stress (0-100): "))
        wave = float(input("Wave stress (0-100): "))
        tidal = float(input("Tidal stress (0-100): "))

    except ValueError:

        print(
            "\nInvalid input. "
            "Using safe default conditions."
        )

        wind = 30
        current = 25
        wave = 30
        tidal = 20

    conditions = environment_model.set_conditions(
        wind=wind,
        current=current,
        wave=wave,
        tidal_effect=tidal
    )

    environmental_stress = conditions[
        "environmental_stress"
    ]

    print("\n--- ENVIRONMENT STATUS ---")

    for key, value in conditions.items():
        print(f"{key}: {value}")

    # -------------------------------------------------
    # PRINCIPAL CONTROL INPUT
    # -------------------------------------------------

    thrust = vessel.nominal_thrust_kn
    environment = environmental_stress

    # -------------------------------------------------
    # PRIMARY AI
    # -------------------------------------------------

    print("\n--- PRIMARY AI ---")

    primary = primary_ai(
        thrust,
        environment
    )

    print(f"Mode:          {primary['mode']}")
    print(f"Thrust Output: {primary['thrust_output']}")
    print(f"Status:        {primary['status']}")

    # -------------------------------------------------
    # SECONDARY AI
    # -------------------------------------------------

    print("\n--- SECONDARY AI ---")

    secondary = secondary_ai(
        environment
    )

    print(f"Mode:          {secondary['mode']}")
    print(f"Thrust Output: {secondary['thrust_output']}")
    print(f"Status:        {secondary['status']}")
    print(f"Safety Mode:   {secondary['safety_mode']}")
    print(f"Risk Level:    {secondary['risk_level']}")

    # -------------------------------------------------
    # STABILIZER / RESILIENCE ARBITRATION
    # -------------------------------------------------

    print("\n--- STABILIZER / RESILIENCE ARBITRATION ---")

    #
    # The stabilizer remains the existing deterministic
    # arbitration layer between Primary and Secondary AI.
    #
    # No Captain AI Lena decision is made before this point.
    #

    final = stabilizer(
        primary,
        secondary,
        override=False
    )

    print(f"Mode:          {final['mode']}")
    print(f"Final Output:  {final['final_output']}")
    print(f"Source:        {final['source']}")
    print(f"Status:        {final['status']}")

    # -------------------------------------------------
    # CAPTAIN AI LENA
    # -------------------------------------------------

    print("\n--- CAPTAIN AI LENA ---")

    lena = captain_ai_lena(
        stabilizer_output=final,
        environment=environment,
        scenario="DP_ENVIRONMENTAL_ASSESSMENT",
        sensor_integrity="HIGH"
    )

    display_lena(lena)

    # -------------------------------------------------
    # HUMAN-IN-THE-LOOP
    # -------------------------------------------------

    print("\n--- HUMAN-IN-THE-LOOP ---")

    #
    # Human authority receives the assessed situation
    # and Captain AI Lena decision-support.
    #
    # The human remains the final authority.
    #

    risk_level = environment

    human = human_decision(
        environment,
        risk_level
    )

    print(f"Mode:          {human['mode']}")
    print(f"Override:      {human['override']}")
    print(f"Status:        {human['status']}")

    # -------------------------------------------------
    # FINAL SYSTEM STATE
    # -------------------------------------------------

    print("\n" + "=" * 70)
    print("                DP SIMULATION RESULT")
    print("=" * 70)

    print(
        f"Environmental Stress : "
        f"{environment:.2f}"
    )

    print(
        f"Primary AI Output    : "
        f"{primary['thrust_output']:.2f}"
    )

    print(
        f"Secondary AI Output  : "
        f"{secondary['thrust_output']:.2f}"
    )

    print(
        f"Secondary Risk       : "
        f"{secondary['risk_level']}"
    )

    print(
        f"Stabilizer Output    : "
        f"{final['final_output']:.2f}"
    )

    print(
        f"Stabilizer Source    : "
        f"{final['source']}"
    )

    print(
        f"Lena Resilience State: "
        f"{lena['resilience_state']}"
    )

    print(
        f"Lena Recommendation  : "
        f"{lena['recommendation']}"
    )

    print(
        f"Lena Urgency         : "
        f"{lena['urgency']}"
    )

    print(
        f"Human Override       : "
        f"{human['override']}"
    )

    # -------------------------------------------------
    # GOVERNANCE
    # -------------------------------------------------

    print("\n--- PRINCIPAL GOVERNANCE ---")

    print(
        "CAPTAIN AI LENA: "
        "DECISION SUPPORT ONLY"
    )

    print(
        "HUMAN AUTHORITY: "
        "FINAL"
    )

    print(
        "AUTOMATIC EXECUTION: "
        "DISABLED"
    )

    print(
        "DP RESPONSE: "
        "SIMULATION ONLY"
    )

    # -------------------------------------------------
    # SAFETY BOUNDARY
    # -------------------------------------------------

    print("\n--- SAFETY BOUNDARY ---")

    print(
        "NO OPERATIONAL DP CONTROL"
    )

    print(
        "NO REAL VESSEL CONNECTION"
    )

    print(
        "NO AUTOMATIC PHYSICAL EXECUTION"
    )

    print(
        "RESEARCH / SIMULATION ONLY"
    )

    print("\nSIMULATION COMPLETE")
    print("=" * 70)


if __name__ == "__main__":
    run_cockpit()