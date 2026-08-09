"""
Environment Model Module – Sextant DP System

Simulates environmental conditions for DP resilience testing.
Research and simulation use only.
"""


class EnvironmentModel:
    """
    Generates simulated marine environmental conditions.
    """

    def __init__(self):
        self.wind = 0
        self.current = 0
        self.wave = 0
        self.tidal_effect = 0
        self.environmental_stress = 0

    def set_conditions(
        self,
        wind,
        current,
        wave,
        tidal_effect
    ):
        """
        Set simulated environmental conditions.
        """

        self.wind = max(0, min(100, wind))
        self.current = max(0, min(100, current))
        self.wave = max(0, min(100, wave))
        self.tidal_effect = max(0, min(100, tidal_effect))

        self.environmental_stress = (
            self.wind * 0.30
            + self.current * 0.25
            + self.wave * 0.30
            + self.tidal_effect * 0.15
        )

        return self.get_conditions()

    def get_conditions(self):
        """
        Return current environmental conditions.
        """

        return {
            "wind": self.wind,
            "current": self.current,
            "wave": self.wave,
            "tidal_effect": self.tidal_effect,
            "environmental_stress": round(
                self.environmental_stress, 2
            )
        }


def create_environment_model():
    """
    Create and return a new environment model.
    """

    return EnvironmentModel()


if __name__ == "__main__":

    environment = create_environment_model()

    conditions = environment.set_conditions(
        wind=40,
        current=35,
        wave=45,
        tidal_effect=30
    )

    print("\n=== SEXTANT DP ENVIRONMENT MODEL ===")

    for key, value in conditions.items():
        print(f"{key}: {value}")

    print("\nSTATUS: ENVIRONMENT MODEL OPERATIONAL")
    print("MODE: SIMULATION ONLY")
    print("SAFETY BOUNDARY: NOT FOR OPERATIONAL DP CONTROL")