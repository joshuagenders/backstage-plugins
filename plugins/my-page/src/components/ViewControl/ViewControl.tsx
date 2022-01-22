import React, { useContext } from 'react'
import { EditPageComponent } from '../EditPageComponent/EditPageComponent'
import { EditContext } from '../MyPageComponent'
import { ViewPageComponent } from '../ViewPageComponent'


// todo use https://backstage.io/storybook/?path=/story/layout-drawer--default-drawer for edit
export const ViewControl = () => {
    const editing = useContext(EditContext)
    return editing 
        ? <EditPageComponent />
        : <ViewPageComponent />
}