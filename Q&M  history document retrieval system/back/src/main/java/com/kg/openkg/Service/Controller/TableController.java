package com.kg.openkg.Service.Controller;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.Dict;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.baidu.aip.ocr.AipOcr;
import com.kg.openkg.Service.IQiNiuService;
import com.kg.openkg.Service.Impl.IQiNiuServiceImpl;
import com.kg.openkg.Util.*;
import com.qiniu.http.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@Slf4j
@Api(value = "文档解析接口",tags = {"1.0.0"})
@RequestMapping("/table")
public class TableController {

    @Value("${spring.servlet.multipart.location}")
    private String fileTempPath;

    @Value("${qiniu.prefix}")
    private String prefix;

    @Autowired
    private IQiNiuService qiNiuService;

    @Autowired
    private IQiNiuServiceImpl qiNiuServiceImpl;

    @ApiOperation("OCR图片识别")
    @PostMapping(value = "/ocr")
    public Dict  ocr(@ApiParam(value = "file",required = true) MultipartFile file) throws Exception {
        AipOcr client = new AipOcr("26002293", "c8VzziVqpoRwn1pnM5D38wsf", "pthpeFlKdtxs45O7zoPDnT1epbxQcW2w");
        // 传入可选参数调用接口
        HashMap<String, String> options = new HashMap<String, String>(4);
        options.put("language_type", "CHN_ENG");
        options.put("detect_direction", "true");
        options.put("detect_language", "true");
        options.put("probability", "true");
        String str = "";
        // 参数为二进制数组
        try{
            byte[] buf = file.getBytes();
            JSONObject res = client.basicGeneral(buf, options);
            Map map = JsonUtil.json2map(res.toString());
            //  提取并打印出识别的文字
            List list = (List) map.get("words_result");
            int len = ((List) map.get("words_result")).size();
            for(int i=0; i<len; i++) {
                str = str + ((Map) list.get(i)).get("words") + "\n";
            }
        }catch (Exception e){
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "图片识别失败");
        }
        return Dict.create().set("code", 200).set("message", "图片识别成功").set("data",str);
    }

    @ApiOperation("表格检测")
    @PostMapping(value = "/detect")
    public Dict tabledetection(@ApiParam(value = "file",required = true) MultipartFile file) throws Exception {
        // 请求url
        String url = "https://aip.baidubce.com/rpc/2.0/ai_custom/v1/detection/tables";
        if (file.isEmpty()) {
            return Dict.create().set("code", 400).set("message", "文件内容为空");
        }
        String fileName = file.getOriginalFilename();
        String rawFileName = StrUtil.subBefore(fileName, ".", true);
        String fileType = StrUtil.subAfter(fileName, ".", true);
        //将原始名称修改为：唯一文件名称
        String localFilePath = StrUtil.appendIfMissing(fileTempPath, "/") + rawFileName + DateUtil.current() + "." + fileType;
        try {
            byte[] imgData = file.getBytes();
            String paramcode = Base64Util.encode(imgData);
            Map<String, Object> map = new HashMap<>();
            map.put("image", paramcode);
            String param = GsonUtils.toJson(map);
            // 注意这里仅为了简化编码每一次请求都去获取access_token，线上环境access_token有过期时间， 客户端可自行缓存，过期后重新获取。
            String accessToken = AuthServiceUtil.getAuth();
            String result = HttpUtil.post(url, accessToken, "application/json", param);
//            上传云存储
            file.transferTo(new File(localFilePath));
            Response response = qiNiuService.uploadFile(new File(localFilePath));
            if (response.isOK()) {
                cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(response.bodyString());
                String yunFileName = jsonObject.getStr("key");
                String yunFilePath = "http://" + StrUtil.appendIfMissing(prefix, "/") + yunFileName;
                cn.hutool.core.io.FileUtil.del(new File(localFilePath));
                log.info("【文件上传至七牛云】绝对路径：{}", yunFilePath);
                return Dict.create().set("code", 200).set("message", "表格检测成功").set("data", Dict.create().set("Result", result).set("filePath", yunFilePath));
            } else {
                log.error("【文件上传至七牛云】失败，{}", JSONUtil.toJsonStr(response));
                cn.hutool.core.io.FileUtil.del(new File(localFilePath));
                return Dict.create().set("code", 500).set("message", "文件上传失败");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Dict.create().set("code", 500).set("message", "表格检测失败");
        }
    }
    public String fileQiuNiuYun(MultipartFile file){
        if (file.isEmpty()) {
            return null;
        }
        String fileName =  file.getOriginalFilename();
        String rawFileName = StrUtil.subBefore(fileName, ".", true);
        String fileType = StrUtil.subAfter(fileName, ".", true);
        //将原始名称修改为：唯一文件名称
        String localFilePath = StrUtil.appendIfMissing(fileTempPath, "/") + rawFileName + DateUtil.current() + "." + fileType;
        try {
            file.transferTo(new File(localFilePath));
            Response response = qiNiuService.uploadFile(new File(localFilePath));
            if (response.isOK()) {
                cn.hutool.json.JSONObject jsonObject = JSONUtil.parseObj(response.bodyString());
                String yunFileName = jsonObject.getStr("key");
                String yunFilePath = "http://"+StrUtil.appendIfMissing(prefix, "/") + yunFileName;
                cn.hutool.core.io.FileUtil.del(new File(localFilePath));
                log.info("【文件上传至七牛云】绝对路径：{}", yunFilePath);
                return yunFilePath;
            } else {
                log.error("【文件上传至七牛云】失败，{}", JSONUtil.toJsonStr(response));
                cn.hutool.core.io.FileUtil.del(new File(localFilePath));
                return null;
            }
        } catch (IOException e) {
            log.error("【文件上传至七牛云】失败，绝对路径：{}", localFilePath);
            return null;
        }
    }
}
