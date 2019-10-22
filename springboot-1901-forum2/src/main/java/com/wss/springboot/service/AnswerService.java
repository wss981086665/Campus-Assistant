package com.wss.springboot.service;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.dao.AnswerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerService {

    @Autowired
    AnswerMapper answerMapper;

    public List<Answer> getAnswersByQuestionId(String questionid){
        List<Answer> queryAnswer = new ArrayList<Answer>();
        queryAnswer = answerMapper.getAnswersByQuestionid(questionid);
        return queryAnswer;
    }

    public List<Answer> getAnswersByOpenId(String factor1){
        List<Answer> queryAnswer = new ArrayList<Answer>();
        queryAnswer = answerMapper.getAnswersByOpenid(factor1);
        return queryAnswer;
    }

    public void deleteAnswer(Integer ids){
        answerMapper.deleteAnswerByIds(ids);
    }

    public Answer insert(Answer answer){
        answerMapper.insertAnswer(answer);
        return answer;
    }

}
