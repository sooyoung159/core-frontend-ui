import cx from './cx';
import data from './data';

type TooltipProps = { id: string; text: string; description: string };

const TooltipItem = ({ text, id, description }: TooltipProps) => {
  return (
    <span className={cx('tooltip-root')}>
      {text}
      <details className={cx('details')} name="tooltip">
        <summary className={cx('tooltip-trigger')} />
        <span className={cx('tooltip-layer')}>{description}</span>
      </details>
    </span>
  );
};

const Tooltip2_3 = () => {
  return (
    <>
      <h3>
        #2-3. React<sub>details와 summary를 사용한 툴팁</sub>
      </h3>
      {data.map((item) => {
        return <TooltipItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default Tooltip2_3;
