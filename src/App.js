import './App.css';
import ProLayout from '@ant-design/pro-layout';
import {OrderedListOutlined, SmileOutlined} from "@ant-design/icons";
import {Routes, Route, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import VolcanoList from "./pages/volcano/List";
import VolcanoInfo from "./pages/volcano/Info";
import NoFoundPage from "./pages/NoFoundPage";
import RightContent from "./components/RightContent";

function Redirect({to}) {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

const route = {
    routes: [
        {
            path: '/welcome',
            name: 'Welcome',
            icon: <SmileOutlined/>,
        },
        {
            path: '/volcano/list',
            name: 'Volcano List',
            icon: <OrderedListOutlined/>,
        },
    ],
};

function App() {

    const currentUrl = new URL(window.location.href).pathname;

    const [pathname, setPathname] = useState(currentUrl === '/' ? '/welcome' : currentUrl);

    return (
        <ProLayout
            location={{pathname}}
            navTheme="light"
            layout="top"
            contentWidth="Fluid"
            fixedHeader={false}
            fixSiderbar={false}
            splitMenus={false}
            colorWeak={false}
            title="volcanoes of the world"
            logo={false}
            menuRender={false}
            menuHeaderRender={false}
            iconfontUrl=""
            route={route}
            footerRender={() => <Footer/>}
            rightContentRender={() => (<RightContent/>)}
            menuItemRender={(item, dom) => (
                <div onClick={() => setPathname(item.path)}>
                    <Link to={item.path}>{dom}</Link>
                </div>
            )}
        >
            <Routes>
                <Route path="/" element={<Redirect to="/welcome"/>}/>
                <Route path="/welcome" element={<Welcome/>}/>
                <Route path="/volcano/list" element={<VolcanoList/>}/>
                <Route path="/volcano/info/:volcanoId" element={<VolcanoInfo/>}/>
                <Route path="*" element={<NoFoundPage/>}/>
            </Routes>
        </ProLayout>
    );
}

export default App;
