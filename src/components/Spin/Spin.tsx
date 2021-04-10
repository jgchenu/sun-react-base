import React, { HTMLAttributes, FC } from "react";
import classnames from "classnames";
import { LoadingIcon } from "../Icon";

type Size = "default" | "small" | "large";
interface BaseSpinProps {
  size?: Size;
  tip?: string;
  children: React.ReactElement | null;
  indicator?: React.ReactElement;
  className?: string;
  spinning?: boolean;
}
export type SpinProps = BaseSpinProps & HTMLAttributes<HTMLElement>;

const prefixClassName = "spin";
const Spin: FC<SpinProps> = (props) => {
  const {
    size,
    indicator,
    className,
    tip,
    children,
    spinning,
    ...restProps
  } = props;
  if (!spinning) return children;
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
};

Spin.defaultProps = {
  indicator: <LoadingIcon />,
  spinning: true,
  children: null,
  size: "default",
};

export default Spin;
