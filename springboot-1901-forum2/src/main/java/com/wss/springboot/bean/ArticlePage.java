package com.wss.springboot.bean;

public class ArticlePage {

    private String openid;
    private Integer page;

    @Override
    public String toString() {
        return "ArticlePage{" +
                "openid='" + openid + '\'' +
                ", page=" + page +
                '}';
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid;
    }

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }
}
