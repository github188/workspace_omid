package com.nari.common.mybatis.pagination;

import java.sql.Statement;
import java.util.List;
import java.util.Properties;

import org.apache.ibatis.executor.resultset.ResultSetHandler;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

@Intercepts({ @Signature(type = ResultSetHandler.class, method = "handleResultSets", args = { Statement.class }) })
public class ResultSetInterceptor implements Interceptor {

	@Override
	public Object intercept(Invocation invocation) throws Throwable {Object obj = invocation.proceed();

	Page p = PageInterceptor.getPage();
	if (p != null) {
		p.setResult((List) obj);
		return p;
	}

	return obj;}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties arg0) {

	}

}
