package servlet;

import service.QueryService;
import service.impl.QueryServiceImpl;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet(name = "showServlet", value = "/showServlet")
public class showServlet extends HttpServlet {
    QueryService service = new QueryServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        String data = ServletUtil.pre(request, response);
//        JSONObject obj = JSON.parseObject(data);
////        JSONObject obj = new JSONObject();
//
//        JSONArray jsonArray = service.returnJSONArray(obj);
//        PrintWriter out = response.getWriter();
//        out.print(jsonArray);
//        out.flush();
//        out.close();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
