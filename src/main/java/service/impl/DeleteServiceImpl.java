package service.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import service.DeleteService;
import util.JDBCUtil;

public class DeleteServiceImpl implements DeleteService {
    @Override
    public JSONObject delete(JSONArray array) {
        StringBuilder sql = new StringBuilder("delete from students where ");
        Object[] idList = new Object[array.size()];
        for (int i = 0; i < array.size(); i++) {
//            System.out.println(array.getString(i));
            sql.append("id=? or ");
            idList[i] = array.getString(i);
        }

        JSONObject returnObj = new JSONObject();
        boolean success = true;
        String msg = "";
        try {
            JDBCUtil.update(sql.substring(0, sql.length() - 4), idList);
        } catch (Exception e) {
            success = false;
            msg = e.getMessage();
        }
        returnObj.put("success", success);
        returnObj.put("msg", msg);

        return returnObj;
    }
}
