import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

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

// export const MyPageView = myPagePlugin.provide(
//   createComponentExtension({
//     name: 'MyPageView',
//     component: {
//       lazy: () =>
//         import('./components/ViewPageComponent').then(m => m.ViewPageComponent),
//     },
//   }),
// );

export const EntityValue = myPagePlugin.provide(
  createComponentExtension({
    name: 'EntityValue',
    component: {
      lazy: () =>
        import('./components/EntityValueComponent').then(
          m => m.EntityValueComponent,
        ),
    },
  }),
);
