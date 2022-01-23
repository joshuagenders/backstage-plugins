import React from 'react'
import { useEntityValue } from './useEntityValue'
import Chip from '@material-ui/core/Chip'

export const EntityValueComponent = ({ path }:{ path:string }) => {
    const value = useEntityValue(path)
    return <Chip label={value}/>
}