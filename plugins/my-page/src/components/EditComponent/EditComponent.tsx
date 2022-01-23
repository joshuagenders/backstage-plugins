import React from 'react'
import { Panel } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@material-ui/core'

type EditComponentProps = {
    config: Panel | undefined
    update: (config: Panel) => void
    remove: () => void 
}

export const EditComponent = ({ config, update, remove }: EditComponentProps) => {
    const { register, handleSubmit } = useForm<Panel>({
        defaultValues: { ...config ?? { rows:0, columns:0 }}
    })
    const onSubmit: SubmitHandler<Panel> = formData => {
        update(formData)
    }
  
    return (<>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("rows")} />
        <input {...register("columns")} />  
        <input type="submit" />
    </form>
    <Button color='secondary' onClick={remove}>Remove</Button>

    </>)
}