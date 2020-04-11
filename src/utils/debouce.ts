export const debounce = (action: Function, time: number = 200) => {
  let timer: NodeJS.Timeout;
  let fn: any;
  fn = (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action.apply(null, args);
    }, time);
  };
  fn.cancel = () => clearTimeout(timer);
  return fn;
};
