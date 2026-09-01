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
