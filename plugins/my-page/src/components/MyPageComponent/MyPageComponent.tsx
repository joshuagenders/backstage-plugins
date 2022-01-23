import { Content, Header, Page } from '@backstage/core-components';
import React, { createContext } from 'react';
import { ViewControl } from '../ViewControl';

// note: start simple - only provide entity wrapping, add custom form inputs later
// export type InputTypes = 'number' | 'string'
// export type FormInputs = {
//   name: string,
//   type: InputTypes
// }

export type MyPageComponentProps = {
  componentFactory: (
    id: string,
    props: React.PropsWithChildren<any>,
  ) => JSX.Element | null;
  ids: string[];
  // schema?: Map<string, FormInputs[]>
};

export const ComponentFactoryContext = createContext<MyPageComponentProps>({
  componentFactory: () => null,
  ids: [],
});

export const MyPageComponent = (props: MyPageComponentProps) => {
  return (
    <Page themeId="tool">
      <Header title="My Page" />
      <Content>
        <ComponentFactoryContext.Provider value={props}>
          <ViewControl />
        </ComponentFactoryContext.Provider>
      </Content>
    </Page>
  );
};
