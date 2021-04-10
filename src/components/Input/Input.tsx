import React, { FC, ReactNode, InputHTMLAttributes, ChangeEvent } from "react";
import classNames from "classnames";

type InputSize = "lg" | "sm";
export interface BasicInputProps {
  /**是否禁用 Input */
  disabled?: boolean;
  /**设置 input 大小，支持 lg 或者是 sm */
  size?: InputSize;
  /**添加图标，在右侧悬浮添加一个图标，用于提示 */
  icon?: ReactNode;
  /**添加前缀 用于配置一些固定组合 */
  prepend?: string | ReactNode;
  /**添加后缀 用于配置一些固定组合 */
  append?: string | ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

type InputProps = BasicInputProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange" | "disabled">;

const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const cnames = classNames("sun-input-wrap", {
    [`input-size-${size}`]: !!size,
    "is-disabled": !!disabled,
    "input-group": !!prepend || !!append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={cnames} style={style}>
      {prepend && <div className="sun-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrap">{icon}</div>}
      <input className="sun-input-inner" disabled={disabled} {...restProps} />
      {append && <div className="sun-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
