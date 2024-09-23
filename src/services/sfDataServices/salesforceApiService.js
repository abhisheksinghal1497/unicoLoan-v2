import { useMutation } from "@tanstack/react-query";
import { getLeadFields } from "./saleforceApiUtils";
import { getUserLoggedInfo } from "./salesForceDataUtils";

export const getUserDetails = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: () => {
      return getUserLoggedInfo();
    },
  });
  return mutate;
};

export const makeMetadataApiCall = () => {
  const mutate = useMutation({
    networkMode: "always",
    mutationFn: () => {
      return getLeadFields();
    },
  });

  return mutate;
};
