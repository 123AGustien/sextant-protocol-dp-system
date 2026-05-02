"""
Sextant Protocol – DP Simulation Engine
Stress testing Primary + Secondary AI + Human-in-loop system
"""

import random
import time

from primary_ai import primary_ai
from secondary_ai import secondary_ai
from stabilizer import stabilizer
from human_in_loop import human_decision


def run_simulation():
    print("\n=== SEXTANT DP SIMULATION STARTED ===\n")

    thrust = 100

    for step in range(10):

        # Simulated environmental disturbance (tidal surge / storm spikes)
        environment = random.randint(10, 120)
        risk_level = environment

        # PRIMARY AI OUTPUT
        primary = primary_ai(thrust, environment)

        # SECONDARY AI OUTPUT
        secondary = secondary_ai(environment)

        # HUMAN DECISION
        human = human_decision(environment, risk_level)

        # STABILIZER LOGIC
        final = stabilizer(
            primary,
            secondary,
            override=human["override"]
        )

        print(f"Step: {step + 1}")
        print(f"Environment: {environment}")
        print(f"Primary AI: {primary['thrust_output']}")
        print(f"Secondary AI: {secondary['thrust_output']}")
        print(f"Human Override: {human['override']}")
        print(f"Final Output: {final['final_output']}")
        print(f"Status: {final['status']}")
        print("-" * 50)

        time.sleep(0.5)


if __name__ == "__main__":
    run_simulation()
