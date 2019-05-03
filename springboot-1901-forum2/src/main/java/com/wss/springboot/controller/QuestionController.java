package com.wss.springboot.controller;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.CoursePage;
import com.wss.springboot.bean.Question;
import com.wss.springboot.bean.QuestionPage;
import com.wss.springboot.service.AnswerService;
import com.wss.springboot.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/superadmin")
public class QuestionController {

    @Autowired
    QuestionService questionService;

    @Autowired
    AnswerService answerService;

    /*敲黑板,传输数值需要用map键值对传输,静态网页通过键获取值*/
    /*根据id查找问题*/
    @RequestMapping(value = "/getquestionbyid",method = RequestMethod.GET)
    public Map<String,Object> getQuestionById(@RequestParam(value="id",defaultValue = "null") String id){
        Integer ida = Integer.valueOf(id);
        Map<String,Object> questionmap = new HashMap<String,Object>();

        Question que = questionService.getQuestionById(ida);

        questionmap.put("question",que);

        return questionmap;
    }

    /*插入问题*/
    @RequestMapping(value = "/insertquestionbyid",method = RequestMethod.POST)
    public Question insertQuestion(Question question){
        String course = question.getFactor3();
        String author = question.getAuthor();
        String topic = question.getTopic();
        String content = question.getContent();
        String nickName = question.getFactor4();
        try {
            author = URLDecoder.decode(author, "UTF-8");
            topic = URLDecoder.decode(topic, "UTF-8");
            course = URLDecoder.decode(course, "UTF-8");
            content = URLDecoder.decode(content, "UTF-8");
            nickName = URLDecoder.decode(nickName, "UTF-8");
            if(author == ""){
                question.setAuthor("匿名");
            } else {
                question.setAuthor(author);
            }
            question.setTopic(topic);
            question.setFactor3(course);
            question.setContent(content);
            question.setFactor4(nickName);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        questionService.insert(question);
        return question;
    }

    /*更新*/
    @RequestMapping(value = "/updatequestionbyid",method = RequestMethod.POST)
    public Question updateQuestion(Question question){
        questionService.update(question);
        return question;
    }

    @RequestMapping(value = "/deletequestionbyid",method = RequestMethod.GET)
    public void deleteQuestion(@RequestParam(value="id") Integer id){
        questionService.deleteQuestion(id);
    }

    @RequestMapping(value = "/getquestionbyauthor",method = RequestMethod.GET)
    public Question getQuestionByAuthor(@RequestParam(value="author",defaultValue = "null") String author){
        Question question = questionService.getQuestionByAuthor(author);
        return  question;
    }

    @RequestMapping(value = "/getquestionsbyauthor",method = RequestMethod.GET)
    public Map<String,Object> getQuestionsByAuthor(@RequestParam(value="author",defaultValue = "null") String author){
        Map<String,Object> listQuestion2 = new HashMap<String,Object>();
        List<Question> questions = questionService.getQuestionsByAuthor(author);

        Iterator<Question> iter = questions.iterator();
        while (iter.hasNext()){
            Question thisquestion = iter.next();
            List<Answer> answers = answerService.getAnswersByQuestionId(thisquestion.getId().toString());
            thisquestion.setAnswers(answers);
        }

        listQuestion2.put("questionlist",questions);
        return listQuestion2;
    }

    @RequestMapping(value = "/getquestionsbyopenid",method = RequestMethod.GET)
    public Map<String,Object> getQuestionsByOpenid(QuestionPage questionPage){
        Map<String,Object> listQuestion2 = new HashMap<String,Object>();
        List<Question> questions = questionService.getQuestionsByOpenid(questionPage);

        Iterator<Question> iter = questions.iterator();
        while (iter.hasNext()){
            Question thisquestion = iter.next();
            List<Answer> answers = answerService.getAnswersByQuestionId(thisquestion.getId().toString());
            thisquestion.setAnswers(answers);
        }

        listQuestion2.put("questionlist",questions);
        return listQuestion2;
    }

    @RequestMapping(value = "/getquestionsbycourse",method = RequestMethod.GET)
    public Map<String,Object> getQuestionsByCourse(CoursePage coursePage){

        System.out.println(coursePage.getName() + "-->" + coursePage.getPage());
        try {
            String name = coursePage.getName();
            name = URLDecoder.decode(name, "UTF-8");
            coursePage.setName(name);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        Map<String,Object> listQuestion2 = new HashMap<String,Object>();
        List<Question> questions = questionService.getQuestionsByCourse(coursePage);

        Iterator<Question> iter = questions.iterator();
        while (iter.hasNext()){
            Question thisquestion = iter.next();
            List<Answer> answers = answerService.getAnswersByQuestionId(thisquestion.getId().toString());
            thisquestion.setAnswers(answers);
        }

        listQuestion2.put("questionlist",questions);
        return listQuestion2;
    }

    @RequestMapping(value = "/getquestionbytopic",method = RequestMethod.GET)
    public Question getQuestionByTopic(@RequestParam(value="topic",defaultValue = "null") String topic){
        Question question = questionService.getQuestionByTopic(topic);
        return  question;
    }

    @RequestMapping(value = "/searchquestion",method = RequestMethod.GET)
    public Map<String,Object> searchQuestion(@RequestParam(value="index",defaultValue = "null") String index){
        try {
            index = URLDecoder.decode(index, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Map<String,Object> questionmap = new HashMap<String,Object>();
        List<Question> searchquestion = questionService.getSearch(index);
        questionmap.put("questions",searchquestion);
        return  questionmap;
    }

    @RequestMapping(value = "/getrandomquestion",method = RequestMethod.GET)
    public Map<String,Object> RandomQuestion(@RequestParam(value="openid",defaultValue = "null") String openid){
        Map<String,Object> questionmap = new HashMap<String,Object>();
        List<Question> questions = questionService.getRandom();

        Boolean hasadministor = false;

        List<String> administor = new LinkedList<String>();
        administor.add("oyUd75XZF0bBq3vCkSfo4an7hxNs");

        Iterator<String> itor = administor.iterator();
        while (itor.hasNext()){
            if(itor.next().equals(openid)) hasadministor = true;
        }

        questionmap.put("questions",questions);

        return questionmap;
    }
}
