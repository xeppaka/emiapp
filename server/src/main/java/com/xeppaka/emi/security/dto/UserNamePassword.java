package com.xeppaka.emi.security.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserNamePassword {
    private final String userName;
    private final String password;

    @JsonCreator
    public UserNamePassword(@JsonProperty("userName") String userName,
                            @JsonProperty("password") String password) {
        this.userName = userName;
        this.password = password;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
