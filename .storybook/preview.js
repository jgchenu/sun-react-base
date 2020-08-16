import { addDecorator, configure, addParameters } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import React from "react";
import "../src/styles/index.less";

const wrapperStyle = {
  padding: "20px 40px",
};

const storyWrapper = (stroyFn) => <div style={wrapperStyle}>{stroyFn()}</div>;

addDecorator(storyWrapper);
addDecorator(withInfo);
addParameters({
  info: { inline: true, header: false },
  actions: { argTypesRegex: "^on[A-Z].*" },
});

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.tsx")];
  const req = require.context("../src/components", true, /\.stories\.tsx$/);
  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
