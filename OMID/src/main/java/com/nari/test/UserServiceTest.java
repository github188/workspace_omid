package com.nari.test;


import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.transaction.annotation.Transactional;

import com.nari.demo.model.UserModel;
import com.nari.demo.service.UserService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring-config.xml" })
@Transactional
@TransactionConfiguration(transactionManager = "txManager", defaultRollback = true)
public class UserServiceTest {

	@Autowired
	private UserService userService;

	AtomicInteger counter = new AtomicInteger();

	@Test
	public void testList() {
//		UserModel user = userService.save(genRandomUser());

		List<UserModel> userList = userService.listAll();
		System.out.println(userList.size());
	}

	public UserModel genRandomUser() {
		long randomKey = System.nanoTime() + counter.addAndGet(1);
		UserModel user = new UserModel();
		user.setUsername("zhang" + randomKey);
		user.setEmail("zhang" + randomKey + "@sishuok.com");
		user.setPassword("123456");
		user.setRegisterDate(new Date());
		return user;
	}
	
	public void testAccount(){
	}
}
