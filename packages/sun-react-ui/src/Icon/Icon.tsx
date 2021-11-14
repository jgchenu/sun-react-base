import React from 'react';
import {
  Volume2,
  Loader,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  UploadCloud,
  Calendar,
  HardDrive,
  User,
  Eye,
  EyeOff,
  SVGProps,
  Search,
} from 'sun-react-icons';

interface IconBaseProps extends SVGProps {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
  className?: string;
}

export const InfoIcon = (props: IconBaseProps) => <Volume2 {...props} />;
export const LoadingIcon = (props: IconBaseProps) => <Loader {...props} />;
export const SuccessIcon = (props: IconBaseProps) => <CheckCircle {...props} />;
export const ErrorIcon = (props: IconBaseProps) => <XCircle {...props} />;
export const WarningIcon = (props: IconBaseProps) => <AlertCircle {...props} />;
export const CloseIcon = (props: IconBaseProps) => <X {...props} />;
export const UpIcon = (props: IconBaseProps) => <ChevronUp {...props} />;
export const DownIcon = (props: IconBaseProps) => <ChevronDown {...props} />;
export const ArrowRightIcon = (props: IconBaseProps) => (
  <ChevronRight {...props} />
);
export const ArrowLeftIcon = (props: IconBaseProps) => (
  <ChevronLeft {...props} />
);
export const leUploadIcon = (props: IconBaseProps) => (
  <UploadCloud {...props} />
);
export const CalendarIcon = (props: IconBaseProps) => <Calendar {...props} />;
export const CloseCircleIcon = (props: IconBaseProps) => <XCircle {...props} />;
export const EmptyIcon = (props: IconBaseProps) => <HardDrive {...props} />;
export const UserIcon = (props: IconBaseProps) => <User {...props} />;
export const PasswordShowIcon = (props: IconBaseProps) => <Eye {...props} />;
export const PasswordHideIcon = (props: IconBaseProps) => <EyeOff {...props} />;

export const SearchIcon = (props: IconBaseProps) => <Search {...props} />;
