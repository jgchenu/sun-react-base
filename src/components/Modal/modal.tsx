import React, { FC, useMemo, useState, useRef } from "react";
import { createPortal } from "react-dom";
import classnames from "classnames";
import Button from "../Button";
import { isUndefined } from "util";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { CloseIcon } from "../Icon";

interface ModalProps {
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
  centeded?: boolean;
  children?: React.ReactElement;
}

interface ModalFuncProps extends FC<ModalProps> {
  open: (props: ModalProps) => void;
}

const prefixClassName = "modal";

const Modal: ModalFuncProps = (props) => {
  const {
    onCancel,
    onOk,
    title,
    okText,
    cancelText,
    content,
    visible: visibleFromProps,
    centeded,
    closable,
    maskClosable,
    showMask,
    children,
  } = props;

  const [visible, setVisible] = useState(false);
  const maskRef = useRef(null);

  const computedVisible = useMemo(() => {
    if (!isUndefined(visibleFromProps)) return visibleFromProps;
    return visible;
  }, [visible, visibleFromProps]);

  useDisableBodyScroll(computedVisible);

  function handleOkClick(event: React.MouseEvent) {
    onOk && onOk(event);
    setVisible(false);
  }

  function handleCancelClick(event: React.MouseEvent) {
    onCancel && onCancel(event);
    setVisible(false);
  }

  function handleMaskClick(event: React.MouseEvent) {
    maskClosable && handleCancelClick(event);
  }

  return createPortal(
    <>
      {computedVisible && showMask && (
        <div
          className={classnames(`${prefixClassName}-mask`)}
          ref={maskRef}
          onClick={handleMaskClick}
        ></div>
      )}
      {computedVisible && (
        <div
          className={classnames(`${prefixClassName}-wrapper`, {
            [`${prefixClassName}-centered`]: centeded,
          })}
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
      )}
    </>,
    document.body
  );
};

Modal.defaultProps = {
  showMask: true,
  maskClosable: true,
  centeded: true,
  closable: true,
};

Modal.open = function (props: ModalProps) {};

export default Modal;
