import { Theme } from '../common';
import {
  ReactNode,
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
} from 'react';

export type SkeletonType =
  | 'avatar'
  | 'title'
  | 'paragraph'
  | 'video'
  | 'button';

export interface SkeletonComponentProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  style?: CSSProperties;
  isRTL?: boolean;
  theme?: Theme;
}

export interface SkeletonProps extends SkeletonComponentProps {
  children: ReactNode;
}

export interface SkeletonParagraphProps extends SkeletonComponentProps {
  lines?: number;
  shrinkLastLine?: boolean;
}
