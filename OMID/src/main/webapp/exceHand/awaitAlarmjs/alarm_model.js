
Ext.define('AwaitAlarm', {
  extend: 'Ext.data.Model',
  fields: [{
    name: 'AWAIT_ITEM_ID',
    type: 'string'
  }, {
    name: 'STATUS_CODE',
    type: 'string'
  }, {
    name: 'AWAIT_DATE',
    type: 'string'
  }, {
    name: 'CONS_NO',
    type: 'string'
  }, {
    name: 'ALARM_TYPE',
    type: 'string'
  }, {
    name: 'ALARM_ID',
    type: 'string'
  }, {
    name: 'ALARM_CODE',
    type: 'string'
  }, {
    name: 'ALARM_SRC',
    type: 'string'
  }, {
    name: 'EVENT_LEVEL',
    type: 'string'
  }, {
    name: 'TASK_ID',
    type: 'date'
  }, {
    name: 'AWAIT_USER_ID',
    type: 'string'
  }, {
    name: 'START_TASK_TIME',
    type: 'date'
  }, {
    name: 'EVENT_LEVEL_NAME',
    type: 'string'
  }, {
    name: 'EXCEPT_TYPE_NAME',
    type: 'string'
  }, {
    name: 'AWAIT_STATUS_NAME',
    type: 'string'
  }, {
    name: 'EXCEPT_SRC_NAME',
    type: 'string'
  }, {
    name: 'AWAIT_DATE',
    type: 'string'
  }, {
    name: 'EVENT_NAME',
    type: 'string'
  }, {
    name: 'QIXIAN',
    type: 'string'
  }, {
    name: 'FIRST_ALARM_DATE',
    type: 'string'
  }, {
    name: 'ALARM_DATE',
    type: 'string'
  }, {
    name: 'TERMINAL_ADDR',
    type: 'string'
  }, {
    name: 'CONS_NAME',
    type: 'string'
  }, {
    name: 'CONS_SORT_NAME',
    type: 'string'
  }, {
    name: 'ALARM_CNT',
    type: 'string'
  },{
    name: 'TERMINAL_ID',
    type: 'string'
  },{
	    name: 'METER_ID',
	    type: 'string'
 },{
	    name: 'CHAOQI',
	    type: 'string'
 },{
	    name: 'ORG_NAME',
	    type: 'string'
 },{
	    name: 'AWAIT_DATE1',
	    type: 'string'
 }]
});


Ext.define('TmnlAlarm',{
  extend: 'Ext.data.Model',
  fields:["EVENT_NAME","ALARM_ID","METER_ID","ALARM_TYPE","TERMINAL_ID","CONS_NAME","TERMINAL_ADDR","AWAIT_ITEM_ID"]
});

Ext.define('userlistmodel',{
	  extend: 'Ext.data.Model',
	  fields:["EMP_NO","STAFF_NO","ORG_NO","DEPT_NO","NAME","PWD","IP","ACCESS_LEVEL","CUR_STATUS_CODE"]
	});


