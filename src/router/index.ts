import { lazy } from "react"
import { useRoutes, RouteObject, Route } from "react-router-dom"

const ROUTER_PATH_PREFIX = "../views"
const ROUTER_PATH_PAGE = "page.ts"
const ROUTER_PATH_VIEW = "index.tsx"

const resloveRouterPath = (path: string) =>
    path.replace(ROUTER_PATH_PREFIX, "").replace(ROUTER_PATH_PAGE, "")
const resloveRouterKey = (path: string) =>
    path.replace(ROUTER_PATH_PAGE, ROUTER_PATH_VIEW)

const pages = import.meta.glob("../views/**/page.ts", {
    eager: true,
    import: "default",
}) as Record<string, RouteObject>

const views = import.meta.glob("../views/**/index.tsx", {
    eager: true,
    import: "default",
}) as Record<string, unknown>

const routes: RouteObject[] = Object.entries(pages).map(([path, config]) => {
    const key = resloveRouterKey(path)
    path = resloveRouterPath(path)
    const element = views[key]
    return {
        path,
        element: element,
        ...config,
    }
})
console.log(views, routes)
export default function () {
    return useRoutes(routes)
}
