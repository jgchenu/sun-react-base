import React from "react";
import {
  FiVolume2,
  FiLoader,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiX,
  FiChevronUp,
  FiChevronDown,
  FiChevronRight,
  FiChevronLeft,
  FiUploadCloud,
  FiCalendar,
  FiHardDrive,
  FiUser,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { IoMdCloseCircle } from "react-icons/io";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
  className?: string;
}

export const InfoIcon = (props: IconBaseProps) => <FiVolume2 {...props} />;
export const LoadingIcon = (props: IconBaseProps) => <FiLoader {...props} />;
export const SuccessIcon = (props: IconBaseProps) => (
  <FiCheckCircle {...props} />
);
export const ErrorIcon = (props: IconBaseProps) => <FiXCircle {...props} />;
export const WarningIcon = (props: IconBaseProps) => (
  <FiAlertCircle {...props} />
);
export const CloseIcon = (props: IconBaseProps) => <FiX {...props} />;
export const UpIcon = (props: IconBaseProps) => <FiChevronUp {...props} />;
export const DownIcon = (props: IconBaseProps) => <FiChevronDown {...props} />;
export const ArrowRightIcon = (props: IconBaseProps) => (
  <FiChevronRight {...props} />
);
export const ArrowLeftIcon = (props: IconBaseProps) => (
  <FiChevronLeft {...props} />
);
export const FileUploadIcon = (props: IconBaseProps) => (
  <FiUploadCloud {...props} />
);
export const CalendarIcon = (props: IconBaseProps) => <FiCalendar {...props} />;
export const CloseCircleIcon = (props: IconBaseProps) => (
  <IoMdCloseCircle {...props} />
);
export const EmptyIcon = (props: IconBaseProps) => <FiHardDrive {...props} />;
export const UserIcon = (props: IconBaseProps) => <FiUser {...props} />;
export const PasswordShowIcon = (props: IconBaseProps) => <FiEye {...props} />;
export const PasswordHideIcon = (props: IconBaseProps) => (
  <FiEyeOff {...props} />
);
