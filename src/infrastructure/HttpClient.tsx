const customHeaders = {
  "Content-Type": "application/json",
};

async function get<T>(url: string, config: string = ""): Promise<T> {
  return await fetch(url + config, {
    method: "GET",
    headers: customHeaders,
  }).then((response) => response.json());
}

export default {
  get,
};
