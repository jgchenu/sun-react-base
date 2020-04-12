import { useEffect } from "react";

function useDisableBodyScroll(disabled: boolean) {
  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [disabled]);
}

export default useDisableBodyScroll;
