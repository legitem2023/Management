import React from 'react';
const TimestampConverter = ({ timestamp }) => {
    const time_stamp = parseInt(timestamp)
    const date: any = new Date(time_stamp);
    return <span>{date.toLocaleDateString('en-PH', { timeZone: 'Asia/Manila' })}</span >;
};

export default TimestampConverter;
