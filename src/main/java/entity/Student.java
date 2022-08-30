package entity;

import annotations.Constraints;
import annotations.TableName;
import annotations.Type;
import com.alibaba.fastjson.JSONObject;
import util.JDBCUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.regex.Pattern;

@TableName(tableName = "students")
public class Student {
    @Type(type = "varchar(11)", constraints = @Constraints(primaryKey = true, allowNull = false))
    private String id;
    @Type(type = "varchar(20)", constraints = @Constraints(allowNull = false))
    private String name;
    @Type(type = "int(2)")
    private int grade;
    @Type(type = "int(11)")
    private int age;
    @Type(type = "varchar(6)")
    private String gender;
    @Type(type = "varchar(9)")
    private String classNo;
    @Type
    private String college;
    @Type
    private String time;

    public Student() {
    }

    public Student(String id, String name, int grade, int age, String gender, String classNo, String college) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.age = age;
        this.gender = gender;
        this.classNo = classNo;
        this.college = college;
        this.time = String.valueOf(System.currentTimeMillis());
    }

    public Student(String id, String name, int age, String gender) {
        try {
            setId(id);
            setName(name);
            setAge(age);
            setGender(gender);
            setGrade();
            setClassNo();
            setCollege();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        try {
            if (isAge(age)) {
                this.age = age;
            }
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        if (isId(id)) {
            this.id = id;
        }
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        if (isName(name)) {
            this.name = name;
        }
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        if (isGender(gender)) {
            this.gender = gender;
        }
    }

    public String getClassNo() {
        return classNo;
    }

    public void setClassNo() {
        this.classNo = id.substring(0, 9);
    }

    public String getCollege() {
        return college;
    }

    public void setCollege() {
        try {
            this.college = findCollege();
        } catch (IllegalArgumentException e) {
            this.college = "";
            throw new IllegalArgumentException(e);
        }
    }
    public void setCollege(String college) {
        this.college = college;
    }

    public int getGrade() {
        return grade;
    }

    public void setGrade() {
        this.grade = (id.charAt(1) - '0') * 10 + (id.charAt(2) - '0');
    }

    @Override
    public String toString() {
//        return "useJDBC.Student{" +
//                "id='" + id + '\'' +
//                ", name='" + name + '\'' +
//                ", age=" + age +
//                ", gender='" + gender + '\'' +
//                ", phone='" + phone + '\'' +
//                ", classNo='" + classNo + '\'' +
//                ", college='" + college + '\'' +
//                '}';

        return "|  " + id + "\t| " + name + "\t|  " + grade + " | " + gender + " | " + age + "\t| " + classNo + " |  " + college + "\t|";
    }

    public boolean isId(String id) {
        if (Pattern.compile("^1\\d{10}$").matcher(id).matches()) {
            return true;
        } else {
            throw new IllegalArgumentException("学号输入错误，应为11位且为1开头");
        }
    }

    public boolean isAge(int age) {
        if (age > 0) {
            return true;
        } else {
            throw new IllegalArgumentException("年龄应大于0");
        }
    }

    public boolean isName(String name) {
        if (Pattern.compile("^[^\\x00-\\xff]{2,8}$|^[a-zA-Z]+\\s?[a-zA-Z]+$").matcher(name).matches()) {
            return true;
        } else {
            throw new IllegalArgumentException("请正确输入中文名");
        }
    }

    public boolean isGender(String gender) {
        if (gender.equals("男") || gender.equals("女")) {
            return true;
        } else {
            throw new IllegalArgumentException("请正确输入性别");
        }
    }

    public boolean isPhone(String phone) {
        if (Pattern.compile("^1\\d{10}$").matcher(phone).matches()) {
            return true;
        } else {
            throw new IllegalArgumentException("手机号码应为11位");
        }
    }

    public String findCollege() {
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            String sql = "select college from colleges where id = ?";
            int queryId = Integer.parseInt(id.substring(3, 5));
            connection = JDBCUtil.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setObject(1, queryId);
            rs = ps.executeQuery();

            if (rs.next()) {
                return (String) rs.getObject(1);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            JDBCUtil.closeResource(connection, ps, rs);
        }
        throw new IllegalArgumentException("学号输入错误");
    }

    public Object[] toObject() {
        return new Object[]{id, name, grade, gender, age, classNo, college, time};
    }

    public Object[] toObject(Object addObj) {
        return new Object[]{id, name, grade, gender, age, classNo, college, addObj};
    }

    public static Student toStudent(JSONObject jsonObject) {
        String id = jsonObject.get("id").toString();
        String name = jsonObject.get("name").toString();
        String gender = jsonObject.get("gender").toString();
        int grade = Integer.parseInt(jsonObject.get("grade").toString());
        int age = Integer.parseInt(jsonObject.get("age").toString());
        String college = jsonObject.get("college").toString();
        String classNo = jsonObject.get("classNo").toString();
        return new Student(id, name, grade, age, gender, classNo, college);
    }
}