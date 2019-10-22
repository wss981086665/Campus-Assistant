package com.wss.springboot.dao;

import com.wss.springboot.bean.Answer;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "answerMapper")
public interface AnswerMapper {

    @Select("SELECT * FROM answer WHERE questionid=#{questionid}")
    public List<Answer> getAnswersByQuestionid(String questionid);

    @Select("SELECT * FROM answer WHERE element1=#{element1}")
    public List<Answer> getAnswersByOpenid(String element1);

    @Delete("DELETE FROM answer WHERE ids=#{ids}")
    public void deleteAnswerByIds(Integer ids);

    @Insert("INSERT INTO answer(questionid,answercontent,element1,element2,element3,element4,element5) VALUES(#{questionid},#{answercontent},#{element1},#{element2},#{element3},#{element4},#{element5})")
    public void insertAnswer(Answer answer);

}
