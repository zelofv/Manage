package service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import service.QueryService;
import util.JDBCUtil;
import entity.Student;

import java.util.ArrayList;

public class QueryServiceImpl implements QueryService {
    @Override // 返回查找到的学生列表 最后一项存放列表的长度
    public JSONArray returnJSONArray(JSONObject obj) {
        String sql = "select * from ";
        String tail = "students";
        ArrayList<Student> queryStudents;
        ArrayList<Student> sendStudents = new ArrayList<>();
        JSONObject listMsg = new JSONObject();

        boolean isSingle = Boolean.parseBoolean(obj.get("single").toString());
        int pageNow = Integer.parseInt(obj.get("page").toString());
        int listEachPage = Integer.parseInt(obj.get("listEachPage").toString());
        if (!isSingle) {
            listMsg.put("length", JDBCUtil.getLength(tail));
            tail += " order by time limit " + (pageNow - 1) * 10 + ", " + listEachPage;
            queryStudents = JDBCUtil.query(Student.class, sql + tail);
        } else {
            String target = obj.get("target").toString(); // 查找的属性名
            String value = obj.get("value").toString(); // 查找的内容
            value = "%" + value + "%";
            tail += " where " + target + " like ? order by time";
            listMsg.put("length", JDBCUtil.getLength(tail.replace("?", "'" + value + "'")));
            tail += " limit " + (pageNow - 1) * 10 + ", " + listEachPage;
            queryStudents = JDBCUtil.query(Student.class, sql + tail, value);
        }
//        for (int i = (pageNow - 1) * 10; i < (pageNow - 1) * 10 + listEachPage; i++) {
//            sendStudents.add(queryStudents.get(i));
//        }

        JSONArray sendArray = JSONArray.parseArray(JSON.toJSONString(queryStudents));
        sendArray.add(listMsg);
        return sendArray;
    }
}
