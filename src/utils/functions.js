import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { errorConsoleLog, log } from "./ConsoleLogUtils";
import { fetch } from "@react-native-community/netinfo";
import uuid from "react-native-uuid";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { net } from "react-native-force";

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
        routes: [
          { name: screenName, params },
        ],
      })
    );
  };
  return resetRoute;
};

export const createLoanAndAppplicantCompositeRequest = (data, leadID) => {
  try {
    let compositeRequest = [
      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/LoanAppl__c`,
        "referenceId": "loanCreate",
        "body": getLoanCreateRequest(data, leadID)

      },

      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/Applicant__c`,
        "referenceId": "applicantCreate",
        "body": { ...getApplicantRequest(data), "LoanAppln__c": "@{loanCreate.id}", }
      },

      // {
      //   "method": "POST",
      //   "url": `/services/data/${net.getApiVersion()}/sobjects/ApplConsent__c`,
      //   "referenceId": "consent",
      //   "body": {
      //     ...createApplicationConsentRequest(), "LoanAppln__c": "@{loanCreate.id}",
      //     "Applicant__c": "@{applicantCreate.id}"
      //   }

      // }


    ]

    return compositeRequest;
  } catch (error) {
    log("createLeadCompositeRequest>>>error", error)
    return null
  }


}

export const getLeadCreationRequest = (data) => {
  try {
    return {
      FirstName: data?.FirstName,
      MiddleName: data?.MiddleName,
      LastName: data?.LName__c,
      MobilePhone: data?.MobNumber__c,
      Email: data?.EmailId__c,
      Bulk_Lead__c: false,
      Status: 'Closed Lead',
      Alternative_Mobile_Number__c: data?.AltMobile__c,
      Customer_Profile__c: data?.Customer_Profile__c,
      LeadSource: data?.LeadSource__c,
      Residential_Address__c: data?.Address__c,
      PostalCode: '',
      Pincode__c: data?.Pincode__c,
      Product__c: data?.Product__c,
      ProductLookup__c: "",
      Bank_Branch__c: data?.Bank_Branch_Name,
      Requested_loan_amount__c: data?.ReqLoanAmt__c,
      Requested_tenure_in_Months__c: data?.ReqTenInMonths__c,
      Property_Identified__c: data?.PropertyIdentified__c,
      Company: data?.LName__c
    }

  } catch (error) {
    return null;
  }
}

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
      PropertyIdentified__c: data?.PropertyIdentified__c ? data.PropertyIdentified__c === "Yes" ?
        1 : 0 : undefined,
      Lead__c: leadId,
      SubStage__c: "RM Data Entry",
      Stage__c: "QDE",


    }

  } catch (error) {
    return null
  }
}

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
      Employment_experience_month__c: getPeriodValues(data?.Employment_experience__c, 1),
      Employment_experience_year__c: getPeriodValues(data?.Employment_experience__c, 0),
      Total_Work_Experience_year__c: getPeriodValues(data?.Total_Work_Experience__c, 0),
      Total_Work_Experience_month__c: getPeriodValues(data?.Total_Work_Experience__c, 1),
      Number_of_Family_Dependants__c: data?.Number_of_Family_Dependants__c,
      No_of_Family_Dependants_Children__c: data?.No_of_Family_Dependants_Children__c,
      No_of_Family_Dependants_Other__c: data?.No_of_Family_Dependants_Other__c,
      Total_Business_Experience_year__c: getPeriodValues(data?.Total_Business_Experience__c, 0),
      Total_Business_Experience_month__c: getPeriodValues(data?.Total_Business_Experience__c, 1),
      Address__c: data?.Address__c,
      Pincode__c: data?.Pincode__c

    }

  } catch (error) {
    return null
  }
}

export const getPeriodValues = (str, index) => {
  try {
    if (str) {
      if (index === 0) {
        return str.substring(0, 2)
      } else {
        return str.substring(2, 4)
      }
    }

  } catch (error) {

  }
  return null
}


export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
}

// Example usage

export const createCompositeRequestForPanAadhar = (loanData, aadharData) => {


  try {
    let compositeRequest = [
      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c`,
        "referenceId": "pan",
        "body": getPanCreateRequest(loanData)

      },

      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/ApplKyc__c`,
        "referenceId": "aadhar",
        "body": getAadharCreateRequest(loanData, aadharData)
      },

      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/ApplAddr__c`,
        "referenceId": "permanentAddress",
        "body": getAadharAddressRequest(loanData)
      },

      {
        "method": "PATCH",
        "url": `/services/data/${net.getApiVersion()}/sobjects/Applicant__c/${loanData.Applicant__c}`,
        "referenceId": "applicantUpdateId",
        "body": updateAadharDataToApplicant(loanData)
      },

      //update applicant details



    ]

    return compositeRequest;
  } catch (error) {
    log("createCompositeRequestForPanAadhar>>>error", error)
    return null
  }


}


export const getPanCreateRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      Applicant__c: data?.Applicant__c,
      Pan__c: data?.panDetails?.panNumber,
      NameInPan__c: data?.panDetails.panName,
      kycDoc__c: "Pan"
    }

  } catch (error) {
    console.log("getPanCreateRequest>>>>error", error)

    return null
  }
}


export const getAadharCreateRequest = (data, aadharData) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      OCRStatus__c: "Success",
      Applicant__c: data?.Applicant__c,
      kycDoc__c: "Aadhaar",
      // Aadhar_Reference_Number__c: "",
      // Encrypted_Aadhar_OCR__c: "",
      //  Karza_Aadhar_OCR_AccessKey__c: aadharData?.accessKey,
      //Karza_Aadhar_OCR_CaseId__c: aadharData?.caseId, // Karza_Aadhar_OCR_CaseId__c
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
      AdhrAdd__c: data?.adhaarDetails?.address?.combinedAddress?.toString()?.length <= 255 ?
        data?.adhaarDetails?.address?.combinedAddress : undefined // in SF address take max length upto 255
    }

  } catch (error) {
    console.log("getAadhaerCreateRequest>>>>error", error)

    return null
  }
}

export const createCurrentAddressIsSameAsPermanentRequest = (data, type = "Current Address") => {
  try {
    if (type === "Permanent Address") {
      console.log("permanent address>>>", type)
      console.log("Applicant__c address>>>", type)
      return {

        AddrTyp__c: "Permanent Address",
        HouseNo__c: data?.adhaarDetails?.address?.splitAddress?.houseNumber,
        Landmark__c: data?.adhaarDetails?.address?.splitAddress?.landmark,
        District__c: data?.adhaarDetails?.address?.splitAddress?.district,
        Locality__c: data?.adhaarDetails?.address?.splitAddress?.location,
        State__c: data?.adhaarDetails?.address?.splitAddress?.state,
        Country__c: data?.adhaarDetails?.address?.splitAddress?.country,
        Pincode__c: data?.adhaarDetails?.address?.splitAddress?.pincode,
        Applicant__c: data?.Applicant__c,
      }
    } else {
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
      }
    }
  } catch (error) {
    return null
  }
}



export const createFinalLoanAndAssetsCompositeRequest = (leadData, request) => {
  try {
    let compositeRequest = [
      {
        "method": "PATCH",
        "url": `/services/data/${net.getApiVersion()}/sobjects/LoanAppl__c/${leadData?.loanId}`,
        "referenceId": "loanUpdate",
        "body": getLoanUpdateRequest(request)

      },

      {
        "method": "PATCH",
        "url": `/services/data/${net.getApiVersion()}/sobjects/Applicant__c/${leadData?.Applicant__c}`,
        "referenceId": "applicantUpdate",
        "body": getapplicantUpdateRequest(data)
      },

      {
        "method": "POST",
        "url": `/services/data/${net.getApiVersion()}/sobjects/ApplAsset__c`,
        "referenceId": "applicantAssestsCreateOrUpdate",
        "body": getapplicantUpdateRequest(data)
      },



    ]

    return compositeRequest;
  } catch (error) {
    log("createLeadCompositeRequest>>>error", error)
    return null
  }


}


export const getLoanUpdateRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    return {

      ReqTenInMonths__c: data?.ReqTenInMonths__c,
      ReqLoanAmt__c: data?.ReqLoanAmt__c,
      LoanPurpose__c: data?.LoanPurpose__c

    }

  } catch (error) {
    return null
  }
}


export const getapplicantUpdateRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    return {

      ExistingCustomer__c: data?.ExistingCustomer__c,
      Customer__c: data?.Customer__c,


    }

  } catch (error) {
    return null
  }
}


export const getapplicantAssetsRequest = (data, id) => {
  //   // RM__c: data?.RM__c,
  try {
    return {
      Applicant__c: id,
      Bankbalance__c: data?.Bankbalance__c,
      ImmovablePropertyValue__c: data?.ImmovablePropertyValue__c,
      CurrentPfBalance__c: data?.CurrentPfBalance__c,
      SharesAndSecurityBalance__c: data?.SharesAndSecurityBalance__c,
      FixedDeposits__c: data?.FixedDeposits__c,
      InvestmentInPlants_Machinery_Vehicles__c: data?.InvestmentInPlants_Machinery_Vehicles__c,
      OwnContributions__c: data?.OwnContributions__c,
      OthersAssetsValue__c: data?.OthersAssetsValue__c,
      TotalAssets__c: data?.TotalAssets__c,
      AmountSpentForConstruction_Purchase__c: data?.AmountSpentForConstruction_Purchase__c,
      Savings__c: data?.Savings__c,
      DisposalOfAsset__c: data?.DisposalOfAsset__c,
      FundFromFamily__c: data?.FundFromFamily__c,
      FundFromOtherServices__c: data?.FundFromOtherServices__c


    }

  } catch (error) {
    return null
  }
}


export const createApplicationConsentRequest = () => {
  try {
    return {
      Aadhar_Consent__c: 1,
      C_KYC__c: 1,

      Declaration__c: 1,
      Driving_License__c: 1,
      Email_Id__c: 1,
      General_Consent__c: 1,
      LPG_ID__c: 1,
      Mobile_No__c: 1,
      PAN_No__c: 1,
      Passport__c: 1,
      Voter_ID__c: 1

    }

  } catch (error) {
    return null
  }
}


export const getAadharAddressRequest = (data) => {
  //   // RM__c: data?.RM__c,
  try {
    const street = data?.adhaarDetails?.address?.splitAddress?.street;
    const location = data?.adhaarDetails?.address?.splitAddress?.location
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
      city__c: data?.adhaarDetails?.address?.splitAddress?.district

    }

  } catch (error) {
    console.log("getPanCreateRequest>>>>error", error)

    return null
  }
}

export const updateAadharDataToApplicant = (data) => {
  //   // RM__c: data?.RM__c,
  try {

    let request = {

      Father_Name__c: data?.adhaarDetails?.fatherName,
      AdhrLst4Dgts__c: extractLastFourDigitsOfString(data?.adhaarDetails?.maskedAadhaarNumber),
      DOB__c: data?.adhaarDetails?.dob,
      Gender__c: data?.adhaarDetails?.gender,


    }
    const name = data?.adhaarDetails?.name
    let firstName = null
    let lastName = null
    let middlename = null
    try {
      if (name && name?.length > 0) {
        const nameList = name?.toString()?.split(" ")
        firstName = nameList ? nameList.length > 0 ? nameList[0] : name : null



        if (nameList != null && nameList.size() == 3) {

          middlename = nameList[1] ? nameList[1] : null;

          lastName = nameList[2] ? nameList[2] : null;

          console.log("middlename1", middlename)
          console.log("lastName1", lastName)

        }

        else if (nameList != null && nameList.size() == 2) {

          //appl.MName__c = string.isNotBlank(nameList[1]) ? nameList[1] : null;

          lastName = nameList[1] ? nameList[1] : null;

          console.log("middlename2", middlename)
          console.log("lastName2", lastName)

        } else if (nameList != null && nameList.size() > 3) {

          middlename = nameList[1] ? nameList[1] : null;
          for (let i = 2; i <= nameList.size(); i++) {
            lastName = lastName + " " + nameList(i)

          }

          console.log("middlename3", middlename)
          console.log("lastName3", lastName)

        } else {
          lastName = firstName;
        }
      }
    } catch (error) { }

    if (firstName) {
      request = { ...request, FName__c: firstName }
    }

    if (middlename) {
      request = { ...request, MName__c: middlename }
    }

    if (lastName) {
      request = { ...request, LName__c: lastName }
    }
    return request;




  } catch (error) {
    console.log("getPanCreateRequest>>>>error", error)

    return null
  }
}



const extractLastFourDigitsOfString = (data) => {
  try {
    return data.slice(-4);
  } catch (error) {
    return null
  }
}



