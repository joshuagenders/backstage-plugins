import { Content, Header, Page } from '@backstage/core-components'
import React from 'react'
import { ViewControl } from '../ViewControl'

export const MyPageComponent = () => {
  return (
  <Page themeId="tool">
      <Header title="My Page" />
      <Content>
          <ViewControl/>
      </Content>
  </Page>)
}