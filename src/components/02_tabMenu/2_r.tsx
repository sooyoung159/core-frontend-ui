import { useState } from 'react';
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

const TabMenu2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);
  const toggleItem = (id: string) => {
    setCurrentId(id);
  };
  const currentDescription =
    data.find((item) => item.id === currentId)?.description || '';

  return (
    <>
      <h3>
        #2. React<sub>css로 hidden/show 처리</sub>
      </h3>
      <div className={cx('container', 'tabMenu2')}>
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
        {data.map((item) => {
          return (
            <div
              id={item.id}
              className={cx('description', { current: item.id === currentId })}
            >
              {item.description}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabMenu2;
