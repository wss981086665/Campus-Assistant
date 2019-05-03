package com.wss.springboot.bean;

import java.util.List;

public class Question {

    private Integer id;
    private String author;
    private String topic;
    private String content;
    private String answer;
    private List<Answer> answers;
    private String factor1;   //即openid
    private String factor2;   //即avatarUrl
    private String factor3;   //即course
    private String factor4;   //即nickName
    private String factor5;   //日期
    private String factor6;   //图片名
    private String factor7;
    private String factor8;
    private String factor9;
    private String factor10;

    public Question(){

    }

    public Question(Integer id, String author, String topic, String content, String answer, List<Answer> answers,
                    String factor1, String factor2, String factor3, String factor4, String factor5,
                    String factor6, String factor7, String factor8, String factor9, String factor10) {
        this.id = id;
        this.author = author;
        this.topic = topic;
        this.content = content;
        this.answer = answer;
        this.answers = answers;
        this.factor1 = factor1;
        this.factor2 = factor2;
        this.factor3 = factor3;
        this.factor4 = factor4;
        this.factor5 = factor5;
        this.factor6 = factor6;
        this.factor7 = factor7;
        this.factor8 = factor8;
        this.factor9 = factor9;
        this.factor10 = factor10;
    }

    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", author='" + author + '\'' +
                ", topic='" + topic + '\'' +
                ", content='" + content + '\'' +
                ", answer='" + answer + '\'' +
                ", answers=" + answers +
                ", factor1='" + factor1 + '\'' +
                ", factor2='" + factor2 + '\'' +
                ", factor3='" + factor3 + '\'' +
                ", factor4='" + factor4 + '\'' +
                ", factor5='" + factor5 + '\'' +
                ", factor6='" + factor6 + '\'' +
                ", factor7='" + factor7 + '\'' +
                ", factor8='" + factor8 + '\'' +
                ", factor9='" + factor9 + '\'' +
                ", factor10='" + factor10 + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getFactor1() {
        return factor1;
    }

    public void setFactor1(String factor1) {
        this.factor1 = factor1;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

//    public List<Answer> getAnswers() {
//        Map<String,Object> listAnswer = new HashMap<String,Object>();
//        List<Answer> answer = answerService.getAnswersByQuestionId(id.toString());
//        listAnswer.put("answers",answer);
//        return answers;
//    }

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public String getFactor2() {
        return factor2;
    }

    public void setFactor2(String factor2) {
        this.factor2 = factor2;
    }

    public String getFactor3() {
        return factor3;
    }

    public void setFactor3(String factor3) {
        this.factor3 = factor3;
    }

    public String getFactor4() {
        return factor4;
    }

    public void setFactor4(String factor4) {
        this.factor4 = factor4;
    }

    public String getFactor5() {
        return factor5;
    }

    public void setFactor5(String factor5) {
        this.factor5 = factor5;
    }

    public String getFactor6() {
        return factor6;
    }

    public void setFactor6(String factor6) {
        this.factor6 = factor6;
    }

    public String getFactor7() {
        return factor7;
    }

    public void setFactor7(String factor7) {
        this.factor7 = factor7;
    }

    public String getFactor8() {
        return factor8;
    }

    public void setFactor8(String factor8) {
        this.factor8 = factor8;
    }

    public String getFactor9() {
        return factor9;
    }

    public void setFactor9(String factor9) {
        this.factor9 = factor9;
    }

    public String getFactor10() {
        return factor10;
    }

    public void setFactor10(String factor10) {
        this.factor10 = factor10;
    }
}
