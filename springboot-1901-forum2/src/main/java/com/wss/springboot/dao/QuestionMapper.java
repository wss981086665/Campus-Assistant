package com.wss.springboot.dao;

import com.wss.springboot.bean.Question;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

@Mapper
@Component(value = "questionMapper")
public interface QuestionMapper {

    @Select("SELECT * FROM question WHERE id=#{id}")
    public Question getQuestionById(Integer id);

    @Insert("INSERT INTO question(author,topic,content,factor1,factor2,factor3,factor4,factor5) VALUES(#{author},#{topic},#{content},#{factor1},#{factor2},#{factor3},#{factor4},#{factor5})")
    public void insertQuestion(Question question);

    @Update("UPDATE question SET author=#{author},topic=#{topic},content=#{content},answer=#{answer} WHERE id=#{id}")
    public void updateQuestion(Question question);

    @Delete("DELETE FROM question WHERE id=#{id}")
    public void deleteQuestionById(Integer id);

    @Select("SELECT * FROM question WHERE author=#{author}")
    public Question getQuestionByAuthor(String author);

    @Select("SELECT * FROM question WHERE author=#{author}")
    public List<Question> getQuestionsByAuthor(String author);

    @Select("SELECT * FROM question WHERE factor1=#{factor1}")
    public List<Question> getQuestionsByOpenid(String factor1);

    @Select("select * from question where find_in_set(#{factor3},factor3)")
    public List<Question> getQuestionsByCourse(String factor3);

    @Select("SELECT * FROM question WHERE topic=#{topic}")
    public Question getQuestionByTopic(String topic);

    //查询最后一条语句用于返回数据库大小
//    select * from表名 order by 表 _id desc limit 1
    @Select("SELECT * FROM question order by id desc limit 1")
    public Question getLastQuestion();

    //查询所有数据
    @Select("SELECT * FROM question WHERE id BETWEEN 0 AND 1000")
    public List<Question> getAll();

    //随机获取10条数据数据
    @Select("SELECT * FROM question ORDER BY rand() LIMIT 10;")
    public List<Question> getRandom();

}