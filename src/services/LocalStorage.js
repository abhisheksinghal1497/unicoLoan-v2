
let leadFields = null
let pincodeData = null
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
    clearAllData() {
        leadFields = null
         pincodeData = null
    }
};



export default LocalStorage;
