package com.example.data;

import com.springboot.foodlocationfinder.database.dbConnector;

//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;


public class test {
    int x;

    public String getSkeleton() {
        return "skeleton";
    }
    public static void main(String[] args) {
        dbConnector db = new dbConnector();
        System.out.println("Test");
    }
}
