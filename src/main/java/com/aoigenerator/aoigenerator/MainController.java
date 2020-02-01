package com.aoigenerator.aoigenerator;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String showIndexPage(){
        return "index";
    }

    @GetMapping("/login")
    public String showLoginPage(){
        return "loginForm";
    }
}
