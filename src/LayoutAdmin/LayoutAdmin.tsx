import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import NavbarAdmin from '../component/NavbarAdmin'

const LayoutAdmin = () => {
    return (
        <>
            <Header />
            <div className='grid grid-cols-6 w-full h-full'>
                <NavbarAdmin />
                <div className='col-span-5 border-t '>
                    <Outlet />
                </div>
            </div>

        </>
    )
}

export default LayoutAdmin