import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';
import useClickOutside from '#/hooks/useClickOutside';

type TooltipProps = {
  text: string;
  description: string;
};

const TooltipDescription = ({
  description,
  handleClose,
}: {
  description: string;
  handleClose: () => void;
}) => {
  const ref = useClickOutside(handleClose);
  return (
    <span className={cx('tooltip-layer')} ref={ref}>
      {description}
    </span>
  );
};

const TooltipItem = ({ text, description }: TooltipProps) => {
  const [isOpen, toggle] = useState(false);
  const handleClick = () => {
    toggle((prev) => !prev);
  };
  const handleClose = () => {
    toggle(false);
  };

  return (
    <span className={cx('tooltip-root')}>
      {text}
      <span
        className={cx('tooltip-trigger', { open: isOpen })}
        onClick={handleClick}
      >
        {isOpen && (
          <TooltipDescription
            description={description}
            handleClose={handleClose}
          />
        )}
      </span>
    </span>
  );
};

const Tooltip2_2 = () => {
  return (
    <>
      <h3>
        #2-2. React<sub>터치 또는 클릭으로 동장하는 툴팁</sub>
      </h3>
      {data.map((item) => {
        return <TooltipItem key={item.id} {...item} />;
      })}
    </>
  );
};

export default Tooltip2_2;
