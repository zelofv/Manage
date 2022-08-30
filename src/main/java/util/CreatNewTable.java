package util;


import annotations.TableName;
import annotations.Type;
import entity.User;
import util.JDBCUtil;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;

public class CreatNewTable {
    static TableName tbn;
    public static void main(String[] args) {
        create(User.class);
    }

    public static void create(Class<?> cls) {
        String sql = getSQL(cls);
        if (sql == null) {
            return;
        }
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = JDBCUtil.getConnection();
            ps = conn.prepareStatement(sql);
            ps.execute();
            System.out.println("表 " + tbn.tableName() +" 新建成功");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            JDBCUtil.closeResource(conn, ps);
        }
    }

    public static Boolean isExist(String tableName) {
        Connection conn = null;
        PreparedStatement ps = null;
        try {
            conn = JDBCUtil.getConnection();
            ps = conn.prepareStatement("select * from " + tableName);
            ps.execute();
            System.out.println("表 " + tableName + " 已存在");
            return true;
        } catch (Exception e) {
            return false;
        } finally {
            if (tableName.equals("")) {
                System.out.println("新建表名为空");
            }
            JDBCUtil.closeResource(conn, ps);
        }
    }

    public static String getSQL(Class<?> cls) {
        tbn = getTableName(cls);
        if (tbn != null) {
            String tableName = tbn.tableName();

            if (isExist(tableName)) {
                return null;
            }
            StringBuilder sql = new StringBuilder("create table " + tableName + "(");
            Field[] fields = cls.getDeclaredFields();
            if (fields == null || fields.length == 0) {
                System.out.println("该类没有任何属性");
                return null;
            }

            for (Field field : fields) {
                if (!field.isAnnotationPresent(Type.class)) {
                    continue;
                }

                Type type = field.getAnnotation(Type.class);
                sql.append("`").append(field.getName()).append("` ").append(type.type());

                if (type.constraints().primaryKey()) {
                    sql.append(" primary key");
                    if (type.constraints().autoincrement()) {
                        sql.append(" auto_increment");
                    }
                } else {
                    if (type.constraints().unique()) {
                        sql.append(" unique");
                    }
                    if (!type.constraints().allowNull()) {
                        sql.append(" not null");
                    }
                }
                sql.append(",");
            }
            String SQL = sql.toString();
            SQL = SQL.substring(0, sql.length() - 1) + ")";
            return SQL;
        }
        System.out.println("该类上没有 @TableName 注解");
        return null;
    }

    private static TableName getTableName(Class<?> cls) {
        return cls.getAnnotation(TableName.class);
    }

}
