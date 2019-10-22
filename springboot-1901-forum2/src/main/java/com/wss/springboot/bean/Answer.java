package com.wss.springboot.bean;

public class Answer {

    private Integer ids;
    private String questionid;
    private String answercontent;
    private String element1;  //即openid
    private String element2;  //即avatarUrl`
    private String element3;
    private String element4;
    private String element5;

    public Answer(){

    }

    public Answer(Integer ids, String questionid, String answercontent,String element1,String element2,
                  String element3,String element4,String element5) {
        this.ids = ids;
        this.questionid = questionid;
        this.answercontent = answercontent;
        this.element1 = element1;
        this.element2 = element2;
        this.element3 = element3;
        this.element4 = element4;
        this.element5 = element5;
    }

    @Override
    public String toString() {
        return "Answer{" +
                "ids=" + ids +
                ", questionid='" + questionid + '\'' +
                ", answercontent='" + answercontent + '\'' +
                ", element1='" + element1 + '\'' +
                ", element2='" + element2 + '\'' +
                ", element3='" + element3 + '\'' +
                ", element4='" + element4 + '\'' +
                ", element5='" + element5 + '\'' +
                '}';
    }

    public Integer getIds() {
        return ids;
    }

    public void setIds(Integer ids) {
        this.ids = ids;
    }

    public String getQuestionid() {
        return questionid;
    }

    public void setQuestionid(String questionid) {
        this.questionid = questionid;
    }

    public String getAnswercontent() {
        return answercontent;
    }

    public void setAnswercontent(String answercontent) {
        this.answercontent = answercontent;
    }

    public String getElement1() {
        return element1;
    }

    public void setElement1(String element1) {
        this.element1 = element1;
    }

    public String getElement2() {
        return element2;
    }

    public void setElement2(String element2) {
        this.element2 = element2;
    }

    public String getElement3() {
        return element3;
    }

    public void setElement3(String element3) {
        this.element3 = element3;
    }

    public String getElement4() {
        return element4;
    }

    public void setElement4(String element4) {
        this.element4 = element4;
    }

    public String getElement5() {
        return element5;
    }

    public void setElement5(String element5) {
        this.element5 = element5;
    }
}
