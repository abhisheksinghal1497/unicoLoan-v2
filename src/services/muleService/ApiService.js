import axios from 'axios';
import { MULE_API_DEV_END_POINT, MULE_API_CLIENT_ID, MULE_API_CLIENT_SECRET, MULE_API_SERVICE_TIMEOUT } from "@env"
import { getUniqueId } from '../../utils/functions';
const instance = axios.create({
    baseURL: MULE_API_DEV_END_POINT, // mulesoftApi 
    timeout: 45000, // 45 seconds
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'clientId': MULE_API_CLIENT_ID,
        'clientSecret': MULE_API_CLIENT_SECRET
        // Other headers...
    },
});

// need to add new uuid for every request

instance.interceptors.request.use(async (config) => {


    // config.headers.x-transaction-id = `Bearer ${TokenStorage.getAccessToken()}`;
    const randomValue = getUniqueId()



    config.headers["x-transaction-id"] = randomValue


    return config;
});


instance.interceptors.response.use(
    async (response) => {
        return Promise.resolve(response)



    },
    async (error) => {
        return Promise.reject(error)

    }
);



export default instance;
