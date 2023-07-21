import { Image, Typography } from 'antd';
import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const NewsDetailPage = () => {
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

  const formattedStartTime = moment(eventDetail.startTime).format('MMMM Do YYYY, h:mm a');
  const formattedEndTime = moment(eventDetail.endTime).format('MMMM Do YYYY, h:mm a');


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center mb-6">
          <Typography.Title level={2} className="text-gray-800 font-bold tracking-wide">
            {eventDetail.title}
          </Typography.Title>
        </div>
        <div className="flex justify-center items-center mb-6">
          <Image
            src={eventDetail.imageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"}
            alt={eventDetail.title}
            className="object-cover h-80 w-full max-h-full rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
        <div className="mx-10 my-8">
          <Typography.Paragraph className="text-gray-600 leading-relaxed mb-4">
            {eventDetail.description}
          </Typography.Paragraph>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography.Text className="text-gray-700 font-medium">Location</Typography.Text>
              <Typography.Text className="text-gray-900 font-normal">{eventDetail.location}</Typography.Text>
            </div>
            <div>
              <Typography.Text className="text-gray-700 font-medium">Start Time</Typography.Text>
              <Typography.Text className="text-gray-900 font-normal">{formattedStartTime}</Typography.Text>
            </div>
            <div>
              <Typography.Text className="text-gray-700 font-medium">End Time</Typography.Text>
              <Typography.Text className="text-gray-900 font-normal">{formattedEndTime}</Typography.Text>
            </div>
            <div>
              <Typography.Text className="text-gray-700 font-medium">Is Offline</Typography.Text>
              <Typography.Text className="text-gray-900 font-normal">
                {eventDetail.isOffline ? 'Yes' : 'No'}
              </Typography.Text>
            </div>
            <div>
              <Typography.Text className="text-gray-700 font-medium">Is Public School</Typography.Text>
              <Typography.Text className="text-gray-900 font-normal">
                {eventDetail.isPublicSchool ? 'Yes' : 'No'}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default NewsDetailPage