import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getEvents } from '../../../redux/slices/eventSlice';
import { Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';

const EventsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const eventsData = useSelector((state) => state.eventReducer.events);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    dispatch(getEvents({ token, pageNo })).then(() => {
      setEvents(eventsData.items);
      setLoading(false);
    });
  }, [pageNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-20 m-8">
      <div className="flex justify-center items-center w-full">
        <Typography.Title level={2}>Events</Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-14 m-8">
        {events?.map((eventItem, index) => (
          <div key={index}>
            <Link to={`/events/${eventItem.id}`}>
              <Card
                className="w-full h-72 max-h-72"
                cover={
                  <div>
                    <img alt="example" src={eventItem.imageUrl} className="object-cover h-56 w-full max-h-full" />
                  </div>
                }
                hoverable
              >
                <Meta title={eventItem.title} />
              </Card>
            </Link>
          </div>
        ))}
        {eventsData?.hasNextPage && (
          <div className="flex justify-center items-center w-full">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setPageNo(pageNo + 1);
                setLoading(true);
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


export default EventsPage