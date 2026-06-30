import cx from './cx';
import data from './data';

type TooltipProps = {
  text: string;
  description: string;
  id: string;
};

const TooltipItem = ({ text, description, id }: TooltipProps) => {
  return (
    <span className={cx('tooltip-root')}>
      {text}
      <details className={cx('details', 'anchor')} name="tooltip">
        <summary className={cx('tooltip-trigger')} />
      </details>
      <span className={cx('anchor-target')}>{description}</span>
    </span>
  );
};

const Tooltip4 = () => {
  return (
    <>
      <h3>
        #4. React<sub>anchor positioning</sub>
      </h3>
      {data.map((item) => {
        return <TooltipItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default Tooltip4;
