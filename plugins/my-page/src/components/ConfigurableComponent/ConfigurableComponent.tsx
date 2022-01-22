import React from 'react'

export const ConfigurableComponent = 
    ({name, props}: {name: string, entityRef?: string, props: string}) => {
    // get component by name
    // render component and pass props
    // wrap in enit 
    return <>
        {name} {props}
    </>
}