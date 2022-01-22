import React from 'react'
import { storageApiRef, useApi } from '@backstage/core-plugin-api'
import { useObservable } from 'react-use'
import { useForm, SubmitHandler } from "react-hook-form"

type Config = {
    rows: number
    columns: number
}

export const EditPageComponent = () => {
    const storageApi = useApi(storageApiRef)
    const data = storageApi.forBucket('my-page')
    const config = useObservable(data.observe$<Config>('config'))

    const { register, handleSubmit } = useForm<Config>({
        defaultValues: { ...config?.value ?? { rows:0, columns:0 }}
    })
    const onSubmit: SubmitHandler<Config> = formData => {
        data.set('config', formData)
    }
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("rows")} />
        <input {...register("columns")} />  
        <input type="submit" />
    </form>
    )
}