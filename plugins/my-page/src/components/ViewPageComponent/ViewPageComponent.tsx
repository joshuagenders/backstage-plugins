import React from 'react'
import { useLocalConfig } from '../../hooks/useLocalConfig'
import { ConfigurableGridComponent } from '../ConfigurableGridComponent'

export const ViewPageComponent = () => { 
    const { config } = useLocalConfig()
    if (!config?.value) return <></>
    return <>
        {config.value.items.map(v => <ConfigurableGridComponent {...v} />)}
        {/* <ComponentProvider > */}
    </>
}