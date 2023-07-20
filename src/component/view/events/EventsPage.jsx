import {
  ClockCircleFilled,
  EnvironmentFilled
} from '@ant-design/icons';
import { Card, Modal, Typography } from 'antd';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EventsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventsData, setEventsData] = useState({});//[hasNextPage, hasPreviousPage, items, pageNo, pageSize, totalCount
  const [pageNo, setPageNo] = useState(1);
  const [firstRender, setFirstRender] = useState(true);

  const [modalOpen, setModalOpen] = useState({
    state: false,
    id: null,
  });


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
        <AnimatePresence>
          {events?.map((eventItem, index) => (
            <motion.div key={index} whileHover={{ y: -10 }}
              whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}>
              <Card
                className="w-full h-72 max-h-72 relative flex justify-center hover:-translate-y-2 transition-all"
                style={{
                  backgroundColor: schoolTheme
                }}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                onClick={() => setModalOpen({
                  state: true,
                  id: eventItem?.id,
                })}
                hoverable
              >
                <div className='text-center font-bold text-2xl'>{eventItem?.title}</div>
                <div className='flex flex-col items-center bg-black text-white my-4 w-fit py-4 px-16 rounded-2xl'>
                  <div className='text-center font-bold text-xl'>{moment(eventItem?.startTime).format("MMMM")}</div>
                  <div className='text-center font-extrabold text-6xl'>{moment(eventItem?.startTime).format("DD")}</div>
                </div>
                <div className='text-center font-semibold text-lg flex space-x-4'>
                  <div><ClockCircleFilled /></div>
                  <div>{moment(eventItem?.startTime).format("HH:mm")} - {moment(eventItem?.endTime).format("HH:mm")}</div>
                </div>
                {/* <div className='text-center font-semibold text-lg flex space-x-4'>
                  <EnvironmentFilled />
                  <div>{eventItem?.location}</div>
                </div> */}

                <div className="absolute bottom-0 left-0 w-full h-4 rounded-b-md bg-black"></div>
              </Card>
              <Modal
                visible={modalOpen.state === true && modalOpen.id === eventItem.id}
                onCancel={() => setModalOpen({
                  state: false,
                  id: null,
                })}
                width="40%"
                closable
                centered
                footer={null}
                bodyStyle={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingTop: '10px'
                }}
              >
                <div className='flex justify-evenly mx-4 w-full mt-3'>
                  <div className='flex flex-col items-center text-black w-fit py-8 px-8 rounded-2xl' style={{
                    backgroundColor: schoolTheme
                  }}>
                    <div className='text-center font-bold text-xl'>{moment(eventItem?.startTime).format("MMMM")}</div>
                    <div className='text-center font-extrabold text-6xl'>{moment(eventItem?.startTime).format("DD")}</div>
                  </div>
                  <div className='flex flex-col space-y-4'>
                    <div className='text-center font-bold text-2xl'>{eventItem?.title}</div>
                    <div className='text-center font-semibold text-lg flex space-x-4'>
                      <div><ClockCircleFilled /></div>
                      <div>{moment(eventItem?.startTime).format("HH:mm")} - {moment(eventItem?.endTime).format("HH:mm")}</div>
                    </div>
                    <div className='text-center font-semibold text-lg flex space-x-4'>
                      <EnvironmentFilled />
                      <div>{eventItem?.location}</div>
                    </div>
                  </div>
                </div>
              </Modal>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {
        eventsData?.hasNextPage && (
          loading ? (
            <div className="flex justify-center items-center h-20 mt-20" >
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <button
                className=" text-white font-bold py-2 px-4 rounded hover:bg-blend-darken hover:-translate-y-1 transition-all"
                style={{
                  backgroundColor: schoolTheme

                }}
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
        )
      }
    </div >
  );
};


export default EventsPage