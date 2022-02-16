import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { myPagePlugin, MyPage } from '../src/plugin';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { CatalogApi } from '@backstage/catalog-client';
import { Entity } from '@backstage/catalog-model';
import { EntityValueComponent } from '../src/components/EntityValueComponent';
import { JsonWebValue } from '../src/components/JsonWebValue';
import { FormInputs } from '../src/types';

const entities: Entity[] = [{
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
},
{
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: {
    name: 'test-service',
    description: 'A service for testing the my-page plugin',
  },
  spec: {
    type: 'service',
    owner: 'john@example.com',
    lifecycle: 'experimental',
  },
}];

const componentFactory = (id: string, props?: { [x: string]: string }) => {
  let city = 'London'
  switch (id) {
    case 'EntityValue':
      return <EntityValueComponent path="metadata.name" />;
    case 'Temperature':
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
    ['Temperature', [{ name: 'city', required: true, type: 'string', description: 'City name' }] ],
    ['EntityValue', [{ name: 'EntityValue', required: true, type: 'string', description: 'JSON path value to apply to Entity' }] ]
  ],
)

createDevApp()
  .registerPlugin(myPagePlugin)
  .registerApi({
    api: catalogApiRef,
    deps: {},
    factory: () =>
      ({
        getEntityByName(name: string) {
          const entity = entities.find(e => e.metadata.name === name)
          return Promise.resolve(entity ?? entities[0]);
        },
      } as unknown as CatalogApi),
  })
  .addPage({
    element: <MyPage componentFactory={componentFactory} schema={schema} />,
    title: 'Root Page',
    path: '/my-page',
  })
  .render();
