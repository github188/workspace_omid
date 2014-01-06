package com.nari.sysman.service;

import java.util.List;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.test.BaseServiceHibernateTest;
import com.nari.common.util.FormatTreeData;
import com.nari.common.util.TreeNode;
import com.nari.omid.model.PMenu;

public class PMenuServiceTest extends BaseServiceHibernateTest{
	@Autowired
	private PMenuService pMenuService;
	
	@Test
	public void testListAll(){
		List<PMenu> list = pMenuService.listAll();
		
		FormatTreeData ftd = new FormatTreeData();
		List<TreeNode> treeNodeList = ftd.TreeDataFromPMenu("30000", list);
		System.out.println(treeNodeList.size());
	}
}
