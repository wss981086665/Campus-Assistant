package com.wss.springboot.controller;

import com.wss.springboot.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {

    @Autowired
    QuestionService questionService;

    @GetMapping("/hello")
    @ResponseBody
    public String hello(){
        return "hello";
    }

}
