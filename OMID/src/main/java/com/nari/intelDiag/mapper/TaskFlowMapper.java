package com.nari.intelDiag.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.nari.common.mybatis.pagination.Page;
import com.nari.common.mybatis.pagination.PageInterceptor;

public interface TaskFlowMapper {
	
	
    Page<Map<String,Object>> queryTaskFlow(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlNoFile(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
    
    List<Map<String,Object>> queryEleAbnormalTotalList(@Param("map")Map<String,String> map);
    
    Page<Map<String,Object>> queryAbnormal(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlCheckClock(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlParam(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlMsgLog(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlEvent(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryMpCurve(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlCopyFailure(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);

    Page<Map<String,Object>> queryTmnlStop(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map queryItems);

    List queryTmnlChangData(@Param("map")Map queryItems);
    
    List queryP(@Param("map")Map param);

    List queryDayRead(@Param("map")Map param);

    List queryEnergy(@Param("map")Map param);

    List queryTmnlType();
    
    public List<Map<String,Object>> queryFileTotalList(@Param("map")Map<String,String> map);
	
    Page<Map<String,Object>> queryAlarmAnalyseHisInfo(@Param(PageInterceptor.PAGE_KEY) Page<Map<String,Object>> p,@Param("map")Map<String,String> queryItems);
}
