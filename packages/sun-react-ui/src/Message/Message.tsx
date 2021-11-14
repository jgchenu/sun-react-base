import React, { useEffect, useState, FC, HTMLAttributes } from 'react';
import { render, unmountComponentAtNode, createPortal } from 'react-dom';

import classnames from 'classnames';
import { sunPrefix, usePropsRef } from '../utils';

import {
  Info as InfoIcon,
  Check as SuccessIcon,
  XCircle as ErrorIcon,
  AlertCircle as WarningIcon,
  Loader as LoadingIcon,
} from 'sun-react-icons';
import './style.less';

type MessageTheme = 'dark' | 'light';
type MessageIconType = 'info' | 'success' | 'error' | 'warning' | 'loading';

interface BaseMessageProps {
  top?: number;
  theme?: MessageTheme;
  className?: string;
  title?: string;
  type?: MessageIconType;
  onClose?: () => void;
  duration?: number;
}

type MessageProps = BaseMessageProps & HTMLAttributes<HTMLElement>;

const messagePrefixCls = `${sunPrefix}-message`;
const isBrowser = typeof window !== 'undefined';

interface MessageFuncProps extends FC<MessageProps> {
  open: (props: MessageProps) => void;
}

const Message: MessageFuncProps = (props) => {
  const {
    className,
    theme = 'light',
    title,
    type = 'info',
    duration = 2,
    top = 16,
    onClose,
    style,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(true);

  const propsRef = usePropsRef({
    onClose,
    duration,
  });

  // 静态方法处理逻辑
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      propsRef.current.onClose && propsRef.current.onClose();
    }, propsRef.current.duration * 1000);
  }, [propsRef]);

  if (!isBrowser) return null;

  return visible
    ? createPortal(
        <div
          className={classnames(
            messagePrefixCls,
            className,
            `${messagePrefixCls}-${theme}`,
          )}
          style={{ ...style, marginTop: top }}
          {...restProps}
        >
          <div
            className={classnames(`${messagePrefixCls}-title-wrap`, {
              [`${messagePrefixCls}-${type}`]: !!type,
            })}
          >
            <span className={`${messagePrefixCls}-icon`}>
              {type === 'info' ? <InfoIcon /> : undefined}
              {type === 'success' ? <SuccessIcon /> : undefined}
              {type === 'error' ? <ErrorIcon /> : undefined}
              {type === 'warning' ? <WarningIcon /> : undefined}
              {type === 'loading' ? <LoadingIcon /> : undefined}
            </span>

            <span className={`${messagePrefixCls}-title`}>{title}</span>
          </div>
        </div>,
        document.body,
      )
    : null;
};

Message.open = function (props: MessageProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  render(
    <Message
      {...props}
      onClose={() => {
        props.onClose && props.onClose();
        unmountComponentAtNode(div);
        div.remove();
      }}
    />,
    div,
  );
};

interface MessageApi {
  info: (props?: MessageProps) => void;
  success: (props?: MessageProps) => void;
  error: (props?: MessageProps) => void;
  warning: (props?: MessageProps) => void;
  loading: (props?: MessageProps) => void;
}

const MessageMethods = [
  'info',
  'success',
  'error',
  'warning',
  'loading',
] as const;

for (const type of MessageMethods) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (Message as any)[type] = (props: Partial<MessageProps>) =>
    Message.open({ ...props, type: type as MessageIconType });
}

export default Message as unknown as MessageApi;
