// import { INPUT_VALIDATION_RULES } from "react-hook-form/dist/constants";

export const getErrMsg = (err, fieldname = "value", name = '') => {
  console.log(">>>>>>R",err, {fieldname, name})
  switch (err.type) {
    case "required":
      return `Please enter a valid ${fieldname}`;

    case "minLength":
      //   return `Enterd ${fieldname ? fieldname : "value"} must be more than length`;
      return `Please enter a valid ${fieldname}`;
    case 'validate':
       return err?.message ? err.message : `Please enter a valid ${fieldname}`
    // case INPUT_VALIDATION_RULES.required:
    //   return `Please enter a valid ${fieldname ? fieldname : "value"}`;

    case "custom":
      return err?.message ? err.message : `Please enter a valid ${fieldname}`

    default:
      return `Please enter a valid ${fieldname}`;
  }
};
