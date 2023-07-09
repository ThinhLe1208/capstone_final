import { Input } from 'antd';
import { ChangeEventHandler, FocusEventHandler } from 'react';

import ErrorMessage from 'components/ErrorMessage';
import styles from './styles.module.scss';

interface Props {
  label?: string;
  name: string;
  value: string | number | undefined;
  error: string | undefined;
  touched: boolean | undefined;
  placeholder?: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

const InputField = ({
  label,
  name,
  value,
  error,
  touched,
  placeholder = '',
  type = 'text',
  onChange,
  onBlur,
  disabled,
}: Props) => {
  return (
    <div className={styles.inputFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <Input
        className={styles.input}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        status={error && touched ? 'error' : ''}
        style={{ width: '100%' }}
        disabled={disabled}
      />
      {error && touched && <ErrorMessage content={error} />}
    </div>
  );
};

export default InputField;
