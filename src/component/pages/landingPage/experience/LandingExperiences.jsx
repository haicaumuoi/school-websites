import { grey } from '@ant-design/colors';
import { Space, Typography } from 'antd'
import React from 'react'

const { Text, Title} = Typography;

const LandingExperiences = () => {
  return (
    <>
      <Space className='flex flex-col items-center mx-64'>
          <Title level={4} color={grey.primary} className='uppercase'>Experience One91</Title>
          <Title>Blaze Your Path</Title>
          <Title level={5} className='text-center' >Burnsville-Eagan-Savage School District 191 is a future-forward school district creating barrier-free pathways for learning for everyone in our community. We believe learning is a lifelong pursuit, and create programs,
           services and opportunities that inspire this belief. </Title>
      </Space>
    </>
  )
}

export default LandingExperiences