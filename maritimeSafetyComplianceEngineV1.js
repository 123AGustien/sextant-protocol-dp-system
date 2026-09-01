/* =========================================================
   SEXTANT PROTOCOL™
   MARITIME SAFETY & COMPLIANCE ENGINE
   MARIN DP / USV V&V RESEARCH MODULE

   ENGINE:
   MaritimeSafetyComplianceEngineV1

   VERSION:
   1.1.0

   PURPOSE:
   Research assessment of maritime safety equipment,
   flag-state requirements, statutory/class documentation,
   P&I documentation and company contingency readiness
   within the Sextant Protocol V&V architecture.

   SCOPE:
   - Life-Saving Appliances (LSA)
   - Fire-Fighting Appliances (FFA)
   - Flag-State requirements
   - Statutory certificates / documentation
   - Class requirements
   - P&I / marine insurance documentation
   - Company contingency plans
   - Safety Management System indicators
   - Emergency procedures
   - Drill readiness
   - Safety equipment readiness
   - Inspection / validity indicators
   - Operational safety constraints

   IMPORTANT:
   RESEARCH / SIMULATION ONLY.

   This engine does NOT:
   - determine legal compliance;
   - replace flag-state requirements;
   - replace class requirements;
   - replace statutory certificates;
   - replace P&I Club requirements;
   - replace vessel SMS procedures;
   - replace company contingency plans;
   - replace Master/DPO authority;
   - issue operational commands;
   - control LSA, FFA, DP, propulsion or navigation systems.
========================================================= */


/* =========================================================
   ENGINE IDENTITY
========================================================= */

const MaritimeSafetyComplianceEngineV1 = {

    version: "1.1.0",

    mode: "RESEARCH_V_AND_V",

    operationalConnection: false,

    autonomousCommand: false,

    humanAuthority: true,


    /* =====================================================
       MAIN ASSESSMENT
    ===================================================== */

    assess(condition = {}) {

        const lsa =
            condition.lsa || {};

        const ffa =
            condition.ffa || {};

        const flagState =
            condition.flagState || {};

        const statutory =
            condition.statutory || {};

        const classRequirements =
            condition.classRequirements || {};

        const operational =
            condition.operational || {};

        const pi =
            condition.pi || {};

        const contingency =
            condition.contingency || {};


        /* =================================================
           LIFE-SAVING APPLIANCES
        ================================================= */

        const lsaRequired =
            this.number(
                lsa.required,
                0
            );

        const lsaAvailable =
            this.number(
                lsa.available,
                0
            );

        const lsaReady =
            this.number(
                lsa.ready,
                0
            );

        const lsaInspectionValid =
            lsa.inspectionValid;


        let lsaStatus =
            "NOT_ASSESSED";


        if (
            lsaRequired > 0 &&
            lsaAvailable >= lsaRequired &&
            lsaReady >= lsaRequired &&
            lsaInspectionValid === true
        ) {

            lsaStatus =
                "SIMULATED_READY";

        }
        else if (
            lsaRequired > 0
        ) {

            lsaStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           LIFE-SAVING CAPACITY
        ================================================= */

        const personsOnBoard =
            this.number(
                lsa.personsOnBoard,
                0
            );

        const survivalCapacity =
            this.number(
                lsa.survivalCapacity,
                0
            );


        let capacityStatus =
            "NOT_ASSESSED";


        if (
            survivalCapacity >=
            personsOnBoard
        ) {

            capacityStatus =
                "SIMULATED_CAPACITY_ADEQUATE";

        }
        else if (
            personsOnBoard > 0
        ) {

            capacityStatus =
                "SIMULATED_CAPACITY_REVIEW_REQUIRED";

        }


        /* =================================================
           FIRE-FIGHTING APPLIANCES
        ================================================= */

        const ffaRequired =
            this.number(
                ffa.required,
                0
            );

        const ffaAvailable =
            this.number(
                ffa.available,
                0
            );

        const ffaReady =
            this.number(
                ffa.ready,
                0
            );

        const ffaInspectionValid =
            ffa.inspectionValid;


        let ffaStatus =
            "NOT_ASSESSED";


        if (
            ffaRequired > 0 &&
            ffaAvailable >= ffaRequired &&
            ffaReady >= ffaRequired &&
            ffaInspectionValid === true
        ) {

            ffaStatus =
                "SIMULATED_READY";

        }
        else if (
            ffaRequired > 0
        ) {

            ffaStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           FIRE-FIGHTING READINESS
        ================================================= */

        const fireDetectionAvailable =
            ffa.fireDetectionAvailable;

        const fireSuppressionAvailable =
            ffa.fireSuppressionAvailable;

        const emergencyFireEquipmentAvailable =
            ffa.emergencyEquipmentAvailable;


        let fireSafetyStatus =
            "NOT_ASSESSED";


        if (
            fireDetectionAvailable === true &&
            fireSuppressionAvailable === true &&
            emergencyFireEquipmentAvailable === true
        ) {

            fireSafetyStatus =
                "SIMULATED_READY";

        }
        else if (
            ffaRequired > 0
        ) {

            fireSafetyStatus =
                "SIMULATED_REVIEW_REQUIRED";

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
            "NOT_ASSESSED";


        if (
            flagDeclared &&
            flagRequirementsChecked &&
            flagDocumentationCurrent
        ) {

            flagStateStatus =
                "SIMULATED_REVIEW_COMPLETE";

        }
        else {

            flagStateStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           STATUTORY DOCUMENTATION
        ================================================= */

        const statutoryDocumentsCurrent =
            statutory.documentsCurrent === true;

        const statutoryInspectionCurrent =
            statutory.inspectionCurrent === true;


        let statutoryStatus =
            "NOT_ASSESSED";


        if (
            statutoryDocumentsCurrent &&
            statutoryInspectionCurrent
        ) {

            statutoryStatus =
                "SIMULATED_REVIEW_COMPLETE";

        }
        else {

            statutoryStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           CLASS REQUIREMENTS
        ================================================= */

        const classRequirementsChecked =
            classRequirements.checked === true;

        const classDocumentationCurrent =
            classRequirements.documentationCurrent === true;


        let classStatus =
            "NOT_ASSESSED";


        if (
            classRequirementsChecked &&
            classDocumentationCurrent
        ) {

            classStatus =
                "SIMULATED_REVIEW_COMPLETE";

        }
        else {

            classStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           P&I / MARINE INSURANCE DOCUMENTATION
        ================================================= */

        const piClubDeclared =
            pi.clubDeclared === true;

        const piCoverCurrent =
            pi.coverCurrent === true;

        const piDocumentationCurrent =
            pi.documentationCurrent === true;

        const piEntryEvidenceAvailable =
            pi.entryEvidenceAvailable === true;


        let piStatus =
            "NOT_ASSESSED";


        if (
            piClubDeclared &&
            piCoverCurrent &&
            piDocumentationCurrent &&
            piEntryEvidenceAvailable
        ) {

            piStatus =
                "SIMULATED_DOCUMENTATION_CURRENT";

        }
        else {

            piStatus =
                "SIMULATED_INSURANCE_REVIEW_REQUIRED";

        }


        /* =================================================
           COMPANY CONTINGENCY PLANS
        ================================================= */

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


        let contingencyStatus =
            "NOT_ASSESSED";


        if (
            contingencyPlanAvailable &&
            emergencyResponsePlanAvailable &&
            pollutionResponsePlanAvailable &&
            cyberContingencyPlanAvailable &&
            businessContinuityPlanAvailable &&
            shoreSupportAvailable
        ) {

            contingencyStatus =
                "SIMULATED_CONTINGENCY_READY";

        }
        else {

            contingencyStatus =
                "SIMULATED_CONTINGENCY_REVIEW_REQUIRED";

        }


        /* =================================================
           OPERATIONAL SAFETY
        ================================================= */

        const emergencyProceduresAvailable =
            operational.emergencyProceduresAvailable === true;

        const drillsCurrent =
            operational.drillsCurrent === true;

        const safetyManagementSystemAvailable =
            operational.smsAvailable === true;


        let operationalSafetyStatus =
            "NOT_ASSESSED";


        if (
            emergencyProceduresAvailable &&
            drillsCurrent &&
            safetyManagementSystemAvailable
        ) {

            operationalSafetyStatus =
                "SIMULATED_READY";

        }
        else {

            operationalSafetyStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* =================================================
           EQUIPMENT ASSESSMENT
        ================================================= */

        const equipmentPass =
            (
                lsaStatus ===
                    "SIMULATED_READY" ||
                lsaRequired === 0
            ) &&
            (
                capacityStatus ===
                    "SIMULATED_CAPACITY_ADEQUATE" ||
                personsOnBoard === 0
            ) &&
            (
                ffaStatus ===
                    "SIMULATED_READY" ||
                ffaRequired === 0
            ) &&
            (
                fireSafetyStatus ===
                    "SIMULATED_READY" ||
                ffaRequired === 0
            );


        /* =================================================
           DOCUMENTATION ASSESSMENT
        ================================================= */

        const documentationPass =
            flagStateStatus ===
                "SIMULATED_REVIEW_COMPLETE" &&
            statutoryStatus ===
                "SIMULATED_REVIEW_COMPLETE" &&
            classStatus ===
                "SIMULATED_REVIEW_COMPLETE" &&
            piStatus ===
                "SIMULATED_DOCUMENTATION_CURRENT";


        /* =================================================
           CONTINGENCY ASSESSMENT
        ================================================= */

        const contingencyPass =
            contingencyStatus ===
                "SIMULATED_CONTINGENCY_READY";


        /* =================================================
           OPERATIONAL ASSESSMENT
        ================================================= */

        const operationalPass =
            operationalSafetyStatus ===
                "SIMULATED_READY";


        /* =================================================
           OVERALL SAFETY ASSESSMENT
        ================================================= */

        let overallStatus =
            "SIMULATED_SAFETY_REVIEW_REQUIRED";


        if (
            equipmentPass &&
            documentationPass &&
            contingencyPass &&
            operationalPass
        ) {

            overallStatus =
                "SIMULATED_SAFETY_REVIEW_PASS";

        }


        /* =================================================
           ESCALATION LOGIC
        ================================================= */

        const reviewRequired =
            !equipmentPass ||
            !documentationPass ||
            !contingencyPass ||
            !operationalPass;


        const recommendedAction =
            reviewRequired
                ? "ESCALATE / HUMAN REVIEW"
                : "MAINTAIN SAFETY STATUS";


        /* =================================================
           HUMAN AUTHORITY
        ================================================= */

        const executionGate =
            "HUMAN AUTHORIZATION REQUIRED";


        /* =================================================
           TRACEABLE RESULT
        ================================================= */

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


            /* =================================================
               LSA RESULT
            ================================================= */

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


            /* =================================================
               FFA RESULT
            ================================================= */

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


            /* =================================================
               FLAG STATE RESULT
            ================================================= */

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


            /* =================================================
               STATUTORY RESULT
            ================================================= */

            statutory: {

                documentsCurrent:
                    statutoryDocumentsCurrent,

                inspectionCurrent:
                    statutoryInspectionCurrent,

                status:
                    statutoryStatus

            },


            /* =================================================
               CLASS RESULT
            ================================================= */

            classRequirements: {

                checked:
                    classRequirementsChecked,

                documentationCurrent:
                    classDocumentationCurrent,

                status:
                    classStatus

            },


            /* =================================================
               P&I RESULT
            ================================================= */

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


            /* =================================================
               COMPANY CONTINGENCY RESULT
            ================================================= */

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


            /* =================================================
               OPERATIONAL SAFETY RESULT
            ================================================= */

            operationalSafety: {

                emergencyProceduresAvailable:
                    emergencyProceduresAvailable,

                drillsCurrent:
                    drillsCurrent,

                safetyManagementSystemAvailable:
                    safetyManagementSystemAvailable,

                status:
                    operationalSafetyStatus

            },


            /* =================================================
               OVERALL ASSESSMENT
            ================================================= */

            assessment: {

                equipmentPass:
                    equipmentPass,

                documentationPass:
                    documentationPass,

                contingencyPass:
                    contingencyPass,

                operationalPass:
                    operationalPass,

                reviewRequired:
                    reviewRequired,

                overallStatus:
                    overallStatus,

                recommendedAction:
                    recommendedAction

            },


            /* =================================================
               HUMAN EXECUTION GATE
            ================================================= */

            execution: {

                gate:
                    executionGate,

                executed:
                    false,

                operationalCommand:
                    false

            }

        };

    },


    /* =====================================================
       NUMERIC SAFETY
    ===================================================== */

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