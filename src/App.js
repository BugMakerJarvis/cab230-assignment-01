import './App.css';
import {Layout, Menu, Space} from 'antd';
import {GithubOutlined, OrderedListOutlined, SmileOutlined} from '@ant-design/icons';

const {Header, Content, Footer} = Layout;

const items = [
    {key: "Welcome", label: "Welcome", icon: <SmileOutlined/>},
    {key: "Volcano List", label: "Volcano List", icon: <OrderedListOutlined/>},
];

function App() {
    return (
        <Layout>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <Space direction="horizontal">
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['Welcome']}
                        items={items}
                    />
                </Space>
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                    Content
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>
                <Space direction="vertical">
                    <GithubOutlined onClick={() => {
                        window.open("https://github.com/BugMakerJarvis/cab230-assignment-01")
                    }}/>
                    <span>CAB230 Assignment-01 ©2022 Created by Jarvis</span>
                </Space>
            </Footer>
        </Layout>
    );
}

export default App;
