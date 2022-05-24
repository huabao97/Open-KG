import React, { Component } from 'react'
import { Button, Input, Card } from 'antd';
import UserBar from './UserBar';
import axios from 'axios';
const { TextArea } = Input;


export default class Naturalangurage extends Component {

    state = {
        InputText: "",
        SegmentWord: '',
        Semantic: "",
        Tagger: '',
    }
    addData = async (e) => { await this.setState({ InputText: e.target.value }) }

    getData = async () => {
        // 分词
        await axios.post('http://124.221.220.105:8081/api/nlp/segment', this.state.InputText).then(
            response => { return this.setState({ SegmentWord: response.data.data }) }
        )
        // 依存句法分析
        await axios.post('http://124.221.220.105:8081/api/nlp/semantic', this.state.InputText).then(
            response => { return this.setState({ Semantic: response.data.data }) }
        )
        // 词性标注
        await axios.post('http://124.221.220.105:8081/api/nlp/tagger', this.state.InputText).then(
            response => { return this.setState({ Tagger: response.data.data }) },
            error => { console.log(error) }
        )
    }

    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }}>
                    <h2>自然语言处理</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ marginTop: "50px" }}>
                    <div ><TextArea placeholder='输入内容' onChange={this.addData}></TextArea></div>
                    <div style={{ marginTop: "10px" }}>
                        <div style={{ display: "inline-block", width: "40%", verticalAlign: "top", height: "200px" }} >
                            <h2 >分词</h2>
                            <TextArea rows={12} value={this.state.SegmentWord} /><br /><br />
                            <Button type="primary" shape="round" onClick={this.getData} >分析</Button>
                        </div>
                        <div style={{ display: "inline-block", width: "20%", verticalAlign: "top" }} >
                            <h2>词性标注</h2>
                            <TextArea rows={12} value={this.state.Tagger} />
                        </div>
                        <div style={{ display: "inline-block", width: "40%", verticalAlign: "top" }} >
                            <h2>新词发现</h2>
                            <TextArea rows={5} /><br /><br />
                            <h2>用户自定义字典</h2>
                            <TextArea rows={4} /><br /><br />
                            <Button type="primary" shape="round" >导入</Button>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "inline-block", width: "60%" }} >
                            <h2 >词云图</h2>
                            <Card style={{ height: "400px", width: "100%" }}></Card>
                        </div>
                        <div style={{ display: "inline-block", width: "10%" }}></div>
                        <div style={{ display: "inline-block", width: "30%" }}>
                            <h2>参数列表</h2>
                            <Card style={{ height: "400px", width: "100%" }}></Card>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <div style={{ display: "inline-block", width: "45%", verticalAlign: "top", height: "200px" }} >
                            <h2 >依存句法分析</h2>
                            <TextArea rows={4} />
                        </div>
                        <div style={{ display: "inline-block", width: "10%", verticalAlign: "top" }}></div>
                        <div style={{ display: "inline-block", width: "45%", verticalAlign: "top" }}>
                            <h2>语法依存句法分析</h2>
                            <TextArea rows={4} value={this.state.Semantic} />
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
