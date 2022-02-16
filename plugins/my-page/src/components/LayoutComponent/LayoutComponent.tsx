import { Grid } from '@material-ui/core'
import React from 'react'
import { useLayoutConfig } from '../../hooks/useLayoutConfig'
import { Slot } from '../../types'
import { eq, match } from '../../utils'
import { EditableComponent } from '../EditableComponent'

const slots : Slot[] = [1,2,3,4,5,6,7]
const firstHalfSlots: Slot[] = [1,2,3]
const secondHalfSlots : Slot[] = [4,5,6,7]
const PanelView = (slot: Slot) => {
    return (<Grid key={`grid-${slot}`} item xs={12}>
        <EditableComponent key={`editable-${slot}`} slot={slot} />
    </Grid>)
}

const TwoColumnLayout = () => {
    return <Grid container>
        <Grid item xs={6}> 
            {firstHalfSlots.map(PanelView)} 
        </Grid>
        <Grid item xs={6}>
            {secondHalfSlots.map(PanelView)}
        </Grid>
    </Grid>
}

const SingleColumnLayout = () => {
    return <Grid container>
        {slots.map(PanelView)}
    </Grid>
}

// Todo const WidgetsBar = () => <></>
// can be positioned top or bottom, widgets are for smaller components

export const LayoutComponent = () => {
    const { config, setConfig } = useLayoutConfig()
    const layout = match(config.value?.layoutName)
        .when(eq('one-column'), SingleColumnLayout)
        .when(eq('two-column'), TwoColumnLayout)
        .otherwise(SingleColumnLayout)
    return <>
        <button onClick={() => setConfig({layoutName: 'one-column'})}>single</button>
        <button onClick={() => setConfig({layoutName: 'two-column'})}>two-column</button>
        {layout}
    </>
}