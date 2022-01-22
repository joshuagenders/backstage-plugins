import React, { useContext } from 'react'
import { EditPageComponent } from '../EditPageComponent/EditPageComponent'
import { EditContext } from '../MyPageComponent'
import { ViewPageComponent } from '../ViewPageComponent'

export const ViewControl = () => {
    const editing = useContext(EditContext)
    return editing 
        ? <EditPageComponent />
        : <ViewPageComponent />
}