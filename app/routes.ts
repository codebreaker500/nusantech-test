import { type RouteConfig, prefix, route } from "@react-router/dev/routes";

export default [
    route(":category?","routes/movie/page.tsx"),
    ...prefix("movie", [
        route(":slug", "routes/detail/page.tsx"),
    ]),
] satisfies RouteConfig;
