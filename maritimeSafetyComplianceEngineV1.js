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


        /* =================================================
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
   BRIDGE → ACCOMMODATION → GALLEY → STORES / LOGISTICS
   → HULL → MACHINERY SPACES → ENGINE ROOM
   → VESSEL SUITABILITY → FINAL V&V RESULT
========================================================= */


/* =========================================================
   HULL / WATERTIGHT INTEGRITY
========================================================= */

const hull =
    condition.hull || {};

const hullSurveyCurrent =
    hull.surveyCurrent === true;

const hullStructureInspected =
    hull.structureInspected === true;

const watertightIntegrityVerified =
    hull.watertightIntegrityVerified === true;

const weathertightIntegrityVerified =
    hull.weathertightIntegrityVerified === true;

const hullOpeningsVerified =
    hull.openingsVerified === true;

const corrosionConditionReviewed =
    hull.corrosionConditionReviewed === true;


let hullStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    hullSurveyCurrent &&
    hullStructureInspected &&
    watertightIntegrityVerified &&
    weathertightIntegrityVerified &&
    hullOpeningsVerified &&
    corrosionConditionReviewed
) {

    hullStatus =
        "SIMULATED_HULL_REVIEW_COMPLETE";

}


/* =========================================================
   BRIDGE / NAVIGATION SAFETY
========================================================= */

const bridge =
    condition.bridge || {};

const navigationEquipmentAvailable =
    bridge.navigationEquipmentAvailable === true;

const navigationEquipmentTested =
    bridge.navigationEquipmentTested === true;

const navigationLightsAvailable =
    bridge.navigationLightsAvailable === true;

const navigationLightsSurveyCurrent =
    bridge.navigationLightsSurveyCurrent === true;

const soundSignalsAvailable =
    bridge.soundSignalsAvailable === true;

const soundSignalsSurveyCurrent =
    bridge.soundSignalsSurveyCurrent === true;

const steeringControlAvailable =
    bridge.steeringControlAvailable === true;

const bridgeEmergencyPowerAvailable =
    bridge.emergencyPowerAvailable === true;

const bridgeRecordsCurrent =
    bridge.recordsCurrent === true;


let bridgeStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    navigationEquipmentAvailable &&
    navigationEquipmentTested &&
    navigationLightsAvailable &&
    navigationLightsSurveyCurrent &&
    soundSignalsAvailable &&
    soundSignalsSurveyCurrent &&
    steeringControlAvailable &&
    bridgeEmergencyPowerAvailable &&
    bridgeRecordsCurrent
) {

    bridgeStatus =
        "SIMULATED_BRIDGE_REVIEW_COMPLETE";

}


/* =========================================================
   NAVIGATION LIGHTS / SOUND SIGNALS STATUTORY REVIEW
========================================================= */

const navigationLights =
    condition.navigationLights || {};

const navigationLightsOperational =
    navigationLights.operational === true;

const navigationLightsInspectionCurrent =
    navigationLights.inspectionCurrent === true;

const navigationLightsDocumentationCurrent =
    navigationLights.documentationCurrent === true;


let navigationLightsStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    navigationLightsOperational &&
    navigationLightsInspectionCurrent &&
    navigationLightsDocumentationCurrent
) {

    navigationLightsStatus =
        "SIMULATED_NAVIGATION_LIGHTS_REVIEW_COMPLETE";

}


const soundSignals =
    condition.soundSignals || {};

const soundSignalOperational =
    soundSignals.operational === true;

const soundSignalInspectionCurrent =
    soundSignals.inspectionCurrent === true;

const soundSignalDocumentationCurrent =
    soundSignals.documentationCurrent === true;


let soundSignalStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    soundSignalOperational &&
    soundSignalInspectionCurrent &&
    soundSignalDocumentationCurrent
) {

    soundSignalStatus =
        "SIMULATED_SOUND_SIGNAL_REVIEW_COMPLETE";

}


/* =========================================================
   ACCOMMODATION / CABINS / CREW WELFARE
========================================================= */

const accommodation =
    condition.accommodation || {};

const accommodationInspectionCurrent =
    accommodation.inspectionCurrent === true;

const cabinsConditionReviewed =
    accommodation.cabinsConditionReviewed === true;

const escapeRoutesAvailable =
    accommodation.escapeRoutesAvailable === true;

const emergencyLightingAvailable =
    accommodation.emergencyLightingAvailable === true;

const ventilationAvailable =
    accommodation.ventilationAvailable === true;

const sanitationAvailable =
    accommodation.sanitationAvailable === true;

const crewWelfareFacilitiesAvailable =
    accommodation.crewWelfareFacilitiesAvailable === true;


let accommodationStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    accommodationInspectionCurrent &&
    cabinsConditionReviewed &&
    escapeRoutesAvailable &&
    emergencyLightingAvailable &&
    ventilationAvailable &&
    sanitationAvailable &&
    crewWelfareFacilitiesAvailable
) {

    accommodationStatus =
        "SIMULATED_ACCOMMODATION_REVIEW_COMPLETE";

}


/* =========================================================
   GALLEY / FOOD HYGIENE
========================================================= */

const galley =
    condition.galley || {};

const galleyOperational =
    galley.operational === true;

const refrigerationAvailable =
    galley.refrigerationAvailable === true;

const foodPreparationAreaSuitable =
    galley.foodPreparationAreaSuitable === true;

const hygieneControlsAvailable =
    galley.hygieneControlsAvailable === true;

const cookingEquipmentSafe =
    galley.cookingEquipmentSafe === true;

const galleyFireProtectionAvailable =
    galley.fireProtectionAvailable === true;


let galleyStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    galleyOperational &&
    refrigerationAvailable &&
    foodPreparationAreaSuitable &&
    hygieneControlsAvailable &&
    cookingEquipmentSafe &&
    galleyFireProtectionAvailable
) {

    galleyStatus =
        "SIMULATED_GALLEY_REVIEW_COMPLETE";

}


/* =========================================================
   FOOD / PROVISIONS
   RESEARCH PLANNING CRITERION: +10% RESERVE
========================================================= */

const provisions =
    condition.provisions || {};

const personsForProvisioning =
    this.number(
        provisions.persons,
        personsOnBoard
    );

const foodDaysRequired =
    this.number(
        provisions.daysRequired,
        0
    );

const foodDailyRequirement =
    this.number(
        provisions.dailyRequirement,
        0
    );

const foodAvailable =
    this.number(
        provisions.foodAvailable,
        0
    );


const foodBaseRequirement =
    personsForProvisioning *
    foodDaysRequired *
    foodDailyRequirement;

const foodPlanningRequirement =
    foodBaseRequirement * 1.10;


const foodReserveAdequate =
    foodAvailable >=
    foodPlanningRequirement;


let foodStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    foodPlanningRequirement === 0 ||
    foodReserveAdequate
) {

    foodStatus =
        "SIMULATED_FOOD_RESERVE_ADEQUATE";

}


/* =========================================================
   POTABLE WATER
   RESEARCH PLANNING CRITERION: +10% RESERVE
========================================================= */

const water =
    condition.water || {};

const waterPersons =
    this.number(
        water.persons,
        personsOnBoard
    );

const waterDaysRequired =
    this.number(
        water.daysRequired,
        0
    );

const waterDailyRequirement =
    this.number(
        water.dailyRequirement,
        0
    );

const potableWaterAvailable =
    this.number(
        water.potableWaterAvailable,
        0
    );


const waterBaseRequirement =
    waterPersons *
    waterDaysRequired *
    waterDailyRequirement;

const waterPlanningRequirement =
    waterBaseRequirement * 1.10;


const waterReserveAdequate =
    potableWaterAvailable >=
    waterPlanningRequirement;


let waterStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    waterPlanningRequirement === 0 ||
    waterReserveAdequate
) {

    waterStatus =
        "SIMULATED_POTABLE_WATER_RESERVE_ADEQUATE";

}


/* =========================================================
   FUEL / BUNKER LOGISTICS
   RESEARCH PLANNING CRITERION: +10% RESERVE
========================================================= */

const fuel =
    condition.fuel || {};

const fuelBaseRequirement =
    this.number(
        fuel.required,
        0
    );

const fuelAvailable =
    this.number(
        fuel.available,
        0
    );

const fuelPlanningRequirement =
    fuelBaseRequirement * 1.10;


const fuelReserveAdequate =
    fuelAvailable >=
    fuelPlanningRequirement;


let fuelStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    fuelPlanningRequirement === 0 ||
    fuelReserveAdequate
) {

    fuelStatus =
        "SIMULATED_FUEL_RESERVE_ADEQUATE";

}


/* =========================================================
   ONBOARD LOGISTICS / STORES
========================================================= */

const logistics =
    condition.logistics || {};

const essentialStoresAvailable =
    logistics.essentialStoresAvailable === true;

const sparePartsAvailable =
    logistics.sparePartsAvailable === true;

const maintenanceStoresAvailable =
    logistics.maintenanceStoresAvailable === true;

const medicalStoresAvailable =
    logistics.medicalStoresAvailable === true;

const safetyStoresAvailable =
    logistics.safetyStoresAvailable === true;

const navigationStoresAvailable =
    logistics.navigationStoresAvailable === true;

const engineeringStoresAvailable =
    logistics.engineeringStoresAvailable === true;

const inventoryRecordsCurrent =
    logistics.inventoryRecordsCurrent === true;


let logisticsStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    essentialStoresAvailable &&
    sparePartsAvailable &&
    maintenanceStoresAvailable &&
    medicalStoresAvailable &&
    safetyStoresAvailable &&
    navigationStoresAvailable &&
    engineeringStoresAvailable &&
    inventoryRecordsCurrent
) {

    logisticsStatus =
        "SIMULATED_LOGISTICS_REVIEW_COMPLETE";

}


/* =========================================================
   MACHINERY SPACES
========================================================= */

const machinerySpaces =
    condition.machinerySpaces || {};

const machinerySpaceInspectionCurrent =
    machinerySpaces.inspectionCurrent === true;

const machinerySpaceFireProtectionAvailable =
    machinerySpaces.fireProtectionAvailable === true;

const machinerySpaceEmergencyEscapeAvailable =
    machinerySpaces.emergencyEscapeAvailable === true;

const machinerySpaceVentilationAvailable =
    machinerySpaces.ventilationAvailable === true;

const machinerySpaceLightingAvailable =
    machinerySpaces.lightingAvailable === true;

const machinerySpaceBilgeArrangementsReviewed =
    machinerySpaces.bilgeArrangementsReviewed === true;


let machinerySpaceStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    machinerySpaceInspectionCurrent &&
    machinerySpaceFireProtectionAvailable &&
    machinerySpaceEmergencyEscapeAvailable &&
    machinerySpaceVentilationAvailable &&
    machinerySpaceLightingAvailable &&
    machinerySpaceBilgeArrangementsReviewed
) {

    machinerySpaceStatus =
        "SIMULATED_MACHINERY_SPACE_REVIEW_COMPLETE";

}


/* =========================================================
   ENGINE ROOM
========================================================= */

const engineRoom =
    condition.engineRoom || {};

const mainEngineSurveyCurrent =
    engineRoom.mainEngineSurveyCurrent === true;

const auxiliaryEnginesSurveyCurrent =
    engineRoom.auxiliaryEnginesSurveyCurrent === true;

const emergencyGeneratorSurveyCurrent =
    engineRoom.emergencyGeneratorSurveyCurrent === true;

const propulsionInspectionCurrent =
    engineRoom.propulsionInspectionCurrent === true;

const fuelSystemInspectionCurrent =
    engineRoom.fuelSystemInspectionCurrent === true;

const lubricationSystemInspectionCurrent =
    engineRoom.lubricationSystemInspectionCurrent === true;

const coolingSystemInspectionCurrent =
    engineRoom.coolingSystemInspectionCurrent === true;

const steeringGearSurveyCurrent =
    engineRoom.steeringGearSurveyCurrent === true;

const emergencyShutdownsTested =
    engineRoom.emergencyShutdownsTested === true;

const alarmsAndSafetiesTested =
    engineRoom.alarmsAndSafetiesTested === true;

const engineRoomFireProtectionAvailable =
    engineRoom.fireProtectionAvailable === true;

const engineRoomEmergencyEscapeAvailable =
    engineRoom.emergencyEscapeAvailable === true;


let engineRoomStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    mainEngineSurveyCurrent &&
    auxiliaryEnginesSurveyCurrent &&
    emergencyGeneratorSurveyCurrent &&
    propulsionInspectionCurrent &&
    fuelSystemInspectionCurrent &&
    lubricationSystemInspectionCurrent &&
    coolingSystemInspectionCurrent &&
    steeringGearSurveyCurrent &&
    emergencyShutdownsTested &&
    alarmsAndSafetiesTested &&
    engineRoomFireProtectionAvailable &&
    engineRoomEmergencyEscapeAvailable
) {

    engineRoomStatus =
        "SIMULATED_ENGINE_ROOM_REVIEW_COMPLETE";

}


/* =========================================================
   VESSEL SUITABILITY
========================================================= */

const suitability =
    condition.suitability || {};

const vesselTypeDeclared =
    suitability.vesselTypeDeclared === true;

const intendedOperationDeclared =
    suitability.intendedOperationDeclared === true;

const operationalAreaDeclared =
    suitability.operationalAreaDeclared === true;

const manningBasisReviewed =
    suitability.manningBasisReviewed === true;

const stabilityInformationAvailable =
    suitability.stabilityInformationAvailable === true;

const loadingConditionReviewed =
    suitability.loadingConditionReviewed === true;

const draftAndTrimReviewed =
    suitability.draftAndTrimReviewed === true;

const loadLineInformationReviewed =
    suitability.loadLineInformationReviewed === true;

const zoneDraftPermissionReviewed =
    suitability.zoneDraftPermissionReviewed === true;


let suitabilityStatus =
    "SIMULATED_REVIEW_REQUIRED";


if (
    vesselTypeDeclared &&
    intendedOperationDeclared &&
    operationalAreaDeclared &&
    manningBasisReviewed &&
    stabilityInformationAvailable &&
    loadingConditionReviewed &&
    draftAndTrimReviewed &&
    loadLineInformationReviewed &&
    zoneDraftPermissionReviewed
) {

    suitabilityStatus =
        "SIMULATED_VESSEL_SUITABILITY_REVIEW_COMPLETE";

}


/* =========================================================
   FINAL SYSTEMATIC REVIEW
========================================================= */

const technicalSystemsPass =
    bridgeStatus ===
        "SIMULATED_BRIDGE_REVIEW_COMPLETE" &&
    hullStatus ===
        "SIMULATED_HULL_REVIEW_COMPLETE" &&
    machineryStatus ===
        "SIMULATED_MACHINERY_SURVEY_COMPLETE" &&
    machinerySpaceStatus ===
        "SIMULATED_MACHINERY_SPACE_REVIEW_COMPLETE" &&
    engineRoomStatus ===
        "SIMULATED_ENGINE_ROOM_REVIEW_COMPLETE";


const accommodationPass =
    accommodationStatus ===
        "SIMULATED_ACCOMMODATION_REVIEW_COMPLETE" &&
    galleyStatus ===
        "SIMULATED_GALLEY_REVIEW_COMPLETE" &&
    cateringStatus ===
        "SIMULATED_CATERING_REVIEW_COMPLETE";


const logisticsPass =
    logisticsStatus ===
        "SIMULATED_LOGISTICS_REVIEW_COMPLETE" &&
    foodStatus ===
        "SIMULATED_FOOD_RESERVE_ADEQUATE" &&
    waterStatus ===
        "SIMULATED_POTABLE_WATER_RESERVE_ADEQUATE" &&
    fuelStatus ===
        "SIMULATED_FUEL_RESERVE_ADEQUATE";


const navigationSafetyPass =
    navigationLightsStatus ===
        "SIMULATED_NAVIGATION_LIGHTS_REVIEW_COMPLETE" &&
    soundSignalStatus ===
        "SIMULATED_SOUND_SIGNAL_REVIEW_COMPLETE";


const surveyPass =
    gmdssStatus ===
        "SIMULATED_GMDSS_REVIEW_COMPLETE" &&
    surveyStatus ===
        "SIMULATED_SURVEY_REVIEW_COMPLETE";


const documentationPassFinal =
    flagStateStatus ===
        "SIMULATED_REVIEW_COMPLETE" &&
    statutoryStatus ===
        "SIMULATED_REVIEW_COMPLETE" &&
    classStatus ===
        "SIMULATED_REVIEW_COMPLETE" &&
    piStatus ===
        "SIMULATED_DOCUMENTATION_CURRENT";


const contingencyPassFinal =
    contingencyStatus ===
        "SIMULATED_CONTINGENCY_READY";


const operationalPassFinal =
    operationalSafetyStatus ===
        "SIMULATED_READY";


const suitabilityPass =
    suitabilityStatus ===
        "SIMULATED_VESSEL_SUITABILITY_REVIEW_COMPLETE";


const overallReviewPass =
    equipmentPass &&
    technicalSystemsPass &&
    accommodationPass &&
    logisticsPass &&
    navigationSafetyPass &&
    surveyPass &&
    documentationPassFinal &&
    contingencyPassFinal &&
    operationalPassFinal &&
    suitabilityPass;


const finalOverallStatus =
    overallReviewPass
        ? "SIMULATED_MARITIME_SAFETY_V_AND_V_REVIEW_PASS"
        : "SIMULATED_MARITIME_SAFETY_V_AND_V_REVIEW_REQUIRED";


const finalReviewRequired =
    !overallReviewPass;


const finalRecommendedAction =
    finalReviewRequired
        ? "ESCALATE / HUMAN REVIEW"
        : "MAINTAIN SIMULATED SAFETY STATUS";


/* =========================================================
   TRACEABLE FINAL RESULT
========================================================= */

return {

    engine:
        "MaritimeSafetyComplianceEngineV1",

    version:
        this.version,

    mode:
        this.mode,

    operationalConnection:
        false,

    autonomousCommand:
        false,

    humanAuthority:
        true,


    /* =====================================================
       BRIDGE
    ===================================================== */

    bridge: {

        navigationEquipmentAvailable,
        navigationEquipmentTested,
        navigationLightsAvailable,
        navigationLightsSurveyCurrent,
        soundSignalsAvailable,
        soundSignalsSurveyCurrent,
        steeringControlAvailable,
        bridgeEmergencyPowerAvailable,
        bridgeRecordsCurrent,

        status:
            bridgeStatus

    },


    /* =====================================================
       NAVIGATION LIGHTS
    ===================================================== */

    navigationLights: {

        operational:
            navigationLightsOperational,

        inspectionCurrent:
            navigationLightsInspectionCurrent,

        documentationCurrent:
            navigationLightsDocumentationCurrent,

        status:
            navigationLightsStatus

    },


    /* =====================================================
       SOUND SIGNALS
    ===================================================== */

    soundSignals: {

        operational:
            soundSignalOperational,

        inspectionCurrent:
            soundSignalInspectionCurrent,

        documentationCurrent:
            soundSignalDocumentationCurrent,

        status:
            soundSignalStatus

    },


    /* =====================================================
       LSA
    ===================================================== */

    LSA: {

        required:
            lsaRequired,

        available:
            lsaAvailable,

        ready:
            lsaReady,

        inspectionValid:
            lsaInspectionValid,

        status:
            lsaStatus,

        survivalCapacity:
            survivalCapacity,

        personsOnBoard:
            personsOnBoard,

        capacityStatus:
            capacityStatus

    },


    /* =====================================================
       FFA
    ===================================================== */

    FFA: {

        required:
            ffaRequired,

        available:
            ffaAvailable,

        ready:
            ffaReady,

        inspectionValid:
            ffaInspectionValid,

        status:
            ffaStatus,

        fireDetectionAvailable:
            fireDetectionAvailable,

        fireSuppressionAvailable:
            fireSuppressionAvailable,

        emergencyFireEquipmentAvailable:
            emergencyFireEquipmentAvailable,

        fireSafetyStatus:
            fireSafetyStatus

    },


    /* =====================================================
       GMDSS
    ===================================================== */

    GMDSS: {

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
            gmdssStatus

    },


    /* =====================================================
       FLAG STATE
    ===================================================== */

    flagState: {

        declared:
            flagDeclared,

        requirementsChecked:
            flagRequirementsChecked,

        documentationCurrent:
            flagDocumentationCurrent,

        status:
            flagStateStatus

    },


    /* =====================================================
       STATUTORY
    ===================================================== */

    statutory: {

        documentsCurrent:
            statutoryDocumentsCurrent,

        inspectionCurrent:
            statutoryInspectionCurrent,

        status:
            statutoryStatus

    },


    /* =====================================================
       SURVEYS / AUDITS
    ===================================================== */

    surveys: {

        statutorySurveysCurrent,
        flagStateSurveysCurrent,
        flagStateAuditsCurrent,
        annualSurveysCurrent,
        intermediateSurveysCurrent,
        renewalSurveysCurrent,
        specialSurveysCurrent,
        radioSurveysCurrent,

        status:
            surveyStatus

    },


    /* =====================================================
       MACHINERY
    ===================================================== */

    machinery: {

        machinerySurveyCurrent,
        mainEngineInspectionCurrent,
        auxiliaryEngineInspectionCurrent,
        emergencyGeneratorInspectionCurrent,
        steeringGearInspectionCurrent,
        propulsionSystemsInspectionCurrent,

        status:
            machineryStatus

    },


    /* =====================================================
       CATERING
    ===================================================== */

    catering: {

        cateringInspectionCurrent,
        galleyInspectionCurrent,
        foodHygieneInspectionCurrent,
        provisionsStorageInspectionCurrent,
        potableWaterInspectionCurrent,
        crewAccommodationInspectionCurrent,

        status:
            cateringStatus

    },


    /* =====================================================
       ACCOMMODATION
    ===================================================== */

    accommodation: {

        accommodationInspectionCurrent,
        cabinsConditionReviewed,
        escapeRoutesAvailable,
        emergencyLightingAvailable,
        ventilationAvailable,
        sanitationAvailable,
        crewWelfareFacilitiesAvailable,

        status:
            accommodationStatus

    },


    /* =====================================================
       GALLEY
    ===================================================== */

    galley: {

        galleyOperational,
        refrigerationAvailable,
        foodPreparationAreaSuitable,
        hygieneControlsAvailable,
        cookingEquipmentSafe,
        galleyFireProtectionAvailable,

        status:
            galleyStatus

    },


    /* =====================================================
       FOOD
    ===================================================== */

    provisions: {

        persons:
            personsForProvisioning,

        daysRequired:
            foodDaysRequired,

        dailyRequirement:
            foodDailyRequirement,

        baseRequirement:
            foodBaseRequirement,

        planningRequirementPlus10Percent:
            foodPlanningRequirement,

        available:
            foodAvailable,

        reserveAdequate:
            foodReserveAdequate,

        status:
            foodStatus

    },


    /* =====================================================
       POTABLE WATER
    ===================================================== */

    potableWater: {

        persons:
            waterPersons,

        daysRequired:
            waterDaysRequired,

        dailyRequirement:
            waterDailyRequirement,

        baseRequirement:
            waterBaseRequirement,

        planningRequirementPlus10Percent:
            waterPlanningRequirement,

        available:
            potableWaterAvailable,

        reserveAdequate:
            waterReserveAdequate,

        status:
            waterStatus

    },


    /* =====================================================
       FUEL
    ===================================================== */

    fuel: {

        baseRequirement:
            fuelBaseRequirement,

        planningRequirementPlus10Percent:
            fuelPlanningRequirement,

        available:
            fuelAvailable,

        reserveAdequate:
            fuelReserveAdequate,

        status:
            fuelStatus

    },


    /* =====================================================
       LOGISTICS / STORES
    ===================================================== */

    logistics: {

        essentialStoresAvailable,
        sparePartsAvailable,
        maintenanceStoresAvailable,
        medicalStoresAvailable,
        safetyStoresAvailable,
        navigationStoresAvailable,
        engineeringStoresAvailable,
        inventoryRecordsCurrent,

        status:
            logisticsStatus

    },


    /* =====================================================
       HULL
    ===================================================== */

    hull: {

        hullSurveyCurrent,
        hullStructureInspected,
        watertightIntegrityVerified,
        weathertightIntegrityVerified,
        hullOpeningsVerified,
        corrosionConditionReviewed,

        status:
            hullStatus

    },


    /* =====================================================
       MACHINERY SPACES
    ===================================================== */

    machinerySpaces: {

        machinerySpaceInspectionCurrent,
        machinerySpaceFireProtectionAvailable,
        machinerySpaceEmergencyEscapeAvailable,
        machinerySpaceVentilationAvailable,
        machinerySpaceLightingAvailable,
        machinerySpaceBilgeArrangementsReviewed,

        status:
            machinerySpaceStatus

    },


    /* =====================================================
       ENGINE ROOM
    ===================================================== */

    engineRoom: {

        mainEngineSurveyCurrent,
        auxiliaryEnginesSurveyCurrent,
        emergencyGeneratorSurveyCurrent,
        propulsionInspectionCurrent,
        fuelSystemInspectionCurrent,
        lubricationSystemInspectionCurrent,
        coolingSystemInspectionCurrent,
        steeringGearSurveyCurrent,
        emergencyShutdownsTested,
        alarmsAndSafetiesTested,
        engineRoomFireProtectionAvailable,
        engineRoomEmergencyEscapeAvailable,

        status:
            engineRoomStatus

    },


    /* =====================================================
       VESSEL SUITABILITY
    ===================================================== */

    vesselSuitability: {

        vesselTypeDeclared,
        intendedOperationDeclared,
        operationalAreaDeclared,
        manningBasisReviewed,
        stabilityInformationAvailable,
        loadingConditionReviewed,
        draftAndTrimReviewed,
        loadLineInformationReviewed,
        zoneDraftPermissionReviewed,

        status:
            suitabilityStatus

    },


    /* =====================================================
       P&I
    ===================================================== */

    PAndI: {

        clubDeclared:
            piClubDeclared,

        coverCurrent:
            piCoverCurrent,

        documentationCurrent:
            piDocumentationCurrent,

        entryEvidenceAvailable:
            piEntryEvidenceAvailable,

        status:
            piStatus

    },


    /* =====================================================
       COMPANY CONTINGENCY
    ===================================================== */

    contingency: {

        planAvailable:
            contingencyPlanAvailable,

        emergencyResponsePlanAvailable:
            emergencyResponsePlanAvailable,

        pollutionResponsePlanAvailable:
            pollutionResponsePlanAvailable,

        cyberContingencyPlanAvailable:
            cyberContingencyPlanAvailable,

        businessContinuityPlanAvailable:
            businessContinuityPlanAvailable,

        shoreSupportAvailable:
            shoreSupportAvailable,

        status:
            contingencyStatus

    },


    /* =====================================================
       OPERATIONAL SAFETY
    ===================================================== */

    operationalSafety: {

        emergencyProceduresAvailable,

        drillsCurrent,

        safetyManagementSystemAvailable,

        status:
            operationalSafetyStatus

    },


    /* =====================================================
       FINAL ASSESSMENT
    ===================================================== */

    assessment: {

        equipmentPass:
            equipmentPass,

        technicalSystemsPass:
            technicalSystemsPass,

        accommodationPass:
            accommodationPass,

        logisticsPass:
            logisticsPass,

        navigationSafetyPass:
            navigationSafetyPass,

        surveyPass:
            surveyPass,

        documentationPass:
            documentationPassFinal,

        contingencyPass:
            contingencyPassFinal,

        operationalPass:
            operationalPassFinal,

        suitabilityPass:
            suitabilityPass,

        overallReviewPass:
            overallReviewPass,

        reviewRequired:
            finalReviewRequired,

        overallStatus:
            finalOverallStatus,

        recommendedAction:
            finalRecommendedAction

    },


    /* =====================================================
       HUMAN AUTHORITY / EXECUTION GATE
    ===================================================== */

    execution: {

        gate:
            "HUMAN AUTHORIZATION REQUIRED",

        executed:
            false,

        operationalCommand:
            false,

        operationalConnection:
            false

    }

};


/* =========================================================
   END OF assess()
========================================================= */

}


/* =========================================================
   NUMERIC SAFETY
========================================================= */

number(value, fallback = 0) {

    const n =
        Number(value);

    return Number.isFinite(n)
        ? n
        : fallback;

}

};


/* =========================================================
   GLOBAL ACCESS
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.MaritimeSafetyComplianceEngineV1 =
        MaritimeSafetyComplianceEngineV1;

}