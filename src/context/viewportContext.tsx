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
  window.addEventListener('scroll', getSnapshop);

  return () => {
    window.removeEventListener('scroll', getSnapshop);
  };
};

const ScrollInfoContext = createContext<ScrollInfo>(DefaultScrollInfo);
const ScrollInfoContextProvider = ({ children }: { children: ReactNode }) => {
  const scrollInfo = useSyncExternalStore(
    subscribeScroll,
    getScrollInfo,
    () => DefaultScrollInfo,
  );
  return <ScrollInfoContext value={scrollInfo}>{children}</ScrollInfoContext>;
};

const getViewportElem = (() => {
  let elem: HTMLElement | null = document.querySelector('#viewport');
  return () => {
    if (!elem) {
      elem = document.createElement('div');
      elem.id = 'viewport';
      elem.style.cssText = 'position: fixed; inset: 0; z-index: -1;';
      document.body.insertAdjacentElement('afterbegin', elem);
    }
    return elem;
  };
})();

export type ViewportSize = Pick<DOMRect, 'width' | 'height'>;

const DefaultViewportSize: ViewportSize = {
  width: 0,
  height: 0,
};

const getViewportSize = (() => {
  let stored: ViewportSize = DefaultViewportSize;
  return () => {
    const elem = getViewportElem();
    const { width, height } = elem.getBoundingClientRect();
    const newViewportSize = { width, height };
    if (!deepCompare(stored, newViewportSize)) stored = newViewportSize;
    return stored;
  };
})();

const subscribeResize = (getSnapshop: () => void) => {
  const callback = () => window.requestAnimationFrame(getSnapshop);
  const resizeObserver = new ResizeObserver(callback);
  resizeObserver.observe(getViewportElem());

  return () => {
    resizeObserver.disconnect();
  };
};

const ViewportSizeContext = createContext<ViewportSize>(DefaultViewportSize);
const ViewportSizeContextProvider = ({ children }: { children: ReactNode }) => {
  const viewportSize = useSyncExternalStore(
    subscribeResize,
    getViewportSize,
    () => DefaultViewportSize,
  );
  return (
    <ViewportSizeContext value={viewportSize}>{children}</ViewportSizeContext>
  );
};

const ViewportContextProvider = ({ children }: { children: ReactNode }) => {
  const scrollInfo = useSyncExternalStore(
    subscribeScroll,
    getScrollInfo,
    () => DefaultScrollInfo,
  );

  console.log(scrollInfo);

  return (
    <ScrollInfoContextProvider>
      <ViewportSizeContextProvider>{children}</ViewportSizeContextProvider>
    </ScrollInfoContextProvider>
  );
};

export default ViewportContextProvider;
export const useScrollInfo = () => useContext(ScrollInfoContext);
export const useViewportSize = () => useContext(ViewportSizeContext);
