import { log } from "../../utils/ConsoleLogUtils"
import { checkSoupExists, registerSoup, upsertSoupEntries, getAllSoupEntries, clearAllSoupEntries, upsertSoupEntriesWithExternalId } from "./salesforceDbUtils"
import { soupConfig } from "./SoupConstants"


export const saveAllLeadFields = async (soupName, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkSoupExistsOrNot = await checkSoupExists(soupName)
            if (!checkSoupExistsOrNot) {
                // register for the soup
                await registerSoup(soupName, [{ path: soupConfig.leadPicklist.name, type: 'string' }])
            }

            try {
                await clearAllSoupEntries(soupName)
            } catch (error) {

            }

            await upsertSoupEntries(soupName, data)
            resolve("Data saved successfully")


        } catch (error) {
            log("saveAllFields failure", error)
            reject(error)
        }
    })

}

export const getAllSavedRecords = async (soupName, path) => {
    return await getAllSoupEntries(soupName, path)
}


export const saveApplicationDataSoup = async (soupName, data) => {
    data = { ...data, External_ID: data?.loanId ? data?.loanId : data?.Id }

    console.log(">>>>>external id", data?.External_ID )
    return new Promise(async (resolve, reject) => {
        try {
            const checkSoupExistsOrNot = await checkSoupExists(soupName)
            if (!checkSoupExistsOrNot) {
                // register for the soup
                await registerSoup(soupName, [{ path: soupConfig.applicationList.externalId, type: 'string' },

                ])
            }


            
            await upsertSoupEntriesWithExternalId(soupName, data)
            resolve("Data saved successfully")


        } catch (error) {
            log("saveAllFields failure", error)
            reject(error)
        }
    })

}