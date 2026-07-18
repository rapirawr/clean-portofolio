import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("certificates", "routes/certificates.tsx"),
    route("cv", "routes/cv.tsx"),
    route("api/contact", "routes/api.contact.ts"),
    route("api/stats", "routes/api.stats.ts"),
    route("metrics", "routes/api.metrics.ts")
] satisfies RouteConfig;
