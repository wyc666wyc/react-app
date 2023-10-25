import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"
import { list2Tree, AbstractTree } from "@/utils/index"

const ROUTER_PATH_PREFIX = "../views"
const ROUTER_PATH_PAGE = "page.ts"
const ROUTER_PATH_VIEW = "index.tsx"

const resloveRouterPath = (path: string) =>
    path.replace(ROUTER_PATH_PREFIX, "").replace("/" + ROUTER_PATH_PAGE, "")
const resloveRouterKey = (path: string) =>
    path.replace(ROUTER_PATH_PAGE, ROUTER_PATH_VIEW)

const resolveRouterInfo = (path: string) => {
    const tokens = resloveRouterPath(path).split("/")
    const length = tokens.length
    return {
        id: tokens[length - 1],
        pid: length > 2 ? tokens[length - 2] : null,
    }
}

const pages = import.meta.glob("../views/**/page.ts", {
    eager: true,
    import: "default",
}) as Record<string, RouteObject>

const pageList = Object.entries(pages).map(([path, config]) => {
    const { id, pid } = resolveRouterInfo(path)
    const key = resloveRouterKey(path)
    const Module = lazy(() => import(key))
    const element = (
        <Suspense>
            <Module />
        </Suspense>
    )
    return {
        id,
        pid,
        path: resloveRouterPath(path),
        element,
        ...config,
    }
})

const routes = list2Tree(pageList as AbstractTree[]) as RouteObject[]

console.log(routes)

export default routes
