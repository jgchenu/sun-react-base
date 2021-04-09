import React from "react";
import renderer from "react-test-renderer";
import Button, { ButtonProps } from "./Button";
import { mount } from "enzyme";

import "./style.less";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button component", () => {
  it("Button should render correct html", () => {
    const tree = renderer
      .create(<Button {...defaultProps}>Nice</Button>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it("should render the correct default button", () => {
  //   const wrapper = mount(<Button {...defaultProps}>Nice</Button>);
  //   const element = wrapper.getByText("Nice") as HTMLButtonElement;
  //   expect(element).toBeInTheDocument();
  //   expect(element.tagName).toEqual("BUTTON");
  //   expect(element).toHaveClass("btn btn-default");
  //   expect(element.disabled).toBeFalsy();
  //   fireEvent.click(element);
  //   expect(defaultProps.onClick).toHaveBeenCalled();
  // });
  // it("should render the correct component based on different props", () => {
  //   const wrapper = render(<Button {...testProps}>Nice</Button>);
  //   const element = wrapper.getByText("Nice");
  //   expect(element).toBeInTheDocument();
  //   expect(element).toHaveClass("btn-primary btn-lg klass");
  // });
  // it("should render a link when btnType equals link and href is provided", () => {
  //   const wrapper = render(
  //     <Button btnType="link" href="http://dummyurl">
  //       Link
  //     </Button>
  //   );
  //   const element = wrapper.getByText("Link");
  //   expect(element).toBeInTheDocument();
  //   expect(element.tagName).toEqual("A");
  //   expect(element).toHaveClass("btn btn-link");
  // });
  // it("should render disabled button when disabled set to true", () => {
  //   const wrapper = render(<Button {...disabledProps}>Nice</Button>);
  //   const element = wrapper.getByText("Nice") as HTMLButtonElement;
  //   expect(element).toBeInTheDocument();
  //   expect(element.disabled).toBeTruthy();
  //   fireEvent.click(element);
  //   expect(disabledProps.onClick).not.toHaveBeenCalled();
  // });
});
