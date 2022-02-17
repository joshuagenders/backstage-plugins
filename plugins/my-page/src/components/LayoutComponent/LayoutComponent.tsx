import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useLayoutConfig } from '../../hooks/useLayoutConfig'
import { Slot } from '../../types'
import { eq, match } from '../../utils'
import { ComponentView } from '../ComponentView'

const slots : Slot[] = [1,2,3,4,5,6,7,8]
const firstHalfSlots: Slot[] = [1,2,3, 4]
const secondHalfSlots : Slot[] = [5,6,7,8]
const PanelView = (slot: Slot) => {
    return <Grid key={`grid-${slot}`} item xs={12}>
        <ComponentView key={`editable-${slot}`} slot={slot} />
    </Grid>
}

const TwoColumnLayout = () => {
    return <Grid container spacing={3}>
        <Grid item xs={6}> 
            {firstHalfSlots.map(PanelView)} 
        </Grid>
        <Grid item xs={6}>
            {secondHalfSlots.map(PanelView)}
        </Grid>
    </Grid>
}

const SingleColumnLayout = () => {
    return <Grid container spacing={3}>
        {slots.map(PanelView)}
    </Grid>
}

// Todo const WidgetsBar = () => <></>
// can be positioned top or bottom, widgets are for smaller components


const layouts = ['one-column', 'two-column']
export const LayoutComponent = () => {
    const { config, setConfig } = useLayoutConfig()
    const layout = match(config.value?.layoutName)
        .when(eq('one-column'), SingleColumnLayout)
        .when(eq('two-column'), TwoColumnLayout)
        .otherwise(SingleColumnLayout)
    const handleChange = (e: any) => {
        if (layouts.includes(e.target.value)){
            setConfig({layoutName: e.target.value})
        }
    }
    return <>
        <FormControl fullWidth>
            <InputLabel>Layout</InputLabel>
            <Select
                labelId="layout-select-label"
                id="layout-select"
                value={config.value?.layoutName}
                label="Layout"
                onChange={handleChange}
            >
                {layouts.map(l => <MenuItem key={`layout-item-${l}`} value={l}>{l}</MenuItem>)}
            </Select>
        </FormControl>
        <div style={{ padding: 20 }}>
            {layout}
        </div>
    </>
}