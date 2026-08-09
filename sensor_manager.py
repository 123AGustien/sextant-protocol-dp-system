"""
Sensor Manager Module – Sextant DP System

Simulates navigation, motion-reference, environmental and
position-reference inputs for DP resilience testing.

Research and simulation use only.
This module does not interface with real vessel sensors,
navigation equipment, or certified DP systems.
"""

from dataclasses import dataclass, field
from typing import Dict


@dataclass
class SensorManager:
    """
    Simulated sensor and position-reference management layer.
    """

    gnss_available: bool = True
    gyro_available: bool = True
    motion_reference_available: bool = True
    laser_reference_available: bool = True

    wind_sensor_available: bool = True
    current_sensor_available: bool = True

    # Simulated vessel state
    position_x: float = 0.0
    position_y: float = 0.0
    heading: float = 0.0

    # Sensor degradation flags
    degraded_sensors: Dict[str, bool] = field(default_factory=dict)

    def read_sensors(self, environment):
        """
        Generate a simulated sensor state from the
        environmental model.
        """

        return {
            "position": {
                "x": round(self.position_x, 3),
                "y": round(self.position_y, 3),
            },
            "heading": round(self.heading, 2),

            "gnss": self._sensor_status(
                "GNSS",
                self.gnss_available
            ),

            "gyro": self._sensor_status(
                "GYRO",
                self.gyro_available
            ),

            "motion_reference": self._sensor_status(
                "MOTION_REFERENCE",
                self.motion_reference_available
            ),

            "laser_reference": self._sensor_status(
                "LASER_REFERENCE",
                self.laser_reference_available
            ),

            "wind_sensor": self._sensor_status(
                "WIND_SENSOR",
                self.wind_sensor_available
            ),

            "current_sensor": self._sensor_status(
                "CURRENT_SENSOR",
                self.current_sensor_available
            ),

            "environment": environment.get_conditions(),
        }

    def _sensor_status(self, name, available):
        """
        Return standardized simulated sensor status.
        """

        degraded = self.degraded_sensors.get(name, False)

        if not available:
            return {
                "available": False,
                "status": "FAILED",
            }

        if degraded:
            return {
                "available": True,
                "status": "DEGRADED",
            }

        return {
            "available": True,
            "status": "NORMAL",
        }

    def degrade_sensor(self, sensor_name):
        """
        Simulate degradation of a sensor.
        """

        self.degraded_sensors[sensor_name] = True

    def restore_sensor(self, sensor_name):
        """
        Restore a degraded simulated sensor.
        """

        self.degraded_sensors[sensor_name] = False

    def fail_sensor(self, sensor_name):
        """
        Simulate complete sensor failure.
        """

        sensor_map = {
            "GNSS": "gnss_available",
            "GYRO": "gyro_available",
            "MOTION_REFERENCE": "motion_reference_available",
            "LASER_REFERENCE": "laser_reference_available",
            "WIND_SENSOR": "wind_sensor_available",
            "CURRENT_SENSOR": "current_sensor_available",
        }

        if sensor_name not in sensor_map:
            raise ValueError(
                f"Unknown sensor: {sensor_name}"
            )

        setattr(self, sensor_map[sensor_name], False)

    def restore_failed_sensor(self, sensor_name):
        """
        Restore a failed simulated sensor.
        """

        sensor_map = {
            "GNSS": "gnss_available",
            "GYRO": "gyro_available",
            "MOTION_REFERENCE": "motion_reference_available",
            "LASER_REFERENCE": "laser_reference_available",
            "WIND_SENSOR": "wind_sensor_available",
            "CURRENT_SENSOR": "current_sensor_available",
        }

        if sensor_name not in sensor_map:
            raise ValueError(
                f"Unknown sensor: {sensor_name}"
            )

        setattr(self, sensor_map[sensor_name], True)

    def update_vessel_state(
        self,
        position_x=None,
        position_y=None,
        heading=None
    ):
        """
        Update the simulated vessel navigation state.
        """

        if position_x is not None:
            self.position_x = position_x

        if position_y is not None:
            self.position_y = position_y

        if heading is not None:
            self.heading = heading % 360

    def reference_count(self):
        """
        Return the number of available position references.
        """

        references = [
            self.gnss_available,
            self.motion_reference_available,
            self.laser_reference_available,
        ]

        return sum(references)

    def health_status(self):
        """
        Return overall simulated sensor health.
        """

        total = 6
        available = sum([
            self.gnss_available,
            self.gyro_available,
            self.motion_reference_available,
            self.laser_reference_available,
            self.wind_sensor_available,
            self.current_sensor_available,
        ])

        if available == total:
            status = "ALL_SENSORS_NORMAL"
        elif available >= 4:
            status = "SENSOR_DEGRADED"
        else:
            status = "SENSOR_CRITICAL"

        return {
            "total_sensors": total,
            "available_sensors": available,
            "position_references": self.reference_count(),
            "status": status,
        }


def create_sensor_manager():
    """
    Create and return a new simulated sensor manager.
    """

    return SensorManager()


if __name__ == "__main__":

    from environment_model import create_environment_model

    environment = create_environment_model()

    environment.set_conditions(
        wind=40,
        current=35,
        wave=45,
        tidal_effect=30
    )

    sensors = create_sensor_manager()

    sensor_data = sensors.read_sensors(environment)

    print("\n=== SEXTANT DP SENSOR MANAGER ===")

    print("\nSensor State:")

    for key, value in sensor_data.items():
        print(f"{key}: {value}")

    print("\nSensor Health:")
    print(sensors.health_status())

    print("\nSTATUS: SENSOR MANAGER OPERATIONAL")
    print("MODE: SIMULATION ONLY")
    print("SAFETY BOUNDARY: NOT FOR OPERATIONAL DP CONTROL")