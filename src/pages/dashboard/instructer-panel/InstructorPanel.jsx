import React, {useEffect, useState} from 'react';
import "./InstructorPanel.scss";
import {Button, notification, Row, Space, Table} from "antd";
import {fetchUserList, userSchedules} from "../../../services/api-services";
import ScheduleModal from "./component/schedule-modal";
import UserSchedulesModal from "./component/user-schedules-modal";

const InstructorPanel = () => {

    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserScheduleModalOpen, setIsUserScheduleModalOpen] = useState(false);
    const [user, setUser] = useState();

    const [userList, setUserList] = useState([]);
    const [userScheduleList, setUserScheduleList] = useState([]);

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" shape="circle" onClick={() => {
                        setUser(record);
                        setIsModalOpen(true);
                    }}>
                        Create Schedule
                    </Button>

                    <Button type="primary" shape="circle" onClick={ () => getUserSchedules(record.id)}>
                        User Schedules
                    </Button>
                </Space>
            ),
        },
    ];

    const getUsers = async () => {
        const response = await fetchUserList();
        const {status, data} = response.data;
        if (status) {
            setUserList(data)
        }
    }

    const getUserSchedules = async (id) => {
        const response = await userSchedules(id);
        const {status, data} = response.data;
        debugger
        if (status) {
            if (data.length > 0) {
                setUserScheduleList(data);
                setIsUserScheduleModalOpen(true);
            }
        } else {
            api.info({
                message: "Schedules are not found",
                placement: "topRight",
            });
        }
    }

    useEffect(() => {
        if (!isModalOpen) {
            getUsers();
        }
    }, [isModalOpen]);

    return (
        <>
            {contextHolder}
            <Row gutter={16}>
                <Table columns={columns} dataSource={userList}/>
            </Row>

            {
                isModalOpen && (
                    <ScheduleModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        user={user}
                    />
                )
            }

            {
                isUserScheduleModalOpen && (
                    <UserSchedulesModal
                        isUserScheduleModalOpen={isUserScheduleModalOpen}
                        setIsUserScheduleModalOpen={setIsUserScheduleModalOpen}
                        userScheduleList={userScheduleList}
                    />
                )
            }
        </>
    );
};

export default InstructorPanel;