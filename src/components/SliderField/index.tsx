import { Col, Row, Slider } from 'antd';

import styles from './styles.module.scss';

interface Props {
  label: string;
  name: string;
  spentValue: number;
  remainValue?: number;
  estimateValue: number;
  disabled?: boolean;
}

const SliderField = ({ label, name, spentValue, remainValue, estimateValue, disabled = false }: Props) => {
  return (
    <div className={styles.wrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <Slider
        id={name}
        defaultValue={spentValue}
        value={spentValue}
        disabled={disabled}
        min={0}
        max={estimateValue}
      />

      <Row>
        <Col span={12}>
          <p>{spentValue !== 0 ? `${spentValue}h logged` : 'No time logged'}</p>
        </Col>
        <Col span={12}>
          {remainValue && <p style={{ textAlign: 'right' }}>{`${remainValue}h remaining`}</p>}
          {!remainValue && <p style={{ textAlign: 'right' }}>{`${estimateValue - spentValue}h remaining`}</p>}
        </Col>
      </Row>
    </div>
  );
};

export default SliderField;
