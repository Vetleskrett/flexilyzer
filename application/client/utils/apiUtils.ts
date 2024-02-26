import { Api } from "@/extensions/Api";

const api = new Api({ baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL });

export default api;
