import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPerson } from '../../../redux/slices/profileSlice';
import { Avatar, Button, Card, Col, Row } from 'antd';

const ProfilePage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  const profileData = useSelector((state) => state.profileReducer?.profile);

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    dispatch(getPerson(token)).then(() => {
      setProfile(profileData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }
  return (
    <div className="container mx-auto my-8">
      <Row gutter={[32, 32]}>
        <Col span={6}>
          <Card>
            <Avatar size={128} src={profile.avatar_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png'} />
            <h1 className="mt-4 text-xl font-bold">{profile.fullName}</h1>
            <p className="mt-2">{profile.bio}</p>
          </Card>
        </Col>
        <Col span={18}>
          <Card>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <p>Email: {profile.email}</p>
              </Col>
              <Col span={12}>
                <p>Phone: {profile.phone}</p>
              </Col>
              <Col span={12}>
                <p>Date of Birth: {profile.dateOfBirth}</p>
              </Col>
              <Col span={12}>
                {profile.faceBook_url && (
                  <p>
                    Facebook: <a href={profile.faceBook_url}>Visit Profile</a>
                  </p>
                )}
              </Col>
            </Row>
            <Button className="mt-4">
              Edit Profile
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProfilePage