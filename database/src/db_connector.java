//install mysql-connector-j

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class db_connector
{
    public db_connector()
    {
        System.out.println("CREATING DATABASE");

        /*String url = "jdbc:mysql://35.184.92.72/production";
        String username = "Group9";
        String password = "food@4193";
    
        System.out.println("Attempting to Connect");
        //Class.forName("com.mysql.jdbc.Driver");
        try (Connection con = DriverManager.getConnection(url, username, password)) {
            System.out.println("Connected");
            String query = "INSERT INTO users (username, hashed_password) VALUES (\"TEST1\", \"PASSWORD123\");" ;
            PreparedStatement state = con.prepareStatement(query);
            state.execute(query);
            //result.close();
            } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }*/
    }

}