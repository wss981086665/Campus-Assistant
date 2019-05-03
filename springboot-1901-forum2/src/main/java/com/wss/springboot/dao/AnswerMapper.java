package com.wss.springboot.dao;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.AnswerPage;
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

    @Select("SELECT * FROM answer WHERE element1=#{element1} order by element4 desc limit #{page},10")
    public List<Answer> getAnswersByOpenid(AnswerPage answerPage);

    @Delete("DELETE FROM answer WHERE ids=#{ids}")
    public void deleteAnswerByIds(Integer ids);

    @Insert("INSERT INTO answer(questionid,answercontent,element1,element2,element3,element4,element5,element6,element7,element8,element9,element10) VALUES(#{questionid},#{answercontent},#{element1},#{element2},#{element3},#{element4},#{element5},#{element6},#{element7},#{element8},#{element9},#{element10})")
    public void insertAnswer(Answer answer);

}
