import React from 'react'

function ScrollableBox(props) {
  return (
    <div style={{ height: 400, overflowY: "scroll", border: "2px solid #b0aeae", borderRadius: "1%" }}>
        {props.children}
    </div>
  )
}

export default ScrollableBox