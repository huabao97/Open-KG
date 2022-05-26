import React, { Component } from 'react'
import { Image, Button, Checkbox, Row, Col, Pagination, Space, Modal, Input, Divider } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined, MailOutlined, } from '@ant-design/icons';
import axios from 'axios';
import Treelayer1 from './Treelayer1'
var formaData = new FormData()
const { TextArea } = Input;
const { Search } = Input;
const onSearch = value => console.log(value);
export default class LoadList extends Component {
    state = {
        modal1Visible: false,
        modal2Visible: false,
        key: [],
        Url: ''
    };
    showModal = () => { this.setState({ modal2Visible: true }); };
    showModal1 = () => { this.setState({ modal1Visible: true }); };
    handleCancel = () => { this.setState({ modal2Visible: false, modal1Visible: false, }); };
    // 获取key
    onChange = async (checkedValues) => { await this.setState({ key: checkedValues }) }
    // 获得文件
    addData = (e) => {
        var file = e.target.files[0]
        console.log(e.target.files[0])
        formaData.append('file', file)
    }
    // 上传文件
    UploadYun = async () => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formaData,
            url: 'http://124.221.220.105:8081/api/file/upload/yun'
        }
        await axios(options)
        this.setState({ modal2Visible: false });
    }

    // 下载文件
    downLoadFile = async () => {
        var fileName = '1.png'
        await axios.post(`http://124.221.220.105:8081/api/file/download/${fileName}`, `${fileName}`).then(
            response => { return this.setState({ Url: response.data.data.URL }) }
        )
    }

    // 删除文件
    deleteFile = async () => {
        console.log(this.state.key)
        for (let i = 0; i < this.state.key.length; i++) {
            await axios.post(`http://124.221.220.105:8081/api/file/delete/${this.state.key[i]}`, this.state.key[i]).then(
                response => { return response.data },
                error => { console.log(error) }
            )
        }
    }

    render() {
        return (
            <div>
                <div >
                    <Button onClick={this.showModal1} type="primary" icon={<MailOutlined />} style={{ position: "absolute", left: "5%", marginTop: "15px" }}>设备树</Button>
                    <Space ><Search style={{ position: "absolute", left: "30%", width: "40%" }} placeholder="请输入搜素关键词" enterButton="搜素" onSearch={onSearch} /> </Space>
                </div>
                <Divider style={{ marginTop: "60px" }}></Divider>
                <div style={{ marginTop: "50px" }}>
                    {/* 按钮部分 */}
                    <div style={{ height: "30px" }} >
                        <Button icon={<UploadOutlined />} onClick={this.showModal} style={{ position: "absolute", left: "5%" }} >添加</Button>
                        <Button icon={<DownloadOutlined />} style={{ position: "absolute", left: "15%" }} onClick={this.downLoadFile}>下载</Button>
                        <Button style={{ position: "absolute", left: "25%" }}>重命名</Button>
                        <Button icon={<DeleteOutlined />} style={{ position: "absolute", left: "35%" }} onClick={this.deleteFile}>删除</Button>
                        <Button type="primary" shape="round" icon={<DownloadOutlined />} style={{ position: "absolute", left: "77%" }}>默认排序</Button>
                        <Space style={{ position: "absolute", left: "90%" }}>按时间排序</Space>
                    </div>
                    {/* 图片展示部分 */}
                    <div style={{ marginTop: "35px", textAlign: "center" }}>
                        <Checkbox.Group onChange={this.onChange}>
                            <Row>
                                <Col span={6}>
                                    <Checkbox value="A" ><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="B"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="C"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="D"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="E"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="g"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="f"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="h"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="g"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>

                                    <Checkbox value="f"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="h"><Image style={{ width: "100", height: "200px", paddingTop: "35px", paddingBottom: "35px" }} src={require("../img/1.png")}></Image></Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>,
                    </div>
                    {/* 底部分页 */}
                    <div style={{ textAlign: "right" }}><Pagination defaultCurrent={6} total={500} /></div>
                </div>

                {/* 模块1，当点击添加按钮的时候出现modal */}
                <Modal visible={this.state.modal2Visible} title="添加文件" onCancel={this.handleCancel} footer={[<Button key="3" onClick={this.UploadYun}>确定</Button>]}>
                    <Space style={{ marginBottom: "50px" }}>文件标题：<Input placeholder='请输入文件标题'></Input></Space><br />
                    <Space style={{ marginBottom: "50px" }}>文件编码：<Input placeholder='请输入文件编码'></Input></Space><br />
                    <Space style={{ marginBottom: "50px" }}>文件描述：<TextArea placeholder='请输入文件描述' ></TextArea></Space><br />
                    <Space style={{ marginBottom: "50px" }}>上传附件：<Input type="file" onChange={this.addData} /></Space><br />
                    <Space style={{ marginBottom: "50px" }}>支持格式：.rar .zip .doc .docx .pdf, 单个文件不能超过20M</Space><br />
                </Modal>
                {/* 模块2，当点击设备树按钮的时候出现modal */}
                <Modal visible={this.state.modal1Visible} title="设备树" onCancel={this.handleCancel} footer={[<Button key="1">确定</Button>]} > <Treelayer1></Treelayer1> </Modal>
            </div>

        )
    }
}
