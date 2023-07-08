import notFound from "./pages/404/404";

export default class Router {
  container = null;
  routes = {};

  constructor(container) {
    if (Router.__instance !== null) {
      return Router.__instance;
    }

    this.container = container;
    Router.__instance = this;
  }

  add(url, page) {
    this.routes[url] = page;
    return this;
  }

  go(url) {
    window.history.pushState({}, "", url);
    this.container.innerHTML = ``;
    for (let _url in this.routes) {
      if (_url == url) {
        this.container.append(this.routes[_url]);
        return;
      }
    }
    this.container.append(notFound);
  }
}

Router.__instance = null;
Router.do = function (url) {
  if (Router.__instance !== null) {
    Router.__instance.go(url);
  }
};
