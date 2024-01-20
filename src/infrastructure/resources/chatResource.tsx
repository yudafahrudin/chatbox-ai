import HttpClient from "../HttpClient";

const chatToAi = "/api/completion";

export const chatToAIResource = async (body?: any) => {
  return await HttpClient.post<{}>(chatToAi, body);
};

export default {
  chatToAIResource,
};
