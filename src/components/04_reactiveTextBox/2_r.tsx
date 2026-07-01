import measureLines from '#/service/measureLines';
import { useCallback, useRef, type SyntheticEvent } from 'react';
import cx from './cx';

const ReactiveTextBox2 = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const replicaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback((e: SyntheticEvent) => {
    const [el, replica] = [textareaRef.current, replicaRef.current];
    if (!el || !replica) return;
    replica.value = el.value;
    el.style.height = `${replica.scrollHeight}px`;
  }, []);

  return (
    <>
      <h3>
        #2. React<sub>Replica 기법</sub>
      </h3>
      <div className={cx('container')}>
        <textarea
          ref={replicaRef}
          tabIndex={-1}
          className={cx('replica')}
          readOnly
        />
        <textarea onInput={handleInput} ref={textareaRef} />
      </div>
    </>
  );
};

export default ReactiveTextBox2;
