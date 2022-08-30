package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import util.Intercept;
import util.ServletUtil;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/base")
public class baseServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {


        // 获取 fetch 传输 json 数据（解析）
        String data = ServletUtil.pre(request, response);
        JSONObject jsonObject = JSON.parseObject(data);
        String url = jsonObject.getString("url");
        boolean success = true;
        if (!Intercept.Intercept(request) && url.equals("index")) {
            success = false;
            response.sendRedirect("http://localhost:8080/view/html/login.html");
        } else if (Intercept.Intercept(request) && url.equals("login")) {
            response.sendRedirect("http://localhost:8080/view/html/index.html");
        }
//        else {
//            response.sendRedirect("/view/html/index.html");
//        }

        final PrintWriter writer = response.getWriter();
        writer.print(new JSONObject().put("success", success));
        writer.flush();
        writer.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}