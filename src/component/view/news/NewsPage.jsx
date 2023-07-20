import { Card, Image, Modal, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);

  const [news, setNews] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [modalOpen, setModalOpen] = useState({
    state: false,
    id: null,
  });

  const [newsData, setNewsData] = useState({});
  const [firstRender, setFirstRender] = useState(true);

  const fetchNews = async () => {
    try {
      const res = await axios.get(
        'https://alumniproject.azurewebsites.net/alumni/api/news',
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
      setNews((prevNews) => [...prevNews, ...res.data.items]);
      setNewsData(res.data);
      if (firstRender) {
        setFirstRender(false);
      }
    } catch (err) {
      setLoading(false);
      // Handle error here
    }
  };

  useEffect(() => {
    fetchNews();
  }, [pageNo]);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, []);

  const truncateText = (text, maxLines) => {
    const lines = text.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).join('\n') + '...';
    }
    return text;
  };



  if (firstRender) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto px-20 m-8">
        <div className="flex justify-center items-center w-full">
          <Typography.Title level={2}>News</Typography.Title>
        </div>
        {news.length !== 0 ? (
          <div className="grid grid-cols-3 gap-14 m-8">
            <AnimatePresence>
              {news?.map((newsItem, index) => (
                <motion.div key={index} whileHover={{ y: -10 }}
                  whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}>
                  <Card
                    className="w-full max-w-md h-96"
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src={newsItem?.newsImageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"}
                        className="object-cover h-56 w-full max-h-full rounded-none"
                      />
                    }

                    onClick={() => setModalOpen({
                      state: true,
                      id: newsItem?.id,
                    })}
                    bodyStyle={{
                      padding: '0px',
                    }}
                    hoverable
                  >
                    <div className="p-2">
                      <h2 className="text-2xl font-light mb-4">{newsItem?.title}</h2>
                      <p className="line-clamp-2">{truncateText(newsItem?.content, 2)}</p>
                    </div>
                  </Card>
                  <Modal
                    title={newsItem?.title}
                    visible={modalOpen.state === true && modalOpen.id === newsItem.id}
                    onCancel={() => setModalOpen(false)}
                    width="80%"
                    closable
                    footer={null}
                    bodyStyle={{
                      display: 'flex',
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      paddingTop: '10px'
                    }}
                  >
                    <Image src={newsItem?.newsImageUrl} alt="" srcSet="" className="modal-image rounded-lg w-1/3" />
                    <Typography className='w-2/3'>{newsItem?.content}</Typography>

                  </Modal>
                </motion.div>
              ))}
            </AnimatePresence>

          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Typography.Title level={2}>No News</Typography.Title>
          </div>
        )
        }

        {
          newsData?.hasNextPage && (
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
  }
};

export default NewsPage;
