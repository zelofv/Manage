package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import service.LoginService;
import service.impl.LoginServiceImpl;
import util.ServletUtil;

import java.io.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/loginServlet")
public class loginServlet extends HttpServlet {
    LoginService loginService = new LoginServiceImpl();
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        // 获取 fetch 传输 json 数据（解析）
        String data = ServletUtil.pre(request, response);
        JSONObject reqObj = JSON.parseObject(data);


        Object[] returnObjects = loginService.login(reqObj);
        JSONObject outObj = (JSONObject) returnObjects[0];
        if (outObj.getBoolean("success")) {
            response.addCookie((Cookie) returnObjects[1]);
            response.addCookie((Cookie) returnObjects[2]);
        }
        PrintWriter out = response.getWriter();
        out.print(outObj);
        out.flush();
        out.close();

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }
}