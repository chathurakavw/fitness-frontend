import React, {useEffect, useState} from 'react';
import {Form, Input, Modal, notification, Select} from "antd";
import {createSchedule, fetchScheduleTypeList} from "../../../../services/api-services";

const {Option} = Select;
const ScheduleModal = ({isModalOpen, setIsModalOpen, user}) => {

    const [form] = Form.useForm();
    const [scheduleTypeList, setScheduleTypeList] = useState([]);

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        (async () => {
            const response = await fetchScheduleTypeList();
            const {status, data} = response.data;
            debugger
            if (status) {
                setScheduleTypeList(data)
            }
        })();

        form.setFieldsValue({
            userId: user.id
        })

    }, []);

    const handleOk = async () => {
        try {
            const values = await form?.validateFields();
            debugger
            const response = await createSchedule(values);
            if (response.data.status) {
                api.success({
                    message: response.data.message,
                    placement: "topRight",
                });
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000)
            } else {
                api.error({
                    message: response.data.message,
                    placement: "topRight",
                });
            }
        } catch (error) {
            console.log('Failed:', error);
        }
    };

    return (
        <Modal title="Create Schedule" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            {contextHolder}
            <Form layout="vertical" form={form} name="form_in_modal">

                <Form.Item
                    name="userId"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the description',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item name="scheduleTypeId" label="Schedule Type">
                    <Select
                        style={{
                            width: "100%",
                        }}
                    >
                        {
                            scheduleTypeList.map(schedule => (
                                <Option value={schedule.id}>{schedule.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ScheduleModal;