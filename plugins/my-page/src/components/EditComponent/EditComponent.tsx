import React, { useContext } from 'react';
import { Panel } from '../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, makeStyles, FormControl, InputLabel, Input, MenuItem, Select } from '@material-ui/core';
import { ComponentFactoryContext } from '../MyPageComponent';

const useStyles = makeStyles({
  input: {
    width: '230px',
    padding: '12px 20px',
    margin: '8px'
  }
})

type EditComponentProps = {
  config: Panel | undefined;
  update: (config: Panel) => void;
  remove: () => void;
};

export const EditComponent = ({
  config,
  update,
  remove,
}: EditComponentProps) => {
  const { ids } = useContext(ComponentFactoryContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Panel>({
    defaultValues: { ...(config ?? {}) },
  });
  const onSubmit: SubmitHandler<Panel> = formData => {
    update(formData);
  };
  const style = useStyles()
  return (
    <div style={{margin: '10px'}}>
      <p>
      <FormControl>
        <InputLabel color='secondary' variant='outlined' htmlFor="entityRef">Entity Ref</InputLabel>
        <Input 
          id="entityRef"
          {...register('entityRef', { required: false, pattern: /.+:.+\/.+/ })}
          className={style.input}
          aria-describedby="Entity Reference. E.g. user:default/guest" />
        {errors.entityRef?.type === 'pattern' && (
          <p>'Entity ref must be in the format kind:namespace/name'</p>
        )}
      </FormControl>
      <FormControl>
        <InputLabel color='secondary' variant='outlined' htmlFor="componentId">Component</InputLabel>
        <Select
          id="componentId"
          {...register('id', { required: true })}
          className={style.input}
        >
          {ids.map(id => (
            <MenuItem key={`scomponent-${id}`} value={id}>
              {id}
            </MenuItem>
          ))}
        </Select>
        {errors.id?.type === 'required' && <p>'Required'</p>}
      </FormControl>
      </p>
      <p>
        <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        <Button color="secondary" onClick={remove}>Remove</Button>
      </p>
    </div>
  );
};
