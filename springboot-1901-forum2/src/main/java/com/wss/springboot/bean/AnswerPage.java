package com.wss.springboot.bean;

public class AnswerPage {

    private String element1;
    private Integer page;

    @Override
    public String toString() {
        return "AnswerPage{" +
                "element1='" + element1 + '\'' +
                ", page=" + page +
                '}';
    }

    public String getElement1() {
        return element1;
    }

    public void setElement1(String element1) {
        this.element1 = element1;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
}
