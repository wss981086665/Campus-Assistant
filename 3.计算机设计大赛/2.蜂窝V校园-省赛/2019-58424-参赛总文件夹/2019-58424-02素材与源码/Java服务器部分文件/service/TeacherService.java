package com.wss.springboot.service;

import com.wss.springboot.bean.Teacher;
import com.wss.springboot.dao.TeacherMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {

    @Autowired
    TeacherMapper teacherMapper;

    public void insert(Teacher teacher){
        teacherMapper.insertTeacher(teacher);
    }

}
