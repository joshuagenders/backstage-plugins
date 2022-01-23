import { Progress } from '@backstage/core-components'
import { useApi } from '@backstage/core-plugin-api'
import { catalogApiRef, EntityProvider } from '@backstage/plugin-catalog-react'
import React, { useContext } from 'react'
import { useAsync } from 'react-use'
import { useLocalConfig } from '../../hooks/useLocalConfig'
import { ComponentFactoryContext } from '../MyPageComponent'
import { Alert } from '@material-ui/lab'

export const ViewPageComponent = () => { 
    const { config } = useLocalConfig()
    const catalogApi = useApi(catalogApiRef)
    const { componentFactory } = useContext(ComponentFactoryContext)

    const { value: entities, loading, error } = useAsync(async () => await Promise.all(
        config?.value?.items
            .filter(item => !!item.entityRef)
            .map(async item => {
                const [kind, namespace, name] = item.entityRef!.split(':').map(e => e.split('/')).flat()
                const entity = await catalogApi.getEntityByName({ kind, namespace, name })
                return { entityRef: item.entityRef, entity }
            }) ?? []
    ), [config.value])

    if (loading) return <Progress />
    if (error) return <Alert severity='error'>{error.message}</Alert>
    if (!config?.value) return <></>

    return <>{
        config.value.items.map(v => {
            if (v.entityRef){
                return <EntityProvider entity={entities?.find(e => e.entityRef === v.entityRef)?.entity}>
                    {componentFactory(v.id, {})}
                </EntityProvider>
            }
            return componentFactory(v.id, {})
        })
    }</>
}