export const soupConfig = {
  leadPicklist: {
    name: "Lead",
    path: "Applicant_Mob_No__c",
  },
  pincodeList: {
    name: "Pincode",
    path: "Id",
  },
  LoanApplicantFields: {
    name: "LoanAppl__c",
    path: "Applicant_Mob_No__c"
  },
  ApplicantFields: {
    name: "Applicant__c",
    path: "FName__c"
  },
  applicationList: {
    name: "LoanApplication",
    path: "loanId",
    externalId: "External_ID",
    default: {
      loanId: null,
      pincodeDetails: null, // get from homescreen
      applicationDetails: null, // Form Data
      panDetails: null,
      adhaarDetails: null,
      selfieDetails: null,
      otherDetails: null,
      loanDetails: null,
      eligibilityDetails: null,
      sanctionDetails: null,
      currentAddressDetails: null,
      Applicant__c: null,
      Lead__c: null,
      Id: null
    }
  },
};
