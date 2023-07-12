import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getEventDetail } from '../../../redux/slices/eventSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from 'antd';

const EventDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [eventDetail, setEventDetail] = useState({});
  const eventDetailData = useSelector((state) => state.eventReducer.eventDetail);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventDetail({ token, id })).then(() => {
      setEventDetail(eventDetailData);
    });
  }, []);

  return (
    <div className="container mx-20 my-8">
      <div className="flex justify-center items-center w-full">
        <Typography.Title level={2}>{eventDetail.title}</Typography.Title>
      </div>
      <div className="flex justify-center items-center w-full">
        <img src={eventDetail.imageUrl} alt={eventDetail.title} className="object-cover h-80 w-full max-h-full" />
      </div>
      <div className="mx-10 my-8">
        <p>{eventDetail.description}</p>
        <div className="my-4">
          <p>Location: {eventDetail.location}</p>
          <p>Start Time: {new Date(eventDetail.startTime).toLocaleString()}</p>
          <p>End Time: {new Date(eventDetail.endTime).toLocaleString()}</p>
          <p>Is Offline: {eventDetail.isOffline ? 'Yes' : 'No'}</p>
          <p>Is Public School: {eventDetail.isPublicSchool ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage