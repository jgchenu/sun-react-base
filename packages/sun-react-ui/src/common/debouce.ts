export const debounce = <T>(action: (...args: T[]) => void, time = 200) => {
  let timer: NodeJS.Timeout;
  const fn = (...args: T[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action(...args);
    }, time);
  };
  fn.cancel = () => clearTimeout(timer);
  return fn;
};
