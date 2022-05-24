package com.kg.openkg.Util;
import java.util.Random;
public class UUIDUtil {
     /**   * 生成16位不重复的随机数，含数字+大小写   * @return   */
    public static String getGUID() {
        StringBuilder uid = new StringBuilder();    //产生16位的强随机数
        Random rd = new Random();
        for (int i = 0; i < 16; i++) {      //产生0-2的3位随机数
         int type = rd.nextInt(3);
         switch (type) {
             case 0:
                 uid.append(rd.nextInt(10));
                 break;
             case 1:
                 uid.append((char)(rd.nextInt(25)+65));
                 break;
             case 2:
                 break;
             default:
                 break;
         }
        }
        return uid.toString();
    }
}
