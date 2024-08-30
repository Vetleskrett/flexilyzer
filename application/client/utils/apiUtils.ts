import { Api } from "@/extensions/Api";

const isServer = typeof window === 'undefined';

const api = isServer ?
    new Api({ baseUrl: "http://api:8000/api/v1" }) :
    new Api({ baseUrl: "http://localhost:8000/api/v1" });

export default api;