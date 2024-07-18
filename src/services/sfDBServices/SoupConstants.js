export const soupConfig = {
  leadPicklist: {
    name: "Lead",
    path: "name",
  },
  pincodeList: {
    name: "Pincode",
    path: "Id",
  },
  applicationList: {
    name: "LoanApplication",
    path: "loanId",
    default: {
      loanId : null,
      pincodeDetails: null, // get from homescreen
      applicationDetails: null, // Form Data
      panDetails: null,
      adhaarDetails: null,
      selfieDetails: null,
      otherDetails: null,
      loanDetails: null,
      eligibilityDetails: null,
      sanctionDetails: null,
      currentAddressDetails: null
    }
  },
};
