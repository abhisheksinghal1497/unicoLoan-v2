import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { errorConsoleLog, log } from "./ConsoleLogUtils";
import { fetch } from "@react-native-community/netinfo";
import uuid from "react-native-uuid";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { net } from "react-native-force";
import { LOAN_DETAILS_KEYS } from "../constants/stringConstants";

export const alert = (title, subTitle, onPressOK, onPressCancel) => {
  if (onPressCancel) {
    Alert.alert(
      title,
      subTitle,
      [
        {
          text: "Cancel",
          onPress: () => onPressCancel(),
          style: "cancel",
        },
        { text: "OK", onPress: () => onPressOK() },
      ],
      { cancelable: false }
    );
  } else {
    Alert.alert(title, subTitle, [{ text: "OK", onPress: () => onPressOK() }], {
      cancelable: false,
    });
  }
};

export const toast = (type, title, subTitle) => {
  Toast.show({
    type: type,
    text1: title,
    text2: subTitle,
  });
};

export const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    if (!timer) {
      func.apply(this, args);
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
    }, timeout);
  };
}

export function validateOtp(otp) {
  try {
    let regex = new RegExp(/[6-9]\d{6}/, "i");
    return regex.test(otp);
  } catch (error) {
    return true;
  }
}

export const convertFormArrToObj = (data = []) => {
  const obj = data.reduce(
    (prev, cur) => ({ ...prev, [cur.name]: { ...cur } }),
    {}
  );
  return obj;
};

export const GetPicklistValues = (arr, fieldName, defaultValues) => {
  try {
    if (!arr || !fieldName) {
      return {};
    }
    const data = arr?.find((value) => value.name === fieldName)?.picklistValues;

    return data && data?.length > 0 ? data : defaultValues;
  } catch (error) {
    return defaultValues;
  }
};

export const getConsentTime = () => {
  let timestamp = new Date().getTime();
  try {
    timestamp = Math.floor(timestamp / 1000);
  } catch (error) {
    console.error(error);
  } finally {
    return timestamp?.toString();
  }
};

export const getIpAddress = async () => {
  let ipAddress = "192.0.3.146"; // hardcoded for safer side

  try {
    const currentIpAddress = await fetch();
    log("currentIpAddress", currentIpAddress?.details?.ipAddress);
    if (currentIpAddress && currentIpAddress?.details?.ipAddress) {
      ipAddress = currentIpAddress?.details?.ipAddress;
    }
  } catch (error) {
    errorConsoleLog("IP ADDRESS", error);
  } finally {
    return ipAddress;
  }
};

export const getUniqueId = () => uuid?.v4();

export const useResetRoutes = () => {
  const navigation = useNavigation();
  const resetRoute = (screenName, params = {}) => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName, params }],
      })
    );
  };
  return resetRoute;
};

export const createLoanAndAppplicantCompositeRequest = (data, leadID) => {
  try {
    let compositeRequest = [
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/LoanAppl__c`,
        referenceId: "loanCreate",
        body: getLoanCreateRequest(data, leadID),
      },

      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/Applicant__c`,
        referenceId: "applicantCreate",
        body: {
          ...getApplicantRequest(data),
          LoanAppln__c: "@{loanCreate.id}",
        },
      },
    ];

    return compositeRequest;
  } catch (error) {
    log("createLeadCompositeRequest>>>error", error);
    return null;
  }
};

export const getLeadCreationRequest = (data) => {
  try {
    return {
      FirstName: data?.FirstName,
      MiddleName: data?.MiddleName,
      LastName: data?.LName__c,
      MobilePhone: data?.MobNumber__c,
      Email: data?.EmailId__c,
      Bulk_Lead__c: false,
      Status: "New Lead",
      Alternative_Mobile_Number__c: data?.AltMobile__c,
      Customer_Profile__c: data?.Customer_Profile__c,
      LeadSource: data?.LeadSource__c,
      Residential_Address__c: data?.Address__c,
      PostalCode: "",
      Pincode__c: data?.Pincode__c,
      Product__c: data?.Product__c,
      ProductLookup__c: "",
      Bank_Branch__c: data?.Bank_Branch_Name,
      Requested_loan_amount__c: data?.ReqLoanAmt__c,
      Requested_tenure_in_Months__c: data?.ReqTenInMonths__c,
      Property_Identified__c: data?.PropertyIdentified__c,
      Company: data?.LName__c,
    };
  } catch (error) {
    return null;
  }
};

export const getLoanCreateRequest = (data, leadId) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      LeadSource__c: data?.LeadSource__c,
      Bank_Branch_Name__c: data?.Bank_Branch_Name,

      Customer_Profile__c: data?.Customer_Profile__c,
      Product__c: data?.Product__c,
      ReqTenInMonths__c: data?.ReqTenInMonths__c,
      ReqLoanAmt__c: data?.ReqLoanAmt__c,
      PropertyIdentified__c: data?.PropertyIdentified__c
        ? data.PropertyIdentified__c === "Yes"
          ? 1
          : 0
        : undefined,
      Lead__c: leadId,
    };
  } catch (error) {
    return null;
  }
};

export const getApplicantRequest = (data) => {
  try {
    return {
      FName__c: data?.FirstName,
      MName__c: data?.MiddleName,
      LName__c: data?.LName__c,
      MobNumber__c: data?.MobNumber__c,
      AltMobile__c: data?.AltMobile__c,
      EmailId__c: data?.EmailId__c,
      Present_Accomodation__c: data?.Present_Accomodation__c,
      Period_of_stay_year__c: getPeriodValues(data?.Period_of_stay__c, 0),
      Period_of_stay_month__c: getPeriodValues(data?.Period_of_stay__c, 1),
      If_rented_rent_per_month__c: data?.If_rented_rent_per_month__c,
      Employment_experience_month__c: getPeriodValues(
        data?.Employment_experience__c,
        1
      ),
      Employment_experience_year__c: getPeriodValues(
        data?.Employment_experience__c,
        0
      ),
      Total_Work_Experience_year__c: getPeriodValues(
        data?.Total_Work_Experience__c,
        0
      ),
      Total_Work_Experience_month__c: getPeriodValues(
        data?.Total_Work_Experience__c,
        1
      ),
      Number_of_Family_Dependants__c: data?.Number_of_Family_Dependants__c,
      No_of_Family_Dependants_Children__c:
        data?.No_of_Family_Dependants_Children__c,
      No_of_Family_Dependants_Other__c: data?.No_of_Family_Dependants_Other__c,
      Total_Business_Experience_year__c: getPeriodValues(
        data?.Total_Business_Experience__c,
        0
      ),
      Total_Business_Experience_month__c: getPeriodValues(
        data?.Total_Business_Experience__c,
        1
      ),
      Address__c: data?.Address__c,
      Pincode__c: data?.Pincode__c,
    };
  } catch (error) {
    return null;
  }
};

export const getPeriodValues = (str, index) => {
  try {
    if (str) {
      if (index === 0) {
        return str.substring(0, 2);
      } else {
        return str.substring(2, 4);
      }
    }
  } catch (error) {}
  return null;
};

export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

// Example usage

export const createCompositeRequestForPanAadhar = (loanData, aadharData) => {
  try {
    let compositeRequest = [
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c`,
        referenceId: "pan",
        body: getPanCreateRequest(loanData),
      },

      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c`,
        referenceId: "aadhar",
        body: getAadharCreateRequest(loanData, aadharData),
      },
    ];

    return compositeRequest;
  } catch (error) {
    log("createCompositeRequestForPanAadhar>>>error", error);
    return null;
  }
};

const getDocDetailBody = (data, applicationKycId, type) => {
  if (type === "PAN") {
    return {
      Doc_Sub_Name__c: "Pan",
      DcmtSubName__c: "Pan",
      Appl__c: data?.Applicant__c,
      DocCatgry__c: "PAN Documents",
      DocSubTyp__c: "PAN",
      DocTyp__c: "PAN",
      LAN__c: data?.loanId,
      Case__c: "",
      DocStatus__c: "New",
      FileAvalbl__c: false,
      Applicant_KYC__c: applicationKycId,
    };
  }

  if (type === "Aadhaar") {
    return {
      Doc_Sub_Name__c: "Aadhaar",
      DcmtSubName__c: "Aadhaar",
      Appl__c: data?.Applicant__c,
      DocCatgry__c: "KYC Documents",
      DocSubTyp__c: "Aadhaar",
      DocTyp__c: "Proof Of Identity",
      LAN__c: data?.loanId,
      Case__c: "",
      DocStatus__c: "New",
      FileAvalbl__c: false,
      Applicant_KYC__c: applicationKycId,
    };
  }

  return null;
};

const getPanUploadBody = (data) => {
  return {
    VersionData: data?.panDetails?.imageBase64,
    Title: "PAN",
    PathOnClient: "PAN" + ".jpeg",
  };
};

const getAdhaarUploadBody = (imageBase64) => {
  return {
    VersionData: imageBase64,
    Title: "Aadhaar",
    PathOnClient: "Aadhaar" + ".jpeg",
  };
};

const getContentDocumentBody = (docId, contentDocumentId) => {
  return {
    LinkedEntityId: docId,
    ContentDocumentId: contentDocumentId,
    ShareType: "V",
  };
};

const panKycUpdateBody = (docId) => {
  return {
    Document_Detail__c: docId,
    OCRStatus__c: "Success",
  };
};

const getCompositeRequest = (query, referenceId) => {
  return {
    method: "GET",
    url: `/services/data/${net.getApiVersion()}/query/?q=${query}`,
    referenceId,
  };
};

const postCompositeRequest = (objectName, body, referenceId) => {
  return {
    method: "POST",
    url: `/services/data/${net.getApiVersion()}/sobjects/${objectName}`,
    referenceId,
    body,
  };
};

const patchCompositeRequest = (objectName, objectId, body, referenceId) => {
  return {
    method: "PATCH",
    url: `/services/data/${net.getApiVersion()}/sobjects/${objectName}/${objectId}`,
    referenceId,
    body,
  };
};

const getLoanDetailPatchBody = (loanData) => ({
  [LOAN_DETAILS_KEYS.reqLoanAmt]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.reqLoanAmt],
  [LOAN_DETAILS_KEYS.reqTenure]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.reqTenure],
  // [LOAN_DETAILS_KEYS.loanPurpose]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.loanPurpose],
});

const getApplicantPatchBody = (loanData) => ({
  // [LOAN_DETAILS_KEYS.mobile]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.mobile],
  [LOAN_DETAILS_KEYS.isExistingCustomer]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.isExistingCustomer],
  [LOAN_DETAILS_KEYS.custId]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.custId],
});

const getLoanDetailPostBody = (loanData) => ({
  [LOAN_DETAILS_KEYS.bankBalance]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.bankBalance],
  [LOAN_DETAILS_KEYS.immovableProperty]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.immovableProperty],
  [LOAN_DETAILS_KEYS.currPF]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.currPF],
  // [LOAN_DETAILS_KEYS.valShareSecr]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.valShareSecr],
  [LOAN_DETAILS_KEYS.fd]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.fd],
  [LOAN_DETAILS_KEYS.invPlantMachVehi]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.invPlantMachVehi],
  [LOAN_DETAILS_KEYS.ownContri]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.ownContri],
  [LOAN_DETAILS_KEYS.assetVal]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.assetVal],
  [LOAN_DETAILS_KEYS.totalAsset]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.totalAsset],
  [LOAN_DETAILS_KEYS.amtConstructPurchase]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.amtConstructPurchase],
  [LOAN_DETAILS_KEYS.savings]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.savings],
  [LOAN_DETAILS_KEYS.dispAsset]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.dispAsset],
  [LOAN_DETAILS_KEYS.familyFund]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.familyFund],
  [LOAN_DETAILS_KEYS.srvcFund]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.srvcFund],
  // [LOAN_DETAILS_KEYS.totalIncome]: loanData?.loanDetails?.[LOAN_DETAILS_KEYS.totalIncome],
  Appl__c: loanData?.Applicant__c
});


export const createCompositeRequestForLoadDetails = (loanData) => {
  const compositeRequests = [
    patchCompositeRequest("LoanAppl__c", loanData?.loanId, getLoanDetailPatchBody(loanData), "patchLoanApplication"),
    patchCompositeRequest("Applicant__c", loanData?.Applicant__c, getApplicantPatchBody(loanData), "patchApplicant"),
    postCompositeRequest("ApplAsset__c", getLoanDetailPostBody(loanData), "postLoanDetail"),
  ];

  return compositeRequests;
};

export const createCompositeRequestsForPanUpload = (data, applicationKycId) => {
  try {
    const compositeRequests = [
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20id%2C%20Catgry__c%2C%20DocSubTyp__c%2C%20DocTyp__c%20FROM%20DocMstr__c%20WHERE%20DocTyp__c%3D%27PAN%27%20LIMIT%201`,
        referenceId: "docQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/DocDtl__c`,
        referenceId: "docDetailPost",
        body: {
          ...getDocDetailBody(data, applicationKycId, "PAN"),
          DocMstr__c: "@{docQuery.records[0].Id}",
        },
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentVersion`,
        referenceId: "contentVersionPost",
        body: getPanUploadBody(data),
      },
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20Id%2C%20Title%2C%20ContentDocumentId%20FROM%20ContentVersion%20WHERE%20Id%3D%27@{contentVersionPost.id}%27`,
        referenceId: "contentDocumentQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentDocumentLink`,
        referenceId: "ContentDocumentLink",
        body: getContentDocumentBody(
          "@{docDetailPost.id}",
          "@{contentDocumentQuery.records[0].ContentDocumentId}"
        ),
      },
      {
        method: "PATCH",
        url: `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c/${applicationKycId}`,
        referenceId: "ApplKycPatch",
        body: panKycUpdateBody("@{docDetailPost.id}"),
      },
    ];

    return compositeRequests;
  } catch (error) {
    return null;
  }
};

export const createCompositeRequestsForAdhaarUpload = (
  data,
  applicationKycId,
  imageBase64
) => {
  try {
    const compositeRequests = [
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20id%2C%20Catgry__c%2C%20DocSubTyp__c%2C%20DocTyp__c%20FROM%20DocMstr__c%20WHERE%20DocTyp__c%20%3D%20%27Proof%20Of%20Identity%27%20AND%20DocSubTyp__c%20%3D%20%27Aadhaar%27`,
        referenceId: "docQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/DocDtl__c`,
        referenceId: "docDetailPost",
        body: {
          ...getDocDetailBody(data, applicationKycId, "Aadhaar"),
          DocMstr__c: "@{docQuery.records[0].Id}",
        },
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentVersion`,
        referenceId: "contentVersionPost",
        body: getAdhaarUploadBody(imageBase64),
      },
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20Id%2C%20Title%2C%20ContentDocumentId%20FROM%20ContentVersion%20WHERE%20Id%3D%27@{contentVersionPost.id}%27`,
        referenceId: "contentDocumentQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentDocumentLink`,
        referenceId: "ContentDocumentLink",
        body: getContentDocumentBody(
          "@{docDetailPost.id}",
          "@{contentDocumentQuery.records[0].ContentDocumentId}"
        ),
      },
      {
        method: "PATCH",
        url: `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c/${applicationKycId}`,
        referenceId: "ApplKycPatch",
        body: panKycUpdateBody("@{docDetailPost.id}"),
      },
    ];

    return compositeRequests;
  } catch (error) {
    return null;
  }
};

export const getPanCreateRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      Applicant__c: data?.Applicant__c,
      Pan__c: data?.panDetails?.panNumber,
      NameInPan__c: data?.panDetails.panName,
      kycDoc__c: "Pan",
      // LoanNo__c: data
    };
  } catch (error) {
    return null;
  }
};

export const getAadharCreateRequest = (data, aadharData) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      OCRStatus__c: "Success",
      Applicant__c: data?.Applicant__c,
      kycDoc__c: "Aadhaar",
      // Aadhar_Reference_Number__c: "",
      // Encrypted_Aadhar_OCR__c: "",
      // Karza_Aadhar_OCR_AccessKey__c: aadharData?.accessKey,
      // Karza_Aadhar_OCR_CaseId__c: aadharData?.caseId,
      // AdharEncrypt__c: aadharData?.encryptedAadhar,
      NameInAdhr__c: data?.adhaarDetails?.name,
      DtOfBirth__c: data?.adhaarDetails?.dob,
      Gender__c: data?.adhaarDetails?.gender,
      FatherName__c: data?.adhaarDetails?.fatherName,
      HouseNo__c: data?.adhaarDetails?.address?.splitAddress?.houseNumber,
      Street__c: data?.adhaarDetails?.address?.splitAddress?.street,
      Landmark__c: data?.adhaarDetails?.address?.splitAddress?.landmark,
      District__c: data?.adhaarDetails?.address?.splitAddress?.district,
      Locality__c: data?.adhaarDetails?.address?.splitAddress?.location,
      State__c: data?.adhaarDetails?.address?.splitAddress?.state,
      Country__c: data?.adhaarDetails?.address?.splitAddress?.country,
      Pincode__c: data?.adhaarDetails?.address?.splitAddress?.pincode,
      AdhrAdd__c:
        data?.adhaarDetails?.address?.combinedAddress?.toString()?.length <= 255
          ? data?.adhaarDetails?.address?.combinedAddress
          : undefined, // in SF address take max length upto 255
    };
  } catch (error) {
    return null;
  }
};

export const createCurrentAddressIsSameAsPermanentRequest = (data) => {
  try {
    return {
      Sm_as_Per_Adr__c: 1,
      AddrTyp__c: "Current Address",
      HouseNo__c: data?.adhaarDetails?.address?.splitAddress?.houseNumber,
      Landmark__c: data?.adhaarDetails?.address?.splitAddress?.landmark,
      District__c: data?.adhaarDetails?.address?.splitAddress?.district,
      Locality__c: data?.adhaarDetails?.address?.splitAddress?.location,
      State__c: data?.adhaarDetails?.address?.splitAddress?.state,
      Country__c: data?.adhaarDetails?.address?.splitAddress?.country,
      Pincode__c: data?.adhaarDetails?.address?.splitAddress?.pincode,
      Applicant__c: data?.Applicant__c,
    };
  } catch (error) {
    return null;
  }
};
