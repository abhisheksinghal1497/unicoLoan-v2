import ErrorConstants from "../../constants/ErrorConstants"
import { log } from "../../utils/ConsoleLogUtils"
import LocalStorage from "../LocalStorage"
import { saveAllLeadFields } from "../sfDBServices/salesforceDbService"
import { getAllSoupEntries } from "../sfDBServices/salesforceDbUtils"
import { soupConfig } from "../sfDBServices/SoupConstants"
import { getMetaData } from "./netService"


export const getLeadFields = async () => {
    return new Promise(async (resolve, reject) => {
        // check weather data is present in local constants
        // try {
        //     if (LocalStorage.getLeadFields()) {
        //         log("LocalStorage.getLeadFields() length>>>", [...LocalStorage.getLeadFields()].length)
        //         resolve(LocalStorage.getLeadFields())

        //         return;
        //     }
        // } catch (error) {
        //     alert(error)
        // }
       

        //  check weather data is present in soup data or not
        try {
            const getData = await getAllSoupEntries(soupConfig.leadPicklist.name, soupConfig.leadPicklist.path)
            if (getData) {

                log("getData length>>>", [...getData].length)
                LocalStorage.setLeadFields(getData)
                resolve(getData)
                return
            }

        } catch (error) {
          log("error>>>>", error)
        }

        // last option make the SF call

        getMetaData(soupConfig.leadPicklist.name).then(async (data) => {

            const metadata = data.fields.filter(
                (field) => field.createable === true || field.updateable === true
            );
           log("metadata length>>>",[...metadata].length)
            LocalStorage.setLeadFields(metadata)
            // save the field into the soups
            try {
                await saveAllLeadFields(soupConfig.leadPicklist.name, metadata)
            } catch (error) {

            }
            resolve(metadata)

        }).catch(error => {
            log('getMetaDataFromSource', error)
            reject(ErrorConstants.SOMETHING_WENT_WRONG)
        })

    })
}