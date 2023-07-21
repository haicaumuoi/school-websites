import React from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/authSlice';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

const NotRegisteredMenu = () => {
    const dispatch = useDispatch();
    return (
        <Menu mode="horizontal" className="w-6/12 h-10 justify-end">

            <Menu.Item>
                <Link to='/register'>
                    <Typography className="text-xl font-black uppercase transition-all">Register</Typography>
                </Link>
            </Menu.Item>

            <Menu.Item onClick={() => {
                dispatch(logout())
            }}>
                <Typography className="text-xl font-black uppercase transition-all"> Log Out</Typography>
            </Menu.Item>
        </Menu>
    )
}

export default NotRegisteredMenu