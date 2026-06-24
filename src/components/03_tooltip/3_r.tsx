import cx from './cx';
import data from './data';
import { useRef } from 'react';
import useStyleInsideViewport from '#/hooks/useStyleInsideViewport';

type TooltipProps = {
  text: string;
  description: string;
  id: string;
};

const TooltipItem = ({ text, description, id }: TooltipProps) => {
  const rootRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDetailsElement>(null);
  const style = useStyleInsideViewport(rootRef, targetRef);

  return (
    <span className={cx('tooltip-root')}>
      {text}
      <details className={cx('details')} name="tooltip" ref={rootRef}>
        <summary className={cx('tooltip-trigger')} />
        <span className={cx('tooltip-layer')} style={style} ref={targetRef}>
          {description}
        </span>
      </details>
    </span>
  );
};

const Tooltip3 = () => {
  return (
    <>
      <h3>
        #3. React<sub>화면을 벗어나지 안호록 처리 - 직접계산</sub>
      </h3>
      {data.map((item) => {
        return <TooltipItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default Tooltip3;
