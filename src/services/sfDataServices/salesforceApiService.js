import { useMutation } from "@tanstack/react-query";
import { getLeadFields } from "./saleforceApiUtils";




export const makeMetadataApiCall = () => {
    const mutate = useMutation(

        {
            networkMode: 'always',
            mutationFn: () => {
                return getLeadFields()
            }
            
        }

    )

    return mutate
}