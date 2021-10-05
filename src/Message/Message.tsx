import React, { useEffect, useState, FC, HTMLAttributes } from 'react';
import classnames from 'classnames';
import {
  InfoIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  LoadingIcon,
} from '../Icon';
import { render, unmountComponentAtNode, createPortal } from 'react-dom';
import './style.less';

type MessageTheme = 'dark' | 'light';
type MessageIconType = 'info' | 'success' | 'error' | 'warning' | 'loading';

interface BaseMessageProps {
  theme?: MessageTheme;
  className?: string;
  title?: string;
  type?: MessageIconType;
  onClose?: () => void;
  duration?: number;
}

type MessageProps = BaseMessageProps & HTMLAttributes<HTMLElement>;

const prefixClassName = 'sun-message';
const defaultDuration = 2;
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
    duration = defaultDuration,
    onClose,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      onClose && onClose();
    }, duration * 1000);
  }, [duration, onClose, props.onClose]);

  if (!isBrowser) return null;

  return visible
    ? createPortal(
        <div
          className={classnames(
            prefixClassName,
            className,
            `${prefixClassName}-theme-${theme}`,
          )}
          {...restProps}
        >
          <div
            className={classnames(`${prefixClassName}-title-wrap`, {
              [`${prefixClassName}-${type}`]: !!type,
            })}
          >
            <span className={`${prefixClassName}-icon`}>
              {type === 'info' ? <InfoIcon /> : undefined}
              {type === 'success' ? <SuccessIcon /> : undefined}
              {type === 'error' ? <ErrorIcon /> : undefined}
              {type === 'warning' ? <WarningIcon /> : undefined}
              {type === 'loading' ? <LoadingIcon /> : undefined}
            </span>

            <span className={`${prefixClassName}-title`}>{title}</span>
          </div>
        </div>,
        document.body,
      )
    : null;
};

Message.open = function (props: MessageProps) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const mergeProps = {
    ...Message.defaultProps,
    ...props,
  };
  render(
    <Message
      {...mergeProps}
      onClose={() => {
        setTimeout(() => {
          mergeProps.onClose && mergeProps.onClose();
          unmountComponentAtNode(div);
          div.remove();
        });
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

const MessageMethods = ['info', 'success', 'error', 'warning', 'loading'];

for (const type of MessageMethods) {
  (Message as any)[type] = (props: Partial<MessageProps>) =>
    Message.open({ ...props, type: type as MessageIconType });
}

export default Message as unknown as MessageApi;
