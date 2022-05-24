package com.kg.openkg.Service.Controller;


import cn.hutool.core.lang.Dict;
import com.kg.openkg.Util.NLPUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "自然语言处理",tags = {"1.0.0"})
@RestController
@Slf4j
@RequestMapping("/nlp")
public class NLPController {

    @ApiOperation("文本分词")
    @PostMapping(value = "/segment")
    public Dict segment(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.segment(text);
            return Dict.create().set("code", 200).set("message", "分词成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "分词失败");
        }
    }


    @ApiOperation("词性标注")
    @PostMapping(value = "/tagger")
    public Dict tagger(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.tagger(text);
            return Dict.create().set("code", 200).set("message", "词性标注成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "词性标注失败");
        }
    }

    @ApiOperation("语义依存句法分析")
    @PostMapping(value = "/semantic")
    public Dict semantic(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.semantic(text);
            return Dict.create().set("code", 200).set("message", "语义依存句法分析成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "语义依存句法分析失败");
        }
    }

    @ApiOperation("短语成分分析")
    @PostMapping(value = "/con")
    public Dict con(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.con(text);
            return Dict.create().set("code", 200).set("message", "短语成分分析成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "短语成分分析失败");
        }
    }
    @ApiOperation("文档相似度")
    @PostMapping(value = "/table2vec")
    public Dict word2vec(@ApiParam(value = "text",required = true) @RequestBody String text) throws Exception{
        if(text==null){
            return Dict.create().set("code", 400).set("message", "无任何文本");
        }
        try{
            String result= NLPUtil.con(text);
            return Dict.create().set("code", 200).set("message", "文档相似度成功").set("data", result);
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "文档相似度失败");
        }
    }




}
