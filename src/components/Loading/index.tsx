import React from 'react';

import styles from './styles.module.scss';

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className={styles.bgLoadingWrapper}>
      <img
        src={require('assets/images/loading.png')}
        alt='loading'
      />
    </div>
  );
};

export default Loading;
