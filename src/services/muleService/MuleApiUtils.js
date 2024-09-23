import { useMutation } from "@tanstack/react-query";
import instance from "./ApiService";
import { fetch, useNetInfo } from "@react-native-community/netinfo";
import { errorConsoleLog, log } from "../../utils/ConsoleLogUtils";
import ErrorConstants from "../../constants/ErrorConstants";
import {
  createCompositeRequestForPanAadhar,
  createCompositeRequestsForAdhaarUpload,
  createCompositeRequestsForPanUpload,
  getConsentTime,
  getIpAddress,
  getUniqueId,
} from "../../utils/functions";
import { saveApplicationData } from "../sfDataServices/saleforceApiUtils";
import { compositeRequest } from "../sfDataServices/netService";

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

export const verifyAadhar = (panNumber, loanData, panName) => {
  const mutate = useMutation({
    mutationFn: (body) => {
      const adhaarToken = body?.intitialResponse?.results?.aadharToken
        ? body?.intitialResponse?.results?.aadharToken
        : "";
      const aadhaarBase64 = body?.imageBase64;
      var result = aadhaarBase64 ? aadhaarBase64 : null;
      if (result) {
        console.log("RESULT IS NOT NULL");
      }
      //  alert(result)
      // var result = aadhaarBase64 ? aadhaarBase64?.substring(1, aadhaarBase64?.length - 1) : null;
      // try {
      //   if (result) {
      //     result = result.split(";")[1]
      //   }

      // } catch (error) {

      // }

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
          console.log(adhaarVerifyResponse, "HERE-------------2");
          const adhaarName = adhaarVerifyResponse?.data?.results?.name;

          try {
            checkPanAdhaarLinked(adhaarToken, panNumber, adhaarName)
              .then(async () => {
                try {
                  let loanDetails = { ...loanData };
                  loanDetails.adhaarDetails =
                    adhaarVerifyResponse.data?.results;

                  const response = await compositeRequest(
                    createCompositeRequestForPanAadhar(
                      loanDetails,
                      request,
                      true,
                      100
                    )
                  );

                  if (response) {
                    try {
                      const panApplicationId =
                        response?.compositeResponse?.[0]?.body?.id;
                      const adhaarApplicationId =
                        response?.compositeResponse?.[1]?.body?.id;

                      if (adhaarApplicationId && result) {
                        console.log("aadhar upload");
                        try {
                          const aadhaarUploadRequests =
                            createCompositeRequestsForAdhaarUpload(
                              loanData,
                              adhaarApplicationId,
                              result
                            );
                          await compositeRequest(aadhaarUploadRequests);
                        } catch (error) {}
                      }
                      if (
                        panApplicationId &&
                        loanData?.panDetails?.imageBase64
                      ) {
                        console.log("pan upload");
                        try {
                          const panUploadRequests =
                            createCompositeRequestsForPanUpload(
                              loanData,
                              panApplicationId
                            );
                          await compositeRequest(panUploadRequests);
                        } catch (error) {}
                      }
                    } catch (error) {
                      console.log("error", error);
                    }
                    await saveApplicationData(loanDetails);
                    resolve(loanDetails);
                  } else {
                    reject(ErrorConstants.SOMETHING_WENT_WRONG);
                  }
                } catch (error) {
                  log("ERRor, ", error);
                  reject(ErrorConstants.SOMETHING_WENT_WRONG);
                }
              })
              .catch(async (error) => {
                try {
                  console.log("name match check------------------12");
                  const nameMatchCheck = await nameCheck(panName, adhaarName);
                  if (nameMatchCheck) {
                    let loanDetails = {
                      ...loanData,
                      adhaarDetails: adhaarVerifyResponse.data?.result,
                    };
                    //  loanDetails.adhaarDetails = adhaarVerifyResponse.data?.results;
                    const response = await compositeRequest(
                      createCompositeRequestForPanAadhar(
                        loanDetails,
                        request,
                        false,
                        nameMatchCheck?.score
                      ),
                      false
                    );
                    if (response) {
                      const panApplicationId =
                        response?.compositeResponse?.[0]?.body?.id;
                      if (
                        panApplicationId &&
                        loanData?.panDetails?.imageBase64
                      ) {
                        const panUploadRequests =
                          createCompositeRequestsForPanUpload(
                            loanData,
                            panApplicationId
                          );
                        const response = await compositeRequest(
                          panUploadRequests
                        );
                      }
                      const adhaarApplicationId =
                        response?.compositeResponse?.[1]?.body?.id;
                      if (adhaarApplicationId && result) {
                        const aadhaarUploadRequests =
                          createCompositeRequestsForAdhaarUpload(
                            loanData,
                            adhaarApplicationId,
                            result
                          );
                        const response = await compositeRequest(
                          aadhaarUploadRequests
                        );
                      }
                      await saveApplicationData(loanDetails);
                      resolve({ ...loanDetails });
                    } else {
                      reject(ErrorConstants.SOMETHING_WENT_WRONG);
                    }
                  }
                } catch (error) {
                  reject("Pan and Aadhar details are not matching.");
                }

                reject(ErrorConstants.SOMETHING_WENT_WRONG);
              });
          } catch (error) {
            reject(ErrorConstants.SOMETHING_WENT_WRONG);
          }
        } catch (error) {
          console.log("VERIFY ORP ERROR", error);
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
        reject("Name not match with pan.");
      } else {
        resolve({
          score: namCheckResponse?.data?.results?.score,
        });
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

export const doOCRForDL = (panName) => {
  const mutate = useMutation({
    mutationFn: (body) => {
      //return instance.post('/digital-utility-v1/api/name-match', body)
      return new Promise(async (resolve, reject) => {
        try {
          console.log("I AM TRIGGER---------------------");
          const response = await instance.post(
            "/digital-kyc-v1/api/drivers-license",
            body
          );
          console.log(
            "DL RESPONSE ------------",
            JSON.stringify(response.data)
          );
          resolve(response?.data);
        } catch (error) {
          errorConsoleLog("verifyDrivingLicence>>", error);
          reject(
            typeof error === "string"
              ? error
              : ErrorConstants.SOMETHING_WENT_WRONG
          );
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
          // var result = body?.substring(1, body.length - 1);
          // const request = {
          //   consent: "Y",
          //   caseId: getUniqueId(),

          //   fileData: {
          //     content: `${result}`,
          //     title: "passport",
          //   },
          // };

          const response = await instance.post(
            "/digital-kyc-v1/api/passport",
            body
          );
          resolve(response?.data);

          // const response = {
          //   statusCode: "200",
          //   responseId: "34281710-b6c1-11ee-b69f-6045bdcf0441",
          //   message: "Passport Verification successful!!",
          //   results: {
          //     passportNumber: {
          //       passportNumberFromSource: "K8229530",
          //       passportNumberMatch: true,
          //     },
          //     applicationDate: "24/09/2012",
          //     typeOfApplication: "Tatkaal",
          //     dateOfIssue: {
          //       dispatchedOnFromSource: "24/09/2012",
          //       dateOfIssueMatch: true,
          //     },
          //     name: {
          //       nameScore: 1,
          //       nameMatch: true,
          //       surnameFromPassport: "SHERING",
          //       nameFromPassport: "SIDDHARTHA",
          //     },
          //     ocrDetails: [
          //       {
          //         type: "Passport Front",
          //         details: {
          //           passportNum: {
          //             value: "K8229530",
          //             conf: 1.0,
          //           },
          //           givenName: {
          //             value: "SIDDHARTHA",
          //             conf: 1.0,
          //           },
          //           surname: {
          //             value: "SHERING",
          //             conf: 1.0,
          //           },
          //           gender: {
          //             value: "MALE",
          //             conf: 1.0,
          //           },
          //           dob: {
          //             value: "07/06/1995",
          //             conf: 1.0,
          //           },
          //           placeOfBirth: {
          //             value: "AHMEDABAD, GUJARAT",
          //             conf: 1.0,
          //           },
          //           countryCode: {
          //             value: "IND",
          //             conf: 1.0,
          //           },
          //           nationality: {
          //             value: "INDIAN",
          //             conf: 1.0,
          //           },
          //           placeOfIssue: {
          //             value: "AHMEDABAD",
          //             conf: 1.0,
          //           },
          //           doi: {
          //             value: "24/09/2012",
          //             conf: 1.0,
          //           },
          //           doe: {
          //             value: "23/09/2022",
          //             conf: 1.0,
          //           },
          //           type: {
          //             value: "P",
          //             conf: 1.0,
          //           },
          //           mrz: {
          //             line2: "K7729530<5IND9506077M2209232<<<<<<<<<<<<<<<0",
          //             line1: "P<INDSHERING<<SIDDHARTHA<<<<<<<<<<<<<<<<<<<<",
          //             conf: 1.0,
          //           },
          //         },
          //       },
          //       {
          //         type: "Passport Back",
          //         details: {
          //           passportNum: {
          //             value: "",
          //             conf: 1.0,
          //           },
          //           father: {
          //             value: "THONDUP TSHERING",
          //             conf: 1.0,
          //           },
          //           mother: {
          //             value: "SNEHLATA SHERING",
          //             conf: 1.0,
          //           },
          //           spouse: {
          //             value: "",
          //             conf: 1.0,
          //           },
          //           address: {
          //             value:
          //               "5/SHILP ROW HOUSE.B/H DHANANJAY TOWER, SATELLITE,AHMEDABAD, PIN:380015,GUJARAT,INDIA",
          //             conf: 1.0,
          //           },
          //           pin: {
          //             value: "380015",
          //             conf: 1.0,
          //           },
          //           oldPassportNum: {
          //             value: "G263256",
          //             conf: 1.0,
          //           },
          //           oldDoi: {
          //             value: "18/04/2007",
          //             conf: 1.0,
          //           },
          //           oldPlaceOfIssue: {
          //             value: "AHMEDABAD",
          //             conf: 1.0,
          //           },
          //           fileNum: {
          //             value: "AH2070416759012",
          //             conf: 1.0,
          //           },
          //           addressSplit: {
          //             city: "Ahmedabad",
          //             district: "",
          //             pin: "380015",
          //             locality: "",
          //             line2: "SATELLITE",
          //             line1: "5/SHILP ROW HOUSE.B/H DHANANJAY TOWER",
          //             state: "Gujarat",
          //             street: "",
          //             landmark: "",
          //             houseNumber: "",
          //           },
          //         },
          //       },
          //     ],
          //   },
          // };

          // resolve(response);
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
          const response = await instance.post(
            "/digital-kyc-v1/api/voterid",
            body
          );
          resolve(response?.data);

          // resolve({
          //   statusCode: "200",
          //   responseId: "1-46712ce0-5c61-11ef-8276-020017039e7e",
          //   message: null,
          //   results: {
          //     acNo: "11",
          //     rlnName: "ishwar waghulade",
          //     partNo: "150",
          //     nameV3: "",
          //     psLatLong: "21.195904-75.835621",
          //     stCode: "S13",
          //     id: "",
          //     pin: "",
          //     district: "Jalgaon",
          //     rlnNameV1: "ईश्\u200dवर वाघुळदे",
          //     epicNo: "TWJ3164985",
          //     state: "Maharashtra",
          //     slNoInPart: "55",
          //     sectionNo: "1",
          //     lastUpdate: "",
          //     rlnNameV2: "",
          //     rlnNameV3: "",
          //     acName: "Raver",
          //     psName: "Z.P.P.Boys School",
          //     houseNo: "",
          //     rlnType: "F",
          //     pcName: "Raver",
          //     name: "jitendra ishwar waghulade",
          //     dob: "",
          //     gender: "M",
          //     age: 29,
          //     nameV2: "",
          //     nameV1: "जितेंद्र ईश्\u200dवर वाघुळदे",
          //     partName: "Nhavi Pra.Yawal",
          //     ocrDetails: [
          //       {
          //         details: {
          //           voterid: {
          //             value: "TWJ3164985",
          //             conf: 1.0,
          //           },
          //           name: {
          //             value: "Jitendra Ishwar Waghulade",
          //             conf: 1.0,
          //           },
          //           gender: {
          //             value: "MALE",
          //             conf: 0.95,
          //           },
          //           relation: {
          //             value: "Ishwar Waghulade",
          //             conf: 1.0,
          //           },
          //           dob: {
          //             value: "XX/XX/1994",
          //             conf: 1.0,
          //           },
          //           doc: {
          //             value: "",
          //             conf: 0.0,
          //           },
          //           age: {
          //             value: "",
          //             conf: 0.0,
          //           },
          //         },
          //         type: "Voterid Front",
          //       },
          //     ],
          //   },
          // });

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
    mutationFn: async (body) => {
      const ipaddress = await getIpAddress();

      const requestBody = {
        consent: "Y",
        ipAddress: ipaddress,
        consentTime: getConsentTime(),
        consentText: "Test",
        caseId: getUniqueId(),
        aadharNumber: body?.number?.toString(),
        aadharName: body?.name,
      };
      return instance.post(
        "/digital-kyc-v1/api/aadhar-initiate-by-number",
        requestBody
      );
      // return new Promise(async (resolve, reject) => {
      //   setTimeout(() => {
      //     resolve(body);
      //   }, 2000);
      // });
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

          if (linkedResponse?.results?.linked) {
            console.log({ linkedResponse });
            resolve(linkedResponse);
          } else {
          }
        } catch (error) {
          console.log(error.response);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });
  return mutate;
};
