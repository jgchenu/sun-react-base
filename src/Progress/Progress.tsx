import React, { FC, HTMLAttributes, CSSProperties } from 'react';
import { ThemeProps } from '../Icon';
export interface BasicProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeProps;
}
type ProgressProps = BasicProgressProps & HTMLAttributes<HTMLElement>;

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme, ...restProps } =
    props;
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
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;
