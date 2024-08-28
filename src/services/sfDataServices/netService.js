import { net, oauth } from "react-native-force";
import { logoutApi } from "../ApiUtils";
import ErrorConstants from "../../constants/ErrorConstants";

const errorCallback = (reject) => () => {
  logoutApi();
  reject(ErrorConstants.SOMETHING_WENT_WRONG);
};

export const QueryObject = (query) => {
  console.log(query, "response here");
  return new Promise((resolve, reject) => {
    const successCB = (data) => {
      console.log('inside success')
      if(data){
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
        alert("error")
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
