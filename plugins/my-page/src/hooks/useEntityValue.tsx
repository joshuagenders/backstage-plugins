import { useEntity } from '@backstage/plugin-catalog-react';

const prop =
  (path: string, separator = '.') =>
  (obj: any) =>
    path
      .split(separator)
      .reduce(
        (prev: any, curr: string) =>
          Object.keys(prev).includes(curr) ? prev[curr] : prev,
        obj,
      );

export const useEntityValue = (path: string) => {
  const { entity, loading, error } = useEntity();
  if (loading) return '';
  if (error) return 'error';
  return prop(path)(entity);
};
