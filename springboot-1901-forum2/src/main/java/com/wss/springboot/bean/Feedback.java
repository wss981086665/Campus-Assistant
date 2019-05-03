package com.wss.springboot.bean;

public class Feedback {

    private Integer id;
    private String type;
    private String content;
    private String contact;
    private String openid;
    private String nickName;
    private String ele1;
    private String ele2;
    private String ele3;

    public Feedback() {
    }

    public Feedback(Integer id, String type, String content, String contact, String openid, String nickName, String ele1, String ele2, String ele3) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.contact = contact;
        this.openid = openid;
        this.nickName = nickName;
        this.ele1 = ele1;
        this.ele2 = ele2;
        this.ele3 = ele3;
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", content='" + content + '\'' +
                ", contact='" + contact + '\'' +
                ", openid='" + openid + '\'' +
                ", nickName='" + nickName + '\'' +
                ", ele1='" + ele1 + '\'' +
                ", ele2='" + ele2 + '\'' +
                ", ele3='" + ele3 + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
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

    public String getEle1() {
        return ele1;
    }

    public void setEle1(String ele1) {
        this.ele1 = ele1;
    }

    public String getEle2() {
        return ele2;
    }

    public void setEle2(String ele2) {
        this.ele2 = ele2;
    }

    public String getEle3() {
        return ele3;
    }

    public void setEle3(String ele3) {
        this.ele3 = ele3;
    }
}
