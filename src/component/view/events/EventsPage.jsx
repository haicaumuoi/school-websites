import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents } from '../../../redux/slices/eventSlice';
import { Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';

const EventsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState({});//[hasNextPage, hasPreviousPage, items, pageNo, pageSize, totalCount
  const [pageNo, setPageNo] = useState(1);
  const [firstRender, setFirstRender] = useState(true);


  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        'https://alumniproject.azurewebsites.net/alumni/api/events',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: '*/*',
          },
          params: {
            pageNo: pageNo,
            pageSize: 6,
          },
        }
      );
      setLoading(false);
      setEventsData(res.data);
      setEvents((prevEvents) => [...prevEvents, ...res.data.items]);
      if (firstRender) {
        setFirstRender(false);
      }
    } catch (err) {
      setLoading(false);
      // Handle error here
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [token, pageNo]);



  if (firstRender) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="container mx-auto px-20 m-8">
      <div className="flex justify-center items-center w-full">
        <Typography.Title level={2}>Events</Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-14 m-8">
        {events?.map((eventItem, index) => (
          <div key={index}>
            <Link to={`/events/${eventItem?.id}`}>
              <Card
                className="w-full h-72 max-h-72"
                cover={
                  <div>
                    <img alt="example" src={eventItem?.imageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"} className="object-cover h-56 w-full max-h-full" />
                  </div>
                }
                hoverable
              >
                <Meta title={eventItem?.title} />
              </Card>
            </Link>
          </div>
        ))}
      </div>

      {eventsData?.hasNextPage && (
        loading ? (
          <div className="flex justify-center items-center h-20 mt-20" >
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={
                () => {
                  setPageNo(pageNo + 1);
                  setLoading(true);
                }}
            >
              Load More
            </button>
          </div >
        )
      )}
    </div>
  );
};


export default EventsPage