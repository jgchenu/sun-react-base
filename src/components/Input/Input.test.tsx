import React from "react";
import renderer from "react-test-renderer";

import Input, { InputProps } from "./Input";

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: "test-input",
};
describe("test Input component", () => {
  it("Button should render correct html", () => {
    const tree = renderer.create(<Input {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  // it("should render the correct default Input", () => {
  //   const wrapper = render(<Input {...defaultProps} />);
  //   const testNode = wrapper.getByPlaceholderText(
  //     "test-input"
  //   ) as HTMLInputElement;
  //   expect(testNode).toBeInTheDocument();
  //   expect(testNode).toHaveClass("sun-input-inner");
  //   fireEvent.change(testNode, { target: { value: "23" } });
  //   expect(defaultProps.onChange).toHaveBeenCalled();
  //   expect(testNode.value).toEqual("23");
  // });
  // it("should render the disabled Input on disabled property", () => {
  //   const wrapper = render(<Input disabled placeholder="disabled" />);
  //   const testNode = wrapper.getByPlaceholderText(
  //     "disabled"
  //   ) as HTMLInputElement;
  //   expect(testNode.disabled).toBeTruthy();
  // });
  // it("should render different input sizes on size property", () => {
  //   const wrapper = render(<Input placeholder="sizes" size="lg" />);
  //   const testContainer = wrapper.container.querySelector(".sun-input-wrap");
  //   expect(testContainer).toHaveClass("input-size-lg");
  // });
  // it("should render prepand and append element on prepand/append property", () => {
  //   const { queryByText, container } = render(
  //     <Input placeholder="pend" prepend="https://" append=".com" />
  //   );
  //   const testContainer = container.querySelector(".sun-input-wrap");
  //   expect(testContainer).toHaveClass(
  //     "input-group input-group-append input-group-prepend"
  //   );
  //   expect(queryByText("https://")).toBeInTheDocument();
  //   expect(queryByText(".com")).toBeInTheDocument();
  // });
});
