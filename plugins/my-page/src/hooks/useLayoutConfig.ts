import {
  storageApiRef,
  StorageValueSnapshot,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import { useObservable } from 'react-use';
import { LayoutConfig } from '../types';

export const useLayoutConfig = () => {
  const storageApi = useApi(storageApiRef);
  const data = storageApi.forBucket('my-page');
  const key = 'layout';
  const rawConfig = data.snapshot<LayoutConfig>(key) ?? {};
  const [config, setConfig] =
    useState<StorageValueSnapshot<LayoutConfig>>(rawConfig);
  const observedConfig = useObservable(data.observe$<LayoutConfig>(key));

  useEffect(() => {
    if (observedConfig?.newValue) {
      setConfig(observedConfig);
    }
  }, [observedConfig]);
  return { config, setConfig: (c: LayoutConfig) => data.set(key, c) };
};
