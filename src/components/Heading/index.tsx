import React from 'react';

import styles from './styles.module.scss';
import { Breadcrumb, Divider } from 'antd';

type BreadCrumb = {
  title: string | undefined;
  href?: string;
};

type Props = {
  breadCrumbList: BreadCrumb[];
  title: string | undefined;
};

const Heading = ({ breadCrumbList, title }: Props) => {
  return (
    <div className={styles.headingWrapper}>
      <Breadcrumb
        className={styles.breadcrumbs}
        items={breadCrumbList}
        separator='>'
      />

      <h3 className={styles.title}>{title}</h3>

      <Divider />
    </div>
  );
};

export default Heading;
