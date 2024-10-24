
const validateLength = (value, minLength, maxLength) => {
  const isNumeric = /^[0-9]+$/.test(value);
  return isNumeric && value >= minLength && value <= maxLength;
};

const isOlderThan18 = (value) => {
  try {
    console.log('DATA HERE-----', typeof value, ' ----------------------', {value})
    const today = new Date();
    const birthDate = new Date(value);
    
    if (!value) return "Date is required"; // Check if the date is provided
  
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
  
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1; // Subtract a year if birthday hasn't occurred yet this year
    }
    
    return age >= 18 || "You must be at least 18 years old"; // Return an error message if under 18   
  } catch (error) {
    return  "You must be at least 18 years old";
  }
  
};


export const validations = {
  required: {
    required: true,
  },
  text: {
    required: true,
    minLength: 2,
  },
  otp: {
    required: true,
    minLength: 6,
    pattern: /\d*/,
  },
  otpLogin: {
    required: true,
    minLength: 4,
    pattern: /\d*/,
  },
  phone: {
    required: true,
    pattern: /[6-9]\d{9}/,
  },
  phoneWithoutRequired: {
    pattern: /[6-9]\d{9}/,
  },
  numberOnly: {
    pattern: /\d*/,
  },
  tenureRegex: {
    validate: (value) => validateLength(value, 36, 360) || 'Tenure should be in between 36 to 360',
  },
  isOlderThan18: {
    validate: (value) => isOlderThan18(value) || "Must be at least 18 years old",
  },
  loanAmountRegex: {
    // pattern: /^[0-9]+$/, 
    // minLength: 100000, 
    // maxLength: 20000000, 
    validate: (value) => validateLength(value, 100000, 20000000) || 'Amount should be in between 1 Lakh to 2 Crores',
  },
  numberOnlyRequired: {
    required: true,
    pattern:  /^(0|[1-9]\d*)$/, // Matches non-negative integers (0 or positive)
  },
  numberOnlyRequiredAboveZero: {
    required: true,
    pattern: /^(0|[1-9]\d+)$/, // Matches positive integers (greater than 0)
  },
  name: {
    required: true,
    minLength: 2,
    pattern: /^[a-zA-Z]+$/
  },
  nameWithoutRequired: {
    minLength: 2,
    pattern: /[a-zA-Z]+/,
  },
  pan: {
    required: true,
    maxLength: 10,
    pattern: /[A-Z]{5}[0-9]{4}[A-Z]{1}/,
  },
  aadhar: {
    required: true,
    pattern: /\d*/,
    maxLength: 12,
    minLength: 12
  },
  email: {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

  },
  yyMMDate: {
    validate: (value) => {
      if (!/^[0-9]{4}$/.test(value)) {
        return 'Please enter years and months.';
      }
    
      const lastTwoDigits = value.slice(2);
      if (!/(?:0[0-9]|1[0-1])$/.test(lastTwoDigits)) {
        return 'Months must be between 00 and 11.';
      }
  
      return true;
    },
  },
  currency: {
    pattern: /^\d{1,16}(\.\d{0,2})?$/,
    required: true
  },
  numberWith4digitsAndNoDecimal: {

    pattern: /^ [0 - 9]{ 1, 4}$/,
    required: true
  }
};


