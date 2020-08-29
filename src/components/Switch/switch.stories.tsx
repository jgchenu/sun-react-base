import React from "react";
import { storiesOf } from "@storybook/react";

import Switch from "./switch";

const DefaultSwitchComp = () => <Switch defaultChecked />;
const DisableSwitchComp = () => <Switch disabled defaultChecked />;
const CustomSwitchComp = () => (
  <Switch checkedChildren="on" unCheckedChildren="off" />
);

storiesOf("Switch Component", module)
  .add("默认Switch", DefaultSwitchComp)
  .add("禁用的Switch", DisableSwitchComp)
  .add("自定义的switch", CustomSwitchComp);
