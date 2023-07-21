import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '../../utilities/commonServices/CommonService';
import axios from 'axios';
import { Avatar, Button, Card, Col, Collapse, Input, Modal, Row, Typography } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FrownOutlined,
    PlusOutlined,
    SearchOutlined
} from "@ant-design/icons";
import Meta from 'antd/es/card/Meta';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const SchoolDetailPage = () => {
    const [studentList, setStudentList] = useState([]);
    const [studentListPageNo, setStudentListPageNo] = useState(1);
    const [studentListPageSize, setStudentListPageSize] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [studentListLoading, setStudentListLoading] = useState(false);
    const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
    const token = useSelector(state => state.authReducer.token);
    const [firstRender, setFirstRender] = useState(true);
    const id = location.pathname.split('/')[2];
    const [studentListData, setStudentListData] = useState({});

    // Define a debounce function to delay the search request
    const delayedSearch = _.debounce((value) => {
        onSearch(value); // Call the search function with the current search term
    }, 2000); // Set the delay time in milliseconds (500ms in this case)

    const handleSearch = (value) => {
        setSearchTerm(value); // Update the search term in the component state
        delayedSearch(value); // Call the debounce function with the current value
    };

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
            setStudentListData(res.data);
            setStudentList((prevGrade) => [...prevGrade, ...res.data.items]);
        } catch (err) {
            addNotification("error", "", err.message);
        }
    };

    const fetchStudentListSearch = async (search) => {
        try {
            const res = await axios.get(
                `https://alumniproject.azurewebsites.net/alumni/api/alumnis/filter`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        classId: id,
                        searchText: search,
                        pageNo: studentListPageNo,
                        pageSize: studentListPageSize,
                    }
                }
            );
            if (firstRender) {
                setFirstRender(false);
            }
            setStudentList(res.data.items);
        } catch (err) {
            addNotification("error", "", err.message);
        }
    };

    const sendRequest = async () => {
        try {
            const res = await axios
                .post(
                    "https://alumniproject.azurewebsites.net/alumni/api/accessReqeuest",
                    { alumniClassId: id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            if (res.status === 200)
                addNotification("success", "", "Send request successfully");
        } catch (err) {
            if (err.response.status === 409) {
                addNotification("error", "", "You already in this class or requested to this class");
                return;
            } else {
                addNotification("error", "", "Send request failed");
            }
        }

    }


    useEffect(() => {
        if (searchTerm !== '') {
            setStudentListLoading(true);
            fetchStudentListSearch(searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        fetchStudentList(id);
    }, [studentListPageNo, studentListPageSize]);



    if (firstRender) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    } else {
        return (
            <div className="container mx-auto px-20 space-y-10 relative">
                <Button
                    className="flex justify-center w-10 h-10 border-none items-center rounded-full text-white fixed top-40 right-20 z-20"
                    onClick={sendRequest}
                    style={{
                        backgroundColor: schoolTheme,
                    }}
                >
                    <PlusOutlined />
                </Button>
                <div className="flex justify-center items-center w-full relative">
                    <Typography.Title level={2}>Class</Typography.Title>
                </div>
                <div className="w-full flex justify-center mt-6 mb-12">
                    <Input
                        placeholder="Search"
                        prefix={<SearchOutlined className="pr-4 " />}
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-80 text-lg"

                    />
                </div>
                {studentList.length !== 0 ? (
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
                ) : (
                    <div className="flex justify-center items-center w-full flex-col space-y-8">
                        <div className='text-8xl'>
                            <FrownOutlined />
                        </div>
                        <Typography.Title level={4}>No student in this class</Typography.Title>
                    </div>
                )}

                {
                    studentListData?.hasNextPage && (
                        studentListLoading ? (
                            <div className="flex justify-center items-center h-20 mt-20" >
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center w-full">
                                <button
                                    className=" text-white font-bold py-2 px-4 rounded hover:bg-blend-darken hover:-translate-y-1 transition-all"
                                    style={{
                                        backgroundColor: schoolTheme

                                    }}
                                    onClick={
                                        () => {
                                            setStudentListPageNo(studentListPageNo + 1);
                                            setStudentListLoading(true);
                                        }}
                                >
                                    Load More
                                </button>
                            </div >
                        )
                    )
                }
            </div>
        )
    }
}

export default SchoolDetailPage