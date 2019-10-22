package com.wss.springboot.controller;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.Article;
import com.wss.springboot.service.AnswerService;
import com.wss.springboot.service.ArticleService;
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
@RequestMapping("/superroot")
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @RequestMapping(value = "/getanswersbyquestionid",method = RequestMethod.GET)
    public Map<String,Object> getAnswersByQuestionid(@RequestParam(value="questionid",defaultValue="null") String questionid){
        Map<String,Object> listAnswer = new HashMap<String,Object>();
        List<Answer> answers = answerService.getAnswersByQuestionId(questionid);
        listAnswer.put("answerlist",answers);
        return listAnswer;
    }

    @RequestMapping(value = "/getanswersbyopenid",method = RequestMethod.GET)
    public Map<String,Object> getAnswersByOpenid(@RequestParam(value="factor1",defaultValue="null") String factor1){
        Map<String,Object> listAnswer = new HashMap<String,Object>();
        List<Answer> answers = answerService.getAnswersByOpenId(factor1);
        listAnswer.put("answerlist",answers);
        return listAnswer;
    }

    @RequestMapping(value = "/deleteanswerbyids",method = RequestMethod.GET)
    public void deleteAnswer(@RequestParam(value="ids",required = false) Integer ids){
        answerService.deleteAnswer(ids);
    }

    @RequestMapping(value = "/insertanswerbyid",method = RequestMethod.POST)
    public Answer insertAnswer(Answer answer){
        String element3 = answer.getElement3();
        String answercontent = answer.getAnswercontent();
        try {
            element3 = URLDecoder.decode(element3, "UTF-8");
            answer.setElement3(element3);
            answercontent = URLDecoder.decode(answercontent, "UTF-8");
            answer.setAnswercontent(answercontent);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        answerService.insert(answer);
        return answer;
    }

}
