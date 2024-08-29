import {

  useMutation,
  useQueries,
} from "@tanstack/react-query";


import { log } from "../utils/ConsoleLogUtils";
import { validations } from "../constants/validations";
import { component } from "../components/FormComponents/FormControl";

import { createLoanAndAppplicantCompositeRequest, getLeadCreationRequest, GetPicklistValues, getUniqueId, toast } from "../utils/functions";
import {
  getLeadFields,
  getPincodeData,
  saveApplicationData,
} from "./sfDataServices/saleforceApiUtils";
import { oauth } from "react-native-force";

import ErrorConstants from "../constants/ErrorConstants";
import { soupConfig } from "./sfDBServices/SoupConstants";
import { getAllSoupEntries } from "./sfDBServices/salesforceDbUtils";

import { LOAN_DETAILS_KEYS } from "../constants/stringConstants";
import { compositeRequest, DedupeApi, getLeadList, postObjectData } from "./sfDataServices/netService";
import LocalStorage from "./LocalStorage";

export const logoutApi = () => {
  console.log("LOGOUT API");
  // oauth.logout(() => {
  //   LocalStorage.clearAllData();
  // }, () => {
  // });
};

const checkAuth = (asyncFN, ...params) => {
  return new Promise(async (resolve, reject) => {
    oauth.getAuthCredentials(
      async (data) => data && resolve(await asyncFN(...params)),
      async () => {
        logoutApi();
        reject(ErrorConstants.SOMETHING_WENT_WRONG);
      }
    );
  });
};

export const getPinCodes = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return checkAuth(getPincodeData);
    },
  });

  return mutate;
};

export const getHomeScreenDetails = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise(async (resolve, reject) => {
        try {
          // FETCH THE PINCODE DATA

          const getLeadListData = await getLeadList(LocalStorage?.getUserData()?.Phone)
          if (getLeadListData && getLeadListData.records?.length > 0) {

            for (let i = 0; i < getLeadListData.records.length; i++) {

              //save the record into the soup
              let record = getLeadListData.records[i];
              const data = { loanId: record?.Id, applicationDetails: record }
            
              await saveApplicationData(data)
              


            }


          } else {
            resolve([]);
          }



          const data = await getAllSoupEntries(
            soupConfig.applicationList.name,
            soupConfig.applicationList.path
          );
          log("HERE IS DATA----------", { data });
          if (data && data?.length > 0) {

            resolve(data);
          } else {
            resolve([]);
          }
        } catch (error) {
          console.log("error>>", error)
          resolve([]);
        }
      });
    },
  });

  return mutate;
};
export const getEligibilityDetails = (loanData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      const { applicationDetails, loanDetails } = data || {};
      return new Promise(async (resolve, reject) => {

        const data = {
          Product: applicationDetails?.Product__c,
          "Sub Product": loanDetails?.loanPurpose,
          "Request Loan Amount":
            applicationDetails?.ReqLoanAmt__c?.substring(0, 2) +
            " lac",
          "Number of Dependents":
            11,
          "Residential Stability": "",
          "Cibil Score": 846,
          "DPD Status": true,
          "Business Vintage": 2,
          "Net Asset": loanDetails?.totalAsset,
          "Total Score": 90,
          "Number of Enquiries in the last 6 months": 2,
          "Eligible Status": "Not Eligible", //Not Eligible
          "Eligible Loan Amount": "45 lac",
          "Customer Segment": applicationDetails?.Customer_Profile__c,
          "Employment Stability": 1,
          Qualification: "BCA",
          Parameter: 1,
          'Eligible Status': "Eligible"
        };

        let loanDetail = { ...loanData };
        loanDetail.eligibilityDetails = { ...data };

        console.log("hari>>>>loanDetail", loanDetail)
        try {
          await saveApplicationData({ ...loanDetail });
          resolve(loanDetail);
        } catch (error) {
          log("hari>>>>elgible error", error)
          reject(error);
        }

      });
    },
  });

  return mutate;
};

export const getHomeScreenCarousel = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              uri: "https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg",
            },
            {
              uri: "https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg",
            },
            {
              uri: "https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg",
            },
          ];
          // const data = [
          //   {
          //     type: "asset",
          //     uri: require("../../src/assets/ad2.png"),
          //   },
          //   {
          //     type: "asset",
          //     uri: require("../../src/assets/AdCardMain.png"),
          //   },
          //   {
          //     type: "asset",
          //     uri: require("../../src/assets/ad1.png"),
          //   },
          // ];
          resolve(data);
          // reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getHomeScreenOurServices = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              key: "EMI calculators",
              title: "EMI Calculators",
              image: require("../../assets/images/Calculators.png"),
            },
            {
              key: "applyForLoan",
              title: "Apply For Loan",
              image: require("../../assets/images/applyForLoan.png"),
            },
            {
              key: "statusCheck",
              title: "Status Check",
              image: require("../../assets/images/StatusCheck.png"),
            },
            {
              key: "RaiseTicket",
              title: "Raise Ticket",
              image: require("../../assets/images/RaiseTicket.png"),
            },
            {
              key: "Myticket",
              title: "My ticket",
              image: require("../../assets/images/MyTickett.png"),
            },
            {
              key: "FAQs",
              title: "FAQs",
              image: require("../../assets/images/FAQ.png"),
            },
            {
              key: "Services",
              title: "Services",
              image: require("../../assets/images/FAQ.png"),
            },
          ];
          resolve(data);

        }, 100);
      });
    },
  });

  return mutate;
};

export const getFAQDetails = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              id: "quest-1",
              title: "Questions related to Home Loan:",
              value:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet dictum sit amet justo donec enim diam. Morbi non arcu risus quis varius quam quisque. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Arcu non odio euismod lacinia. Pharetra et ultrices neque ornare. Risus sed vulputate odio ut enim blandit. Ornare suspendisse sed nisi lacus sed viverra tellus in. Sem fringilla ut morbi tincidunt augue interdum velit euismod. Placerat in egestas erat imperdiet sed euismod nisi porta lorem.",
            },
            {
              id: "quest-2",
              title: "Why is it important to have a good credit score?",
              value:
                "If you have a good credit score, the chances of you being offered the loan at a low interest rate are quite high. Your credit score indicates your creditworthiness and your repayment ability. If you are looking to apply for a personal loan, it is advisable to maintain a credit score that is over 750. Individuals with a very low credit score may be denied a loan altogether, while those with a moderate credit score may be offered a personal loan, but at a high interest rate.",
            },
            {
              id: "quest-3",
              title: "Questions related to this app:",
              value:
                "Auctor eu augue ut lectus arcu bibendum. Amet volutpat consequat mauris nunc congue nisi vitae suscipit. Et malesuada fames ac turpis egestas sed. Mi bibendum neque egestas congue. Leo a diam sollicitudin tempor id eu nisl nunc mi. Curabitur gravida arcu ac tortor. Scelerisque purus semper eget duis at. At augue eget arcu dictum varius duis. Laoreet non curabitur gravida arcu ac tortor dignissim. Nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Euismod lacinia at quis risus sed vulputate odio ut. Volutpat consequat mauris nunc congue nisi vitae.",
            },
            {
              id: "quest-4",
              title: "Questions related to support:",
              value:
                "Sed augue lacus viverra vitae congue eu. Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Ac auctor augue mauris augue neque gravida in fermentum et. Pharetra et ultrices neque ornare aenean euismod elementum. Risus pretium quam vulputate dignissim suspendisse in est. Justo nec ultrices dui sapien eget mi proin sed libero. Nulla aliquet porttitor lacus luctus. Faucibus ornare suspendisse sed nisi lacus. Viverra aliquet eget sit amet tellus. At elementum eu facilisis sed odio morbi. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Dolor sit amet consectetur adipiscing. Pharetra massa massa ultricies mi quis hendrerit. Ultricies mi quis hendrerit dolor magna. Leo integer malesuada nunc vel risus commodo viverra maecenas accumsan.",
            },
          ];
          resolve(data);
          // reject("Something went wrong");
        }, 1000);
      });
    },
  });

  return mutate;
};
export const getRaiseTicketsScreenCategory = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              key: "Query",
              title: "Query",
              image: require("../../assets/images/warning.png"),
            },
            {
              key: "Request",
              title: "Request",
              image: require("../../assets/images/chat.png"),
            },
            {
              key: "Complaint",
              title: "Complaint",
              image: require("../../assets/images/query.png"),
            },
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getRaiseTicketsListScreen = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            { title: "QUERY", options: ["Query 1", "Query 2", "Query 3"] },
            {
              title: "REQUEST",
              options: ["Request 1", "Request 2", "Request 3"],
            },
            {
              title: "COMPLAINT",
              options: ["Complaint 1", "Complaint 2", "Complaint 3"],
            },
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getOtherKycList = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              id: "1",
              title: "Driving License",
            },
            {
              id: "2",
              title: "Passport",
            },
            {
              id: "3",
              title: "Voter ID",
            },
            {
              id: "4",
              title: "NREGA Card",
            },
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getTempAddressKycList = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              id: "1",
              title: "Electricity Bill",
            },
            {
              id: "2",
              title: "Gas Bill",
            },
            {
              id: "3",
              title: "Mobile Bill",
            },
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getListOfTickets = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              status: 0, // 0 for in process and 1 for resolved
              ticket_no: 210,
              title: "RM Not Responding",
              description: "RM is not attending my concerns and queries.",
              image_url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFHsQQrrFRJ9nccLjDbT8OSLsbXzeLe3rQrEHn1FPzrA&s",
            },
            {
              status: 1,
              ticket_no: 214,
              title: "Query",
              description: "Subject to be placed on the case.",
              image_url:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFHsQQrrFRJ9nccLjDbT8OSLsbXzeLe3rQrEHn1FPzrA&s",
              resolvedBy: "Dixit Ukani",
              resolvedAt: 1684855139, // date in epoch time
              rating: 4,
            },
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
      });
    },
  });

  return mutate;
};
export const createTicketMethod = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (ticketData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = { success: true, response: ticketData };
          resolve(data);
          // reject('Something went wrong')
        }, 3000);
      });
    },
  });

  return mutate;
};

export const uploadAdhaarMethod = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (AdhaarData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = { success: true, response: AdhaarData };
          resolve(data);
          // reject('Something went wrong')
        }, 3000);
      });
    },
  });

  return mutate;
};

export const uploadKycMethod = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (AdhaarData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = { success: true, response: AdhaarData };
          resolve(data);
          // reject('Something went wrong')
        }, 3000);
      });
    },
  });

  return mutate;
};

export const uploadOtpMethod = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (OtpData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = { success: true, response: OtpData };
          resolve(data);
          // reject('Something went wrong')
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getUserDetailQuery = (error = false) => {
  const query = useQueries({
    queries: [
      {
        queryKey: ["applicationDetailsQuery"],
        queryFn: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (error) {
                reject({ message: "Some error occured" });
              } else {
                resolve({
                  userId: "USER-12",
                  mobileNumber: "7007863331",
                  email: "vaibhav@gmail.com",
                  dob: "19/08/1992",
                  phone: "+91-9768787667",
                  pan: "CHIPA7867J",
                  firstName: "Vaibhav",
                  lastName: "Sharma",
                  profile:
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
                });
              }
            }, 2000);
          }),
      },
    ],
  });

  return query;
};

export const getQueryDetailsById = (id, isSuccess = true) => {
  const query = useQueries({
    queries: [
      {
        queryKey: ["queryDetails" + id],
        queryFn: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              if (isSuccess) {
                resolve({
                  queryId: id,
                  title: "Home Loan",
                  description:
                    "Home loan has not been processed yet, submitted all the details on 23rd April 2024",
                  ticketId: 214,
                  status: [
                    {
                      title: "Complaint Raised",
                      createdAt: "2024-03-30T00:00:00.000Z",
                      description: "Your Complaint has been raised at 2:32 PM",
                    },
                    {
                      title: "Task Assigned",
                      createdAt: "2024-04-01T00:00:00.000Z",
                      description:
                        "Admin has assigned the task to Bhavesh Rao who will attend your complaint around 3:00 PM",
                    },
                    {
                      title: "Process started",
                      createdAt: "2024-04-03T00:00:00.000Z",
                      description:
                        "Mr. Bhavesh Rao has started attending your complaint at 3:00 PM",
                    },
                    {
                      title: "Complaint Resolved",
                      createdAt: "2024-04-06T00:00:00.000Z",
                      description:
                        "Complaint was successfully attended and resolved at 6:32 PM",
                    },
                  ],
                  rating: 3,
                });
              } else {
                reject({ error: "Some error occured" });
              }
            }, 2000);
          }),
      },
    ],
  });

  return query;
};

export const verifyPanApi = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      console.log({ data });
      const { panNumber, success = true } = data;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (success) {
            resolve({ valid: true, message: "Pan is valid", panNumber });
          } else {
            reject({ message: "Pan is not valid", panNumber });
          }
        }, 3000);
      });
    },
  });

  return mutate;
};

export const submitPanApi = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      const { panNumber, success = true } = data;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (success) {
            resolve({ valid: true, message: "Pan is valid", panNumber });
          } else {
            reject({ message: "Pan is not valid", panNumber });
          }
        }, 3000);
      });
    },
  });

  return mutate;
};

export const getApplicationDetailsForm = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fieldArray = await getLeadFields();

          const mock_data = [


            {
              id: "RM__c",
              label: "RM Name",
              type: component.textInput,
              placeHolder: "Select User",
              validations: validations.required,
              maxLength: 10,
              // keyboardtype: "numeric",
              isRequired: true,
              data: GetPicklistValues(fieldArray, "RM_SM_Name__c"),
              value: "",
              isDisabled: true,
            },
            // not mention
            // {
            //   id: "applicationType",
            //   label: "Applicant Type",
            //   type: component.textInput,
            //   placeHolder: "Applicant Type",
            //   validations: validations.text,
            //   isRequired: false,
            //   value: "",
            // },
            {
              id: "Customer_Profile__c",
              label: "Customer Profile",
              type: component.dropdown,
              placeHolder: "Select Customer Profile",
              validations: validations.text,
              maxLength: 10,
              keyboardtype: "numeric",
              isRequired: true,
              data: GetPicklistValues(fieldArray, "Customer_Profile__c", [
                {
                  id: "Customer_Profile__1",
                  label: "Salf-Employed",
                  value: "Salf-Employed",
                },
                {
                  id: "Customer_Profile__2",
                  label: "Salaried",
                  value: "Salaried",
                },
              ]),
              value: {},
            },
            {
              id: "FirstName",
              label: "First Name",
              type: component.textInput,
              placeHolder: "Enter first Name",
              validations: validations.name,
              isRequired: true,
              value: "",
            },
            {
              id: "MiddleName",
              label: "Middle Name",
              type: component.textInput,
              placeHolder: "Enter middle Name",
              validations: validations.nameWithoutRequired,
              isRequired: false,
              value: "",
            },
            {
              id: "LName__c",
              label: "Last Name",
              type: component.textInput,
              placeHolder: "Enter last Name",
              validations: validations.name,
              isRequired: true,
              maxLength: 255,
              value: "",
            },
            // not mention
            // {
            //   id: "dob",
            //   label: "Date of Birth",
            //   type: component.datetime,
            //   placeHolder: "DD-MM-YYYY",
            //   validations: validations.text,
            //   isRequired: false,
            //   value: "",
            //   datepickerProps: {
            //     minimumDate: getDateYearsBack(18),
            //     maximumDate: getDateYearsBack(100),
            //   },
            // },
            // missing from backend
            {
              id: "MobNumber__c",
              label: "Mobile number",
              type: component.textInput,
              placeHolder: "Enter mobile number",
              validations: validations.phone,
              isRequired: true,
              value: "",
              isDisabled: true,
              maxLength: 10,
            },
            {
              id: "AltMobile__c",
              label: "Alternate mobile number",
              type: component.textInput,
              placeHolder: "Enter alternate mobile number",
              validations: validations.phoneWithoutRequired,
              isRequired: false,
              value: "",
              keyboardtype: "numeric",
              maxLength: 10,
            },
            // missing from backend
            {
              id: "EmailId__c",
              label: "Email",
              type: component.textInput,
              placeHolder: "Enter email",
              validations: validations.email,
              isRequired: false,
              value: "",
              isDisabled: true,
            },
            // no data in picklist from backend
            {
              id: "Product__c",
              label: "Product",
              type: component.dropdown,
              placeHolder: "Select product",
              validations: validations.text,
              maxLength: 10,
              // keyboardtype: "numeric",
              isRequired: true,
              data: GetPicklistValues(fieldArray, "Product__c", [
                {
                  id: "product_type_1",
                  label: "HOUSING LOAN",
                  value: "HOUSING LOAN",
                },

                {
                  id: "product_type_2",
                  label: "NON HOUSING LOAN",
                  value: "NON HOUSING LOAN",
                },
              ]),
              value: {},
            },

            {
              id: "ReqTenInMonths__c",
              label: "Requested tenure in Months",
              type: component.textInput,
              placeHolder: "Enter requested tenure in months",
              validations: validations.numberOnly,
              isRequired: false,
              keyboardtype: "numeric",
              value: "",
            },

            {
              id: "ReqLoanAmt__c",
              label: "Requested loan amount",
              type: component.textInput,
              placeHolder: "Enter required loan amount",
              validations: validations.currency,
              keyboardtype: "numeric",
              isRequired: true,
              value: "",
            },

            {
              id: "PropertyIdentified__c",
              label: "Property Identified?",
              type: component.dropdown,
              placeHolder: "Select answer",

              isRequired: false,
              data: GetPicklistValues(fieldArray, "Property_Identified__c", [
                {
                  id: "propertyIdentified_type_1",
                  label: "Yes",
                  value: "Yes",
                },

                {
                  id: "propertyIdentified_type_2",
                  label: "No",
                  value: "No",
                },
              ]),
              value: {},
            },
            // missing from backend
            {
              id: "Present_Accomodation__c",
              label: "Present Accommodation",
              type: component.dropdown,
              placeHolder: "Select Present Accommodation",
              validations: validations.text,
              isCheckboxType: true,
              isRequired: true,
              data: GetPicklistValues(fieldArray, "Present_Accomodation__c", [
                {
                  id: "presentAccommodation_type_1",
                  label: "Employer123",
                  value: "Employer123",
                },

                {
                  id: "presentAccommodation_type_2",
                  label: "Family",
                  value: "Family",
                },
                {
                  id: "presentAccommodation_type_3",
                  label: "Owned",
                  value: "Owned",
                },
                {
                  id: "presentAccommodation_type_4",
                  label: "Rented More than 5 years",
                  value: "Rented More than 5 years",
                },
                {
                  id: "presentAccommodation_type_5",
                  label: "Rented Less than Equal to 5 Years",
                  value: "Rented Less than Equal to 5 Years",
                },
              ]),
              value: {},
            },
            // missing from backend
            {
              id: "Period_of_stay__c",
              label: "Period of stay",
              type: component.textInput,
              placeHolder: "YYMM",
              validations: validations.yyMMDate,
              isRequired: true,
              value: "",
              maxLength: 4,
            },
            //  missing from backend
            {
              id: "If_rented_rent_per_month__c",
              label: "Rent per month",
              type: component.textInput,
              placeHolder: "Rent per month",
              validations: validations.numberOnly,
              isRequired: true,
              keyboardtype: "numeric",
              value: "",
            },
            // missing from backend
            {
              id: "Employment_experience__c",
              label: "Employment experience",
              type: component.textInput,
              placeHolder: "YYMM",
              maxLength: 4,
              validations: validations.yyMMDate,
              isRequired: true,
              value: "",
            },
            // missing from backend
            {
              id: "Total_Work_Experience__c",
              label: "Total Work experience",
              type: component.textInput,
              placeHolder: "YYMM",
              validations: validations.yyMMDate,
              isRequired: true,
              maxLength: 4,
              value: "",
            },
            // missing from backend

            // missing from backend
            {
              id: "No_of_Family_Dependants_Children__c",
              label: "No of Family Dependants -Children",
              type: component.textInput,
              placeHolder: "Enter No of Family Dependant Children",
              validations: validations.numberOnlyRequired,
              isRequired: true,
              keyboardtype: "numeric",
              value: "",
            },
            // missing from backend
            {
              id: "No_of_Family_Dependants_Other__c",
              label: "No of Family Dependants -Other",
              type: component.textInput,
              placeHolder: "Enter No of Family Dependants -Other",
              validations: validations.numberOnlyRequired,
              isRequired: true,
              keyboardtype: "numeric",
              value: "",
            },

            {
              id: "Number_of_Family_Dependants__c",
              label: "Number of Family Dependants",
              type: component.textInput,
              placeHolder: "Enter Family Dependant",
              validations: validations.numberOnlyRequired,
              isRequired: true,
              isDisabled: true,
              keyboardtype: "numeric",
              value: "",
            },
            // missing from backend
            {
              id: "Total_Business_Experience__c",
              label: "Total Business experience",
              type: component.textInput,
              placeHolder: "YYMM",
              validations: validations.yyMMDate,
              isRequired: true,
              maxLength: 4,
              value: "",
            },

            {
              id: "Address__c",
              label: "Address",
              type: component.textInput,
              placeHolder: "Enter address",
              validations: validations.text,
              isRequired: true,
              value: "",
              isMultiline: true,
            },

            {
              id: "Pincode__c",
              label: "Pincode",
              type: component.textInput,
              placeHolder: "Enter Pincode",
              validations: validations.numberOnlyRequired,
              isRequired: true,
              value: data?.PinCode__r?.PIN__c,
              keyboardtype: "numeric",
              isDisabled: true,
            },
          ];
          resolve([...mock_data]);
        } catch (error) {
          reject(error)
        }
      });
    },
  });
  return mutate;
};

export const useSubmitApplicationFormData = (pincodeData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise(async (resolve, reject) => {


        try {
          // lead create
          const leadcreateResponse = await postObjectData("Lead", getLeadCreationRequest(data))
          if (leadcreateResponse && leadcreateResponse.id) {
            // make the dedupe call
            const dedupeRes = await DedupeApi(leadcreateResponse?.id);
            if (dedupeRes && (dedupeRes === "Dedupe failed" || dedupeRes === "EXACT_MATCH")) {
              reject("Not able to create the loan");
            } else {

              // loan create

              const response = await compositeRequest(createLoanAndAppplicantCompositeRequest(data, leadcreateResponse?.id))
              if (response) {
                //log("compositeRequestResponse>>>", JSON.stringify(compositeRequestResponse))
                const loanId = response?.compositeResponse?.[0]?.body?.id
                const applicationId = response?.compositeResponse?.[1]?.body?.id

                const defaultData = soupConfig.applicationList.default
                defaultData.loanId = loanId
                defaultData.applicationDetails = { ...data, Applicant__c: applicationId, Id: loanId ,
                  Lead__c: leadcreateResponse?.id
                }

                console.log("application Data", defaultData)

                await saveApplicationData(defaultData)
                resolve({ ...defaultData })
              }



            }



          }

          // loan creation


        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }

        // make the leadCreation API










        //  await saveApplicationData(defaultData);
        // setTimeout(() => {
        //   //resolve({ ...defaultData });
        //   reject(ErrorConstants.SOMETHING_WENT_WRONG)
        // }, 3000);
        //





        // reject(ErrorConstants.SOMETHING_WENT_WRONG)
      });
    },
  });

  return mutate;
};

export const useSubmitLoanFormData = (loanData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise(async (resolve, reject) => {
        let loanDetail = { ...loanData };
        loanDetail.loanDetails = { ...data };
        try {
          await saveApplicationData(loanDetail);
          resolve({ ...loanDetail });
        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });

  return mutate;
};

export const useSubmitPanForm = (loanData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise(async (resolve, reject) => {
        let loanDetail = { ...loanData };
        loanDetail.panDetails = data;
        try {
          await saveApplicationData(loanDetail);
          resolve({ ...loanDetail });
        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });

  return mutate;
};

export const getServiceForm = () => {
  const queryRes = useQueries({
    queries: [
      {
        queryKey: ["serviceForm"],
        queryFn: () =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const data = [
                {
                  id: "MainServiceRequest",
                  label: "Service Request",
                  type: component.dropdown,
                  placeHolder: "Service Request",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "MakePaymentService",
                      label: "Make Payment",
                      value: "MakePayment",
                    },
                    {
                      id: "ViewStatementRequest-service",
                      label: "View Statement/Request",
                      value: "ViewStatementRequest",
                    },
                    {
                      id: "RecentTransactions-service",
                      label: "Recent Transactions",
                      value: "recentTransaction",
                    },
                    {
                      id: "ServiceRequest",
                      label: "Service Request",
                      value: "ServiceRequest",
                    },
                    {
                      id: "ViewDocuments",
                      label: "View Documents",
                      value: "ViewDocuments",
                    },
                  ],
                  value: {},
                },
                {
                  id: "MakePayment",
                  label: "Make Payment",
                  type: component.dropdown,
                  placeHolder: "Make Payment",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "PartPayment",
                      label: "Part Payment",
                      value: "Part Payment",
                    },
                    {
                      id: "AdvanceEMI",
                      label: "Advance EMI",
                      value: "Advance EMI",
                    },
                    {
                      id: "OverduePayments",
                      label: "Overdue Payments",
                      value: "Overdue Payments",
                    },
                    {
                      id: "EMI/PEMI",
                      label: "EMI/PEMI",
                      value: "EMI/PEMI",
                    },
                    {
                      id: "OtherCharges",
                      label:
                        "Other Charges - Technical Fees/Field Visit Charges",
                      value:
                        "Other Charges - Technical Fees/Field Visit Charges",
                    },
                  ],
                  value: {},
                },
                {
                  id: "ViewStatementRequest",
                  label: "View Statement/Request",
                  type: component.dropdown,
                  placeHolder: "View Statement/Request",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "StatementofAccount",
                      label: "Statement of Account",
                      value: "Statement of Account",
                    },
                    {
                      id: "WelcomeLetter",
                      label: "Welcome Letter",
                      value: "Welcome Letter",
                    },
                    {
                      id: "RepaymentSchedule",
                      label: "Repayment Schedule",
                      value: "Repayment Schedule",
                    },
                    {
                      id: "ProvisionalInterestCertificate",
                      label: "Provisional Interest Certificate",
                      value: "Provisional Interest Certificate",
                    },
                    {
                      id: "InterestCertificate",
                      label: "Interest Certificate",
                      value: "Interest Certificate",
                    },
                    {
                      id: "LoginFee",
                      label: "Login Fee",
                      value: "Login Fee",
                    },
                    {
                      id: "AdminFeeReceipts",
                      label: "Admin Fee Receipts",
                      value: "Admin Fee Receipts",
                    },
                    {
                      id: "Last6EMIReceipts",
                      label: "Last 6 EMI Receipts",
                      value: "Last 6 EMI Receipts",
                    },
                    {
                      id: "PartPaymentReceipts",
                      label: "Part Payment Receipts",
                      value: "Part Payment Receipts",
                    },
                    {
                      id: "ForeclosureLetter",
                      label: "Foreclosure Letter",
                      value: "Foreclosure Letter",
                    },
                    {
                      id: "LOD",
                      label: "LOD",
                      value: "LOD",
                    },
                  ],
                  value: {},
                },
                {
                  id: "recentTransaction",
                  label: "Recent Transactions",
                  type: component.dropdown,
                  placeHolder: "Recent Transactions",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "All-the-Latest-3-Months-Transactions",
                      label: "All the Latest 3 Months Transactions",
                      value: "All the Latest 3 Months Transactions",
                    },
                  ],
                  value: {},
                },

                {
                  id: "ServiceRequest",
                  label: "Service Request",
                  type: component.dropdown,
                  placeHolder: "Service Request",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "ForeclosureRequest",
                      label: "Foreclosure Request",
                      value: "Foreclosure Request",
                    },
                    {
                      id: "LOD",
                      label: "LOD",
                      value: "LOD",
                    },
                    {
                      id: "LifeInsurancePolicy",
                      label: "Life Insurance Policy",
                      value: "Life Insurance Policy",
                    },
                    {
                      id: "PropertyInsurancePolicy",
                      label: "Property Insurance Policy",
                      value: "Property Insurance Policy",
                    },
                    {
                      id: "TrancheDisbursementRequest",
                      label: "Tranche Disbursement Request",
                      value: "Tranche Disbursement Request",
                    },
                    {
                      id: "TopUpLoan",
                      label: "Top Up Loan",
                      value: "Top Up Loan",
                    },
                    {
                      id: "NewLoan",
                      label: "New Loan",
                      value: "New Loan",
                    },
                    {
                      id: "RepaymentAccountChange",
                      label: "Repayment Account Change",
                      value: "Repayment Account Change",
                    },
                    {
                      id: "MobileNumberChange",
                      label: "Mobile Number Change",
                      value: "Mobile Number Change",
                    },
                    {
                      id: "AddressChange",
                      label: "Address Change",
                      value: "Address Change",
                    },
                    {
                      id: "DemiseIntimation",
                      label: "Demise Intimation",
                      value: "Demise Intimation",
                    },
                    {
                      id: "InsuranceClaimRequest",
                      label: "Insurance Claim Request",
                      value: "Insurance Claim Request",
                    },
                    {
                      id: "OtherRequests",
                      label: "Other Requests",
                      value: "Other Requests",
                    },
                  ],
                  value: {},
                },

                {
                  id: "ViewDocuments",
                  label: "View Documents",
                  type: component.dropdown,
                  placeHolder: "View Documents",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "SanctionLetter",
                      label: "Sanction Letter",
                      value: "Sanction Letter",
                    },
                    {
                      id: "EApplicationForm",
                      label: "E Application Form",
                      value: "E Application Form",
                    },
                    {
                      id: "EAgreement",
                      label: "E Agreement",
                      value: "E Agreement",
                    },
                    {
                      id: "MITC",
                      label: "MITC",
                      value: "MITC",
                    },
                    {
                      id: "DRF",
                      label: "DRF",
                      value: "DRF",
                    },
                    {
                      id: "KeyFactSheet",
                      label: "Key Fact Sheet",
                      value: "Key Fact Sheet",
                    },
                  ],
                  value: {},
                },

                {
                  id: "LoanNumber",
                  label: "Select your Loan Number",
                  type: component.dropdown,
                  placeHolder: "Loan Number",
                  validations: validations.text,
                  keyboardtype: "numeric",
                  isRequired: true,
                  data: [
                    {
                      id: "123456789",
                      label: "123456790",
                      value: "123456790",
                    },
                    {
                      id: "ABCDEFGHI",
                      label: "ABCDEFGHI",
                      value: "ABCDEFGHI",
                    },
                  ],
                  value: {},
                },
              ];
              resolve(data);
            }, 2000);
          }),
      },
    ],
  });

  return queryRes;
};

export const useSubmitServiceForm = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ...data });
          toast("success", "Otp send to register mobile number");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const useVerifyOtpService = (onSuccess = (data) => { }) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          onSuccess(data);
          resolve({ ...data });
          toast("success", "Otp verified successfully");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const useResendOtpService = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ ...data });
          toast("success", "Otp sent successfully");
        }, 3000);
      });
    },
  });

  return mutate;
};

export const useSaveSelfie = (loanData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (selfie) => {
      return new Promise(async (resolve, reject) => {
        let data = { ...loanData };
        data.selfieDetails = { ...selfie };
        log("data>>", data)

        try {
          const response = await saveApplicationData(data);
          resolve(data);
        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });

  return mutate;
};

export const useKycDocument = (loanData) => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise(async (resolve, reject) => {
        let data = { ...loanData };
        data.currentAddressDetails = {
          address: loanData?.adhaarDetails?.address?.splitAddress,
          fullAddress: loanData?.adhaarDetails?.address?.combinedAddress,
        };
        console.log('FULL ADDRESS', data.currentAddressDetails)
        try {
          await saveApplicationData(data);
          resolve(data);
        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      });
    },
  });

  return mutate;
};


export const getAllRawData = () => {
  const mutate = useMutation({
    networkMode: 'online',
    mutationFn: () => {
      let compositeRequest = [];

    }
  })
}

export const getLoanDetailsForm = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async (data) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fieldArray = await getLeadFields();

          const mock_data = [
            {
              id: "ReqLoanAmt__c",
              label: "Requested loan amount",
              type: component.textInput,
              placeHolder: "Enter required loan amount",
              validations: validations.currency,
              keyboardtype: "numeric",
              isRequired: true,
              value: "",
            },

            {
              id: "ReqTenInMonths__c",
              label: "Requested tenure in Months",
              type: component.textInput,
              placeHolder: "Enter requested tenure in months",
              validations: validations.numberOnly,
              isRequired: true,
              keyboardtype: "numeric",
              value: "",
            },


            {
              id: LOAN_DETAILS_KEYS.loanPurpose,
              label: "Loan Purpose",
              type: component.textInput,
              placeHolder: "Select Loan Purpose",
              isRequired: true,
              validations: {
                ...validations.required,
              },
              data: [

              ],
              value: {},
            },


            {
              id: "MobNumber__c",
              label: "Mobile number",
              type: component.textInput,
              placeHolder: "Enter mobile number",
              validations: validations.phone,
              isRequired: true,
              value: "",
              isDisabled: true,
              maxLength: 10,
            },

            {
              id: LOAN_DETAILS_KEYS.isExistingCustomer,
              label: "Existing Customer",
              type: component.dropdown,
              placeHolder: "Select Existing Customer",
              isRequired: true,
              validations: {
                ...validations.required,
              },
              data: [
                {
                  id: "existCustomer-y",
                  label: "Yes",
                  value: "yes",
                },
                {
                  id: "existCustomer-n",
                  label: "No",
                  value: "no",
                },
              ],
              value: {},
            },

            {
              id: LOAN_DETAILS_KEYS.custId,
              label: "Customer ID",
              type: component.number,
              placeHolder: "Enter Customer ID",
              value: 0,
              keyboardtype: "numeric",
              validations: validations.numberOnly,
            },
            {
              id: LOAN_DETAILS_KEYS.bankBalance,
              label: "Bank Balance",
              type: component.number,
              placeHolder: "Enter Bank Balance",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.immovableProperty,
              label: "Immovable Property",
              type: component.number,
              placeHolder: "Enter value of immovable property",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.currPF,
              label: "Current balance in Pf",
              type: component.number,
              placeHolder: "Enter Current balance in Pf",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.valShareSecr,
              label: "Value of shares and securities",
              type: component.number,
              placeHolder: "Enter Value of shares and securities",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.fd,
              label: "Fixed Deposits",
              type: component.number,
              placeHolder: "Enter Fixed Deposits",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.invPlantMachVehi,
              label: "Investment in Plants /Machinery/Vehicles",
              type: component.number,
              placeHolder: "Enter Investment in Plants /Machinery/Vehicles",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.ownContri,
              label: "Own Contribution",
              type: component.number,
              placeHolder: "Enter Own Contribution",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.assetVal,
              label: "Other Asst Value",
              type: component.number,
              placeHolder: "Enter Other Asst Value",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.totalAsset,
              label: "Total Assets",
              type: component.number,
              placeHolder: "Enter Total Assets",
              value: 0,
              keyboardtype: "numeric",
              // isRequired: true,
              // validations: { ...validations.numberOnly, ...validations.required },
              isDisabled: true,
            },
            {
              id: LOAN_DETAILS_KEYS.amtConstructPurchase,
              label: "Amount spent for Construction/Purchase",
              type: component.number,
              placeHolder: "Enter Amount spent for Construction/Purchase",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.savings,
              label: "Savings",
              type: component.number,
              placeHolder: "Enter Savings",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.dispAsset,
              label: "Disposal of Asset",
              type: component.number,
              placeHolder: "Enter Disposal of Asset",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.familyFund,
              label: "Fund from Family",
              type: component.number,
              placeHolder: "Enter Fund from Family",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.srvcFund,
              label: "Fund from other services",
              type: component.number,
              placeHolder: "Enter Fund from other services",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.totalIncome,
              label: "Total Income",
              type: component.number,
              placeHolder: "Enter Total Income",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.totalObligation,
              label: "Total Obligation",
              type: component.number,
              placeHolder: "Enter Total Obligation",
              value: 0,
              keyboardtype: "numeric",
              isRequired: true,
              validations: { ...validations.numberOnly, ...validations.required },
            },
            {
              id: LOAN_DETAILS_KEYS.resAddr,
              label: "Residential Address",
              type: component.textInput,
              placeHolder: "Enter Residential Address",
              value: "",
              isMultiline: true,
              isDisabled: true
            },
            {
              id: LOAN_DETAILS_KEYS.currAddr,
              label: "Current Address",
              type: component.textInput,
              placeHolder: "Enter Current Address",
              value: "",
              isMultiline: true,
              isDisabled: true
            },





          ];
          resolve([...mock_data]);
        } catch (error) {
          reject(error)

        }
      });
    },
  });
  return mutate;
};

export const getSanctionPdf = (loanData) => {

  const mutate = useMutation({
    networkMode: 'always',
    mutationFn: () => {
      return new Promise(async (resolve, reject) => {
        let data = { ...loanData };
        data.sanctionDetails = {
          "sanctioned": "true",
        };

        try {
          console.log("data>>>", "success")
          await saveApplicationData(data);
          resolve({ url: "http://www.clickdimensions.com/links/TestPDFfile.pdf" });
        } catch (error) {
          reject(ErrorConstants.SOMETHING_WENT_WRONG);
        }
      })

    }
  })

  return mutate;

}


