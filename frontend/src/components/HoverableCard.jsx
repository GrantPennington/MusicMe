import React from 'react'
import { Avatar, Card, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
const { Meta } = Card;
import { Col, Row } from 'antd';

function HoverableCard({ width, height, content }) {

    const GridColumn = ({ id }) => {
        return (
          <Col span={8} key={id} style={{ backgroundColor: 'blue' }}>col-8</Col>
        )
    }


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

/*style={{
                    width: width || '90%',
                    height: height || 75,
                    
                }}

                borderRadius: 7,
                    backgroundColor: 'blue',
                    display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'

<GridColumn id={'col-1'}/>
                <GridColumn id={'col-2'}/>
                <GridColumn id={'col-3'}/>
                */