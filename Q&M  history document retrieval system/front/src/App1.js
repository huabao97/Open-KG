import React, { Component } from 'react'
import { Button, Input, Upload } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
var file
var formaData = new FormData()
var names = "zhangfei"
var json
var object = {}
export default class UserBar extends Component {

    // 命名实体识别
    Ner = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/KG/ner', "《好好说话》是由杨栋执导，陈晓、王晓晨领衔主演，王耀庆、曾黎、赖艺、朱近桐、倪大红、王志飞、张光北、涂凌等主演的都市轻喜剧").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
        console.log(data)
    }

    // 短语成分分析
    Con = async () => {
        console.log(4)
        var data = await axios.post({
            method: 'post',
            url: 'http://124.221.220.105:8081/api/nlp/con',
            data: "杨栋执导"
        }).then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )

    }

    // 文本分类
    Classification = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/classification', "张飞是一个什么样的人").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 短语成分分析
    Con = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/con', "《好好说话》是由杨栋执导，陈晓、王晓晨领衔主演，王耀庆、曾黎、赖艺、朱近桐、倪大红、王志飞、张光北、涂凌等主演的都市轻喜剧 ").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 关键词提取
    KeyWord = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/keyword', "《好好说话》是由杨栋执导，陈晓、王晓晨领衔主演，王耀庆、曾黎、赖艺、朱近桐、倪大红、王志飞、张光北、涂凌等主演的都市轻喜剧 ").then(
            response => {
                console.log(response);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 文本分词
    Segment = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/egment', "张飞是一个什么样的人").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 语义依存句法分析
    Semantic = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/semantic', "张飞是一个什么样的人").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 词性标注
    Tagger = async () => {
        console.log(4)
        var data = await axios.post('http://124.221.220.105:8081/api/nlp/tagger', "张飞是一个什么样的人").then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }
    // 表格检测
    TableDetect = async () => {

        await axios.post('http://124.221.220.105:8081/api/table/detect', formaData).then(

            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error.response)
            }
        )


    }

    // 图片识别
    TableOcr = async () => {
        let formaData = new FormData()
        console.log(file)
        formaData.append("name", names)
        formaData.append("fileName", file)
        console.log(formaData)
        let files = {}
        files.fileName = file
        await axios.post('http://124.221.220.105:8081/api/table/ocr', formaData).then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error.response)
            }
        )
    }

    // 获得文件
    addData = (e) => {
        // console.log(e.target.files[0])
        file = e.target.files[0]
        console.log(e.target.files[0])
        // formaData["fileName"] = file
        formaData.append('file', file)
        // console.log(formaData)

    }


    // 上传文件到云对象
    UploadYun = async () => {
        // await axios.post('http://124.221.220.105:8081/api/file/upload/yun', formaData).then(
        //     response => {
        //         console.log(response.data);
        //         return response.data;
        //     },
        //     error => {
        //         console.log(error)
        //     }
        // )

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: formaData,
            url: 'http://124.221.220.105:8081/api/file/upload/yun'
        }
        await axios(options)
    }

    // 上传文件到本地
    UploadLocal = async () => {
        let formaData = new FormData()
        console.log(this.file)
        formaData.append("name", names)
        formaData.append("file", file)
        await axios.post('http://124.221.220.105:8081/api/file/upload/local', formaData).then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }
    // 文件下载
    DownloadFile = async (filename) => {
        console.log(4)
        var data = await axios.post(`http://124.221.220.105:8081/api/file/download/${filename}`, filename).then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }

    // 删除文件
    DeleteFile = async (key) => {
        console.log(4)
        var data = await axios.get(`http://124.221.220.105:8081/api/file/download/${key}`).then(
            response => {
                console.log(response.data);
                return response.data;
            },
            error => {
                console.log(error)
            }
        )
    }
    render() {
        return (
            <div style={{ height: "50px" }}>
                <Button type="primary" onClick={this.Ner} style={{ width: "900px" }}>实体识别</Button><br /><br />
                <Button type="primary" onClick={this.Classification}>文本分类</Button><br /><br />
                <Button type="primary" onClick={this.Con}>短语成分分析</Button><br /><br />
                <Button type="primary" onClick={this.KeyWord}>关键词提取</Button><br /><br />
                <Button type="primary" onClick={this.Segment}>文本分词</Button><br /><br />
                <Button type="primary" onClick={this.Semantic}>语义依存句法分析</Button><br /><br />
                <Button type="primary" onClick={this.Tagger}>词性标注</Button><br /><br />
                <Button type="primary" onClick={this.TableDetect}>表格检测</Button><br /><br />
                <Button type="primary" onClick={this.TableOcr}>图片识别</Button><br /><br />
                <Input type='file' onChange={this.addData}></Input>
                <Button type="primary" onClick={this.UploadYun}>上传文件到云对象</Button><br /><br />
                <Button type="primary" onClick={this.UploadLocal}>上传文件到本地</Button><br /><br />
                <Button type="primary" onClick={this.DownloadFile}>文件下载</Button><br /><br />
                <Button type="primary" onClick={this.DeleteFile}>删除文件</Button><br /><br />
            </div >
        )
    }
}
