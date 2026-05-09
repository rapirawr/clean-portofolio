import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("certificates", "routes/certificates.tsx"),
    route("cv", "routes/cv.tsx")
] satisfies RouteConfig;
