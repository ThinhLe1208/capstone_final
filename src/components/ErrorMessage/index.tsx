import React from 'react';

import styles from './styles.module.scss';

type Props = {
  content: string | undefined;
};

const ErrorMessage = ({ content }: Props) => {
  return (
    <div className={styles.errorMessageWrapper}>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

export default ErrorMessage;
