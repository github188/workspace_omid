package com.nari.measancount.service;

import java.util.List;
import java.util.Map;

import com.nari.common.mybatis.pagination.Page;

public interface MeasAncountService {
	
	public Page<Map<String,Object>> queryMeas(Page<Map<String,Object>> p,Map<String, String> map);
	
	/**
	 * @author user 李建久
	 * @return
	 */
	public List<Map<String,Object>> queryStatusCode();
	/**
	 * @author user 李建久
	 * @return
	 */
	public List<Map<String,Object>> queryTgCode();
	/**
	 * @author user 李建久
	 * @return
	 */
	public List<Map<String,Object>> queryTgOrgNo(Map<String,String> map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryTgInfo(Map<String,String> map);

	public List<Map<String,Object>> querTgTotal(Map<String,String> map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public Page<Map<String,Object>> queryLineInfo(Page<Map<String,Object>> p,Map<String,String> map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>querySubs(Map<String,String> map); 
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryAsLine(Map<String,String>map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryMainAsLine(Map<String,String>map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>>queryConsNum(Map<String,String>map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryLineId(Map<String,String> map);
	/**
	 * @author user 李建久
	 * @param map
	 * @return
	 */
	public List<Map<String,Object>> queryLineLL(Map<String,String> map);
	
	public Page<Map<String,Object>> tgDetailInfo(Page<Map<String,Object>> p,Map<String, String> map);
	
	public Page<Map<String,Object>> lineDetailInfo(Page<Map<String,Object>> p,Map<String, String> map);
	public Page<Map<String,Object>> lineAsDetailInfo(Page<Map<String,Object>> p,Map<String, String> map);
}
