import React, {useEffect, useState} from 'react';
import "./AdminPanel.scss";
import {Button, Col, notification, Popconfirm, Row, Space, Table} from "antd";
import {deleteUser, fetchUserList} from "../../../services/api-services";
import UserModal from "./components/user-modal";
import PaymentModal from "./components/payment-modal";

const AdminPanel = () => {
    const [api, contextHolder] = notification.useNotification();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [user, setUser] = useState();
    const showModal = () => {
        setIsModalOpen(true);
    };

    const [userList, setUserList] = useState([]);

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
                        Edit
                    </Button>
                    <Button type="primary" shape="circle" onClick={() => {
                        setUser(record);
                        setIsPaymentModalOpen(true);
                    }}>
                        Create Payment
                    </Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                    <Button type="primary" shape="circle">
                        Delete
                    </Button>
                    </Popconfirm>
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

    useEffect(() => {
        if(!isModalOpen) {
            getUsers();
        }
    }, [isModalOpen]);

    const handleDeleteUser = async (id) => {
        const response = await deleteUser(id);
        const {status} = response.data;
        if (status) {
            api.success({
                message: response.data.message,
                placement: "topRight",
            });
            getUsers();
        }
    }

    return (
        <>
            {contextHolder}
            <Row gutter={16}>
                <Col className="gutter-row" span={6}>
                    <Button type="primary" htmlType="button" onClick={showModal}>Create User</Button>
                </Col>
            </Row>

            <Row gutter={16}>
                <Table columns={columns} dataSource={userList}/>
            </Row>

            {
                isModalOpen && (
                    <UserModal
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        user={user}
                    />
                )
            }

            {
                isPaymentModalOpen && (
                    <PaymentModal
                        isModalOpen={isPaymentModalOpen}
                        setIsModalOpen={setIsPaymentModalOpen}
                        user={user}
                    />
                )
            }
        </>
    );
};

export default AdminPanel;