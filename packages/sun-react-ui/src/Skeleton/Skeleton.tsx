import React, { useContext, useMemo } from 'react';
import {
  SkeletonComponentProps,
  SkeletonProps,
  SkeletonParagraphProps,
} from './interface';
import cls from 'classnames';
import { sunPrefix, UIContext } from '../common';

import './style.less';

const skeletonPrefixClass = `${sunPrefix}-skeleton`;

function Skeleton(props: SkeletonProps) {
  const { children, style, className, ...restProps } = props;
  return (
    <div
      {...restProps}
      style={style}
      className={cls(skeletonPrefixClass, className)}
    >
      {children}
    </div>
  );
}

function Paragraph(props: SkeletonParagraphProps) {
  const {
    lines = 2,
    shrinkLastLine = true,
    style,
    className,
    isRTL = false,
    theme: themeFromProps,
    ...restProps
  } = props;

  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  const paragraphLines = [];

  for (let i = 0; i < lines; ++i) {
    paragraphLines.push(
      <div
        key={i}
        className={cls(
          `${skeletonPrefixClass}-paragraph-line`,
          `${skeletonPrefixClass}-component`,
          computedTheme,
        )}
      />,
    );
  }

  return (
    <div
      {...restProps}
      style={style}
      className={cls(`${skeletonPrefixClass}-paragraph`, className, {
        [`${skeletonPrefixClass}-shrink-last-line`]: shrinkLastLine,
        [`${skeletonPrefixClass}-paragraph-rtl`]: isRTL,
      })}
    >
      {paragraphLines}
    </div>
  );
}

function Title(props: SkeletonComponentProps) {
  const { style, className, theme: themeFromProps, ...restProps } = props;
  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  return (
    <div
      style={style}
      className={cls(
        `${skeletonPrefixClass}-title`,
        `${skeletonPrefixClass}-component`,
        className,
        computedTheme,
      )}
      {...restProps}
    />
  );
}

function Avatar(props: SkeletonComponentProps) {
  const { style, className, theme: themeFromProps, ...restProps } = props;
  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  return (
    <div
      {...restProps}
      style={style}
      className={cls(
        `${skeletonPrefixClass}-avatar`,
        `${skeletonPrefixClass}-component`,
        className,
        computedTheme,
      )}
    />
  );
}

function VideoCover(props: SkeletonComponentProps) {
  const { style, className, theme: themeFromProps, ...restProps } = props;
  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  return (
    <div
      {...restProps}
      style={style}
      className={cls(
        `${skeletonPrefixClass}-video-cover ${className}`,
        `${skeletonPrefixClass}-component`,
        computedTheme,
      )}
    />
  );
}

function Button(props: SkeletonComponentProps) {
  const { style, className, theme: themeFromProps, ...restProps } = props;
  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  return (
    <div
      {...restProps}
      style={style}
      className={cls(
        `${skeletonPrefixClass}-button`,
        `${skeletonPrefixClass}-component`,
        className,
        computedTheme,
      )}
    />
  );
}

function TextBox(props: SkeletonComponentProps) {
  const { style, className, theme: themeFromProps, ...restProps } = props;
  const { theme } = useContext(UIContext);

  const computedTheme = useMemo(() => {
    return themeFromProps || theme || 'dark';
  }, [theme, themeFromProps]);

  return (
    <div
      {...restProps}
      style={style}
      className={cls(
        `${skeletonPrefixClass}-textbox`,
        `${skeletonPrefixClass}-component`,
        className,
        computedTheme,
      )}
    />
  );
}

Skeleton.Paragraph = Paragraph;
Skeleton.Title = Title;
Skeleton.Avatar = Avatar;
Skeleton.VideoCover = VideoCover;
Skeleton.Button = Button;
Skeleton.TextBox = TextBox;

export default Skeleton;
