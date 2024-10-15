import { net, oauth } from "react-native-force";
import { logoutApi } from "../ApiUtils";
import ErrorConstants from "../../constants/ErrorConstants";
import LocalStorage from "../LocalStorage";
import { query } from "../../constants/Queries";
import { compositeFetchImage } from "../../utils/functions";
import RNFetchBlob from "rn-fetch-blob";

const errorCallback = (reject) => () => {
  logoutApi();
  reject(ErrorConstants.SOMETHING_WENT_WRONG);
};

export const QueryObject = (query) => {
  return new Promise((resolve, reject) => {
    const successCB = (data) => {
      console.log("inside success");
      if (data) {
        net.query(
          query,
          (res) => {
            console.log(res, "response here");
            resolve(res);
          },
          (error) => {
            reject(error);
          }
        );
      }
    };
    oauth.getAuthCredentials(successCB, () => {
      console.log("INSIDE ERROR CB");
      reject(ErrorConstants.SOMETHING_WENT_WRONG);
    });
  });
};

export const getMetaData = (objectType) => {
  return new Promise((resolve, reject) => {
    const successCB = () =>
      net.describe(
        objectType,
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );

    oauth.getAuthCredentials(successCB, errorCallback(reject));
  });
};

export const DedupeApi = (LeadId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/DedupeLead?recordId=${LeadId}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const postObjectData = (objectName, data) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/data/",
      `${net.getApiVersion()}/sobjects/${objectName}`,
      (res) => {
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "POST",
      data
    );
  });
};

export const updateObjectData = (objectName, data, id, isDelete = false) => {
  const requestType = isDelete ? "DELETE" : "PATCH";
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/data/",
      `${net.getApiVersion()}/sobjects/${objectName}/${id}`,
      () => {
        let res = { success: true, id: id };
        console.log("response Patch============>", res);
        resolve(res);
      },
      (error) => {
        console.log(error, "updateobject data error");
        reject(error);
      },
      requestType,
      data
    );
  });
};

export const compositeRequest = (requests, allOrNone = true) => {
  return new Promise((resolve, reject) => {
    // console.log('compositeGraphApi data', graphs);
    let requestData = {
      allOrNone: allOrNone,
      compositeRequest: requests,
    };
    net.sendRequest(
      "/services/data/",
      `${net.getApiVersion()}/composite`,
      (res) => {
        if (res?.compositeResponse?.length > 0) {
          if (
            res?.compositeResponse?.[0]?.body?.success ||
            res?.compositeResponse?.[0]?.body?.done ||
            res?.compositeResponse?.[0]?.httpStatusCode === 200 ||
            res?.compositeResponse?.[0]?.httpStatusCode === 204
          ) {
            resolve(res);
          } else {
            console.log("CHECK 1 ", JSON.stringify(res));
            reject("Request Failed");
          }
        } else {
          console.log("CHECK 2 ", JSON.stringify(res));
          reject("Request Failed");
        }
      },
      (error) => {
        console.log("Error", error);
        reject(error);
      },
      "POST",
      requestData
    );
  });
};

export const getUserData = (userId) => {
  return new Promise((resolve, reject) => {
    // console.log('compositeGraphApi data', graphs);

    net.query(
      query.getUserInfo(userId),
      (res) => {
        LocalStorage?.setUserdata(res?.records?.[0]);
        resolve(res);
      },
      (error) => {
        console.log("Error", error);
        reject(error);
      }
    );
  });
};

export const getLeadList = (phone) => {
  return new Promise((resolve, reject) => {
    // console.log('compositeGraphApi data', graphs)
    net.query(
      query.getLeadList(phone),
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log("Error", error);
        reject(error);
      }
    );
  });
};

export const getConsentDetailByApplicantId = (applicantId) => {
  return new Promise((resolve, reject) => {
    net.query(
      query.getUserConsentId(applicantId),
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log("Error", error);
        reject(error);
      }
    );
  });
};

export const leadConvertApi = (LeadId, mobile) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/leadConverted?leadId=${LeadId}&mobileNumber=${mobile}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const compositeGraphRequest = (requests) => {
  return new Promise((resolve, reject) => {
    // console.log('compositeGraphApi data', graphs);
    let requestData = {
      graphs: requests,
    };
    net.sendRequest(
      "/services/data/",
      `${net.getApiVersion()}/composite/graph`,
      (res) => {
        resolve(res);
      },
      (error) => {
        console.log("Error", error);
        reject(error);
      },
      "POST",
      requestData
    );
  });
};

export const getConsentLink = (applicationId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/getConsentLink?recordId=${applicationId}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const getInPrincipleSanctionLetter = (applicationId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/getSanctionLetter?recordId=${applicationId}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const getBase64Image = (LinkedEntityId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let documentLink = await compositeRequest(
        compositeFetchImage(LinkedEntityId)
      );

      const url =
        documentLink?.compositeResponse[1]?.body?.records[0]?.VersionData;

      oauth.getAuthCredentials(async (res) => {
        try {
          const instanceUrl = res.instanceUrl;

          const response = await RNFetchBlob.fetch(
            "GET",
            `${instanceUrl}${url}`,
            {
              Authorization: `Bearer ${res.accessToken}`,
            }
          );
          const base64Str = response.base64();
          resolve(`data:image/png;base64,${base64Str}`);
        } catch (error) {
          console.log("FINAL ERROR HERE", error);
        }
      });

      // net.sendRequest(
      //   url,
      //   "",
      //   async (res) => {
      //     console.log(
      //       "ACCESS",

      //     );
      //   },
      //   (e) => {
      //     reject(e);
      //   },
      //   "GET",
      //   null,
      //   {
      //     // 'Content-Type': 'multipart/form-data',
      //   }
      // );
    } catch (error) {
      console.log("SOME ERROR OCCURRED", error);
      reject(error);
    }
  });
};

const fetchData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        // Add any headers if needed
      },
    });

    // Check if the response is ok
    if (!response.ok) throw new Error("Network response was not ok");

    // Get the response as a Blob
    const blob = await response.blob();

    // Read the blob as an ArrayBuffer
    const arrayBuffer = await blob.arrayBuffer();

    // Convert ArrayBuffer to Buffer, then to Base64
    const base64String = Buffer.from(arrayBuffer).toString("base64");

    console.log("Base64 String:", base64String);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// start BRE

export const startBureauBre = (applicationId, loanId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/startBureauBre?refId=${applicationId}&loanId=${loanId}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const getBureauBreApi = (applicationId, loanId, meesageId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/getBureauBre?refId=${applicationId}&loanId=${loanId}&intgId=${meesageId}`,
      (res) => {
        console.log('BRE RESPONSES----', res)
        // console.log("Entered");
        if (!res?.message && !res?.error) {
          reject("error");
        }

        if (res?.error === "BRE Failed" || res?.error === 'Bureau Failed') {
          resolve({ success: false , message: "BRE Failed"});
          return;
        }

        if (res.error) {
          console.log("res.error------------------------", res.error);
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
          return;
        }
        
       
        console.log("resSUCCESS -----------------------", res);
        resolve({ success: true , message: "BRE Success", data: res?.message ? JSON.parse(res?.message) : res});
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};

export const assignBranchManagerApi = (LeadId) => {
  return new Promise((resolve, reject) => {
    net.sendRequest(
      "/services/apexrest",
      `/assigntomanager/?recordId=${LeadId}`,
      (res) => {
        // console.log("Entered");
        console.log("res", res);
        resolve(res);
      },
      (error) => {
        reject(error);
      },
      "GET"
    );
  });
};
