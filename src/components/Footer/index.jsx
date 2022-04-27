import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';

const Footer = () => {
    return (
        <DefaultFooter
            copyright="2022 CAB230 Assignment-01 Jarvis"
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined/>,
                    href: 'https://github.com/BugMakerJarvis/cab230-assignment-01',
                    blankTarget: true,
                },
            ]}
        />
    );
};

export default Footer;
