/* eslint-disable no-unused-vars */
enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  headers?: Record<string, string>;
  method: METHOD;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

function queryStringify(data: Record<string, any>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  protected prefix = "https://ya-praktikum.tech/api/v2";
  public get: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout
    );
  };

  public post: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout
    );
  };

  public put: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout
    );
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout
    );
  };

  request(
    url: string,
    options: Options = { method: METHOD.GET },
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const { headers = {}, method, data, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${this.prefix}${url}${queryStringify(data)}`
          : `${this.prefix}${url}`
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default HTTPTransport;
