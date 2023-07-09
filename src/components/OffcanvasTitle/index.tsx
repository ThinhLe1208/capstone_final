import React, { ComponentPropsWithoutRef } from 'react';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  icon: JSX.Element | null;
}

const OffcanvasTitle = ({ children, icon, ...rest }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>{icon}</span>
      <span
        className={styles.text}
        {...rest}
      >
        {children}
      </span>
    </div>
  );
};

export default OffcanvasTitle;
