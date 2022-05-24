import React, { Component } from 'react'
import UserBar from './UserBar'
import { Button, Card } from 'antd';
export default class Visulaizrepaire extends Component {
    state = {
        Viewer: 'http://124.221.220.105:8088/neo4j/'
    }
    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }} >
                    <h2><a href='http://124.221.220.105:8088/neo4j/' target="Viewergraph">运维知识图谱可视化</a></h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <iframe style={{ height: "1000px", width: "100%", marginTop: "50px" }} name="Viewergraph" title='Viewer' ></iframe>
            </div>
        )
    }
}
