import type { ViewportSize } from './viewportObserver';

const OppositePositionKeys = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const;

const PositionStyle = {
  left: '100%',
  right: '100%',
  top: '100%',
  bottom: '100%',
};

const getStyleInsideViewport = (
  $root: HTMLElement,
  $target: HTMLElement,
  viewportSize: ViewportSize,
) => {
  if (!$root || !$target) return;
  const { width: vw, height: vh } = viewportSize;
  const rootRect = $root.getBoundingClientRect();
  const targetRect = $target.getBoundingClientRect();
  const horizontal = rootRect.right + targetRect.width < vw ? 'right' : 'left';
  const vertical = rootRect.bottom + targetRect.height < vh ? 'bottom' : 'top';

  return `
    ${horizontal} : auto;
        ${vertical} : auto;
    ${OppositePositionKeys[horizontal]} : ${PositionStyle[horizontal]};
    ${OppositePositionKeys[vertical]} : ${PositionStyle[vertical]};
  `;
};

export default getStyleInsideViewport;
