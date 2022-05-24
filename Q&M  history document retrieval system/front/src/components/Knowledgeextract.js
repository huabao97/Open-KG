import React, { Component } from 'react'
import { Button, Input, Card } from 'antd';
import * as d3 from "d3";
import UserBar from './UserBar';
import axios from 'axios';
const { TextArea } = Input;
export default class Knowledgeextract extends Component {
    state = {
        InputText: "",
        Kgner: "",
        KeyWord: "",
        data: {
            "nodes": [],
            "edges": []
        }
    }
    addData = async (e) => { await this.setState({ InputText: e.target.value }) }
    kgdraw = async () => {
        // 绘制图谱
        if (document.getElementsByClassName('svgs')[0].textContent === "") {
            this.ForceGraph(this.state.data, {
                nodeId: d => d.id,
                nodeGroup: d => d.group,
                nodeTitle: d => `${d.id}\n${d.group}`,
                linkStrokeWidth: l => Math.sqrt(l.value),
                width: 2000,
                height: 600,
                // invalidation // a promise to stop the simulation when the cell is re-run
            })
        }
        // 发送请求命名实体识别
        await axios.post("http://124.221.220.105:8081/api/KG/entity", this.state.InputText).then(
            response => {
                const Kgners = response.data.data
                return this.setState({ Kgner: Kgners })
            }
        )

        // 发送请求关系抽取
        await axios.post("http://124.221.220.105:8081/api/KG/relation", this.state.InputText).then(
            response => {
                const KeyWord = response.data.data
                return this.setState({ KeyWord: KeyWord })
            }
        )

        // 发送请求知识图谱节点-边
        await axios.post("http://124.221.220.105:8081/api/KG/graph", this.state.InputText).then(
            response => {
                let data = JSON.parse(response.data.data)
                return this.setState({ data: data.data })
            }
        )
    }

    render() {
        return (
            <div>
                <Card style={{ textAlign: "right" }}><UserBar /></Card>
                <div style={{ marginTop: "10px" }}>
                    <h2>知识抽取</h2>
                    <Button type="default" style={{ position: "absolute", left: "88%" }} >刷新</Button>
                    <Button type="default" style={{ position: "absolute", left: "95%" }}>返回</Button>
                </div>
                <Card style={{ marginTop: "50px" }}>
                    <div >
                        <h2 style={{ fontWeight: "bold" }}>知识抽取</h2>
                        <div style={{ display: "inline-block", width: "50%" }}>
                            <h3 >
                                <span style={{ fontWeight: "bold" }} > 输入</span>
                                <Button type="primary" shape="round" style={{ left: "45%" }} onClick={this.kgdraw}>分析</Button>
                                <Button type="primary" shape="round" style={{ left: "55%" }} > 清空</Button>
                            </h3>
                            <TextArea rows={4} onChange={this.addData} placeholder={'1995年因获得第14届新秀歌唱大赛冠军而正式出道。1996年发行个人首张专辑《陈奕迅》。1997年主演个人首部电影《旺角大家姐》。1998年凭借歌曲《天下无双》在乐坛获得关注。2000年发行的歌曲《K歌之王》奠定其在歌坛的地位 [1]  。2001年发行流行摇滚风格的专辑《反正是我》。2003年发行个人首张概念专辑《黑·白·灰》；专辑中的歌曲《十年》获得第4届百事音乐风云榜十大金曲奖 [2]  。     2005年发行的歌曲《浮夸》成为其歌唱生涯的代表作品之一。2006年起，连续9年获得叱咤乐坛流行榜颁奖典礼叱咤乐坛我最喜爱的男歌手奖 [3]  。2008年1月，获得十大劲歌金曲最受欢迎男歌星奖” [4]  。2010年凭借剧情片《金钱帝国》获得星光大典港台年度电影男演员奖 [5]  。2011年成立个人音乐制作公司EAS MUSIC [6]  。2012年发行舞曲风格的粤语专辑《…3mm》。2015年凭借专辑《米·闪》获得第26届台湾金曲奖最佳国语男歌手奖 [7]  。2016年举行“Another Eason'} />
                        </div>
                        <div style={{ display: "inline-block", width: "50%" }}>
                            <h3>
                                <span style={{ fontWeight: "bold" }}> 实体识别结果</span>
                                <Button type="primary" shape="round" style={{ left: "75%" }} >导出</Button>
                            </h3>
                            <TextArea rows={4} value={this.state.Kgner} ></TextArea>
                        </div>
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <h2 style={{ fontWeight: "bold" }}>关系抽取</h2>
                        <TextArea rows={4} value={this.state.KeyWord} />
                    </div>
                    <div>
                        <br /><br />
                        <h2 className="知识图谱" style={{ fontWeight: "bold" }}>知识图谱结果</h2>
                        <div style={{ width: "2000px" }}><svg className="svgs" width="1000" height="1000" ></svg></div>
                    </div>
                </Card>
            </div>
        )
    }
}

// 挂在原型链上
Knowledgeextract.prototype.ForceGraph = (
    {
        nodes,
        edges
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
        linkStroke = "red", // 边的颜色
        linkStrokeOpacity = 1, // link stroke opacity
        linkStrokeWidth = 150, // given d in links, returns a stroke width in pixels
        linkStrokeLinecap = "round", // link stroke linecap
        linkStrength,
        colors = d3.schemeTableau10, // an array of color strings, for the node groups
        width = 640, // outer width, in pixels
        height = 400, // outer height, in pixels
        invalidation // when this promise resolves, stop the simulation
    } = {}
) => {
    // Compute values.
    const N = d3.map(nodes, nodeId).map(intern);
    const LS = d3.map(edges, linkSource).map(intern);
    const LT = d3.map(edges, linkTarget).map(intern);
    if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
    const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
    const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
    const W = typeof linkStrokeWidth !== "function" ? null : d3.map(edges, linkStrokeWidth);
    const L = typeof linkStroke !== "function" ? null : d3.map(edges, linkStroke);

    // Replace the input nodes and links with mutable objects for the simulation.
    nodes = d3.map(nodes, (_, i) => ({ id: N[i] }));
    edges = d3.map(edges, (_, i) => ({ source: LS[i], target: LT[i] }));

    // Compute default domains.
    if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

    // Construct the scales.
    const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

    // Construct the forces.
    const forceNode = d3.forceManyBody();
    // const forceLink = d3.forceLink(links).distance(100);
    const forceLink = d3.forceLink(edges).distance(150).id(({ index: i }) => N[i]);
    if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
    if (linkStrength !== undefined) forceLink.strength(linkStrength);

    const simulation = d3.forceSimulation(nodes)
        .force("link", forceLink)

        .force("collide", d3.forceCollide().radius(() => 50))
        .force("center", d3.forceCenter())
        .on("tick", ticked);

    const svg = d3.select(".svgs")
        .attr("width", width)
        .attr("height", height)
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");


    // 添加边
    const link = svg.append("g")
        .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
        .attr("stroke-opacity", linkStrokeOpacity)
        // .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
        .attr("stroke-linecap", linkStrokeLinecap)
        .selectAll("line")
        .data(edges)
        .join("line")
        .attr('transform', `translate(${500}, ${200})`);

    // 添加节点
    const node = svg.append("g")
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
        .attr('transform', `translate(${500}, ${200})`)
        .call(drag(simulation));

    // 为每一个节点添加文本
    const nodeNameText = svg.append("g")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .text(d => d.id)
        .attr("dx", function () {
            return this.getBoundingClientRect().width / 2 * (-1)
        })
        .attr("dy", 0)
        .attr("class", "nodeName")
        .attr('transform', `translate(${500}, ${200})`)
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