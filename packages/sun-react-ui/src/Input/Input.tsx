import React, { ReactNode, InputHTMLAttributes, ChangeEvent } from 'react';
import classNames from 'classnames';
import { sunPrefix } from '../common';
import './style.less';

type InputSize = 'large' | 'small';

interface BasicInputProps {
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
  Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'disabled'>;

const inputPrefixClass = `${sunPrefix}-input`;

function Input(props: InputProps) {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;
  const classes = classNames(`${inputPrefixClass}-wrap`, {
    [`${inputPrefixClass}-${size}-size`]: !!size,
    [`${inputPrefixClass}-append-wrap`]: !!append,
    [`${inputPrefixClass}-prepend-wrap`]: !!prepend,
  });

  return (
    <div className={classes} style={style}>
      {prepend && (
        <div className={`${inputPrefixClass}-prepend`}>{prepend}</div>
      )}
      {icon && <div className={`${inputPrefixClass}-icon-wrap`}>{icon}</div>}
      <input
        className={`${inputPrefixClass}-inner`}
        disabled={disabled}
        {...restProps}
      />
      {append && <div className={`${inputPrefixClass}-append`}>{append}</div>}
    </div>
  );
}

export default Input;
