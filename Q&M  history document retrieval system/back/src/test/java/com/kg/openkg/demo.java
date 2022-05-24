package com.kg.openkg;
import com.kg.openkg.Util.MD5Util;
import com.wxapi.WxApiCall.WxApiCall;
import com.wxapi.model.RequestModel;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;


public class demo {
    public static MD5Util md5Util;

    public static void main(String[] args) {
        RequestModel model = new RequestModel();
        model.setGwUrl("https://aiapi.jd.com/jdai/nlp_ner");
        model.setAppkey("d4903205b6aa85a64879cca9f339bf3d");
        model.setSecretKey("8c7b30690220cb4fce82c4d5b350d5d1");
        model.setBodyStr("{\"content\":"+"\""+"华氏大药房公司通过全资子公司慈济药业持股29%"+"\""+"}");    //body参数
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
        System.out.println(data.toJSONString());
    }
}
