package com.nari.sysman.util;


import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;

public class SwitchMessageForm {

	/**
	 *  List转化Xml
	 * @param lst
	 * @return
	 */
	public static String switchListToXml(List<Map<String, String>> lst) {
		//头节点
		Element eleRoot = new Element("PARA");
		Document doc = new Document(eleRoot);
		
		for (int i = 0; i < lst.size(); i++) {
			Map<String, String> m = (Map<String, String>)lst.get(i);
			//节点
			Element eleRow = new Element("CONSSET");
			for (Map.Entry<String, String> me : m.entrySet()) {
				Element e = new Element(me.getKey());
				e.setText(me.getValue());

				//添加子元素
				eleRow.addContent(e);
			}
			//添加节点
			eleRoot.addContent(eleRow);
		}

		// 转换为字符串
		XMLOutputter outputter = new XMLOutputter();
		String xml = outputter.outputString(doc);
		System.out.println(xml);
		//返回
		return xml;
	}
	
	/**
	 * 恒卓 Xml 转化 List
	 * @param lst
	 * @return
	 */
	public static List<Map<String, String>> switchXmlToList(String xml) {
		
		Document doc = null ;
		SAXBuilder sb = new SAXBuilder() ;
		List<Map<String, String>> lstRtn = new ArrayList<Map<String, String>>();
		
		try {
			//转化doc
			 doc = sb.build(new StringReader(xml));	
		} catch (JDOMException e) {
	       // ExceptionHandle.handleUnCheckedException(e);
        	return null ;
        } catch (IOException e) {
	        //ExceptionHandle.handleUnCheckedException(e);
        	return null ;
        }
        //取得根节点
        Element eleRoot = doc.getRootElement();
        
        //取得子节点
        if ("DATA".equals(eleRoot.getName())) {
        	List<Element> lsOfRow = eleRoot.getChildren() ;
        	for (Element eRow :  lsOfRow) {
        		//consset

    		List<Element> ls = eRow.getChildren();
        		Map<String, String> map = new HashMap<String, String>();
        		
        		for (Element e : ls) {
        			System.out.println(e.getName());
        			map.put(e.getName(), e.getText());
        		}
        		//压入list
        		lstRtn.add(map);
        	}
        }
        //压入list
		return lstRtn;
	}
}

