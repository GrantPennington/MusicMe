import React from 'react'
import { Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Meta } = Card;
import { Col, Row } from 'antd';

function TrackCard({ track }) {
    //console.log('TRACK --> ',track.track.name)
    return (
        <>
        <Space key={track.track.id} direction="vertical" size={'medium'}>
                {/*<a href={artist.external_urls.spotify} target='_blank'>*/}
                <Card
                    hoverable
                    style={{
                        width: '80vw',
                        margin: 8,
                        backgroundColor: '#b0b0b0',
                    }}
                >
                    <Row>
                        <Col span={8}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <img alt="example" src={track.track.album.images[2].url} />
                        </div>
                        </Col>
                        <Col span={8}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <h3>{track.track.name}</h3>
                        </div>
                        </Col>
                        <Col span={8}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <h3>{track.track.artists[0].name}</h3>
                        </div>
                        </Col>
                    </Row>
                    
                </Card>
        </Space>
        </>
    )
}

/*
cover={artist.images.length 
                    ? <img width={'100%'} height={"250px"} src={artist.images[0].url} alt=""/> 
                    : <div style={{ width: 225, height: 250}}></div>
                }

                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        
                        <h3>{track.track.name}</h3>
                        <h3>{track.track.artists[0].name}</h3>
                    </div>

*/

export default TrackCard