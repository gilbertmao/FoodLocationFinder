package com.springboot.foodlocationfinder.database;
//install mysql-connector-j

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class dbConnector
{
    private Connection conn;
    public dbConnector()
    {
        System.out.println("CREATING DATABASE");

        String url = "jdbc:mysql://35.184.92.72/production";
        String username = "Group9";
        String password = "food@4193";
    
        System.out.println("Attempting to Connect");
        //Class.forName("com.mysql.jdbc.Driver");
        try {
            conn = DriverManager.getConnection(url, username, password);
            System.out.println("Connected");
            //result.close();
        } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
    }

    public void addUser(String username, String hashed_password) {
        System.out.println("ADDING USER TO DATABASE");
        String query = "INSERT INTO users (username, hashed_password) VALUES (\"" + username + "\", \"" + hashed_password + "\");" ;
        try {
            PreparedStatement state = conn.prepareStatement(query);
            state.execute(query);
        } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
    }

    public boolean userExists(String username) {
        System.out.println("Searching");
        try {
            String query = "SELECT * from users" ;
            Statement state = conn.createStatement();
            ResultSet result = state.executeQuery(query);
            while (result.next() ) {
                if (username.equals(result.getObject(1))){
                    System.out.println( "User = " + result.getObject(1) );
                    return true;
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
        return false;
    }

    public boolean validate(String username, String hashed_password) {
        System.out.println("Validating");
        try {
            String query = "SELECT * from users" ;
            Statement state = conn.createStatement();
            ResultSet result = state.executeQuery(query);
            while (result.next() ) {
                if (username.equals(result.getObject(1))){
                    //System.out.println( "User = " + result.getObject(1) );
                    if (hashed_password.equals(result.getObject(2))) {
                        //System.out.println( "Password = " + result.getObject(2) );
                        return true;
                    }
                }
            }
        } catch (SQLException e) {
            throw new IllegalStateException("Cannot connect the database!", e);
        }
        return false;
    }
    public String getSkeleton() {
        return "skeleton";
    }
    public static void main(String[] args) {
        System.out.println("MAIN");
        dbConnector db = new dbConnector();
        db.addUser("John", "T2");
        System.out.println(db.validate("Alice", "T2"));
        System.out.println(db.validate("Alice", "T1"));
    }

}