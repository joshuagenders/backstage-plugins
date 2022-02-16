import {
    storageApiRef,
    StorageValueSnapshot,
    useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import { useObservable } from 'react-use';
import { Slot, SlotConfig } from '../types';

export const useConfigSlot = (slot: Slot) => {
    const storageApi = useApi(storageApiRef);
    const data = storageApi.forBucket('my-page');
    const slotKey = `slot.${slot}`;
    const rawConfig = data.snapshot<SlotConfig>(slotKey) ?? {};
    const [config, setConfig] = useState<StorageValueSnapshot<SlotConfig>>(rawConfig);
    const observedConfig = useObservable(data.observe$<SlotConfig>(slotKey));
  
    useEffect(() => {
      if (observedConfig?.newValue) {
        setConfig(observedConfig);
      }
    }, [observedConfig]);
    return { config, setConfig: (c: SlotConfig) => data.set(slotKey, c) };
};
