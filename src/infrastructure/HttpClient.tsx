const customHeaders = {
  "Content-Type": "application/json",
};

async function get<T>(url: string, config: string = ""): Promise<T> {
  return await fetch(url + config, {
    method: "GET",
    cache: "no-store",
    headers: customHeaders,
  }).then((response) => response.json());
}

async function post<T>(url: string, body?: any): Promise<T> {
  return await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: customHeaders,
    body: JSON.stringify(body),
  }).then((response) => response.json());
}

export default {
  get,
  post,
};
