/* ============================================================
 * SEXTANT PROTOCOL™
 * DP RESILIENCE V&V RESEARCH COCKPIT
 *
 * Controller Version: v2.6.3
 * Simulation Engine: v1.2.0
 * Recommended Actions: SPD-DP-RECOMMENDED-ACTIONS-V1.2
 *
 * RESEARCH / V&V ONLY
 * NO OPERATIONAL VESSEL CONNECTION
 * NO AUTONOMOUS COMMAND
 * HUMAN AUTHORITY REMAINS FINAL
 *
 * GOLDEN RULE:
 * OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE
 *
 * IMPORTANT DISTINCTIONS:
 * BIAS / NON-BIAS = POSITIONING MODE
 * NORMAL / PUSH-UP = ENGINE LOAD MODE
 * PUSH-UP ≠ POSITIONING BIAS
 * PUSH-UP REQUIRES RESERVE-POWER VERIFICATION
 *
 * v2.6.3 FIXES:
 * 1. Reads authoritative HTML environment IDs:
 *    wind / current / wave / tidal
 * 2. Scenario buttons write to authoritative HTML IDs.
 * 3. Reserve display reads result.reservePowerVerification
 *    directly from the authoritative simulation engine.
 * 4. Reserve verification fails closed if authoritative
 *    reserve data is absent.
 * 5. Decision trace gate and execution gate remain separate.
 * 6. Human-authority functions are exposed globally for
 *    inline HTML onclick compatibility.
 * ============================================================ */

(function () {
  "use strict";

  /* ==========================================================
   * MODULE IDENTITY
   * ========================================================== */

  const MODULE_NAME = "SextantDPResilienceCockpit";
  const VERSION = "2.6.3";
  const SIMULATION_ENGINE_VERSION = "1.2.0";
  const RECOMMENDED_ACTIONS_VERSION =
    "SPD-DP-RECOMMENDED-ACTIONS-V1.2";

  /* ==========================================================
   * SAFETY BOUNDARY
   * ========================================================== */

  const SAFETY_BOUNDARY = Object.freeze({
    simulationOnly: true,
    autonomousExecution: false,
    operationalVesselConnection: false,
    actuatorInterface: false,
    externalSystemCommand: false,
    humanAuthorityFinal: true,
    realDPCommand: false,
    researchAndVerificationOnly: true
  });

  /* ==========================================================
   * FIXED SYSTEM DEFINITIONS
   * ========================================================== */

  const POSITIONING_MODES = Object.freeze({
    NON_BIAS: "NON_BIAS",
    BIAS: "BIAS"
  });

  const ENGINE_LOAD_MODES = Object.freeze({
    NORMAL: "NORMAL",
    PUSH_UP: "PUSH_UP"
  });

  const HUMAN_DECISIONS = Object.freeze({
    ACKNOWLEDGE: "ACKNOWLEDGE_CONDITION",
    MAINTAIN_SAFE_STATE: "MAINTAIN_SAFE_STATE",
    AUTHORIZE_SIMULATED_RESPONSE:
      "AUTHORIZE_SIMULATED_RESPONSE"
  });

  const DEFAULT_LENA_MESSAGE =
    "Maintain the simulated safe state and continue monitoring the assessed conditions.";

  /* ==========================================================
   * INTERNAL STATE
   * ========================================================== */

  let lastEnvironment = null;
  let lastResult = null;
  let lastRecommendedAction = null;
  let humanDecisionState = "PENDING";
  let simulationHasRun = false;

  /* ==========================================================
   * DOM HELPERS
   * ========================================================== */

  function getElement(id) {
    return document.getElementById(id);
  }

  function getFirstElement(ids) {
    for (const id of ids) {
      const element = getElement(id);

      if (element) {
        return element;
      }
    }

    return null;
  }

  function setText(ids, value) {
    const list = Array.isArray(ids)
      ? ids
      : [ids];

    const element = getFirstElement(list);

    if (!element) {
      return;
    }

    element.textContent =
      value === undefined ||
      value === null ||
      value === ""
        ? "—"
        : String(value);
  }

  function setTextAll(ids, value) {
    const list = Array.isArray(ids)
      ? ids
      : [ids];

    list.forEach(function (id) {
      const element = getElement(id);

      if (!element) {
        return;
      }

      element.textContent =
        value === undefined ||
        value === null ||
        value === ""
          ? "—"
          : String(value);
    });
  }

  function setValue(id, value) {
    const element = getElement(id);

    if (!element) {
      return;
    }

    element.value =
      value === undefined ||
      value === null
        ? ""
        : String(value);
  }

  function readValue(id, fallback = 0) {
    const element = getElement(id);

    if (!element) {
      return fallback;
    }

    const value = Number(element.value);

    return Number.isFinite(value)
      ? value
      : fallback;
  }

  function readSelect(id, fallback) {
    const element = getElement(id);

    if (!element) {
      return fallback;
    }

    return element.value || fallback;
  }

  function safeJSON(value) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }

  function clamp(value, min, max) {
    return Math.max(
      min,
      Math.min(max, value)
    );
  }

  /* ==========================================================
   * SAFETY DISPLAY
   * ========================================================== */

  function updateSafetyDisplay() {
    setText(
      [
        "safetyBoundary",
        "safetyStatus",
        "researchMode"
      ],
      "V&V RESEARCH MODE — HUMAN AUTHORITY REQUIRED"
    );

    setText(
      [
        "autonomousCommand",
        "autonomousStatus"
      ],
      "FALSE — NO AUTONOMOUS COMMAND"
    );

    setText(
      [
        "simulationOnly",
        "simulationStatus"
      ],
      "SIMULATION ONLY"
    );
  }

  /* ==========================================================
   * ENGINE DISCOVERY
   * ========================================================== */

  function getSimulationEngine() {
    const candidates = [
      window.SextantDPSimulationEngine,
      window.SextantDPSimulationEngineV1,
      window.DPSimulationEngine,
      window.DPResilienceSimulationEngine,
      window.SextantSimulationEngine
    ];

    for (const candidate of candidates) {
      if (!candidate) {
        continue;
      }

      if (
        typeof candidate.run === "function" ||
        typeof candidate.simulate === "function"
      ) {
        return candidate;
      }

      if (
        typeof candidate.create === "function"
      ) {
        try {
          const instance =
            candidate.create();

          if (
            instance &&
            (
              typeof instance.run ===
                "function" ||
              typeof instance.simulate ===
                "function"
            )
          ) {
            return instance;
          }
        } catch (error) {
          console.warn(
            "[Sextant Cockpit] Engine create() failed:",
            error
          );
        }
      }
    }

    return null;
  }

  function getRecommendedActionsEngine() {
    const candidates = [
      window.SextantDPRecommendedActions,
      window.DPRecommendedActions,
      window.SextantRecommendedActions,
      window.RecommendedActionsEngine
    ];

    for (const candidate of candidates) {
      if (!candidate) {
        continue;
      }

      if (
        typeof candidate.generate === "function" ||
        typeof candidate.run === "function"
      ) {
        return candidate;
      }
    }

    return null;
  }

  /* ==========================================================
   * ENGINE STATUS
   * ========================================================== */

  function updateEngineStatus() {
    const engine =
      getSimulationEngine();

    if (engine) {
      setText(
        [
          "engineStatus",
          "engineState",
          "systemEngine"
        ],
        "CONNECTED — READY"
      );
    } else {
      setText(
        [
          "engineStatus",
          "engineState",
          "systemEngine"
        ],
        "ENGINE NOT FOUND"
      );
    }
  }

  /* ==========================================================
   * SYSTEM SETUP
   * ========================================================== */

  function getSystemSetup() {
    const positioningMode =
      readSelect(
        "positioningMode",
        POSITIONING_MODES.NON_BIAS
      );

    const engineLoadMode =
      readSelect(
        "engineLoadMode",
        ENGINE_LOAD_MODES.NORMAL
      );

    return {
      positioningMode:
        positioningMode ===
        POSITIONING_MODES.BIAS
          ? POSITIONING_MODES.BIAS
          : POSITIONING_MODES.NON_BIAS,

      engineLoadMode:
        engineLoadMode ===
        ENGINE_LOAD_MODES.PUSH_UP
          ? ENGINE_LOAD_MODES.PUSH_UP
          : ENGINE_LOAD_MODES.NORMAL,

      distinction:
        "POSITIONING BIAS/NON-BIAS IS SEPARATE FROM ENGINE LOAD NORMAL/PUSH-UP"
    };
  }

  function updateSystemSetupDisplay(setup) {
    const positioningMode =
      setup?.positioningMode ||
      POSITIONING_MODES.NON_BIAS;

    const engineLoadMode =
      setup?.engineLoadMode ||
      ENGINE_LOAD_MODES.NORMAL;

    setTextAll(
      [
        "livePositioningMode",
        "positioningModeLive"
      ],
      positioningMode
    );

    setTextAll(
      [
        "liveEngineLoadMode",
        "engineLoadModeLive"
      ],
      engineLoadMode
    );

    setText(
      [
        "positioningDistinction",
        "setupDistinction"
      ],
      "POSITIONING BIAS/NON-BIAS IS SEPARATE FROM ENGINE LOAD NORMAL/PUSH-UP"
    );

    if (
      positioningMode ===
      POSITIONING_MODES.BIAS
    ) {
      setText(
        [
          "positioningDescription",
          "positioningModeDescription"
        ],
        "BIAS — POSITIONING MODE"
      );
    } else {
      setText(
        [
          "positioningDescription",
          "positioningModeDescription"
        ],
        "NON-BIAS — STANDARD POSITIONING"
      );
    }

    if (
      engineLoadMode ===
      ENGINE_LOAD_MODES.PUSH_UP
    ) {
      setText(
        [
          "engineLoadDescription",
          "engineLoadModeDescription"
        ],
        "PUSH-UP — ENGINE LOAD COMPENSATION"
      );
    } else {
      setText(
        [
          "engineLoadDescription",
          "engineLoadModeDescription"
        ],
        "NORMAL — NOMINAL ENGINE LOAD"
      );
    }
  }

  /* ==========================================================
   * ENVIRONMENT
   *
   * v2.6.3 IMPORTANT FIX
   *
   * The supplied HTML uses:
   *   wind
   *   current
   *   wave
   *   tidal
   *
   * Previous controller versions attempted to read:
   *   windStress
   *   currentStress
   *   waveStress
   *   tidalStress
   *
   * That caused the controller to fall back to 10.
   * ========================================================== */

  function readEnvironment() {
    const wind =
      clamp(
        readValue("wind", 10),
        0,
        100
      );

    const current =
      clamp(
        readValue("current", 10),
        0,
        100
      );

    const wave =
      clamp(
        readValue("wave", 10),
        0,
        100
      );

    const tidal =
      clamp(
        readValue("tidal", 10),
        0,
        100
      );

    const setup =
      getSystemSetup();

    const environmentalStress =
      (wind * 0.25) +
      (current * 0.30) +
      (wave * 0.25) +
      (tidal * 0.20);

    return {
      wind,
      current,
      wave,
      tidal,

      environmentalStress,

      positioningMode:
        setup.positioningMode,

      engineLoadMode:
        setup.engineLoadMode
    };
  }

  function updateEnvironmentDisplay(
    environment
  ) {
    if (!environment) {
      return;
    }

    setText(
      [
        "traceWind",
        "windTrace"
      ],
      environment.wind
    );

    setText(
      [
        "traceCurrent",
        "currentTrace"
      ],
      environment.current
    );

    setText(
      [
        "traceWave",
        "waveTrace"
      ],
      environment.wave
    );

    setText(
      [
        "traceTidal",
        "tidalTrace"
      ],
      environment.tidal
    );

    setText(
      [
        "environmentStatus",
        "environmentState"
      ],
      "ASSESSED"
    );

    setText(
      [
        "environmentTrace",
        "environmentData"
      ],
      safeJSON(environment)
    );
  }

  /* ==========================================================
   * AUTHORITATIVE ENGINE EXECUTION
   * ========================================================== */

  function executeAuthoritativeEngine(
    environment
  ) {
    const engine =
      getSimulationEngine();

    if (!engine) {
      throw new Error(
        "Authoritative DP simulation engine is not available."
      );
    }

    if (
      typeof engine.run === "function"
    ) {
      return engine.run(environment);
    }

    if (
      typeof engine.simulate === "function"
    ) {
      return engine.simulate(environment);
    }

    throw new Error(
      "Authoritative DP simulation engine has no run/simulate method."
    );
  }

  /* ==========================================================
   * RESULT EXTRACTION
   * ========================================================== */

  function extractSystemSetup(
    result,
    fallbackEnvironment
  ) {
    return (
      result?.systemSetup ||
      result?.setup ||
      {
        positioningMode:
          fallbackEnvironment?.positioningMode ||
          POSITIONING_MODES.NON_BIAS,

        engineLoadMode:
          fallbackEnvironment?.engineLoadMode ||
          ENGINE_LOAD_MODES.NORMAL
      }
    );
  }

  /* ==========================================================
   * AUTHORITATIVE RESERVE EXTRACTION
   *
   * v2.6.3:
   * The authoritative engine's reserve object is:
   *
   * result.reservePowerVerification
   *
   * This is deliberately checked FIRST.
   *
   * If no authoritative reserve result exists,
   * the cockpit FAILS CLOSED.
   * ========================================================== */

  function extractReserveVerification(
    result
  ) {
    const reserve =
      result?.reservePowerVerification ||
      result?.reserveVerification ||
      result?.reservePower ||
      null;

    if (!reserve) {
      return {
        reserveVerified: false,

        status:
          "NOT VERIFIED",

        verificationSource:
          "NO AUTHORITATIVE RESERVE RESULT",

        availableReserve:
          null,

        requiredReserve:
          null,

        gate:
          "RESERVE NOT VERIFIED",

        authoritative:
          false
      };
    }

    const reserveVerified =
      reserve.reserveVerified === true;

    const status =
      reserve.status ||
      (
        reserveVerified
          ? "VERIFIED"
          : "NOT VERIFIED"
      );

    let gate =
      reserve.gate;

    if (!gate) {
      gate =
        reserveVerified
          ? "RESERVE VERIFIED"
          : "RESERVE NOT VERIFIED";
    }

    return {
      ...reserve,

      reserveVerified,

      status,

      verificationSource:
        reserve.verificationSource ||
        "AUTHORITATIVE SIMULATION ENGINE",

      availableReserve:
        reserve.availableReserve !==
        undefined
          ? reserve.availableReserve
          : null,

      requiredReserve:
        reserve.requiredReserve !==
        undefined
          ? reserve.requiredReserve
          : null,

      gate,

      authoritative: true
    };
  }

  function extractRecommendedAction(
    result
  ) {
    return (
      result?.recommendedAction ||
      result?.recommendation ||
      {}
    );
  }

  function extractProposedAction(
    result
  ) {
    return (
      result?.proposedAction ||
      result?.simulatedAction ||
      {}
    );
  }

  /* ==========================================================
   * RESERVE POWER DISPLAY
   *
   * All reserve fields are updated from the SAME authoritative
   * reserve object.
   * ========================================================== */

  function updateReservePowerDisplay(
    result
  ) {
    const reserve =
      extractReserveVerification(result);

    const verifiedText =
      reserve.reserveVerified
        ? "VERIFIED"
        : "NOT VERIFIED";

    const gateText =
      reserve.gate ||
      (
        reserve.reserveVerified
          ? "RESERVE VERIFIED"
          : "RESERVE NOT VERIFIED"
      );

    const availableIsValid =
      Number.isFinite(
        Number(
          reserve.availableReserve
        )
      );

    const requiredIsValid =
      Number.isFinite(
        Number(
          reserve.requiredReserve
        )
      );

    const availableText =
      availableIsValid
        ? Number(
            reserve.availableReserve
          ).toFixed(2)
        : "—";

    const requiredText =
      requiredIsValid
        ? Number(
            reserve.requiredReserve
          ).toFixed(2)
        : "—";

    /*
     * Main reserve status.
     */
    setTextAll(
      [
        "liveReserve",
        "reservePower",
        "reservePowerLive"
      ],
      verifiedText
    );

    /*
     * Detailed verification.
     */
    setTextAll(
      [
        "reserveVerification",
        "reservePowerVerification"
      ],
      verifiedText
    );

    /*
     * Authoritative status.
     */
    setTextAll(
      [
        "reserveStatus",
        "reservePowerStatus"
      ],
      reserve.status ||
      verifiedText
    );

    /*
     * Push-up / reserve gate.
     */
    setTextAll(
      [
        "reserveGate",
        "reservePowerGate",
        "pushUpGate"
      ],
      gateText
    );

    /*
     * Available reserve.
     */
    setTextAll(
      [
        "availableReserve",
        "reserveAvailable",
        "reservePowerAvailable"
      ],
      availableText
    );

    /*
     * Required reserve.
     */
    setTextAll(
      [
        "requiredReserve",
        "reserveRequired",
        "reservePowerRequired"
      ],
      requiredText
    );

    return reserve;
  }

  /* ==========================================================
   * DECISION TRACE
   * ========================================================== */

  function updateDecisionTrace(
    result
  ) {
    const primary =
      result?.primary || {};

    const secondary =
      result?.secondary || {};

    const stabilizer =
      result?.stabilizer || {};

    const recommended =
      extractRecommendedAction(result);

    const proposed =
      extractProposedAction(result);

    const executionGate =
      result?.executionGate || {};

    const reserve =
      extractReserveVerification(result);

    setText(
      [
        "primaryMode",
        "tracePrimaryMode"
      ],
      primary.mode ||
      "NORMAL CONTROL"
    );

    setText(
      [
        "primaryResponse",
        "tracePrimaryResponse"
      ],
      primary.response ||
      primary.output ||
      "CONTINUE SIMULATED DP MONITORING"
    );

    setText(
      [
        "secondaryMode",
        "traceSecondaryMode"
      ],
      secondary.mode ||
      "INDEPENDENT MONITORING"
    );

    setText(
      [
        "secondaryAssessment",
        "traceSecondaryAssessment"
      ],
      secondary.assessment ||
      secondary.response ||
      "NO SECONDARY INTERVENTION INDICATED"
    );

    setText(
      [
        "stabilizerMode",
        "traceStabilizerMode"
      ],
      stabilizer.mode ||
      "NORMAL ARBITRATION"
    );

    setText(
      [
        "stabilizerSource",
        "traceStabilizerSource"
      ],
      stabilizer.source ||
      "S1 PRIMARY"
    );

    setText(
      [
        "stabilizerOutput",
        "traceStabilizerOutput"
      ],
      stabilizer.output
        ? safeJSON(
            stabilizer.output
          )
        : stabilizer.finalOutput !==
            undefined
          ? safeJSON(stabilizer)
          : "—"
    );

    const urgency =
      recommended.urgency ||
      result?.urgency ||
      result?.human?.urgency ||
      "NORMAL";

    const responseMode =
      recommended.responseMode ||
      result?.responseMode ||
      "SIMULATED DP RESPONSE";

    const recommendation =
      recommended.recommendation ||
      recommended.message ||
      recommended.recommendedAction ||
      result?.recommendation ||
      DEFAULT_LENA_MESSAGE;

    const proposedAction =
      proposed.action ||
      proposed.command ||
      proposed.status ||
      result?.proposedAction?.description ||
      "MAINTAIN SIMULATED SAFE STATE";

    /*
     * IMPORTANT:
     *
     * traceGate represents the decision trace gate.
     *
     * executionGate is the authoritative system execution
     * gate and must NOT be overwritten by the trace fallback.
     */
    const traceGate =
      reserve &&
      !reserve.reserveVerified &&
      extractSystemSetup(
        result,
        lastEnvironment
      ).engineLoadMode ===
        ENGINE_LOAD_MODES.PUSH_UP
        ? "RESERVE GATE"
        : (
            executionGate.status ||
            executionGate.gate ||
            "HUMAN AUTHORIZATION REQUIRED"
          );

    const actionStatus =
      result?.simulatedAction?.status ||
      proposed.status ||
      result?.human?.status ||
      "SIMULATION HOLD — HUMAN DECISION PENDING";

    setText(
      [
        "urgency",
        "traceUrgency"
      ],
      urgency
    );

    setText(
      [
        "responseMode",
        "traceResponseMode"
      ],
      responseMode
    );

    setText(
      [
        "recommendation",
        "traceRecommendation"
      ],
      recommendation
    );

    /*
     * Correct HTML ID is traceProposed.
     * Keep proposedAction as compatibility alias.
     */
    setText(
      [
        "traceProposed",
        "traceProposedAction",
        "proposedAction"
      ],
      proposedAction
    );

    /*
     * Decision trace gate ONLY.
     */
    setText(
      [
        "traceGate",
        "gate"
      ],
      traceGate
    );

    /*
     * Main execution gate ONLY.
     */
    setText(
      [
        "executionGate"
      ],
      executionGate.status ||
      executionGate.gate ||
      "HUMAN AUTHORIZATION REQUIRED"
    );

    setText(
      [
        "actionStatus",
        "traceActionStatus"
      ],
      actionStatus
    );
  }

  /* ==========================================================
   * CAPTAIN AI LENA
   * ========================================================== */

  function updateLenaDisplay(
    result
  ) {
    const recommended =
      extractRecommendedAction(result);

    const urgency =
      recommended.urgency ||
      result?.urgency ||
      "NORMAL";

    const responseMode =
      recommended.responseMode ||
      result?.responseMode ||
      "SIMULATED DP RESPONSE";

    const recommendation =
      recommended.recommendation ||
      recommended.message ||
      recommended.recommendedAction ||
      result?.recommendation ||
      DEFAULT_LENA_MESSAGE;

    setText(
      ["lenaStatus"],
      "DECISION SUPPORT"
    );

    setText(
      ["lenaRecommendation"],
      recommendation
    );

    setText(
      ["lenaUrgency"],
      urgency
    );

    setText(
      ["lenaResponseMode"],
      responseMode
    );

    setText(
      ["lenaAutonomousCommand"],
      "FALSE — NO AUTONOMOUS COMMAND"
    );

    setText(
      [
        "lenaUMVAction",
        "lenaUVMAction"
      ],
      "SIMULATION ONLY"
    );

    setText(
      [
        "lenaDecisionMessage",
        "lenaMessage"
      ],
      "Captain AI Lena provides decision support only. Human authority remains final. No operational command is generated."
    );
  }

  /* ==========================================================
   * RECOMMENDED ACTION
   * ========================================================== */

  function updateRecommendedActionDisplay(
    result
  ) {
    const recommended =
      extractRecommendedAction(result);

    const recommendation =
      recommended.recommendation ||
      recommended.message ||
      recommended.recommendedAction ||
      result?.recommendation ||
      DEFAULT_LENA_MESSAGE;

    const urgency =
      recommended.urgency ||
      result?.urgency ||
      "NORMAL";

    setText(
      [
        "recommendedAutonomous",
        "actionAutonomous"
      ],
      "FALSE"
    );

    setText(
      [
        "recommendedLenaStatus",
        "actionLenaStatus"
      ],
      "DECISION SUPPORT"
    );

    setText(
      [
        "recommendedControlMode",
        "actionControlMode"
      ],
      "HUMAN AUTHORITY"
    );

    setText(
      [
        "recommendedUrgency",
        "actionUrgency"
      ],
      urgency
    );

    setText(
      [
        "recommendedAction",
        "actionRecommendation"
      ],
      recommendation
    );

    setText(
      [
        "recommendedActionRepeat",
        "recommendedActionText"
      ],
      recommendation
    );

    lastRecommendedAction =
      recommended;
  }

  /* ==========================================================
   * SIMULATED DP RESPONSE
   * ========================================================== */

  function simulatedDPResponse(
    result
  ) {
    const setup =
      extractSystemSetup(
        result,
        lastEnvironment
      );

    const reserve =
      extractReserveVerification(result);

    const proposed =
      extractProposedAction(result);

    const engineGate =
      result?.executionGate ||
      {};

    const pushUp =
      setup.engineLoadMode ===
      ENGINE_LOAD_MODES.PUSH_UP;

    /*
     * PUSH-UP is never available without verified reserve.
     */
    if (
      pushUp &&
      !reserve.reserveVerified
    ) {
      return {
        mode:
          "SIMULATED DP RESPONSE",

        status:
          "BLOCKED — RESERVE NOT VERIFIED",

        proposedAction:
          "PUSH-UP BLOCKED — RESERVE NOT VERIFIED",

        gate:
          engineGate.status ||
          engineGate.gate ||
          "RESERVE GATE",

        simulated: true,

        operational: false
      };
    }

    return {
      mode:
        "SIMULATED DP RESPONSE",

      status:
        proposed.status ||
        result?.simulatedAction?.status ||
        "SIMULATION HOLD — HUMAN AUTHORIZATION REQUIRED",

      proposedAction:
        proposed.action ||
        proposed.command ||
        proposed.description ||
        result?.proposedAction?.description ||
        "MAINTAIN SIMULATED SAFE STATE",

      gate:
        engineGate.status ||
        engineGate.gate ||
        "HUMAN AUTHORIZATION REQUIRED",

      simulated: true,

      operational: false
    };
  }

  /* ==========================================================
   * SIMULATED VESSEL STATE
   * ========================================================== */

  function updateSimulatedVesselState(
    result
  ) {
    const state =
      result?.updatedState ||
      result?.simulatedVesselState ||
      result?.vesselState ||
      {};

    const simulatedAction =
      result?.simulatedAction ||
      {};

    const positionError =
      state.positionError !==
      undefined
        ? state.positionError
        : 0;

    const simulatedCommand =
      state.simulatedCommand !==
      undefined
        ? state.simulatedCommand
        : simulatedAction.simulatedCommand !==
          undefined
          ? simulatedAction.simulatedCommand
          : 0;

    const stabilityIndex =
      state.stabilityIndex !==
      undefined
        ? state.stabilityIndex
        : 100;

    const vesselState =
      state.status ||
      state.risk ||
      state.state ||
      "STABLE";

    setText(
      [
        "positionError",
        "simulatedPositionError"
      ],
      Number(positionError).toFixed(2)
    );

    setText(
      [
        "simulatedCommand",
        "dpSimulatedCommand"
      ],
      Number(simulatedCommand).toFixed(0)
    );

    setText(
      [
        "stabilityIndex",
        "simulatedStabilityIndex"
      ],
      Number(stabilityIndex).toFixed(0)
    );

    setText(
      [
        "vesselState",
        "simulatedVesselState"
      ],
      vesselState
    );
  }

  /* ==========================================================
   * HUMAN AUTHORITY
   * ========================================================== */

  function getHumanAuthorityEngine() {
    return getSimulationEngine();
  }

  function updateHumanAuthorityDisplay(
    result
  ) {
    const human =
      result?.human || {};

    const executionGate =
      result?.executionGate || {};

    const reserve =
      extractReserveVerification(result);

    const setup =
      extractSystemSetup(
        result,
        lastEnvironment
      );

    let authorityText =
      "HUMAN AUTHORIZATION REQUIRED";

    let executionText =
      executionGate.status ||
      executionGate.gate ||
      "HUMAN AUTHORIZATION REQUIRED";

    /*
     * Reserve safety takes precedence.
     */
    if (
      setup.engineLoadMode ===
        ENGINE_LOAD_MODES.PUSH_UP &&
      !reserve.reserveVerified
    ) {
      authorityText =
        "SIMULATION HOLD — RESERVE NOT VERIFIED";

      executionText =
        "RESERVE GATE — NO PUSH-UP";
    } else if (
      humanDecisionState ===
      HUMAN_DECISIONS.MAINTAIN_SAFE_STATE
    ) {
      authorityText =
        "SAFE STATE MAINTAINED — SIMULATION ONLY";

      executionText =
        "SAFE STATE — NO OPERATIONAL COMMAND";
    } else if (
      humanDecisionState ===
      HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE
    ) {
      authorityText =
        "SIMULATED RESPONSE AUTHORIZED — SIMULATION ONLY";

      executionText =
        "SIMULATED RESPONSE — NO OPERATIONAL COMMAND";
    } else if (
      humanDecisionState ===
      HUMAN_DECISIONS.ACKNOWLEDGE
    ) {
      authorityText =
        "CONDITION ACKNOWLEDGED — SIMULATION ONLY";

      executionText =
        "HUMAN DECISION PENDING";
    } else if (
      human.status
    ) {
      authorityText =
        human.status;
    }

    setText(
      [
        "humanAuthorityStatus",
        "humanAuthority"
      ],
      authorityText
    );

    setText(
      [
        "executionStatus",
        "execution"
      ],
      executionText
    );
  }

  /* ==========================================================
   * SYSTEM DISPLAY STATUS
   * ========================================================== */

  function deriveSystemDisplayStatus(
    result
  ) {
    const setup =
      extractSystemSetup(
        result,
        lastEnvironment
      );

    const reserve =
      extractReserveVerification(result);

    if (
      setup.engineLoadMode ===
        ENGINE_LOAD_MODES.PUSH_UP &&
      !reserve.reserveVerified
    ) {
      return "SIMULATION HOLD — RESERVE GATE";
    }

    if (
      humanDecisionState ===
      HUMAN_DECISIONS.MAINTAIN_SAFE_STATE
    ) {
      return "SIMULATION COMPLETE — SAFE STATE MAINTAINED";
    }

    if (
      humanDecisionState ===
      HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE
    ) {
      return "SIMULATION COMPLETE — SIMULATED RESPONSE AUTHORIZED";
    }

    if (
      humanDecisionState ===
      HUMAN_DECISIONS.ACKNOWLEDGE
    ) {
      return "SIMULATION COMPLETE — HUMAN DECISION PENDING";
    }

    return "SIMULATION COMPLETE — HUMAN DECISION PENDING";
  }

  /* ==========================================================
   * ASSESSMENT OUTPUT
   * ========================================================== */

  function updateAssessment(
    result
  ) {
    const assessment =
      result?.assessment ||
      result?.assessmentOutput ||
      result?.finalAssessment ||
      {};

    const reserve =
      extractReserveVerification(result);

    const setup =
      extractSystemSetup(
        result,
        lastEnvironment
      );

    const recommended =
      extractRecommendedAction(result);

    const proposed =
      extractProposedAction(result);

    const lines = [];

    lines.push(
      "SYSTEM: " +
      deriveSystemDisplayStatus(result)
    );

    if (
      result?.risk !== undefined
    ) {
      lines.push(
        "RISK: " +
        result.risk
      );
    }

    if (
      result?.resilienceScore !==
      undefined
    ) {
      lines.push(
        "RESILIENCE SCORE: " +
        result.resilienceScore
      );
    }

    if (
      result?.environmentalStress !==
      undefined
    ) {
      lines.push(
        "ENVIRONMENTAL STRESS: " +
        result.environmentalStress
      );
    }

    lines.push(
      "POSITIONING MODE: " +
      setup.positioningMode
    );

    lines.push(
      "ENGINE LOAD MODE: " +
      setup.engineLoadMode
    );

    lines.push(
      "RESERVE POWER: " +
      (
        reserve.reserveVerified
          ? "VERIFIED"
          : "NOT VERIFIED"
      )
    );

    lines.push(
      "AVAILABLE RESERVE: " +
      (
        Number.isFinite(
          Number(
            reserve.availableReserve
          )
        )
          ? Number(
              reserve.availableReserve
            ).toFixed(2)
          : "—"
      )
    );

    lines.push(
      "REQUIRED RESERVE: " +
      (
        Number.isFinite(
          Number(
            reserve.requiredReserve
          )
        )
          ? Number(
              reserve.requiredReserve
            ).toFixed(2)
          : "—"
      )
    );

    lines.push(
      "RESERVE STATUS: " +
      (
        reserve.status ||
        "NOT VERIFIED"
      )
    );

    lines.push(
      "RECOMMENDATION: " +
      (
        recommended.recommendation ||
        recommended.message ||
        DEFAULT_LENA_MESSAGE
      )
    );

    lines.push(
      "PROPOSED ACTION: " +
      (
        proposed.action ||
        proposed.command ||
        proposed.status ||
        "MAINTAIN SIMULATED SAFE STATE"
      )
    );

    lines.push(
      "HUMAN AUTHORITY: FINAL"
    );

    lines.push(
      "OPERATIONAL COMMAND: NONE"
    );

    if (
      Object.keys(assessment).length >
      0
    ) {
      lines.push(
        "ENGINE ASSESSMENT: " +
        safeJSON(assessment)
      );
    }

    setText(
      [
        "assessmentOutput",
        "assessmentResult"
      ],
      lines.join("\n")
    );
  }

  /* ==========================================================
   * AUDIT OUTPUT
   * ========================================================== */

  function updateAudit(
    result
  ) {
    const audit =
      result?.audit ||
      result?.auditRecord ||
      {};

    const executionGate =
      result?.executionGate ||
      {};

    const reserve =
      extractReserveVerification(result);

    const setup =
      extractSystemSetup(
        result,
        lastEnvironment
      );

    const auditLines = [
      "MODULE: " + MODULE_NAME,
      "CONTROLLER VERSION: " + VERSION,
      "ENGINE VERSION: " +
        SIMULATION_ENGINE_VERSION,
      "RECOMMENDED ACTIONS: " +
        RECOMMENDED_ACTIONS_VERSION,
      "MODE: RESEARCH / V&V ONLY",
      "AUTONOMOUS EXECUTION: FALSE",
      "OPERATIONAL COMMAND: NONE",
      "HUMAN AUTHORITY: FINAL",
      "POSITIONING MODE: " +
        setup.positioningMode,
      "ENGINE LOAD MODE: " +
        setup.engineLoadMode,
      "PUSH-UP IS POSITIONING BIAS: FALSE",
      "PUSH-UP IS ENGINE LOAD COMPENSATION: TRUE",
      "RESERVE VERIFIED: " +
        String(
          reserve.reserveVerified
        ),
      "RESERVE STATUS: " +
        (
          reserve.status ||
          "NOT VERIFIED"
        ),
      "AVAILABLE RESERVE: " +
        (
          Number.isFinite(
            Number(
              reserve.availableReserve
            )
          )
            ? Number(
                reserve.availableReserve
              ).toFixed(2)
            : "—"
        ),
      "REQUIRED RESERVE: " +
        (
          Number.isFinite(
            Number(
              reserve.requiredReserve
            )
          )
            ? Number(
                reserve.requiredReserve
              ).toFixed(2)
            : "—"
        ),
      "RESERVE SOURCE: " +
        (
          reserve.verificationSource ||
          "NO AUTHORITATIVE RESERVE RESULT"
        ),
      "EXECUTION GATE: " +
        (
          executionGate.status ||
          executionGate.gate ||
          "HUMAN AUTHORIZATION REQUIRED"
        ),
      "HUMAN DECISION: " +
        humanDecisionState
    ];

    if (
      audit &&
      Object.keys(audit).length > 0
    ) {
      auditLines.push(
        "ENGINE AUDIT: " +
        safeJSON(audit)
      );
    }

    setText(
      [
        "auditOutput",
        "auditResult"
      ],
      auditLines.join("\n")
    );
  }

  /* ==========================================================
   * RECOMMENDED ACTIONS ENGINE
   * ========================================================== */

  function generateRecommendedActions(
    environment,
    result
  ) {
    const recommendationsEngine =
      getRecommendedActionsEngine();

    if (!recommendationsEngine) {
      return (
        result?.recommendedAction ||
        {}
      );
    }

    try {
      if (
        typeof recommendationsEngine.generate ===
        "function"
      ) {
        return recommendationsEngine.generate(
          environment,
          result
        );
      }

      if (
        typeof recommendationsEngine.run ===
        "function"
      ) {
        return recommendationsEngine.run(
          environment,
          result
        );
      }
    } catch (error) {
      console.warn(
        "[Sextant Cockpit] Recommended actions engine error:",
        error
      );
    }

    return (
      result?.recommendedAction ||
      {}
    );
  }

  /* ==========================================================
   * MAIN V&V PIPELINE
   * ========================================================== */

  function runSimulation() {
    humanDecisionState =
      "PENDING";

    simulationHasRun =
      false;

    const environment =
      readEnvironment();

    lastEnvironment =
      environment;

    updateSystemSetupDisplay({
      positioningMode:
        environment.positioningMode,

      engineLoadMode:
        environment.engineLoadMode
    });

    updateEnvironmentDisplay(
      environment
    );

    setText(
      [
        "systemStatus",
        "systemState"
      ],
      "SIMULATION RUNNING"
    );

    setText(
      [
        "humanAuthorityStatus",
        "humanAuthority"
      ],
      "HUMAN AUTHORIZATION REQUIRED"
    );

    setText(
      [
        "executionStatus",
        "execution"
      ],
      "HUMAN AUTHORIZATION REQUIRED"
    );

    try {
      /*
       * GOLDEN RULE
       *
       * OBSERVE
       * VERIFY
       * ASSESS
       * DECIDE
       * ACT
       * UPDATE
       *
       * ACT remains simulated only.
       */

      const result =
        executeAuthoritativeEngine(
          environment
        );

      lastResult =
        result;

      simulationHasRun =
        true;

      /*
       * Authoritative setup.
       */
      const authoritativeSetup =
        extractSystemSetup(
          result,
          environment
        );

      updateSystemSetupDisplay(
        authoritativeSetup
      );

      /*
       * AUTHORITATIVE RESERVE VERIFICATION.
       *
       * This MUST happen before recommendation/
       * simulated response display.
       */
      const reserve =
        updateReservePowerDisplay(
          result
        );

      /*
       * Explicit diagnostic logging.
       */
      console.info(
        "[Sextant Cockpit] Reserve verification:",
        reserve
      );

      /*
       * Decision trace.
       */
      updateDecisionTrace(
        result
      );

      /*
       * Captain AI Lena.
       */
      updateLenaDisplay(
        result
      );

      /*
       * Recommended actions.
       */
      const generatedRecommendations =
        generateRecommendedActions(
          environment,
          result
        );

      if (
        generatedRecommendations &&
        Object.keys(
          generatedRecommendations
        ).length
      ) {
        const displayResult = {
          ...result,

          recommendedAction:
            generatedRecommendations
        };

        updateRecommendedActionDisplay(
          displayResult
        );
      } else {
        updateRecommendedActionDisplay(
          result
        );
      }

      /*
       * Simulated response.
       */
      const response =
        simulatedDPResponse(
          result
        );

      setText(
        [
          "simulatedDPResponse",
          "dpResponseStatus"
        ],
        response.status
      );

      /*
       * Simulated vessel state.
       */
      updateSimulatedVesselState(
        result
      );

      /*
       * Human authority.
       */
      updateHumanAuthorityDisplay(
        result
      );

      /*
       * Assessment.
       */
      updateAssessment(
        result
      );

      /*
       * Audit.
       */
      updateAudit(
        result
      );

      /*
       * System status.
       */
      setText(
        [
          "systemStatus",
          "systemState"
        ],
        deriveSystemDisplayStatus(
          result
        )
      );

      return result;

    } catch (error) {
      console.error(
        "[Sextant Cockpit] Simulation error:",
        error
      );

      simulationHasRun =
        false;

      lastResult =
        null;

      setText(
        [
          "systemStatus",
          "systemState"
        ],
        "SIMULATION ERROR — NO OPERATIONAL COMMAND"
      );

      setText(
        [
          "executionStatus",
          "execution"
        ],
        "SAFE STATE — NO OPERATIONAL COMMAND"
      );

      setText(
        [
          "humanAuthorityStatus",
          "humanAuthority"
        ],
        "HUMAN AUTHORITY REQUIRED"
      );

      /*
       * Fail-closed reserve display.
       */
      updateReservePowerDisplay(
        null
      );

      setText(
        [
          "assessmentOutput",
          "assessmentResult"
        ],
        "Simulation could not be completed safely. No operational command generated."
      );

      setText(
        [
          "auditOutput",
          "auditResult"
        ],
        "SIMULATION ERROR — CONTROLLER FAIL-SAFE ACTIVE"
      );

      return null;
    }
  }

  /* ==========================================================
   * HUMAN DECISION — ACKNOWLEDGE
   * ========================================================== */

  function acknowledgeCondition() {
    if (
      !simulationHasRun ||
      !lastResult
    ) {
      return null;
    }

    humanDecisionState =
      HUMAN_DECISIONS.ACKNOWLEDGE;

    let result =
      lastResult;

    const engine =
      getHumanAuthorityEngine();

    try {
      if (
        engine &&
        typeof engine.acknowledgeHumanDecision ===
          "function"
      ) {
        result =
          engine.acknowledgeHumanDecision();
      }
    } catch (error) {
      console.warn(
        "[Sextant Cockpit] Human acknowledgement error:",
        error
      );
    }

    if (result) {
      lastResult =
        result;
    }

    updateReservePowerDisplay(
      lastResult
    );

    updateDecisionTrace(
      lastResult
    );

    updateLenaDisplay(
      lastResult
    );

    updateRecommendedActionDisplay(
      lastResult
    );

    updateSimulatedVesselState(
      lastResult
    );

    updateHumanAuthorityDisplay(
      lastResult
    );

    updateAssessment(
      lastResult
    );

    updateAudit(
      lastResult
    );

    setText(
      [
        "systemStatus",
        "systemState"
      ],
      deriveSystemDisplayStatus(
        lastResult
      )
    );

    return lastResult;
  }

  /* ==========================================================
   * HUMAN DECISION — MAINTAIN SAFE STATE
   * ========================================================== */

  function maintainSafeState() {
    if (
      !simulationHasRun ||
      !lastResult
    ) {
      return null;
    }

    humanDecisionState =
      HUMAN_DECISIONS.MAINTAIN_SAFE_STATE;

    let result =
      lastResult;

    const engine =
      getHumanAuthorityEngine();

    try {
      if (
        engine &&
        typeof engine.maintainSafeState ===
          "function"
      ) {
        result =
          engine.maintainSafeState();
      }
    } catch (error) {
      console.warn(
        "[Sextant Cockpit] Maintain-safe-state error:",
        error
      );
    }

    if (result) {
      lastResult =
        result;
    }

    updateReservePowerDisplay(
      lastResult
    );

    updateDecisionTrace(
      lastResult
    );

    updateLenaDisplay(
      lastResult
    );

    updateRecommendedActionDisplay(
      lastResult
    );

    updateSimulatedVesselState(
      lastResult
    );

    updateHumanAuthorityDisplay(
      lastResult
    );

    updateAssessment(
      lastResult
    );

    updateAudit(
      lastResult
    );

    setText(
      [
        "systemStatus",
        "systemState"
      ],
      deriveSystemDisplayStatus(
        lastResult
      )
    );

    return lastResult;
  }

  /* ==========================================================
   * HUMAN DECISION — AUTHORIZE SIMULATED RESPONSE
   * ========================================================== */

  function authorizeSimulatedResponse() {
    if (
      !simulationHasRun ||
      !lastResult
    ) {
      return null;
    }

    const setup =
      extractSystemSetup(
        lastResult,
        lastEnvironment
      );

    const reserve =
      extractReserveVerification(
        lastResult
      );

    /*
     * ABSOLUTE SAFETY GATE:
     *
     * PUSH-UP cannot be authorized unless the
     * authoritative engine has verified reserve.
     */
    if (
      setup.engineLoadMode ===
        ENGINE_LOAD_MODES.PUSH_UP &&
      !reserve.reserveVerified
    ) {
      console.warn(
        "[Sextant Cockpit] PUSH-UP authorization blocked: reserve not verified."
      );

      humanDecisionState =
        HUMAN_DECISIONS.ACKNOWLEDGE;

      updateReservePowerDisplay(
        lastResult
      );

      updateHumanAuthorityDisplay(
        lastResult
      );

      updateAssessment(
        lastResult
      );

      updateAudit(
        lastResult
      );

      return lastResult;
    }

    humanDecisionState =
      HUMAN_DECISIONS.AUTHORIZE_SIMULATED_RESPONSE;

    let result =
      lastResult;

    const engine =
      getHumanAuthorityEngine();

    try {
      if (
        engine &&
        typeof engine.authorizeSimulatedResponse ===
          "function"
      ) {
        result =
          engine.authorizeSimulatedResponse();
      }
    } catch (error) {
      console.warn(
        "[Sextant Cockpit] Simulated authorization error:",
        error
      );
    }

    if (result) {
      lastResult =
        result;
    }

    updateReservePowerDisplay(
      lastResult
    );

    updateDecisionTrace(
      lastResult
    );

    updateLenaDisplay(
      lastResult
    );

    updateRecommendedActionDisplay(
      lastResult
    );

    updateSimulatedVesselState(
      lastResult
    );

    updateHumanAuthorityDisplay(
      lastResult
    );

    updateAssessment(
      lastResult
    );

    updateAudit(
      lastResult
    );

    setText(
      [
        "systemStatus",
        "systemState"
      ],
      deriveSystemDisplayStatus(
        lastResult
      )
    );

    return lastResult;
  }

  /* ==========================================================
   * RESET DISPLAY
   * ========================================================== */

  function resetDynamicDisplay() {
    setText(
      [
        "systemStatus",
        "systemState"
      ],
      "READY — AWAITING SIMULATION"
    );

    setText(
      [
        "environmentStatus",
        "environmentState"
      ],
      "WAITING"
    );

    setText(
      [
        "executionStatus",
        "execution"
      ],
      "HUMAN AUTHORIZATION REQUIRED"
    );

    setText(
      [
        "humanAuthorityStatus",
        "humanAuthority"
      ],
      "HUMAN AUTHORIZATION REQUIRED"
    );

    const resetFields = [
      "traceWind",
      "windTrace",
      "traceCurrent",
      "currentTrace",
      "traceWave",
      "waveTrace",
      "traceTidal",
      "tidalTrace",

      "primaryMode",
      "tracePrimaryMode",
      "primaryResponse",
      "tracePrimaryResponse",

      "secondaryMode",
      "traceSecondaryMode",
      "secondaryAssessment",
      "traceSecondaryAssessment",

      "stabilizerMode",
      "traceStabilizerMode",
      "stabilizerSource",
      "traceStabilizerSource",
      "stabilizerOutput",

      "traceUrgency",
      "urgency",

      "traceResponseMode",
      "responseMode",

      "traceRecommendation",
      "recommendation",

      "traceProposed",
      "traceProposedAction",
      "proposedAction",

      "traceGate",
      "gate",

      "executionGate",

      "traceActionStatus",
      "actionStatus"
    ];

    resetFields.forEach(
      function (id) {
        setText(
          id,
          "—"
        );
      }
    );

    setText(
      [
        "environmentTrace",
        "environmentData"
      ],
      "—"
    );

    /*
     * Reserve reset is deliberately NOT VERIFIED.
     *
     * No reserve calculation is allowed before an
     * authoritative simulation result exists.
     */
    setTextAll(
      [
        "liveReserve",
        "reservePower",
        "reservePowerLive",
        "reserveVerification",
        "reservePowerVerification",
        "reserveStatus",
        "reservePowerStatus"
      ],
      "NOT VERIFIED"
    );

    setTextAll(
      [
        "reserveGate",
        "reservePowerGate",
        "pushUpGate"
      ],
      "RESERVE NOT VERIFIED"
    );

    setTextAll(
      [
        "availableReserve",
        "reserveAvailable",
        "reservePowerAvailable"
      ],
      "—"
    );

    setTextAll(
      [
        "requiredReserve",
        "reserveRequired",
        "reservePowerRequired"
      ],
      "—"
    );

    setText(
      [
        "positionError",
        "simulatedPositionError"
      ],
      "0.00"
    );

    setText(
      [
        "simulatedCommand",
        "dpSimulatedCommand"
      ],
      "0"
    );

    setText(
      [
        "stabilityIndex",
        "simulatedStabilityIndex"
      ],
      "100"
    );

    setText(
      [
        "vesselState",
        "simulatedVesselState"
      ],
      "STABLE"
    );

    setText(
      [
        "assessmentOutput",
        "assessmentResult"
      ],
      "Awaiting simulation."
    );

    setText(
      [
        "auditOutput",
        "auditResult"
      ],
      "Awaiting simulation."
    );

    setText(
      [
        "simulatedDPResponse",
        "dpResponseStatus"
      ],
      "—"
    );

    setText(
      ["lenaStatus"],
      "DECISION SUPPORT"
    );

    setText(
      ["lenaRecommendation"],
      DEFAULT_LENA_MESSAGE
    );

    setText(
      ["lenaUrgency"],
      "NORMAL"
    );

    setText(
      ["lenaResponseMode"],
      "SIMULATED DP RESPONSE"
    );

    setText(
      ["lenaAutonomousCommand"],
      "FALSE — NO AUTONOMOUS COMMAND"
    );

    setText(
      [
        "lenaUMVAction",
        "lenaUVMAction"
      ],
      "SIMULATION ONLY"
    );

    setText(
      [
        "recommendedAutonomous",
        "actionAutonomous"
      ],
      "FALSE"
    );

    setText(
      [
        "recommendedLenaStatus",
        "actionLenaStatus"
      ],
      "DECISION SUPPORT"
    );

    setText(
      [
        "recommendedControlMode",
        "actionControlMode"
      ],
      "HUMAN AUTHORITY"
    );

    setText(
      [
        "recommendedUrgency",
        "actionUrgency"
      ],
      "NORMAL"
    );

    setText(
      [
        "recommendedAction",
        "actionRecommendation"
      ],
      DEFAULT_LENA_MESSAGE
    );

    setText(
      [
        "recommendedActionRepeat",
        "recommendedActionText"
      ],
      DEFAULT_LENA_MESSAGE
    );

    lastEnvironment =
      null;

    lastResult =
      null;

    lastRecommendedAction =
      null;

    humanDecisionState =
      "PENDING";

    simulationHasRun =
      false;
  }

  function resetSystem() {
    const engine =
      getSimulationEngine();

    try {
      if (
        engine &&
        typeof engine.reset ===
          "function"
      ) {
        engine.reset();
      }
    } catch (error) {
      console.warn(
        "[Sextant Cockpit] Engine reset warning:",
        error
      );
    }

    resetDynamicDisplay();

    updateSystemSetupDisplay(
      getSystemSetup()
    );

    updateSafetyDisplay();
    updateEngineStatus();
  }

  /* ==========================================================
   * SCENARIO SUPPORT
   *
   * v2.6.3 FIX:
   * Scenario functions now write to the actual HTML IDs:
   * wind / current / wave / tidal
   * ========================================================== */

  function applyScenario(values) {
    if (!values) {
      return;
    }

    if (
      values.wind !== undefined
    ) {
      setValue(
        "wind",
        values.wind
      );
    }

    if (
      values.current !== undefined
    ) {
      setValue(
        "current",
        values.current
      );
    }

    if (
      values.wave !== undefined
    ) {
      setValue(
        "wave",
        values.wave
      );
    }

    if (
      values.tidal !== undefined
    ) {
      setValue(
        "tidal",
        values.tidal
      );
    }
  }

  function scenarioNormal() {
    applyScenario({
      wind: 10,
      current: 10,
      wave: 10,
      tidal: 10
    });
  }

  function scenarioModerateWeather() {
    applyScenario({
      wind: 35,
      current: 30,
      wave: 35,
      tidal: 25
    });
  }

  function scenarioHeavyWeather() {
    applyScenario({
      wind: 60,
      current: 55,
      wave: 65,
      tidal: 45
    });
  }

  function scenarioCritical() {
    applyScenario({
      wind: 90,
      current: 90,
      wave: 95,
      tidal: 85
    });
  }

  function scenarioCurrentSurge() {
    applyScenario({
      wind: 20,
      current: 85,
      wave: 30,
      tidal: 45
    });
  }

  function scenarioHeavySeaState() {
    applyScenario({
      wind: 60,
      current: 35,
      wave: 90,
      tidal: 40
    });
  }

  function scenarioWindGust() {
    applyScenario({
      wind: 90,
      current: 25,
      wave: 35,
      tidal: 20
    });
  }

  function scenarioCombinedDisturbance() {
    applyScenario({
      wind: 75,
      current: 75,
      wave: 80,
      tidal: 70
    });
  }

  function scenarioRandom() {
    applyScenario({
      wind:
        Math.floor(
          Math.random() * 101
        ),

      current:
        Math.floor(
          Math.random() * 101
        ),

      wave:
        Math.floor(
          Math.random() * 101
        ),

      tidal:
        Math.floor(
          Math.random() * 101
        )
    });
  }

  /* ==========================================================
   * BUTTON WIRING
   * ========================================================== */

  function wireButton(
    id,
    handler
  ) {
    const button =
      getElement(id);

    if (!button) {
      return;
    }

    if (
      button.dataset.sextantWired ===
      "true"
    ) {
      return;
    }

    button.addEventListener(
      "click",
      function (event) {
        event.preventDefault();

        try {
          handler();
        } catch (error) {
          console.error(
            "[Sextant Cockpit] Button handler error:",
            error
          );
        }
      }
    );

    button.dataset.sextantWired =
      "true";
  }

  function wireSystemSetup() {
    const positioning =
      getElement(
        "positioningMode"
      );

    const engineLoad =
      getElement(
        "engineLoadMode"
      );

    if (
      positioning &&
      positioning.dataset.sextantSetupWired !==
        "true"
    ) {
      positioning.addEventListener(
        "change",
        function () {
          updateSystemSetupDisplay(
            getSystemSetup()
          );

          /*
           * Changing setup invalidates the previous
           * reserve verification because the authoritative
           * result belongs to the previous setup.
           */
          if (
            simulationHasRun
          ) {
            setTextAll(
              [
                "liveReserve",
                "reservePower",
                "reservePowerLive",
                "reserveVerification",
                "reservePowerVerification",
                "reserveStatus",
                "reservePowerStatus"
              ],
              "NOT VERIFIED"
            );

            setTextAll(
              [
                "reserveGate",
                "reservePowerGate",
                "pushUpGate"
              ],
              "RESERVE NOT VERIFIED"
            );

            setTextAll(
              [
                "availableReserve",
                "reserveAvailable",
                "reservePowerAvailable"
              ],
              "—"
            );

            setTextAll(
              [
                "requiredReserve",
                "reserveRequired",
                "reservePowerRequired"
              ],
              "—"
            );
          }
        }
      );

      positioning.dataset.sextantSetupWired =
        "true";
    }

    if (
      engineLoad &&
      engineLoad.dataset.sextantSetupWired !==
        "true"
    ) {
      engineLoad.addEventListener(
        "change",
        function () {
          updateSystemSetupDisplay(
            getSystemSetup()
          );

          /*
           * Changing NORMAL/PUSH-UP invalidates the
           * previous reserve result.
           */
          if (
            simulationHasRun
          ) {
            setTextAll(
              [
                "liveReserve",
                "reservePower",
                "reservePowerLive",
                "reserveVerification",
                "reservePowerVerification",
                "reserveStatus",
                "reservePowerStatus"
              ],
              "NOT VERIFIED"
            );

            setTextAll(
              [
                "reserveGate",
                "reservePowerGate",
                "pushUpGate"
              ],
              "RESERVE NOT VERIFIED"
            );

            setTextAll(
              [
                "availableReserve",
                "reserveAvailable",
                "reservePowerAvailable"
              ],
              "—"
            );

            setTextAll(
              [
                "requiredReserve",
                "reserveRequired",
                "reservePowerRequired"
              ],
              "—"
            );
          }
        }
      );

      engineLoad.dataset.sextantSetupWired =
        "true";
    }
  }

  function wireButtons() {
    wireButton(
      "runSimulation",
      runSimulation
    );

    wireButton(
      "resetSystem",
      resetSystem
    );

    wireButton(
      "acknowledgeCondition",
      acknowledgeCondition
    );

    wireButton(
      "maintainSafeState",
      maintainSafeState
    );

    wireButton(
      "authorizeSimulatedResponse",
      authorizeSimulatedResponse
    );

    wireButton(
      "scenarioNormal",
      scenarioNormal
    );

    wireButton(
      "scenarioModerate",
      scenarioModerateWeather
    );

    wireButton(
      "scenarioModerateWeather",
      scenarioModerateWeather
    );

    wireButton(
      "scenarioHeavyWeather",
      scenarioHeavyWeather
    );

    wireButton(
      "scenarioCritical",
      scenarioCritical
    );

    wireButton(
      "scenarioCurrentSurge",
      scenarioCurrentSurge
    );

    wireButton(
      "scenarioHeavySeaState",
      scenarioHeavySeaState
    );

    wireButton(
      "scenarioWindGust",
      scenarioWindGust
    );

    wireButton(
      "scenarioCombinedDisturbance",
      scenarioCombinedDisturbance
    );

    wireButton(
      "scenarioRandom",
      scenarioRandom
    );

    wireSystemSetup();
  }

  /* ==========================================================
   * GLOBAL SCENARIO ALIASES
   * ========================================================== */

  window.runNormalScenario =
    scenarioNormal;

  window.runModerateScenario =
    scenarioModerateWeather;

  window.runHeavyWeatherScenario =
    scenarioHeavyWeather;

  window.runCriticalScenario =
    scenarioCritical;

  window.runCurrentSurgeScenario =
    scenarioCurrentSurge;

  window.runHeavySeaStateScenario =
    scenarioHeavySeaState;

  window.runWindGustScenario =
    scenarioWindGust;

  window.runCombinedDisturbanceScenario =
    scenarioCombinedDisturbance;

  window.runRandomScenario =
    scenarioRandom;

  window.normalScenario =
    scenarioNormal;

  window.moderateWeatherScenario =
    scenarioModerateWeather;

  window.heavyWeatherScenario =
    scenarioHeavyWeather;

  window.criticalScenario =
    scenarioCritical;

  window.currentSurgeScenario =
    scenarioCurrentSurge;

  window.heavySeaStateScenario =
    scenarioHeavySeaState;

  window.windGustScenario =
    scenarioWindGust;

  window.combinedDisturbanceScenario =
    scenarioCombinedDisturbance;

  window.randomScenario =
    scenarioRandom;

  /* ==========================================================
   * GLOBAL HUMAN / SYSTEM HANDLERS
   *
   * Required because the supplied index.html contains
   * inline onclick handlers.
   * ========================================================== */

  window.runSimulation =
    runSimulation;

  window.resetSystem =
    resetSystem;

  window.acknowledgeCondition =
    acknowledgeCondition;

  window.maintainSafeState =
    maintainSafeState;

  window.authorizeSimulatedResponse =
    authorizeSimulatedResponse;

  /* ==========================================================
   * PUBLIC API
   * ========================================================== */

  const publicAPI = {
    name:
      MODULE_NAME,

    version:
      VERSION,

    simulationEngineVersion:
      SIMULATION_ENGINE_VERSION,

    recommendedActionsVersion:
      RECOMMENDED_ACTIONS_VERSION,

    safetyBoundary:
      SAFETY_BOUNDARY,

    positioningModes:
      POSITIONING_MODES,

    engineLoadModes:
      ENGINE_LOAD_MODES,

    humanDecisions:
      HUMAN_DECISIONS,

    runSimulation,

    resetSystem,

    acknowledgeCondition,

    maintainSafeState,

    authorizeSimulatedResponse,

    getSystemSetup,

    readEnvironment,

    getLastResult:
      function () {
        return lastResult;
      },

    getLastEnvironment:
      function () {
        return lastEnvironment;
      },

    getHumanDecisionState:
      function () {
        return humanDecisionState;
      }
  };

  window.SextantDPCockpit =
    publicAPI;

  window.SextantDPResilienceCockpit =
    publicAPI;

  window.DPResilienceCockpit =
    publicAPI;

  /* ==========================================================
   * VALIDATION
   * ========================================================== */

  function validateSafetyBoundary() {
    const valid =
      SAFETY_BOUNDARY.simulationOnly ===
        true &&
      SAFETY_BOUNDARY.autonomousExecution ===
        false &&
      SAFETY_BOUNDARY.operationalVesselConnection ===
        false &&
      SAFETY_BOUNDARY.actuatorInterface ===
        false &&
      SAFETY_BOUNDARY.externalSystemCommand ===
        false &&
      SAFETY_BOUNDARY.humanAuthorityFinal ===
        true &&
      SAFETY_BOUNDARY.realDPCommand ===
        false;

    if (!valid) {
      console.error(
        "[Sextant Cockpit] SAFETY BOUNDARY VALIDATION FAILED"
      );

      return false;
    }

    console.info(
      "[Sextant Cockpit] Safety boundary validation: PASS"
    );

    return true;
  }

  function validateModeDefinitions() {
    const valid =
      POSITIONING_MODES.NON_BIAS ===
        "NON_BIAS" &&
      POSITIONING_MODES.BIAS ===
        "BIAS" &&
      ENGINE_LOAD_MODES.NORMAL ===
        "NORMAL" &&
      ENGINE_LOAD_MODES.PUSH_UP ===
        "PUSH_UP";

    if (!valid) {
      console.error(
        "[Sextant Cockpit] Mode definition validation FAILED"
      );

      return false;
    }

    console.info(
      "[Sextant Cockpit] Positioning / engine-load distinction: PASS"
    );

    return true;
  }

  function validateHumanAuthority() {
    const engine =
      getSimulationEngine();

    if (!engine) {
      console.warn(
        "[Sextant Cockpit] Human authority validation deferred — engine unavailable."
      );

      return false;
    }

    const methodsAvailable =
      typeof engine.acknowledgeHumanDecision ===
        "function" ||
      typeof engine.maintainSafeState ===
        "function" ||
      typeof engine.authorizeSimulatedResponse ===
        "function";

    console.info(
      "[Sextant Cockpit] Human authority interface:",
      methodsAvailable
        ? "AVAILABLE"
        : "NOT DETECTED"
    );

    return methodsAvailable;
  }

  /* ==========================================================
   * BOOT
   * ========================================================== */

  function boot() {
    console.info(
      "============================================================"
    );

    console.info(
      "SEXTANT PROTOCOL™ DP RESILIENCE V&V RESEARCH COCKPIT"
    );

    console.info(
      "Controller Version:",
      VERSION
    );

    console.info(
      "Simulation Engine:",
      SIMULATION_ENGINE_VERSION
    );

    console.info(
      "Recommended Actions:",
      RECOMMENDED_ACTIONS_VERSION
    );

    console.info(
      "============================================================"
    );

    validateSafetyBoundary();

    validateModeDefinitions();

    validateHumanAuthority();

    updateSafetyDisplay();

    updateEngineStatus();

    updateSystemSetupDisplay(
      getSystemSetup()
    );

    /*
     * Do not automatically run simulation.
     */
    resetDynamicDisplay();

    updateSystemSetupDisplay(
      getSystemSetup()
    );

    updateSafetyDisplay();

    updateEngineStatus();

    wireButtons();

    console.info(
      "[Sextant Cockpit] BOOT COMPLETE"
    );

    console.info(
      "[Sextant Cockpit] Golden Rule:",
      "OBSERVE → VERIFY → ASSESS → DECIDE → ACT → UPDATE"
    );

    console.info(
      "[Sextant Cockpit] PUSH-UP ≠ POSITIONING BIAS"
    );

    console.info(
      "[Sextant Cockpit] PUSH-UP requires reserve-power verification"
    );

    console.info(
      "[Sextant Cockpit] Human authorization remains mandatory"
    );

    console.info(
      "[Sextant Cockpit] No autonomous operational execution"
    );

    console.info(
      "[Sextant Cockpit] v2.6.3 environment IDs:",
      "wind / current / wave / tidal"
    );

    console.info(
      "[Sextant Cockpit] Reserve source:",
      "result.reservePowerVerification"
    );
  }

  if (
    document.readyState ===
    "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      {
        once: true
      }
    );
  } else {
    boot();
  }

})();