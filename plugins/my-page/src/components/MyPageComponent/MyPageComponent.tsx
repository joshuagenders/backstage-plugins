import { Content, ContentHeader, Header, Page } from '@backstage/core-components'
import { Button } from '@material-ui/core'
import React, { createContext, useState } from 'react'
import { ViewControl } from '../ViewControl'

export const EditContext = createContext(false)
export const MyPageComponent = () => {
  const [editing, setEditing] = useState(false)
  const toggleEditing = () => setEditing(!editing)
  return (
  <Page themeId="tool">
      <Header title="My Page" />
      <Content>
        <ContentHeader title="My Page">
          <Button onClick={toggleEditing}>{editing ? 'save' : 'edit'}</Button>
        </ContentHeader>
        <EditContext.Provider value={editing}> 
          <ViewControl/>
        </EditContext.Provider>
      </Content>
  </Page>)
}