package com.wss.springboot.controller;

import com.wss.springboot.bean.Teacher;
import com.wss.springboot.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@RestController
@RequestMapping("superteacher")
public class TeacherController {

    @Autowired
    TeacherService teacherService;

    /*插入问题*/
    @RequestMapping(value = "/insertteacher",method = RequestMethod.POST)
    public void insertTeacher(Teacher teacher){
        String nickName = teacher.getNickName();
        String school = teacher.getSchool();
        String institute = teacher.getInstitute();
        String profession = teacher.getProfession();
        String course = teacher.getCourse();
        String name = teacher.getName();
        String tell = teacher.getTell();
        try {
            nickName = URLDecoder.decode(nickName, "UTF-8");
            school = URLDecoder.decode(school, "UTF-8");
            institute = URLDecoder.decode(institute, "UTF-8");
            profession = URLDecoder.decode(profession, "UTF-8");
            course = URLDecoder.decode(course, "UTF-8");
            name = URLDecoder.decode(name, "UTF-8");
            tell = URLDecoder.decode(tell, "UTF-8");
            if(school == ""){
                teacher.setSchool("无");
            } else {
                teacher.setSchool(school);
            }
            if(name == ""){
                teacher.setName("匿名");
            } else {
                teacher.setName(name);
            }
            teacher.setNickName(nickName);
            teacher.setInstitute(institute);
            teacher.setProfession(profession);
            teacher.setCourse(course);
            teacher.setTell(tell);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        teacherService.insert(teacher);
    }

}
