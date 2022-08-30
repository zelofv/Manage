package service.impl;

import com.alibaba.fastjson.JSONObject;
import entity.User;
import service.LoginService;
import util.JDBCUtil;
import entity.myCookie;
import org.apache.commons.codec.digest.DigestUtils;

import javax.servlet.http.Cookie;

public class LoginServiceImpl implements LoginService {
    @Override
    public Object[] login(JSONObject obj) {
        String account = obj.get("account").toString();
        String pwd = obj.get("pwd").toString();
        String sql = "select * from users where ";
        String tail = "";
        if (account.contains("@")) {
            tail = "email=?";
        } else {
            tail = "id=?";
        }

        JSONObject outObj = new JSONObject();
        boolean success = true;
        String msg = "";
        Cookie cookie1 = null;
        Cookie cookie2 = null;
        try {
            User user = JDBCUtil.query(User.class, sql + tail, account).get(0);
//            String smsP = DigestUtils.md5Hex(user.getPwd());
            if (!DigestUtils.md5Hex(user.getPwd()).equals(pwd)) {
                throw new IllegalArgumentException("用户名或密码错误");
            } else {
                String smsU = DigestUtils.md5Hex(account + System.currentTimeMillis());
                String smsP = DigestUtils.md5Hex(pwd + System.currentTimeMillis());
                cookie1 = new myCookie("sms_U", smsU).getCookie();
                cookie2 = new myCookie("sms_P", smsP).getCookie();
                JDBCUtil.update("update users set sms_U=?, sms_P=? where " + tail, smsU, smsP, account);
            }
        } catch (Exception e) {
            success = false;
            msg = "用户名或密码错误";
        }
        outObj.put("success", success);
        outObj.put("msg", msg);
        return new Object[]{outObj, cookie1, cookie2};
    }
}
