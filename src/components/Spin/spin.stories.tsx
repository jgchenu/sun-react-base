import React from "react";
import { storiesOf } from "@storybook/react";

import Spin from "./Spin";
import { CloseIcon, CloseCircleIcon, ErrorIcon } from "../Icon";

const DefaultSpinComp = () => <Spin />;

const SpinWrapContent = () => (
  <section>
    <Spin tip="温馨提示">
      <div style={{ padding: "100px", backgroundColor: "lightblue" }}>
        this is content
      </div>
    </Spin>
  </section>
);

const DifferentSizeSpin = () => (
  <section>
    <Spin size="small" />
    <Spin size="default" />
    <Spin size="large" />
  </section>
);

const CustomIconSpin = () => (
  <section>
    <Spin indicator={<CloseIcon />} />
    <Spin indicator={<CloseCircleIcon />} />
    <Spin indicator={<ErrorIcon />} />
  </section>
);

storiesOf("Spin Component", module)
  .add("默认Spin", DefaultSpinComp)
  .add("包裹元素的Spin", SpinWrapContent)
  .add("不同大小的Spin", DifferentSizeSpin)
  .add("自定义图标的Spin", CustomIconSpin);
