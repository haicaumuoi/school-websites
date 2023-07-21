import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Col, Modal, Row, DatePicker, Input, Form, Image } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { addNotification } from '../../utilities/commonServices/CommonService';

const { TextArea } = Input;

const ProfilePage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
  const profileId = location.pathname.split('/')[2];

  const [modalOpen, setModalOpen] = useState(false);

  const fetchPersonalData = async () => {
    try {
      const res = await axios.get(
        'https://alumniproject.azurewebsites.net/alumni/api/alumnis',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
        }
      );
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      addNotification('error', '', err.message);
      setLoading(false);
    }
  };

  const fetchAlumniData = async () => {
    try {
      const res = await axios.get(
        'https://alumniproject.azurewebsites.net/alumni/api/alumnis/info',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
          params: {
            alumniId: profileId,
          },
        }
      );
      setProfile(res.data);
      setLoading(false);
    } catch (err) {
      addNotification('error', '', err.message);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.put(
        'https://alumniproject.azurewebsites.net/alumni/api/alumnis',
        {
          ...values,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
        }
      );
      setProfile(res.data);
      setLoading(false);
      setModalOpen(false);
      addNotification('success', '', 'Profile Updated Successfully');
    } catch (err) {
      addNotification('error', '', err.message);
      setLoading(false);
    }
  };




  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    if (profileId) {
      setLoading(true)
      fetchAlumniData(profileId);
    } else {
      setLoading(true)
      fetchPersonalData();
    }
  }, [token, profileId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 max-w-screen-2xl">
      <Row gutter={[32, 32]} align={'middle'}>
        <Col xs={24} md={7} className='h-full'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className='h-full'
          >
            <div className="flex flex-col items-center -ml-16 pl-8 min-w-[30%] h-full" >
              <Card style={{ backgroundColor: schoolTheme }} className='w-full h-full'>
                <div className="my-4 ml-8 text-xl font-bold">{profile.fullName}</div>
                <div className="ml-8 font-light">{profile.bio || "No Bio"}</div>
              </Card>
            </div>
          </motion.div>
        </Col>
        <Col xs={24} md={10} className='flex justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='h-full relative'
          >
            <Image src={profile?.coverImage_url} className='w-full h-full rounded-lg' />
            <Avatar
              size={180}
              src={
                profile?.avatar_url ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
              }
              className='absolute bottom-[20%] left-[50%] transform -translate-x-1/2 translate-y-1/2 border-4 border-white'
            />
          </motion.div>
        </Col>
        <Col xs={24} md={7} className='overflow-clip h-full' >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}

          >
            <Card className='-mr-16 w-full' style={{ backgroundColor: schoolTheme }}>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <Row gutter={[8, 8]} >
                <Col xs={24}>
                  <div>Email: {profile.email}</div>
                </Col>
                <Col xs={24}>
                  <div>Phone: {profile.phone}</div>
                </Col>
                <Col xs={24}>
                  <div>Date of Birth: {moment(profile.dateOfBirth).format('Do MMM YY')}</div>
                </Col>
                <Col xs={24}>
                  {profile.faceBook_url && (
                    <div>
                      Facebook: <a href={profile.faceBook_url}>Visit Profile</a>
                    </div>
                  )}
                </Col>
              </Row>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {!profileId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center mt-20">
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            size="large"
            style={{
              backgroundColor: schoolTheme,
            }}
            onClick={() => setModalOpen(true)}
          >
            Edit Profile
          </Button>
          <Modal
            visible={modalOpen === true}
            onCancel={() => setModalOpen(false)}
            footer={null}
            width="40%"
            closable
            centered
            bodyStyle={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              paddingTop: '10px'
            }}
          >
            <div className='flex justify-start mx-4 w-full mt-3'>
              <Form className='w-full flex justify-start flex-col ' onFinish={onFinish}
                initialValues={{ ...profile, dateOfBirth: moment(profile?.dateOfBirth) }}>
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  rules={[{ required: true, message: 'Please enter your full name.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[{ required: true, message: 'Please enter your phone number.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please select your date of birth.' }]}
                >
                  <DatePicker />
                </Form.Item>
                <Form.Item
                  label="Avatar URL"
                  name="avatar_url"
                  rules={[{ required: true, message: 'Please enter your avatar URL.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Cover Image URL"
                  name="coverImage_url"
                  rules={[{ required: true, message: 'Please enter your cover image URL.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Facebook URL"
                  name="faceBook_url"
                  rules={[{ required: true, message: 'Please enter your Facebook URL.' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bio"
                  name="bio"
                  rules={[{ required: true, message: 'Please enter your bio.' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button style={{
                    backgroundColor: schoolTheme,
                  }} type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>

          </Modal>
        </motion.div>
      )}
    </div>
  );
};

export default ProfilePage;
