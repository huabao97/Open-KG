import React, { Component } from 'react'
import { Input, Button, Card } from 'antd';
import UserBar from './UserBar';
import axios from 'axios';
const { TextArea } = Input;
var file
var formaData = new FormData()
var url
export default class Fileanly2 extends Component {
    state = {
        DetectRrsult: "",
        RecgOcr: '',
        picurl: ''
    }
    addData = (e) => {
        console.log(e)
        file = e.target.files[0]
        formaData.append('file', file)
        // 获取图片的url
        var imgObj = document.getElementById("preview")
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = function () {
            console.log(this)
            url = this.result
            imgObj.src = this.result
            console.log(url)
        }
    }
    getData = async () => {
        // 表格检测
        await axios.post('http://124.221.220.105:8081/api/table/detect', formaData).then(
            response => { return this.setState({ DetectRrsult: response.data.data.Result }) },
            error => { console.log(error.response) }
        )
        // 图片识别
        await axios.post('http://124.221.220.105:8081/api/table/ocr', formaData).then(
            response => { return this.setState({ RecgOcr: response.data.data }) },
            error => { console.log(error.response) }
        )
    }
    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }} >
                    <h2>文档解析2</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ height: "1050px", marginTop: "50px" }} >
                    <div style={{ display: "inline-block", width: "45%", height: "100px", verticalAlign: "top" }}>
                        <h2 style={{ fontWeight: "bold" }} >输入图片</h2>
                        <Card style={{ position: "relative", width: "100%", height: "800px" }}><img id="preview" style={{ width: "500px" }} src={url} alt="zhangfei" /></Card><br /><br />
                        <div style={{ height: "100px" }}>
                            <Input type='file' accept="image/gif,image/jpeg,image/jpg,image/png" multiple onChange={this.addData} /> <br /><br />
                            <Button type="primary" shape="round" onClick={this.getData} >开始检测</Button><br />
                            <h3>支持PNG、JPG、JPEG等格式图片，图片大小不超过10M</h3>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", width: "10%" }}></div>
                    <div style={{ display: "inline-block", width: "45%", verticalAlign: "top" }}>
                        <h2 style={{ fontWeight: "bold" }}>表格检测</h2>
                        <Card style={{ width: "100%", height: "800px" }}>{this.state.DetectRrsult}</Card><br /><br />
                    </div>
                </Card>
                <Card style={{ marginTop: "50px" }}>
                    <div style={{ display: "inline-block", width: "45%", verticalAlign: "top" }}>
                        <h2 style={{ fontWeight: "bold" }} >识别结果</h2>
                        <Card style={{ position: "relative", width: "100%", height: "700px" }}><TextArea rows="25" value={this.state.RecgOcr}></TextArea></Card><br /><br />
                        <div style={{ height: "100px" }}>
                            <Button type="primary" shape="round" >下载文件</Button><br /><br />
                            <h3>支持CSV、TXT、JSON等格式</h3>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", width: "10%" }}></div>
                    <div style={{ display: "inline-block", width: "45%", verticalAlign: "top" }}>
                        <h2 style={{ fontWeight: "bold" }}>表格分割</h2>
                        <Card style={{ width: "100%", height: "800px" }}></Card><br /><br />
                    </div>
                </Card>
            </div>
        )
    }
}
