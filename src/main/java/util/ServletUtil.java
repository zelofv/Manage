package util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

public class ServletUtil {

    public static String pre(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setConfiguration(request, response);
        return getData(request);
    }

    private static void setConfiguration(HttpServletRequest request, HttpServletResponse response) throws IOException {
        /* 允许跨域的主机地址 */
        response.setHeader("Access-Control-Allow-Origin", "*");
        /* 允许跨域的请求方法GET, POST, HEAD 等 */
        response.setHeader("Access-Control-Allow-Methods", "*");
        /* 重新预检验跨域的缓存时间 (s) */
        response.setHeader("Access-Control-Max-Age", "4200");
        /* 允许跨域的请求头 */
        response.setHeader("Access-Control-Allow-Headers", "*");
        /* 是否携带cookie */
        response.setHeader("Access-Control-Allow-Credentials", "true");
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html;charset=UTF-8");
    }

    private static String getData(HttpServletRequest request) throws IOException {
        BufferedReader reader = request.getReader();
        return reader.readLine();
    }
}
