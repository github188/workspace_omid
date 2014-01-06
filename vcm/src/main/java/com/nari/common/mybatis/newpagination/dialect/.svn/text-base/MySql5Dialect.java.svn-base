package com.nari.common.mybatis.newpagination.dialect;

public class MySql5Dialect extends Dialect{
	
	protected static final String SQL_END_DELIMITER = ";";
	
	public String getLimitString(String sql, boolean hasOffset) {
		return MySql5PageHelper.getLimitString(sql,-1,-1);
	}

	public String getLimitString(String sql, int offset, int limit) {
		return MySql5PageHelper.getLimitString(sql, offset, limit);
	}

	public boolean supportsLimit() {
		return true;
	}
}