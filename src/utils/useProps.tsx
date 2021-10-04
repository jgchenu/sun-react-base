import { MutableRefObject, useRef, useLayoutEffect } from 'react';

export function usePropsRef<T>(props: T): MutableRefObject<T> {
  const propsRef = useRef(props);
  useLayoutEffect(() => {
    propsRef.current = props;
  }, [props]);
  return propsRef;
}
