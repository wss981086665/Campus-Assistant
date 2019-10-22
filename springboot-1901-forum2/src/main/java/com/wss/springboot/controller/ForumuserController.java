package com.wss.springboot.controller;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.Forumuser;
import com.wss.springboot.service.ForumuserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("operateuser")
public class ForumuserController {

    @Autowired
    ForumuserService forumuserService;

    @RequestMapping(value = "/getforumuser",method = RequestMethod.GET)
    public Map<String,Object> getForumuser(@RequestParam(value="openid",defaultValue = "null") String openid){
        Map<String,Object> forumusernum= new HashMap<String,Object>();
        List<Forumuser> forumuser = forumuserService.getForumuser(openid);
        String num = ((Integer) forumuser.size()).toString();
        forumusernum.put("forumuser",num);
        return forumusernum;
    }

    @RequestMapping(value = "/inserforumuser",method = RequestMethod.POST)
    public String insertForumuser(Forumuser forumuser){
        String test = getForumuser(forumuser.getOpenid())
                .get("forumuser")
                .toString();
        if(test.equals("0")){
            String nickName = forumuser.getNickName();
            try {
                nickName = URLDecoder.decode(nickName, "UTF-8");
                forumuser.setNickName(nickName);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            forumuserService.insert(forumuser);
        }
        return "success";
    }
}
