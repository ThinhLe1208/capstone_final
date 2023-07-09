import { useFormik } from 'formik';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import InputField from 'components/InputField';
import { UserJiraModelUpdateModel } from 'models/usersModel';
import { RootState, useAppDispatch } from 'redux/configureStore';
import { usersThunk } from 'redux/thunks/usersThunk';
import styles from './styles.module.scss';

const EditUserSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^([A-Za-z]+)((\s{1}[A-Za-z]+){1,})$/, 'Please provide an valid name.')
    .required('Please provide name.'),
  email: Yup.string().email('Please provide an valid email.').required('Please provide an email.'),
  phoneNumber: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please provide a valid phone number.')
    .required('Please provide a phone number.'),
  passWord: Yup.string().min(6, 'Please enter at least 6+ characters.').required('Please provide a password.'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('passWord')], 'Password confirmation does not match.')
    .required('Please provide a password confirmation.'),
});

interface Props {}

const UserEditForm = forwardRef<HTMLFormElement, Props>((props, ref) => {
  const { userEdit } = useSelector((state: RootState) => state.users);
  const dispatch = useAppDispatch();

  // Formik
  const initialValues: UserJiraModelUpdateModel & { passwordConfirmation: string } = useMemo(() => {
    if (userEdit) {
      return {
        ...userEdit,
        passwordConfirmation: '',
      };
    } else {
      return {
        id: '',
        name: '',
        email: '',
        phoneNumber: '',
        passWord: '',
        passwordConfirmation: '',
      };
    }
  }, [userEdit]);

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: EditUserSchema,
    onSubmit: async (values) => {
      try {
        const { passwordConfirmation, ...editUser } = values;
        await dispatch(usersThunk.editUser(editUser)).unwrap();
        toast.success('Edit a user successfully.');
      } catch (err) {
        toast.success('Failed to edit a user.');
      }
    },
  });

  return (
    <div className={styles.userEditFormWrapper}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        ref={ref}
      >
        <div className={styles.row}>
          <InputField
            label='User ID'
            name='id'
            value={values.id}
            error={errors.id}
            touched={touched.id}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={true}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label='Name'
            name='name'
            value={values.name}
            error={errors.name}
            touched={touched.name}
            placeholder='Steve Paul Jobs'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label='Email'
            name='email'
            value={values.email}
            error={errors.email}
            touched={touched.email}
            placeholder='example.email@gmail.com'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label='Phone Number'
            name='phoneNumber'
            type='tel'
            value={values.phoneNumber}
            error={errors.phoneNumber}
            touched={touched.phoneNumber}
            placeholder='+84123456789'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label='Password'
            name='passWord'
            type='password'
            value={values.passWord}
            error={errors.passWord}
            touched={touched.passWord}
            placeholder='Enter at least 6+ characters'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <div className={styles.row}>
          <InputField
            label='Password confirmation'
            name='passwordConfirmation'
            type='password'
            value={values.passwordConfirmation}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            placeholder='Enter at least 6+ characters'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </form>
    </div>
  );
});

export default UserEditForm;
