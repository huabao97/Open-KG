package com.kg.openkg.Service.Controller;

import cn.hutool.core.lang.Dict;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.kg.openkg.Util.NLPUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.wxapi.WxApiCall.WxApiCall;
import com.wxapi.model.RequestModel;
import java.util.HashMap;
import java.util.Map;

@Api(value = "知识抽取",tags = {"1.0.0"})
@RestController
@Slf4j
@RequestMapping("/KG")
public class KnowledgeExtraction {

    @ApiOperation("命名实体识别")
    @PostMapping(value = "/ner")
    public Dict ner(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.ner(text);
            return Dict.create().set("code", 200).set("message", "命名实体识别成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "命名实体识别失败");
        }
    }


    @ApiOperation("图上云—实体识别")
    @PostMapping(value = "/entity")
    public Dict entity(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            RequestModel model = new RequestModel();
            model.setGwUrl("https://aiapi.jd.com/jdai/nlp_ner");
            model.setAppkey("d4903205b6aa85a64879cca9f339bf3d");
            model.setSecretKey("8c7b30690220cb4fce82c4d5b350d5d1");
            model.setBodyStr("{\"content\":"+"\""+text+"\""+"}");
            Map queryMap = new HashMap();
            queryMap.put("Content-Type", "application/json"); //访问参数
            model.setQueryParams(queryMap);
            WxApiCall call = new WxApiCall();
            call.setModel(model);
            String response = call.request();
            System.out.println(response);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONObject data = jsonObject.getJSONObject("result");
            //第一次请求增加校验，如果错误则向前端回写500错误码\
            return data==null?Dict.create().set("code", 200).set("data", null):Dict.create().set("code", 200).set("message", "实体识别成功").set("data",data.toJSONString());
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "实体识别失败");
        }
    }

    @ApiOperation("图上云—关系抽取")
    @PostMapping(value = "/relation")
    public Dict relation(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            RequestModel model = new RequestModel();
            model.setGwUrl("https://aiapi.jd.com/jdai/nlp_relation");
            model.setAppkey("d4903205b6aa85a64879cca9f339bf3d");
            model.setSecretKey("8c7b30690220cb4fce82c4d5b350d5d1");
            model.setBodyStr("{\"content\":"+"\""+text+"\""+"}");
            Map queryMap = new HashMap();
            queryMap.put("Content-Type", "application/json"); //访问参数
            model.setQueryParams(queryMap);
            WxApiCall call = new WxApiCall();
            call.setModel(model);
            String response = call.request();
            System.out.println(response);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONObject data = jsonObject.getJSONObject("result");
            //第一次请求增加校验，如果错误则向前端回写500错误码\
            return data==null?Dict.create().set("code", 200).set("data", null):Dict.create().set("code", 200).set("message", "关系抽取成功").set("data",data.toJSONString());
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "关系抽取失败");
        }
    }

    @ApiOperation("图上云—事件抽取")
    @PostMapping(value = "/event")
    public Dict event(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            RequestModel model = new RequestModel();
            model.setGwUrl("https://aiapi.jd.com/jdai/nlp_event");
            model.setAppkey("d4903205b6aa85a64879cca9f339bf3d");
            model.setSecretKey("8c7b30690220cb4fce82c4d5b350d5d1");
            model.setBodyStr("{\"content\":"+"\""+text+"\""+"}");
            Map queryMap = new HashMap();
            queryMap.put("Content-Type", "application/json"); //访问参数
            model.setQueryParams(queryMap);
            WxApiCall call = new WxApiCall();
            call.setModel(model);
            String response = call.request();
            System.out.println(response);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONObject data = jsonObject.getJSONObject("result");
            //第一次请求增加校验，如果错误则向前端回写500错误码\
            return data==null?Dict.create().set("code", 200).set("data", null):Dict.create().set("code", 200).set("message", "事件抽取成功").set("data",data.toJSONString());
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "事件抽取失败");
        }
    }


    @ApiOperation("图上云—图谱构建(抽取文本中的实体（设备、产品等）、关系（工艺、操作、技术等关系）、指标值并构建出spo三元组知识图谱)")
    @PostMapping(value = "/graph")
    public Dict graph(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            RequestModel model = new RequestModel();
            model.setGwUrl("https://aiapi.jd.com/jdai/nlp_graph");
            model.setAppkey("d4903205b6aa85a64879cca9f339bf3d");
            model.setSecretKey("8c7b30690220cb4fce82c4d5b350d5d1");
            model.setBodyStr("{\"content\":"+"\""+text+"\""+"}");
            Map queryMap = new HashMap();
            queryMap.put("Content-Type", "application/json"); //访问参数
            model.setQueryParams(queryMap);
            WxApiCall call = new WxApiCall();
            call.setModel(model);
            String response = call.request();
            System.out.println(response);
            JSONObject jsonObject = JSON.parseObject(response);
            JSONObject data = jsonObject.getJSONObject("result");
            //第一次请求增加校验，如果错误则向前端回写500错误码\
            return data==null?Dict.create().set("code", 200).set("data", null):Dict.create().set("code", 200).set("message", "图谱构建成功").set("data",data.toJSONString());
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "图谱构建失败");
        }
    }
}
