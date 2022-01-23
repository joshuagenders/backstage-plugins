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

const ids = ['EntityName', 'EntityType']
const componentFactory = (id: string) => {
  switch(id){
    case 'EntityName':
      return <EntityValueComponent path='metadata.name' />
    case 'EntityType':
      return <EntityValueComponent path='spec.type' />
    default:
      return <></>
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
    element: <MyPage componentFactory={componentFactory} ids={ids} />,
    title: 'Root Page',
    path: '/my-page'
  })
  .render();
