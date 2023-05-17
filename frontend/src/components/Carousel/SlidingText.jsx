import React from 'react'
import './SlidingText.css'
import TextTransition, { presets } from "react-text-transition";

function SlidingText({ description, style }) {
  return (
    <TextTransition springConfig={presets.wobbly} delay={0}>
        <p style={style}>{description}</p>
    </TextTransition>
  )
}

export default SlidingText