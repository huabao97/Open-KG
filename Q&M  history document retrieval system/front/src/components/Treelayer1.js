import React, { Component } from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default class Treelayers extends React.Component {
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    render() {
        return (
            <Tree showLine switcherIcon={<DownOutlined />} defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}
                treeData={[
                    {
                        title: '设备',
                        key: '0-0',
                        children: [
                            {
                                title: '行车',
                                key: '0-0-0',
                                children: [
                                    {
                                        title: '卷绕装置',
                                        key: '0-0-0-0',
                                    },
                                    {
                                        title: '取物装置',
                                        key: '0-0-0-1',
                                    },
                                    {
                                        title: '制动装置',
                                        key: '0-0-0-2',
                                    },
                                    {
                                        title: '行车装置',
                                        key: '0-0-0-3',
                                        children: [
                                            {
                                                title: '电动机',
                                                key: '0-0-0-3-0',
                                                children: [
                                                    {
                                                        title: '厂1',
                                                        key: '0-0-0-3-0-0',

                                                    },
                                                    {
                                                        title: '厂2',
                                                        key: '0-0-0-3-0-1',
                                                        children: [
                                                            {
                                                                title: '区域1',
                                                                key: '0-0-0-3-0-1-0',

                                                            },
                                                            {
                                                                title: '区域2',
                                                                key: '0-0-0-3-0-1-1',
                                                                children: [
                                                                    {
                                                                        title: '主作业线',
                                                                        key: '0-0-0-3-0-1-1-0',

                                                                    },
                                                                    {
                                                                        title: '重要作业线',
                                                                        key: '0-0-0-3-0-1-1-1',
                                                                        children: [
                                                                            {
                                                                                title: 'BSGGL109101M01',
                                                                                key: '0-0-0-3-0-1-1-1-0',

                                                                            },
                                                                            {
                                                                                title: 'BSGGL109101M02',
                                                                                key: '0-0-0-3-0-1-1-1-1',

                                                                            },
                                                                            {
                                                                                title: 'BSGGL109101M03',
                                                                                key: '0-0-0-3-0-1-1-1-2',
                                                                            },
                                                                        ],

                                                                    },
                                                                    {
                                                                        title: '辅助作业线',
                                                                        key: '0-0-0-3-0-1-1-2',
                                                                    },
                                                                ],
                                                            },
                                                            {
                                                                title: '区域3',
                                                                key: '0-0-0-3-0-1-2',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        title: '厂3',
                                                        key: '0-0-0-3-0-2',
                                                    },
                                                ],
                                            },
                                            {
                                                title: '减速器',
                                                key: '0-0-0-3-1',
                                            },
                                            {
                                                title: '制动器',
                                                key: '0-0-0-3-2',
                                            },
                                            {
                                                title: '传动器',
                                                key: '0-0-0-3-3',
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                title: '炼钢炉',
                                key: '0-0-1',
                                children: [
                                    {
                                        title: '供应系统',
                                        key: '0-0-1-0',
                                    },
                                    {
                                        title: '转炉主体',
                                        key: '0-0-1-1',
                                    },
                                    {
                                        title: '精炼系统',
                                        key: '0-0-1-2',
                                    },
                                    {
                                        title: '浇注系统',
                                        key: '0-0-1-3',
                                    },
                                ],
                            },

                        ],
                    },
                ]}
            />
        );
    }
}

