import ErrorConstants from "../../constants/ErrorConstants";
import { query } from "../../constants/Queries";
import { log } from "../../utils/ConsoleLogUtils";
import LocalStorage from "../LocalStorage";
import { saveAllLeadFields, saveApplicationDataSoup } from "../sfDBServices/salesforceDbService";
import { getAllSoupEntries } from "../sfDBServices/salesforceDbUtils";
import { soupConfig } from "../sfDBServices/SoupConstants";
import { getMetaData, QueryObject } from "./netService";

export const getLeadFields = async () => {
  return new Promise(async (resolve, reject) => {
    // check weather data is present in local constants
    try {
      if (LocalStorage.getLeadFields()) {
        log(
          "LocalStorage.getLeadFields() length>>>",
          [...LocalStorage.getLeadFields()].length
        );
        resolve(LocalStorage.getLeadFields());
        return;
      }
    } catch (error) {}

    //  check weather data is present in soup (SF Local database) data or not
    try {
      const getData = await getAllSoupEntries(
        soupConfig.leadPicklist.name,
        soupConfig.leadPicklist.path
      );
      if (getData) {
        LocalStorage.setLeadFields(getData);
        resolve(getData);
        return;
      }
    } catch (error) {
      log("error LeadList>>>>", error);
    }

    // last option make the SF call

    getMetaData(soupConfig.leadPicklist.name)
      .then(async (data) => {
        const metadata = data.fields.filter(
          (field) => field.createable === true || field.updateable === true
        );

        LocalStorage.setLeadFields(metadata);
        // save the field into the soups
        try {
          await saveAllLeadFields(soupConfig.leadPicklist.name, metadata);
        } catch (error) {
        }
        resolve(metadata);
      })
      .catch((error) => {
        log("getMetaDataFromSource", error);
        reject(ErrorConstants.SOMETHING_WENT_WRONG);
      });
  });
};

export const getPincodeData = async () =>  {
  return new Promise(async (resolve, reject) => {
    // check weather data is present in local constants
    try {
      if (LocalStorage.getPincodeLists()) {
        resolve(LocalStorage.getPincodeLists());
        return;
      }
    } catch (error) {}

    //  check weather data is present in soup (SF Local database) data or not
    try {
      const getData = await getAllSoupEntries(
        soupConfig.pincodeList.name,
        soupConfig.pincodeList.path
      );
      if (getData) {
        LocalStorage.setPincodeLists(getData);
        resolve(getData);
        return;
      }
    } catch (error) {
      log("error pincode>>>>", error);
    }

    // last option make the SF call

    QueryObject(query.getPincodeMasterData,)
      .then(async (data) => {
        const metadata = data?.records
        LocalStorage.setPincodeLists(metadata);
        // save the field into the soups
        try {
          await saveAllLeadFields(soupConfig.pincodeList.name, metadata);
        } catch (error) {
        }
        resolve(metadata);
      })
      .catch((error) => {
        log("getMetaDataFromSource", error);
        reject(ErrorConstants.SOMETHING_WENT_WRONG);
      });
  });
};

export const saveApplicationData = async (data) =>  {
  return new Promise(async (resolve, reject) => {
    try {
      console.log()
      await saveApplicationDataSoup(soupConfig.applicationList.name, data);
      resolve(data)
    } catch (error) {
        console.log('saveApplicationData',error)
        reject(ErrorConstants.SOMETHING_WENT_WRONG)
    }
   
    // last option make the SF call

    // QueryObject(query.getPincodeMasterData,)
    //   .then(async (data) => {
    //     const metadata = data?.records
    //     LocalStorage.setPincodeLists(metadata);
    //     // save the field into the soups
    //     try {
    //       await saveAllLeadFields(soupConfig.pincodeList.name, metadata);
    //     } catch (error) {
    //     }
    //     resolve(metadata);
    //   })
    //   .catch((error) => {
    //     log("getMetaDataFromSource", error);
    //     reject(ErrorConstants.SOMETHING_WENT_WRONG);
    //   });
  });
};