import { GoogleOutlined } from '@ant-design/icons';
import { faApple, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox } from 'antd';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Card from 'components/Card';
import InputField from 'components/InputField';
import { UserJiraLoginModel } from 'models/usersModel';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'redux/configureStore';
import { usersThunk } from 'redux/thunks/usersThunk';
import { ACCESS_TOKEN, REMEMBER_USER, USER_LOGIN } from 'utils/constants';
import storage from 'utils/storage';
import styles from './styles.module.scss';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Please provide an valid email.').required('Please provide an email.'),
  passWord: Yup.string().min(6, 'Please enter at least 6+ characters.').required('Please provide a password.'),
});

interface Props {}

const SignIn = (props: Props) => {
  const [isRemember, setIsRemember] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Formik
  const initialValues: UserJiraLoginModel = {
    email: '',
    passWord: '',
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: initialValues,
    validationSchema: SignInSchema,
    onSubmit: async (values) => {
      try {
        const response = await dispatch(usersThunk.signIn(values)).unwrap();
        storage.setStorageJson(USER_LOGIN, response);
        storage.setStorageJson(ACCESS_TOKEN, response?.accessToken);
        storage.setStorageJson(REMEMBER_USER, isRemember);
        storage.setCookieJson(USER_LOGIN, response, 30);
        toast.success('Sign in successfully.');
        navigate('/project');
      } catch (err) {
        if (typeof err === 'string') {
          if (err === 'Email không tồn tại !') {
            toast.error('Email does not exist.');
          } else if (err === 'Tài khoản hoặc mật khẩu không đúng !') {
            toast.error('Incorrect email or password.');
          } else {
            toast.error(err);
          }
        } else {
          toast.error('Failed to sign in.');
        }
      }
    },
  });

  return (
    <div className={styles.signInWrapper}>
      <Card className={styles.card}>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.header}>
            <h3>Welcome to Kanban</h3>
            <div>
              <span className={styles.question}>New to Kanban?</span>
              <Button type='link'>
                <Link to='/signup'>Create an account</Link>
              </Button>
            </div>
          </div>

          <div className={styles.body}>
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

            <div className={styles.checkBox}>
              <Checkbox
                checked={isRemember}
                onChange={(e) => setIsRemember(e.target.checked)}
              >
                Remember me
              </Checkbox>

              <Button type='link'>
                <Link to='#'>Forgot password</Link>
              </Button>
            </div>

            <Button
              type='primary'
              block
              htmlType='submit'
              style={{ height: '44px' }}
            >
              Sign In
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

export default SignIn;
