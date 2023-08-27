import Handlebars from "handlebars";
import { v4 as uuidv4 } from "uuid";
import EventBus from "./EventBus";

class Block<T extends Record<string, any>> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _props: Record<string, any>;
  _children: Record<string, any>;
  _id: string;
  _element: any;
  _meta;
  _eventBus: EventBus;
  _setUpdate = false;

  constructor(tagName = "div", propsAndChilds: T) {
    const { children, props } = this._getChildren(propsAndChilds);
    this._eventBus = new EventBus();
    this._id = uuidv4();
    this._children = children;

    this._meta = {
      tagName,
      props,
    };

    // this._children = this.makePropsProxy({ children });
    this._props = this.makePropsProxy({ ...props });

    this._registerEvents();
    this._eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents() {
    this._eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus.on(
      Block.EVENTS.FLOW_CDM,
      this._componentDidMount.bind(this)
    );
    this._eventBus.on(
      Block.EVENTS.FLOW_CDU,
      this._componentDidUpdate.bind(this)
    );
    this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  _createDocumentElement(tagName: string) {
    const element = document.createElement(tagName);

    if (this._props.settings?.withInternalID) {
      element.setAttribute("data-id", this._id);
    }
    return element;
  }

  _render() {
    const block = this.render();
    this.removeEvents();
    this._element.innerHTML = "";
    this._element.appendChild(block);
    this.addEvents();
    this._addAttribute();
  }

  // Переопределяется пользователем. Необходимо вернуть разметку
  render() {}

  addEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this._props;

    Object.keys(events).forEach((eventName) => {
      this._element.removeEventListener(eventName, events[eventName]);
    });
  }

  _addAttribute() {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element.setAttribute(key, value);
    });
  }

  _getChildren(propsAndChilds: Record<string, any>) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChilds).forEach(([key, value]) => {
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((v) => v instanceof Block))
      ) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _compile(template: string, props: Record<string, any>) {
    if (typeof props === "undefined") {
      props = this._props;
    }
    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((c) => `<div data-id="${c._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment: any = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    const replaceTagToComponent = (child: Block<any>) => {
      const tag = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (!tag) {
        return;
      }
      tag.replaceWith(child.getContent()!);
    };

    Object.values(this._children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((componentItem) => {
          replaceTagToComponent(componentItem);
        });
      } else {
        replaceTagToComponent(child);
      }
    });
    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    // Object.values(this._children).forEach((child) => {
    //   child.dispatchComponentDidMount();
    // });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);

    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);

    if (isReRender) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    console.log(newProps, oldProps);
    return true;
  }

  setProps(newProps: T) {
    if (!newProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this._props };

    const { children, props } = this._getChildren(newProps);

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }

  makePropsProxy(props: Record<string, any>): Record<string, any> {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, any>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, any>, prop: string, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  getContent() {
    return this._element;
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
