import React from 'react';
import { Button, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { addNotification } from '../../utilities/commonServices/CommonService';

const { Title } = Typography;

const Login = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);

    const additionalPath = pathSegments.slice(1).join(' / ');

    return (
        <Typography>
            <Title>Login{additionalPath && ` - ${additionalPath}`}</Title>
            <Button onClick={() => {
                addNotification('info', "", 'login failed')
            }}>Login</Button>
        </Typography>
    );
};

export default Login;
