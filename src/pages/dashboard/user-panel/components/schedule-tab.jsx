import {userSchedules} from "../../../../services/api-services";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {notification, Table} from "antd";

const ScheduleTab = () => {

    const {userId} = useSelector(({loginSlice}) => loginSlice);
    const [api, contextHolder] = notification.useNotification();
    const [userScheduleList, setUserScheduleList] = useState([]);

    const columns = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Schedule Name',
            key: 'description',
            render: (_, record) => <>{record.scheduleTypeByscheduleTypeId?.name}</>,
        },
    ];

    const getUserSchedules = async (id) => {
        const response = await userSchedules(id);
        const {status, data} = response.data;
        if (status) {
            if (data.length > 0) {
                setUserScheduleList(data);
            }
        }
    }

    useEffect(() => {
        getUserSchedules(userId);
    }, [userId])

    return (
        <div>
            {contextHolder}
            <Table columns={columns} dataSource={userScheduleList}/>
        </div>
    );
};

export default ScheduleTab;