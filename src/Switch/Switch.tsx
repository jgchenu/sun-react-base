import React, { useState, useCallback, HTMLAttributes, FC } from 'react';
import classnames from 'classnames';

interface BasicSwithProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  unCheckedChildren?: React.ReactNode;
  checkedChildren?: React.ReactNode;
  className?: string;
}

type SwithProps = BasicSwithProps &
  Omit<HTMLAttributes<HTMLElement>, 'onChange'>;

const prefixClassName = 'sun-switch';

const Switch: FC<SwithProps> = (props) => {
  const {
    defaultChecked,
    onChange,
    disabled,
    checkedChildren,
    unCheckedChildren,
    className,
    ...restProps
  } = props;
  const [checked, setChecked] = useState(defaultChecked);

  const handleClick = useCallback(() => {
    const changeVal = !checked;
    onChange && onChange(changeVal);
    setChecked(changeVal);
  }, [checked, onChange]);

  return (
    <span
      className={classnames(prefixClassName, className, {
        [`${prefixClassName}-checked`]: checked,
        [`${prefixClassName}-disabled`]: disabled,
      })}
      onClick={disabled ? undefined : handleClick}
      {...restProps}
    >
      <span className={classnames(`${prefixClassName}-inner`)}>
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </span>
  );
};

Switch.defaultProps = {
  defaultChecked: false,
  disabled: false,
};

export default Switch;
