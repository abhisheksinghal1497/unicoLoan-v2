import { useMutation } from "@tanstack/react-query";
import instance from "./ApiService";
import { fetch, useNetInfo } from "@react-native-community/netinfo";
import { errorConsoleLog, log } from "../../utils/ConsoleLogUtils";
import ErrorConstants from "../../constants/ErrorConstants";





export const verifyPanApi = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            return instance.post('retail-validation-v1/api/pan/status', body)
        }
    });
    return mutate;
}

export const uploadAndVerifyPan = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            return instance.post('digital-kyc-v1/api/pan', body)
        }
    });
    return mutate;
}


export const uploadAadharPhotos = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            return makeAadharinitiateCall(body)
        }
    });
    return mutate;
}

const makeAadharinitiateCall = async (body) => {
    try {

        // we need current time stamp

        var timestamp = new Date().getTime();
        try {
            timestamp = Math.floor(timestamp / 1000)

        } catch (error) {
            console.error(error);
        }


        let ipAddress = '192.0.3.146'; // hardcoded for safer side


        try {
            const currentIpAddress = await fetch();
            log("currentIpAddress", currentIpAddress?.details?.ipAddress)
            if (currentIpAddress && currentIpAddress?.details?.ipAddress) {
                ipAddress = currentIpAddress?.details?.ipAddress
            }
        } catch (error) {

        }





        var result = body?.substring(1, body.length - 1);



        return instance.post('digital-kyc-v1/api/aadhar-initiate', {

            "consent": "Y",
            "ipAddress": ipAddress,
            "consentTime": timestamp?.toString(),
            "caseId": "eeea90ab-f4e0-4d9e-9efa-c03fffbd22c6",
            "consentText": "Test",
            "fileData": {
                "content": `${result}`,
                "title": "Aadhar"
            },

        })







    } catch (error) {

        throw error

    }
};

export const verifyAadhar = () => {
    const mutate = useMutation({
        mutationFn: (body) => {

            const request = {
                "aadhaarTokenValue": body?.intitialResponse?.results?.aadharToken ? body?.intitialResponse?.results?.aadharToken : "",
                "encryptedAadhar": body?.intitialResponse?.results?.encryptedAadhar,
                "accessKey": body?.intitialResponse?.results?.accessKey,
                "consent": "Y",
                "otp": body?.otp,
                "shareCode": "1234",
                "caseId": "eeea90ab-f4e0-4d9e-9efa-c03fffbd22c6"
            }


            return instance.post('digital-kyc-v1/api/aadhar-verify', request)
        }
    });
    return mutate;
}

export const nameMatchCheck = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            return instance.post('/digital-utility-v1/api/name-match', body)
        }
    });
    return mutate;

}


export const doOCRForDL = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            //return instance.post('/digital-utility-v1/api/name-match', body)
            return new Promise(async (resolve, reject) => {

                try {
                    log("request body", body)
                    const response = await instance.post('/digital-kyc-v1/api/drivers-license', body)
                    resolve(response?.data)
                    // resolve("saxasx")


                } catch (error) {
                    errorConsoleLog("verifyDrivingLicence>>", error)
                    reject(ErrorConstants.SOMETHING_WENT_WRONG)
                }
            })
        }
    });
    return mutate;
}

export const doOCRForPassport = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            //return instance.post('/digital-utility-v1/api/name-match', body)
            return new Promise(async (resolve, reject) => {

                try {
                    log("request body", body)
                    const response = await instance.post('/digital-kyc-v1/api/passport', body)
                    resolve(response?.data)
                    // resolve("saxasx")


                } catch (error) {
                    errorConsoleLog("doOCRForPassport>>", error)
                    reject(ErrorConstants.SOMETHING_WENT_WRONG)
                }
            })
        }
    });
    return mutate;
}


export const doOCRForVoterID = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            //return instance.post('/digital-utility-v1/api/name-match', body)
            return new Promise(async (resolve, reject) => {

                try {
                    log("request body", body)
                    const response = await instance.post('/digital-kyc-v1/api/voterid', body)
                    resolve(response?.data)
                    // resolve("saxasx")


                } catch (error) {
                    errorConsoleLog("verifyDrivingLicence>>", error)
                    reject(ErrorConstants.SOMETHING_WENT_WRONG)
                }
            })
        }
    });
    return mutate;
}