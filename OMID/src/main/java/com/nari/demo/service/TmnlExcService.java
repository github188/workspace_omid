package com.nari.demo.service;

import com.nari.common.pagination.Page;
import com.nari.common.service.IBaseService;
import com.nari.demo.model.TmnlExcModel;
import com.nari.demo.model.UserModel;
import com.nari.demo.model.UserQueryModel;


/**
 */
public interface TmnlExcService extends IBaseService<TmnlExcModel, Integer> {

    Page<TmnlExcModel> query(int pn, int pageSize, TmnlExcModel command);
}
