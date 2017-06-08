package com.xeppaka.emi.security.tokens;

import org.apache.commons.lang3.Validate;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SecurityTokenContainer {
    private Map<UUID, SecurityToken> tokens = new ConcurrentHashMap<>();

    public UUID generateToken(String userName) {
        Validate.notNull(userName);

        final UUID newToken = UUID.randomUUID();
        tokens.put(newToken, new SecurityToken(newToken, userName));

        return newToken;
    }

    public SecurityToken removeToken(UUID tokenId) {
        Validate.notNull(tokenId);

        return tokens.remove(tokenId);
    }

    public SecurityToken getToken(UUID tokenId) {
        Validate.notNull(tokenId);

        final SecurityToken token = tokens.get(tokenId);
        if (token != null) {
            token.updateLastUsed();
        }

        return token;
    }
}
