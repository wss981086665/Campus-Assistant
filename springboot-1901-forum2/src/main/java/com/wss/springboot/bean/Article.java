package com.wss.springboot.bean;

import java.util.List;

public class Article {

    private Integer id;
    private String title;
    private String content;
    private String author;
    private String openid;
    private String nickName;
    private String avatarUrl;
    private String described;
    private String wechat;
    private String qq;
    private String sign;
    private String style;
    private String school;
    private String hobby;
    private String fac1;
    private String fac2;
    private String fac3;
    private String fac4;
    private String fac5;

    public Article() {
    }

    public Article(Integer id, String title, String content, String author, String openid, String nickName,String avatarUrl,String described, String wechat, String qq, String sign, String style, String school, String hobby, String fac1, String fac2, String fac3, String fac4, String fac5) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.openid = openid;
        this.nickName = nickName;
        this.avatarUrl = avatarUrl;
        this.described = described;
        this.wechat = wechat;
        this.qq = qq;
        this.sign = sign;
        this.style = style;
        this.school = school;
        this.hobby = hobby;
        this.fac1 = fac1;
        this.fac2 = fac2;
        this.fac3 = fac3;
        this.fac4 = fac4;
        this.fac5 = fac5;
    }

    @Override
    public String toString() {
        return "article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", openid='" + openid + '\'' +
                ", nickName='" + nickName + '\'' +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", described='" + described + '\'' +
                ", wechat='" + wechat + '\'' +
                ", qq='" + qq + '\'' +
                ", sign='" + sign + '\'' +
                ", style='" + style + '\'' +
                ", school='" + school + '\'' +
                ", hobby='" + hobby + '\'' +
                ", fac1='" + fac1 + '\'' +
                ", fac2='" + fac2 + '\'' +
                ", fac3='" + fac3 + '\'' +
                ", fac4='" + fac4 + '\'' +
                ", fac5='" + fac5 + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getDescribed() {
        return described;
    }

    public void setDescribed(String described) {
        this.described = described;
    }

    public String getWechat() {
        return wechat;
    }

    public void setWechat(String wechat) {
        this.wechat = wechat;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getSign() {
        return sign;
    }

    public void setSign(String sign) {
        this.sign = sign;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getFac1() {
        return fac1;
    }

    public void setFac1(String fac1) {
        this.fac1 = fac1;
    }

    public String getFac2() {
        return fac2;
    }

    public void setFac2(String fac2) {
        this.fac2 = fac2;
    }

    public String getFac3() {
        return fac3;
    }

    public void setFac3(String fac3) {
        this.fac3 = fac3;
    }

    public String getFac4() {
        return fac4;
    }

    public void setFac4(String fac4) {
        this.fac4 = fac4;
    }

    public String getFac5() {
        return fac5;
    }

    public void setFac5(String fac5) {
        this.fac5 = fac5;
    }
}
