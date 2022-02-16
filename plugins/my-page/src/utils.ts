const matched = <T>(value: T) => ({
  when: () => matched(value),
  otherwise: () => value,
});

export const match = <T>(value: T) => ({
  when: (predicateFn: (value: T) => boolean, thenFn: (value: T) => any) =>
    predicateFn(value) ? matched(thenFn(value)) : match(value),
  otherwise: (thenFn: (value: T) => any) => thenFn(value),
});

export const eq = (a: any) => (b: any) => a === b;

export const range = (
  size: number,
  startAt: number = 0,
): ReadonlyArray<number> => [...Array(size).keys()].map(i => i + startAt);
