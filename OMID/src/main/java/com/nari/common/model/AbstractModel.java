package com.nari.common.model;


import org.apache.commons.lang3.builder.ToStringBuilder;

import com.nari.common.service.ICommonService;
import com.nari.common.util.SpringContextUtil;

/**
 * 
 */
public abstract class AbstractModel implements java.io.Serializable {
    
    private static final long serialVersionUID = 2035013017939483936L;


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    
    public void save() {
        ICommonService commonService = SpringContextUtil.getBean("CommonService");
        commonService.save(this);
    }
    
    public void delete() {
        ICommonService commonService = SpringContextUtil.getBean("CommonService");
        commonService.deleteObject(this);
    }
    
    public void update() {
        ICommonService commonService = SpringContextUtil.getBean("CommonService");
        commonService.update(this);
    }
}
