import { Content, Header, Page } from '@backstage/core-components';
import React, { createContext } from 'react';
import { ComponentConfig } from '../../types';
import { LayoutComponent } from '../LayoutComponent';

export type MyPageComponentProps = {
  componentFactory: (
    id: string,
    props: {[x: string]: string},
  ) => JSX.Element | null;
  schema?: ComponentConfig[]
};

export const ComponentFactoryContext = createContext<MyPageComponentProps>({
  componentFactory: () => null
});

export const MyPageComponent = (props: MyPageComponentProps) => {
  return (
    <Page themeId="tool">
      <Header title="My Page" />
      <Content>
        <ComponentFactoryContext.Provider value={props}>
          <LayoutComponent />
        </ComponentFactoryContext.Provider>
      </Content>
    </Page>
  );
};
