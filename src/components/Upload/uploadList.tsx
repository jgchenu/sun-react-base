import React, { FC } from "react";
import { UploadFile } from "./upload";
import {
  FileUploadIcon,
  LoadingIcon,
  SuccessIcon,
  CloseIcon,
  ErrorIcon,
} from "../Icon";
import Progress from "../Progress/progress";
interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  return (
    <ul className="sun-upload-list">
      {fileList.map((item) => {
        return (
          <li className="sun-upload-list-item" key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <FileUploadIcon className="icon-secondary" />
              {item.name}
            </span>
            <span className="file-status">
              {(item.status === "uploading" || item.status === "ready") && (
                <LoadingIcon className="icon-primary" />
              )}
              {item.status === "success" && (
                <SuccessIcon className="icon-success" />
              )}
              {item.status === "error" && <ErrorIcon className="icon-danger" />}
            </span>
            <span className="file-actions">
              <CloseIcon
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === "uploading" && (
              <Progress percent={item.percent || 0} />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
