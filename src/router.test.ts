import { expect } from "chai";
import Router from "./router";
import Block from "../src/services/Block";
import sinon from "sinon";

describe("Router", () => {
  let router: Router;
  let container: HTMLElement;
  let testPage: any;

  class TestPage extends Block<any> {
    constructor() {
      const props = {};
      super("div", props);
    }
    render() {
      return this._compile("", this._props);
    }
  }

  beforeEach(() => {
    container = document.createElement("div");
    router = new Router(container);
    testPage = new TestPage();

    router.add("/messenger", testPage);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should add a route", () => {
    const pageMock = sinon.stub();
    router.add("/test", pageMock);
    expect(router.routes).to.have.property("/test", pageMock);
  });

  it("should render page when URL is matched", () => {
    router.go("/messenger");
    expect(window.location.pathname).to.equal("/messenger");
  });
});
