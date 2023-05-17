import React from 'react'
import { Col, Row } from 'antd';

function HoverableCard({ width, height, content }) {

    return (
            <Row style={{ borderRadius: 7,
                    width: width || 600,
                    height: height || 45,
                    margin: 0,
                    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
                }}>
                <Col span={8} style={{  }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <p>Hello</p>
                    </div>
                </Col>
                <Col span={8} style={{ }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Hello</p>
                    </div>
                </Col>
                <Col span={8} style={{  }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <p>Hello</p>
                    </div>
                </Col>
            </Row>
    )
}

export default HoverableCard