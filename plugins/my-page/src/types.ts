export type Config = {
  items: Panel[];
};

export type Panel = {
  id: string;
  entityRef?: string;
};

export type Slot = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type SlotConfig = {
  componentId?: string
  entityRef?: string
  props?: { [name: string]: string }
}

export type Layout = {
  name: string
  displayName: string
}
export type LayoutConfig = {
  layoutName: string
}

export type InputTypes = 'number' | 'string'
export type FormInputs = {
  name: string,
  type: InputTypes
  required?: boolean
  description?: string
}
