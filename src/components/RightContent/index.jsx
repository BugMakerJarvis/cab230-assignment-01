import React, {useState} from 'react';
import {LoginOutlined, LogoutOutlined, UserAddOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Avatar, Button, Dropdown, Menu, Space} from "antd";

const RightContent = () => {

    const [currentUserEmail, setCurrentUserEmail] = useState(localStorage.getItem("currentUserEmail"));

    const loginAndRegister = (
        <Space direction="horizontal">
            <Link to="/user/login/true">
                <Button type="primary" icon={<LoginOutlined/>}>Login</Button>
            </Link>
            <Link to={`/user/login/false`}>
                <Button type="primary" icon={<UserAddOutlined/>}>Register</Button>
            </Link>
        </Space>
    );

    if (!currentUserEmail) {
        return loginAndRegister;
    }

    const menu = (
        <Menu style={{textAlign: "center"}}
              items={[
                  {
                      label: (
                          <span onClick={() => {
                              localStorage.removeItem("token");
                              localStorage.removeItem("currentUserEmail");
                              setCurrentUserEmail(undefined);
                          }}>
                              <Space direction="horizontal">
                                  <LogoutOutlined/>
                                  Logout
                              </Space>
                          </span>
                      ),
                      key: 'logout',
                  },
              ]}
        />
    );

    return (
        <Dropdown overlay={menu}>
            <Space direction="horizontal">
                <Avatar size="small" src="https://joeschmoe.io/api/v1/random" alt="avatar"/>
                <span>{currentUserEmail}</span>
            </Space>
        </Dropdown>
    )
}

export default RightContent;
