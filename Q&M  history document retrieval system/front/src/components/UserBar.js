import React, { Component } from 'react'
import { Input, Space, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import { DownOutlined, PoweroffOutlined, UserOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';
const { Search } = Input;
const menu1 = (
    <Menu>
        <Menu.Item key="1">修改密码</Menu.Item>
        <Menu.Item key="2">基本信息</Menu.Item>
    </Menu>
)
const menus = (
    <Menu>
        <Menu.Item key="3">消息中心</Menu.Item>
        <Menu.Item key="4">全部消息</Menu.Item>
        <Menu.Item key="5">安全消息</Menu.Item>
        <Menu.Item key="6">服务消息</Menu.Item>
    </Menu>
);
const onSearch = value => console.log(value);
export default class UserBar extends Component {
    render() {
        return (
            <div style={{ height: "50px" }}>
                <Space style={{ position: "absolute", right: "30%" }}><Search placeholder="请输入搜索内容" onSearch={onSearch} /></Space>
                <Space style={{ position: "absolute", right: "15%" }}><Dropdown overlay={menu1}><Space><UserOutlined />Admin<DownOutlined /></Space></Dropdown></Space>
                <Space style={{ position: "absolute", right: "9%" }}><Dropdown overlay={menus}><Space><BellOutlined /></Space></Dropdown></Space>
                <Space style={{ position: "absolute", right: "6%" }}><SettingOutlined /></Space>
                <Space style={{ position: "absolute", right: "3%" }}><PoweroffOutlined /></Space>
            </div >
        )
    }
}
