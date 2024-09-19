// import { INPUT_VALIDATION_RULES } from "react-hook-form/dist/constants";

function arrangeErrorMessage(obj) {
  // Create an array from the object's entries
  const entries = Object.entries(obj);
  
  // Sort entries based on the keys (the original order)
  const sortedEntries = entries.sort((a, b) => Number(a[0]) - Number(b[0]));
  
  // Concatenate the values into a single string, ignoring the 'ref' object
  const result = sortedEntries
      .filter(entry => entry[0] !== 'ref') // Filter out the 'ref' entry
      .map(entry => entry[1]) // Get the values
      .join(''); // Join them into a string
  
  return result;
}

export const getErrMsg = (err, fieldname = "value", name = '') => {
  console.log(">>>>>>R",err, {fieldname, name})

  if(err && err["0"]){
    console.log('COMING HERE')
    return arrangeErrorMessage(err)
  }

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
