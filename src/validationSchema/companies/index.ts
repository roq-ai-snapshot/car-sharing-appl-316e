import * as yup from 'yup';

export const companyValidationSchema = yup.object().shape({
  description: yup.string().nullable(),
  location: yup.string().nullable(),
  established_year: yup.number().integer().nullable(),
  contact_number: yup.string().nullable(),
  website_url: yup.string().nullable(),
  name: yup.string().required(),
});
