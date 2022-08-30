package util;

import entity.User;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class Intercept {
    public static boolean Intercept(HttpServletRequest request) {
        Cookie cookie1 =getUCookie(request);
        Cookie cookie2 =getPCookie(request);
        if (cookie1==null||cookie2==null) return false;

        try {
            User user = JDBCUtil.query(User.class, "select * from users where sms_U=? and sms_P=?", cookie1.getValue(), cookie2.getValue()).get(0);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    public static Cookie getUCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies){
                String name = cookie.getName();
                String value = cookie.getValue();
                if (name.equals("sms_U")) {
                    return new Cookie(name, value);
                }
            }
        }
        return null;
    }

    public static Cookie getPCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null && cookies.length > 0){
            for (Cookie cookie : cookies){
                String name = cookie.getName();
                String value = cookie.getValue();
                if (name.equals("sms_P")) {
                    return new Cookie(name, value);
                }
            }
        }
        return null;
    }
}
