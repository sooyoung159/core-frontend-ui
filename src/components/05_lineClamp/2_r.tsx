import { useViewportSize } from '#/context/viewportContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

const LineClampedText = ({
  text,
  maxLines = Number.MAX_SAFE_INTEGER,
}: {
  text: string;
  maxLines?: number;
}) => {
  const { width: viewportWidth } = useViewportSize();
  const cloneRef = useRef<HTMLDivElement>(null);
  const elemRef = useRef<HTMLDivElement>(null);
  const [showClampButton, setClampButton] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const toggleClamed = useCallback(() => {
    setIsClamped((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!cloneRef.current || !elemRef.current || !viewportWidth) return;
    const lineHeight = Number.parseFloat(
      getComputedStyle(elemRef.current).lineHeight,
    );
    const measuredLines = Math.round(
      cloneRef.current.scrollHeight / lineHeight,
    );
    const linesOverflow = measuredLines > maxLines;

    setIsClamped(linesOverflow);
    setClampButton(linesOverflow);
  }, [viewportWidth, text, maxLines]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
      <div className={cx('text-clone')} ref={cloneRef}>
        {text}
      </div>
      <div
        className={cx('text')}
        ref={elemRef}
        style={{ WebkitLineClamp: isClamped ? maxLines : '' }}
      >
        {text}
      </div>
      {showClampButton && (
        <button
          type="button"
          className={cx('buttonMore')}
          onClick={toggleClamed}
        />
      )}
    </div>
  );
};

const LineClamp2 = () => {
  return (
    <>
      <h3>
        #1. React<sub>Replica 기법</sub>
      </h3>
      {data.map((text) => (
        <LineClampedText key={text} text={text} maxLines={3} />
      ))}
    </>
  );
};

export default LineClamp2;
