package com.nari.vcm.dataMining.test;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.nari.vcm.dataMining.service.VIPDataMining;
import org.junit.Test;

public class Test2 {

	@Test
	public  void test() { 
		ClassPathXmlApplicationContext ctx = new ClassPathXmlApplicationContext("spring-config.xml");
		VIPDataMining impl = (VIPDataMining) ctx.getBean("vIPDataMining");
	    impl.dataMining();
    }
	
	
	/*public void testSchemaExport() {
		new SchemaExport(new AnnotationConfiguration().configure()).create(false, true);
	}*/
	/*public  static void main(String args[]){
		
		beforeClass();
	}*/
}
