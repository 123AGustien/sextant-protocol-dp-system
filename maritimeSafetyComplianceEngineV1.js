/* =================================================
   P&I / MARINE INSURANCE DOCUMENTATION
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