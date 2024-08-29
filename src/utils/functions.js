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
      Status: 'New Lead',
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
        1 : 0 : null,
      Lead__c: leadId
    }

  } catch (error) {
    return null
  }
}

export const getApplicantRequest = (data) => {
  try {
    return {
      FName__c: data?.FName__c,
      MName__c: data?.MName__c,
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


export const  isEmptyObject = (obj)=> {
  return Object.keys(obj).length === 0;
}

// Example usage



