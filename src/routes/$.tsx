import ViewportContextProvider from '#/context/viewportContext';
import { isParentRoute, routeMap, type RoutePath } from '#/routeMap';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: ItemPage,
});

function ItemPage() {
  const { _splat } = Route.useParams();
  const route = routeMap[_splat as RoutePath];
  if (!route || isParentRoute(route) || !route.Component) return null;

  const Component = route.Component;
  return (
    <ViewportContextProvider>
      <Component />
    </ViewportContextProvider>
  );
}

export default ItemPage;
