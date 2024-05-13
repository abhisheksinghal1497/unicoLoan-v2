import { UseMutateFunction, useMutation } from "@tanstack/react-query";

export const getHomeScreenDetails = () =>{
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = [
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            tenure: '18/100',
                            nextPayment: '₹ 2,836',
                            paymentDate: '29th April 2024',
                            NextPaymentText: 'Next Payment'
                        },
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            tenure: '18/100',
                            nextPayment: '₹ 2,836',
                            paymentDate: '29th April 2024',
                            NextPaymentText: 'Next Payment'
                        },
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            kyc_Pan: 'PAN and KYC',
                        },
                    ];
                    resolve(data)
                }, 3000)
            }, )
        }
    })

    return mutate
}


export const getAdhaarDetails = (data) =>{
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
           return new Promise((resolve, reject)=>{
                 setTimeout(()=>{
                    resolve(data)
                }, 3000)
            }, )
        }
    })

    return mutate
}


const useAddPlanet = () => {
    const queryClient = useQueryClient();
    queryClient.setMutationDefaults(["add-planet"], {
      mutationFn: (data) => addPlanet(data),
      onMutate: async (variables) => {
        const { successCb, errorCb } = variables;
        return { successCb, errorCb };
      },
      onSuccess: (result, variables, context) => {
        if (context.successCb) {
          context.successCb(result);
        }
      },
      onError: (error, variables, context) => {
        if (context.errorCb) {
          context.errorCb(error);
        }
      },
    });
    return useMutation(["add-planet"]);
  };
