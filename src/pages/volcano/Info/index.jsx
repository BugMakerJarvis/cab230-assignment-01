import React, {useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {Map, Marker, ZoomControl} from 'pigeon-maps';
import {Tag} from 'antd';
import {useParams} from "react-router";

const VolcanoInfo = () => {
    // get params from url ---> history.push(`/volcanoinfo?name=${name}&latitude=${latitude}&longitude=${longitude}`);
    const params = useParams();

    const [center, setCenter] = useState([parseFloat(params.latitude), parseFloat(params.longitude)]);
    const [zoom, setZoom] = useState(15);
    // const [hue, setHue] = useState(0);
    // const color = `hsl(${hue % 360}deg 39% 70%)`;

    return (
        <PageContainer title={`Here is the Volcano Info Page!`}>
            <ProCard direction="column" title={params.name}>
                <ProCard layout="center" type="inner">
                    <Map
                        height={512}
                        center={center}
                        zoom={zoom}
                        onBoundsChanged={({center, zoom}) => {
                            setCenter(center);
                            setZoom(zoom);
                        }}
                    >
                        <div style={{textAlign: 'end', margin: 18}}>
                            <Tag color="cyan">{center[0].toFixed(3)}</Tag>
                            <Tag color="cyan">{center[1].toFixed(3)}</Tag>
                        </div>
                        <ZoomControl/>
                        <Marker
                            width={48}
                            color="red"
                            anchor={[parseFloat(params.latitude), parseFloat(params.longitude)]}
                            // onClick={() => setHue(hue + 20)}
                            // onMouseOver={() => {}}
                        />
                    </Map>
                </ProCard>
                <ProCard layout="center" type="inner">
                    sdsd
                </ProCard>
            </ProCard>
        </PageContainer>
    );
};

export default VolcanoInfo;
