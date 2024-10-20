export const countryOptions = [
  'Israel',
  'China',
  'Ukraine',
  'Canada',
  'Brazil',
  'Morocco',
  'France',
  'Japan',
];
export const nameRegex = /^[a-zA-Z]+\s?[a-zA-Z]*$/;
export const emailRegex = /^[^@]+@[^@]+$/;
export const phoneRegex = /^\+[^\+]+$/;
export const countryRegex = new RegExp(`^(${countryOptions.join('|')})$`, 'i');
