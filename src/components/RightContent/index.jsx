import React, {useState} from 'react';
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {Avatar, Button, Dropdown, Menu, Space} from "antd";

const RightContent = () => {

    const [currentUserEmail, setCurrentUserEmail] = useState(localStorage.getItem("currentUserEmail"));

    const login = (
        <div>
            <Link to="/user/login">
                <Button type="dashed" icon={<LoginOutlined/>}>Login</Button>
            </Link>
        </div>
    );

    if (!currentUserEmail) {
        return login;
    }

    const menu = (
        <Menu style={{textAlign: "center"}}
              items={[
                  {
                      label: (
                          <span onClick={() => {
                              localStorage.clear();
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
