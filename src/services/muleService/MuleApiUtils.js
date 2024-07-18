import { useMutation } from "@tanstack/react-query";
import instance from "./ApiService";
import { fetch, useNetInfo } from "@react-native-community/netinfo";
import { errorConsoleLog, log } from "../../utils/ConsoleLogUtils";
import ErrorConstants from "../../constants/ErrorConstants";
import {
  getConsentTime,
  getIpAddress,
  getUniqueId,
} from "../../utils/functions";
import { saveApplicationData } from "../sfDataServices/saleforceApiUtils";

export const verifyPanApi = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      return instance.post("retail-validation-v1/api/pan/status", body);
    },
  });
  return mutate;
};

export const uploadAndVerifyPan = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      return instance.post("digital-kyc-v1/api/pan", body);
    },
  });
  return mutate;
};

export const uploadAadharPhotos = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      console.log("trigegr 2");
      return makeAadharinitiateCall(body);
    },
  });
  return mutate;
};

const makeAadharinitiateCall = async (body) => {
  try {
    // we need current time stamp
    const ipAddress = await getIpAddress();

    var result = body?.substring(1, body.length - 1);

    return instance.post("digital-kyc-v1/api/aadhar-initiate", {
      consent: "Y",
      ipAddress: ipAddress,
      consentTime: getConsentTime(),
      caseId: getUniqueId(),
      consentText: "Test",
      fileData: {
        content: `${result}`,
        title: "Aadhar",
      },
    });
  } catch (error) {
    throw error;
  }
};

export const verifyAadhar = (panNumber,loanData) => {
  const mutate = useMutation({
    mutationFn: (body) => {
      const adhaarToken = body?.intitialResponse?.results?.aadharToken
        ? body?.intitialResponse?.results?.aadharToken
        : "";
      const request = {
        aadhaarTokenValue: adhaarToken,
        encryptedAadhar: body?.intitialResponse?.results?.encryptedAadhar,
        accessKey: body?.intitialResponse?.results?.accessKey,
        consent: "Y",
        otp: body?.otp,
        shareCode: "1234",
        caseId: body?.intitialResponse?.results?.caseId,
      };
      console.log("requests", request);

      return new Promise(async (resolve, reject) => {
        try {
          const adhaarVerifyResponse = await instance.post(
            "digital-kyc-v1/api/aadhar-verify",
            request
          );
          console.log(adhaarVerifyResponse, 'HERE-------------2')
          const adhaarName = adhaarVerifyResponse?.data?.results?.name;

          try {
            checkPanAdhaarLinked(adhaarToken, panNumber, adhaarName)
              .then(async() => {
                try {
                  
                  console.log('here------------------1', loanData)
                  let loanDetails = {...loanData};
                  loanDetails.adhaarDetails = adhaarVerifyResponse.data?.results;
                  console.log('here------------------12')
                  await saveApplicationData(loanDetails)
                  resolve(loanDetails)
                } catch (error) {
                  log('ERRor, ', error)
                  reject(ErrorConstants.SOMETHING_WENT_WRONG)
                }
             
              })
              .catch((error) => reject(error));
          } catch (error) {
            reject(ErrorConstants.SOMETHING_WENT_WRONG);
          }
        } catch (error) {
          console.log('VERIFY ORP ERROR', error)
          reject("Aadhar verification failed");
        }
      });

      // return instance.post("digital-kyc-v1/api/aadhar-verify", request);
    },
  });
  return mutate;
};

export const nameCheck = async (panName, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const verifyNamematchRequest = {
        name1: panName,
        name2: name,
        type: "Individual",
        caseId: getUniqueId(),
      };

      const namCheckResponse = await instance.post(
        "/digital-utility-v1/api/name-match",
        verifyNamematchRequest
      );
      if (namCheckResponse?.data?.results?.score < 0.5) {
        reject("Pan and adhaar names are different please check.");
      } else {
        resolve(namCheckResponse);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const checkPanAdhaarLinked = async (
  aadharToken,
  panNumber,
  adhaarName
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const ipAddress = await getIpAddress();
      const bodyRequest = {
        pan: panNumber,
        aadhaarTokenValue: aadharToken,
        ipAddress,
        consent: "Y",
        name: adhaarName,
        consentTime: getConsentTime(),
        consentText: "Test",
        caseId: getUniqueId(),
      };

      console.log("shd", bodyRequest);

      const linkedResponse = await instance.post(
        "digital-kyc-v1/api/pan-aadhar-linked",
        bodyRequest
      );
      console.log(linkedResponse);
      if (linkedResponse.data) {
        const isLinked = linkedResponse?.data?.results?.linked;
        if (isLinked) {
          resolve(linkedResponse);
        } else {
          const errorMessage = linkedResponse?.data?.results?.message;
          reject(
            ErrorConstants.FAILED + ", " + errorMessage
              ? errorMessage
              : ErrorConstants.PAN_ADHAAR_FAILED
          );
        }
      } else {
        reject(ErrorConstants.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const nameMatchCheck = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      return instance.post("/digital-utility-v1/api/name-match", body);
    },
  });
  return mutate;
};

export const doOCRForDL = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      //return instance.post('/digital-utility-v1/api/name-match', body)
      return new Promise(async (resolve, reject) => {
        try {
          log("request body", body);
          const response = await instance.post(
            "/digital-kyc-v1/api/drivers-license",
            body
          );
          resolve(response?.data);
          // resolve("saxasx")
        } catch (error) {
          errorConsoleLog("verifyDrivingLicence>>", error);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });
  return mutate;
};

export const doOCRForPassport = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      return new Promise(async (resolve, reject) => {
        try {
          var result = body?.substring(1, body.length - 1);
          const request = {
            consent: "Y",
            caseId: getUniqueId(),

            fileData: {
              content: `${result}`,
              title: "passport",
            },
          };

          const response = await instance.post(
            "/digital-kyc-v1/api/passport",
            request
          );
          resolve(response?.data);
          // resolve("saxasx")
        } catch (error) {
          errorConsoleLog("doOCRForPassport>>", error);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });
  return mutate;
};

export const doOCRForVoterID = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      //return instance.post('/digital-utility-v1/api/name-match', body)
      return new Promise(async (resolve, reject) => {
        try {
          log("request body", body);
          const response = await instance.post(
            "/digital-kyc-v1/api/voterid",
            body
          );
          resolve(response?.data);
          // resolve("saxasx")
        } catch (error) {
          errorConsoleLog("verifyDrivingLicence>>", error);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });
  return mutate;
};

export const makeAdhaarEKYCCall = () => {
  const mutate = useMutation({
    mutationFn: (body) => {
      //return instance.post('/digital-utility-v1/api/name-match', body)
      return new Promise(async (resolve, reject) => {
        setTimeout(() => {
          resolve(body);
        }, 2000);
      });
    },
  });
  return mutate;
};

export const checkPanLinkWithAdhaar = (pan) => {
  const mutate = useMutation({
    mutationFn: (body) => {
      console.log({ body });
      const request = {
        aadhaarTokenValue: body?.intitialResponse?.results?.aadharToken
          ? body?.intitialResponse?.results?.aadharToken
          : "",
        encryptedAadhar: body?.intitialResponse?.results?.encryptedAadhar,
        accessKey: body?.intitialResponse?.results?.accessKey,
        consent: "Y",
        otp: body?.otp,
        shareCode: "1234",
        caseId: getUniqueId(),
      };
      console.log("requests", request);

      return new Promise(async (resolve, reject) => {
        try {
          console.log("HERE----------- 1");
          const adhaarVerifyResponse = await instance.post(
            "digital-kyc-v1/api/aadhar-verify",
            request
          );
          console.log("HERE----------- 2");
          const adhaarName = adhaarVerifyResponse?.data?.results?.name;
          console.log({ adhaarName });

          const bodyRequest = {
            pan,
            aadhaarTokenValue: body?.intitialResponse?.results?.aadharToken
              ? body?.intitialResponse?.results?.aadharToken
              : "",
            ipAddress: "192.0.3.146",
            consent: "Y",
            name: adhaarName,
            consentTime: getConsentTime(),
            consentText: "Test",
            caseId: getUniqueId(),
          };

          console.log("shd", bodyRequest);

          const linkedResponse = await instance.post(
            "digital-kyc-v1/api/pan-aadhar-linked",
            bodyRequest
          );
          console.log({ linkedResponse });
          resolve(linkedResponse);
        } catch (error) {
          console.log(error.response);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });
  return mutate;
};
