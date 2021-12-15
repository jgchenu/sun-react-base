import { sunPrefix } from '../common';
import Trigger, { TriggerProps } from 'rc-trigger';
import { ActionType, AlignType } from 'rc-trigger/lib/interface';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import placements, { Direction } from './placements';

import classNames from 'classnames';

import './style.less';
import { Theme, UIContext } from '../common/context';

export type TooltipProps = {
  placement?: Direction;
  overlay: (() => React.ReactNode) | React.ReactNode;
  trigger?: ActionType | ActionType[];
  children?: React.ReactNode;
  align?: AlignType;
  offset?: number;
  destroyTooltipOnHide?: boolean;
  onVisibleChange?: (v: boolean) => void;
  overlayStyle?: React.CSSProperties;
  overlayClassName?: string;
  visible?: boolean;
  destroyPopupOnHide?: boolean;
  arrow?: boolean;
  theme?: Theme;
} & Omit<TriggerProps, 'popup' | 'children' | 'action'>;

const tooltipPrefixClass = `${sunPrefix}-tooltip`;

export default function Tooltip(props: TooltipProps) {
  const {
    children,
    placement = 'bottom',
    trigger = 'hover',
    overlay,
    overlayClassName,
    destroyPopupOnHide = true,
    align,
    onVisibleChange,
    overlayStyle,
    mouseEnterDelay = 0.2,
    mouseLeaveDelay = 0.2,
    offset = 10,
    arrow = true,
    theme: themeFromProps,
    visible: visibleFromProps,
    ...extraProps
  } = props;

  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  const builtInPlacements = useMemo(() => placements(offset), [offset]);

  const [visible, setVisible] = useState(false);

  const computedVisible = useMemo(() => {
    if (visibleFromProps !== undefined) {
      return visibleFromProps;
    }
    return visible;
  }, [visible, visibleFromProps]);

  const handlePopupVisibleChange = useCallback(
    (v: boolean) => {
      onVisibleChange && onVisibleChange(v);
      setVisible(v);
    },
    [onVisibleChange],
  );

  const popup = useMemo(() => {
    if (!overlay) return null;
    return (
      <>
        {arrow && <div className={`${tooltipPrefixClass}-arrow`}></div>}
        <div className={`${tooltipPrefixClass}-inner`}>{overlay}</div>
      </>
    );
  }, [overlay, arrow]);

  const child = React.isValidElement(children) ? (
    children
  ) : (
    <span>{children}</span>
  );

  const popupClasses = classNames(computedTheme, overlayClassName);

  return (
    <Trigger
      prefixCls={tooltipPrefixClass}
      builtinPlacements={builtInPlacements}
      action={trigger}
      mouseLeaveDelay={mouseLeaveDelay}
      mouseEnterDelay={mouseEnterDelay}
      popup={popup}
      popupVisible={computedVisible}
      onPopupVisibleChange={handlePopupVisibleChange}
      popupPlacement={placement}
      popupClassName={popupClasses}
      popupStyle={overlayStyle}
      popupAlign={align}
      destroyPopupOnHide={destroyPopupOnHide}
      autoDestroy={destroyPopupOnHide}
      {...extraProps}
    >
      {child}
    </Trigger>
  );
}
