package com.wss.springboot.dao;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.Forumuser;
import com.wss.springboot.bean.Question;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "forumuserMapper")
public interface ForumuserMapper {

    @Select("SELECT * FROM forumuser WHERE openid=#{openid}")
    public List<Forumuser> getForumuser(String openid);

    @Insert("INSERT INTO forumuser(openid,avatarUrl,city,country,gender,language,nickName,province,con1,con2,con3,con4,con5) VALUES(#{openid},#{avatarUrl},#{city},#{country},#{gender},#{language},#{nickName},#{province},#{con1},#{con2},#{con3},#{con4},#{con5})")
    public void insertForumuser(Forumuser forumuser);

    @Update("UPDATE forumuser SET con2=#{con2} WHERE con1=#{con1}")
    public void updateForumuser(String con2,String con1);

}
