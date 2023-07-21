import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../utilities/commonServices/CommonService';
import axios from 'axios';
import { Avatar, Card, Col, Collapse, Modal, Row, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ReadFilled,
    BookFilled
} from "@ant-design/icons";
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';

const SchoolDetailPage = () => {
    const [studentList, setStudentList] = useState([]);
    const [studentListPageNo, setStudentListPageNo] = useState(1);
    const [studentListPageSize, setStudentListPageSize] = useState(8);
    const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
    const token = useSelector(state => state.authReducer.token);
    const [firstRender, setFirstRender] = useState(true);
    const id = location.pathname.split('/')[2];

    const fetchStudentList = async (id) => {
        try {
            const res = await axios.get(
                `https://alumniproject.azurewebsites.net/alumni/api/class/${id}/alumnis`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        classId: id,
                        pageNo: studentListPageNo,
                        pageSize: studentListPageSize,
                    }
                }
            );
            if (firstRender) {
                setFirstRender(false);
            }
            setStudentList(res.data.items);
            setStudentList((prevGrade) => [...prevGrade, ...res.data.items]);
            setStudentList((prevGrade) => [...prevGrade, ...res.data.items]);
        } catch (err) {
            addNotification("error", "", err.message);
        }
    };

    useEffect(() => {
        fetchStudentList(id);
    }, []);


    if (firstRender) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    } else {
        return (
            <div className="container mx-auto px-20 space-y-10">
                <div className="flex justify-center items-center w-full">
                    <Typography.Title level={2}>Class</Typography.Title>
                </div>
                <div className="flex flex-row space-x-4 justify-center">
                    <AnimatePresence>
                        <Row gutter={[16, 16]} className='w-full flex justify-center'>
                            {studentList.map((item) => (
                                <Col key={item.id} span={6}>
                                    <motion.div key={item.id} whileHover={{ y: -10 }}
                                        whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}>
                                        <Link to={`/profile/${item.id}`} >
                                            <Card
                                                cover={
                                                    <img
                                                        alt="example"
                                                        src={item.coverImage_url || "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} />
                                                }
                                                hoverable
                                            >
                                                <Meta
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                    avatar={<Avatar src={item.avatar_url || "https://xsgames.co/randomusers/avatar.php?g=pixel"} />}
                                                    title={item.fullName}
                                                    description={item.email}
                                                />
                                            </Card>
                                        </Link>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </AnimatePresence>
                </div>
            </div>
        )
    }
}

export default SchoolDetailPage