import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { Typography } from 'antd';
import CustomButton from './CustomButton';
const { Title } = Typography;
import { Divider } from 'antd';
import UsernameDisplay from './UsernameDisplay';
import axios from 'axios';
import UserContext from '../context/UserContext';
import GeneratePlaylist from './GeneratePlaylist';
import DisplayPlaylists from './DisplayPlaylists';
import TransferPlaylist from './TransferPlaylist';
import SearchArtists from './SearchArtists';
import DisplayFavorites from './DisplayFavorites';

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Generate', '1', <PieChartOutlined />),
  getItem('Convert', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Playlists', '3'),
    getItem('Favorites', '4'),
  ]),
  getItem('Artists', '5', <TeamOutlined />)
];

const HomeLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState('1')
  const [token, setToken] = useState("")
  const navigate = useNavigate();

  const { updateUser, updatePlaylists } = useContext(UserContext)

  useEffect(() => {
    // setting user auth token
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")

    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }
    //console.log('TOKEN -> ',token)
    setToken(token)
  }, [])

  useEffect(() => {
    getUserData()
    getPlaylists()
  }, [token])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const getUserData = () => {
    // get the currently logged in users spotify details
    if(token!=="") {
        axios.get("https://api.spotify.com/v1/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })//.then((resp) => console.log(resp.data))
        .then((resp) => updateUser(resp.data.display_name, resp.data.id, resp.data.external_urls.spotify, resp.data.images))
        // use resp.data.images --> returns array of user profile images
    }
  }

  const getPlaylists = () => {
    // get all the current logged in users playlists
    if(token!=="") {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((resp) => updatePlaylists(resp.data.items))
    }
  }

  const logout = () => {
    // on logout clear the token then route to login page
    setToken("")
    window.localStorage.removeItem("token")
    navigate('/')
  }

  const handleMenuChange = (item) => {
    setSelected(`${item}`)
  }

  return (
    <Layout
      style={{
        margin: '-8px',
        padding: 0,
        minHeight: '100vh',
        backgroundColor: '#7c0ee0'
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <Title level={3} style={{ color: 'rgba(211, 214, 219)' }}>
            {collapsed ? 'MM' : 'MusicMe'}
          </Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(itemKey) => handleMenuChange(itemKey.key)} selectedKeys={[selected]}/>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 85,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: "2px solid #3c4c80",
          }}
        >
          <UsernameDisplay />
          <CustomButton
                label={'Logout'}
                handleClick={logout}
                styling={{ width: 85, float: 'right', marginRight: 15, backgroundColor: '#2727b0' }}
          />
        </Header>
        <Content
          style={{
            margin: '0',
            backgroundColor: '',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              backgroundColor: '',
            }}
          >
            {selected === '1'
              && <GeneratePlaylist token={token} />
            }
            {selected === '2'
              && <TransferPlaylist />
            }
            {selected === '3'
              && <DisplayPlaylists updatePlaylists={getPlaylists} />
            }
            {selected === '4'
              && <DisplayFavorites token={token} />
            }
            {selected === '5'
              && <SearchArtists 
                token={token}
              />
            }
            
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            background: '#c5ded1',
          }}
        >
          MusicMe ©2023 Created by Grant Pennington
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;