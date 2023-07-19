import { Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const EventDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [eventDetail, setEventDetail] = useState({});
  const token = useSelector((state) => state.authReducer?.token);
  const [loading, setLoading] = useState(true);

  const fetchEventDetail = async () => {
    try {
      const res = await axios.get(
        `https://alumniproject.azurewebsites.net/alumni/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
          params: {
            eventId: id,
          },
        }
      );
      setEventDetail(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      addNotification("error", "", "Get event detail failed");
    }
  };


  useEffect(() => {
    fetchEventDetail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="container mx-20 my-8">
        <div className="flex justify-center items-center w-full">
          <Typography.Title level={2} className="text-gray-800 font-bold tracking-wide">{eventDetail.title}</Typography.Title>
        </div>
        <div className="flex justify-center items-center w-full">
          <img src={eventDetail.imageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"} alt={eventDetail.title} className="object-cover h-80 w-full max-h-full rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out" />
        </div>
        <div className="mx-10 my-8">
          <Typography.Paragraph className="text-gray-600 leading-relaxed">{eventDetail.description}</Typography.Paragraph>
          <div className="my-4 grid grid-cols-2 gap-4">
            <Typography.Text className="text-gray-700 font-medium">Location: <span className="text-gray-900 font-normal">{eventDetail.location}</span></Typography.Text>
            <Typography.Text className="text-gray-700 font-medium">Start Time: <span className="text-gray-900 font-normal">{new Date(eventDetail.startTime).toLocaleString()}</span></Typography.Text>
            <Typography.Text className="text-gray-700 font-medium">End Time: <span className="text-gray-900 font-normal">{new Date(eventDetail.endTime).toLocaleString()}</span></Typography.Text>
            <Typography.Text className="text-gray-700 font-medium">Is Offline: <span className="text-gray-900 font-normal">{eventDetail.isOffline ? 'Yes' : 'No'}</span></Typography.Text>
            <Typography.Text className="text-gray-700 font-medium">Is Public School: <span className="text-gray-900 font-normal">{eventDetail.isPublicSchool ? 'Yes' : 'No'}</span></Typography.Text>
          </div>
        </div>
      </div>


    )
  }
}

export default EventDetailPage