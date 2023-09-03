import Sinon from "sinon";
import { expect } from "chai";
import Block from "./Block";

describe("Block", () => {
  class TestProps {
    name!: string;
  }

  class TestComponent extends Block<TestProps> {
    constructor() {
      const props = { name: "Test name" };
      super("div", props);
    }
    render() {
      const tpl = `{{name}}`;

      return this._compile(tpl, this._props);
    }

    componentDidUpdate(newProps: TestProps): boolean {
      return newProps.name !== this._props.name;
    }
  }

  it("Should call the render method with new props", () => {
    const test = new TestComponent();
    const spy = Sinon.spy(test, "render");
    test.setProps({ name: "Got a new name" });
    expect(spy.called).to.equal(true);
  });

  it("Shouldn't call the render method with old props", () => {
    const test = new TestComponent();
    const spy = Sinon.spy(test, "render");
    test.setProps({ name: "Test name" });
    expect(spy.called).to.equal(false);
  });
});
