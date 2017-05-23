package com.xeppaka.emi.security.tokens;

import java.time.LocalDateTime;
import java.util.UUID;

import org.apache.commons.lang3.Validate;

public class SecurityToken {
    private final UUID tokenId;
    private final String userName;
    private LocalDateTime lastUsed = LocalDateTime.now();

    public SecurityToken(UUID tokenId, String userName) {
        Validate.notNull(tokenId);
        Validate.notNull(userName);

        this.tokenId = tokenId;
        this.userName = userName;
    }

    public UUID getTokenId() {
        return tokenId;
    }

    public String getUserName() {
        return userName;
    }

    public LocalDateTime getLastUsed() {
        return lastUsed;
    }

    public LocalDateTime updateLastUsed() {
        return lastUsed = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SecurityToken that = (SecurityToken) o;

        if (!tokenId.equals(that.tokenId)) return false;
        return userName.equals(that.userName);
    }

    @Override
    public int hashCode() {
        int result = tokenId.hashCode();
        result = 31 * result + userName.hashCode();
        return result;
    }
}
