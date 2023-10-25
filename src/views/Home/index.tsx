import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function Home() {
    return (
        <div>
            <motion.div animate={{ rotate: 360 }}>
                123
            </motion.div>
            <Outlet />
        </div>
    )
}