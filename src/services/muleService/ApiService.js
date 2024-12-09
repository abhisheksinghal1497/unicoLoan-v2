import axios from 'axios';
import { MULE_API_DEV_END_POINT, MULE_API_CLIENT_ID, MULE_API_CLIENT_SECRET, MULE_API_SERVICE_TIMEOUT, MULE_API_ENCRYPTION_KEY } from "@env"
import { getUniqueId } from '../../utils/functions';
import { decryptAES, encryptAES } from '../../utils/CryptoUtils';
const instance = axios.create({
    baseURL: MULE_API_DEV_END_POINT, // mulesoftApi 
    timeout: 45000, // 45 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'clientId': MULE_API_CLIENT_ID,
        'clientSecret': MULE_API_CLIENT_SECRET,
        'x-channel-id':'Customer Mobile App New'
        // Other headers...
    },
});

// need to add new uuid for every request

instance.interceptors.request.use(async (config) => {


    // config.headers.x-transaction-id = `Bearer ${TokenStorage.getAccessToken()}`;
    const randomValue = getUniqueId()



    config.headers["x-transaction-id"] = randomValue

    if(config?.data){
        try {
            const encryptedData = encryptAES(JSON.stringify(config.data), MULE_API_ENCRYPTION_KEY)
            config.data = { encryptedData: encryptedData }

        } catch (error) {
            
        }
    }


    return config;
});


instance.interceptors.response.use(
    async (response) => {
     //   return Promise.resolve(response)
        if (response.data) {
            // Decrypt the response data using AES decryption
            const decryptedData = decryptAES(response.data.results, MULE_API_ENCRYPTION_KEY)
           

            // Parse the decrypted data back into a JavaScript object
            try {
               
                response.data.results = JSON.parse(decryptedData);
            } catch (err) {
                console.error('Failed to parse decrypted response data:', err);
                return Promise.reject(err);
            }
        }
        console.log(response.data)
        return Promise.resolve(response);


    },
    async (error) => {
        return Promise.reject(error)

    }
);



export default instance;
