import React, {useEffect} from 'react';
import {DatePicker, Form, Input, Modal, notification, Select} from "antd";
import {createPayment} from "../../../../services/api-services";
import moment from "moment/moment";

const {Option} = Select;
const PaymentModal = ({isModalOpen, setIsModalOpen, user}) => {

    const [form] = Form.useForm();

    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        form.setFieldsValue({
            userId: user.id
        })
    }, []);
    const handleOk = async () => {
        try {
            const values = await form?.validateFields();
            const response = await createPayment(values);

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
        <Modal title={"Create Payment"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
            {contextHolder}
            <Form layout="vertical" form={form} name="form_in_modal">

                <Form.Item
                    name="userId"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="payAmount"
                    label="Pay Amount"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the payAmount',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Pay For Month"
                    name="payForMonth"
                >
                    <DatePicker/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default PaymentModal;