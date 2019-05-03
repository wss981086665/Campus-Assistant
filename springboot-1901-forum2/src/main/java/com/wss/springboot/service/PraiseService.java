package com.wss.springboot.service;

import com.wss.springboot.bean.Answer;
import com.wss.springboot.bean.Forumuser;
import com.wss.springboot.bean.Praise;
import com.wss.springboot.bean.Question;
import com.wss.springboot.dao.PraiseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

@Service
public class PraiseService {

    @Autowired
    PraiseMapper praiseMapper;

    public String getQuestionid(String questionid,String openid){
        List<Praise> praise = praiseMapper.getPraiseByOpenid(openid);
        String index = "no";
        Iterator<Praise> iter = praise.iterator();
        while (iter.hasNext()){
            if(iter.next().getQuestionid().equals(questionid)){
                index = "yes";
            };
        }
        return index;
    }

    public List<String> getPraiser(String questionid){
        List<Praise> praise = praiseMapper.getPraiseByQuestionid(questionid);
        Iterator<Praise> iter = praise.iterator();

        List<String> praiser = new LinkedList<String>();
        while (iter.hasNext()){
            praiser.add(iter.next().getNickName());
        }
        return praiser;
    }

    public void insert(Praise praise){
        praiseMapper.insertPraise(praise);
    }

}
