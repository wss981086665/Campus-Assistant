package com.wss.springboot.dao;

import com.wss.springboot.bean.Teacher;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component(value = "teacherMapper")
public interface TeacherMapper {

    @Insert("INSERT INTO teacher(openid,nickName,school,institute,profession,course,name,tell,pros1,pros2,pros3,pros4,pros5) VALUES(#{openid},#{nickName},#{school},#{institute},#{profession},#{course},#{name},#{tell},#{pros1},#{pros2},#{pros3},#{pros4},#{pros5})")
    public void insertTeacher(Teacher teacher);

}
