import React, { useState } from 'react'
import { Slot } from '../../types'
import { ConfigurableComponent } from '../ConfigurableComponent'
import { EditComponent } from '../EditComponent'

export const ComponentView = ({slot}: {slot: Slot}) => {
    const [isEditing, setEditing] = useState(false)
    return <>
        {isEditing
            ? <EditComponent slot={slot} setEditing={setEditing} />
            : <ConfigurableComponent slot={slot} setEditing={setEditing} />}
    </>
}