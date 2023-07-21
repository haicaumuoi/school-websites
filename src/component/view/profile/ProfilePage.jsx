import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Col, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { addNotification } from '../../utilities/commonServices/CommonService';

const ProfilePage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
  const profileId = location.pathname.split('/')[2];


  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

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
      <Row gutter={[32, 32]}>
        <Col xs={24} md={9} className='h-full'>
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
        <Col xs={24} md={6} className='flex justify-center items-center'>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className='h-full'
          >
            <Avatar
              size={180}
              src={
                profile?.avatar_url ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
              }
            />
          </motion.div>
        </Col>
        <Col xs={24} md={9} className='overflow-clip h-full' >
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
    </div>
  );
};

export default ProfilePage;
