export const validations = {
  required: {
    required: true,
  },
  text: {
    required: true,
    minLength: 2,
  },
  phone: {
    required: true,
    pattern: /[6-9]\d{9}/,
  },
  name: {
    required: true,
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
    pattern: /[0-9]{4}[0-9]{4}[0-9]{4}/,
  }
};
