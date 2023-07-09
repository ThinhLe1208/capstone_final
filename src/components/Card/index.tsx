import type { ComponentPropsWithoutRef } from 'react';
import React from 'react';

import styles from './styles.module.scss';

interface Props extends ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<Props> = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={styles.cardWrapper + ' ' + className}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
