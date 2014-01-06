package com.nari.common.interceptor;

import java.util.ResourceBundle;

public class ResourceUtil {
	private static final ResourceBundle bundle = java.util.ResourceBundle.getBundle("resources");
	
	private void ResourceUtil() {
	}
	
	public static final String getSessionInfoName() {
		return bundle.getString("sessionInfoName");
	}
}
