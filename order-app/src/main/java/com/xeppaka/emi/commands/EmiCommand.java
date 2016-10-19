package com.xeppaka.emi.commands;

import com.xeppaka.ddd.commands.Command;
import com.xeppaka.emi.domain.value.UserName;
import org.apache.commons.lang3.Validate;

/**
 *
 */
public abstract class EmiCommand implements Command {
    private UserName userName;

    public EmiCommand(UserName userName) {
        Validate.notNull(userName);

        this.userName = userName;
    }

    public UserName getUserName() {
        return userName;
    }

    public String getUserNameStr() {
        return getUserName().getUserName();
    }
}
