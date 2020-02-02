package com.aoigenerator.aoigenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/register").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/profile").permitAll()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/images/**").permitAll()
                .antMatchers("/api/**").permitAll()
                .antMatchers("/admin/**").hasAnyAuthority( "ROLE_ADMIN")
                .antMatchers("/**").hasAnyAuthority("ROLE_USER", "ROLE_ADMIN")
                .anyRequest().permitAll()
                .and().csrf().disable()
                .formLogin()
                .loginPage("/login")
                .usernameParameter("loginEmail")
                .passwordParameter("loginPassword")
                .loginProcessingUrl("/processLogin")
                .failureUrl("/login?error=1")
                .defaultSuccessUrl("/adminconsole");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("superUser")
                .password(passwordEncoder.encode("superPassword"))
                .roles("USER");
        auth.jdbcAuthentication()
                .usersByUsernameQuery(
                        "SELECT u.uSeRname, u.password_hash, 1 " +
                                "FROM Users u " +
                                "WHERE u.username = ?")
                .authoritiesByUsernameQuery(
                        "SELECT u.username, r.role_name, 1 " +
                        "FROM users u " +
                        "JOIN users_roles ur ON u.id = ur.user_id " +
                        "JOIN roles r ON ur.roles_id = r.id " +
                        "WHERE u.username = ? ")
                .passwordEncoder(passwordEncoder)
                .dataSource(dataSource);
    }
}
