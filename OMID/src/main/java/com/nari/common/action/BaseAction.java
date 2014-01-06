package com.nari.common.action;

import java.lang.reflect.Method;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;

import com.nari.omid.model.PSysUser;
import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport{
	
	public boolean success = true;
	
	private String rootProperty;
	private String cm;
	private String dataMethod;
	private String cmDataIndex;
	private String cmDataType;
	private String excelFileName;
	
	private String exportContent;
	
	/**
	 * 导出excel
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public String exportExcel() throws Exception {
		Method method = this.getClass().getMethod(this.dataMethod, null);
		String rtn = (String) method.invoke(this, null);
		Object property = this.invokeMethod(this, this.rootProperty);
		String xml = this.genXmlData(property, this.cmDataType,	this.cmDataIndex);
		String result = this.cm.replace("gridStoreData", xml).replace("rowCountToreplace", ((List) property).size() + 3 + "");
		
		if(excelFileName == null || excelFileName.equals("")){
			excelFileName = "export";
		}else{
			excelFileName = new String(excelFileName.getBytes("GB2312"), "ISO_8859_1"); 
		}
		
		this.getResponse().setHeader("Content-Type","application/force-download");
		this.getResponse().setHeader("Content-Type", "application/vnd.ms-excel");
		this.getResponse().setHeader("Content-Disposition","attachment;filename="+excelFileName+".xls");
		this.getResponse().getOutputStream().write(result.getBytes("UTF-8"));
		return null;
	}
	
	public String genXmlData(Object property, String cmDataType,
			String cmDataIndex) throws Exception {
		String[] dataType = cmDataType.split(",");
		String[] dataIndex = cmDataIndex.split(",");
		StringBuffer sb = new StringBuffer();
		List list = (List) property;
		for (int i = 0; i < list.size(); i++) {
			sb.append("<ss:Row>");
			String cellClass = null;
			if (i % 2 == 0)
				cellClass = "even";
			else
				cellClass = "odd";
			String cellClassType = cellClass;
			for (int j = 0; j < dataType.length; j++) {
				if (dataType[j].equals("Number")) {
					cellClass = cellClassType + "float";;
				}
				sb.append("<ss:Cell ss:StyleID=\"");
				sb.append(cellClass);
				sb.append("\"><ss:Data ss:Type=\"");
				sb.append(dataType[j] + "\">");
				Object object = null;
				try {
					object = this.invokeMethod(list.get(i), dataIndex[j]);
				} catch (Exception e) {
					object = null;
				}
				if (dataType[j].equals("DateTime")) {
					Format format = new SimpleDateFormat("yyyy-MM-dd");
					sb.append(format.format((Date) object));
				}else if (dataType[j].equals("Number")) {
					if(object == null)
						object = 0;
					sb.append(Double.parseDouble(object.toString()));
				}else{
					object=(object+"").replaceAll("<", "【");
					object=(object+"").replaceAll(">", "】");
					if(object == null || object.equals("null")){
						object = "";
					}
					sb.append(object);
				}
				sb.append("</ss:Data></ss:Cell>");
			}
			sb.append("</ss:Row>");
		}
		return sb.toString();
	}

	@SuppressWarnings("unchecked")
	private Object invokeMethod(Object object, String methodName)throws Exception{
		if(object instanceof Map){
			Map m=(Map) object;
			return m.get(methodName);
		}
		Class ownerClass = object.getClass();
		String mName = "get" + methodName.substring(0, 1).toUpperCase()+ methodName.substring(1);
		Method method = ownerClass.getMethod(mName, null);
		Object rtn = method.invoke(object, null);

		return rtn;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
	public HttpServletResponse getResponse(){
		return ServletActionContext.getResponse();
	}
	
	public HttpServletRequest getRequest() {
		return ServletActionContext.getRequest();
	}
	
	public HttpSession getSession() {
		return this.getRequest().getSession();
	}
	public PSysUser getPSysUser(){
		return (PSysUser) this.getSession().getAttribute("pSysUser");
	}

	public String getRootProperty() {
		return rootProperty;
	}

	public void setRootProperty(String rootProperty) {
		this.rootProperty = rootProperty;
	}

	public String getCm() {
		return cm;
	}

	public void setCm(String cm) {
		this.cm = cm;
	}

	public String getDataMethod() {
		return dataMethod;
	}

	public void setDataMethod(String dataMethod) {
		this.dataMethod = dataMethod;
	}

	public String getCmDataIndex() {
		return cmDataIndex;
	}

	public void setCmDataIndex(String cmDataIndex) {
		this.cmDataIndex = cmDataIndex;
	}

	public String getCmDataType() {
		return cmDataType;
	}

	public void setCmDataType(String cmDataType) {
		this.cmDataType = cmDataType;
	}

	public String getExcelFileName() {
		return excelFileName;
	}

	public void setExcelFileName(String excelFileName) {
		this.excelFileName = excelFileName;
	}

	public String getExportContent() {
		return exportContent;
	}

	public void setExportContent(String exportContent) {
		this.exportContent = exportContent;
	}
}
