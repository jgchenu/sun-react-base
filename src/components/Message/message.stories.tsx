import React from "react";
import { storiesOf } from "@storybook/react";
import Message from "./message";
import Button from "./../Button";

const DefaultMessage = () => {
  return (
    <section>
      <p>
        <Button onClick={() => Message.info({ title: " Info message" })}>
          Info message
        </Button>
      </p>
      <p>
        <Button onClick={() => Message.warning({ title: "Warning message" })}>
          Warning message
        </Button>
      </p>
      <p>
        <Button onClick={() => Message.success({ title: "Success message" })}>
          Success message
        </Button>
      </p>
      <p>
        <Button
          onClick={() => Message.error({ title: "Error message" })}
          btnType="danger"
        >
          Error message
        </Button>
      </p>
      <p>
        <Button
          onClick={() => Message.loading({ title: "Loading message" })}
          btnType="primary"
        >
          Loading message
        </Button>
      </p>
    </section>
  );
};

const ThemeMessage = () => {
  return (
    <section>
      <p>
        <Button
          onClick={() =>
            Message.info({ title: " Light Theme message", theme: "light" })
          }
        >
          Light Theme message
        </Button>
      </p>
      <p>
        <Button
          onClick={() =>
            Message.info({ title: "Dark Theme message", theme: "dark" })
          }
          btnType="primary"
        >
          Dark Theme message
        </Button>
      </p>
    </section>
  );
};

storiesOf("Message component", module)
  .add("不同icon的message", DefaultMessage)
  .add("不同主题的message", ThemeMessage);
