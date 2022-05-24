package com.kg.openkg.Util;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;


import java.net.URLEncoder;
import java.util.UUID;
@Configuration
@Slf4j
public class StringUtil {
    public static String getRandomImgName(String fileName) {
        int index = fileName.lastIndexOf(".");
        if ((fileName == null || fileName.isEmpty()) || index == -1){
            throw new IllegalArgumentException();
        }
        // 获取文件后缀
        String suffix = fileName.substring(index);
        // 生成UUID
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        // 生成上传至云服务器的路径
        String path = uuid + suffix;
        return path;
    }

    /**
     * 获取公共空间文件
     * @param fileKey  要下载的文件名
     * @return
     */
    public static String getPublicFile(String fileKey) throws Exception{
        String encodedFileName = URLEncoder.encode(fileKey, "utf-8").replace("+", "%20");
        String url = String.format("%s%s/%s", "http://","rac7v266m.hd-bkt.clouddn.com", encodedFileName);
        log.info("下载地址：{}", url);
        return url;
    }

}
