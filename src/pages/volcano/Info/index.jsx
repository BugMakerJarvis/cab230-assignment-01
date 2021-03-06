import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import {Map, Marker, ZoomControl} from 'pigeon-maps';
import {Button, Descriptions, Tag} from 'antd';
import {useNavigate, useParams} from "react-router";
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

const MyMap = (props) => {
    const {latitude, longitude} = props;

    const [center, setCenter] = useState([0, 0]);
    const [zoom, setZoom] = useState(15);

    useEffect(() => {
        setCenter([parseFloat(latitude), parseFloat(longitude)])
    }, [latitude, longitude]);

    return (
        <Map
            height={512}
            center={center}
            zoom={zoom}
            onBoundsChanged={({center, zoom}) => {
                setCenter(center);
                setZoom(zoom);
            }}
        >
            <ZoomControl/>
            <Marker
                width={48}
                color="#FA541C"
                anchor={[parseFloat(latitude), parseFloat(longitude)]}
            />
        </Map>
    )
}

const VolcanoInfo = () => {
    const params = useParams();

    const navigate = useNavigate();

    const [volcanoInfo, setVolcanoInfo] = useState('{}');

    useEffect(() => {
        try {
            getVolcanoInfo(params.volcanoId, localStorage.getItem("token")).then((res) => {
                setVolcanoInfo(JSON.stringify(res));
            });
        } catch (e) {
            console.log(e.message);
        }
        // eslint-disable-next-line
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
            <ProCard direction="column" title={name} extra={
                <Button type="primary" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
            }>
                <ProCard layout="center" type="inner">
                    <MyMap latitude={latitude} longitude={longitude}/>
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
