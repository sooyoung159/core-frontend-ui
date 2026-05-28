import { useState } from "react";
import cx from "./cx";
import data from "./data";

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
  return (
    <li key={id} className={cx("item", { current })}>
      <button className={cx("tab")} type="button" onClick={() => toggle(id)}>
        {title}
      </button>
      {current && <div className={cx("description")}>{description}</div>}
    </li>
  );
};

const Accordion1 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const toggleItem = (id: string) => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <div>
      <h3>
        #1. React<sub>현재 desc만 렌더링</sub>
      </h3>
      <ul className={cx("container")}>
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

export default Accordion1;
