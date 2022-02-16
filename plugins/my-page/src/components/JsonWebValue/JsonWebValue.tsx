import React from 'react'
import { JSONPath } from 'jsonpath-plus'
import { useAsync } from 'react-use'
import { Alert } from '@material-ui/lab'
import { Progress } from '@backstage/core-components'
import { Chip } from '@material-ui/core'

type Props = {
    title: string
    url: string
    path: string
}
export const JsonWebValue = ({ title, url, path }: Props) => {
    const { value, loading, error } = useAsync(async () => {
        if (!url) return undefined
        const result = await fetch(url)
        const json = await result.json()
        return json
    }, [url])
    if (error) return <Alert severity='error'>{error.message}</Alert>
    if (loading) return <Progress />
    if (!path || !value) return <></>
    // eslint-disable-next-line new-cap
    const extractedValue = JSONPath({ path, json: value })
    return <Chip color="primary" icon={<>{title}</>} label={extractedValue} />
}