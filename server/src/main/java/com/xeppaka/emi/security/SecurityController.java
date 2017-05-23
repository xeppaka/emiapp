package com.xeppaka.emi.security;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.BeanIds;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.xeppaka.emi.security.dto.UserNamePassword;
import com.xeppaka.emi.security.tokens.SecurityTokenContainer;

@RestController
@RequestMapping(SecurityController.URI)
public class SecurityController {
    private static final Logger log = LoggerFactory.getLogger(SecurityController.class);
    static final String URI = "/api/security";
    private static final String X_AUTH_HEADER_NAME = "x-auth-token";
    private AuthenticationManager authenticationManager;
    private SecurityTokenContainer securityTokenContainer;

    public SecurityController(@Autowired @Qualifier(BeanIds.AUTHENTICATION_MANAGER) AuthenticationManager authenticationManager,
                              @Autowired SecurityTokenContainer securityTokenContainer) {
        this.authenticationManager = authenticationManager;
        this.securityTokenContainer = securityTokenContainer;
    }

    @RequestMapping(value = "currentuser", method = RequestMethod.GET)
    public ResponseEntity<String> currentUser(Authentication authentication) {
        return ResponseEntity.ok().body(authentication.getName());
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody UserNamePassword userNamePassword) throws URISyntaxException {
        final Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(userNamePassword.getUserName(), userNamePassword.getPassword()));

        if (authentication != null && authentication.isAuthenticated()) {
            log.info("Successful user login: {}.", authentication.getName());

            final UUID newToken = securityTokenContainer.generateToken((String) authentication.getName());
            return ResponseEntity.created(new URI(URI + "/currentuser")).header(X_AUTH_HEADER_NAME, newToken.toString()).build();
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    @RequestMapping(value = "logout", method = RequestMethod.POST)
    public ResponseEntity logout(Authentication authentication) {
        log.info("User logout: {}.", authentication.getName());

        return ResponseEntity.ok().build();
    }
}
