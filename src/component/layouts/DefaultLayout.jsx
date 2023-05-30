import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import HeaderComponent from './Header';

const { Content } = Layout;

const DefaultLayout = ({ children }) => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const breadcrumbItems = pathSegments.map((segment, index) => {
        const breadcrumbPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return {
            title: segment,
            path: breadcrumbPath,
            isCurrent: index === pathSegments.length - 1,
        };
    });

    return (
        <Layout className='min-h-screen'>
            <HeaderComponent />
            <Layout>
                <Layout >
                    <Content className="py-4">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;
