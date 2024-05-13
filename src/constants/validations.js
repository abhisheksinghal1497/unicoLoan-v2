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
  numberOnly: {
    pattern: /\d*/,
  },
  name: {
    required: true,
    minLength: 2,
    pattern: /[a-zA-Z]+/,
  },
};
