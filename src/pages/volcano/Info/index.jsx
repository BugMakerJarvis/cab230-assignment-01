import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {Map, Marker, ZoomControl} from 'pigeon-maps';
import {Descriptions, Tag} from 'antd';
import {useParams} from "react-router";
import {getVolcanoInfo} from "../../../services/volcano/api";
import {Bar} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const VolcanoInfo = () => {
    // get params from url "/volcano/info/:volcanoId/:latitude/:longitude"
    /**
     * Todo: why including latitude and longitude?
     *
     * I don't know why the page will be rendered twice, and if I get latitude and longitude from getVolcanoInfo in useEffect rather than url,
     * the first render will fail,
     * because the console told me latitude=NaN longitude=NaN.
     *
     * I have searched a lot, someone said rendering twice is mean to be safer??
     */
    const params = useParams();

    const [volcanoInfo, setVolcanoInfo] = useState('{}');

    useEffect(() => {
        try {
            getVolcanoInfo(params.volcanoId, localStorage.getItem("token")).then((res) => {
                setVolcanoInfo(JSON.stringify(res));
            });
        } catch (e) {
            console.log(e.message);
        }
    }, []);

    const {
        name,
        country,
        region,
        subregion,
        last_eruption,
        summit,
        elevation,
        latitude,
        longitude,
        population_5km,
        population_10km,
        population_30km,
        population_100km,
    } = JSON.parse(volcanoInfo);

    const [center, setCenter] = useState([parseFloat(params.latitude), parseFloat(params.longitude)]);
    const [zoom, setZoom] = useState(15);
    // const [hue, setHue] = useState(0);
    // const color = `hsl(${hue % 360}deg 39% 70%)`;


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Population Density',
            },
        },
    };

    const labels = ['population_5km', 'population_10km', 'population_30km', 'population_100km'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Population',
                data: [population_5km, population_10km, population_30km, population_100km],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return (
        <PageContainer title={`Here is the Volcano Info Page!`}>
            <ProCard direction="column" title={name}>
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
                            color="#FA541C"
                            anchor={[parseFloat(params.latitude), parseFloat(params.longitude)]}
                            // onClick={() => setHue(hue + 20)}
                            // onMouseOver={() => {}}
                        />
                    </Map>
                </ProCard>
                <ProCard layout="center" type="inner">
                    <Descriptions title="Volcano Info" column={4}>
                        <Descriptions.Item label="Name" span={4}>{name}</Descriptions.Item>
                        <Descriptions.Item label="Country" span={4}>{country}</Descriptions.Item>
                        <Descriptions.Item label="Region" span={2}>{region}</Descriptions.Item>
                        <Descriptions.Item label="Subregion" span={2}>{subregion}</Descriptions.Item>
                        <Descriptions.Item label="Last eruption" span={4}>{last_eruption}</Descriptions.Item>
                        <Descriptions.Item label="Summit" span={2}>{summit}</Descriptions.Item>
                        <Descriptions.Item label="Elevation" span={2}>{elevation}</Descriptions.Item>
                        <Descriptions.Item label="Latitude" span={2}>{latitude}</Descriptions.Item>
                        <Descriptions.Item label="Longitude" span={2}>{longitude}</Descriptions.Item>
                    </Descriptions>
                </ProCard>
                {localStorage.getItem("token") ? <ProCard layout="center" type="inner" size="small">
                    <Bar options={options} data={data}/>
                </ProCard> : null}
            </ProCard>
        </PageContainer>
    );
};

export default VolcanoInfo;
