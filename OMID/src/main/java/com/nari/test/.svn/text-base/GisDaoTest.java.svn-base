package com.nari.test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;



import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nari.common.mybatis.pagination.Page;
import com.nari.gis.service.GisService;
import com.nari.omid.mapper.GisMapper;




@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-config.xml" })
public class GisDaoTest {
	
	@Autowired
	private GisService gisService;
	
	@Autowired
	private GisMapper gisMapper;
	

	@Test
	public void testqueryCp(){
		Map test=new HashMap();
		test.put("org_no","world");
		
		Page<Map<String,Object>> p = new Page<Map<String,Object>>();
		
		p.setCurrentPage(1);
		p.setSize(20);
		
		gisService.queryCp(test,p);
		
		List list = p.getResult();
		System.out.println(list.size());
		
		for(Iterator i =list.iterator() ; i.hasNext();){
			Map temp = (HashMap)i.next();
			System.out.println(temp.get("CP_NO"));
		}
	}
	
	@Test
	public void testUpdateCpGPS(){
		Map test = new HashMap();
		test.put("cp_no", "888");
		test.put("gps_latitude", 211);
		test.put("gps_longitude", 14);
		
		gisService.updateCpGPS(test);
		
		
	}
	
	@Test
	public void queryEventCode(){
		Map test = new HashMap();
		test.put("event_no", "01");

		
		gisService.queryEventCode(test);
		
		
	}
	
	@Test
	public void queryGisStyleColor(){
		System.out.println( gisMapper.queryGisStyleColor().size()); 
	}
	

}
