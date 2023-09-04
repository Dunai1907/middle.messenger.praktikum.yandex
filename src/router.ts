import { default as renderDom } from "./utils/render";

export default class Router {
  container: any = null;

  routes: Record<string, any> = {};

  static __instance: any;

  // eslint-disable-next-line no-unused-vars
  static do: (url: any) => void;

  constructor(container: any) {
    if (Router.__instance !== null) {
      return Router.__instance;
    }
    this.container = container;
    Router.__instance = this;
  }

  add(url: string | number, page: any) {
    this.routes[url] = page;
    return this;
  }

  go(url: string | URL | null | undefined) {
    window.history.pushState({}, "", url);
    this.container.innerHTML = "";
    for (let _url in this.routes) {
      if (_url == url) {
        renderDom("app", this.routes[url]);

        return;
      }
    }
    renderDom("app", this.routes["/not-found"]);
  }
}

Router.__instance = null;
Router.do = function (url) {
  if (Router.__instance !== null) {
    Router.__instance.go(url);
  }
};
