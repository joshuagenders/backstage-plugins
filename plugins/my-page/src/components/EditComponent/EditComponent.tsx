import React, { useContext } from 'react';
import { Panel } from '../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@material-ui/core';
import { ComponentFactoryContext } from '../MyPageComponent';

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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="entityRef">Entity Ref</label>
        <input
          id="entityRef"
          {...register('entityRef', { required: false, pattern: /.+:.+\/.+/ })}
        />
        {errors.entityRef?.type === 'pattern' && (
          <p>'Entity ref must be in the format kind:namespace/name'</p>
        )}
        <label htmlFor="componentId">Component</label>
        <select id="componentId" {...register('id', { required: true })}>
          {ids.map(id => (
            <option key={`scomponent-${id}`} value={id}>
              {id}
            </option>
          ))}
        </select>
        {errors.id?.type === 'required' && <p>'Required'</p>}
        <input type="submit" value="Save" />
      </form>
      <Button color="secondary" onClick={remove}>
        Remove
      </Button>
    </>
  );
};
