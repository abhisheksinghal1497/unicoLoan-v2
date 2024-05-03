// import { INPUT_VALIDATION_RULES } from "react-hook-form/dist/constants";

export const getErrMsg = (err, fieldname = "value") => {
  switch (err.type) {
    case "required":
      return `Please enter a valid ${fieldname}`;

    case "minLength":
      //   return `Enterd ${fieldname ? fieldname : "value"} must be more than length`;
      return `Please enter a valid ${fieldname}`;

    // case INPUT_VALIDATION_RULES.required:
    //   return `Please enter a valid ${fieldname ? fieldname : "value"}`;

    default:
      return `Please enter a valid ${fieldname}`;
  }
};
