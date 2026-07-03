import { useViewportSize } from '#/context/viewportContext';
import measureLines from '#/service/measureLines';
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
  const elemRef = useRef<HTMLDivElement>(null);
  const [showClampButton, setClampButton] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  const toggleClamed = useCallback(() => {
    setIsClamped((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!text || !elemRef.current || !viewportWidth) return;
    const lineHeight = Number.parseFloat(
      getComputedStyle(elemRef.current).lineHeight,
    );
    const measuredLines = Math.round(elemRef.current.scrollHeight / lineHeight);
    const linesOverflow = measuredLines > maxLines;
    setIsClamped(linesOverflow);
    setClampButton(linesOverflow);
  }, [viewportWidth, text, maxLines]);

  return (
    <div className={cx('content', { clamped: isClamped })}>
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

const LineClamp3 = () => {
  return (
    <>
      <h3>
        #3. React<sub>원본의 scrollHeight로 조절</sub>
      </h3>
      {data.map((text) => (
        <LineClampedText key={text} text={text} maxLines={3} />
      ))}
    </>
  );
};

export default LineClamp3;
