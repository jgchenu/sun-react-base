import classnames from "classnames";
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  FC,
} from "react";
import { createPortal } from "react-dom";
import { usePropsRef } from "./../../hooks/useProps";
import { debounce, isUndefined } from "../../utils";
import Transition, { AnimationName } from "../Transition";

export type Placement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
export type PositionType = "fixed" | "absolute" | "sticky";
export type Theme = "dark" | "light";
export type Trigger = "hover" | "click";
export interface TooltipProps {
  /**气泡显示隐藏回调函数 */
  onVisibleChange?: (isVisible: boolean) => void;
  /**提示标题 */
  title: React.ReactElement | string;
  /**触发方式 */
  trigger?: Trigger;
  /**气泡位置 */
  placement?: Placement;
  /**气泡深浅色主题 */
  theme?: Theme;
  /**气泡三角居中对齐 */
  arrowPointAtCenter?: boolean;
  /**鼠标移入显示延迟 */
  mouseEnterDelay?: number;
  /**鼠标移出消失延迟 */
  mouseLeaveDelay?: number;
  /**是否隐藏三角形 */
  isArrowHidden?: boolean;
  /**禁用 */
  disabled?: boolean;
  /**受控显示 */
  visible?: boolean;
  /** 必须为element节点 */
  children: React.ReactElement;
  /**气泡的定位属性 */
  positionType?: PositionType;
  /**被遮挡时自动调整 */
  autoAdjustOverflow?: boolean;
  /**气泡包裹层的自定义className */
  className?: string;
}

// 组件的classname前缀
const prefixClassName = "tooltip";
// 三角形距离气泡偏移量
const arrowOffset = 14;
// 三角形的宽度
const arrowWidth = 8;
// 计算居中的buffer
const bufferOffset = arrowOffset + arrowWidth / 2;

/**
 * 为网站提供气泡功能。
 * ~~~js
 * import { Tooltip } from 'sun-react-ui'
 * ~~~
 */
export const Tooltip: FC<TooltipProps> = (props) => {
  const {
    title,
    theme,
    trigger,
    autoAdjustOverflow,
    placement: placementFromProps = "bottom",
    isArrowHidden,
    disabled,
    onVisibleChange,
    visible: visibleFromProps,
    positionType: positionTypeFromProps,
    mouseEnterDelay,
    mouseLeaveDelay,
    arrowPointAtCenter,
    className,
  } = props;
  // 是否hover触发
  const isHover = trigger === "hover";
  // 气泡跟trigger元素的偏移量，如果是隐藏三角形，应该缩小偏移量
  const offset = isArrowHidden ? 0 : 5;
  const [mounted, setMounted] = useState(false);
  const [adjustPlacement, setAdjustPlacement] = useState(
    String(placementFromProps)
  );
  const [positionsState, setPositions] = useState({
    left: 0,
    top: 0,
  });
  const propsRef = usePropsRef(props);
  const wrapper = useRef<HTMLDivElement>(null);
  const triggerWrapper = useRef<HTMLDivElement>(null);

  const onDebounceCloseVisible = useRef(
    debounce(() => {
      // 如果props的visible控制 则不做任何操作
      propsRef.current.onVisibleChange &&
        propsRef.current.onVisibleChange(false);
      if (propsRef.current.visible !== undefined) {
        return;
      }
      setMounted(false);
    }, mouseLeaveDelay)
  ).current;

  const onDebounceOpenVisible = useRef(
    debounce(() => {
      propsRef.current.onVisibleChange &&
        propsRef.current.onVisibleChange(true);
      // 如果props的visible控制 则不做任何操作
      if (!isUndefined(propsRef.current.visible)) {
        return;
      }
      setMounted(true);
    }, mouseEnterDelay)
  ).current;

  const onOpenTooltip = useCallback(() => {
    // 当鼠标hover或者点击时候触发
    // 如果 鼠标离开了当前目标 (或者划过了间隙) 又马上 focus 上去 就取消关闭。取消这个debounce是为了防止不断快速触发关闭导致的性能问题
    onDebounceCloseVisible.cancel();
    onDebounceOpenVisible();
  }, [onDebounceCloseVisible, onDebounceOpenVisible]);

  const onCloseTooltip = useCallback(() => {
    // 当鼠标离开hover或者click额外区域触发
    // 如果只是划过去，那么不显示气泡
    onDebounceOpenVisible.cancel();
    onDebounceCloseVisible();
  }, [onDebounceCloseVisible, onDebounceOpenVisible]);

  const bindTriggerEvents = useMemo(() => {
    if (!disabled) {
      if (isHover) {
        const originMouseEnter =
          propsRef.current.children.props["onMouseEnter"];
        const originMouseLeave =
          propsRef.current.children.props["onMouseLeave"];
        return {
          onMouseEnter: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            originMouseEnter && originMouseEnter(e);
            onOpenTooltip();
          },
          onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            originMouseLeave && originMouseLeave(e);
            onCloseTooltip();
          },
        };
      }
      const originClick = propsRef.current.children.props["onClick"];
      return {
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          originClick && originClick(e);
          onOpenTooltip();
        },
      };
    }
    return {};
  }, [disabled, isHover, onOpenTooltip, onCloseTooltip, propsRef]);

  const computedPlacement = useMemo(() => {
    if (!autoAdjustOverflow) {
      return placementFromProps;
    }
    return adjustPlacement;
  }, [autoAdjustOverflow, placementFromProps, adjustPlacement]);

  const computeAndSetPositions = useCallback(() => {
    if (!triggerWrapper.current || !wrapper.current) {
      return;
    }
    // 触发元素
    const {
      width,
      height,
      top,
      left,
    } = triggerWrapper.current.getBoundingClientRect();
    // 气泡
    const {
      height: wrapperHeight,
      width: wrapperWidth,
    } = wrapper.current.getBoundingClientRect();

    const { innerHeight, innerWidth } = window;

    let { scrollX, scrollY } = window;
    const isFixed =
      positionTypeFromProps === "fixed" || positionTypeFromProps === "sticky";
    scrollX = isFixed ? 0 : scrollX;
    scrollY = isFixed ? 0 : scrollY;
    const positions = {
      top: {
        top: top + scrollY - wrapperHeight - offset,
        left: left + scrollX + width / 2 - wrapperWidth / 2,
      },
      bottom: {
        top: top + height + scrollY + offset,
        left: left + scrollX + width / 2 - wrapperWidth / 2,
      },
      left: {
        top: top + scrollY + height / 2 - wrapperHeight / 2,
        left: left + scrollX - wrapperWidth - offset,
      },
      right: {
        top: top + scrollY + height / 2 - wrapperHeight / 2,
        left: left + scrollX + width + offset,
      },
      topLeft: {
        top: top + scrollY - wrapperHeight - offset,
        left: arrowPointAtCenter
          ? left + scrollX + width / 2 - bufferOffset
          : left + scrollX,
      },
      topRight: {
        top: top + scrollY - wrapperHeight - offset,
        left: arrowPointAtCenter
          ? left + scrollX + width / 2 - (wrapperWidth - bufferOffset)
          : left + scrollX - (wrapperWidth - width),
      },
      rightTop: {
        top: arrowPointAtCenter
          ? top + scrollY + height / 2 - bufferOffset
          : top + scrollY,
        left: left + scrollX + width + offset,
      },
      rightBottom: {
        top: arrowPointAtCenter
          ? top + scrollY + height / 2 - (wrapperHeight - bufferOffset)
          : top + scrollY - (wrapperHeight - height),
        left: left + scrollX + width + offset,
      },
      bottomLeft: {
        top: top + height + scrollY + offset,
        left: arrowPointAtCenter
          ? left + scrollX + width / 2 - bufferOffset
          : left + scrollX,
      },
      bottomRight: {
        top: top + height + scrollY + offset,
        left: arrowPointAtCenter
          ? left + scrollX + width / 2 - (wrapperWidth - bufferOffset)
          : left + scrollX - (wrapperWidth - width),
      },
      leftTop: {
        top: arrowPointAtCenter
          ? top + scrollY + height / 2 - bufferOffset
          : top + scrollY,
        left: left + scrollX - wrapperWidth - offset,
      },
      leftBottom: {
        top: arrowPointAtCenter
          ? top + scrollY + height / 2 - (wrapperHeight - bufferOffset)
          : top + scrollY - (wrapperHeight - height),
        left: left + scrollX - wrapperWidth - offset,
      },
    };
    if (!autoAdjustOverflow) {
      return setPositions(positions[placementFromProps]);
    }
    let resetPlacement = String(placementFromProps);
    if (positions[placementFromProps].top - scrollY < 0) {
      resetPlacement = resetPlacement.replace("top", "bottom");
    }
    if (
      positions[placementFromProps].top + offset + wrapperHeight - scrollY >
      innerHeight
    ) {
      resetPlacement = resetPlacement.replace("bottom", "top");
    }
    if (positions[placementFromProps].left - scrollX < 0) {
      resetPlacement = resetPlacement.replace("left", "right");
    }
    if (
      positions[placementFromProps].left + wrapperWidth + offset - scrollX >
      innerWidth
    ) {
      resetPlacement = resetPlacement.replace("right", "left");
    }
    setAdjustPlacement(resetPlacement);
    setPositions(positions[resetPlacement as keyof typeof positions]);
  }, [
    arrowPointAtCenter,
    offset,
    positionTypeFromProps,
    placementFromProps,
    autoAdjustOverflow,
  ]);

  const onResizeHandler = useRef(
    debounce(() => {
      computeAndSetPositions();
    }, 500)
  ).current;

  useEffect(() => {
    // 用于根据上层传过来的visibleFromProps 进行portal的节点挂载跟动画开始
    if (!isUndefined(visibleFromProps)) {
      // visibleFromProps为true的时候，直接挂载节点跟执行显示动画
      if (visibleFromProps) {
        setMounted(visibleFromProps);
      }
    }
  }, [visibleFromProps]);

  useEffect(() => {
    // 在portal节点挂载之后才进行定位计算
    if (mounted) {
      computeAndSetPositions();
    }
  }, [mounted, computeAndSetPositions]);

  useEffect(() => {
    window.addEventListener("click", onClickOutsideHandler, false);
    window.addEventListener("resize", onResizeHandler);
    positionTypeFromProps === "sticky" &&
      window.addEventListener("scroll", onResizeHandler);
    return () => {
      window.removeEventListener("click", onClickOutsideHandler, false);
      window.removeEventListener("resize", onResizeHandler);
      positionTypeFromProps === "sticky" &&
        window.removeEventListener("scroll", onResizeHandler);
    };
  });

  // 在组件卸载的时候，要把定时器都清除了,避免内存泄漏
  useEffect(() => {
    return () => {
      onDebounceCloseVisible.cancel();
      onDebounceOpenVisible.cancel();
    };
  }, [onDebounceCloseVisible, onDebounceOpenVisible]);

  function onClickOutsideHandler(e: MouseEvent) {
    e.stopPropagation();
    if (wrapper.current && triggerWrapper.current) {
      if (
        mounted &&
        !wrapper.current.contains(e.target as Node) &&
        !triggerWrapper.current.contains(e.target as Node)
      ) {
        // 如果props的visible控制 则不做任何操作,回调告诉外层的onVisbleChange函数
        if (!isUndefined(visibleFromProps)) {
          onVisibleChange && onVisibleChange(false);
          return;
        }
        setMounted(false);
      }
    }
  }

  function renderContent() {
    return (
      <>
        {!isArrowHidden && (
          <div className={classnames(`${prefixClassName}-arrow`)}></div>
        )}
        {title && <div className={`${prefixClassName}-title`}>{title}</div>}
      </>
    );
  }

  // 判断是非html-element则包裹一层,支持ref, 主要为了避免FC组件没有做forwardRef的兼容
  const safetyChildren =
    typeof props.children.type !== "function" ? (
      props.children
    ) : (
      <span className="fc-component-wrap">{props.children}</span>
    );

  return (
    <>
      {createPortal(
        <Transition
          in={mounted}
          timeout={300}
          animation={`slide-in-${computedPlacement}` as AnimationName}
        >
          <div
            className={classnames(
              `${prefixClassName}-wrap`,
              `${prefixClassName}-position-${computedPlacement}`,
              `${prefixClassName}-${theme}`,
              className,
              {
                [`${prefixClassName}-wrap-fixed`]:
                  positionTypeFromProps === "fixed" ||
                  positionTypeFromProps === "sticky",
              }
            )}
            style={positionsState}
            ref={wrapper}
            onMouseEnter={isHover ? onOpenTooltip : undefined}
            onMouseLeave={isHover ? onCloseTooltip : undefined}
          >
            {renderContent()}
          </div>
        </Transition>,
        document.body
      )}
      {cloneElement(safetyChildren, {
        ref: triggerWrapper,
        ...bindTriggerEvents,
      })}
    </>
  );
};

Tooltip.defaultProps = {
  placement: "bottom",
  trigger: "hover",
  theme: "dark",
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  isArrowHidden: false,
  disabled: false,
  positionType: "absolute",
  arrowPointAtCenter: false,
  autoAdjustOverflow: true,
};

export default Tooltip;
