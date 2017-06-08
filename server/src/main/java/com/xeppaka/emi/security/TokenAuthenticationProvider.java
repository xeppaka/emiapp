package com.xeppaka.emi.security;

import com.xeppaka.emi.security.tokens.SecurityToken;
import com.xeppaka.emi.security.tokens.SecurityTokenContainer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.UUID;

@Component
public class TokenAuthenticationProvider implements AuthenticationProvider {
    private SecurityTokenContainer securityTokenContainer;

    public TokenAuthenticationProvider(@Autowired SecurityTokenContainer securityTokenContainer) {
        this.securityTokenContainer = securityTokenContainer;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final XAuthToken headersToken = (XAuthToken) authentication;
        final SecurityToken savedToken = securityTokenContainer.getToken(UUID.fromString(headersToken.getAuthToken()));

        if (savedToken != null) {
            return new UsernamePasswordAuthenticationToken(savedToken.getUserName(), null,
                    Collections.singletonList(new SimpleGrantedAuthority("admin")));
        }

        throw new BadCredentialsException("Authentication token is not found.");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return XAuthToken.class.isAssignableFrom(authentication);
    }
}
