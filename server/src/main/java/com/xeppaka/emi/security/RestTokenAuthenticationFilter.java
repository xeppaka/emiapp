package com.xeppaka.emi.security;

import org.apache.commons.lang3.Validate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.MessageFormat;

public class RestTokenAuthenticationFilter extends GenericFilterBean {
    private final static String X_AUTH_HEADER_NAME = "x-auth-token";
    private final static RestTokenRequestMatcher X_AUTH_TOKEN_REQUEST_MATCHER = new RestTokenRequestMatcher();
    private AuthenticationManager authenticationManager;

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        Validate.notNull(authenticationManager);

        this.authenticationManager = authenticationManager;
    }

    public Authentication attemptAuthentication(HttpServletRequest request) throws AuthenticationException, IOException, ServletException {
        final XAuthToken token = new XAuthToken(request.getHeader(X_AUTH_HEADER_NAME));
        return authenticationManager.authenticate(token);
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest httpReq = (HttpServletRequest) req;

        try {
            if (X_AUTH_TOKEN_REQUEST_MATCHER.matches((HttpServletRequest) req)) {
                final Authentication authResult = attemptAuthentication(httpReq);
                if (authResult != null) {
                    SecurityContextHolder.getContext().setAuthentication(authResult);
                }
            }

            chain.doFilter(req, res);
        } catch (BadCredentialsException e) {
            logger.info(MessageFormat.format("Unsuccessful token authentication. Token: {0}.", httpReq.getHeader(X_AUTH_HEADER_NAME)));
            final HttpServletResponse httpRes = (HttpServletResponse) res;
            httpRes.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    private static class RestTokenRequestMatcher implements RequestMatcher {
        @Override
        public boolean matches(HttpServletRequest request) {
            return request.getHeader(X_AUTH_HEADER_NAME) != null;
        }
    }
}
