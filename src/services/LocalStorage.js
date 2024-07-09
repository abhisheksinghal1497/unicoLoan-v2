
let leadFields = null
const LocalStorage = {
    setLeadFields(data) {
        leadFields = data
    },

    getLeadFields() {
        return leadFields
    },

    clearLeadFields() {
        leadFields = null
    }




};

export default LocalStorage;
