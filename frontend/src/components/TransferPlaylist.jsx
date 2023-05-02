import Title from 'antd/es/typography/Title'
import React from 'react'
import HoverableCard from './HoverableCard'
import { Col, Row } from 'antd';
import UploadButton from './FileConverter/UploadButton';
import Uploader from './FileConverter/Uploader';

function TransferPlaylist() {

  const GridColumn = ({ id }) => {
    return (
      <Col span={8} key={id} style={{ backgroundColor: 'blue' }}>col-8</Col>
    )
  }

  return (
    <>
      <Title level={3}>Transfer Playlist Coming Soon...</Title>
      {/*<UploadButton />*/}
      <Uploader />
      {/*<HoverableCard width={1000} height={40}/>*/}
    </>
  )
}

export default TransferPlaylist