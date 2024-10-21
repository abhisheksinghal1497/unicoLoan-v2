export const query = {
  getPincodeMasterData: `SELECT Id,Name,Bank_Branch__c,PinCode__c,Product_Type__c,Bank_Branch__r.Name,Bank_Branch__r.BrchCode__c,PinCode__r.PIN__c,PinCode__r.State__c,PinCode__r.IsServicable__c FROM PinBrchJn__c where PinCode__r.IsServicable__c=true`,
  getUserInfo: (userId) =>
    `SELECT FIELDS(ALL) FROM User WHERE Id  = '${userId}'`,
  getLeadList: (MobilePhone) =>
    `SELECT FIELDS(ALL), (SELECT FIELDS(ALL) FROM Applicants__r LIMIT 200),  Lead__r.FirstName, Lead__r.Requested_loan_amount__c, 
  Lead__r.Requested_tenure_in_Months__c, Lead__r.OwnerId  FROM LoanAppl__c WHERE Lead__r.MobilePhone = '${MobilePhone}' LIMIT 200`,
  getDocMasterId: (DocTyp__c) => `SELECT id,Catgry__c,DocSubTyp__c,DocTyp__c FROM DocMstr__c WHERE DocTyp__c='${DocTyp__c}' LIMIT 1`,
  getContentDocument: (contentVersionId) => `SELECT Id, Title, ContentDocumentId FROM ContentVersion WHERE Id = '${contentVersionId?.trim()}'`,
  getLoanDetailById: (loanId) => `SELECT FIELDS(ALL) FROM LoanAppl__c WHERE Id  = '${loanId}'`,
  getUserConsentId: (applicantId) => `SELECT Consent_Status__c FROM Applicant__c WHERE Id  = '${applicantId}'`,
  getApplicantIncome: (id) => `SELECT Total_Income__c, Applicant_Net_Income__c FROM Applicant_Income__c WHERE Id =  '${id}'`,
  getAllApplicantsIncome: (loanId) => `SELECT Id, (SELECT Annual_Turnover__c FROM Applicants__r LIMIT 200) FROM  LoanAppl__c WHERE Id = '${loanId?.trim()}'`
};

//`SELECT Total_Income__c, Applicant_Net_Income__c FROM Applicant_Income__c WHERE Id = '${dynamicId}'`;
