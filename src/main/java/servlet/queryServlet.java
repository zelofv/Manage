package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import service.QueryService;
import service.impl.QueryServiceImpl;
import util.ServletUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "queryServlet", value = "/queryServlet")
public class queryServlet extends HttpServlet {
    QueryService service = new QueryServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = ServletUtil.pre(request, response);
        JSONObject obj = JSON.parseObject(data);
//        JSONObject obj = new JSONObject();

        JSONArray jsonArray = service.returnJSONArray(obj);
        PrintWriter out = response.getWriter();
        out.print(jsonArray);
        out.flush();
        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
