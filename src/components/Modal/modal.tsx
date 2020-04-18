import React, {
  FC,
  useMemo,
  useState,
  useRef,
  useCallback,
  HTMLAttributes,
} from "react";
import { createPortal, render, unmountComponentAtNode } from "react-dom";
import classnames from "classnames";
import Button from "../Button";
import { isUndefined } from "util";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { CloseIcon } from "../Icon";
import Transition from "../Transition";
import useClickOutside from "../../hooks/useClickOutside";

export interface BaseModalProps {
  isStaticMethod?: boolean;
  width?: number;
  style?: React.StyleHTMLAttributes<HTMLElement>;
  onCancel?: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  title?: React.ReactElement | string;
  okText?: React.ReactElement | string;
  cancelText?: React.ReactElement | string;
  content?: React.ReactElement | string;
  visible?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  showMask?: boolean;
  children?: React.ReactElement;
  className?: string;
}

type ModalProps = BaseModalProps & HTMLAttributes<HTMLElement>;
export interface ModalFuncProps extends FC<ModalProps> {
  open: (props: ModalProps) => void;
}

const prefixClassName = "modal";

export const Modal: ModalFuncProps = (props) => {
  const {
    isStaticMethod,
    width,
    style,
    onCancel,
    onOk,
    title,
    okText,
    cancelText,
    content,
    visible: visibleFromProps,
    closable,
    maskClosable,
    showMask,
    children,
    className,
    ...restProps
  } = props;

  const [visible, setVisible] = useState(!!isStaticMethod);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const computedVisible = useMemo(() => {
    if (!isUndefined(visibleFromProps)) return visibleFromProps;
    return visible;
  }, [visible, visibleFromProps]);

  const handleCancelClick = useCallback(
    (event: React.MouseEvent) => {
      onCancel && onCancel(event);
      setVisible(false);
    },
    [onCancel]
  );

  const handleMaskClick = useCallback(
    (event: React.MouseEvent) => {
      maskClosable && handleCancelClick(event);
    },
    [handleCancelClick, maskClosable]
  );

  useDisableBodyScroll(computedVisible);

  useClickOutside(modalRef, handleMaskClick);

  function handleOkClick(event: React.MouseEvent) {
    onOk && onOk(event);
    setVisible(false);
  }

  return createPortal(
    <div className={`${prefixClassName}-root`}>
      <Transition
        animation="slide-in-mask"
        timeout={300}
        in={computedVisible && showMask}
      >
        <div
          className={classnames(`${prefixClassName}-mask`)}
          onClick={handleMaskClick}
        ></div>
      </Transition>
      <Transition animation="slide-in-modal" timeout={300} in={computedVisible}>
        <div className={`${prefixClassName}-wrap`}>
          <div
            className={classnames(prefixClassName, className)}
            {...restProps}
            style={{
              ...style,
              width,
            }}
            ref={modalRef}
          >
            {title && (
              <header className={`${prefixClassName}-title`}>
                {title}
                {closable && (
                  <CloseIcon
                    className={`${prefixClassName}-close-icon`}
                    onClick={handleCancelClick}
                  />
                )}
              </header>
            )}
            {(children || content) && (
              <section className={`${prefixClassName}-content`}>
                {children || content}
              </section>
            )}
            {(okText || cancelText) && (
              <footer className={`${prefixClassName}-footer`}>
                {cancelText && (
                  <Button onClick={handleCancelClick}>{cancelText}</Button>
                )}
                {okText && (
                  <Button
                    btnType="primary"
                    onClick={handleOkClick}
                    className={`${prefixClassName}-ok-btn`}
                  >
                    {okText}
                  </Button>
                )}
              </footer>
            )}
          </div>
        </div>
      </Transition>
    </div>,
    document.body
  );
};

Modal.defaultProps = {
  showMask: true,
  maskClosable: true,
  closable: true,
};

// TODO Transition 使用render 函数渲染的时候没生效，考虑使用自定义的class重写
Modal.open = function (props: ModalProps) {
  const div = document.createElement("div");
  document.body.appendChild(div);
  render(
    <Modal
      {...{ ...Modal.defaultProps, ...props }}
      isStaticMethod
      onCancel={(event: React.MouseEvent) => {
        props.onCancel && props.onCancel(event);
        setTimeout(() => {
          unmountComponentAtNode(div);
          div.remove();
        }, 0);
      }}
    />,
    div
  );
};

export default Modal;
