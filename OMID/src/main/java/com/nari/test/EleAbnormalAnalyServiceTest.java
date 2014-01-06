package com.nari.test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.nari.intelDiag.service.EleAbnormalAnalyService;



@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-config.xml" })
public class EleAbnormalAnalyServiceTest {
	
	@Autowired
	private EleAbnormalAnalyService eleAbnormalAnalyService;

	@Test
	public void testGetOrgNo(){
		List list = eleAbnormalAnalyService.getOrgNo("15404");
		System.out.println("11111111111"+list.size());
	}
	@Test
	public void testGetEventLevelList(){
		List list = eleAbnormalAnalyService.getEventLevelList();
	
	}
	@Test
	public void getEleAbnormalTotalList(){
		Map m = new HashMap();
		m.put("username","zhang");
		m.put("password", "123456");
		List list = eleAbnormalAnalyService.queryEleAbnormalTotalList(m);
		System.out.println("33333"+list.size());
	}
}
