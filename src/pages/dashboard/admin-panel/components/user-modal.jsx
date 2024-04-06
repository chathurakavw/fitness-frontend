import React, {useEffect, useState} from 'react';
import {DatePicker, Form, Input, Modal, notification, Select} from "antd";
import {accountCreation, fetchRoleList, updateUser} from "../../../../services/api-services";
import moment from "moment";

const {Option} = Select;
const UserModal = ({isModalOpen, setIsModalOpen, user}) => {

    const [form] = Form.useForm();
    const [userRoleList, setUserRoleList] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        (async () => {
            const response = await fetchRoleList();
            const {status, data} = response.data;
            if (status) {
                setUserRoleList(data)
            }
        })();

        if (user) {
            form.setFieldsValue({
                ...user,
                dob: moment(user.dob).format('YYYY-MM-DD')
            })
        }
    }, []);

    const handleOk = async () => {
        try {
            const values = await form?.validateFields();
            let response = {};
            if (user) {
                response = await updateUser(values);
            } else {
                response = await accountCreation(values);
            }

            if (response.data.status) {
                api.success({
                    message: response.data.message,
                    placement: "topRight",
                });
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000)
            } else {
                api.warning({
                    message: response.data.message,
                    placement: "topRight",
                });
            }
        } catch (error) {
            console.log('Failed:', error);
        }
    };

    return (
        <Modal title={user ? "Update User" : "Create User"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            {contextHolder}
            <Form layout="vertical" form={form} name="form_in_modal">

                <Form.Item
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the fullName',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Date of birthday"
                    name="dob"
                >
                    <DatePicker/>
                </Form.Item>

                <Form.Item
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: "Required"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="User Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the username',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item name="roleId" label="Role">
                    <Select
                        style={{
                            width: "100%",
                        }}
                    >
                        {
                            userRoleList.map(role => (
                                <Option value={role.id}>{role.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UserModal;