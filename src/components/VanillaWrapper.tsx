import { useEffect, useRef } from "react";

type VanillaWrapperProps = {
  title?: string;
  subtitle?: string;
  initiator: (wrapper: HTMLDivElement) => void;
};

const VanillaWrapper = ({
  title = "",
  subtitle = "",
  initiator,
}: VanillaWrapperProps) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const isInit = useRef(false);

  useEffect(() => {
    if (!isInit.current && !!wrapper.current) {
      isInit.current = true;
      initiator(wrapper.current);
    }
  }, [initiator]);

  return (
    <>
      {title && (
        <h3>
          {title}. Vanilla {subtitle && <sub>{subtitle}</sub>}
        </h3>
      )}
      <div ref={wrapper}></div>
    </>
  );
};

export default VanillaWrapper;
