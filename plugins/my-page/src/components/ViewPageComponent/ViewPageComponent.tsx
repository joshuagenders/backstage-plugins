import React from 'react';
import { useLocalConfig } from '../../hooks/useLocalConfig';
import { ConfigurableComponent } from '../ConfigurableComponent';

export const ViewPageComponent = () => {
  const { config } = useLocalConfig();
  if (!config?.value) return <></>;

  return (
    <>
      {config.value.items.map((v, index) => (
        <ConfigurableComponent key={`c-component-${index}`} {...v} />
      ))}
    </>
  );
};
