import { Progress } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef, EntityProvider } from '@backstage/plugin-catalog-react';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';
import { useAsync } from 'react-use';
import { useConfigSlot } from '../../hooks/useConfigSlot';
import { Slot } from '../../types';
import { ComponentFactoryContext } from '../MyPageComponent';

export const ConfigurableComponent = ({ slot }: { slot: Slot }) => {
  const { config } = useConfigSlot(slot)
  const { componentFactory } = useContext(ComponentFactoryContext);
  const catalogApi = useApi(catalogApiRef);
  const {
    value: entity,
    loading,
    error,
  } = useAsync(async () => {
    if (!config.value?.entityRef) return undefined;
    const [kind, namespace, name] = config.value?.entityRef
      .split(':')
      .map((e: string) => e.split('/'))
      .flat();
    return await catalogApi.getEntityByName({ kind, namespace, name });
  }, [config]);

  if (!config.value?.componentId) return <></>
  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (entity) {
    return (
      <EntityProvider entity={entity}>
        {componentFactory(config.value?.componentId, config.value?.props ?? {})}
      </EntityProvider>
    );
  }
  return componentFactory(config.value?.componentId, config.value?.props ?? {});
};
