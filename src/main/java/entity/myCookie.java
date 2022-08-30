package entity;

import javax.servlet.http.Cookie;

public class myCookie {
    private String key;
    private String value;
    private Cookie cookie;

    public myCookie(String key, String value) {
        this.key = key;
        this.value = value;
        cookie = new Cookie(key, value);
        cookie.setDomain("localhost");
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24 * 7);
        cookie.setHttpOnly(true);
    }

    public Cookie getCookie() {
        return cookie;
    }
}
