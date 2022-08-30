package servlet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import service.AddService;
import service.impl.AddServiceImpl;
import util.ServletUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "addServlet", value = "/addServlet")
public class addServlet extends HttpServlet {
    AddService addService = new AddServiceImpl();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String data = ServletUtil.pre(request, response);
        JSONObject jsonObject = JSON.parseObject(data);

        boolean success = true;
        String msg = "";
        try {
            addService.add(jsonObject);
        } catch (Exception e) {
            msg = e.getMessage();
            success = false;
        }

        JSONObject outObj = new JSONObject();
        outObj.put("success", success);
        outObj.put("msg",msg);

        PrintWriter out = response.getWriter();
        out.print(outObj);
        out.flush();
        out.close();

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
