import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Welcome page", module).add(
  "welcome",
  () => {
    return (
      <>
        <h1>欢迎使用 sun-react-ui 组件库</h1>
        <br />
        <h1>
          安装使用：
          <code>npm install sun-react-ui --save</code> or &nbsp;
          <code>yarn add sun-react-ui</code>
        </h1>
      </>
    );
  },
  { info: { disable: true } }
);
