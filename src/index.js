import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import '@ant-design/pro-form/dist/form.css';
import '@ant-design/pro-layout/dist/layout.css';
import '@ant-design/pro-table/dist/table.css';
import '@ant-design/pro-card/dist/card.css';
import Login from "./pages/user/Login";

import {ConfigProvider} from 'antd';
import enUS from 'antd/lib/locale/en_US';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={enUS}>
                <Routes>
                    <Route path="/user/:loginOrRegister" element={<Login/>}/>
                    <Route path="*" element={<App/>}/>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
