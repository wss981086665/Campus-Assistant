package com.wss.springboot.bean;

public class Teacher {

    private Integer id;
    private String openid;
    private String nickName;
    private String school;
    private String institute;
    private String profession;
    private String course;
    private String name;
    private String tell;
    private String pros1;
    private String pros2;
    private String pros3;
    private String pros4;
    private String pros5;

    public Teacher() {
    }

    public Teacher(Integer id, String openid, String nickName, String school, String institute, String profession, String course, String name, String tell, String pros1, String pros2, String pros3, String pros4, String pros5) {
        this.id = id;
        this.openid = openid;
        this.nickName = nickName;
        this.school = school;
        this.institute = institute;
        this.profession = profession;
        this.course = course;
        this.name = name;
        this.tell = tell;
        this.pros1 = pros1;
        this.pros2 = pros2;
        this.pros3 = pros3;
        this.pros4 = pros4;
        this.pros5 = pros5;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id=" + id +
                ", openid='" + openid + '\'' +
                ", nickName='" + nickName + '\'' +
                ", school='" + school + '\'' +
                ", institute='" + institute + '\'' +
                ", profession='" + profession + '\'' +
                ", course='" + course + '\'' +
                ", name='" + name + '\'' +
                ", tell='" + tell + '\'' +
                ", pros1='" + pros1 + '\'' +
                ", pros2='" + pros2 + '\'' +
                ", pros3='" + pros3 + '\'' +
                ", pros4='" + pros4 + '\'' +
                ", pros5='" + pros5 + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getInstitute() {
        return institute;
    }

    public void setInstitute(String institute) {
        this.institute = institute;
    }

    public String getProfession() {
        return profession;
    }

    public void setProfession(String profession) {
        this.profession = profession;
    }

    public String getCourse() {
        return course;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTell() {
        return tell;
    }

    public void setTell(String tell) {
        this.tell = tell;
    }

    public String getPros1() {
        return pros1;
    }

    public void setPros1(String pros1) {
        this.pros1 = pros1;
    }

    public String getPros2() {
        return pros2;
    }

    public void setPros2(String pros2) {
        this.pros2 = pros2;
    }

    public String getPros3() {
        return pros3;
    }

    public void setPros3(String pros3) {
        this.pros3 = pros3;
    }

    public String getPros4() {
        return pros4;
    }

    public void setPros4(String pros4) {
        this.pros4 = pros4;
    }

    public String getPros5() {
        return pros5;
    }

    public void setPros5(String pros5) {
        this.pros5 = pros5;
    }
}
