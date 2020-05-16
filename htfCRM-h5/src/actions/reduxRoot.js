const reduxRoot = {
    orderSearch: {
        create_start_time: null,  //查询开始值
        create_end_time: null,  //查询结束值
        product_name: null,  //货品名称
        trade_type_enum: null, //订单类型
        order_status_enum: null,  //订单状态
        order_id_set: null,  //订单id列表，不能多于20个
        biz_type_str_set: null,  //业务过滤类型（如代销）
        name: 0
    }

};

export default reduxRoot;