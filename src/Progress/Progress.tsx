import React, { FC, HTMLAttributes, CSSProperties } from 'react';
import { ThemeProps } from '../Icon';
import './style.less';

interface BasicProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeProps;
}

type ProgressProps = BasicProgressProps & HTMLAttributes<HTMLElement>;

function Progress(props: ProgressProps) {
  const {
    percent,
    strokeHeight = 15,
    showText = true,
    styles,
    theme = 'primary',
    ...restProps
  } = props;
  return (
    <div className="sun-progress-bar" style={styles} {...restProps}>
      <div
        className="sun-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`sun-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
}

export default Progress;
