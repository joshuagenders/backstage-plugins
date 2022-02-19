import { Content, Header, Page } from '@backstage/core-components';
import { Button } from '@material-ui/core';
import React, { createContext, useState } from 'react';
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

export const EditContext = createContext<{ isEditing: boolean, setEditing: (isEditing: boolean) => void}>(
  { isEditing: false, setEditing: () => {} }
);

export const MyPageComponent = (props: MyPageComponentProps) => {
  const [isEditing, setEditing] = useState(false)
  return (
    <Page themeId="home">
      <EditContext.Provider value={{ isEditing, setEditing }}>
        <Header title="My Page">
          <Button onClick={() => setEditing(!isEditing)}>{isEditing ? 'Exit Editing' : 'Edit'}</Button>
        </Header>
        <Content>
          <ComponentFactoryContext.Provider value={props}>
            <LayoutComponent />
          </ComponentFactoryContext.Provider>
        </Content>
        </EditContext.Provider>
    </Page>
  );
};
