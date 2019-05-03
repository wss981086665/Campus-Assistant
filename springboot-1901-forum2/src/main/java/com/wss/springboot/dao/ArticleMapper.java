package com.wss.springboot.dao;

import com.wss.springboot.bean.Article;
import com.wss.springboot.bean.ArticlePage;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component(value = "articleMapper")
public interface ArticleMapper {

    @Select("SELECT * FROM article WHERE id=#{id}")
    public Article getArticleById(Integer id);

    @Insert("INSERT INTO article(title,content,author,openid,nickName,avatarUrl,described,wechat,qq,sign,style,school,hobby,fac1,fac2,fac3,fac4,fac5) VALUES(#{title},#{content},#{author},#{openid},#{nickName},#{avatarUrl},#{described},#{wechat},#{qq},#{sign},#{style},#{school},#{hobby},#{fac1},#{fac2},#{fac3},#{fac4},#{fac5})")
    public void insertArticle(Article article);

    @Delete("DELETE FROM article WHERE id=#{id}")
    public void deleteArticleById(Integer id);

    @Select("SELECT * FROM article WHERE nickName=#{nickName}")
    public List<Article> getArticleByNickName(String nickName);

    @Select("SELECT * FROM article WHERE openid=#{openid} order by fac3 desc limit #{page},10")
    public List<Article> getArticleByOpenid(ArticlePage articlePage);

    @Select("SELECT * FROM article WHERE nickName REGEXP #{index} or author REGEXP #{index}")
    public List<Article> getSearch(String index);

    @Select("SELECT * FROM article WHERE fac2=#{fac2}")
    public List<Article> getArticleByFac2(String fac2);

}
