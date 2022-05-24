import React, { Component } from 'react'
import { Input, Button, Space, Image, Card, Table } from 'antd';
import * as d3 from "d3";
import UserBar from './UserBar';
const { TextArea } = Input;
var data;
const columns = [
    { title: '编码', dataIndex: 'key', }, { title: '运维履历文档名称', dataIndex: 'repairename', }, { title: '形似度值', dataIndex: 'similarity', },
    { title: '表示向量', dataIndex: 'reprenstation', }, { title: '详情', dataIndex: 'details', },
];
const datas = [];
for (let i = 0; i < 15; i++) {
    datas.push({
        key: i,
        repairename: `Edward King ${i}`,
        similarity: 32,
        reprenstation: `London, Park Lane no. ${i}`,
    });
}

export default class Similarfile extends Component {
    state = { selectedRowKeys: [], };
    onSelectChange = (selectedRowKeys) => { this.setState({ selectedRowKeys }); };
    kgdraw = () => {
        console.log(this);
        console.log(document.getElementsByClassName('svgs')[0].textContent)
        data = {
            "nodes": [
                { "id": "Napoleon", "group": 1 }, { "id": "Mlle.Baptistine", "group": 1 }, { "id": "Mme.Magloire", "group": 1 }, { "id": "CountessdeLo", "group": 1 },
                { "id": "Geborand", "group": 1 }, { "id": "Champtercier", "group": 1 }, { "id": "Cravatte", "group": 1 }, { "id": "Count", "group": 2 },
                { "id": "OldMan", "group": 1 }, { "id": "Labarre", "group": 2 },
            ],
            "links": [
                { "source": "Napoleon", "target": "Mlle.Baptistine", "value": 2 }, { "source": "Napoleon", "target": "Mme.Magloire", "value": 2 },
                { "source": "Napoleon", "target": "CountessdeLo", "value": 2 }, { "source": "Napoleon", "target": "Geborand", "value": 2 },
                { "source": "Napoleon", "target": "Champtercier", "value": 2 }, { "source": "Napoleon", "target": "Cravatte", "value": 2 },
                { "source": "Napoleon", "target": "Count", "value": 2 }, { "source": "Napoleon", "target": "OldMan", "value": 2 },
                { "source": "Napoleon", "target": "Labarre", "value": 2 },
            ]
        }

        if (document.getElementsByClassName('svgs')[0].textContent === "") {
            this.ForceGraph(data, {
                nodeId: d => d.id,
                nodeGroup: d => d.group,
                nodeTitle: d => `${d.id}\n${d.group}`,
                linkStrokeWidth: l => Math.sqrt(l.value),
                width: 2000,
                height: 600,
                // invalidation // a promise to stop the simulation when the cell is re-run
            })
        }

    }
    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }} >
                    <h2>相似检索</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ height: "1200px", marginTop: "50px" }} >
                    <div style={{ display: "inline-block", width: "45%", verticalAlign: "top" }}>
                        <h2 style={{ fontWeight: "bold" }} >故障调查单解析</h2>
                        <Card style={{ position: "relative", width: "100%", height: "900px" }}>
                            <Image style={{ margin: "0 auto" }} src={require('C:/Users/86187/Pictures/Saved Pictures/2050板坯库2#行车大车被动轮异音故障报告书/1.png')}></Image>
                        </Card><br /><br />
                        <div style={{ height: "100px" }}>
                            <Button type="primary" shape="round" >上传到本地</Button><br /><br />
                            <h3>支持PNG、JPG、JPEG等格式图片，图片大小不超过10M</h3>
                        </div>
                    </div>
                    <div style={{ display: "inline-block", width: "10%" }}></div>
                    <div style={{ display: "inline-block", width: "45%" }}>
                        <h2 style={{ fontWeight: "bold" }}>故障现象知识图谱<Button type="primary" shape="round" style={{ position: "absolute", left: "90%" }} onClick={this.kgdraw} >检索</Button></h2>
                        <Card style={{ width: "100%", height: "1000px" }}><svg className="svgs" style={{ width: "100%", height: "600px" }} ></svg></Card>
                    </div>
                </Card>
                {/* 处理表格 */}
                <Card style={{ marginTop: "40px" }}>
                    <div style={{ marginBottom: 8 }}>
                        <Space>检索结果</Space>
                        <Space>阈值：<Input placeholder='默认85%'></Input></Space>
                        <Space>TopN:<Input placeholder='默认N为5'></Input></Space>
                        <Button >查询</Button>
                        <Button>重置</Button>
                        <Button>导出</Button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </Card>
                <Card style={{ marginTop: "10px" }}>
                    <h2 style={{ fontWeight: "bold" }}>相似的运维履历文档知识图谱</h2>
                    <TextArea rows="4" ></TextArea>
                </Card>
            </div >
        )
    }
}

// 挂在原型链上
Similarfile.prototype.ForceGraph = (
    {
        nodes, // an iterable of node objects (typically [{id}, …])
        links // an iterable of link objects (typically [{source, target}, …])
    }, {
        nodeId = d => d.id, // 获得节点的id
        nodeGroup, // 节点的颜色
        nodeGroups, // an array of ordinal values representing the node groups
        nodeTitle, // given d in nodes, a title string
        nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
        nodeStroke = "#fff", // node stroke color
        nodeStrokeWidth = 5, // node stroke width, in pixels
        nodeStrokeOpacity = 1, // node stroke opacity
        nodeRadius = 30, // node radius, in pixels
        nodeStrength,
        linkSource = ({ source }) => source, // given d in links, returns a node identifier string
        linkTarget = ({ target }) => target, // given d in links, returns a node identifier string
        linkStroke = "blue", // 边的颜色
        linkStrokeOpacity = 1, // link stroke opacity
        linkStrokeWidth = 150, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        colors = d3.schemeTableau10, // an array of color strings, for the node groups
        width = 640, // outer width, in pixels
        height = 1000, // outer height, in pixels
        invalidation // when this promise resolves, stop the simulation
    } = {}
) => {
    // Compute values.
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(links, linkSource).map(intern);
    const LT = d3.map(links, linkTarget).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
    const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    links = d3.map(links, (_, i) => ({ source: LS[i], target: LT[i] }));

    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the scales.
    const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    // const forceLink = d3.forceLink(links).distance(100);
    const forceLink = d3.forceLink(links).distance(130).id(({ index: i }) => N[i]);
    if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)

        .force("collide", d3.forceCollide().radius(() => 50))
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const svg = d3.select(".svgs")
        .attr("style", "max-width: 100%; height: 1000;width:100%");

    const g = svg.append('g')
        .attr("height", 600)

    // 添加边
    const link = g.append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        // .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(links)

        .join("line")
        .attr('transform', `translate(${250}, ${250})`);

    // 添加节点
    const node = g.append("g")
        .attr("fill", nodeFill)
        .attr("stroke", nodeStroke)
        .attr("stroke-opacity", nodeStrokeOpacity)
        .attr("stroke-width", nodeStrokeWidth)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", nodeRadius)
        .attr("x", 100)
        .attr("y", 100)
        .attr('transform', `translate(${250}, ${250})`)
        .call(drag(simulation));

    // 为每一个节点添加文本
    const nodeNameText = g.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.id)
        .attr("dx", function () {
            return this.getBoundingClientRect().width / 2 * (-1)
        })
        .attr("dy", 0)
        .attr("class", "nodeName")
        .attr('transform', `translate(${250}, ${250})`)
    console.log(nodeNameText)


    if (W) link.attr("stroke-width", ({ index: i }) => W[i]);
    if (L) link.attr("stroke", ({ index: i }) => L[i]);
    if (G) node.attr("fill", ({ index: i }) => color(G[i]));
    if (T) node.append("title").text(({ index: i }) => T[i]);
    if (invalidation != null) invalidation.then(() => simulation.stop());

    function intern(value) {
        return value !== null && typeof value === "object" ? value.valueOf() : value;
    }

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        nodeNameText
            .attr("x", d => d.x)
            .attr("y", d => d.y)

    }

    function drag(simulation) {
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }

        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }

        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    return Object.assign(svg.node(), { scales: { color } });
}