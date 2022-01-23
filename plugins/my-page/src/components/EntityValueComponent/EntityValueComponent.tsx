import React from 'react';
import { useEntityValue } from '../../hooks/useEntityValue';
import Chip from '@material-ui/core/Chip';

export const EntityValueComponent = ({ path }: { path: string }) => {
  const value = useEntityValue(path);
  return <Chip label={value} />;
};
