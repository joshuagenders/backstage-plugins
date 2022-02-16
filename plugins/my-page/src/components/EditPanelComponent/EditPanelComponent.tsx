import React, { useContext } from 'react'
import { useConfigSlot } from '../../hooks/useConfigSlot'
import { Slot, SlotConfig } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Button,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  NativeSelect
} from '@material-ui/core';
import { ComponentFactoryContext } from '../MyPageComponent';

const useStyles = makeStyles({
    input: {
      width: '230px',
      padding: '12px 20px',
      margin: '8px',
    },
  });  

export const EditPanelComponent = ({ slot, setEditing }: {slot: Slot, setEditing: (editing: boolean) => void}) => {
    const { config, setConfig } = useConfigSlot(slot)
    const { ids, schema } = useContext(ComponentFactoryContext);
    const {
      register,
      formState: { errors },
      handleSubmit,
      getValues
    } = useForm<SlotConfig>({
      defaultValues: { ...(config.value ?? {}) },
    });
    const onSubmit: SubmitHandler<SlotConfig> = formData => {
      setConfig(formData);
      setEditing(false);
    };
    const style = useStyles();
    return (
      <div style={{ margin: '10px' }}>
        <span>
          <FormControl>
            <InputLabel color="secondary" variant="outlined" htmlFor="entityRef">
              Entity Ref
            </InputLabel>
            <Input
              id="entityRef"
              {...register('entityRef', {
                required: false,
                pattern: /.+:.+\/.+/,
              })}
              className={style.input}
              aria-describedby="Entity Reference. E.g. user:default/guest"
            />
            {errors.entityRef?.type === 'pattern' && (
              <p>'Entity ref must be in the format kind:namespace/name'</p>
            )}
          </FormControl>
          <FormControl>
            <InputLabel
              color="secondary"
              variant="outlined"
              htmlFor="componentId"
            >
              Component
            </InputLabel>
            <NativeSelect
              id="componentId"
              {...register('componentId', { required: true })}
              className={style.input}
            >
              {ids.map(id => (
                <option key={`scomponent-${id}`} value={id}>
                  {id}
                </option>
              ))}
            </NativeSelect>
            {errors.componentId?.type === 'required' && <p>'Required'</p>}
          </FormControl>
          {
            schema?.get(getValues('componentId') ?? '')?.map(input => (
              <FormControl key={`control-${slot}-${input.name}`}>
                <InputLabel color="secondary" variant="outlined" htmlFor={input.name}>
                  {input.name}
                </InputLabel>
                <Input
                  id={input.name}
                  {...register(`props.${input.name}`, {
                    required: input.required,
                  })}
                  className={style.input}
                  aria-describedby={input.description}
                />
              </FormControl>
            ))
          }
        </span>
        <span>
          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
          <Button color="secondary" onClick={() => setConfig({})}>
            Reset
          </Button>
        </span>
      </div>
    );
};



