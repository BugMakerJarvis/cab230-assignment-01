import {Button, Card, Col, Form, Input, message, Row} from 'antd';
import React from 'react';
import {login} from '../../../services/volcano/api';
import './index.css';
import {MailOutlined, UnlockOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const Login = () => {
    const navigate = useNavigate();

    function pushToWelcome() {
        navigate('/welcome')
    }

    const handleSubmit = async (values) => {
        try {
            // log in
            const res = await login({...values});

            if (!res.error) {
                pushToWelcome();
                message.success('Login successful!');
                // setInitialState((s) => ({...s, currentUser: values}));
            }
        } catch (error) {
            message.error('Login failed, please try again!');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="container">
            <Row align="middle" style={{minHeight: '68vh'}}>
                <Col span={12} offset={6}>
                    <Card
                        title={
                            <span style={{fontFamily: 'Lucida Handwriting', fontWeight: 'bold', fontSize: 52}}>
                                volcanoes of the world
                            </span>
                        }
                        style={{textAlign: "center", backgroundColor: "transparent"}}
                        bordered={false}
                    >
                        <Form size="large" onFinish={handleSubmit} onFinishFailed={onFinishFailed}>
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                ]}
                            >
                                <Input prefix={<MailOutlined/>} placeholder="Please input your email"/>
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password prefix={<UnlockOutlined/>} placeholder="Please input your password"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
