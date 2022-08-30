package util;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.util.Properties;

public class dataSource {
    public static DataSource DS;

    static {
        try {
            DS = getDataSource();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static DataSource getDataSource() throws Exception {
        Properties pro = new Properties();
        pro.load(dataSource.class.getClassLoader().getResourceAsStream("jdbc.properties"));
        return DruidDataSourceFactory.createDataSource(pro);
    }

}
