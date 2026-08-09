File: "dp_cockpit_ui.py"

"""
Sextant Protocol – DP Simulation Cockpit UI
--------------------------------------------

Graphical simulation interface for the Sextant DP Resilience
Research Prototype.

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

SAFETY BOUNDARY:
This software is NOT certified marine control software.
It must never be connected to operational vessel DP,
propulsion, navigation, or safety systems.
All vessel behaviour and control responses are simulated.
"""

import tkinter as tk
from tkinter import messagebox

from vessel_profile import VesselProfile
from environment_model import EnvironmentModel
from primary_ai import primary_ai
from secondary_ai import secondary_ai
from stabilizer import stabilizer
from human_in_loop import human_decision


class DPCockpitUI:

    def __init__(self, root):

        self.root = root

        self.root.title(
            "Sextant Protocol – DP Resilience Cockpit"
        )

        self.root.geometry("900x700")

        self.vessel = VesselProfile()
        self.environment_model = EnvironmentModel()

        self.build_interface()

    # -------------------------------------------------
    # INTERFACE
    # -------------------------------------------------

    def build_interface(self):

        title = tk.Label(
            self.root,
            text="SEXTANT PROTOCOL – DP RESILIENCE COCKPIT",
            font=("Arial", 18, "bold")
        )

        title.pack(pady=10)

        subtitle = tk.Label(
            self.root,
            text="SIMULATION ONLY • PRIMARY AI → SECONDARY AI → STABILIZER → HUMAN",
            font=("Arial", 10)
        )

        subtitle.pack(pady=5)

        # -------------------------------------------------
        # VESSEL PROFILE
        # -------------------------------------------------

        vessel_frame = tk.LabelFrame(
            self.root,
            text="VESSEL PROFILE",
            padx=10,
            pady=10
        )

        vessel_frame.pack(
            fill="x",
            padx=15,
            pady=8
        )

        vessel = self.vessel.summary()

        dimensions = vessel["dimensions_m"]
        propulsion = vessel["propulsion"]

        vessel_text = (
            f"Name: {vessel['name']}    "
            f"Type: {vessel['vessel_type']}    "
            f"DP: {vessel['dp_class']}\n"
            f"Dimensions: "
            f"{dimensions['length']}m × "
            f"{dimensions['beam']}m × "
            f"{dimensions['draft']}m    "
            f"Thrusters: {propulsion['total_thrusters']}    "
            f"Nominal Thrust: {propulsion['nominal_thrust_kn']}"
        )

        tk.Label(
            vessel_frame,
            text=vessel_text,
            justify="left"
        ).pack(anchor="w")

        # -------------------------------------------------
        # ENVIRONMENT INPUTS
        # -------------------------------------------------

        input_frame = tk.LabelFrame(
            self.root,
            text="ENVIRONMENTAL SIMULATION INPUT",
            padx=10,
            pady=10
        )

        input_frame.pack(
            fill="x",
            padx=15,
            pady=8
        )

        self.wind = self.create_input(
            input_frame,
            "Wind Stress (0–100):",
            30
        )

        self.current = self.create_input(
            input_frame,
            "Current Stress (0–100):",
            25
        )

        self.wave = self.create_input(
            input_frame,
            "Wave Stress (0–100):",
            30
        )

        self.tidal = self.create_input(
            input_frame,
            "Tidal Stress (0–100):",
            20
        )

        # -------------------------------------------------
        # CONTROL BUTTONS
        # -------------------------------------------------

        button_frame = tk.Frame(self.root)

        button_frame.pack(pady=10)

        tk.Button(
            button_frame,
            text="▶ RUN DP SIMULATION",
            command=self.run_simulation,
            width=25,
            height=2
        ).pack(
            side="left",
            padx=10
        )

        tk.Button(
            button_frame,
            text="RESET",
            command=self.reset,
            width=15,
            height=2
        ).pack(
            side="left",
            padx=10
        )

        # -------------------------------------------------
        # SYSTEM RESULT
        # -------------------------------------------------

        result_frame = tk.LabelFrame(
            self.root,
            text="SYSTEM ASSESSMENT",
            padx=10,
            pady=10
        )

        result_frame.pack(
            fill="both",
            expand=True,
            padx=15,
            pady=8
        )

        self.result_text = tk.Text(
            result_frame,
            height=18,
            width=100,
            state="disabled",
            font=("Courier", 10)
        )

        self.result_text.pack(
            fill="both",
            expand=True
        )

        # -------------------------------------------------
        # SAFETY BOUNDARY
        # -------------------------------------------------

        tk.Label(
            self.root,
            text=(
                "SAFETY BOUNDARY: SIMULATION ONLY — "
                "NOT FOR OPERATIONAL DP CONTROL"
            ),
            font=("Arial", 9, "bold")
        ).pack(pady=8)

    # -------------------------------------------------
    # INPUT CREATION
    # -------------------------------------------------

    def create_input(self, parent, label, default):

        frame = tk.Frame(parent)

        frame.pack(
            fill="x",
            pady=3
        )

        tk.Label(
            frame,
            text=label,
            width=25,
            anchor="w"
        ).pack(side="left")

        entry = tk.Entry(
            frame,
            width=15
        )

        entry.insert(
            0,
            str(default)
        )

        entry.pack(side="left")

        return entry

    # -------------------------------------------------
    # SIMULATION
    # -------------------------------------------------

    def run_simulation(self):

        try:

            wind = float(self.wind.get())
            current = float(self.current.get())
            wave = float(self.wave.get())
            tidal = float(self.tidal.get())

            values = [
                wind,
                current,
                wave,
                tidal
            ]

            if any(
                value < 0 or value > 100
                for value in values
            ):
                raise ValueError

        except ValueError:

            messagebox.showerror(
                "Invalid Input",
                "All environmental inputs must be between 0 and 100."
            )

            return

        # -------------------------------------------------
        # ENVIRONMENT
        # -------------------------------------------------

        conditions = self.environment_model.set_conditions(
            wind=wind,
            current=current,
            wave=wave,
            tidal_effect=tidal
        )

        environment = conditions[
            "environmental_stress"
        ]

        thrust = self.vessel.nominal_thrust_kn

        # -------------------------------------------------
        # PRIMARY AI
        # -------------------------------------------------

        primary = primary_ai(
            thrust,
            environment
        )

        # -------------------------------------------------
        # SECONDARY AI
        # -------------------------------------------------

        secondary = secondary_ai(
            environment
        )

        # -------------------------------------------------
        # HUMAN-IN-THE-LOOP
        # -------------------------------------------------

        risk_level = environment

        human = human_decision(
            environment,
            risk_level
        )

        # -------------------------------------------------
        # STABILIZER
        # -------------------------------------------------

        final = stabilizer(
            primary,
            secondary,
            override=human["override"]
        )

        # -------------------------------------------------
        # DISPLAY RESULT
        # -------------------------------------------------

        result = f"""
============================================================
             SEXTANT DP SIMULATION RESULT
============================================================

ENVIRONMENT
------------------------------------------------------------
Wind Stress       : {wind:.2f}
Current Stress    : {current:.2f}
Wave Stress       : {wave:.2f}
Tidal Stress      : {tidal:.2f}
Environmental
Stress            : {environment:.2f}

PRIMARY AI
------------------------------------------------------------
Mode              : {primary["mode"]}
Thrust Output     : {primary["thrust_output"]:.2f}
Status            : {primary["status"]}

SECONDARY AI
------------------------------------------------------------
Mode              : {secondary["mode"]}
Thrust Output     : {secondary["thrust_output"]:.2f}
Status            : {secondary["status"]}
Safety Mode       : {secondary["safety_mode"]}

HUMAN-IN-THE-LOOP
------------------------------------------------------------
Mode              : {human["mode"]}
Override          : {human["override"]}
Status            : {human["status"]}

STABILIZER
------------------------------------------------------------
Mode              : {final["mode"]}
Final Output      : {final["final_output"]:.2f}
Source            : {final["source"]}
Status            : {final["status"]}

============================================================
PRINCIPAL GOVERNANCE
============================================================

Primary AI        : ACTIVE
Secondary AI      : ACTIVE
Stabilizer        : ACTIVE
Human Authority   : {"OVERRIDE REQUIRED" if human["override"] else "MONITORING / AVAILABLE"}

FINAL SIMULATED STATE
------------------------------------------------------------
Environmental
Stress            : {environment:.2f}

Simulated Command : {final["final_output"]:.2f}

Decision Source   : {final["source"]}

System Status     : {final["status"]}

============================================================
SIMULATION COMPLETE
SAFETY BOUNDARY: NOT FOR OPERATIONAL DP CONTROL
============================================================
"""

        self.result_text.config(
            state="normal"
        )

        self.result_text.delete(
            "1.0",
            tk.END
        )

        self.result_text.insert(
            tk.END,
            result
        )

        self.result_text.config(
            state="disabled"
        )

    # -------------------------------------------------
    # RESET
    # -------------------------------------------------

    def reset(self):

        self.wind.delete(0, tk.END)
        self.wind.insert(0, "30")

        self.current.delete(0, tk.END)
        self.current.insert(0, "25")

        self.wave.delete(0, tk.END)
        self.wave.insert(0, "30")

        self.tidal.delete(0, tk.END)
        self.tidal.insert(0, "20")

        self.result_text.config(
            state="normal"
        )

        self.result_text.delete(
            "1.0",
            tk.END
        )

        self.result_text.config(
            state="disabled"
        )


# -------------------------------------------------
# APPLICATION ENTRY POINT
# -------------------------------------------------

if __name__ == "__main__":

    root = tk.Tk()

    app = DPCockpitUI(root)

    root.mainloop()