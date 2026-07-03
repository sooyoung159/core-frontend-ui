import Observer from '#/context/vanilla/observer';
import initViewportObserver from '#/context/vanilla/viewportObserver';
import type { ViewportSize } from '#/context/viewportContext';
import VanillaWrapper from '../VanillaWrapper';
import cx from './cx';
import data from './data';

const elemBuilder = (text: string, maxLines: number) => {
  let isClamped = false;
  const toggleClamped = (e: Event | null, force?: boolean) => {
    isClamped = typeof force === 'boolean' ? force : !isClamped;
    $content.classList.toggle(cx('clamped'), isClamped);
    $text.style.webkitLineClamp = isClamped ? `${maxLines}` : '';
  };

  const resize = () => {
    const lineHeight = Number.parseFloat(getComputedStyle($text).lineHeight);
    const measuredLines = Math.round($text.scrollHeight / lineHeight);
    const linesOverflow = measuredLines > maxLines;
    toggleClamped(null, linesOverflow);
    if (linesOverflow) $content.append($btn);
    else $btn.remove();
  };

  const $text = document.createElement('div');
  $text.classList.add(cx('text'));
  $text.textContent = text;

  const $btn = document.createElement('button');
  $btn.classList.add(cx('buttonMore'));
  $btn.addEventListener('click', toggleClamped);

  const $content = document.createElement('div');
  $content.classList.add(cx('content'));
  $content.append($text, $btn);

  Observer.observe<ViewportSize>('viewportSize', $content, resize);
  resize();
  return $content;
};

const initiator = (wrapper: HTMLDivElement) => {
  initViewportObserver();
  const $elems = data.map((text) => elemBuilder(text, 3));
  wrapper.append(...$elems);
};

const LineClamp4_V = () => <VanillaWrapper initiator={initiator} title="#4" />;
export default LineClamp4_V;
