import React from 'react';
import "./Registration.scss";
import {Button, Col, DatePicker, Form, Input, notification,} from 'antd';
import PageRoutes from "../../constants/page-routes";
import {useNavigate} from "react-router-dom";
import {customerRegistration} from "../../services/api-services";
import mainLogo from "../../assets/images/main-logo.png";
import Password from "antd/es/input/Password";

const Registration = () => {

    const [api, contextHolder] = notification.useNotification();
    const onFinish = async (values) => {
        const response = await customerRegistration(values);
        if (response.data.status) {
            api.success({
                message: response.data.message,
                placement: "topRight",
            });
            setTimeout(() => {
                navigate(`${PageRoutes.LOGIN}`)
            }, 1000)
        } else {
            api.warning({
                message: response.data.message,
                placement: "topRight",
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="registration">
            {contextHolder}
            <div className="left-card">
                <div className="form-wrapper">
                    <h2 className="form-heading">Sign-up</h2>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className="form"
                    >
                        <div className="form-card">
                            <div className="form-card-left">
                                <Form.Item
                                    label="Full Name"
                                    name="fullName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        }
                                    ]}
                                    className="form"
                                >
                                    <Input className="text-box"/>
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
                                    <Input className="text-box"/>
                                </Form.Item>

                                <Form.Item
                                    label="Date of birthday"
                                    name="dob"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        }
                                    ]}
                                >
                                    <DatePicker className="text-box"/>
                                </Form.Item>
                            </div>

                            <div className="form-card-right">
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        }
                                    ]}
                                >
                                    <Input className="text-box"/>
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        }
                                    ]}
                                >
                                    <Input className="text-box"/>
                                </Form.Item>

                                <Form.Item
                                    label="Re-type Password"
                                    name="re-password"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Required"
                                        }
                                    ]}
                                >
                                    <Password className="text-box w-100"/>
                                </Form.Item>
                            </div>
                        </div>


                        <div className="buttons">
                            <Button className="main-button" type="primary" htmlType="submit">Register</Button>
                        </div>
                    </Form>
                </div>
            </div>

            <div className="right-card">
                <img src={mainLogo} alt=""/>
            </div>
        </div>
    );
};

export default Registration;