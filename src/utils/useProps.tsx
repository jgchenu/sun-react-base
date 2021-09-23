import { useEffect, MutableRefObject, useRef } from 'react';

export function usePropsRef<T>(props: T): MutableRefObject<T> {
  const propsRef = useRef(props);
  useEffect(() => {
    propsRef.current = props;
  }, [props]);
  return propsRef;
}
