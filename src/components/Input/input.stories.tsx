import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input } from "./input";
import { FaSearch } from "react-icons/fa";
const ControlledInput = () => {
  const [value, setValue] = useState();
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value as any);
      }}
    />
  );
};
const defaultInput = () => (
  <section>
    <Input
      style={{ width: "300px" }}
      placeholder="placeholder"
      onChange={action("changed")}
    />
    <ControlledInput />
  </section>
);
const disabledInput = () => (
  <Input style={{ width: "300px" }} placeholder="disabled input" disabled />
);

const iconInput = () => (
  <Input
    style={{ width: "300px" }}
    placeholder="input with icon"
    icon={<FaSearch />}
  />
);

const sizeInput = () => (
  <section>
    <Input style={{ width: "300px" }} defaultValue="large size" size="lg" />
    <Input style={{ width: "300px" }} placeholder="small size" size="sm" />
  </section>
);

const pandInput = () => (
  <section>
    <Input
      style={{ width: "300px" }}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input style={{ width: "300px" }} defaultValue="google" append=".com" />
  </section>
);

storiesOf("Input component", module)
  .add("Input", defaultInput)
  .add("被禁用的 Input", disabledInput)
  .add("带图标的 Input", iconInput)
  .add("大小不同的 Input", sizeInput)
  .add("带前后缀的 Input", pandInput);
