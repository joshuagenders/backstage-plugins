import {
  storageApiRef,
  StorageValueSnapshot,
  useApi,
} from '@backstage/core-plugin-api';
import { useEffect, useState } from 'react';
import { useObservable } from 'react-use';
import { Config } from '../types';

const defaultPanel = { id: '' };
const defaultConfig = { items: [defaultPanel] };

export const useLocalConfig = () => {
  const storageApi = useApi(storageApiRef);
  const data = storageApi.forBucket('my-page');
  const rawConfig = data.snapshot<Config>('config') ?? defaultConfig;
  const [config, setConfig] = useState<StorageValueSnapshot<Config>>(rawConfig);
  const observedConfig = useObservable(data.observe$<Config>('config'));

  useEffect(() => {
    if (observedConfig?.newValue) {
      setConfig(observedConfig);
    }
  }, [observedConfig]);
  return { config, setConfig: (c: Config) => data.set('config', c) };
};
