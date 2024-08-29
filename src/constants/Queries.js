export const query = {
  getPincodeMasterData: `SELECT Id,Name,Bank_Branch__c,PinCode__c,Product_Type__c,Bank_Branch__r.Name,Bank_Branch__r.BrchCode__c,PinCode__r.PIN__c,PinCode__r.State__c,PinCode__r.IsServicable__c FROM PinBrchJn__c where PinCode__r.IsServicable__c=true`,
  getUserInfo: (userId) =>
    `SELECT FIELDS(ALL) FROM User WHERE Id  = '${userId}'`,
  getLeadList: (MobilePhone) =>
    `SELECT FIELDS(ALL), (SELECT FIELDS(ALL) FROM Applicants__r LIMIT 200),  Lead__r.FirstName, Lead__r.Requested_loan_amount__c, 
  Lead__r.Requested_tenure_in_Months__c, Lead__r.OwnerId  FROM LoanAppl__c WHERE Lead__r.MobilePhone = '9743063887' LIMIT 200`
};
