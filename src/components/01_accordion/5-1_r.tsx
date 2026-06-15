import cx from './cx';
import data from './data';

type AccordionItem = {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
};

const AccordionItem = ({
  id,
  title,
  description,
  initialChecked,
}: AccordionItem) => {
  return (
    <li className={cx('item', 'item5-1')}>
      <input
        className={cx('input')}
        type="radio"
        name="accordion"
        id={id}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx('tab')}>
        {' '}
        {title}
      </label>
      <div className={cx('description')}>{description}</div>
    </li>
  );
};

const Accordion5_1 = () => {
  return (
    <>
      <h3>
        #5-1. React<sub>html input(radio)만으로 동작</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item, i) => (
          <AccordionItem {...item} key={item.id} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};

export default Accordion5_1;
