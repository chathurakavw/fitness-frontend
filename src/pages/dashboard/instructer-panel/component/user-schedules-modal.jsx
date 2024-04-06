import React, {useState} from 'react';
import {Modal, Table} from "antd";

const UserSchedulesModal = ({isUserScheduleModalOpen, setIsUserScheduleModalOpen, userScheduleList}) => {

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

    return (<Modal title="User Schedules" open={isUserScheduleModalOpen}
                   onCancel={() => setIsUserScheduleModalOpen(false)}>
        <Table columns={columns} dataSource={userScheduleList}/>
    </Modal>);
};

export default UserSchedulesModal;