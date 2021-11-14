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
import { XCircle as CloseIcon } from 'sun-react-icons';
import './style.less';

interface BaseModalProps {
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
  showCloseIcon?: boolean;
  maskClosable?: boolean;
  showMask?: boolean;
  children?: ReactElement;
  className?: string;
}

type ModalProps = BaseModalProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'>;
interface ModalFuncProps extends FC<ModalProps> {
  open: (props: ModalProps) => void;
}

const prefixClassName = 'modal';

function Modal(props: ModalProps) {
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
    showCloseIcon,
    maskClosable = true,
    showMask = true,
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
        <>
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
              {showCloseIcon && (
                <CloseIcon
                  className={`${prefixClassName}-close-icon`}
                  onClick={handleCancelClick}
                />
              )}
              {title && (
                <header className={`${prefixClassName}-title`}>{title}</header>
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
        </>,
        document.body,
      )
    : null;
}

Modal.open = function (props: ModalProps): Promise<boolean> {
  const div = document.createElement('div');
  document.body.appendChild(div);

  return new Promise((resolve) => {
    function destroy(ok: boolean) {
      unmountComponentAtNode(div);
      div.remove();
      resolve(ok);
    }

    render(
      <Modal
        {...props}
        isStaticMethod
        onCancel={(event: React.MouseEvent) => {
          destroy(false);
          props.onCancel && props.onCancel(event);
        }}
        onOk={(event: React.MouseEvent) => {
          destroy(true);
          props.onOk && props.onOk(event);
        }}
      />,
      div,
    );
  });
};

export default Modal as ModalFuncProps;
