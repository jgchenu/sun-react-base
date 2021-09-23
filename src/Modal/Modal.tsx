import React, {
  FC,
  useMemo,
  useState,
  useRef,
  useCallback,
  HTMLAttributes,
  CSSProperties,
  ReactElement,
} from 'react';
import { createPortal, render, unmountComponentAtNode } from 'react-dom';
import classnames from 'classnames';
import Button from '../Button';
import { isUndefined, useDisableBodyScroll } from '../utils';
import { CloseIcon } from '../Icon';

export interface BaseModalProps {
  isStaticMethod?: boolean;
  width?: number;
  style?: CSSProperties;
  onCancel?: (e: React.MouseEvent) => void;
  onOk?: (e: React.MouseEvent) => void;
  title?: ReactElement | string;
  okText?: ReactElement | string;
  cancelText?: ReactElement | string;
  content?: ReactElement | string;
  visible?: boolean;
  closable?: boolean;
  maskClosable?: boolean;
  showMask?: boolean;
  children?: ReactElement;
  className?: string;
}

export type ModalProps = BaseModalProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
export interface ModalFuncProps extends FC<ModalProps> {
  open: (props: ModalProps) => void;
}

const prefixClassName = 'modal';

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
    if (!isUndefined(visibleFromProps)) return !!visibleFromProps;
    return visible;
  }, [visible, visibleFromProps]);

  const handleCancelClick = useCallback(
    (event: React.MouseEvent) => {
      console.log('handleCancelClick');
      onCancel && onCancel(event);
      setVisible(false);
    },
    [onCancel],
  );

  const handleMaskClick = useCallback(
    (event: React.MouseEvent) => {
      if (modalRef.current?.contains(event.target as Node)) return;
      console.log(modalRef.current?.contains(event.target as Node));
      maskClosable && handleCancelClick(event);
    },
    [handleCancelClick, maskClosable, modalRef],
  );

  useDisableBodyScroll(computedVisible);

  function handleOkClick(event: React.MouseEvent) {
    onOk && onOk(event);
    setVisible(false);
  }

  return computedVisible
    ? createPortal(
        <div className={`${prefixClassName}-root`}>
          {showMask && (
            <div className={classnames(`${prefixClassName}-mask`)} />
          )}
          <div className={`${prefixClassName}-wrap`} onClick={handleMaskClick}>
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
                      type="primary"
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
        </div>,
        document.body,
      )
    : null;
};

Modal.defaultProps = {
  showMask: true,
  maskClosable: true,
  closable: true,
};

// TODO Transition 使用render 函数渲染的时候没生效，考虑使用自定义的class重写
Modal.open = function (props: ModalProps) {
  const div = document.createElement('div');
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
    div,
  );
};

export default Modal;
