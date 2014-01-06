package com.nari.sysman.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.util.TreeNode;
import com.nari.sysman.model.PMenu;
import com.nari.sysman.service.PMenuService;


@ParentPackage("baseJson")
@Action("pMenuAction")
@Results({@Result(name="success",type="json")})
public class PMenuAction extends BaseAction {
	
	@Autowired
	private PMenuService pMenuService;
	
	private List<TreeNode> intelDiagTreeNode; //智能诊断菜单
	private List<TreeNode> onlineMoniTreeNode; //在线监测菜单
	private List<TreeNode> exceHandTreeNode; //异常处理菜单
	private List<TreeNode> statQueryTreeNode; //统计查询菜单
	private List<TreeNode> systManaTreeNode; //系统管理菜单
	
	/**
	 * 生成菜单
	 */
	public String execute(){
		//List<PMenu> treeNodeList = pMenuService.listAll();
		List<PMenu> treeNodeList = pMenuService.getPMenuByIsValid();
		
		intelDiagTreeNode = TreeDataFromPMenu("20000", treeNodeList);
		onlineMoniTreeNode = TreeDataFromPMenu("30000", treeNodeList);
		exceHandTreeNode = TreeDataFromPMenu("40000", treeNodeList);
		statQueryTreeNode = TreeDataFromPMenu("50000", treeNodeList);
		systManaTreeNode = TreeDataFromPMenu("60000", treeNodeList);
		
		return SUCCESS;
	}
	
	/**
	 * PMenu转换成TreeNode
	 * @param menuNo
	 * @param list
	 * @return
	 */
	private List<TreeNode> TreeDataFromPMenu(String menuNo,List<PMenu> list){
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

	public List<TreeNode> getIntelDiagTreeNode() {
		return intelDiagTreeNode;
	}

	public void setIntelDiagTreeNode(List<TreeNode> intelDiagTreeNode) {
		this.intelDiagTreeNode = intelDiagTreeNode;
	}

	public List<TreeNode> getOnlineMoniTreeNode() {
		return onlineMoniTreeNode;
	}

	public void setOnlineMoniTreeNode(List<TreeNode> onlineMoniTreeNode) {
		this.onlineMoniTreeNode = onlineMoniTreeNode;
	}

	public List<TreeNode> getExceHandTreeNode() {
		return exceHandTreeNode;
	}

	public void setExceHandTreeNode(List<TreeNode> exceHandTreeNode) {
		this.exceHandTreeNode = exceHandTreeNode;
	}

	public List<TreeNode> getStatQueryTreeNode() {
		return statQueryTreeNode;
	}

	public void setStatQueryTreeNode(List<TreeNode> statQueryTreeNode) {
		this.statQueryTreeNode = statQueryTreeNode;
	}

	public List<TreeNode> getSystManaTreeNode() {
		return systManaTreeNode;
	}

	public void setSystManaTreeNode(List<TreeNode> systManaTreeNode) {
		this.systManaTreeNode = systManaTreeNode;
	}
	
}
