package com.kg.openkg.Util;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class JsonUtil {

        /**
         * json字符串转换为map
         */
        public static <T> Map<String, Object> json2map(String jsonString) throws Exception {
            ObjectMapper mapper = new ObjectMapper();
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
            return mapper.readValue(jsonString, Map.class);
        }


}
