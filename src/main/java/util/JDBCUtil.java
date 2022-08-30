package util;

import java.lang.reflect.Field;
import java.sql.*;
import java.util.ArrayList;

public class JDBCUtil {
//    private static String user;
//    private static String password;
//    private static String url;
//
//    // 连接数据库
//    static {
//        try {
//            // 从 jdbc.properties 中读取数据
//            InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
////            FileInputStream is = new FileInputStream(new File("jdbc.properties"));
//            Properties properties = new Properties();
//            properties.load(is);
//
//            url = properties.getProperty("url");
//            username = properties.getProperty("username");
//            password = properties.getProperty("password");
//            String driverClass = properties.getProperty("driverClass");
//            // 获取 driverClass 所表示的类
//            Class.forName(driverClass);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }

    public static Connection getConnection() throws Exception {
//        return DriverManager.getConnection(url, user, password);
        return dataSource.DS.getConnection();
    }

    // 关闭连接
    public static void closeResource(Connection conn, Statement ps, ResultSet resultSet) {
        closeResource(conn, ps);
        try {
            if (resultSet != null) {
                resultSet.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 关闭连接
    public static void closeResource(Connection conn, Statement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // 更新(增删改)数据库
    public static int update(String sql, Object... args) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = getConnection();
            ps = conn.prepareStatement(sql);
            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }
            // 返回int类型值表示修改行数 未修改即为0
            return ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeResource(conn, ps);
        }
        return 0;
    }

    public static int getLength(String tail) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            String sql = "select count(*) from " + tail;
            conn = getConnection();
            ps = conn.prepareStatement(sql);

            // 返回int类型值表示修改行数 未修改即为0
            rs = ps.executeQuery();
            rs.next();
            return rs.getInt(1);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeResource(conn, ps, rs);
        }
        return 0;
    }

    // 查找数据库中表的数据通过 ArrayList 返回
    public static <T> ArrayList<T> query(Class<T> tClass, String sql, Object... args) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        ArrayList<T> list = new ArrayList<>();
        try {
            conn = getConnection();
            ps = conn.prepareStatement(sql);

            for (int i = 0; i < args.length; i++) {
                ps.setObject(i + 1, args[i]);
            }

            rs = ps.executeQuery();
            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount(); // 获取列数

            while (rs.next()) {
                T obj = tClass.newInstance();
                for (int i = 0; i < columnCount; i++) {
                    String columnLabel = rsmd.getColumnLabel(i + 1); // 获取列标签
                    Object columnValue = rs.getObject(i + 1); // 获取列值

                    Field field = tClass.getDeclaredField(columnLabel); // 依次获取每个属性
                    field.setAccessible(true);
                    field.set(obj, columnValue);
                }
                list.add(obj);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            closeResource(conn, ps, rs);
        }
        return list;
    }
}
