package com.springboot.foodlocationfinder;
import java.util.HashMap;
import java.util.Map;

public class LoginLogic {

    // A Map that stores usernames and passwords.
    private Map<String, String> LoginData;


    /**
     * Initializes the {@code LoginLogic} class by creating an empty
     * {@code LoginData} map to store usernames and passwords.
     */
    public LoginLogic() {
        LoginData = new HashMap<>();
    }

    /**
     * Creates a new user account with the given username and password.
     *
     * <p>
     * The username must be unique (i.e., not already in use). The password must be
     * at least 8 characters long.
     * </p>
     *
     * @param username The desired username for the new user.
     * @param password The desired password for the new user.
     * @return {@code true} if the account is successfully created,
     *         {@code false} if the username is already taken or the password is too short.
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

    /**
     * Attempts to log in a user with the given username and password.
     *
     * <p>
     * The username must exist in the system, and the password must match the
     * stored password for the login to be successful.
     * </p>
     *
     * @param username The username of the user attempting to log in.
     * @param password The password provided for login.
     * @return {@code true} if the login is successful,
     *         {@code false} if the username does not exist or the password is incorrect.
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
