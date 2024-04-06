import {getPaymentList} from "../../../../services/api-services";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {notification, Table} from "antd";
import moment from "moment";

const PaymentTab = () => {

    const {userId} = useSelector(({loginSlice}) => loginSlice);
    const [api, contextHolder] = notification.useNotification();
    const [paymentList, setPaymentList] = useState([]);

    const columns = [
        {
            title: 'Pay Amount',
            dataIndex: 'payAmount',
            key: 'payAmount',
        },
        {
            title: 'Pay For Month',
            dataIndex: 'payForMonth',
            key: 'payForMonth',
            render: (_, record) => <>{moment(record.payForMonth).format('YYYY-MM-DD')}</>,
        },
        {
            title: 'Pay Date',
            dataIndex: 'payDate',
            key: 'payDate',
            render: (_, record) => <>{moment(record.payDate).format('YYYY-MM-DD')}</>,
        },
    ];

    const getUserPaymentList = async (id) => {
        const response = await getPaymentList(id);
        const {status, data} = response.data;
        if (status) {
            if (data.length > 0) {
                setPaymentList(data);
            }
        }
    }

    useEffect(() => {
        getUserPaymentList(userId);
    }, [userId])

    return (
        <div>
            {contextHolder}
            <Table columns={columns} dataSource={paymentList}/>
        </div>
    );
};

export default PaymentTab;