package com.wss.springboot.bean;

public class QuestionPage {

    private String factor1;
    private Integer page;

    @Override
    public String toString() {
        return "QuestionPage{" +
                "factor1='" + factor1 + '\'' +
                ", page=" + page +
                '}';
    }

    public String getFactor1() {
        return factor1;
    }

    public void setFactor1(String factor1) {
        this.factor1 = factor1;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
}
