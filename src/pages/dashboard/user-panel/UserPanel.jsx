import React, {useEffect, useState} from 'react';
import "./UserPanel.scss";
import {Modal, notification, Table, Tabs} from "antd";
import {userSchedules} from "../../../services/api-services";
import {useSelector} from "react-redux";
import ScheduleTab from "./components/schedule-tab";
import PaymentTab from "./components/payment-tab";

const UserPanel = () => {

    const items = [
        {
            key: '1',
            label: 'Schedule',
            children: <ScheduleTab/>,
        },
        {
            key: '2',
            label: 'Payments',
            children: <PaymentTab/>,
        },
    ];

    return (
        <>
            <Tabs defaultActiveKey="1" items={items}/>
        </>
    )
};

export default UserPanel;