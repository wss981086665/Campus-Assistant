package com.wss.springboot.controller;

import com.wss.springboot.bean.Article;
import com.wss.springboot.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

@RestController
@RequestMapping("forarticle")
public class ArticleController {

    @Autowired
    ArticleService articleService;

    @RequestMapping(value = "/getarticlebyid",method = RequestMethod.GET)
    public Map<String,Object> getArticleById(@RequestParam(value="id",required = false) Integer id){
        Map<String,Object> listArticle = new HashMap<String,Object>();
        Article article = articleService.getArticleById(id);
        listArticle.put("article",article);
        return listArticle;
    }

    @RequestMapping(value = "/deletesrticlebyid",method = RequestMethod.GET)
    public void deleteArticle(@RequestParam(value="id",required = false) Integer id){
        articleService.deleteArticle(id);
    }

    @RequestMapping(value = "/insertarticlebyid",method = RequestMethod.POST)
    public void insertAnswer(Article article){
        String nickName = article.getNickName();
        String title = article.getTitle();
        String content = article.getContent();
        String author = article.getAuthor();
        String described = article.getDescribed();
        String wechat = article.getWechat();
        String qq = article.getQq();
        String sign = article.getSign();
        String style = article.getStyle();
        String school = article.getSchool();
        String hobby = article.getHobby();
        try {
            nickName = URLDecoder.decode(nickName, "UTF-8");title = URLDecoder.decode(title, "UTF-8");
            content = URLDecoder.decode(content, "UTF-8");author = URLDecoder.decode(author, "UTF-8");
            described = URLDecoder.decode(described, "UTF-8");wechat = URLDecoder.decode(wechat, "UTF-8");
            qq = URLDecoder.decode(qq, "UTF-8");sign = URLDecoder.decode(sign, "UTF-8");
            style = URLDecoder.decode(style, "UTF-8");school = URLDecoder.decode(school, "UTF-8");
            hobby = URLDecoder.decode(hobby, "UTF-8");
            article.setNickName(nickName);article.setTitle(title);article.setContent(content);article.setAuthor(author);
            article.setDescribed(described);article.setWechat(wechat);article.setQq(qq);article.setSign(sign);
            article.setStyle(style);article.setSchool(school);article.setHobby(hobby);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        articleService.insert(article);
    }

    @RequestMapping(value = "/getarticlebynickname",method = RequestMethod.GET)
    public Map<String,Object> getArticleByNickName(@RequestParam(value="nickName",defaultValue = "null") String nickName){
        Map<String,Object> listArticle = new HashMap<String,Object>();
        List<Article> articles = articleService.getArticleByNickName(nickName);
        listArticle.put("articlelist",articles);
        return listArticle;
    }

    @RequestMapping(value = "/getarticlebyopenid",method = RequestMethod.GET)
    public Map<String,Object> getArticleByOpenid(@RequestParam(value="openid",defaultValue = "null") String openid){
        Map<String,Object> listArticle = new HashMap<String,Object>();
        List<Article> articles = articleService.getArticleByOpenid(openid);
        listArticle.put("articlelist",articles);
        return listArticle;
    }

    @RequestMapping(value = "/searcharticle",method = RequestMethod.GET)
    public Map<String,Object> searchArticle(@RequestParam(value="index",defaultValue = "null") String index){
        try {
            index = URLDecoder.decode(index, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Map<String,Object> articlemap = new HashMap<String,Object>();
        List<Article> allarticle = articleService.getAll();
        List<Article> searcharticle = new LinkedList<Article>();

        Iterator<Article> iter = allarticle.iterator();
        while (iter.hasNext()){
            Article article = iter.next();
            String nickName = article.getNickName();
            String author = article.getAuthor();
            if(nickName.indexOf(index)!=-1||author.indexOf(index)!=-1){
                searcharticle.add(article);
            }
        }
        articlemap.put("articles",searcharticle);
        return articlemap;
    }

}
