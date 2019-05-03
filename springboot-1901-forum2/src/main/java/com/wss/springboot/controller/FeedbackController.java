package com.wss.springboot.controller;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.Feedback;
import com.wss.springboot.service.FeedbackService;
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
@RequestMapping("forfeedback")
public class FeedbackController {

    @Autowired
    FeedbackService feedbackService;

    @RequestMapping(value = "/getfeedbackbyid",method = RequestMethod.GET)
    public Map<String,Object> getFeedbackById(String idg){
        Integer id = Integer.valueOf(idg);
        Map<String,Object> listAnswer = new HashMap<String,Object>();
        Feedback feedback = feedbackService.getFeedbackById(id);
        listAnswer.put("feedback",feedback);
        return listAnswer;
    }

    @RequestMapping(value = "/getfeedbackbyopenid",method = RequestMethod.GET)
    public Map<String,Object> getFeedbackByOpenid(@RequestParam(value="openid",defaultValue="null") String openid){
        Map<String,Object> listFeedback = new HashMap<String,Object>();
        List<Feedback> feedbacks = feedbackService.getFeedbackByOpenId(openid);
        listFeedback.put("feedbacklist",listFeedback);
        return listFeedback;
    }

    @RequestMapping(value = "/deletefeedbackbyid",method = RequestMethod.GET)
    public void deleteFeedback(@RequestParam(value="id",required = false) Integer id){
        feedbackService.deleteFeedback(id);
    }

    @RequestMapping(value = "/insertfeedbackbyid",method = RequestMethod.POST)
    public void insertFeedback(Feedback feedback){
        String type = feedback.getType();
        String content = feedback.getContent();
        String contact = feedback.getContact();
        String nickName = feedback.getNickName();
        try {
            type = URLDecoder.decode(type, "UTF-8");
            content = URLDecoder.decode(content, "UTF-8");
            contact = URLDecoder.decode(contact, "UTF-8");
            nickName = URLDecoder.decode(nickName, "UTF-8");
            feedback.setType(type);
            feedback.setContent(content);
            feedback.setContact(contact);
            feedback.setNickName(nickName);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        feedbackService.insert(feedback);
    }
}
