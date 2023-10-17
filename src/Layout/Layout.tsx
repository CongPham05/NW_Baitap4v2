import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Navb from '../component/Navb'
import Search from '../component/SearchFilters'
import IconChat from '../component/IconChat'

const Layout = () => {
    return (
        <>
            <Header />
            <Navb />
            <Search />
            <Outlet />
            <IconChat />
        </>
    )
}

export default Layout