package com.springboot.foodlocationfinder;
import java.util.HashMap;
import java.util.Map;

public class LoginLogic {

    private Map<String, String> LoginData;
    
    public LoginLogic() {
        LoginData = new HashMap<>();
    }

    /*
     * Creates user login. Returns true if account is properly created, returns false if there 
     * is any issue creating the user. 
     * 
     */
    public boolean createUser(String username, String password) {
        // duplicate username
        if (LoginData.containsKey(username)) {
            System.out.println("username already taken");
            return false;
        } else {
            System.out.println("Account created. Enjoy FoodFinder!");
            LoginData.put(username, password);
            return true;
        }


    }

    /*
     * Attempts to login in given username and passowrd. Returns true if login is successful, false otherwise
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
