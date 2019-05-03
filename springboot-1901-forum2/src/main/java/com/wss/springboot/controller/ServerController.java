package com.wss.springboot.controller;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ServerController {

    @RequestMapping("/adduser")
    public String insertuser(@Param("code")String code, @Param("nickname")String nickname, @Param("avatarUrl")String avatarUrl){

        //基本信息
        String appid = "wxd4c54893e1e4ed01";//填写appid
        String appsecret = "f8640058ba00c60cfb2480b94310fe46";//填写对应appsecret
        String reslut = "none";


        try {
            OkHttpClient client = new OkHttpClient();
            Request request = new Request.Builder()
                    .url("https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+appsecret+"&js_code="+code+"&grant_type=authorization_code")
                    .build();
            Response response = client.newCall(request).execute();
            reslut = response.body().string();
            if (!response.isSuccessful()) {
                reslut = "服务器端错误: " + response;
            }
        }catch (Exception e){
            System.out.println(e.getStackTrace());
        }
        return reslut;
    }

}
