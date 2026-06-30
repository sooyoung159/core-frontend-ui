import { deepCompare } from '#/service/util';
import Observer from './observer';

export type ScrollInfo = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'> & {
  scrollHeight: number;
};

const DefaultScrollInfo: ScrollInfo = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  scrollHeight: 0,
};
const getScrollInfo = (() => {
  let stored: ScrollInfo = DefaultScrollInfo;
  return () => {
    const { clientWidth, clientHeight, scrollLeft, scrollTop, scrollHeight } =
      document.scrollingElement!;
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

export const notifyScrollInfoChanged = () => {
  Observer.notify('scrollInfo', getScrollInfo());
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

export const notifyViewportSizeChanged = () => {
  Observer.notify('viewportSize', getViewportSize());
};

const initViewportObserver = () => {
  window.addEventListener('scroll', notifyScrollInfoChanged);
  const resizeObserver = new ResizeObserver(notifyViewportSizeChanged);
  resizeObserver.observe(getViewportElem());
};

export default initViewportObserver;
