import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Navb from '../component/Navb'
import Search from '../component/SearchFilters'

const Layout = () => {
    return (
        <>
            <Header />
            <Navb />
            <Search />
            <Outlet />
        </>
    )
}

export default Layout