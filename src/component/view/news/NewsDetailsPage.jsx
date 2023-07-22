import { cyan, geekblue, green, lime, magenta, orange, purple, red, volcano, yellow } from '@ant-design/colors';
import { Image, Tag, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const NewsDetailPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [newsDetail, setNewsDetail] = useState({});
  const token = useSelector((state) => state.authReducer?.token);
  const [loading, setLoading] = useState(true);

  const colorList = [
    red[5],
    cyan[5],
    geekblue[5],
    green[5],
    lime[5],
    magenta[5],
    orange[5],
    purple[5],
    red[5],
    volcano[5],
    yellow[5],
  ]

  const fetchNewDetail = async () => {
    try {
      const res = await axios.get(
        `https://alumniproject.azurewebsites.net/alumni/api/news/${id}`,
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
      setNewsDetail(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      addNotification("error", "", "Get news detail failed");
    }
  };


  useEffect(() => {
    fetchNewDetail();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  } else {
    return (
      <div className="container mx-auto p-8 flex justify-around">
        <div className=" flex justify-center items-center mb-6 mx-4">
          <Image
            src={newsDetail.newsImageUrl || "https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg"}
            alt={newsDetail.title}
            className="object-cover h-80 w-full max-h-full rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
        <div className='w-[55vw]'>
          <div className="flex items-center mb-2">
            <Typography.Title level={2} className="text-gray-800 font-bold tracking-wide">
              {newsDetail.title}
            </Typography.Title>
          </div>
          <div className=" flex space-x-4">
            <div>
              <Typography.Text className="text-gray-900 font-bold">{newsDetail.alumniName}</Typography.Text>
            </div>
            <div>
              {newsDetail.tags && newsDetail.tags.length > 0 ? (
                newsDetail.tags.map((tag) => {
                  const randomIndex = tag.id % 11; // Use ID to randomly select a color
                  return (
                    <Tag key={tag.id} color={colorList[randomIndex]}>
                      {tag.tagName}
                    </Tag>
                  )
                })
              ) : (
                <Tag color="blue">No tag</Tag>

              )}
            </div>
          </div>
          <div className="mt-2 w-4/5">
            <Typography.Paragraph className="text-gray-600 leading-relaxed mb-4">
              {newsDetail.content}
            </Typography.Paragraph>

          </div>
        </div>
      </div>

    )
  }
}

export default NewsDetailPage