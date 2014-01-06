package com.nari.omid.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.dao.mybatis.BaseMapper;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;


public interface MeasAnCountMapper extends BaseMapper<Map>{
	/**
	 * 按台区统计异常信息
	 * @return
	 */
	public Page<Map<String,Object>> queryMeas(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String> map);
	/**
	 * 查询运行状态标志
	 * @return
	 */
	public List<Map<String,Object>>queryStatusCode();
	/**
	 * 查询专公变标志
	 * @return
	 */
	public List<Map<String,Object>>queryTgCode();
	/**
	 * 根据条件查询OrgNO
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryTgOrgNo(Map<String, String> map);
	/**
	 * 根据TgId查寻图形信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryTgInfo(Map<String,String> map);
	/**
	 * 根据台区,供电单位,日期进行统计
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>querTgTotal(Map<String,String> map);
	/**
	 * 查询线路异常信息
	 * @param map
	 * @return
	 */
	public Page<Map<String,Object>>queryLineInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> map);
	/**
	 * 查询变电站名称...主线路信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>querySubs(Map<String,String> map); 
	/**
	 * 辅线路信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryAsLine(Map<String,String>map);
	/**
	 * 主线路信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryMainAsLine(Map<String,String>map);
	/**
	 * 用户类型统计
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryConsNum(Map<String,String>map);
	/**
	 * 辅线路信息
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> ueryAsLine(Map<String,String> map);
	/**
	 * 查询是否为主线路
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryLineId(Map<String,String> map);
	/**
	 * 线损率统计查询
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryLineLL(Map<String,String> map);
	/**
	 * 台区异常信息明细
	 * @param p
	 * @param map
	 * @return
	 */
	public Page<Map<String,Object>> tgDetailInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String> map);
	/**
	 * 线路异常信息明细
	 * @param p
	 * @param map
	 * @return
	 */
	public Page<Map<String,Object>> lineDetailInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String> map);
	 public Page<Map<String,Object>> lineAsDetailInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String, String> map);
}
