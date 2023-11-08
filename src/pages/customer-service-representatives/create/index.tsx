import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { useRoqClient } from 'lib/roq';
import * as RoqTypes from 'lib/roq/types';

import { customerServiceRepresentativeValidationSchema } from 'validationSchema/customer-service-representatives';
import { UserInterface } from 'interfaces/user';
import { CustomerServiceRepresentativeInterface } from 'interfaces/customer-service-representative';

function CustomerServiceRepresentativeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const roqClient = useRoqClient();
  const handleSubmit = async (values: CustomerServiceRepresentativeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await roqClient.customer_service_representative.create({
        data: values as RoqTypes.customer_service_representative,
      });
      resetForm();
      router.push('/customer-service-representatives');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerServiceRepresentativeInterface>({
    initialValues: {
      availability_status: false,
      total_tickets_solved: 0,
      average_rating: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: customerServiceRepresentativeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Customer Service Representatives',
              link: '/customer-service-representatives',
            },
            {
              label: 'Create Customer Service Representative',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer Service Representative
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl
            id="availability_status"
            display="flex"
            alignItems="center"
            mb="4"
            isInvalid={!!formik.errors?.availability_status}
          >
            <FormLabel htmlFor="switch-availability_status">Availability Status</FormLabel>
            <Switch
              id="switch-availability_status"
              name="availability_status"
              onChange={formik.handleChange}
              value={formik.values?.availability_status ? 1 : 0}
            />
            {formik.errors?.availability_status && (
              <FormErrorMessage>{formik.errors?.availability_status}</FormErrorMessage>
            )}
          </FormControl>

          <NumberInput
            label="Total Tickets Solved"
            formControlProps={{
              id: 'total_tickets_solved',
              isInvalid: !!formik.errors?.total_tickets_solved,
            }}
            name="total_tickets_solved"
            error={formik.errors?.total_tickets_solved}
            value={formik.values?.total_tickets_solved}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_tickets_solved', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Average Rating"
            formControlProps={{
              id: 'average_rating',
              isInvalid: !!formik.errors?.average_rating,
            }}
            name="average_rating"
            error={formik.errors?.average_rating}
            value={formik.values?.average_rating}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('average_rating', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={() => roqClient.user.findManyWithCount({})}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/customer-service-representatives')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'customer_service_representative',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerServiceRepresentativeCreatePage);
