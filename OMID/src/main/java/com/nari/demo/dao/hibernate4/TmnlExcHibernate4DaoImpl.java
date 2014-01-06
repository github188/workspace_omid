package com.nari.demo.dao.hibernate4;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.nari.demo.dao.TmnlExcDao;
import com.nari.demo.dao.UserDao;
import com.nari.demo.model.TmnlExcModel;
import com.nari.demo.model.UserModel;
import com.nari.demo.model.UserQueryModel;

import com.nari.common.dao.hibernate4.BaseHibernateDao;
/**
 */
@Repository("TmnlExcDao")
public class TmnlExcHibernate4DaoImpl extends BaseHibernateDao<TmnlExcModel, Integer> implements TmnlExcDao {

    private static final String HQL_LIST = "from TmnlExcModel ";
    private static final String HQL_COUNT = "select count(1) from TmnlExcModel ";

    private static final String HQL_LIST_QUERY_CONDITION = " where org_no like ?";
    private static final String HQL_LIST_QUERY_ALL = HQL_LIST + HQL_LIST_QUERY_CONDITION + "order by stat_id desc";
    private static final String HQL_COUNT_QUERY_ALL = HQL_COUNT + HQL_LIST_QUERY_CONDITION;

    @Override
    public List<TmnlExcModel> query(int pn, int pageSize, TmnlExcModel command) {
        return list(HQL_LIST_QUERY_ALL, pn, pageSize, getQueryParam(command));
    }

    @Override
    public int countQuery(TmnlExcModel command) {
        return this.<Number>aggregate(HQL_COUNT_QUERY_ALL, getQueryParam(command)).intValue();
    }
    

    private Object[] getQueryParam(TmnlExcModel command) {
        //TODO 改成全文索引
        String usernameLikeStr = "%" + command.getOrg_no() + "%";
        return new Object[]{
            usernameLikeStr
        };
    }

}
