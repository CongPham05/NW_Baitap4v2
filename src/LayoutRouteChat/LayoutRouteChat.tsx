import { Outlet } from 'react-router-dom'
import RouteChat from '../component/RouteChat'

const LayoutRouteChat = () => {
    return (
        <div className='grid grid-cols-4 h-full bg-white'>
            <RouteChat />
            <Outlet />
        </div>
    )
}

export default LayoutRouteChat