import React from 'react'
import { Typography } from 'antd';
import UserContext from '../context/UserContext';
const { Title } = Typography;
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

function UsernameDisplay() {
    const { user } = React.useContext(UserContext);
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ marginLeft: 15, marginBottom: 5 }}>
                <Avatar src={<img src={user.ProfileImg}/>} size={56} alt={<UserOutlined />} />
            </div>
            <Title level={2} style={{ float: 'left', marginLeft: 10, marginBottom: 25 }}>
                {user.DisplayName!=="" ? user.DisplayName : 'Logged In User'}
            </Title>
            <Title level={5} style={{ marginLeft: 10, marginBottom: 6, fontSize: '12px' }}>
                <a href={user.SpotifyLink} target={"_blank"}>Go to Spotify</a>
            </Title>
        </div>
    )
}

export default UsernameDisplay