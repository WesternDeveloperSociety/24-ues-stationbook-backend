import { Outlet } from 'react-router-dom';
import Header from './Header'

function Layout({ children }) {
    return(
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );

}

export default Layout;