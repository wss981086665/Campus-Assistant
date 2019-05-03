package com.wss.springboot.bean;

public class CoursePage {

    private String name;
    private Integer page;

    @Override
    public String toString() {
        return "CoursePage{" +
                "name='" + name + '\'' +
                ", page=" + page +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
}
