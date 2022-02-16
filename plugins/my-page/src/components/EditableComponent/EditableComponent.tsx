import React, { useState } from 'react'
import { Slot } from '../../types'
import { ConfigurableComponent } from '../ConfigurableComponent'
import { EditPanelComponent } from '../EditPanelComponent'

export const EditableComponent = ({slot}: {slot: Slot}) => {
    const [isEditing, setEditing] = useState(false)
    const toggleEditing = () => setEditing(!isEditing)
    return <>
        <button onClick={toggleEditing}>edit</button>
        {isEditing && <EditPanelComponent slot={slot} setEditing={setEditing} />}
        {!isEditing && <ConfigurableComponent slot={slot} />}
    </>
}