import { useEffect, useRef, useState } from 'react';
import cx from './cx';
import data from './data';

type TabItem = {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: (id: string) => void;
};

const TabItem = ({ id, title, current, toggle }: TabItem) => {
  return (
    <li className={cx('tab', { current })} key={id}>
      <button type="button" onClick={() => toggle(id)}>
        {title}
      </button>
    </li>
  );
};

const TabPanel = ({
  description,
  current,
}: Pick<TabItem, 'description' | 'current'>) => {
  const prevRef = useRef(false);
  const [animationClassName, setAnimationClassName] = useState<string | null>(
    current ? 'enter' : null,
  );
  useEffect(() => {
    if (prevRef.current !== current) {
      setAnimationClassName(current ? 'enter' : 'exit');
      prevRef.current = current;
    }
  }, [current]);

  const handleAnimationEnd = () => {
    setAnimationClassName((prev) => {
      switch (prev) {
        case 'exit':
          return null;
        case 'enter':
          return 'current';
      }
      return prev;
    });
  };

  return (
    <div
      className={cx('description', animationClassName)}
      onAnimationEnd={handleAnimationEnd}
    >
      {description}
    </div>
  );
};

const TabMenu3_3 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId(id);
  };

  return (
    <>
      <h3>
        #3-3. React<sub>css로 animation #2</sub>
      </h3>
      <div className={cx('container', 'tabMenu3-3')}>
        <ul className={cx('tabList')}>
          {data.map((item) => (
            <TabItem
              key={item.id}
              {...item}
              current={item.id === currentId}
              toggle={() => toggleItem(item.id)}
            />
          ))}
        </ul>
        <div className={cx('tabPanel')}>
          {data.map((item) => {
            return <TabPanel {...item} current={item.id === currentId} />;
          })}
        </div>
      </div>
    </>
  );
};

export default TabMenu3_3;
