import React, {
  useEffect,
  useState,
  HTMLAttributes,
  ReactElement,
} from 'react';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { UpIcon } from '@/Icon';
import {
  debounce,
  getScroll,
  getDefaultTarget,
  easeInOutCubic,
  usePropsRef,
  sunPrefix,
} from '@/utils';
import './style.less';

const backTopPrefixClass = `${sunPrefix}-back-top`;
interface BackTopProps extends HTMLAttributes<HTMLElement> {
  /** 点击的回调函数 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 距离容器的可见高度 */
  visibilityHeight?: string | number;
  children?: ReactElement;
  /** 自定义容器,默认window */
  target?: () => Window | HTMLElement;
  className?: string;
}

const inBrowser = typeof window !== 'undefined';
const raf = inBrowser
  ? window.requestAnimationFrame
  : (callback: Function) => setTimeout(callback, 16.6);

function BackTop(props: BackTopProps) {
  const {
    visibilityHeight = 400,
    onClick,
    children,
    target: targetFunc = getDefaultTarget,
    className,
    ...restProps
  } = props;
  const [visible, setVisible] = useState(false);
  const propsRef = usePropsRef(visibilityHeight);

  const getCurrentScrollTop = () => {
    const targetNode = targetFunc();
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
        raf(frameFunc);
      } else {
        setScrollTop(0);
      }
    };
    raf(frameFunc);
    onClick && onClick(e);
  };

  const setScrollTop = (value: number) => {
    const targetNode = targetFunc();
    if (targetNode === window) {
      document.body.scrollTop = value;
      document.documentElement!.scrollTop = value;
    } else {
      (targetNode as HTMLElement).scrollTop = value;
    }
  };

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = getScroll(targetFunc(), true);
      setVisible(scrollTop > propsRef.current);
    }, 10);

    targetFunc().addEventListener('scroll', handleScroll);

    return () => {
      targetFunc().removeEventListener('scroll', handleScroll);
    };
  }, [targetFunc]);

  return visible
    ? createPortal(
        <div
          className={classnames(backTopPrefixClass, className)}
          {...restProps}
        >
          <div className={`${backTopPrefixClass}-inner`} onClick={scrollToTop}>
            {children || (
              <div className={`${backTopPrefixClass}-inner-icon`}>
                <UpIcon />
              </div>
            )}
          </div>
        </div>,
        document.body,
      )
    : null;
}

export default BackTop;
