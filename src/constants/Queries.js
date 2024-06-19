export const query = {
    getPincodeMasterData: `SELECT Id,Name,Bank_Branch__c,PinCode__c,Product_Type__c,Bank_Branch__r.Name,Bank_Branch__r.BrchCode__c,PinCode__r.PIN__c,PinCode__r.State__c,PinCode__r.IsServicable__c FROM PinBrchJn__c where PinCode__r.IsServicable__c=true`,
  };
  