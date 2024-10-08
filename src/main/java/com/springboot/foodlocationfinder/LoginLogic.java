package com.springboot.foodlocationfinder;
import java.util.HashMap;
import java.util.Map;

import com.springboot.foodlocationfinder.database.dbConnector;

public class LoginLogic {

    private Map<String, String> LoginData;
    
    public LoginLogic() {
        LoginData = new HashMap<>();
    }

    /*
     * Creates user login. Returns true if account is properly created, returns false if there 
     * is any issue creating the user. 
     * 
     * Usernames Must be unique.
     * Passwords must be at least 8 characters. 
     * 
     */
    public boolean createUser(String username, String password) {
        // duplicate username
        //TESTING
        //dbConnector db = new dbConnector();
        if (LoginData.containsKey(username)) {
            System.out.println("username already taken");
            return false;
        } else {
            if (password.length() < 8) {
                System.out.println("Password must be at least 8 characters.");
                return false;
            } 
            System.out.println("Account created. Enjoy FoodFinder!");
            LoginData.put(username, password);
            return true;
        }


    }

    /*
     * Attempts to login given username and password. Returns true if login is successful, false otherwise.
     * 
     */

    public boolean login(String username, String password) {
        // username does not exist
        if (!LoginData.containsKey(username)) {
            System.out.println("Username does not exist");
            return false;
        } else {
            // incorrect password
            if (!LoginData.get(username).equals(password)) {
                System.out.println("Incorrect Password.");
                return false;
            } else {
                System.out.println("Welcome back!");
                return true;
            }
        }
    }
}
