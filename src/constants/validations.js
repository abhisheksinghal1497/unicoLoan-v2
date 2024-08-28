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
  numberOnlyRequired: {
    required: true,
    pattern: /\d*/,
  },
  name: {
    required: true,
    minLength: 2,
    pattern: /[a-zA-Z]+/,
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
    pattern: /^(?:[0-9]{2})(?:[0-9]{2})$/,
    required: true,
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


