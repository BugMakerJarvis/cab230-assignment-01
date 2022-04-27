import './App.css';
import ProLayout from '@ant-design/pro-layout';
import {OrderedListOutlined, SmileOutlined, UserOutlined} from "@ant-design/icons";
import {Avatar} from "antd";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";

import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-card/dist/card.css';

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
            component: './Welcome',
        },
        {
            path: '/volcano/list',
            name: 'Volcano List',
            icon: <OrderedListOutlined/>,
            component: './VolcanoList',
        },
    ],
};

function App() {

    const [pathname, setPathname] = useState('/welcome');

    return (
        <BrowserRouter>
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
                rightContentRender={() => (
                    <div>
                        <Avatar shape="square" size="default" icon={<UserOutlined/>}/>
                    </div>
                )}
                menuItemRender={(item, dom) => (
                    <div onClick={() => setPathname(item.path)}>
                        <Link to={item.path}>{dom}</Link>
                    </div>
                )}
            >
                <Routes>
                    <Route path="/" element={<Redirect to="/welcome"/>}/>
                    <Route path="/welcome" element={<Welcome/>}/>
                </Routes>
            </ProLayout>
        </BrowserRouter>
    );
}

export default App;
