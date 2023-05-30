import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/slices/darkModeSlice';

const { Header } = Layout;


const HeaderComponent = () => {
    const isDarkMode = useSelector((state) => state.darkMode);
    const dispatch = useDispatch();

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <Header className='px-20'>
            <Menu theme={isDarkMode ? 'dark' : 'light'} mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    Profile
                </Menu.Item>
                <Menu.Item key="3" icon={<SettingOutlined />}>
                    Settings
                </Menu.Item>
                <Menu.Item key="4">
                    <Button>Logout</Button>
                </Menu.Item>
                <Menu.Item key="5">
                    <Button onClick={handleToggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Button>
                </Menu.Item>
            </Menu>
        </Header>
    );
};



export default HeaderComponent;
