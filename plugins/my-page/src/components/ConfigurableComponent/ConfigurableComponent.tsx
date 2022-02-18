import { InfoCard, Progress } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { catalogApiRef, EntityProvider } from '@backstage/plugin-catalog-react';
import { Alert } from '@material-ui/lab';
import React, { useContext } from 'react';
import { useAsync } from 'react-use';
import { useConfigSlot } from '../../hooks/useConfigSlot';
import { Slot } from '../../types';
import { ComponentFactoryContext } from '../MyPageComponent';
import AddIcon from '@material-ui/icons/Add';
import { EditHoverOut } from './EditHoverOut';

const EmptySlot = ({ slot, setEditing }: { slot: Slot, setEditing: (editing: boolean) => void }) => {
  return <InfoCard>
    <div
      onClick={() => setEditing(true)}
      onKeyUp={() => setEditing(true)}
      role="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      tabIndex={slot}
      >
      <AddIcon />
    </div>
  </InfoCard>
}

export const ConfigurableComponent = ({ slot, setEditing }: { slot: Slot, setEditing: (editing: boolean) => void }) => {
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

  if (!config.value?.componentId) return <EmptySlot setEditing={setEditing} slot={slot} />
  if (loading) return <Progress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (entity) {
    return (
      <EditHoverOut clickFn={() => setEditing(true)}>
        <EntityProvider entity={entity}>
          {componentFactory(config.value?.componentId, config.value?.props ?? {})}
        </EntityProvider>
      </EditHoverOut>
    );
  }
  return (
    <EditHoverOut clickFn={() => setEditing(true)}>
      {componentFactory(config.value?.componentId, config.value?.props ?? {})}
    </EditHoverOut>
  );
};
