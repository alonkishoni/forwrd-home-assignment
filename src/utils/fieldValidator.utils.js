import { countryRegex, emailRegex, nameRegex, phoneRegex } from '../consts/consts.js';

export const validateField = (field, value) => {
  const validators = {
    name: (v) => nameRegex.test(v),
    country: (v) => countryRegex.test(v),
    email: (v) => emailRegex.test(v),
    phone: (v) => phoneRegex.test(v),
  };
  return validators[field](value);
};
