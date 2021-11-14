import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import { Loader as LoadingIcon } from 'sun-react-icons';
import './style.less';

type Size = 'default' | 'small' | 'large';
interface BaseSpinProps {
  size?: Size;
  tip?: React.ReactNode;
  indicator?: React.ReactNode;
  className?: string;
  spinning?: boolean;
}

type SpinProps = BaseSpinProps & HTMLAttributes<HTMLElement>;

const prefixClassName = 'spin';

function Spin(props: SpinProps) {
  const {
    size = 'default',
    indicator = <LoadingIcon />,
    className,
    tip,
    children,
    spinning = true,
    ...restProps
  } = props;
  if (!spinning) return children as JSX.Element;
  if (!children) {
    return (
      <div className={classnames(prefixClassName, className)} {...restProps}>
        <span
          className={classnames(`${prefixClassName}-indicator`, {
            [`${prefixClassName}-${size}-size`]: !!size,
          })}
        >
          {indicator}
        </span>
      </div>
    );
  }
  return (
    <div className={`${prefixClassName}-container`}>
      <div
        className={classnames(`${prefixClassName}-wrap`, className)}
        {...restProps}
      >
        <span
          className={classnames(`${prefixClassName}-indicator`, {
            [`${prefixClassName}-${size}-size`]: !!size,
          })}
        >
          {indicator}
        </span>
        {tip && <div className={`${prefixClassName}-tip`}>{tip}</div>}
      </div>
      <div className={classnames(`${prefixClassName}-blur`)}>{children}</div>
    </div>
  );
}

export default Spin;
