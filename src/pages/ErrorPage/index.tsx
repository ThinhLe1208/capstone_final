import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from 'antd';

import styles from './styles.module.scss';

type Props = {};

const ErrorPage = (props: Props) => {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPageWrapper}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button
        type='primary'
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ErrorPage;
