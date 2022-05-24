package com.kg.openkg.Service.Controller;

import cn.hutool.core.date.DateUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.lang.Dict;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.kg.openkg.Service.IQiNiuService;
import com.kg.openkg.Service.Impl.IQiNiuServiceImpl;
import com.kg.openkg.Util.StringUtil;
import com.qiniu.http.Response;
import com.qiniu.util.Auth;
import io.swagger.annotations.*;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.UUID;

@Api(value = "文件上传接口",tags = {"1.0.0"})
@RestController
@Slf4j
@RequestMapping("/file")
public class UploadController {
    @Value("${spring.servlet.multipart.location}")
    private String fileTempPath;

    @Value("${qiniu.prefix}")
    private String prefix;

    @Autowired
    private  IQiNiuService qiNiuService;

    @Autowired
    private IQiNiuServiceImpl qiNiuServiceImpl;


    @Autowired
    public UploadController(IQiNiuService qiNiuService) {
        this.qiNiuService = qiNiuService;
    }
    @ApiOperation("上传文件至本地")
    @PostMapping(value = "/upload/local", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Dict local(@ApiParam(value = "file文件",required = true) @RequestParam("file") MultipartFile file) throws FileNotFoundException {
        if (file.isEmpty()) {
            return Dict.create().set("code", 400).set("message", "文件内容为空");
        }
        String fileName = file.getOriginalFilename();
        String rawFileName = StrUtil.subBefore(fileName, ".", true);
        String fileType = StrUtil.subAfter(fileName, ".", true);

        String localFilePath = StrUtil.appendIfMissing(fileTempPath, "/") + rawFileName + DateUtil.current() + "." + fileType;
        try {
            file.transferTo(new File(localFilePath));
        } catch (IOException e) {
            log.error("【文件上传至本地】失败，绝对路径：{}", localFilePath);
            return Dict.create().set("code", 500).set("message", "文件上传失败");
        }

        log.info("【文件上传至本地】绝对路径：{}", localFilePath);
        return Dict.create().set("code", 200).set("message", "上传成功").set("data", Dict.create().set("fileName", fileName).set("filePath", localFilePath));
    }

    @ApiOperation("上传文件至云对象存储")
    @PostMapping(value = "/upload/yun", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Dict yun(@ApiParam(value = "file文件",required = true) @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return Dict.create().set("code", 400).set("message", "文件内容为空");
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
                JSONObject jsonObject = JSONUtil.parseObj(response.bodyString());
                String yunFileName = jsonObject.getStr("key");
                String yunFilePath = "http://"+StrUtil.appendIfMissing(prefix, "/") + yunFileName;
                FileUtil.del(new File(localFilePath));
                log.info("【文件上传至七牛云】绝对路径：{}", yunFilePath);
                return Dict.create().set("code", 200).set("message", "上传成功").set("data", Dict.create().set("fileName", yunFileName).set("filePath", yunFilePath));
            } else {
                log.error("【文件上传至七牛云】失败，{}", JSONUtil.toJsonStr(response));
                FileUtil.del(new File(localFilePath));
                return Dict.create().set("code", 500).set("message", "文件上传失败");
            }
        } catch (IOException e) {
            log.error("【文件上传至七牛云】失败，绝对路径：{}", localFilePath);
            return Dict.create().set("code", 500).set("message", "文件上传失败");
        }
    }

    /**
     * 删除文件
     * @param key
     * @return
     * @throws IOException
     */
    @ApiOperation("删除文件")
    @GetMapping("delete/{key}")
    public Dict deleteFile(@ApiParam(value ="文件标识",required = true ) @PathVariable String key) throws IOException {
        if(key==null){
            return Dict.create().set("code",400).set("message","文件key值为空");
        }
        try{
            Response response= qiNiuService.delete(key);
            String yunFilePath="http://"+StrUtil.appendIfMissing(prefix,"/")+key;
            log.info("【文件已从七牛云上删除】绝对路径：{}",yunFilePath);
            return Dict.create().set("code",200).set("message","删除成功").set("data",Dict.create().set("fileName", key).set("filePath", yunFilePath));
        }catch (IOException e) {
            log.error("【文件从七牛云上删除】失败，文件标识：{}", key);
            return Dict.create().set("code", 500).set("message", "文件删除失败");
        }
    }

    /**
     * 七牛云文件下载
     * @param filename 文件名
     * @return
     */
    @ApiOperation("文件下载")
    @PostMapping("/download/{filename}")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "filename", value = "文件标识名", dataType = "string",  required = true)
    })
    public Dict download(@PathVariable("filename") String filename, HttpServletResponse response) throws Exception {
        if (filename.isEmpty()) {
           return Dict.create().set("code",400).set("message","filename为空");
        }
        String privateFile = StringUtil.getPublicFile(filename);
        if(privateFile==null){
            return Dict.create().set("code", 500).set("message", "文件url找不到");
        }
        log.info("【文件下载成功】文件的url：{}",  privateFile);
        return Dict.create().set("code", 200).set("message", "文件下载成功").set("data", Dict.create().set("URL", privateFile));
    }
}