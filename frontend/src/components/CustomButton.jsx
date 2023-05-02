import React from 'react'
import { Button, Space } from 'antd';

function CustomButton({ type, label, handleClick, isDisabled, styling}) {

  return (
    <Button 
        type={type || "primary"} 
        onClick={handleClick} 
        disabled={isDisabled || false}
        style={styling || { width: 300, marginTop: '10px', }}
    >
        {label}
    </Button>
  )
}

export default CustomButton