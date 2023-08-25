import Header from '../component/Header'
import Navb from '../component/Navb'
import SearchFilters from '../component/SearchFilters'
import Routers from '../router/Routers';

export default function Layout() {
    return (
        <>
            <Header title="@CongPham05's untitled project" />
            <Navb />
            <SearchFilters />
            <Routers />

        </>
    )
}
