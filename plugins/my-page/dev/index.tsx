import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myPagePlugin, MyPage } from '../src/plugin';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { CatalogApi } from '@backstage/catalog-client';
import { Entity } from '@backstage/catalog-model';
import { EntityValueComponent } from '../src/components/EntityValueComponent';
import { JsonWebValue } from '../src/components/JsonWebValue';
import { FormInputs } from '../src/types';

const entity: Entity = {
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'backstage-plugins',
    description: 'An example of a Backstage application.',
  },
  spec: {
    type: 'website',
    owner: 'john@example.com',
    lifecycle: 'experimental',
  },
};

const ids = ['EntityName', 'EntityType', 'JsonWebValue'];
const componentFactory = (id: string, props?: { [x: string]: string }) => {
  let city = 'London'
  switch (id) {
    case 'EntityName':
      return <EntityValueComponent path="metadata.name" />;
    case 'EntityType':
      return <EntityValueComponent path="spec.type" />;
    case 'JsonWebValue':
      if (props && 'city' in props){
        city = props.city
      }
      return <JsonWebValue path="$.temperature" title={`Temperature ${city}`} url={`https://goweather.herokuapp.com/weather/${city}`} />
    default:
      return <></>;
  }
};

const schema = new Map<string, FormInputs[]>(
  [
    ['JsonWebValue', [{ name: 'city', required: true, type: 'string', description: 'City name' }] ]
  ]
)

createDevApp()
  .registerPlugin(myPagePlugin)
  .registerApi({
    api: catalogApiRef,
    deps: {},
    factory: () =>
      ({
        getEntityByName() {
          return Promise.resolve(entity);
        },
      } as unknown as CatalogApi),
  })
  .addPage({
    element: <MyPage componentFactory={componentFactory} ids={ids} schema={schema} />,
    title: 'Root Page',
    path: '/my-page',
  })
  .render();
