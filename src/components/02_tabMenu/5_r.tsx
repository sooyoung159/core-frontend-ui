import cx from './cx';
import data from './data';

type TabItem = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

const TabItem = ({ id, title, description, initialChecked }: TabItem) => {
  return (
    <li className={cx('item')}>
      <input
        type="radio"
        className={cx('input')}
        name="tabMenu"
        id={`tab5-${id}`}
        defaultChecked={initialChecked}
      />
      <label htmlFor={`tab5-${id}`} className={cx('tab')}>
        {title}
      </label>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};

const TabMenu5 = () => {
  return (
    <>
      <h3>
        #5. React<sub>html input(radio)로 처리</sub>
      </h3>
      <ul className={cx('container', 'tabMenu5')}>
        {data.map((d, i) => {
          return <TabItem {...d} key={d.id} initialChecked={i === 0} />;
        })}
      </ul>
    </>
  );
};

export default TabMenu5;
