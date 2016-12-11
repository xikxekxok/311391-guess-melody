export const checkIsProvided = (param, paramName) => {
  if (!param) {
    throw Error(`${paramName} not provided!`);
  }
};

export const checkNotUndefined = (param, paramName) => {
  if (param === void (0)) {
    throw Error(`${param} is undefined!`);
  }
};
