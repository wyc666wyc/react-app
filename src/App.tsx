import { RouterProvider, createHashRouter } from "react-router-dom"
import routeConfig from "@/router"

function App() {
    const router = createHashRouter(routeConfig)
    return <RouterProvider router={router}></RouterProvider>
}

export default App
