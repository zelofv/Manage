package entity;

import annotations.Constraints;
import annotations.TableName;
import annotations.Type;

@TableName(tableName = "users")
public class User {
    @Type(type = "varchar(11)", constraints = @Constraints(primaryKey = true, allowNull = false))
    private String id;
    @Type(constraints = @Constraints(allowNull = false))
    private String name;
    @Type(constraints = @Constraints(allowNull = false))
    private String email;
    @Type(constraints = @Constraints(allowNull = false))
    private String pwd;
    @Type
    private String sms_U;
    @Type
    private String sms_P;

    public User() {
    }

    public User(String id, String name, String email, String pwd) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pwd = pwd;
    }

    public String getId() {
        return id;
    }

    public String getPwd() {
        return pwd;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getSms_U() {
        return sms_U;
    }

    public String getSms_P() {
        return sms_P;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", pwd='" + pwd + '\'' +
                '}';
    }
}
