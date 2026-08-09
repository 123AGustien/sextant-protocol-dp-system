File: "dp_cockpit.py"

"""
Sextant Protocol – DP Simulation Cockpit
----------------------------------------

Interactive terminal cockpit for the Sextant DP Resilience
Simulation Prototype.

Principal architecture:

    PRIMARY AI
         ↓
    SECONDARY AI
         ↓
    STABILIZER
         ↓
    HUMAN-IN-THE-LOOP
         ↓
    SIMULATED DP ACTION

Research and simulation use only.
This software is NOT certified marine control software and
must never be connected to operational vessel DP systems.
"""

from vessel_profile import VesselProfile
from environment_model import EnvironmentModel
from primary_ai import primary_ai
from secondary_ai import secondary_ai
from stabilizer import stabilizer
from human_in_loop import human_decision


def display_header():
    print("\n" + "=" * 65)
    print("        SEXTANT PROTOCOL – DP RESILIENCE COCKPIT")
    print("=" * 65)
    print("MODE: SIMULATION ONLY")
    print("ARCHITECTURE:")
    print("  PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN")
    print("=" * 65)


def display_vessel(vessel):
    print("\n--- VESSEL PROFILE ---")

    summary = vessel.summary()

    print(f"Name:          {summary['name']}")
    print(f"Type:          {summary['vessel_type']}")
    print(f"DP Class:      {summary['dp_class']}")

    dimensions = summary["dimensions_m"]

    print(
        f"Dimensions:    "
        f"{dimensions['length']}m × "
        f"{dimensions['beam']}m × "
        f"{dimensions['draft']}m"
    )

    propulsion = summary["propulsion"]

    print(
        f"Thrusters:     "
        f"{propulsion['total_thrusters']}"
    )

    print(
        f"Nominal Thrust:"
        f" {propulsion['nominal_thrust_kn']}"
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
        print("\nInvalid input. Using safe default conditions.")

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

    environmental_stress = conditions["environmental_stress"]

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

    # -------------------------------------------------
    # HUMAN-IN-THE-LOOP
    # -------------------------------------------------

    print("\n--- HUMAN-IN-THE-LOOP ---")

    risk_level = environment

    human = human_decision(
        environment,
        risk_level
    )

    print(f"Mode:          {human['mode']}")
    print(f"Override:      {human['override']}")
    print(f"Status:        {human['status']}")

    # -------------------------------------------------
    # STABILIZER
    # -------------------------------------------------

    print("\n--- STABILIZATION / ARBITRATION ---")

    final = stabilizer(
        primary,
        secondary,
        override=human["override"]
    )

    print(f"Mode:          {final['mode']}")
    print(f"Final Output:  {final['final_output']}")
    print(f"Source:        {final['source']}")
    print(f"Status:        {final['status']}")

    # -------------------------------------------------
    # FINAL SYSTEM STATE
    # -------------------------------------------------

    print("\n" + "=" * 65)
    print("              DP SIMULATION RESULT")
    print("=" * 65)

    print(f"Environmental Stress : {environment:.2f}")
    print(f"Primary AI Output    : {primary['thrust_output']:.2f}")
    print(f"Secondary AI Output  : {secondary['thrust_output']:.2f}")
    print(f"Human Override       : {human['override']}")
    print(f"Final Simulated Cmd  : {final['final_output']:.2f}")
    print(f"Decision Source      : {final['source']}")
    print(f"System Status        : {final['status']}")

    print("\n--- PRINCIPAL GOVERNANCE ---")

    if human["override"]:
        print("HUMAN AUTHORITY: OVERRIDE REQUIRED")
    else:
        print("HUMAN AUTHORITY: MONITORING / AVAILABLE")

    print("\nSIMULATION COMPLETE")
    print("SAFETY BOUNDARY: NOT FOR OPERATIONAL DP CONTROL")
    print("=" * 65)


if __name__ == "__main__":
    run_cockpit()