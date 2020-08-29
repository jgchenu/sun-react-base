import React, { useState, useCallback } from "react";
import classnames from "classnames";

interface SwithProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  unCheckedChildren?: React.ReactNode;
  checkedChildren?: React.ReactNode;
  className?: string;
}

const prefixClassName = "sun-switch";

Switch.defaultProps = {
  defaultChecked: false,
  disable: false,
};

function Switch(props: SwithProps) {
  const {
    defaultChecked,
    onChange,
    disabled,
    checkedChildren,
    unCheckedChildren,
    className,
    ...rest
  } = props;
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = useCallback(() => {
    onChange && onChange(!checked);
    setChecked(!checked);
  }, [checked, onChange]);

  return (
    <span
      {...rest}
      className={classnames(prefixClassName, className, {
        [`${prefixClassName}-checked`]: checked,
        [`${prefixClassName}-disabled`]: disabled,
      })}
      onClick={disabled ? undefined : handleClick}
    >
      <span className={classnames(`${prefixClassName}-inner`)}>
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </span>
  );
}

export default Switch;
