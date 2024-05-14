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
                            NextPaymentText: 'Next Payment',
                            ProgressBarPercent: '50'
                        },
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            tenure: '18/100',
                            nextPayment: '₹ 2,836',
                            paymentDate: '29th April 2024',
                            NextPaymentText: 'Next Payment',
                            ProgressBarPercent: '30'
                        },
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            tenure: '18/100',
                            nextPayment: '₹ 2,836',
                            paymentDate: '29th April 2024',
                            NextPaymentText: 'Next Payment',
                            ProgressBarPercent: '75'
                        },
                        {
                            loanTitle: 'Home Loan',
                            lan: 'H402HHL0622560',
                            loanAmount: '₹ 2,836,000',
                            roi: '9.25%',
                            kyc_Pan: 'PAN and KYC',
                            ProgressBarPercent: '0'
                        },
                    ];
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}
export const getEligibilityDetails = () =>{
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = {
                        Product: "Home Loan",
                        "Request Loan Amount": "50 lac",
                        "Cibil Score": 846,
                        "Number of Enquiries in the last 6 months": 2,
                        "Eligible Status": "Eligible",
                        "Eligible Loan Amount": "45 lac",
                      }
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}

export const getHomeScreenCarousel = () =>{
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = [
                        { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
                        { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
                        { uri: 'https://thumbs.dreamstime.com/b/unico-bank-building-marked-treeo-arkansas-unico-bank-building-marked-tree-arkansas-provides-credit-cards-mortgages-commercial-121368162.jpg' },
                      ];
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}

export const getHomeScreenOurServices = () =>{
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = [
                        { key: 'calculators', title: 'Calculators', image: require('../../assets/images/Calculators.png') },
                        { key: 'applyForLoan', title: 'Apply For Loan', image: require('../../assets/images/applyForLoan.png') },
                        { key: 'statusCheck', title: 'Status Check', image: require('../../assets/images/StatusCheck.png') },
                        { key: 'RaiseTicket', title: 'Raise Ticket', image: require('../../assets/images/RaiseTicket.png') },
                        { key: 'Myticket', title: 'My ticket', image: require('../../assets/images/MyTickett.png') },
                        { key: 'FAQs', title: 'FAQs', image: require('../../assets/images/FAQ.png') },
                      ];
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}

export const getRaiseTicketsScreenCategory = () => {
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = [
                        { key: 'Query', title: 'Query', image: require('../../assets/images/warning.png') },
                        { key: 'Request', title: 'Request', image: require('../../assets/images/chat.png') },
                        { key: 'Complaint', title: 'Complaint', image: require('../../assets/images/query.png') },
                    ]
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}

export const getRaiseTicketsListScreen = () => {
    const mutate = useMutation({
        networkMode:"always",
        mutationFn:async()=>{
        
           return new Promise((resolve, reject)=>{
              
                 setTimeout(()=>{
                    const data = [
                        { title: 'QUERY', options: ['Query 1', 'Query 2', 'Query 3'] },
        { title: 'REQUEST', options: ['Request 1', 'Request 2', 'Request 3'] },
        { title: 'COMPLAINT', options: ['Complaint 1', 'Complaint 2', 'Complaint 3'] },
                    ]
                    resolve(data)
                    reject('Something went wrong')
                }, 3000)
            }, )
        }
    })

    return mutate
}