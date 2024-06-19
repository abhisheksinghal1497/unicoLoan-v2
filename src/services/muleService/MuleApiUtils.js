import { useMutation } from "@tanstack/react-query";
import instance from "./ApiService";
export const verifyPanApi = () => {
    const mutate = useMutation({
        mutationFn: (body) => {
            return  instance.post('retail-validation-v1/api/pan/status', body)
            }
    });
    return mutate;
}