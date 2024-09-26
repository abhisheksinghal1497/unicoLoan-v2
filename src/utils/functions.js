import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { errorConsoleLog, log } from "./ConsoleLogUtils";
import { fetch } from "@react-native-community/netinfo";
import uuid from "react-native-uuid";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { net } from "react-native-force";
import {
  CaptureAddressConstants,
  LOAN_DETAILS_KEYS,
} from "../constants/stringConstants";
import { query } from "../constants/Queries";
import { soupConfig } from "../services/sfDBServices/SoupConstants";

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
    console.log("CHECK ! HERE", { fieldName });
    if (!arr || !fieldName) {
      return {};
    }
    console.log(
      "CHECK 2 HERE",
      arr?.find((value) => value.name === fieldName)
    );
    const data = arr?.find((value) => value.name === fieldName)?.picklistValues;
    console.log("DATA here", data);
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
      {
        ...getCompositeRequest(
          query.getLoanDetailById("@{loanCreate.id}"),
          "getLoanAppl__c"
        ),
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
      SubStage__c: "RM Data Entry",
      Stage__c: "QDE",
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
      // Consent_Status__c: "Verified"
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

function parseFullName(fullName) {
  // Split the full name by spaces
  const nameParts = fullName?.trim()?.split(" ");

  // Initialize the result object
  let result = {
    FName__c: "",
    MName__c: "",
    LName__c: "",
  };

  // Assign names based on the number of parts
  if (nameParts?.length === 1) {
    result.FName__c = nameParts[0];
  } else if (nameParts?.length === 2) {
    result.FName__c = nameParts[0];
    result.LName__c = nameParts[1];
  } else if (nameParts?.length >= 3) {
    result.FName__c = nameParts[0];
    result.MName__c = nameParts.slice(1, -1).join(" "); // Join all middle names
    result.LName__c = nameParts[nameParts.length - 1];
  }

  return result;
}

const updateNameInLoanBody = (aadharData) => ({
  Father_Name__c: aadharData?.fatherName,
  ...parseFullName(aadharData?.name),
});

export const createCompositeRequestForPanAadhar = (
  loanData,
  aadharData,
  isPanAadharLinked,
  score
) => {
  console.log("aadharData", aadharData);
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
        body: isPanAadharLinked
          ? {
              ...getAadharCreateRequest(loanData, aadharData),
              IsPanAdrLnk__c: "true",
              ValidationStatus__c: "Success",
            }
          : {
              ...getAadharCreateRequest(loanData, aadharData),
              IsPanAdrLnk__c: "false",
              ValidationStatus__c: "Success",
              KARZA_Name_Match_Score__c: score,
              Name_Match_Status__c: "Name Match successful!!",
            },
      },
      // Update Loan application First name, middlename , last name and Father name - LoanAppl__c and Applicant__c
      // {
      //   ...patchCompositeRequest(
      //     "Applicant__c",
      //     loanData?.Applicant__c,
      //     updateNameInLoanBody(loanDetails?.adhaarDetails),
      //     "Applicant__cPatch"
      //   ),
      // },

      {
        method: "PATCH",
        url: `/services/data/${net.getApiVersion()}/sobjects/Applicant__c/${
          loanData.Applicant__c
        }`,
        referenceId: "applicantUpdateId",
        body: {
          ...updateAadharDataToApplicant(loanData),
          ...updateNameInLoanBody(loanData?.adhaarDetails),
          Pan__c: loanData?.panDetails?.panNumber,
        },
      },
    ];

    return compositeRequest;
  } catch (error) {
    log("createCompositeRequestForPanAadhar>>>error", error);
    return null;
  }
};

const getDocDetailBody = (data, applicationKycId, type) => {
  const docType = getDocType(type);
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

  if (type === "AadhaarPOA") {
    return {
      Doc_Sub_Name__c: "Aadhaar",
      DcmtSubName__c: "Aadhaar",
      Appl__c: data?.Applicant__c,
      DocCatgry__c: "KYC Documents",
      DocSubTyp__c: "Aadhaar",
      DocTyp__c: "Proof Of Address",
      LAN__c: data?.loanId,
      Case__c: "",
      DocStatus__c: "New",
      FileAvalbl__c: false,
      Applicant_KYC__c: applicationKycId,
    };
  }

  if (type === "Selfie") {
    return {
      Doc_Sub_Name__c: "Selfie",
      DcmtSubName__c: "Selfie",
      Appl__c: data?.Applicant__c,
      DocCatgry__c: "KYC Documents",
      DocSubTyp__c: "Applicant Photo",
      DocTyp__c: "Photograph",
      LAN__c: data?.loanId,
      Case__c: "",
      DocStatus__c: "New",
      FileAvalbl__c: false,
      Applicant_KYC__c: applicationKycId,
    };
  }

  if (
    type === CaptureAddressConstants.DL ||
    type === CaptureAddressConstants.PASSPORT ||
    type === CaptureAddressConstants.VOTERID ||
    type === CaptureAddressConstants.NREGACard ||
    type === CaptureAddressConstants.EBILL ||
    type === CaptureAddressConstants.GBILL ||
    type === CaptureAddressConstants.MBILL
  ) {
    return {
      Doc_Sub_Name__c: docType.docType,
      DcmtSubName__c: docType.docType,
      Appl__c: data?.Applicant__c,
      DocCatgry__c: "KYC Documents",
      DocSubTyp__c: docType.docSubType,
      DocTyp__c: docType.docType,
      LAN__c: data?.loanId,
      Case__c: "",
      DocStatus__c: "New",
      FileAvalbl__c: false,
      Applicant_KYC__c: applicationKycId,
    };
  }

  // if (type === CaptureAddressConstants.NREGACard) {
  //   return {
  //     Doc_Sub_Name__c: "nrega",
  //     DcmtSubName__c: "nrega",
  //     Appl__c: data?.Applicant__c,
  //     DocCatgry__c: "KYC Documents",
  //     DocSubTyp__c: "Nrega Card",
  //     DocTyp__c: "Proof Of Address",
  //     LAN__c: data?.loanId,
  //     Case__c: "",
  //     DocStatus__c: "New",
  //     FileAvalbl__c: false,
  //     Applicant_KYC__c: applicationKycId,
  //   };
  // }

  // if (type === CaptureAddressConstants.EBILL) {
  //   return {
  //     Doc_Sub_Name__c: "Electricity",
  //     DcmtSubName__c: "Electricity",
  //     Appl__c: data?.Applicant__c,
  //     DocCatgry__c: "KYC Documents",
  //     DocSubTyp__c: "Electricity Bill",
  //     DocTyp__c: "Proof Of Address (Temporary)",
  //     LAN__c: data?.loanId,
  //     Case__c: "",
  //     DocStatus__c: "New",
  //     FileAvalbl__c: false,
  //     Applicant_KYC__c: applicationKycId,
  //   };
  // }

  // if (type === CaptureAddressConstants.GBILL) {
  //   return {
  //     Doc_Sub_Name__c: "Gas",
  //     DcmtSubName__c: "Gas",
  //     Appl__c: data?.Applicant__c,
  //     DocCatgry__c: "KYC Documents",
  //     DocSubTyp__c: "Gas Bill",
  //     DocTyp__c: "Proof Of Address (Temporary)",
  //     LAN__c: data?.loanId,
  //     Case__c: "",
  //     DocStatus__c: "New",
  //     FileAvalbl__c: false,
  //     Applicant_KYC__c: applicationKycId,
  //   };
  // }

  // if (type === CaptureAddressConstants.MBILL) {
  //   return {
  //     Doc_Sub_Name__c: "Mobile",
  //     DcmtSubName__c: "Mobile",
  //     Appl__c: data?.Applicant__c,
  //     DocCatgry__c: "KYC Documents",
  //     DocSubTyp__c: "Mobile Bill",
  //     DocTyp__c: "Proof Of Address (Temporary)",
  //     LAN__c: data?.loanId,
  //     Case__c: "",
  //     DocStatus__c: "New",
  //     FileAvalbl__c: false,
  //     Applicant_KYC__c: applicationKycId,
  //   };
  // }

  return null;
};

const getSelfieUploadBody = (data) => {
  return {
    VersionData: data?.selfieDetails?.data,
    Title: "Selfie",
    PathOnClient: "Selfie" + ".jpeg",
  };
};

const getPanUploadBody = (data) => {
  return {
    VersionData: data?.panDetails?.imageBase64,
    Title: "PAN",
    PathOnClient: "PAN" + ".jpeg",
  };
};

const getAdhaarUploadBody = (imageBase64, title = "Aadhaar") => {
  return {
    VersionData: imageBase64,
    Title: title,
    PathOnClient: title + ".jpeg",
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
    validated__c: 1,
  };
};

const getCompositeRequest = (query, referenceId) => {
  return {
    method: "GET",
    url: `/services/data/${net.getApiVersion()}/query/?q=${query}`,
    referenceId,
  };
};

const describeCompositeRequest = (objectName, referenceId) => {
  return {
    method: "GET",
    url: `/services/data/${net.getApiVersion()}/sobjects/${objectName}/describe`,
    referenceId: referenceId,
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

const getLoanDetailPatchBody = (loanData) => {
  try {
    return {
      [LOAN_DETAILS_KEYS.reqLoanAmt]: loanData?.[LOAN_DETAILS_KEYS.reqLoanAmt],
      [LOAN_DETAILS_KEYS.reqTenure]: loanData?.[LOAN_DETAILS_KEYS.reqTenure],
      [LOAN_DETAILS_KEYS.loanPurpose]:
        loanData?.[LOAN_DETAILS_KEYS.loanPurpose],
     
    };
  } catch (error) {
    console.log("getLoanDetailPatchBody", error);
    return null;
  }
};

const getApplicantPatchBody = (loanData) => {
  try {
    console.log("HERE-----------", {
      [LOAN_DETAILS_KEYS.custId]: loanData?.[LOAN_DETAILS_KEYS.custId],
    });
    return {
      [LOAN_DETAILS_KEYS.totalIncome]:
        loanData?.[LOAN_DETAILS_KEYS.totalIncome],
      [LOAN_DETAILS_KEYS.isExistingCustomer]:
        loanData?.[LOAN_DETAILS_KEYS.isExistingCustomer],
      [LOAN_DETAILS_KEYS.custId]: loanData?.[LOAN_DETAILS_KEYS.custId],
    };
  } catch (error) {
    console.log("getApplicantPatchBody", error);
    return null;
  }
};

const getLoanDetailPostBody = (loanData, Applicant__c) => {
  try {
    return {
      [LOAN_DETAILS_KEYS.bankBalance]:
        loanData?.[LOAN_DETAILS_KEYS.bankBalance],
      [LOAN_DETAILS_KEYS.immovableProperty]:
        loanData?.[LOAN_DETAILS_KEYS.immovableProperty],
      [LOAN_DETAILS_KEYS.invPlantMachVehi]:
        loanData?.[LOAN_DETAILS_KEYS.invPlantMachVehi],
      [LOAN_DETAILS_KEYS.ownContri]: loanData?.[LOAN_DETAILS_KEYS.ownContri],
      [LOAN_DETAILS_KEYS.assetVal]: loanData?.[LOAN_DETAILS_KEYS.assetVal],
      [LOAN_DETAILS_KEYS.totalAsset]: loanData?.[LOAN_DETAILS_KEYS.totalAsset],
      [LOAN_DETAILS_KEYS.amtConstructPurchase]:
        loanData?.[LOAN_DETAILS_KEYS.amtConstructPurchase],
      [LOAN_DETAILS_KEYS.savings]: loanData?.[LOAN_DETAILS_KEYS.savings],
      [LOAN_DETAILS_KEYS.dispAsset]: loanData?.[LOAN_DETAILS_KEYS.dispAsset],
      [LOAN_DETAILS_KEYS.familyFund]: loanData?.[LOAN_DETAILS_KEYS.familyFund],
      [LOAN_DETAILS_KEYS.srvcFund]: loanData?.[LOAN_DETAILS_KEYS.srvcFund],
      [LOAN_DETAILS_KEYS.valShareSecr]:
        loanData?.[LOAN_DETAILS_KEYS.valShareSecr],
      [LOAN_DETAILS_KEYS.fd]: loanData?.[LOAN_DETAILS_KEYS.fd],
      [LOAN_DETAILS_KEYS.currPF]: loanData?.[LOAN_DETAILS_KEYS.currPF],
      Appl__c: Applicant__c,
    };
  } catch (error) {}
};

export const createCompositeRequestForLoadDetails = (
  formData,
  loanDetails,
  loanId,
  Applicant__c
) => {
  try {
    const compositeRequests = [
      patchCompositeRequest(
        "LoanAppl__c",
        loanId,
        getLoanDetailPatchBody(formData),
        "patchLoanApplication"
      ),
      patchCompositeRequest(
        "Applicant__c",
        Applicant__c,
        getApplicantPatchBody(formData),
        "patchApplicant"
      ),
    ];

    if (loanDetails?.Id) {
      compositeRequests.push(
        patchCompositeRequest(
          "ApplAsset__c",
          loanDetails?.Id,
          getLoanDetailPostBody(formData),
          "patchApplAsset__c"
        )
      );
    } else {
      compositeRequests.push(
        postCompositeRequest(
          "ApplAsset__c",
          getLoanDetailPostBody(formData, Applicant__c),
          "postLoanDetail"
        )
      );
    }

    return compositeRequests;
  } catch (error) {
    console.log("Some error occured");
    return null;
  }
};

export const createCompositeRequestsForSelfieUpload = (
  data,
  applicationKycId
) => {
  try {
    const compositeRequests = [
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20id%2C%20Catgry__c%2C%20DocSubTyp__c%2C%20DocTyp__c%20FROM%20DocMstr__c%20WHERE%20DocTyp__c%3D%27Photograph%27%20LIMIT%201`,
        referenceId: "docQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/DocDtl__c`,
        referenceId: "docDetailPost",
        body: {
          ...getDocDetailBody(data, applicationKycId, "Selfie"),
          DocMstr__c: "@{docQuery.records[0].Id}",
        },
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentVersion`,
        referenceId: "contentVersionPost",
        body: getSelfieUploadBody(data),
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

      //// for POA file upload

      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20id%2C%20Catgry__c%2C%20DocSubTyp__c%2C%20DocTyp__c%20FROM%20DocMstr__c%20WHERE%20DocTyp__c%20%3D%20%27Proof%20Of%20Address%27%20AND%20DocSubTyp__c%20%3D%20%27Aadhaar%27`,
        referenceId: "poadocQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/DocDtl__c`,
        referenceId: "poadocDetailPost",
        body: {
          ...getDocDetailBody(data, applicationKycId, "AadhaarPOA"),
          DocMstr__c: "@{poadocQuery.records[0].Id}",
        },
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentVersion`,
        referenceId: "poacontentVersionPost",
        body: getAdhaarUploadBody(imageBase64),
      },
      {
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=SELECT%20Id%2C%20Title%2C%20ContentDocumentId%20FROM%20ContentVersion%20WHERE%20Id%3D%27@{poacontentVersionPost.id}%27`,
        referenceId: "poacontentDocumentQuery",
      },
      {
        method: "POST",
        url: `/services/data/${net.getApiVersion()}/sobjects/ContentDocumentLink`,
        referenceId: "poaContentDocumentLink",
        body: getContentDocumentBody(
          "@{poadocDetailPost.id}",
          "@{poacontentDocumentQuery.records[0].ContentDocumentId}"
        ),
      },
      {
        method: "PATCH",
        url: `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c/${applicationKycId}`,
        referenceId: "poaApplKycPatch",
        body: panKycUpdateBody("@{poadocDetailPost.id}"),
      },
    ];

    return compositeRequests;
  } catch (error) {
    console.log("hari>>>>>>error", error);
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
export const getSelfieCreateRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      Applicant__c: data?.Applicant__c,
      kycDoc__c: "Applicant Photo",
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
      //Aadhar_Reference_Number__c: aadharData?.accessKey,
      // Encrypted_Aadhar_OCR__c: "",
      // Karza_Aadhar_OCR_AccessKey__c: aadharData?.accessKey,
      // Karza_Aadhar_OCR_CaseId__c: aadharData?.caseId,

      NameInAdhr__c: data?.adhaarDetails?.name,
      AdharEncrypt__c: data?.adhaarDetails?.maskedAadhaarNumber,
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

export const createCurrentAddressIsSameAsPermanentRequest = (
  data,
  AddrTyp__c
) => {
  try {
    const street = data?.adhaarDetails?.address?.splitAddress?.street;
    const location = data?.adhaarDetails?.address?.splitAddress?.location;
    return {
      Applicant__c: data?.Applicant__c,
      LoanAppl__c: data?.loanId,
      Landmark__c: data?.adhaarDetails?.address?.splitAddress?.landmark,
      AddrLine1__c: street ? street : location ? location : null,
      AddrLine2__c: location ? location : street ? street : null,
      AddrTyp__c,
      State__c: data?.adhaarDetails?.address?.splitAddress?.state,
      Country__c: data?.adhaarDetails?.address?.splitAddress?.country,
      Pincode__c: data?.adhaarDetails?.address?.splitAddress?.pincode,
      District__c: data?.adhaarDetails?.address?.splitAddress?.district,
      city__c: data?.adhaarDetails?.address?.splitAddress?.district,
      HouseNo__c: data?.adhaarDetails?.address?.splitAddress?.houseNumber,
      // Sm_as_Per_Adr__c: 1,
      Locality__c: data?.adhaarDetails?.address?.splitAddress?.location,
    };
  } catch (error) {
    return null;
  }
};

export const getAadharAddressRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    const street = data?.adhaarDetails?.address?.splitAddress?.street;
    const location = data?.adhaarDetails?.address?.splitAddress?.location;
    return {
      Applicant__c: data?.Applicant__c,
      LoanAppl__c: data?.data?.loanId,
      HouseNo__c: data?.adhaarDetails?.address?.splitAddress?.houseNumber,
      Landmark__c: data?.adhaarDetails?.address?.splitAddress?.landmark,
      AddrLine1__c: street ? street : location ? location : null,
      AddrLine2__c: location ? location : street ? street : null,
      AddrTyp__c: "Permanent Address",
      State__c: data?.adhaarDetails?.address?.splitAddress?.state,
      Country__c: data?.adhaarDetails?.address?.splitAddress?.country,
      Pincode__c: data?.adhaarDetails?.address?.splitAddress?.pincode,
      District__c: data?.adhaarDetails?.address?.splitAddress?.district,
      city__c: data?.adhaarDetails?.address?.splitAddress?.district,
    };
  } catch (error) {
    console.log("getPanCreateRequest>>>>error", error);

    return null;
  }
};

export const updateAadharDataToApplicant = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    let request = {
      Father_Name__c: data?.adhaarDetails?.fatherName,
      AdhrLst4Dgts__c: extractLastFourDigitsOfString(
        data?.adhaarDetails?.maskedAadhaarNumber
      ),
      DOB__c: data?.adhaarDetails?.dob,
      Gender__c: data?.adhaarDetails?.gender,
      IsPOICmptd__c: 1,
      POI_KYCTyp__c: "Aadhaar eKYC",
      PoiDocused__c: "Aadhaar",
    };
    const name = data?.adhaarDetails?.name;
    let firstName = null;
    let lastName = null;
    let middlename = null;
    try {
      if (name && name?.length > 0) {
        const nameList = name?.toString()?.split(" ");

        firstName = nameList
          ? nameList.length > 0
            ? nameList[0]
            : name
          : null;

        if (nameList != null && nameList.length == 3) {
          middlename = nameList[1] ? nameList[1] : null;

          lastName = nameList[2] ? nameList[2] : null;
        } else if (nameList != null && nameList.length == 2) {
          //appl.MName__c = string.isNotBlank(nameList[1]) ? nameList[1] : null;

          lastName = nameList[1] ? nameList[1] : null;
        } else if (nameList != null && nameList.length > 3) {
          middlename = nameList[1] ? nameList[1] : null;
          for (let i = 2; i <= nameList.length; i++) {
            lastName = lastName + " " + nameList(i);
          }
        } else {
          lastName = firstName;
        }
      }
    } catch (error) {}

    if (firstName) {
      request = { ...request, FName__c: firstName };
    }

    if (middlename) {
      request = { ...request, MName__c: middlename };
    }

    if (lastName) {
      request = { ...request, LName__c: lastName };
    }
    return request;
  } catch (error) {
    console.log("getPanCreateRequest>>>>error", error);

    return null;
  }
};

const extractLastFourDigitsOfString = (data) => {
  try {
    return data.slice(-4);
  } catch (error) {
    return null;
  }
};

function createEncodedQuery(docType, docSubType) {
  // Construct the query string with placeholders
  const query = `SELECT id, Catgry__c, DocSubTyp__c, DocTyp__c FROM DocMstr__c WHERE DocTyp__c = '${docType}' AND DocSubTyp__c = '${docSubType}'`;

  // URL-encode the entire query string
  let encodedQuery = encodeURIComponent(query);

  // Replace encoded single quotes (%27) with actual single quotes (')
  encodedQuery = encodedQuery.replace(/%27/g, "'");

  // Ensure encoded single quotes are in the output as %27
  encodedQuery = encodedQuery.replace(/'/g, "%27");

  return encodedQuery;
}

export const getDocType = (type) => {
  if (type === CaptureAddressConstants.DL) {
    return {
      docType: "Proof Of Address (Other Kyc)",
      docSubType: "Driving License",
    };
  } else if (type === CaptureAddressConstants.PASSPORT) {
    return {
      docType: "Proof Of Address (Other Kyc)",
      docSubType: "Passport",
    };
  } else if (type === CaptureAddressConstants.VOTERID) {
    return {
      docType: "Proof Of Address (Other Kyc)",
      docSubType: "Voter Id",
    };
  } else if (type === CaptureAddressConstants.NREGACard) {
    return {
      docType: "Proof Of Address",
      docSubType: "Nrega Card",
    };
  } else if (type === CaptureAddressConstants.EBILL) {
    return {
      docType: "Proof Of Address (Temporary)",
      docSubType: "Electricity Bill",
    };
  } else if (type === CaptureAddressConstants.GBILL) {
    return {
      docType: "Proof Of Address (Temporary)",
      docSubType: "Gas Bill",
    };
  } else if (type === CaptureAddressConstants.MBILL) {
    return {
      docType: "Proof Of Address (Temporary)",
      docSubType: "Mobile Bill",
    };
  }
};

const getDocMasterEncodedQuery = (type) => {
  const docType = getDocType(type);

  return createEncodedQuery(docType.docType, docType.docSubType);
  // if (type === CaptureAddressConstants.DL) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // } else if(type === CaptureAddressConstants.PASSPORT) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // } else if (type === CaptureAddressConstants.NREGACard) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // } else if (type === CaptureAddressConstants.EBILL) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // } else if (type === CaptureAddressConstants.GBILL) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // } else if (type === CaptureAddressConstants.MBILL) {
  //   return createEncodedQuery(
  //     docType.docType,
  //     docType.docSubType
  //   );
  // }
};

export const CurrentAddressDocumentCompositeRequests = (
  data,
  applicationKycId,
  imageBase64,
  addressBody,
  kycType,
  isAddressRequired
) => {
  console.log("docDetailPost", applicationKycId);
  try {
    console.log({ query: getDocMasterEncodedQuery(kycType), kycType });
    const compositeRequests = [
      {
        ...getCompositeRequest(getDocMasterEncodedQuery(kycType), "docQuery"),
      },
      {
        ...postCompositeRequest(
          "DocDtl__c",
          {
            ...getDocDetailBody(data, applicationKycId, kycType),
            DocMstr__c: "@{docQuery.records[0].Id}",
          },
          "docDetailPost"
        ),
      },
      {
        ...postCompositeRequest(
          "ContentVersion",
          getAdhaarUploadBody(imageBase64, kycType),
          "contentVersionPost"
        ),
      },
      {
        ...getCompositeRequest(
          `SELECT%20Id%2C%20Title%2C%20ContentDocumentId%20FROM%20ContentVersion%20WHERE%20Id%3D%27@{contentVersionPost.id}%27`,
          "contentDocumentQuery"
        ),
      },
      {
        ...postCompositeRequest(
          "ContentDocumentLink",
          getContentDocumentBody(
            "@{docDetailPost.id}",
            "@{contentDocumentQuery.records[0].ContentDocumentId}"
          ),
          "ContentDocumentLink"
        ),
      },
      {
        ...patchCompositeRequest(
          "ApplKyc__c",
          applicationKycId,
          panKycUpdateBody("@{docDetailPost.id}"),
          "ApplKycPatch"
        ),
      },
      {
        ...patchCompositeRequest(
          "Applicant__c",
          data?.Applicant__c,
          {
            isPerSameAsResi_ADD__c: 0,
          },
          "UpdateApicant"
        ),
      },
    ];

    if (isAddressRequired) {
      compositeRequests.push({
        ...postCompositeRequest("ApplAddr__c", addressBody, "Add_Address"),
      });
    }
    console.log("BEFORE RETURNING COMPOSITE");
    return compositeRequests;
  } catch (error) {
    console.log("ERROR IN FINAL", error);
    return null;
  }
};

export const createCompositeRequestForLeadList = (loanData) => {
  try {
    var loanLength = loanData.records.length;
    var compositeRequest = [];
    var applicationIds = [];
    for (let i = 0; i < loanLength; i++) {
      const record = loanData.records[i];
      // Change here should be type p
      const applicantId = record?.Applicants__r?.records?.filter(
        (el) => el.ApplType__c === "P"
      )[0].Id; // need to check after coapplicant
      applicationIds.push(applicantId);
    }

    //['1234','123566']

    if (applicationIds.length > 0) {
      const query = `SELECT FIELDS(ALL) FROM ApplKyc__c WHERE Applicant__c IN (${applicationIds
        .map((id) => `'${id}'`)
        .join(", ")}) LIMIT 200`;
      const encodedQuery = encodeURIComponent(query);

      const query1 = `SELECT FIELDS(ALL) FROM ApplAddr__c WHERE Applicant__c IN (${applicationIds
        .map((id) => `'${id}'`)
        .join(", ")}) LIMIT 200`;
      const encodedQuery1 = encodeURIComponent(query1);

      const query2 = `SELECT FIELDS(ALL) FROM ApplAsset__c WHERE Appl__c IN (${applicationIds
        .map((id) => `'${id}'`)
        .join(", ")}) LIMIT 200`;
      const encodedQuery2 = encodeURIComponent(query2);

      compositeRequest.push({
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=${encodedQuery}`,
        referenceId: "ApplicantKyc",
      });

      compositeRequest.push({
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=${encodedQuery1}`,
        referenceId: "ApplicantAddress",
      });

      compositeRequest.push({
        method: "GET",
        url: `/services/data/${net.getApiVersion()}/query/?q=${encodedQuery2}`,
        referenceId: "applicantAssets",
      });
    }

    if (compositeRequest.length > 0) {
      return compositeRequest;
    } else {
      console.log("error >>>", "length is 0");
      return null;
    }
  } catch (error) {
    console.log("error >>>", error);
    return null;
  }
};

export const createCompositeRequestForMetadata = () => {
  try {
    const compositeRequest = [
      {
        ...describeCompositeRequest(
          soupConfig.LoanApplicantFields.name,
          "LoanApplicantFields"
        ),
      },
      {
        ...describeCompositeRequest(
          soupConfig.ApplicantFields.name,
          "ApplicantFields"
        ),
      },
      {
        ...getCompositeRequest(
          encodeURIComponent(
            "SELECT FIELDS(ALL) FROM PRODUCT2 WHERE isActive = true LIMIT 200"
          ),
          "PRODUCT2"
        ),
      },
    ];
    return compositeRequest;
  } catch (error) {
    console.log("Error compioste error", error);
    return null;
  }
};

export const compositeFetchImage = (LinkedEntityId) => {
  try {
    const compositeRequest = [
      {
        ...getCompositeRequest(
          encodeURIComponent(
            `SELECT Id,ContentDocumentId from ContentDocumentLink  WHERE LinkedEntityId = '${LinkedEntityId}'`
          ),
          "ContentDocumentLink"
        ),
      },
      {
        ...getCompositeRequest(
          "SELECT VersionData FROM ContentVersion WHERE ContentDocumentId = '@{ContentDocumentLink.records[0].ContentDocumentId}'",
          "ContentVersion"
        ),
      },
    ];
    return compositeRequest;
  } catch (error) {
    console.log("Error compioste error", error);
    return null;
  }
};
