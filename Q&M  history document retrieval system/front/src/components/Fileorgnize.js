import React, { Component } from 'react';
import { Button, Card } from 'antd';
import UserBar from './UserBar';
import LoadList from './LoadList';

export default class Fileorgnize extends Component {
    state = { visible: false };
    handleCancel = () => { this.setState({ visible: false }); };
    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }}>
                    <h2>文档管理</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ marginTop: "50px" }}><LoadList></LoadList></Card>
            </div >
        )
    }
}
