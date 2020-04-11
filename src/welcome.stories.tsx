import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎来到 sun-react-ui 组件库</h1>
        <p>从零到一学习写ui组件</p>
        <h3>安装试试</h3>
        <code>npm install sun-react-ui --save</code>
      </>
    );
  },
  { info: { disable: true } }
);
