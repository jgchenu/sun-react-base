import React, { useEffect, useState, FC } from "react";
import classnames from "classnames";
import {
  InfoIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  LoadingIcon,
} from "./../Icon";
import Transition from "../Transition";
import { render, unmountComponentAtNode } from "react-dom";
export type MessageTheme = "dark" | "light";
export type MessageIconType =
  | "info"
  | "success"
  | "error"
  | "warning"
  | "loading";

interface MessageProps {
  theme?: MessageTheme;
  className?: string;
  title?: string;
  type?: MessageIconType;
  onClose?: () => void;
  duration?: number;
}

const prefixClassName = "sun-message";
export interface MessageFuncProps extends FC<MessageProps> {
  open: (props: MessageProps) => void;
}

const Message: MessageFuncProps = (props) => {
  const {
    className,
    theme,
    title,
    type,
    duration = 2,
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
  return (
    <Transition in={visible} animation="slide-in-modal" timeout={300}>
      <div
        className={classnames(
          prefixClassName,
          className,
          `${prefixClassName}-theme-${theme}`
        )}
        {...restProps}
      >
        <div
          className={classnames(`${prefixClassName}-title-custom`, {
            [`${prefixClassName}-${type}`]: !!type,
          })}
        >
          <p className={`${prefixClassName}-icon`}>
            {type === "info" ? <InfoIcon /> : undefined}
            {type === "success" ? <SuccessIcon /> : undefined}
            {type === "error" ? <ErrorIcon /> : undefined}
            {type === "warning" ? <WarningIcon /> : undefined}
            {type === "loading" ? <LoadingIcon /> : undefined}
          </p>

          <p className={`${prefixClassName}-title`}>
            <span>{title}</span>
          </p>
        </div>
      </div>
    </Transition>
  );
};

Message.defaultProps = {
  theme: "light" as MessageTheme,
  type: "info" as MessageIconType,
  duration: 2,
};

Message.open = function (props: MessageProps) {
  const div = document.createElement("div");
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
    div
  );
};

export interface MessageApi {
  info: (props?: MessageProps) => void;
  success: (props?: MessageProps) => void;
  error: (props?: MessageProps) => void;
  warning: (props?: MessageProps) => void;
  loading: (props?: MessageProps) => void;
}

const MessageMethods = ["info", "success", "error", "warning", "loading"];
const api: any = {};
for (const type of MessageMethods) {
  api[type] = (props: Partial<MessageProps>) =>
    Message.open({ ...props, type: type as MessageIconType });
}

export default api as MessageApi;
