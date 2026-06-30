import getStyleInsideViewport from '#/context/vanilla/getStyleInsideViewport';
import Observer from '#/context/vanilla/observer';
import initViewportObserver, {
  type ScrollInfo,
  type ViewportSize,
} from '#/context/vanilla/viewportObserver';
import VanillaWrapper from '../VanillaWrapper';
import cx from './cx';
import data from './data';

const initiator = (wrapper: HTMLDivElement) => {
  initViewportObserver();
  const $tooltips = data.map(({ id, text, description }) => {
    const $root = document.createElement('span');
    $root.classList.add(cx('tooltip-root'));
    $root.textContent = text;

    const $details = document.createElement('details');
    $details.name = 'tooltip';
    $details.classList.add(cx('details'));

    const $summary = document.createElement('summary');
    $summary.classList.add(cx('tooltip-trigger'));

    const $tooltip = document.createElement('span');
    $tooltip.classList.add(cx('tooltip-layer'));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);
    $root.append($details);

    const handler = (viewportSize: ViewportSize) => {
      const newStyle =
        getStyleInsideViewport($details, $tooltip, viewportSize) || '';
      $tooltip.setAttribute('style', newStyle);
    };
    Observer.observe<ScrollInfo>('scrollInfo', $root, handler);
    Observer.observe<ViewportSize>('viewportSize', $root, handler);

    return $root;
  });

  wrapper.append(...$tooltips);
};

const Tooltip5V = () => <VanillaWrapper title="#5" initiator={initiator} />;
export default Tooltip5V;
