import {
  gnbRootList,
  isParentRoute,
  routeMap,
  type ChildRoute,
  type ParentRoute,
  type Route,
  type RoutePath,
} from "#/routeMap";
import { Link, useParams } from "@tanstack/react-router";
import classNames from "classnames";

interface GnbItemProps {
  link: RoutePath;
  route: Route;
}
interface ParentGnbItemProps extends GnbItemProps {
  route: ParentRoute;
}
interface ChildGnbItemProps extends GnbItemProps {
  route: ChildRoute;
}

const ParentGnbItem = ({
  link,
  route: { name, link: routeLink, children },
}: ParentGnbItemProps) => {
  const { _splat } = useParams({ strict: false });
  const currentPath = _splat as RoutePath;
  const open = children.includes(currentPath);
  const actualLink = routeLink || link;

  return (
    <li className={classNames("parent", `items-${children.length}`, { open })}>
      <Link to="/$" params={{ _splat: actualLink }}>
        {name}
      </Link>
      <ul className="subRoutes">
        {children.map((child) => (
          <GnbItem key={child} link={child} route={routeMap[child]} />
        ))}
      </ul>
    </li>
  );
};

const ChildGnbItem = ({
  link,
  route: { name, Component },
}: ChildGnbItemProps) => {
  const { _splat } = useParams({ strict: false });
  const currentPath = _splat as RoutePath;

  return (
    <li
      className={classNames({
        active: link === currentPath,
        disabled: !Component,
      })}
    >
      {Component ? (
        <Link to="/$" params={{ _splat: link }}>
          {name}
        </Link>
      ) : (
        name
      )}
    </li>
  );
};

const GnbItem = ({ link, route }: GnbItemProps) => {
  if (isParentRoute(route)) return <ParentGnbItem link={link} route={route} />;
  return <ChildGnbItem link={link} route={route} />;
};

const Gnb = () => {
  return (
    <aside>
      <h1>
        <Link to="/">
          UI 요소모음 <sub>강수영</sub>
        </Link>
      </h1>
      <ul className="mainRoutes">
        {gnbRootList.map(([link, route]) => (
          <GnbItem key={link} link={link} route={route} />
        ))}
      </ul>
    </aside>
  );
};

export default Gnb;
