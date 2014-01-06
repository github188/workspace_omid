package com.nari.demo.service;

import com.nari.common.pagination.Page;
import com.nari.common.service.IBaseService;
import com.nari.demo.model.UserModel;
import com.nari.demo.model.UserQueryModel;


/**
 */
public interface UserService extends IBaseService<UserModel, Integer> {

    Page<UserModel> query(int pn, int pageSize, UserQueryModel command);
    
}
