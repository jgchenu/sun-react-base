import React from "react";
import { storiesOf } from "@storybook/react";
import BackTop from "./back-top";
import Button from "../Button";
const defaultBackTop = () => (
  <section
    style={{
      height: 1000,
    }}
  >
    <BackTop />
  </section>
);

const customPositionBackTop = () => {
  return (
    <section
      style={{
        height: 1000,
      }}
    >
      <BackTop
        visibilityHeight={200}
        style={{
          right: 100,
          bottom: 400,
        }}
      />
    </section>
  );
};

const customIconBackTop = () => {
  return (
    <section
      style={{
        height: 1000,
      }}
    >
      <BackTop>
        <Button>返回顶部</Button>
      </BackTop>
    </section>
  );
};

storiesOf("BackTop Component", module)
  .add("默认的BackTop", defaultBackTop)
  .add("自定义位置的BackTop", customPositionBackTop)
  .add("自定义图标的BackTop", customIconBackTop);
