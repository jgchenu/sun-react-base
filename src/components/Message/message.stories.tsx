import React from "react";
import { storiesOf } from "@storybook/react";
import Message from "./message";
import Button from "./../Button";

const DefaultMessage = () => {
  return (
    <section>
      <p>
        <Button onClick={() => Message.info({ title: "默认信息" })}>
          Info message
        </Button>
      </p>
      <p>
        <Button onClick={() => Message.warning({ title: "默认信息" })}>
          Warning message
        </Button>
      </p>
      <p>
        <Button onClick={() => Message.success({ title: "默认信息" })}>
          Success message
        </Button>
      </p>
      <p>
        <Button
          onClick={() => Message.error({ title: "默认信息" })}
          btnType="danger"
        >
          Error message
        </Button>
      </p>
      <p>
        <Button
          onClick={() => Message.loading({ title: "默认信息" })}
          btnType="primary"
        >
          Loading message
        </Button>
      </p>
    </section>
  );
};

storiesOf("Message component", module).add("DefaultMessage", DefaultMessage);
