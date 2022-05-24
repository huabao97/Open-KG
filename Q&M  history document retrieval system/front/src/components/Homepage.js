import React, { Component } from 'react'
import { Button, Card } from 'antd';
import UserBar from './UserBar';
export default class Homepage extends Component {
    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }}>
                    <h2>冶金行业运维知识图谱与大数据分析</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ marginTop: "50px", height: "800px" }}></Card>
            </div>
        )
    }
}
