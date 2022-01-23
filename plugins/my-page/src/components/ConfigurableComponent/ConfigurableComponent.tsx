import { Progress } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef, EntityProvider } from '@backstage/plugin-catalog-react';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';
import { useAsync } from 'react-use';
import { ComponentFactoryContext } from '../MyPageComponent';

export const ConfigurableComponent = ({
  id,
  entityRef,
}: {
  id: string;
  entityRef?: string;
}) => {
  const { componentFactory } = useContext(ComponentFactoryContext);
  const catalogApi = useApi(catalogApiRef);
  const {
    value: entity,
    loading,
    error,
  } = useAsync(async () => {
    if (!entityRef) return undefined;
    const [kind, namespace, name] = entityRef
      .split(':')
      .map((e: string) => e.split('/'))
      .flat();
    return await catalogApi.getEntityByName({ kind, namespace, name });
  }, [entityRef]);

  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (entity) {
    return (
      <EntityProvider entity={entity}>
        {componentFactory(id, {})}
      </EntityProvider>
    );
  }
  return componentFactory(id, {});
};
