import { InfoCard } from '@backstage/core-components';
import { Grid } from '@material-ui/core';
import React from 'react';

// should take a configuration and be able to display it
// needs a way to access a component - create a useComponent(component, config) hook?
// need access to a component context / component provider?
export const ConfigurableGridComponent = ({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) => (
  <InfoCard>
    <Grid container spacing={5}>
      {Array.from({ length: rows }, (_, r) => (
        <Grid container direction="row" key={`cgrid-row-${r}`}>
          {Array.from({ length: columns }, (__, c) => (
            <Grid item key={`cgrid-item-${r}-${c}`}>
              c: {c} r: {r}
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  </InfoCard>
);
