import { BrowserRouter } from 'react-router-dom';
import Header from "./Header";
import Footer from './Footer';
import Main from './Main';

const Layout = ({ children }) => {
    return (
        <BrowserRouter>
            <div style={{height: "100vh"}}>
                <Header />
                <Main>
                    {children}
                </Main>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default Layout;