import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myPagePlugin, MyPage } from '../src/plugin';

createDevApp()
  .registerPlugin(myPagePlugin)
  .addPage({
    element: <MyPage />,
    title: 'Root Page',
    path: '/my-page'
  })
  .render();
