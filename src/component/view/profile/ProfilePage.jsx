import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Col, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

  const fetchProfileData = async () => {
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
      console.error('Error fetching profile data:', err);
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchProfileData();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={6}>
          <Card>
            <Avatar
              size={128}
              src={
                profile.avatar_url ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'
              }
            />
            <h1 className="mt-4 text-xl font-bold">{profile.fullName}</h1>
            <p className="mt-2">{profile.bio}</p>
          </Card>
        </Col>
        <Col xs={24} md={18}>
          <Card>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <p>Email: {profile.email}</p>
              </Col>
              <Col xs={24} md={12}>
                <p>Phone: {profile.phone}</p>
              </Col>
              <Col xs={24} md={12}>
                <p>Date of Birth: {profile.dateOfBirth}</p>
              </Col>
              <Col xs={24} md={12}>
                {profile.faceBook_url && (
                  <p>
                    Facebook: <a href={profile.faceBook_url}>Visit Profile</a>
                  </p>
                )}
              </Col>
            </Row>
            <Button className="mt-4" icon={<EditOutlined />}>
              Edit Profile
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
