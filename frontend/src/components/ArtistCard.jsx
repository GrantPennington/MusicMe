import React from 'react'
import { Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Meta } = Card;

function ArtistCard({ artist }) {
    //console.log('ARTIST --> ',artist)
  return (
    <Space direction="vertical" size={'medium'}>
            <a href={artist.external_urls.spotify} target='_blank'>
            <Card
                hoverable
                style={{
                    width: 240,
                    margin: 8,
                }}
                cover={artist.images.length 
                    ? <img width={'100%'} height={"250px"} src={artist.images[0].url} alt=""/> 
                    : <div style={{ width: 225, height: 250}}></div>
                }
            >
                <Meta title={artist.name} />
            </Card>
            </a>
    </Space>
  )
}

export default ArtistCard

// <Avatar shape="square" size={"auto"} icon={<UserOutlined />}/>