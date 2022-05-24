package com.kg.openkg.Service;

import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;

import java.io.File;

public interface IQiNiuService {

    Response uploadFile(File file) throws QiniuException;

    void afterPropertiesSet();

    Response delete(String key) throws QiniuException;


}
