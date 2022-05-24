import React, { Component } from 'react'
import { Input, Button, Space, Card, Select, Pagination, List, Typography } from 'antd';
import 'antd/dist/antd.css';
import UserBar from './UserBar';
import { Link, } from 'react-router-dom';
const { Search } = Input;
const onSearch = value => console.log(value);
const { Option } = Select;
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
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
