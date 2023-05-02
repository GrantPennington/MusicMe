import React from 'react'
import { Alert, Space } from 'antd';

function SuccessAlert({ description, handleClose }) {
  return (
    <>
    <Alert
      message="Success"
      description={description || 'The operation was succesful!'}
      type="success"
      showIcon
      closable
      afterClose={handleClose}
    />
    </>
  )
}

export default SuccessAlert