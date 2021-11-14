import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import { sunPrefix } from '../utils';
import './style.less';

type ButtonSize = 'large' | 'small';
type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  /** 禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: ButtonSize;
  /** 类型 */
  type?: ButtonType;
  /** link类型button的href */
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLElement>, 'type'>;
type AnchorButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLElement>, 'type'>;

type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const buttonPrefixClass = `${sunPrefix}-btn`;

function Button(props: ButtonProps) {
  const {
    type = 'default',
    className,
    disabled = false,
    size,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames(buttonPrefixClass, className, {
    [`${buttonPrefixClass}-${type}`]: type,
    [`${buttonPrefixClass}-${size}`]: size,
    disabled: type === 'link' && disabled,
  });
  if (type === 'link') {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
}

export default Button;
