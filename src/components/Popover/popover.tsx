import React, { FC } from "react";
import classnames from "classnames";
import Tooltip from "../Tooltip";

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
export interface PopoverProps {
  /**气泡显示隐藏回调函数 */
  onVisibleChange?: (isVisible: boolean) => void;
  /** 提示标题 */
  title?: React.ReactElement | string;
  /** 提示内容 */
  content?: React.ReactElement | string;
  /**触发方式 */
  trigger?: Trigger;
  /**气泡位置 */
  placement?: Placement;
  /**气泡深浅色主题 */
  theme?: Theme;
  arrowPointAtCenter?: boolean; // 气泡三角居中对齐
  mouseEnterDelay?: number; //鼠标移入显示延迟
  mouseLeaveDelay?: number; // 鼠标移出消失延迟
  isArrowHidden?: boolean; // 是否隐藏三角形
  disabled?: boolean; // 禁用
  visible?: boolean; // 受控显示
  children: React.ReactElement; // 必须为element节点
  positionType?: PositionType; //  气泡的定位属性
  autoAdjustOverflow?: boolean; // 被遮挡时自动调整
  wrapperClassName?: string; // 气泡包裹层的自定义className
}

const prefixClassName = "popover";
export const Popover: FC<PopoverProps> = (props) => {
  const classes = classnames(
    `${prefixClassName}-wrapper`,
    props.wrapperClassName
  );
  const title = (
    <>
      {props.title && (
        <div className={`${prefixClassName}-title-header`}>{props.title}</div>
      )}
      {props.content && (
        <div className={`${prefixClassName}-title-content`}>
          {props.content}
        </div>
      )}
    </>
  );
  return (
    <Tooltip {...props} wrapperClassName={classes} title={title}>
      {props.children}
    </Tooltip>
  );
};

Popover.defaultProps = {
  placement: "bottom",
  trigger: "hover",
  theme: "light",
  isArrowHidden: false, // 隐藏三角箭头
  disabled: false,
  positionType: "absolute",
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  arrowPointAtCenter: false,
};

export default Popover;
