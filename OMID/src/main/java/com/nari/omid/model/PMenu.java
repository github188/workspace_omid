package com.nari.omid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.nari.common.model.AbstractModel;

@Entity
@Table(name="p_menu")
public class PMenu extends AbstractModel{
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "menu_no", nullable = false)
	private String menuNo;
	@Column(name="title",length=256)
	private String title;
	@Column(name="p_menu_no",length=16)
	private String pMenuNo;
	@Column(name="menu_folder_flag",length=8)
	private String menuFolderFlag;
	@Column(name="handle_sort",length=8)
	private String handleSort;
	@Column(name="icon_name",length=100)
	private String iconName;
	@Column(name="url",length=500)
	private String url;
	@Column(name="para",length=256)
	private String para;
	@Column(name="sort_no",precision=8)
	private int sortNo;
	@Column(name="right_menu_flag",precision=2,scale=0)
	private int rightMenuFlag;
	@Column(name="sys_no",precision=2)
	private int sysNo;
	@Column(name="remark",length=500)
	private String remark;
	@Column(name="is_open_tree",precision=1,scale=1)
	private int isOpenTree;
	@Column(name="is_valid",precision=1,scale=1)
	private int isValid;
	public String getMenuNo() {
		return menuNo;
	}
	public void setMenuNo(String menuNo) {
		this.menuNo = menuNo;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getpMenuNo() {
		return pMenuNo;
	}
	public void setpMenuNo(String pMenuNo) {
		this.pMenuNo = pMenuNo;
	}
	public String getMenuFolderFlag() {
		return menuFolderFlag;
	}
	public void setMenuFolderFlag(String menuFolderFlag) {
		this.menuFolderFlag = menuFolderFlag;
	}
	public String getHandleSort() {
		return handleSort;
	}
	public void setHandleSort(String handleSort) {
		this.handleSort = handleSort;
	}
	public String getIconName() {
		return iconName;
	}
	public void setIconName(String iconName) {
		this.iconName = iconName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getPara() {
		return para;
	}
	public void setPara(String para) {
		this.para = para;
	}
	public int getSortNo() {
		return sortNo;
	}
	public void setSortNo(int sortNo) {
		this.sortNo = sortNo;
	}
	public int getRightMenuFlag() {
		return rightMenuFlag;
	}
	public void setRightMenuFlag(int rightMenuFlag) {
		this.rightMenuFlag = rightMenuFlag;
	}
	public int getSysNo() {
		return sysNo;
	}
	public void setSysNo(int sysNo) {
		this.sysNo = sysNo;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public int getIsOpenTree() {
		return isOpenTree;
	}
	public void setIsOpenTree(int isOpenTree) {
		this.isOpenTree = isOpenTree;
	}
	public int getIsValid() {
		return isValid;
	}
	public void setIsValid(int isValid) {
		this.isValid = isValid;
	}
}
