import * as yup from 'yup';

export const customerServiceRepresentativeValidationSchema = yup.object().shape({
  availability_status: yup.boolean().required(),
  total_tickets_solved: yup.number().integer().required(),
  average_rating: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
});
