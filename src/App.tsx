import { Routes } from "react-router"
import createRouter from "@/router"

function App() {
    const element = createRouter()
    return <Routes>{element}</Routes>
}

export default App
