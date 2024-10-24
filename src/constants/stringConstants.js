import LocalStorage from "../services/LocalStorage";

export const AadharBasicDetails = {
  firstButtonName: "Retry",
  lastButtonName: "Use this Photo",
  headerText: "Review Your Document",
  headerTextSecond: "Capture Adhaar",
  imageMethod: "Front",
  imageSide: "Front Side",
  imageSideSecond: "Back Side",
};

export const LOAN_DETAILS_KEYS = {
  reqLoanAmt: "ReqLoanAmt__c",
  reqTenure: "ReqTenInMonths__c",
  loanPurpose: "LoanPurpose__c",
  customerSegment:"Customer_Segment__c",  
  mobile: "MobNumber__c",
  isExistingCustomer: "ExistingCustomer__c",
  custId: "Customer__c",
  bankBalance: "Bankbalance__c",
  immovableProperty: 'ImmovablePropertyValue__c',
  currPF: "CurrentPfBalance__c",
  valShareSecr: "SharesAndSecurityBalance__c", 
  fd: "FixedDeposits__c",
  invPlantMachVehi: "InvestmentInPlants_Machinery_Vehicles__c",
  ownContri: "OwnContributions__c",
  assetVal: "OthersAssetsValue__c", 
  totalAsset: "TotalAssets__c", 
  amtConstructPurchase: "AmountSpentForConstruction_Purchase__c",
  savings: "Savings__c",
  dispAsset: "DisposalOfAsset__c",
  familyFund: "FundFromFamily__c",
  srvcFund: "FundFromOtherServices__c",
  totalIncome: "Annual_Turnover__c", 
  totalObligation: "totalObligation", // not done
  resAddr: "resAddr", 
  currAddr: "currAddr",
};

export const LOAN_DETAILS_KEYS_OTHER_RM = {
  reqLoanAmt: "ReqLoanAmt__c",
  reqTenure: "ReqTenInMonths__c",
  loanPurpose: "LoanPurpose__c",  
  mobile: "MobNumber__c",
  isExistingCustomer: "ExistingCustomer__c",
  RM__c: 'RM__c',
  Product__c: 'Product__c'

};

export const KycScreen = {
  topLabel: "Let's verify your identity quickly",
  recommended: 'Recommended',
  eCardTitle: "Generate E-Aadhaar",
  eCardSubTitle: "You will receive an OTP on your\nAadhaar\nlinked mobile number",
  or: "OR",
  frontCardTitle: "Upload Your\nAadhaar Front\nPhoto",
  backCardTitle: "Upload Your\nAadhaar Back\nPhoto",
  aadharLabel: "Aadhaar Number",
  captchaLabel: 'Enter Captcha',
  otpTitle: 'OTP Verification',
  otpSubTitle: 'One-Time Password has been sent to\nyour registered Mobile Number.',
  resend: "Resend",

}


export const HeaderTexts = {
  FAQ: "Frequently Asked Questions",
  loanDetails: "Loan Details",
};

export const CaptureAddressConstants = {
  DL: 'Driving License',
  PASSPORT: 'Passport',
  VOTERID: 'Voter ID',
  NREGACard: 'NREGA Card',
  EBILL: 'Electricity Bill',
  GBILL: 'Gas Bill',
  MBILL: 'Mobile Bill'
}

export const brandDetails = {
  name: 'UNICO HOUSING FINANCE LIMITED'
}

export const Mobile = LocalStorage?.getUserData()?.Phone
export const EMAIL_CC = LocalStorage?.getUserData()?.Email