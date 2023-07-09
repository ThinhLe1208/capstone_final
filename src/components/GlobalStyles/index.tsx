import React from 'react';

import './styles.scss';

type Props = {
  children: JSX.Element;
};

const GlobalStyles: React.FC<Props> = ({ children }: Props) => {
  return children;
};

export default GlobalStyles;
