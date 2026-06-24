import { useScrollInfo, useViewportSize } from '#/context/viewportContext';
import { deepCompare } from '#/service/util';
import { useLayoutEffect, useRef, useState, type RefObject } from 'react';

type PositionKey = 'left' | 'top' | 'right' | 'bottom';
type PositionStyleType = Partial<Record<PositionKey, string | number>>;

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

const useStyleInsideViewport = (
  rootRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
) => {
  const { top: vt, left: vl } = useScrollInfo();
  const { width: vw, height: vh } = useViewportSize();
  const sotred = useRef({});
  const [style, setStyle] = useState<PositionStyleType | undefined>(undefined);

  useLayoutEffect(() => {
    const newInfo = { vt, vl, vw, vh };
    if (
      !rootRef.current ||
      !targetRef.current ||
      deepCompare(newInfo, sotred.current)
    )
      return;

    sotred.current = newInfo;
    const rootRect = rootRef.current.getBoundingClientRect();
    const targetRect = targetRef.current.getBoundingClientRect();
    const horizontal =
      rootRect.right + targetRect.width < vw ? 'left' : 'right';
    const vertical =
      rootRect.bottom + targetRect.height < vh ? 'top' : 'bottom';
    const oppositeHorizontal = OppositePositionKeys[horizontal];
    const oppositeVertical = OppositePositionKeys[vertical];

    setStyle({
      [horizontal]: PositionStyle[horizontal],
      [vertical]: PositionStyle[vertical],
      [oppositeHorizontal]: 'auto',
      [oppositeVertical]: 'auto',
    });
  }, [rootRef, targetRef, vt, vl, vw, vh]);

  return style;
};

export default useStyleInsideViewport;
