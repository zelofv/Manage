package service.impl;

import com.alibaba.fastjson.JSONObject;
import service.AddService;
import util.JDBCUtil;
import entity.Student;

public class AddServiceImpl implements AddService {
    @Override
    public void add(JSONObject jsonObject) throws Exception {
        String sql = "insert into students (id,name,grade,gender,age,classNo,college,time) values(?,?,?,?,?,?,?,?)";
        Student student = Student.toStudent(jsonObject);

        if (JDBCUtil.update(sql, student.toObject()) <= 0) {
            throw new Exception("添加失败");
        }

    }
}
