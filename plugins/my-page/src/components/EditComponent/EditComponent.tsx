import React, { useContext, useState } from 'react'
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
import { InfoCard } from '@backstage/core-components';

const useStyles = makeStyles({
    input: {
      width: '230px',
      padding: '12px 20px',
      margin: '8px',
    },
  });  

export const EditComponent = ({ slot, setEditing }: {slot: Slot, setEditing: (editing: boolean) => void}) => {
    const { config, setConfig } = useConfigSlot(slot)
    const { schema } = useContext(ComponentFactoryContext);
    const ids = [...schema?.map(s => s.id) ?? []]
    const {
      register,
      formState: { errors },
      handleSubmit,
      getValues
    } = useForm<SlotConfig>({
      defaultValues: { ...(config.value ?? {}) },
    });
    const [componentId, setComponentId] = useState(getValues('componentId') ?? config.value?.componentId)
    const onSubmit: SubmitHandler<SlotConfig> = formData => {
      setConfig(formData);
      setEditing(false);
    };
    const style = useStyles();
    const selectedSchema = schema?.find(s => s.id === componentId)
    return (
      <InfoCard>
        <span>
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
              {...register('componentId', { required: true, onChange: () => {
                setComponentId(getValues('componentId'))
              } })}
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
          {selectedSchema?.requiresEntity && 
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
          </FormControl>}
          {
            selectedSchema?.formInputs?.map(input => (
              <FormControl key={`control-${slot}-${input.name}`}>
                <InputLabel color="secondary" variant="outlined" htmlFor={input.name}>
                  {input.displayName}
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
          <Button color="secondary" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </span>
      </InfoCard>
    );
};



