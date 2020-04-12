import React from "react";
import { storiesOf } from "@storybook/react";

import Popover from "./popover";

const content = <div style={{ padding: "40px" }}>Popover content</div>;
const defaultPopover = () => (
  <Popover title={<span>Popover title</span>} content={content}>
    <span style={{ margin: "10px" }}>默认 Popover</span>
  </Popover>
);

const triggerPopover = () => (
  <div>
    <Popover content={content}>
      <span style={{ margin: "10px" }}>hover Popover</span>
    </Popover>
    <Popover content={content} trigger="click">
      <span style={{ margin: "10px" }}>click Popover</span>
    </Popover>
  </div>
);

const placementPopover = () => (
  <div>
    <Popover content={content}>
      <span style={{ margin: "10px" }}>bottom placement Popover</span>
    </Popover>
    <Popover content={content} placement="top">
      <span style={{ margin: "10px" }}>top placement Popover</span>
    </Popover>
    <Popover content={content} placement="left">
      <span style={{ margin: "10px" }}>left placement Popover</span>
    </Popover>
    <Popover content={content} placement="right">
      <span style={{ margin: "10px" }}>right placement Popover</span>
    </Popover>
  </div>
);

const timeDelayPopover = () => (
  <div>
    <Popover content={content} mouseEnterDelay={1000}>
      <span style={{ margin: "10px" }}>延迟出现 Popover</span>
    </Popover>
    <Popover content={content} mouseLeaveDelay={1000}>
      <span style={{ margin: "10px" }}>延迟消失 Popover</span>
    </Popover>
  </div>
);
const themePopover = () => (
  <div>
    <Popover content={content} theme="dark">
      <span style={{ margin: "10px" }}>深色 Popover</span>
    </Popover>
    <Popover content={content} theme="light">
      <span style={{ margin: "10px" }}>浅色 Popover</span>
    </Popover>
  </div>
);
storiesOf("Popover Component", module)
  .add("Popover", defaultPopover)
  .add("不同触发方式的Popover", triggerPopover)
  .add("不同位置的Popover", placementPopover)
  .add("自定义延迟的Popover", timeDelayPopover)
  .add("不同主题的Popover", themePopover);
