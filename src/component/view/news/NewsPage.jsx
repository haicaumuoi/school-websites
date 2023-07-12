import { Card, Modal, Skeleton, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNews } from '../../../redux/slices/newSlice';

const NewsPage = () => {
  const token = useSelector((state) => state.authReducer.token);
  const login = useSelector((state) => state.authReducer?.user?.schoolId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const newsData = useSelector((state) => state.newReducer.news);
  const [modalOpen, setModalOpen] = useState({
    state: false,
    id: null,
  });
  const skeleton = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  useEffect(() => {
    if (!login) {
      navigate('/');
    }
  }, []);

  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    dispatch(getNews({ token, pageNo })).then(() => {
      if (news) {
        setNews(news.concat(newsData.items));
      } else {
        setNews(newsData.items);
      }
      setLoading(false);
    });
  }, [pageNo]);


  if (loading) {
    return (
      <div className="container mx-auto px-20 m-8">
        <div className="flex justify-center items-center w-full">
          <Typography.Title level={2}>News</Typography.Title>
        </div>
        <div className="grid grid-cols-3 gap-14 m-8">
          <div >
            <Card
              className="w-full h-72 max-h-72"
              cover={
                <Skeleton.Image
                  className="object-cover h-full w-full max-h-full"
                  style={{ width: '100%', height: '100%' }}
                  active
                />
              }
              hoverable
            >
              <Meta />
            </Card>
          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-20 m-8">
      <div className="flex justify-center items-center w-full">
        <Typography.Title level={2}>News</Typography.Title>
      </div>
      <div className="grid grid-cols-3 gap-14 m-8">
        {news?.map((newsItem, index) => (
          <div key={index}>
            <Card
              className="w-full h-72 max-h-72"
              cover={
                <div>
                  <img alt="example" src={newsItem?.newsImageUrl} className="object-cover h-56 w-full max-h-full" />
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
              open={modalOpen.state === true && modalOpen.id == newsItem.id}
              onCancel={() => setModalOpen(false)}
              style={{
                width: '80%',
              }}
              onOk={() => setModalOpen(false)}
            >
              <img src={newsItem?.newsImageUrl} alt="" srcSet="" />
              <p>{newsItem?.content}</p>
            </Modal>
          </div>
        ))}
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
      </div>
    </div >

  );
};

export default NewsPage;
