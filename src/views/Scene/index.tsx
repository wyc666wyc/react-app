import { useEffect } from "react"
import CanvasKitInit from "canvaskit-wasm"

async function initCanvas() {
    const canvasKit = await CanvasKitInit()
    console.log(canvasKit)
}
export default function Scene() {
    useEffect(() => {
        initCanvas()
    }, [])
    return <div></div>
}
