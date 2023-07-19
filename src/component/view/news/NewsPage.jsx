import { Card, Modal, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const schoolTheme = useSelector((state) => state.schoolReducer?.school?.theme);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [modalOpen, setModalOpen] = useState({
    state: false,
    id: null,
  });

  const [newsData, setNewsData] = useState({});

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



  if (loading) {
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
            {news?.map((newsItem, index) => (
              <div key={index} className="card-container">
                <Card
                  className="w-full h-72 max-h-72"
                  cover={
                    <div>
                      <img
                        alt="example"
                        src={newsItem?.newsImageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"}
                        className="object-cover h-56 w-full max-h-full"
                      />
                    </div>
                  }
                  onClick={() => setModalOpen({
                    state: true,
                    id: newsItem?.id,
                  })}
                  hoverable
                >
                  <Meta title={newsItem?.title} />
                </Card>
                <Modal
                  title={newsItem?.title}
                  visible={modalOpen.state === true && modalOpen.id === newsItem.id}
                  onCancel={() => setModalOpen(false)}
                  width="80%"
                  okButtonProps={{
                    className: "text-white",
                    style: {
                      backgroundColor: schoolTheme,
                    },
                  }}
                  onOk={() => setModalOpen(false)}
                  className="news-modal"
                >
                  <img src={newsItem?.newsImageUrl} alt="" srcSet="" className="modal-image" />
                  <p>{newsItem?.content}</p>
                </Modal>
              </div>
            ))}


          </div>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <Typography.Title level={2}>No News</Typography.Title>
          </div>
        )}

        {newsData?.hasNextPage && (
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
      </div >

    );
  }
};

export default NewsPage;
