package com.kg.openkg.Util;



import com.google.common.hash.Hashing;
import org.springframework.context.annotation.Configuration;

import java.nio.charset.Charset;

/**
 * MD5
 */
@Configuration
public class MD5Util {

    public MD5Util(){
    }

    public static String MD5encode(){
        String secretKey = "8c7b30690220cb4fce82c4d5b350d5d1";
        long timestamp = System.currentTimeMillis();
        String sign = Hashing.md5().hashString(secretKey + timestamp, Charset.forName("UTF-8")).toString();
        return sign;
    }
}
