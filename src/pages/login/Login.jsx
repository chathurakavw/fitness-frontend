import React, {useState} from 'react';
import "./Login.scss";
import {Button, Form, Input, notification} from "antd";
import Password from "antd/es/input/Password";
import {useNavigate} from "react-router-dom";
import PageRoutes from "../../constants/page-routes";
import {login} from "../../services/api-services";
import {useDispatch} from "react-redux";
import loginSlice from "../../store/login-slice";
import mainLogo from "../../assets/images/main-logo.png";

const Login = () => {
    const [api, contextHolder] = notification.useNotification();

    const dispatch = useDispatch();

    const onFinish = async (values) => {
        const response = await login(values);
        const {status, data} = response.data;
        if (status) {
            dispatch(loginSlice.actions.setUserId(data));
            if (data.roleName === "CUSTOMER") {
                navigate(`${PageRoutes.USERPANEL}`);
            } else if (data.roleName === "ADMIN") {
                navigate(`${PageRoutes.ADMINPANEL}`);
            } else if (data.roleName === "INSTRUCTOR") {
                navigate(`${PageRoutes.INSTRUCTORPANEL}`);
            }
        } else {
            api.error({
                message: `Incorrect username/password`,
                description: "",
                placement: "topRight",
            });
        }
    };

    const navigate = useNavigate();

    return (
        <div className="login">
            {contextHolder}
            <div className="left-card">
                <div className="form-wrapper">
                    <h2 className="form-heading">Log-in</h2>
                    <Form
                        layout="vertical"
                        onFinish={onFinish}
                        className="form"
                    >
                        <div>
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
                                <Password className="text-box w-100"/>
                            </Form.Item>
                        </div>

                        <div className="buttons">
                            <Button className="main-button" type="primary" htmlType="submit">Log in</Button>
                            {/*<Button className="main-button" type="primary" onClick={() => navigate(`${PageRoutes.REGISTRATION}`)}>Sign*/}
                            {/*    up</Button>*/}
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

export default Login;