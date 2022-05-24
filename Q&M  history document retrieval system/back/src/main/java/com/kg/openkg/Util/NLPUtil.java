package com.kg.openkg.Util;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.context.annotation.Configuration;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Configuration
@Slf4j
public class NLPUtil {
    /**
     *  nlp分词范例
     */
        public static String segment(String text) {
            //请求头中的token   需要进行替换成在官网申请的新token
            String token="b2966c031f2f4aa9b3bbe3f52ed6874d1653044207629token";
            //申请的接口地址
            String url="http://comdo.hanlp.com/hanlp/v21/tok/tok";
            //处理分析的文本，作为params参数传入
            Map<String,Object> params=new HashMap<String,Object>();

            //参数传入要处理分析的文本
            params.put("text", text);

            //执行HanLP接口，result为返回的结果
            String result=doHanlpApi(token,url,params);



            //打印输出结果
//            System.out.println(result);
            return result;
        }

    /**
     * 词性标注
     * @param text
     * @return
     */
    public static String tagger(String text){
        //请求头中的token   需要进行替换成在官网申请的新token
        String token="62d90505b41c4c259051fb40914539581653044298942token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v2/tagger/chinese";
        //处理分析的文本，作为params参数传入
        Map<String,Object> params=new HashMap<String,Object>();

        //参数传入要处理分析的文本
        params.put("text", text);

        //执行HanLP接口，result为返回的结果
        String result=doHanlpApi(token,url,params);
        //打印输出结果
//        System.out.println(result);
            return result;
    }

    /**
     * 依存句法分析
     * @param text
     * @return
     *
     */
    public static String syntactic(String text){
        //请求头中的token   需要进行替换成在官网申请的新token
        String token="952709be18e040d19f4c57ef413aeb411653040728604token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v2/syntactic/chinese";
        //处理分析的文本，作为params参数传入
        Map<String,Object> params=new HashMap<String,Object>();

        //参数传入要处理分析的文本
        params.put("text", text);

        //执行HanLP接口，result为返回的结果
        String result=doHanlpApi(token,url,params);
        //打印输出结果
//        System.out.println(result);
        return result;
    }



    /**
     * 语义依存句法分析
     * @param text
     * @return
     */
    public static String semantic(String text){
        //请求头中的token   需要进行替换成在官网申请的新token
        String token="f76e589f76b949b7b92faa20218893711653042355320token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v2/semantic/chinese";
        //处理分析的文本，作为params参数传入
        Map<String,Object> params=new HashMap<String,Object>();

        //参数传入要处理分析的文本
        params.put("text", text);

        //执行HanLP接口，result为返回的结果
        String result=doHanlpApi(token,url,params);
        //打印输出结果
//        System.out.println(result);
        return result;
    }

    /**
     * 短语成分分析
     * @param text
     * @return
     */
    public static String con(String text){
        //请求头中的token   需要进行替换成在官网申请的新token
        String token="cb788f4815194ee7a4c3a659f4d508851653044431967token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v21/con/con";
        //处理分析的文本，作为params参数传入
        Map<String,Object> params=new HashMap<String,Object>();
        //参数传入要处理分析的文本
        params.put("text", text);

        //执行HanLP接口，result为返回的结果
        String result=doHanlpApi(token,url,params);
        //打印输出结果
//        System.out.println(result);
        return result;
    }


    /**
     * 命名实体识别
     * @param text
     * @return
     */
    public static String ner(String text) {
        //请求头中的token
        String token="cd77b6cb2576444e84f8b16f4ec157441653040531808token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v2/recognizer/chinese";
        //所有参数
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("text", text);

        //执行api
        String result=doHanlpApi(token,url,params);
        return result;
    }

    /**
     * 文档相似度
     * @param text
     * @return
     */
    public static String word2vec(String text) {
        //请求头中的token
        String token="12725546a31c4426a7ef70cdef2f89a31653043862611token";
        //申请的接口地址
        String url="http://comdo.hanlp.com/hanlp/v1/word2vec/docSimilarity";
        //所有参数
        Map<String,Object> params=new HashMap<String,Object>();
        params.put("text", text);

        //执行api
        String result=doHanlpApi(token,url,params);
        return result;
    }

    public static String doHanlpApi(String token,String url,Map<String,Object> params) {
            // 创建Httpclient对象
            CloseableHttpClient httpClient = HttpClients.createDefault();
            CloseableHttpResponse response = null;
            String resultString = "";
            try {
                // 创建Http Post请求
                HttpPost httpPost = new HttpPost(url);
                //添加header请求头，token请放在header里
                httpPost.setHeader("token", token);
                // 创建参数列表
                List<NameValuePair> paramList = new ArrayList<>();
                if (params != null) {
                    for (String key : params.keySet()) {
                        //所有参数依次放在paramList中
                        paramList.add(new BasicNameValuePair(key, (String) params.get(key)));
                    }
                    //模拟表单
                    UrlEncodedFormEntity entity = new UrlEncodedFormEntity(paramList, "utf-8");
                    httpPost.setEntity(entity);
                }
                // 执行http请求
                response = httpClient.execute(httpPost);
                resultString = EntityUtils.toString(response.getEntity(), "utf-8");
                return resultString;
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (response != null) {
                    try {
                        response.close();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                }
            }
            return null;
        }
}
