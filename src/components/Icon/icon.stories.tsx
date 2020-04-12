import React from "react";
import { storiesOf } from "@storybook/react";

import {
  InfoIcon,
  LoadingIcon,
  SuccessIcon,
  ErrorIcon,
  WarningIcon,
  CloseIcon,
  UpIcon,
  DownIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  FileUploadIcon,
  CalendarIcon,
  CloseCircleIcon,
  EmptyIcon,
  UserIcon,
  PasswordShowIcon,
  PasswordHideIcon,
} from "./icon";

const Icons = () => (
  <div style={{ display: "flex", justifyContent: "space-around" }}>
    <InfoIcon />
    <LoadingIcon />
    <SuccessIcon />
    <ErrorIcon />
    <WarningIcon />
    <CloseIcon />
    <UpIcon />
    <DownIcon />
    <ArrowRightIcon />
    <ArrowLeftIcon />
    <FileUploadIcon />
    <CalendarIcon />
    <CloseCircleIcon />
    <EmptyIcon />
    <UserIcon />
    <PasswordShowIcon />
    <PasswordHideIcon />
  </div>
);

storiesOf("Icons Component", module).add("Icons", Icons);
