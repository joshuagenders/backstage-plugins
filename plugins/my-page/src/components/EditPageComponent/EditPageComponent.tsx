import React from 'react';
import { Panel } from '../../types';
import { EditComponent } from '../EditComponent';
import { Button } from '@material-ui/core';
import { useLocalConfig } from '../../hooks/useLocalConfig';

export const EditPageComponent = () => {
  const { config, setConfig } = useLocalConfig();
  const update = (index: number) => (c: Panel) => {
    setConfig({
      items: config?.value?.items.map((v, i) => (index === i ? c : v)) ?? [],
    });
  };
  const add = () => {
    setConfig({
      items: [...(config?.value?.items ?? [{ id: '' }]), { id: '' }],
    });
  };
  const remove = (index: number) => () => {
    setConfig({
      items: config?.value?.items.filter((_, i) => i !== index) ?? [],
    });
  };
  return (
    <>
      <Button color="primary" onClick={add}>
        Add
      </Button>
      {config?.value?.items?.map((v, index) => (
        <EditComponent
          key={`edit-${index}`}
          config={v}
          update={update(index)}
          remove={remove(index)}
        />
      ))}
    </>
  );
};
