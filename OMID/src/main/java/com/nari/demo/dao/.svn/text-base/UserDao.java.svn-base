package com.nari.demo.dao;

import java.util.List;

import com.nari.common.dao.IBaseDao;
import com.nari.demo.model.UserModel;
import com.nari.demo.model.UserQueryModel;



public interface UserDao extends IBaseDao<UserModel, Integer> {
    
    List<UserModel> query(int pn, int pageSize, UserQueryModel command);

    int countQuery(UserQueryModel command);

}
