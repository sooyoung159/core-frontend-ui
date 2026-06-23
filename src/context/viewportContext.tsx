import { deepCompare } from '#/service/util';
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from 'react';

type ScrollInfo = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'> & {
  scrollHeight: number;
};

const DefaultScrollInfo: ScrollInfo = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};

const getScrollInfo = (() => {
  let stored: ScrollInfo = DefaultScrollInfo;
  return () => {
    const elem = document.scrollingElement!;
    const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollHeight } =
      elem;
    const newScrollInfo = {
      left: scrollLeft,
      top: scrollTop,
      width: clientWidth,
      height: clientHeight,
      scrollHeight,
    };
    if (!deepCompare(stored, newScrollInfo)) stored = newScrollInfo;
    return stored;
  };
})();

const subscribeScroll = (getSnapshop: () => void) => {
  const callback = () => window.requestAnimationFrame(getSnapshop);
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(document.scrollingElement!);
  window.addEventListener('scroll', callback);

  return () => {
    window.removeEventListener('scroll', getSnapshop);
    resizeObserver.disconnect();
  };
};

const ScrollInfoContext = createContext<ScrollInfo>(DefaultScrollInfo);

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  const scrollInfo = useSyncExternalStore(
    subscribeScroll,
    getScrollInfo,
    () => DefaultScrollInfo,
  );

  console.log(scrollInfo);

  return (
    <ScrollInfoContext.Provider value={scrollInfo}>
      {children}
    </ScrollInfoContext.Provider>
  );
};

export default ViewportContextProvider;
export const useScrollInfo = () => useContext(ScrollInfoContext);
