import Handlebars from 'handlebars';
import { v4 as uuidv4 } from 'uuid';
import EventBus from './EventBus';

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _props: any;
  _children: any;
  _id: any;
  _element: any;
  _meta: any = null;
  _eventBus: any;
  _setUpdate = false;

  constructor(tagName = "div", propsAndChilds: any) {
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
  render(): any {}

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

  _getChildren(propsAndChilds: { [x: string]: any }) {
    const children: Record<string, any> = {};
    const props: Record<string, any> = {};

    Object.keys(propsAndChilds).forEach((key) => {
      if (propsAndChilds[key] instanceof Block) {
        children[key] = propsAndChilds[key];
      } else {
        props[key] = propsAndChilds[key];
      }
    });

    return { children, props };
  }

  _compile(template: string, props: any) {
    if (typeof props === "undefined") {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    Object.entries(this._children).forEach(([key, child]: any) => {
      propsAndStubs[key] = `<div data-id=${child._id}></div>`;
    });

    const fragment: any = this._createDocumentElement("template");
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child: any) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this._children).forEach((child: any) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);

    if (Object.keys(this._children).length) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const isReRender = this.componentDidUpdate(oldProps, newProps);

    if (isReRender) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    console.log("oldProps <-------", oldProps);
    console.log("newProps <-------", newProps);
    return true;
  }

  setProps(newProps: any) {
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
      this._eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  }

  makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          self._setUpdate = true;
        }
        // const oldValue = { ...target };
        // target[prop] = value;

        // self._eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, target);

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
