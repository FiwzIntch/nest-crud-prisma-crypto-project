import { TransformFnParams } from 'class-transformer';

export const transformIntOptional = (
  param: TransformFnParams,
): number | undefined | null => {
  if (param.value === 'null') {
    return null;
  }
  const value = parseInt(param.value);
  if (isNaN(value)) {
    return undefined;
  }
  return value;
};
