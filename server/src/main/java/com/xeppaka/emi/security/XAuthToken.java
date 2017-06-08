package com.xeppaka.emi.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.Collections;

public class XAuthToken extends AbstractAuthenticationToken {
    private final String authToken;

    public XAuthToken(String authToken) {
        super(Collections.emptyList());

        this.authToken = authToken;
    }

    public XAuthToken(String authToken, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);

        this.authToken = authToken;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return getAuthToken();
    }

    public String getAuthToken() {
        return authToken;
    }
}
