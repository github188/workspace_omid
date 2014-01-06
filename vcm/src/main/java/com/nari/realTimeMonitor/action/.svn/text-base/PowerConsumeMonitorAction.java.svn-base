package com.nari.realTimeMonitor.action;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.nari.common.action.BaseAction;
import com.nari.common.mybatis.pagination.Page;
import com.nari.common.util.StringUtil;
import com.nari.common.util.TreeNode;
import com.nari.realTimeMonitor.service.PowerConsumeMonitorService;

@ParentPackage("baseJson")
@Namespace("/")
@Action("powerConsumeMonitorAction")
@Results( { @Result(name = "success", type = "json"), @Result(name = "input", type = "json") })
public class PowerConsumeMonitorAction extends BaseAction {
	@Autowired
	private PowerConsumeMonitorService powerConsumeMonitorService;
	private final String[] timeRange = { "00:00:00", "01:00:00", "02:00:00", "03:00:00", "04:00:00", "05:00:00", "06:00:00", "07:00:00", "08:00:00", "09:00:00", "10:00:00",
			"11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00", "20:00:00", "21:00:00", "22:00:00", "23:00:00", "00:00:00" };
	private int start;
	private int limit;
	private long totalCount;
	private int page = 1;

	private String orgNo;
	private List<Map<String, Object>> orgList;
	private List<TreeNode> tradeTreeNodeList;
	private List<TreeNode> groupTreeNodeList;

	private Map<String, String> queryMap;
	private List<Map<String, Object>> resultList;
	// 电能示值
	private List<Map<String, Object>> halfMonElecValueInfoList;
	private List<Map<String, Object>> secondHalfMonElecValueInfoList;
	private List<Map<String, Object>> elecValueCompareInfoList;
	// 电量
	private List<Map<String, Object>> halfMonElecQuantityInfoList;
	private List<Map<String, Object>> secondHalfMonElecQuantityInfoList;
	private List<Map<String, Object>> elecQuantityCompareInfoList;
	// 电压
	private List<Map<String, Object>> halfDayVoltageInfoList;
	private List<Map<String, Object>> secondHalfDayVoltageInfoList;
	private List<Map<String, Object>> voltageCompareInfoList;
	// 电流
	private List<Map<String, Object>> halfDayElecCurrentInfoList;
	private List<Map<String, Object>> secondHalfDayElecCurrentInfoList;
	private List<Map<String, Object>> elecCurrentCompareInfoList;
	// 负荷
	private List<Map<String, Object>> halfDayElecLoadInfoList;
	private List<Map<String, Object>> secondHalfDayElecLoadInfoList;
	private List<Map<String, Object>> elecLoadCompareInfoList;
	// 功率因素
	private List<Map<String, Object>> halfDayPowerFactorInfoList;
	private List<Map<String, Object>> secondHalfDayPowerFactorInfoList;
	private List<Map<String, Object>> powerFactorCompareInfoList;

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public long getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(long totalCount) {
		this.totalCount = totalCount;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public String getOrgNo() {
		return orgNo;
	}

	public void setOrgNo(String orgNo) {
		this.orgNo = orgNo;
	}

	public List<Map<String, Object>> getOrgList() {
		return orgList;
	}

	public void setOrgList(List<Map<String, Object>> orgList) {
		this.orgList = orgList;
	}

	public List<TreeNode> getTradeTreeNodeList() {
		return tradeTreeNodeList;
	}

	public void setTradeTreeNodeList(List<TreeNode> tradeTreeNodeList) {
		this.tradeTreeNodeList = tradeTreeNodeList;
	}

	public List<TreeNode> getGroupTreeNodeList() {
		return groupTreeNodeList;
	}

	public void setGroupTreeNodeList(List<TreeNode> groupTreeNodeList) {
		this.groupTreeNodeList = groupTreeNodeList;
	}

	public Map<String, String> getQueryMap() {
		return queryMap;
	}

	public void setQueryMap(Map<String, String> queryMap) {
		this.queryMap = queryMap;
	}

	public List<Map<String, Object>> getResultList() {
		return resultList;
	}

	public void setResultList(List<Map<String, Object>> resultList) {
		this.resultList = resultList;
	}

	public List<Map<String, Object>> getHalfMonElecValueInfoList() {
		return halfMonElecValueInfoList;
	}

	public void setHalfMonElecValueInfoList(List<Map<String, Object>> halfMonElecValueInfoList) {
		this.halfMonElecValueInfoList = halfMonElecValueInfoList;
	}

	public List<Map<String, Object>> getSecondHalfMonElecValueInfoList() {
		return secondHalfMonElecValueInfoList;
	}

	public void setSecondHalfMonElecValueInfoList(List<Map<String, Object>> secondHalfMonElecValueInfoList) {
		this.secondHalfMonElecValueInfoList = secondHalfMonElecValueInfoList;
	}

	public List<Map<String, Object>> getElecValueCompareInfoList() {
		return elecValueCompareInfoList;
	}

	public void setElecValueCompareInfoList(List<Map<String, Object>> elecValueCompareInfoList) {
		this.elecValueCompareInfoList = elecValueCompareInfoList;
	}

	public List<Map<String, Object>> getHalfMonElecQuantityInfoList() {
		return halfMonElecQuantityInfoList;
	}

	public void setHalfMonElecQuantityInfoList(List<Map<String, Object>> halfMonElecQuantityInfoList) {
		this.halfMonElecQuantityInfoList = halfMonElecQuantityInfoList;
	}

	public List<Map<String, Object>> getSecondHalfMonElecQuantityInfoList() {
		return secondHalfMonElecQuantityInfoList;
	}

	public void setSecondHalfMonElecQuantityInfoList(List<Map<String, Object>> secondHalfMonElecQuantityInfoList) {
		this.secondHalfMonElecQuantityInfoList = secondHalfMonElecQuantityInfoList;
	}

	public List<Map<String, Object>> getElecQuantityCompareInfoList() {
		return elecQuantityCompareInfoList;
	}

	public void setElecQuantityCompareInfoList(List<Map<String, Object>> elecQuantityCompareInfoList) {
		this.elecQuantityCompareInfoList = elecQuantityCompareInfoList;
	}

	public List<Map<String, Object>> getHalfDayVoltageInfoList() {
		return halfDayVoltageInfoList;
	}

	public void setHalfDayVoltageInfoList(List<Map<String, Object>> halfDayVoltageInfoList) {
		this.halfDayVoltageInfoList = halfDayVoltageInfoList;
	}

	public List<Map<String, Object>> getSecondHalfDayVoltageInfoList() {
		return secondHalfDayVoltageInfoList;
	}

	public void setSecondHalfDayVoltageInfoList(List<Map<String, Object>> secondHalfDayVoltageInfoList) {
		this.secondHalfDayVoltageInfoList = secondHalfDayVoltageInfoList;
	}

	public List<Map<String, Object>> getVoltageCompareInfoList() {
		return voltageCompareInfoList;
	}

	public void setVoltageCompareInfoList(List<Map<String, Object>> voltageCompareInfoList) {
		this.voltageCompareInfoList = voltageCompareInfoList;
	}

	public List<Map<String, Object>> getHalfDayElecCurrentInfoList() {
		return halfDayElecCurrentInfoList;
	}

	public void setHalfDayElecCurrentInfoList(List<Map<String, Object>> halfDayElecCurrentInfoList) {
		this.halfDayElecCurrentInfoList = halfDayElecCurrentInfoList;
	}

	public List<Map<String, Object>> getSecondHalfDayElecCurrentInfoList() {
		return secondHalfDayElecCurrentInfoList;
	}

	public void setSecondHalfDayElecCurrentInfoList(List<Map<String, Object>> secondHalfDayElecCurrentInfoList) {
		this.secondHalfDayElecCurrentInfoList = secondHalfDayElecCurrentInfoList;
	}

	public List<Map<String, Object>> getElecCurrentCompareInfoList() {
		return elecCurrentCompareInfoList;
	}

	public void setElecCurrentCompareInfoList(List<Map<String, Object>> elecCurrentCompareInfoList) {
		this.elecCurrentCompareInfoList = elecCurrentCompareInfoList;
	}

	public List<Map<String, Object>> getHalfDayElecLoadInfoList() {
		return halfDayElecLoadInfoList;
	}

	public void setHalfDayElecLoadInfoList(List<Map<String, Object>> halfDayElecLoadInfoList) {
		this.halfDayElecLoadInfoList = halfDayElecLoadInfoList;
	}

	public List<Map<String, Object>> getSecondHalfDayElecLoadInfoList() {
		return secondHalfDayElecLoadInfoList;
	}

	public void setSecondHalfDayElecLoadInfoList(List<Map<String, Object>> secondHalfDayElecLoadInfoList) {
		this.secondHalfDayElecLoadInfoList = secondHalfDayElecLoadInfoList;
	}

	public List<Map<String, Object>> getElecLoadCompareInfoList() {
		return elecLoadCompareInfoList;
	}

	public void setElecLoadCompareInfoList(List<Map<String, Object>> elecLoadCompareInfoList) {
		this.elecLoadCompareInfoList = elecLoadCompareInfoList;
	}

	public List<Map<String, Object>> getHalfDayPowerFactorInfoList() {
		return halfDayPowerFactorInfoList;
	}

	public void setHalfDayPowerFactorInfoList(List<Map<String, Object>> halfDayPowerFactorInfoList) {
		this.halfDayPowerFactorInfoList = halfDayPowerFactorInfoList;
	}

	public List<Map<String, Object>> getSecondHalfDayPowerFactorInfoList() {
		return secondHalfDayPowerFactorInfoList;
	}

	public void setSecondHalfDayPowerFactorInfoList(List<Map<String, Object>> secondHalfDayPowerFactorInfoList) {
		this.secondHalfDayPowerFactorInfoList = secondHalfDayPowerFactorInfoList;
	}

	public List<Map<String, Object>> getPowerFactorCompareInfoList() {
		return powerFactorCompareInfoList;
	}

	public void setPowerFactorCompareInfoList(List<Map<String, Object>> powerFactorCompareInfoList) {
		this.powerFactorCompareInfoList = powerFactorCompareInfoList;
	}

	public String queryOrgList() {

		Map<String, String> queryOrgMap = new HashMap<String, String>();
		queryOrgMap.put("ORG_NO", orgNo);
		orgList = powerConsumeMonitorService.queryOrgList(queryOrgMap);
		/*orgList = new ArrayList<Map<String, Object>>();
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("ORG_NO", "34101");
		map.put("ORG_NAME", "新疆电力公司");
		orgList.add(map);
		*/
		return SUCCESS;
	}

	public String queryTradeTreeNodeList() {
		String node = this.getRequest().getParameter("node");
		Map<String, String> queryTradeMap = new HashMap<String, String>();
		if (node.equals("trade_root")) {
			queryTradeMap.put("TRADE_NO", "999999");
		} else {
			queryTradeMap.put("TRADE_NO", node);
		}
		List<Map<String, Object>> tradeList = powerConsumeMonitorService.queryTradeList(queryTradeMap);
		if (tradeList != null && tradeList.size() > 0) {
			tradeTreeNodeList = new ArrayList<TreeNode>();
			for (int i = 0; i < tradeList.size(); i++) {
				TreeNode tradeTreeNode = new TreeNode();
				String tradeNo = StringUtil.removeNull(tradeList.get(i).get("TRADE_NO"));
				String tradeName = StringUtil.removeNull(tradeList.get(i).get("TRADE_NAME"));
				tradeTreeNode.setId(tradeNo);
				tradeTreeNode.setText(tradeName);
				tradeTreeNodeList.add(tradeTreeNode);
			}
		}
		return SUCCESS;
	}

	public String queryGroupTreeNodeList() {
		String node = this.getRequest().getParameter("node");
		Map<String, String> queryGroupMap = new HashMap<String, String>();
		if (node.equals("group_root")) {
			queryGroupMap.put("CUST_GROUP_ID", node);
			List<Map<String, Object>> groupList = powerConsumeMonitorService.queryGroupList(queryGroupMap);
			if (groupList != null && groupList.size() > 0) {
				groupTreeNodeList = new ArrayList<TreeNode>();
				for (int i = 0; i < groupList.size(); i++) {
					TreeNode groupTreeNode = new TreeNode();
					String custGroupId = StringUtil.removeNull(groupList.get(i).get("CUST_GROUP_ID"));
					String custGroupName = StringUtil.removeNull(groupList.get(i).get("CUST_GROUP_NAME"));
					groupTreeNode.setId(custGroupId);
					groupTreeNode.setText(custGroupName);
					groupTreeNodeList.add(groupTreeNode);
				}
			}
		}
		return SUCCESS;
	}

	public String queryVcmInfoList() {
		Page<Map<String, Object>> p = new Page<Map<String, Object>>();
		p.setCurrentPage(page);
		p.setSize(limit);
		powerConsumeMonitorService.queryVcmInfoList(p, queryMap);
		resultList = p.getResult();
		totalCount = p.getTotal();
		return SUCCESS;
	}

	public String queryPowerConsumeInfoList() throws Exception {

		String type = queryMap.get("type");
		if ("1".equals(type)) {
			// 电能示值
			queryElecValueInfoList();
		} else if ("2".equals(type)) {
			// 电量
			queryElecQuantityInfoList();
		} else if ("3".equals(type)) {
			// 电压
			queryVoltageInfoList();
		} else if ("4".equals(type)) {
			// 电流
			queryElecCurrentInfoList();
		} else if ("5".equals(type)) {
			// 负荷
			queryElecLoadInfoList();
		} else if ("6".equals(type)) {
			// 功率因素
			queryPowerFactorInfoList();
		}

		return SUCCESS;
	}

	private void queryElecValueInfoList() throws Exception {
		boolean flag = false;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

		String dataDate = null;
		String compareDataDate = null;
		String elecValue = null;
		String compareElecValue = null;

		Map<String, Object> elecValueCompareInfoMap = null;

		halfMonElecValueInfoList = new ArrayList<Map<String, Object>>();
		secondHalfMonElecValueInfoList = new ArrayList<Map<String, Object>>();
		elecValueCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> elecValueInfoList = powerConsumeMonitorService.queryElecValueInfoList(queryMap);
		if ("1".equals(pattern)) {
			// 同比
			List<Map<String, Object>> elecValueYearToYearInfoList = powerConsumeMonitorService.queryElecValueYearToYearInfoList(queryMap);

			calendar.add(Calendar.YEAR, -1);
			int days_y = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.add(Calendar.YEAR, 1);
			if (days > days_y) {
				for (int i = 1; i <= days; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("DATA_DATE", dataDate);

					if (i <= days_y) {
						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}

						flag = false;
						calendar.add(Calendar.YEAR, -1);
						dataDate = sdf.format(calendar.getTime());
						elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

						for (int j = 0; j < elecValueYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}
						calendar.add(Calendar.YEAR, 1);
					} else {
						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}
						elecValueCompareInfoMap.put("COMPARE_DATA_DATE", "");
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
					}

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			} else if (days < days_y) {
				calendar.add(Calendar.YEAR, -1);
				for (int i = 1; i <= days_y; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;
					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

					if (i <= days) {
						for (int j = 0; j < elecValueYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}

						flag = false;

						calendar.add(Calendar.YEAR, 1);
						dataDate = sdf.format(calendar.getTime());
						elecValueCompareInfoMap.put("DATA_DATE", dataDate);

						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}
						calendar.add(Calendar.YEAR, -1);
					} else {
						for (int j = 0; j < elecValueYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}
						elecValueCompareInfoMap.put("DATA_DATE", "");
						elecValueCompareInfoMap.put("ELEC_VALUE", "");
					}

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			} else {
				for (int i = 1; i <= days; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("DATA_DATE", dataDate);

					for (int j = 0; j < elecValueInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
					} else {
						elecValueCompareInfoMap.put("ELEC_VALUE", "");
					}
					flag = false;
					calendar.add(Calendar.YEAR, -1);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
					for (int j = 0; j < elecValueYearToYearInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							compareElecValue = StringUtil.removeNull(elecValueYearToYearInfoList.get(j).get("ELEC_VALUE"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
					} else {
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			List<Map<String, Object>> elecValueChainRelativeInfoList = powerConsumeMonitorService.queryElecValueChainRelativeInfoList(queryMap);

			calendar.add(Calendar.MONTH, -1);
			int days_c = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.add(Calendar.MONTH, 1);

			if (days > days_c) {
				for (int i = 1; i <= days; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("DATA_DATE", dataDate);

					if (i <= days_c) {
						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}
						flag = false;
						calendar.add(Calendar.MONTH, -1);
						dataDate = sdf.format(calendar.getTime());
						elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

						for (int j = 0; j < elecValueChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}
						calendar.add(Calendar.MONTH, 1);
					} else {
						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}
						elecValueCompareInfoMap.put("COMPARE_DATA_DATE", "");
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
					}

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			} else if (days < days_c) {
				calendar.add(Calendar.MONTH, -1);
				for (int i = 1; i <= days_c; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

					if (i <= days) {
						for (int j = 0; j < elecValueChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}

						flag = false;

						calendar.add(Calendar.MONTH, 1);
						dataDate = sdf.format(calendar.getTime());
						elecValueCompareInfoMap.put("DATA_DATE", dataDate);

						for (int j = 0; j < elecValueInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
						} else {
							elecValueCompareInfoMap.put("ELEC_VALUE", "");
						}

						calendar.add(Calendar.MONTH, -1);
					} else {

						for (int j = 0; j < elecValueChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecValue = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("ELEC_VALUE"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
						} else {
							elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
						}
						elecValueCompareInfoMap.put("DATA_DATE", "");
						elecValueCompareInfoMap.put("ELEC_VALUE", "");
					}

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			} else {
				for (int i = 1; i <= days; i++) {
					elecValueCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("DATA_DATE", dataDate);

					for (int j = 0; j < elecValueInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecValueInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							elecValue = StringUtil.removeNull(elecValueInfoList.get(j).get("ELEC_VALUE"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecValueCompareInfoMap.put("ELEC_VALUE", elecValue);
					} else {
						elecValueCompareInfoMap.put("ELEC_VALUE", "");
					}
					flag = false;
					calendar.add(Calendar.MONTH, -1);
					dataDate = sdf.format(calendar.getTime());
					elecValueCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
					for (int j = 0; j < elecValueChainRelativeInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							compareElecValue = StringUtil.removeNull(elecValueChainRelativeInfoList.get(j).get("ELEC_VALUE"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", compareElecValue);
					} else {
						elecValueCompareInfoMap.put("COMPARE_ELEC_VALUE", "");
					}
					calendar.add(Calendar.MONTH, 1);

					if (i < 16) {
						halfMonElecValueInfoList.add(elecValueCompareInfoMap);
					} else {
						secondHalfMonElecValueInfoList.add(elecValueCompareInfoMap);
					}
					elecValueCompareInfoList.add(elecValueCompareInfoMap);
				}
			}

		}

	}

	private void queryElecQuantityInfoList() throws Exception {

		boolean flag = false;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int days = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

		String dataDate = null;
		String compareDataDate = null;
		String elecQuantity = null;
		String compareElecQuantity = null;

		Map<String, Object> elecQuantityCompareInfoMap = null;

		halfMonElecQuantityInfoList = new ArrayList<Map<String, Object>>();
		secondHalfMonElecQuantityInfoList = new ArrayList<Map<String, Object>>();
		elecQuantityCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> elecQuantityInfoList = powerConsumeMonitorService.queryElecQuantityInfoList(queryMap);
		if ("1".equals(pattern)) {
			// 同比
			List<Map<String, Object>> elecQuantityYearToYearInfoList = powerConsumeMonitorService.queryElecQuantityYearToYearInfoList(queryMap);

			calendar.add(Calendar.YEAR, -1);
			int days_y = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.add(Calendar.YEAR, 1);
			if (days > days_y) {
				for (int i = 1; i <= days; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);

					if (i <= days_y) {
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));

								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}
						flag = false;
						calendar.add(Calendar.YEAR, -1);
						dataDate = sdf.format(calendar.getTime());
						elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
						for (int j = 0; j < elecQuantityYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}
						calendar.add(Calendar.YEAR, 1);
					} else {
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}
						elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", "");
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
					}

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			} else if (days < days_y) {
				calendar.add(Calendar.YEAR, -1);
				for (int i = 1; i <= days_y; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

					if (i <= days) {
						for (int j = 0; j < elecQuantityYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}

						flag = false;

						calendar.add(Calendar.YEAR, 1);
						dataDate = sdf.format(calendar.getTime());
						elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}

						calendar.add(Calendar.YEAR, -1);
					} else {

						for (int j = 0; j < elecQuantityYearToYearInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}
						elecQuantityCompareInfoMap.put("DATA_DATE", "");
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
					}

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			} else {
				for (int i = 1; i <= days; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);

					for (int j = 0; j < elecQuantityInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
					} else {
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
					}
					flag = false;
					calendar.add(Calendar.YEAR, -1);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
					for (int j = 0; j < elecQuantityYearToYearInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							compareElecQuantity = StringUtil.removeNull(elecQuantityYearToYearInfoList.get(j).get("ELEC_QUANTITY"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
					} else {
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			List<Map<String, Object>> elecQuantityChainRelativeInfoList = powerConsumeMonitorService.queryElecQuantityChainRelativeInfoList(queryMap);

			calendar.add(Calendar.MONTH, -1);
			int days_c = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
			calendar.add(Calendar.MONTH, 1);

			if (days > days_c) {
				for (int i = 1; i <= days; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);

					if (i <= days_c) {
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}
						flag = false;
						calendar.add(Calendar.MONTH, -1);
						dataDate = sdf.format(calendar.getTime());
						elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
						for (int j = 0; j < elecQuantityChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}
						calendar.add(Calendar.MONTH, 1);
					} else {
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}
						elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", "");
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
					}

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			} else if (days < days_c) {
				calendar.add(Calendar.MONTH, -1);
				for (int i = 1; i <= days_c; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);

					if (i <= days) {
						for (int j = 0; j < elecQuantityChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}

						flag = false;

						calendar.add(Calendar.MONTH, 1);
						dataDate = sdf.format(calendar.getTime());
						elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);
						for (int j = 0; j < elecQuantityInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
						}

						calendar.add(Calendar.MONTH, -1);
					} else {

						for (int j = 0; j < elecQuantityChainRelativeInfoList.size(); j++) {
							compareDataDate = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("DATA_DATE"));
							if (compareDataDate.equals(dataDate)) {
								compareElecQuantity = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("ELEC_QUANTITY"));
								flag = true;
								break;
							}

						}
						if (flag) {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
						} else {
							elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
						}
						elecQuantityCompareInfoMap.put("DATA_DATE", "");
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
					}

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			} else {
				for (int i = 1; i <= days; i++) {
					elecQuantityCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					calendar.set(Calendar.DAY_OF_MONTH, i);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("DATA_DATE", dataDate);

					for (int j = 0; j < elecQuantityInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecQuantityInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							elecQuantity = StringUtil.removeNull(elecQuantityInfoList.get(j).get("ELEC_QUANTITY"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", elecQuantity);
					} else {
						elecQuantityCompareInfoMap.put("ELEC_QUANTITY", "");
					}
					flag = false;
					calendar.add(Calendar.MONTH, -1);
					dataDate = sdf.format(calendar.getTime());
					elecQuantityCompareInfoMap.put("COMPARE_DATA_DATE", dataDate);
					for (int j = 0; j < elecQuantityChainRelativeInfoList.size(); j++) {
						compareDataDate = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("DATA_DATE"));
						if (compareDataDate.equals(dataDate)) {
							compareElecQuantity = StringUtil.removeNull(elecQuantityChainRelativeInfoList.get(j).get("ELEC_QUANTITY"));
							flag = true;
							break;
						}

					}
					if (flag) {
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", compareElecQuantity);
					} else {
						elecQuantityCompareInfoMap.put("COMPARE_ELEC_QUANTITY", "");
					}
					calendar.add(Calendar.MONTH, 1);

					if (i < 16) {
						halfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					} else {
						secondHalfMonElecQuantityInfoList.add(elecQuantityCompareInfoMap);
					}
					elecQuantityCompareInfoList.add(elecQuantityCompareInfoMap);
				}
			}

		}
	}

	public void queryVoltageInfoList() throws Exception {
		boolean flag;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		String statDate = queryMap.get("date");
		String compareStatDate = null;
		String dataTime = null;
		String compareDataTime = null;
		String voltage = null;
		String compareVoltage = null;

		Map<String, Object> voltageCompareInfoMap = null;

		halfDayVoltageInfoList = new ArrayList<Map<String, Object>>();
		secondHalfDayVoltageInfoList = new ArrayList<Map<String, Object>>();
		voltageCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> voltageInfoList = powerConsumeMonitorService.queryVoltageInfoList(queryMap);

		if ("1".equals(pattern)) {
			// 同比
			calendar.add(Calendar.YEAR, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.YEAR, 1);
			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {// 如果是同一天则进行同比
				List<Map<String, Object>> voltageYearToYearInfoList = powerConsumeMonitorService.queryVoltageYearToYearInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					voltageCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					voltageCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < voltageInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							voltage = StringUtil.removeNull(voltageInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}

					}
					if (flag) {
						voltageCompareInfoMap.put("VOLTAGE", voltage);
					} else {
						voltageCompareInfoMap.put("VOLTAGE", "");
					}
					flag = false;

					if (i < 24) {
						calendar.add(Calendar.YEAR, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.YEAR, -1);
						calendar.add(Calendar.DATE, 1);
					}

					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					voltageCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < voltageYearToYearInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageYearToYearInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareVoltage = StringUtil.removeNull(voltageYearToYearInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}
					}
					if (flag) {
						voltageCompareInfoMap.put("COMPARE_VOLTAGE", compareVoltage);
					} else {
						voltageCompareInfoMap.put("COMPARE_VOLTAGE", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 13) {
						halfDayVoltageInfoList.add(voltageCompareInfoMap);
					} else {
						secondHalfDayVoltageInfoList.add(voltageCompareInfoMap);
					}
					voltageCompareInfoList.add(voltageCompareInfoMap);
				}

			} else {
				for (int i = 0; i < timeRange.length; i++) {
					voltageCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i < 24) {

					} else {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					voltageCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < voltageInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							voltage = StringUtil.removeNull(voltageInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}

					}
					if (flag) {
						voltageCompareInfoMap.put("VOLTAGE", voltage);
					} else {
						voltageCompareInfoMap.put("VOLTAGE", "");
					}

					voltageCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					voltageCompareInfoMap.put("COMPARE_VOLTAGE", "");

					if (i < 13) {
						halfDayVoltageInfoList.add(voltageCompareInfoMap);
					} else {
						secondHalfDayVoltageInfoList.add(voltageCompareInfoMap);
					}
					voltageCompareInfoList.add(voltageCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			calendar.add(Calendar.MONTH, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.MONTH, 1);
			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {
				List<Map<String, Object>> voltageChainRelativeInfoList = powerConsumeMonitorService.queryVoltageChainRelativeInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					voltageCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					voltageCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < voltageInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							voltage = StringUtil.removeNull(voltageInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}

					}
					if (flag) {
						voltageCompareInfoMap.put("VOLTAGE", voltage);
					} else {
						voltageCompareInfoMap.put("VOLTAGE", "");
					}
					flag = false;
					if (i < 24) {
						calendar.add(Calendar.MONTH, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.MONTH, -1);
						calendar.add(Calendar.DATE, 1);
					}

					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					voltageCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < voltageChainRelativeInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageChainRelativeInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareVoltage = StringUtil.removeNull(voltageChainRelativeInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}
					}
					if (flag) {
						voltageCompareInfoMap.put("COMPARE_VOLTAGE", compareVoltage);
					} else {
						voltageCompareInfoMap.put("COMPARE_VOLTAGE", "");
					}
					calendar.add(Calendar.MONTH, 1);

					if (i < 13) {
						halfDayVoltageInfoList.add(voltageCompareInfoMap);
					} else {
						secondHalfDayVoltageInfoList.add(voltageCompareInfoMap);
					}
					voltageCompareInfoList.add(voltageCompareInfoMap);
				}
			} else {
				for (int i = 0; i < timeRange.length; i++) {
					voltageCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					voltageCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < voltageInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(voltageInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							voltage = StringUtil.removeNull(voltageInfoList.get(j).get("VOLTAGE"));
							flag = true;

						}

					}
					if (flag) {
						voltageCompareInfoMap.put("VOLTAGE", voltage);
					} else {
						voltageCompareInfoMap.put("VOLTAGE", "");
					}

					voltageCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					voltageCompareInfoMap.put("COMPARE_VOLTAGE", "");

					if (i < 13) {
						halfDayVoltageInfoList.add(voltageCompareInfoMap);
					} else {
						secondHalfDayVoltageInfoList.add(voltageCompareInfoMap);
					}
					voltageCompareInfoList.add(voltageCompareInfoMap);
				}
			}

		}
	}

	public void queryElecCurrentInfoList() throws Exception {
		boolean flag;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		String statDate = queryMap.get("date");
		String compareStatDate = null;
		String dataTime = null;
		String compareDataTime = null;
		String elecCurrent = null;
		String compareElecCurrent = null;

		Map<String, Object> elecCurrentCompareInfoMap = null;

		halfDayElecCurrentInfoList = new ArrayList<Map<String, Object>>();
		secondHalfDayElecCurrentInfoList = new ArrayList<Map<String, Object>>();
		elecCurrentCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> elecCurrentInfoList = powerConsumeMonitorService.queryElecCurrentInfoList(queryMap);

		if ("1".equals(pattern)) {
			// 同比
			calendar.add(Calendar.YEAR, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.YEAR, 1);

			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {// 如果是同一天则进行同比
				List<Map<String, Object>> elecCurrentYearToYearInfoList = powerConsumeMonitorService.queryElecCurrentYearToYearInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					elecCurrentCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecCurrent = StringUtil.removeNull(elecCurrentInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}

					}
					if (flag) {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", elecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", "");
					}
					flag = false;
					if (i < 24) {
						calendar.add(Calendar.YEAR, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.YEAR, -1);
						calendar.add(Calendar.DATE, 1);
					}
					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentYearToYearInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentYearToYearInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareElecCurrent = StringUtil.removeNull(elecCurrentYearToYearInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}
					}
					if (flag) {
						elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", compareElecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 13) {
						halfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					} else {
						secondHalfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					}
					elecCurrentCompareInfoList.add(elecCurrentCompareInfoMap);
				}

			} else {
				for (int i = 0; i < timeRange.length; i++) {
					elecCurrentCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecCurrent = StringUtil.removeNull(elecCurrentInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}

					}
					if (flag) {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", elecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", "");
					}

					elecCurrentCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", "");
					if (i < 13) {
						halfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					} else {
						secondHalfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					}
					elecCurrentCompareInfoList.add(elecCurrentCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			calendar.add(Calendar.MONTH, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.MONTH, 1);
			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {
				List<Map<String, Object>> elecCurrentChainRelativeInfoList = powerConsumeMonitorService.queryElecCurrentChainRelativeInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					elecCurrentCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecCurrent = StringUtil.removeNull(elecCurrentInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}

					}
					if (flag) {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", elecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", "");
					}

					flag = false;
					if (i < 24) {
						calendar.add(Calendar.MONTH, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.MONTH, -1);
						calendar.add(Calendar.DATE, 1);
					}

					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentChainRelativeInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentChainRelativeInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareElecCurrent = StringUtil.removeNull(elecCurrentChainRelativeInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}
					}
					if (flag) {
						elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", compareElecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", "");
					}
					calendar.add(Calendar.MONTH, 1);

					if (i < 13) {
						halfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					} else {
						secondHalfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					}
					elecCurrentCompareInfoList.add(elecCurrentCompareInfoMap);
				}
			} else {
				for (int i = 0; i < timeRange.length; i++) {
					elecCurrentCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					elecCurrentCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecCurrentInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecCurrentInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecCurrent = StringUtil.removeNull(elecCurrentInfoList.get(j).get("ELEC_CURRENT"));
							flag = true;

						}

					}
					if (flag) {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", elecCurrent);
					} else {
						elecCurrentCompareInfoMap.put("ELEC_CURRENT", "");
					}

					elecCurrentCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					elecCurrentCompareInfoMap.put("COMPARE_ELEC_CURRENT", "");
					if (i < 13) {
						halfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					} else {
						secondHalfDayElecCurrentInfoList.add(elecCurrentCompareInfoMap);
					}
					elecCurrentCompareInfoList.add(elecCurrentCompareInfoMap);
				}
			}

		}
	}

	public void queryElecLoadInfoList() throws Exception {
		boolean flag;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		String statDate = queryMap.get("date");
		String compareStatDate = null;
		String dataTime = null;
		String compareDataTime = null;
		String elecLoad = null;
		String compareElecLoad = null;

		Map<String, Object> elecLoadCompareInfoMap = null;

		halfDayElecLoadInfoList = new ArrayList<Map<String, Object>>();
		secondHalfDayElecLoadInfoList = new ArrayList<Map<String, Object>>();
		elecLoadCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> elecLoadInfoList = powerConsumeMonitorService.queryElecLoadInfoList(queryMap);

		if ("1".equals(pattern)) {
			// 同比
			calendar.add(Calendar.YEAR, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.YEAR, 1);
			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {// 如果是同一天则进行同比
				List<Map<String, Object>> elecLoadYearToYearInfoList = powerConsumeMonitorService.queryElecLoadYearToYearInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					elecLoadCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecLoad = StringUtil.removeNull(elecLoadInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}

					}
					if (flag) {
						elecLoadCompareInfoMap.put("ELEC_LOAD", elecLoad);
					} else {
						elecLoadCompareInfoMap.put("ELEC_LOAD", "");
					}
					flag = false;
					if (i < 24) {
						calendar.add(Calendar.YEAR, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.YEAR, -1);
						calendar.add(Calendar.DATE, 1);
					}
					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadYearToYearInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadYearToYearInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareElecLoad = StringUtil.removeNull(elecLoadYearToYearInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}
					}
					if (flag) {
						elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", compareElecLoad);
					} else {
						elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 13) {
						halfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					} else {
						secondHalfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					}
					elecLoadCompareInfoList.add(elecLoadCompareInfoMap);
				}

			} else {
				for (int i = 0; i < timeRange.length; i++) {
					elecLoadCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecLoad = StringUtil.removeNull(elecLoadInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}

					}
					if (flag) {
						elecLoadCompareInfoMap.put("ELEC_LOAD", elecLoad);
					} else {
						elecLoadCompareInfoMap.put("ELEC_LOAD", "");
					}

					elecLoadCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", "");
					if (i < 13) {
						halfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					} else {
						secondHalfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					}
					elecLoadCompareInfoList.add(elecLoadCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			calendar.add(Calendar.MONTH, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.MONTH, 1);

			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {
				List<Map<String, Object>> elecLoadChainRelativeInfoList = powerConsumeMonitorService.queryElecLoadChainRelativeInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					elecLoadCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecLoad = StringUtil.removeNull(elecLoadInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}

					}
					if (flag) {
						elecLoadCompareInfoMap.put("ELEC_LOAD", elecLoad);
					} else {
						elecLoadCompareInfoMap.put("ELEC_LOAD", "");
					}

					flag = false;
					if (i < 24) {
						calendar.add(Calendar.MONTH, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.MONTH, -1);
						calendar.add(Calendar.DATE, 1);
					}
					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadChainRelativeInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadChainRelativeInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							compareElecLoad = StringUtil.removeNull(elecLoadChainRelativeInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}
					}
					if (flag) {
						elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", compareElecLoad);
					} else {
						elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", "");
					}
					calendar.add(Calendar.MONTH, 1);

					if (i < 13) {
						halfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					} else {
						secondHalfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					}
					elecLoadCompareInfoList.add(elecLoadCompareInfoMap);
				}
			} else {
				for (int i = 0; i < timeRange.length; i++) {
					elecLoadCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					elecLoadCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < elecLoadInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(elecLoadInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							elecLoad = StringUtil.removeNull(elecLoadInfoList.get(j).get("ELEC_LOAD"));
							flag = true;

						}

					}
					if (flag) {
						elecLoadCompareInfoMap.put("ELEC_LOAD", elecLoad);
					} else {
						elecLoadCompareInfoMap.put("ELEC_LOAD", "");
					}

					elecLoadCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					elecLoadCompareInfoMap.put("COMPARE_ELEC_LOAD", "");
					if (i < 13) {
						halfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					} else {
						secondHalfDayElecLoadInfoList.add(elecLoadCompareInfoMap);
					}
					elecLoadCompareInfoList.add(elecLoadCompareInfoMap);
				}
			}
		}
	}

	public void queryPowerFactorInfoList() throws Exception {
		boolean flag;
		String pattern = queryMap.get("pattern");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = sdf.parse(queryMap.get("date"));
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);

		String statDate = queryMap.get("date");
		String compareStatDate = null;
		String dataTime = null;
		String compareDataTime = null;
		String powerFactor = null;
		String comparePowerFactor = null;

		Map<String, Object> powerFactorCompareInfoMap = null;

		halfDayPowerFactorInfoList = new ArrayList<Map<String, Object>>();
		secondHalfDayPowerFactorInfoList = new ArrayList<Map<String, Object>>();
		powerFactorCompareInfoList = new ArrayList<Map<String, Object>>();

		List<Map<String, Object>> powerFactorInfoList = powerConsumeMonitorService.queryPowerFactorInfoList(queryMap);

		if ("1".equals(pattern)) {
			// 同比
			calendar.add(Calendar.YEAR, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.YEAR, 1);
			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {// 如果是同一天则进行同比
				List<Map<String, Object>> powerFactorYearToYearInfoList = powerConsumeMonitorService.queryPowerFactorYearToYearInfoList(queryMap);
				for (int i = 0; i < timeRange.length; i++) {
					powerFactorCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							powerFactor = StringUtil.removeNull(powerFactorInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}

					}
					if (flag) {
						powerFactorCompareInfoMap.put("POWER_FACTOR", powerFactor);
					} else {
						powerFactorCompareInfoMap.put("POWER_FACTOR", "");
					}
					flag = false;

					if (i < 24) {
						calendar.add(Calendar.YEAR, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.YEAR, -1);
						calendar.add(Calendar.DATE, 1);
					}
					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorYearToYearInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorYearToYearInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							comparePowerFactor = StringUtil.removeNull(powerFactorYearToYearInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}
					}
					if (flag) {
						powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", comparePowerFactor);
					} else {
						powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", "");
					}
					calendar.add(Calendar.YEAR, 1);

					if (i < 13) {
						halfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					} else {
						secondHalfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					}
					powerFactorCompareInfoList.add(powerFactorCompareInfoMap);
				}

			} else {
				for (int i = 0; i < timeRange.length; i++) {
					powerFactorCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							powerFactor = StringUtil.removeNull(powerFactorInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}

					}
					if (flag) {
						powerFactorCompareInfoMap.put("POWER_FACTOR", powerFactor);
					} else {
						powerFactorCompareInfoMap.put("POWER_FACTOR", "");
					}

					powerFactorCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", "");
					if (i < 13) {
						halfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					} else {
						secondHalfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					}
					powerFactorCompareInfoList.add(powerFactorCompareInfoMap);
				}
			}

		} else if ("2".equals(pattern)) {
			// 环比
			calendar.add(Calendar.MONTH, -1);
			compareStatDate = sdf.format(calendar.getTime());
			calendar.add(Calendar.MONTH, 1);

			if (StringUtil.subStr(compareStatDate, 8, 10).equals(StringUtil.subStr(statDate, 8, 10))) {
				List<Map<String, Object>> powerFactorChainRelativeInfoList = powerConsumeMonitorService.queryPowerFactorChainRelativeInfoList(queryMap);

				for (int i = 0; i < timeRange.length; i++) {
					powerFactorCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());
					}
					dataTime = statDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							powerFactor = StringUtil.removeNull(powerFactorInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}

					}
					if (flag) {
						powerFactorCompareInfoMap.put("POWER_FACTOR", powerFactor);
					} else {
						powerFactorCompareInfoMap.put("POWER_FACTOR", "");
					}

					flag = false;
					if (i < 24) {
						calendar.add(Calendar.MONTH, -1);
					} else {
						calendar.add(Calendar.DATE, -1);
						calendar.add(Calendar.MONTH, -1);
						calendar.add(Calendar.DATE, 1);
					}
					compareStatDate = sdf.format(calendar.getTime());
					dataTime = compareStatDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorChainRelativeInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorChainRelativeInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							comparePowerFactor = StringUtil.removeNull(powerFactorChainRelativeInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}
					}
					if (flag) {
						powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", comparePowerFactor);
					} else {
						powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", "");
					}
					calendar.add(Calendar.MONTH, 1);
					if (i < 13) {
						halfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					} else {
						secondHalfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					}
					powerFactorCompareInfoList.add(powerFactorCompareInfoMap);
				}
			} else {
				for (int i = 0; i < timeRange.length; i++) {
					powerFactorCompareInfoMap = new HashMap<String, Object>();
					flag = false;

					if (i == 24) {
						calendar.add(Calendar.DATE, 1);
						statDate = sdf.format(calendar.getTime());

					}
					dataTime = statDate + " " + timeRange[i];
					powerFactorCompareInfoMap.put("DATA_TIME", dataTime);

					for (int j = 0; j < powerFactorInfoList.size(); j++) {
						compareDataTime = StringUtil.removeNull(powerFactorInfoList.get(j).get("DATA_TIME"));
						if (compareDataTime.equals(dataTime)) {
							powerFactor = StringUtil.removeNull(powerFactorInfoList.get(j).get("POWER_FACTOR"));
							flag = true;

						}

					}
					if (flag) {
						powerFactorCompareInfoMap.put("POWER_FACTOR", powerFactor);
					} else {
						powerFactorCompareInfoMap.put("POWER_FACTOR", "");
					}

					powerFactorCompareInfoMap.put("COMPARE_DATA_TIME", dataTime);
					powerFactorCompareInfoMap.put("COMPARE_POWER_FACTOR", "");
					if (i < 13) {
						halfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					} else {
						secondHalfDayPowerFactorInfoList.add(powerFactorCompareInfoMap);
					}
					powerFactorCompareInfoList.add(powerFactorCompareInfoMap);
				}
			}
		}
	}
}
