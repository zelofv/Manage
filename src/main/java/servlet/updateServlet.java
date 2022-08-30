package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import service.UpdateService;
import service.impl.UpdateServiceImpl;
import util.ServletUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "updateServlet", value = "/updateServlet")
public class updateServlet extends HttpServlet {
    UpdateService updateService = new UpdateServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = ServletUtil.pre(request, response);

        JSONObject jsonObj = updateService.update(JSON.parseArray(data));

        PrintWriter writer = response.getWriter();
        writer.print(jsonObj);
        writer.flush();
        writer.close();

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
