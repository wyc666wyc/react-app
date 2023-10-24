import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"
import { list2Tree, AbstractTree } from '@/utils/index'

type A = AbstractTree | RouteObject

const ROUTER_PATH_PREFIX = "../views"
const ROUTER_PATH_PAGE = "page.ts"
const ROUTER_PATH_VIEW = "index.tsx"

const resloveRouterPath = (path: string) =>
    path.replace(ROUTER_PATH_PREFIX, "").replace('/' + ROUTER_PATH_PAGE, "")
const resloveRouterKey = (path: string) =>
    path.replace(ROUTER_PATH_PAGE, ROUTER_PATH_VIEW)

const resolveRouterInfo = (path: string) => {
    const tokens = resloveRouterPath(path).split('/')
    const length = tokens.length
    return {
        id: tokens[length - 1],
        pid: length > 2 ? tokens[length - 2] : null
    }
}

const pages = import.meta.glob("../views/**/page.ts", {
    eager: true,
    import: "default",
}) as Record<string, RouteObject>

const pageList: A[] = Object.entries(pages).map(([path, config]) => {
    const { id, pid } = resolveRouterInfo(path)
    return {
        id,
        pid, 
        path,
        ...config
    }
})

console.log(list2Tree(pageList))

// const views = import.meta.glob("../views/**/index.tsx", {
//     eager: true,
//     import: "default",
// }) as Record<string, JSX.Element>

const routes: RouteObject[] = Object.entries(pages).map(([path, config]) => {
    const key = resloveRouterKey(path)
    const Module = lazy(() => import(key))
    const element = <Suspense><Module /></Suspense>
    return {
        path: resloveRouterPath(path),
        element,
        ...config,
    }
})
console.log(routes)

export default routes
