package com.kg.openkg;

import com.kg.openkg.Util.UUIDUtil;

import java.io.*;
import java.util.Arrays;

public class data {
    public static UUIDUtil uuidUtil;
    public static void main(String[] args) {
try { // 防止文件建立或读取失败，用catch捕捉错误并打印，也可以throw
  /* 读入TXT文件 */
  String pathname = "src/test/java/com/kg/openkg/event_extraction_file.txt"; // 绝对路径或相对路径都可以，这里是绝对路径，写入文件时演示相对路径
  File filename = new File(pathname); // 要读取以上路径的input。txt文件
  InputStreamReader reader = new InputStreamReader(
     new FileInputStream(filename)); // 建立一个输入流对象reader
  BufferedReader br = new BufferedReader(reader); // 建立一个对象，它把文件内容转成计算机能读懂的语言
    /* 写入Txt文件 */
    File writename = new File(".\\output1.txt"); // 相对路径，如果没有则要建立一个新的output。txt文件
    writename.createNewFile(); // 创建新文件
    BufferedWriter out = new BufferedWriter(new FileWriter(writename));
  String line = "";
  line = br.readLine();
  while (line != null) {
 line = br.readLine(); // 一次读入一行数据
      if(line!=null){
          String[] strs=line.split(",");
          if(strs.length==3){
//              int index=strs[0].indexOf('(');
//              int index1=strs[1].indexOf('(');
//              strs[0]=strs[0].replace(strs[0].substring(0,index),uuidUtil.getGUID());
//              strs[1]=strs[1].replace(strs[1].substring(0,index1),uuidUtil.getGUID());
//              String newline= Arrays.toString(strs);
//              System.out.println(newline);
//              out.write(newline.substring(1,newline.length()-1));
//              out.write("\n");

              strs[1]=uuidUtil.getGUID();
              String newline= Arrays.toString(strs);
              System.out.println(newline);
              out.write(newline.substring(1,newline.length()-1));
              out.write("\n");
          }else if(strs.length==7){
              strs[1]=uuidUtil.getGUID();
              strs[5]=uuidUtil.getGUID();
              String newline= Arrays.toString(strs);
              System.out.println(newline);
              out.write(newline.substring(1,newline.length()-1));
              out.write("\n");
          }else if(strs.length==2){
              strs[1]=uuidUtil.getGUID();
              String newline= Arrays.toString(strs);
              System.out.println(newline);
              out.write(newline.substring(1,newline.length()-1));
              out.write("\n");
          }
      }
  }
  out.flush(); // 把缓存区内容压入文件
  out.close(); // 最后记得关闭文件
} catch (Exception e) {
    e.printStackTrace();
}
    }
}
