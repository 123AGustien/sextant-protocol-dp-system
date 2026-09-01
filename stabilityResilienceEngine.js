/* =========================================================
   SEXTANT PROTOCOL™
   STABILITY RESILIENCE ENGINE
   MARIN DP / USV V&V RESEARCH MODULE

   PURPOSE:
   Research assessment of vessel stability, trim, heel/list,
   CG movement, righting behaviour, draft constraints,
   ballast condition, environmental compliance indicators,
   and controlled manoeuvring effects.

   IMPORTANT:
   - Research / simulation only
   - No operational vessel connection
   - No DP, propulsion, steering or ballast commands
   - Does NOT replace approved stability calculations,
     loading manuals, class requirements, flag requirements,
     load-line requirements or vessel procedures.
========================================================= */


/* =========================================================
   ENGINE IDENTITY
========================================================= */

const StabilityResilienceEngineV1 = {

    version: "1.0.0",

    mode: "RESEARCH_SIMULATION",

    operationalConnection: false,

    autonomousCommand: false,

    humanAuthority: true,


    /* =====================================================
       MAIN ASSESSMENT
    ===================================================== */

    assess(condition = {}) {

        const vessel =
            condition.vessel || {};

        const environment =
            condition.environment || {};

        const stability =
            condition.stability || {};

        const compliance =
            condition.compliance || {};

        const emissions =
            condition.emissions || {};


        /* -----------------------------------------------
           VESSEL CONDITION
        ------------------------------------------------ */

        const displacement =
            this.number(vessel.displacement, 0);

        const draftForward =
            this.number(vessel.draftForward, 0);

        const draftAft =
            this.number(vessel.draftAft, 0);

        const draftMean =
            this.mean(
                draftForward,
                draftAft
            );


        const trim =
            draftAft - draftForward;


        /* -----------------------------------------------
           ATTITUDE
        ------------------------------------------------ */

        const heel =
            this.number(stability.heel, 0);

        const list =
            this.number(stability.list, 0);


        /*
         * Combined simulated transverse attitude.
         *
         * Heel and list remain separate variables.
         * This value is only an assessment indicator.
         */

        const combinedHeelList =
            Math.sqrt(
                (heel * heel) +
                (list * list)
            );


        /* -----------------------------------------------
           CENTRE OF GRAVITY
        ------------------------------------------------ */

        const KG =
            this.number(stability.KG, 0);

        const LCG =
            this.number(stability.LCG, 0);

        const TCG =
            this.number(stability.TCG, 0);


        /*
         * CG movement indicators.
         */

        const cgShiftMagnitude =
            Math.sqrt(
                (LCG * LCG) +
                (TCG * TCG) +
                (KG * KG)
            );


        /* -----------------------------------------------
           INITIAL STABILITY
        ------------------------------------------------ */

        const GM =
            this.number(stability.GM, 0);


        /* -----------------------------------------------
           GZ / RIGHTING MOMENT
        ------------------------------------------------ */

        const GZ =
            this.number(stability.GZ, 0);

        const rightingMoment =
            this.number(
                stability.rightingMoment,
                0
            );


        /*
         * IMPORTANT ENGINEERING PRINCIPLE:
         *
         * GM is treated as an initial-stability indicator.
         *
         * Recovery assessment also considers:
         *
         *     GZ
         *     righting moment
         *     heel/list
         *     dynamic stability
         *
         * The simulator therefore does NOT classify recovery
         * capability from GM alone.
         */


        /* -----------------------------------------------
           DYNAMIC STABILITY
        ------------------------------------------------ */

        const dynamicStabilityArea =
            this.number(
                stability.dynamicStabilityArea,
                0
            );

        const dynamicStabilityCriterion =
            this.number(
                stability.dynamicStabilityCriterion,
                0
            );


        let dynamicStabilityStatus =
            "NOT_ASSESSED";


        if (
            dynamicStabilityCriterion > 0 &&
            dynamicStabilityArea >=
                dynamicStabilityCriterion
        ) {

            dynamicStabilityStatus =
                "SIMULATED_ACCEPTABLE";

        }
        else if (
            dynamicStabilityCriterion > 0 &&
            dynamicStabilityArea <
                dynamicStabilityCriterion
        ) {

            dynamicStabilityStatus =
                "SIMULATED_BELOW_CRITERION";

        }


        /* -----------------------------------------------
           CONTROLLED SWING / RATE OF TURN
        ------------------------------------------------ */

        const rateOfTurn =
            this.number(
                stability.rateOfTurn,
                0
            );

        const controlledSwing =
            this.number(
                stability.controlledSwing,
                0
            );


        /*
         * Research indicator only.
         *
         * It is intentionally NOT a vessel-control command.
         */

        const swingLoadIndex =
            Math.abs(
                rateOfTurn *
                combinedHeelList
            );


        /* -----------------------------------------------
           DRAFT / LOAD-LINE CONSTRAINT
        ------------------------------------------------ */

        const permittedDraft =
            this.number(
                compliance.permittedDraft,
                0
            );


        let draftStatus =
            "NOT_ASSESSED";


        if (permittedDraft > 0) {

            if (draftMean <= permittedDraft) {

                draftStatus =
                    "WITHIN_SIMULATED_LIMIT";

            }
            else {

                draftStatus =
                    "SIMULATED_DRAFT_LIMIT_EXCEEDED";

            }

        }


        /* -----------------------------------------------
           ZONE / OPERATING PERMIT DRAFT
        ------------------------------------------------ */

        const zoneDraftLimit =
            this.number(
                compliance.zoneDraftLimit,
                0
            );


        let zoneDraftStatus =
            "NOT_ASSESSED";


        if (zoneDraftLimit > 0) {

            if (draftMean <= zoneDraftLimit) {

                zoneDraftStatus =
                    "WITHIN_SIMULATED_ZONE_LIMIT";

            }
            else {

                zoneDraftStatus =
                    "SIMULATED_ZONE_DRAFT_EXCEEDED";

            }

        }


        /* -----------------------------------------------
           BALLAST CONDITION
        ------------------------------------------------ */

        const ballastMass =
            this.number(
                stability.ballastMass,
                0
            );

        const ballastCG =
            this.number(
                stability.ballastCG,
                0
            );


        /* -----------------------------------------------
           BALLAST WATER COMPLIANCE
        ------------------------------------------------ */

        const ballastWaterCompliance =
            compliance.ballastWaterCompliance;


        let ballastWaterStatus =
            "NOT_ASSESSED";


        if (
            ballastWaterCompliance === true
        ) {

            ballastWaterStatus =
                "SIMULATED_COMPLIANT";

        }
        else if (
            ballastWaterCompliance === false
        ) {

            ballastWaterStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* -----------------------------------------------
           CARBON / EMISSIONS
        ------------------------------------------------ */

        const carbonEmission =
            this.number(
                emissions.carbonEmission,
                0
            );

        const carbonBaseline =
            this.number(
                emissions.carbonBaseline,
                0
            );


        let carbonStatus =
            "NOT_ASSESSED";


        if (carbonBaseline > 0) {

            if (
                carbonEmission <=
                carbonBaseline
            ) {

                carbonStatus =
                    "SIMULATED_WITHIN_BASELINE";

            }
            else {

                carbonStatus =
                    "SIMULATED_ABOVE_BASELINE";

            }

        }


        /* -----------------------------------------------
           RECOVERY ASSESSMENT
        ------------------------------------------------ */

        let recoveryStatus =
            "NOT_ASSESSED";


        if (
            rightingMoment > 0 &&
            GZ > 0
        ) {

            recoveryStatus =
                "POSITIVE_SIMULATED_RIGHTING_RESPONSE";

        }
        else if (
            rightingMoment <= 0 &&
            GZ <= 0
        ) {

            recoveryStatus =
                "SIMULATED_RECOVERY_CONCERN";

        }


        /* -----------------------------------------------
           OVERALL STABILITY INDICATOR
        ------------------------------------------------ */

        let stabilityStatus =
            "SIMULATED_STABLE";


        if (
            recoveryStatus ===
                "SIMULATED_RECOVERY_CONCERN" ||
            draftStatus ===
                "SIMULATED_DRAFT_LIMIT_EXCEEDED" ||
            zoneDraftStatus ===
                "SIMULATED_ZONE_DRAFT_EXCEEDED" ||
            dynamicStabilityStatus ===
                "SIMULATED_BELOW_CRITERION"
        ) {

            stabilityStatus =
                "SIMULATED_REVIEW_REQUIRED";

        }


        /* -----------------------------------------------
           HUMAN AUTHORITY
        ------------------------------------------------ */

        const executionGate =
            "HUMAN AUTHORIZATION REQUIRED";


        /* -----------------------------------------------
           RETURN TRACEABLE RESULT
        ------------------------------------------------ */

        return {

            engine:
                "StabilityResilienceEngineV1",

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


            vessel: {

                displacement,

                draftForward,

                draftAft,

                draftMean,

                trim

            },


            attitude: {

                heel,

                list,

                combinedHeelList

            },


            centreOfGravity: {

                KG,

                LCG,

                TCG,

                cgShiftMagnitude

            },


            initialStability: {

                GM

            },


            rightingBehaviour: {

                GZ,

                rightingMoment,

                recoveryStatus

            },


            dynamicStability: {

                area:
                    dynamicStabilityArea,

                criterion:
                    dynamicStabilityCriterion,

                status:
                    dynamicStabilityStatus

            },


            manoeuvring: {

                rateOfTurn,

                controlledSwing,

                swingLoadIndex

            },


            ballast: {

                ballastMass,

                ballastCG

            },


            draftCompliance: {

                permittedDraft,

                status:
                    draftStatus

            },


            zoneDraft: {

                zoneDraftLimit,

                status:
                    zoneDraftStatus

            },


            ballastWater: {

                status:
                    ballastWaterStatus

            },


            emissions: {

                carbonEmission,

                carbonBaseline,

                status:
                    carbonStatus

            },


            overall: {

                status:
                    stabilityStatus

            },


            execution: {

                gate:
                    executionGate,

                executed:
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

    },


    /* =====================================================
       MEAN
    ===================================================== */

    mean(a, b) {

        return (
            this.number(a) +
            this.number(b)
        ) / 2;

    }

};


/* =========================================================
   EXPORT / GLOBAL ACCESS
========================================================= */

if (
    typeof window !== "undefined"
) {

    window.StabilityResilienceEngineV1 =
        StabilityResilienceEngineV1;

}