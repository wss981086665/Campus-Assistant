package com.wss.springboot.service;

import com.wss.springboot.bean.Feedback;
import com.wss.springboot.dao.FeedbackMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    FeedbackMapper feedbackMapper;

    public Feedback getFeedbackById(Integer id){
        Feedback feedback = feedbackMapper.getFeedbackByQuestionid(id);
        return feedback;
    }

    public List<Feedback> getFeedbackByOpenId(String openid){
        List<Feedback> queryFeedback = new ArrayList<Feedback>();
        queryFeedback = feedbackMapper.getFeedbackByOpenid(openid);
        return queryFeedback;
    }

    public void deleteFeedback(Integer id){
        feedbackMapper.deleteFeedbackByIds(id);
    }

    public void insert(Feedback feedback){
        feedbackMapper.insertFeedback(feedback);
    }

}
