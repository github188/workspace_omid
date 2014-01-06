package com.nari.demo.dao;

import java.util.List;


import com.nari.common.dao.IBaseDao;
import com.nari.demo.model.TmnlExcModel;
import com.nari.demo.model.UserModel;



public interface TmnlExcDao extends IBaseDao<TmnlExcModel, Integer> {
    
    List<TmnlExcModel> query(int pn, int pageSize, TmnlExcModel command);

    int countQuery(TmnlExcModel command);

}
