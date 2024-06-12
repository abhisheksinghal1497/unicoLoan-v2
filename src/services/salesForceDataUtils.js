import { net, oauth } from "react-native-force"
import ErrorConstants from "../constants/ErrorConstants"
import { error, log } from "../utils/ConsoleLogUtils"

export const getAuthDetails = async () => {
    return new Promise((resolve, reject) => {

        try {
            oauth.getAuthCredentials((data) => {
                resolve(data)

            }, (error) => {
                console.error(error)
                reject(ErrorConstants.SOMETHING_WENT_WRONG)
            })

        } catch (error) {
            reject(ErrorConstants.SOMETHING_WENT_WRONG)
        }

    })
}

export const getUserLoggedInfo = async () => {
    return new Promise((resolve, reject) => {
        try {
            getAuthDetails().then((data) => {
              
                //https://developer.salesforce.com/docs/platform/mobile-sdk/guide/oauth-using-identity-urls.html
                net.sendRequest(
                    'services/oauth2/', 
                    "userinfo",
                    (res) => {
                     console.log('RES____________________ ', res);
                       
                    },
                    (err) => {
                        console.log('ERR_______ :', err);
                        //  reject(err);
                    },
                    'GET'
                );

            }).catch((error) => {
                reject(ErrorConstants.SOMETHING_WENT_WRONG)
            })

        } catch (error) {
            reject(ErrorConstants.SOMETHING_WENT_WRONG)
        }

    })

}