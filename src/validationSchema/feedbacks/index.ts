import * as yup from 'yup';

export const feedbackValidationSchema = yup.object().shape({
  rating: yup.number().integer().required(),
  comments: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
  booking_id: yup.string().nullable().required(),
});
