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
export const phoneRegex = /^\+\d+$/;
export const countryRegex = new RegExp(`^(${countryOptions.join('|')})$`, 'i');
export const chartColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
