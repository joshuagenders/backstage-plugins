import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const myPagePlugin = createPlugin({
  id: 'my-page',
  routes: {
    root: rootRouteRef,
  },
});

export const MyPage = myPagePlugin.provide(
  createRoutableExtension({
    name: 'MyPage',
    component: () =>
      import('./components/MyPageComponent').then(m => m.MyPageComponent),
    mountPoint: rootRouteRef,
  }),
);
