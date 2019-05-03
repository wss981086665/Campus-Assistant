package com.wss.springboot.bean;

public class Praise {

    private Integer idy;
    private String questionid;
    private String nickName;
    private String openid;
    private String pro1;
    private String pro2;
    private String pro3;
    private String pro4;
    private String pro5;

    public Praise() {
    }

    public Praise(Integer idy, String questionid, String nickName, String openid, String pro1, String pro2, String pro3, String pro4, String pro5) {
        this.idy = idy;
        this.questionid = questionid;
        this.nickName = nickName;
        this.openid = openid;
        this.pro1 = pro1;
        this.pro2 = pro2;
        this.pro3 = pro3;
        this.pro4 = pro4;
        this.pro5 = pro5;
    }

    @Override
    public String toString() {
        return "Praise{" +
                "idy=" + idy +
                ", questionid='" + questionid + '\'' +
                ", nickName='" + nickName + '\'' +
                ", openid='" + openid + '\'' +
                ", pro1='" + pro1 + '\'' +
                ", pro2='" + pro2 + '\'' +
                ", pro3='" + pro3 + '\'' +
                ", pro4='" + pro4 + '\'' +
                ", pro5='" + pro5 + '\'' +
                '}';
    }

    public Integer getIdy() {
        return idy;
    }

    public void setIdy(Integer idy) {
        this.idy = idy;
    }

    public String getQuestionid() {
        return questionid;
    }

    public void setQuestionid(String questionid) {
        this.questionid = questionid;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public String getPro1() {
        return pro1;
    }

    public void setPro1(String pro1) {
        this.pro1 = pro1;
    }

    public String getPro2() {
        return pro2;
    }

    public void setPro2(String pro2) {
        this.pro2 = pro2;
    }

    public String getPro3() {
        return pro3;
    }

    public void setPro3(String pro3) {
        this.pro3 = pro3;
    }

    public String getPro4() {
        return pro4;
    }

    public void setPro4(String pro4) {
        this.pro4 = pro4;
    }

    public String getPro5() {
        return pro5;
    }

    public void setPro5(String pro5) {
        this.pro5 = pro5;
    }
}
