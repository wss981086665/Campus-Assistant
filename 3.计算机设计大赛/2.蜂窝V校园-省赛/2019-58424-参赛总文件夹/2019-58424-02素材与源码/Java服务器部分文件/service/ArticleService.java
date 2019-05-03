package com.wss.springboot.service;

import com.wss.springboot.bean.Article;
import com.wss.springboot.bean.ArticlePage;
import com.wss.springboot.dao.ArticleMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ArticleService {

    @Autowired
    ArticleMapper articleMapper;

    public Article getArticleById(Integer id){
        Article emp = articleMapper.getArticleById(id);
        return emp;
    }

    public void insert(Article article){
        articleMapper.insertArticle(article);
    }

    public void deleteArticle(Integer id){
        articleMapper.deleteArticleById(id);
    }

    public List<Article> getArticleByNickName(String nickName){
        List<Article> articles = articleMapper.getArticleByNickName(nickName);
        return articles;
    }

    public List<Article> getArticleByOpenid(ArticlePage articlePage){
        List<Article> articles = articleMapper.getArticleByOpenid(articlePage);
        return articles;
    }

    //查询所有数据
    public List<Article> getSearch(String index){
        List<Article> allarticle = articleMapper.getSearch(index);
        return allarticle;
    }

    public List<Article> getArticleByFac2(){
        List<Article> articles = articleMapper.getArticleByFac2("1");
        return articles;
    }

}
