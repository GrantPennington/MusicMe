import React from 'react'
import { Card, Space } from 'antd';
const { Meta } = Card;

function PlaylistCard({ playlist }) {
    return (
        <Space direction="vertical" size={'large'}>
            <a href={playlist.external_urls.spotify} target='_blank'>
            <Card
                hoverable
                style={{
                    width: 240,
                    margin: 8,
                }}
                cover={<img alt="example" src={!playlist.images[0] ? '' : playlist.images[0].url} />}
            >
                <Meta title={playlist.name} description={playlist.description} />
            </Card>
            </a>
        </Space>
    )
}

export default PlaylistCard

