package com.nari.common.util;

public class StringUtil {
	/**
	 * 将对象转换成字符串，如果对象为null,则返回""
	 * @param o
	 * @return
	 */
	public static String removeNull(Object o) {
		return removeNull(o, "");
	}
	/**
	 * 预置的返回判空返回对象，如果对象为空，返回s
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
}
