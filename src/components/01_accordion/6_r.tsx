import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: (id: string) => void;
};

const AccordionItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: AccordionItem) => {
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desc = descRef.current;
    desc?.addEventListener('beforematch', () => toggle(id));
    return () => {
      desc?.removeEventListener('beforematch', () => toggle(id));
    };
  }, [toggle]);

  return (
    <li key={id} className={cx('item1', 'item3', { current })}>
      <button className={cx('tab')} type="button" onClick={() => toggle(id)}>
        {title}
      </button>
      <div
        ref={descRef}
        className={cx('description')}
        // @ts-expect-error: until-found는 최신 스펙이므로 React 타입 에러를 무시합니다
        hidden={current ? undefined : 'until-found'}
      >
        {description}
      </div>
    </li>
  );
};

const Accordion6 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const toggleItem = (id: string) => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <div>
      <h3>
        #6. React<sub>hidden(until-found)</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item) => {
          return (
            <AccordionItem
              key={item.id}
              {...item}
              current={item.id === currentId}
              toggle={() => toggleItem(item.id)}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Accordion6;
