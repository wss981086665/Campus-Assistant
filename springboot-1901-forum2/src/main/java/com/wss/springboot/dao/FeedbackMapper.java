package com.wss.springboot.dao;

import com.wss.springboot.bean.Feedback;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "feedbackMapper")
public interface FeedbackMapper {

    @Select("SELECT * FROM feedback WHERE id=#{id}")
    public Feedback getFeedbackByQuestionid(Integer id);

    @Select("SELECT * FROM feedback WHERE openid=#{openid}")
    public List<Feedback> getFeedbackByOpenid(String openid);

    @Delete("DELETE FROM feedback WHERE id=#{id}")
    public void deleteFeedbackByIds(Integer id);

    @Insert("INSERT INTO feedback(type,content,contact,openid,nickName,ele1,ele2,ele3) VALUES(#{type},#{content},#{contact},#{openid},#{nickName},#{ele1},#{ele2},#{ele3})")
    public void insertFeedback(Feedback feedback);

}
