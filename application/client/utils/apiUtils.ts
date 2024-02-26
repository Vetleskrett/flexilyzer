import { Api } from "@/extensions/Api";

const api = new Api({ baseUrl: process.env.BACKEND_URL });

export default api;
