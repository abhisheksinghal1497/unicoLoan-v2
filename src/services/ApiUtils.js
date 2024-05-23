import {
  UseMutateFunction,
  useMutation,
  useQueries,
} from "@tanstack/react-query";

export const getHomeScreenDetails = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = [
            {
              loanTitle: "Home Loan",
              lan: "H402HHL0622560",
              loanAmount: "₹ 2,836,000",
              roi: "9.25%",
              tenure: "18/100",
              nextPayment: "₹ 2,836",
              paymentDate: "29th April 2024",
              NextPaymentText: "Next Payment",
              ProgressBarPercent: "50",
            },
            {
              loanTitle: "Home Loan",
              lan: "H402HHL0622560",
              loanAmount: "₹ 2,836,000",
              roi: "9.25%",
              tenure: "18/100",
              nextPayment: "₹ 2,836",
              paymentDate: "29th April 2024",
              NextPaymentText: "Next Payment",
              ProgressBarPercent: "30",
            },
            {
              loanTitle: "Home Loan",
              lan: "H402HHL0622560",
              loanAmount: "₹ 2,836,000",
              roi: "9.25%",
              tenure: "18/100",
              nextPayment: "₹ 2,836",
              paymentDate: "29th April 2024",
              NextPaymentText: "Next Payment",
              ProgressBarPercent: "75",
            },
            {
              loanTitle: "Home Loan",
              lan: "H402HHL0622560",
              loanAmount: "₹ 2,836,000",
              roi: "9.25%",
              kyc_Pan: "PAN and KYC",
              ProgressBarPercent: "0",
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
export const getEligibilityDetails = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: async () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const data = {
            Product: "Home Loan",
            "Request Loan Amount": "50 lac",
            "Cibil Score": 846,
            "Number of Enquiries in the last 6 months": 2,
            "Eligible Status": "Eligible",
            "Eligible Loan Amount": "45 lac",
          };
          resolve(data);
          reject("Something went wrong");
        }, 3000);
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
          resolve(data);
          reject("Something went wrong");
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
              key: "calculators",
              title: "Calculators",
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
          ];
          resolve(data);
          reject("Something went wrong");
        }, 3000);
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


export const uploadAdhaarMethod = () =>{
  const mutate = useMutation({
      networkMode:"always",
      mutationFn:async(AdhaarData)=>{
      
         return new Promise((resolve, reject)=>{
            
               setTimeout(()=>{
                  const data = {success:true,response:AdhaarData}
                  resolve(data)
                  // reject('Something went wrong')
              }, 3000)
          }, )
      }
  })

  return mutate
}

export const uploadOtpMethod = () =>{
  const mutate = useMutation({
      networkMode:"always",
      mutationFn:async(OtpData)=>{
      
         return new Promise((resolve, reject)=>{
            
               setTimeout(()=>{
                  const data = {success:true,response:OtpDataData}
                  resolve(data)
                  // reject('Something went wrong')
              }, 3000)
          }, )
      }
  })

  return mutate
}

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
      console.log({data})
      const {panNumber, success = true} = data
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
      console.log('DATA 2',{data})
      const {panNumber, success = true} = data
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
