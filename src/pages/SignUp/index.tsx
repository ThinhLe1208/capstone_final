import { GoogleOutlined } from '@ant-design/icons';
import { faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Card from 'components/Card';
import InputField from 'components/InputField';
import { UserJiraModel } from 'models/usersModel';
import { useAppDispatch } from 'redux/configureStore';
import { usersThunk } from 'redux/thunks/usersThunk';
import styles from './styles.module.scss';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^([A-Za-z]+)((\s{1}[A-Za-z]+){1,})$/, 'Please provide an valid name.')
    .required('Please provide name.'),
  email: Yup.string().email('Please provide an valid email.').required('Please provide an email.'),
  passWord: Yup.string().min(6, 'Please enter at least 6+ characters.').required('Please provide a password.'),
  phoneNumber: Yup.string()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Please provide a valid phone number.')
    .required('Please provide a phone number.'),
});

interface Props {}

const SignUp = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Formik
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      name: '',
      email: '',
      passWord: '',
      phoneNumber: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async (values: UserJiraModel) => {
      try {
        await dispatch(usersThunk.signUp(values)).unwrap();
        toast.success('Sign up successfully.');
        navigate('/signin');
      } catch (err) {
        if (typeof err === 'string') {
          if (err === 'Email đã được sử dụng!') {
            toast.error('The email has already been taken.');
          } else {
            toast.error(err);
          }
        } else {
          toast.error('Failed to sign up.');
        }
      }
    },
  });

  return (
    <div className={styles.signUpWrapper}>
      <Card className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.header}>
            <h3>Welcome to Kanban</h3>
            <div>
              <span className={styles.question}>Already have an Account?</span>
              <Button type='link'>
                <Link to='/signin'>Sign In</Link>
              </Button>
            </div>
          </div>

          <div className={styles.body}>
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

            <Button
              type='primary'
              block
              htmlType='submit'
              style={{ height: '44px' }}
            >
              Sign Up
            </Button>
          </div>

          <div className={styles.footer}>
            <p className={styles.title}>
              <span>or sign in with</span>
            </p>

            <div className={styles.buttons}>
              <button
                type='button'
                className={styles.button}
              >
                <GoogleOutlined />
              </button>
              <button
                type='button'
                className={styles.button}
              >
                <FontAwesomeIcon icon={faFacebook} />
              </button>
              <button
                type='button'
                className={styles.button}
              >
                <FontAwesomeIcon icon={faApple} />
              </button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
