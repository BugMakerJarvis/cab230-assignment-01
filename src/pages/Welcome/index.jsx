import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Carousel, Col, Image, Row} from 'antd';
import ProCard from '@ant-design/pro-card';
import './index.css';

const VolcanoGlimpse = ({title, url, description}) => {
    return (
        <ProCard style={{height: 500}} gutter={12} title={title}>
            <ProCard layout="center" bordered colSpan="60%">
                <Image src={url}/>
            </ProCard>
            <ProCard layout="center" bordered>
                {description}
            </ProCard>
        </ProCard>
    );
};

const Welcome = () => {
    return (
        <PageContainer title="Welcome to volcanoes of the world!">
            <Row>
                <Col span={20} offset={2}>
                    <Carousel draggable={true}>
                        <VolcanoGlimpse
                            title="Volcanic Eruption, Iceland"
                            url="https://media.istockphoto.com/photos/volcanic-eruption-in-iceland-picture-id1319688417?b=1&k=20&m=1319688417&s=170667a&w=0&h=faBP7rhR5PSYcLWKnBAq497I5c4yaAYLo9wfNNY5s_g="
                            description="Glowing lava from the volcano eruption in Iceland. Powerful volcanic show from Mother Nature in all its beauty."
                        />
                        <VolcanoGlimpse
                            title="Iceland Fagradalsfjall Volcano Eruption Lava Stream Panorama"
                            url="https://media.istockphoto.com/photos/iceland-fagradalsfjall-volcano-eruption-lava-stream-panorama-picture-id1327753251?b=1&k=20&m=1327753251&s=170667a&w=0&h=CwnDAcheK-Jq7fbU0DSkhMcKBYKUsNxcY1dS353MCZo="
                            description="Fagradalsfjall Volcano Eruption Panorama, Aerial view towards the lava stream of the erupting Fagradalsfjall Volcano on Iceland. Fagradalsfjall is a volcano on the Reykjanes Peninsula about 40km from Reykjavík. Its highest summit is Langhóll. A volcanic eruption began in March 2021 in Geldingadalir to the south of Fagradalsfjall. Drone Point of View stiched Panorama Shot. Fagradalsfjall Volcano, Reykjanes Peninsula, Geldingadalir, Iceland."
                        />
                        <VolcanoGlimpse
                            title="Lava Ocean Entry, Kilauea, Hawaii"
                            url="https://media.istockphoto.com/photos/lava-ocean-entry-kilauea-hawaii-picture-id592668294?k=20&m=592668294&s=612x612&w=0&h=eVAKibSDAalJW5b3lV0Q_vN9tjF7KxcBLSNkw5SwQ9k="
                            description="Lava entering the Pacific Ocean on Kilauea, Big Island, Hawaii."
                        />
                    </Carousel>
                </Col>
            </Row>
        </PageContainer>
    );
};

export default Welcome;
