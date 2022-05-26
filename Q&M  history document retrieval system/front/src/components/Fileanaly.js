import React, { Component } from 'react'
import { Input, Button, Space, Card, Select, Pagination, List, Typography } from 'antd';
import 'antd/dist/antd.css';
import UserBar from './UserBar';
import { Link, } from 'react-router-dom';
const { Search } = Input;
const onSearch = value => console.log(value);
const { Option } = Select;
const data = [
    '口 2020.1.1热轧2050区域5#车柱赛泵更换设备故障报告书                    编码：BSGGL109101M01',
    '口 2020.1.3 钢管3-3#行车副卷钢丝绳卡死设备故障调查单及处理通报                 编码：BSGGL109101N05',
    '口 2020.1.1 热轧2050区域5#车柱塞泵更换设备故障报告书                   编码：BSGGL109101M01',
    '口 2020.1.1 热轧2050区域5#车柱塞泵更换设备故障报告书                   编码：BSGGL109101N05',
    '口 2020.1.15 热轧2050区域5号车夹钳油柱塞泵泵更换故障调查单                 编码：BSGGL109101N02',
    '口 2020.1.1 热轧2050区域5#车柱塞泵更换设备故障报告书                   编码：BSGGL109101M01',
    '口 2020.1.3 钢管3-3#行车副卷钢丝绳卡死设备故障调查单及处理通报                 编码：BSGGL109101M01',
    '口 2020.1.15 热轧2050区域5号车夹钳油柱塞泵泵更换故障调查单                 编码：BSGGL109101M01',
    '口 2020.1.15 热轧2050区域5号车夹钳油柱塞泵泵更换故障调查单                         编码：BSGGL109101M01',
    '口 2020.1.3 钢管3-3#行车副卷钢丝绳卡死设备故障调查单及处理通报                 编码：BSGGL109101M01',
    '口 2020.1.1 热轧2050区域5#车柱塞泵更换设备故障报告书                   编码：BSGGL109101M01',
    '口 2020.1.15 热轧2050区域5号车夹钳油柱塞泵泵更换故障调查单                 编码：BSGGL109101M01',
];

export default class Fileanaly extends Component {
    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }}>
                    <h2>文档解析1</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ marginTop: "50px" }}>
                    <Select defaultValue="按大小" style={{ width: 120 }} >
                        <Option value="按名称">按大小</Option>
                        <Option value="按名称">按名称</Option>
                        <Option value="按时间">按时间</Option>
                    </Select>
                    <Space direction="vertical" style={{ position: "absolute", left: "70%" }}><Search placeholder="请输入任务名称" onSearch={onSearch} enterButton /></Space>
                </Card>
                <Card style={{ marginTop: "50px" }}>
                    <List
                        header={<div>文档列表</div>}
                        bordered
                        dataSource={data}
                        renderItem={item => (<Link className="list-group-item" to="/Fileanly2"><List.Item ><Typography.Text mark>[ITEM]</Typography.Text> {item}</List.Item></Link>)}
                    />
                </Card>
                <div style={{ textAlign: "center", marginTop: "50px" }}><Pagination defaultCurrent={6} total={500} /></div>
            </div >
        )
    }
}
