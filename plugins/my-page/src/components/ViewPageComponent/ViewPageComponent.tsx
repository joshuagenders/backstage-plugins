import { Grid } from '@material-ui/core';
import React from 'react';
import { useLocalConfig } from '../../hooks/useLocalConfig';
import { ConfigurableComponent } from '../ConfigurableComponent';

export const ViewPageComponent = () => {
  const { config } = useLocalConfig();
  if (!config?.value) return <></>;

  return (
    <Grid container>
      {config.value.items.map((v, index) => (
        <ConfigurableComponent key={`c-component-${index}`} {...v} />
      ))}
    </Grid>
  );
};
