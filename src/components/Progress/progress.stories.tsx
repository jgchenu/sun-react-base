import React from "react";
import { storiesOf } from "@storybook/react";

import Progress from "./progress";

const DefaultProgress = () => <Progress percent={10} />;

const HideTextProgress = () => <Progress percent={10} showText={false} />;

const DifferentThemeProgress = () => {
  const style = { margin: "20px" };
  return (
    <section>
      <div style={style}>
        <Progress percent={10} showText={false} theme="primary" />
      </div>
      <div style={style}>
        <Progress percent={10} showText={false} theme="info" />
      </div>
      <div style={style}>
        <Progress percent={10} showText={false} theme="danger" />
      </div>
      <div style={style}>
        <Progress percent={10} showText={false} theme="warning" />
      </div>
      <div style={style}>
        <Progress percent={10} showText={false} theme="success" />
      </div>
    </section>
  );
};

storiesOf("Progress Component", module)
  .add("默认Progress", DefaultProgress)
  .add("不需要文字的Progress", HideTextProgress)
  .add("不同主题的Progress", DifferentThemeProgress);
