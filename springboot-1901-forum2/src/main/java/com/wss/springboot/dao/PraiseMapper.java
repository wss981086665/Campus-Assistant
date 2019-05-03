package com.wss.springboot.dao;

import com.wss.springboot.bean.Forumuser;
import com.wss.springboot.bean.Praise;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "praiseMapper")
public interface PraiseMapper {

    @Select("SELECT * FROM praise WHERE openid=#{openid}")
    public List<Praise> getPraiseByOpenid(String openid);

    @Select("SELECT * FROM praise WHERE questionid=#{questionid}")
    public List<Praise> getPraiseByQuestionid(String questionid);

    @Insert("INSERT INTO praise(questionid,nickName,openid) VALUES(#{questionid},#{nickName},#{openid})")
    public void insertPraise(Praise praise);

}
