import { expect } from "chai";
import Sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import HTTPTransport from "./HTTPTransport";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let http: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];
  beforeEach(() => {
    xhr = Sinon.useFakeXMLHttpRequest();
    // @ts-ignore
    global.XMLHttpRequest = xhr;
    xhr.onCreate = (req) => {
      requests.push(req);
    };
    http = new HTTPTransport();
  });

  afterEach(() => {
    requests.length = 0;
    xhr.restore();
  });

  it("get() must be called with GET", () => {
    http.get("", {});
    const [request] = requests;
    expect(request.method).to.equal("GET");
  });

  it("post() must be called with POST", () => {
    http.post("", {});
    const [request] = requests;
    expect(request.method).to.equal("POST");
  });

  it("put() must be called with PUT", () => {
    http.put("", {});
    const [request] = requests;
    expect(request.method).to.equal("PUT");
  });

  it("delete() must be called with DELETE", () => {
    http.delete("", {});
    const [request] = requests;
    expect(request.method).to.equal("DELETE");
  });

  it("get() must set the correct URL", () => {
    const path = "/test";
    http.get(`${path}`, {});
    const [request] = requests;
    expect(request.url).to.equal(`https://ya-praktikum.tech/api/v2${path}`);
  });

  it("post() must set the correct URL", () => {
    const path = "/test";
    http.post(`${path}`, {});
    const [request] = requests;
    expect(request.url).to.equal(`https://ya-praktikum.tech/api/v2${path}`);
  });

  it("put() must set the correct URL", () => {
    const path = "/test";
    http.put(`${path}`, {});
    const [request] = requests;
    expect(request.url).to.equal(`https://ya-praktikum.tech/api/v2${path}`);
  });

  it("delete() must set the correct URL", () => {
    const path = "/test";
    http.delete(`${path}`, {});
    const [request] = requests;
    expect(request.url).to.equal(`https://ya-praktikum.tech/api/v2${path}`);
  });
});
