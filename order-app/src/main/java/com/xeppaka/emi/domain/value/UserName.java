package com.xeppaka.emi.domain.value;

import org.apache.commons.lang3.Validate;

public class UserName {
    public static final UserName SYSTEM_USER_NAME = new UserName("*SYSTEM*");
    private String userName;

    public UserName(String userName) {
        Validate.notEmpty(userName);

        this.userName = userName;
    }

    public String getUserName() {
        return userName;
    }

    public static UserName userName(String userName) {
        return new UserName(userName);
    }

    @Override
    public String toString() {
        return userName;
    }
}
