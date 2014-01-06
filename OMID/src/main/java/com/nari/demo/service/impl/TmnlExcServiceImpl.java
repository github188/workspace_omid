package com.nari.demo.service.impl;

import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Service;

import com.nari.common.dao.IBaseDao;
import com.nari.common.pagination.Page;
import com.nari.common.pagination.PageUtil;
import com.nari.demo.dao.TmnlExcDao;
import com.nari.demo.dao.UserDao;
import com.nari.demo.model.TmnlExcModel;
import com.nari.demo.model.UserModel;
import com.nari.demo.model.UserQueryModel;
import com.nari.demo.service.TmnlExcService;
import com.nari.demo.service.UserService;

import com.nari.common.service.impl.BaseService;
/**
 */

@Service("TmnlExcService")
public class TmnlExcServiceImpl extends BaseService<TmnlExcModel, Integer> implements TmnlExcService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private TmnlExcDao tmnlExcDao;

    @Autowired
    @Qualifier("TmnlExcDao")
    @Override
    public void setBaseDao(IBaseDao<TmnlExcModel, Integer> tmnlExcDao) {
        this.baseDao = tmnlExcDao;
        this.tmnlExcDao = (TmnlExcDao) tmnlExcDao;
    }
    


    @Override
    public Page<TmnlExcModel> query(int pn, int pageSize, TmnlExcModel command) {
        return PageUtil.getPage(tmnlExcDao.countQuery(command) ,pn, tmnlExcDao.query(pn, pageSize, command), pageSize);
    }

}