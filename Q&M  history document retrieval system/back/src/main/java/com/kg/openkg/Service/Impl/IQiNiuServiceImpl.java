package com.kg.openkg.Service.Impl;
import com.kg.openkg.Service.IQiNiuService;
import com.qiniu.common.QiniuException;
import com.qiniu.http.Response;
import com.qiniu.storage.BucketManager;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.File;
import java.net.URLEncoder;

@Service
public class IQiNiuServiceImpl implements IQiNiuService {
    private final UploadManager uploadManager;

    public Auth getAuth() {
        return auth;
    }

    private final Auth auth;
    @Value("${qiniu.bucket}")
    private String bucket;
    private StringMap putPolicy;
    @Autowired
    private BucketManager bucketManager;

    @Autowired
    public IQiNiuServiceImpl(UploadManager uploadManager, Auth auth) {
        this.uploadManager = uploadManager;
        this.auth = auth;
    }



    /**
     * 七牛云上传文件
     *
     * @param file 文件
     * @return 七牛上传Response
     * @throws QiniuException 七牛异常
     */
    @Override
    public Response uploadFile(File file) throws QiniuException {
        Response response = this.uploadManager.put(file, file.getName(), getUploadToken());
        int retry = 0;
        while (response.needRetry() && retry < 3) {
            response = this.uploadManager.put(file, file.getName(), getUploadToken());
            retry++;
        }
        return response;
    }

    @Override
    public void afterPropertiesSet() {
        this.putPolicy = new StringMap();
        putPolicy.put("returnBody", "{\"key\":\"$(key)\",\"hash\":\"$(etag)\",\"bucket\":\"$(bucket)\",\"width\":$(imageInfo.width), \"height\":${imageInfo.height}}");
    }

    /**
     * 删除七牛云上的相关文件
     *
     * @param key
     * @return
     * @throws QiniuException
     */
    @Override
    public Response delete(String key) throws QiniuException {
        Response response = bucketManager.delete(bucket, key);
        int retry = 0;
        while (response.needRetry() && retry++ < 3) {
            response = bucketManager.delete(bucket, key);
        }
        return response;
    }

    /**
     * 获取上传凭证
     *
     * @return 上传凭证
     */
    private String getUploadToken() {

        return this.auth.uploadToken(bucket, null, 3600, putPolicy);
    }


}
