import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myPagePlugin, MyPage } from '../src/plugin';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { CatalogApi } from '@backstage/catalog-client';
import { Entity } from '@backstage/catalog-model';
import { EntityValueComponent } from '../src/components/EntityValueComponent';

const entity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'backstage-plugins',
    description: 'An example of a Backstage application.'
  },
  spec: {
    type: 'website',
    owner: 'john@example.com',
    lifecycle: 'experimental'
  }
}

createDevApp()
  .registerPlugin(myPagePlugin)
  .registerApi({
    api: catalogApiRef,
    deps: {},
    factory: () => ({
      getEntityByName(){
        return Promise.resolve(entity)
      }
    }) as unknown as CatalogApi,
  })
  .addPage({
    element: <MyPage componentFactory={() => <EntityValueComponent path='metadata.name' />} ids={['abcd', '1234']} />,
    title: 'Root Page',
    path: '/my-page'
  })
  .render();
