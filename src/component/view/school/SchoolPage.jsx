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
import Link from 'antd/es/typography/Link';

const SchoolPage = () => {
    const token = useSelector(state => state.authReducer.token);
    const [grades, setGrades] = useState([]);
    const [gradeLoading, setGradeLoading] = useState(false);
    const [classList, setClassList] = useState([]);
    const [classListLoading, setClassListLoading] = useState(false);
    const [firstRender, setFirstRender] = useState(true);
    const [gradePageSize, setGradePageSize] = useState(6);
    const [gradePageNo, setGradePageNo] = useState(1);
    const [classPageSize, setClassPageSize] = useState(6);
    const [classPageNo, setClassPageNo] = useState(1);
    const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);

    const [chosenGrade, setChosenGrade] = useState({});

    const fetchGrade = async () => {
        try {
            const res = await axios.get(
                "https://alumniproject.azurewebsites.net/alumni/api/school/grades",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        pageNo: gradePageNo,
                        pageSize: gradePageSize,
                    }
                }
            );
            if (firstRender) {
                setFirstRender(false);
            }

            setGrades((prevGrade) => [...prevGrade, ...res.data.items]);
            setGradeLoading(false);
        } catch (err) {
            addNotification("error", "", "Fetch grade failed");
            setGradeLoading(false);
        }
    };

    const fetchClasses = async (gradeId) => {
        setClassListLoading(true);
        try {
            const res = await axios.get(
                "https://alumniproject.azurewebsites.net/alumni/api/grades/classes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        gradeId: gradeId,
                        pageNo: classPageNo,
                        pageSize: classPageSize,
                    }
                }
            );
            setClassList(res.data.items);
            setClassListLoading(false);
        } catch (err) {
            addNotification("error", "", "Fetch classes failed");
            setClassListLoading(false);
        }
    };




    useEffect(() => {
        fetchGrade();
    }, [gradePageNo]);

    const openCollapseGrade = (key, gradeId) => {
        fetchClasses(gradeId);
    };

    if (firstRender) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    } else {
        return (
            <div className="container mx-auto px-20 m-8 space-y-10">
                <div className="flex justify-center items-center w-full">
                    <Typography.Title level={2}>Grades</Typography.Title>
                </div>
                <div className="flex flex-row space-x-4 justify-center">
                    <AnimatePresence>
                        <Row gutter={[32, 32]} align={'middle'} className='w-full flex justify-center'>
                            {grades?.map((grade, index) => (
                                <Col key={index} span={4} className='justify-center flex'>
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -10 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                    >
                                        <Card
                                            className="w-40 max-w-[200px]"
                                            style={{
                                                backgroundColor: schoolTheme,
                                            }}
                                            bordered={false}
                                            bodyStyle={{
                                                padding: '16px',
                                            }}
                                            onClick={() => openCollapseGrade(index, grade?.id)}
                                            hoverable
                                        >
                                            <div className="text-center text-white flex flex-col items-center space-y-2 justify-center">
                                                <ReadFilled className="text-4xl" />
                                                <Typography.Title style={{ color: '#fff' }} level={3}>
                                                    {grade?.code}
                                                </Typography.Title>
                                                <Typography.Text style={{ color: '#fff' }}>
                                                    {grade?.startYear} - {grade?.endYear}
                                                </Typography.Text>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </Col>
                            ))}
                        </Row>
                    </AnimatePresence>
                </div>
                <div className="flex justify-center items-center w-full space-x-4">
                    {classList && (
                        <AnimatePresence>
                            <Row gutter={[32, 32]} align={'middle'} className='w-full flex justify-center'>
                                {classList?.map((classList, index) => (
                                    <Col key={index} span={4} className='justify-center flex'>
                                        <motion.div key={index} whileHover={{ y: -10 }}
                                            whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}>
                                            <Link href={`/school/${classList?.id}`}>
                                                <Card
                                                    className="w-40 max-w-[200px] shadow-lg"
                                                    style={{
                                                        backgroundColor: 'fff'
                                                    }}
                                                    bordered={false}
                                                    bodyStyle={{
                                                        padding: '16px',
                                                    }}
                                                    onClick={() => {
                                                        fetchStudentList(classList?.id)
                                                    }}
                                                    hoverable
                                                >
                                                    <div className='text-center text-white flex flex-col items-center space-y-2 justify-center'>
                                                        <BookFilled className='text-4xl' style={{
                                                            color: schoolTheme
                                                        }} />
                                                        <Typography.Title style={{
                                                            color: schoolTheme
                                                        }} level={3}>
                                                            {classList?.name}
                                                        </Typography.Title>
                                                        <Typography.Text style={{
                                                            color: schoolTheme
                                                        }}>Numbers: {classList?.numberOfAlumni}</Typography.Text>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </motion.div>
                                    </Col>
                                ))}
                            </Row>
                        </AnimatePresence>
                    )}
                </div>
            </div >
        )
    }
}

export default SchoolPage