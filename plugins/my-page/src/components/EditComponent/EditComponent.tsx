import React, { useContext } from 'react'
import { Panel } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@material-ui/core'
import { ComponentFactoryContext } from '../MyPageComponent'

type EditComponentProps = {
    config: Panel | undefined
    update: (config: Panel) => void
    remove: () => void 
}

export const EditComponent = ({ config, update, remove }: EditComponentProps) => {
    const { ids } = useContext(ComponentFactoryContext)
    const { register, handleSubmit } = useForm<Panel>({
        defaultValues: { ...config ?? {}}
    })
    const onSubmit: SubmitHandler<Panel> = formData => {
        update(formData)
    }
  
    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='entityRef'>Entity Ref</label>
            <input id="entityRef" {...register("entityRef")} />
            <label htmlFor='componentId'>Component</label>
            <select id="componentId" {...register("id")}>
                {ids.map(id => <option value={id}>{id}</option>)}
            </select>
            <input type="submit" value="Save" />
        </form>
        <Button color='secondary' onClick={remove}>Remove</Button>
    </>)
}