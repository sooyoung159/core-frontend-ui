import { useEffect, useRef, useState } from "react";
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
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $desc = descRef.current!;
    $desc.style.maxHeight = current ? `${$desc.scrollHeight}px` : "0px";
  }, [current]);
  return (
    <li key={id} className={cx("item1", "item3", { current })}>
      <button className={cx("tab")} type="button" onClick={() => toggle(id)}>
        {title}
      </button>
      <div className={cx("description")} ref={descRef}>
        {description}
      </div>
    </li>
  );
};

const Accordion3_2 = () => {
  const [currentId, setCurrentId] = useState<string | null>(data[0].id);

  const toggleItem = (id: string) => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <div>
      <h3>
        #2. React<sub>CSS로 hidden/show 처리</sub>
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

export default Accordion3_2;
