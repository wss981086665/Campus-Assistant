package com.wss.springboot.controller;

import com.wss.springboot.bean.Course;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

@RestController
@RequestMapping("ensure")
public class MyController {

    @RequestMapping(value = "/ensurenumber",method = RequestMethod.GET)
    public Map<String,Object> ensureNumber() {
        Map<String,Object> ensuerMap = new HashMap<String,Object>();
        LinkedList<Course> courses = new LinkedList<Course>();
        courses.add(new Course("1","高数"));
        courses.add(new Course("2","大物"));
        courses.add(new Course("3","英语"));
        courses.add(new Course("4","Java"));
        courses.add(new Course("5","数据结构"));
        courses.add(new Course("6","线代"));
        courses.add(new Course("7","汇编"));
        courses.add(new Course("8","体育"));
        courses.add(new Course("9","编程"));
        courses.add(new Course("10","储运"));
        courses.add(new Course("11","操作系统"));
        courses.add(new Course("12","物理实验"));
        courses.add(new Course("13","有机化学"));
        courses.add(new Course("14","C语言"));

        LinkedList<String> coursename = new LinkedList<String>();
        LinkedList<Course> slider = new LinkedList<Course>();
        slider.add(new Course("0","高数")); coursename.add("高数");
        slider.add(new Course("1","大物")); coursename.add("大物");
        slider.add(new Course("2","英语")); coursename.add("英语");
        slider.add(new Course("3","Java")); coursename.add("Java");
        slider.add(new Course("4","数据结构")); coursename.add("数据结构");
        slider.add(new Course("5","线代")); coursename.add("线代");
        slider.add(new Course("6","汇编")); coursename.add("汇编");
        slider.add(new Course("7","体育")); coursename.add("体育");
        slider.add(new Course("8","编程")); coursename.add("编程");
        slider.add(new Course("9","储运")); coursename.add("储运");
        slider.add(new Course("10","操作系统")); coursename.add("操作系统");
        slider.add(new Course("11","物理实验")); coursename.add("物理实验");
        slider.add(new Course("12","有机化学")); coursename.add("有机化学");
        slider.add(new Course("13","C语言")); coursename.add("C语言");

        ensuerMap.put("ensure",false);
        ensuerMap.put("courses",courses);
        ensuerMap.put("slider",slider);
        ensuerMap.put("coursename",coursename);
        return ensuerMap;
    }

}
