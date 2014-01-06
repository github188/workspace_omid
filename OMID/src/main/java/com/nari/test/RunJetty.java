package com.nari.test;

import java.io.File;

import org.mortbay.jetty.Server;
import org.mortbay.jetty.webapp.WebAppContext;

public class RunJetty {
	/**
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		Server server = new Server(9000);
		File rootDir = new File(RunJetty.class.getResource("/").getPath()).getParentFile().getParentFile();
		String webAppPath = new File(rootDir,"src/main/webapp").getPath();
		new WebAppContext(server,webAppPath,"/mom");
		server.start();
	}
}
