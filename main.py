"""
Sextant Protocol – DP Control System (Simulation Core)
Primary vs Secondary AI + Human-in-loop
"""

import random
import time


# ----------------------------
# PRIMARY AI (Standard DP Logic)
# ----------------------------
def primary_ai(thrust, environment):
    adjustment = thrust - (environment * 0.8)
    return adjustment


# ----------------------------
# SECONDARY AI (Safety Override Logic)
# ----------------------------
def secondary_ai(environment):
    # Conservative safety model
    safe_limit = 50
    return max(0, safe_limit - environment)


# ----------------------------
# HUMAN IN THE LOOP
# ----------------------------
def human_override(environment):
    # Human intervenes in extreme conditions
    if environment > 85:
        return True
    return False


# ----------------------------
# STABILIZER (Prevents oscillation)
# ----------------------------
def stabilizer(primary_output, secondary_output, override=False):

    if override:
        return secondary_output

    # blended control logic
    return (primary_output * 0.7) + (secondary_output * 0.3)


# ----------------------------
# SIMULATION ENGINE
# ----------------------------
def run_system():

    thrust = 100

    print("\nSextant Protocol DP System Starting...\n")

    for step in range(10):

        # Simulated environmental spike (tidal surge)
        environment = random.randint(10, 120)

        primary = primary_ai(thrust, environment)
        secondary = secondary_ai(environment)

        override = human_override(environment)

        final_output = stabilizer(primary, secondary, override)

        print(f"Step {step+1}")
        print(f"Environment: {environment}")
        print(f"Primary AI Output: {primary}")
        print(f"Secondary AI Output: {secondary}")
        print(f"Human Override: {override}")
        print(f"Final Control Output: {final_output}")
        print("-" * 40)

        time.sleep(0.5)


# ----------------------------
# ENTRY POINT
# ----------------------------
if __name__ == "__main__":
    run_system()
