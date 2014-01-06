package com.nari.common.util;

import java.util.ArrayList;
import java.util.List;

import com.nari.omid.model.PMenu;

public class FormatTreeData {

	public List<TreeNode> TreeDataFromPMenu(String menuNo,List<PMenu> list){
		List<TreeNode> rtnList = new ArrayList<TreeNode>();
		for(int i = 0 ; i < list.size(); i++){
			if(list.get(i).getpMenuNo().equals(menuNo)){
				TreeNode treeNode = new TreeNode();
				treeNode.setId(list.get(i).getMenuNo());
				treeNode.setText(list.get(i).getTitle());
				treeNode.setLeaf(list.get(i).getMenuFolderFlag().equals("1")?false:true);
				treeNode.setIconCls(list.get(i).getIconName());
				treeNode.setAttributes(list.get(i));
				rtnList.add(treeNode);
			}
		}
		
		return rtnList ;
	}
}
