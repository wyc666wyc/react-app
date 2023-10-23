import { useRoutes } from "react-router"
import routeConfig from "@/router"

function App() {
    const element = useRoutes(routeConfig)
    return <div>{element}</div>
}

export default App
