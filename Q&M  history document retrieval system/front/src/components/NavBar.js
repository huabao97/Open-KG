import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Fileanaly from './Fileanaly';
import Fileorgnize from './Fileorgnize';
import Knowledgeextract from './Knowledgeextract';
import Similarfile from './Similarfile';
import Naturalangurage from './Naturalangurage';
import Homepage from './Homepage';
import Visulaizrepaire from './Visulaizrepaire';
import Fileanly2 from './Fileanly2';
import { MailOutlined, } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 'Introduction',
        };
    }
    toggleCollapsed = () => {
        this.setState({ collapsed: !this.state.collapsed, });
    };
    handleClick = (e) => { this.setState({ current: e.key }); };

    render() {
        return (
            <div>
                <div style={{ width: "15 %", position: "absolute" }}>
                    <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}</Button>
                    <Menu mode="inline" theme="dark" inlineCollapsed={this.state.collapsed} style={{ height: "1000px" }} >
                        <Menu.Item key="homepage" icon={<MailOutlined />} ><Link className="list-group-item" to="/Homepage">首页</Link></Menu.Item>
                        <Menu.Item key="Introduction" icon={<MailOutlined />} ><Link className="list-group-item" to="/Fileorgnize">文档管理</Link></Menu.Item>
                        <Menu.Item key="SearchLegalPerson" icon={<MailOutlined />} ><Link className="list-group-item" to="/Fileanaly">文档解析</Link></Menu.Item>
                        <Menu.Item key="natureallanghanle" icon={<MailOutlined />} ><Link className="list-group-item" to="/Naturalangurage">自然语言处理</Link></Menu.Item>
                        <Menu.Item key="CompanySearch" icon={<MailOutlined />}><Link className="list-group-item" to="/Knowledgeextract">知识抽取</Link></Menu.Item>
                        <Menu.Item key="repairevisialby" icon={<MailOutlined />}><Link className="list-group-item" to="/Visulaizrepaire">运维知识图谱可视化</Link></Menu.Item>
                        <Menu.Item key="SearchInventoryByName" icon={<UsergroupAddOutlined />}><Link className="list-group-item" to="/Similarfile">相似文档</Link></Menu.Item>
                    </Menu>
                </div>
                <div style={{ position: "absolute", top: "5%", left: "15%", width: "75%" }}>
                    <Routes>
                        <Route path='/Fileanaly' element={<Fileanaly />} />
                        <Route path='/Fileorgnize' element={<Fileorgnize />} />
                        <Route path='/Knowledgeextract' element={<Knowledgeextract />} />
                        <Route path='/Similarfile' element={<Similarfile />} />
                        <Route path='/Naturalangurage' element={<Naturalangurage />} />
                        <Route path='/Homepage' element={<Homepage />} />
                        <Route path='/visulaizrepaire' element={<Visulaizrepaire />} />
                        <Route path='/Fileanly2' element={<Fileanly2 />} />
                    </Routes>
                </div>
            </div>
        )
    }
}

export default NavBar;