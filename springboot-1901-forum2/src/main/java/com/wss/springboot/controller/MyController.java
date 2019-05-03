package com.wss.springboot.controller;

import com.wss.springboot.bean.Course;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;

//import org.apache.http.client.methods.CloseableHttpResponse;

@RestController
@RequestMapping("/ensure")
public class MyController {

    @RequestMapping(value = "/ensurenumber",method = RequestMethod.GET)
    public Map<String,Object> ensureNumber() {
        Map<String,Object> ensuerMap = new HashMap<String,Object>();
        LinkedList<Course> courses = new LinkedList<Course>();

        //*************************************************************************************************************
        String[] subject = {"高等数学","离散数学","线性代数","大学物理","英语","C语言","C++","Java","数据结构",
                "汇编","体育","编程","储运","操作系统","物理实验","有机化学","大学英语","其他"};
        //*************************************************************************************************************
        //轮播图图片地址
        String[] lunbodata = {"http://www.xztywss.top/img/luntan/lunbotu/one.jpg",
                "http://www.xztywss.top/img/luntan/lunbotu/two.jpg",
                "http://www.xztywss.top/img/luntan/lunbotu/three.jpg",
                "http://www.xztywss.top/img/luntan/lunbotu/four.jpg"} ;
        ensuerMap.put("lunbodata",lunbodata);
        //*************************************************************************************************************

        for(int i=0; i<subject.length; i++){
            courses.add(new Course(String.valueOf(i+1),subject[i]));
        }

        LinkedList<String> coursename = new LinkedList<String>();
        LinkedList<Course> slider = new LinkedList<Course>();
        for(int i=0; i<subject.length; i++){
            slider.add(new Course(String.valueOf(i),subject[i])); coursename.add(subject[i]);
        }

        ensuerMap.put("ensure",true);
        ensuerMap.put("courses",courses);
        ensuerMap.put("slider",slider);
        ensuerMap.put("coursename",coursename);
        return ensuerMap;
    }

    //图片上传
//    @RequestMapping(value = "/uploadfile",method = RequestMethod.POST)
    @PostMapping("/uploadfile")
    public String lunboData(HttpServletRequest request,@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        request.setCharacterEncoding("UTF-8");
        String user = request.getParameter("user");

        if(!file.isEmpty()) {
            String fileName = file.getOriginalFilename();
            String path = null;
//            System.out.println("获取类型前");
            String type = fileName.indexOf(".") != -1 ? fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length()) : null;
//            System.out.println("图片初始名称为：" + fileName + " 类型为：" + type);
            if (type != null) {
                if ("GIF".equals(type.toUpperCase())||"PNG".equals(type.toUpperCase())||"JPG".equals(type.toUpperCase())) {

                    // 项目在容器中实际发布运行的根路径
                    String realPath = request.getSession().getServletContext().getRealPath("/");
                    // 自定义的文件名称
                    String trueFileName = String.valueOf(System.currentTimeMillis()) + fileName;

                    // 设置存放图片文件的路径
                    path = "/www/wwwroot/www.xztywss.top/img/upload/" + trueFileName;

//                    System.out.println("存放图片文件的路径:" + path);

                    File dest = new File(path);

                    //判断文件父目录是否存在
                    if (!dest.getParentFile().exists()) {
                        dest.getParentFile().mkdir();
                    }

                    file.transferTo(dest);

                    return trueFileName;
                }else {
                    return "error";
                }
            }else {
                return "error";
            }
        }else {
            return "error";
        }
    }

}
