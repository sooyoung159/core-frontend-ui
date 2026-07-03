import type { ComponentType } from 'react';
import Accordions from './components/01_accordion';
import TabMenus from './components/02_tabMenu';
import Tooltips from './components/03_tooltip';
import ReactiveTextBoxes from './components/04_reactiveTextBox';
import LineClamps from './components/05_lineClamp';

const _routeMap = {
  root: {
    name: 'root',
    children: [
      'accordion',
      'tabMenus',
      'tooltip',
      'reactiveTextBox',
      'lineClamp',
    ],
  },
  accordion: {
    name: '01. 아코디언',
    Component: Accordions,
  },
  tabMenus: {
    name: '02. 탭메뉴',
    Component: TabMenus,
  },
  tooltip: {
    name: '03. 툴팁',
    Component: Tooltips,
  },
  reactiveTextBox: {
    name: '04. 반응형 텍스트박스',
    Component: ReactiveTextBoxes,
  },
  lineClamp: {
    name: '05. 여러줄 말줄임',
    Component: LineClamps,
  },
};

export type RoutePath = keyof typeof _routeMap;
type BaseRoute = {
  name: string;
  link?: RoutePath;
};
export type ParentRoute = BaseRoute & {
  children: RoutePath[];
};
export type ChildRoute = BaseRoute & {
  Component: ComponentType | null;
};
export type Route = ParentRoute | ChildRoute;
export const routeMap = _routeMap as Record<RoutePath, Route>;

export const isParentRoute = (route: Route): route is ParentRoute => {
  return 'children' in route;
};
export const gnbRootList: [RoutePath, Route][] = (
  routeMap.root as ParentRoute
).children.map((r) => [r, routeMap[r]]);
