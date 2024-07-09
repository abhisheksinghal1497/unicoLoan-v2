import { smartstore } from "react-native-force";
import { log } from "../../utils/ConsoleLogUtils";

export const checkSoupExists = async (soupName) => {
  return new Promise((resolve, reject) => {
    smartstore.soupExists(false, soupName, (exists) => {
      resolve(exists);
    }),
      (error) => {
        reject(error);
      };
  });
};

export const registerSoup = async (soupName, indexes) => {
  return new Promise((resolve, reject) => {
    smartstore.registerSoup(
      false,
      soupName,
      [...indexes],
      (result) => {
        log("registerSoup success>>>>" + soupName, result);
        resolve(result);
      },
      (error) => {
        log("registerSoup error>>>>" + soupName, error);
        reject(error);
      }
    );
  });
};

export const upsertSoupEntries = async (soupName, records) => {
  return new Promise((resolve, reject) => {
    smartstore.upsertSoupEntries(
      false,
      soupName,
      records,
      (data) => {
        resolve(data);
      },
      (error) => {
        log("upsertSoupEntries error>>" + soupName, error);
        reject(error);
      }
    );
  });
};

export const getAllSoupEntries = async (soupName, path) => {
  return new Promise(async (resolve, reject) => {
    try {
      const querySpec = smartstore.buildAllQuerySpec(path, "ascending", 1000);
      let allRecords = [];

      smartstore.querySoup(
        false,
        soupName,
        querySpec,
        (cursor) => {
          allRecords = allRecords.concat(cursor.currentPageOrderedEntries);
          resolve(allRecords);
          return;
        },
        (error) => {
          log("getAllSoupEntries >>> querySoup", error);
          reject(error);
        }
      );
    } catch (error) {
      log("getAllSoupEntries >>> failure", error);
      reject(error);
    }
  });
};

export const clearAllSoupEntries = async (soupName) => {
  return new Promise(async (resolve, reject) => {
    try {
      smartstore.clearSoup(
        false,
        soupName,
        (resut) => {
          resolve(resut);
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      log("clearAllSoupEntries >>> failure", error);
      reject(error);
    }
  });
};
