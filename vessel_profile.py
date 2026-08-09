"""
Sextant Protocol – DP Vessel Profile
Simulation configuration layer

IMPORTANT:
This is a research/simulation profile only.
It does not represent certified data for PT CYSCAN
or any other real vessel.
"""

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class VesselProfile:
    """Configurable vessel model for DP simulation."""

    name: str = "SEXTANT-DP-SIM"
    vessel_type: str = "Offshore Support Vessel"

    # Simulation classification only.
    dp_class: str = "DP2-SIMULATED"

    # Principal dimensions – simulation defaults only.
    length_m: float = 85.0
    beam_m: float = 20.0
    draft_m: float = 6.0

    # Simulated propulsion configuration.
    main_thrusters: int = 2
    tunnel_thrusters: int = 2

    # Nominal simulated total thrust.
    nominal_thrust_kn: float = 100.0

    # Environmental simulation limits.
    max_wind_kn: float = 50.0
    max_current_kn: float = 3.0
    max_wave_height_m: float = 5.0

    # Simulated position reference systems.
    position_references: List[str] = field(
        default_factory=lambda: [
            "GNSS",
            "GYRO",
            "MOTION_REFERENCE",
            "LASER_REFERENCE",
        ]
    )

    metadata: Dict[str, str] = field(default_factory=dict)

    def total_thrusters(self) -> int:
        """Return total simulated thruster count."""
        return self.main_thrusters + self.tunnel_thrusters

    def validate(self) -> bool:
        """Validate the vessel configuration."""

        if self.length_m <= 0:
            raise ValueError("Vessel length must be greater than zero.")

        if self.beam_m <= 0:
            raise ValueError("Vessel beam must be greater than zero.")

        if self.draft_m <= 0:
            raise ValueError("Vessel draft must be greater than zero.")

        if self.main_thrusters < 0:
            raise ValueError("Main thruster count cannot be negative.")

        if self.tunnel_thrusters < 0:
            raise ValueError("Tunnel thruster count cannot be negative.")

        if self.nominal_thrust_kn <= 0:
            raise ValueError("Nominal thrust must be greater than zero.")

        return True

    def summary(self) -> Dict:
        """Return structured vessel information."""

        return {
            "name": self.name,
            "vessel_type": self.vessel_type,
            "dp_class": self.dp_class,
            "dimensions_m": {
                "length": self.length_m,
                "beam": self.beam_m,
                "draft": self.draft_m,
            },
            "propulsion": {
                "main_thrusters": self.main_thrusters,
                "tunnel_thrusters": self.tunnel_thrusters,
                "total_thrusters": self.total_thrusters(),
                "nominal_thrust_kn": self.nominal_thrust_kn,
            },
            "environmental_limits": {
                "max_wind_kn": self.max_wind_kn,
                "max_current_kn": self.max_current_kn,
                "max_wave_height_m": self.max_wave_height_m,
            },
            "position_references": list(self.position_references),
        }


if __name__ == "__main__":
    vessel = VesselProfile()

    vessel.validate()

    print("=== SEXTANT DP VESSEL PROFILE ===")

    for key, value in vessel.summary().items():
        print(f"{key}: {value}")