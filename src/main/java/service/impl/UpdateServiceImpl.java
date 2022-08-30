package service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import service.UpdateService;
import util.JDBCUtil;
import entity.Student;

public class UpdateServiceImpl implements UpdateService {
    @Override
    public JSONObject update(JSONArray jsonArray) {
        String id = jsonArray.getString(1);
        Student student = Student.toStudent(jsonArray.getJSONObject(0));

        String sql = "update students set id=?, name=?, grade=?, gender=?, age=?, classNo=?, college=? where id=?";
        JSONObject returnObj = new JSONObject();
        boolean success = true;
        String msg = "";
        try {
            JDBCUtil.update(sql, student.toObject(id));
        } catch (Exception e) {
            success = false;
            msg = e.getMessage();
        }
        returnObj.put("success", success);
        returnObj.put("msg", msg);

        return returnObj;
    }
}
