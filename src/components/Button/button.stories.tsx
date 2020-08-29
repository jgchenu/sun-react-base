import React from "react";
import Button, { ButtonProps } from "./button";
import { action } from "@storybook/addon-actions";

// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} onClick={action("click")} />
);

export const Default = Template.bind({});
Default.args = {
  children: "default button",
};

export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
  children: "default button",
};

export const Danger = Template.bind({});
Danger.args = {
  btnType: "danger",
  children: "danger button",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  children: "Large Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
  children: "Small Button",
};
