import React from "react";
import { storiesOf } from "@storybook/react";

import Popover from "./popover";

const content = <div style={{ padding: "40px" }}>Popover content</div>;
const style = {
  margin: "20px 20px 200px 20px",
  width: "200px",
};

const defaultPopover = () => (
  <div style={style}>
    <Popover title={<span>Popover title</span>} content={content}>
      <span>默认 Popover</span>
    </Popover>
  </div>
);

const triggerPopover = () => (
  <section>
    <div style={style}>
      <Popover content={content}>
        <span>hover Popover</span>
      </Popover>
    </div>

    <div style={style}>
      <Popover content={content} trigger="click">
        <span>click Popover</span>
      </Popover>
    </div>
  </section>
);

const placementPopover = () => (
  <section>
    <div style={style}>
      <Popover content={content} placement="top">
        <span>top placement Popover</span>
      </Popover>
    </div>
    <div style={style}>
      <Popover content={content} placement="right">
        <span>right placement Popover</span>
      </Popover>
    </div>
    <div style={style}>
      <Popover content={content} placement="bottom">
        <span>bottom placement Popover</span>
      </Popover>
    </div>
    <div style={style}>
      <Popover content={content} placement="left">
        <span>left placement Popover</span>
      </Popover>
    </div>
  </section>
);

const timeDelayPopover = () => (
  <section>
    <div style={style}>
      <Popover content={content} mouseEnterDelay={1000}>
        <span>延迟出现 Popover</span>
      </Popover>
    </div>
    <div style={style}>
      <Popover content={content} mouseLeaveDelay={1000}>
        <span>延迟消失 Popover</span>
      </Popover>
    </div>
  </section>
);

const themePopover = () => (
  <section>
    <div style={style}>
      <Popover content={content} theme="dark">
        <span>深色 Popover</span>
      </Popover>
    </div>

    <div style={style}>
      <Popover content={content} theme="light">
        <span>浅色 Popover</span>
      </Popover>
    </div>
  </section>
);

storiesOf("Popover Component", module)
  .add("Popover", defaultPopover)
  .add("不同触发方式的Popover", triggerPopover)
  .add("不同位置的Popover", placementPopover)
  .add("自定义延迟的Popover", timeDelayPopover)
  .add("不同主题的Popover", themePopover);
