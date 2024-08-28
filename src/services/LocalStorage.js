
let leadFields = null
let pincodeData = null
let userData = null
const LocalStorage = {
    setLeadFields(data) {
        leadFields = data
    },

    getLeadFields() {
        return leadFields
    },

    clearLeadFields() {
        leadFields = null
    },
    setPincodeLists(data) {
        pincodeData = data
    },
    getPincodeLists() {
        return pincodeData
    },
    clearPincodeLists() {
        pincodeData = null
    },
    setUserdata(data) {
      userData = data
    },

    getUserData(){
        return userData;
    },

    clearUserData() {
        userData = null
    },
    clearAllData() {
        leadFields = null
        pincodeData = null
        userData = null
    }
};



export default LocalStorage;
