package com.wss.springboot.controller;

import com.wss.springboot.bean.Praise;
import com.wss.springboot.bean.Question;
import com.wss.springboot.service.PraiseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sun.plugin.javascript.navig.Link;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("visitpraise")
public class PraiseController {

    @Autowired
    PraiseService praiseService;

    @RequestMapping(value = "/visitpraise",method = RequestMethod.GET)
    public Map<String,String> judgePraise(@RequestParam(value="questionid",defaultValue = "null") String questionid,
                                           @RequestParam(value="openid",defaultValue = "null") String openid){
        Map<String,String> judge = new HashMap<String,String>();
        String index = praiseService.getQuestionid(questionid,openid);
        judge.put("judgepraise",index);
        return judge;
    }

    @RequestMapping(value = "/getpraiser",method = RequestMethod.GET)
    public Map<String,Object> getPraiser(@RequestParam(value="questionid",defaultValue = "null") String questionid,
                                         @RequestParam(value="nickName",defaultValue = "null")String nickName){
        try {
            nickName = URLDecoder.decode(nickName, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Map<String,Object> judgemap = new HashMap<String,Object>();
        List<String> praiser = praiseService.getPraiser(questionid);
        judgemap.put("praiser",praiser);            /*放进去nickName集合*/

        String index = "no";
        Iterator<String> iter = praiser.iterator();
        while (iter.hasNext()){
            String demo = iter.next();
            if(demo.equals(nickName)){
                index = "yes";
            };
        }
        judgemap.put("judge",index);
        return judgemap;
    }

    @RequestMapping(value = "/insertpraise",method = RequestMethod.POST)
    public void insertPraise(Praise praise){
        String questionid = praise.getQuestionid();
        String openid = praise.getOpenid();
        String demo = judgePraise(questionid,openid)
                .get("judgepraise")
                .toString();
        if(demo.equals("no")) {
            String nickName = praise.getNickName();
            try {
                nickName = URLDecoder.decode(nickName, "UTF-8");
                praise.setNickName(nickName);
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            praiseService.insert(praise);
        }
    }

}
