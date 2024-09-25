import ErrorConstants from "../../constants/ErrorConstants";
import { query } from "../../constants/Queries";
import { LOAN_DETAILS_KEYS } from "../../constants/stringConstants";
import { log } from "../../utils/ConsoleLogUtils";
import { createCompositeRequestForMetadata } from "../../utils/functions";
import LocalStorage from "../LocalStorage";
import {
  saveAllLeadFields,
  saveApplicationDataSoup,
} from "../sfDBServices/salesforceDbService";
import { getAllSoupEntries } from "../sfDBServices/salesforceDbUtils";
import { soupConfig } from "../sfDBServices/SoupConstants";
import { compositeRequest, QueryObject } from "./netService";

export const getLeadFields = async () => {
  return new Promise(async (resolve, reject) => {
    // check weather data is present in local constants
    try {
      if (LocalStorage.getLeadFields()) {
        resolve(LocalStorage.getLeadFields());
        return;
      }
    } catch (error) {}

    //  check weather data is present in soup (SF Local database) data or not
    try {
      const getData = await getAllSoupEntries(
        soupConfig.LoanApplicantFields.name,
        soupConfig.LoanApplicantFields.path
      );

      if (getData && getData?.length > 0) {
        LocalStorage.setLeadFields(getData);
        resolve(getData);
        return;
      }
    } catch (error) {
      log("error LeadList>>>>", error);
    }
    // last option make the SF call
    var loanApplicantFieldData = null;
    var applicantFieldData = null;
    let loanData = null;
    var fieldsData = [];

    // try {
    //   // API 1
    //   loanApplicantFieldData = await getMetaData(
    //     soupConfig.LoanApplicantFields.name
    //   );

    // } catch (error) {}

    // try {
    //   // API 2
    //   applicantFieldData = await getMetaData(soupConfig.ApplicantFields.name);
    // } catch (error) {}

    try {
      const compositeResponse = await compositeRequest(
        createCompositeRequestForMetadata()
      );
      loanApplicantFieldData = compositeResponse?.compositeResponse[0]?.body;
      applicantFieldData = compositeResponse?.compositeResponse[1]?.body;

      let loanPurpose = {};
      compositeResponse?.compositeResponse[2]?.body?.records?.forEach((el) => {
        if (loanPurpose[el?.Family]) {
          loanPurpose[el?.Family] = [
            ...loanPurpose[el?.Family],
            {
              active: el?.IsActive,
              defaultValue: "",
              label: el?.Name,
              validFor: null,
              value: el?.Name,
            },
          ];
        } else {
          loanPurpose[el?.Family] = [
            {
              active: el?.IsActive,
              defaultValue: "",
              label: el?.Name,
              validFor: null,
              value: el?.Name,
            },
          ];
        }
      });

      loanData = Object.keys(loanPurpose).map((el) => ({
        aggregatable: true,
        aiPredictionField: false,
        autoNumber: false,
        byteLength: 765,
        calculated: false,
        calculatedFormula: null,
        cascadeDelete: false,
        caseSensitive: false,
        compoundFieldName: null,
        controllerName: null,
        createable: true,
        custom: true,
        defaultValue: null,
        defaultValueFormula: null,
        defaultedOnCreate: false,
        dependentPicklist: false,
        deprecatedAndHidden: false,
        digits: 0,
        displayLocationInDecimal: false,
        encrypted: false,
        externalId: false,
        extraTypeInfo: null,
        filterable: true,
        filteredLookupInfo: null,
        formulaTreatNullNumberAsZero: false,
        groupable: true,
        highScaleNumber: false,
        htmlFormatted: false,
        idLookup: false,
        inlineHelpText: null,
        label: "Select loan purpose",
        length: 255,
        mask: null,
        maskType: null,
        name: el,
        nameField: false,
        namePointing: false,
        nillable: true,
        permissionable: true,
        picklistValues: loanPurpose[el],
        polymorphicForeignKey: false,
        precision: 0,
        queryByDistance: false,
        referenceTargetField: null,
        referenceTo: [],
        relationshipName: null,
        relationshipOrder: null,
        restrictedDelete: false,
        restrictedPicklist: true,
        scale: 0,
        searchPrefilterable: false,
        soapType: "xsd:string",
        sortable: true,
        type: "picklist",
        unique: false,
        updateable: true,
        writeRequiresMasterRead: false,
      }));

      // console.log('picklist----', JSON.stringify(compositeResponse?.compositeResponse[2]?.body?.records))
    } catch (error) {
      console.log("Composite failed 122", error);
    }

    if (loanApplicantFieldData && loanApplicantFieldData?.fields?.length > 0) {
      fieldsData = [...fieldsData, ...loanApplicantFieldData?.fields];
    }

    if (applicantFieldData && applicantFieldData?.fields?.length > 0) {
      fieldsData = [...fieldsData, ...applicantFieldData?.fields];
    }

    if (loanData) {
      fieldsData = [...fieldsData, ...loanData]
    }

    fieldsData = fieldsData?.filter(
      (field) => field.createable === true || field.updateable === true
    );

    LocalStorage.setLeadFields(fieldsData);
    try {
      console.log(
        "LOAN DATA HERE FINAL",
        fieldsData.find((el) => el.name === LOAN_DETAILS_KEYS.loanPurpose)
      );
      await saveAllLeadFields(soupConfig.LoanApplicantFields.name, fieldsData);
    } catch (error) {}

    resolve(fieldsData);
    // getMetaData(soupConfig.LoanApplicantFields.name)
    //   .then(async (data) => {
    //     let metadata = []
    //     const fieldData = data?.fields?.filter(
    //       (field) => field.createable === true || field.updateable === true
    //     );
    //     if (fieldData && fieldData.length > 0) {

    //       try {
    //         // get all picklist values of applicant object
    //         const applicantFields = await getMetaData(soupConfig.ApplicantFields.name)
    //         if (applicantFields) {
    // const applicantfieldData = applicantFields?.fields?.filter(
    //   (field) => field.createable === true || field.updateable === true
    // );

    //         }

    //         LocalStorage.setLeadFields(metadata);
    //         // save the field into the soups
    // try {
    //   await saveAllLeadFields(soupConfig.leadPicklist.name, metadata);
    // } catch (error) {
    // }
    //         alert(metadata?.length)
    //         resolve(metadata);
    //       } catch (error) {

    //       }
    //     }

    //   })
    //   .catch((error) => {
    //     log("getMetaDataFromSource", error);
    //     reject(ErrorConstants.SOMETHING_WENT_WRONG);
    //   });
  });
};

export const getPincodeData = async () => {
  return new Promise(async (resolve, reject) => {
    // check weather data is present in local constants
    try {
      if (
        LocalStorage?.getPincodeLists() &&
        LocalStorage?.getPincodeLists()?.length > 0
      ) {
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
      if (getData && getData?.length > 0) {
        LocalStorage.setPincodeLists(getData);
        resolve(getData);
        return;
      }
    } catch (error) {
      log("error pincode>>>>", error);
    }

    // last option make the SF call

    QueryObject(query.getPincodeMasterData)
      .then(async (data) => {
        const metadata = data?.records;
        if (metadata && metadata?.length > 0) {
          LocalStorage.setPincodeLists(metadata);
          log("api", data?.records);
          // save the field into the soups
          try {
            await saveAllLeadFields(soupConfig.pincodeList.name, metadata);
          } catch (error) {}
          resolve(metadata);
        } else {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      })
      .catch((error) => {
        log("getMetaDataFromSource", error);
        reject(ErrorConstants.SOMETHING_WENT_WRONG);
      });
  });
};

export const saveApplicationData = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await saveApplicationDataSoup(soupConfig.applicationList.name, data);
      resolve(data);
    } catch (error) {
      console.log("saveApplicationData", error);
      reject(ErrorConstants.SOMETHING_WENT_WRONG);
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
