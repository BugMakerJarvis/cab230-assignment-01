import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import ProTable from '@ant-design/pro-table';
import {getCountries, getVolcanoes, getVolcanoInfo} from '../../../services/volcano/api';
import {AutoComplete, Button, Descriptions, Divider, Form, message, Select} from 'antd';
import styles from './index.css';
import {Link} from "react-router-dom";
import {BarChartOutlined} from "@ant-design/icons";

const {Option} = Select;

const VolcanoTable = (props) => {
    const {onChange, selectedVolcanoId} = props;

    const [volcanoes, setVolcanoes] = useState([]);
    const [countries, setCountries] = useState([]);
    // Required
    const [targetCountry, setTargetCountry] = useState('Japan');
    // Not Required (Only: 5km,10km,30km,100km are permitted.)
    const [populatedWithin, setPopulatedWithin] = useState('');

    // auto complete
    const [ACOptions, setACOptions] = useState([]);

    const onACSearch = (searchText) => {
        let targets = [];
        countries.forEach((v) => {
            if (v.toLowerCase().startsWith(searchText.toLowerCase())) {
                targets.push({value: v, label: v});
            }
        });
        setACOptions(targets);
    };

    const onACChange = (data) => {
        setTargetCountry(data);
    };

    useEffect(() => {
        try {
            getVolcanoes(targetCountry, populatedWithin).then((res) => {
                setVolcanoes(res);
            });
            getCountries().then((res) => {
                setCountries(res);
            });
        } catch (e) {
            console.log(e.message);
        }
    }, []);

    const columns = [
        {
            title: 'ID',
            key: 'id',
            dataIndex: 'id',
            hideInTable: true,
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            align: 'center',
        },
        {
            title: 'Region',
            key: 'region',
            dataIndex: 'region',
            align: 'center',
        },
        {
            title: 'Subregion',
            key: 'subregion',
            dataIndex: 'subregion',
            align: 'center',
        },
    ];

    return (
        <ProTable
            columns={columns}
            rowKey="id"
            dataSource={volcanoes}
            options={false}
            search={false}
            pagination={{defaultPageSize: 10}}
            rowClassName={(record) => {
                // Todo: does not work
                return record.id === selectedVolcanoId ? styles['split-row-select-active'] : '';
            }}
            toolBarRender={() => [
                <Form layout="inline">
                    <Form.Item label="Country">
                        <AutoComplete
                            value={targetCountry}
                            options={ACOptions}
                            style={{width: 200}}
                            onSearch={onACSearch}
                            onChange={onACChange}
                            placeholder="Please input a country"
                        />
                    </Form.Item>
                    <Form.Item label="Populated within">
                        <Select style={{width: 100}} defaultValue="" onChange={(v) => setPopulatedWithin(v)}>
                            <Option value="">All</Option>
                            <Option value="5km">5 km</Option>
                            <Option value="10km">10 km</Option>
                            <Option value="30km">30 km</Option>
                            <Option value="100km">100 km</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            key="search"
                            type="primary"
                            onClick={async () => {
                                try {
                                    if (countries.includes(targetCountry)) {
                                        await getVolcanoes(targetCountry, populatedWithin).then((res) =>
                                            setVolcanoes(res),
                                        );
                                        // set selected volcanoName and volcanoId to null
                                        onChange(null, null);
                                        message.success(
                                            populatedWithin === ''
                                                ? `Search "country: ${targetCountry}" successfully!`
                                                : `Search "country: ${targetCountry}, populated within: ${populatedWithin}" successful!`,
                                        );
                                    } else {
                                        message.warning(
                                            `Sorry, the country you are searching "${targetCountry}" is not available.`,
                                        );
                                    }
                                } catch (e) {
                                    message.error(e.message);
                                }
                            }}
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Form>,
            ]}
            onRow={(record) => {
                return {
                    onClick: () => {
                        if (record) {
                            onChange(record.id, record.name);
                        }
                    },
                };
            }}
        />
    );
};

const VolcanoInfo = (props) => {
    const {volcanoId} = props;

    const [volcanoInfo, setVolcanoInfo] = useState('{}');

    useEffect(() => {
        if (volcanoId === null) {
            setVolcanoInfo('{}');
        } else {
            if (volcanoId !== undefined) {
                try {
                    getVolcanoInfo(volcanoId).then((res) => {
                        setVolcanoInfo(JSON.stringify(res));
                    });
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    }, [volcanoId]);

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
    } = JSON.parse(volcanoInfo);

    return volcanoId ? (
        <>
            <Descriptions title="Volcano Info" bordered column={4}
                          extra={
                              <Link to={`/volcano/info/${volcanoId}`}>
                                  <Button type="primary" icon={<BarChartOutlined/>}>
                                      <span style={{color: "white", marginLeft: 8}}>View More</span>
                                  </Button>
                              </Link>
                          }
            >
                <Descriptions.Item label="Name" span={4}>
                    {name}
                </Descriptions.Item>
                <Descriptions.Item label="Country" span={4}>
                    {country}
                </Descriptions.Item>
                <Descriptions.Item label="Region" span={2}>
                    {region}
                </Descriptions.Item>
                <Descriptions.Item label="Subregion" span={2}>
                    {subregion}
                </Descriptions.Item>
                <Descriptions.Item label="Last eruption" span={4}>
                    {last_eruption}
                </Descriptions.Item>
                <Descriptions.Item label="Summit" span={2}>
                    {summit}
                </Descriptions.Item>
                <Descriptions.Item label="Elevation" span={2}>
                    {elevation}
                </Descriptions.Item>
                <Descriptions.Item label="Latitude" span={2}>
                    {latitude}
                </Descriptions.Item>
                <Descriptions.Item label="Longitude" span={2}>
                    {longitude}
                </Descriptions.Item>
            </Descriptions>
        </>
    ) : null;
};

const VolcanoList = () => {
    const [volcanoId, setVolcanoId] = useState();
    const [volcanoName, setVolcanoName] = useState();

    return (
        <PageContainer title="Here is the Volcano List Page!">
            <ProCard split="vertical">
                <ProCard colSpan="50%">
                    <VolcanoTable
                        onChange={(id, name) => {
                            setVolcanoId(id);
                            setVolcanoName(name);
                        }}
                        selectedVolcanoId={volcanoId}
                    />
                </ProCard>
                <ProCard>
                    <VolcanoInfo volcanoId={volcanoId}/>
                </ProCard>
            </ProCard>
        </PageContainer>
    );
};

export default VolcanoList;
