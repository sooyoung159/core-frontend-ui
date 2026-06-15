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
    <details
      name="details5_2"
      className={cx('item', 'item5-2')}
      open={initialChecked}
    >
      <summary>{title}</summary>
      <div className={cx('description')}>{description}</div>
    </details>
  );
};

const Accordion5_2 = () => {
  return (
    <>
      <h3>
        #5-2. React<sub>html details,summary만으로 동작</sub>
      </h3>
      <ul className={cx('container')}>
        {data.map((item, i) => (
          <AccordionItem {...item} key={item.id} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
};

export default Accordion5_2;
