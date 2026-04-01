import { omitBy } from 'es-toolkit/object';

/**
 * If truthy, returns `val`, if falsy, returns `undefined`.
 */
export function emptyStrToUndefined(val: string | undefined | null) {
  return val || undefined;
}

/**
 * Omit any falsy value that isn't `0` or `false`.
 */

// biome-ignore lint/suspicious/noExplicitAny: <Need for TS to accept any values.>
export function omitEmpty(obj: Record<string, any>) {
  const omitted = omitBy(
    obj,
    (value) => !value && value !== 'number' && typeof value !== 'boolean',
  );

  return omitted;
}
