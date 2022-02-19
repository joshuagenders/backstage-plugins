import React, { useContext } from 'react'
import { Slot } from '../../types'
import { ConfigurableComponent } from '../ConfigurableComponent'
import { EditComponent } from '../EditComponent'
import { EditContext } from '../MyPageComponent'

export const ComponentView = ({slot}: {slot: Slot}) => {
    const { isEditing } = useContext(EditContext)
    return <>
        {isEditing
            ? <EditComponent slot={slot} />
            : <ConfigurableComponent slot={slot} />}
    </>
}