import React, { useEffect, useState, useRef, FC, HTMLAttributes } from "react";
import classnames from "classnames";
import { createPortal } from "react-dom";
import {
  debounce,
  getScroll,
  getDefaultTarget,
  easeInOutCubic,
} from "../../utils";
import { UpIcon } from "./../Icon";
import Transition from "../Transition";
import { usePropsRef } from "../../hooks/useProps";

interface BaseBackTopProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  visibilityHeight?: string | number;
  children?: React.ReactElement;
  target?: () => Window | HTMLElement;
  className?: string;
}

type BackTopProps = BaseBackTopProps & HTMLAttributes<HTMLElement>;

const prefixClassName = "sun-back-top";
const raf = window.requestAnimationFrame;

export const BackTop: FC<BackTopProps> = (props) => {
  const {
    visibilityHeight = 400,
    onClick,
    children,
    target: targetFunc,
    className,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(false);
  const propsRef = usePropsRef(visibilityHeight);

  const handleScroll = useRef(
    debounce(() => {
      const scrollTop = getScroll(getDefaultTarget(), true);
      setVisible(scrollTop > propsRef.current);
    }, 100)
  ).current;

  const getCurrentScrollTop = () => {
    const getTarget = targetFunc || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      return (
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement!.scrollTop
      );
    }
    return (targetNode as HTMLElement).scrollTop;
  };

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollTop = getCurrentScrollTop();
    const startTime = Date.now();
    const frameFunc = () => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        window.requestAnimationFrame(frameFunc);
      } else {
        setScrollTop(0);
      }
    };
    raf(frameFunc);
    onClick && onClick(e);
  };

  const setScrollTop = (value: number) => {
    const getTarget = targetFunc || getDefaultTarget;
    const targetNode = getTarget();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement!.scrollTop = value;
    } else {
      (targetNode as HTMLElement).scrollTop = value;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return createPortal(
    <Transition animation="slide-in-mask" in={visible} timeout={300}>
      <div className={classnames(prefixClassName, className)} {...restProps}>
        <div className={`${prefixClassName}-inner`} onClick={scrollToTop}>
          {children || (
            <div className={`${prefixClassName}-inner-icon`}>
              <UpIcon />
            </div>
          )}
        </div>
      </div>
    </Transition>,
    document.body
  );
};

BackTop.defaultProps = {
  visibilityHeight: 400,
};

export default BackTop;
