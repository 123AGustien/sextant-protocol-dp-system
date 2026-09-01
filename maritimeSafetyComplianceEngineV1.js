/* =========================================================
   SEXTANT PROTOCOL™
   MARITIME SAFETY & COMPLIANCE ENGINE
   MARIN DP / USV V&V RESEARCH MODULE

   ENGINE:
   MaritimeSafetyComplianceEngineV1

   VERSION:
   1.2.0

   PURPOSE:
   Research/V&V assessment framework covering vessel
   condition, statutory/class review indicators, safety
   equipment, navigation, communications, accommodation,
   machinery and operational readiness.

   IMPORTANT:
   RESEARCH / SIMULATION ONLY.

   This engine does NOT:
   - determine legal compliance;
   - replace Flag State requirements;
   - replace Class requirements;
   - replace statutory certificates;
   - replace vessel SMS procedures;
   - replace company contingency plans;
   - replace Master/DPO authority;
   - issue operational commands;
   - control DP, propulsion, steering, navigation,
     safety or other vessel systems.
========================================================= */


/* =========================================================
   ENGINE IDENTITY
========================================================= */

const MaritimeSafetyComplianceEngineV1 = {

    version: "1.2.0",

    mode: "RESEARCH_V_AND_V",

    operationalConnection: false,

    autonomousCommand: false,

    humanAuthority: true,


    /* =====================================================
       MAIN ASSESSMENT
    ===================================================== */

    assess(condition = {}) {

        /* =================================================
           INPUT GROUPS
        ================================================= */

        const bridge =
            condition.bridge || {};

        const navigation =
            condition.navigation || {};

        const navigationLights =
            condition.navigationLights || {};

        const soundSignals =
            condition.soundSignals || {};

        const gmdss =
            condition.gmdss || {};

        const deck =
            condition.deck || {};

        const hull =
            condition.hull || {};

        const stability =
            condition.stability || {};

        const loading =
            condition.loading || {};

        const loadLine =
            condition.loadLine || {};

        const draft =
            condition.draft || {};

        const trim =
            condition.trim || {};

        const environmental =
            condition.environmental || {};

        const ballastWater =
            condition.ballastWater || {};

        const emissions =
            condition.emissions || {};

        const flagState =
            condition.flagState || {};

        const statutory =
            condition.statutory || {};

        const surveys =
            condition.surveys || {};

        const classRequirements =
            condition.classRequirements || {};


        /* =================================================
           BRIDGE / NAVIGATION
        ================================================= */

        const bridgeInspectionCurrent =
            bridge.inspectionCurrent === true;

        const bridgeNavigationSystemsReviewed =
            bridge.navigationSystemsReviewed === true;

        const bridgeSteeringSystemsReviewed =
            bridge.steeringSystemsReviewed === true;

        const bridgeAlarmSystemsReviewed =
            bridge.alarmSystemsReviewed === true;

        const bridgeEmergencyControlsReviewed =
            bridge.emergencyControlsReviewed === true;

        const bridgeVisibilityReviewed =
            bridge.visibilityReviewed === true;


        let bridgeStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            bridgeInspectionCurrent &&
            bridgeNavigationSystemsReviewed &&
            bridgeSteeringSystemsReviewed &&
            bridgeAlarmSystemsReviewed &&
            bridgeEmergencyControlsReviewed &&
            bridgeVisibilityReviewed
        ) {

            bridgeStatus =
                "SIMULATED_BRIDGE_REVIEW_COMPLETE";

        }


        /* =================================================
           NAVIGATION EQUIPMENT
        ================================================= */

        const radarAvailable =
            navigation.radarAvailable === true;

        const ecdisAvailable =
            navigation.ecdisAvailable === true;

        const gyroAvailable =
            navigation.gyroAvailable === true;

        const gpsGnssAvailable =
            navigation.gpsGnssAvailable === true;

        const aisAvailable =
            navigation.aisAvailable === true;

        const echoSounderAvailable =
            navigation.echoSounderAvailable === true;

        const speedLogAvailable =
            navigation.speedLogAvailable === true;

        const navEquipmentInspectionCurrent =
            navigation.inspectionCurrent === true;


        let navigationStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            radarAvailable &&
            ecdisAvailable &&
            gyroAvailable &&
            gpsGnssAvailable &&
            aisAvailable &&
            echoSounderAvailable &&
            speedLogAvailable &&
            navEquipmentInspectionCurrent
        ) {

            navigationStatus =
                "SIMULATED_NAVIGATION_REVIEW_COMPLETE";

        }


        /* =================================================
           NAVIGATION LIGHTS
        ================================================= */

        const navigationLightsAvailable =
            navigationLights.available === true;

        const navigationLightsOperational =
            navigationLights.operational === true;

        const navigationLightsInspectionCurrent =
            navigationLights.inspectionCurrent === true;

        const navigationLightsSurveyCurrent =
            navigationLights.surveyCurrent === true;


        let navigationLightsStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            navigationLightsAvailable &&
            navigationLightsOperational &&
            navigationLightsInspectionCurrent &&
            navigationLightsSurveyCurrent
        ) {

            navigationLightsStatus =
                "SIMULATED_NAVIGATION_LIGHTS_REVIEW_COMPLETE";

        }


        /* =================================================
           SOUND SIGNALS
        ================================================= */

        const soundSignalEquipmentAvailable =
            soundSignals.equipmentAvailable === true;

        const soundSignalsOperational =
            soundSignals.operational === true;

        const soundSignalsInspectionCurrent =
            soundSignals.inspectionCurrent === true;

        const soundSignalsSurveyCurrent =
            soundSignals.surveyCurrent === true;


        let soundSignalsStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            soundSignalEquipmentAvailable &&
            soundSignalsOperational &&
            soundSignalsInspectionCurrent &&
            soundSignalsSurveyCurrent
        ) {

            soundSignalsStatus =
                "SIMULATED_SOUND_SIGNAL_REVIEW_COMPLETE";

        }


        /* =================================================
           GMDSS / RADIO
        ================================================= */

        const gmdssRequired =
            gmdss.required === true;

        const gmdssEquipmentAvailable =
            gmdss.equipmentAvailable === true;

        const gmdssInspectionCurrent =
            gmdss.inspectionCurrent === true;

        const gmdssRadioSurveyCurrent =
            gmdss.radioSurveyCurrent === true;

        const gmdssCertificatesCurrent =
            gmdss.certificatesCurrent === true;


        let gmdssStatus =
            "NOT_ASSESSED";


        if (
            !gmdssRequired
        ) {

            gmdssStatus =
                "SIMULATED_NOT_REQUIRED";

        }
        else if (
            gmdssEquipmentAvailable &&
            gmdssInspectionCurrent &&
            gmdssRadioSurveyCurrent &&
            gmdssCertificatesCurrent
        ) {

            gmdssStatus =
                "SIMULATED_GMDSS_REVIEW_COMPLETE";

        }
        else {

            gmdssStatus =
                "SIMULATED_GMDSS_REVIEW_REQUIRED";

        }


        /* =================================================
           DECK / WEATHER DECK
        ================================================= */

        const deckInspectionCurrent =
            deck.inspectionCurrent === true;

        const deckEquipmentSecured =
            deck.equipmentSecured === true;

        const deckAccessSafe =
            deck.accessSafe === true;

        const deckEmergencyEquipmentAccessible =
            deck.emergencyEquipmentAccessible === true;

        const deckStructuralConditionReviewed =
            deck.structuralConditionReviewed === true;


        let deckStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            deckInspectionCurrent &&
            deckEquipmentSecured &&
            deckAccessSafe &&
            deckEmergencyEquipmentAccessible &&
            deckStructuralConditionReviewed
        ) {

            deckStatus =
                "SIMULATED_DECK_REVIEW_COMPLETE";

        }


        /* =================================================
           HULL / STRUCTURAL CONDITION
        ================================================= */

        const hullSurveyCurrent =
            hull.surveyCurrent === true;

        const hullInspectionCurrent =
            hull.inspectionCurrent === true;

        const hullStructuralConditionReviewed =
            hull.structuralConditionReviewed === true;

        const hullWatertightIntegrityReviewed =
            hull.watertightIntegrityReviewed === true;

        const hullCorrosionAssessmentCurrent =
            hull.corrosionAssessmentCurrent === true;

        const hullDamageAssessmentCurrent =
            hull.damageAssessmentCurrent === true;


        let hullStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            hullSurveyCurrent &&
            hullInspectionCurrent &&
            hullStructuralConditionReviewed &&
            hullWatertightIntegrityReviewed &&
            hullCorrosionAssessmentCurrent &&
            hullDamageAssessmentCurrent
        ) {

            hullStatus =
                "SIMULATED_HULL_SURVEY_COMPLETE";

        }


        /* =================================================
           STABILITY — GENERAL
        ================================================= */

        const stabilityBookReviewed =
            stability.stabilityBookReviewed === true;

        const intactStabilityReviewed =
            stability.intactStabilityReviewed === true;

        const damageStabilityReviewed =
            stability.damageStabilityReviewed === true;

        const dynamicStabilityReviewed =
            stability.dynamicStabilityReviewed === true;

        const gzCurveReviewed =
            stability.gzCurveReviewed === true;

        const rightingMomentReviewed =
            stability.rightingMomentReviewed === true;

        const kgCgReviewed =
            stability.kgCgReviewed === true;

        const freeSurfaceEffectReviewed =
            stability.freeSurfaceEffectReviewed === true;


        let stabilityStatus =
            "SIMULATED_STABILITY_REVIEW_REQUIRED";


        if (
            stabilityBookReviewed &&
            intactStabilityReviewed &&
            damageStabilityReviewed &&
            dynamicStabilityReviewed &&
            gzCurveReviewed &&
            rightingMomentReviewed &&
            kgCgReviewed &&
            freeSurfaceEffectReviewed
        ) {

            stabilityStatus =
                "SIMULATED_STABILITY_REVIEW_COMPLETE";

        }


        /* =================================================
           HEEL / LIST / TRIM
        ================================================= */

        const heelReviewed =
            stability.heelReviewed === true;

        const listReviewed =
            stability.listReviewed === true;

        const combinedHeelListReviewed =
            stability.combinedHeelListReviewed === true;

        const controlledSwingReviewed =
            stability.controlledSwingReviewed === true;

        const rateOfTurnEffectReviewed =
            stability.rateOfTurnEffectReviewed === true;

        const cgShiftReviewed =
            stability.cgShiftReviewed === true;


        let dynamicStabilityStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            heelReviewed &&
            listReviewed &&
            combinedHeelListReviewed &&
            controlledSwingReviewed &&
            rateOfTurnEffectReviewed &&
            cgShiftReviewed
        ) {

            dynamicStabilityStatus =
                "SIMULATED_DYNAMIC_STABILITY_REVIEW_COMPLETE";

        }


        /* =================================================
           LOADING CONDITION
        ================================================= */

        const loadingConditionReviewed =
            loading.conditionReviewed === true;

        const cargoDistributionReviewed =
            loading.cargoDistributionReviewed === true;

        const tankLoadingReviewed =
            loading.tankLoadingReviewed === true;

        const ballastDistributionReviewed =
            loading.ballastDistributionReviewed === true;

        const deadweightReviewed =
            loading.deadweightReviewed === true;


        let loadingStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            loadingConditionReviewed &&
            cargoDistributionReviewed &&
            tankLoadingReviewed &&
            ballastDistributionReviewed &&
            deadweightReviewed
        ) {

            loadingStatus =
                "SIMULATED_LOADING_REVIEW_COMPLETE";

        }


        /* =================================================
           LOAD LINE / FREEBOARD
        ================================================= */

        const loadLineCertificateCurrent =
            loadLine.certificateCurrent === true;

        const loadLineSurveyCurrent =
            loadLine.surveyCurrent === true;

        const freeboardReviewed =
            loadLine.freeboardReviewed === true;

        const permittedDraftReviewed =
            loadLine.permittedDraftReviewed === true;

        const zoneDraftPermitReviewed =
            loadLine.zoneDraftPermitReviewed === true;


        let loadLineStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            loadLineCertificateCurrent &&
            loadLineSurveyCurrent &&
            freeboardReviewed &&
            permittedDraftReviewed &&
            zoneDraftPermitReviewed
        ) {

            loadLineStatus =
                "SIMULATED_LOADLINE_REVIEW_COMPLETE";

        }


        /*

/* =========================================================
   DRAFT / DOCK WATER DENSITY / FWA / DWA / UKC
   ALL DRAFT CORRECTIONS IN MILLIMETRES
========================================================= */

/*
   REFERENCE:

   Standard seawater density = 1.025 t/m³

   DENSITY LOWER THAN SEAWATER:
   Dock water density < 1.025
   → vessel sinks deeper
   → draft INCREASES
   → DWA is POSITIVE

   DENSITY HIGHER THAN SEAWATER:
   Dock water density > 1.025
   → vessel floats higher
   → draft DECREASES
   → DWA is NEGATIVE

   DENSITY EQUAL TO SEAWATER:
   Dock water density = 1.025
   → DWA = 0
   → no density correction
*/


const draftCalculation =
    condition.draftCalculation || {};


/* =================================================
   INPUTS
================================================= */

const WaterDensity =
    Number(draftCalculation.waterDensity_t_m3);

const Displacement =
    Number(draftCalculation.displacement_t);

const TPC =
    Number(draftCalculation.tpc_t_per_cm);

const ReferenceDraft_mm =
    Number(draftCalculation.referenceDraft_mm);


/* =================================================
   FRESH WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   FWA (mm) =
   Displacement / (4 × TPC)

   FWA is the change of draft between
   seawater density 1.025 and fresh water density 1.000.
*/

const FWA_mm =
    (Displacement > 0 && TPC > 0)
        ? Displacement / (4 * TPC)
        : 0;


/* =================================================
   DOCK WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   DWA (mm) =
   FWA × (1.025 - actual water density) / 0.025

   Positive DWA  = draft increases
   Negative DWA  = draft decreases
*/

const DWA_mm =
    FWA_mm *
    ((1.025 - WaterDensity) / 0.025);


/* =================================================
   CORRECTED DRAFT — MILLIMETRES
================================================= */

const CorrectedDraft_mm =
    ReferenceDraft_mm +
    DWA_mm;


/* =================================================
   DENSITY EFFECT
================================================= */

let DraftDensityEffect =
    "NO_DRAFT_CHANGE";


if (WaterDensity < 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_LOWER_THAN_SEAWATER — DRAFT INCREASES";

}


if (WaterDensity > 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_HIGHER_THAN_SEAWATER — DRAFT DECREASES";

}


if (WaterDensity === 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_EQUAL_TO_SEAWATER — NO_DENSITY_CORRECTION";

}


/* =================================================
   DRAFT CHANGE SIGN
================================================= */

const DraftIncrease_mm =
    DWA_mm > 0
        ? DWA_mm
        : 0;


const DraftDecrease_mm =
    DWA_mm < 0
        ? Math.abs(DWA_mm)
        : 0;


/* =================================================
   TIDE / CHART DATUM
================================================= */

/*
   Water Depth =
   Chart Datum Depth + Height of Tide
*/

const ChartDatumDepth_mm =
    Number(draftCalculation.chartDatumDepth_mm);

const TideHeight_mm =
    Number(draftCalculation.tideHeight_mm);


const WaterDepth_mm =
    ChartDatumDepth_mm +
    TideHeight_mm;


/* =================================================
   BASIC UNDER-KEEL CLEARANCE — MILLIMETRES
================================================= */

const BasicUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm;


/* =================================================
   TRIM
================================================= */

const ForwardDraft_mm =
    Number(draftCalculation.forwardDraft_mm);

const AftDraft_mm =
    Number(draftCalculation.aftDraft_mm);


const Trim_mm =
    AftDraft_mm -
    ForwardDraft_mm;


/*
   Mean draft based on forward and aft drafts.
*/

const MeanDraft_mm =
    (
        ForwardDraft_mm +
        AftDraft_mm
    ) / 2;


/* =================================================
   SQUAT / OTHER UKC ALLOWANCES
================================================= */

const Squat_mm =
    Number(draftCalculation.squat_mm) || 0;

const WaveAllowance_mm =
    Number(draftCalculation.waveAllowance_mm) || 0;

const OtherClearanceAllowance_mm =
    Number(
        draftCalculation.otherClearanceAllowance_mm
    ) || 0;

const RequiredUKC_mm =
    Number(draftCalculation.requiredUKC_mm) || 0;


/* =================================================
   AVAILABLE OPERATIONAL UKC — MILLIMETRES
================================================= */

const AvailableUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm -
    Squat_mm -
    WaveAllowance_mm -
    OtherClearanceAllowance_mm;


/* =================================================
   UKC STATUS
================================================= */

const UKC_PASS =
    AvailableUKC_mm >= RequiredUKC_mm;


const UKCStatus =
    UKC_PASS
        ? "SIMULATED_UKC_REQUIREMENT_SATISFIED"
        : "SIMULATED_UKC_REVIEW_REQUIRED";


/* =================================================
   DRAFT / DENSITY REVIEW STATUS
================================================= */

const draftDensityReviewStatus =
    (
        WaterDensity > 0 &&
        TPC > 0 &&
        Displacement > 0
    )
        ? "SIMULATED_DRAFT_DENSITY_REVIEW_COMPLETE"
        : "SIMULATED_DRAFT_DENSITY_REVIEW_REQUIRED";


/* =================================================
   TRACEABLE RESULT
================================================= */

const draftDensityUKCResult = {

    reference: {

        seawaterDensity_t_m3:
            1.025,

        freshwaterDensity_t_m3:
            1.000

    },


    inputs: {

        waterDensity_t_m3:
            WaterDensity,

        displacement_t:
            Displacement,

        tpc_t_per_cm:
            TPC,

        referenceDraft_mm:
            ReferenceDraft_mm

    },


    densityCorrection: {

        FWA_mm,

        DWA_mm,

        DraftIncrease_mm,

        DraftDecrease_mm,

        CorrectedDraft_mm,

        effect:
            DraftDensityEffect

    },


    navigationDepth: {

        chartDatumDepth_mm:
            ChartDatumDepth_mm,

        tideHeight_mm:
            TideHeight_mm,

        waterDepth_mm:
            WaterDepth_mm

    },


    vesselDraft: {

        forwardDraft_mm:
            ForwardDraft_mm,

        aftDraft_mm:
            AftDraft_mm,

        meanDraft_mm:
            MeanDraft_mm,

        trim_mm:
            Trim_mm

    },


    underKeelClearance: {

        basicUKC_mm:
            BasicUKC_mm,

        squat_mm:
            Squat_mm,

        waveAllowance_mm:
            WaveAllowance_mm,

        otherClearanceAllowance_mm:
            OtherClearanceAllowance_mm,

        availableUKC_mm:
            AvailableUKC_mm,

        requiredUKC_mm:
            RequiredUKC_mm,

        pass:
            UKC_PASS,

        status:
            UKCStatus

    },


    assessment: {

        status:
            draftDensityReviewStatus

    },


    execution: {

        gate:
            "HUMAN AUTHORIZATION REQUIRED",

        executed:
            false,

        operationalCommand:
            false

    }

};


/* =================================================
   GLOBAL ACCESS
================================================= */

if (
    typeof window !== "undefined"
) {

    window.MaritimeDraftDensityUKCReviewV1 =
        draftDensityUKCResult;

} =================================================
           DRAFT
        ================================================= */

        const forwardDraftReviewed =
            draft.forwardDraftReviewed === true;

        const aftDraftReviewed =
            draft.aftDraftReviewed === true;

        const meanDraftReviewed =
            draft.meanDraftReviewed === true;

        const maximumDraftReviewed =
            draft.maximumDraftReviewed === true;

        const draftLimitReviewed =
            draft.draftLimitReviewed === true;


        let draftStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            forwardDraftReviewed &&
            aftDraftReviewed &&
            meanDraftReviewed &&
            maximumDraftReviewed &&
            draftLimitReviewed
        ) {

            draftStatus =
                "SIMULATED_DRAFT_REVIEW_COMPLETE";

        }


        /* =================================================
           TRIM
        ================================================= */

        const trimConditionReviewed =
            trim.conditionReviewed === true;

        const trimLimitReviewed =
            trim.limitReviewed === true;

        const trimOperationalEffectReviewed =
            trim.operationalEffectReviewed === true;


        let trimStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            trimConditionReviewed &&
            trimLimitReviewed &&
            trimOperationalEffectReviewed
        ) {

            trimStatus =
                "SIMULATED_TRIM_REVIEW_COMPLETE";

        }


        /* =================================================
           BALLAST WATER
        ================================================= */

        const ballastManagementPlanAvailable =
            ballastWater.managementPlanAvailable === true;

        const ballastRecordBookCurrent =
            ballastWater.recordBookCurrent === true;

        const ballastTreatmentSystemReviewed =
            ballastWater.treatmentSystemReviewed === true;

        const ballastCertificateCurrent =
            ballastWater.certificateCurrent === true;


        let ballastWaterStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            ballastManagementPlanAvailable &&
            ballastRecordBookCurrent &&
            ballastTreatmentSystemReviewed &&
            ballastCertificateCurrent
        ) {

            ballastWaterStatus =
                "SIMULATED_BALLAST_WATER_REVIEW_COMPLETE";

        }


        /* =================================================
           CARBON / EMISSIONS
        ================================================= */

        const emissionsDocumentationCurrent =
            emissions.documentationCurrent === true;

        const emissionsMonitoringAvailable =
            emissions.monitoringAvailable === true;

        const fuelRecordsCurrent =
            emissions.fuelRecordsCurrent === true;

        const emissionsSurveyCurrent =
            emissions.surveyCurrent === true;


        let emissionsStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            emissionsDocumentationCurrent &&
            emissionsMonitoringAvailable &&
            fuelRecordsCurrent &&
            emissionsSurveyCurrent
        ) {

            emissionsStatus =
                "SIMULATED_EMISSIONS_REVIEW_COMPLETE";

        }


        /* =================================================
           FLAG STATE
        ================================================= */

        const flagDeclared =
            flagState.declared === true;

        const flagRequirementsChecked =
            flagState.requirementsChecked === true;

        const flagDocumentationCurrent =
            flagState.documentationCurrent === true;


        let flagStateStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            flagDeclared &&
            flagRequirementsChecked &&
            flagDocumentationCurrent
        ) {

            flagStateStatus =
                "SIMULATED_FLAG_STATE_REVIEW_COMPLETE";

        }


        /* =================================================
           STATUTORY DOCUMENTATION
        ================================================= */

        const statutoryDocumentsCurrent =
            statutory.documentsCurrent === true;

        const statutoryInspectionCurrent =
            statutory.inspectionCurrent === true;

        const statutoryCertificatesCurrent =
            statutory.certificatesCurrent === true;


        let statutoryStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            statutoryDocumentsCurrent &&
            statutoryInspectionCurrent &&
            statutoryCertificatesCurrent
        ) {

            statutoryStatus =
                "SIMULATED_STATUTORY_REVIEW_COMPLETE";

        }


        /* =================================================
           SURVEYS / AUDITS
        ================================================= */

        const statutorySurveysCurrent =
            surveys.statutorySurveysCurrent === true;

        const flagStateSurveysCurrent =
            surveys.flagStateSurveysCurrent === true;

        const flagStateAuditsCurrent =
            surveys.flagStateAuditsCurrent === true;

        const annualSurveysCurrent =
            surveys.annualSurveysCurrent === true;

        const intermediateSurveysCurrent =
            surveys.intermediateSurveysCurrent === true;

        const renewalSurveysCurrent =
            surveys.renewalSurveysCurrent === true;

        const specialSurveysCurrent =
            surveys.specialSurveysCurrent === true;

        const radioSurveysCurrent =
            surveys.radioSurveysCurrent === true;


        let surveyStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            statutorySurveysCurrent &&
            flagStateSurveysCurrent &&
            flagStateAuditsCurrent &&
            annualSurveysCurrent &&
            intermediateSurveysCurrent &&
            renewalSurveysCurrent &&
            specialSurveysCurrent &&
            radioSurveysCurrent
        ) {

            surveyStatus =
                "SIMULATED_SURVEY_REVIEW_COMPLETE";

        }


        /* =================================================
           CLASS REQUIREMENTS
        ================================================= */

        const classRequirementsChecked =
            classRequirements.checked === true;

        const classDocumentationCurrent =
            classRequirements.documentationCurrent === true;


        let classStatus =
            "SIMULATED_REVIEW_REQUIRED";


        if (
            classRequirementsChecked &&
            classDocumentationCurrent
        ) {

            classStatus =
                "SIMULATED_CLASS_REVIEW_COMPLETE";

        }


        /* =================================================
           CONTINUE WITH PART 2
        ================================================= */
/* =========================================================
   PART 2
   SEXTANT PROTOCOL™
   MARITIME SAFETY & VESSEL READINESS V&V
   DECK • ENGINE • BRIDGE • ACCOMMODATION • CATERING • STORES

   RESEARCH / SIMULATION ONLY
========================================================= */


/* =========================================================
   HULL / DECK / VESSEL SUITABILITY
========================================================= */

const hull =
    condition.hull || {};

const hullSurveyCurrent =
    hull.surveyCurrent === true;

const hullIntegrityReviewed =
    hull.integrityReviewed === true;

const watertightIntegrityReviewed =
    hull.watertightIntegrityReviewed === true;

const deckConditionReviewed =
    hull.deckConditionReviewed === true;

const vesselSuitabilitySurveyCurrent =
    hull.vesselSuitabilitySurveyCurrent === true;

const loadLineConditionReviewed =
    hull.loadLineConditionReviewed === true;

const draftConditionReviewed =
    hull.draftConditionReviewed === true;

const trimConditionReviewed =
    hull.trimConditionReviewed === true;


let hullStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    hullSurveyCurrent &&
    hullIntegrityReviewed &&
    watertightIntegrityReviewed &&
    deckConditionReviewed &&
    vesselSuitabilitySurveyCurrent &&
    loadLineConditionReviewed &&
    draftConditionReviewed &&
    trimConditionReviewed
) {

    hullStatus =
        "SIMULATED_HULL_SUITABILITY_REVIEW_COMPLETE";

}


/* =========================================================
   STABILITY / HEEL / LIST / TRIM
========================================================= */

const stability =
    condition.stability || {};

const gmReviewed =
    stability.gmReviewed === true;

const gzCurveReviewed =
    stability.gzCurveReviewed === true;

const rightingMomentReviewed =
    stability.rightingMomentReviewed === true;

const dynamicStabilityReviewed =
    stability.dynamicStabilityReviewed === true;

const heelReviewed =
    stability.heelReviewed === true;

const listReviewed =
    stability.listReviewed === true;

const trimReviewed =
    stability.trimReviewed === true;

const cgShiftReviewed =
    stability.cgShiftReviewed === true;

const rateOfTurnReviewed =
    stability.rateOfTurnReviewed === true;

const controlledSwingReviewed =
    stability.controlledSwingReviewed === true;


let stabilityStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    gmReviewed &&
    gzCurveReviewed &&
    rightingMomentReviewed &&
    dynamicStabilityReviewed &&
    heelReviewed &&
    listReviewed &&
    trimReviewed &&
    cgShiftReviewed &&
    rateOfTurnReviewed &&
    controlledSwingReviewed
) {

    stabilityStatus =
        "SIMULATED_DYNAMIC_STABILITY_REVIEW_COMPLETE";

}


/* =========================================================
   LOAD LINE / ZONE / DRAFT
========================================================= */

const loadLine =
    condition.loadLine || {};

const loadLineCertificateCurrent =
    loadLine.certificateCurrent === true;

const assignedLoadLineReviewed =
    loadLine.assignedLoadLineReviewed === true;

const seasonalZoneReviewed =
    loadLine.seasonalZoneReviewed === true;

const geographicalZoneReviewed =
    loadLine.geographicalZoneReviewed === true;

const permittedDraftReviewed =
    loadLine.permittedDraftReviewed === true;

const freeboardReviewed =
    loadLine.freeboardReviewed === true;


let loadLineStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    loadLineCertificateCurrent &&
    assignedLoadLineReviewed &&
    seasonalZoneReviewed &&
    geographicalZoneReviewed &&
    permittedDraftReviewed &&
    freeboardReviewed
) {

    loadLineStatus =
        "SIMULATED_LOADLINE_REVIEW_COMPLETE";

}


/* =========================================================
   BRIDGE / NAVIGATION
========================================================= */

const bridge =
    condition.bridge || {};

const navigationEquipmentAvailable =
    bridge.navigationEquipmentAvailable === true;

const navigationEquipmentTested =
    bridge.navigationEquipmentTested === true;

const navigationLightsCurrent =
    bridge.navigationLightsCurrent === true;

const soundSignalsCurrent =
    bridge.soundSignalsCurrent === true;

const compassReviewed =
    bridge.compassReviewed === true;

const radarReviewed =
    bridge.radarReviewed === true;

const ecdisReviewed =
    bridge.ecdisReviewed === true;

const aisReviewed =
    bridge.aisReviewed === true;

const gpsGnssReviewed =
    bridge.gpsGnssReviewed === true;

const navEquipmentCertificatesCurrent =
    bridge.certificatesCurrent === true;


let bridgeStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    navigationEquipmentAvailable &&
    navigationEquipmentTested &&
    navigationLightsCurrent &&
    soundSignalsCurrent &&
    compassReviewed &&
    radarReviewed &&
    ecdisReviewed &&
    aisReviewed &&
    gpsGnssReviewed &&
    navEquipmentCertificatesCurrent
) {

    bridgeStatus =
        "SIMULATED_BRIDGE_REVIEW_COMPLETE";

}


/* =========================================================
   GMDSS / RADIO
========================================================= */

const gmdss =
    condition.gmdss || {};

const gmdssRequired =
    gmdss.required === true;

const gmdssEquipmentAvailable =
    gmdss.equipmentAvailable === true;

const gmdssInspectionCurrent =
    gmdss.inspectionCurrent === true;

const gmdssRadioSurveyCurrent =
    gmdss.radioSurveyCurrent === true;

const gmdssCertificatesCurrent =
    gmdss.certificatesCurrent === true;


let gmdssStatus =
    "NOT_ASSESSED";


if (
    gmdssRequired &&
    gmdssEquipmentAvailable &&
    gmdssInspectionCurrent &&
    gmdssRadioSurveyCurrent &&
    gmdssCertificatesCurrent
) {

    gmdssStatus =
        "SIMULATED_GMDSS_REVIEW_COMPLETE";

}
else if (
    gmdssRequired
) {

    gmdssStatus =
        "SIMULATED_GMDSS_REVIEW_REQUIRED";

}
else {

    gmdssStatus =
        "SIMULATED_NOT_REQUIRED";

}


/* =========================================================
   ELECTRONIC / RADIO / NAVIGATION STORES
========================================================= */

const electronicStores =
    condition.electronicStores || {};

const electronicStoresInventoryCurrent =
    electronicStores.inventoryCurrent === true;

const navigationSparePartsAvailable =
    electronicStores.navigationSparePartsAvailable === true;

const gmdssSparePartsAvailable =
    electronicStores.gmdssSparePartsAvailable === true;

const communicationSparePartsAvailable =
    electronicStores.communicationSparePartsAvailable === true;

const antennaSparePartsAvailable =
    electronicStores.antennaSparePartsAvailable === true;

const cablesConnectorsAvailable =
    electronicStores.cablesConnectorsAvailable === true;

const fusesBreakersAvailable =
    electronicStores.fusesBreakersAvailable === true;

const batteriesAvailable =
    electronicStores.batteriesAvailable === true;

const lampsIndicatorsAvailable =
    electronicStores.lampsIndicatorsAvailable === true;

const electronicTestEquipmentAvailable =
    electronicStores.testEquipmentAvailable === true;

const criticalElectronicSparesIdentified =
    electronicStores.criticalSparesIdentified === true;

const electronicStoresProtected =
    electronicStores.storageProtected === true;


let electronicStoresStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    electronicStoresInventoryCurrent &&
    navigationSparePartsAvailable &&
    gmdssSparePartsAvailable &&
    communicationSparePartsAvailable &&
    antennaSparePartsAvailable &&
    cablesConnectorsAvailable &&
    fusesBreakersAvailable &&
    batteriesAvailable &&
    lampsIndicatorsAvailable &&
    electronicTestEquipmentAvailable &&
    criticalElectronicSparesIdentified &&
    electronicStoresProtected
) {

    electronicStoresStatus =
        "SIMULATED_ELECTRONIC_STORES_READY";

}


/* =========================================================
   DECK STORES / CARGO / MOORING
========================================================= */

const deckStores =
    condition.deckStores || {};

const deckInventoryCurrent =
    deckStores.inventoryCurrent === true;

const mooringEquipmentAvailable =
    deckStores.mooringEquipmentAvailable === true;

const towingEquipmentAvailable =
    deckStores.towingEquipmentAvailable === true;

const liftingEquipmentAvailable =
    deckStores.liftingEquipmentAvailable === true;

const deckSafetyEquipmentAvailable =
    deckStores.safetyEquipmentAvailable === true;

const anchorsAndCablesReviewed =
    deckStores.anchorsAndCablesReviewed === true;

const deckMachineryReviewed =
    deckStores.deckMachineryReviewed === true;

const cargoSecuringEquipmentAvailable =
    deckStores.cargoSecuringEquipmentAvailable === true;


let deckStoresStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    deckInventoryCurrent &&
    mooringEquipmentAvailable &&
    towingEquipmentAvailable &&
    liftingEquipmentAvailable &&
    deckSafetyEquipmentAvailable &&
    anchorsAndCablesReviewed &&
    deckMachineryReviewed &&
    cargoSecuringEquipmentAvailable
) {

    deckStoresStatus =
        "SIMULATED_DECK_STORES_READY";

}


/* =========================================================
   ENGINE ROOM / MACHINERY SPACE
========================================================= */

const machinery =
    condition.machinery || {};

const machinerySurveyCurrent =
    machinery.surveyCurrent === true;

const mainEngineInspectionCurrent =
    machinery.mainEngineInspectionCurrent === true;

const auxiliaryEngineInspectionCurrent =
    machinery.auxiliaryEngineInspectionCurrent === true;

const emergencyGeneratorInspectionCurrent =
    machinery.emergencyGeneratorInspectionCurrent === true;

const steeringGearInspectionCurrent =
    machinery.steeringGearInspectionCurrent === true;

const propulsionSystemsInspectionCurrent =
    machinery.propulsionSystemsInspectionCurrent === true;

const machinerySpaceConditionReviewed =
    machinery.machinerySpaceConditionReviewed === true;

const bilgeConditionReviewed =
    machinery.bilgeConditionReviewed === true;

const fuelSystemsReviewed =
    machinery.fuelSystemsReviewed === true;

const coolingSystemsReviewed =
    machinery.coolingSystemsReviewed === true;

const electricalSystemsReviewed =
    machinery.electricalSystemsReviewed === true;

const emergencySystemsReviewed =
    machinery.emergencySystemsReviewed === true;


let machineryStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    machinerySurveyCurrent &&
    mainEngineInspectionCurrent &&
    auxiliaryEngineInspectionCurrent &&
    emergencyGeneratorInspectionCurrent &&
    steeringGearInspectionCurrent &&
    propulsionSystemsInspectionCurrent &&
    machinerySpaceConditionReviewed &&
    bilgeConditionReviewed &&
    fuelSystemsReviewed &&
    coolingSystemsReviewed &&
    electricalSystemsReviewed &&
    emergencySystemsReviewed
) {

    machineryStatus =
        "SIMULATED_MACHINERY_SURVEY_COMPLETE";

}


/* =========================================================
   ENGINE ROOM STORES / SPARES
========================================================= */

const engineStores =
    condition.engineStores || {};

const engineStoresInventoryCurrent =
    engineStores.inventoryCurrent === true;

const criticalEngineSparesAvailable =
    engineStores.criticalSparesAvailable === true;

const generatorSparesAvailable =
    engineStores.generatorSparesAvailable === true;

const pumpSparesAvailable =
    engineStores.pumpSparesAvailable === true;

const electricalSparesAvailable =
    engineStores.electricalSparesAvailable === true;

const filtersLubricantsAvailable =
    engineStores.filtersLubricantsAvailable === true;

const emergencyRepairMaterialsAvailable =
    engineStores.emergencyRepairMaterialsAvailable === true;


let engineStoresStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    engineStoresInventoryCurrent &&
    criticalEngineSparesAvailable &&
    generatorSparesAvailable &&
    pumpSparesAvailable &&
    electricalSparesAvailable &&
    filtersLubricantsAvailable &&
    emergencyRepairMaterialsAvailable
) {

    engineStoresStatus =
        "SIMULATED_ENGINE_STORES_READY";

}


/* =========================================================
   FUEL / FRESH WATER / FOOD — RESERVE MARGIN
========================================================= */

const resources =
    condition.resources || {};

const fuelRequired =
    this.number(resources.fuelRequired, 0);

const fuelAvailable =
    this.number(resources.fuelAvailable, 0);

const waterRequired =
    this.number(resources.waterRequired, 0);

const waterAvailable =
    this.number(resources.waterAvailable, 0);

const foodRequired =
    this.number(resources.foodRequired, 0);

const foodAvailable =
    this.number(resources.foodAvailable, 0);


/*
   Research planning margin:
   available quantity should cover calculated requirement
   plus an additional 10% reserve.

   This is NOT a statutory minimum.
*/

const fuelReserveRequired =
    fuelRequired * 1.10;

const waterReserveRequired =
    waterRequired * 1.10;

const foodReserveRequired =
    foodRequired * 1.10;


const fuelReserveAdequate =
    fuelAvailable >= fuelReserveRequired;

const waterReserveAdequate =
    waterAvailable >= waterReserveRequired;

const foodReserveAdequate =
    foodAvailable >= foodReserveRequired;


let resourceStatus =
    "SIMULATED_RESOURCE_REVIEW_REQUIRED";


if (
    fuelReserveAdequate &&
    waterReserveAdequate &&
    foodReserveAdequate
) {

    resourceStatus =
        "SIMULATED_RESOURCE_RESERVE_ADEQUATE";

}


/* =========================================================
   CATERING / GALLEY / FOOD HYGIENE
========================================================= */

const catering =
    condition.catering || {};

const cateringInspectionCurrent =
    catering.inspectionCurrent === true;

const galleyInspectionCurrent =
    catering.galleyInspectionCurrent === true;

const foodHygieneInspectionCurrent =
    catering.foodHygieneInspectionCurrent === true;

const provisionsStorageInspectionCurrent =
    catering.provisionsStorageInspectionCurrent === true;

const potableWaterInspectionCurrent =
    catering.potableWaterInspectionCurrent === true;

const crewAccommodationInspectionCurrent =
    catering.crewAccommodationInspectionCurrent === true;

const foodStoresAvailable =
    catering.foodStoresAvailable === true;

const freshWaterAvailable =
    catering.freshWaterAvailable === true;

const galleyEquipmentReady =
    catering.galleyEquipmentReady === true;


let cateringStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    cateringInspectionCurrent &&
    galleyInspectionCurrent &&
    foodHygieneInspectionCurrent &&
    provisionsStorageInspectionCurrent &&
    potableWaterInspectionCurrent &&
    crewAccommodationInspectionCurrent &&
    foodStoresAvailable &&
    freshWaterAvailable &&
    galleyEquipmentReady
) {

    cateringStatus =
        "SIMULATED_CATERING_REVIEW_COMPLETE";

}


/* =========================================================
   ACCOMMODATION / CABINS / CREW WELFARE
========================================================= */

const accommodation =
    condition.accommodation || {};

const cabinsReviewed =
    accommodation.cabinsReviewed === true;

const accommodationConditionReviewed =
    accommodation.conditionReviewed === true;

const sanitationReviewed =
    accommodation.sanitationReviewed === true;

const ventilationReviewed =
    accommodation.ventilationReviewed === true;

const lightingReviewed =
    accommodation.lightingReviewed === true;

const emergencyEscapeRoutesReviewed =
    accommodation.emergencyEscapeRoutesReviewed === true;

const crewWelfareFacilitiesReviewed =
    accommodation.crewWelfareFacilitiesReviewed === true;


let accommodationStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    cabinsReviewed &&
    accommodationConditionReviewed &&
    sanitationReviewed &&
    ventilationReviewed &&
    lightingReviewed &&
    emergencyEscapeRoutesReviewed &&
    crewWelfareFacilitiesReviewed
) {

    accommodationStatus =
        "SIMULATED_ACCOMMODATION_REVIEW_COMPLETE";

}


/* =========================================================
   OVERALL VESSEL READINESS V&V
========================================================= */

const vesselReadinessPass =
    hullStatus ===
        "SIMULATED_HULL_SUITABILITY_REVIEW_COMPLETE" &&

    stabilityStatus ===
        "SIMULATED_DYNAMIC_STABILITY_REVIEW_COMPLETE" &&

    loadLineStatus ===
        "SIMULATED_LOADLINE_REVIEW_COMPLETE" &&

    bridgeStatus ===
        "SIMULATED_BRIDGE_REVIEW_COMPLETE" &&

    (
        gmdssStatus ===
            "SIMULATED_GMDSS_REVIEW_COMPLETE" ||
        gmdssStatus ===
            "SIMULATED_NOT_REQUIRED"
    ) &&

    electronicStoresStatus ===
        "SIMULATED_ELECTRONIC_STORES_READY" &&

    deckStoresStatus ===
        "SIMULATED_DECK_STORES_READY" &&

    machineryStatus ===
        "SIMULATED_MACHINERY_SURVEY_COMPLETE" &&

    engineStoresStatus ===
        "SIMULATED_ENGINE_STORES_READY" &&

    resourceStatus ===
        "SIMULATED_RESOURCE_RESERVE_ADEQUATE" &&

    cateringStatus ===
        "SIMULATED_CATERING_REVIEW_COMPLETE" &&

    accommodationStatus ===
        "SIMULATED_ACCOMMODATION_REVIEW_COMPLETE";


const vesselReadinessAction =
    vesselReadinessPass
        ? "MAINTAIN READINESS STATUS"
        : "ESCALATE / HUMAN REVIEW";


/* =========================================================
   TRACEABLE PART 2 RESULT
========================================================= */

const vesselReadinessVAndV = {

    hull: {
        status: hullStatus
    },

    stability: {
        status: stabilityStatus
    },

    loadLine: {
        status: loadLineStatus
    },

    bridge: {
        status: bridgeStatus
    },

    GMDSS: {
        status: gmdssStatus
    },

    electronicStores: {
        status: electronicStoresStatus
    },

    deckStores: {
        status: deckStoresStatus
    },

    machinery: {
        status: machineryStatus
    },

    engineStores: {
        status: engineStoresStatus
    },

    resources: {

        fuelRequired,
        fuelAvailable,
        fuelReserveRequired,
        fuelReserveAdequate,

        waterRequired,
        waterAvailable,
        waterReserveRequired,
        waterReserveAdequate,

        foodRequired,
        foodAvailable,
        foodReserveRequired,
        foodReserveAdequate,

        status:
            resourceStatus

    },

    catering: {
        status: cateringStatus
    },

    accommodation: {
        status: accommodationStatus
    },

    overall: {

        vesselReadinessPass,

        recommendedAction:
            vesselReadinessAction,

        humanAuthority:
            true,

        autonomousCommand:
            false,

        operationalConnection:
            false,

        executionGate:
            "HUMAN AUTHORIZATION REQUIRED"

    }

};


/* =========================================================
   GLOBAL ACCESS
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.vesselReadinessVAndV =
        vesselReadinessVAndV;

}
/* =========================================================
   FINAL MARITIME SAFETY / VESSEL SUITABILITY CHECKLIST
   EXPANDABLE V&V REVIEW LAYER
========================================================= */


/* =================================================
   VESSEL IDENTIFICATION / MARKINGS
================================================= */

const identification =
    condition.identification || {};

const vesselNameMarkingCurrent =
    identification.vesselNameMarkingCurrent === true;

const imoNumberMarkingCurrent =
    identification.imoNumberMarkingCurrent === true;

const portOfRegistryMarkingCurrent =
    identification.portOfRegistryMarkingCurrent === true;

const funnelLogoMarkingCurrent =
    identification.funnelLogoMarkingCurrent === true;

const identificationMarkingsReviewed =
    identification.identificationMarkingsReviewed === true;


/* =================================================
   BRIDGE / NAVIGATION SAFETY
================================================= */

const bridgeNavigation =
    condition.bridgeNavigation || {};

const navigationEquipmentReviewed =
    bridgeNavigation.navigationEquipmentReviewed === true;

const navigationLightsCurrent =
    bridgeNavigation.navigationLightsCurrent === true;

const soundSignalsCurrent =
    bridgeNavigation.soundSignalsCurrent === true;

const compassAndHeadingSystemsReviewed =
    bridgeNavigation.compassAndHeadingSystemsReviewed === true;

const bridgeEmergencyEquipmentReviewed =
    bridgeNavigation.emergencyEquipmentReviewed === true;

const navigationPublicationsCurrent =
    bridgeNavigation.navigationPublicationsCurrent === true;

const bridgeSafetyEquipmentCurrent =
    bridgeNavigation.safetyEquipmentCurrent === true;


/* =================================================
   GMDSS / RADIO
================================================= */

const gmdss =
    condition.gmdss || {};

const gmdssRequired =
    gmdss.required === true;

const gmdssEquipmentAvailable =
    gmdss.equipmentAvailable === true;

const gmdssInspectionCurrent =
    gmdss.inspectionCurrent === true;

const gmdssRadioSurveyCurrent =
    gmdss.radioSurveyCurrent === true;

const gmdssCertificatesCurrent =
    gmdss.certificatesCurrent === true;


/* =================================================
   FLAG-STATE / STATUTORY AUDITS & SURVEYS
================================================= */

const surveys =
    condition.surveys || {};

const statutorySurveysCurrent =
    surveys.statutorySurveysCurrent === true;

const flagStateSurveysCurrent =
    surveys.flagStateSurveysCurrent === true;

const flagStateAuditsCurrent =
    surveys.flagStateAuditsCurrent === true;

const annualSurveysCurrent =
    surveys.annualSurveysCurrent === true;

const intermediateSurveysCurrent =
    surveys.intermediateSurveysCurrent === true;

const renewalSurveysCurrent =
    surveys.renewalSurveysCurrent === true;

const specialSurveysCurrent =
    surveys.specialSurveysCurrent === true;

const radioSurveysCurrent =
    surveys.radioSurveysCurrent === true;

const loadLineSurveyCurrent =
    surveys.loadLineSurveyCurrent === true;

const safetyConstructionSurveyCurrent =
    surveys.safetyConstructionSurveyCurrent === true;

const safetyEquipmentSurveyCurrent =
    surveys.safetyEquipmentSurveyCurrent === true;

const safetyRadioSurveyCurrent =
    surveys.safetyRadioSurveyCurrent === true;


/* =================================================
   MACHINERY / ENGINE / STEERING
================================================= */

const machinery =
    condition.machinery || {};

const machinerySurveyCurrent =
    machinery.surveyCurrent === true;

const mainEngineInspectionCurrent =
    machinery.mainEngineInspectionCurrent === true;

const auxiliaryEngineInspectionCurrent =
    machinery.auxiliaryEngineInspectionCurrent === true;

const emergencyGeneratorInspectionCurrent =
    machinery.emergencyGeneratorInspectionCurrent === true;

const steeringGearInspectionCurrent =
    machinery.steeringGearInspectionCurrent === true;

const propulsionSystemsInspectionCurrent =
    machinery.propulsionSystemsInspectionCurrent === true;

const machinerySpaceInspectionCurrent =
    machinery.machinerySpaceInspectionCurrent === true;


/* =================================================
   HULL / STRUCTURAL / NDT
================================================= */

const hull =
    condition.hull || {};

const hullSurveyCurrent =
    hull.surveyCurrent === true;

const structuralInspectionCurrent =
    hull.structuralInspectionCurrent === true;

const hullNdtCurrent =
    hull.ndtCurrent === true;

const machineryNdtCurrent =
    hull.machineryNdtCurrent === true;

const tankInspectionCurrent =
    hull.tankInspectionCurrent === true;

const watertightIntegrityReviewed =
    hull.watertightIntegrityReviewed === true;


/* =================================================
   STABILITY / TRIM / LOADLINE
================================================= */

const stability =
    condition.stability || {};

const stabilityBookletCurrent =
    stability.stabilityBookletCurrent === true;

const intactStabilityReviewed =
    stability.intactStabilityReviewed === true;

const dynamicStabilityReviewed =
    stability.dynamicStabilityReviewed === true;

const heelAndListReviewed =
    stability.heelAndListReviewed === true;

const trimReviewed =
    stability.trimReviewed === true;

const gzCurveOrRightingArmReviewed =
    stability.gzCurveOrRightingArmReviewed === true;

const rightingMomentReviewed =
    stability.rightingMomentReviewed === true;

const cgShiftReviewed =
    stability.cgShiftReviewed === true;

const controlledRateOfTurnReviewed =
    stability.controlledRateOfTurnReviewed === true;

const loadLineCertificateCurrent =
    stability.loadLineCertificateCurrent === true;

const assignedFreeboardReviewed =
    stability.assignedFreeboardReviewed === true;

const zoneAndSeasonRestrictionsReviewed =
    stability.zoneAndSeasonRestrictionsReviewed === true;

const permittedDraftReviewed =
    stability.permittedDraftReviewed === true;


/* =================================================
   VESSEL CLASS / NOTATION
================================================= */

const vesselClass =
    condition.vesselClass || {};

const vesselClassDeclared =
    vesselClass.declared === true;

const classCertificateCurrent =
    vesselClass.certificateCurrent === true;

const classNotationCurrent =
    vesselClass.notationCurrent === true;

const dpNotationApplicable =
    vesselClass.dpNotationApplicable === true;

const dpNotationCurrent =
    vesselClass.dpNotationCurrent === true;

const iceClassApplicable =
    vesselClass.iceClassApplicable === true;

const iceClassCurrent =
    vesselClass.iceClassCurrent === true;

const vesselSuitabilitySurveyCurrent =
    vesselClass.suitabilitySurveyCurrent === true;


/* =================================================
   OPERATING AREA / DISTANCE FROM SHORE
================================================= */

const operatingArea =
    condition.operatingArea || {};

const operatingAreaDeclared =
    operatingArea.declared === true;

const permittedDistanceFromShoreReviewed =
    operatingArea.permittedDistanceFromShoreReviewed === true;

const coastalStateRequirementsReviewed =
    operatingArea.coastalStateRequirementsReviewed === true;

const operatingRestrictionsCurrent =
    operatingArea.operatingRestrictionsCurrent === true;


/* =================================================
   CATERING / ACCOMMODATION / CREW WELFARE
================================================= */

const catering =
    condition.catering || {};

const cateringInspectionCurrent =
    catering.inspectionCurrent === true;

const galleyInspectionCurrent =
    catering.galleyInspectionCurrent === true;

const foodHygieneInspectionCurrent =
    catering.foodHygieneInspectionCurrent === true;

const provisionsStorageInspectionCurrent =
    catering.provisionsStorageInspectionCurrent === true;

const potableWaterInspectionCurrent =
    catering.potableWaterInspectionCurrent === true;

const accommodationInspectionCurrent =
    catering.accommodationInspectionCurrent === true;

const crewCabinsReviewed =
    catering.crewCabinsReviewed === true;

const sanitaryFacilitiesReviewed =
    catering.sanitaryFacilitiesReviewed === true;


/* =================================================
   ONBOARD LOGISTICS / STORES
================================================= */

const stores =
    condition.stores || {};

const deckStoresReviewed =
    stores.deckStoresReviewed === true;

const engineStoresReviewed =
    stores.engineStoresReviewed === true;

const cateringStoresReviewed =
    stores.cateringStoresReviewed === true;

const electronicStoresAvailable =
    stores.electronicStoresAvailable === true;

const sparePartsInventoryReviewed =
    stores.sparePartsInventoryReviewed === true;

const criticalEquipmentSparesAvailable =
    stores.criticalEquipmentSparesAvailable === true;

const foodStoresAdequate =
    stores.foodStoresAdequate === true;

const freshWaterAdequate =
    stores.freshWaterAdequate === true;

const fuelAdequate =
    stores.fuelAdequate === true;

const reserveMarginTenPercentReviewed =
    stores.reserveMarginTenPercentReviewed === true;


/* =================================================
   WASTE / ENVIRONMENTAL MANAGEMENT
================================================= */

const environmental =
    condition.environmental || {};

const garbageManagementPlanAvailable =
    environmental.garbageManagementPlanAvailable === true;

const garbageSegregationAvailable =
    environmental.garbageSegregationAvailable === true;

const garbageDisposalRecordsCurrent =
    environmental.garbageDisposalRecordsCurrent === true;

const wasteOilManagementAvailable =
    environmental.wasteOilManagementAvailable === true;

const sludgeManagementAvailable =
    environmental.sludgeManagementAvailable === true;

const bilgeManagementAvailable =
    environmental.bilgeManagementAvailable === true;

const sewageManagementAvailable =
    environmental.sewageManagementAvailable === true;

const sewageTreatmentOrHoldingAvailable =
    environmental.sewageTreatmentOrHoldingAvailable === true;

const pollutionPreventionDocumentationCurrent =
    environmental.pollutionPreventionDocumentationCurrent === true;

const carbonEmissionRecordsReviewed =
    environmental.carbonEmissionRecordsReviewed === true;


/* =================================================
   EMERGENCY LIGHTING / POWER
================================================= */

const emergencySystems =
    condition.emergencySystems || {};

const emergencyLightingAvailable =
    emergencySystems.emergencyLightingAvailable === true;

const emergencyLightingTestCurrent =
    emergencySystems.emergencyLightingTestCurrent === true;

const emergencyPowerAvailable =
    emergencySystems.emergencyPowerAvailable === true;

const emergencyGeneratorAvailable =
    emergencySystems.emergencyGeneratorAvailable === true;

const emergencyBatteryCapacityAdequate =
    emergencySystems.emergencyBatteryCapacityAdequate === true;

const emergencyPowerTestCurrent =
    emergencySystems.emergencyPowerTestCurrent === true;


/* =================================================
   ESCAPE / FIRE / LIFE-SAVING
================================================= */

const emergencyEscapeRoutesMarked =
    emergencySystems.emergencyEscapeRoutesMarked === true;

const escapeRoutesClear =
    emergencySystems.escapeRoutesClear === true;

const emergencyExitsAvailable =
    emergencySystems.emergencyExitsAvailable === true;

const escapeRouteLightingAvailable =
    emergencySystems.escapeRouteLightingAvailable === true;

const fireSafetyPlansAvailable =
    emergencySystems.fireSafetyPlansAvailable === true;

const musterInformationAvailable =
    emergencySystems.musterInformationAvailable === true;


/* =================================================
   SAFETY PLACARDS / MANOEUVRING INFORMATION
================================================= */

const safetyPlacardsCurrent =
    emergencySystems.safetyPlacardsCurrent === true;

const machinerySafetySignsAvailable =
    emergencySystems.machinerySafetySignsAvailable === true;

const turningCircleInformationAvailable =
    emergencySystems.turningCircleInformationAvailable === true;

const manoeuvringInformationAvailable =
    emergencySystems.manoeuvringInformationAvailable === true;


/* =================================================
   COMPANY CONTINGENCY / RESILIENCE PLANNING
================================================= */

const contingency =
    condition.contingency || {};

const resiliencePlanFirstReviewRequired =
    contingency.resiliencePlanFirstReviewRequired !== false;

const contingencyPlanAvailable =
    contingency.planAvailable === true;

const emergencyResponsePlanAvailable =
    contingency.emergencyResponsePlanAvailable === true;

const pollutionResponsePlanAvailable =
    contingency.pollutionResponsePlanAvailable === true;

const cyberContingencyPlanAvailable =
    contingency.cyberContingencyPlanAvailable === true;

const businessContinuityPlanAvailable =
    contingency.businessContinuityPlanAvailable === true;

const shoreSupportAvailable =
    contingency.shoreSupportAvailable === true;

const recoveryPlanAvailable =
    contingency.recoveryPlanAvailable === true;


/* =================================================
   P&I / MARINE INSURANCE
================================================= */

const pi =
    condition.pi || {};

const piClubDeclared =
    pi.clubDeclared === true;

const piCoverCurrent =
    pi.coverCurrent === true;

const piDocumentationCurrent =
    pi.documentationCurrent === true;

const piEntryEvidenceAvailable =
    pi.entryEvidenceAvailable === true;


/* =================================================
   IDENTIFICATION REVIEW
================================================= */

const identificationPass =
    vesselNameMarkingCurrent &&
    imoNumberMarkingCurrent &&
    portOfRegistryMarkingCurrent &&
    funnelLogoMarkingCurrent &&
    identificationMarkingsReviewed;


/* =================================================
   MARIN V&V — ADDITIONAL REVIEW AGGREGATES
================================================= */

const bridgeSafetyPass =
    navigationEquipmentReviewed &&
    navigationLightsCurrent &&
    soundSignalsCurrent &&
    compassAndHeadingSystemsReviewed &&
    bridgeEmergencyEquipmentReviewed &&
    navigationPublicationsCurrent &&
    bridgeSafetyEquipmentCurrent;


const machinerySafetyPass =
    machinerySurveyCurrent &&
    mainEngineInspectionCurrent &&
    auxiliaryEngineInspectionCurrent &&
    emergencyGeneratorInspectionCurrent &&
    steeringGearInspectionCurrent &&
    propulsionSystemsInspectionCurrent &&
    machinerySpaceInspectionCurrent;


const hullSafetyPass =
    hullSurveyCurrent &&
    structuralInspectionCurrent &&
    hullNdtCurrent &&
    machineryNdtCurrent &&
    tankInspectionCurrent &&
    watertightIntegrityReviewed;


const stabilitySafetyPass =
    stabilityBookletCurrent &&
    intactStabilityReviewed &&
    dynamicStabilityReviewed &&
    heelAndListReviewed &&
    trimReviewed &&
    gzCurveOrRightingArmReviewed &&
    rightingMomentReviewed &&
    cgShiftReviewed &&
    controlledRateOfTurnReviewed &&
    loadLineCertificateCurrent &&
    assignedFreeboardReviewed &&
    zoneAndSeasonRestrictionsReviewed &&
    permittedDraftReviewed;


const vesselClassPass =
    vesselClassDeclared &&
    classCertificateCurrent &&
    classNotationCurrent &&
    (
        !dpNotationApplicable ||
        dpNotationCurrent
    ) &&
    (
        !iceClassApplicable ||
        iceClassCurrent
    ) &&
    vesselSuitabilitySurveyCurrent;


const operatingAreaPass =
    operatingAreaDeclared &&
    permittedDistanceFromShoreReviewed &&
    coastalStateRequirementsReviewed &&
    operatingRestrictionsCurrent;


const environmentalSafetyPass =
    garbageManagementPlanAvailable &&
    garbageSegregationAvailable &&
    garbageDisposalRecordsCurrent &&
    wasteOilManagementAvailable &&
    sludgeManagementAvailable &&
    bilgeManagementAvailable &&
    sewageManagementAvailable &&
    sewageTreatmentOrHoldingAvailable &&
    pollutionPreventionDocumentationCurrent &&
    carbonEmissionRecordsReviewed;


const emergencyPowerPass =
    emergencyLightingAvailable &&
    emergencyLightingTestCurrent &&
    emergencyPowerAvailable &&
    emergencyGeneratorAvailable &&
    emergencyBatteryCapacityAdequate &&
    emergencyPowerTestCurrent;


const escapeSafetyPass =
    emergencyEscapeRoutesMarked &&
    escapeRoutesClear &&
    emergencyExitsAvailable &&
    escapeRouteLightingAvailable &&
    fireSafetyPlansAvailable &&
    musterInformationAvailable;


const storesPass =
    deckStoresReviewed &&
    engineStoresReviewed &&
    cateringStoresReviewed &&
    electronicStoresAvailable &&
    sparePartsInventoryReviewed &&
    criticalEquipmentSparesAvailable &&
    foodStoresAdequate &&
    freshWaterAdequate &&
    fuelAdequate &&
    reserveMarginTenPercentReviewed;


const accommodationCateringPass =
    cateringInspectionCurrent &&
    galleyInspectionCurrent &&
    foodHygieneInspectionCurrent &&
    provisionsStorageInspectionCurrent &&
    potableWaterInspectionCurrent &&
    accommodationInspectionCurrent &&
    crewCabinsReviewed &&
    sanitaryFacilitiesReviewed;


const contingencyPass =
    contingencyPlanAvailable &&
    emergencyResponsePlanAvailable &&
    pollutionResponsePlanAvailable &&
    cyberContingencyPlanAvailable &&
    businessContinuityPlanAvailable &&
    shoreSupportAvailable &&
    recoveryPlanAvailable;


const piReviewPass =
    piClubDeclared &&
    piCoverCurrent &&
    piDocumentationCurrent &&
    piEntryEvidenceAvailable;


const gmdssPass =
    !gmdssRequired ||
    (
        gmdssEquipmentAvailable &&
        gmdssInspectionCurrent &&
        gmdssRadioSurveyCurrent &&
        gmdssCertificatesCurrent
    );


const statutorySurveyPass =
    statutorySurveysCurrent &&
    flagStateSurveysCurrent &&
    flagStateAuditsCurrent &&
    annualSurveysCurrent &&
    intermediateSurveysCurrent &&
    renewalSurveysCurrent &&
    specialSurveysCurrent &&
    radioSurveysCurrent &&
    loadLineSurveyCurrent &&
    safetyConstructionSurveyCurrent &&
    safetyEquipmentSurveyCurrent &&
    safetyRadioSurveyCurrent;


/* =================================================
   SEXTANT PROTOCOL RESILIENCE-FIRST PRINCIPLE
================================================= */

const resilienceFirstPrinciple = {

    enabled:
        resiliencePlanFirstReviewRequired,

    priority:
        "FIRST_REVIEW_ITEM",

    purpose:
        "Establish the vessel resilience, contingency and recovery review before scenario execution or operational suitability assessment.",

    sequence:
        "RESILIENCE PLAN → SAFETY / COMPLIANCE REVIEW → VESSEL SUITABILITY → V&V SCENARIO → HUMAN DECISION",

    authority:
        "HUMAN AUTHORITY",

    operationalCommand:
        false,

    certificationDecision:
        false,

    classComplianceDecision:
        false,

    note:
        "The Sextant Protocol research layer does not determine class compliance or statutory compliance. It identifies review requirements and provides a traceable resilience assessment for human and independent professional review."
};


/* =================================================
   FINAL ADDITIONAL REVIEW STATUS
================================================= */

const additionalReviewPass =
    identificationPass &&
    bridgeSafetyPass &&
    gmdssPass &&
    statutorySurveyPass &&
    machinerySafetyPass &&
    hullSafetyPass &&
    stabilitySafetyPass &&
    vesselClassPass &&
    operatingAreaPass &&
    environmentalSafetyPass &&
    emergencyPowerPass &&
    escapeSafetyPass &&
    storesPass &&
    accommodationCateringPass &&
    contingencyPass &&
    piReviewPass;


const additionalReviewStatus =
    additionalReviewPass
        ? "SIMULATED_ADDITIONAL_REVIEW_COMPLETE"
        : "SIMULATED_ADDITIONAL_REVIEW_REQUIRED";


/* =================================================
   FINAL TRACEABLE RESULT
================================================= */

const finalMaritimeReview = {

    identification: {

        vesselNameMarkingCurrent,
        imoNumberMarkingCurrent,
        portOfRegistryMarkingCurrent,
        funnelLogoMarkingCurrent,
        identificationMarkingsReviewed,

        status:
            identificationPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    bridgeNavigation: {

        navigationEquipmentReviewed,
        navigationLightsCurrent,
        soundSignalsCurrent,
        compassAndHeadingSystemsReviewed,
        bridgeEmergencyEquipmentReviewed,
        navigationPublicationsCurrent,
        bridgeSafetyEquipmentCurrent,

        status:
            bridgeSafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    gmdss: {

        required:
            gmdssRequired,

        equipmentAvailable:
            gmdssEquipmentAvailable,

        inspectionCurrent:
            gmdssInspectionCurrent,

        radioSurveyCurrent:
            gmdssRadioSurveyCurrent,

        certificatesCurrent:
            gmdssCertificatesCurrent,

        status:
            gmdssPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    statutorySurveys: {

        statutorySurveysCurrent,
        flagStateSurveysCurrent,
        flagStateAuditsCurrent,
        annualSurveysCurrent,
        intermediateSurveysCurrent,
        renewalSurveysCurrent,
        specialSurveysCurrent,
        radioSurveysCurrent,
        loadLineSurveyCurrent,
        safetyConstructionSurveyCurrent,
        safetyEquipmentSurveyCurrent,
        safetyRadioSurveyCurrent,

        status:
            statutorySurveyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    machinery: {

        machinerySurveyCurrent,
        mainEngineInspectionCurrent,
        auxiliaryEngineInspectionCurrent,
        emergencyGeneratorInspectionCurrent,
        steeringGearInspectionCurrent,
        propulsionSystemsInspectionCurrent,
        machinerySpaceInspectionCurrent,

        status:
            machinerySafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    hullAndNdt: {

        hullSurveyCurrent,
        structuralInspectionCurrent,
        hullNdtCurrent,
        machineryNdtCurrent,
        tankInspectionCurrent,
        watertightIntegrityReviewed,

        status:
            hullSafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    stabilityTrimLoadLine: {

        stabilityBookletCurrent,
        intactStabilityReviewed,
        dynamicStabilityReviewed,
        heelAndListReviewed,
        trimReviewed,
        gzCurveOrRightingArmReviewed,
        rightingMomentReviewed,
        cgShiftReviewed,
        controlledRateOfTurnReviewed,
        loadLineCertificateCurrent,
        assignedFreeboardReviewed,
        zoneAndSeasonRestrictionsReviewed,
        permittedDraftReviewed,

        status:
            stabilitySafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    vesselClass: {

        vesselClassDeclared,
        classCertificateCurrent,
        classNotationCurrent,
        dpNotationApplicable,
        dpNotationCurrent,
        iceClassApplicable,
        iceClassCurrent,
        vesselSuitabilitySurveyCurrent,

        status:
            vesselClassPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    operatingArea: {

        operatingAreaDeclared,
        permittedDistanceFromShoreReviewed,
        coastalStateRequirementsReviewed,
        operatingRestrictionsCurrent,

        status:
            operatingAreaPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    cateringAccommodation: {

        cateringInspectionCurrent,
        galleyInspectionCurrent,
        foodHygieneInspectionCurrent,
        provisionsStorageInspectionCurrent,
        potableWaterInspectionCurrent,
        accommodationInspectionCurrent,
        crewCabinsReviewed,
        sanitaryFacilitiesReviewed,

        status:
            accommodationCateringPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    storesAndLogistics: {

        deckStoresReviewed,
        engineStoresReviewed,
        cateringStoresReviewed,
        electronicStoresAvailable,
        sparePartsInventoryReviewed,
        criticalEquipmentSparesAvailable,
        foodStoresAdequate,
        freshWaterAdequate,
        fuelAdequate,
        reserveMarginTenPercentReviewed,

        status:
            storesPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    environmentalManagement: {

        garbageManagementPlanAvailable,
        garbageSegregationAvailable,
        garbageDisposalRecordsCurrent,

        wasteOilManagementAvailable,
        sludgeManagementAvailable,
        bilgeManagementAvailable,

        sewageManagementAvailable,
        sewageTreatmentOrHoldingAvailable,

        pollutionPreventionDocumentationCurrent,
        carbonEmissionRecordsReviewed,

        status:
            environmentalSafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    emergencySystems: {

        emergencyLightingAvailable,
        emergencyLightingTestCurrent,
        emergencyPowerAvailable,
        emergencyGeneratorAvailable,
        emergencyBatteryCapacityAdequate,
        emergencyPowerTestCurrent,

        escapeRoutesClear,
        emergencyExitsAvailable,
        escapeRouteLightingAvailable,

        status:
            emergencyPowerPass && escapeSafetyPass
                ? "SIMULATED_REVIEW_COMPLETE"
                : "SIMULATED_REVIEW_REQUIRED"
    },


    contingencyAndResilience: {

        resilienceFirstPrinciple,

        contingencyPlanAvailable,
        emergencyResponsePlanAvailable,
        pollutionResponsePlanAvailable,
        cyberContingencyPlanAvailable,
        businessContinuityPlanAvailable,
        shoreSupportAvailable,
        recoveryPlanAvailable,

        status:
            contingencyPass
                ? "SIMULATED_CONTINGENCY_REVIEW_COMPLETE"
                : "SIMULATED_CONTINGENCY_REVIEW_REQUIRED"
    },


    pAndI: {

        clubDeclared:
            piClubDeclared,

        coverCurrent:
            piCoverCurrent,

        documentationCurrent:
            piDocumentationCurrent,

        entryEvidenceAvailable:
            piEntryEvidenceAvailable,

        status:
            piReviewPass
                ? "SIMULATED_DOCUMENTATION_CURRENT"
                : "SIMULATED_INSURANCE_REVIEW_REQUIRED"
    },


    assessment: {

        overallStatus:
            additionalReviewStatus,

        reviewRequired:
            !additionalReviewPass,

        recommendedAction:
            additionalReviewPass
                ? "PROCEED TO HUMAN-REVIEWED V&V SCENARIO"
                : "ESCALATE / COMPLETE REQUIRED REVIEW ITEMS",

        humanAuthority:
            true,

        autonomousCommand:
            false,

        operationalConnection:
            false
    }

};


/* =================================================
   GLOBAL ACCESS
================================================= */

if (
    typeof window !== "undefined"
) {

    window.MaritimeFinalVesselReviewV1 =
        finalMaritimeReview;

}

/* =========================================================
   SEXTANT PROTOCOL™ — RESILIENCE PLAN / PRE-JOB PRIORITY
========================================================= */

/*
   IMPORTANT RESEARCH PRINCIPLE:

   The Sextant Protocol™ Resilience Plan is intended to be
   initiated at the BEGINNING of the vessel / project /
   operational planning process.

   It is NOT intended to be a final checklist item after
   deficiencies, operational restrictions or safety risks
   have already developed.

   The resilience assessment should therefore support:

   1. PRE-JOB RESILIENCE REVIEW
   2. VESSEL SUITABILITY REVIEW
   3. STATUTORY / FLAG-STATE REVIEW
   4. CLASS / NOTATION REVIEW
   5. DP / NAVIGATION / MACHINERY READINESS REVIEW
   6. LSA / FFA / GMDSS READINESS REVIEW
   7. HULL / STRUCTURAL / NDT REVIEW
   8. ENVIRONMENTAL / WASTE MANAGEMENT REVIEW
   9. CREW / ACCOMMODATION / GALLEY / WELFARE REVIEW
   10. STORES / SPARES / CONSUMABLES REVIEW
   11. CONTINGENCY / EMERGENCY RESPONSE REVIEW
   12. OPERATIONAL AREA / WEATHER / DRAFT / LOADLINE REVIEW

   The objective is early identification of conditions that
   could reduce vessel resilience, safety margin, operational
   capability or regulatory readiness.

   The resilience plan should remain a LIVE REVIEW throughout
   the planned operation and should be reassessed following:

   - significant environmental changes;
   - equipment degradation;
   - machinery defects;
   - DP capability changes;
   - changes in vessel loading;
   - changes in trim, heel or list;
   - changes in draft or under-keel clearance;
   - changes in operating area;
   - changes in statutory or class status;
   - safety equipment deficiencies;
   - emergency events;
   - crew or operational changes;
   - material changes to the vessel condition.
*/


/* =========================================================
   RESILIENCE-FIRST OPERATING PRINCIPLE
========================================================= */

const resiliencePlan =
    condition.resiliencePlan || {};

const resiliencePlanInitiatedPreJob =
    resiliencePlan.initiatedPreJob === true;

const vesselSuitabilityReviewedBeforeOperation =
    resiliencePlan.vesselSuitabilityReviewedBeforeOperation === true;

const statutoryStatusReviewedBeforeOperation =
    resiliencePlan.statutoryStatusReviewedBeforeOperation === true;

const classStatusReviewedBeforeOperation =
    resiliencePlan.classStatusReviewedBeforeOperation === true;

const operationalLimitationsReviewedBeforeOperation =
    resiliencePlan.operationalLimitationsReviewedBeforeOperation === true;

const contingencyPlansReviewedBeforeOperation =
    resiliencePlan.contingencyPlansReviewedBeforeOperation === true;

const resilienceMonitoringActive =
    resiliencePlan.resilienceMonitoringActive === true;


/* =========================================================
   RESILIENCE-FIRST STATUS
========================================================= */

let resiliencePlanStatus =
    "SIMULATED_RESILIENCE_PLAN_REVIEW_REQUIRED";


const resiliencePlanPass =
    resiliencePlanInitiatedPreJob &&
    vesselSuitabilityReviewedBeforeOperation &&
    statutoryStatusReviewedBeforeOperation &&
    classStatusReviewedBeforeOperation &&
    operationalLimitationsReviewedBeforeOperation &&
    contingencyPlansReviewedBeforeOperation &&
    resilienceMonitoringActive;


if (resiliencePlanPass) {

    resiliencePlanStatus =
        "SIMULATED_RESILIENCE_PLAN_ACTIVE";

}


/* =========================================================
   RESILIENCE PRIORITY
========================================================= */

const resiliencePriority =
    "FIRST_STAGE_PRE_JOB_REVIEW";


const resiliencePrinciple =
    "RESILIENCE PLANNING BEFORE OPERATIONAL EXECUTION";


/* =========================================================
   SUBSTANDARD / UNSAFE CONDITION PREVENTION
========================================================= */

/*
   The simulator does NOT determine whether a vessel is
   legally "substandard".

   Instead, it identifies conditions requiring early review,
   escalation or corrective action before the vessel is
   considered suitable for the planned simulated operation.

   Final determination remains with the appropriate:

   - Flag State;
   - Recognized Organization / Class;
   - statutory authority;
   - Company / DOC holder;
   - Master;
   - DPO / authorized operator;
   - applicable coastal / port authority.
*/

const deteriorationPreventionStatus =
    resiliencePlanPass
        ? "SIMULATED_EARLY_RESILIENCE_CONTROL_ACTIVE"
        : "SIMULATED_EARLY_RESILIENCE_REVIEW_REQUIRED";


/* =========================================================
   CONTINUOUS REVIEW
========================================================= */

const resilienceContinuousReview =
    {

        preJob:
            resiliencePlanInitiatedPreJob,

        vesselSuitability:
            vesselSuitabilityReviewedBeforeOperation,

        statutory:
            statutoryStatusReviewedBeforeOperation,

        class:
            classStatusReviewedBeforeOperation,

        operationalLimitations:
            operationalLimitationsReviewedBeforeOperation,

        contingency:
            contingencyPlansReviewedBeforeOperation,

        continuousMonitoring:
            resilienceMonitoringActive,

        status:
            resiliencePlanStatus

    };


/* =========================================================
   TRACEABLE RESILIENCE RESULT
========================================================= */

const sextantResiliencePlanResult = {

    priority:
        resiliencePriority,

    principle:
        resiliencePrinciple,

    status:
        resiliencePlanStatus,

    deteriorationPrevention:
        deteriorationPreventionStatus,

    continuousReview:
        resilienceContinuousReview,

    humanAuthority:
        true,

    autonomousCommand:
        false,

    operationalConnection:
        false,

    executionGate:
        "HUMAN AUTHORIZATION REQUIRED",

    note:
        "SEXTANT PROTOCOL™ resilience planning is intended as an early pre-job and continuous review layer, not a final checklist item. The simulator identifies conditions for human, company, class, flag-state or statutory review and does not determine legal vessel compliance or class status."

};


/* =========================================================
   GLOBAL ACCESS
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.SextantResiliencePlanResult =
        sextantResiliencePlanResult;

}
/* =========================================================
   FINAL ADDITIONAL MARITIME COMPLIANCE, SAFETY,
   NAVIGATION, STORES & RESILIENCE REVIEW
   VERSION: V1.1
========================================================= */

const finalMaritimeReview =
    condition.finalMaritimeReview || {};


/* =========================================================
   PRIORITY 1 — SEXTANT PROTOCOL RESILIENCE PLAN
   FIRST ITEM IN THE JOB / REVIEW SEQUENCE
========================================================= */

/*
 * The Sextant Protocol Resilience Plan is positioned as
 * an INITIAL resilience and readiness review, not as the
 * last item on the vessel inspection/job list.
 *
 * Purpose:
 * identify foreseeable failure modes, degraded conditions,
 * operational vulnerabilities and recovery pathways before
 * routine operational tasks are treated as complete.
 *
 * This does NOT replace statutory, Flag, Class, ISM, SOLAS,
 * MARPOL, Load Line, COLREG or Port State requirements.
 */

const sextantResiliencePlanAvailable =
    finalMaritimeReview.sextantResiliencePlanAvailable === true;

const sextantInitialRiskReviewCompleted =
    finalMaritimeReview.sextantInitialRiskReviewCompleted === true;

const sextantFailureModeReviewCompleted =
    finalMaritimeReview.sextantFailureModeReviewCompleted === true;

const sextantRecoveryPathwaysReviewed =
    finalMaritimeReview.sextantRecoveryPathwaysReviewed === true;

const sextantHumanAuthorityConfirmed =
    finalMaritimeReview.sextantHumanAuthorityConfirmed === true;

const sextantAuditTrailAvailable =
    finalMaritimeReview.sextantAuditTrailAvailable === true;


/* =========================================================
   PRIORITY ORDER
========================================================= */

const resiliencePriorityOrder = [

    "PRIORITY_1_SEXTANT_RESILIENCE_PLAN",

    "PRIORITY_2_VESSEL_STATUTORY_AND_CLASS_STATUS",

    "PRIORITY_3_NAVIGATION_AND_SAFE_CLEARANCE",

    "PRIORITY_4_MACHINERY_AND_PROPULSION",

    "PRIORITY_5_DECK_AND_CARGO_OPERATIONS",

    "PRIORITY_6_EMERGENCY_SYSTEMS",

    "PRIORITY_7_ENVIRONMENTAL_PROTECTION",

    "PRIORITY_8_CATERING_CREW_SUPPORT_AND_ACCOMMODATION",

    "PRIORITY_9_STORES_SPARES_AND_LOGISTICS",

    "PRIORITY_10_DOCUMENTATION_AUDIT_AND_CLOSEOUT"
];


/* =========================================================
   DANGEROUS GOODS
========================================================= */

const dangerousGoodsOnboard =
    finalMaritimeReview.dangerousGoodsOnboard === true;

const dangerousGoodsDeclared =
    finalMaritimeReview.dangerousGoodsDeclared === true;

const dangerousGoodsManifestCurrent =
    finalMaritimeReview.dangerousGoodsManifestCurrent === true;

const dangerousGoodsSegregationCompliant =
    finalMaritimeReview.dangerousGoodsSegregationCompliant === true;

const dangerousGoodsStowagePlanAvailable =
    finalMaritimeReview.dangerousGoodsStowagePlanAvailable === true;

const dangerousGoodsLabelsAndPlacardsCurrent =
    finalMaritimeReview.dangerousGoodsLabelsAndPlacardsCurrent === true;

const dangerousGoodsEmergencyInformationAvailable =
    finalMaritimeReview.dangerousGoodsEmergencyInformationAvailable === true;


/* =========================================================
   CARGO / STOWAGE / SECURING
========================================================= */

const cargoStowagePlanAvailable =
    finalMaritimeReview.cargoStowagePlanAvailable === true;

const cargoSecuringArrangementsAvailable =
    finalMaritimeReview.cargoSecuringArrangementsAvailable === true;

const cargoDistributionReviewed =
    finalMaritimeReview.cargoDistributionReviewed === true;

const stabilityImpactReviewed =
    finalMaritimeReview.stabilityImpactReviewed === true;

const deckLoadLimitsReviewed =
    finalMaritimeReview.deckLoadLimitsReviewed === true;


/* =========================================================
   LOAD LINE / FREEBOARD
========================================================= */

const loadLineCertificateCurrent =
    finalMaritimeReview.loadLineCertificateCurrent === true;

const loadLineMarkingsVerified =
    finalMaritimeReview.loadLineMarkingsVerified === true;

const loadLineConditionsReviewed =
    finalMaritimeReview.loadLineConditionsReviewed === true;

const freeboardRequirementReviewed =
    finalMaritimeReview.freeboardRequirementReviewed === true;

const seasonalOrZoneLoadLineRequirementsReviewed =
    finalMaritimeReview.seasonalOrZoneLoadLineRequirementsReviewed === true;


/* =========================================================
   ZONE / DRAFT / OPERATING LIMITS
========================================================= */

const draftLimitDeclared =
    finalMaritimeReview.draftLimitDeclared === true;

const actualDraftMeasured =
    finalMaritimeReview.actualDraftMeasured === true;

const trimConditionReviewed =
    finalMaritimeReview.trimConditionReviewed === true;

const operatingZoneDeclared =
    finalMaritimeReview.operatingZoneDeclared === true;

const zoneDraftRequirementReviewed =
    finalMaritimeReview.zoneDraftRequirementReviewed === true;

const portDraftRestrictionReviewed =
    finalMaritimeReview.portDraftRestrictionReviewed === true;


/* =========================================================
   TIDAL HEIGHT / CHART DATUM / WATER DEPTH
========================================================= */

/*
 * Basic assessment relationship:
 *
 * Depth of water =
 * charted depth above chart datum + height of tide
 *
 * This is a simplified assessment relationship.
 * Actual navigation must use the applicable official
 * nautical chart, tide information and navigation rules.
 */

const chartedDepthAboveChartDatum =
    Number(finalMaritimeReview.chartedDepthAboveChartDatum || 0);

const tideHeightAboveChartDatum =
    Number(finalMaritimeReview.tideHeightAboveChartDatum || 0);

const vesselDraft =
    Number(finalMaritimeReview.vesselDraft || 0);

const trimAllowance =
    Number(finalMaritimeReview.trimAllowance || 0);

const squatAllowance =
    Number(finalMaritimeReview.squatAllowance || 0);

const safetyMargin =
    Number(finalMaritimeReview.safetyMargin || 0);


const calculatedWaterDepth =
    chartedDepthAboveChartDatum +
    tideHeightAboveChartDatum;


/*
 * Simplified available UKC:
 *
 * Water depth
 * - vessel draft
 * - trim allowance
 * - squat allowance
 * - safety margin
 */

const calculatedUnderKeelClearance =
    calculatedWaterDepth -
    vesselDraft -
    trimAllowance -
    squatAllowance -
    safetyMargin;


const underKeelClearancePositive =
    calculatedUnderKeelClearance > 0;


/* =========================================================
   VERTICAL CLEARANCE
========================================================= */

const vesselHeightAboveKeel =
    Number(finalMaritimeReview.vesselHeightAboveKeel || 0);

const highestPointHeightDeclared =
    finalMaritimeReview.highestPointHeightDeclared === true;

const overheadClearanceHazardReviewed =
    finalMaritimeReview.overheadClearanceHazardReviewed === true;

const bridgeClearanceReviewed =
    finalMaritimeReview.bridgeClearanceReviewed === true;

const cableClearanceReviewed =
    finalMaritimeReview.cableClearanceReviewed === true;


/*
 * Examples of highest-point considerations:
 *
 * - bridge
 * - mast
 * - antenna
 * - radar
 * - crane
 * - cable
 * - other fixed structure
 *
 * Required clearance is assessed from the relevant
 * navigation reference level and applicable authority.
 */

const overheadClearanceValue =
    Number(finalMaritimeReview.overheadClearanceValue || 0);

const calculatedVerticalClearance =
    overheadClearanceValue -
    vesselHeightAboveKeel;


const verticalClearancePositive =
    calculatedVerticalClearance > 0;


/* =========================================================
   SAFE MANNING / UMV CERTIFICATION
========================================================= */

const safeManningCertificateAvailable =
    finalMaritimeReview.safeManningCertificateAvailable === true;

const safeManningCertificateCurrent =
    finalMaritimeReview.safeManningCertificateCurrent === true;

const umvCertificateApplicable =
    finalMaritimeReview.umvCertificateApplicable === true;

const umvCertificateCurrent =
    finalMaritimeReview.umvCertificateCurrent === true;

const minimumCrewRequirementReviewed =
    finalMaritimeReview.minimumCrewRequirementReviewed === true;


/* =========================================================
   REQUIRED PUBLICATIONS ONBOARD
========================================================= */

const requiredPublicationsInventoryAvailable =
    finalMaritimeReview.requiredPublicationsInventoryAvailable === true;

const nauticalChartsCurrent =
    finalMaritimeReview.nauticalChartsCurrent === true;

const electronicNavigationPublicationsCurrent =
    finalMaritimeReview.electronicNavigationPublicationsCurrent === true;

const sailingDirectionsAvailable =
    finalMaritimeReview.sailingDirectionsAvailable === true;

const noticesToMarinersCurrent =
    finalMaritimeReview.noticesToMarinersCurrent === true;

const tideTablesOrApprovedTidalInformationAvailable =
    finalMaritimeReview.tideTablesOrApprovedTidalInformationAvailable === true;

const applicableRegulationsAvailable =
    finalMaritimeReview.applicableRegulationsAvailable === true;

const emergencyPublicationsAvailable =
    finalMaritimeReview.emergencyPublicationsAvailable === true;


/* =========================================================
   BRIDGE / NAVIGATION STORES
========================================================= */

const bridgeStoresAvailable =
    finalMaritimeReview.bridgeStoresAvailable === true;

const navigationEquipmentSparesAvailable =
    finalMaritimeReview.navigationEquipmentSparesAvailable === true;

const communicationEquipmentSparesAvailable =
    finalMaritimeReview.communicationEquipmentSparesAvailable === true;

const signalFlagsAndRequiredSignalsAvailable =
    finalMaritimeReview.signalFlagsAndRequiredSignalsAvailable === true;

const batteriesAndConsumableNavigationStoresAvailable =
    finalMaritimeReview.batteriesAndConsumableNavigationStoresAvailable === true;


/* =========================================================
   ELECTRONIC STORES — MANDATORY REVIEW CATEGORY
========================================================= */

const electronicStoresAvailable =
    finalMaritimeReview.electronicStoresAvailable === true;

const criticalElectronicSparesAvailable =
    finalMaritimeReview.criticalElectronicSparesAvailable === true;

const navigationSensorSparesAvailable =
    finalMaritimeReview.navigationSensorSparesAvailable === true;

const communicationSparesAvailable =
    finalMaritimeReview.communicationSparesAvailable === true;

const networkAndComputerSparesAvailable =
    finalMaritimeReview.networkAndComputerSparesAvailable === true;

const powerSupplyElectronicSparesAvailable =
    finalMaritimeReview.powerSupplyElectronicSparesAvailable === true;

const approvedReplacementPartsAvailable =
    finalMaritimeReview.approvedReplacementPartsAvailable === true;

const electronicStoresInventoryCurrent =
    finalMaritimeReview.electronicStoresInventoryCurrent === true;


/* =========================================================
   DECK STORES
========================================================= */

const deckStoresAvailable =
    finalMaritimeReview.deckStoresAvailable === true;

const mooringStoresAvailable =
    finalMaritimeReview.mooringStoresAvailable === true;

const anchoringStoresAvailable =
    finalMaritimeReview.anchoringStoresAvailable === true;

const liftingAndRiggingStoresAvailable =
    finalMaritimeReview.liftingAndRiggingStoresAvailable === true;

const deckSafetyEquipmentAvailable =
    finalMaritimeReview.deckSafetyEquipmentAvailable === true;


/* =========================================================
   ENGINE ROOM STORES
========================================================= */

const engineRoomStoresAvailable =
    finalMaritimeReview.engineRoomStoresAvailable === true;

const criticalMachinerySparesAvailable =
    finalMaritimeReview.criticalMachinerySparesAvailable === true;

const filtersBeltsSealsAndConsumablesAvailable =
    finalMaritimeReview.filtersBeltsSealsAndConsumablesAvailable === true;

const lubricantsAndApprovedConsumablesAvailable =
    finalMaritimeReview.lubricantsAndApprovedConsumablesAvailable === true;

const emergencyMachinerySparesAvailable =
    finalMaritimeReview.emergencyMachinerySparesAvailable === true;


/* =========================================================
   FUEL / LUBE OIL / WATER — OPERATIONAL RESERVE
========================================================= */

const fuelCapacityAdequate =
    finalMaritimeReview.fuelCapacityAdequate === true;

const fuelReserveAdequate =
    finalMaritimeReview.fuelReserveAdequate === true;

const freshwaterCapacityAdequate =
    finalMaritimeReview.freshwaterCapacityAdequate === true;

const freshwaterReserveAdequate =
    finalMaritimeReview.freshwaterReserveAdequate === true;

const provisionsCapacityAdequate =
    finalMaritimeReview.provisionsCapacityAdequate === true;

const provisionsReserveAdequate =
    finalMaritimeReview.provisionsReserveAdequate === true;


/*
 * Planning allowance:
 * Food / water / fuel and other consumables may be assessed
 * with an additional 10% planning reserve where required
 * by the vessel/company operational plan.
 *
 * This is NOT a substitute for statutory minimums.
 */

const reservePlanningFactor =
    1.10;

const plannedFuelRequirementWithReserve =
    Number(finalMaritimeReview.plannedFuelRequirement || 0) *
    reservePlanningFactor;

const plannedWaterRequirementWithReserve =
    Number(finalMaritimeReview.plannedWaterRequirement || 0) *
    reservePlanningFactor;

const plannedFoodRequirementWithReserve =
    Number(finalMaritimeReview.plannedFoodRequirement || 0) *
    reservePlanningFactor;


/* =========================================================
   CATERING / GALLEY / ACCOMMODATION
========================================================= */

const galleyEquipmentOperational =
    finalMaritimeReview.galleyEquipmentOperational === true;

const foodStoresAdequate =
    finalMaritimeReview.foodStoresAdequate === true;

const potableWaterAvailable =
    finalMaritimeReview.potableWaterAvailable === true;

const refrigerationAvailable =
    finalMaritimeReview.refrigerationAvailable === true;

const foodHygieneControlsAvailable =
    finalMaritimeReview.foodHygieneControlsAvailable === true;

const accommodationSafetyReviewed =
    finalMaritimeReview.accommodationSafetyReviewed === true;

const cabinSafetyReviewed =
    finalMaritimeReview.cabinSafetyReviewed === true;

const sanitaryFacilitiesOperational =
    finalMaritimeReview.sanitaryFacilitiesOperational === true;


/* =========================================================
   GARBAGE / WASTE OIL / SEWAGE
========================================================= */

const garbageManagementCompliant =
    finalMaritimeReview.garbageManagementCompliant === true;

const wasteOilManagementCompliant =
    finalMaritimeReview.wasteOilManagementCompliant === true;

const sewageManagementCompliant =
    finalMaritimeReview.sewageManagementCompliant === true;

const disposalRecordsCurrent =
    finalMaritimeReview.disposalRecordsCurrent === true;


/* =========================================================
   EMERGENCY ESCAPE / LIGHTING / POWER
========================================================= */

const escapeRoutesMarked =
    finalMaritimeReview.escapeRoutesMarked === true;

const escapeRoutesClear =
    finalMaritimeReview.escapeRoutesClear === true;

const emergencyLightingOperational =
    finalMaritimeReview.emergencyLightingOperational === true;

const emergencyPowerAvailable =
    finalMaritimeReview.emergencyPowerAvailable === true;

const emergencyGeneratorTestCurrent =
    finalMaritimeReview.emergencyGeneratorTestCurrent === true;

const emergencyBatteryTestCurrent =
    finalMaritimeReview.emergencyBatteryTestCurrent === true;


/* =========================================================
   VESSEL IDENTIFICATION / FUNNEL LOGO
========================================================= */

const vesselNameMarkingCurrent =
    finalMaritimeReview.vesselNameMarkingCurrent === true;

const imoNumberMarkingCurrent =
    finalMaritimeReview.imoNumberMarkingCurrent === true;

const portOfRegistryMarkingCurrent =
    finalMaritimeReview.portOfRegistryMarkingCurrent === true;

const funnelLogoMarkingCurrent =
    finalMaritimeReview.funnelLogoMarkingCurrent === true;


/* =========================================================
   NDT / HULL / MACHINERY
========================================================= */

const hullNdtCurrent =
    finalMaritimeReview.hullNdtCurrent === true;

const machineryNdtCurrent =
    finalMaritimeReview.machineryNdtCurrent === true;

const structuralInspectionCurrent =
    finalMaritimeReview.structuralInspectionCurrent === true;

const machineryInspectionCurrent =
    finalMaritimeReview.machineryInspectionCurrent === true;


/* =========================================================
   CLASS / DP / ICE CLASS
========================================================= */

const classCertificateCurrent =
    finalMaritimeReview.classCertificateCurrent === true;

const classNotationCurrent =
    finalMaritimeReview.classNotationCurrent === true;

const dpClassNotationCurrent =
    finalMaritimeReview.dpClassNotationCurrent === true;

const iceClassNotationCurrent =
    finalMaritimeReview.iceClassNotationCurrent === true;


/* =========================================================
   CORRECTIVE ACTION / RE-TEST / LATENCY
========================================================= */

const correctiveActionTestingCompleted =
    finalMaritimeReview.correctiveActionTestingCompleted === true;

const reTestValidationCompleted =
    finalMaritimeReview.reTestValidationCompleted === true;

const assessmentLatencyMeasured =
    finalMaritimeReview.assessmentLatencyMeasured === true;

const deterministicScenarioRepeatabilityConfirmed =
    finalMaritimeReview.deterministicScenarioRepeatabilityConfirmed === true;


/* =========================================================
   MARIN V&V RESEARCH BOUNDARY
========================================================= */

/*
 * The Sextant Protocol demonstrators are research and
 * validation environments.
 *
 * They do not replace:
 * - statutory certification;
 * - Flag State authority;
 * - Classification Society;
 * - ISM/company procedures;
 * - SOLAS/MARPOL/Load Line requirements;
 * - COLREG requirements;
 * - Port/Coastal State requirements;
 * - approved navigation systems;
 * - approved DP/autonomy systems.
 *
 * They are intended to support structured failure-mode,
 * resilience, verification, tuning, latency, audit and
 * human-authority evaluation.
 */

const marinResearchBoundary =
    "RESEARCH_AND_VALIDATION_ONLY";


/* =========================================================
   OVERALL FINAL REVIEW
========================================================= */

const resiliencePriorityPass =
    sextantResiliencePlanAvailable &&
    sextantInitialRiskReviewCompleted &&
    sextantFailureModeReviewCompleted &&
    sextantRecoveryPathwaysReviewed &&
    sextantHumanAuthorityConfirmed &&
    sextantAuditTrailAvailable;


const navigationClearancePass =
    draftLimitDeclared &&
    actualDraftMeasured &&
    trimConditionReviewed &&
    operatingZoneDeclared &&
    zoneDraftRequirementReviewed &&
    portDraftRestrictionReviewed &&
    underKeelClearancePositive &&
    highestPointHeightDeclared &&
    overheadClearanceHazardReviewed &&
    bridgeClearanceReviewed &&
    cableClearanceReviewed &&
    verticalClearancePositive;


const certificationPass =
    safeManningCertificateAvailable &&
    safeManningCertificateCurrent &&
    minimumCrewRequirementReviewed &&
    classCertificateCurrent &&
    classNotationCurrent &&
    (
        !umvCertificateApplicable ||
        umvCertificateCurrent
    );


const dangerousGoodsPass =
    !dangerousGoodsOnboard ||
    (
        dangerousGoodsDeclared &&
        dangerousGoodsManifestCurrent &&
        dangerousGoodsSegregationCompliant &&
        dangerousGoodsStowagePlanAvailable &&
        dangerousGoodsLabelsAndPlacardsCurrent &&
        dangerousGoodsEmergencyInformationAvailable
    );


const publicationsPass =
    requiredPublicationsInventoryAvailable &&
    nauticalChartsCurrent &&
    electronicNavigationPublicationsCurrent &&
    sailingDirectionsAvailable &&
    noticesToMarinersCurrent &&
    tideTablesOrApprovedTidalInformationAvailable &&
    applicableRegulationsAvailable &&
    emergencyPublicationsAvailable;


const electronicStoresPass =
    electronicStoresAvailable &&
    criticalElectronicSparesAvailable &&
    navigationSensorSparesAvailable &&
    communicationSparesAvailable &&
    networkAndComputerSparesAvailable &&
    powerSupplyElectronicSparesAvailable &&
    approvedReplacementPartsAvailable &&
    electronicStoresInventoryCurrent;


const operationalReservePass =
    fuelCapacityAdequate &&
    fuelReserveAdequate &&
    freshwaterCapacityAdequate &&
    freshwaterReserveAdequate &&
    provisionsCapacityAdequate &&
    provisionsReserveAdequate;


const accommodationCateringPass =
    galleyEquipmentOperational &&
    foodStoresAdequate &&
    potableWaterAvailable &&
    refrigerationAvailable &&
    foodHygieneControlsAvailable &&
    accommodationSafetyReviewed &&
    cabinSafetyReviewed &&
    sanitaryFacilitiesOperational;


const environmentalPass =
    garbageManagementCompliant &&
    wasteOilManagementCompliant &&
    sewageManagementCompliant &&
    disposalRecordsCurrent;


const emergencyPass =
    escapeRoutesMarked &&
    escapeRoutesClear &&
    emergencyLightingOperational &&
    emergencyPowerAvailable &&
    emergencyGeneratorTestCurrent &&
    emergencyBatteryTestCurrent;


const identificationPass =
    vesselNameMarkingCurrent &&
    imoNumberMarkingCurrent &&
    portOfRegistryMarkingCurrent &&
    funnelLogoMarkingCurrent;


const machineryInspectionPass =
    hullNdtCurrent &&
    machineryNdtCurrent &&
    structuralInspectionCurrent &&
    machineryInspectionCurrent;


const validationPass =
    correctiveActionTestingCompleted &&
    reTestValidationCompleted &&
    assessmentLatencyMeasured &&
    deterministicScenarioRepeatabilityConfirmed;


/* =========================================================
   FINAL STATUS
========================================================= */

const finalMaritimeReviewPass =
    resiliencePriorityPass &&
    navigationClearancePass &&
    certificationPass &&
    dangerousGoodsPass &&
    publicationsPass &&
    electronicStoresPass &&
    operationalReservePass &&
    accommodationCateringPass &&
    environmentalPass &&
    emergencyPass &&
    identificationPass &&
    machineryInspectionPass &&
    validationPass;


const finalMaritimeReviewStatus =
    finalMaritimeReviewPass
        ? "SIMULATED_MARITIME_READINESS_REVIEW_PASS"
        : "SIMULATED_MARITIME_READINESS_REVIEW_REQUIRED";


/* =========================================================
   HUMAN AUTHORITY / NO AUTOMATIC EXECUTION
========================================================= */

const maritimeExecutionGate =
    "HUMAN AUTHORIZATION REQUIRED";

const operationalCommand =
    false;

const physicalVesselControl =
    false;


/* =========================================================
   COMPLETE TRACEABLE RESULT
========================================================= */

const finalMaritimeReviewResult = {

    priority: {

        firstAction:
            "SEXTANT RESILIENCE PLAN",

        priorityNumber:
            1,

        principle:
            "RESILIENCE REVIEW FIRST — NOT LAST",

        resiliencePriorityPass
    },


    dangerousGoods: {

        dangerousGoodsOnboard,
        dangerousGoodsDeclared,
        dangerousGoodsManifestCurrent,
        dangerousGoodsSegregationCompliant,
        dangerousGoodsStowagePlanAvailable,
        dangerousGoodsLabelsAndPlacardsCurrent,
        dangerousGoodsEmergencyInformationAvailable,

        status:
            dangerousGoodsPass
                ? "SIMULATED_DANGEROUS_GOODS_REVIEW_COMPLETE"
                : "SIMULATED_DANGEROUS_GOODS_REVIEW_REQUIRED"
    },


    loadLineAndZones: {

        loadLineCertificateCurrent,
        loadLineMarkingsVerified,
        loadLineConditionsReviewed,
        freeboardRequirementReviewed,
        seasonalOrZoneLoadLineRequirementsReviewed,

        draftLimitDeclared,
        actualDraftMeasured,
        trimConditionReviewed,
        operatingZoneDeclared,
        zoneDraftRequirementReviewed,
        portDraftRestrictionReviewed,

        status:
            navigationClearancePass
                ? "SIMULATED_LOADLINE_ZONE_REVIEW_COMPLETE"
                : "SIMULATED_LOADLINE_ZONE_REVIEW_REQUIRED"
    },


    underKeelClearance: {

        chartedDepthAboveChartDatum,
        tideHeightAboveChartDatum,
        calculatedWaterDepth,

        vesselDraft,
        trimAllowance,
        squatAllowance,
        safetyMargin,

        calculatedUnderKeelClearance,

        formula:
            "DEPTH OF WATER = CHARTED DEPTH ABOVE CHART DATUM + HEIGHT OF TIDE ABOVE CHART DATUM",

        ukcFormula:
            "UKC = DEPTH OF WATER - DRAFT - TRIM ALLOWANCE - SQUAT ALLOWANCE - SAFETY MARGIN",

        status:
            underKeelClearancePositive
                ? "SIMULATED_UKC_POSITIVE"
                : "SIMULATED_UKC_REVIEW_REQUIRED"
    },


    verticalClearance: {

        vesselHeightAboveKeel,
        overheadClearanceValue,
        calculatedVerticalClearance,

        highestPointHeightDeclared,
        overheadClearanceHazardReviewed,
        bridgeClearanceReviewed,
        cableClearanceReviewed,

        status:
            verticalClearancePositive
                ? "SIMULATED_VERTICAL_CLEARANCE_POSITIVE"
                : "SIMULATED_VERTICAL_CLEARANCE_REVIEW_REQUIRED"
    },


    manningAndCertification: {

        safeManningCertificateAvailable,
        safeManningCertificateCurrent,

        umvCertificateApplicable,
        umvCertificateCurrent,

        minimumCrewRequirementReviewed,

        classCertificateCurrent,
        classNotationCurrent,
        dpClassNotationCurrent,
        iceClassNotationCurrent,

        status:
            certificationPass
                ? "SIMULATED_CERTIFICATION_REVIEW_COMPLETE"
                : "SIMULATED_CERTIFICATION_REVIEW_REQUIRED"
    },


    publications: {

        requiredPublicationsInventoryAvailable,
        nauticalChartsCurrent,
        electronicNavigationPublicationsCurrent,
        sailingDirectionsAvailable,
        noticesToMarinersCurrent,
        tideTablesOrApprovedTidalInformationAvailable,
        applicableRegulationsAvailable,
        emergencyPublicationsAvailable,

        status:
            publicationsPass
                ? "SIMULATED_PUBLICATIONS_REVIEW_COMPLETE"
                : "SIMULATED_PUBLICATIONS_REVIEW_REQUIRED"
    },


    electronicStores: {

        electronicStoresAvailable,
        criticalElectronicSparesAvailable,
        navigationSensorSparesAvailable,
        communicationSparesAvailable,
        networkAndComputerSparesAvailable,
        powerSupplyElectronicSparesAvailable,
        approvedReplacementPartsAvailable,
        electronicStoresInventoryCurrent,

        status:
            electronicStoresPass
                ? "SIMULATED_ELECTRONIC_STORES_REVIEW_COMPLETE"
                : "SIMULATED_ELECTRONIC_STORES_REVIEW_REQUIRED"
    },


    operationalReserves: {

        fuelCapacityAdequate,
        fuelReserveAdequate,
        freshwaterCapacityAdequate,
        freshwaterReserveAdequate,
        provisionsCapacityAdequate,
        provisionsReserveAdequate,

        reservePlanningFactor,

        plannedFuelRequirementWithReserve,
        plannedWaterRequirementWithReserve,
        plannedFoodRequirementWithReserve,

        status:
            operationalReservePass
                ? "SIMULATED_OPERATIONAL_RESERVE_REVIEW_COMPLETE"
                : "SIMULATED_OPERATIONAL_RESERVE_REVIEW_REQUIRED"
    },


    cateringAndAccommodation: {

        galleyEquipmentOperational,
        foodStoresAdequate,
        potableWaterAvailable,
        refrigerationAvailable,
        foodHygieneControlsAvailable,
        accommodationSafetyReviewed,
        cabinSafetyReviewed,
        sanitaryFacilitiesOperational,

        status:
            accommodationCateringPass
                ? "SIMULATED_CATERING_ACCOMMODATION_REVIEW_COMPLETE"
                : "SIMULATED_CATERING_ACCOMMODATION_REVIEW_REQUIRED"
    },


    environmental: {

        garbageManagementCompliant,
        wasteOilManagementCompliant,
        sewageManagementCompliant,
        disposalRecordsCurrent,

        status:
            environmentalPass
                ? "SIMULATED_ENVIRONMENTAL_REVIEW_COMPLETE"
                : "SIMULATED_ENVIRONMENTAL_REVIEW_REQUIRED"
    },


    emergencySystems: {

        escapeRoutesMarked,
        escapeRoutesClear,
        emergencyLightingOperational,
        emergencyPowerAvailable,
        emergencyGeneratorTestCurrent,
        emergencyBatteryTestCurrent,

        status:
            emergencyPass
                ? "SIMULATED_EMERGENCY_REVIEW_COMPLETE"
                : "SIMULATED_EMERGENCY_REVIEW_REQUIRED"
    },


    identification: {

        vesselNameMarkingCurrent,
        imoNumberMarkingCurrent,
        portOfRegistryMarkingCurrent,
        funnelLogoMarkingCurrent,

        status:
            identificationPass
                ? "SIMULATED_IDENTIFICATION_REVIEW_COMPLETE"
                : "SIMULATED_IDENTIFICATION_REVIEW_REQUIRED"
    },


    hullAndMachinery: {

        hullNdtCurrent,
        machineryNdtCurrent,
        structuralInspectionCurrent,
        machineryInspectionCurrent,

        status:
            machineryInspectionPass
                ? "SIMULATED_HULL_MACHINERY_REVIEW_COMPLETE"
                : "SIMULATED_HULL_MACHINERY_REVIEW_REQUIRED"
    },


    validation: {

        correctiveActionTestingCompleted,
        reTestValidationCompleted,
        assessmentLatencyMeasured,
        deterministicScenarioRepeatabilityConfirmed,

        status:
            validationPass
                ? "SIMULATED_VALIDATION_REVIEW_COMPLETE"
                : "SIMULATED_VALIDATION_REVIEW_REQUIRED"
    },


    researchBoundary: {

        purpose:
            "EVALUATE AND VALIDATE THE SOFTWARE STACK SUPPORTING AUTONOMY",

        marinResearchBoundary,

        replacesAutonomySystem:
            false,

        commandsPhysicalVessel:
            false
    },


    overallAssessment: {

        finalMaritimeReviewPass,

        status:
            finalMaritimeReviewStatus,

        recommendedAction:
            finalMaritimeReviewPass
                ? "MAINTAIN REVIEW AND HUMAN OVERSIGHT"
                : "ESCALATE / CORRECT / RE-TEST / HUMAN REVIEW"
    },


    execution: {

        gate:
            maritimeExecutionGate,

        operationalCommand,
        physicalVesselControl
    }
};


/* =========================================================
   GLOBAL ACCESS
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.SextantMaritimeFinalReviewV1 =
        finalMaritimeReviewResult;

}

/*

/* =========================================================
   DRAFT / DOCK WATER DENSITY / FWA / DWA / UKC
   ALL DRAFT CORRECTIONS IN MILLIMETRES
========================================================= */

/*
   REFERENCE:

   Standard seawater density = 1.025 t/m³

   DENSITY LOWER THAN SEAWATER:
   Dock water density < 1.025
   → vessel sinks deeper
   → draft INCREASES
   → DWA is POSITIVE

   DENSITY HIGHER THAN SEAWATER:
   Dock water density > 1.025
   → vessel floats higher
   → draft DECREASES
   → DWA is NEGATIVE

   DENSITY EQUAL TO SEAWATER:
   Dock water density = 1.025
   → DWA = 0
   → no density correction
*/


const draftCalculation =
    condition.draftCalculation || {};


/* =================================================
   INPUTS
================================================= */

const WaterDensity =
    Number(draftCalculation.waterDensity_t_m3);

const Displacement =
    Number(draftCalculation.displacement_t);

const TPC =
    Number(draftCalculation.tpc_t_per_cm);

const ReferenceDraft_mm =
    Number(draftCalculation.referenceDraft_mm);


/* =================================================
   FRESH WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   FWA (mm) =
   Displacement / (4 × TPC)

   FWA is the change of draft between
   seawater density 1.025 and fresh water density 1.000.
*/

const FWA_mm =
    (Displacement > 0 && TPC > 0)
        ? Displacement / (4 * TPC)
        : 0;


/* =================================================
   DOCK WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   DWA (mm) =
   FWA × (1.025 - actual water density) / 0.025

   Positive DWA  = draft increases
   Negative DWA  = draft decreases
*/

const DWA_mm =
    FWA_mm *
    ((1.025 - WaterDensity) / 0.025);


/* =================================================
   CORRECTED DRAFT — MILLIMETRES
================================================= */

const CorrectedDraft_mm =
    ReferenceDraft_mm +
    DWA_mm;


/* =================================================
   DENSITY EFFECT
================================================= */

let DraftDensityEffect =
    "NO_DRAFT_CHANGE";


if (WaterDensity < 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_LOWER_THAN_SEAWATER — DRAFT INCREASES";

}


if (WaterDensity > 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_HIGHER_THAN_SEAWATER — DRAFT DECREASES";

}


if (WaterDensity === 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_EQUAL_TO_SEAWATER — NO_DENSITY_CORRECTION";

}


/* =================================================
   DRAFT CHANGE SIGN
================================================= */

const DraftIncrease_mm =
    DWA_mm > 0
        ? DWA_mm
        : 0;


const DraftDecrease_mm =
    DWA_mm < 0
        ? Math.abs(DWA_mm)
        : 0;


/* =================================================
   TIDE / CHART DATUM
================================================= */

/*
   Water Depth =
   Chart Datum Depth + Height of Tide
*/

const ChartDatumDepth_mm =
    Number(draftCalculation.chartDatumDepth_mm);

const TideHeight_mm =
    Number(draftCalculation.tideHeight_mm);


const WaterDepth_mm =
    ChartDatumDepth_mm +
    TideHeight_mm;


/* =================================================
   BASIC UNDER-KEEL CLEARANCE — MILLIMETRES
================================================= */

const BasicUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm;


/* =================================================
   TRIM
================================================= */

const ForwardDraft_mm =
    Number(draftCalculation.forwardDraft_mm);

const AftDraft_mm =
    Number(draftCalculation.aftDraft_mm);


const Trim_mm =
    AftDraft_mm -
    ForwardDraft_mm;


/*
   Mean draft based on forward and aft drafts.
*/

const MeanDraft_mm =
    (
        ForwardDraft_mm +
        AftDraft_mm
    ) / 2;


/* =================================================
   SQUAT / OTHER UKC ALLOWANCES
================================================= */

const Squat_mm =
    Number(draftCalculation.squat_mm) || 0;

const WaveAllowance_mm =
    Number(draftCalculation.waveAllowance_mm) || 0;

const OtherClearanceAllowance_mm =
    Number(
        draftCalculation.otherClearanceAllowance_mm
    ) || 0;

const RequiredUKC_mm =
    Number(draftCalculation.requiredUKC_mm) || 0;


/* =================================================
   AVAILABLE OPERATIONAL UKC — MILLIMETRES
================================================= */

const AvailableUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm -
    Squat_mm -
    WaveAllowance_mm -
    OtherClearanceAllowance_mm;


/* =================================================
   UKC STATUS
================================================= */

const UKC_PASS =
    AvailableUKC_mm >= RequiredUKC_mm;


const UKCStatus =
    UKC_PASS
        ? "SIMULATED_UKC_REQUIREMENT_SATISFIED"
        : "SIMULATED_UKC_REVIEW_REQUIRED";


/* =================================================
   DRAFT / DENSITY REVIEW STATUS
================================================= */

const draftDensityReviewStatus =
    (
        WaterDensity > 0 &&
        TPC > 0 &&
        Displacement > 0
    )
        ? "SIMULATED_DRAFT_DENSITY_REVIEW_COMPLETE"
        : "SIMULATED_DRAFT_DENSITY_REVIEW_REQUIRED";


/* =================================================
   TRACEABLE RESULT
================================================= */

const draftDensityUKCResult = {

    reference: {

        seawaterDensity_t_m3:
            1.025,

        freshwaterDensity_t_m3:
            1.000

    },


    inputs: {

        waterDensity_t_m3:
            WaterDensity,

        displacement_t:
            Displacement,

        tpc_t_per_cm:
            TPC,

        referenceDraft_mm:
            ReferenceDraft_mm

    },


    densityCorrection: {

        FWA_mm,

        DWA_mm,

        DraftIncrease_mm,

        DraftDecrease_mm,

        CorrectedDraft_mm,

        effect:
            DraftDensityEffect

    },


    navigationDepth: {

        chartDatumDepth_mm:
            ChartDatumDepth_mm,

        tideHeight_mm:
            TideHeight_mm,

        waterDepth_mm:
            WaterDepth_mm

    },


    vesselDraft: {

        forwardDraft_mm:
            ForwardDraft_mm,

        aftDraft_mm:
            AftDraft_mm,

        meanDraft_mm:
            MeanDraft_mm,

        trim_mm:
            Trim_mm

    },


    underKeelClearance: {

        basicUKC_mm:
            BasicUKC_mm,

        squat_mm:
            Squat_mm,

        waveAllowance_mm:
            WaveAllowance_mm,

        otherClearanceAllowance_mm:
            OtherClearanceAllowance_mm,

        availableUKC_mm:
            AvailableUKC_mm,

        requiredUKC_mm:
            RequiredUKC_mm,

        pass:
            UKC_PASS,

        status:
            UKCStatus

    },


    assessment: {

        status:
            draftDensityReviewStatus

    },


    execution: {

        gate:
            "HUMAN AUTHORIZATION REQUIRED",

        executed:
            false,

        operationalCommand:
            false

    }

};


/* =================================================
   GLOBAL ACCESS
================================================= */

if (
    typeof window !== "undefined"
) {

    window.MaritimeDraftDensityUKCReviewV1 =
        draftDensityUKCResult;

}

/* =========================================================
   DRAFT / DOCK WATER DENSITY / FWA / DWA / UKC
   ALL DRAFT CORRECTIONS IN MILLIMETRES
========================================================= */

/*
   REFERENCE:

   Standard seawater density = 1.025 t/m³

   DENSITY LOWER THAN SEAWATER:
   Dock water density < 1.025
   → vessel sinks deeper
   → draft INCREASES
   → DWA is POSITIVE

   DENSITY HIGHER THAN SEAWATER:
   Dock water density > 1.025
   → vessel floats higher
   → draft DECREASES
   → DWA is NEGATIVE

   DENSITY EQUAL TO SEAWATER:
   Dock water density = 1.025
   → DWA = 0
   → no density correction
*/


const draftCalculation =
    condition.draftCalculation || {};


/* =================================================
   INPUTS
================================================= */

const WaterDensity =
    Number(draftCalculation.waterDensity_t_m3);

const Displacement =
    Number(draftCalculation.displacement_t);

const TPC =
    Number(draftCalculation.tpc_t_per_cm);

const ReferenceDraft_mm =
    Number(draftCalculation.referenceDraft_mm);


/* =================================================
   FRESH WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   FWA (mm) =
   Displacement / (4 × TPC)

   FWA is the change of draft between
   seawater density 1.025 and fresh water density 1.000.
*/

const FWA_mm =
    (Displacement > 0 && TPC > 0)
        ? Displacement / (4 * TPC)
        : 0;


/* =================================================
   DOCK WATER ALLOWANCE — MILLIMETRES
================================================= */

/*
   DWA (mm) =
   FWA × (1.025 - actual water density) / 0.025

   Positive DWA  = draft increases
   Negative DWA  = draft decreases
*/

const DWA_mm =
    FWA_mm *
    ((1.025 - WaterDensity) / 0.025);


/* =================================================
   CORRECTED DRAFT — MILLIMETRES
================================================= */

const CorrectedDraft_mm =
    ReferenceDraft_mm +
    DWA_mm;


/* =================================================
   DENSITY EFFECT
================================================= */

let DraftDensityEffect =
    "NO_DRAFT_CHANGE";


if (WaterDensity < 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_LOWER_THAN_SEAWATER — DRAFT INCREASES";

}


if (WaterDensity > 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_HIGHER_THAN_SEAWATER — DRAFT DECREASES";

}


if (WaterDensity === 1.025) {

    DraftDensityEffect =
        "DOCK_WATER_DENSITY_EQUAL_TO_SEAWATER — NO_DENSITY_CORRECTION";

}


/* =================================================
   DRAFT CHANGE SIGN
================================================= */

const DraftIncrease_mm =
    DWA_mm > 0
        ? DWA_mm
        : 0;


const DraftDecrease_mm =
    DWA_mm < 0
        ? Math.abs(DWA_mm)
        : 0;


/* =================================================
   TIDE / CHART DATUM
================================================= */

/*
   Water Depth =
   Chart Datum Depth + Height of Tide
*/

const ChartDatumDepth_mm =
    Number(draftCalculation.chartDatumDepth_mm);

const TideHeight_mm =
    Number(draftCalculation.tideHeight_mm);


const WaterDepth_mm =
    ChartDatumDepth_mm +
    TideHeight_mm;


/* =================================================
   BASIC UNDER-KEEL CLEARANCE — MILLIMETRES
================================================= */

const BasicUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm;


/* =================================================
   TRIM
================================================= */

const ForwardDraft_mm =
    Number(draftCalculation.forwardDraft_mm);

const AftDraft_mm =
    Number(draftCalculation.aftDraft_mm);


const Trim_mm =
    AftDraft_mm -
    ForwardDraft_mm;


/*
   Mean draft based on forward and aft drafts.
*/

const MeanDraft_mm =
    (
        ForwardDraft_mm +
        AftDraft_mm
    ) / 2;


/* =================================================
   SQUAT / OTHER UKC ALLOWANCES
================================================= */

const Squat_mm =
    Number(draftCalculation.squat_mm) || 0;

const WaveAllowance_mm =
    Number(draftCalculation.waveAllowance_mm) || 0;

const OtherClearanceAllowance_mm =
    Number(
        draftCalculation.otherClearanceAllowance_mm
    ) || 0;

const RequiredUKC_mm =
    Number(draftCalculation.requiredUKC_mm) || 0;


/* =================================================
   AVAILABLE OPERATIONAL UKC — MILLIMETRES
================================================= */

const AvailableUKC_mm =
    WaterDepth_mm -
    CorrectedDraft_mm -
    Squat_mm -
    WaveAllowance_mm -
    OtherClearanceAllowance_mm;


/* =================================================
   UKC STATUS
================================================= */

const UKC_PASS =
    AvailableUKC_mm >= RequiredUKC_mm;


const UKCStatus =
    UKC_PASS
        ? "SIMULATED_UKC_REQUIREMENT_SATISFIED"
        : "SIMULATED_UKC_REVIEW_REQUIRED";


/* =================================================
   DRAFT / DENSITY REVIEW STATUS
================================================= */

const draftDensityReviewStatus =
    (
        WaterDensity > 0 &&
        TPC > 0 &&
        Displacement > 0
    )
        ? "SIMULATED_DRAFT_DENSITY_REVIEW_COMPLETE"
        : "SIMULATED_DRAFT_DENSITY_REVIEW_REQUIRED";


/* =================================================
   TRACEABLE RESULT
================================================= */

const draftDensityUKCResult = {

    reference: {

        seawaterDensity_t_m3:
            1.025,

        freshwaterDensity_t_m3:
            1.000

    },


    inputs: {

        waterDensity_t_m3:
            WaterDensity,

        displacement_t:
            Displacement,

        tpc_t_per_cm:
            TPC,

        referenceDraft_mm:
            ReferenceDraft_mm

    },


    densityCorrection: {

        FWA_mm,

        DWA_mm,

        DraftIncrease_mm,

        DraftDecrease_mm,

        CorrectedDraft_mm,

        effect:
            DraftDensityEffect

    },


    navigationDepth: {

        chartDatumDepth_mm:
            ChartDatumDepth_mm,

        tideHeight_mm:
            TideHeight_mm,

        waterDepth_mm:
            WaterDepth_mm

    },


    vesselDraft: {

        forwardDraft_mm:
            ForwardDraft_mm,

        aftDraft_mm:
            AftDraft_mm,

        meanDraft_mm:
            MeanDraft_mm,

        trim_mm:
            Trim_mm

    },


    underKeelClearance: {

        basicUKC_mm:
            BasicUKC_mm,

        squat_mm:
            Squat_mm,

        waveAllowance_mm:
            WaveAllowance_mm,

        otherClearanceAllowance_mm:
            OtherClearanceAllowance_mm,

        availableUKC_mm:
            AvailableUKC_mm,

        requiredUKC_mm:
            RequiredUKC_mm,

        pass:
            UKC_PASS,

        status:
            UKCStatus

    },


    assessment: {

        status:
            draftDensityReviewStatus

    },


    execution: {

        gate:
            "HUMAN AUTHORIZATION REQUIRED",

        executed:
            false,

        operationalCommand:
            false

    }

};


/* =================================================
   GLOBAL ACCESS
================================================= */

if (
    typeof window !== "undefined"
) {

    window.MaritimeDraftDensityUKCReviewV1 =
        draftDensityUKCResult;

}


 =========================================================
   END OF MARITIME SAFETY / VESSEL SUITABILITY EXTENSION
========================================================= */