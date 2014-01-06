package com.nari.common.util;


import java.io.IOException;
import java.io.StringReader;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * XML与Map互转
 */
public class XMLSwitchUtil {
	private static Logger log = LoggerFactory.getLogger(XMLSwitchUtil.class);

	/**
	 * 将营销传递的指定格式的XML转换为Map
	 * 
	 * @param xml
	 * @param map
	 * @return 0 : 正常转换 -1 : 传入的xml为空 -2 : JDOMException -3 : IOException -4 : xml中根节点不是按约定格式
	 */
	public static int switchInputXmlToMap(String xml, Map<String, Object> map) {

		if ((xml == null) || (xml.trim().length() == 0)) {
			return -1;
		}

		SAXBuilder sb = new SAXBuilder();
		Document doc = null;

		try {
			doc = sb.build(new StringReader(xml));

		} catch (JDOMException e) {
			e.printStackTrace();
			return -2;
		} catch (IOException e) {
			e.printStackTrace();
			return -3;
		}
		Element rootElement = doc.getRootElement();

		if (rootElement.getName().compareTo("dataset") == 0) {
			Element datastoreElement = rootElement.getChild("datastores").getChild("datastore");
			// 取节点COLUMN
			Element metadataElement = datastoreElement.getChild("metadata");
			List<?> metadataList = metadataElement.getChildren();
			Iterator<?> metadataListIterator = metadataList.iterator();
			int i = 0;
			while (metadataListIterator.hasNext()) {
				Element childMetadataElement = (Element) metadataListIterator.next();
				String key = childMetadataElement.getAttributeValue("name");
				if (key == null) {
					continue;
				}
				i++;
				// 取节点ROW
				Element rowElement = datastoreElement.getChild("rowset").getChild("row");
				List<?> rowList = rowElement.getChildren();
				Iterator<?> rowListIterator = rowList.iterator();
				int j = 0;
				while (rowListIterator.hasNext()) {
					Element childRowElement = (Element) rowListIterator.next();
					String value = childRowElement.getText();
					// 将取到的<COL>节点的内容存入map
					j++;
					if (i == j) {
						map.put(key, value);
					}
				}
			}

		} else {// 根节点不是按约定格式的<dataset>
			return -4;
		}

		return 0;
	}

	/**
	 * 将Map转换为指定格式的XML返回营销
	 * 
	 * @param map
	 * @return
	 */
	public static String switchOutputMapToXml(Map<?, ?> map) {
		String xml = null;
		Document doc = null;

		Element rootElement = new Element("dataset");
		doc = new Document(rootElement);
		if (map != null && map.size() > 0) {
			// 有结果
			Element parametersElement = new Element("parameters");
			Set<?> set = map.keySet();
			Iterator<?> it = set.iterator();
			while (it.hasNext()) {
				// 取map中的一项，取到key和value
				String key = (String) it.next();
				String value = map.get(key) == null ? "" : (String) map.get(key);
				// 将key和value组合成xml中的节点<COL>
				Element parameterElement = new Element("parameter");
				parameterElement.setAttribute(new Attribute("name", key));
				parameterElement.setText(value);

				parametersElement.addContent(parameterElement);
			}
			rootElement.addContent(parametersElement);

		}

		// 转换为字符串
		XMLOutputter outputter = new XMLOutputter();
		xml = outputter.outputString(doc);
		return xml;
	}

	/**
	 * 将Map转换为指定格式的XML,用于调用营销服务 <?xmlversion="1.0"encoding="UTF-8"?> <dataset> <parameters> </parameters> <datastores> <datastore name="feectrl/zc_send_notice"> <metadata> <column
	 * name="APP_NO" type="VARCHAR"/> <column name="DATA_SRC" type="VARCHAR"/> <column name=" CREATE_DATE " type="VARCHAR"/> </metadata> <rowset> <row> <column>11111</column>
	 * <column>C</column> <column>2011-03-09 12:00:01</column> </row> </rowset> </datastore> </datastores> </dataset>
	 * 
	 */
	public static String switchInputMapToXml(Map<?, ?> map) {
		String xml = null;
		Document doc = null;

		Element rootElement = new Element("dataset");
		doc = new Document(rootElement);
		Element parametersElement = new Element("parameters");
		rootElement.addContent(parametersElement);
		Element datastoresElement = new Element("datastores");

		if (map != null && map.size() > 0) {
			// 有结果
			Element datastoreElement = new Element("datastore");
			datastoreElement.setAttribute(new Attribute("name", "zc_send_notice"));
			Element metadataElement = new Element("metadata");
			Element rowsetElement = new Element("rowset");
			Element rowElement = new Element("row");

			Set<?> set = map.keySet();
			Iterator<?> it = set.iterator();
			while (it.hasNext()) {
				// 取map中的一项，取到key和value
				String key = (String) it.next();
				String value = map.get(key) == null ? "" : (String) map.get(key);
				Element metadataColumnElement = new Element("column");
				metadataColumnElement.setAttribute(new Attribute("name", key));
				metadataColumnElement.setAttribute(new Attribute("type", "VARCHAR"));
				metadataElement.addContent(metadataColumnElement);

				Element rowColumnElement = new Element("column");
				rowColumnElement.setText(value);
				rowElement.addContent(rowColumnElement);

			}
			rowsetElement.addContent(rowElement);
			datastoreElement.addContent(metadataElement);
			datastoreElement.addContent(rowsetElement);
			datastoresElement.addContent(datastoreElement);

		}
		rootElement.addContent(datastoresElement);
		// 转换为字符串
		XMLOutputter outputter = new XMLOutputter();
		xml = outputter.outputString(doc);
		return xml;
	}
	
	/**
	 * 将Map转换为指定格式的XML,用于调用营销服务 <?xmlversion="1.0"encoding="UTF-8"?> <dataset> <parameters> </parameters> <datastores> <datastore name="feectrl/zc_send_notice"> <metadata> <column
	 * name="APP_NO" type="VARCHAR"/> <column name="DATA_SRC" type="VARCHAR"/> <column name=" CREATE_DATE " type="VARCHAR"/> </metadata> <rowset> <row> <column>11111</column>
	 * <column>C</column> <column>2011-03-09 12:00:01</column> </row> </rowset> </datastore> </datastores> </dataset>
	 * 
	 */
	public static String switchInputMapToXml_omid(Map<?, ?> map) {
		String xml = null;
		Document doc = null;

		Element rootElement = new Element("dataset");
		doc = new Document(rootElement);
		Element parametersElement = new Element("parameters");
		rootElement.addContent(parametersElement);
		Element datastoresElement = new Element("datastores");

		if (map != null && map.size() > 0) {
			// 有结果
			Element datastoreElement = new Element("datastore");
			datastoreElement.setAttribute(new Attribute("name", "task_info"));
			Element metadataElement = new Element("metadata");
			Element rowsetElement = new Element("rowset");
			Element rowElement = new Element("row");

			Set<?> set = map.keySet();
			Iterator<?> it = set.iterator();
			while (it.hasNext()) {
				// 取map中的一项，取到key和value
				String key = (String) it.next();
				String value = map.get(key) == null ? "" : (String) map.get(key);
				Element metadataColumnElement = new Element("column");
				metadataColumnElement.setAttribute(new Attribute("name", key));
				metadataColumnElement.setAttribute(new Attribute("type", "VARCHAR"));
				metadataElement.addContent(metadataColumnElement);

				Element rowColumnElement = new Element("column");
				rowColumnElement.setText(value);
				rowElement.addContent(rowColumnElement);

			}
			rowsetElement.addContent(rowElement);
			datastoreElement.addContent(metadataElement);
			datastoreElement.addContent(rowsetElement);
			datastoresElement.addContent(datastoreElement);

		}
		rootElement.addContent(datastoresElement);
		// 转换为字符串
		XMLOutputter outputter = new XMLOutputter();
		xml = outputter.outputString(doc);
		return xml;
	}

	/**
	 * 将营销返回的指定格式的XML转换为Map
	 * 
	 * @param xml
	 * @param map
	 * @return
	 */

	public static int switchOutputXmlToMap(String xml, Map<String, Object> map) {

		if ((xml == null) || (xml.trim().length() == 0)) {
			return -1;
		}

		SAXBuilder sb = new SAXBuilder();
		Document doc = null;

		try {
			doc = sb.build(new StringReader(xml));

		} catch (JDOMException e) {
			e.printStackTrace();
			return -2;
		} catch (IOException e) {
			e.printStackTrace();
			return -3;
		}
		Element rootElement = doc.getRootElement();

		if (rootElement.getName().compareTo("dataset") == 0) {
			Element parametersElement = rootElement.getChild("parameters");
			List<?> parameterList = parametersElement.getChildren();
			Iterator<?> parameterListIterator = parameterList.iterator();
			while (parameterListIterator.hasNext()) {
				Element element = (Element) parameterListIterator.next();
				String key = element.getAttributeValue("name");
				String value = element.getText();
				map.put(key, value);
			}

		} else {// 根节点不是按约定格式的<dataset>
			return -4;
		}

		return 0;
	}
}