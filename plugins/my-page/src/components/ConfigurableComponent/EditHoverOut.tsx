import { Button } from '@material-ui/core'
import React, { useState } from 'react'

export const EditHoverOut = ({ clickFn, children }: React.PropsWithChildren<{ clickFn: () => void }>) => {
    const [isVisible, setVisible] = useState(false)
    const mouseEnter = () => { setVisible(true) }
    const mouseLeave = () => { setTimeout(()=> setVisible(false), 200) }
    return <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
        {children}
        {isVisible && 
            <Button
                onClick={clickFn}
                onMouseEnter={() => setVisible(true)}
                >
                    Edit
            </Button>}
    </div>
}