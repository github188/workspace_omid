package com.nari.common.util;

public class StringUtil {
	/**
	 * 判断字符串是否为空
	 * 
	 * @param s
	 * @return
	 */
	public static final boolean isEmptyString(String s) {
		return s == null || s.trim().equals("") || "NULL".equalsIgnoreCase(s);
	}

	/**
	 * 将对象转换成字符串，如果对象为null,则返回""
	 * 
	 * @param o
	 * @return
	 */
	public static String removeNull(Object o) {
		return removeNull(o, "");
	}

	/**
	 * 预置的返回判空返回对象，如果对象为空，返回s
	 * 
	 * @param o
	 * @param s
	 * @return
	 */
	public static String removeNull(Object o, String s) {
		if (o == null) {
			return s;
		}
		return o.toString().trim();
	}

	/**
	 * 截取字符串
	 * 
	 * @param str
	 * @param beginIndex
	 * @param endIndex
	 * 
	 * @return
	 */
	public static String subStr(String str, int beginIndex, int endIndex) {
		if (str != null) {
			if (beginIndex <= str.length() && endIndex <= str.length()) {
				return str.substring(beginIndex, endIndex);
			} else {
				return str;
			}
		} else {
			return "";
		}
	}
}
